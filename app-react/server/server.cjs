const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const http = require('http');
const jwt = require('jsonwebtoken');
const { format } = require('path');
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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    
    if (req.method === "OPTIONS") {
      res.writeHead(200, {
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
      });
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
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];
            user =  {name:body.name, email:body.email, password:body.password,
              role:body.role ,birthdate:body.birthdate,joinedAt:formattedDate}
            Users= db.collection('Users')
            const result = await Users.insertOne(user);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            user = {name:user.name, email:user.email,id :user._id.toString()}
            const token = jwt.sign({email: user.email}, SECRET_KEY, { expiresIn: '5h' });
            res.end(JSON.stringify({user:user,token:token}));
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
              const token = jwt.sign({email: result.email}, SECRET_KEY, { expiresIn: '5h' });

              res.writeHead(200, { 'Content-Type': 'application/json' });
              user = {name:result.name, email:result.email,id :result._id.toString()}
              res.end(JSON.stringify({user: user,token:token}));
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
    console.log(req.method,req.url)
    if (req.method === "POST" && req.url === "/check_token"){


      console.log(req.headers["authorization"])
      let body = "";
      req.on("data", chunk => {
        
      });
      
      
      req.on('end', async () => {
        
        try{
          const token = req.headers["authorization"].split(" ")[1];
          jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
              res.writeHead(401);
              res.end(JSON.stringify({ message: 'Token geçersiz', }));
              return;
            }else{
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Token geçerli',decoded:decoded }));
              return;
            }
          }
          );
        }
        catch (error) {
          console.log(error)
          res.writeHead(401);
          res.end(JSON.stringify({ message: 'Sunucu hatası' }));
        }
      });
    }

    if (req.method === "POST" && req.url === "/profile") {
      let body = "";
      req.on("data", chunk => {
          body += chunk.toString();
      });
  
      req.on("end", async () => {
          try {
              body = JSON.parse(body);
              const profileId = body.id;
              const token = req.headers["authorization"].split(" ")[1];
              const decoded = jwt.verify(token, SECRET_KEY);
              const Users = db.collection("Users");
              var profile = await Users.findOne({ _id:new ObjectId(profileId)});
              console.log(profile)
              if (profile) {
                  const isSelf = decoded.email === profile.email; // Sorgulayan kişi aynı mı kontrolü
                  profile = {
                      name: profile.name,
                      birthdate: profile.birthdate,
                      role: profile.role,
                      id: profile.id,
                      joinedAt: profile.joinedAt,
                  }
                  console.log("profile",profile)
                  res.writeHead(200, { "Content-Type": "application/json" });
                  res.end(JSON.stringify({ profile, isSelf }));
              } else {
                  res.writeHead(404);
                  res.end(JSON.stringify({ message: "Profil bulunamadı." }));
              }
          } catch (error) {
              console.error("Hata:", error);
              res.writeHead(500);
              res.end(JSON.stringify({ message: "Sunucu hatası." }));
          }
      });
  }

});
  

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  