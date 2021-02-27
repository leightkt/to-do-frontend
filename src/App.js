import './App.css';

import { Component } from 'react'

import TodoContainer from './containters/TodoContainer';
import TodoForm from './components/TodoForm';

const backendURL = `http://localhost:9000`
const todoURL = `${backendURL}/todos`


class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    this.getTodos()
  }

  getTodos = () => {
    fetch(todoURL)
      .then(response => response.json())
      .then(todos => this.setState({todos}))
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })

    fetch(todoURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: filtered
    })

    fetch(`${todoURL}/${id}`, {
      method: "DELETE"
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo}/>
        <TodoContainer todos={this.state.todos} deleteTodo={this.deleteTodo}/>
      </div>
    );
  }
  
}

export default App;
