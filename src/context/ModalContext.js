import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    //State del provider
    const [ idreceta, guardarIdReceta ] = useState(null);
    const [ inforeceta, guardarReceta ] = useState({});

    //Una vez que tenemos una receta, llamar a API
    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idreceta) return

            const url = ` https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

            const resultado = await axios.get(url);

            guardarReceta(resultado.data.drinks[0]);
            
        } 

        obtenerReceta();
    },[idreceta]);

    return(
        <ModalContext.Provider
            value={{
                inforeceta,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;