interface User {
    name: string;
}

interface User {
    age: number;
}

interface Message extends User {
    content: string;
}

function sendMessage(message: Message) {
    console.log(message.content);
    console.log(message.name);
}

type User2 = {
    name: string;
}

// Not Allowed to add new properties to the Type Alias
// type User2 = {
//     age: number;
// }

type Message2 = User2 & {
    content: string;
}

function sendMessage2(message: Message2) {
    console.log(message.content);
    console.log(message.name);
}

sendMessage({ name: "John", age: 20, content: "Hello" });
sendMessage2({ name: "John2", content: "Hello2" });

// Tradeoff in the approach using type vs interface ? 
/* 

- interfaces use extend vs type uses & to extend their properties
- you can't add new properties to to type -> Good for making sure you don't
- you can add new properties to the interface

*/