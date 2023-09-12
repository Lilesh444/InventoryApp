import express from 'express';
import ProductController from './src/controller/products_controller.js';
import path from "path";
import expressEjsLayouts from 'express-ejs-layouts';
import validationMiddleware from './src/Middleware/validation.middleware.js';
import { uploadfile } from './src/Middleware/fileupload.js';
import UserController from './src/controller/user_controller.js';
import session from 'express-session';
import { auth } from './src/Middleware/authmiddleware.js';
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/Middleware/lastVisit.js';
// const express=require('express');
const server=express();
server.use(express.static('public'));
server.use(cookieParser());
server.use(setLastVisit)
server.use(session({
    secret:'SecretKey',
    resave:false,
    saveUninitialized:true,
    cookie:false
}))

// parsing data fro user
server.use(express.urlencoded({extended:true}))

// setup view engine to tell the server tht we r going to use js in html
server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),'src','views'));

server.use(expressEjsLayouts);

const ProductsController=new ProductController();
const usersController=new UserController();
server.get('/',
    (ProductsController.getProducts)
);  
server.get('/new',auth,(ProductsController.getAddForm));
server.get('/update-product/:id',auth,(ProductsController.getUpdateForm));
server.post('/',auth,uploadfile.single('imageUrl'),validationMiddleware,ProductsController.addNewProduct)

server.get('/register',usersController.getRegister);
server.get('/login',usersController.getLogin);
server.post('/register',usersController.postRegister);
server.post('/login',usersController.postLogin);
server.get('/logout',usersController.logout)

server.post('/update-product',auth,(ProductsController.postUpdatedProduct))

server.post('/delete-product/:id',auth,(ProductsController.deleteProduct))


server.use(express.static('src/views'));
server.listen(3100,()=>{
    console.log('server is running on:3100');
})