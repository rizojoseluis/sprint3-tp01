import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';


class SuperHeroRepository extends IRepository {
    async obtenerPorid (id) {
        return await SuperHero.findById (id);
    }

    async obtenerTodos(){
        return await SuperHero.find ({});
    }

    async buscarPorAtributo (atributo, valor ) {
        try{
            if(atributo!='edad'){
                const query = { [atributo ]: new RegExp (valor, 'i' ) };
                return await SuperHero.find (query);
            }else{
                const query = {[atributo]: valor};
                return await SuperHero.find(query);
            }
        }catch(error){
            console.log('Error al obtener heroes: ', error);
            throw error;
        }
       
    }

    async obtenerMayoresDe30() { 
        return await SuperHero.find({ edad: { $gt: 30 }, 
            planetaOrigen: 'Tierra', 
            $and: [             
                { poderes: { $exists: true, $type: "array" } }, // Verifica que "poderes" sea un arreglo
                                   { $expr: { $gte: [{ $size: "$poderes" }, 2] } } // Condición de tamaño mínimo
               ]
            /* poderes: { $size: 2 } */
         })} 
         
         async crearSuperHeroe(data) { 
            try { const nuevoSuperHeroe = new SuperHero(data); 
                return await nuevoSuperHeroe.save(); } 
                catch (error) { 
                    console.log('Error al crear héroe: ', error); 
                    throw error; } 
                } 
} 
                    
    export default new SuperHeroRepository();