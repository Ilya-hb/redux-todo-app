import { useState } from "react";
import type { TodoState } from "../types/types";
import { ArrowLeftToLine, Check } from "lucide-react";

interface EditTodoForm {
  todo: TodoState;
  onCancel: () => void;
  onSave: (text: string) => void;
}

export default function EditTodoForm({ todo, onCancel, onSave }: EditTodoForm) {
  const [updatedText, setUpdatedText] = useState("");

  const handleSave = (): void => {
    if (updatedText.trim()) {
      onSave(updatedText.trim());
    }
  };

  return (
    <>
      <input
        placeholder="Edit Todo"
        className="focus:outline-none"
        value={updatedText}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter" && updatedText.trim()) {
            handleSave();
            setUpdatedText("");
          }
        }}
        onChange={(e) => {
          e.stopPropagation();
          setUpdatedText(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (updatedText.trim().length > 0) {
            handleSave();
          }
          setUpdatedText("");
        }}
        className="iconButton"
      >
        <Check
          size={24}
          className="transition hover:text-green-400"
        />
      </button>
      <button
        className="iconButton"
        onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }}
      >
        <ArrowLeftToLine
          size={24}
          className="transition hover:text-orange-400"
        />
      </button>
    </>
  );
}
