import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import likedIcon from "../../assets/silike.png";
import unlikedIcon from "../../assets/nolike.png";


const SongCard = ({ trackInfo }: SongCardProps) => {

    const [totalLikes, setTotalLikes] = useState<number>(trackInfo.likes);
    const [likesBase, setLikesBase] = useState<number>(trackInfo.likes);
    const estaLiked = totalLikes > likesBase;

    function handleClickPlay() {

    }

    function handleClickLike() {

    }

    function handleClickReset() {

    }

    return (
        <>
            <h1>{trackInfo.title}</h1>
            <p>{trackInfo.artist}</p>
            <p>{trackInfo.duration}</p>
            <p>Reproduccions: {trackInfo.reproduccions}</p>
            <p>Likes: {totalLikes}</p>
            <p><button type="button" onClick={handleClickLike}>
                <img src={estaLiked ? likedIcon : unlikedIcon} width={20} height={20} />
            </button></p>
            <p><button type="button" onClick={() => handleClickPlay()}>Play</button></p>
            <p><button type="button" onClick={handleClickReset}>Reiniciar</button></p>
        </>
    )
}

export default SongCard;