import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {white, blue, orange} from '../utils/colors';


function DeckList(props){
    const {list, state} = props;
    const data = list.map((id) => {
        const deckInfo = state[id];
        return {
            id: deckInfo.deckId,
            name: deckInfo.deckName,
            qLength: Object.keys(deckInfo.cards).length
        }
        
    })

    if(!list.length){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
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
                renderItem={({item}) => {
                    const {qLength} = item
                    return(
                    <TouchableOpacity 
                    style={styles.item} 
                    onPress={() => props.navigation.navigate(
                        'DeckView', 
                        {name: item.name, entryId: item.id})}
                    >
                        <View style={styles.deckTitle}>
                            <Text style={{fontSize: 30, color: white}}>{item.name}</Text>
                            <Text
                            style={{fontSize: 15, color: white}}
                            >
                                {qLength===0? 'No cards in this deck': `${qLength} ${qLength === 1? 'card': 'cards'}`}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    )}
                }
                
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
    },
    deckTitle: {
        width: 300,
        height: 100,
        margin: 10,
        backgroundColor: orange,
        borderRadius: 5,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize: 25,
        color:blue,
        textAlign: 'center'
    }
  });

function mapStateToProps(state){
    return{
        list: Object.keys(state),
        state,
    }
}

export default connect(mapStateToProps)(DeckList)