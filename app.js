const express = require('express');
const multer  = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: storageStrategy })

const app = express();


app.get('/', function(req, res){
    res.send('Hola mundo')
})


app.post('/imagen', upload.single('imagen'), async function(req,res){

    const imagen = req.file;
    const imagenModificada = sharp(imagen.buffer).resize(200, 800,{
        fit: "contain",
        background: "#fff"
    });
    const imagenModificadaBuffer = await imagenModificada.toBuffer();

    fs.writeFileSync('nuevaruta/prueba.png', imagenModificadaBuffer)

    res.send({ resizedImage: imagenModificadaBuffer})
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log("Servidor escuchando en el puerto", PORT)
})

