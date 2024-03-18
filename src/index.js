const express = require('express');
const bodyParser = require('body-parser');
const path=require("path");
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const staticPath=path.join(__dirname,'../public');
app.use(express.static(staticPath));
 app.get("/",(req, res)=>{
    res.send("hello");
 });

app.post('/encryptImage', (req, res) => {
    const imagePath = req.body.imagePath;
    const key = req.body.key;
    

    try {
        let image = fs.readFileSync(imagePath);
        image = Buffer.from(image);
        for (let index = 0; index < image.length; index++) {
            //image[index] = image[index] ^ key;
            const keyByte = key.charCodeAt(index % key.length); // Get the corresponding byte of the key
            image[index] = (image[index] ^ keyByte) + index; 
        
        }

        fs.writeFileSync(imagePath, image);
        res.json({ message: 'Encryption Done' });
        
    } catch (error) {
        res.status(500).json({ message: 'Error during encryption' });
    }
});


app.post('/decryptImage', (req, res) => {
    const imagePath = req.body.imagePath;
    const key = req.body.key;

    try {
        let image = fs.readFileSync(imagePath);
        //image = Buffer.from(image).map(value => value ^ key);
        for (let index = 0; index < image.length; index++) {
            const keyByte = key.charCodeAt(index % key.length); // Get the corresponding byte of the key
            image[index] = (image[index] - index) ^ keyByte; // Reverse the operation
        }
        // Write the decrypted image data back to the file


        fs.writeFileSync(imagePath, image);
        res.json({ message: 'Decryption Done' });
    } catch (error) {
        res.status(500).json({ message: 'Error during decryption' });
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
