import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if(!MONGODB_URI){
  throw new Error('Please set MONGODB_URI in .env')
}

let cached = global._mongoose_cached
if(!cached) cached = global._mongoose_cached = { conn: null, promise: null }

export async function connectDb(){
  if(cached.conn) return cached.conn
  if(!cached.promise){
    cached.promise = mongoose.connect(MONGODB_URI, { dbName: undefined }).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}
