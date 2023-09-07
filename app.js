const express = require('express');
const path = require('path')
const app = express();



app.set('views',path.resolve(__dirname + '/views') )
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('public'))
app.use('/', apiRouter)


let PORT = 8080;
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});