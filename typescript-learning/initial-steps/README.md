```
// Start Node project
npm init 

// Install TSC, TSLint, ts-node, and type declarations for NodeJS
npm install --save-dev typescript tslint @types/node ts-node

// The --save-dev option allows you to save packages under the devDependencies 
// object in your package. json file. Any packages listed under the devDependencies 
// will not be installed when you are in the production environment
```

To execute files using plain typescript you can use the following commands
```
npx tsc path/to/file.ts
node path/to/file.ts
```

And execution will be made

Using ts-node (a library) you can do the following

```
npx ts-node path/to/file.ts
```

File will automatically be executed

If I want to watch a typescript file I can just use nodemon, like the following
```
npm install --save-dev nodemon

npx nodemon src/index.ts
```

This will watch my file for any changes.

# tsconfig.json

Every TypeScript project should include a file called tsconfig.json in its root directory. This tsconfig.json is where TypeScript projects define things like which files should be compiled, which directory to compile them to, and which version of JavaScript to emit.

# tslint.json

Your project should also have a tslint.json file containing your TSLint configuration, codifying whatever stylistic conventions you want for your code (tabs versus spaces, etc.).

NOTE
Using TSLint is optional, but it’s strongly recommend for all TypeScript projects to enforce a consistent coding style. Most importantly, it will save you from arguing over code style with coworkers during code reviews.

```
./node_modules/.bin/tslint --init
```

TYPE
A set of values and the things you can do with them.

In short, TypeScript comes with a bunch of built-in types. You can let TypeScript infer types for you from your values, or you can explicitly type your values. const will infer more specific types, let and var more general ones

```
let a = true                // boolean
var b = false               // boolean
const c = true              // true
let d: boolean = true       // boolean
let e: true = true          // true
let f: true = false         // Error TS2322: Type 'false' is not assignable
                            // to type 'true'.
```
You can let TypeScript infer that your value is a boolean (a and b).

You can let TypeScript infer that your value is a specific boolean (c).

You can tell TypeScript explicitly that your value is a boolean (d).

You can tell TypeScript explicitly that your value is a specific boolean (e and f).

In general, you will use the first or second way in your programs. Very rarely, you’ll use the fourth way—only when it buys you extra type safety (I’ll show you examples of that throughout this book). You will almost never use the third way.


We should generally let TypeScript infer our types.

# Functions

In JavaScript, functions are first-class objects. That means you can use them exactly like you would any other object: assign them to variables, pass them to other functions, return them from functions, assign them to objects and prototypes, write properties to them, read those properties back, and so on. There is a lot you can do with functions in JavaScript, and TypeScript models all of those things with its rich type system.

Here is how a function looks
```
function add(a: number, b: number) {
  return a + b
}
```

You will usually explicitly annotate function parameters (a and b in this example)—TypeScript will always infer types throughout the body of your function, but in most cases it won’t infer types for your parameters, except for a few special cases where it can infer types from context (more on that in “Contextual Typing”). The return type is inferred, but you can explicitly annotate it too if you want:

```
function add(a: number, b: number): number {
  return a + b
}
```

Optional Parameters

Like in object and tuple types, you can use ? to mark parameters as optional. When declaring your function’s parameters, required parameters have to come first, followed by optional parameters:

function log(message: string, userId?: string) {
  let time = new Date().toLocaleTimeString()
  console.log(time, message, userId || 'Not signed in')
}

log('Page loaded') // Logs "12:38:31 PM Page loaded Not signed in"
log('User signed in', 'da763be') // Logs "12:38:31 PM User signed in da763be"

Default Value

function log(message: string, userId = 'Not signed in') {
  let time = new Date().toISOString()
  console.log(time, message, userId)
}

log('User clicked on a button', 'da763be')
log('User signed out')

Seems like there is the 'arguments' functionality from JS which you can just call arguments from inside the function like below

```
function sumVariadic(): number {
  return Array
    .from(arguments)
    .reduce((total, n) => total + n, 0)
}

sumVariadic(1, 2, 3) // evaluates to 6
```

But this will cause issues because the types will not be infered and get the following error

```
sumVariadic(1, 2, 3) // Error TS2554: Expected 0 arguments, but got 3.
```

To fix this we can use rest parameters

Rest parameters to the rescue! Instead of resorting to the unsafe arguments magic variable, we can instead use rest parameters to safely make our sum function accept any number of arguments:

function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

sumVariadicSafe(1, 2, 3) // evaluates to 6

Generator Functions

Generator functions (generators for short) are a convenient way to, well, generate a bunch of values. They give the generator’s consumer fine control over the pace at which values are produced. Because they’re lazy—that is, they only compute the next value when a consumer asks for it—they can do things that can be hard to do otherwise, like generate infinite lists.

They work like this:

