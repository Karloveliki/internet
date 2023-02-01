function probaj() {
    console.log('koko')
}
function napraviSjedalo(i,red){
    sjedalo=document.createElement("td")
    sjedalo.innerText=i
    sjedalo.setAttribute("id","sjedalo"+i+"red"+red)
    sjedalo.classList.add("sjedalo")
    return sjedalo
}
function oznaciZauzeta(brRedova,brSjedala,zauzeta){
    // zauzeta == [ {red:"A", sjedalo:7}, red:"c", sjedalo:11}, ....]
    for (const z of zauzeta) {
        console.log(z);
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
    console.log(row)
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
function popuniDvoranu(brRedova,brSjedala,zauzeta){
    const dvorana=document.getElementById('dvorana')
    console.log(dvorana)
    const tablica=dvorana.querySelector('table')
    console.log(tablica)
    let oznakaReda="A"
    for(let i=0;i<brRedova;i++){
        console.log('red')  
        const red=napraviTr(oznakaReda,brSjedala)
        tablica.appendChild(red)
        oznakaReda= nextLetter(oznakaReda)
    }
    oznaciZauzeta(brRedova,brSjedala,zauzeta)
} 

