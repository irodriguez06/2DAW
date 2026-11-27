import type { SongRowProps } from "./Types/SongRowProps";
import type { Track } from "../../Model/Track";

const SongRow = (props: SongRowProps) => {
    const minutes = Math.floor(props.duration / 60);
    const seconds = Math.floor(props.duration % 60);

    function editar() {
        const song: Track = {
            id: props.id,
            title: props.title,
            artist_id: props.artist_id,
            duration: props.duration
        };

        if (props.edit !== undefined) {
            props.edit(song);
        }
    }

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.artist}</td>
            <td>{`${minutes}:${String(seconds).padStart(2, '0')}`}</td>
            <td><button type="button" onClick={props.play}>Play</button></td>
            {props.edit !== undefined && (
                <td><button type="button" onClick={editar}>Edit</button></td>
            )}
        </tr>
    );
}

export default SongRow;