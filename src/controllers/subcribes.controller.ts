import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
  EntityNotFoundError,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class SubcribesController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository : UsuarioRepository,
  ) {}

  @post('/usuarios/{id}/subscribe', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async subscribe(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id']
          }),
        },
      },
    })
    usuario: Usuario,
  ): Promise<Usuario> {
    let usuarioStored = await this.usuarioRepository.findOne({
      where: {
        id: id
      }
    });
    usuario.id = id;
    usuario.leagues = usuario.leagues || [];
    usuario.teams = usuario.teams || [];
    if (!usuarioStored) 
      return this.usuarioRepository.create(usuario);
    
    //@ts-ignore
    usuario.leagues = usuarioStored.leagues ? usuarioStored.leagues.concat(usuario.leagues.filter(l => !usuarioStored.leagues.includes(l))) : usuario.leagues;
    //@ts-ignore
    usuario.teams = usuarioStored.teams ? usuarioStored.teams.concat(usuario.teams.filter(t => !usuarioStored.teams.includes(t))) : usuario.teams;
    await this.usuarioRepository.updateById(id, usuario);
    return this.usuarioRepository.findById(id);
  }


  @post('/usuarios/{id}/unsubscribe', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async unsubscribe(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id','subscribe']
          }),
        },
      },
    })
    usuario: Usuario,
  ): Promise<Usuario> {
    let usuarioStored = await this.usuarioRepository.findById(id);
    usuario.leagues = usuario.leagues || [];
    usuario.teams = usuario.teams || [];
    usuario.leagues = usuarioStored.leagues ? usuarioStored.leagues.filter(l => !usuario.leagues.includes(l)) : [];
    usuario.teams = usuarioStored.teams ? usuarioStored.teams.filter(t => !usuario.teams.includes(t)) : [];
    await this.usuarioRepository.updateById(id, usuario);
    return this.usuarioRepository.findById(id);
  }

  @get('/usuarios', {
    responses: {
      '200': {
        description: 'Array of Usuario model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Usuario, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  @get('/usuarios/{id}', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @del('/usuarios/{id}', {
    responses: {
      '204': {
        description: 'Usuario DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}
