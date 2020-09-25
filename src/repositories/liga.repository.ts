import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Liga, LigaRelations, Equipo} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EquipoRepository} from './equipo.repository';

export class LigaRepository extends DefaultCrudRepository<
  Liga,
  typeof Liga.prototype.id,
  LigaRelations
> {

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Liga, dataSource);
  }
}
