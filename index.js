const express = require('express');
const port = 8000;
const path = require('path');

const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();

var ContactList = [{
    name:"Anand",
    phone:"3548678351"
},
{
    name:"Arati",
    phone:"1237887681"
}
]

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets')); // we need to give folder name
// app.use(function(req,res,next){
//     req.myName = "Anand";
//     // console.log("Middleware 1 called");  // middleware1 created
//     next(); // we need to call next so that it moves furthus else it will stuck here only
// });

// app.use(function(req,res,next){
//     // console.log("Middleware 2 called");
//     console.log("MY name from MW2 ",req.myName);
//     next();
// })

app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error in fetching contacts from db");
            return;
        }
       return  res.render('home',{
            title:"My Contact List",
            contact_list :contacts               });
    })
    
});

app.get('/practice',function(req,res){
    
    res.render('practice',{
        title:"Let's Play with EJS"
    });
});

app.get('/delete-contact',function(req,res){
       
        let id = req.query.id;
        // let contactIndex = ContactList.findIndex(contact => contact.phone==phone);
        // if(contactIndex != -1){
        //     ContactList.splice(contactIndex,1);
        // }
        Contact.findByIdAndDelete(id,function(err){
            if(err){
            console.log("Error in deleting ",err);
            return;}
           return  res.redirect('back');
        })
});
app.post('/create-contact',function(req,res){
    // ContactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })
    // ContactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in creating new Contact ",err);
            return;
        } 
        console.log("***",newContact);
        return res.redirect('back');
    })
    // return res.redirect('/');
    // return res.redirect('back'); // this also brings us to same page on submitting
})
app.listen(port,function(err){
    if(err){
        console.log("Error in server: ",err);
        return;
    }
    console.log("Our server is running on port: ",port);
})

