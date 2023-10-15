export class Classe {
    libelle:string;
    niveau:string;
    }
    export class Matiere {
        libelle:string;
    }
    export class UsersFirstCon{
        login: string;
        password: string;
        confirmPass : string;
        ancienPass:string;
    }
    export class Personnel {
        nom:string;
        prenom:string;
        dateNaissance:string;
        lieuDeNaissance:string;
        adresse:string;
        email:string;
        telephone:string;
        sexe:string;
        login:string;

    }
export class Professeur {
    nom:string;
    prenom:string;
    dateNaissance:string;
    lieuDeNaissance:string;
    adresse:string;
    email:string;
    telephone:string;
    sexe:string;
    login:string;
    classeId:string;
    matiereId:string;

}
export class Inscription {
    id:string;
    nom:string;
    prenom:string;
    dateNaissance:string;
    nationalite:string;
    lieuDeNaissance:string;
    adresse:string;
    email:string;
    classeId:string;
    telephone:string;
    sexe:string;
    nomParent:string;
    prenomParent:string;
    emailParent:string;
    telephoneParent:string;
    sexeParent:string;
    fonctionParent:string;
    montant:number;
    avance:number;
    typeDePayement:number;

}

export class Mensualite{
  eleveId:string;
  moisId:string;
  montant:string;
  userId:string;
}

export class Mois{
  id:string;
  libelle:string;
}


export class Reinscription {
    matricule:string;
    montant:string;
    avance:string;
    userId:string;
    typeDePayement:string;
    caisseId:string;
    classeId:string;
}

export class General {
}


export class ClasseYol {

    libelle: string;
}
export class Users {
    password: string;
    login: string;
}
export class Contenue {
    idClasse: string;
    idMatiere: string;
    idEleve: string;
    noteEleve: string;
}
export class Particulier {
    telephone: string;
    nom: string;
    prenom: string;
    adresse: string;
}
export class Entreprise {
    telephone: string;
    raisonSocial: string;
    adresse: string;
}

          export class AddAbsence {
              idClasse:string;
            date_debut:string;
            date_fin:string;

            matiere_id:string;
            user_ida:string;
             }

export class Note {

    noteEleve:string;
    idEleve:string;
}
