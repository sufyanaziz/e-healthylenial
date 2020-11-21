import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/storage";
import FlashMessage from "../../components/flash/FlashMessage";

const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [tanggal_lahir, setTanggal_lahir] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { register, user, clearError, unsetFlashMessage } = useContext(Context);

  useEffect(() => {
    document.title = "Register - HealthyLenial";
    clearError();
  }, []);

  useEffect(() => {
    if (Object.keys(user.errors).length === 0) {
      setErrors({});
    } else {
      setErrors(user.errors);
    }
  }, [user.errors]);

  const onSubmitRegister = e => {
    e.preventDefault();
    const data = {
      name,
      username,
      password,
      tanggal_lahir,
    };
    register({ data, history });
  };

  const onChangeName = e => {
    setName(e.target.value);
  };
  const onChangeUsername = e => {
    setUsername(e.target.value);
    errors.username = "";
  };
  const onChangeTanggalLahir = e => {
    setTanggal_lahir(e.target.value);
  };
  const onChangePassword = e => {
    const input = e.target.value;
    setPassword(input);
    if (input.length === 0 || input.length >= 6) errors.password = "";
    else if (input.length < 6)
      errors.password = "You have to enter at least 6 digit!";
  };
  const onChangeConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };

  const validation = () => {
    let errors = {};
    if (name.trim() === "") errors.name = true;
    if (username.trim() === "") errors.username = true;
    if (tanggal_lahir.trim() === "") errors.tanggal_lahir = true;
    if (password.trim() === "") errors.password = true;
    else if (password.length < 6) errors.password = true;
    else if (password !== confirmPassword) errors.password = true;

    return { valid: Object.keys(errors).length === 0 ? true : false, errors };
  };

  const objFlashMsg = () => {
    return Object.keys(user.flash).length === 0 ? false : true;
  };

  return (
    <RegisterContainer disabled={validation().valid === false ? true : false}>
      <div className="register-card">
        <AccountCircleIcon className="icon" />
        <div className="register-card-header">
          <h1>Register</h1>
        </div>
        {objFlashMsg() === true && (
          <FlashMessage
            message={user.flash.msg}
            status={user.flash.status}
            onClick={unsetFlashMessage}
          />
        )}
        <form className="register-card-main" onSubmit={onSubmitRegister}>
          <div className="name">
            <small>Name</small>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={onChangeName}
            />
          </div>
          <div className="username">
            <small>Username</small>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={onChangeUsername}
            />
            <h6 className="error-msg">{errors.username && errors.username}</h6>
          </div>
          <div className="ttl">
            <small>Tanggal Lahir</small>
            <input
              type="date"
              placeholder="Tanggal Lahir"
              value={tanggal_lahir}
              onChange={onChangeTanggalLahir}
            />
          </div>
          <div className="password">
            <small>Password</small>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
            <h6 className="error-msg">{errors.password && errors.password}</h6>
          </div>
          <div className="re-password">
            <small>Confirm Password</small>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
            />
          </div>
          <button
            type="submit"
            disabled={validation().valid === false ? true : false}
          >
            register
          </button>
          <p>
            Back To <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to right, #8abf9c 50%, #fff 50%);
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    padding: 10px 5px;
  }

  button {
    width: 50%;
    padding: 10px 0;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    background: ${props => (props.disabled ? "gray" : "#025930")};
    color: white;
    border: transparent;
    margin: 5px 0;
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
    color: #025930;
  }
  a:hover {
    text-decoration: underline;
  }

  .error-msg {
    color: red;
    text-align: left;
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 400;
  }

  .register-card {
    background: white;
    width: 40%;
    height: auto;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px 3rem;
    position: relative;
    text-align: center;
    margin-top: 20px;
  }

  .icon {
    position: absolute;
    top: -50px;
    font-size: 6rem;
    color: #025930;
  }

  .register-card-header {
    margin-top: 2rem;
    color: #025930;
    margin-bottom: 10px;
  }

  .register-card-main {
    width: 100%;
  }
  .register-card-main .name,
  .register-card-main .username,
  .register-card-main .ttl,
  .register-card-main .password,
  .register-card-main .re-password {
    margin-bottom: 5px;
    text-align: left;
  }
`;

export default Register;
