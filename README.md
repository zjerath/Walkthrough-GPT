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
4. Once Integrated, chats and responses will be viewable in the Realtime Database tab. Corresponding code is available in src/App.jsx.
    - The same Firebase project and database can be linked with COPA's corresponding [conversation viewer](https://github.com/zjerath/Convoviewer]) if implemented as well.

To run the app locally, the same api key integration must be done. Then do the following:
1. Navigate to the directory where you want the project:

```
cd path/to/your/projects
```

2. Clone the repository:

```
git clone https://github.com/zjerath/Walkthrough-GPT.git
```

3. Follow steps 1 and 3 from the deployment instructions above if not already completed.

4. Navigate into the cloned repo:

```
cd Walkthrough-GPT
```

5. Install dependencies:

```
npm install
```

6. Then:

```
npm run start
```

Further scripts are provided below.

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

## Contact

For any questions, please contact:

Zain Jerath - zainjerath@gmail.com

Chris Riesbeck - c-riesbeck@northwestern.edu.
