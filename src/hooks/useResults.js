import { useEffect, useState } from "react";
import yelp from "../api/yelp";

export default () => {
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

  return [searchApi, results, err];
};
