import type { SongRowProps } from "./Types/SongRowProps"
import formatDuration from "./formatDuration";

const SongRow = (props: SongRowProps) => {

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.artist}</td>
            <td>{formatDuration(props.duration)}</td>
        </tr>
    );
}

export default SongRow;