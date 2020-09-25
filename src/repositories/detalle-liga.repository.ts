import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DetalleLiga, DetalleLigaRelations, Equipo, Liga} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {EquipoRepository} from './equipo.repository';
import {LigaRepository} from './liga.repository';

export class DetalleLigaRepository extends DefaultCrudRepository<
  DetalleLiga,
  typeof DetalleLiga.prototype.id,
  DetalleLigaRelations
> {

  public readonly equipo: BelongsToAccessor<Equipo, typeof DetalleLiga.prototype.id>;

  public readonly liga: BelongsToAccessor<Liga, typeof DetalleLiga.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>, @repository.getter('LigaRepository') protected ligaRepositoryGetter: Getter<LigaRepository>,
  ) {
    super(DetalleLiga, dataSource);
    this.liga = this.createBelongsToAccessorFor('liga', ligaRepositoryGetter,);
    this.registerInclusionResolver('liga', this.liga.inclusionResolver);
    this.equipo = this.createBelongsToAccessorFor('equipo', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
  }
}
