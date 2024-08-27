const Scoreboard = ({playerPoint, enemyPoint}) => {
    return (
        <div className="scoreboard">
            <p>{enemyPoint}</p>
            <p>{playerPoint}</p>
        </div>
    );
}

export default Scoreboard;