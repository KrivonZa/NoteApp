import { useRef, useState, useLayoutEffect } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { actions } from "react-native-pell-rich-editor";
import { ThemedIcon } from "@/src/components/ThemedIcon";
import DateTimePicker from "@react-native-community/datetimepicker";

const RichEditor = require("react-native-pell-rich-editor").RichEditor;
const RichToolbar = require("react-native-pell-rich-editor").RichToolbar;

export default function Add() {
  const navigation = useNavigation();
  const richText = useRef<any>(null);
  const [content, setContent] = useState<string>("");
  const colorScheme = useColorScheme();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const currentColors = Colors[colorScheme === "dark" ? "dark" : "light"];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={{ color: currentColors.text, fontSize: 20 }}
          placeholder="Nhập tiêu đề..."
          placeholderTextColor={currentColors.placeholder}
        />
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <ThemedIcon name="timer" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.add, { backgroundColor: currentColors.iconAdd }]}
          >
            <Text
              style={{ color: "#ECEDEE", fontSize: 16, fontWeight: "bold" }}
            >
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title, currentColors]);

  const handleDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setShowTimePicker(true);
  };

  const handleTimeChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(false);
    const combinedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      currentTime.getHours(),
      currentTime.getMinutes()
    );

    // Định dạng thời gian và chèn vào RichEditor
    const formatted = `${combinedDateTime.toLocaleDateString()} ${combinedDateTime.toLocaleTimeString()}`;
    if (richText.current) {
      richText.current.insertText(`Thời gian: ${formatted}`);
    }
  };

  const pickImages = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Bạn cần phải cho phép ứng dụng truy cập vào máy ảnh.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImageTags = result.assets
        .map(
          (asset) =>
            `<img src="${asset.uri}" style="max-width: 100%; height: auto;" />`
        )
        .join("");
      setContent((prevContent) => prevContent + newImageTags);
      richText.current?.insertHTML(newImageTags);
    }
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <RichEditor
        ref={richText}
        style={styles.richEditor}
        placeholder="Hãy nhập gì đó..."
        editorStyle={{
          backgroundColor: currentColors.background,
          color: currentColors.text,
          contentCSSText: `
              display: flex; 
              flex-direction: column; 
              min-height: 200px; 
              color: ${currentColors.text};
              position: absolute; 
              top: 0; right: 0; bottom: 0; left: 0;`,
        }}
        initialContentHTML={content}
        onChange={(html: string) => setContent(html)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <RichToolbar
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.insertImage,
          ]}
          iconTint={currentColors.text}
          selectedIconTint="#44c4ff"
          disabledIconTint="gray"
          onPressAddImage={pickImages}
          style={{ backgroundColor: currentColors.background }}
        />
      </KeyboardAvoidingView>

      {/* DateTimePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  richEditor: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  add: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
});
