import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, List, Portal, Dialog, Paragraph } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import ListAccordion from "../ListAccordion";
import ProfileCard from "../ProfileCard/ProfileCard";

import api from "../../services/api/Api";
import {
  getApiStatus,
  getClassBookings,
  selectClass,
} from "../../sagas/selectors";
import styles from "../../styles";
import apiStatusEnum from "../../enums/apiStatusEnum";

const ClassInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { classId, isPrivate, ownClass } = route.params;
  const [isModalShown, setIsModalShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const classBookings = useSelector((state) =>
    getClassBookings(state, classId)
  );
  console.log("OWN CLASS", ownClass);

  const cls = useSelector((state) =>
    selectClass(state, classId, isPrivate, ownClass)
  );
  const { createOfferStatus, createClassBookingStatus } =
    useSelector(getApiStatus);

  /*TODO: Create a component to confirm action that takes onConfirm and action */
  const handleConfirmPress = () => {
    if (ownClass) {
      if (isPrivate) {
        dispatch(api.cancelPrivateClass.createAction({ classId }));
      } else {
        dispatch(api.cancelClass.createAction({ classId }));
      }
    }
    if (isPrivate) {
      dispatch(api.createTutorOffer.createAction({ privateClass: classId }));
    } else {
      dispatch(api.createClassBooking.createAction({ classId }));
    }
  };

  const handleSelectTutor = (tutorId) => {
    dispatch(
      api.selectTutor.createAction({ privateClassId: classId, tutorId })
    );
  };

  const handleConfirmStudent = (studentId) => {
    console.log("CONFIRM STUDENT");
  };

  useEffect(() => {
    // Fetch booking for the classes if ownClass
    if (ownClass) {
      dispatch(api.classBookings.createAction({ classId }));
    }
  }, []);

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
        <ListAccordion title={"Class details"} id={1}>
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
        </ListAccordion>
        {cls.tutor && (
          <ListAccordion title={"Tutor details"} id={2}>
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
          </ListAccordion>
        )}
        {isPrivate && cls.tutorOffers && (
          <ListAccordion title={"Tutor Offers"} id={3}>
            {cls.tutorOffers.map((offer) => (
              <ProfileCard
                profile={offer.tutor}
                onSelect={() => handleSelectTutor(offer.tutor.id)}
              />
            ))}
          </ListAccordion>
        )}
        {!isPrivate && (
          <ListAccordion title={"Participant details"} id={4} mode="contained">
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
            {classBookings && (
              <ListAccordion title={"Tutor Offers"} id={3}>
                {classBookings.map((booking) => (
                  <ProfileCard
                    profile={booking.student}
                    onSelect={() => handleConfirmStudent(booking.student.id)}
                  />
                ))}
              </ListAccordion>
            )}
          </ListAccordion>
        )}
        <ListAccordion title={"Payment details"} id={5} mode="contained">
          <List.Item
            title={"Rate Per hour"}
            description={`${cls.ratePerHour}`}
          />
          <List.Item
            title={"Total payment"}
            description={cls.ratePerHour * cls.noOfTimes}
          />
        </ListAccordion>
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
