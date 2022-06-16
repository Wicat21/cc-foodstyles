/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCards,
  createCard,
  deleteCard,
  closeDeleteModal,
} from '../redux/actions/state';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import SafeAreaCustom from '../components/SafeAreaCustom';
import Card from '../components/Card';
import CardModal from '../components/CardModal';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, screenWidth, shadow} from '../config/colors';

import logo from '../assets/logo.png';
import add from '../assets/add.png';

const Home = props => {
  const dispatch = useDispatch();
  const safeArea = useSafeAreaInsets();
  const cards = useSelector(state => state.state.cards);
  const deleteModalOpen = useSelector(state => state.state.deleteModalOpen);

  useEffect(() => {
    dispatch(getCards());
  }, []);

  useEffect(() => {
    if (deleteModalOpen) {
      Alert.alert(
        'Confirm Delete',
        'This will delete the Food Style and all its settings.',
        [
          {
            text: 'Delete',
            onPress: () => dispatch(deleteCard()),
            style: 'destructive',
          },
          {
            text: 'Cancel',
            onPress: () => dispatch(closeDeleteModal()),
            //style: 'cancel',
          },
        ],
      );
    }
  }, [deleteModalOpen]);

  return (
    <SafeAreaCustom
      top={'transparent'}
      bottom={Colors.white}
      center={Colors.bggray}>
      <StatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LinearGradient
        colors={[Colors.orangish, Colors.maize, Colors.bggray]}
        locations={[0, 0.7, 1]}
        style={{
          marginTop: -safeArea.top,
          paddingTop: safeArea.top + 9,
          paddingBottom: 102,
        }}>
        <Image source={logo} style={styles.logo} />
      </LinearGradient>
      <ScrollView style={styles.scrollContainer}>
        <View>
          {cards.map(item => {
            return <Card key={item.id} item={item} />;
          })}
        </View>
      </ScrollView>
      <View style={[styles.bottom, shadow, {marginBottom: -safeArea.bottom}]}>
        <TouchableOpacity
          style={[
            styles.bottombutton,
            shadow,
            {marginBottom: 6 + safeArea.bottom},
          ]}
          onPress={() => dispatch(createCard())}>
          <Image source={add} style={styles.bottomimage} />
          <Text style={styles.text}>New Food Style</Text>
        </TouchableOpacity>
      </View>
      <CardModal />
    </SafeAreaCustom>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    width: 22,
    height: 26,
    marginLeft: 19,
  },
  scrollContainer: {
    marginTop: -70,
    flex: 1,
    zIndex: 2,
    marginBottom: 60,
  },
  buttonContainer: {
    borderColor: 'white',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'ProximaNovaA-Bold',
    fontSize: 18,
    lineHeight: 22,
  },
  bottombutton: {
    marginTop: -20,
    marginHorizontal: 18,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingLeft: 18,
    paddingRight: 15,
    paddingTop: 5, // because the png is not properly cropped
    paddingBottom: 6, // because the png is not properly cropped
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
    backgroundColor: Colors.white,
    zIndex: 3,
  },
  bottomimage: {
    width: 36, // because the png is not properly cropped
    height: 36, // because the png is not properly cropped
    marginRight: 14,
  },
});

export default Home;
