const express = require("express")
const app = express()
const port = process.env.PORT || 5000;
const mongoDB = require("./db")
 mongoDB();

app.get("/",(req,res)=>{
    res.send("hello-world")
})

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","https://frontend-food-delivery-app-mern.vercel.app");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , X-Request-With , Content-Type , Accept"
    );
    next();
})

// router must be used here
app.use(express.json())
app.use("/api" , require("./Routes/CreateUser"))
app.use("/api" , require("./Routes/DisplayData"))
app.use("/api",require("./Routes/OrderData"))

app.listen(port , ()=>{
    console.log("All ok here backend side")
})
