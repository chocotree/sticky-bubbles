const { networkInterfaces } = require('os');

const getLocalExternalIP = () => [].concat(...Object.values(networkInterfaces()))
    .find((info) => {
        return info.family === 'IPv4' && !info.internal
    }).address;

export { getLocalExternalIP };