import styled, { css } from 'styled-components';

// Styled component with multiple styles based on props
const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1em;
  margin-top: 10px;
  transition: background-color 0.3s, box-shadow 0.3s;
  margin: 2px;

  // Default style (e.g., Confirm/Submit)
  background-color: #333;
  color: #fff;

  &:hover {
    background-color: #555;
  }

  &:active {
    background-color: #222;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) inset;
  }

  // Style variants
  ${({ variant }) =>
    variant === 'cancel' &&
    css`
      background-color: #dc3545;
      &:hover {
        background-color: #c82333;
      }
      &:active {
        background-color: #bd2130;
      }
    `}

  ${({ variant }) =>
    variant === 'delete' &&
    css`
      background-color: #ff4444;
      &:hover {
        background-color: #ff1c1c;
      }
      &:active {
        background-color: #d41414;
      }
    `}

  ${({ variant }) =>
    variant === 'confirm' &&
    css`
      background-color: #28a745;
      &:hover {
        background-color: #218838;
      }
      &:active {
        background-color: #1e7e34;
      }
    `}

  ${({ variant }) =>
    variant === 'submit' &&
    css`
      background-color: #333;
      &:hover {
        background-color: #555;
      }
      &:active {
        background-color: #222;
      }
    `}
`;

// Button component that accepts type and variant props
const Button = ({ children, onClick, type = "button", style, variant = "submit" }) => (
  <StyledButton onClick={onClick} type={type} style={style} variant={variant}>
    {children}
  </StyledButton>
);

export default Button;



// // Render different button variants
// const App = () => (
//   <div>
//     <Button onClick={() => alert('Submit button clicked')} variant="submit">
//       Submit
//     </Button>
    
//     <Button onClick={() => alert('Cancel button clicked')} variant="cancel">
//       Cancel
//     </Button>
    
//     <Button onClick={() => alert('Delete button clicked')} variant="delete">
//       Delete
//     </Button>
    
//     <Button onClick={() => alert('Confirm button clicked')} variant="confirm">
//       Confirm
//     </Button>
//   </div>
// );


