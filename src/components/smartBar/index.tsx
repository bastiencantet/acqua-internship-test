import { Dispatch, SetStateAction, useState } from 'react';
import { MdOutlineWaterDrop } from 'react-icons/md';
import { getSimilarity } from '@/tools/openai';

interface SmartBarProps {
  setTodoItems: Dispatch<SetStateAction<string[]>>;
  setDoneItems: Dispatch<SetStateAction<string[]>>;
  todoItems: string[];
  doneItems: string[];
}

export default function SmartBar({
  setDoneItems,
  setTodoItems,
  todoItems,
  doneItems,
}: SmartBarProps) {
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value === '') return;

    getSimilarity(todoItems, doneItems, value).then((response) => {
      if (response === null) {
        return;
      }
      const newItems = response
        .replace(/[[\]]/g, '')
        .split(',')
        .map((item) => item.trim());

      newItems.forEach((newItem) => {
        const wantedItemInTodo = todoItems.find((item) => item === newItem);
        const wantedItemInDone = doneItems.find((item) => item === newItem);

        if (wantedItemInTodo) {
          setDoneItems((prev) => [...prev, wantedItemInTodo]);
          setTodoItems((prev) =>
            prev.filter((item) => item !== wantedItemInTodo),
          );
        } else if (wantedItemInDone) {
          setTodoItems((prev) => [...prev, wantedItemInDone]);
          setDoneItems((prev) =>
            prev.filter((item) => item !== wantedItemInDone),
          );
        } else {
          setError(true);
        }

        setValue('');
      });
    });
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-acqua-soft-white">
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setError(false);
          setValue(event.target.value);
        }}
        placeholder="Type something..."
        className={`flex-1 p-2 text-base border rounded-lg border-gray-300 ${
          error ? 'border-red-500' : ''
        }`}
      />
      <button
        onClick={handleSend}
        className="bg-acqua-deep-blue hover:bg-acqua-darker-blue text-white p-2 rounded-lg cursor-pointer transition duration-300 ease-in-out"
        title="Send"
      >
        <MdOutlineWaterDrop className="text-xl" />
      </button>
    </div>
  );
}
