import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { useArtworksPaginated } from "../hooks/useArtworksPaginated";
import { ArtworkCard } from "../components/ArtworkCard";
import { SimpleArtwork } from "../interfaces/artworkInterfaces";
import { HomeHeader } from "../components/HomeHeader";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
    const { isLoading, simpleArtworksList, loadArtworks, apiConfigResp } = useArtworksPaginated();
    const [filteredArtworkList, setFilteredArtworkList] = useState<SimpleArtwork[]>([]);
    const [artworkToHeader, setArtworkToHeader] = useState<SimpleArtwork>();
    // it can be single (to show only item with more detailed info) or grid (to show more items on screen viewport with less info)
    const [displayMode, setDisplayMode] = useState(`single`);
    const [isRefreshing, setIsRefreshing] = useState(false);


    useEffect(() => {
        loadArtworks();
    }, []);

    useEffect(() => {
        const filteredData = simpleArtworksList?.filter((item) => item?.image_id);
        setFilteredArtworkList(filteredData);

        const itemtoShowHeader = filteredArtworkList?.find(
            (item) => item?.has_not_been_viewed_much
        );
        setArtworkToHeader(itemtoShowHeader);
    }, [simpleArtworksList]);

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            await loadArtworks();
        } catch (error) {
            
        } finally {
            setIsRefreshing(false);
        }
    };

    return (
        <View style={{}}>
            <FlatList
                data={filteredArtworkList}
                keyExtractor={(item) => item?.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                    flexDirection: displayMode === `single` ? `column` : `row`,
                    justifyContent: `center`,
                }}
                ListHeaderComponent={
                    <HomeHeader
                        artworkToHeader={artworkToHeader!}
                        isLoading={isLoading}
                        displayMode={displayMode}
                        setDisplayMode={setDisplayMode}
                        apiConfigResp={apiConfigResp!}
                    />
                }
                renderItem={({ item }) => (
                    <ArtworkCard
                        artwork={item}
                        apiConfigResp={apiConfigResp!}
                        displayMode={displayMode}
                    />
                )}
                onEndReached={loadArtworks}
                onEndReachedThreshold={0.3}
                ListFooterComponent={
                    <ActivityIndicator style={{ height: 100 }} size={20} color="grey" />
                }
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                    />
                }
            />
        </View>
    );
};
