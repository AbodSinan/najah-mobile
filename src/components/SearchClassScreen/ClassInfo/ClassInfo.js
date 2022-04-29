import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Button, List } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import api from "../../../services/api/Api";
import { selectClass } from "../../../sagas/selectors";

const ClassInfo = ({ navigation, route }) => {
  const dispatcher = useDispatch();
  const { classId } = route.params;
  const [isModalShown, setIsModalShown] = useState(false);
  const cls = useSelector((state) => selectClass(state, classId));

  const handleConfirmPress = () => {
    dispatcher(api.createClassBooking.createAction({ classId }));
  };

  return (
    <>
      <Portal>
        <Dialog visible={isModalShown} onDismiss={() => setIsModalShown(false)}>
          <Dialog.Title>Confim Class</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to join this class?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirmPress}>Confirm</Button>
            <Button onPress={hideDialog}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView>
        <List.Accordion title={"Class details"} id={1}>
          <List.Item
            title={"Duration of a class"}
            description={`${cls.duration} hours`}
          />
          <List.Item
            title={"Frequency of classes"}
            description={`${cls.frequency}`}
          />
          <List.Item
            title={"Total number of classes"}
            description={`${cls.noOfTimes}`}
          />
        </List.Accordion>
        <Button mode="contained" onPress={handleJoinPress}>
          Join class
        </Button>
      </ScrollView>
    </>
  );
};
