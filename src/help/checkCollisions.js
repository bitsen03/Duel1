const checkCollisions = ({rectangle1, rectangle2}) => {
    const overlapX = rectangle1.position.x < rectangle2.position.x + rectangle2.width &&
    rectangle1.position.x + rectangle1.width > rectangle2.position.x;

const overlapY = rectangle1.position.y < rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height > rectangle2.position.y;
    return (
        overlapX && overlapY
    );
}

export default checkCollisions;