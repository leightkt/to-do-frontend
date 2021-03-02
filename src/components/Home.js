import TodoForm from './TodoForm'
import TodoContainer from '../containters/TodoContainer'

export default function Home(props) {
    return (
        <>
            <TodoForm submitAction={props.submitAction}/>
            <TodoContainer todos={props.todos} deleteTodo={props.deleteTodo} updateTodo={props.updateTodo}/>
        </>
    )
}