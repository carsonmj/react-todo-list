import React, { useCallback, useState, useRef } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for(let i = 1; i <= 2500; i++){
    array.push({
      id: i,
      text: `to do ${i}`,
      checked: false,
    })
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos
    // [{
    //   id: 1,
    //   text: 'react practice',
    //   checked: true,
    // },
    // {
    //   id: 2,
    //   text: 'component style',
    //   checked: true,
    // },
    // {
    //   id: 3,
    //   text: 'make a example',
    //   checked: false,
    // }]
  );

  // 고유값으로 사용될 id
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos => todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos( todos =>
        todos.map(todo => 
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        )
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
}

export default App;
