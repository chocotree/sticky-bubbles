const debounce = (func: () => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            func();
        }, delay)
    }
}

export { debounce };