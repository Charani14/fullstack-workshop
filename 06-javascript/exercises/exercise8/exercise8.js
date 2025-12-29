function printPyramid() {
    let rows= parseInt(prompt("Enter the number of rows for the pyramid:"));
    let pyramid = "";       
    for (let i = 1; i <= rows; i++) {
        // Print spaces
        for (let j = i; j < rows; j++) {
            pyramid += " ";
        }
        // Print stars
        for (let k = 1; k <= (2 * i - 1); k++) {
            pyramid += "*";
        }
        pyramid += "\n"; // Move to the next line after each row
    }
    console.log(pyramid);
    alert(pyramid);   
}