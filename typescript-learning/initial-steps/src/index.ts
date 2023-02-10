class Deparment {
    name: string;

    constructor(n: string) {
        this.name = n;
    }
}

let accounting = new Deparment('Accounting');

console.log(accounting);

console.log("Hello world")

function log(text: string) {
    console.log(text)
}

log('Nani?')

const log2 = (text: string) => { console.log(text) }
log2('fdsdfas')


const nameArg = (process.argv[2] || process.env.USER || process.env.USERNAME ||  'world');
log(nameArg)

console.log("You can set your npx script inside package.json")