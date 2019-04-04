
exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.handle422 = (req, res) => {
  res.status(422).send({ msg: 'Route Not Found' });
};

exports.handle400 = (req, res) => {
  res.status(400).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
    console.log(err)
  res.status(500).send({ msg: 'Internal Server Error' });
};
