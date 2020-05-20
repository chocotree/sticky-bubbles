import { networkInterfaces, NetworkInterfaceInfo } from 'os';

// 🤧 array concat use any
const getLocalExternalIP = () => ([] as any).concat(...Object.values(networkInterfaces()))
    .find((info: any) => { // 🤧 any
        return info.family === 'IPv4' && !info.internal
    }).address;

export { getLocalExternalIP };