const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
dotenv.config();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
// const cardRoute = require("./routes/cardItem");
const setRoute = require("./routes/sets");

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.omvmasw.mongodb.net/?retryWrites=true&w=majority`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)

		console.log('Database Connection Successfull!')
	} catch (error) {
		console.log(error.message)
	}
};

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
// app.use("/api/cardItem", cardRoute);
app.use("/api/sets", setRoute);

app.listen(process.env.PORT, () => {
  console.log(`Backend server is running on PORT: ${process.env.PORT}!`);
});

