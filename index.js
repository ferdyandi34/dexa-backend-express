require('dotenv').config()
const { PORT } = process.env;
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const logger = require('./src/helpers/logger');

// import routes
const authRouter = require('./src/routes/authRoute')
const employeeRouter = require('./src/routes/employeeRoute')

// import middleware
const authMiddleware = require('./src/middlewares/auth')

const app = express();

app.use(morgan('combined', {
    stream: { write: message => logger.info(message.trim()) } // Log HTTP requests
}));

// middleware
app.use(cors())

app.use(express.json())

app.use('/auth', authRouter)
app.use('/private', authMiddleware, employeeRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
