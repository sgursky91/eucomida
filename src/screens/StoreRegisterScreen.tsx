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

type Props = NativeStackScreenProps<AppStackParamList, 'StoreRegister'>;

export const StoreRegisterScreen = ({ route, navigation }: Props) => {
  const lojaEdit = route.params?.loja;

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    if (lojaEdit) {
      setNome(lojaEdit.nome);
      setEndereco(lojaEdit.endereco);
      setCnpj(lojaEdit.cnpj);
      setLatitude(lojaEdit.latitude);
      setLongitude(lojaEdit.longitude);
    }
  }, [lojaEdit]);

  const limparCampos = () => {
    setNome('');
    setEndereco('');
    setCnpj('');
    setLatitude('');
    setLongitude('');
  };

  const handleSubmit = async () => {
    if (!nome || !endereco || !cnpj || !latitude || !longitude) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    if (!validarCNPJ(cnpj)) {
      Alert.alert('Erro', 'CNPJ inválido!');
      return;
    }

    const lat = parseFloat(latitude);
    const long = parseFloat(longitude);
    if (isNaN(lat) || isNaN(long)) {
      Alert.alert('Erro', 'Latitude e Longitude devem ser números válidos!');
      return;
    }

    try {
      const loja: Loja = {
        id: lojaEdit?.id ?? Date.now().toString(),
        nome,
        endereco,
        cnpj,
        latitude,
        longitude,
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
          <Input label="Endereço" value={endereco} onChangeText={setEndereco} />
          <Input
            label="CNPJ"
            value={cnpj}
            onChangeText={(text) => setCnpj(formatarCNPJ(text))}
            keyboardType="numeric"
          />
          <Input
            label="Latitude"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
          />
          <Input
            label="Longitude"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
          />

          <View style={{ marginTop: 24 }}>
            <Button title={lojaEdit ? 'Salvar Alterações' : 'Cadastrar Loja'} onPress={handleSubmit} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};