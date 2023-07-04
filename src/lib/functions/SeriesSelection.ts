export const calculateOffset = (currentSeriesIndex: number, elementList: HTMLElement): number => {
    const childNodes = elementList.childNodes;

    let firstNode = childNodes.item(0) as Element;
    let currentNode = childNodes.item(currentSeriesIndex) as Element;
    let lastNode = childNodes.item(childNodes.length - 1) as Element;

    let offsetLeft = currentNode.getBoundingClientRect().left - firstNode.getBoundingClientRect().left;
    let offsetRight = lastNode.getBoundingClientRect().right - currentNode.getBoundingClientRect().right;

    return (offsetRight - offsetLeft) / 2
}