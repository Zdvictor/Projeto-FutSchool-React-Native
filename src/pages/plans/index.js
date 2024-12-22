import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import AllPlans from "./utils/plan";
import ModalComponent from "./components/modal";

export default function Plans() {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const verifyDisponibility = (planId) => {
    setLoading(true);
    setId(planId);

    setTimeout(() => {
      setLoading(false);
      setOpenModal(true); // Mostrar o modal após 2 segundos
    }, 2000);
  };

  useEffect(() => {
    if (openModal && scrollViewRef.current) {
      // Rola automaticamente para o modal quando ele é aberto
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [openModal]);

  return (
    <ScrollView
      contentContainerStyle={styles.sectionPrice}
      scrollEventThrottle={16} // Define a frequência de atualização
      ref={scrollViewRef} // Certifique-se de que o ref esteja ligado ao ScrollView
    >
      <View style={styles.containerPrice}>
        <Text style={styles.title}>MELHORES PREÇOS</Text>
        <View style={styles.boxesPrice}>
          {AllPlans.map((plan) => (
            <View style={styles.boxPrice} key={plan.id}>
              <Image
                source={plan.srcImg}
                style={styles.planImage}
                resizeMode="cover"
              />
              <Text style={styles.planTitle}>{plan.namePlan}</Text>
              <Text style={styles.planLabel}>{plan.labelDetails}</Text>
              <View>
                {plan.details.map((detail, index) => (
                  <Text style={styles.planDetail} key={index}>
                    {detail}
                  </Text>
                ))}
              </View>
              <View style={styles.areaValue}>
                <Text style={styles.oldValue}>{plan.oldValue}</Text>
                <Text style={styles.newValue}>{plan.newValue}</Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                disabled={loading && id !== plan.id}
                onPress={() => verifyDisponibility(plan.id)}
              >
                {loading && id === plan.id ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>
                    VERIFICAR DISPONIBILIDADE
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Modal renderizado dentro do fluxo */}
      {openModal && <ModalComponent show={openModal} setShow={setOpenModal} closeModal={() => setOpenModal(false)} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionPrice: {
    flexGrow: 1,
    backgroundColor: "#ffc107",
    padding: 10,
  },
  containerPrice: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 20,
  },
  boxesPrice: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  boxPrice: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    marginBottom: 20,
    alignItems: "center",
  },
  planImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 10,
  },
  planLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  planDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  areaValue: {
    alignItems: "center",
    marginVertical: 10,
  },
  oldValue: {
    color: "red",
    textDecorationLine: "line-through",
  },
  newValue: {
    color: "green",
    fontWeight: "bold",
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
