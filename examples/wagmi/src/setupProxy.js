module.exports = function (app) {
  app.use('/manifest.json', function (req, res, next) {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    });

    next();
  });
};
