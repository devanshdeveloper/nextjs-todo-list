"use client";

import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthProvider";
import {
  TodoType,
  addTodo,
  deleteTodo,
  onTodos,
  toggleCompleted,
} from "@/firebase/todo";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const { user, status } = useAuth();
  const textInput = useRef<HTMLInputElement>(null);
  const [isFormActive, setIsFormActive] = useState(true);
  const [todos, setTodos] = useState<any | null>(null);

  async function handleAddTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (textInput.current) {
      const text = textInput.current.value;
      textInput.current.value = "";
      setIsFormActive(false);
      await addTodo({ text, isCompleted: false });
      setIsFormActive(true);
    }
  }

  useEffect(() => {
    if (!(status === "authenticated")) return;
    const unsubscrible = onTodos((todosSnapShot) => {
      if (todosSnapShot.exists()) {
        const val = todosSnapShot.val();
        const temp = [];
        for (const key in val) {
          if (Object.prototype.hasOwnProperty.call(val, key)) {
            temp.push({ ...val[key], id: key });
          }
        }
        setTodos(temp);
      } else setTodos([]);
    });
    return unsubscrible;
  }, [status]);

  if (status === "loading") {
    return <Loader text="Authenticating..." />;
  }

  if (status === "authenticated" && todos === null) {
    return <Loader text="Loading your todos..." />;
  }

  if (status === "unauthenticated") {
    return <Loader text="Redirecting to login..." />;
  }

  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-10">Todo List</h1>
      <form
        className="w-full flex justify-center gap-5"
        onSubmit={handleAddTodo}
      >
        <input
          ref={textInput}
          className="px-4 py-2 bg-gray-100 focus:outline-none rounded-lg"
          type="text"
          name="text"
          required
        />
        <button
          disabled={!isFormActive}
          className="px-4 py-2 bg-violet-600 disabled:bg-violet-300 text-white rounded-lg"
          type="submit"
        >
          Add Todo
        </button>
      </form>
      <div className="flex flex-col items-center gap-4 mt-10">
        {todos &&
          // @ts-ignore
          todos.map(({ text, isCompleted, id }, i) => (
            <div
              className="bg-gray-100 flex justify-between px-4 py-2 rounded-lg w-[min(700px,80vw)]"
              key={i}
            >
              <span>{text}</span>
              <div className="flex gap-3">
                <ToggleCheckBox id={id} isCompleted={isCompleted} />
                <button onClick={() => deleteTodo(id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function ToggleCheckBox({
  id,
  isCompleted,
}: {
  id: string;
  isCompleted: boolean;
}) {
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    setIsDisabled(true);
    try {
      await toggleCompleted(id, isCompleted);
    } catch (error) {
      console.error("Error updating todo completion status:", error);
    }
    setIsDisabled(false);
  }

  return (
    <div className="flex items-center">
      <input
        onChange={handleCheck}
        disabled={isDisabled}
        defaultChecked={isCompleted}
        id="checked-checkbox"
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
}
