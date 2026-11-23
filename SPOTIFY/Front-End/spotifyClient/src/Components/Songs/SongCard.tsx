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
        props.reset();
    }

    return (
        <>
            <h1>{props.trackInfo.title}</h1>
            <p>{props.trackInfo.artist}</p>
            <p>{props.trackInfo.duration}</p>
            <p>Reproduccions: {props.trackInfo.reproduccions}</p>
            <p>
                <button
                    type="button"
                    onClick={handleClickLike}
                    disabled={props.likeDisabled}
                    aria-label={props.trackInfo.likes.like ? "Dislike" : "Like"}
                >
                    <img
                        src={props.trackInfo.likes.like ? likedIcon : unlikedIcon}
                        alt={props.trackInfo.likes.like ? "Liked" : "Not liked"}
                    />
                </button>
                {props.trackInfo.likes.totalLikes}
            </p>
            {props.likeError && <p role="alert">{props.likeError}</p>}
            <p><button type="button" onClick={() => handleClickPlay()}>Play</button></p>
            <p><button type="button" onClick={() => handleClickReset()}>Reiniciar</button></p>
        </>
    )
}

export default SongCard;