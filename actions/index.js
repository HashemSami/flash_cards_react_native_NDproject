import {submitEntry, removeEntry, submitQuestion} from '../utils/api';


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
function deleteDeck(id){
    return{
        type: DELETE_DECK,
        id,
    }
}

export function handleDeleteDeck(id){
    return (dispatch) => {
        removeEntry(id).then(() => dispatch(deleteDeck(id)));
    }
}

function addquestion(deckId, question){
    return{
        type: ADD_QUESTION,
        deckId,
        question
    }
}

export function handleAddQuestion(deckId, question){
    return (dispatch) =>{
        submitQuestion(deckId, question).then(() => dispatch(addquestion(deckId, question)));
    }
}