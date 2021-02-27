import { Component } from 'react'

const initialState = {
    title: "",
    content: "",
    urgent: false,
    done: false
}

class TodoForm extends Component {

    state = initialState

    handleChange = (event) => {
        let {name, value, checked} = event.target

        value = (name === "urgent") ? checked : value

        this.setState({
            [name]: value 
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addTodo(this.state)
    }

    render() {
        const { title, content, urgent } = this.state
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>Create A New Todo</h3>
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={this.handleChange}/>
                <label>Content</label>
                <input type="text" name="content" value={content} onChange={this.handleChange}/>
                <div>
                    <label>Urgent</label>
                    <input type="checkbox" name="urgent" checked={urgent} onChange={this.handleChange}/>
                </div>
                <input type="submit" />
            </form>
        )
    }
}

export default TodoForm
