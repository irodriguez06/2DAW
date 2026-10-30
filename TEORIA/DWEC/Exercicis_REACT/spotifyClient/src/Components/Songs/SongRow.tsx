import type { SongRowProps } from "./Types/SongRowProps"

const SongRow = (props: SongRowProps) => {

    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.artist}</td>
            <td>{props.duration}</td>
        </tr>
    );
}

export default SongRow;