import { deleteFood, updateFood, createFood, getFood } from '../controllers/food.js';
import { Router } from 'express';
import Food from '../models/Food.js';

const router = Router();

router.post('/createFood', createFood);
router.put('/updateFood/:id', updateFood);
router.delete('/deleteFood/:id', deleteFood);
router.get("/", async (req, res) => {
    const { type } = req.query;
    try {
      const foods = type 
        ? await Food.find({ type: { $regex: new RegExp(`^${type}$`, "i") } })
        : await Food.find();
      res.status(200).json(foods);
    } catch (error) {
      res.status(500).json({ error: "Veri alınırken hata oluştu." });
    }
});

export default router;
