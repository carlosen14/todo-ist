var observableModule = require("data/observable");
//var email = require("../nativescript-email");
var dialogs = require("ui/dialogs");
const ObservableArray = require("data/observable-array").ObservableArray;
const httpModule = require("http");

function MainViewModel() {
    var viewModel = observableModule.fromObject({
        onEmailSend: function () {
        }
    });
    return viewModel;
}

module.exports  = MainViewModel;
