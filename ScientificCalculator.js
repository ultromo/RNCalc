'use strict';

var React = require('react');
var ReactNative = require('react-native');

import clone from './clone';

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
  ['Ans', ',', '←', '→', '↑', '↓'],
  ['AC', 'RST', '(-)', 'π', 'e', '⌫'],
  ['(', ')', '%', '÷', 'pow(', 'fac('],
  [7, 8, 9, '×', 'sin(', 'sin⁻¹('],
  [4, 5, 6, '−', 'cos(', 'cos⁻¹('],
  [1, 2, 3, '+', 'tan(', 'tan⁻¹('],
  [0, '.', 'log(', 'ln(', 'exp(', '=']
];

export default class ScientificCalculator extends React.Component {
  
  expression = [];
  expressionHistory = [];
  expressionPointer = 0;
  expressionInsert = 0;
  dExpression = '';
  Ans = 0;
  AnsMode = false;
  ActlAnsMode = false;
  reflectMode = false;
  
  constructor(props) {
    super(props);
    
    this.state = {
      previousInputValue: 0,
      displayExpression: '|',
    }
  }
  
  render() {
    return (
      <View style={Style.rootContainer}>
        <StatusBar
          barStyle="light-content"
        />
        <View style={Style.displayContainer}>
          <View style={Style.navContainer}>
            <TouchableHighlight onPress={this._goMenu.bind(this)}>
              <Text style={Style.menuText}>☰</Text>
            </TouchableHighlight>
          </View>
          <View style={Style.disContainer}>
            <Text style={[Style.displayText, { fontSize: GLOBAL.DFS }]}>{this.state.displayExpression}</Text>
          </View>
        </View>
        <View style={[Style.inputContainer, { backgroundColor: GLOBAL.BCLR }]}>
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
            onPress={this._onInputButtonPressed.bind(this, input)}
            key={r + "-" + i}/>
          );
      }
      
