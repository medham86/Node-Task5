

let form = document.getElementById('form1') ;

const country = document.getElementById('inp1');
const name = document.getElementById('name');
const long = document.getElementById('long');
const lat = document.getElementById('lat');
const status = document.getElementById('status');
const temp = document.getElementById('temp');
const error = document.getElementById('error');


form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    weatherFun();
    form.reset();
    
})

let weatherFun = async ()=>{

    try{

        const ad1 = country.value ;
        const res = await fetch('http://localhost:3000/project?address=' + ad1)
        const data = await res.json()
        if(data.error){

            error.innerText = data.error ;
            name.innerText = "";
            long.innerText = "";
            lat.innerText = "";
            status.innerText = "";
            temp.innerText = "";

        }else{

            error.innerText = "" ;
            setTimeout(()=>name.innerText = `Country is : ${data.name}`,1000);
            setTimeout(()=>long.innerText = `Longtitude is : ${data.longtitude}`,2000);
            setTimeout(()=>lat.innerText = `Latitude is : ${data.latitude}`,2000);
            setTimeout(()=>status.innerText = `Status is : ${data.status}`,3000);
            
            // temp.innerText = `Temperature is : ${data.temp}` ;

        }
    }catch(e){

        console.log(e)
    }} 

