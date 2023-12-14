"use strict";
const assert = require("node:assert/strict");

/*
    CHAPTER 11:
    Variables and assignment
*/

// Let declares mutable variables
// const declare constant (inmutable variables)

// 11.1 Let
let i;
i = 0;
i = i + 1;
assert.equal(i, 1);
// You can also assign let = 0 directly without declaring it empty first;

// 11.2 const
// const has to be initialize immidiately
const j = 0;
assert.throws(
    () => {
        j = j + 1;
    },
    { name: "TypeError", message: "Assignment to constant variable." }
);

// 11.2.1 const and immutability
/*
    in JS, const only means that the binding (association between variable name and variable value) is immutable.
    The value itsefl may be mutable, like (objects) in the following example.
*/
const obj = { prop: 0 };
// Allowed: changint properties of obj
obj.prop = obj.prop + 1;
assert.equal(obj.prop, 1);

// Not allowed
assert.throws(
    () => {
        obj = {};
    },
    {
        name: "TypeError",
        message: "Assignment to constant variable.",
    }
);

// 11.2.2 const and loops
// You can use const wit hfor-of loops, where a fresh binding is created for each iteration.
const arr = ["hello", "world"];
for (const element of arr) {
    console.log(element);
}

// In plain "for" loops, you must use let, however.
// USING SAME "arr" DECLARED ABOVE
for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    console.log(element);
}

// 11.3 Deciding between const and let
/*
    CONST: Indicates an immutable binding and that a variable never changes its value.
    LET: Indicates that the value of a variable changes. Use it only when you cant use const.
*/
// Exercise: const

// 11.4 The Scope of a variable.
// The scope of a variable is the region of a program where it can be accessed. Consider the following code.
{
    // Scope A, accesible X
    const x = 0;
    assert.equal(x, 0);
    {
        // Scope B, accesible X and Y
        const y = 1;
        assert.equal(x, 0);
        assert.equal(y, 1);
        {
            // Scope C, accesible X, Y and Z
            const z = 2;
            assert.equal(x, 0);
            assert.equal(y, 1);
            assert.equal(z, 2);
        }
    }
}
// outside, not accesible to x, y and z
/*
Commented code to avoid the file sends the assertion error. Uncomment it to check it
    assert.throws(
        () => {
            console.log(x);
        },
        {
            name: "ReferenceError",
            message: "x is not defined",
        }
    );
    */

// CUSTOM:
/*
    You can think of the Scope as stairs. Each step it's a unique scope.
    You can access to the variables on your step, and the ones above it, but not below it.
*/
// 11.4.1 Shadowing Variables.
// You can't declare the same variable twitce at the same leve.
assert.throws(
    () => {
        eval("let x = 1; let x = 2;");
    },
    { name: "SyntaxError", message: `Identifier 'x' has already been declared` }
);

// Why use "eval()"
/*
    Delays parsing (and therefore the SyntaxError) until the callback of assert.throws() is executed.
    If we didn't use it, we'd already get an error when this code is parsed and assert.throws() wouldn't even be executed.
*/

// You can nest a block and use the same variable name "x" that you used outside the block:

// using "x" declared before as const x = 1;
const x = 1;
assert.equal(x, 1);
{
    const x = 2;
    assert.equal(x, 2);
}
assert.equal(x, 1);
