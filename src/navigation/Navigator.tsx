import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from '../screens/HomeScreen';
import { FullArtworkScreen } from "../screens/FullArtworkScreen";
import { FavoriteArtworksScreen } from '../screens/FavoriteArtworksScreen';
import { SearchScreen } from '../screens/SearchScreen';

// This is how I want my screen props to look
export type RootStackParams = {
  MainScreen: undefined;
  FavoriteArtworksScreen: undefined;
  SearchScreen: undefined;
  FullArtworkScreen: {
    artworkId: string;
  }
}

const Stack = createStackNavigator<RootStackParams>();

export const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: `white` }
      }}
    >
      <Stack.Screen name="MainScreen" component={HomeScreen} options={{ headerShown: false }}
      />
      <Stack.Screen name="FullArtworkScreen" component={FullArtworkScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export const FavoriteScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: `white` }
      }}
    >
      <Stack.Screen name="FavoriteArtworksScreen" component={FavoriteArtworksScreen} options={{ headerShown: false }}
      />
      <Stack.Screen name="FullArtworkScreen" component={FullArtworkScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export const SearchScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: `white` }
      }}
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }}
      />
      <Stack.Screen name="FullArtworkScreen" component={FullArtworkScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
