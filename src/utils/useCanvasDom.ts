const useCanvasDom = () => {
    // canvas 1
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // canvas 2
    const canvasbg = document.querySelector('#canvasbg') as HTMLCanvasElement;
    const ctxbg = canvas.getContext('2d') as CanvasRenderingContext2D;

    const resizeCanvas = () => {
        [canvas.width, canvas.height] = [innerWidth, innerHeight];
        [canvasbg.width, canvasbg.height] = [innerWidth, innerHeight];
    }

    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctxbg.clearRect(0, 0, canvasbg.width, canvasbg.height);
    }

    return {
        canvas, ctx,
        canvasbg, ctxbg,
        resizeCanvas,
        clearCanvas,
    }
}

export { useCanvasDom };