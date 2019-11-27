import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions'

class AddQuestion extends Component{
    state={
        question: '',
        answer: ''
    }

    onChangeText = (text, part) => {
        this.setState({[part]: text});
    }
    render(){
        const {deck} = this.props;
        const {question, answer} = this.state;
        console.log(this.state)
        return(
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.onChangeText(text, 'question')}
                    value={question}
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(text) => this.onChangeText(text, 'answer')}
                    value={answer}
                />
            </View>
        )
    }
};

function mapStateToProps(state, {navigation}){
    const {entryId} = navigation.state.params;
    console.log(entryId)
    return{
        deck: entryId? state[entryId]: null
    }
}

function mapDispatchToProps(dispatch, {navigation}){
    const {entryId} = navigation.state.params;

    return{
        addQuestion: (question, answer) => {
            const qId = generateID()

            dispatch(handleAddQuestion({
                [qId]:{
                    questionId: qId,
                    question: question,
                    answer: answer
                }
            }))
        },
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);