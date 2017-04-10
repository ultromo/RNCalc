import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
  rootContainer: {
    flex: 1
  },
  
  displayContainer: {
    flex: 2,
    backgroundColor: '#000000'
  },
  
  inputContainer: {
    flex: 8,
    backgroundColor: '#DDDDDD'
  },

  inputButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#000000'
  },

  inputButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default Style;
