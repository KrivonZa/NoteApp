import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedView } from "@/src/components/ThemedView";

export default function Update() {
  const router = useRouter();
  const { id, title, note, time } = useLocalSearchParams(); // Sử dụng useLocalSearchParams

  return (
    <ThemedView>
      <ThemedText type="title">Chỉnh sửa ghi chú</ThemedText>
      <ThemedText>{`ID: ${id}`}</ThemedText>
      <ThemedText>{`Tiêu đề: ${title}`}</ThemedText>
      <ThemedText>{`Nội dung: ${note}`}</ThemedText>
      <ThemedText>{`Thời gian: ${time}`}</ThemedText>
      {/* Hiển thị form hoặc thành phần để chỉnh sửa ghi chú */}
    </ThemedView>
  );
}
