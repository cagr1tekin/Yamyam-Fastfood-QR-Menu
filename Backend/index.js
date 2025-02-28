import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import db from './config/db.js';
import foodRoutes from './routes/food.js';
import bcrypt from 'bcryptjs'


config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({limit : '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit : '30mb', extended: true}))
app.use(cookieParser());
app.use('/api/foods', foodRoutes);

db();

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  


app.post('/api/login', (req, res) => {
  const { password } = req.body;

  if (!password) {
      return res.status(400).json({ message: 'Şifre gerekli!' });
  }

  const hashedPassword = process.env.ADMIN_PASSWORD;

  const isMatch = bcrypt.compareSync(password, hashedPassword);
  if (isMatch) {
      return res.status(200).json({ message: 'Başarılı giriş!' });
  } else {
      return res.status(401).json({ message: 'Geçersiz şifre!' });
  }
});



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

