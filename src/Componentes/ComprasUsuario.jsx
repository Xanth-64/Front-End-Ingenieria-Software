import { Image, Transformation } from "cloudinary-react";
import { useCookies } from "react-cookie";
import { Panel, FlexboxGrid, Button, Icon } from "rsuite";
import { useHistory } from "react-router-dom";

export const ComprasUsuario = (props) => {
const [cookie, setCookie] = useCookies(["user"]); 
const history = useHistory();  
    return (<>    
    <FlexboxGrid justify="center" align="middle" style={{ margin: "2rem 0"}}>
        <Panel bordered shaded style={{ width: "80%", padding: "3% 2%"}}>  

        <div className="cardContainer space-around wh-290vw" style={{color: "#277276"}}>
            <h6 style={{textAlign:"center"}}>Historial de Pedidos</h6>      
        </div>  
    
        <div className="cardContainer space-around wh-290vw">
            <h6 style={{width: "50%", textAlign:"center"}}>{props.datosPedidos.fecha}</h6>
            <h6 style={{width: "50%", textAlign:"center"}}>{props.datosPedidos.monto_total}</h6>      
        </div> 
        
        <FlexboxGrid justify="center" align="bottom"  style={{marginTop: "3rem"}}>
        <Button
            size="lg"
            appearance="primary"
            color="#003234"
            onClick={() => {
                history.push(
                `/`
                );
            }}
        >
         Volver a Home
        </Button></FlexboxGrid>
        </Panel>
    </FlexboxGrid>
    </>)
};