export const setLastVisit=(req,res,next)=>{
    //1. if cookie is already set , means once it alredy visited ,then add a local variable with last visited time stamp
    if(req.cookies.lastVisit){
        res.locals.lastVisit=new Date(req.cookies.lastVisit).toLocaleString()
    }
    // if not visited or for the 1st time visiting
    res.cookie('lastVisit',new Date().toISOString(),{
        maxAge:2*24*60*60*1000
    })
    next();
}