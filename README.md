# MyReads Project

This is a project for the final assessment for Udacity's React Native course. 
The project is for creating a UI using React Native for a "flash cards" game, where users can add thier questions and answers to flash cards in order to practice on memorising them.

## TL;DR

To get start using the project right away:

* install all project dependencies with `npm install`
* start the development server with `npm start` or `yarn start` or `expo start`

## What You're Getting
```bash
├── README.md - This file.
├── .expo # Provided with Create React Native App.
├── .expo-shared # Provided with Create React Native App.
├── assets # Provided with Create React Native App.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── App.js # This is the root of the app.
├── actions # This folder includes the actions that will run when dispatching the data.
│   └── index.js # This file will include all functionalities of the actions.
├── components # This file holds the components that is running on the UI
│   ├── AddDeck.js # Component for adding a deck to the app.
│   ├── AddQuestion.js # Component for adding a card to a deck. 
│   ├── Card.js # Component for displaying cards for the user.
│   ├── DeckList.js # Component for displaying all decks added by user.
│   ├── DeckView.js # Component for displaying one deck to have different functionality in each deck.
│   └── Quiz.js # This component will render the test for the user.
├── middlewares # This folder includes the meddlewares that will run before dispatch of data.
│   └── index.js # This file will include functionalities the middleware has and send them to the app.
├── reducers # This folder is for setting the store data.
│   └── index.js # This file will include all functionalities the reducer has and send them to the app.
├── utils
│   ├── api.js # This file holds the functions for interacting with the data base "in this app AsyncStorage was used".
│   ├── colors.js # This file holds deferent colors were used in the app.
│   └── helpers.js # This file holds helper functions were used in the app.
└──
```