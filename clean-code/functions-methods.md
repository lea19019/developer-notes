# Functions & Methods

## What makes up a functions?

Let's say a functions is composed of of the body, where the logic of the function lives, and calling the function. These two parts of the functioin should be easy to interact with, meaning easy to read and to modify.

## Calling

The number and order of arguments matter, **minimize the number of parameters**. 
Having less parameters to worry about will make it easier to work with, having 0 parameters is the best and should always avoid having more than 3 parameters.

**Parameters** <br>
**0:** Easy to understand and call, best possible option <br>
**1:** Easy to understand and call, very good possible option<br>
**2:** Decent to understand and acceptable to call, use with caution <br>
**3:** Challenging to understand and to call, avoid if possible <br>
**>3:** Dfficult to read, understand, and to call, always avoid <br>

When having the need to pass multiple parameters, you should consider creating an object containing the data you want to use and pass it to the function.

```ts
class User {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
  }
}

const user = new User('Max', 31, 'max@test.com');
```
Technically is now just one parameter
```ts
class User {
  constructor(userData) {
    this.name = userData.name;
    this.age = userData.age;
    this.email = userData.email;
  }
}

const user = new User({ name: 'Max', email: 'max@test.com', age: 31 });
```

## Body

Functions should be small!

Write small functions that do ONE thing. 
Functions should do work that's one level of abstraction below their name. This would mean that the job done inside the body of a function should be closely related to the name if the function itself.

The work done inside the function makes sense according to the name
```ts
function emailIsValid(emai) {
    return emai.includes('@');
};
```

In the other hand, it's a bit harder to figure the if statement below.
```ts
function saveUser(email) {
    if (email.includes('@')) { ... }
    // ...
}
```

## Example of Splitting functionality

Function that has problems with levels of abstraction and code that works in the same functionality.
```js
function craeteUser(email, password) {
    if (!email || !email.includes('@') || !password || password.trim() === '') {
        console.log('Invalid input!');
        return;
    }

    const user = {
        email: email,
        password: password
    };

    database.insert(user);
}
```

Splitted version
```js
function createUser(email, password) {
  try {
    setupUser(email, password);
  } catch (error) {
    handleError(error);
  }
}

function setupUser(email, password) {
  validateUserData(email, password);

  const user = {
    email: email,
    password: password,
  };

  saveUserToDatabase(user);
}

function validateUserData(email, password) {
  if (!userDataIsValid(email, password)) {
    throw new Error('Invalid input!');
  }
}

function userDataIsValid(email, password) {
  return emailIsValid(email) && passwordIsValid(password);
}

function emailIsValid(email) {
  return email && email.includes('@');
}

function passwordIsValid(password) {
  return password && password.trim() !== '';
}

function saveUserToDatabase(user) {
  database.insert(user);
}

function handleError(error) {
  console.log(error.message);
}
```

## Don't Repeat Yourself (DRY)

Don't write the same code more than once. This is another important reason why you might want to split the functionality of your code. When you write the same code in different places and you want to make a change, you would have to write the same code in all those places. Reusability matters, at least sometimes.

## Side Effects

You can have functions that are pure or impure, this means that a pure function will not alter the state of the program, whereas an impure function will.
You should strive to make sure you have impure functions, but there may be occations when that is not posible, so your naming should give a hint that it may produce a side effect.

Showing a message to the user is a change to the state of the program, bear that in mind.

[Return to Intro](./intro.md)