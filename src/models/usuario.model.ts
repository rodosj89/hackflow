import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  leagues: string[];

  @property({
    type: 'array',
    itemType: 'string',
  })
  teams: string[];

  @property({
    type: 'object',
  })
  subscribe?: object;


  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
