const axios = require('axios');

const fetchAddressByPostalCode = async (postalCode) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${postalCode}/json/`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching address data');
    }
};

module.exports = fetchAddressByPostalCode;