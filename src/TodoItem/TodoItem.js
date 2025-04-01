import React, { useState } from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete, onEdit, onSaveEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);


  const handleSave = () => {
    onSaveEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <div className="todo">
      <div className="left">
        <input
          type="checkbox"
          checked={todo.status}
          onChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
          <>
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button className="save-button" onClick={handleSave}>save</button>
          </>
        ) : (
          <>
            <p className="todo-text" style={{ textDecoration: todo.status ? 'line-through' : 'none' }}>
              {todo.text}
            </p>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
      </div>
      <div className="right">
        <i className="fas fa-times delete-icon" onClick={() => onDelete(todo.id)}></i>
      </div>
    </div>
  );
}

export default TodoItem;