import type { Track } from "../../Model/Track";
import type { SongRowProps } from "./Types/SongRowProps"

const SongRow = (props: SongRowProps) => {
    const minutes = Math.floor(props.duration / 60);
    const seconds = Math.floor(props.duration % 60);

    function editar() {
        const song:Track = {
            id: props.id,
            title: props.title,
            artist_id: props.artist_id,
            artist: props.artist_id,
            duration: props.duration
        }
        props.edit?.(song)
    }

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.artist}</td>
            <td>{`${minutes}:${String(seconds).padStart(2, '0')}`}</td>
            <td>
                <button type="button" onClick={props.onPlay}>Play</button>
            </td>
            {props.edit && (
                <td>
                    <button type="button" onClick={editar}>Edit</button>
                </td>
            )}
        </tr>
    );
}

export default SongRow;