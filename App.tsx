import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from './src/context/AuthContext';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return <Routes />;
}

export default function App() {
  return (
    <AuthProvider >
      <AppContent />
    </AuthProvider>
  );
}