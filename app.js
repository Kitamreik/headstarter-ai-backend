import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
const app = express();
const PORT = 3001;

app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static(path.join(__dirname + '/public')));


app.get('/', (request, response, next) => {
 response.status(200).json({success: {message: "Index successful"}, statusCode: 200});

});


//Server
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
    console.log(`http://localhost:3001/`)
});