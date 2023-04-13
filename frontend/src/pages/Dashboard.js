import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => (state = state.goals)
  );
  const dispatch = useDispatch();

  console.log(goals);

  useEffect(() => {
    if (!user || user.role === "admin") {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
        <GoalForm />
      </section>
    </>
  );
};

export default Dashboard;
