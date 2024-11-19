import SuperHero from '../models/SuperHero.mjs';
import {
    obtenerSuperheroePorid,
    obtenerTodoslosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30,
} from '../services/superheroesService.mjs';

import {
    renderizarSuperheroe,
    renderizarListaSuperheroes
} from '../views/responseView.mjs';

export async function obtenerSuperheroePoridController(req, res) {
    const { id } = req.params;
    try {
        const superheroe = await obtenerSuperheroePorid(id);
        if (superheroe) {
            res.send(renderizarSuperheroe(superheroe));
        } else {
            res.status(404).send({ mensaje: "Superhéroe no encontrado" });
        }
    } catch (error) {
        res.status(400).send({ mensaje: "Error al buscar el superhéroe" });
    }
}


export async function obtenerTodoslosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodoslosSuperheroes();
        res.send(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(400).send({ mensaje: "Error al obtener los superhéroes" });
    }
}

export async function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;
    try {
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length > 0) {
            res.send(renderizarListaSuperheroes(superheroes));
        } else {
            res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
        }
    } catch (error) {
        res.status(400).send({ mensaje: "Error al buscar los superhéroes" });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        console.log("Iniciando búsqueda de superhéroes mayores de 30");
        const superheroes = await obtenerSuperheroesMayoresDe30();
        console.log("Superhéroes mayores de 30 encontrados", superheroes); 
        res.send(renderizarListaSuperheroes(superheroes));
    } catch (error) {
        res.status(400).send({ mensaje: "Error al obtener los superhéroes mayores de 30" });
    }
};


    /************************Creamos un nuevo Superheroe**********************/


    export const crearSuperheroeController = async (req, res) => {
        try {
            const { nombreSuperHeroe, nombreReal, edad, poderes, debilidad } = req.body;
    
            // Validamos que vengan todos los campos requeridos
            if (!nombreSuperHeroe || !nombreReal|| !edad || !poderes || !debilidad) {
                return res.status(400).json({
                    error: 'Todos los campos son OBLIGATORIOS'
                });
            }
    
            // Creamos el nuevo superhéroe
            const nuevoSuperheroe = new SuperHero({
                nombreSuperHeroe,
                nombreReal,
                edad,
                poderes,
                debilidad
            });
    
            // Guardamos en la base de datos
            const savedSuperHero = await nuevoSuperheroe.save();
    
            res.status(201).json({
                success: true,
                message: 'Superhéroe creado exitosamente',
                data: savedSuperHero
            });
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al crear el superhéroe',
                error: error.message
            });
        }
    };

    /************************Actualizamos un Superheroe**********************/

    export const actualizarSuperheroeController = async (req, res) => { 
        const { id } = req.params; //Extrae el parámetro id de la URL
        const { nombreSuperHeroe, nombreReal, edad, poderes, debilidad } = req.body;

        try { // Validamos que vengan todos los campos requeridos 
            if (!nombreSuperHeroe || !nombreReal || !edad || !poderes || !debilidad) { 
                return res.status(400).json({ 
                    error: 'Todos los campos son OBLIGATORIOS' 
                }); 
            }

            // El método findByIdAndUpdate buscar por id y actualiza los datos.
            const superheroeActualizado = await SuperHero.findByIdAndUpdate(
                id, 
                { 
                    nombreSuperHeroe, 
                    nombreReal, 
                    edad, 
                    poderes, 
                    debilidad 
                }, 
                { new: true } );

                //Si no existe el id proporcionado retorna el estado 404
                if (!superheroeActualizado) { 
                    return res.status(404).json({ 
                        error: 'Superhéroe no encontrado' 
                    }); 
                } 

                // Si existe el ID retorna el estado 200 (OK)
                res.status(200).json({ 
                    success: true, message: 'Superhéroe actualizado exitosamente', 
                    data: superheroeActualizado 
                }); 

                // Si el proceso de actualización tuvo error, retorna con estado 50 (Internal Server Error)
            } catch (error) { 
                res.status(500).json({ 
                    success: false, 
                    message: 'Error al actualizar el superhéroe', 
                    error: error.message 
                }); 
            } 
        };

 /************************Eliminamos un Superheroe por su ID**********************/
 export const eliminarSuperheroeController = async (req, res) => { 
    const { id } = req.params; //Extrae el parámetro id de la URL

    try { 

        //Utilizo em métofo findByIdAndDelete: 

/*La  función findByIdAndDelete()  se utiliza para encontrar un documento coincidente, 
eliminarlo y pasar el documento encontrado (si lo hay) a la devolución de llamada.
*/
        const superheroeEliminado = await SuperHero.findByIdAndDelete(id);



        if (!superheroeEliminado) { 
            return res.status(404).json({ 
                error: 'Superhéroe no encontrado' 
            }); 
        }   // Si existe el ID retorna el estado 200 (OK)
        res.status(200).json({ 
            success: true, 
            message: 'Superhéroe eliminado exitosamente', 
            data: superheroeEliminado
        });

            // Si el proceso de actualización tuvo error, retorna con estado 50 (Internal Server Error)
        } catch (error) { 
            res.status(500).json({ 
                success: false, 
                message: 'Error al eliminar el superheroe', 
                error: error.message 
            }); 
        } 
    };

 
    /************************Eliminamos un Superheroe por su NOMBRE**********************/
 export const eliminarSuperheroePorSuNombreController = async (req, res) => { 
    const {nombreSuperHeroe} = req.params //Extrae el parámetro nombre

    try { 

        //Utilizo em métofo findOneAndDelete: 

/*
MongoDB findOneAndDelete() es una herramienta potente para eliminar documentos de una colección según criterios específicos. 
Permite eliminar un solo documento que coincida con el filtro de consulta.
*/
        const superheroePorNombreEliminado = await SuperHero.findOneAndDelete({nombreSuperHeroe});


        if (!superheroePorNombreEliminado) { 
            return res.status(404).json({ 
                error: 'Superhéroe por Nombre no encontrado' 
            }); 
        }   // Si existe el ID retorna el estado 200 (OK)
        res.status(200).json({ 
            success: true, 
            message: 'Superhéroe elegido por Nombre eliminado exitosamente', 
            data: superheroePorNombreEliminado
        });

            // Si el proceso de actualización tuvo error, retorna con estado 50 (Internal Server Error)
        } catch (error) { 
            res.status(500).json({ 
                success: false, 
                message: 'Error al eliminar el superheroe por su Nombre', 
                error: error.message 
            }); 
        } 
    };
