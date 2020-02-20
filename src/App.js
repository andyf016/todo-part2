import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { BrowserRouter } from "react-router-dom";
import { Route, NavLink } from "react-router-dom";

class App extends Component {
  state = {
    todos: todosList
  };

  handleToggleComplete = (event, todoIdToToggle) => {
    const newTodos = this.state.todos.slice();
    const newnewTodos = newTodos.map(todo => {
      if (todo.id === todoIdToToggle) {
        todo.completed = !todo.completed;
      }

      return todo;
    });
    this.setState({ todos: newnewTodos });
  };

  handleAddTodo = event => {
    if (event.key === "Enter") {
      // hot to create a new todo
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 10000),
        title: event.target.value,
        completed: false
      };

      //update component state to reflect new todo

      //create a copy of the data that you want to update
      const newTodos = this.state.todos.slice();
      //modify the copy
      newTodos.push(newTodo);
      //overwrite the original with the copy
      //this.setState tells reacct that we need to do a re-render

      this.setState({ todos: newTodos });
      event.target.value = "";
    }
  };

  render() {
    return (
      <section className='todoapp'>
        <header className='header'>
          <h1>todos</h1>
          <input
            className='new-todo'
            placeholder='What needs to be done?'
            onKeyDown={this.handleAddTodo}
            autoFocus
          />
        </header>
        <Route
          exact
          path='/'
          render={() => (
            <TodoList
              todos={this.state.todos}
              handleToggleComplete={this.handleToggleComplete}
            />
          )}
        />
        <Route
          path='/active'
          render={() => (
            <TodoList
              todos={this.state.todos.filter(todo => todo.completed === false)}
              handleToggleComplete={this.handleToggleComplete}
            />
          )}
        />

        <Route
          path='/completed'
          render={() => (
            <TodoList
              todos={this.state.todos.filter(todo => todo.completed === true)}
              handleToggleComplete={this.handleToggleComplete}
            />
          )}
        />
        <footer className='footer'>
          {/* <!-- This should be `0 items left` by default --> */}
          <span className='todo-count'>
            <strong>0</strong> item(s) left
          </span>
          <ul className='filters'>
            <li>
              <NavLink exact to='/' activeClassName='selected'>
                All
              </NavLink>
            </li>
            <li>
              <NavLink to='/active' activeClassName='selected'>
                Active
              </NavLink>
            </li>
            <li>
              <NavLink to='/completed' activeClassName='selected'>
                Completed
              </NavLink>
            </li>
          </ul>
          <button className='clear-completed'>Clear completed</button>
        </footer>
      </section>
    );
  }
}
//this.props.handleToggleComplete
class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={this.props.completed}
            onChange={this.props.handleToggleComplete}
          />
          <label>{this.props.title}</label>
          <button className='destroy' />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className='main'>
        <ul className='todo-list'>
          {this.props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              // id = {todo.id}
              handleToggleComplete={event =>
                this.props.handleToggleComplete(event, todo.id)
              }
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
