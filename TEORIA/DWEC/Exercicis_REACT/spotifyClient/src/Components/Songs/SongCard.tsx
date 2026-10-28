import type { SongCardProps } from "./Types/SongCardProps";
import likedIcon from "../../assets/silike.png";
import unlikedIcon from "../../assets/nolike.png";


const SongCard = (props:SongCardProps) => {

    function handleClickPlay() {
        props.play();
    }

    function handleClickLike() {
        props.like();
    }

    function handleClickReset() {
        
    }

    return (
        <>
            <h1>{props.trackInfo.title}</h1>
            <p>{props.trackInfo.artist}</p>
            <p>{props.trackInfo.duration}</p>
            <p>Reproduccions: {props.trackInfo.reproduccions}</p>
            <p><button type="button" onClick={handleClickLike}>
                <img onClick = {() => handleClickLike()} 
                    src={props.trackInfo.likes.like?likedIcon:unlikedIcon} />
                {props.trackInfo.likes.totalLikes}
            </button></p>
            <p><button type="button" onClick={() => handleClickPlay()}>Play</button></p>
            <p><button type="button" onClick={handleClickReset}>Reiniciar</button></p>
        </>
    )
}

export default SongCard;