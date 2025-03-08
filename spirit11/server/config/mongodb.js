import mongoose from "mongoose";


const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{ 
        console.log('Database connected')
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/Spirit11`)
//     await mongoose.connect(process.env.MONGODB_URI, {
//         dbName: "Spirit11", // ✅ Specify the database name correctly
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });
};

export default connectDB;