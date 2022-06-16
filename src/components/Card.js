import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import {Colors, shadow} from '../config/colors';
import {openCardModal} from '../redux/actions/state';
import {useDispatch} from 'react-redux';

import options from '../assets/options.png';

const Card = props => {
  const dispatch = useDispatch();
  return (
    <View key={props.item.id} style={[styles.card, shadow]}>
      <Text style={styles.text}>{props.item.name}</Text>
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => dispatch(openCardModal(props.item))}>
        <Image source={options} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginBottom: 6,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 6,
    paddingLeft: 18,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 14,
  },
  text: {
    fontFamily: 'ProximaNovaA-Bold',
    fontSize: 18,
    lineHeight: 22,
    marginRight: 14,
    flex: 1,
  },
  imageContainer: {
    width: 24,
    height: 24,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default Card;
