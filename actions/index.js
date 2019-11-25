import {submitEntry} from '../utils/api';


export const ADD_DECK = 'ADD_DEACK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';


function addDeck(deck){
    return{
        type: ADD_DECK,
        deck,
    }
}

export function handleAddDeck(deck){
    return(dispatch) => {
        // will try the promis first then put them as seperate functions
        submitEntry(deck)
        .then(() => dispatch(addDeck(deck)));
    }
}

// continue adding deleting deck and adding question