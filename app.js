let express = require("express");
let path = require("path");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let port = 8080;

app.use("/", express.static(path.join(__dirname, "dist/lab")));

let teamsObj = {
    theText: "Select your team and enter the number of Tickets:",
    teams: [
      { text: "Melbourne", value: 0, count: 0 },
      { text: "Port Adelaide", value: 1, count: 0 },
      { text: "Geelong Cats", value: 2, count: 0 },
      { text: "Brisbane Lions", value: 3, count: 0 },
      { text: "Western Bulldogs", value: 4, count: 0 },
      { text: "Sydney Swans", value: 5, count: 0 },
      { text: "GWS Giants", value: 6, count: 0 },
      { text: "Essendon", value: 7, count: 0 },
    ],
  };


io.on("connection", socket => {
  console.log("connect successful");
  // to pass the initial data to component
  socket.on('init', () =>
      io.emit("receive_data", teamsObj));
  // to test to pass the number to
  socket.on("newNumber", data =>{
      for(let i = 0;i<teamsObj.teams.length;i++){
          if(teamsObj.teams[i].text = data.location){
              console.log("found"+teamsObj.teams[i]);
              teamsObj.teams[i].count += data.num;
              break;
          }
          console.log("Result:"+teamsObj.teams[i].count);
      }
      io.emit("msg", {num:data.num,location:data.location,obj: teamsObj, timeStamp:getCurrentDate() });
  });
});

server.listen(port, () => {
  console.log("Listening on port " + port);
});

function getCurrentDate() {
  let d = new Date();
  return d.toLocaleString();
}
