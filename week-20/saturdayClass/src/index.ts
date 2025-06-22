import express from "express";
import axios from "axios";
import Redis from "ioredis";
import http from "http";
import { Server } from "socket.io";
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const state = new Array(100).fill(false);

io.on('connection', (socket)=>{
  console.log('a user connected', socket.id);
  setInterval(()=>{
    socket.emit("hi..")
    socket.emit("as long as i am alive")
    socket.emit("There are infinite possibilites")
  },2000)
  
  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', message);
  });

  socket.on('checkbox', (data) => {
    state[data.index] = data.checked
    io.emit('checkbox', data);
  })
})

const redis = new Redis();

const PORT = process.env.PORT || 3000;

app.use(express.static("./public"));

app.get('/state', (req, res) => {
  res.json(state)
})
app.use(async function(req,res,next){
  const key = 'rate-limit';
  
  const value = await redis.get(key);

  if(value == null){
    await redis.set(key,0);
    await redis.expire(key,60);
  }

  if(Number(value) >= 10){
    return res.json({error:"Rate limit exceeded"});
  }

  await redis.incr(key);
  next();
})

app.get("/", (req, res) => {
  res.status(200).send("Hello World!  sd");
});

app.get("/books", async (req, res) => {
  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/books"
  );

  res.json(response.data);
});

app.get("/books/totalPages", async (req, res) => {
  const cached = await redis.get("totalPages");

  if (cached) {
    return res.json(JSON.parse(cached));
  }
  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/books"
  );

  const totalPages = response.data.data.data?.reduce(
    (acc: number, curr: { volumeInfo?: { pageCount?: number } }) =>
      !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo?.pageCount + acc,
    0
  );

  await redis.set("totalPages", JSON.stringify(totalPages));

  return res.json(totalPages);

});

// app.listen(PORT, () => {
//   console.log("Server is running on port 3000");
// });

httpServer.listen(PORT, () => {
  console.log("Server is running on port 3000");
});