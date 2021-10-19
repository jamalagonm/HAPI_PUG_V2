const Path = require('path');

const Hapi = require('@hapi/hapi');
const Pug = require('pug');
const jade = require("jade");
const Vision = require('@hapi/vision');
const port = 3000;

const server = Hapi.Server({ port });

const provision = async () => {

    await server.register(Vision);

    server.views({
        engines: { pug: Pug },
        relativeTo: __dirname,
        path: 'views',
        compileOptions: {
            // By default Pug uses relative paths (e.g. ../root.pug), when using absolute paths (e.g. include /root.pug), basedir is prepended.
            // https://pugjs.org/language/includes.html
            basedir: Path.join(__dirname, 'views')
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            let contexto = {
                animal: "Jaguar",
                familia: "Felinos",
                carnivoro: true,
                edad: 3,
                link: "https://google.com"
            }
            //return h.view('inicio/inicio', { data: contexto }).redirect("https://facebook.com");
            return h.view('inicio/inicio', { data: contexto }).code(200);

        }
    });

    server.route({
        method: 'POST',
        path: '/saving',
        handler: (request, h) => {
            return h.view("inicio/final");            
        }
    });


    await server.start();
    console.log('Server running at 127.0.0.1:', port);
};

provision();