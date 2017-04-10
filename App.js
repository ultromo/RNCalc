'use strict';

var React = require('react');
var ReactNative = require('react-native');

import {
  View,
  Text,
  AppRegistry
} from 'react-native';

import Style from './Style';

import InputButton from './InputButton';

const inputButtons = [
  ['AC', '+/-', '%', '/'],
  [7, 8, 9, '*'],
  [4, 5, 6, '-'],
  [7, 8, 9, '+'],
  [0, '.', 'ln', '=']
];

export default class Calculator extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null
    }
  }
  
  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    )
  }
  
  _renderInputButtons() {
    let views = [];
    
    for (var r = 0; r < inputButtons.length; r++){
      let row = inputButtons[r];
      
      let inputRow = [];
      for (var i = 0; i < row.length; i++){
        let input = row[i];
        
        inputRow.push(
          <InputButton
            value={input}
            highlight={this.state.selectedSymbol === input}
            onPress={this._onInputButtonPressed.bind(this, input)}
            key={r + "-" + i}/>
          );
      }
      
      views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
    }
    
    return views;
  }
  
  _onInputButtonPressed(input) {
    switch (typeof input){
      case 'number':
        return this._handleNumberInput(input)
      case 'string':
        return this._handleStringInput(input)
    }
    //alert(input)
  }
  
  _handleNumberInput(num){
    let inputValue = (this.state.inputValue * 10) + num;
    
    this.setState({
      inputValue: inputValue
    })
  }
  
  _handleStringInput(str) {
    switch (str) {
      case 'AC':
        this.setState({
          selectedSymbol: null,
          previousInputValue: 0,
          inputValue: 0
        });
        break;
      case '/':
      case '*':
      case '+':
      case '-':
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        });
        break;
      case '=':
        let symbol = this.state.selectedSymbol,
          inputValue = this.state.inputValue,
          previousInputValue = this.state.previousInputValue;
        
        if (!symbol){
          return;
        }
        
        this.setState({
          previousInputValue: 0,
          inputValue: eval(previousInputValue + symbol + inputValue),
          selectedSymbol: null
        });
        break;
    }
  }
}

ReactNative.AppRegistry.registerComponent('Calculator', function() { return Calculator });
