function deleteProduct(id){
    const result=confirm('Are u sure to delete it??');
    if(result){
        fetch('/delete-product/'+id,{
            method:'POST'
        }).then(res=>{
            if(res.ok){
                location.reload();
            }
        })}
    }
