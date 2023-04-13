import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/goals/";

const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

const getMyGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const getAllGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}all`, config);

  return response.data;
};

const goalService = {
  createGoal,
  getMyGoals,
  getAllGoals,
};

export default goalService;