      views.push(<View style={Style.inputRow} key={"row-" + r}>{inputRow}</View>)
    }
    
    return views;
  }
  
  _onInputButtonPressed(input) {
    return this._handleInput(input)
  }
  
  _resetAll(){
    this.expression = [];
    this.expressionInsert = 0;
    this.expressionHistory = [];
    this.expressionPointer = 0;
    this.Ans = 0;
    this.AnsMode = false;
    this.reflectMode = false;
    this._renderExpression();
  }
  
  _pushExpressionHistory(ex, exI){
    if (GLOBAL.DEDUP && this.expressionHistory.length > 0){
      let prevEx = this.expressionHistory[0][0];
      console.log(prevEx);
      console.log(ex);
      if (JSON.stringify(prevEx) == JSON.stringify(ex)){
        return;
      }
    }
    if (GLOBAL.RSCP){
      this.expressionHistory.unshift([clone(ex), clone(ex.length)]);
    }
    else{
      this.expressionHistory.unshift([clone(ex), clone(exI)]);
    }
  }
  
  _backExpressionHistory(){
    console.log("Backward");
    console.log(this.expressionHistory, this.expressionPointer);
    if (this.expressionPointer < this.expressionHistory.length){
      [this.expression, this.expressionInsert] = clone(this.expressionHistory[this.expressionPointer]);
      this.expressionPointer += 1;
      this._renderExpression();
      this.reflectMode = true;
    }
  }
  
  _forwardExpressionHistory(){
    console.log("Forward");
    console.log(this.expressionHistory, this.expressionPointer);
    if (this.expressionPointer > 1 && this.expressionHistory.length > 0){
      this.expressionPointer -= 2;
      [this.expression, this.expressionInsert] = clone(this.expressionHistory[this.expressionPointer]);
      this.expressionPointer += 1;
      this._renderExpression();
    }
    else{
      if (this.reflectMode == false && this.expression.length > 0){
        this._pushExpressionHistory(this.expression, this.expressionInsert);
      }
      this.expression = [];
      this.expressionInsert = 0;
      this.expressionPointer = 0;
      this._renderExpression()
      this.reflectMode = false;
    }
  }
  
  _resetExpression(){
    this.expression = [];
    this.expressionInsert = 0;
  }
  
  _renderExpression(){
    this.dExpression = '';
    this.expression.splice(this.expressionInsert, 0, '|');
    for (var r = 0; r < this.expression.length; r++){
      let subExp = this.expression[r];
      this.dExpression = this.dExpression.concat(subExp);
    }
    this.setState({
      displayExpression: this.dExpression
    });
    this.expression.splice(this.expressionInsert, 1);
  }

  __factorial(n){
    n = Math.round(n);
    if (n <= 1){
      return 1;
    }
    var ret = 1;
    for (var fc = 2; fc <= n; fc++){
      ret = ret * fc;
      if (ret == Infinity){
        break;
      }
    }
    return ret;
  }
  
  __logbase(a, base){
    return (Math.log(a) / Math.log(base));
  }

  _evaluateExpression(){
    var evExpression = '';
    for (var r = 0; r < this.expression.length; r++){
      let subExp = this.expression[r];
      switch (subExp) {
        case '+':
          evExpression = evExpression.concat('+');
          break;
        case '−':
          evExpression = evExpression.concat('-');
          break;
        case '×':
          evExpression = evExpression.concat('*');
          break;
        case '÷':
          evExpression = evExpression.concat('/');
          break;
        case 'π':
          evExpression = evExpression.concat(' Math.PI ');
          break;
        case 'e':
          evExpression = evExpression.concat(' Math.E ');
          break;
        case 'sin(':
          evExpression = evExpression.concat(' Math.sin( ');
          break;
        case 'cos(':
          evExpression = evExpression.concat(' Math.cos( ');
          break;
        case 'tan(':
          evExpression = evExpression.concat(' Math.tan( ');
          break;
        case 'exp(':
          evExpression = evExpression.concat(' Math.exp( ');
          break;
        case 'pow(':
          evExpression = evExpression.concat(' Math.pow( ');
          break;
        case 'ln(':
          evExpression = evExpression.concat(' Math.log( ');
          break;
        case 'log(':
          evExpression = evExpression.concat(' this.__logbase( ');
          break;
        case 'sin⁻¹(':
          evExpression = evExpression.concat(' Math.asin( ');
          break;
        case 'cos⁻¹(':
          evExpression = evExpression.concat(' Math.acos( ');
          break;
        case 'tan⁻¹(':
          evExpression = evExpression.concat(' Math.atan( ');
          break;
        case 'fac(':
          evExpression = evExpression.concat(' this.__factorial( ');
          break;
        case 'Ans':
          if (GLOBAL.STRICT == true){
            evExpression = evExpression.concat('(' + this.Ans.toString() + ')');
          }
          else{
            evExpression = evExpression.concat(this.Ans.toString());
          }
          break;
        default:
          evExpression = evExpression.concat(subExp);
      }
    }
    console.log(evExpression);
    if (this.expression.length == 0){
      return 0;
    }
    try{
      var a = eval(evExpression);
      if (GLOBAL.MDP == true){
        a = parseFloat(a.toFixed(10));
      }
      return a;
    }
    catch(err){
      console.log(err.toString());
      if (err instanceof RangeError){
        return "Math error";
      }
      //var a = err;
      //return a.toString();
      return "Syntax error";
    }
  }
  
  _handleInput(str) {
    if (this.ActlAnsMode == true && GLOBAL.RSTOI && str !== "="){
      this._resetExpression();
      this._renderExpression();
    }
    this.ActlAnsMode = false;
    if (str !== '↑' && str !== '↓'){
      this.AnsMode = false;
    }
    switch (str) {
      case 'RST':
        this._resetAll();
        return;
      case '(-)':
        str = '-';
        break;
      case 'AC':
        this.expression = [];
        this.expressionInsert = 0;
        this.expressionPointer = 0;
        this._renderExpression();
        return;
      case '=':
        this.ActlAnsMode = true;
        this.expressionPointer = 0;
        this.AnsMode = true;
        this.reflectMode = false;
        var evaluatedAnswer = this._evaluateExpression(this.expression);
        if (this.expression.length > 0){
          this._pushExpressionHistory(this.expression, this.expressionInsert);
        }
        if (GLOBAL.RSTOE){
          this.expression = [];
          this.expressionInsert = 0;
        }
        if (GLOBAL.SFO == true){
          if (typeof(evaluatedAnswer) === 'number'){
            this.setState({
              displayExpression: evaluatedAnswer.toPrecision(GLOBAL.SF)
            });
            this.Ans = evaluatedAnswer;
          }
          else{
            this.setState({
              displayExpression: evaluatedAnswer
            });
          }
        }
        else{
          this.setState({
            displayExpression: evaluatedAnswer
          });
          if (typeof(evaluatedAnswer) === 'number'){
            this.Ans = evaluatedAnswer;
          }
        }
        return;
      case '←':
        if (this.expressionInsert > 0){
          this.expressionInsert -= 1;
        }
        this._renderExpression();
        return;
      case '→':
        if (this.expressionInsert < this.expression.length){
          this.expressionInsert += 1;
        }
        this._renderExpression();
        return;
      case '↑':
        if (this.expression.length > 0 && this.AnsMode == false && this.reflectMode == false){
          this._pushExpressionHistory(this.expression, this.expressionInsert);
          this.expressionPointer += 1;
          this.AnsMode = true;
          this.reflectMode = true;
        }
        this._backExpressionHistory();
        return;
      case '↓':
        this._forwardExpressionHistory();
        return;
      case '⌫':
        if (this.expressionInsert > 0){
          this.expressionInsert -= 1;
          this.expression.splice(this.expressionInsert, 1);
          this._renderExpression();
        }
        return;
    }
    this.expression.splice(this.expressionInsert, 0, str);
    this.expressionInsert += 1;
    this._renderExpression();
  }
}
