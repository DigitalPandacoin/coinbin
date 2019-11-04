$(document).ready(function() {
function myFunction(e) {
  if (document.getElementById("customCoinName").value == "ppc") {
    document.getElementById("coinjs_pub").value = "0x37";
    document.getElementById("coinjs_priv").value = "0xB7";
    document.getElementById("coinjs_multisig").value = "0x75";
    document.getElementById("coinLogo").src = "images/logo/ppc.png";
    document.getElementById("bTtitle").textContent = "PeerCoin";
    document.getElementById("bTtitle1").textContent = "PeerCoin";
    var tickerCode = "PPC";
  }
  else if (document.getElementById("customCoinName").value == "vtc") {
    document.getElementById("coinjs_pub").value = "0x47";
    document.getElementById("coinjs_priv").value = "0xc7";
    document.getElementById("coinjs_multisig").value = "0x05";
    document.getElementById("coinLogo").src = "images/logo/vtc.png";
    var tickerCode = "VTC";
  }
  else if (document.getElementById("customCoinName").value == "pnd") {
    document.getElementById("coinjs_pub").value = "0x37";
    document.getElementById("coinjs_priv").value = "0xB7";
    document.getElementById("coinjs_multisig").value = "0x16";
    document.getElementById("coinLogo").src = "images/logo/pnd.png";
    var tickerCode = "PND";
  }
  else if (document.getElementById("customCoinName").value == "funk") {
    document.getElementById("coinjs_pub").value = "0x1c";
    document.getElementById("coinjs_priv").value = "0x9c";
    document.getElementById("coinjs_multisig").value = "0x3f";
    document.getElementById("coinLogo").src = "images/logo/funk.png";
    var tickerCode = "FUNK";
  }
  else if (document.getElementById("customCoinName").value == "zeit") {
    document.getElementById("coinjs_pub").value = "0x33";
    document.getElementById("coinjs_priv").value = "0xb3";
    document.getElementById("coinjs_multisig").value = "0x05";
    document.getElementById("coinLogo").src = "images/logo/zeit.png";
    var tickerCode = "ZEIT";
  }
  else if (document.getElementById("customCoinName").value == "ltc") {
    document.getElementById("coinjs_pub").value = "0x30";
    document.getElementById("coinjs_priv").value = "0xB0";
    document.getElementById("coinjs_multisig").value = "0x05";
    document.getElementById("coinLogo").src = "images/logo/litecoin.png";
    var tickerCode = "LTC";
  }
  else {}
}
})
