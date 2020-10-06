
export const getRandomPosition = ({ hOffset, vOffset }: { hOffset: number, vOffset: number }) => {
    return {
        x: Math.random() * Math.max(0, (window.innerWidth - hOffset)),
        y: Math.random() * Math.max(0, (window.innerHeight - vOffset)),
    }
}
