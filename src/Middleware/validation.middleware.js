// validation.middleware.js
import { body, validationResult } from 'express-validator';

const validateRequest = async function (req, res, next) {
    // Validation using express-validator
    const rules = [
        body('name').notEmpty().withMessage('Name field required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price should be positive'),
        // body('imgUrl').isURL().withMessage('Invalid URL')
    ];

    // Run validation rules and await their completion
    await Promise.all(
        rules.map((rule) => rule.run(req))
    );

    // Check for validation errors
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.render('new-product', { errorMessage: validationErrors.array()[0].msg });
    }
    next();
};

export default validateRequest;



// // validation.middleware.js
// import {body,validationResult} from 'express-validator';
//  const validateRequest= async function(req, res, next) {
//     // Validation logic here
//     // validating data
// //  const {name,price,desc,imgUrl}=req.body;
// //  let errors=[];
// //  if(!name || name.trim()==""){
// //      errors.push('Name cant be empty')
// //  }
// //  if(!price || parseFloat(price)<1){
// //      errors.push('Price should be +ve value')
// //  }
//  // try {
//  //     const validUrl=new URL(imgUrl)
//  // } catch (error) {
//  //     errors.push('invalid url')
//  // }
//     // validation using express validator
//     //1.setup
//     const rules=[
//         body('name').isEmpty().withMessage('Name field required'),
//         body('price').isFloat({gt:0}).withMessage('Price should be positive')
//         // ,body('imgUrl').isURL().withMessage('Invalid url')
//     ]
//     //2. run those rules
//     await Promise.all(
//         rules.map((rule)=>{
//             rule.run(req);
//         })
//     )
//     // 3. check if ther any rror in running the rules
//         var Validationerrors=validationResult(req);
//  if(!Validationerrors.isEmpty()){
//      return res.render('new-product',{errorMessage:Validationerrors.array()[0].msg})
//  }
//  next();
//     // ...
    
// }

// export default validateRequest;
 