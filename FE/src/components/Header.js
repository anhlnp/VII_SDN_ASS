import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

// Fixed position header
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 15px 30px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensures header is above content */
`;

// Navigation container for alignment
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 100px;
`;

const Logo = styled.h1`
  font-size: 2em;
  margin: 0;
`;

const NavLinks = styled.div`
  a {
    margin: 0 15px;
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
    cursor: pointer;
    &:hover {
      color: #f1c40f;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <NavContainer>
        <Logo>PAQuiz</Logo>
        <NavLinks>
          {/* Use Link components for client-side navigation */}
          <Link to="/">Home</Link>
          <Link to="/quizzes">Quizzes</Link>
          <Link to="/questions">Questions</Link>
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
