import styled from "styled-components";
import Header from "../../components/header";
import FlashMessage from "../../components/flash/FlashMessage";
import LoadingComponent from "../../components/loading";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/storage";

const PageLogin = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(Context);

  const { login, unsetFlashMessage } = context;
  const { flash, loading } = context.user;

  useEffect(() => {
    document.title = "Login - HealthyLenial";
  }, []);

  console.log("Follow me on instagram: ahmadsufyan_ 🔥");

  const onSubmitLogin = e => {
    e.preventDefault();

    const data = { username, password };

    login({ data, history: props.history });
  };

  const onChangeUsername = e => {
    setUsername(e.target.value);
  };

  const onChangePassword = e => {
    setPassword(e.target.value);
  };

  const btnDissabled = () => {
    return username.trim() === "" || password.trim() === "" ? true : false;
  };

  const objFlashMsg = () => {
    return Object.keys(flash).length === 0 ? false : true;
  };

  return (
    <LoginContainer btnDissabled={btnDissabled()}>
      <div className="login-card">
        <Header />
        <div className="login-card-caption">
          <p>
            membantu menjaga pola hidup <br /> sehat anda
          </p>
        </div>
        <div className="login-card-main">
          <p>Login</p>
          <p>Bagi kamu yang sudah tedaftar, Silahkan Login</p>
          {objFlashMsg() === true && (
            <FlashMessage
              message={flash.msg}
              status={flash.status}
              onClick={unsetFlashMessage}
            />
          )}
          <form className="login-card-input" onSubmit={onSubmitLogin}>
            <div className="username">
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={onChangeUsername}
              />
            </div>
            <div className="password">
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            {loading ? (
              <button>
                <LoadingComponent iconSize={20} color="white" />
              </button>
            ) : (
              <button type="submit" disabled={btnDissabled()}>
                Login
              </button>
            )}
            <p>
              Kamu tidak punya akun? <Link to="/register">Regis disini</Link>
            </p>
          </form>
        </div>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to left, #8abf9c 50%, #fff 50%);
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px 5px;
  }

  button {
    width: 50%;
    padding: 10px 0;
    cursor: ${props => (props.btnDissabled ? "not-allowed" : "pointer")};
    background: ${props => (props.btnDissabled ? "gray" : "#025930")};
    color: white;
    border: transparent;
    margin-bottom: 12px;
    outline: none;
    border-radius: 4px;
  }

  a {
    text-decoration: none;
    color: #025930;
  }
  a:hover {
    text-decoration: underline;
  }

  .login-card {
    width: auto;
    text-align: center;
  }
  .login-card-caption {
    margin-bottom: 1.5rem;
    text-transform: capitalize;
    color: white;
    text-shadow: 0 0 1px black, 0 0 4px black;
    font-size: 1.5rem;
  }

  .login-card-main {
    background: linear-gradient(to right, #8abf9c 50%, #fff 50%);
    height: auto;
    padding: 10px 2rem;
  }
  .login-card-main p {
    margin-bottom: 10px;
  }
  .login-card-main p:nth-child(1) {
    font-weight: bold;
    font-size: 30px;
    color: #025930;
  }
  .login-card-input {
    margin-top: 16px;
  }
  .login-card-input .username,
  .login-card-input .password {
    margin-bottom: 10px;
  }
  input {
    outline: none;
  }
`;

export default PageLogin;
