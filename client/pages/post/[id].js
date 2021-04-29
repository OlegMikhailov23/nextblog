import Head from "next/head";
import Navbar from "../../components/navbar";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/router";

const Wrapper = styled.div`
background: #d7e6fc;
min-height: 100vh;
width: 100%;
`

const PostWrapper = styled.div`
position: relative;
display: flex;
width: 80%;
margin: 0 auto;
background-color: #ffffff;
padding: 1rem;
border-radius: 15px;
margin-top: 7rem;
`

const PostItem = styled.div`
display: flex;
flex-direction: column;
flex: 0 0 50%;
justify-content: center;
padding: 2rem;
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
  transform: scale(1.1);
  transition: 0.2s ease-in-out;
  box-shadow: 0 0 15px #000000;
  }
`
const PostTitle = styled.h1`
font-weight: 500;
font-size: 1.5rem;
line-height: 110%;
color: #0070f3;
margin-bottom: 25px;
`

const PostText = styled.p`
   font-weight: 300;
   font-size: 1rem;
   line-height: 110%;
   color: #000000;
`

const RemovePostBtn = styled.a`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  text-align: center;
  padding: 0.5rem;
  position: absolute;
  color: #ffffff;
  background: #e71131;
  border-radius: 10px;
  box-shadow: 0 0 5px #000000;
  width: 170px;
  min-height: 25px;
  left: calc(50% - 70px);
  bottom: -15px;
  cursor: pointer;
  :hover {
    transition: 0.3s ease-in-out;
    background-color: #d74157;
  }
`


const Post = ({post}) => {
    const router = useRouter();
    const removeHandler = async () => {
        await axios.post('http://localhost:8000/api/post/remove', {postId: post._id})
            .then(() => {
                router.push('/');
            })
    }


    if (!post) {
        return (
            <Wrapper>
                <div className="container">
                    <b>Loading...</b>
                </div>
            </Wrapper>
        )
    }


    return (
        <Wrapper>
            <Head>
                <title>Next Blog | {post.title}</title>
            </Head>
            <Navbar/>
            <div className="container">
                <Link href={'/'}><BackBtn>Go Back</BackBtn></Link>
                <PostWrapper>
                    <PostItem>
                        <PostTitle>{post.title}</PostTitle>
                        <PostText>{post.text}</PostText>
                    </PostItem>
                    <PostItem>
                        <img src={post.imgUrl} alt={post.title}/>
                    </PostItem>
                    <RemovePostBtn onClick={removeHandler}>Remove Post</RemovePostBtn>
                </PostWrapper>
            </div>

        </Wrapper>
    )
}

export default Post;

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:8000/api/post/${context.query.id}`)
    const post = await res.json()

    if (!post) {
        return {
            notFound: true,
        }
    }
    return {
        props: {post}, // will be passed to the page component as props
    }
}
