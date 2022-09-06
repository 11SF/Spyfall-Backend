require("dotenv").config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
let dbName = process.env.DB_NAME;

const mongoose = require("mongoose");
// mongoose.set('useFindAndModify', false);
const mongo_url = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(
    () => {
      console.log(
        "[success] task 2 : connected to the database successfully. : " + dbName
      );
    },
    (error) => {
      console.log("[failed] task 2 " + error);
      process.exit();
    }
  );
