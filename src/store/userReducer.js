//1.初始状态
let initState = {
    visible:false
}

//2.action generator
export function openModal(){
    return {
        type:'OPEN_MODAL'
    }
}

export function closeModal(){
    return {
        type:'CLOSE_MODAL'
    }
}

//3.reducer
export default function(state=initState,action){
    switch(action.type){
        case 'OPEN_MODAL':
            return{
                ...state,
                visible:true
            }
        case 'CLOSE_MODAL':
            return{
                ...state,
                visible:false
            }
        default:
            return state;
    }
}