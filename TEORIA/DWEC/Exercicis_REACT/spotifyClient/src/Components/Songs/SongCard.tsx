import { useState } from "react";
import type { SongCardProps } from "./Types/SongCardProps";
import likedIcon from "../../assets/silike.png";
import unlikedIcon from "../../assets/nolike.png";


const SongCard = ({trackInfo}:SongCardProps) => {

    const [totalReproduccions,setTotalReproduccions] = useState<number>(trackInfo.reproduccions);
    const [totalLikes,setTotalLikes] = useState<number>(trackInfo.likes);
    const [likesBase,setLikesBase] = useState<number>(trackInfo.likes);
    const estaLiked = totalLikes > likesBase;

    function handleClickPlay(reproduccions: number) {
        setTotalReproduccions((prev:number) => prev + reproduccions);
    }

    function handleClickLike() {
        setTotalLikes((prev:number) => prev === likesBase ? prev + 1 : likesBase);
    }

    function handleClickReset() {
        setTotalReproduccions(0);
        setTotalLikes(0);
        setLikesBase(0);
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
            <p>
                <button type="button" onClick={() => handleClickPlay(1)}>Play 1</button>
                <button type="button" onClick={() => handleClickPlay(5)}>Play 5</button>
                <button type="button" onClick={() => handleClickPlay(10)}>Play 10</button>
            </p>
            <p><button type="button" onClick={handleClickReset}>Reiniciar</button></p>
        </>
    )
}

export default SongCard;