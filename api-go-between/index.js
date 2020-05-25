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

// Chainz API Balance, List Unspent & Broadcast
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
            app.get('/aurora/broadcast/:txhex', (req, res) => {
              console.log(req.params.txhex);
              request.post({
                  url: 'http://insight.auroracoin.is/api/tx/send',
                  body: {rawtx: req.params.txhex},
                  json: true
                }, function(error, response, body){
                  console.log(body);
                  res.send(body);

                });
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
                app.get('/htmlcoin/broadcast/:txhex', (req, res) => {
                  console.log(req.params.txhex);
                  request.post({
                      url: 'https://explorer.htmlcoin.com/api/tx/send',
                      body: {rawtx: req.params.txhex},
                      json: true
                    }, function(error, response, body){
                      console.log(body);
                      res.send(body);

                    });
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
                    app.get('/safecoin/broadcast/:txhex', (req, res) => {
                      console.log(req.params.txhex);
                      request.post({
                          url: 'https://explorer.safecoin.org/api/tx/send',
                          body: {rawtx: req.params.txhex},
                          json: true
                        }, function(error, response, body){
                          console.log(body);
                          res.send(body);

                        });
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
                        app.get('/rdd/broadcast/:txhex', (req, res) => {
                          console.log(req.params.txhex);
                          request.post({
                              url: 'https://live.reddcoin.com/api/tx/send',
                              body: {rawtx: req.params.txhex},
                              json: true
                            }, function(error, response, body){
                              console.log(body);
                              res.send(body);

                            });
                        });

                        app.get('/feathercoin/balance/:address', (req, res) => {
                        console.log(req.params.address);
                          request(
                            { url: 'http://explorer.feathercoin.com/api/addr/'+ req.params.address +'/balance'},
                            (error, response, body) => {
                              if (error || response.statusCode !== 200) {
                                return res.status(500).json({ type: 'error', message: error });
                              }
                              res.send(JSON.stringify(JSON.parse(body), null, 2));

                              }
                            )
                          });
                          app.get('/feathercoin/listunspent/:address', (req, res) => {
                          console.log(req.params.address);
                            request(
                              { url: 'http://explorer.feathercoin.com/api/addr/'+ req.params.address +'/utxo'},
                              (error, response, body) => {
                                if (error || response.statusCode !== 200) {
                                  return res.status(500).json({ type: 'error', message: error });
                                }
                                res.send(JSON.stringify(JSON.parse(body), null, 2));

                                }
                              )
                            });
                            app.get('/feathercoin/broadcast/:txhex', (req, res) => {
                              console.log(req.params.txhex);
                              request.post({
                                  url: 'http://explorer.feathercoin.com/api/tx/send',
                                  body: {rawtx: req.params.txhex},
                                  json: true
                                }, function(error, response, body){
                                  console.log(body);
                                  res.send(body);

                                });
                            });

                            app.get('/viacoin/balance/:address', (req, res) => {
                            console.log(req.params.address);
                              request(
                                { url: 'https://explorer.viacoin.org/api/addr/'+ req.params.address +'/balance'},
                                (error, response, body) => {
                                  if (error || response.statusCode !== 200) {
                                    return res.status(500).json({ type: 'error', message: error });
                                  }
                                  res.send(JSON.stringify(JSON.parse(body), null, 2));

                                  }
                                )
                              });
                              app.get('/viacoin/listunspent/:address', (req, res) => {
                              console.log(req.params.address);
                                request(
                                  { url: 'https://explorer.viacoin.org/api/addr/'+ req.params.address +'/utxo'},
                                  (error, response, body) => {
                                    if (error || response.statusCode !== 200) {
                                      return res.status(500).json({ type: 'error', message: error });
                                    }
                                    res.send(JSON.stringify(JSON.parse(body), null, 2));

                                    }
                                  )
                                });
                                app.get('/viacoin/broadcast/:txhex', (req, res) => {
                                  console.log(req.params.txhex);
                                  request.post({
                                      url: 'https://explorer.viacoin.org/api/tx/send',
                                      body: {rawtx: req.params.txhex},
                                      json: true
                                    }, function(error, response, body){
                                      console.log(body);
                                      res.send(body);

                                    });
                                });
                                app.get('/axecore/balance/:address', (req, res) => {
                                console.log(req.params.address);
                                  request(
                                    { url: 'https://insight.axecore.net/insight-api/addr/'+ req.params.address +'/balance'},
                                    (error, response, body) => {
                                      if (error || response.statusCode !== 200) {
                                        return res.status(500).json({ type: 'error', message: error });
                                      }
                                      res.send(JSON.stringify(JSON.parse(body), null, 2));

                                      }
                                    )
                                  });
                                  app.get('/axecore/listunspent/:address', (req, res) => {
                                  console.log(req.params.address);
                                    request(
                                      { url: 'https://insight.axecore.net/insight-api/addr/'+ req.params.address +'/utxo'},
                                      (error, response, body) => {
                                        if (error || response.statusCode !== 200) {
                                          return res.status(500).json({ type: 'error', message: error });
                                        }
                                        res.send(JSON.stringify(JSON.parse(body), null, 2));

                                        }
                                      )
                                    });
                                    app.get('/axecore/broadcast/:txhex', (req, res) => {
                                      console.log(req.params.txhex);
                                      request.post({
                                          url: 'https://insight.axecore.net/insight-api/tx/send',
                                          body: {rawtx: req.params.txhex},
                                          json: true
                                        }, function(error, response, body){
                                          console.log(body);
                                          res.send(body);

                                        });
                                    });
                                    app.get('/capricoin/balance/:address', (req, res) => {
                                    console.log(req.params.address);
                                      request(
                                        { url: 'https://explorer.capricoin.org/api/addr/'+ req.params.address +'/balance'},
                                        (error, response, body) => {
                                          if (error || response.statusCodhttps://explorer.capricoin.org/api/ 200) {
                                            return res.status(500).json({ type: 'error', message: error });
                                          }
                                          res.send(JSON.stringify(JSON.parse(body), null, 2));

                                          }
                                        )
                                      });
                                      app.get('/capricoin/listunspent/:address', (req, res) => {
                                      console.log(req.params.address);
                                        request(
                                          { url: 'https://explorer.capricoin.org/api/addr/'+ req.params.address +'/utxo'},
                                          (error, response, body) => {
                                            if (error || response.statusCode !== 200) {
                                              return res.status(500).json({ type: 'error', message: error });
                                            }
                                            res.send(JSON.stringify(JSON.parse(body), null, 2));

                                            }
                                          )
                                        });
                                        app.get('/capricoin/broadcast/:txhex', (req, res) => {
                                          console.log(req.params.txhex);
                                          request.post({
                                              url: 'https://explorer.capricoin.org/api/tx/send',
                                              body: {rawtx: req.params.txhex},
                                              json: true
                                            }, function(error, response, body){
                                              console.log(body);
                                              res.send(body);

                                            });
                                        });
                                        app.get('/zcash/balance/:address', (req, res) => {
                                        console.log(req.params.address);
                                          request(
                                            { url: 'https://zecblockexplorer.com/api/addr/'+ req.params.address +'/balance'},
                                            (error, response, body) => {
                                              if (error || response.statusCodhttps://explorer.capricoin.org/api/ 200) {
                                                return res.status(500).json({ type: 'error', message: error });
                                              }
                                              res.send(JSON.stringify(JSON.parse(body), null, 2));

                                              }
                                            )
                                          });
                                          app.get('/zcash/listunspent/:address', (req, res) => {
                                          console.log(req.params.address);
                                            request(
                                              { url: 'https://zecblockexplorer.com/api/addr/'+ req.params.address +'/utxo'},
                                              (error, response, body) => {
                                                if (error || response.statusCode !== 200) {
                                                  return res.status(500).json({ type: 'error', message: error });
                                                }
                                                res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                }
                                              )
                                            });
                                            app.get('/zcash/broadcast/:txhex', (req, res) => {
                                              console.log(req.params.txhex);
                                              request.post({
                                                  url: 'https://zecblockexplorer.com/api/tx/send',
                                                  body: {rawtx: req.params.txhex},
                                                  json: true
                                                }, function(error, response, body){
                                                  console.log(body);
                                                  res.send(body);

                                                });
                                            });
                                            app.get('/commercium/balance/:address', (req, res) => {
                                            console.log(req.params.address);
                                              request(
                                                { url: 'https://explorer.commercium.net/api/addr/'+ req.params.address +'/balance'},
                                                (error, response, body) => {
                                                  if (error || response.statusCodhttps://explorer.capricoin.org/api/ 200) {
                                                    return res.status(500).json({ type: 'error', message: error });
                                                  }
                                                  res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                  }
                                                )
                                              });
                                              app.get('/commercium/listunspent/:address', (req, res) => {
                                              console.log(req.params.address);
                                                request(
                                                  { url: 'https://explorer.commercium.net/api/addr/'+ req.params.address +'/utxo'},
                                                  (error, response, body) => {
                                                    if (error || response.statusCode !== 200) {
                                                      return res.status(500).json({ type: 'error', message: error });
                                                    }
                                                    res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                    }
                                                  )
                                                });
                                                app.get('/commercium/broadcast/:txhex', (req, res) => {
                                                  console.log(req.params.txhex);
                                                  request.post({
                                                      url: 'https://explorer.commercium.net/api/tx/send',
                                                      body: {rawtx: req.params.txhex},
                                                      json: true
                                                    }, function(error, response, body){
                                                      console.log(body);
                                                      res.send(body);

                                                    });
                                                });

                                                app.get('/globaltoken/balance/:address', (req, res) => {
                                                console.log(req.params.address);
                                                  request(
                                                    { url: 'https://explorer.globaltoken.org/api/addr/'+ req.params.address +'/balance'},
                                                    (error, response, body) => {
                                                      if (error || response.statusCodhttps://explorer.capricoin.org/api/ 200) {
                                                        return res.status(500).json({ type: 'error', message: error });
                                                      }
                                                      res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                      }
                                                    )
                                                  });
                                                  app.get('/globaltoken/listunspent/:address', (req, res) => {
                                                  console.log(req.params.address);
                                                    request(
                                                      { url: 'https://explorer.globaltoken.org/api/addr/'+ req.params.address +'/utxo'},
                                                      (error, response, body) => {
                                                        if (error || response.statusCode !== 200) {
                                                          return res.status(500).json({ type: 'error', message: error });
                                                        }
                                                        res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                        }
                                                      )
                                                    });
                                                    app.get('/globaltoken/broadcast/:txhex', (req, res) => {
                                                      console.log(req.params.txhex);
                                                      request.post({
                                                          url: 'https://explorer.globaltoken.org/api/tx/send',
                                                          body: {rawtx: req.params.txhex},
                                                          json: true
                                                        }, function(error, response, body){
                                                          console.log(body);
                                                          res.send(body);

                                                        });
                                                    });

                                                    app.get('/zcoin/balance/:address', (req, res) => {
                                                    console.log(req.params.address);
                                                      request(
                                                        { url: 'https://explorer.zcoin.io/api/addr/'+ req.params.address +'/balance'},
                                                        (error, response, body) => {
                                                          if (error || response.statusCodhttps://explorer.capricoin.org/api/ 200) {
                                                            return res.status(500).json({ type: 'error', message: error });
                                                          }
                                                          res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                          }
                                                        )
                                                      });
                                                      app.get('/zcoin/listunspent/:address', (req, res) => {
                                                      console.log(req.params.address);
                                                        request(
                                                          { url: 'https://explorer.zcoin.io/api/addr/'+ req.params.address +'/utxo'},
                                                          (error, response, body) => {
                                                            if (error || response.statusCode !== 200) {
                                                              return res.status(500).json({ type: 'error', message: error });
                                                            }
                                                            res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                            }
                                                          )
                                                        });
                                                        app.get('/zcoin/broadcast/:txhex', (req, res) => {
                                                          console.log(req.params.txhex);
                                                          request.post({
                                                              url: 'https://explorer.zcoin.io/api/tx/send',
                                                              body: {rawtx: req.params.txhex},
                                                              json: true
                                                            }, function(error, response, body){
                                                              console.log(body);
                                                              res.send(body);

                                                            });
                                                        });

                                                        app.get('/qtum/balance/:address', (req, res) => {
                                                        console.log(req.params.address);
                                                          request(
                                                            { url: 'https://explorer.qtum.org/insight-api/addr/'+ req.params.address +'/balance'},
                                                            (error, response, body) => {
                                                              if (error || response.statusCodhttps://explorer.capricoin.org/api/ 200) {
                                                                return res.status(500).json({ type: 'error', message: error });
                                                              }
                                                              res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                              }
                                                            )
                                                          });
                                                          app.get('/qtum/listunspent/:address', (req, res) => {
                                                          console.log(req.params.address);
                                                            request(
                                                              { url: 'https://explorer.qtum.org/insight-api/addr/'+ req.params.address +'/utxo'},
                                                              (error, response, body) => {
                                                                if (error || response.statusCode !== 200) {
                                                                  return res.status(500).json({ type: 'error', message: error });
                                                                }
                                                                res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                                }
                                                              )
                                                            });
                                                            app.get('/qtum/broadcast/:txhex', (req, res) => {
                                                              console.log(req.params.txhex);
                                                              request.post({
                                                                  url: 'https://explorer.qtum.org/insight-api/tx/send',
                                                                  body: {rawtx: req.params.txhex},
                                                                  json: true
                                                                }, function(error, response, body){
                                                                  console.log(body);
                                                                  res.send(body);

                                                                });
                                                            });

                                                            app.get('/ilcoin/balance/:address', (req, res) => {
                                                            console.log(req.params.address);
                                                              request(
                                                                { url: 'https://ilcoinexplorer.com/api/addr/'+ req.params.address +'/balance'},
                                                                (error, response, body) => {
                                                                  if (error || response.statusCodhttps://explorer.capricoin.org/api/ 200) {
                                                                    return res.status(500).json({ type: 'error', message: error });
                                                                  }
                                                                  res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                                  }
                                                                )
                                                              });
                                                              app.get('/ilcoin/listunspent/:address', (req, res) => {
                                                              console.log(req.params.address);
                                                                request(
                                                                  { url: 'https://ilcoinexplorer.com/api/addr/'+ req.params.address +'/utxo'},
                                                                  (error, response, body) => {
                                                                    if (error || response.statusCode !== 200) {
                                                                      return res.status(500).json({ type: 'error', message: error });
                                                                    }
                                                                    res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                                    }
                                                                  )
                                                                });
                                                                app.get('/ilcoin/broadcast/:txhex', (req, res) => {
                                                                  console.log(req.params.txhex);
                                                                  request.post({
                                                                      url: 'https://ilcoinexplorer.com/api/tx/send',
                                                                      body: {rawtx: req.params.txhex},
                                                                      json: true
                                                                    }, function(error, response, body){
                                                                      console.log(body);
                                                                      res.send(body);

                                                                    });
                                                                });

                                                                app.get('/smartcash/balance/:address', (req, res) => {
                                                                console.log(req.params.address);
                                                                  request(
                                                                    { url: 'https://explorer.smartcash.cc/api/addr/'+ req.params.address +'/balance'},
                                                                    (error, response, body) => {
                                                                      if (error || response.statusCodhttps://explorer.capricoin.org/api/ 200) {
                                                                        return res.status(500).json({ type: 'error', message: error });
                                                                      }
                                                                      res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                                      }
                                                                    )
                                                                  });
                                                                  app.get('/smartcash/listunspent/:address', (req, res) => {
                                                                  console.log(req.params.address);
                                                                    request(
                                                                      { url: 'https://explorer.smartcash.cc/api/addr/'+ req.params.address +'/utxo'},
                                                                      (error, response, body) => {
                                                                        if (error || response.statusCode !== 200) {
                                                                          return res.status(500).json({ type: 'error', message: error });
                                                                        }
                                                                        res.send(JSON.stringify(JSON.parse(body), null, 2));

                                                                        }
                                                                      )
                                                                    });
                                                                    app.get('/smartcash/broadcast/:txhex', (req, res) => {
                                                                      console.log(req.params.txhex);
                                                                      request.post({
                                                                          url: 'https://explorer.smartcash.cc/api/tx/send',
                                                                          body: {rawtx: req.params.txhex},
                                                                          json: true
                                                                        }, function(error, response, body){
                                                                          console.log(body);
                                                                          res.send(body);

                                                                        });
                                                                    });
      app.get('/pandacoin/broadcast/:txhex', (req, res) => {
        console.log(req.params.txhex);
        request.post({
            url: 'https://chainz.cryptoid.info/pnd/api.dws?q=pushtx',
            data: req.params.txhex,
          //  json: true
          }, function(error, response, body){
            console.log(body);
            res.send(body);
          });
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
