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



























// /**
//  * "Partial" Mapped Type
//  */


// interface Person {
//   name: string;
//   age: number;
// }

// interface PartialPerson {
//   name?: string;
//   age?: number;
// }

// // Update a person object with just partial information while using types
// function updatePerson(person: Person, prop: PartialPerson) {
//   return { ...person, ...prop };
// }

// const person: Person = {
//   name: 'Todd',
//   age: 27
// };

// const newPerson = updatePerson(person, { name: 'Justin' });
// console.log(newPerson);


// // ^^^^ the above is painful because you have to maintain 2 different interfaces.
// // If you change one, you have to change the other
// ////////////////////////////////////////////////////////////////////////
// // New version using partial mapped type
// // IMPORTANT : Creating a MyPartial is not really necessary because TS
// // already have a `Partial` type

// interface Person2 {
//   name: string;
//   age: number;
// }

// // Create a custom type
// type MyPartial<T> = {
//   // For each property in the reference type, return a type with that
//   // property name that is optional
//   [P in keyof T]?: T[P]
// }

// // Update a person object with just partial information while using types
// function updatePerson2(person: Person2, prop: MyPartial<Person>) {
//   return { ...person, ...prop };
// }

// const person2: Person2 = {
//   name: 'Todd',
//   age: 27
// };

// const newPerson2 = updatePerson2(person2, { name: 'Justin' });
// console.log(newPerson2);


// // ^^^^ the above is painful because you have to maintain 2 different interfaces.
// // If you change one, you have to change the other

















// /**
//  * "Required" Mapped Type and Modifiers
//  */

// interface Person {
//   name: string;
//   age?: number;
// }


// // // Modify the referenced type <T>
// // // type MyRequired<T> = {
// // type MyRequired<T> = {
// //   // NOTE: TS has need "operators".  The 2 lines below do the same thing.  The "+" is new
// //   // The both add the optional choice to the property
// //   // [P in keyof T]? : T[P];
// //   // [P in keyof T]+? : T[P];
// //   // The "-" means remove the option choice to required the property
// //   // [P in keyof T]-?: T[P];
// //   [P in keyof T]-?: T[P];
// // }

// // Modify the referenced type <T>
// // type MyRequired<T> = {

// type MyRequired<T> = {
//   // NOTE: TS has new "operators".  The 2 lines below do the same thing.  The "+" is new
//   // The both add the optional choice to the property
//   // [P in keyof T]? : T[P];
//   // [P in keyof T]+? : T[P];
//   // The "-" means remove the option choice to required the property
//   // [P in keyof T]-?: T[P];
//   [P in keyof T]-?: T[P];
// };

// // If the person did not have an age, we'd get an undefined here
// function printAge(person: MyRequired<Person>) {
//   return `${person.name} is ${person.age}`;
// }

// const person: Person = {
//   name: 'Justin',
// }

// // Not allowed because person.age is missing
// // console.log(printAge(person));

// const person2: MyRequired<Person> = {
//   name: 'Justin',
//   age: 49
// };

// console.log(printAge(person2));




























// /**
//  * “Pick” Mapped Type
//  * 
//  * Like lodash pluck : ask for a particular property of an object.  Just tell
//  * the compiler you want a specific set of the keys for a type
//  */

//  interface Person {
//    name: string;
//    age: number;
//    address: {}
//  }

//  // T and K are generic types
//  // T is the interface person
// type MyPick<T, K extends keyof T> = {
//   // If property exists in K, return its type
//   [P in K]: T[P];
// }

// // Type this using only name and age from the person interface
// // Nice for avoiding making address optional in the interface
//  const person: MyPick<Person, 'name' | 'age'> = {
//    name: 'Justin',
//    age: 49,
//  };

//  // NOTE : Pick is supported directly in TSC now:
//  const person2: Pick<Person, 'name' | 'age'> = {
//    name: 'Justin',
//    age: 49,
//  }



























