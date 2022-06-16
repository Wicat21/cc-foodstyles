/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SafeAreaCustom = ({children, style, ...props}) => {
  const safeArea = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: props.top,
        paddingTop: safeArea.top,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: props.bottom,
          paddingBottom: safeArea.bottom,
        }}>
        <View style={{flex: 1, backgroundColor: props.center}}>{children}</View>
      </View>
    </View>
  );
};

export default SafeAreaCustom;
