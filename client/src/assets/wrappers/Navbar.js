import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);

  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 12px;
  }

  .logo {
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px; /* Adjust the height as needed */
    margin-right: 8px;
  }

  h3 {
    color: #ff9f1c;
  }

  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  /* .logo-text {
    display: none;
  } */

  .btn-container {
    display: flex;
    align-items: center;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: flex;
    }
    .logo-text {
      display: block;
    }
  }
`;

export default Wrapper;
