var MainViewModel = require("./main-view-model");
var observableModule = require("data/observable");
const listViewModule = require("tns-core-modules/ui/list-view");
var frameModule = require("ui/frame");
const observableArrayModule = require("tns-core-modules/data/observable-array");
const labelModule = require("tns-core-modules/ui/label");
const dialogs = require("tns-core-modules/ui/dialogs");
var view = require("tns-core-modules/ui/core/view");
const httpModule = require("http");
var ObservableArray = require("data/observable-array").ObservableArray;

var mainViewModel = new MainViewModel();
var observableData = new observableArrayModule.ObservableArray()

function descargarRegistros(callback){
    //console.log("Traer datos")
    //traer datos
    httpModule.getJSON("http://192.168.1.71:3000/API/todos").then((result) => {
        //console.log("data ", result)
        callback(true,result)
    }, (e) => {
        //console.log("data e ", e)
        callback(false)
    });
}

function pageLoaded(args) {
    //console.log("pageLoaded!");

    const page = args.object;
    page.bindingContext = mainViewModel;
}

function onItemTap(args) {
    const view = args.view;
    const context = view.bindingContext;

    //console.log("Has tocado: ", context);
}

function editar(args) {
    const button = args.object;
    //console.log("Button editar ", button.id);
    //TODO Falta probar
    prompt("Your message", "Default text").then((r) => {
        console.log("Dialog result: ", r.result);
        console.log("Text: ", r.text);
    });
}


function eliminar(args) {
    const button = args.object;
    //console.log("Button eliminar ", button.id);
    var id = button.id
    confirm({
        title: "Eliminar tarea",
        message: "Confirmar eliminar tarea de la lista",
        okButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        console.log("Dialog result: ", result);
        if (result === true) {
            httpModule.request({
                url: "http://192.168.1.71:3000/API/eliminar",
                method: "POST",
                headers: {"Content-Type": "application/json"},
                content: JSON.stringify({
                    id: id
                })
            }).then((response) => {
                console.log("data ", response.content.toJSON());

                console.log("antes", observableData.length)
                for (var i = 0; i < observableData.length; i++) {
                    if (observableData[i].id.toString() == id.toString()) {
                        console.log("encontrado ")
                        delete observableData[i]
                    }
                }
                console.log("despues", observableData.length)

                page.bindingContext = {myItems: observableData}
            }, (e) => {
                console.log("data e ", e)
            });
        }
    });
}

function agregar(args) {
    var navigationOptions
    navigationOptions.moduleName ='create/create-page'
    navigationOptions.context = {p1: "uno", p2: 2}

    frameModule.topmost().navigate(navigationOptions)
}

exports.eliminar = eliminar;
exports.agregar = agregar
exports.editar = editar;
exports.onItemTap = onItemTap;
exports.pageLoaded = pageLoaded;