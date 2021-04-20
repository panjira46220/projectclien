import Link from 'next/link'
import styles from '../styles/nav.module.css'

 
const Navbar = () => (
    
   
    <div className={styles.container}>
         <Link href="/"><a> Home </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/login"><a> Login </a></Link> |
        <Link href="/profile"><a> Profile </a></Link> | 
        <Link href="/foo"><a> Foo </a></Link> |
        <Link href="/trees"><a> Trees </a></Link> |
        <Link href="/admin"><a> Admin </a></Link> |
        <Link href="/getConfig"><a> Config </a></Link> | 
        <Link href="/logout"><a> Logout </a></Link> 

    </div>
    
)

export default Navbar