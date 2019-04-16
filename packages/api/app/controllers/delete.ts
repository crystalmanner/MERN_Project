import Router from "koa-router";
import models from "../models/models";
import {deleteData} from '../../data/delete-data'
import { DeleteInput } from "../../data/InputData";
const fs = require("fs");
const router = new Router({
  prefix: "/delete",
});

// For testing purpose; getting the restaurant datas
router.get("/get", async (ctx, next) => {
  const data = await models["Restaurant"].find({});
  ctx.body = data;
});

router.post("/", async (ctx, next) => {
  const deletedData = await deleteById(deleteData as DeleteInput);
  ctx.body = deletedData;
});
export const deleteById = async (obj: DeleteInput) => {
  const mongooseModel = models[obj.model];
  const data = await mongooseModel.deleteOne({ _id: obj.where.id });
  return data;
}
export default router;
