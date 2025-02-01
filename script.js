const MIN_SQUARES_PER_SIDE = 10;
const MAX_SQUARES_PER_SIDE = 100;
const PIXEL_WIDTH = 10;

const sketchBox = document.querySelector(".sketch-box");

const pixels = document.querySelectorAll(".pixel");

const user = document.querySelector("input");

let resetButton = document.querySelector("button");

resetButton.addEventListener("click", (event) => {
  let pixelsPerSide = 16;
  let userInput = Number.parseInt(user.value);

  // Change text after first press.
  if (event.target.textContent === "Start") {
    event.target.textContent = "Reset";
  }

  // Remove any existing pixels.
  let oldPixels = document.querySelectorAll(".pixel");
  oldPixels.forEach((thePixel) => {
    thePixel.remove();
  });

  // Limit input.
  if (userInput > MIN_SQUARES_PER_SIDE && userInput < MAX_SQUARES_PER_SIDE) {
    pixelsPerSide = userInput;
  } else if (userInput >= MAX_SQUARES_PER_SIDE) {
    pixelsPerSide = MAX_SQUARES_PER_SIDE;

    // Update form to match
    user.value = MAX_SQUARES_PER_SIDE;
  } else {
    pixelsPerSide = MIN_SQUARES_PER_SIDE;

    // Update form to match
    user.value = MIN_SQUARES_PER_SIDE;
  }

  // Update with the be proportionate to the width of the pixels
  sketchBox.style["width"] = `${pixelsPerSide * PIXEL_WIDTH}px`;

  // Add a border.
  sketchBox.style["border"] = "1px solid black";
  let pixel = document.createElement("div");

  // Insert pixels.
  for (let i = 0; i < pixelsPerSide * pixelsPerSide; i++) {
    pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.classList.add("empty");
    pixel.addEventListener("mouseover", (event) => {
      if (event.target.classList.contains("empty")) {
        event.target.classList.remove("empty");
        event.target.classList.add("filled");
        event.target.style.opacity = 0.1;
      }

      let op = event.target.style.opacity;
      op = Number(op) + 0.1;
      event.target.style.opacity = op;
    });
    sketchBox.appendChild(pixel);
  }
});
