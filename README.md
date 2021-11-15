1. To start the app run command: sudo docker-compose -f docker-compose.yml up --build
2. To create film load this endpoint: http://localhost:3000/film, method: POST, body example: 
{
   "name": "Any",
   "productionYear": "2012-04-21T18:25:43-05:00",
   "formatOfMovie": "DVD",
   "listOfActors": [{
   "firstName": "Yevhen",
   "lastName": "Svyrydov"
   }, {
   "firstName": "Alice",
   "lastName": "Sheiko"
   }]
   }
3. To get film by actor`s data load this endpoint: http://localhost:3000/filmByActor, method: POST, example of body:
   {
   "firstName": "Yevhen",
   "lastName": "Svyrydov"
   }
4. To get film by name load this endpoint: http://localhost:3000/filmByName/:name, method: GET
5. To get film by id load this endpoint: http://localhost:3000/filmByName/:filmId, method: GET
6. To get all films load this endpoint: http://localhost:3000/films, method: GET
7. To import film data load this endpoint: http://localhost:3000/film, method: GET
8. To delete film by id load this endpoint: http://localhost:3000/film/:filmId, method: DELETE

Structure of the app is classic, we have business logic that deals with DB queries in service. It is supposed that every component should have it`s own controller, router and service and each entity interacts through index files. Such structure allows to decrease coupling and to increase cohesion.