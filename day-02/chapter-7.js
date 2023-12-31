const assert = require("assert");
// 7.1.1.7 Ordinary Functions declarations

function add1(a, b) {
    return a + b;
}

try {
    assert.equal(add1(5, 1), 6);
    console.log("assertion regular function is ok");
} catch (err) {
    console.log("Assertion failed", err);
}

// 7.1.1.8 Arrow Functions
const add2 = (a, b) => {
    return a + b;
};
// If arrow function has to contain more than 1 line, this is the way to go. (Books refer as "code block")
try {
    assert.equal(add2(5, 5), 10);
    console.log("assertion arrow function is ok");
} catch (err) {
    console.log("Assertion failed", err);
}

// Equivalent to "add2"
const add3 = (a, b) => a + b;
// If  arrow function can be expressed in just one line, this method will be the one to chose. (Book refers as "an expression")

// 7.1.1.9 Plain Objects
const obj = {
    first: "Juan",
    last: "Leon",
    getFullName() {
        return this.first + " " + this.last;
    },
};
console.log(obj);

// getting a property value
try {
    assert.equal(obj.first, "Juan");
    console.log("assertion object first ok");
} catch (err) {
    console.log("Assertion failed", err);
}
// We can change values like this:
obj.first = "Paco";
console.log(obj);

try {
    assert.equal(obj.getFullName(), "Paco Leon");
    console.log("Assertion get Full Name from Object is ok.");
} catch (err) {
    console.log("Assertion Failed", err);
}

// 7.1.1.10 Arrays
const arr = ["a", "b", "c"];
try {
    assert.equal(arr.length, 3);
    console.log("Assertion array length is ok");
} catch (err) {
    console.log("Assertion failed", err);
}
// BE CAREFUL! Array.length is 3, but array[3] doesn't exist, since length is different from position. Array has 3 items, but first item is 0 and third item is 2.
try {
    assert.equal(arr[1], "b");
    console.log("Assertion POSITION is ok");
} catch (err) {
    console.log("Assertion failed", err);
}

// now, we can change array properties.
arr[1] = "ñ";
console.log(arr);
console.log(arr[1]);
// or add new data
arr.push("d");

try {
    assert.deepEqual(arr, ["a", "ñ", "c", "d"]);
    console.log("Assertion deepEqual array is ok");
} catch (err) {
    console.log("Assertion failed", err);
}

// 7.1.1.11 Control Flow Statemets
// Conditional
let x = -1;
if (x < 0) {
    x = -x;
}
console.log(x);

// for-of loop
const arr1 = ["a", "b"];
for (const element of arr1) {
    console.log(element);
}
/*
    expected 2 lines
    Line 1: 'a'
    Line 2: 'b'
*/

//7.1.2 MODULES
// Each Module is a single file. Example: file1 - file-tools.mjs // file2 - main.mjs
// file-tools contains function "isTextFilePath"
// main imports the whole module path and the function "is-TextFilePath()"

// 7.1.3 Classes
class Person {
    constructor(name) {
        this.name = name;
    }
    describe() {
        return `Person named ${this.name}`;
    }
    static logNames(persons) {
        for (const person of persons) {
            console.log(person.name);
        }
    }
}

class Employee extends Person {
    constructor(name, title) {
        super(name);
        this.title = title;
    }
    describe() {
        return super.describe() + ` (${this.title})`;
    }
}

const jane = new Employee("Jane", "CTO");
try {
    assert.equal(jane.describe(), "Person named Jane (CTO)");
    console.log("Assertion for Employee ok");
} catch (err) {
    console.log("Assertion failed", err);
}

// 7.1.4 Exception Handling

function throwsException() {
    throw new Error("Problem!");
}
function catchesException() {
    try {
        throwsException();
    } catch (err) {
        assert.ok(err instanceof Error);
        assert.equal(err.message, "Problem!");
    }
}
// Try-Finally and Try-Catch-Finally are also supported
// We can thrpw any vlue, but features such as stack traces are only supported by "Error" and its subclasses

// 7.1.5 Legal variable and property names.
/*
    · Unicode Letters (A-Z, a-z)
    · $ _
    · Unicode digits (0-9)
        * Variable names can't start with a digit!

    You CAN'T use reserved words
    check: https://www.w3schools.com/js/js_reserved.asp
    Example: 
    const if = 123;
    // Syntax Error
    But this works 👇
*/
const obj1 = { if: 123 };
console.log(obj1.if); // 123

// 7.1.6 Casing Styles
/*
    camelCase (thisIsCamelCase)
    Underscode Case (this_is_underscore_case)
    Dash Case / Kebab case (this-is-kebab-or-dash-case)

    As far as I know, "camelCase" is the way to go.
*/

// 7.1.7 Capitalization of Names:
/* 
    // Lowercase:  
        Functions & variables: myFunction
        Methods: obj.myMethod
        CSS
            - CSS entity: special-class
            - Corresponding JS Variable: specialClass

    // Uppercase
        Classes: MyClass
        Constants: MY_CONSTANT
            - Constants are also often written in camelcase: myConstant
*/

// 7.1.8 More naming conventions

// Underscore is usually to declare that the parameter is not used. Example:
arr.map((_x, i) => i);
// If the name of a property of an object stars with underscore, is considered Private.

class ValueWrapper {
    constructor(value) {
        this._value = value;
    }
}

//7.1.9 Where to put Semicolons?
// At the end of a statement.

// Time to make a Quiz! Result on the img file

// 7.2 ADVANCED SYNTAX
// 7.3  Identifier
// 7.3.1 Valid Identifiers
/*
    First character:
        • Unicode letter (including accented characters such as é and ü and characters from
        non-latin alphabets, such as α)
        • $
        • _
    Subsequent characters:
        • Legal first characters
        • Unicode digits (including Eastern Arabic numerals)
        • Some other Unicode marks and punctuations
    Examples:
*/

const ε = 0.0001;
const строка = "";
let _tmp = 0;
const $foo2 = true;

// 7.3.2 Reserved Words
// mentioned above

// 7.4 Statement vs. expression
// Same syntax could deliver different thing depending of the use statement or expression

// 7.4.1 Statements
// A statement is a piece of code that can be executed and performs some kind of action. Example:
let myBool;
let myStr;
if (myBool) {
    myStr = "Yes";
} else {
    myStr = "No";
}

//or

function twice(x) {
    return x + x;
}

// 7.4.2 Expressions
// an Expression is a piece of code that can be evaluated to produce a value.
// For example, the code between the parentheses is an expression:

let myStr2 = myBool ? "Yes" : "No";
// The operator "? : "used between the parentheses is called "ternary operator". It is the expression version of the "if" statement
// Let's look at more examples of expressions.
console.log("ab" + "cd");
console.log(Number("1234"));
console.log(true || false);

// 7.4.3 What is allowed where?
// The body of a function MUST BE a sequence of statemens:
function max(x, y) {
    if (x > y) {
        return x;
    } else {
        return y;
    }
}
console.log(max(4, 5));

// The arguments of a function call or method cal lmust be expressions:
console.log("ab" + "cd", Number("123"));

// However, expressions can be used as statements.
// They are called "expression statements"
// The opposite is not true: When the context requires an expression, you can't use a statement.

// The following code demonstrates that any expressions bar() can be either expression or statement. Depends on the context:

function f() {
    console.log(bar()); // Bar is expression
    bar(); // bar() is (expression) statement
}
