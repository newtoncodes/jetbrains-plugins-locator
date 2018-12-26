# jetbrains-plugins-locator

#### Locate IntelliJ (or any JetBrains IDE) plugins at the official hub.

This is a really simple tool that will help you find your external dependencies for writing plugins for JetBrains IDEs.


### Install:

```bash
npm install -g jetbrains-plugins-locator
```


### Usage:


**Search and locate plugins (default command) at https://plugins.jetbrains.com:**
```bash
jetbrains-plugins-locator nodejs
```
*Result:*
```
Command: search-locate
Term: nodejs

{
    "key": "6098-nodejs",
    "url": "https://plugins.jetbrains.com/plugin/6098-nodejs",
    "update": 53376,
    "id": "NodeJS",
    "version": "183.5153.1",
    "since": "183.5153",
    "until": "967.24",
    "size": 990449,
    "date": "Dec 19, 2018",
    "author": {
        "name": "IntelliJ Plugin Robot",
        "key": "4cf5c427-562f-4fd9-956d-ba4cc2e0f63a"
    }
}
```


**Search for plugin keys at https://plugins.jetbrains.com:**
```bash
jetbrains-plugins-locator search nodejs
```
*Result:*
```
Command: search
Term: nodejs

6098-nodejs
10297-npm-script-runner
6560-nunitjs
10817-typescriptexecutor
```


**Locate a known plugin key at https://plugins.jetbrains.com:**
```bash
jetbrains-plugins-locator locate 6098-nodejs
```
*Result:*
```
Command: locate
Term: 6098-nodejs

{
    "key": "6098-nodejs",
    "url": "https://plugins.jetbrains.com/plugin/6098-nodejs",
    "update": 53376,
    "id": "NodeJS",
    "version": "183.5153.1",
    "since": "183.5153",
    "until": "967.24",
    "size": 990449,
    "date": "Dec 19, 2018",
    "author": {
        "name": "IntelliJ Plugin Robot",
        "key": "4cf5c427-562f-4fd9-956d-ba4cc2e0f63a"
    }
}
```
