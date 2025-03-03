require('dotenv').config()
const { PORT } = process.env;
const express = require('express');

// import routes
const authRouter = require('./src/routes/authRoute')
const employeeRouter = require('./src/routes/employeeRoute')

// import middleware
const authMiddleware = require('./src/middlewares/auth')

const app = express();

app.use('/auth', authRouter)
app.use('/private', authMiddleware, employeeRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
