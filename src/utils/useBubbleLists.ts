import { Bubble } from '../class';

const useBubbleLists = () => {
    let bubbleList: Bubble[] = [];
    let bgBubbleList: Bubble[] = [];

    const addBubbleToCanvas = (ctx: CanvasRenderingContext2D) => {
        bubbleList.push(new Bubble('#5c9', 3.3, ctx));
    }

    const addBgBubbleToCanvas = (ctx: CanvasRenderingContext2D) => {
        bgBubbleList.push(new Bubble('#fbb', 4.5, ctx));
    }

    const clearAllBubbleList = () => {
        bubbleList = [];
        bgBubbleList = [];
    }

    const getBubbleList = () => bubbleList;
    const getBgBubbleList = () => bgBubbleList;

    return {
        clearAllBubbleList,
        getBubbleList,
        getBgBubbleList,
        addBubbleToCanvas,
        addBgBubbleToCanvas,
    }
};

export { useBubbleLists };