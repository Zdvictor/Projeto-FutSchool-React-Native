import { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Pressable, Image, TextInput, ActivityIndicator } from 'react-native';
import { useToast } from 'react-native-toast-notifications'; // Importe o useToast
import { useNavigation } from '@react-navigation/native'; // Certifique-se de importar corretamente

export default function Home() {

  const [email, setEmail] = useState("")
  const toast = useToast()
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();  // Hook de navegação

  async function handleNotification() {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(email)) {

      setLoading(true);

      fetch("https://api-futschool.vercel.app/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Cadastro de notificação realizado com sucesso!", data);
          toast.show('Cadastro de notificação realizado com sucesso!', {
            type: 'success',
            duration: 3000,
            placement: 'top',
          });
        })
        .catch((error) => {
          console.error("Erro ao cadastrar:", error);
          toast.show('Erro ao cadastrar notificação. Tente novamente.', {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.textPromotion}>Promoção Incrível</Text>
        <Text style={styles.textInfo}>
          Quer se tornar um grande jogador como esses 3? Venha para a FutSchool e torne-se um grande jogador com os melhores treinadores, equipes profissionais. Dispute torneios de alto nível e torne-se um jogador renomado.{' '}
          <Text style={styles.textColor}>
            Assine um contrato agora mesmo e garanta benefícios exclusivos!
          </Text>
        </Text>

        <Text style={[styles.price, { color: 'red', textDecorationLine: 'line-through' }]}>
          DE R$ 799,99 (MENSAL)
        </Text>
        <Text style={[styles.price, { color: '#FFF' }]}>POR APENAS</Text>
        <Text style={[styles.price, { color: 'rgb(3, 182, 3)' }]}>R$ 200,00 (MENSAL)</Text>

        <Pressable
          onPress={() => navigation.navigate('Planos')}  // Navegação correta
          style={({ pressed }) => [styles.buttonGet, pressed && styles.buttonGetPressed]}>
          <Text style={styles.buttonGetText}>ADQUIRA AGORA MESMO</Text>
        </Pressable>

        <View style={{ alignItems: 'center', gap: 20 }} >
          <Image source={require('../../assets/capafut.png')} style={{ width: 400, height: 300 }} />
          <Text style={{ color: '#5e5ef8', fontSize: 20 }}>QUER RECEBER NOVIDADES?</Text>
          <TextInput
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            style={styles.inputNews}
          />
          <Pressable onPress={handleNotification} style={styles.submit}>
            {loading ? (
              <ActivityIndicator size="small" color="blue" />
            ) : (
              <Text style={styles.submitText}>Cadastrar</Text>
            )}
          </Pressable>
        </View>
      </View>

      <View style={styles.description}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Otimos Campos</Text>
          <Text style={styles.sectionText}>
            Por isso somos os melhores! Na FutSchool, entendemos a importância de oferecer instalações de alta qualidade para o seu treino profissional de futebol.
            Nossos campos são cuidadosamente mantidos, proporcionando um ambiente propício para o aprimoramento das suas habilidades.
            Venha fazer parte da excelência em treinamento esportivo e alcance o seu máximo desempenho conosco.
          </Text>
          <Image source={require('../../assets/quadra.jpg')} style={{ width: 400, height: 300 }} />
          <View style={styles.rowBorder}></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Melhores Treinos</Text>
          <Text style={styles.sectionText}>
            Na FutSchool, comprometemo-nos a oferecer os melhores treinos para impulsionar o seu desempenho no futebol. Nossos programas são desenvolvidos por treinadores experientes e apaixonados, visando aprimorar não apenas suas habilidades técnicas, mas também sua resistência, estratégias de jogo e mentalidade esportiva.
          </Text>
          <Image source={require('../../assets/treino.jpg')} style={{ width: 400, height: 300 }} />
          <View style={styles.rowBorder}></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EstrelaBet</Text>
          <Text style={styles.sectionText}>
            Orgulhosos da parceria com a EstrelaBet! Na FutSchool, oferecemos treinos de alta qualidade e vantagens exclusivas para nossos atletas, com apoio da EstrelaBet. Juntos, elevamos o futebol a um novo nível. Junte-se a nós e experimente a emoção do jogo com benefícios especiais!
          </Text>
          <Image source={require('../../assets/estrelabet.jpg')} style={{ width: 400, height: 300 }} />
          <View style={styles.rowBorder}></View>
        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD700",
  },
  main: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    gap: 15,
  },
  textPromotion: {
    fontSize: 40,
    color: "#FFF",
  },
  textInfo: {
    fontSize: 22,
    color: "#FFF",
    letterSpacing: 2,
    textAlign: "center",
  },
  textColor: {
    color: "#5252fa",
  },
  price: {
    fontSize: 28,
  },
  buttonGet: {
    width: "80%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#44f",
    padding: 18,
    borderRadius: 20,
  },
  buttonGetPressed: {
    backgroundColor: "blue",
  },
  buttonGetText: {
    color: "#FFF",
  },
  inputNews: {
    width: 300,
    height: 55,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 5,
  },
  submit: {
    width: 300,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  submitText: {
    color: "#000",
  },
  description: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20
  },
  section: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10
  },
  sectionText: {
    fontSize: 20,
    letterSpacing: 1,
    textAlign: "left",
    marginBottom: 20
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 20,
    width: "100%",
    alignSelf: "stretch",
  }
});
