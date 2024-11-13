import {Tabs} from 'expo-router';
import React from 'react';

import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Główna',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="challenges"
                options={{
                    title: 'Wyzwania',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'barbell' : 'barbell-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="tree"
                options={{
                    title: 'Drzewko',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'leaf' : 'leaf-outline'} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Ustawienia',
                    tabBarIcon: ({color, focused}) => (
                        <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}
