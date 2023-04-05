export const deleteTask = async (id) => {
    const response = await fetch("/tasks/" + id, {
        method: 'DELETE'
    })
}