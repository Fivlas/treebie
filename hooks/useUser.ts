import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    uid: string;
    email: string;
};

export const useUser = () => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);

    // Fetch user data from AsyncStorage
    const fetchUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Failed to load user from AsyncStorage', error);
        } finally {
            setLoading(false);
        }
    };

    // Initialize user data
    useEffect(() => {
        fetchUser();
    }, []);

    return { user, loading };
};
