import { Link } from "react-router-dom";
import styled from "styled-components";
import main from "../assets/images/main.svg";
import "../assets/css/index.css";
import { Logotipo } from "../assets/components";


const Landing = () => {
  return (
    <Wrapper>
      <div className="page">
        <nav>
          <Logotipo/>
        </nav>
        <div className="content">
          <div>
            <img src={main} alt="cat and dog" />
          </div>
          <div className="text">
            <h2>
              Bem-vindo ao <span>Petcket</span>,
            </h2>
            <p>A pocket wallet ideal para administar os gastos alimentares do seu pet! </p>
            <div className="btns">

            <Link to="/register" className="btnRegister">
              Sign Up
            </Link>
            <Link to="/login" className="btn">
              Sign In
            </Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 50px;
    height: 50px;
    margin-right: 8px;
  }
  h3 {
    color: #ff9f1c;
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
    width: 28%;
    height: 44px;
    min-width: 40px;
  }
  .btnRegister {
    border-radius: 4px;
    border: 2px solid #2ec4b6;
    padding: 0.6em 2.4em;
    font-size: 1em;
    font-weight: 500;
    background-color: ##e2e8f0;
    color: #2ec4b6;
    cursor: pointer;
    transition: background-color 0.25s;
    margin-bottom: 32px;
    width: 28%;
    height: 44px;
    min-width: 40px;
  }
  .content {
    display: flex;
    justify-content: space-evenly;
    margin-top: 32px;
    height: 300px;
    align-items: center;
  }
  .text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btns {
    display: flex;
    /* flex-direction: column; */
    background-color: red;
    width: 100%;
  }
  h2 {
    margin-bottom: 32px;
    span {
      color: #ff9f1c;
    }
  }
  p {
    margin-bottom: 32px;
  }
  img {
    height: 400px;
  }
`;

export default Landing;
