import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtInput: {
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
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  produto: {
    flex: 1,
    marginTop: 10,
  },
  produto_group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  produto_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  produto_label: {
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
  },
  produto_titulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  produto_descricao: {
    fontSize: 20,
  },
  container_produto_image: {
    alignItems: 'center',
  },
  produto_image: {
    /* borderWidth: 1,
    borderColor: '#000',
    borderRadius: 50, */
    height: 300,
    aspectRatio: 0.834,
  },
  center: {
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 24, 68,0.8)',
    // backgroundColor: 'rgba(255, 255, 255,0.7)',
    borderRadius: 15,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
