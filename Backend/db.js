const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const dblink = process.env.DBLINK;

const db=()=>{mongoose
  .connect(dblink, {
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useFindAndModify:false
  })
  .then((con) => {
    console.log("DB connection successful");
  })
  .catch((err) => console.log(err));
}

module.exports=db;