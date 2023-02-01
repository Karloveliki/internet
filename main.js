function probaj() {
}

function napraviSjedalo(i,red){
    sjedalo=document.createElement("td")
    sjedalo.innerText=i
    sjedalo.setAttribute("id","sjedalo"+i+"red"+red)
    sjedalo.classList.add("sjedalo")
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
    celija.innerText=red
    celija.classList.add("oznakareda")
    row.appendChild(celija)
    for(let i=1;i<=brSjedala;i++){
        row.appendChild(napraviSjedalo(i,red))
    }
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
    if(sjedalo.classList.contains("izabrano")){
        sjedalo.classList.remove("izabrano")
    }
    else{
        sjedalo.classList.add("izabrano")
    }
   popuniKolikoIzabranih()
}
function popuniKolikoIzabranih(){
    const izabrana=document.getElementsByClassName("izabrano")
    sp=document.getElementById("kolikoIzabranih")
    sp.innerText=izabrana.length
    const previse=document.getElementById("previseJePrevise")
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

function priljepiOnClick() {
    const sjedala=document.getElementsByClassName('sjedalo')
    for (sjedalo of sjedala) {
        if(!(sjedalo.classList.contains("zauzeto"))) {
            sjedalo.onclick = sjedaloClicked
        }
    }
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

