import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from "../../actions/user";
import * as selectors from "../../sagas/selectors";
import UserTypeEnum from "../../enums/UserTypeEnum";

const UserTypeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userType = useSelector(selectors.getUserType);

  const handleUserTypeSelect = (userType) => {
    dispatch(userActions.setUserType({ userType }));
    navigation.navigate("Register");
  };

  useEffect(() => {
    if (userType) {
      navigation.navigate("Register");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        icon="school"
        onPress={() => handleUserTypeSelect(UserTypeEnum.STUDENT)}
      >
        طالب
      </Button>
      <Button
        mode="outlined"
        icon="handshake"
        onPress={() => handleUserTypeSelect(UserTypeEnum.TUTOR)}
      >
        مدرس
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default UserTypeScreen;
