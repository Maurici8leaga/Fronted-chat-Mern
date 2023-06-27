# Frontend Chat MERN

This is the front of a social network which consists of users being able to share everything about them such as; where they are, where they studied, their thoughts etc. They can also connect with other users, meet people and talk with them.

## Get Started

The first thing to do is open the terminal of your code editor of your choice and once there you will have to make sure to enter the folder called "frontend-chat-mern", to enter it you must write "cd frontend-chat-mern".

```sh
   cd ..
   cd frontend-chat-mern
```

## Available Scripts

### `yarn run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn run lint:check`

This command will review all files with a ".ts" extension in the project and provide you with information about any errors, style issues, or problematic patterns it finds in the code.

### `yarn run lint:fix`

This command will walk through all the files in the project and apply automatic fixes to styling issues and lint errors that it can fix based on configured rules. This helps keep your code consistent and free of styling issues, saving you time by not having to manually fix every issue detected by ESLint.

### `yarn run prettier:check`

This command will launch Prettier and check the format of the files with the mentioned extensions. Prettier will report any format discrepancies and display a list of files that need to be adjusted based on the configured format rules.

### `yarn run prettier:fix`

This command will run Prettier and automatically formats the files with the mentioned extensions, applying the necessary changes to make them comply with the configured format rules.

### `yarn run build`

This command will run react-app-rewired and generate an optimized version of your React app ready to be deployed on a production server.

### `yarn run test`

This command will run react-app-rewired to run tests of your React app based on the provided settings and options. A coverage report will also be generated and warnings of unreleased resources will be displayed.

## About

This project was built with reduxjs/toolkit, testing-library/jest-do, testing-library/react, testing-library/user-event, axios, lodash, react, react-dom, react-icons, react-loading-skeleton, react-redux, react-router-dom, react-scripts, web-vitals, eslint, prettier, sass.

Additionally, it should be noted that for the structure of this project was implemented layered architecture with design patterns and SOLID principles. Which are;

| Design patterns             |   SOLID principles    |
| :-------------------------- | :-------------------: |
| Stateful/Stateless          | Single responsability |
| Render Props                |                       |
| Observer                    |                       |
| Atomic                      |                       |
| High Order Components (HOC) |                       |
| GIVEN WHEN THEN             |                       |
