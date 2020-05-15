import './scss/index.scss';
import { Bubble } from './class';
import { useCanvasDom, useBubbleLists, throttle, updateBubbleList } from './utils';

document.addEventListener('DOMContentLoaded', () => {

    const { ctx, ctxbg, resizeCanvas, clearCanvas } = useCanvasDom();
    const allBubbleLists = useBubbleLists();
    const { addBubbleToCanvas, addBgBubbleToCanvas, getBubbleList, getBgBubbleList } = useBubbleLists();

    const handleBubbles = () => {
        updateBubbleList(getBubbleList());
        updateBubbleList(getBgBubbleList());

        if (getBubbleList().length < (innerWidth / 4)) addBubbleToCanvas(ctx);
        if (getBgBubbleList().length < (innerWidth / 12)) addBgBubbleToCanvas(ctxbg);
    }

    const animate = () => {
        clearCanvas();
        handleBubbles();

        allBubbleLists.getBgBubbleList().forEach(bubble => {
            bubble.draw();
        })
        allBubbleLists.getBubbleList().forEach(bubble => {
            bubble.draw();
        })

        // draw the Bg first, or we can try to change the sequence.
        getBgBubbleList().forEach(bubble => bubble.draw());
        getBubbleList().forEach(bubble => bubble.draw());

        requestAnimationFrame(animate);
    }

    // first initialize
    resizeCanvas();
    animate();
    window.addEventListener('resize', throttle(() => {
        resizeCanvas();
    }, 0)); // autually, no throttle is looking much more better in this scenario.

});
