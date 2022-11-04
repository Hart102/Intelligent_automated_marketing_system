const express = require('express');
const cors =  require('cors');
const UUID = require('uuid');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser =  require('cookie-parser');
const MongoClient  = require('mongodb').MongoClient;

const TWILIO = require('dotenv').config()
require('twilio')(process.env.SSID, process.env.TOKEN)
// CUSTOM MODULES 
const {login_in_auth, add_product_auth} = require('./Custom_modules/Module');



const app = express();

// GLOBAL VARIABLES 
const expDate = 60 * 60 * 1000 * 24; // 1 hour 1 day
const token = UUID.v4()

app.use(cors({
    origin:  ['http://localhost:3000'],
    method: ["GET", "POST"],
    credentials: true,
}));

app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    name: "userId",
    secret: token,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secret: token,
        maxAge: expDate,
        secure: false,
        sameSite: true
    }
}))


let admin_collection,
product_collection,
customers_collection,
uri = "mongodb://localhost:27017";

const dbConnection = () => { MongoClient.connect(uri, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        // DBNAME 
        const db = client.db('marketing_managemant_system')
        // COLLECTION NAME 
        admin_collection = db.collection('admin')
        product_collection = db.collection('products')
        customers_collection = db.collection('customers')
        return admin_collection, product_collection, customers_collection;
    })
    .catch(error => console.error(error))
}
dbConnection()

customers = [
    {
        name: 'hart', 
        phone: 08068399612,
        prefered_products: ['electronics', 'cars']
    },
    {
        name: 'abel', 
        phone: 0905288751,
        prefered_products: ['alcoholic beverages']
    },
    {
        name: 'sammy', 
        phone: 0957728915,
        prefered_products: ['fruit and vegetables', 'cars']
    }
]




///////////////////////////////////////////////////////
let online;
app.post('/admin/login', (req, res) => { // ADMIN LOGIN
    const { error, value } = login_in_auth.validate(req.body),
    { username, password } = value;

    if (error) {
        res.json(error.message);
        
    }else{
        admin_collection.findOne({ username: username, password: password })
        .then(result => {
            if (result != null) {
                res.json('true');
                online = req.session.user  = result.username
            }else{
                res.json('user does not exit')
            }
        }).catch(err => console.log(err))
    }
})


//////////////////////////////////////////
app.get('/admin/login', (req, res) => { // SESSION ROUTE
    if (online) {
        res.json({loggedIn: true, user: online})
    }else{
        res.json({loggedIn: false})
    }
})



/////////////////////////////////////////////
let sms_container = [];
const send_auto_sms = (product_category) => { //SMS FUNCTION
    customers.map(customer => {
        if (customer.prefered_products.includes(product_category)) { // CHECKING IF THE PRODUCT POSTED MATCHES WITH THE POSTED PRODUCT AND CAPUTURING THE CUSTOMERS PHONE NUMBER IF IT MATCHED
            sms_container.push(customer)

            // sms_container.map(customer => {
            //     TWILIO.messages.create({body: `Hello ${customer.name}. another ${product_category} is avaliable for sale`,
            //         from: process.env.NUMBER, to: `${customer.phone}`})
            //         .then(message => console.log('sms sent', message));

            // })


        }
    })
}



///////////////////////////////////////////////////////////
app.post('/add/product', (req, res) => { // ADD PRODUCTS
    let{ error, value } = add_product_auth.validate(req.body);
    value = {...value, newId: UUID.v4()}

    if (error) {
        res.json(error.message)

    }else{
        product_collection.insertOne(value).then(result => {
            if (result.acknowledged) {
                res.json('successful')
                send_auto_sms(value.productCategory)
            }
        })
    }
})



/////////////////////////////////////////////////////////
app.get('/fetch/products', (req, res) => { //FETCH ALL PRODUCTS
    product_collection.find().toArray().then(result => {
        if (result !=  null) {
            res.json(result)

        }else{
            console.log('an error occured while fetching products')
        }
    })
})


/////////////////////////////////////////////////////////////////
app.get('/fetch/customer', (req, res) => { // FETCH ALL CUSTOMERS
    res.json(customers)
})

/////////////////////////////////////////////////////////////
app.post('/delete/products', (req, res) => { //DELETE PRODUCT
    const { id } = req.body

    product_collection.deleteOne({ newId: id }).then(result => {
        if (result.deletedCount > 0) {
            res.json('delete successful')

        }else{
            res.json('product deleted not successful')
        }
    })
})




/////////////////////////////////////////////////  
app.get('/logout', (req, res) => { //LOGOUT ROUTE
    req.session.destroy((err) => {
        if(err){
            res.json('something went wrong')

        }else{
            online = ''
            res.clearCookie("userId")
            return res.json('true')
        }
    })
})











app.listen(5000, () => console.log('App running on port 5000'))