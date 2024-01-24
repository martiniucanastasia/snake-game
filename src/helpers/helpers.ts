export const createElementOnBoard = (
  tag: keyof HTMLElementTagNameMap,
  className: string
): HTMLElement => {
  const element = document.createElement(tag) as HTMLElement;
  element.className = className;
  return element;
};

const getRandomCoordinate = (gridSize: number) => {
  return Math.floor(Math.random() * gridSize) + 1;
};

export const generateFoodPosition = (gridSize: number) => {
  const x = getRandomCoordinate(gridSize);
  const y = getRandomCoordinate(gridSize);
  return { x, y };
};

export const generateSnakePosition = (gridSize: number) => {
  const x = getRandomCoordinate(gridSize);
  const y = getRandomCoordinate(gridSize);
  return [{ x, y }];
};
