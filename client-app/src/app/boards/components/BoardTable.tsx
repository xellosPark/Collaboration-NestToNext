import { Board } from "../page";
import styles from "../Boards.module.css";

interface BoardTableProps {
  boards: Board[];
}

export default function BoardTable({ boards }: BoardTableProps) {
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
          <tr key={board.id}>
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
