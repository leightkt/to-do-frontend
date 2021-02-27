import { Component } from 'react'

const initialState = {
    title: "",
    content: "",
    urgent: false,
    done: false
}

class TodoForm extends Component {

    state = initialState

    componentDidMount() {
        const { todo } = this.props
        if(this.props.todo){
            const {id, title, content, urgent, done} = todo
            this.setState({
                id,
                title,
                content,
                urgent,
                done
            })
        }
    }

 
    handleChange = (event) => {
        let {name, value, checked} = event.target

        value = (name === "urgent") || (name === "done") ? checked : value

        this.setState({
            [name]: value 
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitAction(this.state)
        if(this.props.handleToggle){
            this.props.handleToggle()
        }
    }

    showDoneCheckbox = () => {
        return this.props.todo 
            ? (
            <div>
                <label>Done</label>
                <input type="checkbox" name="done" checked={this.done} onChange={this.handleChange}/>
            </div> 
            ) : null
    }

    render() {
        const { title, content, urgent, done } = this.state
        return(
            <form onSubmit={this.handleSubmit}>
                { this.props.todo ? <h3>Edit Todo</h3> : <h3>Create A New Todo</h3> }
                <label>Title</label>
                <input type="text" name="title" value={title} onChange={this.handleChange}/>
                <label>Content</label>
                <input type="text" name="content" value={content} onChange={this.handleChange}/>
                <div>
                    <label>Urgent</label>
                    <input type="checkbox" name="urgent" checked={urgent} onChange={this.handleChange}/>
                </div>
                {this.showDoneCheckbox()}
                <input type="submit" />
            </form>
        )
    }
}

export default TodoForm
