import {db} from "../../firebase"
import {
    collection,
    getDocs,
    addDoc,
} from "firebase/firestore"

//액션 
const LOAD = "voca/LOAD"
const CREATE = "voca/CREATE"



const initState ={
    list :[
    ]
}


//액션 생성 함수
export function createVoca(voca){
    console.log(voca)
    return{type:CREATE, voca};
}

export function loadVoca(voca_list){
    return {type:LOAD, voca_list};
}

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
       console.log(docRef)

    }
}

//리듀서
export default function reducer(state =initState, action ={}){
    switch(action.type){
        case "voca/LOAD":{
            return{list:action.voca_list}
        }

        case "voca/CREATE": {
            console.log("이제 값을 바꿀꺼야 ")
              const new_voca =[...state.list, action.voca]
              console.log(new_voca)
              return {list :new_voca}
          }
          default: return state;
    }
}