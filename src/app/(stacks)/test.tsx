import  { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedTextInput } from "@/src/components/ThemedTextInput";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface Note {
  id: string;
  content: string;
  createdAt: string;
  image?: string;
  notificationDate?: Date;
}

export default function Test() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [notificationDate, setNotificationDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    loadNotes();
    registerForPushNotificationsAsync();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem("notes");
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  const saveNotes = async (updatedNotes: Note[]) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const addNote = () => {
    if (newNote.trim() !== "") {
      const newNoteObj: Note = {
        id: Date.now().toString(),
        content: newNote,
        createdAt: new Date().toISOString(),
        image: image || undefined,
        notificationDate: notificationDate || undefined,
      };
      const updatedNotes = [...notes, newNoteObj];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      setNewNote("");
      setImage(null);
      setNotificationDate(null);
      scheduleNotification(newNoteObj);
    }
  };

  const updateNote = () => {
    if (editingNote && newNote.trim() !== "") {
      const updatedNotes = notes.map((note) =>
        note.id === editingNote.id
          ? {
              ...note,
              content: newNote,
              image: image || note.image,
              notificationDate: notificationDate || note.notificationDate,
            }
          : note
      );
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      setNewNote("");
      setEditingNote(null);
      setImage(null);
      setNotificationDate(null);
      scheduleNotification(
        updatedNotes.find((note) => note.id === editingNote.id)!
      );
    }
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
  };

  const deleteAllNotes = () => {
    setNotes([]);
    saveNotes([]);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const scheduleNotification = async (note: Note) => {
    if (note.notificationDate) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Note Reminder",
          body: note.content,
        },
        trigger: note.notificationDate,
      });
    }
  };

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  };

  const onChangeDatetime = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || notificationDate || new Date();
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setNotificationDate(currentDate);
      if (Platform.OS === "android") {
        setShowTimePicker(true);
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }}>
        <Image
          source={require("../../assets/images/NOVA.png")} 
          style={styles.image}
        />
        <ThemedText type="title">Tất cả ghi chú</ThemedText>
        <ThemedText type="defaultSemiBold" style={{textAlign: 'center'}}>2 ghi chú</ThemedText>
        <ThemedTextInput
          value={newNote}
          onChangeText={setNewNote}
          placeholder="Nhập ghi chú"
          style={styles.input} // Style tuỳ chỉnh nếu cần
        />
        <Button title="Chọn hình ảnh" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button
          title="Set Notification"
          onPress={() => setShowDatePicker(true)}
        />
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={notificationDate || new Date()}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDatetime}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            testID="timeTimePicker"
            value={notificationDate || new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                const newDate = new Date(notificationDate || new Date());
                newDate.setHours(selectedTime.getHours());
                newDate.setMinutes(selectedTime.getMinutes());
                newDate.setSeconds(selectedTime.getSeconds());
                setNotificationDate(newDate);
              }
            }}
          />
        )}
        {notificationDate && (
          <ThemedText>
            Notification set for: {notificationDate.toLocaleString()}
          </ThemedText>
        )}
        <Button
          title={editingNote ? "Update Note" : "Add Note"}
          onPress={editingNote ? updateNote : addNote}
        />
        <Button title="Delete All Notes" onPress={deleteAllNotes} />
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedView style={styles.noteItem}>
              <TouchableOpacity
                onPress={() => {
                  setEditingNote(item);
                  setNewNote(item.content);
                  setImage(item.image || null);
                  setNotificationDate(
                    item.notificationDate
                      ? new Date(item.notificationDate)
                      : null
                  );
                }}
              >
                <ThemedText>{item.content}</ThemedText>
                <ThemedText style={styles.dateText}>
                  {new Date(item.createdAt).toLocaleString()}
                </ThemedText>
                {item.image && (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.thumbnailImage}
                  />
                )}
              </TouchableOpacity>
              <Button title="Delete" onPress={() => deleteNote(item.id)} />
            </ThemedView>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  image: {
    width: 150,
    height: 80,
    resizeMode: "cover",
    alignSelf: "center",
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    marginTop: 5,
  },
  dateText: {
    fontSize: 12,
    color: "gray",
  },
});
