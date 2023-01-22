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
import bookingStatusEnum from "../../enums/bookingStatusEnum";
import ClassButtons from "./ClassButtons";

const ClassInfo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { classId, isPrivate, isOwnClass } = route.params;
  const [isModalShown, setIsModalShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const classBookings = useSelector((state) =>
    getClassBookings(state, classId)
  );
  const confirmedClassBookings = classBookings?.filter(
    (booking) => booking.status === bookingStatusEnum.CONFIRMED
  );
  const pendingClassBookings = classBookings?.filter((booking) =>
    [
      bookingStatusEnum.PENDING_PAYMENT,
      bookingStatusEnum.PENDING_TUTOR,
    ].includes(booking.status)
  );

  const cls = useSelector((state) =>
    selectClass(state, classId, isPrivate, isOwnClass)
  );
  const { createOfferStatus, createClassBookingStatus } =
    useSelector(getApiStatus);

  /*TODO: Create a component to confirm action that takes onConfirm and action */
  const handleConfirmPress = () => {
    if (isOwnClass) {
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

  const handleConfirmStudent = (bookingId) => {
    dispatch(api.acceptStudent.createAction({ bookingId, isAccepted: true }));
  };

  useEffect(() => {
    // Fetch booking for the classes if isOwnClass
    if (isOwnClass) {
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
            {confirmedClassBookings?.length > 0 && (
              <ListAccordion title={"Confirmed Students"} id={5}>
                {confirmedClassBookings.map((booking) => (
                  <ProfileCard profile={booking.student} />
                ))}
              </ListAccordion>
            )}
            {pendingClassBookings?.length > 0 && (
              <ListAccordion title={"Participating Students"} id={6}>
                {pendingClassBookings.map((booking) => (
                  <ProfileCard
                    profile={booking.student}
                    onSelect={() => handleConfirmStudent(booking.id)}
                  />
                ))}
              </ListAccordion>
            )}
          </ListAccordion>
        )}
        <ListAccordion title={"Payment details"} id={7} mode="contained">
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
      <ClassButtons
        classId={classId}
        isOwnClass={isOwnClass}
        isPrivate={isPrivate}
      />
    </>
  );
};

export default ClassInfo;
