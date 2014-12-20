#famo.us packaged for meteor

Famo.us [0.3.4](https://github.com/Famous/famous/releases/tag/0.3.4) packaged for 
Meteor from `http://code.famo.us/famous/0.3.4/famous-global.js`.
All classes are available in namespace `famous`, e.g. `famous.core.Surface`

Additionally the following Famo.us [polyfills](https://github.com/Famous/polyfills) are included.
    
    http://code.famo.us/lib/functionPrototypeBind.js
    http://code.famo.us/lib/classList.js
    http://code.famo.us/lib/requestAnimationFrame.js

Usage with package [gadicohen:famous-views](https://atmospherejs.com/gadicohen/famous-views)

    {{famousContext}}
        {{Surface size='[100, 60]'}}
            <h1>Hello Famo.us</h1>
        {{/Surface}}
    {{/famousContext}}
    
Usage (plain):
    
    var context = famous.core.Engine.createContext();
    
    var surface = new famous.core.Surface({
        size: [100, 60],
        content: '<h1>Hello Famo.us</h1>'
    });
    context.add(surface);
