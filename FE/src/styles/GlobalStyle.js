import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    
  }
  
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Arial, sans-serif;
  }

  #root {
    min-height: 100vh; /* Ensure the root element takes up full height */
    display: flex;
    flex-direction: column;
    overflow: hidden
  }
`;

export default GlobalStyle;
