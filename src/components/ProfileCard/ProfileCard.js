import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Paragraph, Button, Headline } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import styles from "../../styles";
import { theme } from "../../styles/theme";

const ProfileCard = ({ profile, onCardPress, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onCardPress(profile.id)}>
      <View style={[localStyle.cardContainer, styles.card]}>
        <View style={localStyle.imageContainer}>
          <Image style={localStyle.profileIcon} source={profile.image} />
        </View>
        <View style={localStyle.contentContainer}>
          <Headline>{profile.fullName} </Headline>
          <Paragraph>{profile.description}</Paragraph>
        </View>
        {onSelect && (
          <View style={localStyle.buttonContainer}>
            <Button onPress={onSelect}>
              <Icon name="check" size={30} />
            </Button>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const localStyle = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    height: 100,
  },
  contentContainer: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 2,
    borderLeftColor: theme.colors.border,
    flex: 1,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default ProfileCard;
