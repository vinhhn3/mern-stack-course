const getGoals = (req, res) => {
  res.json({ message: "Get Goals" });
};

const setGoal = (req, res) => {
  res.status(200).json({ message: "Set goal" });
};
const updateGoal = (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
};
const deleteGoal = (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
};

module.exports = { getGoals, setGoal, updateGoal, deleteGoal };
