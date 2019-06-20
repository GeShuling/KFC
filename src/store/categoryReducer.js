import axios from '../http'
import {message} from 'antd'

// 1.state
let initState = {
    visible:false,
    loading:false,
    list:[]
}
// 2.action generator
export function changeLoadingStatus(payload){
    return {
        type:"CHANGE_LOADING_STATUS",
        payload
    }
}
export function openModal(){
    return {
        type:"OPEN_MODAL"
    }
}
export function closeModal(){
    return {
        type:"CLOSE_MODAL"
    }
}
export function saveOrUpdateCategory(form){
    return (dispatch)=>{
        axios.post("/category/saveOrUpdate",form)
        .then(({statusText})=>{
            message.success(statusText);
            dispatch(closeModal());
            dispatch(reloadCategory())
        })
    }
}
export function reloadCategory(){
    return (dispatch)=>{
        dispatch(changeLoadingStatus(true))
        axios.get("/category/findAll")
        .then(({data})=>{
            dispatch({type:"RELOAD_CATEGORY",payload:data})
        })
        .finally(()=>{
            dispatch(changeLoadingStatus(false))
        })
    }
}
export function deleteCatecory(id){
    return (dispatch)=>{
        axios.get("/category/deleteById",{params:{id}})
        .then(({statusText})=>{
            message.success(statusText);
            dispatch(reloadCategory());
        })
    }
}
// 3.reducer
export default function (state=initState,action){
    switch(action.type){
        case "CHANGE_LOADING_STATUS":
            return {
                ...state,
                loading:action.payload
            }
        case "OPEN_MODAL":
            return {
                ...state,
                visible:true
            }
        case "CLOSE_MODAL":
            return {
                ...state,
                visible:false
            }
        case "RELOAD_CATEGORY":
            return {
                ...state,
                list:action.payload
            }
        default:
            return state;
    }
}