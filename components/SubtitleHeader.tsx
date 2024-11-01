import { StyleSheet, View, Text } from "react-native";

export type SubtitleHeaderOptions = {
  children: string;
};

export function SubtitleHeader({
  children,
  ...rest
}: Readonly<SubtitleHeaderOptions>) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText} className={"text-secondary"} {...rest}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 14,
    width: "100%",
    overflow: "hidden",
    textAlign: "center",
  },
});
