import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import likedIcon from "../../assets/silike.png";
import unlikedIcon from "../../assets/nolike.png";


const SongCard = ({trackInfo}:SongCardProps) => {

    const [totalReproduccions,setTotalReproduccions] = useState<number>(trackInfo.reproduccions);
    const [totalLikes,setTotalLikes] = useState<number>(trackInfo.likes);
    const estaLiked = totalLikes > trackInfo.likes;

    function handleClickPlay() {
        setTotalReproduccions((prev:number) => prev + 1);
    }

    function handleClickLike() {
        setTotalLikes((prev:number) => prev === trackInfo.likes ? prev + 1 : trackInfo.likes);
    }

    return (
        <>
            <h1>{trackInfo.title}</h1>
            <p>{trackInfo.artist}</p>
            <p>{trackInfo.duration}</p>
            <p>Reproduccions: {totalReproduccions}</p>
            <p>Likes: {totalLikes}</p>
            <p><button type="button" onClick={handleClickLike}>
                <img src={estaLiked ? likedIcon : unlikedIcon} width={20} height={20}/>
            </button></p>
            <p><button type="button" onClick={handleClickPlay}>Play</button></p>
        </>
    )
}

export default SongCard;