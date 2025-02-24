import { connect } from 'mongoose';

const db = () => {
    connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongo_db connected");
    })
    .catch((err) => {
        console.log(err);
    });
};

export default db;  