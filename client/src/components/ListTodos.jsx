import React, { useState, useEffect, Fragment } from "react";
import "./CompStyle.css";
const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(`Error Deleting Todo: ${error}`);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json(); // Parser
      setTodos(jsonData);
    } catch (error) {
      console.log(`Error Getting Todo: ${error}`);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="Table-wrapper">
      <Fragment>
        <table className="table table-striped text-center px-0">
          <thead>
            <tr>
              <th></th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <button className="btn btn-success">Done</button>
                </td>
                <td className="align-middle">{todo.description}</td>
                <td className="align-middle">
                  <button className="btn btn-warning">Edit</button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    </div>
  );
};

export default ListTodos;