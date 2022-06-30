const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
// name:social-media
// pass:JnzEIkv087vxMvmD
app.use(cors());
app.use(express.json());





const uri = "mongodb+srv://social-media:JnzEIkv087vxMvmD@cluster0.2d3zi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });






async function run(){
    try{
       
        await client.connect();
        const userCollection=client.db('socialmedia').collection('users');
        const postCollection=client.db('socialmedia').collection('postshare');





        //Get all users
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const items = await cursor.toArray();
            res.send(items);
        });
        //new user
        app.post('/users', async (req, res) => {
            const newProduct = req.body;
            const result = await userCollection.insertOne(newProduct);
            res.send(result);
        });
        // get user by username
        // app.get('/users/:username', async (req, res) => {
        //     const username = req.params.username;
        //     const query = {username:username};
        //     const cursor = await  userCollection.find(query).toArray();         
        //     res.send(cursor);
        // });
        app.get('/useredd', async (req, res) => {
          const username  = req.query.username ;
          const query = {username:username };
          // const cursor = userCollection.find(query);
          const reviews = await userCollection.find(query).toArray();
          res.send(reviews);

      });
        //get user by email
        app.get('/userd', async (req, res) => {
            const email = req.query.email;
            const query = {email:email};
            const cursor = userCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);

        });
        //update user info
        // app.put('/users/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const user = req.body;
        //     const filter = { email: email };
        //     const options = { upsert: true };
        //     const updateDoc = {
        //       $set: user,
        //     };
        //     const result = await userCollection.updateOne(filter, updateDoc, options);
        //     const token = jwt.sign({ email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        //     res.send( {result,token} );
        //   });
          app.put('/useres', async (req, res) => {
            const email = req.query.email;
            const user = req.body;
           
            const filter = { email: email };
            const options = { upsert: true };
            const updateDoc = {
              $set: {
                password: user.password
              }
            };
            const result = await userCollection.updateOne(
              filter,
              updateDoc,
              options
            );
            res.send(result);
          });


          //Post Share start



          //get all posts
        //   app.get('/posts', async (req, res) => {
        //     const query = {};
        //     const cursor = postCollection.find(query);
        //     const items = await cursor.toArray();
        //     res.send(items);
        // });
        app.get('/posts', async (req, res) => {
          
          const query = {};
          const cursor = postCollection.find(query);
          const reviews = await cursor.toArray();
          res.send(reviews);
      });
      app.get('/posts/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await postCollection.findOne(query);
        res.send(result);
      });
        app.get('/postes', async (req, res) => {
            const username = req.query.username;
            const query = {username:username};
            const cursor = postCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });
          //add new post
          app.post('/posts', async (req, res) => {
            const newPost = req.body;
            const result = await postCollection.insertOne(newPost);
            res.send(result);
        });
        
        //update post
        app.put('/posts/:id', async (req, res) => {
          const id = req.params;
            const updatedPost = req.body;
           
            const filter = {_id:ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
              $set: updatedPost,
            };
            const result = await postCollection .updateOne(
              filter,
              updateDoc,
              options
            );
            res.send(result);
          });
          app.put('/posts/:id', async (req, res) => {
            const id = req.params;
              const updatedPost = req.body;
             
              const filter = {_id:ObjectId(id) };
              const options = { upsert: true };
              const updateDoc = {
                $set: updatedPost,
              };
              const result = await postCollection .updateOne(
                filter,
                updateDoc,
                options
              );
              res.send(result);
            });   
            //comment
             app.put('/post/:id', async (req, res) => {
          const id = req.params;
            const updatedPost = req.body;
           
            const filter = {_id:ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
              $set: updatedPost,
            };
            const result = await postCollection.updateOne(
              filter,
              updateDoc,
              options
            );
            res.send(result);
          });
        //delete post
        app.delete('/posts/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const result = await postCollection.deleteOne(query);
          res.send(result);
        });

    }
    finally{

    }
    
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server Running');
});

app.listen(port, () => {
    console.log('Listening to port', port);
})