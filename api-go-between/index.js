const express = require('express');
const request = require('request');
const https = require('https');
const fs = require('fs');

var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.set('content-type', 'application/json')
  next();
});

app.get('/', (req, res) => {
res.send("coinbin custom api");
});

app.get('/chainz/balance/:coinname/:address', (req, res) => {
console.log(req.params.coinname);
console.log(req.params.address);
  request(
    { url: 'https://chainz.cryptoid.info/' + req.params.coinname + '/api.dws?q=getbalance&a='+ req.params.address+ ''},
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error });
      }

      res.send(JSON.stringify(JSON.parse(body), null, 2));
      }
    )
  });
  app.get('/chainz/listunspent/:coinname/:address', (req, res) => {
  console.log(req.params.coinname);
  console.log(req.params.address);
    request(
      { url: 'https://chainz.cryptoid.info/' + req.params.coinname +'/api.dws?q=unspent&key=1a9c92c7492b&active='+ req.params.address+ ''},
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: error });
        }

        res.send(JSON.stringify(JSON.parse(body), null, 2));
        }
      )
    });
    app.get('/coinexplorer/balance/:coinname/:address', (req, res) => {
    console.log(req.params.coinname);
    console.log(req.params.address);
      request(
        { url: 'https://www.coinexplorer.net/api/v1/' + req.params.coinname +'/address/balance?address='+ req.params.address+ ''},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error });
          }

          res.send(JSON.stringify(JSON.parse(body), null, 2));
          }
        )
      });
    app.get('/coinexplorer/listunspent/:coinname/:address', (req, res) => {
    console.log(req.params.coinname);
    console.log(req.params.address);
      request(
        { url: 'https://www.coinexplorer.net/api/v1/'+ req.params.coinname +'/address/unspent?address=' + req.params.address + ''},
        (error, response, body) => {
          if (error || response.statusCode !== 200) {
            return res.status(500).json({ type: 'error', message: error });
          }
            res.send(JSON.stringify(JSON.parse(body), null, 2));
          }
        )
      });

      app.get('/blockchair/balance/:coinname/:address', (req, res) => {
      console.log(req.params.coinname);
      console.log(req.params.address);
        request(
          { url: 'https://api.blockchair.com/'+ req.params.coinname +'/dashboards/address/'+ req.params.address +''},
          (error, response, body) => {
            if (error || response.statusCode !== 200) {
              return res.status(500).json({ type: 'error', message: error });
            }
            var your_address = req.params.address;
            const result = JSON.parse(body);
            res.send(JSON.stringify(JSON.parse(result.data[your_address].address.balance), null, 2));

            }
          )
        });
        app.get('/auroracoin/balance/:address', (req, res) => {
        console.log(req.params.address);
          request(
            { url: 'http://insight.auroracoin.is/api/addr/'+ req.params.address +'/balance'},
            (error, response, body) => {
              if (error || response.statusCode !== 200) {
                return res.status(500).json({ type: 'error', message: error });
              }
              res.send(JSON.stringify(JSON.parse(body), null, 2));

              }
            )
          });
          app.get('/auroracoin/listunspent/:address', (req, res) => {
          console.log(req.params.address);
            request(
              { url: 'http://insight.auroracoin.is/api/addr/'+ req.params.address +'/utxo'},
              (error, response, body) => {
                if (error || response.statusCode !== 200) {
                  return res.status(500).json({ type: 'error', message: error });
                }
                res.send(JSON.stringify(JSON.parse(body), null, 2));

                }
              )
            });
            app.get('/htmlcoin/balance/:address', (req, res) => {
            console.log(req.params.address);
              request(
                { url: 'https://explorer.htmlcoin.com/api/addr/'+ req.params.address +'/balance'},
                (error, response, body) => {
                  if (error || response.statusCode !== 200) {
                    return res.status(500).json({ type: 'error', message: error });
                  }
                  res.send(JSON.stringify(JSON.parse(body), null, 2));

                  }
                )
              });
              app.get('/htmlcoin/listunspent/:address', (req, res) => {
              console.log(req.params.address);
                request(
                  { url: 'https://explorer.htmlcoin.com/api/addr/'+ req.params.address +'/utxo'},
                  (error, response, body) => {
                    if (error || response.statusCode !== 200) {
                      return res.status(500).json({ type: 'error', message: error });
                    }
                    res.send(JSON.stringify(JSON.parse(body), null, 2));

                    }
                  )
                });
                app.get('/safecoin/balance/:address', (req, res) => {
                console.log(req.params.address);
                  request(
                    { url: 'https://explorer.safecoin.org/api/addr/'+ req.params.address +'/balance'},
                    (error, response, body) => {
                      if (error || response.statusCode !== 200) {
                        return res.status(500).json({ type: 'error', message: error });
                      }
                      res.send(JSON.stringify(JSON.parse(body), null, 2));

                      }
                    )
                  });
                  app.get('/safecoin/listunspent/:address', (req, res) => {
                  console.log(req.params.address);
                    request(
                      { url: 'https://explorer.safecoin.org/api/addr/'+ req.params.address +'/utxo'},
                      (error, response, body) => {
                        if (error || response.statusCode !== 200) {
                          return res.status(500).json({ type: 'error', message: error });
                        }
                        res.send(JSON.stringify(JSON.parse(body), null, 2));

                        }
                      )
                    });
                    app.get('/rdd/balance/:address', (req, res) => {
                    console.log(req.params.address);
                      request(
                        { url: 'https://live.reddcoin.com/api/addr/'+ req.params.address +'/balance'},
                        (error, response, body) => {
                          if (error || response.statusCode !== 200) {
                            return res.status(500).json({ type: 'error', message: error });
                          }
                          res.send(JSON.stringify(JSON.parse(body), null, 2));

                          }
                        )
                      });
                      app.get('/rdd/listunspent/:address', (req, res) => {
                      console.log(req.params.address);
                        request(
                          { url: 'https://live.reddcoin.com/api/addr/'+ req.params.address +'/utxo'},
                          (error, response, body) => {
                            if (error || response.statusCode !== 200) {
                              return res.status(500).json({ type: 'error', message: error });
                            }
                            res.send(JSON.stringify(JSON.parse(body), null, 2));

                            }
                          )
                        });
      app.get('/digiexplorer/broadcast/:txhex', (req, res) => {

      });

  const PORT = process.env.PORT || 5555;
  app.listen(PORT, () => console.log(`listening on ${PORT}`));
  https.createServer({
    key: fs.readFileSync(''), //change me
    cert: fs.readFileSync('') //change me
  }, app).listen(8083, function () {
   require('dns').lookup(require('os').hostname(), function (err, add, fam) {
     console.log('HTTPS running on http://%s:8083', add);
 })
  });
