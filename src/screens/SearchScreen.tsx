import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ArtworkGridView } from '../components/ArtworkGridView';
import { SearchInput } from '../components/searchInput';
import { placeholderImage } from '../constants/constants';
import { useArtworkSearch } from '../hooks/useArtworkSearch';
import { useArtworksPaginated } from '../hooks/useArtworksPaginated';
import { useIIIFImage } from '../hooks/useIIIFImage';
import Lottie from 'lottie-react-native';

export const SearchScreen = () => {

  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState(``);
  const { isFetching, artworkList, loadResults, removeResults } = useArtworkSearch();
  const { apiConfigResp } = useArtworksPaginated();
  const { getImage } = useIIIFImage();

  const getSearchResults = async () => {
    await loadResults(term);
  }

  useEffect(() => {
    if (!term) return removeResults();
    getSearchResults();
  }, [term])

  return (
    <View style={{ ...styles.container, marginTop: top }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SearchInput
          onDebounce={(value) => { setTerm(value) }}
        />
      </TouchableWithoutFeedback>
      {term.trim().length === 0 ? (
        <View style={styles.headerStyle}>
          <Text style={styles.text}>Try searching wherever you want, maybe we'll have results for that</Text>
          <Lottie style={{ marginTop: 10, height: 150, width: 150, alignSelf: `center` }}
            source={require('../assets/animation2.json')}
            autoPlay
            loop
            speed={2} />
        </View>
      ) : undefined}
      {term.trim().length === 0 ? undefined : (
        <FlatList
          data={artworkList}
          keyExtractor={(item) => item?.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <ArtworkGridView artwork={item as any} showArrowBtn imageUrl={
            getImage(apiConfigResp?.iiif_url!, item?.image_id, 200) || placeholderImage
          } />}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            flexDirection: `row`,
            justifyContent: `center`,
          }}
          ListEmptyComponent={term.length && !isFetching ? (
            <Text style={{ marginTop: 10, ...styles.text }}>No results found with this search: {term}</Text>
          ) : undefined}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  headerStyle: {
    justifyContent: `center`, alignItems: `center`
  },
  text: {
    textAlign: `center`,
    fontSize: 18,
    marginHorizontal: 16
  }
});
