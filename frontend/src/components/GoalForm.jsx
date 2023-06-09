import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal, getMyGoals } from "../features/goals/goalSlice";

const GoalForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createGoal({ text }));
    setText("");
    dispatch(getMyGoals());
  };
  return (
    <>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Goal</label>
            <input
              id="text"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Add Goal</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default GoalForm;
