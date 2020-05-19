const getCliArgs = (arg: string): string => {
    return process.argv[process.argv.indexOf(arg) + 1];
}

export { getCliArgs };