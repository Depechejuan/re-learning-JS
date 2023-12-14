"use strict";
const assert = require("assert");
/*
    8 Consoles: interactive JavaScript command lines
*/
// Console can be applied on browsers or Terminal. It print whatever you like on them.

// 8.1.2 The "Node.js" REPL
// REPL Stands for "real-eval-print loop", witch means "command line"
// 8.1.3 Other options
// Check Babel's REPL - https://babeljs.io/repl
// There are also native apps and IDE plugins for running JavaScript
// Consoles often run in "non-strict mode"

// 8.2 The console.* API: Printing data and more
/*
    Check MDN: https://developer.mozilla.org/en-US/docs/Web/API/console

    Common consoles:
    console.log("message")
    console.error("error")
*/

// 8.2.1 Printing Values: console.log() (stdout)
/*
    console.log(...values: any[]): void
    console.log(pattern: string, ...values: any[]): void
*/

// 8.2.1.1 Printing multiple values:
console.log("abc", 123, true);
// At the end, console.log() always prints a newline. Therefore, if you call it with zero arguments, it just prints a newline
console.log();

// 8.2.1.2 Printing a string with substitutions
// This variants perform string substitution
console.log("Test: %s %j", 123, "abc");
// These are some of the directives you can use for substitutions:

/* 
    %s: Converts the corresponding value to a string and inserts it
    %o: Inserts a string representation of an object
    %j: Converts a value to a JSON string and inserts it
    %%: Inserts a single %
*/
console.log("$s %s", "abc", 123);
console.log("%o", { foo: 123, bar: "abc" });
console.log("%j", { foo: 123, bar: "abc" });
console.log("%s%%", 99);

// 8.2.2 Printing Error info: console.error() (stderr)
// Operates the same, but its used to show errors. For "node" it goes to "stderr" insted of "stdout" on UNIX

// 8.2.3 Printing nested objects via JSON.stringify();
// Ocassionally useful for printing nested objects.
console.log(JSON.stringify({ first: "Juan", last: "Leon" }, null, 2));

// MDN: Other console.* - Recommended and used in my opinion.
console.warn(); // Warning message. You may use string substitution and additional arguments with this method.
console.info(); // Informative logging of information. You may use string substitution and additional arguments with this method.
console.clear(); // clear console.
console.count(); // Log the number of times this line has been called with the given label.
console.countReset(); // Resets the value of the counter with the given label.
console.debug(); // Outputs a message to the console with the log level debug.
