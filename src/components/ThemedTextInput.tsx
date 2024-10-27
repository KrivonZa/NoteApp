import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useThemeColor } from "@/src/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextInputProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const placeholderColor = useThemeColor({}, "placeholder");

  return (
    <TextInput
      style={[styles.input, style, {color: color}]} // Áp dụng style cho input
      placeholderTextColor={placeholderColor} // Đặt màu placeholder dựa trên theme
      {...rest} // Truyền các props còn lại
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});
