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
exports.pageLoaded = function (args) {
    console.log("pageLoaded!");

    console.log("Traer datos")
    //traer datos
    httpModule.getJSON("http://192.168.1.71:3000/API/todos").then((r) => {
        console.log("data ", r)
        observableData = new observableModule(r.result)

        page.bindingContext = {myItems: observableData}
    }, (e) => {
        console.log("data e ", e)
    });

    const page = args.object;
    page.bindingContext = mainViewModel;
}


function createViewModel() {


}
function navigatingTo(args) {

    // Will not work!
}

exports.navigatingTo = navigatingTo;


exports.onItemTap = function (args) {
    const view = args.view;
    const context = view.bindingContext;

    console.log("You tapped: ", context);
}

function editar(args) {
    const button = args.object;
    console.log("Button editar ", button.id);

    prompt("Your message", "Default text").then((r) => {
        console.log("Dialog result: ", r.result);
        console.log("Text: ", r.text);
    });
}

exports.editar = editar;

function eliminar(args) {
    const button = args.object;
    console.log("Button eliminar ", button.id);
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


exports.eliminar = eliminar;


function agregar(args) {
    var navigationOptions = {
        moduleName: 'create/create-page',
        context: {p1: "uno", p2: 2}
    }

    frameModule.topmost().navigate(navigationOptions)
}

exports.agregar = agregar
/*
function onNavigatingTo(args) {
    const page = args.object;
    console.log("page " , args.object)
    page.bindingContext = { myItems: [{ name: "Name1" }, { name: "Name2" }, { name: "Name3" }] };

    // Will work!

    //const container = page.getViewById("container");
    // >> create-list-view-code
    const listView = new listViewModule.ListView();
    listView.className = "list-group";
    listView.items = listViewArray;
    // The itemLoading event is used to create the UI for each item that is shown in the ListView.
    listView.on(listViewModule.ListView.itemLoadingEvent, (args) => {
        if (!args.view) {
            // Create label if it is not already created.
            args.view = new labelModule.Label();
            args.view.className = "list-group-item";
        }
        (args.view).text = listViewArray.getItem(args.index).title;

    });
    listView.on(listViewModule.ListView.itemTapEvent, (args) => {
        // getting the index of the selected item
        const tappedItemIndex = args.index;
        // getting the view of the selected ListVies's item
        // let tappedItemView = args.view;
        dialogs.alert(`Second ListView item tap ${tappedItemIndex}`)
            .then(() => {
                console.log("Dialog closed!");
            });
    });
    // << create-list-view-code
    var container = view.getViewById(page, "container");

    console.log("container " , container)
    console.log("list " , listView)
    container.addChild(listView);
}
exports.onNavigatingTo = onNavigatingTo;*/
