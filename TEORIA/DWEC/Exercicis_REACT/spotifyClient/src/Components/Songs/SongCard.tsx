import type { SongCardProps } from "./Types/SongCardProps";


const SongCard = (props:SongCardProps) => {
    return (
        <>
            <h1>{props.trackInfo.title}</h1>
            <p>{props.trackInfo.artist}</p>
            <p>{props.trackInfo.duration}</p>
        </>
    )
}

export default SongCard;