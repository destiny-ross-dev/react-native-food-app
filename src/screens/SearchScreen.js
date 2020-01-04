import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [searchApi, results, err] = useResults();

  const filterResultsByPrice = price => {
    return results.filter(result => {
      return result.price === price;
    });
  };

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {err && (
        <Text style={styles.errorStyles}>Something went wrong. Try again!</Text>
      )}
      <ScrollView horizontal={false}>
        <Text style={styles.resultsCountStyle}>
          Showing {results.length} results
        </Text>
        <ResultsList
          results={filterResultsByPrice("$")}
          title="Cost Effective"
        />
        <ResultsList
          results={filterResultsByPrice("$$")}
          title="A Bit Pricier"
        />
        <ResultsList
          results={filterResultsByPrice("$$$")}
          title="Big Spender"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  errorStyles: {
    color: "red"
  },
  resultsCountStyle: {
    marginLeft: 15
  }
});

export default SearchScreen;
