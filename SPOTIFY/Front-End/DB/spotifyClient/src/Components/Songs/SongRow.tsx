import type { SongRowProps } from "./Types/SongRowProps"

const SongRow = (props: SongRowProps) => {
    const minutes = Math.floor(props.duration / 60);
    const seconds = Math.floor(props.duration % 60);

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.artist}</td>
            <td>{`${minutes}:${String(seconds).padStart(2, '0')}`}</td>
            <td>
                <button type="button" onClick={props.onPlay}>Play</button>
            </td>
        </tr>
    );
}

export default SongRow;