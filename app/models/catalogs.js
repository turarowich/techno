const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogs = new Schema({
    company: {
        type: String,
        default: "",
        validate: {
            validator: async function (company) {
                const promo = await this.constructor.findOne({ company });
                if (promo) {
                    if (this.id === promo.id) {
                        return true;
                    }
                    return false;
                }
                return true;
            },
            message: props => 'promo_name_unique'
        },
    },
    cat_url: {
        type: String,
        default: "",
    },
})

module.exports = mongoose.model('catalogs', catalogs)