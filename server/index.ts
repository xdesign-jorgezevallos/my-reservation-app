import express from "express";

export const app = express()
const port = 4000

app.use(express.json())
app.use('/api', require('./controllers/firebase-api'));

app.get('/', (req:any, res:any) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
