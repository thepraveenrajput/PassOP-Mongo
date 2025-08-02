const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'passOP';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect once on server start
client.connect().then(() => {
  console.log('✅ Connected to MongoDB');
});

// 🔐 GET all passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const passwords = await collection.find({}).toArray();
  res.json(passwords);
});

// 💾 INSERT a new password
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.insertOne(password);
  res.send({ success: true, result });
});

// ❌ DELETE a password by id only
app.delete('/', async (req, res) => {
  const { id } = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const result = await collection.deleteOne({ id });
  res.send({ success: true, result });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
