import devArt from "./developerArt.jpg";
import mathmArt from "./mathematicianArt.jpg";
import rsArt from "./rocketscientistArt.jpg";
import "./style.css";
import wallArt from "./wallArt.jpg";
import SFXwallSlam from "./wallSlam.wav";
const SFXWallSlam = new Audio(SFXwallSlam);

let rocks: number = 0;
let LastTime = performance.now();
let CounterGrowthRate: number = 0;

// employee inventory
let numOfDevs: number = 0;
let numOfMaths: number = 0;
let numOfRs: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <div id = "game-container">
    <h1>Slamming Your Head Against a Wall</h1>
    <p>🪨Rocks: <span id="counter">0</span>🪨</p>
    <p>Current Rock Collecting Rate: <span id="growth-rate">${CounterGrowthRate}</span> rocks/sec</p>
    <button id="increment" title="Slam your head into the wall"><img src="${wallArt}" class="icon" /></button>
    
    <p>Employees hired to slam their head against the wall <br>(hover over button for stats)</p>
    <div id = "shop-container">
      <button id="Developer"><img src="${devArt}" class="icon" /></button>
      <button id="Mathematician"><img src="${mathmArt}" class="icon" /></button>
      <button id="Rocket Scientist"><img src="${rsArt}" class="icon" /></button>
    </div>
  <div/>
`;

//shake screen func:
function shakeScreen() {
  const container = document.getElementById("game-container")!;
  let i = 0;
  const interval = setInterval(() => {
    const x = (Math.random() - 0.5) * 10; // random horizontal offset (-5px to 5px)
    const y = (Math.random() - 0.5) * 10; // random vertical offset
    container.style.transform = `translate(${x}px, ${y}px)`;
    i++;
    if (i > 5) { // number of shakes
      clearInterval(interval);
      container.style.transform = ""; // reset
    }
  }, 20); // 20ms per shake (~300ms total)
}

// defining buttons
const counterElement = document.getElementById("counter")!;
const wallButton = document.getElementById("increment")! as HTMLButtonElement;
const devButton = document.getElementById("Developer")! as HTMLButtonElement;
const mathmButton = document.getElementById(
  "Mathematician",
)! as HTMLButtonElement;
const rsButton = document.getElementById(
  "Rocket Scientist",
)! as HTMLButtonElement;

//growth rate element
const growthRateElement = document.getElementById("growth-rate")!;

//titles for shop buttons
devButton.title =
  `Hire a Developer \n(+1 rock/sec)\nCost: 10 rocks\nYou currently have: ${numOfDevs}`;

mathmButton.title =
  `Hire a Mathematician \n(+2 rocks/sec)\nCost: 100 rocks\nYou currently have: ${numOfMaths}`;

rsButton.title =
  `Hire a Rocket Scientist \n(+50 rocks/sec)\nCost: 1000 rocks\nYou currently have: ${numOfRs}`;

// wall button event listener
wallButton.addEventListener("click", () => {
  rocks += 1;
  counterElement.innerHTML = Math.floor(rocks).toString();

  // Set a random pitch between 0.8x and 1.2x
  SFXWallSlam.playbackRate = 0.2 + Math.random() * 3.5;

  SFXWallSlam.currentTime = 0; // rewind to start
  SFXWallSlam.play(); // play the sound

  shakeScreen();
});

// dev button event listener
devButton.addEventListener("click", () => {
  if (rocks >= 10) {
    numOfDevs++;
    rocks -= 10;
    CounterGrowthRate += 1;
    growthRateElement.innerHTML = CounterGrowthRate.toString();
    counterElement.innerHTML = Math.floor(rocks).toString();
  }
  devButton.title =
    `Hire a Developer \n(+1 rock/sec)\nCost: 10 rocks\nYou currently have: ${numOfDevs}`;
});

// Mathematician button event listener
mathmButton.addEventListener("click", () => {
  if (rocks >= 100) {
    numOfMaths++;
    rocks -= 100;
    CounterGrowthRate += 2;
    growthRateElement.innerHTML = CounterGrowthRate.toString();
    counterElement.innerHTML = Math.floor(rocks).toString();
  }
  mathmButton.title =
    `Hire a Mathematician \n(+2 rocks/sec)\nCost: 100 rocks\nYou currently have: ${numOfMaths}`;
});

// Rocket Scientist button event listener
rsButton.addEventListener("click", () => {
  if (rocks >= 1000) {
    numOfRs++;
    rocks -= 1000;
    CounterGrowthRate += 50;
    growthRateElement.innerHTML = CounterGrowthRate.toString();
    counterElement.innerHTML = Math.floor(rocks).toString();
  }
  rsButton.title =
    `Hire a Rocket Scientist \n(+50 rocks/sec)\nCost: 1000 rocks\nYou currently have: ${numOfRs}`;
});

// Continuous growth with requestAnimationFrame
function update(currentTime: number) {
  // Calculate how much time has passed since last frame
  const deltaTime = currentTime - LastTime; // milliseconds
  LastTime = currentTime;

  // Increase rocks based on time passed
  rocks += (CounterGrowthRate * deltaTime) / 1000; // CounterGrowthRate rock(s) per second
  counterElement.innerHTML = Math.floor(rocks).toString();

  // hide shop buttons if user cant afford them
  devButton.style.display = rocks >= 10 ? "block" : "none";
  mathmButton.style.display = rocks >= 100 ? "block" : "none";
  rsButton.style.display = rocks >= 1000 ? "block" : "none";

  // Enable or disable Developer button based on available rocks
  devButton.disabled = rocks < 10;

  // Schedule the next frame
  requestAnimationFrame(update);
}

// Start the animation loop
requestAnimationFrame(update);
