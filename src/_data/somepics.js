const EleventyFetch = require('@11ty/eleventy-fetch');
require('dotenv').config();

module.exports = async function () {
    const url = 'https://api.omg.lol/address/flamed/pics/';
    
    // Get the API key from the environment variables
    const apiKey = process.env.OMG_LOL_KEY;

    try {
        // Make the API request with the Authorization header
        const res = await EleventyFetch(url, {
            duration: '1h',
            type: 'json',
            fetchOptions: {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        });

        // Ensure that the response contains a valid 'pics' array
        if (res && res.response && Array.isArray(res.response.pics)) {
            // Return the entire 'pics' array
            return res.response.pics;
        } else {
            // Log an error if the expected data is not present
            console.error('Unexpected API response structure or missing data:', res);
            return []; // Return an empty array if no pictures are available
        }
    } catch (error) {
        // Log errors that occur during the API request
        console.error('Error fetching data from OMG.LOL API:', error);
        return []; // Return an empty array to indicate an error occurred
    }
};
