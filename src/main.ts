import "./style.css";
let rocks: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Slamming Your Head Against a Wall</h1>
  <p>Rocks: <span id="counter">0</span></p>
  <button id="increment">🧱</button>
`;

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  // This looks like to a good place to add some logic!
  rocks += 1;
  counterElement.innerHTML = rocks.toString();
  console.log("I have these thingies:", button, counterElement, rocks);
});
