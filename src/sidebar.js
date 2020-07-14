export default {
    items: [
        {
            name: 'Inicio',
            url: '/grameen/inicio',
            icon: "icon-home",

        },
        {
            title: true,
            name: 'Programas Sociales',
            wrapper: {
                element: '',
                attributes: {},
            },
        },
        {
            name: "Beneficiarios",
            url:"/grameen/beneficiarios",
            icon:"icon-people"
        },
        {
            name:"Programas",
            url: "/grameen/programas",
            icon:"icon-share"
        },
        
        {
            divider: true,
        },
       
        {
            title: true,
            name: 'Vinculacion',
            wrapper: {
                element: '',
                attributes: {},
            },
        },
        {
            divider: true,
        },
        {
            name: 'Universidades',
            url: '/grameen/universidades',
            icon: 'icon-graduation'

        },
        {
            divider: true,
        },
        {
            name: 'Empresas',
            url: '/grameen/empresas',
            icon: 'icon-chart'
        },
        {
            name: 'Alumnos',
            url: '/grameen/alumnos',
            icon: 'icon-graduation'

        },
        {
            divider: true,
        },
              
        {
            title: true,
            name: 'Administracion',
            wrapper: {
                element: '',
                attributes: {},
            },
        },
        {
            divider: true,
        },
        // {
        //     name: 'Roles y Usuarios',
        //     url: '/grameen/admon',
        //     icon: 'icon-note'
        // }
        // },
        {
            name: 'Icons',
            url: '/grameen/icons',
            icon: 'icon-star',
            children: [
                {
                    name: 'CoreUI Icons',
                    url: '/grameen/icons/coreui-icons',
                    icon: 'icon-star',
                    badge: {
                        variant: 'info',
                        text: 'NEW',
                    },
                },
                {
                    name: 'Flags',
                    url: '/grameen/icons/flags',
                    icon: 'icon-star',
                },
                {
                    name: 'Font Awesome',
                    url: '/grameen/icons/font-awesome',
                    icon: 'icon-star',
                    badge: {
                        variant: 'secondary',
                        text: '4.7',
                    },
                },
                {
                    name: 'Simple Line Icons',
                    url: '/grameen/icons/simple-line-icons',
                    icon: 'icon-star',
                },
            ],
        }
        // {
        //   name: 'Charts',
        //   url: '/charts',
        //   icon: 'icon-pie-chart',
        // }
        // // },
        // {
        //   name: 'Icons',
        //   url: '/icons',
        //   icon: 'icon-star',
        //   children: [
        //     {
        //       name: 'CoreUI Icons',
        //       url: '/icons/coreui-icons',
        //       icon: 'icon-star',
        //       badge: {
        //         variant: 'info',
        //         text: 'NEW',
        //       },
        //     },
        //     {
        //       name: 'Flags',
        //       url: '/icons/flags',
        //       icon: 'icon-star',
        //     },
        //     {
        //       name: 'Font Awesome',
        //       url: '/icons/font-awesome',
        //       icon: 'icon-star',
        //       badge: {
        //         variant: 'secondary',
        //         text: '4.7',
        //       },
        //     },
        //     {
        //       name: 'Simple Line Icons',
        //       url: '/icons/simple-line-icons',
        //       icon: 'icon-star',
        //     },
        //   ],
        // },
        // {
        //   name: 'Notifications',
        //   url: '/notifications',
        //   icon: 'icon-bell',
        //   children: [
        //     {
        //       name: 'Alerts',
        //       url: '/notifications/alerts',
        //       icon: 'icon-bell',
        //     },
        //     {
        //       name: 'Badges',
        //       url: '/notifications/badges',
        //       icon: 'icon-bell',
        //     },
        //     {
        //       name: 'Modals',
        //       url: '/notifications/modals',
        //       icon: 'icon-bell',
        //     },
        //   ],
        // },
        // {
        //   name: 'Widgets',
        //   url: '/widgets',
        //   icon: 'icon-calculator',
        //   badge: {
        //     variant: 'info',
        //     text: 'NEW',
        //   },
        // },

        // {
        //   title: true,
        //   name: 'Extras',
        // },
        // {
        //   name: 'Pages',
        //   url: '/pages',
        //   icon: 'icon-star',
        //   children: [
        //     {
        //       name: 'Login',
        //       url: '/login',
        //       icon: 'icon-star',
        //     },
        //     {
        //       name: 'Register',
        //       url: '/register',
        //       icon: 'icon-star',
        //     },
        //     {
        //       name: 'Error 404',
        //       url: '/404',
        //       icon: 'icon-star',
        //     },
        //     {
        //       name: 'Error 500',
        //       url: '/500',
        //       icon: 'icon-star',
        //     },
        //   ],
        // }

    ],
};
