import { useIsFocused } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Pressable,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStorage from "../../hooks/useStorage";
import PasswordItem from "../../shared/components/password-item";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ModalSavePassword } from "../../shared/modal";

const PasswordsScreen = () => {
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();
  const [modalVisible, setModalVisible] = useState(false);

  // Função para carregar as senhas
  const loadPasswords = useCallback(async () => {
    const passwords = await getItem("@pass");
    setListPasswords(passwords || []);
  }, [getItem]);

  // Recarregar as senhas ao focar na tela
  useEffect(() => {
    loadPasswords();
  }, [focused, loadPasswords]);

  // Fechar a modal e recarregar a lista
  const closeModalAndRefresh = () => {
    setModalVisible(false);
    loadPasswords();
  };

  // Função para deletar uma senha
  async function handleDeletePassword(item) {
    const passwords = await removeItem("@pass", item);
    setListPasswords(passwords || []);
    Alert.alert("Sucesso!", "A senha foi excluída com sucesso.", [
      { text: "OK" },
    ]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas senhas</Text>
        <Pressable>
          <Ionicons
            name="add"
            size={25}
            color={"#fff"}
            onPress={() => setModalVisible(true)}
          />
        </Pressable>
      </View>
      <View style={styles.content}>
        {listPasswords.length > 0 ? (
          <FlatList
            style={{ flex: 1, paddingTop: 14 }}
            data={listPasswords}
            keyExtractor={(item) => String(item)}
            renderItem={({ item }) => (
              <PasswordItem
                data={item}
                removePassword={() => handleDeletePassword(item)}
              />
            )}
          />
        ) : (
          <View style={styles.stateempty}>
            <Ionicons size={60} color={"darkgrey"} name="key" />
            <Text style={styles.stateemptytext}>
              Não há senhas cadastradas ainda...
            </Text>
          </View>
        )}
      </View>
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
        <ModalSavePassword
          password={""}
          handleClose={closeModalAndRefresh} // Passa a função ajustada
          editPassword={true}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#004259",
    paddingVertical: 14, // Espaçamento vertical
    paddingHorizontal: 15, // Espaçamento horizontal para evitar cortes
    flexDirection: "row", // Organiza o conteúdo em linha
    justifyContent: "space-between", // Espaça título e ícone
    alignItems: "center", // Centraliza verticalmente
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
  stateempty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  stateemptytext: {
    color: "darkgrey",
    fontSize: 22,
    textAlign: "center",
  },
});

export default PasswordsScreen;
