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
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 가져오기
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch("http://localhost:9801/boards", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        // 상태 코드 출력
        console.log("HTTP 상태 코드:", response.status);

        if (response.status === 200) {
          // 상태 코드가 200일 때 처리
          const result = await response.json();
          setMessage(result.message);
          setBoards(result.data || []);
        } else if (response.status === 404) {
          // 상태 코드가 404일 때 메시지 표시
          console.warn("요청한 리소스를 찾을 수 없습니다. (404)");
          setMessage("리소스를 찾을 수 없습니다.");
        } else {
          // 기타 상태 코드 처리
          console.error("서버 응답 실패:", response.statusText);
          throw new Error(`서버 응답 실패! 상태 코드: ${response.status}`);
        }
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

      // 로그 추가
      console.log("응답 상태 코드:", response.status);
      console.log("응답 상태 텍스트:", response.statusText);

      if (!response.ok) {
        throw new Error("새 게시물 추가에 실패했습니다.");
      }

      const responseText = await response.text(); // 응답을 먼저 텍스트로 확인
      console.log("응답 텍스트:", responseText);

      // 응답이 빈 경우 처리
      if (!responseText) {
        throw new Error("서버가 빈 응답을 반환했습니다.");
      }

      // JSON으로 변환
      const newBoard = JSON.parse(responseText);
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
