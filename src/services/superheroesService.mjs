import superHeroRepository from '../repositories/SuperHeroRepository.mjs' ;

export async function obtenerSuperheroePorid(id){
    return await superHeroRepository.obtenerPorid (id);
}

export async function obtenerTodoslosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}
export async function buscarSuperheroesPorAtributo (atributo , valor) {
    return await superHeroRepository.buscarPorAtributo (atributo, valor);
}
export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}