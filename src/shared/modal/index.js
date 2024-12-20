import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import useStorage from "../../hooks/useStorage";

export function ModalSavePassword({ password, handleClose, editPassword }) {
  const { setItem } = useStorage();
  const [username, setUsername] = useState("");
  const [siteOrApp, setSiteOrApp] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  async function handleSavePassword() {
    if (password == "" && passwordInput == "") {
      Alert.alert("Atenção!", "Informe uma senha.", [{ text: "ok" }]);
      return;
    } else if (username == "") {
      Alert.alert("Atenção!", "Informe o usuário para a senha cadastrada", [
        { text: "ok" },
      ]);
      return;
    } else if (siteOrApp == "") {
      Alert.alert(
        "Atenção!",
        "Informe o nome do site ou aplicativo que a senha será criada.",
        [{ text: "ok" }]
      );
      return;
    } else {
      await setItem(
        "@pass",
        JSON.stringify({
          username: username,
          siteOrApp: siteOrApp,
          password: editPassword ? passwordInput : password,
        })
      );
      Alert.alert("Sucesso!", "A senha foi salva com sucesso.", [
        { text: "OK" },
      ]);
      handleClose();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {editPassword ? "Senha existente" : "Senha gerada"}
        </Text>

        {editPassword ? (
          <View style={styles.textInputsAreaEditPassword}>
            <Text style={{ fontSize: 16 }}>Senha</Text>
            <TextInput
              onChangeText={setPasswordInput}
              value={passwordInput}
              style={styles.textInput}
            ></TextInput>
          </View>
        ) : (
          <Pressable
            style={styles.innerPassword}
            onLongPress={handleSavePassword}
          >
            <Text style={styles.text}>{password}</Text>
          </Pressable>
        )}
        <View style={styles.textInputsArea}>
          <Text style={{ fontSize: 16 }}>Usuário</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setUsername}
            value={username}
          ></TextInput>

          <Text style={{ fontSize: 16, paddingTop: 10 }}>
            Site ou Aplicativo
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setSiteOrApp}
            value={siteOrApp}
          ></TextInput>
        </View>

        <View style={styles.buttonsArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleSavePassword}
          >
            <Text style={styles.buttonSaveText}>Salvar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24,24,24, 0.6)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    width: "85%",
    paddingTop: 24,
    paddingBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004259",
    marginBottom: 24,
  },
  innerPassword: {
    backgroundColor: "#00BFBF",
    width: "90%",
    padding: 14,
    borderRadius: 8,
  },
  text: {
    color: "#004259",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  buttonsArea: {
    flexDirection: "row",
    width: "90%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginBottom: 14,
    marginTop: 14,
    padding: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonSave: {
    backgroundColor: "#004259",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#004259",
  },
  buttonSaveText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  textInput: {
    width: "90%",
    height: 50,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#004259",
    borderRadius: 8,
    backgroundColor: "#f8f8f8",
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
  },
  textInputsArea: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  textInputsAreaEditPassword: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -10,
  },
});
