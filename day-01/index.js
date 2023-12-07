"use strict";

/* 
    New in ECMAScript 2022
*/

// method "at".
const array = ["a", "b", "c"];
console.log(array.at(0)); // Recieve "a", because its the first value on the array (position 0 is 1st position - position 1 is second position)
console.log(array.at(-1)); // Recieve "c", because is the last value on the array (Easy access to last item)
console.log(array.at(-2)); // Recieve "b", because is the one item before the last one, so you can access to it easy.
// You can also use them on Strings variables:
const userName = "Juan";
console.log(userName.at(0)); // recieve "J", because is the first letter.

// THIS WONT WORK!
const person = {
    name: "Juan",
    age: 37,
};
// console.log(person.at(0)); // This WONT WORK! since this featured don't apply to objects.

// but maybe this ...
const footballTeam = [
    {
        name: "Juan",
        age: 37,
    },
    {
        name: "Paco",
        age: 27,
    },
    {
        name: "Antonio",
        age: 35,
    },
];
console.log(footballTeam.at(0)); // Recieve first object.
