 const poll = require("./databases/postgres");

const createdDestiny = (request, response) => {
  const { name, lat, lng } = request.body;
console.log("Sgow")
  const query = `INSERT INTO ubs (nome, geometria) 
        VALUES ('${name}', ST_GeomFromText('POINT(${lat} ${lng})'))`;

  poll.query(query, (error, results) => {
    if (error) {
      response.status(400).send(error);
      console.log(error);
      return;
    }
    response.status(200).send("Inserido");
  });
};

const getDestiny = (request, response) => {
  const query ='SELECT ST_x(geometria), ST_y(geometria) FROM ubs';

  poll.query(query, (err, results) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

module.exports = {
  createdDestiny,
  getDestiny,
}; 