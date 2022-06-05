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
  iconButton: {
    width: 50,
    height: 50,
  },
  card: {
    borderRadius: 10,
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginBottom: 8,
  },
  fab: {
    backgroundColor: theme.colors.primary,
    zIndex: 100,
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  dropDown: {
    marginBottom: 8,
  },
});

export default styles;
