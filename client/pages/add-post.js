import React from 'react';
import Head from "next/head";
import Navbar from "../components/navbar";
import styled from "styled-components";
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/router";

const Wrapper = styled.div`
background: #d7e6fc;
min-height: 100vh;
width: 100%;
`

const BackBtn = styled.a`
  display: block;
  max-width: 150px;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  
  padding: 15px 20px;
  color: #0070f3;
  position: absolute;
  left: 5%;
  top: 10%;
  background: #E5E4E4;
  border: 1px solid #0070f3;
  border-radius: 5px;
  cursor: pointer;
  :hover {
  }
transform: scale(1.1);
transition: 0.2s ease-in-out;
  box-shadow: 0 0 15px #000000;
`

const FormWrapper = styled.div`
margin-top: 10%;
display: flex;
justify-content: center;
align-items: center;
`

const Form = styled.form`
background: #ffffff;
border-radius: 15px;
padding: 1rem;
max-width: 500px;
width: 100%;
`

const InputField = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 15px;
`

const Input = styled.input`
width: 100%;
display: flex;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 5px;
outline: none;
padding: 0.5rem;
margin-bottom: 1rem;
`

const TextLabel = styled.div`
font-style: normal;
font-weight: 300;
font-size: 1rem;
line-height: 21px;

margin-bottom: 0.5rem;
color: #222222;
`

const TextArea = styled.textarea`
width: 100%;
min-height: 150px;
display: flex;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 5px;
outline: none;
padding: 0.5rem;
resize: none;
margin-bottom: 1rem;
`


const FormBtn = styled.button`
  display: block;
  margin: 0 auto;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  text-align: center;
  padding: 0.5rem;
  
  color: #ffffff;
  background: #67bfff;
  border-radius: 10px;
  width: 170px;
  min-height: 25px;
  cursor: pointer;
  border: none;
  :hover {
  transition: ease-in-out 0.2s;
  color: #eaeaea;
  background-color: #0070f3;
  }
`


const AddPost = () => {
    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');
    const [imgUrl, setImgUrl] = React.useState('');
    const router = useRouter();

    const addPost = async () => {
        try {
            await axios.post('http://localhost:8000/api/post/add',
                {title,text, imgUrl})
                .then(() => {
                    router.push('/');
                })
        } catch (e){
        }
    }

    return (
        <Wrapper>
            <Head>
                <title>Next Blog | Create Post</title>
            </Head>
            <Navbar/>
            <div className="container">
                <Link href={'/'}><BackBtn>Go Back</BackBtn></Link>
                <FormWrapper>
                    <Form onSubmit = {(e) => e.preventDefault()}>
                        <InputField>
                            <TextLabel>Название статьи:</TextLabel>
                            <Input onChange={(e) => setTitle(e.target.value)}/>
                            <TextLabel>Текст статьи:</TextLabel>
                            <TextArea onChange={(e) => setText(e.target.value)}/>
                            <TextLabel>Картинка статьи:</TextLabel>
                            <Input onChange={(e) => setImgUrl(e.target.value)}/>
                        </InputField>
                        <FormBtn onClick={addPost}>Добавить</FormBtn>
                    </Form>
                </FormWrapper>
            </div>
        </Wrapper>
    )
}

export default AddPost;
