const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

app.get("/numbers/:alpha", (req, res) => {
    console.log(req.params.alpha);
    res.json(req.params.alpha);
})




app.listen(9876, () => {
    console.log("Server is running on port 9876");
    
})




    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJuaXNoY2hhbGJoYXJkd2FqMjAwNEBnbWFpbC5jb20iLCJleHAiOjE3NTAzOTUzNDQsImlhdCI6MTc1MDM5NTA0NCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6Ijc1MTg3NTFlLTA0ODQtNDM1Ny05Zjk3LTZkYjMxZjc4ODEzZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Im5pc2hjaGFsIGJoYXJkd2FqIiwic3ViIjoiYjkyYTgxNWQtM2VmOC00YmE4LWFlNmMtMWUxOGQ0YmFjOGU3In0sImVtYWlsIjoibmlzaGNoYWxiaGFyZHdhajIwMDRAZ21haWwuY29tIiwibmFtZSI6Im5pc2hjaGFsIGJoYXJkd2FqIiwicm9sbE5vIjoiMjIwMDMzMTUzMDA3OSIsImFjY2Vzc0NvZGUiOiJyZlF6RlEiLCJjbGllbnRJRCI6ImI5MmE4MTVkLTNlZjgtNGJhOC1hZTZjLTFlMThkNGJhYzhlNyIsImNsaWVudFNlY3JldCI6ImJWaFFXR2NGdnVhQUdkdUYifQ.SOmYCI_7amNuaDPGoiJUni1vPbhuTCT_icz4R0kQa3g"