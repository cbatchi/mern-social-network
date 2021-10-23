import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.4rem;
    background: ${({ theme }) => theme.six} ;
    color: ${({ theme }) => theme.three};

  }

  a {
    text-decoration: none;
    color: inherit;
  }
  a, a:visited {
    color: ${({ theme }) => theme.second};
  }

  li {
    list-style: none;
  }

  input,
  textarea {
    resize: none;
    border-radius: 20px;
    width: 270px;
    background: ${({ theme }) => theme.six};
  }
  textarea {
    &:focus {
      box-shadow: 0 0 4px rgba(0, 22, 44, 0.1);
    }
  }

  button,
  input[type="submit"] {
    background: ${({ theme }) => theme.second};
    color: ${({ theme }) => theme.first};
    cursor: pointer;
    transition: 0.2s;
    margin: 0;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1.1rem;
    border-radius: 20px 6px 20px 20px;

    &:hover {
      background: ${({ theme }) => theme.first};
      color: ${({ theme }) => theme.second};
    }
  }
  input[type="checkbox"] {
    box-shadow: none;
    width: 20px;
    margin: 10px 0;
  }
  i {
    transition: 0.15s;

    &:hover {
      transform: scale(1.1);
    }
  }

`;
