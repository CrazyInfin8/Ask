

readLine = require('readline');
module.exports.ask = ask;


/**
 * A simple function based on [prompt]().
 * It takes in user input and returns it in a callback function.
 * Much like [prompt]() you can set a regex pattern in filter or provide a function to test if user input is valid.
 * The options available are:
 * - filter
 * @param {object | string} [options] An string containing the prompt to ask the user or object containing  `filter`, `question`, `errormsg`, and/or `required`
 * @param {function} callback callback that can take answer of function
 */
function ask() {
    if (typeof arguments[0] == 'function') {
        var callback = arguments[0];
    } else {
        if (typeof arguments[0] == 'object') {
            var { question, filter, errormsg, required } = arguments[0];
        } else if (typeof arguments[0] == 'string') {
            var question = arguments[0];
        }
        if (typeof arguments[1] == 'function') {
            var callback = arguments[1];
        }
    }
    if (!callback) {
        return;
    }
    question = (typeof question == 'string' ? question : '$ > ');
    errormsg = (typeof errormsg == 'string' ? errormsg : null);
    required = (typeof required == 'boolean' ? required : true);
    let rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: question,
    });
    let answer;

    function test(filter, a) {
        if (filter instanceof RegExp) return filter.test(a);
        else if (typeof filter == 'function') return filter(a);
        else return true;
    }

    rl.on('line', a => {
        blank = /^\s*$/.test(a)
        if ((filter ? (required ? false : blank) || test(filter, a) : !(required && blank))) {
            answer = a;
            rl.close();
        } else {
            if(errormsg) {
                console.log(errormsg);
            }
            rl.prompt();
        }
    });

    rl.on('close', () => {
        if (typeof callback == 'function') {
            callback(null, answer);
        }
    });

    rl.setPrompt(question || '$ > ');
    rl.prompt();
}


async function prompt() {
    if (typeof arguments[0] == 'object' || typeof arguments[0] == 'string') {
        return require('util').promisify(ask)(arguments[0]);
    } else {
        return require('util').promisify(ask)();
    }
}

module.exports = prompt;
module.exports.prompt = prompt;
module.exports.ask = ask;