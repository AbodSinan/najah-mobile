import { StyleSheet } from "react-native";
import { theme } from "./theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 12,
  },
  title: {
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    marginBottom: 30,
    padding: 5,
  },
  actionbutton: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 10,
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  fab: {
    backgroundColor: theme.colors.primary,
    zIndex: 100,
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default styles;
