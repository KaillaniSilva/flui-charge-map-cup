import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../theme';
import MapScreen from '../screens/MapScreen';
import SearchScreen from '../screens/SearchScreen';
import PointDetailScreen from '../screens/PointDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.brand,
        tabBarInactiveTintColor: theme.textMuted,
        tabBarStyle: {
          backgroundColor: theme.bgElevated,
          borderTopColor: theme.border,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => {
          const name =
            route.name === 'Mapa'
              ? focused
                ? 'map'
                : 'map-outline'
              : focused
              ? 'search'
              : 'search-outline';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Mapa"
        component={MapScreen}
        options={{ tabBarAccessibilityLabel: 'Aba Mapa de pontos de recarga' }}
      />
      <Tab.Screen
        name="Buscar"
        component={SearchScreen}
        options={{ tabBarAccessibilityLabel: 'Aba Buscar pontos de recarga' }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const theme = useTheme();
  const navTheme = theme.mode === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer
      theme={{
        ...navTheme,
        colors: {
          ...navTheme.colors,
          background: theme.bg,
          card: theme.bgElevated,
          text: theme.text,
          border: theme.border,
          primary: theme.brand,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: theme.bg },
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen
          name="PointDetail"
          component={PointDetailScreen}
          options={{ animation: 'slide_from_bottom', presentation: 'card' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
