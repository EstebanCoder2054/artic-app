import React, { useEffect, useRef } from "react";
import { Config, SimpleArtwork } from "../interfaces/artworkInterfaces";
import { useIIIFImage } from "../hooks/useIIIFImage";
import { placeholderImage } from "../constants/constants";
import { ArtworkSingleView } from "./ArtworkSingleView";
import { ArtworkGridView } from "./ArtworkGridView";

interface Props {
    artwork: SimpleArtwork;
    apiConfigResp: Config;
    displayMode: string;
}

export const ArtworkCard = ({ artwork, apiConfigResp, displayMode }: Props) => {
    const { getImage } = useIIIFImage();
    const isMounted = useRef(true);

    useEffect(() => {
        if (!isMounted) return;
        // The return statement creates a trigger when the component is about to be unmounted -> componentWillUnmount()
        // In order to prevent memory leaks we use the ismounted variable so we don't create new state updates 
        return () => {
            isMounted.current = false;
        };
    }, []);

    if (displayMode === `grid`) {
        return (
            <ArtworkGridView
                artwork={artwork}
                imageUrl={
                    getImage(apiConfigResp?.iiif_url, artwork?.image_id, 200) ||
                    placeholderImage
                }
            />
        );
    }

    return (
        <ArtworkSingleView
            artwork={artwork}
            imageUrl={
                getImage(apiConfigResp?.iiif_url, artwork?.image_id, 200) ||
                placeholderImage
            }
        />
    );
};
