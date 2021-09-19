const poll = require("./databases/postgres");

const createdDestiny = (request, response) => {
  const { name, checkin, checkout, lat, lng } = request.body;

  const query = `INSERT INTO Destiny (name, checkin, checkout, destination) 
        VALUES ('${name}', '${checkin}', '${checkout}',ST_GeomFromText('POINT(${lat} ${lng})'))`;

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
  const query ='SELECT ST_x(destination), ST_y(destination) FROM Destiny';

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