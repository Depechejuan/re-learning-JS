const assert = require("node:assert/strict");

/*
    CHAPTER 9 : ASSERTIONS
*/
// 9.1 Assertions in software development
// Assertions states facts about values or pieces of code that mus be true, like:
assert.equal(3 + 5, 8);
// This assertion states that the expected result of 3 plus 5 is 8.

// 9.2 How this books use Assertions (2 ways):
// Option 1: To document results in code examples
// Option 2: To implement test-driven exercises.

// 9.2.1 Documenting results in code via Assertions.
function id(x) {
    return x;
}
// "id" returns its parameter. We can show it via assertion.
assert.equal(id("abc"), "abc");
// Obviously, you don't need an assertion to this kind of operators, but when it gets complex, it's a very good way to test your code.
// You can specify precisely what is expected
// Code examples can be tested automatically, witch ensures that they really work

// 9.2.2 Implementing test-driven exercises via assertions
// Exercises in this book are test-driven via "Mocha". Checks inside the test are made via method of assert.

// For the exercise, you must implement the function hello().
// The test checks if you have done it properly.
/*

    Use this on the exercieses folder
    function hello(x) {
        return "Hello " + x + "!";
    }

    test("First exercise", () => {
        assert.equal(hello("World"), "Hello World!");
        assert.equal(hello("Jane"), "Hello Jane!");
        assert.equal(hello("John"), "Hello John!");
        assert.equal(hello(""), "Hello !");
    });


*/

// 9.3 Normal vs Deep comparison.
// Strict equal() uses === to compare values
// An object is only equal to itself even if another object has the same content, becuase === does not compare the contents of objects, only their identities.
assert.notEqual({ foo: 1 }, { foo: 1 });

// deepEqual() is a better choice for comparing objects
assert.deepEqual({ foo: 1 }, { foo: 1 });

// Works on arrays too:
assert.notEqual(["a", "b", "c"], ["a", "b", "c"]);
assert.deepEqual(["a", "b", "c"], ["a", "b", "c"]);

// 9.4 Quick reference: Module assert:
// 9.4.1 Normal equality

// Check full documentation : https://nodejs.org/api/assert.html
/*
    function equal(actual: any, expected: any, message?: string): void;
    actual === expected MUST BE TRUE. If not, "AssertionError" will be thrown
*/

assert.equal(3 + 3, 6);
/* 
    function notEqual(actual: any, expected: any, message?: string): void
    actual !== expected MUST BE TRUE. If not, AssertionError is thrown
*/
assert.notEqual(3 + 3, 22);

/*
    The optional last parameter "message" can be used to explain what is asserted.
    If the assertion faisl, the message is used to set up the "AssertionError" that is thrown
*/

try {
    const x = 3;
    assert.equal(x, 8, "x must be equal to 8");
} catch (err) {
    console.log("Assertion failed");
    assert.equal(
        String(err),
        "AssertionError [ERR_ASSERTION]: x must be equal to 8"
    );
}

// 9.4.2 Deep Equality
/*
    Function deepEqual(actual: any, expected: any, message?:string): void
    actual MUST BE DEEPLY EQUAL TO EXPECTED! If not, AssertionError.
*/

assert.deepEqual([1, 2, 3], [1, 2, 3]);
assert.deepEqual([], []);

// to .equal(), an object is only equal to itself
assert.notEqual([], []);

// 9.4.3 Expecting Exceptions
/*
    If you want to (or expect to) recieve an exception, you need trhows():
    This function calls its first parameter, the function "block" and only succeeds if it throws an exception.
    Additional parameters can be used to specify what that exception must look like.
*/

// function throws(block: Function, message?: string): void
assert.throws(() => {
    null.prop;
});

// function throws(block: Function, error: Function, message?: string): void
assert.throws(() => {
    null.prop;
}, TypeError);

// function throws(block: Function, error: RegExp, message?: string): void
assert.throws(() => {
    null.prop;
}, /^TypeError: Cannot read properties of null \(reading 'prop'\)$/);

// function throws(block: Function, error: Object, message?: string): void
assert.throws(
    () => {
        null.prop;
    },
    {
        name: "TypeError",
        message: `Cannot read properties of null (reading 'prop')`,
    }
);

// 9.4.4 Another tool Function.
// Function fail(message: string | Error): never
// Always throws an AssertionError when it's called. That is ocassionally useful for unit testing.

try {
    functionThatShouldTrhwo();
    assert.fail();
} catch (err) {
    //success
}
