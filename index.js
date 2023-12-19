const express = require('express'); 
const { json } = require('express/lib/response');
const MongoClient = require('./app/config/mongo.config')
const mongoose = require('mongoose')
const adminroutes = require('./app/routers/admin.routes'); // Import the router.js file
const userroutes = require('./app/routers/user.routes'); // Import the router.js file
//const toobusy = require('toobusy')
const confidb = require('./app/config/mongo.config')
const bodyParser = require('body-parser');
const cron = require('./app/cron/welcome_mail.cron')
const helmet = require('helmet')
const getRawBody = require('raw-body')
const status = require('express-status-monitor')
const app = express();   
confidb.connectAndOperate()           
// Parse incoming JSON requests
app.use(bodyParser.json());
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true, limit: "1kb"}));
const port = 5000;   
app.use(express.json({ limit: "1kb" })); 
app.use(status())        
app.get('/', (req, res) => {        
    res.json({
        status:200,
        msg:"working fine"
    });                                                            
});
app.use('/api', adminroutes); // Example: /api/users
app.use('/api', userroutes); // Example: /api/users
//MongoClient.connectAndOperate()
app.listen(port, () => {            
    console.log(`Now listening on port ${port}`); 
});
// Helmet helps secure Express apps by setting HTTP response headers. //
app.use(helmet())
/*When your application server is under heavy network traffic,
 it may not be able to serve its users. This is essentially a type of Denial of Service (DoS) attack*/
// app.use(function(req, res, next) {
//     if (toobusy()) {
//         // log if you see necessary
//         res.status(503).send("Server Too Busy");
//     } else {
//     next();
//     }
// });
