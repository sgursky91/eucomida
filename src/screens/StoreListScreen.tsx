// StoreListScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';

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
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.endereco}>{item.endereco}</Text>
        <Text style={styles.cnpj}>CNPJ: {item.cnpj}</Text>
        <Text style={styles.coord}>Lat: {item.latitude} | Lon: {item.longitude}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => editarLoja(item)} style={styles.buttonEdit}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => excluirLoja(item.id)} style={styles.buttonDelete}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lojas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma loja cadastrada.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9fafb',
  },
  details: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  endereco: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  cnpj: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  coord: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  buttonEdit: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonDelete: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#888',
  },
});