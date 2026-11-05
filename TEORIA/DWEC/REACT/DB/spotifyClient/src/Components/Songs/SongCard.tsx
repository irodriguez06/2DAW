import type { SongCardProps } from "./Types/SongCardProps";
import likeBlanc from "../../assets/like_blanc.png";
import likeVerd from "../../assets/like_verd.png";

const SongCard = (props: SongCardProps) => {


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
            <p>Total Reproduccions: {props.trackInfo.reproduccions}</p>
            <p><button type="button" onClick={() => handleClickPlay()}>Play 1</button></p >
            <p><button onClick={handleClickReset}>Reset</button></p >

            <button
                type="button"
                onClick={handleClickLike}
            >
                <img src={props.trackInfo.likes.like ? likeVerd : likeBlanc} alt="" width="24" height="24" />
            </button>
            <span> {props.trackInfo.likes.totalLikes}</span>
        </>
    )
}

export default SongCard;