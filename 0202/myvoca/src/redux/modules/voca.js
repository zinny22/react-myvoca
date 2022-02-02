import {db} from "../../firebase"
import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc
} from "firebase/firestore"



//액션 
const LOAD = "voca/LOAD"
const CREATE = "voca/CREATE"
const DELETE = "voca/DELETE"
const UPDATE = "voca/UPDATE"

const initState ={
    list :[
    ]
}


//액션 생성 함수
export function loadVoca(voca_list){
    return {type:LOAD, voca_list};
}

export function createVoca(voca){
    console.log(voca)
    return{type:CREATE, voca};
}

export function deleteVoca(voca_list){
    return {type:DELETE, voca_list};
}

// export function updateVoca(voca_list){
//     return {type: UPDATE, voca_list}
// }


//미들웨어함수
export const loadVocaFB = ()=>{
    return async function(dispatch) {
        //한 컬랙션 안에 있는거 전부가져올수 있음
        const voca_data = await getDocs(collection(db,"voca"));
        
        let voca_list = [];

        voca_data.forEach((voca)=>{
            voca_list.push({id: voca.id, ...voca.data()})
        })
        dispatch(loadVoca(voca_list))
    }
}

export const addVocaFB = (voca) =>{
    return async function(dispatch ){
       const docRef = await addDoc(collection(db,"voca"),voca);
       const voca_data = {id:docRef.id,...voca};
       dispatch(createVoca(voca_data)) 
       console.log(docRef)

    }
}


export const deleteVocaFB = (voca_id) =>{
    return async function (dispatch, getState){
        if(!voca_id){
            window.alert("아이디가 없음");
            return;
        }
        //doc을 선택한
        const docRef = doc(db, "voca", voca_id);
        //선택한 데이터 삭제 
        await deleteDoc(docRef);

        
        const vocas_list = getState().voca.list;
        const voca_index = vocas_list.findIndex((v)=>{
            return v.id === voca_id;
        })

        dispatch(deleteVoca(voca_index));
    }
}

//리듀서
export default function reducer(state =initState, action ={}){
    switch(action.type){
        case LOAD : {
            return{list : action.voca_list}
        }

        case CREATE : {
              const new_voca =[...state.list, action.voca]
              return {list :new_voca}
          }

        case DELETE : {
            const new_voca = state.list.filter((voca, idx)=>{
                return parseInt(action.voca_list) !== idx
            })
            return{list:new_voca}
        }

        // case UPDATE :{
        //     const new_voca = [...state.list, action.voca_list]
        //     return {list : new_voca}
        // }
          default: return state;
    }
}