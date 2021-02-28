import './App.css';

import { Component } from 'react'

import TodoContainer from './containters/TodoContainer';
import TodoForm from './components/TodoForm';
import { patchTodo, postTodo, deleteTodo } from './helpers'
import SignUpForm from './components/SignUpForm';

const backendURL = `http://localhost:9000`
const todoURL = `${backendURL}/todos`


class App extends Component {

  state = {
    todos: [],
    user: {},
    alerts: []
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

  signUp = (user) => {
    fetch('http://localhost:9000/users', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user })
        })
        .then(response => response.json())
        .then(result => {
          if (result.errors){
            this.setState({ alerts: result.errors })
          } else {
            localStorage.setItem('token', result.token)
            this.setState({ 
              user: result.user,
              alerts: ["User successfully created"] 
            })
          }
        })
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <SignUpForm signUp={this.signUp} alerts={this.state.alerts}/>
        <TodoForm submitAction={this.addTodo}/>
        <TodoContainer todos={this.state.todos} deleteTodo={this.deleteTodo} updateTodo={this.updateTodo}/>
      </div>
    );
  }
  
}

export default App;
