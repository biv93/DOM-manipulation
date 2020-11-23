/** 
 * dichiaro variabili e costanti
 */

const btnOpenModal = document.querySelector('#btnModal');

const btnCloseModal = document.querySelector('#btnClose');

const modalCourse = document.getElementById('modalContainer');

const btnSave = document.getElementById('buttonModify')

const btnSubmit = document.getElementById('buttonSubmit');


const formModal = document.querySelector('#modalCourse');


const h2 = document.getElementById('textContent');

//seleziono le input presenti nel mio form 

const titoloValue = document.getElementById('titoloCorso')
const temaValue = document.getElementById('temaCorso')
const livelloValue = document.getElementById('livelloCorso')
const imgValue = document.getElementById('immagineCorso')


const ulLista = document.querySelector('.listaCorsi')


const courseArray = [];

// seleziono lo span per inserire nel futuro il numero di elementi presenti nell'array
const totCorsi= document.getElementById('totCorsi');


// creo una funzione  che mi restituisce il numero di elementi presenti nell'array
const getNumberOfCourse = () => {
    const num = courseArray.length;
    return totCorsi.textContent = num 
}


/** 
 * funzione handleOpen
 */
// questa funzione mi permette di far apparire la modal
 const handleOpenModal = (e) => {
    modalCourse.classList.add('modalVisible') 
    if(modalCourse.firstElementChild.id){ 
        btnSubmit.hidden = true;
        btnSubmit.removeAttribute('type')
        btnSave.setAttribute('type','submit');
        btnSave.hidden = false
        h2.textContent = 'Modifica corso';
    }else{
        h2.textContent = 'Aggiungi Corso';
        document.getElementById('idCourse').textContent = ''
        btnSubmit.hidden = false;
        btnSubmit.setAttribute('type','submit');
        btnSave.hidden = true
        btnSave.removeAttribute('type')
    }
 }

// creo una funzione per pulire i valori dei campi delle mie input
const handleClearField = () => {
    titoloValue.value = "";
    temaValue.value = "";
    livelloValue.value = "";
    imgValue.value = "";
}


 /**
  * function close
  */
  const handleClose = (e) => {
      modalCourse.classList.remove('modalVisible')
      handleClearField()
      modalCourse.firstElementChild.removeAttribute('id')
  }

 /** 
  * function close from bck
  */
 // posso chiudere la modal cliccando lo sfondo nero
 const handleCloseFromBack = (e) => {
   if(e.target.classList.contains('modalVisible')){
       handleClose() // invoco la chiusura
   }
}

// renderizzo il corso appena aggiunto creando i vari elementi HTML
const renderCourse = (courseObj) => {
    const liContainer = document.createElement('li'); // <li>
    liContainer.setAttribute('data-id',courseObj.id); // <li data-id="numeroID">
    liContainer.className = 'cardCourse';

    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    const strong = document.createElement('strong')
    const img = document.createElement('img')

    // definisco un id per gli elementi
    h3.id ='title-h3';
    strong.id = 'livello-strong';
    p.id ='tema-p';
    img.id = 'immagine-img'

    // inserisco i valori dentro gli elementi
    h3.textContent = courseObj.title;
    strong.textContent = courseObj.livello;
    p.textContent = courseObj.tema;
    img.setAttribute('src',courseObj.img)

    // creo i bottoni di rimozione e modidica
    const btnDelete = document.createElement('button');
    const btnSetting = document.createElement('button');

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'btnCourseContainer';


    btnDelete.setAttribute('type','button');
    btnSetting.setAttribute('type','button');

    btnDelete.id = 'delete';
    btnSetting.id = 'modify';

    const iconS = document.createElement('i');
    const iconD = document.createElement('i');

    iconS.classList.add('fa','fa-cog');
    iconD.classList.add('fa','fa-trash');

    btnDelete.className = 'btn';
    btnSetting.className = 'btn';
    
    btnSetting.textContent = 'modifica';
    btnDelete.textContent= 'rimuovi';
   
    
    // appendo i vari elementi 
    btnSetting.appendChild(iconS)
    btnDelete.appendChild(iconD)
    
    buttonContainer.appendChild(btnSetting)
    buttonContainer.appendChild(btnDelete)

    liContainer.appendChild(h3)
    liContainer.appendChild(strong)
    liContainer.appendChild(p)
    liContainer.appendChild(img)
    liContainer.appendChild(buttonContainer)

    ulLista.appendChild(liContainer)

}

/**
 * function ui
 */
// aggiorno la mia interfaccia, se non ci sono elementi lascio il mio msg visibile
// sennò mostro i miei corsi
 const ui = () => {
     (courseArray.length === 0) 
     ? document.getElementById('emptyList').style.display = 'block' // se è vera fa questo
     : document.getElementById('emptyList').style.display = 'none' // se è falsa fa questo
 }