// /**
//  * "Record" Mapped Type
//  * 
//  * Used when adopting the "dictionary" pattern
//  */

//  // This says the key will be a string and the value will be of type "any"
//  // which is not desirable
// // let dictionary: { [key: string]: any } = {};

// let dictionary: Record<string, TrackStates> = {};

// // NOTE: If you didn't use the interface you could do
// // let dictionary: Record<string, typeof item> = {};

// interface TrackStates {
//   current: string;
//   next: string;
// }

// // So, telling the Record type that current and next will be strings.
// // However, hard coding them is rigid
// // const item: Record<'current' | 'next', string> = {
// //   current: 'jsjskeke',
// //   next: 'ekdfkdk',
// // };
// // Use keyof to get a union type
// const item: Record<keyof TrackStates, string> = {
//   current: 'jsjskeke',
//   next: 'ekdfkdk',
// };



// // In Javascript, the index for an array is coerced to a string
// // So, for the dictionary typing above, it matches the string
// dictionary[0] = item;






















// /**
//  * typeof and Type Guards
//  * 
//  * Get type information after making a chech inside a conditional
//  */

// function foo(bar: string | number) {
//   if (typeof bar === 'string') {
//     // string!
//     return bar.toUpperCase();
//   }
//   // must be a number and TS is aware of this and will only allow number
// }


// class Song {
//   constructor(public title: string, public duration: string | number) {}
// }

// function getSongDuration(item: Song) {
//   if (typeof item.duration === 'string') {
//     return item.duration;
//   } 

//   // TS knows this must be a number
//   // return item.duration;

//   const { duration } = item;
//   const minutes = Math.floor( duration/ 60000);
//   const seconds = duration / 1000 % 60;
//   return `${minutes}:${seconds}`;
// }

// const songDurationFromString = getSongDuration(
//   new Song('Wonderfu', '05:31')
// );
// console.log('songDurationFromString = ', songDurationFromString);

// const songDurationFromMs = getSongDuration(
//   new Song('Bad Bad Bad', 330000)
// );
// console.log('songDurationFromMs = ', songDurationFromMs);
































// /**
//  * instanceof and Type Guards
//  */

// class Foo {
//   bar() {}
// }

// // ^^ This class would compile to the following ES5 code:
// // function Foo() {}
// // Foo.prototype.bar = function() {};

// const bar = new Foo();
// // This is basically asking if "bar" is a prototype of foo
// console.log(Object.getPrototypeOf(bar) === Foo.prototype);

// // Easier method
// console.log(bar instanceof Foo);




// class Song {
//   constructor(public title: string, public duration: number) {}
// }

// class PlayList {
//   constructor(public name: string, public songs: Song[]) {}
// }

// // // If you wanted to use TS to type the item manually, 
// // could do this with type assertions
// // function getItemName(item: Song | PlayList) {
// //   if((item as Song).title) {
// //     return (item as Song).title;
// //   }

// //   return (item as PlayList).name;
// // }

// // Better to do this:
// function getItemName(item: Song | PlayList) {
//   if (item instanceof Song) {
//     // TS knows this must be a song and will hint song properties
//     return item.title;
//   }

//   // TS knows this is a playlist and will hint those properties
//   return item.name;
// }

// const songName = getItemName(new Song('Blah', 303030000));
// console.log('songName = ', songName);

// const playlistName = getItemName(
//   new PlayList('The Best Songs', [ new Song('Blah de bla', 300000)])
// );
// console.log('playlistName = ', playlistName);




























// /**
//  * User Defined Type Guards
//  */


// class Song {
//   constructor(public title: string, public duration: number) {}
// }

// class PlayList {
//   constructor(public name: string, public songs: Song[]) {}
// }

// // If this function returns true, it must be a song
// // and TS uses this as a type guard
// // This only allows a boolean return because "item is Song" is a boolean return type
// function isSong(item: any): item is Song {
//   return item instanceof Song;
// }

// function getItemName(item: Song | PlayList) {
//   if (isSong(item)) {
//     return item.title;
//   }

