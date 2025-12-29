// Ask user to choose conversion type
function convertTemperature() { 
let choice = prompt(
  "Choose conversion type:\n1. Celsius to Fahrenheit\n2. Fahrenheit to Celsius"
);

// Ask for temperature value
let temperature = parseFloat(prompt("Enter the temperature value:"));

let result;

// Perform conversion
if (choice === "1") {
  // Celsius to Fahrenheit
  result = (temperature * 9 / 5) + 32;
  alert(`${temperature}°C is equal to ${result.toFixed(2)}°F`);
} 
else if (choice === "2") {
  // Fahrenheit to Celsius
  result = (temperature - 32) * 5 / 9;
  alert(`${temperature}°F is equal to ${result.toFixed(2)}°C`);
} 
else {
  alert("Invalid choice! Please select 1 or 2.");
}
}
