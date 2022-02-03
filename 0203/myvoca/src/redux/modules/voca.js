import {db} from "../../firebase"
import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc
} from "firebase/firestore"




//액션 
const LOAD = "voca/LOAD"
const CREATE = "voca/CREATE"
const DELETE = "voca/DELETE"
const UPDATE = "voca/UPDATE"
const CHECK = "voca/CHECK"

const initState ={
    list :[
    ]
}


//액션 생성 함수
export function loadVoca(voca_list){
    return {type:LOAD, voca_list};
}

export function createVoca(voca){
    return{type:CREATE, voca};
}

export function deleteVoca(voca_list){
    return {type:DELETE, voca_list};
}

export function updateVoca(voca_index,newvoca){
    return {type: UPDATE, voca_index, newvoca }
}

export function checkVoca(voca_list){
    return {type: CHECK, voca_list}
}


//미들웨어함수
//파이어베이스랑 연결해주는 역할
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
    //나지금 디스패치 쓸꺼야 라고 알려주는 중 
    return async function(dispatch){
       const docRef = await addDoc(collection(db,"voca"),voca);
       dispatch(createVoca({id:docRef.id, ...voca})) 
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

// 파이어베이스랑 통신하는 부분
export const checkVocaFB = (voca_id) => {
    return async function (dispatch, getState) {
      const docRef = doc(db, "voca", voca_id);
      const _voca_list = getState().voca.list;

      const voca_index = _voca_list.findIndex((voca) => {
        return voca.id === voca_id;})

        const vocas = getState().voca.list;

        if(vocas[voca_index].completed === false){
            await updateDoc(docRef, { completed : true});
        } else if(vocas[voca_index].completed === true){
            await updateDoc(docRef, { completed : false});
        }
  
      dispatch(checkVoca(voca_index));
    //   window.location.reload();
    };
  };

  export const updateVocaFB = (updatevoca,voca_id) => {
    return async function (dispatch, getState) {

        const docRef = doc(db, "voca", voca_id);
        await updateDoc(docRef,{...updatevoca});

        const _voca_list = getState().voca.list;

        const voca_index = _voca_list.findIndex((voca) => {
        return voca.id === voca_id;
        })

        updatevoca = {...updatevoca,id:voca_id};
        dispatch(updateVoca(voca_index,updatevoca));
    };
    
  };


//리듀서
export default function reducer(state =initState, action ={}){
    switch(action.type){
        case LOAD : {
            return{list : action.voca_list}
        }

        case CREATE : {
              const new_voca =[...state.list, action.voca]
              return {list : new_voca}
          }

        case DELETE : {
            const new_voca = state.list.filter((voca, idx)=>{
                return parseInt(action.voca_list) !== idx
            })
            return{list:new_voca}
        }
        case CHECK :{
            const new_voca = state.list.map((v,idx)=>{
                if (parseInt(action.voca_list) === idx){
                    return v.completed===true? {...v, completed: false} : {...v, completed: true}
                } else{
                    return v
                }
            })
            return {list: new_voca}
        }

        case UPDATE :{
            const new_voca = state.list.map((v,idx)=>{
                if (parseInt(action.voca_index) === idx){
                    return action.newvoca;
                } else{
                    return v
                }
            })
            return {list: new_voca};
        }
        default: return state;
    }
}