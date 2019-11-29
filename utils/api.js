// this is an api file to control the DB
// we are using AsyncStorage to set a local storage in the user browser 
// that can be saved even if the browser was closed
// AsuncStorage has three methods {getItem, mergeItem, setItem}
import {AsyncStorage} from 'react-native';

const DECKS_STORAGE_KEY = 'flashCards:decks';

// This function will grab the calendar data from the fake data onthe _calendar.js
export function fetchCalendarResults (){
    
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults)
        AsyncStorage.getItem()
        AsyncStorage.clear()
}

export function submitEntry(deck){
        return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [deck.id]: deck,
    }))
}

export function removeEntry(id){
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[id] = undefined;
            delete data[id];
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
        })
}

export function submitQuestion(deckId, question){
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse)
        .then((results) => {
            console.log(deckId)
            const data = {
                ...results,
                [deckId]:{
                    ...results[deckId],
                    cards:{
                        ...results[deckId].cards,
                        ...question
                    }
                }
            }
            console.log(data)
            
            
           AsyncStorage.setItem(DECKS_STORAGE_KEY,JSON.stringify(data));
        })
}