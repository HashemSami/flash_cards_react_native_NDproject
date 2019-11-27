import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import reducer from './reducers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import middleware from './middleware';
import AddDeck from './components/AddDeck';
import DeckList from './components/DeckList';
import { createAppContainer } from "react-navigation";
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import { purple, white } from './utils/colors';
import Constants from 'expo-constants';
import AddQuestion from './components/AddQuestion';
import DeckView from './components/DeckView';

function CustomStatusBar({backgroundColor, ...props}){
  return(
    <View style={{backgroundColor, height:Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const store = createStore(reducer,middleware);

const tabRoutesConfigs = {
  DeckList:{
    screen: DeckList,
    navigationOptions:{
      tabBarLabel: 'Decks List',
      tabBarIcon: ({tintColor}) => <FontAwesome name='list' size={30} color={tintColor}/>
    }
  },
  AddDeck:{
    screen: AddDeck,
    navigationOptions:{
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({tintColor}) => <FontAwesome name='folder-plus' size={30} color={tintColor}/>
    }
  }
}

const TabNavigatorConfig = {
  navigationOptions:{
    header:null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios'? purple : white,
    style:{
      height:56, backgroundColor: Platform.OS === 'ios'? white:purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset:{
        width: 0, 
        height:3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabContainer = Platform.OS === 'ios'? createBottomTabNavigator(tabRoutesConfigs,TabNavigatorConfig)
  : createMaterialTopTabNavigator(tabRoutesConfigs,TabNavigatorConfig);

const StackNavigator = {
  Home : {
    screen: TabContainer,
  },
  DeckView:{
    screen: DeckView,
  },
  AddQuestion:{
    screen: AddQuestion,
  }
}

const MainNavigation = createAppContainer(createStackNavigator(StackNavigator))

export default function App() {
  return (
    <Provider store={store}>
      <View style={{flex:1}}>
        <CustomStatusBar backgroundColor={purple} barStyle='light-content'/>
        <MainNavigation/>
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
