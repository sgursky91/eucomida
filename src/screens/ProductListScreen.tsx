// ProductListScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { Produto } from '../types/produto';
import { listarProdutos, excluirProdutoPorId, filtrarProdutosPorNome } from '../services/productService';
import { product_styles } from '../styles/product_styles';

export const ProductListScreen = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const isFocused = useIsFocused();

 useEffect(() => {
    if (isFocused) {
      carregarProdutos();
    }
  }, [isFocused]);

  useEffect(() => {
    if (filtro.trim() === '') {
      carregarProdutos();
    } else {
      filtrar();
    }
  }, [filtro]);

  const carregarProdutos = async () => {
    const lista = await listarProdutos();
    setProdutos(lista);
  };
    const filtrar = async () => {
    const lista = await filtrarProdutosPorNome(filtro);
    setProdutos(lista);
  };

  const excluirProduto = (id: string) => {
    Alert.alert('Excluir Produto', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await excluirProdutoPorId(id);
          carregarProdutos();
        },
      },
    ]);
  };

  const editarProduto = (produto: Produto) => {
    navigation.navigate('ProductRegister', { produto });
  };

  const renderItem = ({ item }: { item: Produto }) => (
    <View style={product_styles.card}>
      <Image
        source={
          item.imagem
            ? { uri: item.imagem }
            : require('../assets/placeholder-image.png') // Imagem fallback local
        }
        style={product_styles.image}
      />
      <View style={product_styles.details}>
        <Text style={product_styles.nome}>{item.nome}</Text>
        <Text style={product_styles.descricao}>{item.descricao}</Text>
        <Text style={product_styles.preco}>R$ {item.preco}</Text>
        <View style={product_styles.actions}>
          <TouchableOpacity onPress={() => editarProduto(item)} style={product_styles.buttonEdit}>
            <Text style={product_styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirProduto(item.id)} style={product_styles.buttonDelete}>
            <Text style={product_styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={product_styles.containerList}>
      <TextInput
        placeholder="Buscar produto..."
        value={filtro}
        onChangeText={setFiltro}
        style={product_styles.input}
      />

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={product_styles.empty}>Nenhum produto cadastrado.</Text>}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};