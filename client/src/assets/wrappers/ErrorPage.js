import styled from 'styled-components';

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }
  a {
    text-transform: capitalize;
  }
  .btn {
    border-radius: 4px;
    border: 1px solid transparent;
    padding: 0.6em 2.4em;
    font-size: 1em;
    font-weight: 500;
    background-color: #2ec4b6;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.25s;
    margin-bottom: 32px;
  }
`;

export default Wrapper;
