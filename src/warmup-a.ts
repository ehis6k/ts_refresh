interface User {
    name: string;
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

type Message2 = User2 & {
    content: string;
}

function sendMessage2(message: Message2) {
    console.log(message.content);
    console.log(message.name);
}

sendMessage({ name: "John", content: "Hello" });
sendMessage2({ name: "John2", content: "Hello2" });
// Trade of in the approache using type vs interface ? 
/* 


*/