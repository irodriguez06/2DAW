import type { SongCardProps } from "./Types/SongCardProps";


const SongCard = (props:SongCardProps) => {
    return (
        <>
            <h1>{props.title}</h1>
            <p>{props.artist}</p>
            <p>{props.duration}</p>
        </>
    )
}

export default SongCard;