import React from 'react'

export default function onDelete() {
  return (
    <div></div>
  )
}


export const deleteTask = async (id) => {
    const response = await fetch("/tasks/" + id, {
        method: 'DELETE'
    })
}