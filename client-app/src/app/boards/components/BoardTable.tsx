import { Board } from "../page";
import styles from "../Boards.module.css";

interface BoardTableProps {
  boards: Board[];
  onRowClick: (boardId: number) => void; // 행 클릭 핸들러
  onEditClick: (boardId: number) => void; // 수정 버튼 클릭 핸들러
  onDeleteClick: (boardId: number) => void; // 삭제 버튼 클릭 핸들러
}

export default function BoardTable({
  boards,
  onRowClick,
  onEditClick,
  onDeleteClick,
}: BoardTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>제목</th>
          <th className={styles.th}>설명</th>
          <th className={styles.th}>생성일</th>
          <th className={styles.th}>수정 / 삭제</th> {/* 새로운 액션 열 추가 */}
        </tr>
      </thead>
      <tbody>
        {boards.map((board) => (
          <tr
            key={board.id}
            className={styles.row} // 행 스타일 적용
            onClick={() => onRowClick(board.id)} // 행 클릭 이벤트 핸들러 호출
          >
            <td className={styles.td}>{board.id}</td>
            <td className={styles.td}>{board.title}</td>
            <td className={styles.td}>{board.description}</td>
            <td className={styles.td}>
              {new Date(board.createdAt).toLocaleString()}
            </td>
            <td className={styles.td}>
              <button
                className={styles.editButton}
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트 전파 방지 (행 클릭 방지)
                  onEditClick(board.id); // 수정 클릭 핸들러 호출
                }}
              >
                수정
              </button>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation(); // 클릭 이벤트 전파 방지 (행 클릭 방지)
                  onDeleteClick(board.id); // 삭제 클릭 핸들러 호출
                }}
              >
                삭제
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
