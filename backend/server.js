const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

// const localUri = 'mongodb://127.0.0.1:27017/coupon-uthao';
// const uri = 'mongodb+srv://shivamvats1610:vats1610@coupo.ubgdw.mongodb.net/?&w=majority&appName=coupo';

mongoose.connect(uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
}).then(() => {
  console.log("MongoDB connection successful");
}).catch((err) => {
  console.error("MongoDB connection error:", err.message);
});

const coupons = require("./routes/coupons");
app.use("/coupons", coupons);

const categories = require("./routes/categories");
app.use("/categories", categories);

const couponTypes = require("./routes/couponTypes");
app.use("/couponTypes", couponTypes);

const exchangeTypes = require("./routes/exchangeTypes");
app.use("/exchangeTypes", exchangeTypes);

const currencies = require("./routes/currencies");
app.use("/currencies", currencies);

const subFilters = require("./routes/subFilters");
app.use("/subFilters", subFilters);

const user = require("./routes/user");
app.use("/user", user);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});