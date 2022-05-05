import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Button, List, Portal, Dialog, Paragraph } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import api from "../../../services/api/Api";
import { selectClass, selectEducationLevel } from "../../../sagas/selectors";
import styles from "../../../styles";

const ClassInfo = ({ navigation, route }) => {
  const dispatcher = useDispatch();
  const { classId } = route.params;
  const [isModalShown, setIsModalShown] = useState(false);
  const cls = useSelector((state) => selectClass(state, classId));

  const tutorEducationLevel = useSelector((state) =>
    selectEducationLevel(state, cls.tutor.educationLevel)
  );

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
            <Button onPress={() => setIsModalShown(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView style={styles.container}>
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
          <List.Item title={"Description"} description={cls.description} />
        </List.Accordion>
        <List.Accordion title={"Tutor details"} id={1}>
          <List.Item
            title={"Tutor name"}
            description={`${cls.tutor.firstName} ${cls.tutor.lastName}`}
          />
          <List.Item
            title={"Education Level"}
            description={tutorEducationLevel.name}
          />
          <List.Item
            title={"Description"}
            description={`${cls.tutor.description}`}
          />
        </List.Accordion>
        <List.Accordion title={"Participant details"} id={1} mode="contained">
          {cls.studentCapacity && (
            <List.Item
              title={"Class capacity"}
              description={cls.studentCapacity}
            />
          )}
          <List.Item
            title={"Participating Students"}
            description={`${cls.students.length}`}
          />
        </List.Accordion>
        <List.Accordion title={"Payment details"} id={1} mode="contained">
          <List.Item
            title={"Rate Per hour"}
            description={`${cls.ratePerHour}`}
          />
          <List.Item
            title={"Total payment"}
            description={cls.ratePerHour * cls.noOfTimes}
          />
        </List.Accordion>
      </ScrollView>
      <Button
        style={styles.actionbutton}
        mode="contained"
        onPress={() => setIsModalShown(true)}
      >
        Join class
      </Button>
    </>
  );
};

export default ClassInfo;
