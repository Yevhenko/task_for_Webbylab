1. To start the app run command: sudo docker-compose -f docker-compose.yml up --build
2. Use your own api examples to interact with application
3. To get film by actor`s data load this endpoint: http://localhost:8000/api/v1/filmByActor, method: POST, example of body:
   {
   "actor": "Humphrey Bogartt"
   }
4. To get film by title load this endpoint: http://localhost:8000/api/v1/filmByName/:name, method: GET
5. To import data from file load: http://localhost:8000/api/v1/movies/import', method: POST

Structure of the app is classic, we have business logic that deals with DB queries in service. It is supposed that every component should have it`s own controller, router and service and each entity interacts through index files. Such structure allows to decrease coupling and to increase cohesion.