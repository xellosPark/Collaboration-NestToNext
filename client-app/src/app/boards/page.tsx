"use client";

import { useEffect, useState } from "react";
import BoardForm from "./components/BoardForm";
import BoardTable from "./components/BoardTable";
import styles from "./Boards.module.css";
import { useRouter } from "next/navigation"; // 라우터 임포트

export interface Board {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  //const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

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
          //setMessage(result.message);
          setBoards(result.data || []);
        } else if (response.status === 404) {
          // 상태 코드가 404일 때 메시지 표시
          console.warn("요청한 리소스를 찾을 수 없습니다. (404)");
          // setMessage("리소스를 찾을 수 없습니다.");
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

      // 상태 코드 로그 출력
      console.log("응답 상태 코드:", response.status);
      console.log("응답 상태 텍스트:", response.statusText);

      // 상태 코드에 따른 처리
      if (response.status === 201) {
        const result = await response.json();
        console.log("게시물 생성 성공:", result.message);

        // 새 게시물 추가
        setBoards((prev) => [...prev, result.data]);
      } else if (response.status === 404) {
        console.warn("요청한 리소스를 찾을 수 없습니다. (404)");
      } else {
        console.error("게시물 추가 실패:", response.statusText);
        throw new Error(`서버가 상태 코드 ${response.status}로 응답했습니다.`);
      }
    } catch (error) {
      console.error("게시물 추가 중 오류 발생:", error);
    }
  };

  // 테이블 행 클릭 시 호출되는 함수
  const handleRowClick = (boardId: number) => {
    router.push(`/boards/${boardId}`); // 상세 페이지로 이동
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
        <BoardTable boards={boards} onRowClick={handleRowClick} />
      ) : (
        <p>현재 게시물이 없습니다.</p>
      )}
    </div>
  );
}
