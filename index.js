const {faker}=require('@faker-js/faker');
const mysql=require('mysql2')
const express=require('express')
const app=express();
const path=require("path");
const methodOverride=require("method-override")

app.use(methodOverride("_method"))
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))


// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'Vishal2003@'
});
let getRandomUser = ()=> {
    return [
       faker.string.uuid(),
      faker.internet.userName(),
       faker.internet.email(),
    faker.internet.password(),
      
    ];
}; 
//Inserting new data
// let q="INSERT INTO user2 (id,username,email,password) VALUES ?";
// let data=[];

// for(let i=1;i<=100;i++){
//     data.push(getRandomUser()); 
// }

//connection.end();

app.get("/",(req,res)=>{ //fetcha and show total number of userson our app
    let q= `SELECT count(*) FROM user2`;
    try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let count=(result[0]["count(*)"]);
       res.render("home.ejs",{count})
    })
    }
    catch(err){
        console.log(err);
        res.send("some error in DB")
    }

    
})

//show users
app.get("/user",(req,res)=>{
    let q= `SELECT * from user2`;
    try{
    connection.query(q,(err,users)=>{
        if(err) throw err;
    
       res.render("showusers.ejs",{users});
    })
    }
    catch(err){
        console.log(err);
        res.send("some error in DB")
    }
})

//edit route
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM user2 WHERE id='${id}'`

    try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=(result[0])
        res.render("edit.ejs",{user})
       
    })
    }
    catch(err){
        console.log(err);
        res.send("smtg erong in DB")
    }
 
})


//UPDATE route  actual update in database
app.patch("/user/:id",(req,res)=>{
    let {id}=req.params;
    let {password: formPass,username:newUsername}=req.body;
    let q=`SELECT * FROM user2 WHERE id='${id}'`;
   
    try{
    connection.query(q,(err,result)=>{
        if(err) throw err;
        let user=result[0];
        console.log(result);
        console.log(user)
        if(formPass != user.password){
            res.send("WRONG password")
        } else{
            let q2=`UPDATE user2 SET username='${newUsername}' WHERE id='${id}'`;
            connection.query(q2,(err,result)=>{
                if(err) throw err;
                res.send(result);
            })
        }
    })
    }
    catch(err){
        console.log(err);
        res.send("smtg wrong in DB")
    }
 
})




app.listen("8080",()=>{
    console.log("server is listening")
})


// try{
//     connection.query(q,[data],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
       
//     })
// }
// catch(err){
//     console.log(err);
// }
