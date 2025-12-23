function playGame() {
let name= prompt("Enter your name:");
let adjective= prompt("Enter an adjective:");
let noun= prompt("Enter a noun:");
let verb= prompt("Enter a verb:");
let place= prompt("Enter a place:");

let story= `One day, ${name} found a ${adjective} ${noun}  that could ${verb} in the ${place}`;

alert(story);
}
