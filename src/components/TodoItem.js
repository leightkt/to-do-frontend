
export default function TodoItem({id, title, content, deleteTodo}) {

    const handleClick = (event) => deleteTodo(id)

    return (
        <li className="todo-item">
            <h2>{title}</h2>
            <h3>{content}</h3>
            <button className="delete-button" onClick={handleClick}>Delete</button>
        </li>
    )
}