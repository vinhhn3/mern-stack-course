const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
  getAllGoals,
} = require("../controllers/goalController");

const { protect, roleAdmin } = require("../middleware/authMiddleware");

router.get("/", protect, getGoals);
router.get("/all", protect, roleAdmin, getAllGoals);

router.post("/", protect, setGoal);

router.put("/:id", protect, updateGoal);

router.delete("/:id", protect, deleteGoal);

module.exports = router;
