import{ADD_DECK, DELETE_DECK, ADD_QUESTION} from '../actions'

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
            return {...clone};
        case ADD_QUESTION:
            const {deckId, question} = action;
            return{
                ...state,
                [deckId]:{
                    ...state[deckId],
                    cards:{
                        ...state[deckId].cards,
                        ...question
                    }
                }
            };
        default:
            return state;
    }
}