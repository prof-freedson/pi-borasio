import { View, Text } from 'react-native';
import React from 'react';

// Tela "Sobre"
// Esta página apresenta informações gerais sobre o aplicativo
// No momento, o conteúdo é apenas informativo e poderá ser expandido futuramente
export default function SentryExamplePage() {
  return (
    <View>
      {/* Título da página */}
      <Text>Sobre</Text>

      {/* Texto informativo */}
      <Text>
        Esta seção tem como objetivo apresentar informações sobre o aplicativo.
        Em versões futuras, serão adicionados detalhes como descrição completa,
        objetivos do projeto e informações sobre os desenvolvedores.
      </Text>
    </View>
  );
}
