// HomeScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { gerarDicaIA } from '../services/iaService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import home_styles from '../styles/home_styles';
import { Produto } from '../types/produto';

export const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [dica, setDica] = useState('');
  const [carregando, setCarregando] = useState(false);

  const buscarProdutos = async (): Promise<Produto[]> => {
    const data = await AsyncStorage.getItem('@CatalogoDigitalApp:produtos');
    return data ? JSON.parse(data) : [];
  };

  const gerarDica = async () => {
    setCarregando(true);
    const produtos = await buscarProdutos();
    const texto = await gerarDicaIA(produtos, user?.nome || 'usuário');
    setDica(texto);
    setCarregando(false);
  };

  const limparDica = () => setDica('');

  useEffect(() => {
    gerarDica();
  }, []);

  const MenuButton = ({
    title,
    screen,
    onPress,
    color = '#2563EB',
  }: {
    title: string;
    screen?: string;
    onPress?: () => void;
    color?: string;
  }) => (
    <TouchableOpacity
      style={[home_styles.menuItem, { backgroundColor: color }]}
      onPress={onPress ? onPress : () => navigation.navigate(screen as never)}
    >
      <Text style={home_styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={home_styles.page}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={gerarDica} />
        }
      >
        <Text style={home_styles.welcome}>Bem-vindo, {user?.nome}!</Text>

        <View style={home_styles.menuContainer}>
          <MenuButton title="Cadastrar Loja" screen="StoreRegister" />
          <MenuButton title="Lista de Lojas" screen="StoreList" />
          <MenuButton title="Cadastrar Produto" screen="ProductRegister" />
          <MenuButton title="Lista de Produtos" screen="ProductList" />
          <MenuButton title="Sair" onPress={logout} color="#DC2626" />
        </View>
      </ScrollView>

      <View style={home_styles.footer}>
          <Text style={home_styles.footerTitle}>🎯 Dicas personalizadas para você</Text>

          <ScrollView style={home_styles.dicaContainer}>
            {carregando ? (
              <ActivityIndicator size="small" color="#000" style={{ marginVertical: 8 }} />
            ) : dica ? (
              <Text style={home_styles.dica}>{dica}</Text>
            ) : (
              <Text style={home_styles.dicaVazia}>Nenhuma dica no momento.</Text>
            )}
          </ScrollView>

          <View style={home_styles.footerButtons}>
            <TouchableOpacity onPress={gerarDica}>
              <Text style={home_styles.footerLink}>🔄 Nova dica</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={limparDica}>
              <Text style={[home_styles.footerLink, { color: '#EF4444' }]}>🧹 Limpar dica</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
};