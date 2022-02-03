import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { deleteVocaFB, checkVocaFB} from "./redux/modules/voca";



const MyVoca =(props)=>{
    const vocas = useSelector((state)=>state.voca.list);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    //아이콘 가지고 오는 부분 
    const plusicon = <FontAwesomeIcon icon={faPlus}/>
    const transhicon = <FontAwesomeIcon icon={faTrashAlt}/>
    const checkicon = <FontAwesomeIcon icon ={faCheck}/>
    const editicon = <FontAwesomeIcon icon={faEdit}/>
    

    return(
        <div>
        <div style={{
            overflow:"hidden",
            display: "flex",
            flexWrap:"wrap",
            justifyContent:"center",
        }}>
            {vocas.map((voca,index) => {
                return(
                    <Cards completed = {voca.completed}  key={index} >
                        <Trash>
                        <div style={{color :"#7c43bd", display: "flex"}}>
                            <span style={{margin:"5px"}} onClick={()=>{dispatch(checkVocaFB(voca.id))}}>{checkicon}</span>
                            <span style={{margin:"5px"}} onClick={()=>{navigate(`/detail/${voca.id}`)}}>{editicon}</span>
                            <span style={{margin:"5px"}} onClick={()=>{dispatch(deleteVocaFB(voca.id)); alert("삭제할꺼니?")}}>{transhicon}</span>
                        </div>
                        <h3 >{voca.word}<Pro>[{voca.pronun}]</Pro></h3>
                        </Trash>

                        <p>{voca.mean}</p>
                        <Example>{voca.example}</Example>
                    </Cards>
                )
            })}
        </div>
        <Btn onClick={()=>{navigate(`/detail`)}}>{plusicon}</Btn>
        </div>
    )
}



const Cards = styled.div`
    box-sizing: border-box;
    border: 3px solid #d1c4e9;
    border-radius: 10px;
    width: 500px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    float: left;
    margin: 20px;
    font-size: 25px;
    color: #383839;
    background-color: ${(p)=> p.completed? "#d1c4e9" : "none" };
    //자동 줄바꿈
    word-break: break-all;
    
    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
        -webkit-transform: scale(1.01); 
        -moz-transform: scale(1.01); 
        -ms-transform: scale(1.01); 
        -o-transform: scale(1.01); 
        transform: scale(1.01);
    }
`

const Trash = styled.div`
display: flex;
justify-content:space-between;
flex-direction: row-reverse;
`

const Pro = styled.span`

font-size: 18px;
color: gray;
margin-left: 15px;
`

const Example = styled.p`
color: #7c43bd;
`


const Btn =styled.div`
width: 20px;
text-align: center;
color: white;
background-color: #7c43bd;
border: 1px solid #7c43bd;
border-radius: 50px;
padding: 15px;
position: fixed;
right: 0px;
bottom: 0px;
margin-right: 60px;
margin-bottom: 60px;

&:hover{
    transition: all ease 0.3s;
    transform: rotate(90deg);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 10px 0px;
}
`

export default MyVoca