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
import {DetalleLiga} from '../models';
import {DetalleLigaRepository} from '../repositories';

export class DetalleLigaController {
  constructor(
    @repository(DetalleLigaRepository)
    public detalleLigaRepository : DetalleLigaRepository,
  ) {}

  @post('/detalle-liga', {
    responses: {
      '200': {
        description: 'DetalleLiga model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetalleLiga)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleLiga, {
            title: 'NewDetalleLiga',
            exclude: ['id'],
          }),
        },
      },
    })
    detalleLiga: Omit<DetalleLiga, 'id'>,
  ): Promise<DetalleLiga> {
    return this.detalleLigaRepository.create(detalleLiga);
  }

  @get('/detalle-liga', {
    responses: {
      '200': {
        description: 'Array of DetalleLiga model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DetalleLiga, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(): Promise<DetalleLiga[]> {
    return this.detalleLigaRepository.find();
  }

  @get('/detalle-liga/{id}', {
    responses: {
      '200': {
        description: 'DetalleLiga model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DetalleLiga, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DetalleLiga, {exclude: 'where'}) filter?: FilterExcludingWhere<DetalleLiga>
  ): Promise<DetalleLiga> {
    return this.detalleLigaRepository.findById(id, filter);
  }

  @put('/detalle-liga/{id}', {
    responses: {
      '204': {
        description: 'DetalleLiga PUT success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetalleLiga, {partial: true}),
        },
      },
    })
    detalleLiga: DetalleLiga,
  ): Promise<void> {
    await this.detalleLigaRepository.updateById(id, detalleLiga);
  }

  @del('/detalle-liga/{id}', {
    responses: {
      '204': {
        description: 'DetalleLiga DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.detalleLigaRepository.deleteById(id);
  }
}
