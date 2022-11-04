const Joi = require("joi");


const login_in_auth = Joi.object().keys({ // LOGIN FORM VALIDATION
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
});


const add_product_auth = Joi.object().keys({ // ADD PRODUCT FORM VALIDATION
    product_name: Joi.string().required(),
    price: Joi.string().required(),
    productCategory: Joi.string().required(),
});



module.exports = {
    login_in_auth,
    add_product_auth,
}