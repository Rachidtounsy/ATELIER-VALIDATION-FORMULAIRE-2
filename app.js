//---------- Inputs 
const nom = document.querySelector('#nom'),
      residance = document.querySelector('#residance'),
      email = document.querySelector('#email'),
      age = document.querySelector('#age'),
      profession = document.querySelector('#profession');

//--------- Message div
const messageBox = document.querySelector('#d1');
const messageBox2 = document.querySelector('#d2');


//-------------------------------------- Validation --------------------------------//


function valider(){

  //----- Les valeur de chaque input
  var name = nom.value,
      resid = residance.value,
      mail = email.value,
      Age = Number(age.value);

  //----- Le Test pour le nom et residance
  let regNom = /^[a-z]+$/g; //pour le nom
  let regRes = /^[a-z]+$/g; //pour le residance

  var language = '';
  let err = false;

  //---- test pour le nom
  if( regNom.test(name) == false)
  {
    messageBox.innerHTML = 'Le nom est obligatoire, et ne doit pas contenir que des caracteres miniscule ! <br>';
    err = true;
  }
  
//------ test pour le residance
  if (!regRes.test(resid)){

    messageBox.innerHTML = 'Le Residance est obligatoire, et ne doit pas contenir que des caracteres miniscule ! <br>';
    err = true;
  }
 
  //----- le test pour l'email
  let regMail = /^[^0-9][a-zA-Z0-9]{3,}@[a-zA-Z]+\.(com|ma)$/ig;
  if( !regMail.test(mail) )
  {
    messageBox.innerHTML = 'Le format de votre email est non Valide ! <br>';
    err = true;
   
  }
  
  //---- test pour l'age
  let regAge = /^[0-9]+$/g;
  if( (!regAge.test(Age)) || Age <= 18 ){
    
      messageBox.innerHTML = 'age doit etre juste des chiffres et supperieur a 18 <br>';
      err = true;
  }
  
  //---- les language coché
  var checkboxes = document.getElementsByName('checkbox1');
  let count = 0;
  checkboxes.forEach( (checkbox) => {
    if( checkbox.checked )
    {
      language += checkbox.value+', ';
      count ++;
    }
  });

  if ( count < 2)
  {
    messageBox.innerHTML = 'Vous devez selectionner au moins deux langues! <br>';
    err = true;
  }

  //------ test pour la profession (+++)
  var index = profession.selectedIndex;
  var job = profession[index].text;
  if( index === 0)
  {
    messageBox.innerHTML = 'selectionner une profession !';
    err = true;
  }
  
  //------------------ si tout les infos sont correct ------------------------//
  if ( err == false)
  {
    
    messageBox.innerHTML = `<span>NOM</span> : ${name}, <span>RESIDANCE :</span> ${resid}, <span>EMAIL :</span> ${mail}, <span>LANGUE PARLE :</span> ${language} <span>PROFESSION :</span> ${job}.`;

    //----- convertir les resultat sous form du json
    let X = {
      nom : `${name}`,
      residance : `${resid}`,
      email : `${mail}`,
      langue : `${language}`,
      profession : `${job}`
    }

    //---- Enregistrer dans LocalStorage
    
    let items;
      // Check if any items in ls
      if(localStorage.getItem('Info') === null){
        items = [];
        // Push new item
        items.push(X);
        // Set ls
        localStorage.setItem('Info', JSON.stringify(items));
      } else {
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('Info'));

        // Push new item
        items.push(X);
        console.log(items)
        // Re set ls
        localStorage.setItem('Info', JSON.stringify(items));
        
      }

    //-------- vider les input
    name = '';
    resid = '';
    mail = '';
    Age = '';

    //----------- appel du lacal storage
    getFromLocalStorage();
  }

}

 function getFromLocalStorage(){

   //---- afficher les donnee depuis LS
  if( localStorage.getItem('Info') === null)
  {
    messageBox2.innerHTML = '<h1>LocalStorage :</h1>';
    messageBox2.innerHTML += " localStorage est vide !";
  }
  else{

    let data = JSON.parse( localStorage.getItem('Info') );

    messageBox2.innerHTML = '<h1>LocalStorage :</h1>'

    data.forEach( (item) => {
      messageBox2.innerHTML += `<span>NOM</span> : ${item.nom}, <span>RESIDANCE :</span> ${item.residance}, <span>EMAIL :</span> ${item.email}, <span>LANGUE PARLE :</span> ${item.langue} <span>PROFESSION :</span> ${item.profession}. <hr>`;
    });
  }
 }

 getFromLocalStorage();






