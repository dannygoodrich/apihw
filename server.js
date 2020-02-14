const express = require('express');
const app = express();
const db = require('./models');

app.use(express.urlencoded({ extended: false }))

// API to query for foods
    app.get('/', (req, res) => {
        res.send('home')
    })


// route #1 get all foods
app.get('/foods', (req, res) => {
    db.food.findAll().then(function(foods) {
        res.json(foods);
    }).catch(err => {
        console.log(err);
        res.send('error');
    });
});

// Create - POST /foods (redirect to /foods/:id)
app.post('/foods', (req, res) => {
    console.log(req.body);
    db.food.findOrCreate({
        where: {
            name:req.body.name
        },
        defaults: {
            taste: req.body.taste,
            rating: req.body.rating
        } 
    }).then(function([food, added]) {
        console.log(`Successfully ${added ? 'added' : 'found'} ${food.name}`);
        res.redirect(`/foods/:id`);
    }).catch(err => {
        console.log(err);
        res.send('error');
    })
})

// Show - Get    /foods/:id
app.get('/foods/:id', (req, res) => {
    db.food.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(food) {
        console.log(`found food`, food.name);
        res.json(food);
    })
    
});


// Update - PUT /foods/:id (redirect to /foods/:id)
app.put('/foods/:id', (req, res) => {
    res.send('update food at ID ' + req.params.id);
});



// Destroy - Delete /foods/:id (redirect to /foods)
app.delete('/users/:id', (req, res) => {
    res.send('deleteing user')
})



app.listen(3000, ()=>console.log(`listening to the smooth sounds of port 3000`));