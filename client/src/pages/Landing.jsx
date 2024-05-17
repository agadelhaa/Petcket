import { Link } from "react-router-dom";
import styled from "styled-components";
import main from "../assets/images/main.svg";
import "../assets/css/index.css";
import { Logotipo } from "../assets/components";
import main2 from '../assets/images/main2.svg'


const Landing = () => {
  return (
    <Wrapper>

      <div className="page">
        <nav>
          <Logotipo />
        </nav>
        <div className="content">
          <div>
            <img src={main} alt="cat and dog" />
          </div>
          <div className="text">
            <h2>
              Bem-vindo ao <span>Petcket</span>,
            </h2>
            <p>
              A pocket wallet ideal para administar os gastos alimentares do seu
              pet!{" "}
            </p>
            <div className="btns">
              <Link to="/register" className="btn">
                Registrar
              </Link>
              <Link to="/login" className="btn">
                Entrar
              </Link>
            </div>
            <div>
              <img src={main2} alt="graphics" className="graphic" />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
    width: 32%;
    height: 44px;
    min-width: 40px;
    text-align: center;
  }
  .btnRegister {
    border-radius: 4px;
    border: 2px solid #2ec4b6;
    padding: 0.6em 2.4em;
    font-size: 1em;
    font-weight: 500;
    background-color: #f1f5f9;
    color: #2ec4b6;
    cursor: pointer;
    transition: background-color 0.25s;
    margin-bottom: 32px;
    width: 32%;
    height: 44px;
    min-width: 40px;
    text-align: center;
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
    width: 100%;
    justify-content: space-evenly;
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
  .graphic {
    height: 200px;
    margin-top: 16px;
  }
`;

export default Landing;