//   return item.name;
// }

// const songName = getItemName(new Song('Blah', 303030000));
// console.log('songName = ', songName);

// const playlistName = getItemName(
//   new PlayList('The Best Songs', [ new Song('Blah de bla', 300000)])
// );
// console.log('playlistName = ', playlistName);























// /**
//  * Literal Type Guards and "in" Operator
//  */

//  // Does the window object have a property "localStorage"
//  // This is NOT the same things as "const exists = window.localStorage"
//  // because that would give the VALUE of the property if it existed
// //  const exists = 'localStorage' in window;
// //  console.log('exists = ', exists);

// //  // for (const prop in obj) {}

// //  // This would mean foo has a LITERAL type of "bar"
// //  const foo = 'bar';

// //  // This explicitly types it to a string
// //  const foo2: string = "bar";
 



// class Song {
//   // The type of kind is song
//   kind: 'song';
//   constructor(public title: string, public duration: number) {}
// }

// class PlayList {
//   // The type of kinds is playlist;
//   kind: 'playlist';
//   constructor(public name: string, public songs: Song[]) {}
// }

// function isSong(item: any): item is Song {
//   // If the property "title" exists in the item
//   return 'title' in item;
// }

// function getItemName(item: Song | PlayList) {
//   // Method using 'in'
//   // if (isSong(item)) {
//   //   return item.title;
//   // }

//   // Method using literal type guards
//   if (item.kind === 'song') {
//     return item.title;
//   }

//   return item.name;
// }

// const songName = getItemName(new Song('Blah', 303030000));
// console.log('songName = ', songName);

// const playlistName = getItemName(
//   new PlayList('The Best Songs', [ new Song('Blah de bla', 300000)])
// );
// console.log('playlistName = ', playlistName);


























// /**
//  * Intersection Types
//  * 
//  * Describe that you can combined multiple types together rather than extending interfaces
//  */


// interface Order {
//   id: string;
//   amount: number;
//   currency: string;
// }

// interface Stripe {
//   card: string;
//   cvc: string;
// }

// interface PayPal {
//   email: string;
// }

// // Creates a type that joins one type with another
// type CheckoutCard = Order & Stripe;
// type CheckoutPayPal = Order & PayPal;
// // Create a type from an interface and self-defined types
// // type CheckoutABC = Order & { name: string };

// const order: Order = {
//   id: 'abc123',
//   amount: 100,
//   currency: 'USD'
// };

// const orderCard: CheckoutCard = {
//   ...order,
//   card: '1000 2000 3000 4000',
//   cvc: '123',
// };

// const orderPayPal: CheckoutPayPal = {
//   ...order,
//   email: 'abc@123.com'
// };

// // The OLD way before spread
// // NOTE: If no type provided, TS infers CheckoutCard because `assign` has TS 
// // definitions that use the intersection of the passed in object types
// const assigned: CheckoutCard = Object.assign({}, order, orderCard);























// /**
//  * Discriminated ( or Tagged ) Union Type
//  */

// interface Order {
//   id: string;
//   amount: number;
//   currency: string;
// }

// interface Stripe {
//   // Used later to discriminate the order in the checkout
//   // This is a string literal type
//   type: 'stripe';
//   card: string;
//   cvc: string;
// }

// interface PayPal {
//   // Used later to discriminate the order in the checkout
//   type: 'paypal';
//   email: string;
// }

// type CheckoutCard = Order & Stripe;
// type CheckoutPayPal = Order & PayPal;

// const order: Order = {
//   id: 'abc123',
//   amount: 100,
//   currency: 'USD'
// };

// const orderCard: CheckoutCard = {
//   ...order,
//   card: '1000 2000 3000 4000',
//   cvc: '123',
//   type: 'stripe'
// };

// const orderPayPal: CheckoutPayPal = {
//   ...order,
//   email: 'abc@123.com',
//   type: 'paypal',
// };

