import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

export type ThemedIconProps = {
  name: "checkmark-circle" | "ellipse-outline" | "images-outline" | "timer";
  size: number;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({
  name,
  size,
  lightColor,
  darkColor,
}: ThemedIconProps) {
  const colorIcon = useThemeColor(
    { light: lightColor, dark: darkColor },
    "icon"
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
          width: 50,
          height: 50,
        },
      ]}
    >
      <Ionicons name={name} size={size} color={colorIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
