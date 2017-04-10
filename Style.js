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
    borderWidth: 1,
    borderColor: '#000000'
  },

  inputButtonText: {
    fontSize: 36,
    color: 'grey'
  },
  
  inputRow: {
    flex: 1,
    flexDirection: 'row'
  }
});

export default Style;
