 const poll = require("./databases/postgres");

const SalvarUBS = (request, response) => {
  const { name, lat, lng } = request.body;
console.log("Estou Salvando Uma UBS")
  const query = `INSERT INTO ubs (nome, geometria) 
        VALUES ('${name}', ST_GeomFromText('POINT(${lat} ${lng})'))`;

  poll.client.query(query, (error, results) => {
    if (error) {
      response.status(400).send(error);
      console.log(error);
      return;
    }
    response.status(200).send("Inserido");
  });
};

const BuscarUBS = (request, response) => {
  const query ='SELECT ST_x(geometria), ST_y(geometria) FROM ubs';
  poll.client.query(query, (err, results) => {
    if (err) {
      response.status(400).send(err);
    } else {
      response.status(200).json(results.rows);
    }
  });
};

module.exports = {
  SalvarUBS,
  BuscarUBS
}; 