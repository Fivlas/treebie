import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import CustomButton from '@/components/elements/CustomButton';


export default function HomeScreen() {
  return (
      <SafeAreaView>
        <ThemedText>
          Index route
        </ThemedText>
        <CustomButton title='Test' buttonType='primary'/>
      </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
