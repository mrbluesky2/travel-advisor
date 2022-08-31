import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
    try {
        const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

        const { data: { data } } = await axios.get(URL, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                lunit: 'mi',
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}