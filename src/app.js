const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

const app = express()
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public') 
app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
//If you want to change the default 'views' directory
const viewsPath = path.join(__dirname,'../templates/views')
app.set('views',viewsPath)
//partials directory
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)


app.get('',(req,res)=> {
    res.render('index',{
        title: 'Weather',
        name: 'Nadarajan'

    })
})
app.get('/about',(req,res)=> {
    res.render('about',{
        title: 'About',
        name: 'Maharajan'
    })
})
app.get('/help',(req,res)=> {
    res.render('help',{
        title: 'Help Page',
        name: 'Maharajan',
        msg:"This is a help page for the weather app , under construction"
    })
})

app.get('',(req,res) => {
    res.send('<h1>Hello express!</h1>')
})

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'Andrew',
//         age: 10
//     },{
//         name: 'Nada',
//         age: 100
//     }
// ])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You need to provide address to get weather'
        })
    }
    let add = req.query.address  
    
    geocode(add, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

           // console.log(location)
           // console.log(forecastData)
            res.send({
                forecastData,
                location
                
            })
        })

       


    })
})
 



app.get('/products',(req,res) =>{
    if(req.query.search){
        return res.send({
            error: "You must provide search term"
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})
app.get('/help/*',(req,res) => {
    res.render('error',{
        title : 'Error help',
        name : 'Nadarajan',
        errorMessage : 'Help page not found.'
    })
})

app.get('*',(req,res) =>{
    res.render('error',{
        title : 'Error',
        name : 'Nadarajan',
        errorMessage : 'Page Not found.'
    })
})

app.listen(3000,() => {
    console.log('Server is up on port 3000.')
})
