import React from 'react';

import { AboutView } from '@views/about-view';
import { QuotesView } from '@views/quotes-view';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="About"
          component={AboutView}
          options={{ title: 'О приложении' }}
        />
        <Tab.Screen
          name="Quotes"
          component={QuotesView}
          options={{ title: 'Котировки' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
