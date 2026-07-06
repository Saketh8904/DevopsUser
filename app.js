const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AWS DevOps Assignment</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family:Arial,Helvetica,sans-serif;
}

body{
    background:linear-gradient(135deg,#0f172a,#1e293b,#2563eb);
    color:white;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
}

.container{
    width:90%;
    max-width:900px;
    background:rgba(255,255,255,0.08);
    backdrop-filter:blur(10px);
    padding:40px;
    border-radius:20px;
    text-align:center;
    box-shadow:0 0 20px rgba(0,0,0,.4);
}

h1{
    font-size:3rem;
    margin-bottom:20px;
}

h2{
    color:#4ade80;
    margin-bottom:20px;
}

p{
    font-size:18px;
    margin:15px 0;
    color:#ddd;
}

.grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(220px,1fr));
    gap:20px;
    margin-top:30px;
}

.card{
    background:white;
    color:#111827;
    border-radius:15px;
    padding:25px;
    transition:.3s;
}

.card:hover{
    transform:translateY(-8px);
}

.card h3{
    color:#2563eb;
    margin-bottom:10px;
}

button{
    margin-top:35px;
    padding:15px 30px;
    border:none;
    border-radius:30px;
    background:#22c55e;
    color:white;
    font-size:18px;
    cursor:pointer;
    transition:.3s;
}

button:hover{
    background:#16a34a;
}

footer{
    margin-top:40px;
    color:#ddd;
    font-size:15px;
}

.status{
    font-size:22px;
    color:#22c55e;
    margin-top:20px;
}

.clock{
    font-size:20px;
    margin-top:15px;
    color:#facc15;
}
</style>

</head>
<body>

<div class="container">

<h1>🚀 AWS DevOps Project</h1>

<h2>Deployment Successful</h2>

<p>Your Node.js application is running successfully on Amazon EC2.</p>

<div class="status">
🟢 Server Status : Online
</div>

<div class="clock" id="clock"></div>

<div class="grid">

<div class="card">
<h3>☁ AWS EC2</h3>
<p>Application hosted on an EC2 Instance.</p>
</div>

<div class="card">
<h3>🌐 Nginx</h3>
<p>Reverse Proxy configured successfully.</p>
</div>

<div class="card">
<h3>⚙ Node.js</h3>
<p>Express Server running on Port 3000.</p>
</div>

<div class="card">
<h3>📦 PM2</h3>
<p>Application managed using PM2.</p>
</div>

<div class="card">
<h3>🔒 Security</h3>
<p>Configured using AWS Security Groups.</p>
</div>

<div class="card">
<h3>🚀 DevOps</h3>
<p>Continuous deployment ready.</p>
</div>

</div>

<button onclick="showMessage()">
Check Deployment
</button>

<footer>
<p><strong>Developed by Saketh Alevooraya K</strong></p>
<p>AWS DevOps Assignment</p>
</footer>

</div>

<script>

function showMessage(){
    alert("🎉 Congratulations! Your AWS DevOps project is running successfully.");
}

function updateClock(){
    const now=new Date();
    document.getElementById("clock").innerHTML=
    "Current Time : "+now.toLocaleString();
}

setInterval(updateClock,1000);
updateClock();

</script>

</body>
</html>
`);
});

app.get("/health", (req, res) => {
    res.json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date(),
        server: "AWS EC2",
        application: "Node.js + Express"
    });
});

app.listen(PORT, () => {
    console.log("==================================");
    console.log("🚀 Server Started Successfully");
    console.log("Running on Port:", PORT);
    console.log("http://localhost:" + PORT);
    console.log("==================================");
});
