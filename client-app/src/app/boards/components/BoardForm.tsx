import { useState } from "react";
import styles from "../Boards.module.css";

interface BoardFormProps {
  onAddBoard: (title: string, description: string) => void;
}

export default function BoardForm({ onAddBoard }: BoardFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (title && description) {
      onAddBoard(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <div className={styles.form}>
      <input
        className={styles.input}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={styles.input}
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className={styles.button} onClick={handleSubmit}>
        Add Board
      </button>
    </div>
  );
}
