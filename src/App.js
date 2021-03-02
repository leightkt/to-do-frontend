import './App.css';

import { Component } from 'react'

import { patchTodo, postTodo, deleteTodo } from './helpers'
import SignUpForm from './components/SignUpForm';
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home';

const backendURL = `http://localhost:9000`
const todoURL = `${backendURL}/todos`


class App extends Component {

  state = {
    todos: [],
    user: {},
    alerts: []
  }

  componentDidMount() {
    this.authorize_user()
  }

  authorize_user = () => {
    fetch(`${backendURL}/profile`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          user: response.user,
          todos: response.todos
        })
      })
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })

    postTodo(newTodo, todoURL, this.state.user)
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

  login = ({ username, password }) => {
    return fetch(`${backendURL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => response.json())
      .then(result => {
        if (result.errors){
          this.setState({ alerts: result.errors })
        } else {
          localStorage.setItem('token', result.token)
          this.setState({ 
            user: result.user,
            alerts: ["Successful Login"] ,
            todos: result.todos
          })
        }
      })
  }

  signUp = (user) => {
    // return the fetch so you can .then off of it (make it a promise)
    return fetch('http://localhost:9000/users', {
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
              alerts: ["User successfully created"],
              todos: result.todos 
            })
          }
        })
  }

  render() {
    return (
      <div className="App">
        <header>
          { this.state.user.username 
            ? ( 
              <>
                <p>Welcome Back {this.state.user.username}</p> 
                <nav>
                  <Link to="/signup">LOG OUT</Link>
                </nav>
              </>
            )
            : null }
        </header>
        <h1>Todo App</h1>
        <Switch>
          <PrivateRoute 
          exact
          path="/" 
          component={Home}
          submitAction={this.addTodo}
          updateTodo={this.updateTodo}
          deleteTodo={this.deleteTodo}
          todos={this.state.todos} />
          {/* Can change route and component allows private route to lock down multiple pages*/}
          <Route exact path="/signup" render={(routerProps) => {
          return <SignUpForm 
          signUp={this.signUp} 
          alerts={this.state.alerts}
          login={this.login}
          {...routerProps}
          // pass down history, location and match
          />}
          }/>
          <Redirect to="/" />
          {/* if someone tries to type in a path that doesn't exit- gets redirected homez */}
        </Switch>
        
      </div>
    );
  }
  
}

export default App;