// // The payload type will be one or the other
// // This is a Union type
// type Payload = CheckoutCard | CheckoutPayPal;

// function checkout(payload: Payload) {
//   // Without the "type" property in PayPal and CreditCard,
//   // typing `payload.` would autosuggest order properties but not checkout 
//   // properties because it doesn't know what type of checkout properties exist (card or paypal)

//   if(payload.type === 'stripe') {
//     // Now that we've discriminated the type, TS will hint only CheckoutCard properties
//     console.log(payload.card, payload.cvc);
//   }

//   if (payload.type === 'paypal') {
//     // Now that we've discriminated the type, TS will hint only CheckoutPayPal properties
//     console.log(payload.email);
//   }
// }




































// /**
//  * Interfaces vs Type Aliases
//  * 
//  * Generally interfaces are preferred
//  */

// interface Item {
//   name: string;
// }

// // Can be extended
//  interface Artist extends Item {
//    songs: number;
//  }

//  // This is a type alias
//  // Cannot be extended but can use intersection
//  type Artist2 = {
//    name: string;
//  } & Item;

//  // You can merge the declaration of interfaces
//  interface Artist {
//   // See how this continues the original Interface "Artist" and merges 
//   // more properties onto it - which cannot be done with a type alias
//   // However, this is frowned upon - the original interface should have
//   // had all required properties;
//    getSongs(): number;
//  }

//  const newArtist: Artist = {
//   name: 'ABC',
//   songs: 5,
//   getSongs() {
//     return this.songs;
//   }
//  }


































// /**
//  * Interface vs Classes
//  */

//  // Class: blueprint to create an object that shares the same
//  // properties, information, and methods

// // Interface : group of related properties and methods that
// // describe an object.  Provided no implemenation details nor
// // does it allow you to initialize an object

// // Should use class or interface?
// // Depends on if you just want to do type checking or provide
// // implementation details

// // Provides no implementation details - only type checking
// interface Artist {
//   name: string;
// }

// function artistFactory({ name }: Artist) {
//   // return {
//   //   id: 'abc123',
//   //   name
//   // };

//   return new ArtistCreator(name);
// }

// class ArtistCreator implements Artist {
//   constructor(public name: string) {}
// }

// artistFactory({ name: 'Justin' });






























// /**
//  * Function Generics
//  * 
//  * Create a form of dynamic type
//  */

//  class Pizza {
//    constructor(private name: string, private price: number) {}
//  }

// class List {
  
//   private list: any[] = [];

//   // A generic type
//   // private list: Array<any>

//   // COULD specify what things can go in the array like:
//   // private list: Array<Pizza>
//   // however, that means the List can't be reused later as maybe a cookie array

//   addItem(item: any): void {
//     this.list.push(item);
//   }

//   getList(): any[] {
//     return this.list;
//   }
// }

// const list = new List();
// list.addItem(new Pizza('Pepperoni', 15));

// // Provides no useful type info because it's just an "any" array
// const pizzas = list.getList();


// class BetterList<T> {
  
//   private list: T[];
      
//   addItem(item: T): void {
//     this.list.push(item);
//   }

//   getList(): T[] {
//     return this.list;
//   }
// }

// const newList = new BetterList<Pizza>();
// newList.addItem(new Pizza('Pepperoni', 15));

// // This fails because TS knows the list should only contain pizzas
// // newList.addItem({ coupon: 'pizza' });
// const newPizzas = newList.getList();

// class Coupon { 
//   constructor(private name: string) {}
// }

// // The BetterList is now generic and can receive any type of objects
// const couponList = new BetterList<Coupon>();
// couponList.addItem(new Coupon('pizza25'));
// const coupons = couponList.getList();































// /**
//  * Function Overloads
//  * 
//  * Declare different ways to use a function, great for utility functions
//  */

// // These are overload functions that TS uses to hint the 
// // parameter type and return type
// // This will NOT appear in the final compiled JS
// function reverse(str: string): string;
// // This provides a generic array type which is limiting
// // function reverse(arr: any[]): any[];
// // Use generic types to improve they array hinting
// function reverse<T>(arr: T[]): T[];

