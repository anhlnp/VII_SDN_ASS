import React from 'react';
import styled from 'styled-components';

// Fixed position footer
const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 15px 30px;
  text-align: center;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000; /* Ensures footer is above content */
`;

const FooterText = styled.p`
  font-size: 1em;
  margin: 0;

  a {
    color: #f1c40f;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        &copy; {new Date().getFullYear()} <a href="/">PAQuiz</a>. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
