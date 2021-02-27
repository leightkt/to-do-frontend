import TodoItem from "../components/TodoItem"

export default function TodoContainer({ todos }) {

    const showTodos = () => {
        return todos.map(todo => <TodoItem key={todo.id} {...todo}/>)
    }

    return (
        <ul className="todo-list">
            Todo Container
            {showTodos()}
        </ul>
    )
}