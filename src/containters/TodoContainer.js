import TodoItem from "../components/TodoItem"

export default function TodoContainer({ todos, deleteTodo, updateTodo }) {

    const showTodos = () => {
        return todos.map(todo => <TodoItem key={todo.id} {...todo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>)
    }

    return (
        <ul className="todo-list">
            {showTodos()}
        </ul>
    )
}