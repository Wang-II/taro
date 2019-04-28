import { createCallbackManager, createScroller } from '../utils'

/**
 * @typedef {Object} ReachBottomParam
 * @property {Function} callback
 * @property {*} ctx
 * @property {Number|undefined} onReachBottomDistance
 */

/**
 * @param {ReachBottomParam} opt 
 */
export const onReachBottom = (opt) => {
  const callbackManager = createCallbackManager()
  const scroller = createScroller(opt.ctx)
  const distance = typeof opt.onReachBottomDistance === 'number'
    ? opt.onReachBottomDistance
    : 50

  let canTrigger = true

  const onScroll = () => {
    if (scroller.isReachBottom(distance)) {
      canTrigger && callbackManager.trigger()
      /**
       * @todo 暂时不实现“在触发距离内滑动期间，本事件只会被触发一次”的功能。移动端环境scroll事件只会在停下后触发
       * canTrigger = false
       */
    } else {
      canTrigger = true
    }
  }

  callbackManager.add(opt)
  scroller.listen(onScroll)

  return () => {
    callbackManager.remove(opt)
    if (callbackManager.count() === 0) {
      scroller.unlisten(onScroll)
    }
  }
}
