"use strict";
const assert = require("assert");

// 7.5 Ambiguous Syntax
// Same syntax could mean different interpretations depending if used in a statement or in expression.
// 7.5.1 Same Syntax // Function declaration vs expression
// a function declaration is a statement
function id(x) {
    return x;
}

// a function expression is an expression (right-hand side of =)
const id2 = function me(x) {
    return x;
};

// 7.5.2 Same Syntax // Object Literal and Block
// In the following code, {} is an object literal. An expression creates an empty object.
const object = {};
// This is an empty code block (statement)

// 7.5.3 Disambiguation
/*
    Ambiguities are only a problem in a statement context.
    Uf the JS parser encounters ambiguous syntax, it doesn't know if it's a plain statement or an expression.
    Example:
    · If a statement starts wit hfunction: Its a function declaration or a function expression?
    · It a statement starts with {: Its an object literal or a code block?

    To resolve it, statements starting with function or { are never interpreted as expressions.
    If you want an expression statement to start with either one of these tokens, you must wrap it in parentheses:

    (function (x) {console.log(x)}('abc'))
*/

// 7.6 semicolons;

// First we create a function fia a function expression:
function a(x) {
    console.log(x);
}
// Then we invoke that function ('abc')
a("abc");

// Expression because we wrap it in parentheses: If we didn't.
// Following chapters will take more of this into detail.

// 7.6.1 Rule of thumb for semicolons
// Each statement is terminated by a semicolon:
const x = 3;
someFunction("abc");
i++;

//except statements ending with Blocks:
function foo() {
    // 0..
}
if (y > 0) {
    // ...
}

// Following case is tricky:
const func = () => {};
// "Const" declaration is a statement and should end with semicolon.
// Inside it, there's an arrow function expression. That's it, it's not the statement per se  that ends with a curly brace "{"
// Its the embebbed arrow function expression (The end of the "line")

// 7.6.2 Semicolons: Control statements.
// The body of a control statement is itself a statement. Example: This is the syntax of the "while" loop.
/*
while (condition)
    statement
*/

// The body can be a single statement
while (a > 0) a--;

// BUt blocks are also statements and therefore, legal bodies of control statements:

while (a > 0) {
    a--;
}

// If you want a loop to have an empty body, your first option is an embpuy statement:
while (processNextTime() > 0);
// Second option is an empty block:
while (processNextTime() > 0) {}

// 7.7 Automatic Semicolon Insertions (ASI)
/*
    There is not so much to write here. Since I use "Prettier" extension on VSCode, it will automatically fill and correct the code (I choose those settings).
    To see the examples properly, take a look on the Chapter 7.7 on the book
    https://exploringjs.com/impatient-js/ch_syntax.html#asi-triggered-unexpectedly
*/

// 7.9 "Strict Mode" vs sloppy mode.
// Sloppy stands for the regular mode. (default)
// "use strict"  Strict mode is the default in modules and classes, and can be switched on in scripts (how is explained later). In this mode, several pitfalls of normal mode are removed and more exceptions are thrown.
// Book asumes that you always have "strict mode" on.
// In order to activate it, just writte on line 1 "use strict";
// If you want to do it in only one block of code, you can do it like this:

// function functioInStrictMode() {
//     "use strict";
// }

// 7.9.2 "Improvements in Strict Mode"
// Let's take a look of thinkgs that "Strict" does better than sloppy.

/*
function sloppyFunc() {
    underclaredVar1 = 123;
}
sloppyFunc();
try {
    assert.equal(undeclaredVar1, 123);
    console.log("Assertion SloppyFunc is Ok");
} catch (err) {
    console.log("Assertion Failed");
}
*/
// This will trigger a "ReferenceError", because we didnt declare the variable.

/*
try {
    function strictFunc() {
        "use strict";
        undeclaredVar2 = 123;
    }
    assert.throws(() => strictFunc(), {
        name: "ReferenceError",
        message: "undeclaredVar2 is not defined",
    });
} catch (err) {
    console.log("Assertion Failed");
}
*/
//The assert.throws() states that its first argument, a function, throws a ReferenceError when it is called.
