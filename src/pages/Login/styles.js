import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001844',
    padding: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  txtInput: {
    fontSize: 25,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    borderStyle: 'solid',
    color: '#FFF',
  },
  button: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    // backgroundColor: 'rgba(0, 24, 68,0.7)',
    backgroundColor: 'rgba(255, 255, 255,0.7)',
    borderRadius: 15,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
