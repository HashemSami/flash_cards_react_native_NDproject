import React, {Component} from 'react';
import {View, StyleSheet, Text, Animated, PanResponder, TouchableOpacity} from 'react-native';
import {white, blue, orange, red, purple, green, gray, lightPuple} from '../utils/colors';
import {Feather} from '@expo/vector-icons';

class Card extends Component{
    constructor(props){
        // setting the configs for the animation
        super(props);
        const position = new Animated.ValueXY();
        this.state = {
            position,
            showAnswer: false
        };
    }

    componentWillMount(){
        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gesture) => {
                this.state.position.setValue({x:0, y:0});
            },
            onPanResponderMove: Animated.event([
                null, {dx: this.state.position.x, dy: this.state.position.y}
            ]),
            onPanResponderRelease: (e, {vx, vy}) => {
                if(this.state.position.x._value < -150) {
                    this.props.onSwipe(this.props.index, this.state.position.x._value );
                }else if (this.state.position.x._value > 150) {
                    this.props.onSwipe(this.props.index, this.state.position.x._value );
                } else if(this.state.position.y._value > 150){
                    this.setState((prev) => ({showAnswer: !prev.showAnswer}))
                    Animated.spring(this.state.position, {
                        toValue: 0,
                    }).start()
                }else{
                    Animated.spring(this.state.position, {
                        toValue: 0,
                    }).start()
                }
            }
        });
    }

    componentWillUnmount(){
        this.state.position.x.removeAllListeners();
        this.state.position.y.removeAllListeners();
    }

    getMainCardStyle(){
        let {position}= this.state;
        return[
            {position: 'absolute'},
            {left: '50%'},
            {marginLeft: -175},
            {top: '5%'},
            {transform: [{translateX: position.x}, {translateY: position.y},
                {rotate: position.x.interpolate({inputRange: [-150, 0, 150], outputRange: ["-20deg", "0deg", "20deg"]})}
            ]},
            {opacity: position.x.interpolate({inputRange: [-150, 0, 150], outputRange: [0.5, 1, 0.5]})}
        ];
    }

    render(){
        const {card, index} = this.props;
        const {showAnswer, opacity} = this.state;
        return(
            <View style={styles.container}>
                <Animated.View
                    style={this.getMainCardStyle()}
                    {...this.panResponder.panHandlers}
                >
                    {!showAnswer
                    ?
                    <View style={[styles.card, {backgroundColor: lightPuple, opacity}]}>
                        <Text style={styles.cardText}>
                            {card.question}
                        </Text>
                    </View>
                    :
                    <View style={[styles.card, {backgroundColor: green, opacity}]}>
                        <Text style={styles.cardText}>
                            {card.answer}
                        </Text>
                    </View>
                    }
                    <Text style={styles.counterText}>Question {index+1}</Text>
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor:white}}>
                        <View style={styles.answerView}>
                            <Text style={styles.buttonText}>Show Answer</Text>
                            <View style={styles.swipeIcon}>
                                <Text style={{color: purple, fontSize:25}}>Swipe</Text>
                                <Feather
                                name='chevrons-down'
                                color={purple}
                                size={35}
                                />  
                            </View>
                        </View> 
                    </View>
                    <View style={styles.swipeView}>
                        <View style={styles.swipeInstructions}>
                            <View style={styles.wrong}>
                                <Text style={{color: red, fontSize:25}}>Wrong</Text>
                                <View style={styles.swipeIcon}>
                                    <Feather
                                    name='chevrons-left'
                                    color={red}
                                    size={35}
                                    />  
                                    <Text style={{color: red, fontSize:25}}>Swipe</Text>
                                </View>
                            </View>
                            <View style={styles.correct}>
                                <Text style={{color: green, fontSize:25}}>Correct</Text>
                                <View style={styles.swipeIcon}>
                                    <Text style={{color: green, fontSize:25}}>Swipe</Text>
                                    <Feather
                                    name='chevrons-right'
                                    color={green}
                                    size={35}
                                    />  
                                </View>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        // marginTop: 10,
    },
    card: {
        height: 300,
        width: 350,
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 8,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        justifyContent: 'center',
        alignItems:'center',
        overflow: 'hidden',
    },
    cardText: {
        flex:2,
        margin: 5,
        marginTop: 5,
        fontSize: 32,
    },
    swipeInstructions:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: white,
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    answerView:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: purple,
        width:200,
        margin: 5
    },
    answerswipe: {
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        height:50,
        width:150,
        backgroundColor: purple,
    },
    buttonText:{
        color: purple,
        fontSize: 25
    },
    swipeView:{
        justifyContent: 'space-around',
        backgroundColor: blue,
    },
    correct:{
        backgroundColor: white,
        width: 150,
        borderWidth: 2,
        borderColor: green,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrong:{
        backgroundColor: white,
        width: 150,
        borderWidth: 2,
        borderColor: red,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText:{
        color: orange,
        fontSize: 20,
        backgroundColor: white,
        textAlign:'center'
    },
    swipeIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default Card;