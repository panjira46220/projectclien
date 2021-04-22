import Link from 'next/link'


 
const Navbar = () => (
    
    <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top ">
    <meta charset="utf-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>

    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous"></link>
    
    <div class="container-fluid">
         
    <div class="collapse navbar-collapse" id="navbarNav"  >
      <ul class="navbar-nav ">

        <li class="nav-item" >
          <Link href="/"><a class="nav-link active" >Home </a></Link> 
        </li>

        <li class="nav-item">
            <Link href="/register"><a class="nav-link">Register</a></Link>
        </li>

        <li class="nav-item">
            <Link href="/login"><a class="nav-link">Login</a></Link>
        </li>
        
        <li class="nav-item">
            <Link href="/profile"><a class="nav-link">Profile</a></Link>
        </li>

        <li class="nav-item">
            <Link href="/foo"><a class="nav-link">Foo</a></Link>
        </li>

        <li class="nav-item">
            <Link href="/trees"><a class="nav-link">Trees</a></Link>
        </li>

        <li class="nav-item">
            <Link href="/admin"><a class="nav-link">Admin</a></Link>
        </li>

        <li class="nav-item">
            <Link href="/getConfig"><a class="nav-link"> Config</a></Link>
        </li>

        <li class="nav-item">
            <Link href="/logout"><a class="nav-link"> Logout</a></Link>
        </li>

      </ul>
    </div>
    </div></div>
    
)

export default Navbar