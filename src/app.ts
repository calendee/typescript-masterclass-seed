/**
 * "this" primer
 */

// Function
function myFunction() {
  console.log('Function : ', this);
}

// Will console the window
myFunction();

// Object Literal
const myObj = {
  stuff: '123',
  myMethod() {
    console.log('Object : ', this);
  }
}

// Will console the object
myObj.myMethod();

class MyClass {
  constructor(name) {
    this.name = name;
  }
  myMethod() {
    console.log('Class : ', this);
  }
}


// Will console the class
const myInstance = new MyClass('Bob');
myInstance.myMethod();