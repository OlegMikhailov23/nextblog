import Head from 'next/head'

import styled from 'styled-components'
import Navbar from "../components/navbar";
import Link from "next/link";

const Wrapper = styled.div`
background: #eef5ff;
min-height: 100vh;
width: 100%;
`

const PostsWrapper = styled.div`
display: flex;
flex-wrap: wrap;
column-gap: 30px;
`

const Post = styled.a`
width: 350px;
height: 270px;
border-radius: 15px;
margin-top: 50px;
position: relative;
cursor: pointer;
background-image: url("${props => props.bgImage}");
background-position: center;
background-size: 100% 100%;
:hover {
transform: scale(1.1);
transition: 0.2s ease-in-out;
}
`

const PostTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  
  padding: 15px 20px;
  color: #0070f3;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  border-radius: 5px;
`


export default function Home({posts}) {
    if (!posts) {
        return (
            <Wrapper>
                <div className="container">
                    <b>Loading...</b>
                </div>
            </Wrapper>
        )
    }
    return (
        <div>
            <Head>
                <title>Next Blog | All Posts </title>
            </Head>
            <Navbar/>
            <Wrapper>
                <div className="container">
                    <PostsWrapper>
                        {posts.map((post, id) => {
                            return (
                                <Link href={'/post/[id]'} as={`/post/${post._id}`} key = {id}>
                                    <Post bgImage={post.imgUrl}>
                                        <PostTitle>{post.title}</PostTitle>
                                    </Post>
                                </Link>
                            )
                        })
                        }

                    </PostsWrapper>
                </div>
            </Wrapper>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:8000/api/post`)
    const posts = await res.json()

    if (!posts) {
        return {
            notFound: true,
        }
    }

    return {
        props: {posts},
    }
}
