import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import fetch from 'isomorphic-unfetch'

const Meow = ({ file }) => {

    return (
        <Layout>
            <Head>
                <title>Profile Meow</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                
                <h1 >Profile Meow</h1><br/>
                <div>
                    <img src={file} width="500" height="400"  />
                <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>    
                <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-app.js"></script>
                <script src="https://www.gstatic.com/firebasejs/8.4.2/firebase-analytics.js"></script>
                </div>
                <style jsx>{`
        
        h1,h2,ul{
          font-family: 'Mali', cursive;
            color :#FFFF00
        }
          img {
            border: 1px solid Violet;
            border-radius: 4px;
            padding: 5px;
            border-radius: 360px;
          }
          
    
          
    `}</style>
            </div>
        </Layout>
    )
    
  }
  Meow.getInitialProps = async () => {
    const res = await fetch('https://aws.random.cat/meow')
    const data = await res.json()
    return data
  }
export default Meow
