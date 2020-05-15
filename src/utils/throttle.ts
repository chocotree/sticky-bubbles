const throttle = (func: () => void, threshold: number = 250) => {
    let last = 0;

    return () => {
        let now = +new Date(); // like -> Number(new Date())

        if (now > last + threshold) {
            last = now;
            func();
        }
    }
}

export { throttle };