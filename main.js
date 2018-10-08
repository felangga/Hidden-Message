var secret = "";

$(function(){
  chrome.storage.sync.get("secret", function(result) {
    secret = result['secret'];
    $("#inpSecret").val(secret);
  });

  $("#inpSecret").change(function() {
    secret =  $("#inpSecret").val();

    if (secret.length > 0) {
      // save secret Key
      chrome.storage.sync.set({
        'secret': secret
      }, function(result) {
        if (chrome.runtime.error) {
          console.log("Failed to save private key. " + chrome.runtime.error);
        } 
      })
    } else {
      alert("You must enter yout secret key");
    }
  });

  $("#inpEncrypt").keyup(function() {
    var encrypt = "fa|"+CryptoJS.AES.encrypt($("#inpEncrypt").val(), secret) + "|af";
    $("#inpOutput").val(encrypt);
  });
})
