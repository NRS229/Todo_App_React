import React from "react";
import { render } from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

let id = 0;

const Todo = props => (
  <li className="list-group-item">
    <input
      type="checkbox"
      checked={props.todo.checked}
      onChange={props.onToggle}
    />

    <label>{props.todo.text}</label>
    <button className="delete-button btn btn-dark" onClick={props.onDelete}>
      Delete
    </button>
  </li>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  addTodo() {
    const text = prompt("Enter the name of the todo");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }]
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) {
          return todo;
        } else {
          return {
            id: todo.id,
            text: todo.text,
            checked: !todo.checked
          };
        }
      })
    });
  }

  render() {
    return (
      <div className="container white-container">
        <h2>This is my todo app using React Native</h2>
        <div className="container grey-container">
          <div class="row">
            <div class="col-sm">
              <h5>Total todos: {this.state.todos.length}</h5>
              <h5>
                Unchecked todos:{" "}
                {this.state.todos.filter(todo => !todo.checked).length}
              </h5>
              <h5>
                Checked todos:{" "}
                {this.state.todos.filter(todo => todo.checked).length}
              </h5>
              <button className="btn btn-dark" onClick={() => this.addTodo()}>
                Add a todo
              </button>
            </div>
            <div class="col-sm">
              <ul className="list-group">
                {this.state.todos.map(todo => (
                  <Todo
                    onToggle={() => this.toggleTodo(todo.id)}
                    onDelete={() => this.removeTodo(todo.id)}
                    todo={todo}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p>
          Made by Noah Rodriguez - CS50's Mobile App Development with React
          Native
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
