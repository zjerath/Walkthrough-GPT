# COPA
<img width="936" alt="Screen Shot 2025-06-02 at 10 19 16 PM" src="https://github.com/user-attachments/assets/574155eb-47cd-458c-bb4f-75c7b3784707" />

## Requirements

[Node](https://nodejs.org/en) 20 or greater.

## Getting Started

Instructions for deployment are below:
1. Need to configure an [OpenAI API](https://openai.com/api/) key, any other LLM will require refactoring.
    - Prompt and GPT integration can be found in api/walkthrough.js.
2. The current app is hosted through [Vercel](https://vercel.com/), but to deploy through any other service the environment vars will need to be changed.
    - A .env file will need to be created to connect the OpenAI API key to environment variables within the deployment service/technology.
    - Instructions on integrating environment variables in Vercel can be found [here](https://vercel.com/docs/environment-variables).
3. A new [Firebase](https://firebase.google.com/) project will need to be created as well. Another DB service can be integrated but will require refactoring.
    - To integrate the database, first create a new Firebase project and paste the corresponding config into src/firebase.js.
    - Once the project is created, navigate to the Realtime Database tab under the Build section and follow the instructions:
    - <img width="235" alt="Screen Shot 2025-06-02 at 10 36 41 PM" src="https://github.com/user-attachments/assets/795f19bd-363e-48f6-8194-c29f8fb336ef" />
4. Once Integrated, chats and responses will be viewable in the Realtime Database tab. Corresponding code is available in src/App.jsx
    - The same Firebase project and database can be linked with COPA's corresponding [conversation viewer](https://github.com/zjerath/Convoviewer]) if implemented as well

To run the app locally, the same api key integration must be done. Then run:

```
npm install
```

```
npm run start
```

Further instructions are below under React App Usage. 

## Contact

For any questions, please contact:
Zain Jerath - zainjerath@gmail.com
Chris Riesbeck - c-riesbeck@northwestern.edu.

## React App Usage

```
mkdir your-app-name
cd your-app-name
npx degit criesbeck/react-vitest
npm install
```
If the third step hangs after printing ``> cloned criesbeck/react-vitest#HEAD``, 
just control-C to exit then run ``npm install``.

## Test

Verify that the initial app works. Run

```
npm start
```

and open the URL displayed.

Verify that the unit tests work with

```
npm test
```

Two tests should run and pass. 

## Scripts

**package.json** defines the following scripts:

| Script           | Description                                         |
| -----------------| --------------------------------------------------- |
| npm start        | Runs the app in the development mode.               |
| npm run dev      | Runs the app in the development mode.               |
| npm run build    | Builds the app for production to the `dist` folder. |
| npm run serve    | Serves the production build from the `dist` folder. |
| npm test         | Starts a Jest-like test loop                        |
| npm run coverage | Runs the tests, displays code coverage results      |


## Git

If everything is working, set up [your local and remote repositories](https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github#adding-a-local-repository-to-github-using-git).

## Folder Structure

```
your-app-name
├── node_modules
├── public
│   ├── favicon.svg
│   └── robots.txt
└── src
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── index.jsx
    └── logo.svg
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

## Credits

React-Vitest built and maintained by [Chris Riesbeck](https://github.com/criesbeck).

Inspired by [SafdarJamal/vite-template-react](https://github.com/SafdarJamal/vite-template-react).
Expanded to include Vitest and some sample tests.

Thanks to Rich Harris for [degit](https://www.npmjs.com/package/degit).

Gitignore file created with [the Toptal tool](https://www.toptal.com/developers/gitignore/api/react,firebase,visualstudiocode,macos,windows).


## License

This project is licensed under the terms of the [MIT license](./LICENSE).
