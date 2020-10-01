#Home serve now

This project has both backend and frontend components.
The frontend has been bootstraped from create-react app.
The backend is a Hapi server.
The proxy between the two was not implemented.

There are parts on the frontend that are not implemented ( adding a new tradesperson and choosing a job ).

The whole project can be started by downloading and installing docker.

Then running `docker-compose up` should start a mongodb instance + the backend + the frontend running on: `localhost:3000`

If no `docker-compose` is available then the following needs to happen:
In config.json a mongodb uri needs to be provided. There is a mongo-init.js file which can be used to create an initial db.
Then `npm install`
`npm run front-end` to start the frontend on port 3000
`npm run back-end` to start the backend on port 4000
