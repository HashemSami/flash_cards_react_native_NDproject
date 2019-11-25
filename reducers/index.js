export default function decks(state={}, action){
    switch(action.type){
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            };
        case DELETE_DECK:
            let clone = Object.assign({}, state);
            delete clone[action.id];
            return clone;
        case ADD_QUESTION:
            return{
                ...state,
                [deckId]:{
                    ...state[deckId],
                    [questions]:{
                        ...state[deckId].questions,
                        [action.question.id]: action.question
                    }
                }
            };
        default:
            return state;
    }
}