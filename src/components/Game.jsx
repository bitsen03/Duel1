import React, { useRef, useEffect, useState, useCallback } from "react";
import { Unit } from "../help/classes";
import Scoreboard from "./Scoreboard";
import drawAllObject from "../help/draw";
import Setting from "./Setting";

const Game = () => {
    const canvasRef = useRef(null);
    const [ctx, setCtx] = useState(null);
    const [playerPoint, setPlayerPoint] = useState(0);
    const [enemyPoint, setEnemyPoint] = useState(0);
    const [colorPlayer, setColorPlayer] = useState('#FFFFFF');
    const [colorEnemy, setColorEnemy] = useState('#FFFFFF');
    const [speedPlayer, setSpeedPlayer] = useState(3);
    const [speedEnemy, setSpeedEnemy] = useState(3);
    const [shootRatePlayer, setShootRatePlayer] = useState(100);
    const [shootRateEnemy, setShootRateEnemy] = useState(100);

    // Создание объектов при монтировании компонента
    const [player, setPlayer] = useState(null);
    const [enemy, setEnemy] = useState(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        setCtx(context);
        
        const newMapSize = { x: window.innerWidth, y: window.innerHeight };
        canvas.width = newMapSize.x;
        canvas.height = newMapSize.y;

        window.addEventListener('resize', resizeCanvas);

        // Create game objects
        const sizeUnit = { width: 100, height: 100 };
        const spells = { player: [], enemy: [] };

        const newPlayer = new Unit({
            position: { x: newMapSize.x / 2 - sizeUnit.width / 2, y: newMapSize.y - sizeUnit.height },
            spells,
            size: sizeUnit,
            isEnemy: true,
            point: 0,
            mapSize: newMapSize,
            colorSpell: colorPlayer
        });

        const newEnemy = new Unit({
            position: { x: newMapSize.x / 2 - sizeUnit.width / 2, y: 0 },
            spells,
            size: sizeUnit,
            isEnemy: false,
            point: 0,
            mapSize: newMapSize,
            colorSpell: colorEnemy
        });

        setPlayer(newPlayer);
        setEnemy(newEnemy);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    useEffect(() => {
        if (player && enemy) {
            player.attack(enemy);
            enemy.attack(player);
        }
    }, [player, enemy]);

    useEffect(() => {
        if (player) player.colorSpell.color = colorPlayer;
    }, [colorPlayer, player]);

    useEffect(() => {
        if (enemy) enemy.colorSpell.color = colorEnemy;
    }, [colorEnemy, enemy]);
    useEffect(() => {
        if (enemy) enemy.shootRate = shootRateEnemy;
    }, [shootRateEnemy, enemy]);
    useEffect(() => {
        if (player) player.shootRate = shootRatePlayer;
    }, [shootRatePlayer, player]);
    useEffect(() => {
        if (enemy) enemy.speed = speedEnemy;
    }, [speedEnemy, enemy]);
    useEffect(() => {
        if (player) player.speed = speedPlayer;
    }, [speedPlayer, player]);

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        const newMapSize = {
            x: window.innerWidth,
            y: window.innerHeight,
        };

        canvas.width = newMapSize.x;
        canvas.height = newMapSize.y;
    };

    const animate = useCallback(() => {
        if (ctx && player && enemy) {
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            drawAllObject(ctx, ...player.spells.player, ...enemy.spells.enemy, player, enemy);

            setPlayerPoint(player.point.score);
            setEnemyPoint(enemy.point.score);

            window.requestAnimationFrame(animate);
        }
    }, [ctx, player, enemy]);

    useEffect(() => {
        if (ctx) {
            animate();
        }
    }, [ctx, animate]);


    return (
        <>
            <canvas ref={canvasRef} className="Game"></canvas>
            <Scoreboard playerPoint={playerPoint} enemyPoint={enemyPoint} />
            <Setting 
                setColorPlayer={setColorPlayer} 
                colorPlayer={colorPlayer} 
                colorEnemy={colorEnemy} 
                setColorEnemy={setColorEnemy}
                speedPlayer={speedPlayer}
                speedEnemy={speedEnemy}
                setSpeedPlayer={setSpeedPlayer}
                setSpeedEnemy={setSpeedEnemy}
                shootRatePlayer={shootRatePlayer}
                shootRateEnemy={shootRateEnemy}
                setShootRatePlayer={setShootRatePlayer}
                setShootRateEnemy={setShootRateEnemy}
            />
        </>
    );
};

export default Game;
