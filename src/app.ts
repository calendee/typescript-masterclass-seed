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










// /**
//  * Exploring "this" with .call, .apply, and .bind
//  */

// // Object Literal
// const myObj = {
//   stuff: '123',
//   myMethod() {
//     console.log('Object : ', this);
//   }
// }

// // Will console the object
// // myObj.myMethod();


// // Function
// function myFunction(text1: string, text2) {
//   console.log('Function : ', this, text1, text2);
// }


// // Will console the window
// myFunction('ABC', '123');

// // ".call" replaces the "this" context
// // The first argument is the context, all other arguments are what the method expects
// // Will console the myOjb
// myFunction.call(myObj, 'DEF', '456');
// // Will console an empty array
// myFunction.call([], 'GHI', '789');

// // Apply instead of call
// // You pass only two arguments 
// // 1) The context
// // 2) An array of ALL other arguments
// // "[c]all" is for [c]omma separated arguments
// // "[a]pply" is for [a]rray arguments
// myFunction.apply([], ['JKL', '10, 11, 12'])


// // NOTE: call and apply have been around forever
// // NOTE: bind is an ES5 feature


// // Bind it now for calling later
// // Again, the first paramter is the context and subsequent ones are the excpected function paramters
// const boundFunction = myFunction.bind([], 'XYZ', '98, 99, 100');

// // All of these have the same context and params as it's already been stored
// boundFunction();
// boundFunction();
// boundFunction();

// // The bound arguments cannot be overriden!!!
// boundFunction(myObj, 'dude', 'wheres my car?');

// // Now, we're ONLY binding the context
// // We can pass parameters now but NOT change the context
// const boundFunction2 = myFunction.bind([]);
// boundFunction2('dude', 'wheres my car?');
// boundFunction2('sup', 'dude');











// /**
//  * Arrow Functions and Lexical Scope
//  */

//  // The value of "this" changes (in most cases) on how it is called

//  // eXample:

//  // myFunction(); // called from the window context so "this" === window
//  class MyClass {
//    myMethod() {
//      // New scope (lexical)
//      const foo = 123;
//      // the context of "this" is the class because
//      // it was called like `myInstance.myMethod`

//      // To be able to reference the desired context later, you can save "this" to a variablle
//      const that = this;
//      console.log('1', this, foo);
//      setTimeout(function() {
//        // Another new scope (lexical)
//        // But "this" is the window object because it is called without a context
//        console.log('2', this, foo);

//        // Reference the lexical scope to get that context
//        console.log('3', that);
//        // 
//      }, 0);

//      // ES6 Array Functions solve "this"
//     setTimeout(() => {
//       // Arrow functions preserve the context from the parent!!
//       // "this" references the class instead of window
//       // An arrow function does NOT inherit "this" from the parent, it simply doesn't bind a new "this" 
//       // and therefore does not override the parent "this"
//       console.log('4', this);
//     }, 0);
//    }
//  }

//  const myInstance = new MyClass();
//  myInstance.myMethod();















/**
 * Typing "this" and "noImplicitThis"
 */

const elem = document.querySelector('.click');
const differentElem = document.querySelector('.different-click');

// DOM events have type defs as well
// Typescript has no clue what the context of "this" is; so, we need to type it
// The "this" in the argument list is for typing only!!! It's not a real argument that needs
// to get passed.  Remember that `.call` actually does pass in context first, so TS is just 
// using this first argument as typing info
function handleClick(this: HTMLAnchorElement, event: Event) {
  event.preventDefault();
  // Will log a reference to the DOM node because the element invoked handleClick
  // By default, "this" is an implicite TS "any", to prevent that, use `noImplicitThis` in tsconfig.json
  console.log('Click!', this.href);
  console.log('className = ', this.className);
}

elem.addEventListener('click', handleClick, false);

// IMPORTANT: Don't use arrow functions with event listeners because "this" does NOT get bound to the calling element!!!
differentElem.addEventListener('click', () => {
  console.log('Different Click!', this);
});