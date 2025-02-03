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
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 가져오기
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch("http://localhost:9801/boards", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          console.error("서버 응답 실패:", response.statusText);
          throw new Error("서버 응답에 실패했습니다.");
        }

        const data = await response.json();
        setBoards(data || []);
      } catch (error) {
        console.error("데이터 가져오기 중 오류 발생:", error);
      } finally {
        setIsLoading(false); // 로딩 상태 해제
      }
    };

    fetchBoards();
  }, []);

  // 새 게시물 추가 함수
  const addBoard = async (title: string, description: string) => {
    try {
      const response = await fetch("http://localhost:9801/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error("새 게시물 추가에 실패했습니다.");
      }

      const newBoard = await response.json();
      setBoards((prev) => [...prev, newBoard]); // 새로운 게시물 추가
    } catch (error) {
      console.error("게시물 추가 중 오류 발생:", error);
    }
  };

  // 조건부 렌더링으로 로딩 상태 처리
  if (isLoading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Boards</h1>
      <BoardForm onAddBoard={addBoard} />
      {boards.length > 0 ? (
        <BoardTable boards={boards} />
      ) : (
        <p>현재 게시물이 없습니다.</p>
      )}
    </div>
  );
}
