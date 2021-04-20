import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/admin.module.css'
//import useSWR, { mutate } from 'swr'
import Navbar from "../components/navbar";
import withAuth from "../components/withAuth";


const URL = "http://localhost/api/trees";
const URL2 = "http://localhost/api/income";


const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
    const [trees, setTrees] = useState({ list: [{ id: 1, type: 'cat', age: 1, weight: 5, price: 2000 },] })
    const [tree, setTree] = useState({})
    const [id, setId] = useState(0)
    const [type, setType] = useState('')
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [price, setPrice] = useState(0)
    const [income, setIncome] = useState(0)
    //const { data } = useSWR(URL, URL2, fetcher)


    useEffect(() => {
        getTrees();
        getIncome();
        profileUser();
      }, []);

    const profileUser = async () => {
        try {
          // console.log('token: ', token)
          const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // console.log('user: ', users.data)
          setUser(users.data);
        } catch (e) {
          console.log(e);
        }
      };
    
    const getTrees = async () => {
        let trees = await axios.get(URL)
        setTrees(trees.data)
        //console.log('Tree:', trees.data)
    }
    const getIncome = async () => {
        let income = await axios.get(URL2)
        setIncome(income.data)
        //console.log('income:', income.data)
    }

    const getTree = async (id) => {
        let tree = await axios.get(`${URL}/${id}`)
        console.log('bear id: ', tree.data)
        setTree({ id: tree.data.id, type: tree.data.type, weight: tree.data.weight, age: tree.data.age, price: tree.data.price })
    }



    const printTrees = () => {
        if (trees && trees.length)
            return trees.map((tree, index) =>
                <li className={styles.listItem} key={index}>
                    <h6>Id:{(tree) ? tree.id : 0}</h6>
                    <h6>Type:{(tree) ? tree.type : '-'}</h6>
                    <h6>Age:{(tree) ? tree.age : 0}</h6>
                    <h6>Weight:{(tree) ? tree.weight : 0}</h6>
                    Price:{(tree) ? tree.price : 0}
                    <button className={styles.byttondelet} onClick={() => deleteTree(tree.id)} >Delete</button>
                    <button className={styles.byttonget} onClick={() => getTree(tree.id)}>Get</button>
                    <button className={styles.byttonupdate} onClick={() => updateTree(tree.id)}>Update</button>
                </li>
            )
        else
            return <li> No Tree</li>
    }

    const printIncome = () => {
        return income
    }


    const addTree = async (type, age, weight, price) => {
        let trees = await axios.post(URL, { type, age, weight, price })
        setTrees(trees.data)
    }


    const deleteTree = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        getTrees()
    }

    const updateTree = async (id) => {
        const result = await axios.put(`${URL}/${id}`, { id, type, age, weight, price })
        //console.log('student id update: ', result.data)
        getTrees()
    }



    return (<div className={styles.container} >
          <Navbar />
        <h1>Admin</h1>
        <h2>Income:{printIncome()}</h2>
        <h2>Trees</h2>
        <ul className={styles.list}  >{printTrees()}</ul>
        selected tree: {tree.type} {tree.age} {tree.weight} {tree.price}
        <h2>Add tree</h2>
        <ul className={styles.formadd} >
            Type:<input type="text" onChange={(e) => setType(e.target.value)} /> <br />
        Age:<input type="number" onChange={(e) => setAge(e.target.value)} /> <br />
        Weight:<input type="number" onChange={(e) => setWeight(e.target.value)} /> <br />
        Price:<input type="number" onChange={(e) => setPrice(e.target.value)} /> <br />
            <button className={styles.byttonadd} onClick={() => addTree(type, age, weight, price)}>Add new tree</button>
        </ul>
    </div>
    )
}

export default withAuth(SWR1);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
  }
