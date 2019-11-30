import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

class Quiz extends Component{
    render(){
        return(
            <View>
                Quiz
            </View>
        )
    }
}

export default connect()(Quiz);