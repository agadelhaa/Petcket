import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
  }
  .logo {
    width: 50px;
    height: 50px;
    margin-right: 8px;
  }
  h3 {
    color: #ff9f1c;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid #2ec4b6;
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
    background-color: #2ec4b6;
  }
  .member-btn {
    color: #ff9f1c;
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;
export default Wrapper;
