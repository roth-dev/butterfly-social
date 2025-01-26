import { StyleSheet, View, Text } from "react-native";
export default function HomeScreen() {
  return (
    <View className="flex-1 justify-center items-center ">
      <Text className="text-red-600">Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
