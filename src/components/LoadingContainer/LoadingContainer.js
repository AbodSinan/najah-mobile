import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import { ActivityIndicator, Modal, Portal } from "react-native-paper";

import { theme } from "../../styles/theme";
import apiStatusEnum from "../../enums/apiStatusEnum";

const LoadingContainer = ({
  children,
  apiStatus,
  onSuccess,
  containerStyle,
  modalStyle,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if ([apiStatusEnum.AWAITING, apiStatusEnum.REQUESTED].includes(apiStatus)) {
      setIsLoading(true);
    } else if (apiStatus === apiStatusEnum.SUCCESS) {
      setIsLoading(false);
      onSuccess();
    } else if (apiStatus === apiStatusEnum.ERROR) {
      setIsLoading(false);
    }
  }, [apiStatus]);

  return (
    <View>
      <Portal>
        <Modal visible={isLoading} style={[modalStyle, defaultStyles]}>
          <ActivityIndicator size="large" />
        </Modal>
      </Portal>
      <View styles={containerStyle}>{children}</View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  modal: {
    borderRadius: theme?.roundness ? theme.roundness : 5,
  },
});

export default LoadingContainer;
