import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    padding: 20,
  },
  logo: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
    marginVertical: 40,
    resizeMode: 'stretch',
  },
  header: {
    height: 200,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputForm: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtInput: {
    flex: 1,
    fontSize: 25,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'solid',
  },
  button: {
    backgroundColor: '#003A00',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#003A00',
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  loader: {
    margin: 20,
  },
});

export default styles;
