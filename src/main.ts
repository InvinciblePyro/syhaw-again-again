import "./style.css";
let rocks: number = setInterval(addToRocks, 1000);

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Slamming Your Head Against a Wall</h1>
  <p>Rocks: <span id="counter">0</span></p>
  <button id="increment">🧱</button>
`;

//why do i have to make a func for setInterval why cant i jsut "rocks++"
function addToRocks() {
  rocks++;
  counterElement.innerHTML = rocks.toString();
}

// Add click handler
const button = document.getElementById("increment")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  // This looks like to a good place to add some logic!
  rocks += 1;
  counterElement.innerHTML = rocks.toString();
});
