import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => (state = state.auth)
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Must enter email and password");
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }

    if (isLoading) {
      return <Spinner />;
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Login to your account</p>
      </section>
      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter email ..."
              onChange={onChange}
            />
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password ..."
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
