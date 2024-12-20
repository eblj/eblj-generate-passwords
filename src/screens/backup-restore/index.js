import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useStorage from "../../hooks/useStorage"; // Hook para armazenamento (exemplo)
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const BackupRestoreScreen = () => {
  const { getItem, setItem, restore } = useStorage(); // Hook para recuperar e salvar dados
  const [selectedFile, setSelectedFile] = useState(""); // Armazena o arquivo selecionado

  const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  // Método de backup
  const handleBackup = async () => {
    try {
      const passwords = await getItem("@pass");
      if (passwords && passwords.length && passwords[0].password != "") {
        const dataFormatted = getFormattedDate();
        const path = `${FileSystem.documentDirectory}/eblj_backup_${dataFormatted}.txt`;

        // Grava o arquivo no sistema
        await FileSystem.writeAsStringAsync(path, JSON.stringify(passwords));

        // Compartilha o arquivo
        await Sharing.shareAsync(path);

        Alert.alert("Sucesso!", "O backup foi gerado com sucesso!", [
          { text: "Certo" },
        ]);
      } else {
        Alert.alert("Informação!", "Não há dados para fazer backup.", [
          { text: "Tudo bem" },
        ]);
      }
    } catch (error) {
      Alert.alert("Desculpe!", "Não foi possível criar o backup.", [
        { text: "OK" },
      ]);
    }
  };

  // Método para escolher o arquivo de restauração
  const handleFileSelection = async () => {
    try {
      // Tenta abrir o seletor de arquivos, filtrando para arquivos .txt
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/plain", // Filtra arquivos .txt
      });

      if (result.canceled === true) {
        return;
      }

      if (result && result.assets[0].mimeType === "text/plain") {
        setSelectedFile(result.assets[0].uri); // Atualiza o estado com o arquivo selecionado
      } else {
        Alert.alert("Erro", "Não foi possível selecionar o arquivo.");
      }
    } catch (err) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar selecionar o arquivo.");
    }
  };

  // Restaurar backup
  const handleRestore = async () => {
    try {
      //   await removeAll("@pass");
      if (!selectedFile) {
        Alert.alert(
          "Atenção",
          "Por favor, selecione um arquivo para restaurar."
        );
        return;
      }

      // Lê o conteúdo do arquivo
      const fileContent = await FileSystem.readAsStringAsync(selectedFile);
      // Parseia os dados do backup
      const parsedData = JSON.parse(fileContent);
      // Salva os dados restaurados
      await restore("@pass", parsedData);

      Alert.alert("Sucesso", "O backup foi restaurado com sucesso!");
      setSelectedFile("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível restaurar o backup.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Backup e Restauração</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.infoText}>
          Faça backup de suas senhas clicando no botão abaixo, rápido, fácil e
          prático!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleBackup}>
          <Text style={styles.buttonText}>Fazer Backup</Text>
        </TouchableOpacity>

        <Text style={styles.infoText}>
          Faça uma restauração de suas senhas escolhendo um arquivo de backup e
          clicando em Restaurar Backup, rápido, fácil e prático!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleFileSelection}>
          <Text style={styles.buttonText}>Escolher Arquivo de Restauração</Text>
        </TouchableOpacity>

        {selectedFile ? (
          <Text style={styles.selectedFileText}>
            Arquivo Selecionado: {selectedFile}
          </Text>
        ) : (
          <Text style={styles.selectedFileText}>
            Nenhum arquivo selecionado
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleRestore}>
          <Text style={styles.buttonText}>Restaurar Backup</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#004259",
    padding: 14,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
    color: "#333",
  },
  selectedFileText: {
    fontSize: 16,
    color: "#000",
    marginVertical: 20,
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
});

export default BackupRestoreScreen;
