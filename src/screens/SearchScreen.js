import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import yelp from "../api/yelp";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    searchApi();
  }, []);

  const searchApi = async searchTerm => {
    console.log("searched");
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "Akron, OH"
        }
      });
      setResults(response.data.businesses);
    } catch (e) {
      setErr(true);
    }
  };

  return (
    <View style={styles.appContainer}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {err && (
        <Text style={styles.errorStyles}>Something went wrong. Try again!</Text>
      )}
      <Text>We have found {results.length} results</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: "#FFFFFF",
    flexGrow: 1
  },
  errorStyles: {
    color: "red"
  }
});

export default SearchScreen;
