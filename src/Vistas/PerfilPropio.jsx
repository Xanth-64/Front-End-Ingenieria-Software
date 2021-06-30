import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {PerfilUsuario} from "../Componentes/PerfilUsuario"
import axios from "axios";


export const PerfilPropio = () => { 
    //Schemas
    const [cookie, setCookie] = useCookies(["user"]);
    const [data, setData] = useState({});
    const datosUsuario = async () => {
        try {
            let doc = await axios.get(
              `https://avviare.herokuapp.com/api/usuarios/one/${cookie.user.id}`
            
            );
        console.log(doc);
        setData(doc.data.data[0])
        }
        catch (err){
            console.log(err)
        }
    }

    useEffect(datosUsuario, []);
    return (<> <PerfilUsuario dataUsuario = {data}/> </>)
    
}