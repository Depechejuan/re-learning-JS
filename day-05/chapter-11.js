"use strict";
const assert = require("node:assert/strict");

// 11.6 Static Vs Dynamic
/*
    Static: Means that something is related to source code and can be determined without executing code
    Dynamic: means at runtime
*/

// 11.6.1 - Static Phenomenon: Scopes of variables:
// Variable scope are a static phenomenon. Considering the following code:

function f() {
    const x = 3;
}

// "x" is staticalaly (or lexically) scoped. That is, its scope is fixed and doesn't change at runtime
// Variable scopes form a static tree. (static nesting)

// 11.6.2 - Dynamic Phenomenon: Function calls:
// Function calls are a dynamic phenomenon
function g(x) {} // Line A
function h(y) {
    if (Math.random()) g(y);
}
// Whether or not the function call in in line A happens, can only be decided at runtime.
// Function calls from a dynamic tree (via dynamic calls)

// 11.7 Global variables and the global object.
/*
    JS variable scopes are nested. They form a tree.
        · The outermost scope is the root of the tree
        · The scopes directly contained in that scope are the children of the root
        · And so on.

    The root is also called "global scope". In web browsers the only location where one is directly in that scope is at the top level of a script.
    The variables of the GlobaL Scope are called "global variables" and accesible everywhere. There are 2 kinds of Global Variables:
        · Global declarative variables - Are normal variables.
            - The y can only be created while at the top level of a script, via "const", "let" and "class" declarations.
        · Global object variables - are stored in properties of the so-called "global object"
            - They are created in the top level of a script via "var" and function declarations.
            - The global object can be accessed via the global variable "globalThis". It can be used to create, read and delete global object variables.
            - Other than that, global object variables work like normal variables.

        The following HTML fragment demostrates globalThi and the two kinds of global variables:

        Execute this at the chapter-11.html file
        <script>
            const declarativeVariable = 'd';
            var objectVariable = 'o';
        </script>
        <script>
            // All scripts share the same top-level scope:
            console.log(declarativeVariable); // 'd'
            console.log(objectVariable); // 'o'
            // Not all declarations create properties of the global object:
            console.log(globalThis.declarativeVariable); // undefined
            console.log(globalThis.objectVariable); // 'o'
        </script>

    Each ECMAScript module has its own scope. Therefore, variables that exist at the top level of a module are not global.


*/

// 11.7.1.1 Alternatives to globalThis.
/* 
        Older ways of accessing the global object depends on the platform:
            · Global variable "window": is the classic way of reffering to the global object. But it doesn't work in "Node.js" and in Web Workers.
            · Global variable "self": is available in Web Workers and browsers in general. But it isn't supported by Node.js
            · GLobal variable "global": is only available in Node.js
    */

// 11.7.1.12 Use cases for globalThis.
/* 
    The global object is now considered a mistake that JS can't get rid of, due to backward compatibility. It affects performance negatively and its generally confusing.

    ECMAScript 6 introduced several features that make it easier to avoid the global object, for example:
        · const let and class declarations don't create global object properties when used in Gobal Scope.
        · Each ECMAScript module has its own local scope.

    It is usually better to access global object variables via variables and not via properties of globalThis.
    The former has always worked the same on all JS platforms.

    Tutorials on the web ocassionally access global variables "globVar" via window.globVar.
    But the prefix "window" is not necessary and I recommend to omit it.
    
    window.encodeURIComponent(str); // no
    encodeURIComponent(str); // yes

    Therefore, are relatively few use cases for globalThis, like:
        · Polyfills that add new features to Old JS engines.
        · Feature detection, to find out what features a JS engine supports.

        // What is Polyfills? Emulating native web platform features
        That is an advanced module (27), so we will take care of it later
*/

