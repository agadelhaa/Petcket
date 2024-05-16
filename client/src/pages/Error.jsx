import { Link, useRouteError } from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage"
import img from "../assets/images/not-found.svg"

const Error = () => {
  const error = useRouteError();
  
  if (error.status === 404) {
    return(
      <Wrapper>
        <img src={img} alt= 'not found'/>
        <h3>Página não encontrada</h3>
        <p>Não conseguimos encontrar a página que você está procurando</p>
        <Link to="/" className="btn"> Back home </Link>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
    <h3> Algo deu errado...</h3>
    <Link to="/" className="btn"> Back Home </Link>

    </Wrapper>
  )
}



export default Error