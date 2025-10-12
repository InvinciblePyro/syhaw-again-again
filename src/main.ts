import "./style.css";
import wall from "./wallArt.jpg";

let rocks: number = 0;
let LastTime = performance.now();

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Slamming Your Head Against a Wall</h1>
  <p>Rocks: <span id="counter">0</span></p>
  <button id="increment"><img src="${wall}" class="icon" /></button>
`;

const counterElement = document.getElementById("counter")!;
const button = document.getElementById("increment")!;
button.style.transform = "scale(1)";

button.addEventListener("click", () => {
  // This looks like to a good place to add some logic!
  rocks += 1;
  counterElement.innerHTML = rocks.toString();
});

// Step 4: Continuous growth with requestAnimationFrame
function update(currentTime: number) {
  // Calculate how much time has passed since last frame
  const deltaTime = currentTime - LastTime; // milliseconds
  LastTime = currentTime;

  // Increase rocks based on time passed
  rocks += deltaTime / 1000; // 1 rock per second
  counterElement.innerHTML = Math.floor(rocks).toString();

  // Schedule the next frame
  requestAnimationFrame(update);
}

// Start the animation loop
requestAnimationFrame(update);
