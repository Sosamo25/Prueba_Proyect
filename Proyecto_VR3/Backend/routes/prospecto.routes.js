import express from 'express'
import { getAllProspects, getProspect, createProspect, updateProspect, deleteProspect } from '../controllers/prospectocontroller.js'


const routerProspect = express.Router()

routerProspect.get('/', getAllProspects)
routerProspect.get('/:ID', getProspect)
routerProspect.post('/', createProspect)
routerProspect.put('/:ID', updateProspect)
routerProspect.delete('/:ID', deleteProspect)


export default routerProspect