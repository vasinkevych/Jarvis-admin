import {watchFetchMigrations, watchMigrationsUp, watchMigrationsDown, watchMigrationsDownOne} from './migrations.saga';

export default function* rootSaga() {
  yield [
    watchFetchMigrations(),
    watchMigrationsUp(),
    watchMigrationsDown(),
    watchMigrationsDownOne()
  ]
}
