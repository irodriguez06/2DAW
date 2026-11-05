import { useState } from "react";

const Reproduint = () => {
    const [volum, setVolum] = useState<number>(0);

    function pujarVolum() {
        setVolum((prev) => {
            if (prev + 1 > 100) {
                return 100;
            }
            return prev + 1;
        });
    }

    function baixarVolum() {
        setVolum((prev) => {
            if (prev - 1 < 0) {
                return 0;
            }
            return prev - 1;
        });
    }

    return (
        <section>
            <h1>Reproduint</h1>
            <p>Volum: {volum}</p>
            <button type = "button" onClick={() => pujarVolum()}>+</button>
            <button type = "button" onClick={() => baixarVolum()}>-</button>
        </section>
    );
};

export default Reproduint;