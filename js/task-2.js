// Area of ​​the trapezoid 
const textHTML = document.querySelector(".trapezoid-area");

const firstBase = 15;
const secondBaseBase = 27;
const triangleLeg = 12;
const triangleHypotenuse= 15
const height = Math.sqrt(Math.pow(triangleHypotenuse, 2) - Math.pow(triangleLeg, 2)); // Pythagorean theorem

function trapezoidArea(firstBase, secondBase, height){
   const area = ((firstBase + secondBase) * height) / 2;
 return area;
}

textHTML.innerHTML = `The area of ​​the trapezoid is: ${trapezoidArea(firstBase, secondBaseBase, height)}`;

console.log(height);
console.log(trapezoidArea(firstBase, secondBaseBase, height));


