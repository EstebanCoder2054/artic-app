import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key: string = `favorites`) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? JSON.parse(value) : null;
    } catch (error) {
        console.log(`An error ocurred trying to get the async storage data `, error);
    }
}

export const storeData = async (key: string = `favorites`, value: any) => {
    try {
        const retrievedData = await AsyncStorage.getItem(key); // string || null
        if (retrievedData === null) { // means that we are about to store the first value
            let itemToStore = [value];
            await AsyncStorage.setItem(key, JSON.stringify(itemToStore));
        } else { // means that they are exiting values on the storage already
            const existingArray = [...JSON.parse(retrievedData)];
            const foundElement = existingArray.find(existingItem => existingItem?.id === value?.id)
            if (foundElement) return; // we don't want repeated items in the favorite section
            existingArray.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(existingArray));
        }
    } catch (error) {
        console.log(`An error ocurred trying to store data to the async storage `, error);
    }
}

export const removeSingleItem = async (key: string = `favorites`, id: any) => {
    try {
        const retrievedData = await AsyncStorage.getItem(key); // string || null
        // @ts-ignore
        const parsedArray = JSON.parse(retrievedData);
        const filtered = parsedArray.filter((item: any) => item?.id !== id);        
        await AsyncStorage.setItem(key, JSON.stringify(filtered));
    } catch (error) {
        console.error(`An error ocurred trying to remove a single item from the async storage`)
    }
}

export const removeData = async (key: string = `favorites`) => {
    try {
        console.log(`removing data from this key `, key);
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error(`An error ocurred trying to remove the async storage data`, error);
    }

}

