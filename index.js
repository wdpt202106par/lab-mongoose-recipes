const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // data.forEach((element) => {
    const promises = [];
   
    // });
    promises.push(
      Recipe.insertMany(data)
        .then(function (docs) {
          for (let i = 0; i < docs.length; i++) {
            const element = docs[i];
            console.log(element.title);
          }
        })
        .catch(function (err) {
          console.log(err);
        })
    );
    Promise.all(promises).then(() => {
      Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ).then((ret) => console.log("Success")).catch((err)=> console.log(err));
      
      Recipe.deleteOne({ title: "Carrot Cake" }).then((del)=> {
        console.log('delete of ',del);
        mongoose.connection.close();
    });
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
