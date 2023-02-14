import express from "express";

import {
  createOrder,
  deleteOrder,
  findOrder,
  getOrder,
  getOrderInCome,
  updateOrder,
} from "../controllers/order.js";

import {
  verifyToken,
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} from "./verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyToken, createOrder);

//Update
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//Delete
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//Get User Orders
router.get("/find/:userId", verifyTokenAndAuth, findOrder);

//Get all Order
router.get("/", verifyTokenAndAdmin, getOrder);

//Get Monthly Order
router.get("/income", verifyTokenAndAdmin, getOrderInCome);

export default router;
