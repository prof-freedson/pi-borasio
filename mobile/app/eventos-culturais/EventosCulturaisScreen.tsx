import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";

interface Evento {
  id: number;
  titulo: string;
  data: string;
  local: string;
}

export default function EventosCulturaisScreen() {
  const [eventos, setEventos] = useState<Evento[]>([
    { id: 1, titulo: "Exposição de Carros Antigos", data: "12/03/2026", local: "Centro Histórico" },
    { id: 2, titulo: "Festival de Música", data: "05/04/2026", local: "Praça Nauro Machado" },
  ]);

  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [local, setLocal] = useState("");

  const adicionarEvento = () => {
    const novoEvento: Evento = { id: eventos.length + 1, titulo, data, local };
    setEventos([...eventos, novoEvento]);
    setTitulo(""); setData(""); setLocal("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Culturais</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.evento}>
            <Text style={styles.eventoTitulo}>{item.titulo}</Text>
            <Text>📅 {item.data}</Text>
            <Text>📍 {item.local}</Text>
          </View>
        )}
      />

      <Text style={styles.subtitle}>Cadastrar Novo Evento</Text>
      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Data" value={data} onChangeText={setData} />
      <TextInput style={styles.input} placeholder="Local" value={local} onChangeText={setLocal} />
      <Button title="Adicionar Evento" onPress={adicionarEvento} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  evento: { marginBottom: 15, padding: 10, backgroundColor: "#f9f9f9", borderRadius: 5 },
  eventoTitulo: { fontSize: 16, fontWeight: "bold" }
});
