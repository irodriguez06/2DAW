import type { User } from "../Model/User";

interface HeaderProps {
    user: User;
}

const currentDate: string = new Date().toLocaleDateString("ca-ES");

const Header = ({ user }: HeaderProps) => {
    return (
        <header className="page-header">
            <h1>Spotify Client</h1>
            <div className="user-info">
                <p>Usuari: {user.name}</p>
                <p>Data: {currentDate}</p>
            </div>
        </header>
    );
};

export default Header;
