// /**
//  * "this" primer
//  */

// // Function
// function myFunction() {
//   console.log('Function : ', this);
// }

// // Will console the window
// myFunction();

// // Object Literal
// const myObj = {
//   stuff: '123',
//   myMethod() {
//     console.log('Object : ', this);
//   }
// }

// // Will console the object
// myObj.myMethod();

// class MyClass {
//   constructor(name) {
//     this.name = name;
//   }
//   myMethod() {
//     console.log('Class : ', this);
//   }
// }


// // Will console the class
// const myInstance = new MyClass('Bob');
// myInstance.myMethod();










/**
 * Exploring "this" with .call, .apply, and .bind
 */

// Object Literal
const myObj = {
  stuff: '123',
  myMethod() {
    console.log('Object : ', this);
  }
}

// Will console the object
// myObj.myMethod();


// Function
function myFunction(text1: string, text2) {
  console.log('Function : ', this, text1, text2);
}


// Will console the window
myFunction('ABC', '123');

// ".call" replaces the "this" context
// The first argument is the context, all other arguments are what the method expects
// Will console the myOjb
myFunction.call(myObj, 'DEF', '456');
// Will console an empty array
myFunction.call([], 'GHI', '789');

// Apply instead of call
// You pass only two arguments 
// 1) The context
// 2) An array of ALL other arguments
// "[c]all" is for [c]omma separated arguments
// "[a]pply" is for [a]rray arguments
myFunction.apply([], ['JKL', '10, 11, 12'])


// NOTE: call and apply have been around forever
// NOTE: bind is an ES5 feature


// Bind it now for calling later
// Again, the first paramter is the context and subsequent ones are the excpected function paramters
const boundFunction = myFunction.bind([], 'XYZ', '98, 99, 100');

// All of these have the same context and params as it's already been stored
boundFunction();
boundFunction();
boundFunction();

// The bound arguments cannot be overriden!!!
boundFunction(myObj, 'dude', 'wheres my car?');

// Now, we're ONLY binding the context
// We can pass parameters now but NOT change the context
const boundFunction2 = myFunction.bind([]);
boundFunction2('dude', 'wheres my car?');
boundFunction2('sup', 'dude');
