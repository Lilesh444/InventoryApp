export default class ProductModel{
    constructor(_id,_name,_desc,_price,_imgUrl){
        this.id=_id;
        this.name=_name;
        this.desc=_desc;
        this.price=_price;
        this.imgUrl=_imgUrl;
    }
    static getProdct(){
        return products;
    }

    // add all imfo grom form 
    static addProducts(name,desc,price,imgUrl){
        let newProduct=new ProductModel(products.length+1,name,
            desc,price,imgUrl)
        products.push(newProduct);
    }

    // find perticular product using id
    static updateProductbyId(id){
      return products.find(p=>p.id==id)
    }
    // now add the updates to mode
    static addUpdatesToProducts(productObject){
      const index=  products.findIndex(p=>p.id==productObject.id);
      products[index]=productObject;
    }

    // delete
    static delete(id){
        const index=products.findIndex(p=>p.id==id);
        products.splice(index,1);
    }

}
var products=[
    new ProductModel(1,'product1','description1',150,'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new ProductModel(2,'product2','description2',250,'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(3,'product3','description3',350,'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg')
]