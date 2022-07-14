import "./App.css";
import { Container, Button, Form } from "react-bootstrap";
import { TaskForm } from "./Components/TaskForm";
import { ListArea } from "./Components/ListArea";
import react, { useState, useEffect } from "react";
import {
  deleteServerTask,
  fetchTasks,
  postTask,
  switchServerTask,
} from "./helpers/axiosHelper";

const wklyHrs = 7 * 24;
function App() {
  const [taskList, settaskList] = useState([]);

  const [ids, setIds] = useState([]);

  useEffect(() => {
    getTaskFromServer();
  }, []);
  const getTaskFromServer = async () => {
    const data = await fetchTasks();
    console.log(data);
    data.status === "success" && settaskList(data.result);
  };

  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const addTask = async (task) => {
    if (total + +task.hr > wklyHrs)
      return alert(
        "sorry Sir, you dont have enough time left to fit this task."
      );
    // settaskList([...taskList, task]);
    const result = await postTask(task);
    result.status === "success" && getTaskFromServer();
  };

  const switchTask = async (_id, type) => {
    const data = await switchServerTask({ _id, type });

    data.status === "success" && getTaskFromServer();
  };

  const HandleOnCheck = (e) => {
    const { checked, value, name } = e.target;
    console.log(checked, value, name);
    if (value === "entry" || value === "bad") {
      // console.log(taskList);
      let toDeletIDS = [];
      taskList.forEach((item) => {
        if (item.type === value) {
          toDeletIDS.push(item._id);
        }
        // console.log(toDeletIDS);
      });
      if (checked) {
        setIds([...ids, ...toDeletIDS]);
      } else {
        // console.log("remove");
        const tempArg = ids.filter((_id) => !toDeletIDS.includes(_id));
        setIds(tempArg);
      }
      // console.log(ids);
      return;
    }
    if (checked) {
      setIds([...ids, value]);
    } else {
      const filteredArg = ids.filter((id) => id !== value);
      setIds(filteredArg);
    }
  };

  const handleOnDelete = async () => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }
    const data = await deleteServerTask(ids);
    // console.log(data);
    if (data.status === "success") {
      getTaskFromServer();
      setIds([]);
    }
    // console.log(ids);
  };
  // console.log(ids);
  return (
    <div className="wrapper">
      <Container>
        <h1 className="text-center py-5">My to do list</h1>
        <TaskForm addTask={addTask} />
        <ListArea
          taskList={taskList}
          switchTask={switchTask}
          total={total}
          HandleOnCheck={HandleOnCheck}
          ids={ids}
        />
        <div className="mt-3">
          {ids.length > 0 && (
            <Button onClick={handleOnDelete} variant="dark">
              <i class="fa-solid fa-trash"></i> Delete Selected Tasks
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
