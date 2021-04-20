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
    const [trees, setTrees] = useState({ list: [{ id: 1, type: 'cat', age: 1, weight: 5, price: 2000 },] })
    const [tree, setTree] = useState({})
    const [id, setId] = useState(0)
    const [type, setType] = useState('')
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
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
                    <h6>Type:{(tree) ? tree.type : '-'}</h6>
                    <h6>Age:{(tree) ? tree.age : 0}</h6>
                    <h6>Weight:{(tree) ? tree.weight : 0}</h6>
                    <h6>Price:{(tree) ? tree.price : 0}</h6>

                    <button onClick={() => buyTree(tree.id)} className={styles.byttonupdate} >Buy</button>
                </li>
            )
        else
            return <li> No Tree</li>
    }
    return (<div className={styles.container}>
        <Navbar />
        <h1>Trees shop</h1>
        <ul className={styles.list} >{printTrees()}</ul>
    </div>
    )

}

export default SWR2

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}