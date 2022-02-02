import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const MyVocaEdit = (props) =>{
    const naviagte= useNavigate();
    const params = useParams();

    const word = React.useRef(null);
    const pronuncation = React.useRef(null);
    const mean = React.useRef(null);
    const example = React.useRef(null); 

    //state는 리덕스에서 왔는데 전체 데이터를 전부 받아와서 거기서 필터를 돌려서 하나만 잘라옴
    //useSelector는 리덕스에서 데이터를 받아오기 때문에 state는자식들끼리 공유
    const voca_list = useSelector((state)=> state.voca.list.filter(voca =>voca.id === params.id))

    return(
        <div>
            <Card>
            <h3 style={{textAlign:"center", backgroundColor:"#d1c4e9", padding:"10px", borderRadius:"10px",color:"#fff"}}>단어 수정하기</h3>
                <p style={{color:"#383839"}}>WORD</p>
                    <div><input type="text"  ref={word} defaultValue={voca_list[0].word}></input></div>
                <p style={{color:"#383839"}}>PRONUNCATION</p>
                    <input type="text" ref={pronuncation} defaultValue={voca_list[0].pronun}></input>
                <p style={{color:"#383839"}}>MEAN</p>
                    <input type="text" ref={mean} defaultValue={voca_list[0].mean}></input>
                <p style={{color:"#383839"}}>EXAMPLE</p>
                    <input type="text" ref={example} defaultValue={voca_list[0].example}></input>
                <div>
                    <Btn onClick={()=>{
                        naviagte(`/`);
                    }}> EDIT</Btn>
                </div>
            </Card>
        </div>
    )
}

const Card = styled.div`
    border: 2px solid #d1c4e9;
    padding: 30px;
    border-radius: 20px;
    width: 30vw;
    align-items: center;
    margin: 100px auto;
    font-size: 25px;
    input {
        border: none;
        border-bottom: 1px solid #7c43bd;
        height: 30px;
        width: 100%;
        font-size: 23px;
        color: #9975da;
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
    border: none;
    border-radius: 20px;
    margin-top: 20px;
    width: 200px;
    font-size: 15px;
    &:hover{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
        -webkit-transform: scale(1.01); 
        -moz-transform: scale(1.01); 
        -ms-transform: scale(1.01); 
        -o-transform: scale(1.01); 
        transform: scale(1.01);
    }
`

export default MyVocaEdit;
