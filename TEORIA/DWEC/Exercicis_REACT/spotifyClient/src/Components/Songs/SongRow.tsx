import type {SongRowProps } from "./Types/SongRowProps"

const SongRow = (props:SongRowProps) => {

    return (
        <>
            <h1>{props.title}</h1>
            <p>{props.artist}</p>
            <p>{props.duration}</p>
        </>
    )
}

export default SongRow;