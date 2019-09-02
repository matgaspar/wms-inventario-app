import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 10,
  },
  item: {
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#696969',
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  local: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 5,
  },
  id: {
    fontSize: 15,
    marginRight: 5,
  },
  descricao: {
    flex: 1,
    fontSize: 15,
  },
  btnInventariar: {
    backgroundColor: '#003A00',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputDescricao: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  pickerRua: {
    flex: 1,
  },
  btnFiltrar: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 10,
  },
});

export default styles;
