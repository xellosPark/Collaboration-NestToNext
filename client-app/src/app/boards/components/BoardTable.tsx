import { Board } from "../page";
import styles from "../Boards.module.css";

interface BoardTableProps {
  boards: Board[];
  onRowClick: (boardId: number) => void; // onRowClick 속성 추가
}

export default function BoardTable({ boards, onRowClick }: BoardTableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Title</th>
          <th className={styles.th}>Description</th>
          <th className={styles.th}>Created At</th>
        </tr>
      </thead>
      <tbody>
        {boards.map((board) => (
          <tr
            key={board.id}
            className={styles.row} // 행 스타일 적용
            onClick={() => onRowClick(board.id)} // 클릭 이벤트 핸들러 호출
          >
            <td className={styles.td}>{board.id}</td>
            <td className={styles.td}>{board.title}</td>
            <td className={styles.td}>{board.description}</td>
            <td className={styles.td}>
              {new Date(board.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
