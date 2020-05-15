import { Bubble } from '../class';

const updateBubbleList = (bubbleList: Bubble[]) => {
    for (let i = 0; i < bubbleList.length; i++) {
        let bubble = bubbleList[i];
        bubble.update();
        if (!bubble.life) {
            bubbleList.splice(i, 1);
        }
    }
}

export { updateBubbleList };