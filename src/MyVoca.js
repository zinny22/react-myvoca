import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector} from "react-redux";
import { loadVocaFB} from "./redux/modules/voca";
import { clearIndexedDbPersistence } from "firebase/firestore";

const MyVoca =(props)=>{

    const dispatch = useDispatch();


    React.useEffect(()=>{   
        dispatch(loadVocaFB());
    })

    const plusicon = <FontAwesomeIcon icon={faPlus}/>

    const navigate = useNavigate();

    const vocas = useSelector((state)=>state.voca.list)

    return(
        <div style={{
            backgroundColor:"aqua"
        }}>
        <div style={{
            overflow:"hidden",
        }}>
            {vocas.map((voca,index) => {
                return(
                    <Cards key={index}>
                        <h3>{voca.word}<Pro>{voca.pronun}</Pro></h3>
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
    width: calc(33.33% - 20px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    float: left;
    margin-top: 20px;
    
    &:not(:nth-child(3n+1)){
        margin-left: 30px;
    }
    
    &:hover {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
        -webkit-transform: scale(1.01); 
        -moz-transform: scale(1.01); 
        -ms-transform: scale(1.01); 
        -o-transform: scale(1.01); 
        transform: scale(1.01);
    }
`

const Pro = styled.span`
font-size: 15px;
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
position: absolute;
right: 0px;
bottom: 0px;
margin-right: 60px;
margin-bottom: 60px;

&:hover{
    transition: 0.125s all ease-in;
    transform: rotate(90deg);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 10px 0px;
}
`

export default MyVoca