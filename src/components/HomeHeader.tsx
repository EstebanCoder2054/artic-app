import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { placeholderImage } from "../constants/constants";
import { useIIIFImage } from "../hooks/useIIIFImage";
import { Config, SimpleArtwork } from "../interfaces/artworkInterfaces";
import { FadeInImage } from "./FadeInImage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ArrowButton } from "./ArrowButton";

interface Props {
    artworkToHeader: SimpleArtwork;
    isLoading: boolean;
    displayMode: string;
    apiConfigResp: Config;
    setDisplayMode: (displaymode: string) => void;
}

export const HomeHeader = ({
    artworkToHeader,
    isLoading,
    displayMode,
    setDisplayMode,
    apiConfigResp,
}: Props) => {
    const { top } = useSafeAreaInsets();
    const { getImage } = useIIIFImage();

    return (
        <>
        <TouchableOpacity onPress={() => console.log('banner image pressed')} activeOpacity={0.9}>
            {/* Banner image and favorite button */}
            <View style={styles.bannerContainer}>
                {isLoading ? (
                    <ActivityIndicator color="black" />
                ) : (
                    <>
                        <FadeInImage
                            uri={
                                getImage(
                                    apiConfigResp?.iiif_url,
                                    artworkToHeader?.image_id,
                                    843
                                ) || placeholderImage
                            }
                            style={styles.artworkImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.bannerText}>
                                This artwork has not been viewed much, would you like to take a
                                look at it?
                            </Text>
                        </View>
                        
                        {/* arrow button */}
                        <View style={{ position: `absolute`, top: 50, right: 30 }}>
                            <ArrowButton id={artworkToHeader?.id.toString()} size={40} />
                        </View>
                    </>
                )}
            </View>

            {/* View options */}
            {!isLoading ? (
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => setDisplayMode(`single`)}
                        hitSlop={{ bottom: 20, top: 20, left: 30, right: 30 }}
                    >
                        <Ionicons
                            name={displayMode === `single` ? `browsers` : `browsers-outline`}
                            size={20}
                            color="black"
                        />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => setDisplayMode(`grid`)}
                        hitSlop={{ bottom: 10, top: 10, left: 30, right: 30 }}
                    >
                        <Ionicons
                            name={displayMode === `grid` ? `grid` : `grid-outline`}
                            size={20}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            ) : undefined}
            </TouchableOpacity>
            {/* <Text onPress={() => removeData(`favorites`)}>REMOVE STORED DATA</Text>  */}
        </>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        height: 350,
        width: Dimensions.get("window").width,
        flexDirection: `row`,
        justifyContent: `center`,
        alignItems: `center`,
    },
    artworkImage: {
        width: `100%`,
        height: `100%`,
        borderTopEndRadius: 25,
        borderTopStartRadius: 25,
    },
    textContainer: {
        position: `absolute`,
        backgroundColor: `rgba(0, 0, 0, 0.44)`,
        width: 360,
        height: 80,
        zIndex: 1,
        bottom: 10,
        justifyContent: `center`,
        alignItems: `center`,
    },
    bannerText: {
        color: `white`,
        fontSize: 18,
        fontWeight: `bold`,
    },
    bannerSubtitle: {
        color: `white`,
        fontSize: 14,
        fontWeight: `bold`,
    },
    optionsContainer: {
        backgroundColor: `white`,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: `center`,
        width: `90%`,
        borderWidth: 1,
        borderColor: `gray`,
        borderRadius: 10,
        height: 40,
        flexDirection: `row`,
        justifyContent: `space-evenly`,
        alignItems: `center`,
        marginVertical: 10,
    },
    divider: {
        height: `70%`,
        width: 1,
        backgroundColor: `gray`,
    },
});
