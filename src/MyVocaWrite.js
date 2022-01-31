import React from "react";
import styled from "styled-components";
import { useDispatch} from "react-redux";
import { addVocaFB} from "./redux/modules/voca"
import { useNavigate } from "react-router-dom";


const MyVocaWirte =(props)=>{
    const naviagte = useNavigate()
    
    const dispatch = useDispatch();


    const word = React.useRef(null);
    const pronuncation = React.useRef(null);
    const mean = React.useRef(null);
    const example = React.useRef(null);  
    
    const addCard = () =>{
        // dispatch(createVoca({
            // word: word.current.value, 
            // pronun: pronuncation.current.value,
            // mean:mean.current.value,
            // example:example.current.value
        //     }));

        dispatch(addVocaFB({
            word: word.current.value, 
            pronun: pronuncation.current.value,
            mean:mean.current.value,
            example:example.current.value
        }))
    }


    return(
        <div>
            <Card>
            <h3 style={{textAlign:"center", backgroundColor:"#d1c4e9", padding:"10px", borderRadius:"10px",color:"#fff"}}>단어 추가하기</h3>
                <p >WORD</p>
                    <div><input type="text"  ref={word}></input></div>
                <p >PRONUNCATION</p>
                    <input type="text" ref={pronuncation}></input>
                <p >MEAN</p>
                    <input type="text" ref={mean}></input>
                <p >EXAMPLE</p>
                    <input type="text" ref={example}></input>
                <div>
                    <Btn onClick={()=>{
                        addCard();
                        naviagte(`/`);
                    }}> ADD</Btn>
                </div>
            </Card>
        </div>
    )
}

const Card = styled.div`
    border: 2px solid #d1c4e9;
    padding: 30px;
    border-radius: 20px;
    width: 50vw;
    align-items: center;
    margin: 100px auto;
    input {
        border-bottom: 1px solid #7c43bd;
        border-top: none;
        border-left: none;
        border-right: none;
        height: 30px;
        width: 100%;
    }
    & input:focus{
        outline: #7c43bd;
    }
    div{
        margin-top: 20px;
        text-align: center;
    }
`

const Btn = styled.button`
    background-color: #7c43bd;
    color: white;
    padding: 15px;
    border-radius: 20px;
    margin-top: 20px;
    width: 100px;
    &:hover{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
        -webkit-transform: scale(1.01); 
        -moz-transform: scale(1.01); 
        -ms-transform: scale(1.01); 
        -o-transform: scale(1.01); 
        transform: scale(1.01);
    }
`

export default MyVocaWirte