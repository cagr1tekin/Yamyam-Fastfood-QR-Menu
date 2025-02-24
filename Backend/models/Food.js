import { Schema, model } from 'mongoose';

const foodSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["Burgers", "Menus", "ByProducts", "Drinks", "Burritos", "Sauces", "OtherTypes"]
    },
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    
});


export default model('Food',foodSchema)