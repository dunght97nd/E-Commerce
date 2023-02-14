import express from "express";
import {
  deleteUser,
  findUser,
  getUser,
  getUserStats,
  updateUser,
} from "../controllers/user.js";
import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = express.Router();

//Update
router.put("/:id", verifyTokenAndAuth, updateUser);

//Delete
router.delete("/:id", verifyTokenAndAuth, deleteUser);

//Get user
router.get("/find/:id", verifyTokenAndAdmin, findUser);

//Get users
router.get("/", verifyTokenAndAdmin, getUser);

//Get user stats
router.get("/stats", verifyTokenAndAdmin, getUserStats);

export default router;
