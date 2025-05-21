import { MongoClient, MongoClientOptions } from 'mongodb'

const atlasUsername = process.env.ATLAS_USER;
const atlasPassword = process.env.ATLAS_PASS;


const uri = `mongodb+srv://${atlasUsername}:${atlasPassword}@reactgramexercise.gzaqrdp.mongodb.net/`

// const uri = process.env.MONGODB_URI as string
const options: MongoClientOptions = {}

// if (!process.env.MONGODB_URI) {
//   throw new Error('Por favor defina a variável de ambiente MONGODB_URI em .env.local')
// }

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // Isso adiciona uma propriedade no escopo global apenas para o modo dev
  // Evita erro de redefinir tipos em hot reloads
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
