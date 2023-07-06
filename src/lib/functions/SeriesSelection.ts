export const calculateOffset = (currentSeriesIndex: number, elementList: HTMLElement): number => {
    const childNodes = elementList.childNodes;

    const filteredChildNodes = Array.from(childNodes).filter((node) => {
        return node.nodeType === 1
    })


    let firstNode = filteredChildNodes.at(0) as Element;
    let currentNode = filteredChildNodes.at(currentSeriesIndex) as Element;
    let lastNode = filteredChildNodes.at(filteredChildNodes.length - 1) as Element;

    let offsetLeft = currentNode.getBoundingClientRect().left - firstNode.getBoundingClientRect().left;
    let offsetRight = lastNode.getBoundingClientRect().right - currentNode.getBoundingClientRect().right;

    return (offsetRight - offsetLeft) / 2
}