// // This is the implementation function and will be in the final compiled JS
// function reverse<T>(arrayOrString: string | T[]): string | T[] {
//   if (typeof arrayOrString === 'string') {
//     return arrayOrString
//     .split('')
//     .reverse()
//     .join('');
//   }

//   // Copy it so we're not mutating the passed in array
//   return arrayOrString.slice().reverse();
// }

// const toppings = ['bacon', 'pepperoni', 'chili'];
// const backwards = reverse('Pepperoni');
// console.log('backwards = ', backwards);
// const newToppings = reverse<String>(toppings);
// console.log('Toppings = ', toppings);
// console.log('newToppings = ', newToppings);

// const numbers = reverse<Number>([1, 2, 3]);

// // Without the overloads, typing `reverse` would provide useless type information
// // The overloads will allow TS to tell you what can be passed in as an argument
// // and what will be returns;

































// /**
//  * Numeric Enums and Reverse Mapping
//  * 
//  * By default, you get numeric values from an enum
//  */

// enum Sizes {
//   Small, Medium, Large
// }

// // If adding more declarations, must include the index
// enum Sizes {
//   ExtraLarge = 3,
// }

// console.log(Sizes.Medium);
// console.log(Sizes[2], Sizes.Large, Sizes[Sizes.Large]);

// const selectedSize = 2;
// console.log(`Selected Size = ${Sizes[selectedSize]}`);






































// /**
//  * String Enums and Inlining Members
//  */

//  // New feature of TS allows setting values to strings
//  // Unfortunately, this doesn't have reverse mappings
//  enum Sizes {
//    Small = 'small',
//    Medium = 'medium',
//    Large ='large',
//  }


// let selected: Sizes = Sizes.Small;

// function updateSize(size: Sizes) {
//   selected = size;
// }

// // Not allowed
// updateSize('Massive');
// updateSize('medium');

// updateSize(Sizes.Large);
// updateSize(Sizes.Medium);


// // If you use a `const` in front, it will do `inlining` members instead
// // of creating a sizes object

// const enum Sizes2 {
//   Small = 'small',
//   Medium = 'medium',
//   Large ='large',
// }

// let selected2 = 'small';

// function updateSize2(size: Sizes2) {
//   selected2 = size;
// }

// // Not allowed because not in enum
// updateSize2('largest');

// updateSize2(Sizes2.Large);


























// /**
//  * DefinelyTyped and @types
//  */
// import * as _ from 'lodash';
//  const sum = _.add(1, 2);
//  console.log(`Sum = ${sum}`);










































// /**
//  * Writing Declaration Files
//  * 
//  * declaring some form of types for files written in JS
//  */

//  import * as _ from 'lodash';
//  _.chunk([1, 2, 3, 4], 2);
 
































// /**
//  * Augmenting Modules with Declarations
//  */


// import * as _ from 'lodash';
// console.log(_.chunk([1, 2, 3, 4], 2));

// // Create a new lodash function
// _.mixin({
//   log(item: string) {
//     console.log(':::', item);
//   }
// });

// // works!!
// _.log('Hello!');

// // Doesn't work!
// // _.log(12);

































// /**
//  * Emitting Declaration Files From tsc
//  */


// // In tsconfig.json, setting the "declaration" property to true will
// // generate a declarations file for any functions or variables
// // The file will be in the dist directory `app.d.ts`
// // Useful when publishing a third part library
// // Setting the `declarationDir` property will determine where the file is output to
//  export class Foo {
//    constructor(public name: string) {}

//    bar(age: number) {}
//  }





































/**
 * Include, Exclude, and Files Properties
 * 
 * By default, TS will look for ANY `.ts` files and bundle them.
 * However, you can also tell the compiler which files to include or exclude
 * 
 * The priority is files, then include, then exclude.  If a file is included higher
 * up, it won't be excluded later
 */


