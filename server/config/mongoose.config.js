const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/warframe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => console.log('Connected to warframes') )
.catch( (err) => console.log('Error Connecting to DB') );