import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FadeInImage } from "./FadeInImage";
import { SimpleArtwork } from "../interfaces/artworkInterfaces";
import { useNavigation } from "@react-navigation/native";
import { FavoriteButton } from "./FavoriteButton";

interface Props {
    artwork: SimpleArtwork;
    imageUrl: string;
}

export const ArtworkSingleView = ({ artwork, imageUrl }: Props) => {
    const navigation = useNavigation<any>();
    const [splittedNames, setSplittedNames] = useState(``);

    useEffect(() => {
        const splittedNames = artwork?.artist_titles.join(", ");
        setSplittedNames(splittedNames);
    }, [artwork?.artist_titles]);

    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate(`FullArtworkScreen`, { artworkId: artwork?.id.toString() })} activeOpacity={0.9}>
                <View style={styles.cardContainerSingle}>
                    {/* background image */}
                    <FadeInImage
                        uri={imageUrl}
                        style={styles.artworkImgBackground}
                        blurRadius={3}
                    />
                    <View style={styles.innerInfoContainer}>
                        <FadeInImage style={styles.artworkimageSingle} uri={imageUrl} />

                        {/* artwork info */}
                        {/* title */}
                        <View style={styles.textContainer}>
                            <Text style={styles.singleTitle} numberOfLines={2}>
                                {artwork?.title}
                            </Text>

                            {/* artists -> this come from an array */}
                            {splittedNames ? (
                                <>
                                    <Text style={styles.singleLabel}>
                                        {artwork?.artist_titles?.length > 1 ? `Artists` : `Artist`}
                                    </Text>
                                    <Text style={styles.singleSubtitle} numberOfLines={1}>
                                        {splittedNames}
                                    </Text>
                                </>
                            ) : undefined}

                            {/* date */}
                            {artwork?.date_display ? (
                                <>
                                    <Text style={styles.singleLabel}>Date</Text>
                                    <Text style={styles.singleSubtitle} numberOfLines={1}>
                                        {artwork?.date_display}
                                    </Text>
                                </>
                            ) : undefined}

                            {/* dimensions */}
                            {artwork?.dimensions ? (
                                <>
                                    <Text style={styles.singleLabel}>Dimensions</Text>
                                    <Text style={styles.singleSubtitle} numberOfLines={2}>
                                        {artwork?.dimensions}
                                    </Text>
                                </>
                            ) : undefined}

                            {/* artwork type title */}
                            {artwork?.artwork_type_title ? (
                                <>
                                    <Text style={styles.singleLabel}>Artwork type</Text>
                                    <Text style={styles.singleSubtitle} numberOfLines={2}>
                                        {artwork?.artwork_type_title}
                                    </Text>
                                </>
                            ) : undefined}
                        </View>
                    </View>
                    {/* favorite button */}
                    <View style={{ position: `absolute`, top: 5, left: 10 }}>
                        <FavoriteButton artwork={artwork} size={30} />
                    </View>
                </View>
                <View style={styles.dividerStyle} />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    innerInfoContainer: {
        position: `absolute`,
        flexDirection: `row`,
        height: 250,
        marginRight: 10,
        marginHorizontal: 20,
    },
    cardContainerSingle: {
        marginTop: 10,
        alignSelf: `auto`,
        height: 280,
        width: `100%`,
        flexDirection: `row`,
        justifyContent: `flex-start`,
        alignItems: `center`,
    },
    singleTitle: {
        color: `white`,
        fontSize: 20,
        fontWeight: `bold`,
        marginBottom: -5,
        marginTop: 0,
    },
    singleLabel: {
        color: `white`,
        fontSize: 12,
        fontWeight: `normal`,
        marginTop: 12,
    },
    singleSubtitle: {
        color: `white`,
        fontSize: 15,
        fontWeight: `normal`,
        marginTop: 2,
    },
    artworkimageSingle: {
        width: 130,
        height: 130,
        borderWidth: 0.8,
        borderColor: `gray`,
    },
    textContainer: {
        backgroundColor: `rgba(0, 0, 0, 0.6)`,
        width: 230,
        height: `100%`,
        paddingHorizontal: 5,
    },
    artworkImgBackground: {
        height: `100%`,
        width: `100%`,
    },
    dividerStyle: {
        borderWidth: 0.5,
        marginTop: 10,
        borderColor: `gray`,
    },
});
