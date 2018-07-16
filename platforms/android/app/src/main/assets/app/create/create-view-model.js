var observableModule = require("data/observable");
var dialogs = require("ui/dialogs");
const ObservableArray = require("data/observable-array").ObservableArray;


function MainViewModel() {
    var viewModel = observableModule.fromObject({
        onEmailSend: function () {


            //validar

            //traer datos

            //mostrar


            /*  // basic validation
              if (!this.get("subject") || !this.get("message") || !this.get("toEmail")) {
                  return;
              }

              // send to email client
              var ccEmail = "";
              if (this.get("ccEmail")) {
                  ccEmail = this.get("ccEmail").split(" ");
              }

              var bccEmail = "";
              if (this.get("bccEmail")) {
                  bccEmail = this.get("bccEmail").split(" ");
              }

              email.compose({
                  subject: this.get("subject"),
                  body: this.get("message"),
                  to: this.get("toEmail").split(" "),
                  cc: ccEmail,
                  bcc: bccEmail,
              }).then(
                  function () {
                      alert("Email composer closed!");
                  }, function (err) {
                      alert("Error: " + err);
                  });*/
        },
        data: new ObservableArray([
            {text: "Bulbasaur", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"},
            {text: "Kakuna", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png"},
            {text: "Beedrill", src: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"}
        ])
    });




    return viewModel;
}

module.exports = MainViewModel;
