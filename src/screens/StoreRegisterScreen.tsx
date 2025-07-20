// StoreRegisterScreen.tsx - criado automaticamente
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { validarCNPJ } from '../utils/validators';
import { formatarCNPJ } from '../utils/masks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../types/navigation';
import { Loja } from '../types/loja';
import { store_styles } from '../styles/store_style';
import { salvarLoja } from '../services/storeService';
import { buscarEnderecoPorCep } from '../services/addressService';


type Props = NativeStackScreenProps<AppStackParamList, 'StoreRegister'>;

export const StoreRegisterScreen = ({ route, navigation }: Props) => {
  const lojaEdit = route.params?.loja;

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');
  const [cnpj, setCnpj] = useState('');

  useEffect(() => {
    if (lojaEdit) {
      setNome(lojaEdit.nome);
      setCep(lojaEdit.cep);
      setLogradouro(lojaEdit.logradouro);
      setNumero(lojaEdit.numero);
      setComplemento(lojaEdit.complemento);
      setBairro(lojaEdit.bairro);
      setLocalidade(lojaEdit.localidade);
      setUf(lojaEdit.uf);
      setCnpj(lojaEdit.cnpj);
    }
  }, [lojaEdit]);

  const limparCampos = () => {
    setNome('');
    setCep('');
    setLogradouro('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setLocalidade('');
    setUf('');
    setCnpj('');
  };

  useEffect(() => {
    if (cep.length === 8) {
      preencherEnderecoPorCep(cep);
    }
  }, [cep]);


   const preencherEnderecoPorCep = async (cepValue: string) => {
    const endereco = await buscarEnderecoPorCep(cepValue);
    if (endereco) {
      setLogradouro(endereco.logradouro || '');
      setBairro(endereco.bairro || '');
      setLocalidade(endereco.localidade || '');
      setUf(endereco.uf || '');
    } else {
      setLogradouro('');
      setBairro('');
      setLocalidade('');
      setUf('');
      Alert.alert('CEP não encontrado', 'Não foi possível encontrar o endereço para o CEP informado.');
    }
  };

  const handleSubmit = async () => {
    if (!nome || !cep || !cnpj || !logradouro || !numero || !bairro || !localidade || !uf) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    if (!validarCNPJ(cnpj)) {
      Alert.alert('Erro', 'CNPJ inválido!');
      return;
    }

    try {
      const loja: Loja = {
        id: lojaEdit?.id ?? Date.now().toString(),
        nome,
        cnpj,
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        localidade,
        uf
      };

      await salvarLoja(loja);

      Alert.alert(
        'Sucesso',
        lojaEdit ? 'Loja atualizada com sucesso!' : 'Loja cadastrada com sucesso!'
      );

      if (lojaEdit) {
        navigation.goBack();
      } else {
        limparCampos();
        navigation.navigate('StoreList');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar a loja.');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={store_styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={store_styles.container_list} keyboardShouldPersistTaps="handled">
          <Text style={store_styles.title}>{lojaEdit ? 'Editar Loja' : 'Cadastro de Loja'}</Text>

          <Input label="Nome da Loja" value={nome} onChangeText={setNome} />
          <Input
            label="CNPJ"
            value={cnpj}
            onChangeText={(text) => setCnpj(formatarCNPJ(text))}
            keyboardType="numeric"
          />
          <Input label="Cep" value={cep} onChangeText={setCep} keyboardType="numeric" />
          <Input label="Logradouro" value={logradouro} onChangeText={setLogradouro} />
          <Input label="Número" value={numero} onChangeText={setNumero} />
          <Input label="Complemento" value={complemento} onChangeText={setComplemento} />
          <Input label="Bairro" value={bairro} onChangeText={setBairro} />
          <Input label="Localidade" value={localidade} onChangeText={setLocalidade} />
          <Input label="UF" value={uf} onChangeText={setUf} />

          <View style={{ marginTop: 24 }}>
            <Button title={lojaEdit ? 'Salvar Alterações' : 'Cadastrar Loja'} onPress={handleSubmit} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};