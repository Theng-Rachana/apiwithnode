const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database/database.json');
const fs = require('fs');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

app.get('/status',(req, res)=>{
    res.json(db['status'])
})

app.post('/status',(req,res)=>{
    const newstatus = req.body;
    res.json(db['status'].push(newstatus));
    fs.writeFileSync('./database/database.json',JSON.stringify(db));
})

app.put('/status/:id', (req, res) => {
    const statusId = parseInt(req.params.id);
    const updatedStatus = req.body;
  
    const statusToUpdate = db['status'].find((sta) => sta.id === statusId);
  
    if (statusToUpdate) {
      statusToUpdate.id = updatedStatus.id;
      statusToUpdate.name = updatedStatus.name;
  
      fs.writeFileSync('./database/database.json', JSON.stringify(db));
      res.json({ message: 'Status updated successfully', status: statusToUpdate });
    } else {
      res.status(404).json({ error: 'Status not found' });
    }
  });

app.delete('/status/:id',(req,res)=>{
    const statusId = parseInt(req.params.id);

    const itemsToDelete = db['status'].find(sta => sta.id === statusId)
    const itemToDeleteIndex = db['status'].indexOf(itemsToDelete)

    db['status'].splice(itemToDeleteIndex,1)
   
    fs.writeFileSync('./database/database.json',JSON.stringify(db) ,(err) => {
      res.json(db['status'],null,2)
    })
    res.json(db['status'])
})

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})