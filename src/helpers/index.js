
export function patchTodo(updatedTodo, todoURL) {
    fetch(`${todoURL}/${updatedTodo.id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ todo: updatedTodo })
    })
}

export function postTodo(newTodo, todoURL) {
    fetch(todoURL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ todo: newTodo })
    })
}

export function deleteTodo(id, todoURL) {
    fetch(`${todoURL}/${id}`, {
        method: "DELETE"
    })
}