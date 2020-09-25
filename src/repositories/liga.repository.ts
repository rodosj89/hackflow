import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Liga, LigaRelations, Equipo, DetalleLiga} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EquipoRepository} from './equipo.repository';
import {DetalleLigaRepository} from './detalle-liga.repository';

export class LigaRepository extends DefaultCrudRepository<
  Liga,
  typeof Liga.prototype.id,
  LigaRelations
> {

  public readonly detalle: HasManyRepositoryFactory<DetalleLiga, typeof Liga.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>, @repository.getter('DetalleLigaRepository') protected detalleLigaRepositoryGetter: Getter<DetalleLigaRepository>,
  ) {
    super(Liga, dataSource);
    this.detalle = this.createHasManyRepositoryFactoryFor('detalle', detalleLigaRepositoryGetter,);
    this.registerInclusionResolver('detalle', this.detalle.inclusionResolver);
  }
}
