### Install all dependencies

Run this code in backend directory

```npm i```

### Migration to database

Run this code in backend directory to generate the migration file

```npm run typeorm -- migration:generate src/database/migrations/RelationOrderItem -d src/database/dataSource.ts```

##### Or

Run this code to run the migration in backend directory

```npm run typeorm -- migration:run -d src/database/dataSource.ts```

### Run dev application

Run this code in backend directory

```npm start```

<br>

> made with :heart: 
