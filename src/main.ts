import OSTwav from "./BangerOfTheSummer.wav";
import SFXHirewave from "./CashRegister.wav";
import devArt from "./developerArt.jpg";
import { Employee } from "./EmployeeClass.ts";
import mathmArt from "./mathematicianArt.jpg";
import rsArt from "./rocketscientistArt.jpg";
import "./style.css";
import wallArt from "./wallArt.jpg";
import SFXwallSlam from "./wallSlam.wav";
const SFXWallSlam = new Audio(SFXwallSlam);
const SFXHire = new Audio(SFXHirewave);
const OST = new Audio(OSTwav);

let rocks: number = 0;
let LastTime = performance.now();
let CounterGrowthRate: number = 0;

//Types of Employees
const Dev = new Employee(
  "Developer",
  10,
  1,
  devArt,
  "Surely the job market will ALWAYS need more developers!",
);
const Maths = new Employee(
  "Mathematician",
  100,
  2,
  mathmArt,
  "They do like math and stuff... idk im not a mathematician",
);
const Rs = new Employee(
  "Rocket Scientist",
  1000,
  50,
  rsArt,
  "They're job is like super easy and they get paid way more than they should tbh",
);
const employees: Employee[] = [Dev, Maths, Rs];

// Create basic HTML structure
document.body.innerHTML = `
  <div id = "game-container">
    <h1>Slamming Your Head Against a Wall</h1>
    <p>🪨Rocks: <span id="counter">0</span>🪨</p>
    <p>Current Rock Collecting Rate: <span id="growth-rate">${CounterGrowthRate}</span> rocks/sec</p>
    <button id="increment" title="Slam your head into the wall"><img src="${wallArt}" class="icon" /></button>
    
    <p>Employees hired to slam their head against the wall <br>(hover over button for stats)</p>
    <div id = "shop-container"></div>
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

const shopContainer = document.getElementById("shop-container")!;
// Create buttons dynamically
employees.forEach((emp) => {
  const button = document.createElement("button");
  button.id = emp.role;
  button.innerHTML = `<img src="${emp.art}" class="icon" />`;
  shopContainer.appendChild(button);

  emp.button = button;

  // Set initial title
  button.title =
    `Hire a ${emp.role} \n(+${emp.profit} rock/sec)\nCost: ${emp.cost} rocks\nYou currently have: ${emp.amount}`;

  // Add click listener
  button.addEventListener("click", () => {
    if (rocks >= emp.cost) {
      emp.amount++;
      rocks -= emp.cost;
      CounterGrowthRate += emp.profit;

      //button sfx
      SFXHire.currentTime = 0; // rewind to start
      SFXHire.play(); // play the sound

      // Increase cost and round it
      emp.cost = Math.floor(emp.cost * 1.15);

      counterElement.innerHTML = Math.floor(rocks).toString();
      growthRateElement.innerHTML = CounterGrowthRate.toString();

      // Update title
      button.title =
        `Hire a ${emp.role} \n(+${emp.profit} rock/sec)\nCost: ${emp.cost} rocks\nYou currently have: ${emp.amount}`;
    }
  });
});

//growth rate element
const growthRateElement = document.getElementById("growth-rate")!;

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

OST.currentTime = 0;
OST.loop = true;

function startMusicOnce() {
  OST.play();
  document.removeEventListener("click", startMusicOnce);
}

document.addEventListener("click", startMusicOnce);

// Continuous growth with requestAnimationFrame
function update(currentTime: number) {
  // Calculate how much time has passed since last frame
  const deltaTime = currentTime - LastTime; // milliseconds
  LastTime = currentTime;

  // Increase rocks based on time passed
  rocks += (CounterGrowthRate * deltaTime) / 1000; // CounterGrowthRate rock(s) per second
  counterElement.innerHTML = Math.floor(rocks).toString();
  growthRateElement.innerHTML = CounterGrowthRate.toString();

  // update buttons visibility & disabled
  employees.forEach((emp) => {
    if (!emp.button) return;
    emp.button.style.display = rocks >= emp.cost ? "block" : "none";
    emp.button.disabled = rocks < emp.cost;
  });

  // Schedule the next frame
  requestAnimationFrame(update);
}

// Start the animation loop
requestAnimationFrame(update);
