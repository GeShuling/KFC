import {combineReducers,createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import memoReducer from './memoReducer'
import userReducer from './userReducer';

//合并多个reducer
let rootReducer = combineReducers({
    productState:productReducer,
    categoryState:categoryReducer,
    userState:userReducer,
    memoState:memoReducer
})

//创建仓库并且暴露
export default createStore(rootReducer,applyMiddleware(thunk))