import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function CorridasScreen() {
  const [localSaida, setLocalSaida] = useState("");
  const [localDestino, setLocalDestino] = useState("");

  const solicitarCorrida = () => {
    alert(`Corrida solicitada de ${localSaida} até ${localDestino}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar Corrida</Text>
      <TextInput
        style={styles.input}
        placeholder="Local de saída"
        value={localSaida}
        onChangeText={setLocalSaida}
      />
      <TextInput
        style={styles.input}
        placeholder="Local de destino"
        value={localDestino}
        onChangeText={setLocalDestino}
      />
      <Button title="Solicitar" onPress={solicitarCorrida} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 }
});
