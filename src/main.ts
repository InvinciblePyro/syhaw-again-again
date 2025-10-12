import devArt from "./developerArt.jpg";
import "./style.css";
import wallArt from "./wallArt.jpg";

let rocks: number = 0;
let LastTime = performance.now();
let CounterGrowthRate: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Slamming Your Head Against a Wall</h1>
  <p>Rocks: <span id="counter">0</span></p>
  <button id="increment" title="Slam your head into the wall"><img src="${wallArt}" class="icon" /></button>
  
  <p>Employees:</p>
  <button id="Developer"><img src="${devArt}" class="icon" /></button>
`;

// defining buttons
const counterElement = document.getElementById("counter")!;
const wallButton = document.getElementById("increment")! as HTMLButtonElement;
const devButton = document.getElementById("Developer")! as HTMLButtonElement;

//titles for shop buttons
devButton.title = `Hire Developer (10 rocks = ${
  CounterGrowthRate + 1
} rock/sec)`;

// wall button event listener
wallButton.addEventListener("click", () => {
  rocks += 1;
  counterElement.innerHTML = Math.floor(rocks).toString();
});

// dev button event listener
devButton.addEventListener("click", () => {
  if (rocks >= 10) {
    rocks -= 10;
    CounterGrowthRate += 1;
    counterElement.innerHTML = Math.floor(rocks).toString();
  }
});

// Continuous growth with requestAnimationFrame
function update(currentTime: number) {
  // Calculate how much time has passed since last frame
  const deltaTime = currentTime - LastTime; // milliseconds
  LastTime = currentTime;

  // Increase rocks based on time passed
  rocks += (CounterGrowthRate * deltaTime) / 1000; // CounterGrowthRate rock(s) per second
  counterElement.innerHTML = Math.floor(rocks).toString();

  devButton.style.display = rocks >= 10 ? "block" : "none";

  // Enable or disable Developer button based on available rocks
  devButton.disabled = rocks < 10;

  // Schedule the next frame
  requestAnimationFrame(update);
}

// Start the animation loop
requestAnimationFrame(update);
