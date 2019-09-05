import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';

function Produtos({ navigation }) {

    const [produtos, setProdutos] = useState([]);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(50);
    const [local, setLocal] = useState('');
    const [query, setQuery] = useState('');

    const loadPage = async (pageNumber = page, shouldRefresh = false) => {
        const url = [];
        if(local.key)
            url.push(`local_like=${local.key}`);
        if(query)
            url.push(`q=${query}`);
        setLoad(true);
        const response = await fetch(`https://api.web7online.com/produtos/?_sort=local,descricao&_limit=${limit}&_page=${pageNumber}&${url.join('&')}`);

        const data = await response.json();
        const totalProdutos = response.headers.get('X-Total-Count');

        setTotal(Math.floor(totalProdutos / limit));
        
        if(data.length > 0){
            setLoad(false);
            setProdutos(shouldRefresh ? data : [ ...produtos, ...data]);
            setPage(pageNumber + 1);
        }else{
            setLoad(false);
            alert('Produtos não encontrado!');
        }
    }

    const filtro = async () => {
        setLoad(true);

        await loadPage(1, true);

        setLoad(false);
    }

    const handleInventariar = async id => {
      if(id){
        setLoad(true);
        const response = await fetch(`https://api.web7online.com/produtos/${id}`);
        const produto = await response.json();
        
        if(produto.id){
          setLoad(false);
          navigation.navigate('Inventario', { produto });
        }else{
          setLoad(false);
          alert('Produto não encontrado!');
        }
      }
    }

    /* useEffect(() => {
        loadPage();
    }, []); */
    
    return (
        <View style={styles.container}>
            <View style={styles.filter}>
                <ModalSelector 
                data={[
                    { label: 'RUA A', key: 'A'},
                    { label: 'RUA B', key: 'B'},
                    { label: 'RUA C', key: 'C'},
                    { label: 'RUA D', key: 'D'},
                    { label: 'RUA E', key: 'E'},
                    { label: 'RUA F', key: 'F'},
                    { label: 'RUA G', key: 'G'},
                    { label: 'RUA H', key: 'H'},
                    { label: 'RUA I', key: 'I'},
                    { label: 'RUA P', key: 'P'},
                ]}
                initValue='Filtrar por Rua'
                supportedOrientations={['landscape']}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(rua) => setLocal(rua)}
                onModalClose={filtro}
                cancelText='CANCELAR'
                cancelTextStyle={{ fontSize: 15, paddingVertical: 10 }}
                sectionTextStyle={{ fontWeight: 'bold', fontSize: 20, color: '#666' }}

                    // useNativeAndroidPickerStyle={false}
                    // placeholder={{ label: 'Filtrar por Rua', value: '' }}
                    // onValueChange={(val) => setLocal(val)}
                    // onClose={filtro}
                    // value={local}
                />

                <TouchableOpacity
                    onPress={filtro}
                    style={styles.btnFiltrar}>                    
                    { load 
                        ? <ActivityIndicator style={styles.loader} size={30} color='#000' /> 
                        : <Icon name='ios-search' color='#000' size={30} /> 
                    }
                </TouchableOpacity>
            </View>
            <Text>Página {page-1} de {total}</Text>
            <FlatList 
                data={produtos}
                keyExtractor={item => String(item.id)}
                onEndReached={() => loadPage()}
                onEndReachedThreshold={0.1}
                ListFooterComponent={ load && <ActivityIndicator style={styles.loader} size={30} color='#696969' /> }
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Icon 
                            name={item.status === 'Ativo' ? 'ios-checkmark-circle': 'ios-close-circle'} 
                            size={25}
                            color={ item.status === 'Ativo' ? '#008000' : '#A00' } 
                            style={{ marginRight: 5 }} 
                        />
                        <View style={styles.description}>
                            { item.local !== '' && <Text style={styles.local}>{item.local}</Text> }
                            <Text style={styles.id}>[{item.id}]</Text>
                            <Text style={styles.descricao}>{item.descricao}</Text>
                            <TouchableOpacity style={styles.btnInventariar} onPress={() => handleInventariar(item.id)}>
                                <Icon name='ios-archive' color='#FFF' size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

Produtos.navigationOptions = ({ navigation }) => ({
    headerTitle: "PRODUTOS",
    /* headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Produtos")}>
        <Icons name="ios-back" size={25} color="white" left={20} style={{ marginRight: 10 }} />
      </TouchableOpacity>
    ) */
  });

  export default Produtos;