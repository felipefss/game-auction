# Game Auction

This simulates a game auction, with a simple login screen.

The main branch has the work in AngularJS with the option to run it on a Docker container, but you will find another version of it in React on the other branch.

# Build and Run
## Requirements

- NodeJs v10.15.3
- MongoDB v4.0.9 (not necessary if you use Docker)
- Docker version 18.09.6 (optional)
- docker-compose version 1.24.0 (optional)

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
~/crossover/server$ MONGOURL=mongodb://<mongodb_address>:<port> node app.js
Listening on port 3000
```

- **\<mongodb_address\>** should be the address where your mongoDB server is running
- **\<port\>** is the mongoDB port, usually 27017

Then, on your browser, access `http://localhost:3000/`

## Running on Docker (preferred)

If you want to run the app from a container, type the following command from the project's root folder:

```shell
~/crossover$ docker-compose -f docker/docker-compose.yml up
```

### Ending the containers

```shell
~/crossover$ docker-compose -f docker/docker-compose.yml down
```
