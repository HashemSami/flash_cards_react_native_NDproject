import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {handleDeleteDeck} from '../actions';
import {white, blue, orange, darkRed, green} from '../utils/colors';

class DeckView extends Component{

    componentDidMount(){
        // to force update when goback() function invoked
        this.props.navigation.addListener(
            'didFocus',
            (payload) => {
              this.forceUpdate();
            }
          );
    }

    shouldComponentUpdate(nextProps){
        return nextProps.deck === null;
    }

    handleDeleteButton = () => {
        const {remove, goBack} = this.props;
        remove();
        goBack();

    }

    render(){
        const {deck} = this.props;
        const cardsNum = Object.keys(deck.cards).length;
        return(
            <View style={styles.deckView}>
                <View style = {styles.deckTitle}>
                    <Text style={{fontSize: 30, color: white}}>{deck.deckName}</Text>
                    <Text
                    style={{fontSize: 15, color: white}}
                    >
                        {cardsNum===0? 'No cards in this deck': `${cardsNum} ${cardsNum === 1? 'card': 'cards'}`}
                    </Text>
                </View>
                
                <View>
                    <TouchableOpacity 
                    style = {[styles.button, {backgroundColor: green}]} 
                    onPress = {() => this.props.navigation.navigate('AddQuestion', {entryId: deck.deckId})}>
                        <Text style = {styles.buttonText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style = {[styles.button, {backgroundColor: blue}]}
                    onPress = {() => this.props.navigation.navigate('Quiz', {entryId: deck.deckId})}>
                        <Text style = {styles.buttonText}>Take Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style = {[styles.button, {backgroundColor: darkRed}]}
                    onPress = {() => this.handleDeleteButton()}>
                        <Text style = {styles.buttonText}>Delete Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    deckView: {
        flex:1,
        justifyContent: 'space-around',
        alignItems:'center'
    },
    deckTitle: {
        width: 250,
        height: 100,
        backgroundColor: orange,
        borderRadius: 5,
        justifyContent:'center',
        alignItems:'center',
    },
    button: {
        marginTop: 35,
        height:50,
        width: 200,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: white,
        fontSize: 18
    }
})

function mapStateToProps(state, {navigation}){
    const {entryId} = navigation.state.params;
    
    return{
        deck: entryId? state[entryId]: null,
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