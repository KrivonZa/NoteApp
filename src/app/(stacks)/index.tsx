import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  BackHandler,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedItem } from "@/src/components/ThemedItem";
import { ThemedIconAdd } from "@/src/components/ThemedIconAdd";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

const notesData = [
  {
    id: "1",
    title: "Ghi chú 1",
    note: "Đây là nội dung ghi chú 1.",
    time: "12:30 - 01/01/2024",
  },
  {
    id: "2",
    title: "Ghi chú 2",
    note: "Trong sinh học tiến hóa, chức năng là nguyên nhân một vài đối tượng hoặc quá trình xảy ra ở một hệ thống tiến hóa thông qua chọn lọc tự nhiên.",
    time: "14:00 - 01/01/2024",
  },
  {
    id: "3",
    title: "Ghi chú 2",
    note: "Trong sinh học tiến hóa, chức năng là nguyên nhân một vài đối tượng hoặc quá trình xảy ra ở một hệ thống tiến hóa thông qua chọn lọc tự nhiên.",
    time: "14:00 - 01/01/2024",
  },
  {
    id: "4",
    title: "Ghi chú 2",
    note: "Trong sinh học tiến hóa, chức năng là nguyên nhân một vài đối tượng hoặc quá trình xảy ra ở một hệ thống tiến hóa thông qua chọn lọc tự nhiên.",
    time: "14:00 - 01/01/2024",
  },
  {
    id: "5",
    title: "Ghi chú 2",
    note: "Trong sinh học tiến hóa, chức năng là nguyên nhân một vài đối tượng hoặc quá trình xảy ra ở một hệ thống tiến hóa thông qua chọn lọc tự nhiên.",
    time: "14:00 - 01/01/2024",
  },
  {
    id: "6",
    title: "Ghi chú 2",
    note: "Trong sinh học tiến hóa, chức năng là nguyên nhân một vài đối tượng hoặc quá trình xảy ra ở một hệ thống tiến hóa thông qua chọn lọc tự nhiên.",
    time: "14:00 - 01/01/2024",
  },
  {
    id: "7",
    title: "Ghi chú 2",
    note: "Trong sinh học tiến hóa, chức năng là nguyên nhân một vài đối tượng hoặc quá trình xảy ra ở một hệ thống tiến hóa thông qua chọn lọc tự nhiên.",
    time: "14:00 - 01/01/2024",
  },
];

export default function HomeScreen() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isHolding, setIsHolding] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      if (isHolding) {
        setIsHolding(false);
        setSelectedItems([]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isHolding]);

  const handlePressItem = (item: any) => {
    if (isHolding) {
      setSelectedItems((prevSelected) =>
        prevSelected.includes(item.id)
          ? prevSelected.filter((id) => id !== item.id)
          : [...prevSelected, item.id]
      );
      return;
    }
    router.push({
      pathname: "/update",
      params: {
        id: item.id,
        title: item.title,
        note: item.note,
        time: item.time,
      },
    });
  };

  const handleLongPressItem = (id: string) => {
    setIsHolding(true);
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }}>
        <FlatList
          style={{ paddingHorizontal: 20 }}
          data={notesData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ThemedItem
              id={item.id}
              title={item.title}
              note={item.note}
              time={item.time}
              onPress={() => handlePressItem(item)}
              onLongPress={() => handleLongPressItem(item.id)}
              isSelected={selectedItems.includes(item.id)}
              isHolding={isHolding}
            />
          )}
          ListHeaderComponent={() => (
            <>
              <Image
                source={require("../../assets/images/NOVA.png")}
                style={styles.image}
              />
              <ThemedText type="title">Tất cả ghi chú</ThemedText>
              <ThemedText
                type="defaultSemiBold"
                style={{ textAlign: "center" }}
              >
                {notesData.length} ghi chú
              </ThemedText>
            </>
          )}
        />
        <ThemedIconAdd
          name="edit"
          size={24}
          onPress={() => router.push("/add")}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: 150,
    height: 80,
    resizeMode: "cover",
    alignSelf: "center",
  },
});
