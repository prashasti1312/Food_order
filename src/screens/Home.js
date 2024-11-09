import React,{useEffect,useState} from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
// import Carousal from "../components/Carousal";
export default function Home() {
  const [search,setSearch]=useState([]);
  const searchTerm = (search && typeof search === 'string') ? search.toLowerCase() : '';
  const[foodCat,setFoodCat]=useState([]);
  const[foodItem,setFoodItem]=useState([]);
  const loadData=async()=>{
    let response=await fetch("https://food-order-bakend.vercel.app/api/foodData",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      }
    });
    response=await response.json();
    // console.log(response[0],response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

useEffect(()=>{
  loadData();
},[])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade"  className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div  className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
    <div  className="carousel-item active">
      <img src="https://www.sanjanafeasts.co.uk/wp-content/uploads/2023/07/Paneer-Tikka-Kebabs-on-a-platter-with-fresh-naan-bread-720x720.jpg"  className="d-block w-100" alt="..."/>
    </div>
    <div  className="carousel-item">
      <img src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg"  className="d-block w-100" alt="..."/>
    </div>
    <div  className="carousel-item">
      <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg"  className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button  className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span  className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span  className="visually-hidden">Previous</span>
  </button>
  <button  className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span  className="carousel-control-next-icon" aria-hidden="true"></span>
    <span  className="visually-hidden">Next</span>
  </button>
</div>
      </div>
       
      <div className="container">
        {
          foodCat !==[]
          ? foodCat.map((data)=>{
              return(<div className="row mb-3">
                <div key={data._id} className="fs-3 m-3" >{data.CategoryName}</div>
                <hr />
                {foodItem !==[]
                ? 
                foodItem.filter((item)=>(item.CategoryName ===data.CategoryName) && (item.name.toLowerCase().includes(searchTerm)))
                .map(filterItems=>{
                  return (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem={filterItems}
                      options={filterItems.options[0]}
                      ></Card>
                    </div>
                  )
                })
                :<div>No such Data found</div>}
                </div>
              )
          }):""
        } 
      </div>
      <div>
        
        <Footer />
      </div>
    </div>
  );
}