/**
 * function random ID
 */
// creo una funzione random che accetta un range di valori
 const randomId = (min,max) => {
    const random = Math.floor(Math.random()* (max - min) +min);
    return random;
 }

/**
 * function addCourse
 */
// creo la funzione per aggiungere i corsi
const handleAddCourse = (e) => {
    e.preventDefault();
    console.log(e);
    if(e.submitter.id == 'buttonSubmit'){
        if(titoloValue.value !== ''
        && temaValue.value !== ''
        && livelloValue.value !== ''
        && imgValue.value !== ''){
            courseObj = {
                id:randomId(1,99),
                title: titoloValue.value,
                tema: temaValue.value,
                livello: livelloValue.value,
                img: imgValue.value
            }
            console.log(courseObj);
            // courseArray = [...courseArray,courseObj] // alternativa
            courseArray.push(courseObj);
            console.log(courseArray);
            

            // rimuovo le condizioni di else
            titoloValue.classList.remove('error')
            temaValue.classList.remove('error')
            livelloValue.classList.remove('error')
            imgValue.classList.remove('error')

            // invoco la funzione per chiudere la modal
            handleClose();
 
            renderCourse(courseObj)
            // invoco la funzione per aggiornare la mia interfaccia
            ui();
            // aggiorno il numero di elementi presenti nella funzione 
            getNumberOfCourse();
        }else{
            // se è false la condizione scatta l'errore
            titoloValue.classList.add('error')
            temaValue.classList.add('error')
            livelloValue.classList.add('error')
            imgValue.classList.add('error')
        }
    }
}
// rimuovo i corsi
const removeCourse = (e) => {
  
    if(e.target.id == 'delete'){
        console.log(e.target)
        const elm = e.target.closest('.cardCourse');
        const obj = courseArray.find( valoreCorrente =>  valoreCorrente.id == elm.dataset.id )
        console.log(obj);

      
        
        const num = courseArray.indexOf(obj);
        courseArray.splice(+num,1);
        const listRoot = document.getElementById('listaRoot')

        listRoot.children[+num].remove();
        // aggiorno la mia interfaccia
        ui();
        // aggiorno la funzione per il conto della lunghezza del mio array
        getNumberOfCourse();
    }
}

// renderizzo i cambiamenti passando come parametro l'oggetto modificato
const handleRenderChange = (obj) => {
    const cards = document.getElementsByClassName('cardCourse');
    const li = Array.from(cards).find( x => {
        return x.dataset.id == `${JSON.stringify(obj.id)}` 
    })

    li.querySelector('#title-h3').textContent = obj.title
    li.querySelector('#tema-p').textContent = obj.tema
    li.querySelector('#livello-strong').textContent = obj.livello
    li.querySelector('#immagine-img').textContent = obj.img
}


// applico le modifiche
const handleApplyChanges = (e) => {
    e.preventDefault();
    if(e.submitter.id == 'buttonModify'){
        console.log(e.submitter);
        const idCourse = document.getElementById('idCourse').textContent;
        const objEdit = courseArray.find( x => x.id === +idCourse);
        console.log("QUESTO é l'ID dell nuovo oggetto",idCourse);
        const obj = {
            id:+idCourse,
            title:titoloValue.value,
            tema:temaValue.value,
            livello:livelloValue.value,
            img:imgValue.value
        }

        courseArray.splice(courseArray.indexOf(objEdit),1,obj);
        handleClose();
        handleRenderChange(obj)
    }
}

// apro la mia modal di modifica
const handleEditModal = (e) =>{
    e.preventDefault();
    if(e.target.id == 'modify'){
        modalCourse.firstElementChild.id = 'modalBodyEdit';
        handleOpenModal();
        const card = e.target.closest('.cardCourse').dataset.id; // "15"
        const objEdit = courseArray.find( x => x.id == +card) 

        console.log(objEdit);
        document.getElementById('idCourse').textContent = objEdit.id
        titoloValue.value = objEdit.title
        temaValue.value = objEdit.tema
        livelloValue.value = objEdit.livello
        imgValue.value = objEdit.img
    }
}



/**
 * dichiaro la funzione che gestisce gli eventi
 */
const load = () => {

    btnOpenModal.addEventListener('click',handleOpenModal)
    btnCloseModal.addEventListener('click',handleClose);
    modalCourse.addEventListener('click',handleCloseFromBack)
    formModal.addEventListener('submit',handleAddCourse)
    formModal.addEventListener('submit',handleApplyChanges)
    ulLista.addEventListener('click', removeCourse)
    ulLista.addEventListener('click', handleEditModal)
    getNumberOfCourse();
}

load();