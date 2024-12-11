//prendo il riferimento al form
let form = document.getElementById("form");

//ascolto l'evento submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //automaticamente creo un oggetto coi valori inseriti nei campi del form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  //recupero separatamente alcuni valori del form
  const genere = document.querySelector('input[name="genere"]:checked');
  const genereValue = genere ? genere.value : null;
  const cittadinanza = document.getElementById("cittadinanza").value;

  //creo l'oggetto customizzato che verrà poi scaricato
  const dataModified = {
    dati_anagrafici: {
      nome: data.nome,
      cognome: data.cognome,
      eta: data.eta,
      genere: genereValue,
      cittadinanza: cittadinanza,
    },
    contatti: {
      numero_di_telefono: data.telefono,
    },
    permessi: {
      privacy_policy: data.hasReadPolicy === "on" ? true : false,
      advertisement: data.acceptAdv === "on" ? true : false,
    },
  };

  //stringifizzo l'oggetto customizzato
  const jsonData = JSON.stringify(dataModified, null, 2);

  // crea Binary Large OBject
  const blob = new Blob([jsonData], { type: "application/json" });

  //creo un elemento anchor sull'html e lo clicco
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "form_data.json";
  link.click();

  //cancello dalla memoria
  URL.revokeObjectURL(link.href);
});
