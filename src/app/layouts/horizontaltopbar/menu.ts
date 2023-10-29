import { DefaultComponent } from 'src/app/pages/dashboards/default/default.component';
import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Accueil',
        icon: 'bx-home-circle',
        link:'accueil/accueil'

    },
   {
    id: 2,
    label: 'Alerte',
    icon: 'bx bx-bell',
    subItems:[
      {
        id: 2,
        label: 'Alerte Note',
        icon: 'bx bx-bell',
        link:'alerte/alertenote'
      },
      {
        id: 3,
        label: 'Alerte Absence',
        icon: 'bx bx-alarm',
        link:'alerte/alerteabsence'
      },
      {
        id: 4,
        label: 'Envoie Message',
        icon: 'bx bx-mail-send',
        link:'alerte/alertemessage'
      },
    ]
   },

    {
        id: 5,
        label: 'Inscription',
        icon: 'bx bx-money',
        subItems:[
          {
            id: 5,
            label: 'Nouvelle Inscription',
            icon: 'bx bx-money',
            link:'inscription/eleve',
          },
          {
            id: 5,
            label: 'Voir Inscription',
            icon: 'bx bx-money',
            link:'inscription/listInscription',
          }
        ]
    },
  {
        id: 9,
        label: 'Mensualité',
        icon: 'bx bx-money',
        link:'inscription/mensualite',
        subItems: [
          {
            id: 9,
            label: 'Paiement',
            icon: 'bx bx-money',
            link:'inscription/mensualite',

          },
          {
            id: 9,
            label: 'Suivi Paiement',
            icon: 'bx bx-money',
            link:'inscription/listMensualite',

          }
        ]
    },
    {
        id: 6,
        label: 'Classe',
        icon: 'bx bxs-school',
        link:'classe/classe'
    },
    {
        id: 7,
        label: 'Professeur',
        icon: 'bx bxs-user-detail',
        link:'professeur/professeur'
    },
    {
        id: 8,
        label: 'Personnel',
        icon: 'bx bx-user-circle',
        link:'personnel/personnel'
    },
    {
        id: 8,
        label: 'Matiere',
        icon: 'bx bxs-edit',
        link:'matiere/matiere'
    },
    {
        id: 20,
        label: 'Caisse',
        icon: 'bx-tone',
        isUiElement: true,
        subItems: [
            {
                id: 7,
                label: 'Caisse Journalière',
                link: 'caisse/caisseJornalier',
                parentId: 6
            }


        ]
    }

];

