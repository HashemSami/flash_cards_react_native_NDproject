import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {handleAddDeck} from '../actions'

function Deck(props){
    console.log(props)

    add = () => {
        props.addEntry('Hash')
    }
    return(
        <View>
            <Text>Heellllssssoos</Text>
            <TouchableOpacity onPress={this.add}>
                <Text>load</Text>
            </TouchableOpacity>
        </View>
    )
}

function mapDispatchToProps(dispatch){
    const deckId = Date.now() * 24 * 60 * 60 * 1000
    return {
        addEntry: (deckName) => dispatch(handleAddDeck({
            [deckId]:{
                deckId: deckId,
                deckName: deckName,
                questions:{
                    questionId:{
                        questionId: '',
                        question: '',
                        answer: ''
                    }
                }
            }
        }))
    }
}

export default connect(mapDispatchToProps)(Deck)