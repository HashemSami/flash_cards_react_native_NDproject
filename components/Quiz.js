import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Card from './Card';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';
import {FontAwesome, Feather} from '@expo/vector-icons';
import {white, blue, orange, red, purple, green, gray, lightPuple} from '../utils/colors';


const DIMENSIONS = Dimensions.get('window');
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

class Quiz extends Component{

    state={
        questions: this.props.questionsList,
        wrongAnswers: 0,
        rightAnswers:0
    };

    handleRemove = (index, swipe) => {
        const {questions} = this.state;
        if(swipe > 150) {
            this.setState((prev) => ({rightAnswers: prev.rightAnswers+1}))
        }else if (swipe < -150){
            this.setState((prev) => ({wrongAnswers: prev.wrongAnswers+1}))
        }
        // console.log(this.state)
        let start = questions.slice(0, index);
        let end = questions.slice(index + 1);
        this.setState(() => ({questions: start.concat(end)}))

    }

    handleRetest = () => {
        const {questionsList} = this.props;
        this.setState(() => ({
            questions : questionsList,
            wrongAnswers: 0,
            rightAnswers:0
        }))
    }

    cancleNotification = () => {
        // clear local notification
        // if the user alredy had at least one quiz for today
        clearLocalNotification()
            .then(setLocalNotification())
    }

    render(){
        const {questionsList, deckCards} = this.props;
        const {questions, rightAnswers, wrongAnswers} = this.state;
        const total = rightAnswers + wrongAnswers;
        // console.log(questionsList)
        if (questionsList.length === 0){
            return(
                <View style={styles.noQuestions}>
                     <Feather
                        name='alert-circle'
                        color={blue}
                        size={35}
                    /> 
                    <Text style={styles.Text}>You need to add questions to Start the quiz</Text>
                </View>
            )
        }

        if(questions.length === 0){
            this.cancleNotification()
            return (
                <View style={{justifyContent:'space-evenly', alignItems:'center'}}>
                    <View>
                        {rightAnswers === 0
                        ?
                        <View style={styles.results}>
                            <FontAwesome
                                name='frown-o'
                                color={blue}
                                size={35}
                            /> 
                            <Text style={styles.Text}>
                                Sorry, you didn't score any right answers!
                            </Text>
                            <Text style={[styles.Text, {fontSize:20}]}>Start the quiz again to have more practice</Text>
                        </View>
                        : 
                        <Text style={styles.Text}>
                            {`You scored ${rightAnswers} right ${rightAnswers===1? 'answer': 'answers'} out of ${total} ${total===1? 'question': 'questions'}`}
                        </Text>}
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this.handleRetest}>
                            <Text style={{color: white, fontSize: 18}}>Take the test again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return(
            <View style={{flex:1}}>
                {questions.map((id, i) => {
                    const card = deckCards[id]
                    return  <Card 
                                key={id}
                                length={questionsList.length}
                                card={card}
                                index={i}
                                onSwipe={this.handleRemove}/>
                })}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    noQuestions:{
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    Text:{
        fontSize: 25,
        color:blue,
        textAlign: 'center'
    },
    results: {
        alignItems: 'center',
    },
    button: {
        marginTop: 35,
        height:50,
        width: 200,
        borderRadius:5,
        backgroundColor: blue,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

function mapStateToProps(state, {navigation}){
    const {entryId} = navigation.state.params;
    const deckCards = state[entryId].cards;
    const qList = Object.keys(deckCards)

    return{
        questionsList: qList,
        deckCards
    }
}

export default connect(mapStateToProps)(Quiz);