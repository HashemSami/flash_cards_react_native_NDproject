import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {handleDeleteDeck} from '../actions'

class DeckView extends Component{
    

    shouldComponentUpdate(nextProps){
        // it will return tru or false
        return nextProps.deck === null;

    }

    handleDeleteButton = () => {
        const {remove, goBack} = this.props;
        remove();
        goBack();

    }

    render(){
        const {deck} = this.props;
        // console.log(deck)
        return(
            <View>
                <Text>{deck.deckName}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddQuestion', {entryId: deck.deckId})}>
                    <Text>Add Question</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleDeleteButton()}>
                    <Text>Delete Deck</Text>
                </TouchableOpacity>
            </View>
        )
    }
};

function mapStateToProps(state, {navigation}){
    const {entryId} = navigation.state.params;
    
    return{
        deck: entryId? state[entryId]: null
    }
}

function mapDispatchToProps(dispatch, {navigation}){
    const {entryId} = navigation.state.params;

    return{
        remove: () => dispatch(handleDeleteDeck(entryId)),
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);