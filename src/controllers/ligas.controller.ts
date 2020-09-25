import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
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
import {Liga} from '../models';
import {LigaRepository} from '../repositories';

export class LigasController {
  constructor(
    @repository(LigaRepository)
    public ligaRepository : LigaRepository,
  ) {}

  @post('/ligas', {
    responses: {
      '200': {
        description: 'Liga model instance',
        content: {'application/json': {schema: getModelSchemaRef(Liga)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Liga, {
            title: 'NewLiga',
            exclude: ['id'],
          }),
        },
      },
    })
    liga: Omit<Liga, 'id'>,
  ): Promise<Liga> {
    return this.ligaRepository.create(liga);
  }

  @get('/ligas/count', {
    responses: {
      '200': {
        description: 'Liga model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Liga) where?: Where<Liga>,
  ): Promise<Count> {
    return this.ligaRepository.count(where);
  }

  @get('/ligas', {
    responses: {
      '200': {
        description: 'Array of Liga model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Liga, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Liga) filter?: Filter<Liga>,
  ): Promise<Liga[]> {
    return this.ligaRepository.find(filter);
  }

  @get('/ligas/{id}', {
    responses: {
      '200': {
        description: 'Liga model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Liga, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Liga, {exclude: 'where'}) filter?: FilterExcludingWhere<Liga>
  ): Promise<Liga> {
    return this.ligaRepository.findById(id, filter);
  }

  @put('/ligas/{id}', {
    responses: {
      '204': {
        description: 'Liga PUT success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Liga, {partial: true}),
        },
      },
    })
    liga: Liga,
  ): Promise<void> {
    await this.ligaRepository.updateById(id, liga);
  }

  @del('/ligas/{id}', {
    responses: {
      '204': {
        description: 'Liga DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ligaRepository.deleteById(id);
  }
}
