
const button = document.querySelector("button")
button.addEventListener("click",()=>{
    console.log("1");
    fetch("http://localhost:3000/create",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            items:[
                {id:1,quantity:3},
                {id:2,quantity:1},
                {id:3,quantity:2}
            ]
        })
    }).then((res)=>{
        if(res.ok){
            console.log(res)
            return res.json()
        }
        return res.json.then(json=>Promise.reject(json))
    }).then(({url})=>{
        //console.log(url);
        window.location= url
    }).catch(e=>{
        console.log(e.error)
    })
})

