import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem/TodoItem';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [filter, setFilter] = useState('All');
  const [editId, setEditId] = useState(null); // Store the ID of the todo being "edited"
  const [editText, setEditText] = useState('');

  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem('toDos')) || [];
    setToDos(storedToDos);
    getCurrentDay();
  }, []);

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  });

  const getCurrentDay = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date().getDay();
    setCurrentDay(daysOfWeek[day]);
  };

  const handleAddTodo = () => {
    if (toDo.trim() !== '') {
      setToDos([
        ...toDos,
        { id: Date.now(), text: toDo, status: false },
      ]);
      setToDo('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDelete = (id) => {
    setToDos(toDos.filter((toDo) => toDo.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id); // Store the ID of the todo being "edited"
    setEditText(text);
  };

  const handleSaveEdit = () => {
    if (editId !== null && editText.trim() !== '') {
      // Create a new todo with the edited text
      setToDos([
        ...toDos.filter((todo) => todo.id !== editId), // Remove the old todo
        { id: Date.now(), text: editText, status: false },
      ]);
      setEditId(null);
      setEditText('');
    }
  };

  const handleToggleStatus = (id) => {
    setToDos(
      toDos.map((toDo) => {
        if (toDo.id === id) {
          toDo.status = !toDo.status;
        }
        return toDo;
      })
    );
  };

  const filteredToDos = toDos.filter((todo) => {
    if (filter === 'Active') return !todo.status;
    if (filter === 'Completed') return todo.status;
    return true;
  });

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(event) => setToDo(event.target.value)}
          onKeyUp={handleKeyPress}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={handleAddTodo} className="fas fa-plus"></i>
      </div>
      <div className="filters">
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Active')}>Active</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
      </div>
      <div className="todos">
        {filteredToDos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleStatus}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
