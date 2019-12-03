import React, {Component} from 'react';
import {View, TextInput, StyleSheet } from 'react-native';
import { Button  } from 'react-native-elements';
import {connect} from 'react-redux';
import {handleAddDeck} from '../actions';
import {generateID} from '../utils/helpers';
import {clearPreviousData} from '../utils/api';


class AddDeck extends Component{
    state = {
        deckName : ''
    }

    componentDidMount(){
        const {state} = this.props;
        if(Object.keys(state).length === 0 && state.constructor === Object){
            clearPreviousData();
        }
    }

    onChangeText = (text) => {
        this.setState(() => ({deckName: text}));
    }

    add = () => {
        const text = this.state.deckName;
        this.setState(() => ({deckName: ''}));
        this.props.addEntry(text);
    }

    render(){
        const {deckName} = this.state;
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Add a deck name'
                    onChangeText={text => this.onChangeText(text)}
                    value={deckName}
                />
                <Button
                    title="load"
                    buttonStyle={styles.button}
                    onPress={this.add}
                    disabled={!deckName}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    textInput: {
        margin: 20,
        width: 300,
        height: 50,
        fontSize: 20,
        borderRadius: 5,
        borderWidth: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems:'center',
    },
    button: {
        marginTop: 20,
        height:50,
        width: 200,
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

function mapStateToProps(state){
    return{ 
        state
    }
}

function mapDispatchToProps(dispatch){
    return {
        addEntry: (deckName) => {
            const deckId = generateID()
            dispatch(handleAddDeck({
                [deckId]:{
                    deckId: deckId,
                    deckName: deckName,
                    cards:{
                    }
                }
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);