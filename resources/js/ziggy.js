const Ziggy = {
    url: 'http://localhost',
    port: null,
    defaults: {},
    routes: {
        'sanctum.csrf-cookie': {
            uri: 'sanctum/csrf-cookie',
            methods: ['GET', 'HEAD'],
        },
        login: { uri: 'login', methods: ['POST'] },
        register: { uri: 'register', methods: ['POST'] },
        logout: { uri: 'logout', methods: ['POST'] },
        index: { uri: '/', methods: ['GET', 'HEAD'] },
        store: { uri: '/', methods: ['POST'] },
        update: { uri: '{}', methods: ['PUT', 'PATCH'], parameters: [''] },
        destroy: { uri: '{}', methods: ['DELETE'], parameters: [''] },
    },
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
