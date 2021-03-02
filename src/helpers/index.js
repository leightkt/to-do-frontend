
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

export function postTodo(newTodo, todoURL, user) {
    fetch(todoURL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ todo: {...newTodo, user_id: user.id}})
    })
}

export function deleteTodo(id, todoURL) {
    fetch(`${todoURL}/${id}`, {
        method: "DELETE"
    })
}