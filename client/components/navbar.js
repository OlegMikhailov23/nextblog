import styled from 'styled-components';
import Link from "next/link";

const Nav = styled.nav`
    background: #fefefe;
    padding: 17px 0;
`

const NavItem = styled.div`
  position: relative;
`

const Logo = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #3260a1;
  cursor: pointer;
`

const AddPostBtn = styled.a`
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  text-align: center;
  padding: 0.5rem;
  
  color: #ffffff;
  background: #67bfff;
  border-radius: 10px;
  box-shadow: 0 0 5px #000000;
  position: absolute;
  width: 170px;
  min-height: 25px;
  left: calc(50% - 70px);
  top: 25px;
  cursor: pointer;
`


const Navbar = () => {
    return (
        <Nav>
            <div className="container">
                <NavItem>
                    <Link href={'/'}>
                    <Logo>Next | Blog</Logo>
                    </Link>
                    <Link href={'/add-post'}><AddPostBtn>Add article</AddPostBtn></Link>
                </NavItem>
            </div>
        </Nav>
    )
}

export default Navbar;
