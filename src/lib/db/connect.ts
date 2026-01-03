import mongoose from "mongoose";
export async function dbConnect(){ if(mongoose.connection.readyState>=1) return; if(!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set'); return mongoose.connect(process.env.MONGODB_URI);} 
