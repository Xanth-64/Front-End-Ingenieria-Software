import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PerfilUsuario} from '../Componentes/PerfilUsuario'
import { CloudinaryContext } from "cloudinary-react";

describe('PerfilUsuario Component', () => {

    
    let makeNewRender;
   
    beforeEach(() => {
        const { rerender } = render(
          <CloudinaryContext cloudName="unimet"
          >
          <PerfilUsuario
            dataUsuario = {{nombre: "Mary", apellido: "Beltrán", email: "marybbdsss@gmail.com", telefono: "04245893674", tipo: "Cliente", imagen_url: "Hello pruebitaa jeje"}}
          /></CloudinaryContext>
        );
        makeNewRender = rerender;
      });
    
      it('Debería mostrar la data del perfil sin problemas', () => {
        const Perfil = screen.getByTestId('PruebitaPerfil');
        expect(Perfil).toBeInTheDocument();
      });
    

    });

