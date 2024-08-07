import { OpenAI } from "openai"; 

const openai = new OpenAI(); //set a new blueprint/instance 

const chatCompletion = await openai.chat.completions.create({
    //create components
    //message
    messages: [{
        //make a dictionary of the role and the content 
        role: 'assistant',
        content: "Greet the user with a friendly response and mention that you are undergoing maintenance"
    }],
    //define the ChatGPT model, the code-along uses gpt-3.5-turbo, the front end uses 'gpt-4o-mini'
    model: 'gpt-3.5-turbo',
    //stream the response as true
    stream: true
})
//set up a for loop for all the chat entries
for await (const chat of chatCompletion) {
    process.stdout.write(chat.choices[0]?.delta?.content || "")
}


//Init test: console.log the result - remove after for loop setup
//console.log(chatCompletion.choices[0].message.content) //add choices by the index - .choices[0].message.content

//in terminal, run node index.js