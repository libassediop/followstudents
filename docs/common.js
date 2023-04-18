"use strict";
(self["webpackChunkskote"] = self["webpackChunkskote"] || []).push([["common"],{

/***/ 67462:
/*!**********************************!*\
  !*** ./src/app/services/data.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ordersData": () => (/* binding */ ordersData),
/* harmony export */   "editableTable": () => (/* binding */ editableTable),
/* harmony export */   "userGridData": () => (/* binding */ userGridData),
/* harmony export */   "revenueBarChart": () => (/* binding */ revenueBarChart),
/* harmony export */   "statData": () => (/* binding */ statData),
/* harmony export */   "listData": () => (/* binding */ listData)
/* harmony export */ });
const ordersData = [];
const editableTable = [
    {
        id: 1,
        name: 'Aida Mbaye',
        email: 'Sincere@april.biz',
    },
    {
        id: 2,
        name: ' Tiko Kane',
        email: 'Shanna@melissa.tv',
    },
    {
        id: 3,
        name: 'Malick Gueye',
        email: 'Rey.Padberg@rosamond.biz',
    },
    {
        id: 4,
        name: 'Limamou Diop',
        email: 'Julianne.OConner@kory.org',
    },
    {
        id: 5,
        name: 'Khalifa Mbengue',
        email: 'Lucio_Hettinger@annie.ca',
    },
    {
        id: 6,
        name: 'Adama Mbengue',
        email: 'Karley_Dach@jasper.info',
    },
    {
        id: 7,
        name: 'Aida MBAYE',
        email: 'Telly.Hoeger@billy.biz',
    },
    {
        id: 8,
        name: 'LimsMetik',
        email: 'Sherwood@rosamond.me',
    }
];
const userGridData = [
    {
        id: 1,
        name: 'Aida Mbaye',
        designation: 'UI/UX Designer',
        projects: ['Gerant'],
        email: 'david@skote.com'
    },
    {
        id: 2,
        name: 'Limamou Diop',
        designation: 'Frontend Developer',
        projects: ['Gerant'],
        email: 'frank@skote.com'
    },
    {
        id: 3,
        name: 'Thierno KANE',
        designation: 'Backend Developer',
        projects: ['Distributeur'],
        email: 'Rafael@skote.com'
    },
    {
        id: 4,
        name: 'Malick Gueye',
        designation: 'Full Stack Developer',
        projects: ['Gerant'],
        email: 'mark@skote.com'
    },
    {
        id: 5,
        name: 'Aida Mbaye',
        designation: 'Frontend Developer',
        projects: ['Distributeur'],
        email: 'minnie@skote.com'
    },
    {
        id: 6,
        name: 'Abdou Ndiaye',
        designation: 'UI/UX Designer',
        projects: ['Gerant'],
        email: 'shirley@skote.com'
    },
    {
        id: 7,
        name: 'Aida Mbaye',
        designation: 'Full Stack Developer',
        projects: ['Distributeur'],
        email: 'john@skote.com'
    },
    {
        id: 8,
        name: 'Miliko ',
        designation: 'Backend Developer',
        projects: ['Distributeur'],
        email: 'colin@skote.com'
    },
];
const revenueBarChart = {
    chart: {
        height: 300,
        type: 'bar',
        toolbar: {
            show: false,
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '14%',
            endingShape: 'rounded'
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    series: [{
            name: 'Revenue',
            data: [42, 85, 101, 56, 37, 105, 38, 58, 92, 82, 72, 32]
        }],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
        title: {
            text: '$ (thousands)'
        }
    },
    fill: {
        opacity: 1
    },
    colors: ['#556ee6'],
};
const statData = [
    {
        icon: 'bx bx-user',
        title: 'Nombre Cliens',
        value: '125',
    },
    {
        icon: 'bx bx-store',
        title: 'Nombre Circuit',
        value: '12'
    }, {
        icon: 'bx bx-undo',
        title: 'Pourcentage de retour',
        value: '10%'
    },
];
const listData = [
    {
        name: 'Aida Mbaye',
        id: '#1',
        title: 'aidambaye@gmail.com',
        tel: '77877777'
    },
    {
        name: 'Limamou Diop',
        id: '#2',
        title: 'limamoudiop@gmail.com',
        tel: '77877777'
    },
    {
        name: 'Malick Gueye',
        id: '#3',
        title: 'malickgueye@gmail.com',
        tel: '77877777'
    },
    {
        name: 'Tiko Kane',
        id: '#4',
        title: 'thierno@gmail.com',
        tel: '77877777'
    },
    {
        name: 'Adama Mbeungue',
        id: '#5',
        title: 'adama@gmail.com',
        tel: '77877777'
    },
    {
        image: 'assets/images/users/avatar-1.jpg',
        name: 'Ama Ndiaye',
        id: '#6',
        title: 'amandiaye@gmail.com',
        tel: '77877777'
    },
    {
        name: 'Khalifa Mbengue',
        id: '#7',
        title: 'khalifa@gmail.com',
        tel: '77877777'
    },
    {
        image: 'assets/images/users/avatar-4.jpg',
        name: 'Aida Mbaye',
        id: '#8',
        title: 'aidambaye@gmail.com',
        tel: '77877777'
    },
];



/***/ })

}]);
//# sourceMappingURL=common.js.map