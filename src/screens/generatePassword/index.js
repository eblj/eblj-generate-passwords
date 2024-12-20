import {
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  Modal,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { ModalSavePassword } from "../../shared/modal";

let charsetOnlyLetters = "abcdefjhijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let charsetOnlyNumbers = "1234567890";
let charsetOnlySpecialCharacters = "!@#$%&";

const GeneretePasswordScreen = () => {
  const [size, setSize] = useState(10);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [includeLetters, setIncludeLetters] = useState(false);
  const toggleSwitchLetters = () => setIncludeLetters((value) => !value);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const toggleSwitchNumbers = () => setIncludeNumbers((value) => !value);
  const [includeSpecialCharacters, setincludeSpecialCharacters] =
    useState(false);
  const toggleSwitchSpecialCharacters = () =>
    setincludeSpecialCharacters((value) => !value);

  function generatePassword() {
    let password = "";
    let charset = "";
    let requiredCharacters = []; // Para garantir um de cada tipo selecionado

    if (!includeLetters && !includeNumbers && !includeSpecialCharacters) {
      Alert.alert(
        "Atenção!",
        "É necessário marcar pelo menos 1 opção para a criação da senha.",
        [{ text: "Tudo bem" }]
      );
      return;
    }

    if (includeLetters) {
      charset += charsetOnlyLetters;
      requiredCharacters.push(
        charsetOnlyLetters.charAt(
          Math.floor(Math.random() * charsetOnlyLetters.length)
        )
      );
    }

    if (includeNumbers) {
      charset += charsetOnlyNumbers;
      requiredCharacters.push(
        charsetOnlyNumbers.charAt(
          Math.floor(Math.random() * charsetOnlyNumbers.length)
        )
      );
    }

    if (includeSpecialCharacters) {
      charset += charsetOnlySpecialCharacters;
      requiredCharacters.push(
        charsetOnlySpecialCharacters.charAt(
          Math.floor(Math.random() * charsetOnlySpecialCharacters.length)
        )
      );
    }

    // Preenche o restante da senha com caracteres aleatórios do charset combinado
    for (let i = requiredCharacters.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Adiciona os caracteres obrigatórios (um de cada tipo selecionado)
    password = requiredCharacters.join("") + password;

    // Embaralha os caracteres da senha para não ficar previsível
    password = password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");

    setPassword(password);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>{size} caracteres</Text>
      <View style={styles.area}>
        <Text style={{ paddingBottom: 20, textAlign: "center" }}>
          Arraste para trocar a quantidade de caracteres
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={4}
          maximumValue={20}
          maximumTrackTintColor="#004259"
          minimumTrackTintColor="#004259"
          thumbTintColor="#004259"
          step={1}
          value={size}
          onSlidingComplete={(value) => setSize(value)}
        ></Slider>

        <View>
          <View style={styles.areaSwitchContext}>
            <Switch
              trackColor={{ false: "#767577", true: "#00BFBF" }}
              thumbColor={includeLetters ? "#004259" : "#BEDB39"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchLetters}
              value={includeLetters}
            />
            <Text>Incluir letras</Text>
          </View>

          <View style={styles.areaSwitchContext}>
            <Switch
              trackColor={{ false: "#767577", true: "#00BFBF" }}
              thumbColor={includeNumbers ? "#004259" : "#BEDB39"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchNumbers}
              value={includeNumbers}
            />
            <Text>Incluir números</Text>
          </View>

          <View style={styles.areaSwitchContext}>
            <Switch
              trackColor={{ false: "#767577", true: "#00BFBF" }}
              thumbColor={includeSpecialCharacters ? "#004259" : "#BEDB39"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchSpecialCharacters}
              value={includeSpecialCharacters}
            />
            <Text>Incluir caracteres especiais</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalSavePassword
          password={password}
          handleClose={() => setModalVisible(false)}
          editPassword={false}
        ></ModalSavePassword>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    maxWidth: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004259",
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },
  slider: {
    paddingBottom: 10,
  },
  button: {
    backgroundColor: "#004259",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  areaSwitchContext: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
});

export default GeneretePasswordScreen;
