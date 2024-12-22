import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useToast } from 'react-native-toast-notifications';

export default function ModalComponent({ show, setShow, closeModal }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleNotification() {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(email)) {

      setLoading(true);

      fetch("https://api-futschool.vercel.app/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Cadastro de Plano realizado com sucesso!", data);
          toast.show('Cadastro de Plano realizado com sucesso!', {
            type: 'success',
            duration: 3000,
            placement: 'top',
          });
          closeModal()
        })
        .catch((error) => {
          console.error("Erro ao cadastrar:", error);
          toast.show('Erro ao cadastrar Plano. Tente novamente.', {
            type: 'danger',
            duration: 3000,
            placement: 'top',
          });
        })
        .finally(() => {
          setLoading(false);
        });

      return;
    }

    toast.show('E-mail inválido. Por favor, insira um e-mail válido.', {
      type: 'danger', 
      duration: 3000,
      placement: 'top',
    });
  }

  if (!show) return null;

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>🚫 Vagas Esgotadas!</Text>
      <Text style={styles.modalText}>
        Lamentamos informar que todas as vagas para os nossos planos foram
        preenchidas. Deixe seu email para ser notificado!
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleNotification} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>ENVIAR</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: 200,
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 12,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    elevation: 5,
    marginBottom: 200
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#6363FF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

