import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { getData, removeData } from '../helpers/asyncStorageHelper';
import { ArtworkGridView } from '../components/ArtworkGridView';
import { useArtworksPaginated } from '../hooks/useArtworksPaginated';
import { useIIIFImage } from '../hooks/useIIIFImage';
import { placeholderImage } from '../constants/constants';
import { SimpleArtwork } from '../interfaces/artworkInterfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Lottie from 'lottie-react-native';

export const FavoriteArtworksScreen = () => {

    const { apiConfigResp } = useArtworksPaginated();
    const { getImage } = useIIIFImage();
    const [favorites, setFavorites] = useState<SimpleArtwork[]>([]);
    const { top } = useSafeAreaInsets();

    useFocusEffect(useCallback(() => {
        const loadFavs = async () => {
            const favs = await getData(`favorites`);
            setFavorites(favs);
        }
        loadFavs();
    }, [getData])
    );

    const removeAllFavorites = async () => {
        setFavorites([]);
        await removeData(`favorites`);
    }

    const renderHeader = () => {
        return (
            <View style={{ marginTop: top + 20 }}>
                <Text style={styles.title}>Favorite Artworks</Text>
                <Text style={styles.subtitle}>{favorites?.length ? `Here's the list of the artworks you like the most` : `Oops, looks like you haven't set any artwork to favorite`}</Text>
                {!favorites?.length ? (
                    <Lottie style={{ marginTop: 10, height: 150, width: 150, alignSelf: `center` }}
                        source={require('../assets/animation2.json')}
                        autoPlay
                        loop
                        speed={2} />
                ) : undefined}
            </View>
        )
    }

    return (
        <>
            <FlatList
                data={favorites}
                renderItem={({ item }) => <ArtworkGridView artwork={item} showArrowBtn imageUrl={
                    getImage(apiConfigResp?.iiif_url!, item?.image_id, 200) ||
                    placeholderImage
                } />}
                ListHeaderComponent={renderHeader}
                keyExtractor={(item) => item?.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    flexDirection: `row`,
                    justifyContent: `center`,
                }}
            />
            {/* {favorites?.length ? (<TouchableOpacity onPress={removeAllFavorites} style={styles.deleteBtn}>
                <Text onPress={removeAllFavorites} style={styles.deleteText}>Remove all favorites</Text>
            </TouchableOpacity>) : undefined} */}
        </>
    )
};

const styles = StyleSheet.create({
    title: {
        color: `black`,
        fontSize: 22,
        fontWeight: `bold`,
        textAlign: `center`,
        marginBottom: 20,
    },
    subtitle: {
        color: `black`,
        fontSize: 15,
        fontWeight: `normal`,
        textAlign: `center`,
        marginBottom: 20,
    },
    deleteBtn: {
        backgroundColor: `#F5A1A1`,
        position: `absolute`,
        bottom: 0,
        alignSelf: `center`,
        borderRadius: 20,
        marginBottom: 15,
        zIndex: 10
    },
    deleteText: {
        color: `#E94444`,
        fontSize: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
    }
})
