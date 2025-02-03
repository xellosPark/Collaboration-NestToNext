"use client";

import { useEffect, useState } from "react";
import BoardForm from "./components/BoardForm";
import BoardTable from "./components/BoardTable";
import styles from "./Boards.module.css";

export interface Board {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    fetch("http://localhost:9801/boards")
      .then((response) => response.json())
      .then((data) => setBoards(data));
  }, []);

  const addBoard = async (title: string, description: string) => {
    const response = await fetch("http://localhost:9801/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    const newBoard = await response.json();
    setBoards((prev) => [...prev, newBoard]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Boards</h1>
      <BoardForm onAddBoard={addBoard} />
      <BoardTable boards={boards} />
    </div>
  );
}
