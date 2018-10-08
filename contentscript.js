var secret = "";

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var observer = new MutationObserver(function(mutations, observer) {
  searchData();
});
observer.observe(document, {
  subtree: true,
  attributes: true,
  childList: true
});

function searchData() {
  // text inside paragraph
  $('p:contains("fa|"):contains("|af")').each(function() {
    process(this);
  });

  // text inside span
  $('span:contains("fa|"):contains("|af")').each(function() {
    process(this);
  })

  function process(thats) {
    var value = $(thats).html();
    var color = $(thats).css('color');
    // little hack :P
    if (color == 'rgb(0, 170, 0)' || color == "rgb(170, 0, 0)") {
      // skip`
    } else {

      try {
        var encrypted = value.substring(3, value.length-3);
        chrome.storage.sync.get("secret", function(result) {
          secret = result['secret'];
          var decrypted = CryptoJS.AES.decrypt(encrypted, secret);
          if (decrypted != "") {
            // success decrypt
            try {
              $(thats).css("color", "#0A0");
              $(thats).html(decrypted.toString(CryptoJS.enc.Utf8));
            } catch(e) {
              $(thats).css("color", "#A00");
              console.log("Failed to decrypt, maybe invalid secret key");
            }

          } else {
            // fail decrypt
            $(thats).css("color", "#A00");
          }
        });

      } catch(err) {
        $(thats).css("color", "#A00");
        console.log("Failed to decrypt, maybe invalid secret key");
      }
    }
  }


}
