# mixin

## 基础使用

混入 (mixin) 提供了一种非常灵活的方式，来**分发 Vue 组件中的可复用功能**。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

## 选项合并

### mergeOptions

当使用 `Vue.mixin` 方法时，`mixin` 对象中的选项会与当前 Vue 实例的 `options` 对象进行合并。这里的 `this` 关键字指的是当前正在创建或已经创建的 Vue 实例。

```js
export function initMixin(Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)//this.options  当前 Vue 实例的选项对象
    return this
  }
}
```

1.优先递归处理 mixins
2.先遍历合并parent 中的key，调用 mergeField 方法进行合并，然后保存在变量 options
3.再遍历child，合并补上parent中没有的key，调用mergeField 方法进行合并，保存在变量 options
4.通过 mergeField 函数进行了合并

```js
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions(
  parent: Record<string, any>,
  child: Record<string, any>,
  vm?: Component | null
): ComponentOptions {
  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {  //1. 判断有没有mixin 也就是mixin里面挂mixin的情况 有的话递归进
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options: ComponentOptions = {} as any
  let key
  for (key in parent) {
    mergeField(key) //2.先遍历合并parent 中的key，调用 mergeField 方法进行合并，然后保存在变量 options
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key) //3.再遍历child，合并补上parent中没有的key，调用mergeField 方法进行合并，保存在变量 options
    }
  }
  function mergeField(key: any) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

### mergeField

```js
  function mergeField(key: any) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
```

#### 合并型策略是 data，通过 set 方法进行合并和重新赋值

如果this实例上没有，就返回mixin的，

如果mixin上都有。则返回mixin数组最后的一个

#### 队列性合并：全部生命周期和watch

当一个属性变化时，所有的watch会按队列触发。全局，mixin队列

```js
/**
 * Hooks and props are merged as arrays.
 */
export function mergeLifecycleHook(
  parentVal: Array<Function> | null,
  childVal: Function | Array<Function> | null
): Array<Function> | null {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : isArray(childVal)
      ? childVal
      : [childVal]
    : parentVal
  return res ? dedupeHooks(res) : res
}

function dedupeHooks(hooks: any) {
  const res: Array<any> = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeLifecycleHook
})

strats.watch = function (
  parentVal: Record<string, any> | null,
  childVal: Record<string, any> | null,
  vm: Component | null,
  key: string
): Object | null {
  // work around Firefox's Object.prototype.watch...
  //@ts-expect-error work around
  if (parentVal === nativeWatch) parentVal = undefined
  //@ts-expect-error work around
  if (childVal === nativeWatch) childVal = undefined
  /* istanbul ignore if */
  if (!childVal) return Object.create(parentVal || null)
  if (__DEV__) {
    assertObjectType(key, childVal, vm)
  }
  if (!parentVal) return childVal
  const ret: Record<string, any> = {}
  extend(ret, parentVal)
  for (const key in childVal) {
    let parent = ret[key]
    const child = childVal[key]
    if (parent && !isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent ? parent.concat(child) : isArray(child) ? child : [child]
  }
  return ret
}
```

#### 叠加型：filters component directives

#### 替换型合并： props methods inject computed 

如果this实例上没有，就返回mixin的，

如果mixin上都有。则返回mixin数组最后的一个

```js
/**
 * Other object hashes.
 */
strats.props =
  strats.methods =
  strats.inject =
  strats.computed =
    function (
      parentVal: Object | null,
      childVal: Object | null,
      vm: Component | null,
      key: string
    ): Object | null {
      if (childVal && __DEV__) {
        assertObjectType(key, childVal, vm)
      }
      if (!parentVal) return childVal //如果this实例上没有，就返回mixin的
      const ret = Object.create(null)//如果this实例上有 extend parentVal ret
      extend(ret, parentVal)
      if (childVal) extend(ret, childVal)//如果this实例上有，就返回mixin的
      return ret
    }
```

