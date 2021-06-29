import {PerfilUsuario} from "../Componentes/PerfilUsuario"
import axios from "axios";

const PerfilPropio = () => { 
    return (<> <PerfilUsuario dataUsuario = {{id_usuario: 999, nombre: "Mary", apellido: "DS", email: "marybbds98@pruebita.com", telefono: "04141330068", imagen_url: "helloooo Andresito"}}/> </>)

 }