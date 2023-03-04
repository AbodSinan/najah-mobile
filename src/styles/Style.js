import { StyleSheet } from "react-native";
import { theme } from "./theme";

const styles = StyleSheet.create({
  container: {
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
    writingDirection: "rtl",
    textAlign: "right",
  },
  actionbutton: {
    marginBottom: 20,
  },
  iconButton: {
    margin: 20,
    padding: 10,
    display: "flex",
  },
  card: {
    borderRadius: 10,
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginBottom: 8,
    textAlign: "right",
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
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: theme.colors.contrast,
    fontFamily: "Amiri-Bold",
  },
  bottomPadded: {
    paddingBottom: 8,
  },
  verticalDivider: {
    width: 0,
    height: "100%",
    borderColor: theme.colors.contrast,
    borderWidth: 1,
  },
});

export default styles;
