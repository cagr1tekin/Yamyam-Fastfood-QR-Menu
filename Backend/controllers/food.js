import Food from '../models/Food.js';

export const createFood = async (req, res) => {
    const { name, description, price, type, photo } = req.body;


    if (!name || !description || !price || !type || !photo) {
        return res.status(400).json({ message: "Tüm alanlar doldurulmalıdır." });
    }

    try {
        const newFood = new Food({ name, description, price, type, photo});
        await newFood.save();
        res.status(201).json(newFood);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: 'Doğrulama hatası.', error: error.message });
        } else {
            res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
        }
    }
};

export const updateFood = async (req, res) => {
    const { id } = req.params;
    try {
        const food = await Food.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deleteFood = async (req, res) => {
    const { id } = req.params;
    try {
        await Food.findByIdAndDelete(id);
        res.status(200).json({ message: 'Silme işleminiz başarılı...' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const getFood = async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
