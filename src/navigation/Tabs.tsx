import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeNavigator, FavoriteScreenNavigator, SearchScreenNavigator } from './Navigator';
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: `white`,
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? `color-palette` : `color-palette-outline`} size={32} />
          ),
        }}
        name="HomeScreen"
        component={HomeNavigator}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Favorite Artworks',
          tabBarLabel: "Favs",
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? `heart-sharp` : `heart-outline`} size={32} />
          ),
        }}
        name="FavoriteArtworksScreen"
        component={FavoriteScreenNavigator}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          title: 'Search Artworks',
          tabBarLabel: "Search",
          tabBarActiveTintColor: 'black',
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? `search` : `search-outline`} size={32} />
          ),
        }}
        name="SearchScreen"
        component={SearchScreenNavigator}
      />
    </Tab.Navigator>
  );
};
