// StoreListScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { store_styles } from '../styles/store_style';

interface Loja {
  id: string;
  nome: string;
  endereco: string;
  cnpj: string;
  latitude: string;
  longitude: string;
}

export const StoreListScreen = () => {
  const [lojas, setLojas] = useState<Loja[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  useEffect(() => {
    carregarLojas();
  }, []);

  const carregarLojas = async () => {
    const data = await AsyncStorage.getItem('@CatalogoDigitalApp:lojas');
    if (data) {
      setLojas(JSON.parse(data));
    }
  };

  const excluirLoja = (id: string) => {
    Alert.alert('Excluir Loja', 'Tem certeza que deseja excluir esta loja?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const atualizadas = lojas.filter((l) => l.id !== id);
          setLojas(atualizadas);
          await AsyncStorage.setItem('@CatalogoDigitalApp:lojas', JSON.stringify(atualizadas));
        },
      },
    ]);
  };

  const editarLoja = (loja: Loja) => {
    console.log("teste");
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

