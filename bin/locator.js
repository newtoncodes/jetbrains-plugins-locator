#!/usr/bin/env node

const {search, locate, searchLocate} = require('../src/Locator');

let cmd = 'search-locate';
let term = process.argv[2];

if (process.argv[3]) {
    cmd = process.argv[2];
    term = process.argv[3];
}

if (cmd !== 'search-locate' && cmd !== 'search' && cmd !== 'locate') {
    console.error('Invalid command. Options: search, locate, search-locate. Default: search-locate.');
    process.exit(1);
}

console.log('Command: ' + cmd);
console.log('Term: ' + term);
console.log();

(async () => {
    
    if (cmd === 'search-locate') {
        for (let meta of await searchLocate(term, 100)) {
            console.log(JSON.stringify(meta, null, 4));
            console.log();
        }
    }
    
    else if (cmd === 'search') {
        for (let result of await search(term)) {
            console.log(result);
        }
        
        console.log();
    }
    
    else if (cmd === 'locate') {
        console.log(JSON.stringify(await locate(term), null, 4));
        console.log();
    }
    
})().then(() => {}).catch(error => {
    console.error('Error: ' + error.message);
    process.exit(1);
});
