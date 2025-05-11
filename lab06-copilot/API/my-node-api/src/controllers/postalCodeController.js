class PostalCodeController {
    constructor(viaCepService) {
        this.viaCepService = viaCepService;
    }

    async getAddressByPostalCode(req, res) {
        const { postalCode } = req.params;
        try {
            const address = await this.viaCepService.fetchAddressByPostalCode(postalCode);
            if (address) {
                res.json(address);
            } else {
                res.status(404).json({ message: 'Address not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving address', error: error.message });
        }
    }
}

module.exports = PostalCodeController;