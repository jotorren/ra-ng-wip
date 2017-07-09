let memoryStorage = {
    items: {},

    getItem(key: string): string {
        return this.items[key];
    },

    setItem(key: string, value: string) {
        this.items[key] = value;
    },

    removeItem(key: string) {
        delete this.items[key];
    }
};

export let Config = {
    import: [
        'app/shared/config/cache.json',
        'app/shared/i18n/lang_en.json',
        'app/shared/i18n/lang_es.json'
    ],

    appLang: 'en',
    availableLangs: [
        { label: 'EN', value: 'en' },
        { label: 'ES', value: 'es' }
    ],

    security: {
        mode: 'on', // on, off

        unauthenticatedView: 'login',
        logoutView: 'login',
        authenticatedDefaultView: 'home',
        unauthorizedView: 'forbidden',
        globalMessages: false, // true, false

        token: {
            // endpoint: 'http://localhost:8001/jwt/token',
            endpoint: 'https://localhost:8002/oauth/token',
            // endpoint: '/oauth/token',
            // endpoint: 'http://localhost:8003/login',

            storage: {
                provider: sessionStorage, // memoryStorage, sessionStorage, localStorage
                key: 'id_token'
            },

            header: {
                name: 'Authorization',
                prefix: 'Bearer',
                globals: []
            },

            // jwt: {
            //     // Those options are used with the AuthHttp from angular2-jwt
            //     // headerName: 'Authorization',
            //     // headerPrefix: 'Bearer',
            //     // tokenName: 'id_token',
            //     // tokenGetter: (() => localStorage.getItem('id_token')),
            //     // globalHeaders: [],
            //     // // globalHeaders: [{'Content-Type': 'application/json'}],
            //     // noTokenScheme: false,
            //     claimProfile: 'raNg',
            //     noJwtError: false
            // },

            oauth2: {
                clientId: 'abc123',
                // clientSecret: 'ssh-secret',
                clientCredentials: 'U2FsdGVkX188GpAZwZJ6gwlFxxY1lYbgIbMDhSviNnnwZoIv/JR4LKRnjvh59j5t',
                grantType: 'password',
                checktoken: {
                    mode: 'remote', // local, remote, off
                    endpoint: 'https://localhost:8002/api/tokeninfo',
                    // endpoint: '/api/tokeninfo',
                    refresh: 'on' // on, off
                }
            }
        },

        profile: {
            endpoint: 'https://localhost:8002/api/users',
            // endpoint: '/api/users',
            // endpoint: 'http://localhost:8003/api/users',

            storage: {
                provider: sessionStorage, // memoryStorage, sessionStorage, localStorage
                key: 'user_profile'
            },

            json: {
                fieldUsername: 'username',
                fieldProfile: 'raNg'
            },

            oauth2: {
                fieldProfile: 'authorities'
            },

            rolesProperty: 'roles',
            permsProperty: 'perms'
        }
    },

    ui: {
        langselector: 'primeng', // std, primeng
        messages: 'growl', // inline, growl
        loginUseDomain: true,
        logout: 'custom' // button, link, custom
        // The 'custom' option requires a css definition for '#logout-custom' (see topnav.component.css)
    },

    api: {
        getage: 'src/api/agenda-get.json',
        // test: 'http://localhost:8001/api/random-quote'
        // test: 'http://localhost:8001/api/protected/random-quote'
        test: 'https://localhost:8002/api/protected/random-quote'
        // test: 'https://localhost:8002/api/userinfo'
    }
    // log: [
    //     {
    //         name: 'root',               // 'root' or any other name
    //         level: 'ERROR',             // ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, OFF
    //         layout: {
    //             type: 'SimpleLayout'    // NullLayout, SimpleLayout, PatternLayout, XmlLayout, JsonLayout, HttpPostDataLayout
    //         },
    //         appenders: [                // AlertAppender, BrowserConsoleAppender 
    //             'BrowserConsoleAppender'
    //         ]
    //     },
    //     {
    //         name: 'app.shared',
    //         level: 'INFO',
    //         layout: {
    //             type: 'JsonLayout',
    //             params: {
    //                 readable: true,
    //                 combineMessages: false
    //             }
    //         },
    //         additivity: false,
    //         appenders: [
    //             'AlertAppender'
    //         ]
    //     },
    //     {
    //         name: 'app.shared.security',
    //         level: 'DEBUG',
    //         layout: {
    //             type: 'PatternLayout',
    //             params: {
    //                 pattern: '%d{HH:mm:ss} %-5p - %m%n'
    //             }
    //         },
    //         additivity: false,
    //         appenders: [
    //             'BrowserConsoleAppender'
    //         ]
    //     }
    // ],

    // cache: {
    //     maxAge: 60 * 60 * 1000, // 1 hour
    //     deleteOnExpire: 'aggressive',
    //     recycleFreq: 60 * 1000, // 1 minute
    //     storageMode: 'localStorage' // This cache will use `localStorage`
    // }
};
