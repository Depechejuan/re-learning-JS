const assert = require("node:assert/strict");
suite("id_test.mjs");
import { id } from "./id.mjs";

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
