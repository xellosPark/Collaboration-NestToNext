"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../Boards.module.css";

interface Board {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function BoardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [board, setBoard] = useState<Board | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(
          `http://localhost:9801/boards/${params.id}`
        );

        if (response.status === 200) {
          const result = await response.json();
          setBoard(result.data);
        } else {
          console.warn("게시물이 존재하지 않음 (404)");
          router.push("/boards");
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoard();
  }, [params.id, router]);

  if (isLoading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  if (!board) {
    return <p>게시물이 존재하지 않습니다.</p>;
  }

  return (
    <div className={styles.container}>
      <h1>게시물 상세 정보</h1>
      <p>
        <strong>ID:</strong> {board.id}
      </p>
      <p>
        <strong>Title:</strong> {board.title}
      </p>
      <p>
        <strong>Description:</strong> {board.description}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(board.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
