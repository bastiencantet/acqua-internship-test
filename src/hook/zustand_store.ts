import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import { Dispatch, RefObject, SetStateAction, useEffect, useRef } from 'react';
import { dragAndDrop } from '@formkit/drag-and-drop';

interface TodoStore {
  todoItems: string[];
  doneItems: string[];
  setTodoItems: Dispatch<SetStateAction<string[]>>;
  setDoneItems: Dispatch<SetStateAction<string[]>>;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todoItems: [
        'AI Fish or Phish',
        'Compile Coral DB',
        'AI Sub Navigation',
        'Server Water Cooling',
        'Whale Song AI',
        'Marine Chatbot',
      ],
      doneItems: ['Dolphin Comm Sim'],
      setTodoItems: (action) =>
        set((state) => ({
          todoItems:
            typeof action === 'function' ? action(state.todoItems) : action,
        })),
      setDoneItems: (action) =>
        set((state) => ({
          doneItems:
            typeof action === 'function' ? action(state.doneItems) : action,
        })),
    }),

    {
      name: 'todo-storage', // name of the item in the storage (must be unique)
    },
  ),
);

export const usePersistDragAndDrop = () => {
  const { todoItems, setTodoItems, doneItems, setDoneItems } = useTodoStore();
  const todoRef: RefObject<HTMLUListElement> = useRef(null);
  const doneRef: RefObject<HTMLUListElement> = useRef(null);

  useEffect(() => {
    if (!todoRef.current) return;
    dragAndDrop({
      config: { group: 'todoList' },
      parent: todoRef.current,
      getValues: () => todoItems,
      setValues: setTodoItems,
    });
  }, [todoItems, setTodoItems, todoRef]);

  useEffect(() => {
    if (!doneRef.current) return;
    dragAndDrop({
      config: { group: 'todoList' },
      parent: doneRef.current,
      getValues: () => doneItems,
      setValues: setDoneItems,
    });
  }, [doneItems, setDoneItems, doneRef]);

  return { todoRef, doneRef };
};
