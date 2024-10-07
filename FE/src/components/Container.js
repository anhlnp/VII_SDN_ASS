import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 60px; /* Adjust for header and footer heights */
  overflow-y: auto; /* Enable vertical scrolling */
  height: calc(100vh - 140px); /* Adjust height for header (80px) and footer (60px) */

  /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;
`;

export default Container;
