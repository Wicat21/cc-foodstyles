import {Dimensions} from 'react-native';

export const Colors = {
  orangish: '#fa7745',
  maize: '#f3c442',
  bggray: '#f8f8f8',
  white: '#fff',
  greenTeal: '#11b777',
};

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};
