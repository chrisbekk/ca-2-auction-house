export function rotateElement(event, element) {
  // get mouse position
  const x = event.clientX;
  const y = event.clientY;
  // console.log(x, y)

  // find the middle
  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;
  // console.log(middleX, middleY)

  // get offset from middle as a percentage
  // and tone it down a little
  const offsetX = ((x - middleX) / middleX) * 6;
  const offsetY = ((y - middleY) / middleY) * 6;

  // set rotation
  element.style.setProperty("--rotateX", offsetX + "deg");
  element.style.setProperty("--rotateY", -1 * offsetY + "deg");
}
