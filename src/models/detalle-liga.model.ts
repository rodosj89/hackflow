import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Equipo} from './equipo.model';
import {Liga} from './liga.model';

@model()
export class DetalleLiga extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Equipo)
  equipoId: string;

  @belongsTo(() => Liga)
  ligaId: string;

  constructor(data?: Partial<DetalleLiga>) {
    super(data);
  }
}

export interface DetalleLigaRelations {
  // describe navigational properties here
}

export type DetalleLigaWithRelations = DetalleLiga & DetalleLigaRelations;
