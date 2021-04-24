import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import useSWR, { mutate } from 'swr'
import Head from 'next/head'
import styles from '../styles/trees.module.css'
import Navbar from "../components/navbar";

const URL = "http://localhost/api/trees";
const URL2 = "http://localhost/api/purchase";

const fetcher = url => axios.get(url).then(res => res.data)

const SWR2 = () => {
    const [trees, setTrees] = useState({ list: [{ id: 1, name: 'cat', number: 1, price: 2000 },] })
    const [tree, setTree] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const [imageurl,setImageurl] = useState('')
    const [price, setPrice] = useState(0)
  //  const { data } = useSWR(URL, fetcher)
    //const { data } = useSWR(URL2, fetcher)


    useEffect(() => { getTrees() }, [])

    const getTrees = async () => {
        let trees = await axios.get(URL)
        setTrees(trees.data)
        //console.log('Tree:', trees.data)
    }
    const buyTree = async (id) => {
        const result = await axios.delete(`${URL2}/${id}`)
        console.log(result.data)
        getTrees()
    }


    const printTrees = () => {
        if (trees && trees.length)
            return trees.map((tree, index) =>
            
                <li className={styles.listItem} key={index}>
                    <h6>{(tree) ? tree.name : '-'}</h6>
                    <img src={tree.imageurl} width="160" height="100"></img><br/>
                    <h6>จำนวน:{(tree) ? tree.number : 0}</h6>
                    <h6>Price:{(tree) ? tree.price : 0}</h6>

                    <button onClick={() => buyTree(tree.id)}  >Buy</button>
                    <style jsx>{`
                h1,h2,ul{
                  font-family: 'Mali', cursive;
                }
                button {
                    background-color: #4CAF50; /* Green */
                    border: none;
                    border-radius: 12px;
                    color: white;
                    padding: 12px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                  }
                  img {
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 5px;
                    width: 150px;
                  }
            `}</style>
                </li>
                
            )
        else
            return <li> No Tree</li>
    }
    return (<div className={styles.container}>
        <Navbar />
        <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>
        <h1>Tree Shopping</h1>
        <ul className={styles.list} >{printTrees()}</ul>
        <style jsx>{`
                h1,h2,ul{
                  font-family: 'Mali', cursive;
                }
                button {
                    background-color: #4CAF50; /* Green */
                    border: none;
                    border-radius: 12px;
                    color: white;
                    padding: 12px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                  }
                 
            `}</style>
    </div>
    )

}

export default SWR2

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}