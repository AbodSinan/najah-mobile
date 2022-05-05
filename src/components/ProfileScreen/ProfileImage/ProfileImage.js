import React, { useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { launchImageLibrary } from "react-native-image-picker";

import api from "../../../services/api/Api";

const ProfileImage = ({ image }) => {
  const [photo, setPhoto] = useState(image);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };
  const handleUploadPhoto = () => {
    api.updateProfilePicture.createAction({ image: photo });
  };

  return (
    <View style={styles.imageContainer}>
      {photo ? (
        <>
          <Image source={photo} style={styles.roundImage} />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      ) : (
        <IconButton icon="camera" size={30} onPress={handleChoosePhoto} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  roundImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 2,
  },
});

export default ProfileImage;
