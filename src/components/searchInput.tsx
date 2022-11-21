import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDebounce } from '../hooks/useDebounce';

interface Props {
    onDebounce: (value: string) => void;
}

export const SearchInput = ({ onDebounce }: Props) => {

    const [textValue, setTextValue] = useState(``);

    const debouncedValue = useDebounce(textValue);

    useEffect(() => {
        onDebounce(debouncedValue);
    }, [debouncedValue]);

    const onCloseBtnPress = () => {
        setTextValue(``);
        Keyboard.dismiss();
    }

    return (
        <View style={styles.container}>
            <View style={styles.textBackground}>
                <TextInput
                    placeholder="Search an artwork"
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={textValue}
                    onChangeText={setTextValue}
                    // autoFocus
                />
                
                <View style={{ flexDirection: `row` }}>
                {textValue.trim().length !== 0 ? (
                    <TouchableOpacity activeOpacity={0.8} onPress={onCloseBtnPress} style={styles.closeBtn}>
                        <Ionicons name="close-circle" size={20} color="black" />
                    </TouchableOpacity>
                ) : undefined }
                    <View style={{ flexDirection: `row`, alignItems: `center` }}>
                        <Ionicons name="search" size={30} color="grey" />
                    </View>

                </View>
                    
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginVertical: 15, marginHorizontal: 16 },
    textBackground: {
        backgroundColor: `#F3F1F3`,
        borderRadius: 50,
        height: 50,
        paddingHorizontal: 20,
        justifyContent: `center`,
        alignContent: `center`,
        flexDirection: `row`,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
    },
    closeBtn: {
        justifyContent: `center`,
        marginHorizontal: 5,
    }
});
