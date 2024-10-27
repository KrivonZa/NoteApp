import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import AntDesign from "@expo/vector-icons/AntDesign";

export type ThemedIconProps = {
  name: "edit"; // Tên icon
  size: number; // Kích thước icon
  lightColor?: string;
  darkColor?: string;
  onPress?: () => void;
};

export function ThemedIconAdd({
  name,
  size,
  lightColor,
  darkColor,
  onPress,
}: ThemedIconProps) {
  const colorIcon = useThemeColor(
    { light: lightColor, dark: darkColor },
    "iconAdd"
  );
  const colorBorder = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border"
  );
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View
      style={[
        styles.iconContainer,
        {
          borderColor: colorBorder,
          backgroundColor: backgroundColor,
          width: 50,
          height: 50,
        },
      ]}
    >
      <TouchableOpacity onPress={onPress}>
        <AntDesign name={name} size={size} color={colorIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "5%",
    right: "10%",
  },
});
