const tableElement = document.getElementById('table');
const cellElements = [...tableElement.getElementsByTagName('td')];
const selectionElement = document.getElementById('selection');
let startPos = null;

const getRect = (point1, point2) => ({
  x: Math.min(point1.x, point2.x),
  y: Math.min(point1.y, point2.y),
  left: Math.min(point1.x, point2.x),
  right: Math.max(point1.x, point2.x),
  top: Math.min(point1.y, point2.y),
  bottom: Math.max(point1.y, point2.y),
  width: Math.max(point1.x, point2.x) - Math.min(point1.x, point2.x),
  height: Math.max(point1.y, point2.y) - Math.min(point1.y, point2.y)
});

const drawSelection = (start, end) => {
  const selectionRect = getRect(start, end);

  selectionElement.style.display = 'block';
  selectionElement.style.width = `${selectionRect.width}px`;
  selectionElement.style.height = `${selectionRect.height}px`;
  selectionElement.style.left = `${selectionRect.left}px`;
  selectionElement.style.top = `${selectionRect.top}px`;
};

const clearSelection = () => {
  selectionElement.style.display = '';
  selectionElement.style.width = '';
  selectionElement.style.height = '';
  selectionElement.style.left = '';
  selectionElement.style.top = '';
};

const checkRectIntersection = (rect1, rect2) => !(
  rect1.right < rect2.left || 
  rect1.left > rect2.right || 
  rect1.bottom < rect2.top || 
  rect1.top > rect2.bottom
);

const fillCells = (startPos, endPos) => {
  const selectionRect = getRect(startPos, endPos);
  
  cellElements.forEach((cellElement) => {
    const cellRect = cellElement.getBoundingClientRect();

    if (checkRectIntersection(cellRect, selectionRect)) {
      cellElement.style.backgroundColor = '#E7ECFF';
    } else {
      cellElement.style.backgroundColor = '';
    }
  });
};

const onMouseMove = (event) => {
  const endPos = { x: event.clientX, y: event.clientY };
  fillCells(startPos, endPos);
  drawSelection(startPos, endPos);
};

const onMouseUp = (event) => {
  const endPos = { x: event.clientX, y: event.clientY };
  fillCells(startPos, endPos);
  clearSelection();

  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  document.removeEventListener('mouseleave', onMouseUp);
};

const onMouseDown = (event) => {
  startPos = { x: event.clientX, y: event.clientY };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('mouseleave', onMouseUp);
};

document.addEventListener('mousedown', onMouseDown);