import express from 'express';
import cors from 'cors';
import connection from './db/connection.js';
import clientRouter from './routes/clientroute.js';


const PORT = 9000;

connection()
.then(()=>{
    console.log('DB Connected');
})
.catch();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use('/api/client' , clientRouter);

app.listen(PORT , ()=>{
    console.log('listening on port' , PORT);
});

