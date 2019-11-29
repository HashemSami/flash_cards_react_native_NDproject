import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions';
import { Button  } from 'react-native-elements';
import {generateID} from '../utils/helpers';


class AddQuestion extends Component{
    state={
        question: '',
        answer: ''
    }

    onChangeText = (text, part) => {
        this.setState({[part]: text});
    }

    handleSubmit = () => {
        const {addQuestion, goBack} = this.props;
        const {question, answer} = this.state;
        addQuestion(question, answer);
        goBack();
    }


    render(){
        const {deck} = this.props;
        const {question, answer} = this.state;
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
                <Button
                    title="Submit"
                    onPress={this.handleSubmit}
                    disabled={!question || !answer}
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
            console.log(entryId)
            dispatch(handleAddQuestion(
                entryId,
                {
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