// 11.8 Declarations: Scope and activation:
/*
    2 keys aspect of declarations:
        · Scope: Where can a declared entity be seen? This is a static trait.
        · Activation: When can I access an entity? This is a dynamic trait. Some entities can be accessed as soon as we enter their scopes. For others, we have to wait until execution reaches their declarations.
*/

// 11.8.1 "const" and "let": Tempral dead zone.

// For JS, TC39 needed to decide what happens if you access a constant in its directo scope befire its declaration
try {
    console.log(a);
    const a = "x";
} catch (err) {
    console.log("This cause a Reference Error");
}

/*
    Possible approaches:
        1.- The name is resolved in the scope surrounding the current scope
            was rejected because there is no precedent in the language for this approach.
            It would therefore not be intuitive to JS programmers
        2.- You get undefined
            was rejected because then "a" wouldn't be a constant - It would have different values and after its declaration
            "let" uses the same approach 3 as const, so that both work similarly and it's easey to switch between them.
            The time between entering the scope of a variable and executing its declaration is called "the temporal dead zone" of that variable:
                · During this time, the variable is considered to be uninitialized (as if that were as pecial value it has
                · If you access an uninitialized variable, you get a "referenceError"
                · Once you reach a variable declaration, the variable is set to either the value of the initializer (specified via the assignment symbol) or "undefined" - if tere's no initializer
            The following code ilustrates the temporal dead zone.

*/

if (true) {
    assert.throws(() => (tmp = "abc"), ReferenceError);
    assert.throws(() => console.log(tmp), ReferenceError);

    let tmp;
    assert.equal(tmp, undefined);
}

/*
    Next example shows that the temporal dead zone is truly "temporal" (related to time)
*/

if (true) {
    const func = () => {
        console.log(myVar);
    };

    let myVar = 3;
    func();
}

/*
    Even though func() is located before the declaration of myVar, and uses that variable, we can call func().
    But we have to wait until the temporal dead zone of myVar is over.
        3.- There is an error
*/

// 11.8.2 Function declarations and early activation
/*
    In this section, we are using functions – before we had a chance to learn them properly.
    Hopefully, everything still makes sense.
    Whenever it doesn’t, please see §25 “Callable values”
*/
// A Function declaration is always executed when entering its scope, regardless of where it is located within that scope.
// That enables you to call afunction foo() before its declared:

assert.equal(foo(), 123);
function foo() {
    return 123;
}
// This is the same as:
function foo2() {
    return 123;
}
assert.equal(foo2(), 123);

// If you declare a function via "const" or "let", then it is not activated early. In the following example you can use "bar()" after its declaration.

assert.throws(() => bar(), ReferenceError);
const bar = () => {
    return 123;
};
assert.equal(bar(), 123);

// 11.8.2.1 Calling ahead without early activation:
// Even if a function k() is not activated early, it can be aclled by a preceding function p() (In the same scope) if we adhere to the following rule:
// p() must be invoked after the declaration of k().
const p = () => k();
const k = () => 123;
assert.equal(p(), 123);

// The functions of a module are usually invoked after its complete body is executed. Therefore, in modules, you rarely need to worry about the order of functions-
// Lastly, note how early activation automatically keeps the aforementioned rule:
// When entering a scope, all functions declarations are executed first, before anny calls are made.

// 11.8.2.2 A pitfall of earl activation.
/*
    If you rely on earlyactivation to call a function before its declaration, then you need to be careful that it doesn't access data that isn't activated early.
*/
funcDecl();
const MY_STR = "abc";
function funcDecl() {
    assert.throws(() => MY_STR, ReferenceError);
}
// The problem goes away if you make the call to "funcDecl()" after the declaration of "MY_STR"

// 11.8.2.3 The pros and cons of early activation:
/*
    We have seen that early activationn has a pitfall and you can get most of its benefits without using it.
    Therefore, it is better to avoid early activation. But I don't feel strongly about this and, as mention before, often use function declarations because I like their syntax
*/

// 11.8.3 Class Delcarations are not activated early:
// Even though they are similar to function declaration in some ways, class declarations are not activated early:

