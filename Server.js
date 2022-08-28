const express=require("express");//Load Express Module
const bodyParser=require("body-parser");
const cors=require("cors");
const { application } = require("express");
const webserver=express();
const port=3200;
function serverStartedCallback(){
console.log(`Server Started and Listenin on ${port}`);
}
//middleware
webserver.use(cors());   
webserver.use(bodyParser.json());
webserver.use(bodyParser.urlencoded({extended:false})); // for security purpose

webserver.listen(port,serverStartedCallback);
const bmiCalculationHistory=[];
//http://localhost:3200/bmi/calculate
webserver.post("/bmi/calculate",function(req,res){
    const bmiInputModel=req.body;
    console.log(bmiInputModel);
    const result=bmiInputModel.weight / ((bmiInputModel.height *bmiInputModel.height) / 10000)
   res.status(200).json({bmiResult:result});
   bmiCalculationHistory.push(
    {height:bmiInputModel.height,
        weight:bmiInputModel.weight,
        bmiResult:result});
       console.log(result);
});
//http://localhost:3200/bmi/history
webserver.get("/bmi/history",function(req,res){
    res.status(200).json(bmiCalculationHistory);
});