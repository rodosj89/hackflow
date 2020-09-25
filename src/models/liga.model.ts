import {Entity, model, property, hasMany} from '@loopback/repository';
import {Equipo} from './equipo.model';
import {DetalleLiga} from './detalle-liga.model';

@model()
export class Liga extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  urlPoster?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => DetalleLiga)
  detalle: DetalleLiga[];

  constructor(data?: Partial<Liga>) {
    super(data);
  }
}

export interface LigaRelations {
  // describe navigational properties here
}

export type LigaWithRelations = Liga & LigaRelations;
