import UserModel from "../model/user.model.js";
import ProductModel from "../model/product.model.js";
export default class UserController{
    getRegister(req,res){
        res.render('register')
    }
    getLogin(req,res){
        res.render('login')
    }
    postRegister(req,res){
        const {name,email,password}=req.body;
        UserModel.add(name,email,password);
        res.render('login');
    }

    postLogin(req,res){
        const {email,password}=req.body;
        const userfound=UserModel.isValidUser(email,password);
        if(!userfound){
         return res.render('login');
        }
            req.session.userEmail=email;
            // return res.render('/');
            let products=ProductModel.getProdct()
        res.render('product',{products:products,userEmail:req.session.userEmail })
        
    }
    logout(req,res){
        req.session.destroy(error=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/login')
            }
        });
        // delete cookies
        res.clearCookie('lastVisit');
    }
}