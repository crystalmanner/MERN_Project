import Router from "koa-router";
import { forEach, map } from "p-iteration";
const mongoose = require("mongoose");
import models from "../models/models";
import {updateData} from '../../data/update-data';
import { UpdateInput } from "data/InputData";
const fs = require("fs");

const router = new Router({
  prefix: "/update",
});

router.post("/", async (ctx, next) => {
  const updatedValue = await update(updateData as UpdateInput)
  ctx.body = updatedValue;
});

export const update = async (obj: UpdateInput) => {
  const mongooseModel = mongoose.model(obj.model)
  const updatedValue = await mongooseModel.findByIdAndUpdate(
    { _id: obj.where.id },
    obj.data,
    {
      new: true
    }
  );
  return updatedValue;
}

export default router;
