# react-native-node


npm i

npm start  - start backend;
npm run dev:frontend - start frontend;


http://localhost:3000/
http://localhost:3001/



create migration:
node ./node_modules/db-migrate/bin/db-migrate create test --config ./src/configs/config.json -m ./src/migrations

run migrations: 
npm run mup

down migrations:
npm rum mdown
