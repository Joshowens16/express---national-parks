/* Navagation:
Homepage: http://localhost:1337/
Death Valley: http://localhost:1337/park/1
Lassen: http://localhost:1337/park/2
Channel Islands: http://localhost:1337/park/3

Server health: http://localhost:1337/health

dummy data:http://localhost:1337/californiaparks

DV data: http://localhost:1337/californiaparks/1
Lassen data: http://localhost:1337/californiaparks/2
Channel Islands data: http://localhost:1337/californiaparks/3

for an error: http://localhost:1337/park/4   
*/

const express = require("express");
const morgan = require("morgan");
const parkData = require("./dummyData");
const app = express();
app.use(morgan("dev"));
const path = require("path");
const staticMiddleware = express.static(path.join(__dirname, "public"));
app.use(staticMiddleware);
let html;

app.get("/", (req, res) => {
  const parks = parkData.list();
  html = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>California National Parks</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">
</head>
<body>
<style>
body{
  background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg/1200px-Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg);
  background-size: 800px;
}
</style>
    <h1>3 California National Parks to visit</h1>
    <div class='imgs'>${parks
      .map(
        (park) => `<span class="img-title">
        <a href="/park/${park.id}">
        <img src="${park.img}" 
        </a>
        <h2><a href="/park/${park.id}">${park.name} National Park</a></h2>
        </span>
        `
      )
      .join("")}
      </div>
</body>
</html>
`;
  res.send(html);
});

app.get("/park/:id", (req, res, next) => {
  const id = req.params.id;
  const park = parkData.find(id);
  if (park.id === undefined || typeof park.id !== "number") {
    throw new Error();
  } else {
    html = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Death Valley</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">
</head>
<body>
  <style>
  body{
    background-image: url(${park.img});
    background-size: 800px;
    
  }
  </style>

    <h1>${park.name} National Park</h1>
    <div class="about-park">
    <p>
    ${park.name} National Park is located in ${park.location}.
    </p>
    <p>
    ${park.content}
    </p>
    Fun fact: ${park.fact}
    </div>
    </body>
</html>
  `;
  }
  res.send(html);
});

app.get("/health", (req, res, next) => {
  html = `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<style>
body{
  background-image: url(https://cdn.thecrazytourist.com/wp-content/uploads/2018/09/ccimage-shutterstock_402681664.jpg);
  background-size: 800px;
}
h1{
  color: white;
}
</style>
<h1>The server is flowin:)</h1>
</body>
</html>
  `;
  res.send(html);
});

app.get("/californiaparks", (req, res, next) => {
  res.send(parkData.list());
});
app.get("/californiaparks/:id", (req, res, next) => {
  const id = req.params.id;
  const park = parkData.find(id);
  res.send(park);
});

//custom err:

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(
    `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - not found</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet">

</head>
<body>
<style>
body{
  background-image: url(https://www.visitcalifornia.com/sites/visitcalifornia.com/files/styles/welcome_image/public/vc_amazingalternativestocaliforniasnatparks_anzaborrego_st_rf_917923758_1280x640.jpg);
  background-size: 800px;
}
h1{
  color: white;
}
</style>
<h1>404 - Park not found!</h1>
<div class="about-park">
<p>
But maybe you can go find it:)
</p>
</div>
</body>
</html>
`
  );
});
const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
