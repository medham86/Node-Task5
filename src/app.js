
const express = require('express') ;
const app = express() ;
const port = process.env.PORT || 3000 ;

const path = require('path') ;
const publicDirectory = path.join(__dirname , '../public');
app.use(express.static(publicDirectory));


app.set("view engine" , "hbs") ;

const viewDirectory = path.join(__dirname , '../temp1/views');
app.set('views' , viewDirectory);

const hbs = require('hbs');
const partialsDirectory = path.join(__dirname , '../temp1/partials');
hbs.registerPartials(partialsDirectory);

app.get('/' , ( req , res )=>{
    res.render('index' , {

        title : 'Welcome in my Home Page',
        name : 'Medhat' ,
        age : 37 ,
        city : 'Fayoum'
    })
})


app.get('/weather' , (req,res)=>{
    res.render('weather' , {
        title : 'Welcome in my weather Page',
    })
})


const geocode = require('./tools/geocode')
const forecast  = require ("./tools/forecastFile");


    

app.get('/project' , ( req , res )=>{
    
    if(!req.query.address){
        

       return res.send({
        error : 'address missing'
       })
    }

         geocode(req.query.address,(error , data)=>{

            if(error){

               return  res.send({
                error : error
               })
            }

            forecast( data.longtitude , data.latitude , (error , forecastData)=>{
                if(error){
                     return   res.send( {
                        error : error
                       })

                }

                res.send({
                    title : "Weather Page" ,
                    name: forecastData.name,
                    longtitude : forecastData.longtitude,
                    latitude : forecastData.latitude,
                    status:  forecastData.status,
                    temp : forecastData.temp,
                })

                
            })
                
                
            })
        })
    
    
        
        

    
// app.get('/products' , (req,res)=>{

//     console.log(req.query.model)

//     res.send(
//         {
//             product : 'Kia '
//         }
//     )
// })

////////////////////////////////////////////////////////////////
// app.get('/weatherApi' , (req,res)=>{

//         if(!req.query.address){

//             return res.send({

//                 error : 'Missing address'
//             })
//         }else{
//             return res.send({

//                 address :req.query.address ,
//                 forecast : "Cold"
//             })
//         }
//     })





           
app.get('*',(req,res)=>{

    res.send('404 page error')
})

app.listen(port , ()=>{console.log(`Everything is ok on port : ${port}`)});