import mongoose from 'mongoose'

async function connectDatabase() {
  await mongoose.connect(global.config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('connected to database')
}

export default connectDatabase
