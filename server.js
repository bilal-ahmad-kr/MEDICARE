const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const healthRoutes = require('./routes/health.routes')
const connectDB = require('./config/db')
const authRoutes = require('./routes/auth.routes.js')

connectDB()

app.get('/api', (req, res) => {
    res.json({ success: true,
        message:" medicare-pro api running"
     })
})

app.use('/api', healthRoutes)
app.use('/api/auth', authRoutes)



app.use((req, res)=> {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})