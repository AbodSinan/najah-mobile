import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Paragraph,
} from "react-native-paper";

import api from "../../../services/api/Api";

import classStatusEnum from "../../../enums/classStatusEnum";

const ClassButtons = ({ classId, isOwnClass, isPrivate }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);

  const handleConfirmPress = () => {
    switch (action) {
      case "Join class":
        dispatch(api.createClassBooking.createAction({ classId }));
        break;
      case "Delete class":
        dispatch(
          api.updateClassStatus.createAction({
            classId,
            classType: isPrivate ? "private" : "academy",
            status: classStatusEnum.CANCELLED,
          })
        );
        break;
      case "Start class":
        dispatch(
          api.updateClassStatus.createAction({
            classId,
            classType: isPrivate ? "private" : "academy",
            status: classStatusEnum.STARTED,
          })
        );
        break;
      case "Offer tutorship":
        dispatch(api.createTutorOffer.createAction({ privateClass: classId }));
        break;
      default:
        break;
    }
    setAction(null);
  };

  const ownClassButtons = () => (
    <View style={localStyles.buttonRow}>
      <Button onPress={() => setAction("Start class")}>Start class</Button>
      <Button onPress={() => setAction("Delete class")}>Delete class</Button>
    </View>
  );

  const ownPrivateClassButtons = () => (
    <Button onPress={() => setAction("Delete class")}>Delete class</Button>
  );

  const privateTutorOfferButton = () => (
    <Button onPress={() => setAction("Offer tutorship")}>
      Offer tutorship
    </Button>
  );

  const joinClassButton = () => (
    <Button onPress={() => setAction("Join class")}>Join class</Button>
  );

  const renderButtons = () => {
    if (isOwnClass && !isPrivate) {
      return ownClassButtons();
    } else if (!isOwnClass && isPrivate) {
      return privateTutorOfferButton();
    } else if (!isOwnClass && !isPrivate) {
      return joinClassButton();
    } else {
      return ownPrivateClassButtons();
    }
  };

  return (
    <>
      <Portal>
        <Dialog visible={!!action} onDismiss={() => setAction(null)}>
          <Dialog.Title>Confim Class</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to {action}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirmPress}>Confirm</Button>
            <Button onPress={() => setAction(null)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {renderButtons()}
    </>
  );
};

const localStyles = StyleSheet.create({
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ClassButtons;
