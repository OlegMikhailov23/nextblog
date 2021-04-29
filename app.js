const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('config')

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors()) // Important use it here
app.use(express.json({extended: true}));
app.use('/api/post', require('./routes/post.routes')); // registration

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(PORT, () => {
            console.log(`App has been started on port ${PORT}...`);
        })
    }catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()
