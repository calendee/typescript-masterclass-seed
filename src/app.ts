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















// /**
//  * Typing "this" and "noImplicitThis"
//  */

// const elem = document.querySelector('.click');
// const differentElem = document.querySelector('.different-click');

// // DOM events have type defs as well
// // Typescript has no clue what the context of "this" is; so, we need to type it
// // The "this" in the argument list is for typing only!!! It's not a real argument that needs
// // to get passed.  Remember that `.call` actually does pass in context first, so TS is just 
// // using this first argument as typing info
// function handleClick(this: HTMLAnchorElement, event: Event) {
//   event.preventDefault();
//   // Will log a reference to the DOM node because the element invoked handleClick
//   // By default, "this" is an implicite TS "any", to prevent that, use `noImplicitThis` in tsconfig.json
//   console.log('Click!', this.href);
//   console.log('className = ', this.className);
// }

// elem.addEventListener('click', handleClick, false);

// // IMPORTANT: Don't use arrow functions with event listeners because "this" does NOT get bound to the calling element!!!
// differentElem.addEventListener('click', () => {
//   console.log('Different Click!', this);
// });



















// /**
//  * "typeof" Type Queries
//  */

// // 'object'
//  console.log(typeof []);

//  // TS will infer the types for this object
//  const person = {
//    name: 'Justin',
//    age: 49
//  };


//  // The below does NOT assign "object" to the "type Person".
//  // Instead, it assigns the typing information from the person object
//  // to the Person variable
//  type Person = typeof person;

//  // Now, the type Person is being applied to another object
//  // Since the orginal person had an age type of "number", the person
//  // below is failing validation because it's using a string for age
//  const anotherPerson: Person = {
//    name: 'John',
//    age: '30'
//  }

//  // Can also do it in one line:
//  const yetAnotherPerson: typeof person = {
//    name: 'Jeff',
//    age: '40'
//  }


















// /**
//  * "keyof" Index Type Queries
//  */

// const person = {
//   name: 'Justin',
//   age: 49
// };

// type Person = typeof person;

// // this will have string literal keys of "name" | "age"
// type PersonKeys = keyof Person;

// // This will have pure types of :   string | number
// type PersonTypes = Person[PersonKeys];

// const anotherPerson: Person = {
//   name: 'John',
//   age: '30'
// }
















// /**
//  * "keyof", Generics and Lookup Types
//  */
// const person = {
//   name: 'Justin',
//   age: 49
// };

// type Person = typeof person;
// type PersonKeys = keyof Person;
// type PersonTypes = Person[PersonKeys];

// // Right now, hovering over personName gives us no typing information
// // function getProperty(obj: Person, key: string) {

// // K is a subtype of name and age, so it must be one of the keys name or age
// // This is a "type safe lookup" or "index access type" or "lookup type"
// // Now hovering over personName below will show a type of "string"
// // The <T, K...> are creating new types
// function getProperty<T, K extends keyof T>(obj: T, key: K) {
//   return obj[key];
// }

// const personName= getProperty(person, 'name');
// console.log(`personName = ${personName}`);


















// /**
//  * "readonly" mapped type
//  */

// // Transforming one type into another
// // NOTE: All of the examples below are no longer required to create these readonly
// // types because TS automatically does that on `freeze` now.  
// // However it's an example of map typing

// interface Person {
//   name: string;
//   age: number;
// }

// interface ReadOnlyPerson {
//   readonly name: string;
//   readonly age: number;
// }

// const person: Person = {
//   name: 'Justin',
//   age: 49
// }

// // We need an immutable object.  So, we're saying the return type will be a ReadOnlyPerson
// function freezePerson(person: Person): ReadOnlyPerson {
//   return Object.freeze(person);
// }

// const newPerson = freezePerson(person);

// // Not allowed because it's read only
// newPerson.age = 28;



// // Instead of creating a specific person interface, you can map the type like this
// // That would work for any object, not just a person object
// function freeze<T>(obj: T): Readonly<T> {
//   return Object.freeze(obj);
// }

// const newPerson1 = freeze(person);


// /// Create our own read only type
// type MyReadonly<T> = {
//   // P is placeholder for all the keys in the reference object
//   readonly [P in keyof T]: T[P]
// }

// function freezeMyReadonly<T>(obj: T): MyReadonly<T> {
//   return Object.freeze(obj);
// }


// const newPerson2 = freezeMyReadonly(person);
// // Not allowed because it's readonly
// newPerson2.age = 20;



























/**
 * "Partial" Mapped Type
 */


interface Person {
  name: string;
  age: number;
}

interface PartialPerson {
  name?: string;
  age?: number;
}

// Update a person object with just partial information while using types
function updatePerson(person: Person, prop: PartialPerson) {
  return { ...person, ...prop };
}

const person: Person = {
  name: 'Todd',
  age: 27
};

const newPerson = updatePerson(person, { name: 'Justin' });
console.log(newPerson);


// ^^^^ the above is painful because you have to maintain 2 different interfaces.
// If you change one, you have to change the other
////////////////////////////////////////////////////////////////////////
// New version using partial mapped type
// IMPORTANT : Creating a MyPartial is not really necessary because TS
// already have a `Partial` type

interface Person2 {
  name: string;
  age: number;
}

// Create a custom type
type MyPartial<T> = {
  // For each property in the reference type, return a type with that
  // property name that is optional
  [P in keyof T]?: T[P]
}

// Update a person object with just partial information while using types
function updatePerson2(person: Person2, prop: MyPartial<Person>) {
  return { ...person, ...prop };
}

const person2: Person2 = {
  name: 'Todd',
  age: 27
};

const newPerson2 = updatePerson2(person2, { name: 'Justin' });
console.log(newPerson2);


// ^^^^ the above is painful because you have to maintain 2 different interfaces.
// If you change one, you have to change the other









