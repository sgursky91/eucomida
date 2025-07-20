// ProductRegisterScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { Produto } from '../types/produto';
import { salvarProduto, atualizarProduto, buscarProdutoPorId } from '../services/productService';
import { product_styles } from '../styles/product_styles';

type Props = NativeStackScreenProps<AppStackParamList, 'ProductRegister'>;

export const ProductRegisterScreen = ({ route, navigation }: Props) => {
  const produtoEdicao = route.params?.produto;

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  useEffect(() => {
    const carregarProduto = async () => {
      if (produtoEdicao?.id) {
        const produto = await buscarProdutoPorId(produtoEdicao.id);
        if (produto) {
          setNome(produto.nome);
          setDescricao(produto.descricao);
          setPreco(produto.preco);
          setImagem(produto.imagem);
        }
        navigation.setOptions({ title: 'Editar Produto' });
      } else {
        navigation.setOptions({ title: 'Cadastro de Produto' });
      }
    };
    carregarProduto();
  }, []);

  const limparCampos = () => {
    setNome('');
    setDescricao('');
    setPreco('');
    setImagem('');
  };

  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Precisamos de acesso à galeria para selecionar imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!nome || !descricao || !preco) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const id = produtoEdicao?.id ?? Date.now().toString();

    const novoProduto: Produto = {
      id,
      nome,
      descricao,
      preco,
      imagem,
    };

    try {
      if (produtoEdicao) {
        await atualizarProduto(novoProduto);
      } else {
        await salvarProduto(novoProduto);
      }
      Alert.alert(
        'Sucesso',
        produtoEdicao ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!'
      );

      if (produtoEdicao) {
        navigation.goBack();
      } else {
        limparCampos();
        navigation.navigate('ProductList');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar o produto.');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={product_styles.container}>
        <Text style={product_styles.title}>
          {produtoEdicao ? 'Editar Produto' : 'Cadastro de Produto'}
        </Text>

        <Input label="Nome do Produto" value={nome} onChangeText={setNome} />
        <Input label="Descrição" value={descricao} onChangeText={setDescricao} />
        <Input label="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />

        <Button title="Selecionar Imagem" onPress={selecionarImagem} />

        {imagem !== '' && (
          <Image source={{ uri: imagem }} style={product_styles.previewImage} />
        )}

        <Button
          title={produtoEdicao ? 'Salvar Alterações' : 'Cadastrar Produto'}
          onPress={handleSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};