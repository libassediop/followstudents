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
    // {
    //     id: 2,
    //     label: 'Parametre',
    //     icon: 'bx-tone',
    //     isUiElement: true,
    //     subItems: [
    //         {
    //             id: 7,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.ALERTS',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 8,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.BUTTONS',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 9,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.CARDS',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 10,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.CAROUSEL',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 11,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.DROPDOWNS',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 12,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.GRID',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 13,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.IMAGES',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 14,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.MODALS',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 15,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.RANGESLIDER',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 16,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 16,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.PLACEHOLDER',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 17,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.SWEETALERT',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 18,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.TABS',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 19,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 20,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.VIDEO',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 21,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.GENERAL',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 22,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.COLORS',
    //             link: '/',
    //             parentId: 6
    //         },
    //         {
    //             id: 23,
    //             label: 'MENUITEMS.UIELEMENTS.LIST.CROPPER',
    //             link: '/',
    //             parentId: 6
    //         },
    //     ]
    // }

];

