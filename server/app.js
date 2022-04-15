const express = require('express')
const app = express()

app.use(express.json()) // parses request body as json
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8081");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/api/add/:a/:b', (req, res, next) => {
    setTimeout(() => {
        res.json(parseInt(req.params.a) + parseInt(req.params.b))
    }, 3000);
})

app.get('/api/multiply/:a/:b', (req, res, next) => {
    setTimeout(() => {
        res.json(parseInt(req.params.a) * parseInt(req.params.b))
    }, 3000);
})

// listen on port
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});