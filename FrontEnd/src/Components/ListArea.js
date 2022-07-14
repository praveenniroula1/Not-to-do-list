import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { TaskList } from "./Tasklist";

export const ListArea = ({
  taskList,
  switchTask,
  total,
  HandleOnCheck,
  ids,
}) => {
  console.log(taskList);
  const entryList = taskList.filter(({ type }) => type === "entry");
  const badList = taskList.filter(({ type }) => type === "bad");
  const badHrs = badList.reduce((acc, item) => acc + +item.hr, 0);
  return (
    <div className="list-area">
      <Row>
        <Col>
          <TaskList
            title="Entry List"
            name="entry"
            arrow="right"
            list={entryList}
            switchTask={switchTask}
            HandleOnCheck={HandleOnCheck}
            ids={ids}
          />
        </Col>
        <Col>
          <TaskList
            title="Bad List"
            name="bad"
            list={badList}
            switchTask={switchTask}
            ids={ids}
            HandleOnCheck={HandleOnCheck}
          />
          <div className=".text-end text-danger fw-bold">
            {" "}
            You Could have saved {badHrs} Hrs.
          </div>
        </Col>
      </Row>
      <div className="fw-bold">Total Time Allocated is {total} Hrs/Week.</div>
    </div>
  );
};
