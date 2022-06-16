/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
} from 'react-native';
import {Colors, screenWidth, screenHeight, shadow} from '../config/colors';
import {BlurView} from '@react-native-community/blur';
import Share from 'react-native-share';
import {
  shareCard,
  duplicateCard,
  openDeleteModal,
  hideCardModal,
  closeCardModal,
} from '../redux/actions/state';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import close from '../assets/close.png';
import share from '../assets/share.png';
import duplicate from '../assets/duplicate.png';
import remove from '../assets/delete.png';

const CardModal = props => {
  const dispatch = useDispatch();
  const safeArea = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const isVisible = useSelector(state => state.state.cardModalOpen);
  const hide = useSelector(state => state.state.hideCardModal);
  const shareCode = useSelector(state => state.state.share);
  const selectedItem = useSelector(state => state.state.selectedItem);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -140,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }, 800);
    }
  }, [isVisible]);

  useEffect(() => {
    if (hide) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        slideAnim.setValue(0);
        dispatch(closeCardModal());
      }, 1000);
    }
  }, [hide]);

  useEffect(() => {
    if (shareCode !== '' && isVisible) {
      const shareOptions = {
        activityItemSources: [
          {
            placeholderItem: {type: 'text', content: 'message'},
            item: {
              default: {
                type: 'url',
                content: `https://cards.foodstyles.com/${shareCode}`,
              },
            },
            linkMetadata: {title: selectedItem.name, originalUrl: 'message'},
          },
        ],
      };
      // app icon will is visible
      Share.open(shareOptions)
        .then(res => {
          console.log(res);
          dispatch(hideCardModal());
        })
        .catch(err => {
          err && console.log(err);
        });
    }
  }, [shareCode]);

  if (isVisible) {
    return (
      <Animated.View
        style={[
          styles.modalContainer,
          {marginTop: -safeArea.top, paddingTop: safeArea.top},
          {opacity: fadeAnim},
        ]}>
        <BlurView
          style={styles.blur}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={[styles.card, shadow]}>
          <Text style={styles.text}>{selectedItem.name}</Text>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => dispatch(hideCardModal())}>
            <Image source={close} style={styles.image} />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              transform: [{translateX: slideAnim}],
            },
          ]}>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => dispatch(shareCard(selectedItem.id))}>
            <Text style={styles.actiontext}>Share</Text>

            <Image source={share} style={styles.actionImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => dispatch(duplicateCard(selectedItem.id))}>
            <Text style={styles.actiontext}>Duplicate</Text>
            <Image source={duplicate} style={styles.actionImage} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionContainer}
            onPress={() => dispatch(openDeleteModal())}>
            <Text style={styles.actiontext}>Delete</Text>
            <Image source={remove} style={styles.actionImage} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    height: screenHeight,
    width: screenWidth,
    alignItems: 'center',
    zIndex: 4,
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'rgba(255,246,243,0.5)',
  },
  card: {
    marginTop: 205,
    marginHorizontal: 18,
    marginBottom: 15,
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
  buttonContainer: {
    alignSelf: 'flex-end',
    marginRight: -120,
  },
  actionContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    //marginBottom: 9, // because the pngs are not properly cropped
  },
  actiontext: {
    fontFamily: 'ProximaNovaA-SemiBold',
    color: Colors.greenTeal,
    textAlign: 'right',
    fontSize: 15,
  },
  actionImage: {
    width: 50, // because the pngs are not properly cropped
    height: 50, // because the pngs are not properly cropped
  },
});

export default CardModal;