assert.throws(() => new MyClass(), ReferenceError);
class MyClass {}
assert.equal(new MyClass() instanceof MyClass, true);
// Why is that? Consider the following class declaration:
class MyClass2 extends Object {}
// The operand of "extends" is an expression. Therefore, you can do things like this:
const identity = (x) => x;
class MyClass3 extends identity(Object) {}

// Evaluating such an expression must be done at the location where it is mentioned. Anything else would be confusing. That explains why class delcarations are not activated early

//11.8.4 var: hosting (partial early activation)
// var is an older way of declaring variables that predates "const" and "let" (witch are preferred now). Consider the wollowing var declaration.

var z = 123;

/*
    This declaration has two parts:
        · Declaration "var z": The scope of a var-declared variable is the innermost surrounding function and not the innermost surrounding block as for most other declarations.
            Such variable is already active at the beginning of its scope and initialized with "undefined".
        · Assignment z = 123: The assignment is always executed in place.

    The following code demonstrates the effects of var:
*/
function q() {
    // partial early activation
    assert.equal(w, undefined);
    if (true) {
        var w = 123;
        // The assignment is executed in place
        assert.equal(w, 123);
    }
    assert.equal(w, 123);
}

// 11.9 Closures.
// Before we can explore closures, we need to learn about bound variables and free variables.

// 11.9.1 Bound Variables vs Free variables.
/*
    Per scope, there is a set of variables that are mentioned. Among these variables we distinguis:
        · "Bound Variables" are declared within the scope. They are parameters and local variables.
        · "Free Variables" are declared externally. They are also called "non-local variables"

    Consider the following code:
*/

function funct(x) {
    const y = 123;
    console.log(z);
}
// In the body of funct(), x and y are bound variables. z i a free variable.

// 11.9.2 What is a closure?
/*
    A closure is a function plsu a connection to the variables that exisit at its "birth place"
    What is the point of keeping the connection? It provides the values for the free variables of the function - for example:
*/

function funcFactory(value) {
    return () => {
        return value;
    };
}
const fun = funcFactory("abc");
assert.equal(fun(), "abc");
/*
    funcFactory returns a closure that is assigned to func. Because func has the connection to the variables at its birth place, it can still access the free variable "value" when is called in line A (even thoug it "escaped" its scope)

        ** ALL FUNCTION IN JS ARECLOSURES
        Static scoping is supported via closures in JavaScript. Therefore, every function is a closure.

*/

// 11.9.3 Example: A factory for incrementors:
/*
    The following function returns "incrementors" (a name that the books made up).
    An incrementor is a function that internally stores a number.
    Whe nit is called, it updates that number by adding the argument to it and returns the new value.
*/

function createInc(startValue) {
    return (step) => {
        //A
        startValue += step;
        return startValue;
    };
}
const inc = createInc(5);
assert.equal(inc(2), 7);

/*
    We can see that the function created in line "A" keeps its internal number in the free variable "startValue".
    This time, we don't just read from the birth scope, we use it to store data that we change and that persist across function calls.

    We can create more storatge slots in the birth scope, via local variables.
*/
function createInc2(startValue) {
    let index = -1;
    return (step) => {
        startValue += step;
        index++;
        return [index, startValue];
    };
}
const inc2 = createInc2(5);
assert.deepEqual(inc2(2), [0, 7]);
assert.deepEqual(inc2(2), [1, 9]);
assert.deepEqual(inc2(2), [2, 11]);

// 11.9.4 Use cases for Closures:
/*
    What are closures good for?
        · For starters, they are simply an implementation of static scoping. As such, they provide context data for callbacks.
        · The ycan also be used by functions to store state that persist across function calls.
            createInc() is an example of that.
        · And they can provide private data for objects (produced via literals, or classes).
            The details of how that works is explained in "Exploring ES6" chapter
*/
