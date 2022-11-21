import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

interface Props {
    id: string;
    size: number;
}

export const ArrowButton = ({ id, size = 40 }: Props) => {

    const navigation = useNavigation<any>();
    
    return (
        <>
            <TouchableOpacity
                style={{...styles.btnContainer, height: size, width: size}}
                activeOpacity={0.6}
                onPress={() => navigation.navigate(`FullArtworkScreen`, { artworkId: id.toString() })}
            >
                <Ionicons name="arrow-forward" size={size - 10} color="white" />
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: `rgba(0, 0, 0, 0.44)`,
        justifyContent: `center`,
        alignItems: `center`,
        zIndex: 1,
        borderRadius: 99,
    },
})
