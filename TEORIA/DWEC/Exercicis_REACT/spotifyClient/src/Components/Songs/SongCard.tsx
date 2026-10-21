import type { SongCardProps } from "./Types/SongCardProps";


const SongCard = (props:SongCardProps) => {
    return (
        <>
            <h1>{track.title}</h1>
            <p>{track.artist}</p>
            <p>{track.duration}</p>
        </>
    )
}

export default SongCard;