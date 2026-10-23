import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";


const SongCard = ({trackInfo}:SongCardProps) => {

    let [totalReproduccions,setTotalReproduccions] = useState<number>(trackInfo.reproduccions);

    function handleClickPlay() {
        const tr = (prev:number) => { return prev +1}
        setTotalReproduccions(tr);
    }

    return (
        <>
            <h1>{trackInfo.title}</h1>
            <p>{trackInfo.artist}</p>
            <p>{trackInfo.duration}</p>
            <p>Reproduccions: {totalReproduccions}</p>

            <p><button onClick={() => handleClickPlay}>Play</button></p>
        </>
    )
}

export default SongCard;