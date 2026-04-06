async function testAsync () : Promise<void>{
    try {
        const data = await fetch("https://example.com")
        const text = await data.text();
    } catch (e: unknown) {
        if (e instanceof Error){
            console.log("Error: ", e.message)
        } else {
            console.log("Error: ", String(e))
        }
    } finally { 
        // In reality it would be like always turning a boolean on / off 
        console.log("Debug: testAsnyc method closing")
    }
}

type User = {
    id: number,
    name: string
}

const fetchUser = async ( id: User["id"]) : Promise<User> => {
    const res = await fetch(`/api/users/${id}`)
    return (await res.json()) as User
}

async function methodWaiting() : Promise<void> {
    try {
        const res = await fetch("https://example.com")
        return (await res.json())
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.log(`Error: ${e}`)
        } else {
            console.log(`Error : ${String(e)}`)
        }
    } finally {
        console.log("api closing")
    }
    
}