import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Equipo, EquipoRelations, Liga} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {LigaRepository} from './liga.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('LigaRepository') protected ligaRepositoryGetter: Getter<LigaRepository>,
  ) {
    super(Equipo, dataSource);
  }
}
