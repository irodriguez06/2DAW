import { Link } from "react-router"

const Menu = () => {
    return (
        <nav>
            <Link to="/Play">Reproductor</Link>
            <br></br>
            <Link to="/SongManagement">Gestió de cançons</Link>
        </nav>
    )
}

export default Menu