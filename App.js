import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "./src/screens/SearchScreen";
import BusinessDetailsScreen from "./src/screens/BusinessDetailsScreen";

const navigator = createStackNavigator(
  {
    Search: { screen: SearchScreen },
    BusinessDetails: {
      screen: BusinessDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.title
      })
    }
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      title: "Business Search"
    }
  }
);

export default createAppContainer(navigator);
