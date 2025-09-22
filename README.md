# Libro

Libro is a full-stack appointment booking application built with React and Node.js/Express for McGill professors and students. It enables users to create, manage, and delete one-time appointments, recurring meetings, and equipment reservations. Features include user authentication, a management dashboard, polling for scheduling decisions, and public booking via URL. The app uses MongoDB for data storage.

## Instructions

Here are the instructions for running the application locally. Before running it, you should clone this repository, and ensure you have Node.js installed:

```bash
node -v
```

## Running the client

To run the react application, open a new terminal and cd into `client` then run the following:

```bash
npm install
npm start
```

You should be able to see the react application in your browser at http://localhost:3000.

## Running the server

To run the server, open a new terminal and cd into `server` then run the following:

```bash
npm install
```

- For running the development server using `nodemon`, run:

  ```bash
  npm run dev
  ```

- For running the production server, run:

  ```bash
  npm start
  ```
