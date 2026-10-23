import type { SongCardProps } from "./Types/SongCardProps";


const SongCard = ({trackInfo}:SongCardProps) => {

    function handleClickPlay() {
        console.log(trackInfo.reproduccions);
        trackInfo.reproduccions += 1;
        console.log(trackInfo.reproduccions);
    }

    return (
        <>
            <h1>{trackInfo.title}</h1>
            <p>{trackInfo.artist}</p>
            <p>{trackInfo.duration}</p>
            <p>Reproduccions: {trackInfo.reproduccions}</p>

            <p><button onClick={handleClickPlay}>Play</button></p>
        </>
    )
}

export default SongCard;