import { Keyboard, View, TouchableWithoutFeedback } from 'react-native';
import { ReactNode } from 'react';

interface DismissKeyboardProps {
  children: ReactNode;
}

function DismissKeyboard({ children } : DismissKeyboardProps) {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View>
            {children}
          </View>
        </TouchableWithoutFeedback>
    );
  }

export default DismissKeyboard;