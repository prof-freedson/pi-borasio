import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState("");

  const enviarFeedback = () => {
    alert("Feedback enviado: " + feedback);
    setFeedback("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Digite seu feedback..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button title="Enviar" onPress={enviarFeedback} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  textarea: { borderWidth: 1, borderColor: "#ccc", padding: 10, height: 120, marginBottom: 15, borderRadius: 5 }
});
