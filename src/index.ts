import app from "./app";

app.get("/", (req, res) =>{
    res.send("APIREST music");
});

const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`));