const assert = require("assert");
/* Syntax */

/* 7.1.1 Basic constructs */
// Comments: This is the one-line comment. Above, you can use several lines of comments using "/* */"

/* 7.1.1.2 Primitive (atomic) values */
// Booleans
const thisIs = true;
const thatWas = false;
// Numbers
const number1 = 124;
const number2 = -7;
const number3 = 547.49;
// Both "integer" and "float" are in the same group for JavaScript

// Bigints (Big Ints)
const bigIng1 = 17n;
const bigInt2 = -49n;
//  Apparently, numbers type can reperesent up to 53 bits plus sign.
// BigInts can grow larger

// Strings
const string1 = "abc";
const string2 = "Me llamo Juan";
const string3 = `Strings with inerpolated values: ${number1} and ${thisIs}`;

// 7.1.1.3 Assertions
assert.equal(7 + 1, 8);
console.log(assert.equal(7 + 1, 8));
// This isn't working, and it looks like is a library.
// This compares if the operation and results are the same. Good use to compare functions or texts.

// ADDED NEXT DAY: assert was imported and this is how it works:
// if the condition is OK, it responses as "undefined", if not, it crash and give error.
// use try/catch block to avoid crashing the app
try {
    console.log(assert.equal(7 + 7, 20));
} catch (err) {
    console.log("Assertion failed", err);
}

// 7.1.4 Logging to the Console

console.log("Hello World!");
console.error("Something Went Wrong");

// 7.1.1.5 Operators
//Operator for Booleans
// "And" -- true && false
// "Or" -- true || false

//Operator for Numbers AND bigints:
const num1 = 3;
const num2 = 4;
console.log(num1 + num2); // 7
console.log(num1 - num2); // -1
console.log(num1 * num2); // 12
console.log(num1 / num2); // 0.75

// Operators for Strings
const text1 = "a";
const text2 = "b";
console.log(text1 + text2); // "ab"
console.log("I see" + 3 + "monkeys"); // I see3monkeys

// Comparation Operator
/*
    this is bigger > than this one
    this is smaller < than this one
    this is bigger or equal >= than this one
    this is smaller or equal >= than this one
    this is exactly === like this one
    this is not like !== this one
    "=" have more implications.
    Books recommend always use "===" and not "==", witch has other implications
*/

console.log(3 < 4); // true
console.log(3 <= 4); // true
console.log(3 > 4); // false
console.log(3 >= 4); // false
console.log("abc" === "abc"); // true
console.log("abc" !== "def"); // false

// Declaring variables
/* 
    Const creates immutable variable bindings. It has to be initialized inmidately and it always be the same value.
    Of course, it has to be declared with the value
*/
const x = 8; //
// if you do x = 9 it would cause "TypeError"

/* 
    let creates mutable variable. It can be changed during code.
*/
let y;

y = 3 * 5;
let z = 3 * 5;
