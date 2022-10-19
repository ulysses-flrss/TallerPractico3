let selectMarca = document.getElementById("marca-select")
let selectModelo = document.getElementById("modelo-select")

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

function showModels () {
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