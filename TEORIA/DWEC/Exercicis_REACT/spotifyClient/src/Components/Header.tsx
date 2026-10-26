import { useState } from "react";
import type { User } from "../Model/User";

interface HeaderProps {
    user: User;
}

const Header = ({ user }: HeaderProps) => {
    const [currentDate, setCurrentDate] = useState<Date>(() => new Date());

    return (
        <header className="page-header">
            <h1>Spotify Client</h1>
            <div className="user-info">
                <p>Usuari: {user.name}</p>
                <p>Data: {currentDate.toLocaleString("ca-ES")}</p>
                <button type="button" onClick={() => setCurrentDate(new Date())}>
                    Actualitzar data
                </button>
            </div>
        </header>
    );
};

export default Header;