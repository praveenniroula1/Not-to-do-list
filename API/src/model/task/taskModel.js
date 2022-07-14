import taskSchema from "./taskSchema.js";

// insert query
export const insertTask = (taskObj) => {
  return taskSchema(taskObj).save();
};
// select
export const getTasks = () => {
  return taskSchema.find();
};
export const getSingleTasks = (_id) => {
  return taskSchema.findById(_id);
};
// update
export const updateTask = (_id, type) => {
  return taskSchema.findByIdAndUpdate(
    _id,
    {
      type,
    },
    { new: true }
  );
};
// deleteSIngleby Id
export const deleteTaskById = (_id) => {
  return taskSchema.findByIdAndDelete(_id);
};

// delete many from the array
export const deleteTaskMany = (IDS) => {
  return taskSchema.deleteMany({
    _id: {
      $in: IDS,
    },
  });
};
