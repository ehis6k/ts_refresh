// -------- = types
type LLMMessage = {
    role: "user" | "assistant"
    content: string

}

type LLMRequest = LLMMessage & { 
    model?: string
    temperature?: number  
    maxTokens?: number
}

type LLMRepsonse = {
    assisted_text: string
    usage: number
    finishedReason: string 
}

// -------------------- = api

function delay(ms: number) : Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fakeLLM (input: LLMRequest) : Promise<LLMRepsonse> {
    await delay(60)
    const echo = `Echo: ${input.content}`;

    return {
        assisted_text: echo,
        usage: input.content.length,
        finishedReason: "stop",
      };
}

async function main(): Promise<void>{
    
    const request: LLMRequest = {
        role: "user",
        content: "Hello, fake model",
        temperature: 0.7,
      };


    try {
        
       const resp = await fakeLLM(request);
       console.log(resp.assisted_text, resp.usage, resp.finishedReason);
    }catch (e: unknown) {
        if (e instanceof Error){
            console.log(`error ${e}`)
        } else {
            console.log("Error:", String(e));
        }
    } finally {
        console.log("main method is has been applied")
    }
}

void main()