# Prompt-Ask
## a user prompt based on [prompt](https://www.npmjs.com/package/prompt)

Prompt-Ask is simple script that the author made because they were annoyed that [prompt](https://www.npmjs.com/package/prompt) always says `prompt:` everytime it asks the user for input and was lazy to find an alternative. This script is a bit smaller and simpler than [prompt](https://www.npmjs.com/package/prompt) but it only requires readline (which comes default on latest versions of node), and can do the simples things that prompt can do such like specifying prompt questions (without saying `prompt:` all the time), can validate its input (either with regex or a function), and can return promises that wprk with `await`

## Usage
You can pass your question as a string for the first parameter
```javascript
const ask = require('prompt-ask');

ask('What is your name? ') // Ask for users name
    .then((name) = > {
        console.log(`Hello ${name}!`) // Greets the user by their name
    });
```
Prompt-Ask has a few options available available which you can set as an object for the first parameter.
```javascript
const ask = require('prompt-ask');

ask({
    question: 'What is your name? ',
    filter: /^[a-zA-Z]+$/,
    required: true,
    errormsg: 'Your name can only contain uppercase and lowercase letters'
}).then(answer => {
    // do stuff with the answer
})
```
The options are as followed:
* `question`: The question or prompt that the user will see when Prompt-Ask is run. Defaults to `$ > `
* `filter`: A function or RegEx that will test the users input. Prompt-Ask will attempt to re-ask the user if the answer doesn't fit the filter (filter will validate blank text even if `required` is set to `true`)
* `required`: Whether this question needs an answer or if blank answers are ok. If required is set to false, blank answers are returned if the user does not input an answer (when required is set to false, if there is text that does not match filter, Prompt-Ask will still attempt to re-ask it's question). defaults to true
* `errormsg`: A message displayed when the users input is not acceptable. This is either when a users input does not match the filter or if blank answers were set when `required` is true

Prompt-Ask also uses promisify to make it's results as a promise so `await` can work.
```javascript
const ask = require('prompt-ask');

async function greetUser() {
    let name = await ask('What is your name? ')
    console.log(`greetings ${name}`)
}
```