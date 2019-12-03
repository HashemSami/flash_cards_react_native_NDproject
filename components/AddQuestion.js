import React, {Component} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
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
        goBack();
        addQuestion(question, answer);
        
    }

    render(){
        const {question, answer} = this.state;
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.textInput}
                    multiline
                    placeholder = 'Enter your question'
                    onChangeText={(text) => this.onChangeText(text, 'question')}
                    value={question}
                />
                <TextInput
                    style={styles.textInput}
                    multiline
                    placeholder = 'Enter your answer'
                    onChangeText={(text) => this.onChangeText(text, 'answer')}
                    value={answer}
                />
                <Button
                    buttonStyle={styles.button}
                    title="Submit"
                    onPress={this.handleSubmit}
                    disabled={!question || !answer}
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    },
    textInput: {
        margin: 20,
        width: 300,
        height: 100,
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


function mapStateToProps(state, {navigation}){
    const {entryId} = navigation.state.params;
    return{
        deck: entryId? state[entryId]: null,
    }
}

function mapDispatchToProps(dispatch, {navigation}){
    const {entryId} = navigation.state.params;

    return{
        addQuestion: (question, answer) => {
            const qId = generateID()
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