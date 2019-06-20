import _ from 'lodash'

//定义初始化状态
let initState = {
    loading:false,
    visible:false,
    list:["晚上看电影","周四面试","周六钓鱼","周日逛街"]
}

export function delMemo(payload){
    return {type:'DEL_MEMO',payload}
}

export function saveMemo(payload){
    return {type:'SAVE_MEMO',payload}
}

//定义reducer
function memoReducer(state = initState,action){
    switch(action.type){
        case "DEL_MEMO":
            _.remove(state.list,item=>item===action.payload)
            return {
                ...state,
                list:state.list
            }
        case "SAVE_MEMO":
            return {
                ...state,
                list:[...state.list,action.payload]
            }
        default:
            return state;
    }
}

export default memoReducer;