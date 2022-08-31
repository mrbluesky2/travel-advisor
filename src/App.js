import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api/apiHelper';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

function App () {
    const [places, setPlaces] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    // could use react context or redux if more than one level:

    // list states
    const [type, setType] = useState('restaurants');
	const [rating, setRating] = useState(0);

    // map states
    const [childClicked, setChildClicked] = useState(null);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // get the user's location on startup
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
            setCoordinates({ lat: latitude, lng: longitude });
        });
    }, []);

    useEffect(() => {
        setFilteredPlaces(places.filter((place) => place.rating > rating));
    }, [rating]);

    useEffect(() => {
        if (bounds.sw && bounds.ne) {
            setIsLoading(true);
            // get the places when the map changes
            getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
                console.log(data);
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([]);
                setIsLoading(false);
            });
        }
    }, [type, bounds]);

    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;