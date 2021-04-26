import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';

 
const Navbar = () => (
    <div class="nav">
    
    
    <meta charset="utf-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

    
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
    
    <div className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top ">
    <div class="container-fluid row">
         
  
      
      <ul class="navbar-nav ">
    
          
        <li class="nav-item "  >
          <Link href="/"><a class="nav-link" >Home </a></Link> 
        </li>
        
        <li class="nav-item ">
            <Link href="/meow"><a class="nav-link">Profile</a></Link>
        </li>
        
        <li class="nav-item ">
            <Link href="/trees"><a class="nav-link">Trees</a></Link>
        </li>
        

        <li class="nav-item">
            <Link href="/admin"><a class="nav-link">Admin</a></Link>
        </li>

        
         
        <li class=" col-7">
        
        </li>
    
    
        <li class="nav-item">
            <Link href="/register"><a class="nav-link active">Register</a></Link>
        </li>

        <li class="nav-item">
            <Link href="/login"><a class="nav-link active">Login</a></Link>
        </li>

        <li class="nav-item">
            <Link href="/logout"><a class="nav-link active"> Logout</a></Link>
        </li>


        
     </ul>
    </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
    <style>
    
    </style>
    <br/><br/><br/>
    </div>
    
    
  
)

export default Navbar