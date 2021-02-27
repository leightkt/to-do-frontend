import './App.css';
import { Component } from 'react'
import TodoContainer from './containters/TodoContainer';

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

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
        <TodoContainer todos={this.state.todos}/>
      </div>
    );
  }
  
}

export default App;
