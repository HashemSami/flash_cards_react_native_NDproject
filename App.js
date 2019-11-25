import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import reducer from './reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import middleware from './middleware';
import Deck from './components/Deck';

const store = createStore(reducer,middleware);




export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Deck/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
