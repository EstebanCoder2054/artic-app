import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SimpleArtwork } from "../interfaces/artworkInterfaces";
import { FadeInImage } from "./FadeInImage";
import { useNavigation } from "@react-navigation/native";
import { FavoriteButton } from "./FavoriteButton";
import { ArrowButton } from "./ArrowButton";

interface Props {
    artwork: SimpleArtwork;
    imageUrl: string;
    showArrowBtn?: boolean;
}

export const ArtworkGridView = ({ artwork, imageUrl, showArrowBtn }: Props) => {
    const navigation = useNavigation<any>();
    const windowWidth = Dimensions.get("window").width;

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate(`FullArtworkScreen`, { artworkId: artwork?.id.toString() })
            }}
        >
            <View
                style={{
                    ...styles.cardContainerGrid,
                    width: windowWidth * 0.4,
                }}
            >
                <FadeInImage uri={imageUrl} style={styles.artworkimageGrid} />
                <Text numberOfLines={3} style={styles.gridTitle}>
                    {artwork?.title}
                </Text>
            </View>
            {/* favorite or go to details button */}
            <View style={{ position: `absolute`, top: 5, right: 10 }}>
            {showArrowBtn ? (
                <ArrowButton id={artwork?.id.toString()} size={30} />
            ) : (
                <FavoriteButton artwork={artwork} size={30} />
            )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainerGrid: {
        marginHorizontal: 10,
        backgroundColor: `white`,
        height: 205,
        width: 160,
        marginBottom: 25,
        justifyContent: `flex-start`,
        alignItems: `center`,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: `#AEAEAE`,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    gridTitle: {
        color: `#454545`,
        fontSize: 13,
        fontWeight: `bold`,
        textAlign: `center`,
        marginTop: 5,
        marginHorizontal: 3,
    },
    artworkimageGrid: {
        width: 130,
        height: 130,
        marginTop: 10,
        borderRadius: 10,
    },
});
