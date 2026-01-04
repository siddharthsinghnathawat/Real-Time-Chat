import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectToMongoDB = async () => {
	console.log("connectToMongoDB called");
	try {
		console.log("Connecting to:", process.env.MONGO_DB_URI);
		await mongoose.connect(process.env.MONGO_DB_URI, { serverSelectionTimeoutMS: 2000 });
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to local MongoDB:", error.message);
		console.log("Attempting to start in-memory MongoDB...");
		try {
			const mongod = await MongoMemoryServer.create();
			const uri = mongod.getUri();
			console.log("In-memory MongoDB URI:", uri);
			await mongoose.connect(uri);
			console.log("Connected to In-memory MongoDB");
		} catch (memError) {
			console.log("Failed to start in-memory MongoDB", memError.message);
		}
	}
};

export default connectToMongoDB;
