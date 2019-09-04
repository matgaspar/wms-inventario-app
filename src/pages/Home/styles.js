import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F3F3F3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: '#000',
  },
  txtEditar: {
    fontSize: 20,
    color: '#444',
  },
  bemVindo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#444',
  },
  textTitle: {
    fontSize: 25,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#001844',
    borderColor: '#001844',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 20,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 20,
    color: '#FFF',
  },
});

export default styles;
