        if(host=='chain.so_bitcoinmainnet'){
          $.ajax ({
      			type: "GET",
      			url: "https://chain.so/api/v2/get_tx_unspent/btc/"+address,
      			dataType: "json",
      			error: function(data) {
      				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! doge test');
      			},
      			success: function(data) {
      				if((data.status && data.data) && data.status=='success'){
      					$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+address+'" target="_blank">'+address+'</a>');
      					for(var i in data.data.txs){
      						var o = data.data.txs[i];
      						var tx = ((""+o.txid).match(/.{1,2}/g).reverse()).join("")+'';
      						if(tx.match(/^[a-f0-9]+$/)){
      							var n = o.output_no;
      							var script = (redeem.redeemscript==true) ? redeem.decodedRs : o.script_hex;
      							var amount = o.value;
      							addOutput(tx, n, script, amount);
      						}
      					}
      				} else {
      					$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs. doge test');
      				}
      			},
      			complete: function(data, status) {
      				$("#redeemFromBtn").html("Load").attr('disabled',false);
      				totalInputAmount();
      			}
      		});
        } else if(host=='chain.so_litecoin'){
          $.ajax ({
            type: "GET",
            url: "https://chain.so/api/v2/get_tx_unspent/ltc/"+address,
            dataType: "json",
            error: function(data) {
              $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! doge test');
            },
            success: function(data) {
              if((data.status && data.data) && data.status=='success'){
                $("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+address+'" target="_blank">'+address+'</a>');
                for(var i in data.data.txs){
                  var o = data.data.txs[i];
                  var tx = ((""+o.txid).match(/.{1,2}/g).reverse()).join("")+'';
                  if(tx.match(/^[a-f0-9]+$/)){
                    var n = o.output_no;
                    var script = (redeem.redeemscript==true) ? redeem.decodedRs : o.script_hex;
                    var amount = o.value;
                    addOutput(tx, n, script, amount);
                  }
                }
              } else {
                $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs. doge test');
              }
            },
            complete: function(data, status) {
              $("#redeemFromBtn").html("Load").attr('disabled',false);
              totalInputAmount();
            }
          });
        } else if(host=='digiexplorer.info'){
          $.ajax ({
      			type: "GET",
      			url: "https://digiexplorer.info/api/addr/"+address+"/utxo",
      			dataType: "json",
      			error: function(data) {
      				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
      			},
      			success: function(data) {
      				if(data && data.length){
      					$("#redeemFromAddress").removeClass('hidden').html(
      						'<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+address+'" target="_blank">'+address+'</a>');
      						for(var i in data){
      							var o = data[i];
      							var tx = o.txid;
      							var n = o.vout;
      							var script = (redeem.isMultisig==true) ? $("#redeemFrom").val() : o.scriptPubKey;
      							var amount = o.amount;
      							addOutput(tx, n, script, amount);
      						}
      				} else {
      					$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs.');
      				}
      			},
      			complete: function(data, status) {
      				$("#redeemFromBtn").html("Load").attr('disabled',false);
      				totalInputAmount();
      			}
      		});
        } else if(host=='blockcypher_bitcoinmainnet'){
        } else if(host=='blockcypher_litecoin'){
        } else if(host=='blockcypher_dogecoin'){
        } else if(host=='blockchair_bitcoinmainnet'){
        } else if(host=='blockchair_litecoin'){
        } else if(host=='cryptoid.info_carboncoin'){
          $.ajax ({
      			type: "POST",
      			url: "https://coinb.in/api/",
      			data: 'uid='+coinjs.uid+'&key='+coinjs.key+'&setmodule=carboncoin&request=listunspent&address='+address,
      			dataType: "xml",
      			error: function() {
      				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs! carbon test');
      			},
                              success: function(data) {

      				if($(data).find("result").text()==1){
      					$("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+address+'" target="_blank">'+address+'</a>');
      					$.each($(data).find("unspent").children(), function(i,o){
      						var tx = $(o).find("tx_hash").text();
      						var n = $(o).find("tx_output_n").text();
      						var script = (redeem.redeemscript==true) ? redeem.decodedRs : o.script_hex;
      						var amount = (($(o).find("value").text()*1)/100000000).toFixed(8);
                              addOutput(tx, n, script, amount);
      					});
      				} else {
      					$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs. carbon test');
      				}
      			},
      			complete: function(data, status) {
      				$("#redeemFromBtn").html("Load").attr('disabled',false);
      				totalInputAmount();
      			}
      		});
        } else if(host=='cryptoid.info_pandacoin'){
          $.ajax ({
            type: "GET",
            url: "https://chainz.cryptoid.info/pnd/api.dws?q=unspent&key=1a9c92c7492b&active="+ address + "",
            dataType: "json",
            error: function() {
              $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> '+ url + 'Unexpected error, unable to retrieve unspent outputs! pnd test function error');
            },

            success: function(data) {
              $("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+address+'" target="_blank">'+address+'</a>');
              data.unspent_outputs.forEach(function(item, i) {
                var tx_hash = item.tx_hash;
                var tx_ouput_n = item.tx_ouput_n;
                var value = item.value /100000000;
                var confirms = item.confirmations;
                var script = item.script;
                var addr = item.addr;
                addOutput(tx_hash, tx_ouput_n, script, value);
              });
            },

            complete: function(data, status) {
              $("#redeemFromBtn").html("Load").attr('disabled',false);
              totalInputAmount();
            }
          });
        } else if(host=='cryptoid.info_cypherfunk'){
          $.ajax ({
      			type: "GET",
      			url: "https://chainz.cryptoid.info/funk/api.dws?q=unspent&active="+ address + "&key=1a9c92c7492b",
      			dataType: "json",
      			error: function(data) {
      				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
      			},
      			success: function(data) {
                      console.log(data)
      					$("#redeemFromAddress").removeClass('hidden').html(
      						'<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+address+'" target="_blank">'+address+'</a>');
      				data.unspent_outputs.forEach(function(item, i) {
                          var tx_hash = item.tx_hash;
                          var tx_ouput_n = item.tx_ouput_n;
                          var value = item.value /100000000;
                          var confirms = item.confirmations;
                          console.log(confirms)
                          var script = item.script;
                          var addr = item.addr;
                          console.log(addr)
                          console.log(tx_hash, tx_ouput_n, script, value)
                          addOutput(tx_hash, tx_ouput_n, script, value);
                          });
      			},
      			complete: function(data, status) {
      				$("#redeemFromBtn").html("Load").attr('disabled',false);
      				totalInputAmount();
      			}
      		});
        } else if(host=='cryptoid.info_zeitcoin'){
          $.ajax ({
      			type: "GET",
      			url: "https://chainz.cryptoid.info/zeit/api.dws?q=unspent&active="+ address + "&key=1a9c92c7492b",
      			dataType: "json",
      			error: function(data) {
      				$("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> Unexpected error, unable to retrieve unspent outputs!');
      			},
      			success: function(data) {
                      console.log(data)
      					$("#redeemFromAddress").removeClass('hidden').html(
      						'<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+address+'" target="_blank">'address'</a>');
      				data.unspent_outputs.forEach(function(item, i) {
                          var tx_hash = item.tx_hash;
                          var tx_ouput_n = item.tx_ouput_n;
                          var value = item.value /100000000;
                          var confirms = item.confirmations;
                          console.log(confirms)
                          var script = item.script;
                          var addr = item.addr;
                          console.log(addr)
                          console.log(tx_hash, tx_ouput_n, script, value)
                          addOutput(tx_hash, tx_ouput_n, script, value);
                          });
      			},
      			complete: function(data, status) {
      				$("#redeemFromBtn").html("Load").attr('disabled',false);
      				totalInputAmount();
      			}
      		});
        } else {
          $.ajax ({
            type: "GET",
            url: "https://chainz.cryptoid.info/pnd/api.dws?q=unspent&key=1a9c92c7492b&active="+ address + "",
            dataType: "json",
            error: function() {
              $("#redeemFromStatus").removeClass('hidden').html('<span class="glyphicon glyphicon-exclamation-sign"></span> '+ url + 'Unexpected error, unable to retrieve unspent outputs! pnd test function error');
            },

            success: function(data) {
              $("#redeemFromAddress").removeClass('hidden').html('<span class="glyphicon glyphicon-info-sign"></span> Retrieved unspent inputs from address <a href="'+explorer_addr+address+'" target="_blank">'+address+'</a>');
              data.unspent_outputs.forEach(function(item, i) {
                var tx_hash = item.tx_hash;
                var tx_ouput_n = item.tx_ouput_n;
                var value = item.value /100000000;
                var confirms = item.confirmations;
                var script = item.script;
                var addr = item.addr;
                addOutput(tx_hash, tx_ouput_n, script, value);
              });
            },

            complete: function(data, status) {
              $("#redeemFromBtn").html("Load").attr('disabled',false);
              totalInputAmount();
            }
          });
        }
