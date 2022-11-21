import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import { SimpleArtwork } from '../interfaces/artworkInterfaces';
import { storeData, getData, removeSingleItem } from '../helpers/asyncStorageHelper';

interface Props {
    artwork: SimpleArtwork;
    size: number;
}

export const FavoriteButton = ({ artwork, size = 40 }: Props) => {

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const loadFavs = async () => {
            const favs = await getData(`favorites`);          
            const itemFound = favs?.find((favItem: SimpleArtwork) => favItem?.id === artwork?.id);
            if (itemFound) setIsSelected(true);
            else setIsSelected(false);
        }
        loadFavs();
    }, [isSelected])

    const onItemPress = async () => {        
        if (isSelected) { // we need to remove this item from the favorites (store)
            setIsSelected(false);
            removeSingleItem(`favorites`, artwork?.id);
        } else {
            setIsSelected(true);
            storeData(`favorites`, artwork)
        }
    }
    
    return (
        <>
            <TouchableOpacity
                style={{...styles.heartContainer, height: size, width: size}}
                activeOpacity={0.6}
                onPress={onItemPress}
            >
                <Ionicons name={isSelected ? `heart-sharp` : `heart-outline`} size={size - 10} color="white" />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    heartContainer: {
        backgroundColor: `rgba(0, 0, 0, 0.44)`,
        justifyContent: `center`,
        alignItems: `center`,
        zIndex: 1,
        borderRadius: 99,
    },
})
