import type { HistorialProps } from "./Types/HistorialProps";

const Historial = (props: HistorialProps) => {
  return (
    <table>
      <caption>Historial</caption>
      <tbody>
        {props.entries.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.title}</td>
            <td>{entry.playedAt.toLocaleString('ca-ES')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Historial;
