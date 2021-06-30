import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { ComprasUsuario } from "../Componentes/ComprasUsuario"
import axios from "axios";


export const Compras = () => { 
    //Schemas
    const [cookie, setCookie] = useCookies(["user"]);
    const [data, setData] = useState({});
    const datosPedidos = async () => {
        try {
            let doc = await axios.get(
              `https://avviare.herokuapp.com/api/pedidos/All/${cookie.user.id}`
            
            );
        console.log(doc);
        setData(doc.data.data[0])
        }
        catch (err){
            console.log(err)
        }
    }

    useEffect(datosPedidos, []);
    return (<> <ComprasUsuario datosPedidos = {data}/> </>)
    
}