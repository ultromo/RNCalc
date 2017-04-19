'use strict';

var React = require('react');
var ReactNative = require('react-native');

GLOBAL = require('./Globals');

import {
  View,
  Text,
  AppRegistry,
  StatusBar,
  TouchableHighlight
} from 'react-native';

import Style from './Style';

import InputButton from './InputButton';

const inputButtons = [
  ['AC', '+/-', '%', '/'],
  [7, 8, 9, '*'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', 'ln', '=']
];

export default class ClassicCalculator extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null,
      divBy: 1
    }
  }
  
  render() {
    return (
      <View style={Style.rootContainer}>
        <StatusBar
          backgroundColor="black"
          barStyle="light-content"
        />
        <View style={Style.displayContainer}>
          <View style={Style.navContainer}>
            <TouchableHighlight onPress={this._goMenu.bind(this)}>
              <Text style={Style.menuText}>☰</Text>
            </TouchableHighlight>
          </View>
          <View style={Style.disContainer}>
            {(GLOBAL.SFO == false || GLOBAL.UIN == true) &&
              <Text style={[Style.displayText, { fontSize: GLOBAL.DFS }]}>{this.state.inputValue}</Text>
            }
            {(GLOBAL.SFO == true && GLOBAL.UIN == false) &&
              <Text style={[Style.displayText, { fontSize: GLOBAL.DFS }]}>{this.state.inputValue.toPrecision(GLOBAL.SF)}</Text>
            }
          </View>
        </View>
        <View style={[Style.inputContainer, { backgroundColor: 'rgb('+GLOBAL.BR+','+GLOBAL.BG+','+GLOBAL.BB+')' }]}>
          {this._renderInputButtons()}
        </View>
      </View>
    )
  }
  
  _goMenu(){
    this.props.navigator.push({ screen: 'MainNaviPage' });
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
    GLOBAL.UIN = true;
    if (this.state.divBy == 1){
      let inputValue = (this.state.inputValue * 10) + num;
      
      this.setState({
        inputValue: inputValue
      })
    }
    else{
      this.setState({
        inputValue: this.state.inputValue + num / this.state.divBy,
        divBy: 10 * this.state.divBy
      })
    }
  }
  
  _handleStringInput(str) {
    switch (str) {
      case "+/-":
        this.setState({
          inputValue: (0 - this.state.inputValue)
        });
        break;
      case 'ln':
        GLOBAL.UIN = false;
        this.setState({
          inputValue: Math.log(this.state.inputValue)
        });
        break;
      case 'AC':
        GLOBAL.UIN = true;
        this.setState({
          selectedSymbol: null,
          previousInputValue: 0,
          inputValue: 0,
          divBy: 1
        });
        break;
      case '/':
      case '*':
      case '+':
      case '-':
      case '%':
        GLOBAL.UIN = true;
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0,
          divBy: 1
        });
        break;
      case '=':
        GLOBAL.UIN = false;
        let symbol = this.state.selectedSymbol,
          inputValue = this.state.inputValue,
          previousInputValue = this.state.previousInputValue;
        
        if (!symbol){
          return;
        }
        
        if (GLOBAL.MDP == true){
          this.setState({
            previousInputValue: 0,
            inputValue: parseFloat(eval(previousInputValue + symbol + inputValue).toFixed(10)),
            selectedSymbol: null,
            divBy: 1
          });
        }
        else{
          this.setState({
            previousInputValue: 0,
            inputValue: eval(previousInputValue + symbol + inputValue),
            selectedSymbol: null,
            divBy: 1
          });
        }
        break;
      case '.':
        if (this.state.divBy == 1){
          this.setState({
            divBy: 10
          });
        }
        break;
    }
  }
}
