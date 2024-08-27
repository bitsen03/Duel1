const drawAllObject = (ctx, ...obj) => {
    obj.forEach((el) => el.draw(ctx))
}

export default drawAllObject;