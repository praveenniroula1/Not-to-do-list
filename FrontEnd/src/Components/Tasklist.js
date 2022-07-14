import React from "react";
import { Form, Table, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export const TaskList = ({
  title,
  arrow,
  list = [],
  switchTask,
  HandleOnCheck,
  ids,
  name,
}) => {
  return (
    <div className="mt-3">
      <h2 className="text-center ">{title}</h2>
      <div className="table">
        <Table striped>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  value={name}
                  onChange={HandleOnCheck}
                />
              </th>
              <th>Task</th>
              <th>Hour</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, i) => (
              <tr>
                <td>
                  <Form.Check
                    value={item._id}
                    type="checkbox"
                    checked={ids.includes(item._id)}
                    onChange={HandleOnCheck}
                  />
                </td>
                <td>{item.task}</td>
                <td>{item.hr} HRS</td>
                <td>
                  {arrow === "right" ? (
                    <Button
                      onClick={() => switchTask(item._id, "bad")}
                      variant="success"
                    >
                      <i class="fa-solid fa-arrow-right"></i>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => switchTask(item._id, "entry")}
                      variant="danger"
                    >
                      <i class="fa-solid fa-arrow-left"></i>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
