import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'



export default function Home({ token }) {
 
  return (
    
    <Layout>
    <Head>
        <title>First Page</title>
        
        <meta charset="utf-8"></meta>
   
    
    <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>
    </Head>
    <div className={styles.container}>
      
        <Navbar />
        
        <h1>Tree Shopping</h1>
        <h2>ยินดีต้อนรับ</h2>
        <iframe width="700" height="400" src="https://www.youtube.com/embed/SAIezHHDksE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   
        <style jsx>{`
                h1,h2,div,b,button{
                  font-family: 'Mali', cursive;
                }

            `}</style>
   
    </div>
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
