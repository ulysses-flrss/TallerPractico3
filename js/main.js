let selectMarca = document.getElementById("marca-select")
let selectModelo = document.getElementById("modelo-select")

//Definicion de arreglos con nombres de modelos de cada marca
let ford = ["Fiesta", "Focus", "Explorer", "Ranger", "Ford GT", "EcoSport", "Puma", "Galaxy"],
    toyota = ["Corolla", "Hilux", "Tercel", "Land Cruisier", "RAV4", "Supra", "Tacoma", "Rush"],
    nissan = ["Sentra", "Versa", "Maxima", "Silvia", "Juke", "Rogue", "Pathfinder", "Skyline"],
    chevrolet = ["Aveo", "X-Trail", "Camaro", "Blazer", "Celta", "Cavalier", "Sonic", "Spark"],
    pontiac = ["Vibe GT", "Vibe", "G5", "Aztek", "Grand Prix", "Grand Am", "Solstice", "Sunfire"],
    honda = ["Civic", "Accord", "CR-V", "HR-V", "City", "Pilot", "Passport", "Odyssey"],
    hyundai = ["Elantra", "Accent", "Santa Fe", "Tucson", "Creta", "Palisade", "i10 HB", "i10 SD"],
    mercedez = ["Clase A", "Clase B", "Clase C", "Clase D", "Clase E", "Clase S", "Clase CLA", "Clase CLS"],
    tesla = ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y", "Roadster"],
    dodge = ["Challeger", "Charger", "Durgano", "Journey", "Grand Caravan", "Attitude", "SRT"],
    jeep = ["Renegade", "Cherokee", "Compass", "Gladiator", "Wrangler", "Grand Cherokee"],
    cadillac = ["ATS", "CT6", "CTS", "SRX", "Escalade", "XT5"],
    bmw = ["Serie 1", "Serie 2", "Serie 3", "Serie 4", "Serie 5", "Serie 7", "Serie 8", "Serie X"],
    audi = ["R8 Spyder", "Q3", "A1", "A3", "A4", "Q5", "TT", "RS"],
    volkswagen = ["Golf", "Cheetah", "Amarok", "Arteon", "Beetle", "Caddy", "California", "Crafter"],
    volvo = ["XC-40", "XC-60", "XC-90", "V60", "V90", "S60", "S90", "V60 Cross Country"],
    peugeot = ["Partner", "RCZ", "5008", "Rifter", "Traveller", "2008", "Bipper", "iOn"],
    mitsubishi = ["Lancer", "Eclipse", "L200", "Outlander", "ASX", "Canter", "Montero", "Space Star"],
    mazda = ["Mazda 3", "Mazda 5", "Mazda CX-3", "Mazda CX-5", "Mazda CX-7", "Mazda 6", "Mazda CX-30", "Mazda CX-50"]

selectMarca.addEventListener("change", showModels)


// Boton para crear elemento en la tabla
const btn_create = document.querySelector('.create'),
    // Contenedor (Ul) para la paginacion
    paginationUl = document.querySelector('.pagination ul'),
    // Input para el nombre
    input_nombre = document.querySelector('.nombre'),
    // Input para la dui
    input_dui = document.querySelector('.dui'),
    // Input para la NIT
    input_nit = document.querySelector('.nit'),
    // Input para la Marca del automovil
    input_marca = document.querySelector('#marca-select')
    // Input para el modelo
    input_modelo = document.querySelector('#modelo-select')
    // Input para el año
    input_annio = document.querySelector('#anio-modelo')
    // Input para el color
    input_color = document.querySelector('#color')
    // Input para la placa
    input_placa = document.querySelector('#placa')
    // Input para las fallas
    input_fallas = document.querySelector('#fallas')
    // Obtener la informacion almacenada con localStorage
    getData = localStorage.getItem('data'),
    // Contenedor para mostrar mensajes
    containerPopupMessages = document.querySelector('.container-popup-messages');
