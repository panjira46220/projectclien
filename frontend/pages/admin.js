import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/admin.module.css'
//import useSWR, { mutate } from 'swr'
import Navbar from "../components/navbar";
import withAuth from "../components/withAuth";


const URL = "http://localhost/api/trees";
const URL2 = "http://localhost/api/income";
const URL3 = "http://localhost/api/retrees";
const URL4 = "http://localhost/api/addtree";


const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
    const [trees, setTrees] = useState({})
    const [tree, setTree] = useState({})
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)
    const [price, setPrice] = useState(0)
    const [imageurl,setImageurl] = useState('')
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
        setTree({ id: tree.data.id, name: tree.data.name, number: tree.data.number, price: tree.data.price, imageurl: tree.data.imageurl })
    }



    const printTrees = () => {
        if (trees && trees.length)
            return trees.map((tree, index) =>
                <li className={styles.listItem} key={index}>
                    <h6>Id:{(tree) ? tree.id : 0}</h6>
                    <h6>Name:{(tree) ? tree.name : '-'}</h6>
                    <img src={(tree.imageurl)} width="160" height="100"></img>
                   <h6>Number:<button onClick={() => reduce(tree.id,tree.number)}>-</button>{(tree) ? tree.number : 0}<button onClick={() => addNumber(tree.id,tree.number)}>+</button></h6>
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


    const addTree = async (name, number, price, imageurl ) => {
        let trees = await axios.post(URL, { name, number, price, imageurl })
        setTrees(trees.data)
    }

    


    const deleteTree = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        getTrees()
    }

    const updateTree = async (id) => {
        const result = await axios.put(`${URL}/${id}`, { id, name, number, price, imageurl })
        //console.log('student id update: ', result.data)
        getTrees()
    }

    const reduce = async (id, number) => {
        if (number > 0) {
            let num = number - 1
            setTrees(num)
            console.log('number=' + num)
            const result = await axios.put(`${URL3}/${id}`, { id, num })
        }
        getTrees()
    }

    const addNumber = async (id, number) => {
        const result = await axios.put(`${URL4}/${id}`, { id,number })
        console.log(number)
        getTrees()
    }
    


    return (<div className={styles.container} >
          <Navbar />
          <link href="https://fonts.googleapis.com/css2?family=Mali:ital,wght@1,300&display=swap" rel="stylesheet"></link>
        <h1>Admin</h1>
        <h2>Income:{printIncome()}</h2>
        <h2>Trees</h2>
        <ul className={styles.list}  >{printTrees()}</ul>
        selected tree: {tree.name} {tree.number} {tree.price} {tree.price} {tree.imageurl}
        <h2>Add tree</h2>
        <ul className={styles.formadd} >
            ชื่อ:<input type="text" onChange={(e) => setName(e.target.value)} /> <br />
        จำนวน:<input type="number" onChange={(e) => setNumber(e.target.value)} /> <br />
        Price:<input type="number" onChange={(e) => setPrice(e.target.value)} /> <br />
        imageurl:<input type="Linkd" onChange={(e) => setImageurl(e.target.value)} /> <br />
            <button className={styles.byttonadd} onClick={() => addTree(name,number, price,imageurl)}>Add new tree</button>
        </ul>
        <style jsx>{`
                h1,h2,ul{
                  font-family: 'Mali', cursive;
                }

            `}</style>
    </div>
    )
}

export default withAuth(SWR1);

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
  }
