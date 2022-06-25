import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, List, Portal, Dialog, Paragraph } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import ProfileCard from "../ProfileCard/ProfileCard";

import api from "../../services/api/Api";
import { getApiStatus, selectClass } from "../../sagas/selectors";
import styles from "../../styles";
import apiStatusEnum from "../../enums/apiStatusEnum";

const ClassInfo = ({ navigation, route }) => {
  const dispatcher = useDispatch();
  const { classId, isPrivate, ownClass } = route.params;
  const [isModalShown, setIsModalShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cls = useSelector((state) =>
    selectClass(state, classId, isPrivate, ownClass)
  );
  const { createOfferStatus, createClassBookingStatus } =
    useSelector(getApiStatus);

  /*TODO: Create a component to confirm action that takes onConfirm and action */
  const handleConfirmPress = () => {
    if (ownClass) {
      if (isPrivate) {
        dispatcher(api.cancelPrivateClass.createAction({ classId }));
      } else {
        dispatcher(api.cancelClass.createAction({ classId }));
      }
    }
    if (isPrivate) {
      dispatcher(api.createTutorOffer.createAction({ privateClass: classId }));
    } else {
      dispatcher(api.createClassBooking.createAction({ classId }));
    }
  };

  const handleSelectTutor = (tutorId) => {
    dispatcher(
      api.selectTutor.createAction({ privateClassId: classId, tutorId })
    );
  };

  useEffect(() => {
    if (createOfferStatus && createOfferStatus === apiStatusEnum.SUCCESS) {
      navigation.navigate("Profile");
    }
  }, [createOfferStatus]);

  useEffect(() => {
    if (
      createClassBookingStatus &&
      createClassBookingStatus === apiStatusEnum.AWAITING
    ) {
      setIsLoading(true);
    }
    if (
      createClassBookingStatus &&
      createClassBookingStatus === apiStatusEnum.SUCCESS
    ) {
      setIsLoading(false);
      setIsModalShown(false);
    }
  }, [createClassBookingStatus]);

  return (
    <>
      <Portal>
        <Dialog visible={isModalShown} onDismiss={() => setIsModalShown(false)}>
          <Dialog.Title>Confim Class</Dialog.Title>
          <Dialog.Content>
            {!isLoading ? (
              <Paragraph>
                Are you sure you want to{" "}
                {ownClass
                  ? "Delete this class?"
                  : isPrivate
                  ? "tutor this class?"
                  : "join this class?"}
              </Paragraph>
            ) : (
              <ActivityIndicator size="large" />
            )}
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
        {cls.tutor && (
          <List.Accordion title={"Tutor details"} id={2}>
            <List.Item
              title={"Tutor name"}
              description={`${cls.tutor.fullName}`}
            />
            <List.Item
              title={"Education Level"}
              description={cls.tutor.EducationLevel}
            />
            <List.Item
              title={"Description"}
              description={`${cls.tutor.description}`}
            />
          </List.Accordion>
        )}
        {isPrivate && cls.tutorOffers && (
          <List.Accordion title={"Tutor Offers"} id={3}>
            {cls.tutorOffers.map((offer) => (
              <ProfileCard
                profile={offer.tutor}
                onSelect={() => handleSelectTutor(offer.tutor.id)}
              />
            ))}
          </List.Accordion>
        )}
        {!isPrivate && (
          <List.Accordion title={"Participant details"} id={4} mode="contained">
            {cls.studentCapacity && (
              <List.Item
                title={"Class capacity"}
                description={cls.studentCapacity}
              />
            )}
            <List.Item
              title={"Participating Students"}
              description={`${cls.students?.length}`}
            />
          </List.Accordion>
        )}
        <List.Accordion title={"Payment details"} id={5} mode="contained">
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
        {ownClass ? "Cancel class" : isPrivate ? "Request tutor" : "Join class"}
      </Button>
    </>
  );
};

export default ClassInfo;
