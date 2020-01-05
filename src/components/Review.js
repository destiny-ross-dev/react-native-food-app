import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Review = ({ review }) => {
  return (
    <View style={styles.containerStyle}>
      <Image
        style={styles.imageStyle}
        source={{ uri: review.user.image_url }}
      />
      <Text>{review.user.name}</Text>
      <Text>{review.text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 15
  },
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 50
  }
});
export default Review;
