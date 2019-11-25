// this is an api file to control the DB
// we are using AsyncStorage to set a local storage in the user browser 
// that can be saved even if the browser was closed
// AsuncStorage has three methods {getItem, mergeItem, setItem}
import {AsyncStorage} from 'react-native';

const DECKS_STORAGE_KEY = 'flashCards:decks';

// This function will grab the calendar data from the fake data onthe _calendar.js
export function fetchCalendarResults (){
    AsyncStorage.clear()
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults)
}

export function submitEntry(deck){
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, {
        [deck.id]: deck,
    })
}

export function removeEntry(key){
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then((results) => {
            results[key] = undefined;
            delete data[key];
            AsyncStorage.setItem(DECKS_STORAGE_KEY, results);
        })
}