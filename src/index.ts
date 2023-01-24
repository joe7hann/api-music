import app from "./app";

app.get("/", (req, res) =>{
    res.send("APIREST music");
});

const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`Server started at http://localhost:${PORT}`));