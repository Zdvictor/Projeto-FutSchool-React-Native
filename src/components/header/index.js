import { SafeAreaView, Image,  } from "react-native";



export default function Header() {
  return (
    <SafeAreaView style={{ alignItems: "center", padding: 40, backgroundColor: "#FFD700" }}>
      <Image source={require("../../assets/futschool.png")} />
    </SafeAreaView>
  );
}
