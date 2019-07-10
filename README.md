# post-it
An application that allows you to share post-it messages with the world!

This was an experiment to test out node as well as what it's like to perform front-end changes using web apis.

## Tools
- Server side: Node.js
- Web framework: Express
- HTML Templating: Pug
- Front-end: SASS/JS
- Additional Libs: interactjs, badwords

## To run locally
Clone the repository onto your local machine.
```Shell
git clone https://github.com/miles-crighton/post-it.git
```

Download the required npm modules:
```Shell
npm install
```

Start a local node.js server:
```Shell    
npm start
```

You can then connect through a browser via local host on port 3000 (0.0.0.0:3000)

# Todo

- [ ] Add server-side json file store
- [X] Update styling
- [ ] Add client message data polling
- [X] Indicate connection error to user
- [ ] Client-side profanity filter option
- [X] Add color options for post-its
- [ ] Add Screenshot to Readme
