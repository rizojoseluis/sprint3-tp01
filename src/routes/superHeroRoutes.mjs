import express from 'express';
import {
    obtenerSuperheroePoridController,
    obtenerTodoslosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    crearSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroeController,
    eliminarSuperheroePorSuNombreController
} from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes', obtenerTodoslosSuperheroesController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/:id', obtenerSuperheroePoridController);
router.post('/superheroes', crearSuperheroeController);
router.put('/superheroes/:id', actualizarSuperheroeController);
router.delete('/superheroes/nombre/:nombreSuperHeroe', eliminarSuperheroePorSuNombreController);
router.delete('/superheroes/:id', eliminarSuperheroeController);

export default router;