// StoreListScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { store_styles } from '../styles/store_style';
import { listarLojas, excluirLojaPorId } from '../services/storeService';
import { Loja } from '../types/loja';

export const StoreListScreen = () => {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      carregarLojas();
    }
  }, [isFocused]);

  const carregarLojas = async () => {
    const lista = await listarLojas();
    setLojas(lista);
  };

  const excluirLoja = (id: string) => {
    Alert.alert('Excluir Loja', 'Tem certeza que deseja excluir esta loja?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await excluirLojaPorId(id);
          carregarLojas();
        },
      },
    ]);
  };

  const editarLoja = (loja: Loja) => {
    navigation.navigate('StoreRegister', { loja });
  };

  const renderItem = ({ item }: { item: Loja }) => (
    <View style={store_styles.card}>
      <View style={store_styles.details}>
        <Text style={store_styles.nome}>{item.nome}</Text>
        <Text style={store_styles.endereco}>{item.endereco}</Text>
        <Text style={store_styles.cnpj}>CNPJ: {item.cnpj}</Text>
        <Text style={store_styles.coord}>Lat: {item.latitude} | Lon: {item.longitude}</Text>
        <View style={store_styles.actions}>
          <TouchableOpacity onPress={() => editarLoja(item)} style={store_styles.buttonEdit}>
            <Text style={store_styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirLoja(item.id)} style={store_styles.buttonDelete}>
            <Text style={store_styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={store_styles.container}>
      <FlatList
        data={lojas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={store_styles.empty}>Nenhuma loja cadastrada.</Text>}
      />
    </View>
  );
};

