import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { ThemedIcon } from "./ThemedIcon";

export type ThemedItemProps = {
  id: string;
  title: string;
  note: string;
  time: string;
  lightColor?: string;
  darkColor?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  isSelected?: boolean;
  isHolding: boolean;
};

export function ThemedItem({
  id,
  title,
  note,
  time,
  lightColor,
  darkColor,
  onPress,
  onLongPress,
  isSelected = false,
  isHolding,
}: ThemedItemProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const textColor = useThemeColor({ light: "#000", dark: "#fff" }, "text");
  const borderColor = useThemeColor({ light: "#ccc", dark: "#444" }, "border");

  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
      <View
        style={[
          styles.itemContainer,
          { backgroundColor, borderColor },
          { borderWidth: 2 },
        ]}
      >
        <Text style={[styles.itemTitle, { color: textColor }]}>{title}</Text>
        <Text style={[styles.itemDescription, { color: textColor }]}>{note}</Text>
        <Text style={[styles.itemTime, { color: textColor }]}>{time}</Text>
      </View>
      {isHolding && (
        <View style={styles.icon}>
          <ThemedIcon
            name={isSelected ? "checkmark-circle" : "ellipse-outline"}
            size={28}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  itemTime: {
    fontSize: 12,
    marginTop: 10,
    color: "gray",
  },
  icon: {
    position: "absolute",
    right: 2,
    top: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
