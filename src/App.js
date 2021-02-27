import './App.css';

import { Component } from 'react'

import TodoContainer from './containters/TodoContainer';
import TodoForm from './components/TodoForm';
import { patchTodo, postTodo, deleteTodo } from './helpers'

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
      .then(todos => this.setState({ todos }))
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })

    postTodo(newTodo, todoURL)
  }

  updateTodo = (updatedTodo) => {
    let todos = this.state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
    this.setState({ todos })

    patchTodo(updatedTodo, todoURL)
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: filtered
    })

    deleteTodo(id, todoURL)
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoForm submitAction={this.addTodo}/>
        <TodoContainer todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}/>
      </div>
    );
  }
  
}

export default App;
