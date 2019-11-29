import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { List,ListItem } from 'react-native-elements';
import {connect} from 'react-redux';

function DeckList(props){
    const {list, state} = props;
    const data = list.map((id) => {
        const deckInfo = state[id];
        return {
            id: deckInfo.deckId,
            name: deckInfo.deckName,
            // add sub titel of numbers of questions
        }
        
    })

    // console.log(state)

    const keyExtractor = (item, index) => index.toString();


    if(!list.length){
        return (
            <View>
                <Text>
                    Please add a new Deck!
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => 
                    <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('DeckView', {entryId: item.id})}>
                        <Text style={styles.title}>{item.name}</Text>
                    </TouchableOpacity>
                }
                
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   marginTop: Constants.statusBarHeight,
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });

function mapStateToProps(state){
    return{
        list: Object.keys(state),
        state,
    }
}

export default connect(mapStateToProps)(DeckList)