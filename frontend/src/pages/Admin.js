import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => (state = state.goals)
  );

  useEffect(() => {
    if (!user || user.role === "user") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Welcome {user && user.name}</h1>
    </div>
  );
};

export default Admin;
