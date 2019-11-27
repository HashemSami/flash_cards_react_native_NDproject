import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Button  } from 'react-native-elements';
import {connect} from 'react-redux';
import {handleAddDeck} from '../actions';
import {generateID} from '../utils/helpers';

class AddDeck extends Component{
    state = {
        deckName : ''
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
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.onChangeText(text)}
                    value={deckName}
                />
                <Button
                    title="load"
                    onPress={this.add}
                    disabled={!deckName}
                />
            </View>
        )
    }
}

function mapStateToProps(state){
    return{ 
        state
    }
}

function mapDispatchToProps(dispatch){
    // const deckId = generateID()
    // console.log(deckId)
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