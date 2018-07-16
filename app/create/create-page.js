const textFieldModule = require("tns-core-modules/ui/text-field");
var frameModule = require("ui/frame");
var CreateViewModel = require("./create-view-model");
const httpModule = require("http");
var observableModule = require("data/observable");
var view = require("tns-core-modules/ui/core/view");
const Button = require("tns-core-modules/ui/button").Button;

var createViewModel = new CreateViewModel();
const vm = new observableModule.Observable();

function pageLoaded(args) {
    //console.log("create args ", args)
    const page = args.object;
    page.bindingContext = createViewModel;
};

function onNavBtnTap() {
    //console.log("Navigation button tapped!");
    salir()
}

function salir() {
    var navigationOptions
    navigationOptions.moduleName = 'main/main-page'
    navigationOptions.context = {p1: "uno", p2: 2}
    frameModule.topmost().navigate(navigationOptions)
}

function firstTfLoaded(args) {
    const firstTextfield = args.object;
    setTimeout(() => {
        firstTextfield.focus(); // Shows the soft input method, ususally a soft keyboard.
    }, 100);
}

function onBtnReturnPress(args) {
    var sender = args.object;
    var parent = sender.parent;
    if (parent) {
        var textField = view.getViewById(parent, "texto");
        if (textField) {
            setTimeout(() => {
                textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
            }, 100);
            console.log("texto ", textField.text)
            salvar(textField.text)
        }
    }
}

function onReturnPress(args) {
    // returnPress event will be triggered when user submits a value
    //console.log("onReturnPress ")
    const textField = args.object;
    setTimeout(() => {
        textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
    }, 100);
    salvar(textField.text);
}

function salvar(texto) {
    httpModule.request({
        url: "http://192.168.1.71:3000/API/crear",
        method: "POST",
        headers: {"Content-Type": "application/json"},
        content: JSON.stringify({
            texto: texto
        })
    }).then((response) => {
        //console.log("data ", response.content.toJSON());
        salir();
    }, (e) => {
        console.log("data e ", e)
    });
}

function onFocus(args) {
    // focus event will be triggered when the users enters the TextField
    //console.log("onFocus event");
}

function onBlur(args) {
    // blur event will be triggered when the user leaves the TextField
    const textField = args.object;
    textField.dismissSoftInput();
    //console.log("onBlur event");
}

exports.onNavBtnTap = onNavBtnTap;
exports.firstTfLoaded = firstTfLoaded;
exports.firstTfLoaded = firstTfLoaded;
exports.onReturnPress = onReturnPress;
exports.onBtnReturnPress = onBtnReturnPress;
exports.onFocus = onFocus;
exports.onBlur = onBlur;
exports.onNavBtnTap = onNavBtnTap;
exports.pageLoaded = pageLoaded;