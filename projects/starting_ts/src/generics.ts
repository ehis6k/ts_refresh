// type someType = string;

// function someFunction(parameter1: someType) {
//     return parameter1;
// }

// someFunction("Hello");
// someFunction(123);

// generic function, means that can be used with any type
// type gets recognized by the compiler

interface someInterface {
    name: string;
}

function someFunction<T extends someInterface | string>(parameter1: T): T {
    console.log(parameter1);
    return parameter1;
}

someFunction<someInterface>({ name: "John" });
someFunction<string>("Hello");

someFunction({ name: "John" }); 
// someFunction(13); this gives an error because 13 is not an object that extends someInterface

someFunction({ name: "John", age: 20 }); // this succeeds because it extends someInterface

// ---------------------------------------------------------------------------------------------

function identity<T>(param: T): T {
    return param;
}

identity(123)
identity("yes")

function firstElement<T>(array: T[] | undefined): T | undefined{
    return array?.at(0);
}

firstElement([0,1,3])
firstElement(["abc","def"])
firstElement([])

// function pick<T, K extends keyof T>(obj: T, key: K) : T[K] {
//     return obj[key]
// }

function pick<T, K extends keyof T>(obj: T, key: K) : T[K]{
    return obj[key]
}

const u = { name: "Ada", age: 36}

const n = pick(u, "name")
const a = pick(u, "age")  

