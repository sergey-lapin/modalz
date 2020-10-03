export function removeItemOnce(arr: any, value: any) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return [...arr];
}

export const getRandomPosition = ({ hOffset, vOffset }: { hOffset: number, vOffset: number }) => {
    return {
        x: Math.random() * Math.max(0, (window.innerWidth - hOffset)),
        y: Math.random() * Math.max(0, (window.innerHeight - vOffset)),
    }
}
