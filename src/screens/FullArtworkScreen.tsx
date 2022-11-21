import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParams } from '../navigation/Navigator';
import { useArtworkFull } from '../hooks/useArtworkFull';
import { FadeInImage } from '../components/FadeInImage';
import { placeholderImage } from '../constants/constants';
import { useArtworksPaginated } from '../hooks/useArtworksPaginated';
import { useIIIFImage } from '../hooks/useIIIFImage';
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Lightbox from 'react-native-lightbox-v2';

interface Props extends StackScreenProps<RootStackParams, 'FullArtworkScreen'> { };

export const FullArtworkScreen = ({ navigation, route }: Props) => {

  const { top } = useSafeAreaInsets();
  const { apiConfigResp } = useArtworksPaginated();
  const { getImage } = useIIIFImage();
  const { artworkId } = route.params;
  const { artworkFull, isloading } = useArtworkFull(artworkId);
  const [splittedNames, setSplittedNames] = useState(``);

  const { data } = artworkFull;
  const imageUrl = getImage(apiConfigResp?.iiif_url!, data?.image_id, 843);

  useEffect(() => {
    const splittedNames = data?.artist_titles.join(", ");
    setSplittedNames(splittedNames);
  }, [data?.artist_titles]);

  const infoToDisplay = [
    { key: `Title`, value: data?.title },
    { key:  data?.artist_titles?.length > 1 ? `Artists` : `Artist`, value: splittedNames },
    { key: `Date`, value: data?.date_display },
    { key: `Medium`, value: data?.medium_display },
    { key: `Dimensions`, value: data?.dimensions },
    { key: `Artwork type`, value: data?.artwork_type_title },
    { key: `Department`, value: data?.department_title },
  ];


  return (
    <ScrollView style={{ ...styles.container }} showsVerticalScrollIndicator={false}>
      {isloading ? (<View style={styles.loadingContainer}><ActivityIndicator color="black" size={30} /></View>) : (
        <>
          {/* image */}
          <View style={styles.imageContainer}>
            {/* @ts-ignore  Reason: children has not been typed already by Lightbox lib*/}
            <Lightbox navigator={navigator} >
              <FadeInImage uri={imageUrl || placeholderImage} style={styles.image} />
            </Lightbox>
            {/* back button */}
            <View style={{ position: `absolute`, top: 50, left: 20 }}>
              <TouchableOpacity
                style={{ ...styles.btnContainer, height: 40, width: 40 }}
                activeOpacity={0.6}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={30} color="white" />
              </TouchableOpacity>
            </View>
            {/* fullscreen button */}
            <View style={{ position: `absolute`, bottom: 20, right: 20 }}>
              <View
                style={{ ...styles.btnContainerZoom }}
              >
                <Text style={{ color: `white` }}>Press the image to zoom it</Text>
                <MaterialIcons name="fullscreen" size={30} color="white" />
              </View>
            </View>
          </View>

          {infoToDisplay.map((item => {
            if (!item?.value) return;
            return (
              <View key={item?.key.toString()}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item?.key}</Text>
                  <Text style={styles.subtitle} numberOfLines={2}>{item?.value}</Text>
                </View>
                <View style={styles.divider} />
              </View>
            )
          }))}

          {/* publication history */}
            <View style={{ marginHorizontal: 16, marginBottom: 50 }}>
              <Text style={{ textAlign: `center`, ...styles.title, marginVertical: 16 }}>Publication history</Text>
              <Text>{ data?.publication_history ? data?.publication_history : `No publication history available`}</Text>
            </View>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: `row`,
    justifyContent: `center`,
    alignContent: `center`,
    flex: 1,
    height: 450,
  },
  container: {
  },
  imageContainer: {
    backgroundColor: `white`,
    height: 450,
    width: Dimensions.get(`window`).width,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  image: {
    width: `100%`,
    height: `100%`,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  btnContainer: {
    backgroundColor: `rgba(0, 0, 0, 0.44)`,
    justifyContent: `center`,
    alignItems: `center`,
    zIndex: 1,
    borderRadius: 99,
  },
  btnContainerZoom: {
    backgroundColor: `rgba(0, 0, 0, 0.44)`,
    justifyContent: `center`,
    alignItems: `center`,
    zIndex: 1,
    borderRadius: 8,
    flexDirection: `row`,
    paddingHorizontal: 10,
  },
  textContainer: {
    flexDirection: `row`,
    justifyContent: `space-between`,
    marginHorizontal: 10,
    alignItems: `center`,
    marginTop: 10,
    paddingVertical: 10
  },
  divider: {
    width: `100%`,
    borderWidth: 0.5,
    borderColor: `gray`,
    marginTop: 10,
  },
  title: {
    color: `black`,
    fontWeight: `bold`,
    fontSize: 13
  },
  subtitle: {
    color: `gray`,
    fontWeight: `bold`,
    fontSize: 13,
    maxWidth: Dimensions.get(`window`).width / 1.5,
  },
});
