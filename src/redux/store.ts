/*
* combineReducers 辅助函数：
* 把一个由多个不同的reducer函数作为value 的Object合并成为一个总的reducer函数.
* 然后可以对这个reducer函数调用createStore().
*/
import {createStore,combineReducers} from 'redux'
import {CollapsedReducer} from './reducers/CollapsedReducer'
import {LoadingReducer} from './reducers/LoadingReducer'
import {ThemeRender} from './reducers/ThemeReducer'
/*
* 1. redux-persist：数据持久化（https://www.npmjs.com/package/redux-persist）
*
* 2. 什么是数据持久化？
*    一般指页面刷新后，数据仍然能保持原来的状态。
*
* 3. redux-persist数据持久化原理？
*   一般在前端当中，数据持久化，可以通过将数据存储到localstorage或Cookie中存起来，用到的时候直接从本地存储中获取数据。
*   而redux-persist是把redux中的数据在localstorage中存起来，起到 持久化的效果
*
*/
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'hangyi',
    storage,
    blacklist: ['LoadingReducer']   //黑名单：'LoadingReducer'不会持久化
   // whitelist: ['navigation']     //白名单：只有'navigation'会持久化
}
const reducer = combineReducers({
    CollapsedReducer,
    LoadingReducer,
    ThemeRender
})
// persistReducer 不是必须的，而且可以对包含任意 reducer ，实现精确控制需要 persist 的内容.
const persistedReducer = persistReducer(persistConfig, reducer)
  

const store = createStore(persistedReducer);

//persistStore 用来生产 persistor 的 store,是必须配置的.
const persistor = persistStore(store)
export {
    store,
    persistor
}