```
function* createFibonacciGenerator() { 
  let a = 0
  let b = 1
  while (true) { 
    yield a; 
    [a, b] = [b, a + b] 
  }
}

let fibonacciGenerator = createFibonacciGenerator() // IterableIterator<number>
fibonacciGenerator.next()   // evaluates to {value: 0, done: false}
fibonacciGenerator.next()   // evaluates to {value: 1, done: false}
fibonacciGenerator.next()   // evaluates to {value: 1, done: false}
fibonacciGenerator.next()   // evaluates to {value: 2, done: false}
fibonacciGenerator.next()   // evaluates to {value: 3, done: false}
fibonacciGenerator.next()   // evaluates to {value: 5, done: false}
```


The asterisk (*) before a function’s name makes that function a generator. Calling a generator returns an iterable iterator.


Our generator can generate values forever.


Generators use the yield keyword to, well, yield values. When a consumer asks for the generator’s next value (for example, by calling next), yield sends a result back to the consumer and pauses execution until the consumer asks for the next value. In this way the while(true) loop doesn’t immediately cause the program to run forever and crash.


To compute the next Fibonacci number, we reassign a to b and b to a + b in a single step.



Iterators
Iterators are the flip side to generators: while generators are a way to produce a stream of values, iterators are a way to consume those values. The terminology can get pretty confusing, so let’s start with a couple of definitions.

ITERABLE
Any object that contains a property called Symbol.iterator, whose value is a function that returns an iterator.

ITERATOR
Any object that defines a method called next, which returns an object with the properties value and done.



Generics

GENERIC TYPE PARAMETER
A placeholder type used to enforce a type-level constraint in multiple places. Also known as polymorphic type parameter.

```
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (array, f) => // ...

// (a) T is bound to number
filter([1, 2, 3], _ => _ > 2)

// (b) T is bound to string
filter(['a', 'b'], _ => _ !== 'b')
```

Semantic Versioning
Always use a semantic version for your project with MAJOR.MINOR.PATCH numbers separated by a period (.).

When a change occurs, you should increment the appropriate number and zero those that follow. Assuming a current version of 1.2.33:

a new bug fix would update the PATCH number to version 1.2.34
new functionality that didn’t break backward compatibility would update the MINOR number to version 1.3.0
a major update with incompatible API changes would update the MAJOR number to version 2.0.0



Semantic Constraints
package.json uses special codes to indicate which version of a package can be installed on a clean machine using MAJOR.MINOR.PATCH semantic versioning (see the “Semantic Versioning” section above):

1.2.33: install an exact version<br>
\>1.2.33: install a version greater than 1.2.33 (2.0.0 is permitted)<br>
\>=1.2.33: install a version greater than or equal to 1.2.33<br>
<1.2.33: install a version less than 1.2.33<br>
<=1.2.33: install a version less than or equal to 1.2.33<br>
^1.2.33: install any greater or equal compatible version with the same MAJOR number—such as 1.3.0 but not 2.0.0 (this is the default)<br>
~1.2.33: similar to ^ but won’t go beyond the next MINOR number—that is, a maximum of 1.3.0<br>
*\ (or an empty string): install any version<br>
Versions can be combined—for example, <2.0.0 || >=3.0.0, to skip version 2.x.x.

**NOTE** You can set you're npx script inside package.json
FOr example, I had installed nodemoen only locally and the command "nodemon src/index.ts" wasn't working, I had to use 
"npx nodemon src/index.ts", but adding the script to packge.json as
```
"scripts": {
    "start": "npx nodemon src/index.ts"
  }
```
allowed me to just use `npm start` and would do the trick of npx
(I ended up installing nodemon globally, but it was for another app, will remove it globally soon with "npm uninstall nodemon --global" or " npm uninstall -g nodemon")

**ACTUALLY** just learned that you don't need "npx" inside the command of the script since it isn’t required in the command, because npm can execute locally installed packages.

**NOTE** the scripts inside package.json are run by "npm run --script-name--", but there are some special scripts such as "start" that don't require the "run" keyword, they can be executeed just as "npm start"




Pre and Post Scripts
Any script can have one or both of these:

a "pre<name>" script, which automatically runs before "<name>"
a "post<name>" script, which automatically runs after "<name>"
For example:

"scripts": {
  "prebuild": "rm -rf build",
  "build": "rollup --config",
  "postbuild: "echo build complete"
}
Running npm run build runs all three scripts in the order shown above.





Sophisticated Scripting
npm scripts are simple but powerful. Developers often use them instead of dedicated JavaScript task runners such as Grunt and Gulp.

Consider the following scripts to clean a build directory then generate HTML, CSS, and JavaScript using (imaginary) Node.js tools:

"scripts": {
  "clean"       : "rm -rf build",
  "build:html"  : "sitegen ./src/content/ ./build/ --compress",
  "build:css"   : "cssgen ./src/css/main.css --out ./build/css/",
  "build:js"    : "jsgen ./src/js/main.js ./build/js/main.js --minify"
}
A single build script could run the clean script followed by all build tools in parallel:

"build"       : "clean && (build:html & build:css & build:js)"
Executing npm run build performs all tasks in a bash shell. However, it won’t work in Windows or other shells that don’t support & and && command chaining.
