import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import 'react-native-get-random-values';

const DEFAULT_REGION = {
    latitude: 43.65107, // Downtown Toronto
    longitude: -79.347015,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};

const DEFAULT_MARKER = {
    latitude: 43.65107, // Downtown Toronto
    longitude: -79.347015,
}

const StationComponent = () => {
    const [region, setRegion] = useState(DEFAULT_REGION);
    const [marker, setMarker] = useState(DEFAULT_MARKER);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission denied. Using default location: Downtown Toronto.');
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                console.log('Live location fetched:', { latitude, longitude });

                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                setMarker({
                    latitude,
                    longitude,
                });
            } catch (error) {
                console.error('Error fetching live location:', error);
                console.log('Using default location: Downtown Toronto.');
                setRegion(DEFAULT_REGION);
                setMarker(DEFAULT_REGION);
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder="Search for a location"
                fetchDetails={true}
                onPress={(data, details = null) => {
                    const location = details?.geometry.location;
                    console.log("Search hit");
                    if (location) {
                        console.log('Google Places API Result:', { data, location });

                        setRegion({
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        });
                        setMarker({
                            latitude: location.lat,
                            longitude: location.lng,
                        });
                    }
                }}
                onFail={(error) => console.error('Places API Error:', error)}
                query={{
                    key: '', // Replace with your actual key
                    language: 'en',
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                styles={{
                    container: {
                        position: 'absolute',
                        top: 10,
                        width: '90%',
                        zIndex: 1,
                        alignSelf: 'center',
                    },
                    textInput: {
                        height: 40,
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                    },
                }}
            />
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            >
                <Marker coordinate={marker} />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default StationComponent;
