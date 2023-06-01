export const calculateOffset = (currentSeriesIndex: number, seriesListEl: HTMLElement): number => {
    const childNodes = seriesListEl.childNodes;

    let firstNode = childNodes[0];
    let currentNode = childNodes[currentSeriesIndex];
    let lastNode: ChildNode = childNodes[childNodes.length - 1];

    let offsetLeft = currentNode.getBoundingClientRect().left - firstNode.getBoundingClientRect().left;
    let offsetRight = lastNode.getBoundingClientRect().left - currentNode.getBoundingClientRect().left;

    return (offsetRight - offsetLeft) / 2
}