

function napraviSjedalo(i,red){
    sjedalo=document.createElement("td")
    sjedalo.innerText=i
    sjedalo.setAttribute("id","sjedalo"+i+"red"+red)
    sjedalo.classList.add("sjedalo")
    sjedalo.classList.add("w3-padding-large")
    return sjedalo
}

function oznaciZauzeta(zauzeta){
    // zauzeta == [ {red:"A", sjedalo:7}, red:"c", sjedalo:11}, ....]
    for (const z of zauzeta) {
        const idSjedala = "sjedalo" + z["sjedalo"] + "red" + z["red"]
        sjedalo = document.getElementById(idSjedala)
        sjedalo.classList.add("zauzeto")
    }
}

function napraviTr(red,brSjedala){
    const row=document.createElement("tr")
    row.setAttribute("id","row"+red)
    row.classList.add("redak")
    const celija= document.createElement("td")
    celija.classList.add("w3-blue")
    celija.innerText=red
    celija.classList.add("oznakareda")
    row.appendChild(celija)
    for(let i=1;i<=brSjedala;i++){
        row.appendChild(napraviSjedalo(i,red))
    }
    row.classList.add("w3-margin-32")
    return row
}

function nextLetter(s){
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a){
        var c= a.charCodeAt(0);
        switch(c){
            case 90: return 'A';
            case 122: return 'a';
            default: return String.fromCharCode(++c);
        }
    });
}

function sjedaloClicked(ev) {
    const sjedalo=ev.target;
    const potvrdaDiv = document.getElementById("potvrdaDiv")
    if (potvrdaDiv.style.display == "none") {
        if(sjedalo.classList.contains("izabrano")){
            sjedalo.classList.remove("izabrano")
        }
        else{
            sjedalo.classList.add("izabrano")
        }
       popuniKolikoIzabranih()
    }
}

function popuniKolikoIzabranih(){
    const izabrana=document.getElementsByClassName("izabrano")
    sp=document.getElementById("kolikoIzabranih")
    sp.innerText=izabrana.length
    const previse=document.getElementById("previseJePrevise")
    const cjena=document.getElementById("cijena")
    cjena.innerText=5*izabrana.length;
    if(izabrana.length>5){
       previse.style.display="block"
    }
    else{
        previse.style.display="none"
    }
    const botun=document.getElementById("rezervacija")
    if((izabrana.length>0) && (izabrana.length<6)){
       botun.disabled=false
    }
    else{
        botun.disabled=true
    }
}

function brojSjedala(el) {
    return el.innerText
}

function oznakaReda(el) {
    const otac =  el.parentElement
    return otac.getAttribute("id").substring(3)
}


function getRezervirana() {
    const izabrana=document.getElementsByClassName("izabrano")
    const sjedalaRezervacija = []
    for (const iz of izabrana) {
        const brSjedala = brojSjedala(iz)
        const ozReda = oznakaReda(iz)
        sjedalaRezervacija.push(
            {'r': ozReda, 's': brSjedala}
        )
    }
    return sjedalaRezervacija
}

function potvrdaRezervacije() {
    console.log("potvrda rezervacije")
    // oznaci sva sjedala iz rezervacije kao zauzeta
    const izabrana=Array.from(document.getElementsByClassName("izabrano"))
    for (iz of izabrana) {
        iz.classList.remove("izabrano")
        iz.classList.add("zauzeto")
        iz.onclick = null
    }
    const potvrdaDiv = document.getElementById("potvrdaDiv")
    potvrdaDiv.style.display = "none"
    const qrcode = document.getElementById("qrcode")
    qrcode.innerHTML = ""
    popuniKolikoIzabranih()
}

function odustanakOdRezervacije() {
    console.log("odustanak od rezervacije")
    const rezervirajButton = document.getElementById("rezervacija")
    rezervirajButton.disabled=false
    const potvrdaDiv = document.getElementById("potvrdaDiv")
    potvrdaDiv.style.display = "none"
    const qrcode = document.getElementById("qrcode")
    qrcode.innerHTML = ""
}


function rezervacijaInProgress() {
    console.log("rezervacija in progress")
    const rezervirajButton = document.getElementById("rezervacija")
    rezervirajButton.disabled=true
    const potvrdaDiv = document.getElementById("potvrdaDiv")
    potvrdaDiv.style.display = "block"
    const potvrdaButton = document.getElementById("potvrda")
    potvrdaButton.onclick = potvrdaRezervacije
    const odustaniButton = document.getElementById("odustanak")
    odustaniButton.onclick = odustanakOdRezervacije
}

function rezerviraj(ev) {
    rezervacijaInProgress()
    const rezervacijaString = JSON.stringify(getRezervirana());
    const size=200
    const qrcode = new QRCode('qrcode', {
        text: rezervacijaString,
        width: size,
        height: size,
        });     
}


function priljepiOnClick() {
    const sjedala=document.getElementsByClassName('sjedalo')
    for (sjedalo of sjedala) {
        if(!(sjedalo.classList.contains("zauzeto"))) {
            sjedalo.onclick = sjedaloClicked
        }
    }
    const rezervirajButton = document.getElementById("rezervacija")
    rezervirajButton.onclick = rezerviraj
}

function popuniDvoranu(brRedova,brSjedala,zauzeta){
    const dvorana=document.getElementById('dvorana')
    const tablica=dvorana.querySelector('table')
    let oznakaReda="A"
    for(let i=0;i<brRedova;i++){
        const red=napraviTr(oznakaReda,brSjedala)
        tablica.appendChild(red)
        oznakaReda= nextLetter(oznakaReda)
    }
    oznaciZauzeta(zauzeta)
    priljepiOnClick()
    popuniKolikoIzabranih()
} 

