// // Import our custom CSS
// import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { obtenerDatosConRetraso, ordenarDatos } from './script'


// Uso de las funciones
obtenerDatosConRetraso((datos) => {
    // console.log('Datos obtenidos:', datos);

    ordenarDatos(datos, 'id', (datosOrdenadosPorId) => {
        console.log('Datos ordenados por id:', datosOrdenadosPorId);
    });

    ordenarDatos(datos, 'name', (datosOrdenadosPorNombre) => {
        console.log('Datos ordenados por name:', datosOrdenadosPorNombre);
    })
});