/* 
     Funcion para mostrar los mensajes emergentes de aviso
   - Titulo del mensaje
   - Descripcion del mensaje
   - Tipo del mensaje (de error, de actualizacion,etc...)
*/
function message(title, descr, type) {
    // type_message almacenara un nombre que se utilizara como una clase para el mensaje
    let type_message = '';
    // Switch para evaluar distintos casos y asignar un valor a type_message
    switch (type) {
        case 'error':
            type_message = 'error-message';
            break;
        case 'update':
            type_message = 'update-message'
            break;
        case 'creation':
            type_message = 'creation-message'
            break;
        case 'removal':
            type_message = 'removal-message'
            break;
        default:
            type_message = ''
            break;
    }
    // messageCreating almacena el html del mensaje que despues se retornara cuando sea llamada la funcion
    let messageCreating = //html 
        `
    <div class="message ${type_message}">
    <span class="message-title">
        ${title}
    </span>
    <span class="message-description">
        <p>${descr}</p>
    </span>
    </div>
    `;
    // retornar la variable messageCreating
    return messageCreating;
}
// Funcion para eliminar el mensaje emerjente en derterminado tiempo
function deleteMessage(time) {
    // constante para llamar al elemento en el dom que contenga la clase .message
    const ms = document.querySelector('.message');
    // contador para el intervalo
    let interCount = 0;
    let interval = setInterval(() => {
        interCount++;
        // si se cumple esta condicion entonces: añade una clase al mensaje emerjente para desaparecerlo con una animacion en el css
        if (interCount >= 5) {
            ms.classList.add('hidden-message');
        }
        // si se cumple esta condicion entonces:  remueve el elemento .message en el dom y despues detiene el intervalo para finalizar
        if (interCount >= 10) {
            ms.remove();
            clearInterval(interval);
        }
        // tiempo del intervalo
    }, time);
}

//constante que llama a la tabla en el dom que contenga la clase .table-content
const table_content = document.querySelector('.table-content');
// [elements] almacenara toda la informacion recibida de getData para despues transformarla en JSON, si no existe tal informacion entonces solo crea un array vacio
let elements = (getData) ? JSON.parse(getData) : [];
// array de las id de los elementos que se utilizaran para obtener el id mayor y asi ir creando id autoincrementables
let numArr = [];
// for para obtener la id del array de [elements]
for (let num of elements) {
    // añade solo las id al array vacio [numArr]
    numArr.push(num.id);
}
// lastId almacena el numero mas grande que se encontro en el array [numArr] pero si no hay id entonces se asignara 0
let lastId = (numArr.length > 0) ? Math.max.apply(null, numArr) : 0;
// evento para crear el elemento en la tabla
btn_create.addEventListener('click', function () {
    // obtener los valores en los input y remover los espacios en blanco
    const nombre = input_nombre.value.trim();
    const dui = input_dui.value.trim();
    const nit = input_nit.value.trim();
    const marca = input_marca.value.trim(); 
    const modelo = input_modelo.value.trim(); 
    const annio = input_annio.value.trim(); 
    const color = input_color.value.trim(); 
    const placa = input_placa.value.trim(); 
    const fallas = input_fallas.value.trim(); 
    // si el nombre no esta vacio y edad es un numero:

   /* if (/^[a-zA-Z]$/.test(nombre)) {
        alert("el nombre está malo")
    }

    if (/^\d{8}-\d$/.test(dui)) {
        alert("el dui está malo")
    }

    if (/\d{14}/.test(nit)) {
        alert("el nit está malo")
    }

    if (/^(\d|[A-E]{3})-(\d|[A-E]{3})$/.test(placa)) {
        alert("placa está malo")
    }*/

    if (nombre != '' && !isNaN(dui) && dui != "") {
        lastId++;
        // informacion requerida para la tabla (id,nombre,edad)
        const data = {
            id: lastId,
            nombre: nombre,
            dui: dui,
            nit: nit,
            marca: marca,
            modelo: modelo,
            annio: annio,
            color: color,
            placa: placa,
            fallas: fallas
        }
        // añadir el elemento creado a el array [elements]
        elements.push(data);
        //localStorage: crear con el nombre "data" y de valor los elementos del array convertidos en una cadena de texto
        localStorage.setItem('data', JSON.stringify(elements));
        // "actualizar" la tabla los nuevos elementos creados
        displayElements();
        // acciones de la tabla como: (Actualizar y Eliminar)
        // actionsTable();
        // "limpiar" los input para dejarlos en blanco
        input_nombre.value = '';
        input_dui.value = '';
        input_nit.value = '';
        input_marca.value = '';
        input_modelo.value = '';
        input_annio.value = '';
        input_color.value = '';
        input_placa.value = '';
        input_fallas.value = '';
        // añadir al elemento en el dom (.container-popup-messages)  un nuevo elemento con innerHTML
        containerPopupMessages.innerHTML = message('Creacion completa', `Datos creados Nombre: ${nombre} - dui: ${dui} - nit: ${nit}`, 'creation');
        // eliminar el elemento en el dom previamente creado con un intervalo de tiempo
        deleteMessage(1000);
    } else {
        // Error (el nombre esta vacio o la edad no es un numero)
        containerPopupMessages.innerHTML = message('Completa los campos', 'Hay campos sin rellenar, Asegurese de rellenar correctamente los campos', 'error');
        deleteMessage(1000);
    }
});

