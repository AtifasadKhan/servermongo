//import
const express = require('express');
      app     = express();
   bodyParser = require('body-parser');
	 mongoose = require('mongoose');	
//connect to mongodb
 mongoose.connect('mongodb://localhost/waitlist', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const Cust = mongoose.model('Cust', { name: String,number: Number, message: String });
//data entry
// const kitty = new Cust({name : "Ehlam",number:4, message: "Cancel the NEET"});
// kitty.save(function(err,cust){
// 	if(err){
// 		console.log("Error please try again NOW");
// 	}
// 	else{
// 		console.log(cust);
// 	}
// })




app.use(bodyParser.urlencoded({ extended: true }));
 //set view engine to ejs
app.set('view engine', 'ejs');

//hard coded array 
// var arr = [{name : "Atif",number:4, message: "Well it's food and service are good!!"}]


//home
app.get('/', function (req, res) {
  	res.render("home");
});
//input
app.get("/res/new",function(req,res){
	res.render("new");
})
 //output
app.get('/res', function (req, res) {
	Cust.find(function(err,Custuri){
		if(err){
			console.log("Error");
		}else{
			res.render("response",{res : Custuri});
	
		}
	})
  	
});
//process the input data and show in output
 app.post('/res', function (req, res) {
	 //capturing from new.ejs the name given in the form
 	var name = req.body.name;
	 var people = req.body.people;
	 var message = req.body.message;
	 console.log(name+people+message);
	 var newArr = {name:name, message:message,number:people};
	 console.log(newArr);
	// arr.push(newArr);
	 Cust.create(newArr,function(err){
		 if(err){
			 console.log("Eror in entry");
		 }else{
			  res.redirect("/res");// after exe of POST we will redirect to Get walla /op
	
		 }
	 })
	
});




app.listen(3000,function(){
	console.log("Server Conneced!!!!");
})