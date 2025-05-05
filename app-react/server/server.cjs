const { MongoClient, ServerApiVersion } = require('mongodb');
const http = require('http');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "kerem-melisa-mert"
const uri = "mongodb+srv://kerem:krm12321232@projet-web.fmxquu3.mongodb.net/?retryWrites=true&w=majority&appName=projet-web";
const PORT = 5001;

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function connectDB() {
  await client.connect();
  db = client.db('Projet'); 
  await db.collection('Users').createIndex({ email: 1 }, { unique: true });
  console.log('MongoDB bağlantısı sağlandı');
}
connectDB();
const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');


    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === "POST" && req.url === "/login_register"){
      let body = "";
      req.on("data", chunk => {
        body += chunk.toString();
      });
      
      
      req.on('end', async () => {
        body = JSON.parse(body);
        // Register
        if (body.method == "register"){
          try{
            user =  {name:body.name, email:body.email, password:body.password, birthdate:body.birthdate}
            Users= db.collection('Users')
            const result = await Users.insertOne(user);
    
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          }
          catch (error) {
            console.log(error)
            if (error.code === 11000) { 
              res.writeHead(409);
              res.end(JSON.stringify({ message: 'Bu e-posta zaten kayıtlı.' }));
            } else {
              res.writeHead(500);
              res.end(JSON.stringify({ message: 'Sunucu hatası' }));
            }
          }
        }
        //Login 
        else if (body.method == "login"){
          
          try{
            user = {email:body.email, password:body.password}
            Users= db.collection('Users')
            const result = await Users.findOne(user);
            if (result) {
              const token = jwt.sign({ email: result.email }, SECRET_KEY, { expiresIn: '5h' });
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({user: result,token:token}));
            } else {
              res.writeHead(401);
              res.end(JSON.stringify({ message: 'Geçersiz e-posta veya şifre.' }));
            }
          }
          catch (error) {
            console.log(error)
            res.writeHead(500);
            res.end(JSON.stringify({ message: 'Sunucu hatası' }));
          }
        }
      });
    }
});
  

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  