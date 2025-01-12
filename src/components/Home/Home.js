import React from 'react';
import Loading from '../Loading/Loading';
import { db } from "../firebase/firebase.js";
import { getDocs, collection, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import ItemList from "../ItemList/ItemList";
import './home.css'


function Home() {
  
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  


useEffect(() => {
  const productsCollection = collection(db, "MalvinaCollection");
  const q = query(productsCollection, where("sale", "==", true));
  getDocs(q)
      .then((result) => {
          const docs = result.docs
          const lista = docs.map(producto => {
              const id = producto.id;
              const product = {
                  id,
                  ...producto.data()
              }
              return product;
          })
          setSales(lista)
      })
      .catch(() => {
          console.log("error")
      })
      .finally(() => {
          setLoading(false)
      })
}, []);


  return (
    <div>
      <h2>Promociones</h2>
                {loading
                    ? (<Loading />)
                    : (<ItemList filtered={sales} />)
                }
    </div>
  )
}





export default Home