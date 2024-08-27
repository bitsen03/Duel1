import { useRef } from "react";

const Setting = ({
    setColorPlayer,
    setColorEnemy,
    colorPlayer,
    colorEnemy,
    speedPlayer,
    speedEnemy,
    setSpeedPlayer,
    setSpeedEnemy,
    shootRatePlayer,
    shootRateEnemy,
    setShootRatePlayer,
    setShootRateEnemy
}) => {
    const ref = useRef(null);

    const closeSetting = () => {
        ref.current.classList.add('unActive');
    };   

    return (
        <div className='setting unActive' ref={ref}>
            <div className="inputs-setting">
                <div className="Player">
                    <span className="h1">Player setting</span>
                    <div className="input-setting">
                        <span>spells color</span>
                        <input
                            className="color-input"
                            type="color"
                            value={colorPlayer} 
                            onChange={(e) => setColorPlayer(e.target.value)} 
                        />
                    </div>
                    <div className="input-setting">
                        <span>speed</span>
                        <input
                            className="range-input"
                            type="range"
                            min="1"
                            max="10"
                            value={speedPlayer}
                            onChange={(e) => setSpeedPlayer(Number(e.target.value))}
                        />
                        <span>{speedPlayer}</span>
                    </div>
                    <div className="input-setting">
                    <span>shoot rate</span>
                    <input
                        className="range-input"
                        type="range"
                        min="10"
                        max="200"
                        value={shootRatePlayer}
                        onChange={(e) => setShootRatePlayer(Number(e.target.value))}
                    />
                    <span>{shootRatePlayer}</span>
                </div>
                </div>
                <div className="Enemy">
                    <span className="h1">Enemy setting</span>
                    <div className="input-setting">
                        <span>spells color</span>
                        <input
                            className="color-input"
                            type="color"
                            value={colorEnemy}
                            onChange={(e) => setColorEnemy(e.target.value)} 
                        />
                    </div>
                    <div className="input-setting">
                        <span>speed</span>
                        <input
                            className="range-input"
                            type="range"
                            min="1"
                            max="10"
                            value={speedEnemy}
                            onChange={(e) => setSpeedEnemy(Number(e.target.value))}
                        />
                        <span>{speedEnemy}</span>
                    </div>
                    <div className="input-setting">
                        <span>shoot rate</span>
                        <input
                            className="range-input"
                            type="range"
                            min="10"
                            max="200"
                            value={shootRateEnemy}
                            onChange={(e) => setShootRateEnemy(Number(e.target.value))}
                        />
                        <span>{shootRateEnemy}</span>
                </div>
                </div>
                <button className="closeSetting" onClick={closeSetting}>X</button>
            </div>
        </div>
    );
};

export default Setting;
