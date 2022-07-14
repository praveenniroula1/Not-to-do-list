import express from "express";
import {
  deleteTaskById,
  getSingleTasks,
  getTasks,
  insertTask,
  updateTask,
  deleteTaskMany,
} from "../model/task/taskModel.js";
const router = express.Router();

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const result = _id ? await getSingleTasks(_id) : await getTasks();
    res.json({
      status: "success", //either success or error
      message: "you hit the root url get endpoint.",
      result,
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await insertTask(req.body);
    console.log(result);
    result?.id
      ? res.json({
          status: "success", //either success or error
          message: "New Task Added",
        })
      : res.json({
          status: "success", //either success or error
          message: "Sorry, Cannot add",
        });
  } catch (error) {
    next(error);
  }
});
router.patch("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { _id, type } = req.body;
    const result = await updateTask(_id, type);
    console.log(result);
    res.json({
      status: "success", //either success or error
      message: "reurn from patch method",
      result,
    });
  } catch (error) {
    next(error);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    const IDS = req.body;
    // const result = await deleteTaskById(_id);
    const result = await deleteTaskMany(IDS);
    console.log(result);
    res.json({
      status: "success", //either success or error
      message: "The selected item has been deleted",
    });
  } catch (error) {
    next(error);
  }
});
export default router;
