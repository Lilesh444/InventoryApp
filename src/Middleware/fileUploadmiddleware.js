import multer from 'multer';

const storageConfiguration=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images/');
    },
    filename:(req,file,cb)=>{
        const uniqueFileName=Date.now()+'-'+file.originalname;
        cb(null,uniqueFileName)
    }
})
export const  uploadFile=new multer({storage:storageConfiguration})

  