const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');

app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
const PORT = 3001;


app.get("/", (req,res) => {
    res.json("Hello world");
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})