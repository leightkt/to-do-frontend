import TodoItem from "../components/TodoItem"

export default function TodoContainer({ todos, deleteTodo }) {

    const showTodos = () => {
        return todos.map(todo => <TodoItem key={todo.id} {...todo} deleteTodo={deleteTodo}/>)
    }

    return (
        <ul className="todo-list">
            {showTodos()}
        </ul>
    )
}