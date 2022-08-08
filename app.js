//imports
const express=require('express')
const app=express()

const port = 8000;
app.use(express.json())

//static files
app.use(express.static("public"))
//app.use('/css', express.static(__dirname+'public/css'))
//app.use('/js', express.static(__dirname+'public/js'))
//app.use('/img', express.static(__dirname+'public/img'))


//set ejs views
app.set('views', __dirname + '/public')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/searchProperties', (req, res)=>{
    var country="Bangladesh"
    res.render('searchProperties.ejs', {
        country:country
    })
})

app.get('/signup', (req, res)=>{
    res.render('signup.ejs')
})

app.get('/login', (req, res)=>{
    res.render('login.ejs')
})





//listen on port 3000
app.listen(port, () => console.info('listening on port ', port))