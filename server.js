const express=require('express');
const hbs = require('hbs');

const fs=require('fs');

const port=process.env.PORT || 3000;

var app=express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next)=>{
    var now=new Date().toString();
    var log=`${now} : ${request.method} : ${request.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err)=>{
        if(err)
            console.log(err);
    });
    next();
});

// app.use((request,response, next) => {
//     response.render('maintenance.hbs');
// }); 

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase(); 
});

app.get('/',(request,response)=>{
    response.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMessage:'Welcome to Home Page'
    });
});

app.get('/projects',(request,response)=>{
    response.render('projects.hbs',{
        pageTitle:'Projects page',
        welcomeMessage:'This is portfolio page'
    });
});

app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        pageTitle:'About page'
    });
});

app.get('/bad',(request,response)=>{
    response.send({
        errorMessage: 'Unable to serve the request'
    });
});

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
});