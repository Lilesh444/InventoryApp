import path from 'path';
import ProductModel from '../model/product.model.js';
export default class ProductController{
    getProducts(req,res){
        let products=ProductModel.getProdct();
        // console.log(products);
        res.render('product',{products:products,userEmail:req.session.userEmail})
        // console.log(path.resolve());
        // return res.sendFile(path.join(path.resolve(),'src','views','product.html'));
    }

    getAddForm(req,res){
       return res.render('new-product',{ errorMessage:null,userEmail:req.session.userEmail})
    }

    addNewProduct(req,res){
        // access the data from form
        console.log(req.body);
        const {name,desc,price}=req.body;
        const imgUrl='images/'+req.file.filename;
        ProductModel.addProducts(name,desc,price,imgUrl)
        // after adding new data again come to the homepage
        let products=ProductModel.getProdct()
        res.render('product',{products:products,userEmail:req.session.userEmail})
    }

    getUpdateForm(req,res){
        // if prodct present update
        var id=req.params.id;
        // console.log(id);
        var productFound=ProductModel.updateProductbyId(Number(id));
        // console.log(productFound)
        if(productFound){
            res.render('update-product',{product:productFound,errorMessage:null,userEmail:req.session.userEmail})
        }
        else{
            res.status(401).send('Product not found')
        }
    }

    postUpdatedProduct(req,res){
        console.log(req.body);
        ProductModel.addUpdatesToProducts(req.body)
        // after adding new data again come to the homepage
        let products=ProductModel.getProdct()
        res.render('product',{products:products})
    }

    deleteProduct(req,res){
        const id=req.params.id;
        const productFound=ProductModel.updateProductbyId(id);
        if(!productFound){
            return res.status(401).send('no product')
        }else{
        ProductModel.delete(id)
        let products=ProductModel.getProdct()
            res.render('product',{products})
        }
    }
}
