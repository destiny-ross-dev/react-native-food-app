import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import yelp from "../api/yelp";
import Review from "../components/Review";
import { ScrollView } from "react-native-gesture-handler";

const BusinessDetailsScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getDetails(id);
  }, []);

  const getDetails = async id => {
    try {
      const res = await yelp.get(`/${id}`);
      setDetails(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDetails(id);
  }, []);
  useEffect(() => {
    getReviews(id);
  }, []);

  const getReviews = async id => {
    try {
      const res = await yelp.get(`/${id}/reviews`);
      setReviews(res.data.reviews);
      console.log(res.data.reviews);
    } catch (e) {
      console.log(e);
    }
  };

  if (!details || !reviews) {
    return null;
  }

  return (
    <>
      <Text style={styles.titleStyle}>{details.name}</Text>
      <Text style={styles.ratingStyle}>
        {details.rating} Stars, {details.review_count} Reviews
      </Text>
      <Text style={styles.addressStyle}>
        {details.location.address1} {details.location.city}{" "}
        {details.location.zip_code}
      </Text>
      <Text style={styles.hoursStyle}>
        {details.hours[0].is_open_now ? "Open Now" : "Closed"}
      </Text>
      <FlatList
        style={{ marginVertical: 10, height: 275, flexGrow: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={details.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.imageStyle} source={{ uri: item }} />;
        }}
      />
      <Text style={styles.subTitleStyle}>Reviews</Text>
      <FlatList
        data={reviews}
        keyExtractor={review => review.id}
        renderItem={({ item }) => {
          return <Review review={item} />;
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 24,
    fontWeight: "bold"
  },
  subTitleStyle: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold"
  },
  addressStyle: {
    marginLeft: 15
  },
  ratingStyle: {
    marginLeft: 15
  },
  hoursStyle: {
    marginLeft: 15
  },
  imageStyle: {
    height: 200,
    width: 300,
    marginLeft: 15,
    marginVertical: 5
  }
});

BusinessDetailsScreen.navigationOptions = navigation => {
  return { title: "Business Details" };
};

export default BusinessDetailsScreen;
