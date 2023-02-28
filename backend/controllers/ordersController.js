import db from "../db.js";
// import { ObjectId } from "mongodb";
import asyncHandler from "express-async-handler";
// import { generateItem } from "../utils/functions.js";
const orderItems = db.collection("orders");

// export const createOrderItems = asyncHandler(async (req, res) => {
//   const arrObj = [];

//   const type = ["EDF", "CAO", "SFO"];

//   const itemId = generateItem(9);
//   const orderId = generateItem(12);

//   for (let i = 0; i <= 12; i++) {
//     const obj = {
//       order: orderId,
//       item: itemId,
//       type: type[1],
//       category: "12 Furnitures",
//       description: "Cather furnix 10-in-1, 8 Quart XL",
//     };

//     arrObj.push(obj);
//   }

//   const orders = arrObj;

//   const results = await orderItems.insertMany(orders);

//   return res.status(201).json({
//     status: "success",
//     results,
//   });
// });

export const getOrderItems = asyncHandler(async (req, res) => {
  let filter = {};

  // console.log(req.body);
  // const limit = req.query.limit * 1 || 20;

  const items = [];
  let orderItemsList = [];

  let queryItems = [];

  if (req.body?.item) {
    queryItems.push({ item: { $in: req.body.item } });
  }

  if (req.body?.type) {
    queryItems.push({ type: { $in: req.body.type } });
  }

  if (req.body?.order) {
    queryItems.push({ order: { $in: req.body.order } });
  }

  if (queryItems.length > 0) {
    filter = { $or: queryItems };
  }

  orderItemsList = await orderItems.find(filter);
  // .limit(limit);

  await orderItemsList.forEach((item) => items.push(item));

  res.status(200).json({
    status: "success",
    data: items,
    total: items.length,
  });
});
