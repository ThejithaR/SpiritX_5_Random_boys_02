import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Set up event listeners before connection
    mongoose.connection.on("connected", () =>
      console.log("Database connected successfully")
    );
    mongoose.connection.on("error", (err) =>
      console.error("Database connection error:", err)
    );
    mongoose.connection.on("disconnected", () =>
      console.log("Database disconnected")
    );

    await mongoose.connect(`${process.env.MONGODB_URI}/Spirit11`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB;
