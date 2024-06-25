'use client';

import SmartBar from '@/components/smartBar';
import { usePersistDragAndDrop, useTodoStore } from '@/hook/zustand_store';

export default function TodoBoard() {
  const { todoItems, doneItems, setTodoItems, setDoneItems } = useTodoStore();
  const { todoRef, doneRef } = usePersistDragAndDrop();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-acqua-soft-white">
      <h1 className="text-3xl font-bold text-acqua-deep-blue my-6">
        Acqua Board
      </h1>
      <SmartBar
        todoItems={todoItems}
        doneItems={doneItems}
        setTodoItems={setTodoItems}
        setDoneItems={setDoneItems}
      />
      <div className="flex justify-center items-start gap-8 p-5">
        <ul
          ref={todoRef}
          className="bg-acqua-yellow rounded-lg p-4 shadow-md w-80 h-96"
        >
          {todoItems.map((todo) => (
            <li className="p-2 bg-white rounded-lg shadow mb-2" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
        <ul
          ref={doneRef}
          className="bg-acqua-darker-blue rounded-lg p-4 shadow-md w-80 text-white h-96"
        >
          {doneItems.map((done) => (
            <li
              className="p-2 rounded-lg line-through decoration-acqua-retro-yellow decoration-2 shadow mb-2"
              key={done}
            >
              {done}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
