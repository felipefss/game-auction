# Game Auction

This simulates a game auction, with a simple login screen.

The main branch has the work in AngularJS, but you will find another version of it in a Docker container and other in React on the other branches.

# Build and Run
## Requirements

- NodeJs v10.15.3
- MongoDB v4.0.9

## Configuring

After cloning this repository, install the npm modules from the server folder:

```shell
~/crossover$ cd server
~/crossover/server$ npm install
```

**OBS:** Make sure you have MongoDB server running at `mongodb://127.0.0.1:27017/`

## Run

From the server folder, type:

```
~/crossover/server$ node app.js
Listening on port 3000
```

Then, on your browser, access `http://localhost:3000/`