//llamar a actionsTable() 
actionsTable();
//funcion acciones de la tabla como: (Actualizar y Eliminar)
function actionsTable() {
    // botones en la tabla para: (Actualizar y Eliminar) los datos
    const btn_update = document.querySelectorAll('.update');
    const btn_delete = document.querySelectorAll('.delete');
    // forEach para recorrer todos los botones de (actualizar)
    btn_update.forEach((btn) => {
        btn.addEventListener('click', function () {
            // id del elmeneto en la tabla
            let id = parseInt(this.querySelector('.itemID').value);
            // map para obtener el indice en el array [elements] para actualizar su informacion
            const index = elements.map(function (e) {
                return e.id;
            }).indexOf(id);
            // tr igual al elemento seleccionado
            let tr = this.parentElement.parentElement;
            let name = tr.querySelector('.itemName').textContent;
            let age = tr.querySelector('.itemdui').textContent;
            let nit = tr.querySelector('.itemnit').textContent;
            let marca = tr.querySelector('.itemnit').textContent;
            let modelo = tr.querySelector('.itemmodelo').textContent;
            let annio = tr.querySelector('.itemn').textContent;
            let color = tr.querySelector('.itemnit').textContent;
            let placa = tr.querySelector('.itemnit').textContent;
            let fallas = tr.querySelector('.itemnit').textContent;
            //problema a solucionar
            let ax = elements.filter(function(item){
                if(item.id == id){
                    if(item.nombre != name || item.dui != age || item.nit != nit || item.marca != marca || item.modelo != modelo){   
                      console.log(item.nombre,item.dui,item.nit,item.marca)
                     return true;
                    }
                }
            });
     
            // añade clase al elemento en el dom tr
            tr.classList.add('update');
            // countTime para incrementar en el intervalo de tiempo
            let countTime = 0;
            // intervalo de tiempo para remover la clase que se agrego anteriormente al tr
            let interval = setInterval(function () {
                countTime++;
                if (countTime >= 20 - 1) {
                    tr.classList.remove('update');
                    clearInterval(interval);
                }
            }, 30);

            // acutualizar datos
            if(ax.length > 0){
                const data = {
                    id: id,
                    nombre: name,
                    dui: age,
                    nit: nitt
                };
              
                if(!isNaN(age)){
                    // reemplazar un elemento en el array por otro con .splice
                    elements.splice(index, 1, data);
                    // reemplaza los datos en 'data' con nueva informacion
                    localStorage.setItem('data', JSON.stringify(elements));
                    containerPopupMessages.innerHTML = message('Actualización completa', `Datos actualizados en ID: ${id}`, 'update');
                    deleteMessage(1000);
                    }else{
                        containerPopupMessages.innerHTML = message(`Error al acualizar el articulo con el ID: ${id}`, `Los datos en este campo no son numericos.`, 'error');
                        deleteMessage(1000);
                    }
            }else{
                containerPopupMessages.innerHTML = message(`Error al acualizar el articulo con el ID: ${id}`, `Los datos son exactamente iguales.`, 'error');
                deleteMessage(1000);
            }

        });
    });
    // eliminar un elemento en la tabla
    btn_delete.forEach((btn) => {
        btn.addEventListener('click', function () {
            // id del elemento que se eliminara en la tabla
            let id = this.querySelector('.itemID').value;
            // map de todos los elementos en el array [elements]
            // si el elemento del array.id es distinto a la id que recibe al hacer click sobre 'delete' en el boton
            // entonces se almacena en [elements], de lo contrario si la id del elemento en el map es igual a la recibida no se almacenara en [elements]
            const el = elements.map((element) => {
                if (element.id != id) { return element }
            });
            elements = [];
            // forEach de los elementos mapeados y si es diferente de 'undefined' entonces procede a almacenar todos los datos en [elements]
            el.forEach((element) => {
                if (element != undefined) {
                    elements.push(element);
                }
            });
            localStorage.setItem('data', JSON.stringify(elements));
            displayElements();
            containerPopupMessages.innerHTML = message('Eliminacion completa', `Datos eliminados en ID: ${id}`, 'removal');
            deleteMessage(1000);
        });
    });
}
// muestra los elementos que ya esten almacenados con localStorage
displayElements();
// funcion para mostrar los elementos alamacenados con localStorage y una paginacion
function displayElements() {
    // informacion recibida de localStorage con el nombre 'data'
    const data = localStorage.getItem('data');
    // si data existe
    if (data) {
        // conversion del texto plano recibido a JSON
        const resData = JSON.parse(data);
        // Pagination
        // numero de elementos que se mostraran por pagina
        const pages = 5;
        // ultima pagina en la que se quedo antes de cerrar la pestaña,recargar la pagina o cerrar el navegador
        let lastCurrentPage = localStorage.getItem('currentPage');
        // pagina actual: si la pagina actual no existe entonces la ultima pagina sera la primera
        let current_page = (lastCurrentPage) ? JSON.parse(lastCurrentPage) : 1;
        // calculo de la longitud de los elementos en el array [elements] / los elementos que se mostraran por pagina ***
        let calc_pages = Math.ceil((elements.length) / pages);
        // console.log(calc_pages);

        // crear paginacion:
        // suguientes botones:
        /*
        - pagina anterior <=
        - 1
        - 2
        - 3
        - pagina siguiente =>
        */
        paginationUl.innerHTML = `<li><button class="btn-prev" ><i class="fas fa-angle-left"></i></button></i></li>`;
        for (let i = 0; i <= calc_pages; i++) {
            if (i > 0) {
                if (i == current_page) {
                    paginationUl.innerHTML +=
                        `<li class="current-page"><button value="${i}">${i}</button></li>`
                } else {
                    paginationUl.innerHTML +=
                        `<li><button value="${i}">${i}</button></li>`
                }
            }
        }
        paginationUl.innerHTML += `<li><button class="btn-next"><i class="fas fa-angle-right"></i></button></li>`;
        // funcion para remover clases en los elementos del dom Ej. li.className
        function removeClss(elements, clss) {
            for (element of elements) {
                element.classList.remove(clss);
                // llama a la funcion checkCurrentPage()
                checkCurrentPage();
            }
        }
        // todos los li de la paginacion
        const paginationUlLi = paginationUl.querySelectorAll('li');
        // funcion para marcar las flechas ( <= => ) se siguiente y anterior
        // si current_page == 1 entonces añade la clase ".current-page" al boton del button.btn-prev para que el usuario comprenda que ya no hay paginas anteriores
        function checkCurrentPage() {
            if (current_page == 1) {
                paginationUl.firstElementChild.classList.add('current-page');
                if (elements.length <= pages) {
                    paginationUl.lastElementChild.classList.add('current-page');
                }
            } else if (current_page == calc_pages) {
                paginationUl.lastElementChild.classList.add('current-page');
            }
        }
        checkCurrentPage();
        // ( for of )
        for (let btn of paginationUlLi) {
            // suguientes botones:
            /*
            - pagina anterior <=
            - 1
            - 2
            - 3
            - pagina siguiente =>
            */
            btn.addEventListener('click', function () {
                // this = <li> .children = <button>
                let button = this.children[0];
                // switch para evaluar que boton se esta seleccionando con su .clase para identificarlos
                switch (true) {
                    // si el boton contiene la clase .btn-next entonces avanza en la paginacion incrementando la current_page++
                    case button.classList.contains('btn-next'):
                        current_page++;
                        if (current_page > calc_pages) {
                            current_page = calc_pages;
                        }
                        // llamar a la funcion que añadira una clase al elemento seleccionado y mostrara los elementos de la siguiente pagina
                        nextOrPrevPageClass();
                        break;
                    // si el boton contiene la clase .btn-prev entonces retrocede en la paginacion incrementando la current_page--
                    case button.classList.contains('btn-prev'):
                        current_page--;
                        if (current_page <= 0) {
                            current_page = 1;
                        }
                        nextOrPrevPageClass();
                        break;
                    // en caso de no ser detectada ningula de las clases .btn-next o .btn-prev quiere decir que la pagina actual sera el numero que seleccione en la paginacion Ej. current_page (1) - button (2) current_page = 2
                    default:
                        current_page = button.value;
                        nextOrPrevPageClass();
                        break;
                }
                // funcion que remueve una .clase y añade otra para despues mostrar los resultados de la pagina actual seleccionada
                function nextOrPrevPageClass() {
                    removeClss(paginationUlLi, 'current-page');
                    paginationUlLi[current_page].classList.add('current-page');
                    refreshData();
                }

            });
        }
        refreshData();
        function refreshData() {
            table_content.innerHTML = '';

            let inicio = (current_page * pages) - pages;
            let final = (inicio > 0) ? (inicio + pages) - 1 : pages;
            let count = 0;

            localStorage.setItem('currentPage', current_page);

            for (item of elements) {
                count++;
                if (count > inicio && count <= final) {
                    table_content.innerHTML += `
                    <tr>
                        <td>
                            ${item.id}
                        </td>

                        <td>
                            <div contenteditable="true" class="itemName">${item.nombre}</div>
                        </td>

                        <td>
                            <div contenteditable="true" class="itemAge">${item.dui}</div>
                        </td>

                        <td>
                            <div contenteditable="true" class="itemnit">${item.nit}</div>
                        </td>

                        <td>
                            <div contenteditable="true" class="marca-select">${item.marca}</div>
                        </td>

                        <td>
                            <div contenteditable="true" class="itemmodelo">${item.modelo}</div>
                        </td>

                        <td>
                            <div contenteditable="true" class="">${item.annio}</div>
                        </td>

                        <td>
                            <div contenteditable="true" class="">${item.color}</div>
                        </td>

                        <td>
                            <div contenteditable="true" class="">${item.placa}</div>
                        </td>

                        <td>
                            <div contenteditable="true" class="">${item.fallas}</div>
                        </td>

                        <td>
                            <button class="btn delete">Borrar <input type="hidden" value="${item.id}" class="itemID"></button>
                        </td>
                    </tr>
                    `
                }
            }
            actionsTable();
        }
    }

}

function showModels () { //Funcion que se encargara de mostrar los modelos de autos de acuerdo a la marca seleccionada
    let flag = false;
    
    if (flag == false)  {
        selectModelo.innerHTML = '<option value="">Seleccione un modelo</option>';
        flag = true;
    } 
    
    if (flag) {
        const marcaUsar = eval(selectMarca.value)
        for (let i = 0; i < marcaUsar.length; i++ ) {
            const option = document.createElement('option');
            const valor = marcaUsar[i]
            option.value = valor
            console.log(valor)
            option.text = valor
            console.log(valor)
            selectModelo.appendChild(option)
            flag = false;
        }
    }
}