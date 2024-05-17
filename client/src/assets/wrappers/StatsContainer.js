import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    padding: 2rem;
  }

  @media (min-width: 1120px) {
    padding: 3rem;
  }
`;

export default Wrapper;
