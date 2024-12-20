import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";

export default function PasswordItem({ data, removePassword }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const { username, siteOrApp, password } = JSON.parse(data);

  async function handleCopyPassword() {
    await Clipboard.setStringAsync(password);
  }

  function deletePassword() {
    Alert.alert(
      "Atenção!",
      "Deseja realmente excluir essa senha?",
      [
        {
          text: "Sim",
          onPress: () => {
            removePassword();
          },
        },
        { text: "Não", onPress: () => {} },
      ],
      { cancelable: false }
    );
  }
  return (
    <Pressable style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={{ marginRight: 8, fontWeight: "bold" }}>
            Site ou Aplicativo:
          </Text>
          <Text>{siteOrApp}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={{ marginRight: 8, fontWeight: "bold" }}>Usuário:</Text>
          <Text>{username}</Text>
        </View>
        <View style={styles.contextPassword}>
          <Text style={styles.text}>
            {isPasswordVisible ? password : "*".repeat(password.length)}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={togglePasswordVisibility}
              style={{ paddingRight: 14 }}
            >
              <Ionicons
                size={24}
                color={"#004259"}
                name={isPasswordVisible ? "eye-off" : "eye"}
              />
            </Pressable>
            <Pressable
              onPress={handleCopyPassword}
              style={{ paddingRight: 14 }}
            >
              <Ionicons size={24} color={"#004259"} name={"copy"} />
            </Pressable>
            <Pressable onPress={deletePassword}>
              <Ionicons size={24} color={"#004259"} name={"trash"} />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BEDB39",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  content: {
    width: "100%",
  },
  text: {
    color: "#004259",
    fontSize: 18,
    fontWeight: "bold",
  },
  contextPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
