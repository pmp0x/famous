(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    doc.createStyleSheet().cssText = css;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';
  
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }
    
    head.appendChild(style); 
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    document.createStyleSheet(url);
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;
  
    head.appendChild(link); 
  }
};

},{}],2:[function(require,module,exports){

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 2011-06-15
 *
 * By Eli Grey, http://eligrey.com
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/

if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {

(function (view) {

"use strict";

var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = (view.HTMLElement || view.Element)[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
              i = 0
            , len = this.length
        ;
        for (; i < len; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
            throw new DOMEx(
                  "SYNTAX_ERR"
                , "An invalid or illegal string was specified"
            );
        }
        if (/\s/.test(token)) {
            throw new DOMEx(
                  "INVALID_CHARACTER_ERR"
                , "String contains an invalid character"
            );
        }
        return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
        var
              trimmedClasses = strTrim.call(elem.className)
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
        ;
        for (; i < len; i++) {
            this.push(classes[i]);
        }
        this._updateClassName = function () {
            elem.className = this.toString();
        };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
        return new ClassList(this);
    }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
    return this[i] || null;
};
classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.push(token);
        this._updateClassName();
    }
};
classListProto.remove = function (token) {
    token += "";
    var index = checkTokenAndGetIndex(this, token);
    if (index !== -1) {
        this.splice(index, 1);
        this._updateClassName();
    }
};
classListProto.toggle = function (token) {
    token += "";
    if (checkTokenAndGetIndex(this, token) === -1) {
        this.add(token);
    } else {
        this.remove(token);
    }
};
classListProto.toString = function () {
    return this.join(" ");
};

if (objCtr.defineProperty) {
    var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
    };
    try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
        if (ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
    }
} else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

},{}],3:[function(require,module,exports){
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                ? this
                : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

},{}],4:[function(require,module,exports){
require('./classList.js');
require('./functionPrototypeBind.js');
require('./requestAnimationFrame.js');
},{"./classList.js":2,"./functionPrototypeBind.js":3,"./requestAnimationFrame.js":5}],5:[function(require,module,exports){
// adds requestAnimationFrame functionality
// Source: http://strd6.com/2011/05/better-window-requestanimationframe-shim/

window.requestAnimationFrame || (window.requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback, element) {
    return window.setTimeout(function() {
      callback(+new Date());
  }, 1000 / 60);
});

},{}],6:[function(require,module,exports){
var RenderNode = require('./RenderNode');
var EventHandler = require('./EventHandler');
var ElementAllocator = require('./ElementAllocator');
var Transform = require('./Transform');
var Transitionable = require('famous/transitions/Transitionable');
var _zeroZero = [
        0,
        0
    ];
var usePrefix = !('perspective' in document.documentElement.style);
function _getElementSize(element) {
    return [
        element.clientWidth,
        element.clientHeight
    ];
}
var _setPerspective = usePrefix ? function (element, perspective) {
        element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
    } : function (element, perspective) {
        element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
    };
function Context(container) {
    this.container = container;
    this._allocator = new ElementAllocator(container);
    this._node = new RenderNode();
    this._eventOutput = new EventHandler();
    this._size = _getElementSize(this.container);
    this._perspectiveState = new Transitionable(0);
    this._perspective = undefined;
    this._nodeContext = {
        allocator: this._allocator,
        transform: Transform.identity,
        opacity: 1,
        origin: _zeroZero,
        align: _zeroZero,
        size: this._size
    };
    this._eventOutput.on('resize', function () {
        this.setSize(_getElementSize(this.container));
    }.bind(this));
}
Context.prototype.getAllocator = function getAllocator() {
    return this._allocator;
};
Context.prototype.add = function add(obj) {
    return this._node.add(obj);
};
Context.prototype.migrate = function migrate(container) {
    if (container === this.container)
        return;
    this.container = container;
    this._allocator.migrate(container);
};
Context.prototype.getSize = function getSize() {
    return this._size;
};
Context.prototype.setSize = function setSize(size) {
    if (!size)
        size = _getElementSize(this.container);
    this._size[0] = size[0];
    this._size[1] = size[1];
};
Context.prototype.update = function update(contextParameters) {
    if (contextParameters) {
        if (contextParameters.transform)
            this._nodeContext.transform = contextParameters.transform;
        if (contextParameters.opacity)
            this._nodeContext.opacity = contextParameters.opacity;
        if (contextParameters.origin)
            this._nodeContext.origin = contextParameters.origin;
        if (contextParameters.align)
            this._nodeContext.align = contextParameters.align;
        if (contextParameters.size)
            this._nodeContext.size = contextParameters.size;
    }
    var perspective = this._perspectiveState.get();
    if (perspective !== this._perspective) {
        _setPerspective(this.container, perspective);
        this._perspective = perspective;
    }
    this._node.commit(this._nodeContext);
};
Context.prototype.getPerspective = function getPerspective() {
    return this._perspectiveState.get();
};
Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
    return this._perspectiveState.set(perspective, transition, callback);
};
Context.prototype.emit = function emit(type, event) {
    return this._eventOutput.emit(type, event);
};
Context.prototype.on = function on(type, handler) {
    return this._eventOutput.on(type, handler);
};
Context.prototype.removeListener = function removeListener(type, handler) {
    return this._eventOutput.removeListener(type, handler);
};
Context.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
Context.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
module.exports = Context;
},{"./ElementAllocator":7,"./EventHandler":12,"./RenderNode":16,"./Transform":20,"famous/transitions/Transitionable":80}],7:[function(require,module,exports){
function ElementAllocator(container) {
    if (!container)
        container = document.createDocumentFragment();
    this.container = container;
    this.detachedNodes = {};
    this.nodeCount = 0;
}
ElementAllocator.prototype.migrate = function migrate(container) {
    var oldContainer = this.container;
    if (container === oldContainer)
        return;
    if (oldContainer instanceof DocumentFragment) {
        container.appendChild(oldContainer);
    } else {
        while (oldContainer.hasChildNodes()) {
            container.appendChild(oldContainer.removeChild(oldContainer.firstChild));
        }
    }
    this.container = container;
};
ElementAllocator.prototype.allocate = function allocate(type) {
    type = type.toLowerCase();
    if (!(type in this.detachedNodes))
        this.detachedNodes[type] = [];
    var nodeStore = this.detachedNodes[type];
    var result;
    if (nodeStore.length > 0) {
        result = nodeStore.pop();
    } else {
        result = document.createElement(type);
        this.container.appendChild(result);
    }
    this.nodeCount++;
    return result;
};
ElementAllocator.prototype.deallocate = function deallocate(element) {
    var nodeType = element.nodeName.toLowerCase();
    var nodeStore = this.detachedNodes[nodeType];
    nodeStore.push(element);
    this.nodeCount--;
};
ElementAllocator.prototype.getNodeCount = function getNodeCount() {
    return this.nodeCount;
};
module.exports = ElementAllocator;
},{}],8:[function(require,module,exports){
var Entity = require('./Entity');
var EventHandler = require('./EventHandler');
var Transform = require('./Transform');
var usePrefix = !('transform' in document.documentElement.style);
var devicePixelRatio = window.devicePixelRatio || 1;
function ElementOutput(element) {
    this._matrix = null;
    this._opacity = 1;
    this._origin = null;
    this._size = null;
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    this.eventForwarder = function eventForwarder(event) {
        this._eventOutput.emit(event.type, event);
    }.bind(this);
    this.id = Entity.register(this);
    this._element = null;
    this._sizeDirty = false;
    this._originDirty = false;
    this._transformDirty = false;
    this._invisible = false;
    if (element)
        this.attach(element);
}
ElementOutput.prototype.on = function on(type, fn) {
    if (this._element)
        this._element.addEventListener(type, this.eventForwarder);
    this._eventOutput.on(type, fn);
};
ElementOutput.prototype.removeListener = function removeListener(type, fn) {
    this._eventOutput.removeListener(type, fn);
};
ElementOutput.prototype.emit = function emit(type, event) {
    if (event && !event.origin)
        event.origin = this;
    var handled = this._eventOutput.emit(type, event);
    if (handled && event && event.stopPropagation)
        event.stopPropagation();
    return handled;
};
ElementOutput.prototype.pipe = function pipe(target) {
    return this._eventOutput.pipe(target);
};
ElementOutput.prototype.unpipe = function unpipe(target) {
    return this._eventOutput.unpipe(target);
};
ElementOutput.prototype.render = function render() {
    return this.id;
};
function _addEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.addEventListener(i, this.eventForwarder);
    }
}
function _removeEventListeners(target) {
    for (var i in this._eventOutput.listeners) {
        target.removeEventListener(i, this.eventForwarder);
    }
}
function _formatCSSTransform(m) {
    m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
    m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;
    var result = 'matrix3d(';
    for (var i = 0; i < 15; i++) {
        result += m[i] < 0.000001 && m[i] > -0.000001 ? '0,' : m[i] + ',';
    }
    result += m[15] + ')';
    return result;
}
var _setMatrix;
if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    _setMatrix = function (element, matrix) {
        element.style.zIndex = matrix[14] * 1000000 | 0;
        element.style.transform = _formatCSSTransform(matrix);
    };
} else if (usePrefix) {
    _setMatrix = function (element, matrix) {
        element.style.webkitTransform = _formatCSSTransform(matrix);
    };
} else {
    _setMatrix = function (element, matrix) {
        element.style.transform = _formatCSSTransform(matrix);
    };
}
function _formatCSSOrigin(origin) {
    return 100 * origin[0] + '% ' + 100 * origin[1] + '%';
}
var _setOrigin = usePrefix ? function (element, origin) {
        element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
    } : function (element, origin) {
        element.style.transformOrigin = _formatCSSOrigin(origin);
    };
var _setInvisible = usePrefix ? function (element) {
        element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
        element.style.opacity = 0;
    } : function (element) {
        element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
        element.style.opacity = 0;
    };
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
ElementOutput.prototype.commit = function commit(context) {
    var target = this._element;
    if (!target)
        return;
    var matrix = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;
    if (!matrix && this._matrix) {
        this._matrix = null;
        this._opacity = 0;
        _setInvisible(target);
        return;
    }
    if (_xyNotEquals(this._origin, origin))
        this._originDirty = true;
    if (Transform.notEquals(this._matrix, matrix))
        this._transformDirty = true;
    if (this._invisible) {
        this._invisible = false;
        this._element.style.display = '';
    }
    if (this._opacity !== opacity) {
        this._opacity = opacity;
        target.style.opacity = opacity >= 1 ? '0.999999' : opacity;
    }
    if (this._transformDirty || this._originDirty || this._sizeDirty) {
        if (this._sizeDirty) {
            if (!this._size)
                this._size = [
                    0,
                    0
                ];
            this._size[0] = size[0];
            this._size[1] = size[1];
            this._sizeDirty = false;
        }
        if (this._originDirty) {
            if (origin) {
                if (!this._origin)
                    this._origin = [
                        0,
                        0
                    ];
                this._origin[0] = origin[0];
                this._origin[1] = origin[1];
            } else
                this._origin = null;
            _setOrigin(target, this._origin);
            this._originDirty = false;
        }
        if (!matrix)
            matrix = Transform.identity;
        this._matrix = matrix;
        var aaMatrix = this._size ? Transform.thenMove(matrix, [
                -this._size[0] * origin[0],
                -this._size[1] * origin[1],
                0
            ]) : matrix;
        _setMatrix(target, aaMatrix);
        this._transformDirty = false;
    }
};
ElementOutput.prototype.cleanup = function cleanup() {
    if (this._element) {
        this._invisible = true;
        this._element.style.display = 'none';
    }
};
ElementOutput.prototype.attach = function attach(target) {
    this._element = target;
    _addEventListeners.call(this, target);
};
ElementOutput.prototype.detach = function detach() {
    var target = this._element;
    if (target) {
        _removeEventListeners.call(this, target);
        if (this._invisible) {
            this._invisible = false;
            this._element.style.display = '';
        }
    }
    this._element = null;
    return target;
};
module.exports = ElementOutput;
},{"./Entity":10,"./EventHandler":12,"./Transform":20}],9:[function(require,module,exports){
var Context = require('./Context');
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var Engine = {};
var contexts = [];
var nextTickQueue = [];
var deferQueue = [];
var lastTime = Date.now();
var frameTime;
var frameTimeLimit;
var loopEnabled = true;
var eventForwarders = {};
var eventHandler = new EventHandler();
var options = {
        containerType: 'div',
        containerClass: 'famous-container',
        fpsCap: undefined,
        runLoop: true,
        appMode: true
    };
var optionsManager = new OptionsManager(options);
var MAX_DEFER_FRAME_TIME = 10;
Engine.step = function step() {
    var currentTime = Date.now();
    if (frameTimeLimit && currentTime - lastTime < frameTimeLimit)
        return;
    var i = 0;
    frameTime = currentTime - lastTime;
    lastTime = currentTime;
    eventHandler.emit('prerender');
    for (i = 0; i < nextTickQueue.length; i++)
        nextTickQueue[i].call(this);
    nextTickQueue.splice(0);
    while (deferQueue.length && Date.now() - currentTime < MAX_DEFER_FRAME_TIME) {
        deferQueue.shift().call(this);
    }
    for (i = 0; i < contexts.length; i++)
        contexts[i].update();
    eventHandler.emit('postrender');
};
function loop() {
    if (options.runLoop) {
        Engine.step();
        window.requestAnimationFrame(loop);
    } else
        loopEnabled = false;
}
window.requestAnimationFrame(loop);
function handleResize(event) {
    for (var i = 0; i < contexts.length; i++) {
        contexts[i].emit('resize');
    }
    eventHandler.emit('resize');
}
window.addEventListener('resize', handleResize, false);
handleResize();
function initialize() {
    window.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, true);
    document.body.classList.add('famous-root');
    document.documentElement.classList.add('famous-root');
}
var initialized = false;
Engine.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(Engine);
    else
        return eventHandler.pipe(target);
};
Engine.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(Engine);
    else
        return eventHandler.unpipe(target);
};
Engine.on = function on(type, handler) {
    if (!(type in eventForwarders)) {
        eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
        if (document.body) {
            document.body.addEventListener(type, eventForwarders[type]);
        } else {
            Engine.nextTick(function (type, forwarder) {
                document.body.addEventListener(type, forwarder);
            }.bind(this, type, eventForwarders[type]));
        }
    }
    return eventHandler.on(type, handler);
};
Engine.emit = function emit(type, event) {
    return eventHandler.emit(type, event);
};
Engine.removeListener = function removeListener(type, handler) {
    return eventHandler.removeListener(type, handler);
};
Engine.getFPS = function getFPS() {
    return 1000 / frameTime;
};
Engine.setFPSCap = function setFPSCap(fps) {
    frameTimeLimit = Math.floor(1000 / fps);
};
Engine.getOptions = function getOptions(key) {
    return optionsManager.getOptions(key);
};
Engine.setOptions = function setOptions(options) {
    return optionsManager.setOptions.apply(optionsManager, arguments);
};
Engine.createContext = function createContext(el) {
    if (!initialized && options.appMode)
        Engine.nextTick(initialize);
    var needMountContainer = false;
    if (!el) {
        el = document.createElement(options.containerType);
        el.classList.add(options.containerClass);
        needMountContainer = true;
    }
    var context = new Context(el);
    Engine.registerContext(context);
    if (needMountContainer) {
        Engine.nextTick(function (context, el) {
            document.body.appendChild(el);
            context.emit('resize');
        }.bind(this, context, el));
    }
    return context;
};
Engine.registerContext = function registerContext(context) {
    contexts.push(context);
    return context;
};
Engine.getContexts = function getContexts() {
    return contexts;
};
Engine.deregisterContext = function deregisterContext(context) {
    var i = contexts.indexOf(context);
    if (i >= 0)
        contexts.splice(i, 1);
};
Engine.nextTick = function nextTick(fn) {
    nextTickQueue.push(fn);
};
Engine.defer = function defer(fn) {
    deferQueue.push(fn);
};
optionsManager.on('change', function (data) {
    if (data.id === 'fpsCap')
        Engine.setFPSCap(data.value);
    else if (data.id === 'runLoop') {
        if (!loopEnabled && data.value) {
            loopEnabled = true;
            window.requestAnimationFrame(loop);
        }
    }
});
module.exports = Engine;
},{"./Context":6,"./EventHandler":12,"./OptionsManager":15}],10:[function(require,module,exports){
var entities = [];
function get(id) {
    return entities[id];
}
function set(id, entity) {
    entities[id] = entity;
}
function register(entity) {
    var id = entities.length;
    set(id, entity);
    return id;
}
function unregister(id) {
    set(id, null);
}
module.exports = {
    register: register,
    unregister: unregister,
    get: get,
    set: set
};
},{}],11:[function(require,module,exports){
function EventEmitter() {
    this.listeners = {};
    this._owner = this;
}
EventEmitter.prototype.emit = function emit(type, event) {
    var handlers = this.listeners[type];
    if (handlers) {
        for (var i = 0; i < handlers.length; i++) {
            handlers[i].call(this._owner, event);
        }
    }
    return this;
};
EventEmitter.prototype.on = function on(type, handler) {
    if (!(type in this.listeners))
        this.listeners[type] = [];
    var index = this.listeners[type].indexOf(handler);
    if (index < 0)
        this.listeners[type].push(handler);
    return this;
};
EventEmitter.prototype.addListener = EventEmitter.prototype.on;
EventEmitter.prototype.removeListener = function removeListener(type, handler) {
    var listener = this.listeners[type];
    if (listener !== undefined) {
        var index = listener.indexOf(handler);
        if (index >= 0)
            listener.splice(index, 1);
    }
    return this;
};
EventEmitter.prototype.bindThis = function bindThis(owner) {
    this._owner = owner;
};
module.exports = EventEmitter;
},{}],12:[function(require,module,exports){
var EventEmitter = require('./EventEmitter');
function EventHandler() {
    EventEmitter.apply(this, arguments);
    this.downstream = [];
    this.downstreamFn = [];
    this.upstream = [];
    this.upstreamListeners = {};
}
EventHandler.prototype = Object.create(EventEmitter.prototype);
EventHandler.prototype.constructor = EventHandler;
EventHandler.setInputHandler = function setInputHandler(object, handler) {
    object.trigger = handler.trigger.bind(handler);
    if (handler.subscribe && handler.unsubscribe) {
        object.subscribe = handler.subscribe.bind(handler);
        object.unsubscribe = handler.unsubscribe.bind(handler);
    }
};
EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
    if (handler instanceof EventHandler)
        handler.bindThis(object);
    object.pipe = handler.pipe.bind(handler);
    object.unpipe = handler.unpipe.bind(handler);
    object.on = handler.on.bind(handler);
    object.addListener = object.on;
    object.removeListener = handler.removeListener.bind(handler);
};
EventHandler.prototype.emit = function emit(type, event) {
    EventEmitter.prototype.emit.apply(this, arguments);
    var i = 0;
    for (i = 0; i < this.downstream.length; i++) {
        if (this.downstream[i].trigger)
            this.downstream[i].trigger(type, event);
    }
    for (i = 0; i < this.downstreamFn.length; i++) {
        this.downstreamFn[i](type, event);
    }
    return this;
};
EventHandler.prototype.trigger = EventHandler.prototype.emit;
EventHandler.prototype.pipe = function pipe(target) {
    if (target.subscribe instanceof Function)
        return target.subscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index < 0)
        downstreamCtx.push(target);
    if (target instanceof Function)
        target('pipe', null);
    else if (target.trigger)
        target.trigger('pipe', null);
    return target;
};
EventHandler.prototype.unpipe = function unpipe(target) {
    if (target.unsubscribe instanceof Function)
        return target.unsubscribe(this);
    var downstreamCtx = target instanceof Function ? this.downstreamFn : this.downstream;
    var index = downstreamCtx.indexOf(target);
    if (index >= 0) {
        downstreamCtx.splice(index, 1);
        if (target instanceof Function)
            target('unpipe', null);
        else if (target.trigger)
            target.trigger('unpipe', null);
        return target;
    } else
        return false;
};
EventHandler.prototype.on = function on(type, handler) {
    EventEmitter.prototype.on.apply(this, arguments);
    if (!(type in this.upstreamListeners)) {
        var upstreamListener = this.trigger.bind(this, type);
        this.upstreamListeners[type] = upstreamListener;
        for (var i = 0; i < this.upstream.length; i++) {
            this.upstream[i].on(type, upstreamListener);
        }
    }
    return this;
};
EventHandler.prototype.addListener = EventHandler.prototype.on;
EventHandler.prototype.subscribe = function subscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index < 0) {
        this.upstream.push(source);
        for (var type in this.upstreamListeners) {
            source.on(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
EventHandler.prototype.unsubscribe = function unsubscribe(source) {
    var index = this.upstream.indexOf(source);
    if (index >= 0) {
        this.upstream.splice(index, 1);
        for (var type in this.upstreamListeners) {
            source.removeListener(type, this.upstreamListeners[type]);
        }
    }
    return this;
};
module.exports = EventHandler;
},{"./EventEmitter":11}],13:[function(require,module,exports){
var Context = require('./Context');
var Transform = require('./Transform');
var Surface = require('./Surface');
function Group(options) {
    Surface.call(this, options);
    this._shouldRecalculateSize = false;
    this._container = document.createDocumentFragment();
    this.context = new Context(this._container);
    this.setContent(this._container);
    this._groupSize = [
        undefined,
        undefined
    ];
}
Group.SIZE_ZERO = [
    0,
    0
];
Group.prototype = Object.create(Surface.prototype);
Group.prototype.elementType = 'div';
Group.prototype.elementClass = 'famous-group';
Group.prototype.add = function add() {
    return this.context.add.apply(this.context, arguments);
};
Group.prototype.render = function render() {
    return Surface.prototype.render.call(this);
};
Group.prototype.deploy = function deploy(target) {
    this.context.migrate(target);
};
Group.prototype.recall = function recall(target) {
    this._container = document.createDocumentFragment();
    this.context.migrate(this._container);
};
Group.prototype.commit = function commit(context) {
    var transform = context.transform;
    var origin = context.origin;
    var opacity = context.opacity;
    var size = context.size;
    var result = Surface.prototype.commit.call(this, {
            allocator: context.allocator,
            transform: Transform.thenMove(transform, [
                -origin[0] * size[0],
                -origin[1] * size[1],
                0
            ]),
            opacity: opacity,
            origin: origin,
            size: Group.SIZE_ZERO
        });
    if (size[0] !== this._groupSize[0] || size[1] !== this._groupSize[1]) {
        this._groupSize[0] = size[0];
        this._groupSize[1] = size[1];
        this.context.setSize(size);
    }
    this.context.update({
        transform: Transform.translate(-origin[0] * size[0], -origin[1] * size[1], 0),
        origin: origin,
        size: size
    });
    return result;
};
module.exports = Group;
},{"./Context":6,"./Surface":19,"./Transform":20}],14:[function(require,module,exports){
var Transform = require('./Transform');
var Transitionable = require('famous/transitions/Transitionable');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');
function Modifier(options) {
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
    this._legacyStates = {};
    this._output = {
        transform: Transform.identity,
        opacity: 1,
        origin: null,
        align: null,
        size: null,
        proportions: null,
        target: null
    };
    if (options) {
        if (options.transform)
            this.transformFrom(options.transform);
        if (options.opacity !== undefined)
            this.opacityFrom(options.opacity);
        if (options.origin)
            this.originFrom(options.origin);
        if (options.align)
            this.alignFrom(options.align);
        if (options.size)
            this.sizeFrom(options.size);
        if (options.proportions)
            this.proportionsFrom(options.proportions);
    }
}
Modifier.prototype.transformFrom = function transformFrom(transform) {
    if (transform instanceof Function)
        this._transformGetter = transform;
    else if (transform instanceof Object && transform.get)
        this._transformGetter = transform.get.bind(transform);
    else {
        this._transformGetter = null;
        this._output.transform = transform;
    }
    return this;
};
Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
    if (opacity instanceof Function)
        this._opacityGetter = opacity;
    else if (opacity instanceof Object && opacity.get)
        this._opacityGetter = opacity.get.bind(opacity);
    else {
        this._opacityGetter = null;
        this._output.opacity = opacity;
    }
    return this;
};
Modifier.prototype.originFrom = function originFrom(origin) {
    if (origin instanceof Function)
        this._originGetter = origin;
    else if (origin instanceof Object && origin.get)
        this._originGetter = origin.get.bind(origin);
    else {
        this._originGetter = null;
        this._output.origin = origin;
    }
    return this;
};
Modifier.prototype.alignFrom = function alignFrom(align) {
    if (align instanceof Function)
        this._alignGetter = align;
    else if (align instanceof Object && align.get)
        this._alignGetter = align.get.bind(align);
    else {
        this._alignGetter = null;
        this._output.align = align;
    }
    return this;
};
Modifier.prototype.sizeFrom = function sizeFrom(size) {
    if (size instanceof Function)
        this._sizeGetter = size;
    else if (size instanceof Object && size.get)
        this._sizeGetter = size.get.bind(size);
    else {
        this._sizeGetter = null;
        this._output.size = size;
    }
    return this;
};
Modifier.prototype.proportionsFrom = function proportionsFrom(proportions) {
    if (proportions instanceof Function)
        this._proportionGetter = proportions;
    else if (proportions instanceof Object && proportions.get)
        this._proportionGetter = proportions.get.bind(proportions);
    else {
        this._proportionGetter = null;
        this._output.proportions = proportions;
    }
    return this;
};
Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    if (transition || this._legacyStates.transform) {
        if (!this._legacyStates.transform) {
            this._legacyStates.transform = new TransitionableTransform(this._output.transform);
        }
        if (!this._transformGetter)
            this.transformFrom(this._legacyStates.transform);
        this._legacyStates.transform.set(transform, transition, callback);
        return this;
    } else
        return this.transformFrom(transform);
};
Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    if (transition || this._legacyStates.opacity) {
        if (!this._legacyStates.opacity) {
            this._legacyStates.opacity = new Transitionable(this._output.opacity);
        }
        if (!this._opacityGetter)
            this.opacityFrom(this._legacyStates.opacity);
        return this._legacyStates.opacity.set(opacity, transition, callback);
    } else
        return this.opacityFrom(opacity);
};
Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (transition || this._legacyStates.origin) {
        if (!this._legacyStates.origin) {
            this._legacyStates.origin = new Transitionable(this._output.origin || [
                0,
                0
            ]);
        }
        if (!this._originGetter)
            this.originFrom(this._legacyStates.origin);
        this._legacyStates.origin.set(origin, transition, callback);
        return this;
    } else
        return this.originFrom(origin);
};
Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
    if (transition || this._legacyStates.align) {
        if (!this._legacyStates.align) {
            this._legacyStates.align = new Transitionable(this._output.align || [
                0,
                0
            ]);
        }
        if (!this._alignGetter)
            this.alignFrom(this._legacyStates.align);
        this._legacyStates.align.set(align, transition, callback);
        return this;
    } else
        return this.alignFrom(align);
};
Modifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size && (transition || this._legacyStates.size)) {
        if (!this._legacyStates.size) {
            this._legacyStates.size = new Transitionable(this._output.size || [
                0,
                0
            ]);
        }
        if (!this._sizeGetter)
            this.sizeFrom(this._legacyStates.size);
        this._legacyStates.size.set(size, transition, callback);
        return this;
    } else
        return this.sizeFrom(size);
};
Modifier.prototype.setProportions = function setProportions(proportions, transition, callback) {
    if (proportions && (transition || this._legacyStates.proportions)) {
        if (!this._legacyStates.proportions) {
            this._legacyStates.proportions = new Transitionable(this._output.proportions || [
                0,
                0
            ]);
        }
        if (!this._proportionGetter)
            this.proportionsFrom(this._legacyStates.proportions);
        this._legacyStates.proportions.set(proportions, transition, callback);
        return this;
    } else
        return this.proportionsFrom(proportions);
};
Modifier.prototype.halt = function halt() {
    if (this._legacyStates.transform)
        this._legacyStates.transform.halt();
    if (this._legacyStates.opacity)
        this._legacyStates.opacity.halt();
    if (this._legacyStates.origin)
        this._legacyStates.origin.halt();
    if (this._legacyStates.align)
        this._legacyStates.align.halt();
    if (this._legacyStates.size)
        this._legacyStates.size.halt();
    if (this._legacyStates.proportions)
        this._legacyStates.proportions.halt();
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
    this._proportionGetter = null;
};
Modifier.prototype.getTransform = function getTransform() {
    return this._transformGetter();
};
Modifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
};
Modifier.prototype.getOpacity = function getOpacity() {
    return this._opacityGetter();
};
Modifier.prototype.getOrigin = function getOrigin() {
    return this._originGetter();
};
Modifier.prototype.getAlign = function getAlign() {
    return this._alignGetter();
};
Modifier.prototype.getSize = function getSize() {
    return this._sizeGetter ? this._sizeGetter() : this._output.size;
};
Modifier.prototype.getProportions = function getProportions() {
    return this._proportionGetter ? this._proportionGetter() : this._output.proportions;
};
function _update() {
    if (this._transformGetter)
        this._output.transform = this._transformGetter();
    if (this._opacityGetter)
        this._output.opacity = this._opacityGetter();
    if (this._originGetter)
        this._output.origin = this._originGetter();
    if (this._alignGetter)
        this._output.align = this._alignGetter();
    if (this._sizeGetter)
        this._output.size = this._sizeGetter();
    if (this._proportionGetter)
        this._output.proportions = this._proportionGetter();
}
Modifier.prototype.modify = function modify(target) {
    _update.call(this);
    this._output.target = target;
    return this._output;
};
module.exports = Modifier;
},{"./Transform":20,"famous/transitions/Transitionable":80,"famous/transitions/TransitionableTransform":81}],15:[function(require,module,exports){
var EventHandler = require('./EventHandler');
function OptionsManager(value) {
    this._value = value;
    this.eventOutput = null;
}
OptionsManager.patch = function patchObject(source, data) {
    var manager = new OptionsManager(source);
    for (var i = 1; i < arguments.length; i++)
        manager.patch(arguments[i]);
    return source;
};
function _createEventOutput() {
    this.eventOutput = new EventHandler();
    this.eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this.eventOutput);
}
OptionsManager.prototype.patch = function patch() {
    var myState = this._value;
    for (var i = 0; i < arguments.length; i++) {
        var data = arguments[i];
        for (var k in data) {
            if (k in myState && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
                if (!myState.hasOwnProperty(k))
                    myState[k] = Object.create(myState[k]);
                this.key(k).patch(data[k]);
                if (this.eventOutput)
                    this.eventOutput.emit('change', {
                        id: k,
                        value: this.key(k).value()
                    });
            } else
                this.set(k, data[k]);
        }
    }
    return this;
};
OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;
OptionsManager.prototype.key = function key(identifier) {
    var result = new OptionsManager(this._value[identifier]);
    if (!(result._value instanceof Object) || result._value instanceof Array)
        result._value = {};
    return result;
};
OptionsManager.prototype.get = function get(key) {
    return key ? this._value[key] : this._value;
};
OptionsManager.prototype.getOptions = OptionsManager.prototype.get;
OptionsManager.prototype.set = function set(key, value) {
    var originalValue = this.get(key);
    this._value[key] = value;
    if (this.eventOutput && value !== originalValue)
        this.eventOutput.emit('change', {
            id: key,
            value: value
        });
    return this;
};
OptionsManager.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
OptionsManager.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
OptionsManager.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
OptionsManager.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};
module.exports = OptionsManager;
},{"./EventHandler":12}],16:[function(require,module,exports){
var Entity = require('./Entity');
var SpecParser = require('./SpecParser');
function RenderNode(object) {
    this._object = null;
    this._child = null;
    this._hasMultipleChildren = false;
    this._isRenderable = false;
    this._isModifier = false;
    this._resultCache = {};
    this._prevResults = {};
    this._childResult = null;
    if (object)
        this.set(object);
}
RenderNode.prototype.add = function add(child) {
    var childNode = child instanceof RenderNode ? child : new RenderNode(child);
    if (this._child instanceof Array)
        this._child.push(childNode);
    else if (this._child) {
        this._child = [
            this._child,
            childNode
        ];
        this._hasMultipleChildren = true;
        this._childResult = [];
    } else
        this._child = childNode;
    return childNode;
};
RenderNode.prototype.get = function get() {
    return this._object || (this._hasMultipleChildren ? null : this._child ? this._child.get() : null);
};
RenderNode.prototype.set = function set(child) {
    this._childResult = null;
    this._hasMultipleChildren = false;
    this._isRenderable = child.render ? true : false;
    this._isModifier = child.modify ? true : false;
    this._object = child;
    this._child = null;
    if (child instanceof RenderNode)
        return child;
    else
        return this;
};
RenderNode.prototype.getSize = function getSize() {
    var result = null;
    var target = this.get();
    if (target && target.getSize)
        result = target.getSize();
    if (!result && this._child && this._child.getSize)
        result = this._child.getSize();
    return result;
};
function _applyCommit(spec, context, cacheStorage) {
    var result = SpecParser.parse(spec, context);
    var keys = Object.keys(result);
    for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var childNode = Entity.get(id);
        var commitParams = result[id];
        commitParams.allocator = context.allocator;
        var commitResult = childNode.commit(commitParams);
        if (commitResult)
            _applyCommit(commitResult, context, cacheStorage);
        else
            cacheStorage[id] = commitParams;
    }
}
RenderNode.prototype.commit = function commit(context) {
    var prevKeys = Object.keys(this._prevResults);
    for (var i = 0; i < prevKeys.length; i++) {
        var id = prevKeys[i];
        if (this._resultCache[id] === undefined) {
            var object = Entity.get(id);
            if (object.cleanup)
                object.cleanup(context.allocator);
        }
    }
    this._prevResults = this._resultCache;
    this._resultCache = {};
    _applyCommit(this.render(), context, this._resultCache);
};
RenderNode.prototype.render = function render() {
    if (this._isRenderable)
        return this._object.render();
    var result = null;
    if (this._hasMultipleChildren) {
        result = this._childResult;
        var children = this._child;
        for (var i = 0; i < children.length; i++) {
            result[i] = children[i].render();
        }
    } else if (this._child)
        result = this._child.render();
    return this._isModifier ? this._object.modify(result) : result;
};
module.exports = RenderNode;
},{"./Entity":10,"./SpecParser":18}],17:[function(require,module,exports){
var Transform = require('./Transform');
var Modifier = require('./Modifier');
var RenderNode = require('./RenderNode');
function Scene(definition) {
    this.id = null;
    this._objects = null;
    this.node = new RenderNode();
    this._definition = null;
    if (definition)
        this.load(definition);
}
var _MATRIX_GENERATORS = {
        'translate': Transform.translate,
        'rotate': Transform.rotate,
        'rotateX': Transform.rotateX,
        'rotateY': Transform.rotateY,
        'rotateZ': Transform.rotateZ,
        'rotateAxis': Transform.rotateAxis,
        'scale': Transform.scale,
        'skew': Transform.skew,
        'matrix3d': function () {
            return arguments;
        }
    };
Scene.prototype.create = function create() {
    return new Scene(this._definition);
};
function _resolveTransformMatrix(matrixDefinition) {
    for (var type in _MATRIX_GENERATORS) {
        if (type in matrixDefinition) {
            var args = matrixDefinition[type];
            if (!(args instanceof Array))
                args = [args];
            return _MATRIX_GENERATORS[type].apply(this, args);
        }
    }
}
function _parseTransform(definition) {
    var transformDefinition = definition.transform;
    var opacity = definition.opacity;
    var origin = definition.origin;
    var align = definition.align;
    var size = definition.size;
    var transform = Transform.identity;
    if (transformDefinition instanceof Array) {
        if (transformDefinition.length === 16 && typeof transformDefinition[0] === 'number') {
            transform = transformDefinition;
        } else {
            for (var i = 0; i < transformDefinition.length; i++) {
                transform = Transform.multiply(transform, _resolveTransformMatrix(transformDefinition[i]));
            }
        }
    } else if (transformDefinition instanceof Function) {
        transform = transformDefinition;
    } else if (transformDefinition instanceof Object) {
        transform = _resolveTransformMatrix(transformDefinition);
    }
    var result = new Modifier({
            transform: transform,
            opacity: opacity,
            origin: origin,
            align: align,
            size: size
        });
    return result;
}
function _parseArray(definition) {
    var result = new RenderNode();
    for (var i = 0; i < definition.length; i++) {
        var obj = _parse.call(this, definition[i]);
        if (obj)
            result.add(obj);
    }
    return result;
}
function _parse(definition) {
    var result;
    var id;
    if (definition instanceof Array) {
        result = _parseArray.call(this, definition);
    } else {
        id = this._objects.length;
        if (definition.render && definition.render instanceof Function) {
            result = definition;
        } else if (definition.target) {
            var targetObj = _parse.call(this, definition.target);
            var obj = _parseTransform.call(this, definition);
            result = new RenderNode(obj);
            result.add(targetObj);
            if (definition.id)
                this.id[definition.id] = obj;
        } else if (definition.id) {
            result = new RenderNode();
            this.id[definition.id] = result;
        }
    }
    this._objects[id] = result;
    return result;
}
Scene.prototype.load = function load(definition) {
    this._definition = definition;
    this.id = {};
    this._objects = [];
    this.node.set(_parse.call(this, definition));
};
Scene.prototype.add = function add() {
    return this.node.add.apply(this.node, arguments);
};
Scene.prototype.render = function render() {
    return this.node.render.apply(this.node, arguments);
};
module.exports = Scene;
},{"./Modifier":14,"./RenderNode":16,"./Transform":20}],18:[function(require,module,exports){
var Transform = require('./Transform');
function SpecParser() {
    this.result = {};
}
SpecParser._instance = new SpecParser();
SpecParser.parse = function parse(spec, context) {
    return SpecParser._instance.parse(spec, context);
};
SpecParser.prototype.parse = function parse(spec, context) {
    this.reset();
    this._parseSpec(spec, context, Transform.identity);
    return this.result;
};
SpecParser.prototype.reset = function reset() {
    this.result = {};
};
function _vecInContext(v, m) {
    return [
        v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
        v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
        v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
    ];
}
var _zeroZero = [
        0,
        0
    ];
SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
    var id;
    var target;
    var transform;
    var opacity;
    var origin;
    var align;
    var size;
    if (typeof spec === 'number') {
        id = spec;
        transform = parentContext.transform;
        align = parentContext.align || _zeroZero;
        if (parentContext.size && align && (align[0] || align[1])) {
            var alignAdjust = [
                    align[0] * parentContext.size[0],
                    align[1] * parentContext.size[1],
                    0
                ];
            transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
        }
        this.result[id] = {
            transform: transform,
            opacity: parentContext.opacity,
            origin: parentContext.origin || _zeroZero,
            align: parentContext.align || _zeroZero,
            size: parentContext.size
        };
    } else if (!spec) {
        return;
    } else if (spec instanceof Array) {
        for (var i = 0; i < spec.length; i++) {
            this._parseSpec(spec[i], parentContext, sizeContext);
        }
    } else {
        target = spec.target;
        transform = parentContext.transform;
        opacity = parentContext.opacity;
        origin = parentContext.origin;
        align = parentContext.align;
        size = parentContext.size;
        var nextSizeContext = sizeContext;
        if (spec.opacity !== undefined)
            opacity = parentContext.opacity * spec.opacity;
        if (spec.transform)
            transform = Transform.multiply(parentContext.transform, spec.transform);
        if (spec.origin) {
            origin = spec.origin;
            nextSizeContext = parentContext.transform;
        }
        if (spec.align)
            align = spec.align;
        if (spec.size || spec.proportions) {
            var parentSize = size;
            size = [
                size[0],
                size[1]
            ];
            if (spec.size) {
                if (spec.size[0] !== undefined)
                    size[0] = spec.size[0];
                if (spec.size[1] !== undefined)
                    size[1] = spec.size[1];
            }
            if (spec.proportions) {
                if (spec.proportions[0] !== undefined)
                    size[0] = size[0] * spec.proportions[0];
                if (spec.proportions[1] !== undefined)
                    size[1] = size[1] * spec.proportions[1];
            }
            if (parentSize) {
                if (align && (align[0] || align[1]))
                    transform = Transform.thenMove(transform, _vecInContext([
                        align[0] * parentSize[0],
                        align[1] * parentSize[1],
                        0
                    ], sizeContext));
                if (origin && (origin[0] || origin[1]))
                    transform = Transform.moveThen([
                        -origin[0] * size[0],
                        -origin[1] * size[1],
                        0
                    ], transform);
            }
            nextSizeContext = parentContext.transform;
            origin = null;
            align = null;
        }
        this._parseSpec(target, {
            transform: transform,
            opacity: opacity,
            origin: origin,
            align: align,
            size: size
        }, nextSizeContext);
    }
};
module.exports = SpecParser;
},{"./Transform":20}],19:[function(require,module,exports){
var ElementOutput = require('./ElementOutput');
function Surface(options) {
    ElementOutput.call(this);
    this.options = {};
    this.properties = {};
    this.attributes = {};
    this.content = '';
    this.classList = [];
    this.size = null;
    this._classesDirty = true;
    this._stylesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._trueSizeCheck = true;
    this._dirtyClasses = [];
    if (options)
        this.setOptions(options);
    this._currentTarget = null;
}
Surface.prototype = Object.create(ElementOutput.prototype);
Surface.prototype.constructor = Surface;
Surface.prototype.elementType = 'div';
Surface.prototype.elementClass = 'famous-surface';
Surface.prototype.setAttributes = function setAttributes(attributes) {
    for (var n in attributes) {
        if (n === 'style')
            throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
        this.attributes[n] = attributes[n];
    }
    this._attributesDirty = true;
};
Surface.prototype.getAttributes = function getAttributes() {
    return this.attributes;
};
Surface.prototype.setProperties = function setProperties(properties) {
    for (var n in properties) {
        this.properties[n] = properties[n];
    }
    this._stylesDirty = true;
    return this;
};
Surface.prototype.getProperties = function getProperties() {
    return this.properties;
};
Surface.prototype.addClass = function addClass(className) {
    if (this.classList.indexOf(className) < 0) {
        this.classList.push(className);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.removeClass = function removeClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
        this._classesDirty = true;
    }
    return this;
};
Surface.prototype.toggleClass = function toggleClass(className) {
    var i = this.classList.indexOf(className);
    if (i >= 0) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }
    return this;
};
Surface.prototype.setClasses = function setClasses(classList) {
    var i = 0;
    var removal = [];
    for (i = 0; i < this.classList.length; i++) {
        if (classList.indexOf(this.classList[i]) < 0)
            removal.push(this.classList[i]);
    }
    for (i = 0; i < removal.length; i++)
        this.removeClass(removal[i]);
    for (i = 0; i < classList.length; i++)
        this.addClass(classList[i]);
    return this;
};
Surface.prototype.getClassList = function getClassList() {
    return this.classList;
};
Surface.prototype.setContent = function setContent(content) {
    if (this.content !== content) {
        this.content = content;
        this._contentDirty = true;
    }
    return this;
};
Surface.prototype.getContent = function getContent() {
    return this.content;
};
Surface.prototype.setOptions = function setOptions(options) {
    if (options.size)
        this.setSize(options.size);
    if (options.classes)
        this.setClasses(options.classes);
    if (options.properties)
        this.setProperties(options.properties);
    if (options.attributes)
        this.setAttributes(options.attributes);
    if (options.content)
        this.setContent(options.content);
    return this;
};
function _cleanupClasses(target) {
    for (var i = 0; i < this._dirtyClasses.length; i++)
        target.classList.remove(this._dirtyClasses[i]);
    this._dirtyClasses = [];
}
function _applyStyles(target) {
    for (var n in this.properties) {
        target.style[n] = this.properties[n];
    }
}
function _cleanupStyles(target) {
    for (var n in this.properties) {
        target.style[n] = '';
    }
}
function _applyAttributes(target) {
    for (var n in this.attributes) {
        target.setAttribute(n, this.attributes[n]);
    }
}
function _cleanupAttributes(target) {
    for (var n in this.attributes) {
        target.removeAttribute(n);
    }
}
function _xyNotEquals(a, b) {
    return a && b ? a[0] !== b[0] || a[1] !== b[1] : a !== b;
}
Surface.prototype.setup = function setup(allocator) {
    var target = allocator.allocate(this.elementType);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (var i = 0; i < this.elementClass.length; i++) {
                target.classList.add(this.elementClass[i]);
            }
        } else {
            target.classList.add(this.elementClass);
        }
    }
    target.style.display = '';
    this.attach(target);
    this._opacity = null;
    this._currentTarget = target;
    this._stylesDirty = true;
    this._classesDirty = true;
    this._attributesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._originDirty = true;
    this._transformDirty = true;
};
Surface.prototype.commit = function commit(context) {
    if (!this._currentTarget)
        this.setup(context.allocator);
    var target = this._currentTarget;
    var size = context.size;
    if (this._classesDirty) {
        _cleanupClasses.call(this, target);
        var classList = this.getClassList();
        for (var i = 0; i < classList.length; i++)
            target.classList.add(classList[i]);
        this._classesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._stylesDirty) {
        _applyStyles.call(this, target);
        this._stylesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this._attributesDirty) {
        _applyAttributes.call(this, target);
        this._attributesDirty = false;
        this._trueSizeCheck = true;
    }
    if (this.size) {
        var origSize = context.size;
        size = [
            this.size[0],
            this.size[1]
        ];
        if (size[0] === undefined)
            size[0] = origSize[0];
        if (size[1] === undefined)
            size[1] = origSize[1];
        if (size[0] === true || size[1] === true) {
            if (size[0] === true && (this._trueSizeCheck || this._size[0] === 0)) {
                var width = target.clientWidth;
                if (this._size && this._size[0] !== width) {
                    this._size[0] = width;
                    this._sizeDirty = true;
                }
                size[0] = width;
            } else {
                if (this._size)
                    size[0] = this._size[0];
            }
            if (size[1] === true && (this._trueSizeCheck || this._size[1] === 0)) {
                var height = target.clientHeight;
                if (this._size && this._size[1] !== height) {
                    this._size[1] = height;
                    this._sizeDirty = true;
                }
                size[1] = height;
            } else {
                if (this._size)
                    size[1] = this._size[1];
            }
            this._trueSizeCheck = false;
        }
    }
    if (_xyNotEquals(this._size, size)) {
        if (!this._size)
            this._size = [
                0,
                0
            ];
        this._size[0] = size[0];
        this._size[1] = size[1];
        this._sizeDirty = true;
    }
    if (this._sizeDirty) {
        if (this._size) {
            target.style.width = this.size && this.size[0] === true ? '' : this._size[0] + 'px';
            target.style.height = this.size && this.size[1] === true ? '' : this._size[1] + 'px';
        }
        this._eventOutput.emit('resize');
        this._sizeDirty = false;
    }
    if (this._contentDirty) {
        this.deploy(target);
        this._eventOutput.emit('deploy');
        this._contentDirty = false;
        this._trueSizeCheck = true;
    }
    ElementOutput.prototype.commit.call(this, context);
};
Surface.prototype.cleanup = function cleanup(allocator) {
    var i = 0;
    var target = this._currentTarget;
    this._eventOutput.emit('recall');
    this.recall(target);
    target.style.display = 'none';
    target.style.opacity = '';
    target.style.width = '';
    target.style.height = '';
    _cleanupStyles.call(this, target);
    _cleanupAttributes.call(this, target);
    var classList = this.getClassList();
    _cleanupClasses.call(this, target);
    for (i = 0; i < classList.length; i++)
        target.classList.remove(classList[i]);
    if (this.elementClass) {
        if (this.elementClass instanceof Array) {
            for (i = 0; i < this.elementClass.length; i++) {
                target.classList.remove(this.elementClass[i]);
            }
        } else {
            target.classList.remove(this.elementClass);
        }
    }
    this.detach(target);
    this._currentTarget = null;
    allocator.deallocate(target);
};
Surface.prototype.deploy = function deploy(target) {
    var content = this.getContent();
    if (content instanceof Node) {
        while (target.hasChildNodes())
            target.removeChild(target.firstChild);
        target.appendChild(content);
    } else
        target.innerHTML = content;
};
Surface.prototype.recall = function recall(target) {
    var df = document.createDocumentFragment();
    while (target.hasChildNodes())
        df.appendChild(target.firstChild);
    this.setContent(df);
};
Surface.prototype.getSize = function getSize() {
    return this._size ? this._size : this.size;
};
Surface.prototype.setSize = function setSize(size) {
    this.size = size ? [
        size[0],
        size[1]
    ] : null;
    this._sizeDirty = true;
    return this;
};
module.exports = Surface;
},{"./ElementOutput":8}],20:[function(require,module,exports){
var Transform = {};
Transform.precision = 0.000001;
Transform.identity = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1
];
Transform.multiply4x4 = function multiply4x4(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
        a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
        a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
        a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
        a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
    ];
};
Transform.multiply = function multiply(a, b) {
    return [
        a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
        a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
        a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
        0,
        a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
        a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
        a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
        0,
        a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
        a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
        a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
        0,
        a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
        a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
        a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
        1
    ];
};
Transform.thenMove = function thenMove(m, t) {
    if (!t[2])
        t[2] = 0;
    return [
        m[0],
        m[1],
        m[2],
        0,
        m[4],
        m[5],
        m[6],
        0,
        m[8],
        m[9],
        m[10],
        0,
        m[12] + t[0],
        m[13] + t[1],
        m[14] + t[2],
        1
    ];
};
Transform.moveThen = function moveThen(v, m) {
    if (!v[2])
        v[2] = 0;
    var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
    var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
    var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.translate = function translate(x, y, z) {
    if (z === undefined)
        z = 0;
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        x,
        y,
        z,
        1
    ];
};
Transform.thenScale = function thenScale(m, s) {
    return [
        s[0] * m[0],
        s[1] * m[1],
        s[2] * m[2],
        0,
        s[0] * m[4],
        s[1] * m[5],
        s[2] * m[6],
        0,
        s[0] * m[8],
        s[1] * m[9],
        s[2] * m[10],
        0,
        s[0] * m[12],
        s[1] * m[13],
        s[2] * m[14],
        1
    ];
};
Transform.scale = function scale(x, y, z) {
    if (z === undefined)
        z = 1;
    if (y === undefined)
        y = x;
    return [
        x,
        0,
        0,
        0,
        0,
        y,
        0,
        0,
        0,
        0,
        z,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateX = function rotateX(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        1,
        0,
        0,
        0,
        0,
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateY = function rotateY(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        0,
        -sinTheta,
        0,
        0,
        1,
        0,
        0,
        sinTheta,
        0,
        cosTheta,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotateZ = function rotateZ(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        cosTheta,
        sinTheta,
        0,
        0,
        -sinTheta,
        cosTheta,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.rotate = function rotate(phi, theta, psi) {
    var cosPhi = Math.cos(phi);
    var sinPhi = Math.sin(phi);
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    var cosPsi = Math.cos(psi);
    var sinPsi = Math.sin(psi);
    var result = [
            cosTheta * cosPsi,
            cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
            sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
            0,
            -cosTheta * sinPsi,
            cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
            sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
            0,
            sinTheta,
            -sinPhi * cosTheta,
            cosPhi * cosTheta,
            0,
            0,
            0,
            0,
            1
        ];
    return result;
};
Transform.rotateAxis = function rotateAxis(v, theta) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    var verTheta = 1 - cosTheta;
    var xxV = v[0] * v[0] * verTheta;
    var xyV = v[0] * v[1] * verTheta;
    var xzV = v[0] * v[2] * verTheta;
    var yyV = v[1] * v[1] * verTheta;
    var yzV = v[1] * v[2] * verTheta;
    var zzV = v[2] * v[2] * verTheta;
    var xs = v[0] * sinTheta;
    var ys = v[1] * sinTheta;
    var zs = v[2] * sinTheta;
    var result = [
            xxV + cosTheta,
            xyV + zs,
            xzV - ys,
            0,
            xyV - zs,
            yyV + cosTheta,
            yzV + xs,
            0,
            xzV + ys,
            yzV - xs,
            zzV + cosTheta,
            0,
            0,
            0,
            0,
            1
        ];
    return result;
};
Transform.aboutOrigin = function aboutOrigin(v, m) {
    var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
    var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
    var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
    return Transform.thenMove(m, [
        t0,
        t1,
        t2
    ]);
};
Transform.skew = function skew(phi, theta, psi) {
    return [
        1,
        Math.tan(theta),
        0,
        0,
        Math.tan(psi),
        1,
        0,
        0,
        0,
        Math.tan(phi),
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewX = function skewX(angle) {
    return [
        1,
        0,
        0,
        0,
        Math.tan(angle),
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.skewY = function skewY(angle) {
    return [
        1,
        Math.tan(angle),
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
    ];
};
Transform.perspective = function perspective(focusZ) {
    return [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        -1 / focusZ,
        0,
        0,
        0,
        1
    ];
};
Transform.getTranslate = function getTranslate(m) {
    return [
        m[12],
        m[13],
        m[14]
    ];
};
Transform.inverse = function inverse(m) {
    var c0 = m[5] * m[10] - m[6] * m[9];
    var c1 = m[4] * m[10] - m[6] * m[8];
    var c2 = m[4] * m[9] - m[5] * m[8];
    var c4 = m[1] * m[10] - m[2] * m[9];
    var c5 = m[0] * m[10] - m[2] * m[8];
    var c6 = m[0] * m[9] - m[1] * m[8];
    var c8 = m[1] * m[6] - m[2] * m[5];
    var c9 = m[0] * m[6] - m[2] * m[4];
    var c10 = m[0] * m[5] - m[1] * m[4];
    var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
    var invD = 1 / detM;
    var result = [
            invD * c0,
            -invD * c4,
            invD * c8,
            0,
            -invD * c1,
            invD * c5,
            -invD * c9,
            0,
            invD * c2,
            -invD * c6,
            invD * c10,
            0,
            0,
            0,
            0,
            1
        ];
    result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
    result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
    result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
    return result;
};
Transform.transpose = function transpose(m) {
    return [
        m[0],
        m[4],
        m[8],
        m[12],
        m[1],
        m[5],
        m[9],
        m[13],
        m[2],
        m[6],
        m[10],
        m[14],
        m[3],
        m[7],
        m[11],
        m[15]
    ];
};
function _normSquared(v) {
    return v.length === 2 ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
}
function _norm(v) {
    return Math.sqrt(_normSquared(v));
}
function _sign(n) {
    return n < 0 ? -1 : 1;
}
Transform.interpret = function interpret(M) {
    var x = [
            M[0],
            M[1],
            M[2]
        ];
    var sgn = _sign(x[0]);
    var xNorm = _norm(x);
    var v = [
            x[0] + sgn * xNorm,
            x[1],
            x[2]
        ];
    var mult = 2 / _normSquared(v);
    if (mult >= Infinity) {
        return {
            translate: Transform.getTranslate(M),
            rotate: [
                0,
                0,
                0
            ],
            scale: [
                0,
                0,
                0
            ],
            skew: [
                0,
                0,
                0
            ]
        };
    }
    var Q1 = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
        ];
    Q1[0] = 1 - mult * v[0] * v[0];
    Q1[5] = 1 - mult * v[1] * v[1];
    Q1[10] = 1 - mult * v[2] * v[2];
    Q1[1] = -mult * v[0] * v[1];
    Q1[2] = -mult * v[0] * v[2];
    Q1[6] = -mult * v[1] * v[2];
    Q1[4] = Q1[1];
    Q1[8] = Q1[2];
    Q1[9] = Q1[6];
    var MQ1 = Transform.multiply(Q1, M);
    var x2 = [
            MQ1[5],
            MQ1[6]
        ];
    var sgn2 = _sign(x2[0]);
    var x2Norm = _norm(x2);
    var v2 = [
            x2[0] + sgn2 * x2Norm,
            x2[1]
        ];
    var mult2 = 2 / _normSquared(v2);
    var Q2 = [
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1
        ];
    Q2[5] = 1 - mult2 * v2[0] * v2[0];
    Q2[10] = 1 - mult2 * v2[1] * v2[1];
    Q2[6] = -mult2 * v2[0] * v2[1];
    Q2[9] = Q2[6];
    var Q = Transform.multiply(Q2, Q1);
    var R = Transform.multiply(Q, M);
    var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
    R = Transform.multiply(R, remover);
    Q = Transform.multiply(remover, Q);
    var result = {};
    result.translate = Transform.getTranslate(M);
    result.rotate = [
        Math.atan2(-Q[6], Q[10]),
        Math.asin(Q[2]),
        Math.atan2(-Q[1], Q[0])
    ];
    if (!result.rotate[0]) {
        result.rotate[0] = 0;
        result.rotate[2] = Math.atan2(Q[4], Q[5]);
    }
    result.scale = [
        R[0],
        R[5],
        R[10]
    ];
    result.skew = [
        Math.atan2(R[9], result.scale[2]),
        Math.atan2(R[8], result.scale[2]),
        Math.atan2(R[4], result.scale[0])
    ];
    if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
        result.rotate[1] = Math.PI - result.rotate[1];
        if (result.rotate[1] > Math.PI)
            result.rotate[1] -= 2 * Math.PI;
        if (result.rotate[1] < -Math.PI)
            result.rotate[1] += 2 * Math.PI;
        if (result.rotate[0] < 0)
            result.rotate[0] += Math.PI;
        else
            result.rotate[0] -= Math.PI;
        if (result.rotate[2] < 0)
            result.rotate[2] += Math.PI;
        else
            result.rotate[2] -= Math.PI;
    }
    return result;
};
Transform.average = function average(M1, M2, t) {
    t = t === undefined ? 0.5 : t;
    var specM1 = Transform.interpret(M1);
    var specM2 = Transform.interpret(M2);
    var specAvg = {
            translate: [
                0,
                0,
                0
            ],
            rotate: [
                0,
                0,
                0
            ],
            scale: [
                0,
                0,
                0
            ],
            skew: [
                0,
                0,
                0
            ]
        };
    for (var i = 0; i < 3; i++) {
        specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
        specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
        specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
        specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
    }
    return Transform.build(specAvg);
};
Transform.build = function build(spec) {
    var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
    var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
    var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
    return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
};
Transform.equals = function equals(a, b) {
    return !Transform.notEquals(a, b);
};
Transform.notEquals = function notEquals(a, b) {
    if (a === b)
        return false;
    return !(a && b) || a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] || a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] || a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] || a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
};
Transform.normalizeRotation = function normalizeRotation(rotation) {
    var result = rotation.slice(0);
    if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
        result[0] = -result[0];
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] > Math.PI * 0.5) {
        result[0] = result[0] - Math.PI;
        result[1] = Math.PI - result[1];
        result[2] -= Math.PI;
    }
    if (result[0] < -Math.PI * 0.5) {
        result[0] = result[0] + Math.PI;
        result[1] = -Math.PI - result[1];
        result[2] -= Math.PI;
    }
    while (result[1] < -Math.PI)
        result[1] += 2 * Math.PI;
    while (result[1] >= Math.PI)
        result[1] -= 2 * Math.PI;
    while (result[2] < -Math.PI)
        result[2] += 2 * Math.PI;
    while (result[2] >= Math.PI)
        result[2] -= 2 * Math.PI;
    return result;
};
Transform.inFront = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0.001,
    1
];
Transform.behind = [
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    -0.001,
    1
];
module.exports = Transform;
},{}],21:[function(require,module,exports){
var EventHandler = require('./EventHandler');
var OptionsManager = require('./OptionsManager');
var RenderNode = require('./RenderNode');
var Utility = require('famous/utilities/Utility');
function View(options) {
    this._node = new RenderNode();
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
}
View.DEFAULT_OPTIONS = {};
View.prototype.getOptions = function getOptions(key) {
    return this._optionsManager.getOptions(key);
};
View.prototype.setOptions = function setOptions(options) {
    this._optionsManager.patch(options);
};
View.prototype.add = function add() {
    return this._node.add.apply(this._node, arguments);
};
View.prototype._add = View.prototype.add;
View.prototype.render = function render() {
    return this._node.render();
};
View.prototype.getSize = function getSize() {
    if (this._node && this._node.getSize) {
        return this._node.getSize.apply(this._node, arguments) || this.options.size;
    } else
        return this.options.size;
};
module.exports = View;
},{"./EventHandler":12,"./OptionsManager":15,"./RenderNode":16,"famous/utilities/Utility":86}],22:[function(require,module,exports){
function ViewSequence(options) {
    if (!options)
        options = [];
    if (options instanceof Array)
        options = { array: options };
    this._ = null;
    this.index = options.index || 0;
    if (options.array)
        this._ = new this.constructor.Backing(options.array);
    else if (options._)
        this._ = options._;
    if (this.index === this._.firstIndex)
        this._.firstNode = this;
    if (this.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = this;
    if (options.loop !== undefined)
        this._.loop = options.loop;
    if (options.trackSize !== undefined)
        this._.trackSize = options.trackSize;
    this._previousNode = null;
    this._nextNode = null;
}
ViewSequence.Backing = function Backing(array) {
    this.array = array;
    this.firstIndex = 0;
    this.loop = false;
    this.firstNode = null;
    this.lastNode = null;
    this.cumulativeSizes = [[
            0,
            0
        ]];
    this.sizeDirty = true;
    this.trackSize = false;
};
ViewSequence.Backing.prototype.getValue = function getValue(i) {
    var _i = i - this.firstIndex;
    if (_i < 0 || _i >= this.array.length)
        return null;
    return this.array[_i];
};
ViewSequence.Backing.prototype.setValue = function setValue(i, value) {
    this.array[i - this.firstIndex] = value;
};
ViewSequence.Backing.prototype.getSize = function getSize(index) {
    return this.cumulativeSizes[index];
};
ViewSequence.Backing.prototype.calculateSize = function calculateSize(index) {
    index = index || this.array.length;
    var size = [
            0,
            0
        ];
    for (var i = 0; i < index; i++) {
        var nodeSize = this.array[i].getSize();
        if (!nodeSize)
            return undefined;
        if (size[0] !== undefined) {
            if (nodeSize[0] === undefined)
                size[0] = undefined;
            else
                size[0] += nodeSize[0];
        }
        if (size[1] !== undefined) {
            if (nodeSize[1] === undefined)
                size[1] = undefined;
            else
                size[1] += nodeSize[1];
        }
        this.cumulativeSizes[i + 1] = size.slice();
    }
    this.sizeDirty = false;
    return size;
};
ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {
    if (!this.array[0])
        return;
    var i = 0;
    var index = this.firstIndex;
    var indexShiftAmount = insertCount - removeCount;
    var node = this.firstNode;
    while (index < start - 1) {
        node = node.getNext();
        index++;
    }
    var spliceStartNode = node;
    for (i = 0; i < removeCount; i++) {
        node = node.getNext();
        if (node)
            node._previousNode = spliceStartNode;
    }
    var spliceResumeNode = node ? node.getNext() : null;
    spliceStartNode._nextNode = null;
    node = spliceStartNode;
    for (i = 0; i < insertCount; i++)
        node = node.getNext();
    index += insertCount;
    if (node !== spliceResumeNode) {
        node._nextNode = spliceResumeNode;
        if (spliceResumeNode)
            spliceResumeNode._previousNode = node;
    }
    if (spliceResumeNode) {
        node = spliceResumeNode;
        index++;
        while (node && index < this.array.length + this.firstIndex) {
            if (node._nextNode)
                node.index += indexShiftAmount;
            else
                node.index = index;
            node = node.getNext();
            index++;
        }
    }
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.getPrevious = function getPrevious() {
    if (this.index === this._.firstIndex) {
        if (this._.loop) {
            this._previousNode = this._.lastNode || new this.constructor({
                _: this._,
                index: this._.firstIndex + this._.array.length - 1
            });
            this._previousNode._nextNode = this;
        } else {
            this._previousNode = null;
        }
    } else if (!this._previousNode) {
        this._previousNode = new this.constructor({
            _: this._,
            index: this.index - 1
        });
        this._previousNode._nextNode = this;
    }
    return this._previousNode;
};
ViewSequence.prototype.getNext = function getNext() {
    if (this.index === this._.firstIndex + this._.array.length - 1) {
        if (this._.loop) {
            this._nextNode = this._.firstNode || new this.constructor({
                _: this._,
                index: this._.firstIndex
            });
            this._nextNode._previousNode = this;
        } else {
            this._nextNode = null;
        }
    } else if (!this._nextNode) {
        this._nextNode = new this.constructor({
            _: this._,
            index: this.index + 1
        });
        this._nextNode._previousNode = this;
    }
    return this._nextNode;
};
ViewSequence.prototype.getIndex = function getIndex() {
    return this.index;
};
ViewSequence.prototype.toString = function toString() {
    return '' + this.index;
};
ViewSequence.prototype.unshift = function unshift(value) {
    this._.array.unshift.apply(this._.array, arguments);
    this._.firstIndex -= arguments.length;
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.push = function push(value) {
    this._.array.push.apply(this._.array, arguments);
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.splice = function splice(index, howMany) {
    var values = Array.prototype.slice.call(arguments, 2);
    this._.array.splice.apply(this._.array, [
        index - this._.firstIndex,
        howMany
    ].concat(values));
    this._.reindex(index, howMany, values.length);
};
ViewSequence.prototype.swap = function swap(other) {
    var otherValue = other.get();
    var myValue = this.get();
    this._.setValue(this.index, otherValue);
    this._.setValue(other.index, myValue);
    var myPrevious = this._previousNode;
    var myNext = this._nextNode;
    var myIndex = this.index;
    var otherPrevious = other._previousNode;
    var otherNext = other._nextNode;
    var otherIndex = other.index;
    this.index = otherIndex;
    this._previousNode = otherPrevious === this ? other : otherPrevious;
    if (this._previousNode)
        this._previousNode._nextNode = this;
    this._nextNode = otherNext === this ? other : otherNext;
    if (this._nextNode)
        this._nextNode._previousNode = this;
    other.index = myIndex;
    other._previousNode = myPrevious === other ? this : myPrevious;
    if (other._previousNode)
        other._previousNode._nextNode = other;
    other._nextNode = myNext === other ? this : myNext;
    if (other._nextNode)
        other._nextNode._previousNode = other;
    if (this.index === this._.firstIndex)
        this._.firstNode = this;
    else if (this.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = this;
    if (other.index === this._.firstIndex)
        this._.firstNode = other;
    else if (other.index === this._.firstIndex + this._.array.length - 1)
        this._.lastNode = other;
    if (this._.trackSize)
        this._.sizeDirty = true;
};
ViewSequence.prototype.get = function get() {
    return this._.getValue(this.index);
};
ViewSequence.prototype.getSize = function getSize() {
    var target = this.get();
    return target ? target.getSize() : null;
};
ViewSequence.prototype.render = function render() {
    if (this._.trackSize && this._.sizeDirty)
        this._.calculateSize();
    var target = this.get();
    return target ? target.render.apply(target, arguments) : null;
};
module.exports = ViewSequence;
},{}],23:[function(require,module,exports){
var EventHandler = require('famous/core/EventHandler');
function EventArbiter(startMode) {
    this.dispatchers = {};
    this.currMode = undefined;
    this.setMode(startMode);
}
EventArbiter.prototype.setMode = function setMode(mode) {
    if (mode !== this.currMode) {
        var startMode = this.currMode;
        if (this.dispatchers[this.currMode])
            this.dispatchers[this.currMode].trigger('unpipe');
        this.currMode = mode;
        if (this.dispatchers[mode])
            this.dispatchers[mode].emit('pipe');
        this.emit('change', {
            from: startMode,
            to: mode
        });
    }
};
EventArbiter.prototype.forMode = function forMode(mode) {
    if (!this.dispatchers[mode])
        this.dispatchers[mode] = new EventHandler();
    return this.dispatchers[mode];
};
EventArbiter.prototype.emit = function emit(eventType, event) {
    if (this.currMode === undefined)
        return false;
    if (!event)
        event = {};
    var dispatcher = this.dispatchers[this.currMode];
    if (dispatcher)
        return dispatcher.trigger(eventType, event);
};
module.exports = EventArbiter;
},{"famous/core/EventHandler":12}],24:[function(require,module,exports){
var EventHandler = require('famous/core/EventHandler');
function EventFilter(condition) {
    EventHandler.call(this);
    this._condition = condition;
}
EventFilter.prototype = Object.create(EventHandler.prototype);
EventFilter.prototype.constructor = EventFilter;
EventFilter.prototype.emit = function emit(type, data) {
    if (this._condition(type, data))
        return EventHandler.prototype.emit.apply(this, arguments);
};
EventFilter.prototype.trigger = EventFilter.prototype.emit;
module.exports = EventFilter;
},{"famous/core/EventHandler":12}],25:[function(require,module,exports){
var EventHandler = require('famous/core/EventHandler');
function EventMapper(mappingFunction) {
    EventHandler.call(this);
    this._mappingFunction = mappingFunction;
}
EventMapper.prototype = Object.create(EventHandler.prototype);
EventMapper.prototype.constructor = EventMapper;
EventMapper.prototype.subscribe = null;
EventMapper.prototype.unsubscribe = null;
EventMapper.prototype.emit = function emit(type, data) {
    var target = this._mappingFunction.apply(this, arguments);
    if (target && target.emit instanceof Function)
        target.emit(type, data);
};
EventMapper.prototype.trigger = EventMapper.prototype.emit;
module.exports = EventMapper;
},{"famous/core/EventHandler":12}],26:[function(require,module,exports){
var EventHandler = require('famous/core/EventHandler');
var Transitionable = require('famous/transitions/Transitionable');
function Accumulator(value, eventName) {
    if (eventName === undefined)
        eventName = 'update';
    this._state = value && value.get && value.set ? value : new Transitionable(value || 0);
    this._eventInput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    this._eventInput.on(eventName, _handleUpdate.bind(this));
}
function _handleUpdate(data) {
    var delta = data.delta;
    var state = this.get();
    if (delta.constructor === state.constructor) {
        var newState = delta instanceof Array ? [
                state[0] + delta[0],
                state[1] + delta[1]
            ] : state + delta;
        this.set(newState);
    }
}
Accumulator.prototype.get = function get() {
    return this._state.get();
};
Accumulator.prototype.set = function set(value) {
    this._state.set(value);
};
module.exports = Accumulator;
},{"famous/core/EventHandler":12,"famous/transitions/Transitionable":80}],27:[function(require,module,exports){
(function () {
    if (!window.CustomEvent)
        return;
    var clickThreshold = 300;
    var clickWindow = 500;
    var potentialClicks = {};
    var recentlyDispatched = {};
    var _now = Date.now;
    window.addEventListener('touchstart', function (event) {
        var timestamp = _now();
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            potentialClicks[touch.identifier] = timestamp;
        }
    });
    window.addEventListener('touchmove', function (event) {
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            delete potentialClicks[touch.identifier];
        }
    });
    window.addEventListener('touchend', function (event) {
        var currTime = _now();
        for (var i = 0; i < event.changedTouches.length; i++) {
            var touch = event.changedTouches[i];
            var startTime = potentialClicks[touch.identifier];
            if (startTime && currTime - startTime < clickThreshold) {
                var clickEvt = new window.CustomEvent('click', {
                        'bubbles': true,
                        'detail': touch
                    });
                recentlyDispatched[currTime] = event;
                event.target.dispatchEvent(clickEvt);
            }
            delete potentialClicks[touch.identifier];
        }
    });
    window.addEventListener('click', function (event) {
        var currTime = _now();
        for (var i in recentlyDispatched) {
            var previousEvent = recentlyDispatched[i];
            if (currTime - i < clickWindow) {
                if (event instanceof window.MouseEvent && event.target === previousEvent.target)
                    event.stopPropagation();
            } else
                delete recentlyDispatched[i];
        }
    }, true);
}());
},{}],28:[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
function GenericSync(syncs, options) {
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._syncs = {};
    if (syncs)
        this.addSync(syncs);
    if (options)
        this.setOptions(options);
}
GenericSync.DIRECTION_X = 0;
GenericSync.DIRECTION_Y = 1;
GenericSync.DIRECTION_Z = 2;
var registry = {};
GenericSync.register = function register(syncObject) {
    for (var key in syncObject) {
        if (registry[key]) {
            if (registry[key] === syncObject[key])
                return;
            else
                throw new Error('this key is registered to a different sync class');
        } else
            registry[key] = syncObject[key];
    }
};
GenericSync.prototype.setOptions = function (options) {
    for (var key in this._syncs) {
        this._syncs[key].setOptions(options);
    }
};
GenericSync.prototype.pipeSync = function pipeToSync(key) {
    var sync = this._syncs[key];
    this._eventInput.pipe(sync);
    sync.pipe(this._eventOutput);
};
GenericSync.prototype.unpipeSync = function unpipeFromSync(key) {
    var sync = this._syncs[key];
    this._eventInput.unpipe(sync);
    sync.unpipe(this._eventOutput);
};
function _addSingleSync(key, options) {
    if (!registry[key])
        return;
    this._syncs[key] = new registry[key](options);
    this.pipeSync(key);
}
GenericSync.prototype.addSync = function addSync(syncs) {
    if (syncs instanceof Array)
        for (var i = 0; i < syncs.length; i++)
            _addSingleSync.call(this, syncs[i]);
    else if (syncs instanceof Object)
        for (var key in syncs)
            _addSingleSync.call(this, key, syncs[key]);
};
module.exports = GenericSync;
},{"../core/EventHandler":12}],29:[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
var OptionsManager = require('../core/OptionsManager');
function MouseSync(options) {
    this.options = Object.create(MouseSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._eventInput.on('mousedown', _handleStart.bind(this));
    this._eventInput.on('mousemove', _handleMove.bind(this));
    this._eventInput.on('mouseup', _handleEnd.bind(this));
    if (this.options.propogate)
        this._eventInput.on('mouseleave', _handleLeave.bind(this));
    else
        this._eventInput.on('mouseleave', _handleEnd.bind(this));
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        clientX: 0,
        clientY: 0,
        offsetX: 0,
        offsetY: 0
    };
    this._position = null;
    this._prevCoord = undefined;
    this._prevTime = undefined;
    this._down = false;
    this._moved = false;
}
MouseSync.DEFAULT_OPTIONS = {
    direction: undefined,
    rails: false,
    scale: 1,
    propogate: true,
    preventDefault: true
};
MouseSync.DIRECTION_X = 0;
MouseSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
var _now = Date.now;
function _handleStart(event) {
    var delta;
    var velocity;
    if (this.options.preventDefault)
        event.preventDefault();
    var x = event.clientX;
    var y = event.clientY;
    this._prevCoord = [
        x,
        y
    ];
    this._prevTime = _now();
    this._down = true;
    this._move = false;
    if (this.options.direction !== undefined) {
        this._position = 0;
        delta = 0;
        velocity = 0;
    } else {
        this._position = [
            0,
            0
        ];
        delta = [
            0,
            0
        ];
        velocity = [
            0,
            0
        ];
    }
    var payload = this._payload;
    payload.delta = delta;
    payload.position = this._position;
    payload.velocity = velocity;
    payload.clientX = x;
    payload.clientY = y;
    payload.offsetX = event.offsetX;
    payload.offsetY = event.offsetY;
    this._eventOutput.emit('start', payload);
}
function _handleMove(event) {
    if (!this._prevCoord)
        return;
    var prevCoord = this._prevCoord;
    var prevTime = this._prevTime;
    var x = event.clientX;
    var y = event.clientY;
    var currTime = _now();
    var diffX = x - prevCoord[0];
    var diffY = y - prevCoord[1];
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
    }
    var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME);
    var velX = diffX / diffTime;
    var velY = diffY / diffTime;
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === MouseSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        nextVel = scale * velX;
        this._position += nextDelta;
    } else if (this.options.direction === MouseSync.DIRECTION_Y) {
        nextDelta = scale * diffY;
        nextVel = scale * velY;
        this._position += nextDelta;
    } else {
        nextDelta = [
            scale * diffX,
            scale * diffY
        ];
        nextVel = [
            scale * velX,
            scale * velY
        ];
        this._position[0] += nextDelta[0];
        this._position[1] += nextDelta[1];
    }
    var payload = this._payload;
    payload.delta = nextDelta;
    payload.position = this._position;
    payload.velocity = nextVel;
    payload.clientX = x;
    payload.clientY = y;
    payload.offsetX = event.offsetX;
    payload.offsetY = event.offsetY;
    this._eventOutput.emit('update', payload);
    this._prevCoord = [
        x,
        y
    ];
    this._prevTime = currTime;
    this._move = true;
}
function _handleEnd(event) {
    if (!this._down)
        return;
    this._eventOutput.emit('end', this._payload);
    this._prevCoord = undefined;
    this._prevTime = undefined;
    this._down = false;
    this._move = false;
}
function _handleLeave(event) {
    if (!this._down || !this._move)
        return;
    var boundMove = _handleMove.bind(this);
    var boundEnd = function (event) {
            _handleEnd.call(this, event);
            document.removeEventListener('mousemove', boundMove);
            document.removeEventListener('mouseup', boundEnd);
        }.bind(this, event);
    document.addEventListener('mousemove', boundMove);
    document.addEventListener('mouseup', boundEnd);
}
MouseSync.prototype.getOptions = function getOptions() {
    return this.options;
};
MouseSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = MouseSync;
},{"../core/EventHandler":12,"../core/OptionsManager":15}],30:[function(require,module,exports){
var TwoFingerSync = require('./TwoFingerSync');
var OptionsManager = require('../core/OptionsManager');
function PinchSync(options) {
    TwoFingerSync.call(this);
    this.options = Object.create(PinchSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._displacement = 0;
    this._previousDistance = 0;
}
PinchSync.prototype = Object.create(TwoFingerSync.prototype);
PinchSync.prototype.constructor = PinchSync;
PinchSync.DEFAULT_OPTIONS = { scale: 1 };
PinchSync.prototype._startUpdate = function _startUpdate(event) {
    this._previousDistance = TwoFingerSync.calculateDistance(this.posA, this.posB);
    this._displacement = 0;
    this._eventOutput.emit('start', {
        count: event.touches.length,
        touches: [
            this.touchAId,
            this.touchBId
        ],
        distance: this._dist,
        center: TwoFingerSync.calculateCenter(this.posA, this.posB)
    });
};
PinchSync.prototype._moveUpdate = function _moveUpdate(diffTime) {
    var currDist = TwoFingerSync.calculateDistance(this.posA, this.posB);
    var center = TwoFingerSync.calculateCenter(this.posA, this.posB);
    var scale = this.options.scale;
    var delta = scale * (currDist - this._previousDistance);
    var velocity = delta / diffTime;
    this._previousDistance = currDist;
    this._displacement += delta;
    this._eventOutput.emit('update', {
        delta: delta,
        velocity: velocity,
        distance: currDist,
        displacement: this._displacement,
        center: center,
        touches: [
            this.touchAId,
            this.touchBId
        ]
    });
};
PinchSync.prototype.getOptions = function getOptions() {
    return this.options;
};
PinchSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = PinchSync;
},{"../core/OptionsManager":15,"./TwoFingerSync":36}],31:[function(require,module,exports){
var TwoFingerSync = require('./TwoFingerSync');
var OptionsManager = require('../core/OptionsManager');
function RotateSync(options) {
    TwoFingerSync.call(this);
    this.options = Object.create(RotateSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._angle = 0;
    this._previousAngle = 0;
}
RotateSync.prototype = Object.create(TwoFingerSync.prototype);
RotateSync.prototype.constructor = RotateSync;
RotateSync.DEFAULT_OPTIONS = { scale: 1 };
RotateSync.prototype._startUpdate = function _startUpdate(event) {
    this._angle = 0;
    this._previousAngle = TwoFingerSync.calculateAngle(this.posA, this.posB);
    var center = TwoFingerSync.calculateCenter(this.posA, this.posB);
    this._eventOutput.emit('start', {
        count: event.touches.length,
        angle: this._angle,
        center: center,
        touches: [
            this.touchAId,
            this.touchBId
        ]
    });
};
RotateSync.prototype._moveUpdate = function _moveUpdate(diffTime) {
    var scale = this.options.scale;
    var currAngle = TwoFingerSync.calculateAngle(this.posA, this.posB);
    var center = TwoFingerSync.calculateCenter(this.posA, this.posB);
    var diffTheta = scale * (currAngle - this._previousAngle);
    var velTheta = diffTheta / diffTime;
    this._angle += diffTheta;
    this._eventOutput.emit('update', {
        delta: diffTheta,
        velocity: velTheta,
        angle: this._angle,
        center: center,
        touches: [
            this.touchAId,
            this.touchBId
        ]
    });
    this._previousAngle = currAngle;
};
RotateSync.prototype.getOptions = function getOptions() {
    return this.options;
};
RotateSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = RotateSync;
},{"../core/OptionsManager":15,"./TwoFingerSync":36}],32:[function(require,module,exports){
var TwoFingerSync = require('./TwoFingerSync');
var OptionsManager = require('../core/OptionsManager');
function ScaleSync(options) {
    TwoFingerSync.call(this);
    this.options = Object.create(ScaleSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._scaleFactor = 1;
    this._startDist = 0;
    this._eventInput.on('pipe', _reset.bind(this));
}
ScaleSync.prototype = Object.create(TwoFingerSync.prototype);
ScaleSync.prototype.constructor = ScaleSync;
ScaleSync.DEFAULT_OPTIONS = { scale: 1 };
function _reset() {
    this.touchAId = undefined;
    this.touchBId = undefined;
}
ScaleSync.prototype._startUpdate = function _startUpdate(event) {
    this._scaleFactor = 1;
    this._startDist = TwoFingerSync.calculateDistance(this.posA, this.posB);
    this._eventOutput.emit('start', {
        count: event.touches.length,
        touches: [
            this.touchAId,
            this.touchBId
        ],
        distance: this._startDist,
        center: TwoFingerSync.calculateCenter(this.posA, this.posB)
    });
};
ScaleSync.prototype._moveUpdate = function _moveUpdate(diffTime) {
    var scale = this.options.scale;
    var currDist = TwoFingerSync.calculateDistance(this.posA, this.posB);
    var center = TwoFingerSync.calculateCenter(this.posA, this.posB);
    var delta = (currDist - this._startDist) / this._startDist;
    var newScaleFactor = Math.max(1 + scale * delta, 0);
    var veloScale = (newScaleFactor - this._scaleFactor) / diffTime;
    this._eventOutput.emit('update', {
        delta: delta,
        scale: newScaleFactor,
        velocity: veloScale,
        distance: currDist,
        center: center,
        touches: [
            this.touchAId,
            this.touchBId
        ]
    });
    this._scaleFactor = newScaleFactor;
};
ScaleSync.prototype.getOptions = function getOptions() {
    return this.options;
};
ScaleSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = ScaleSync;
},{"../core/OptionsManager":15,"./TwoFingerSync":36}],33:[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
var Engine = require('../core/Engine');
var OptionsManager = require('../core/OptionsManager');
function ScrollSync(options) {
    this.options = Object.create(ScrollSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        slip: true
    };
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._position = this.options.direction === undefined ? [
        0,
        0
    ] : 0;
    this._prevTime = undefined;
    this._prevVel = undefined;
    this._eventInput.on('mousewheel', _handleMove.bind(this));
    this._eventInput.on('wheel', _handleMove.bind(this));
    this._inProgress = false;
    this._loopBound = false;
}
ScrollSync.DEFAULT_OPTIONS = {
    direction: undefined,
    minimumEndSpeed: Infinity,
    rails: false,
    scale: 1,
    stallTime: 50,
    lineHeight: 40,
    preventDefault: true
};
ScrollSync.DIRECTION_X = 0;
ScrollSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
var _now = Date.now;
function _newFrame() {
    if (this._inProgress && _now() - this._prevTime > this.options.stallTime) {
        this._inProgress = false;
        var finalVel = Math.abs(this._prevVel) >= this.options.minimumEndSpeed ? this._prevVel : 0;
        var payload = this._payload;
        payload.position = this._position;
        payload.velocity = finalVel;
        payload.slip = true;
        this._eventOutput.emit('end', payload);
    }
}
function _handleMove(event) {
    if (this.options.preventDefault)
        event.preventDefault();
    if (!this._inProgress) {
        this._inProgress = true;
        this._position = this.options.direction === undefined ? [
            0,
            0
        ] : 0;
        payload = this._payload;
        payload.slip = true;
        payload.position = this._position;
        payload.clientX = event.clientX;
        payload.clientY = event.clientY;
        payload.offsetX = event.offsetX;
        payload.offsetY = event.offsetY;
        this._eventOutput.emit('start', payload);
        if (!this._loopBound) {
            Engine.on('prerender', _newFrame.bind(this));
            this._loopBound = true;
        }
    }
    var currTime = _now();
    var prevTime = this._prevTime || currTime;
    var diffX = event.wheelDeltaX !== undefined ? event.wheelDeltaX : -event.deltaX;
    var diffY = event.wheelDeltaY !== undefined ? event.wheelDeltaY : -event.deltaY;
    if (event.deltaMode === 1) {
        diffX *= this.options.lineHeight;
        diffY *= this.options.lineHeight;
    }
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
    }
    var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME);
    var velX = diffX / diffTime;
    var velY = diffY / diffTime;
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === ScrollSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        nextVel = scale * velX;
        this._position += nextDelta;
    } else if (this.options.direction === ScrollSync.DIRECTION_Y) {
        nextDelta = scale * diffY;
        nextVel = scale * velY;
        this._position += nextDelta;
    } else {
        nextDelta = [
            scale * diffX,
            scale * diffY
        ];
        nextVel = [
            scale * velX,
            scale * velY
        ];
        this._position[0] += nextDelta[0];
        this._position[1] += nextDelta[1];
    }
    var payload = this._payload;
    payload.delta = nextDelta;
    payload.velocity = nextVel;
    payload.position = this._position;
    payload.slip = true;
    this._eventOutput.emit('update', payload);
    this._prevTime = currTime;
    this._prevVel = nextVel;
}
ScrollSync.prototype.getOptions = function getOptions() {
    return this.options;
};
ScrollSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
module.exports = ScrollSync;
},{"../core/Engine":9,"../core/EventHandler":12,"../core/OptionsManager":15}],34:[function(require,module,exports){
var TouchTracker = require('./TouchTracker');
var EventHandler = require('../core/EventHandler');
var OptionsManager = require('../core/OptionsManager');
function TouchSync(options) {
    this.options = Object.create(TouchSync.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._eventOutput = new EventHandler();
    this._touchTracker = new TouchTracker();
    EventHandler.setOutputHandler(this, this._eventOutput);
    EventHandler.setInputHandler(this, this._touchTracker);
    this._touchTracker.on('trackstart', _handleStart.bind(this));
    this._touchTracker.on('trackmove', _handleMove.bind(this));
    this._touchTracker.on('trackend', _handleEnd.bind(this));
    this._payload = {
        delta: null,
        position: null,
        velocity: null,
        clientX: undefined,
        clientY: undefined,
        count: 0,
        touch: undefined
    };
    this._position = null;
}
TouchSync.DEFAULT_OPTIONS = {
    direction: undefined,
    rails: false,
    scale: 1
};
TouchSync.DIRECTION_X = 0;
TouchSync.DIRECTION_Y = 1;
var MINIMUM_TICK_TIME = 8;
function _handleStart(data) {
    var velocity;
    var delta;
    if (this.options.direction !== undefined) {
        this._position = 0;
        velocity = 0;
        delta = 0;
    } else {
        this._position = [
            0,
            0
        ];
        velocity = [
            0,
            0
        ];
        delta = [
            0,
            0
        ];
    }
    var payload = this._payload;
    payload.delta = delta;
    payload.position = this._position;
    payload.velocity = velocity;
    payload.clientX = data.x;
    payload.clientY = data.y;
    payload.count = data.count;
    payload.touch = data.identifier;
    this._eventOutput.emit('start', payload);
}
function _handleMove(data) {
    var history = data.history;
    var currHistory = history[history.length - 1];
    var prevHistory = history[history.length - 2];
    var prevTime = prevHistory.timestamp;
    var currTime = currHistory.timestamp;
    var diffX = currHistory.x - prevHistory.x;
    var diffY = currHistory.y - prevHistory.y;
    if (this.options.rails) {
        if (Math.abs(diffX) > Math.abs(diffY))
            diffY = 0;
        else
            diffX = 0;
    }
    var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME);
    var velX = diffX / diffTime;
    var velY = diffY / diffTime;
    var scale = this.options.scale;
    var nextVel;
    var nextDelta;
    if (this.options.direction === TouchSync.DIRECTION_X) {
        nextDelta = scale * diffX;
        nextVel = scale * velX;
        this._position += nextDelta;
    } else if (this.options.direction === TouchSync.DIRECTION_Y) {
        nextDelta = scale * diffY;
        nextVel = scale * velY;
        this._position += nextDelta;
    } else {
        nextDelta = [
            scale * diffX,
            scale * diffY
        ];
        nextVel = [
            scale * velX,
            scale * velY
        ];
        this._position[0] += nextDelta[0];
        this._position[1] += nextDelta[1];
    }
    var payload = this._payload;
    payload.delta = nextDelta;
    payload.velocity = nextVel;
    payload.position = this._position;
    payload.clientX = data.x;
    payload.clientY = data.y;
    payload.count = data.count;
    payload.touch = data.identifier;
    this._eventOutput.emit('update', payload);
}
function _handleEnd(data) {
    this._payload.count = data.count;
    this._eventOutput.emit('end', this._payload);
}
TouchSync.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
TouchSync.prototype.getOptions = function getOptions() {
    return this.options;
};
module.exports = TouchSync;
},{"../core/EventHandler":12,"../core/OptionsManager":15,"./TouchTracker":35}],35:[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
var _now = Date.now;
function _timestampTouch(touch, event, history) {
    return {
        x: touch.clientX,
        y: touch.clientY,
        identifier: touch.identifier,
        origin: event.origin,
        timestamp: _now(),
        count: event.touches.length,
        history: history
    };
}
function _handleStart(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var data = _timestampTouch(touch, event, null);
        this.eventOutput.emit('trackstart', data);
        if (!this.selective && !this.touchHistory[touch.identifier])
            this.track(data);
    }
}
function _handleMove(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var history = this.touchHistory[touch.identifier];
        if (history) {
            var data = _timestampTouch(touch, event, history);
            this.touchHistory[touch.identifier].push(data);
            this.eventOutput.emit('trackmove', data);
        }
    }
}
function _handleEnd(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        var history = this.touchHistory[touch.identifier];
        if (history) {
            var data = _timestampTouch(touch, event, history);
            this.eventOutput.emit('trackend', data);
            delete this.touchHistory[touch.identifier];
        }
    }
}
function _handleUnpipe() {
    for (var i in this.touchHistory) {
        var history = this.touchHistory[i];
        this.eventOutput.emit('trackend', {
            touch: history[history.length - 1].touch,
            timestamp: Date.now(),
            count: 0,
            history: history
        });
        delete this.touchHistory[i];
    }
}
function TouchTracker(selective) {
    this.selective = selective;
    this.touchHistory = {};
    this.eventInput = new EventHandler();
    this.eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this.eventInput);
    EventHandler.setOutputHandler(this, this.eventOutput);
    this.eventInput.on('touchstart', _handleStart.bind(this));
    this.eventInput.on('touchmove', _handleMove.bind(this));
    this.eventInput.on('touchend', _handleEnd.bind(this));
    this.eventInput.on('touchcancel', _handleEnd.bind(this));
    this.eventInput.on('unpipe', _handleUnpipe.bind(this));
}
TouchTracker.prototype.track = function track(data) {
    this.touchHistory[data.identifier] = [data];
};
module.exports = TouchTracker;
},{"../core/EventHandler":12}],36:[function(require,module,exports){
var EventHandler = require('../core/EventHandler');
function TwoFingerSync() {
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this.touchAEnabled = false;
    this.touchAId = 0;
    this.posA = null;
    this.timestampA = 0;
    this.touchBEnabled = false;
    this.touchBId = 0;
    this.posB = null;
    this.timestampB = 0;
    this._eventInput.on('touchstart', this.handleStart.bind(this));
    this._eventInput.on('touchmove', this.handleMove.bind(this));
    this._eventInput.on('touchend', this.handleEnd.bind(this));
    this._eventInput.on('touchcancel', this.handleEnd.bind(this));
}
TwoFingerSync.calculateAngle = function (posA, posB) {
    var diffX = posB[0] - posA[0];
    var diffY = posB[1] - posA[1];
    return Math.atan2(diffY, diffX);
};
TwoFingerSync.calculateDistance = function (posA, posB) {
    var diffX = posB[0] - posA[0];
    var diffY = posB[1] - posA[1];
    return Math.sqrt(diffX * diffX + diffY * diffY);
};
TwoFingerSync.calculateCenter = function (posA, posB) {
    return [
        (posA[0] + posB[0]) / 2,
        (posA[1] + posB[1]) / 2
    ];
};
var _now = Date.now;
TwoFingerSync.prototype.handleStart = function handleStart(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        if (!this.touchAEnabled) {
            this.touchAId = touch.identifier;
            this.touchAEnabled = true;
            this.posA = [
                touch.pageX,
                touch.pageY
            ];
            this.timestampA = _now();
        } else if (!this.touchBEnabled) {
            this.touchBId = touch.identifier;
            this.touchBEnabled = true;
            this.posB = [
                touch.pageX,
                touch.pageY
            ];
            this.timestampB = _now();
            this._startUpdate(event);
        }
    }
};
TwoFingerSync.prototype.handleMove = function handleMove(event) {
    if (!(this.touchAEnabled && this.touchBEnabled))
        return;
    var prevTimeA = this.timestampA;
    var prevTimeB = this.timestampB;
    var diffTime;
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        if (touch.identifier === this.touchAId) {
            this.posA = [
                touch.pageX,
                touch.pageY
            ];
            this.timestampA = _now();
            diffTime = this.timestampA - prevTimeA;
        } else if (touch.identifier === this.touchBId) {
            this.posB = [
                touch.pageX,
                touch.pageY
            ];
            this.timestampB = _now();
            diffTime = this.timestampB - prevTimeB;
        }
    }
    if (diffTime)
        this._moveUpdate(diffTime);
};
TwoFingerSync.prototype.handleEnd = function handleEnd(event) {
    for (var i = 0; i < event.changedTouches.length; i++) {
        var touch = event.changedTouches[i];
        if (touch.identifier === this.touchAId || touch.identifier === this.touchBId) {
            if (this.touchAEnabled && this.touchBEnabled) {
                this._eventOutput.emit('end', {
                    touches: [
                        this.touchAId,
                        this.touchBId
                    ],
                    angle: this._angle
                });
            }
            this.touchAEnabled = false;
            this.touchAId = 0;
            this.touchBEnabled = false;
            this.touchBId = 0;
        }
    }
};
module.exports = TwoFingerSync;
},{"../core/EventHandler":12}],37:[function(require,module,exports){
var Vector = require('./Vector');
function Matrix(values) {
    this.values = values || [
        [
            1,
            0,
            0
        ],
        [
            0,
            1,
            0
        ],
        [
            0,
            0,
            1
        ]
    ];
    return this;
}
var _register = new Matrix();
var _vectorRegister = new Vector();
Matrix.prototype.get = function get() {
    return this.values;
};
Matrix.prototype.set = function set(values) {
    this.values = values;
};
Matrix.prototype.vectorMultiply = function vectorMultiply(v) {
    var M = this.get();
    var v0 = v.x;
    var v1 = v.y;
    var v2 = v.z;
    var M0 = M[0];
    var M1 = M[1];
    var M2 = M[2];
    var M00 = M0[0];
    var M01 = M0[1];
    var M02 = M0[2];
    var M10 = M1[0];
    var M11 = M1[1];
    var M12 = M1[2];
    var M20 = M2[0];
    var M21 = M2[1];
    var M22 = M2[2];
    return _vectorRegister.setXYZ(M00 * v0 + M01 * v1 + M02 * v2, M10 * v0 + M11 * v1 + M12 * v2, M20 * v0 + M21 * v1 + M22 * v2);
};
Matrix.prototype.multiply = function multiply(M2) {
    var M1 = this.get();
    var result = [[]];
    for (var i = 0; i < 3; i++) {
        result[i] = [];
        for (var j = 0; j < 3; j++) {
            var sum = 0;
            for (var k = 0; k < 3; k++) {
                sum += M1[i][k] * M2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return _register.set(result);
};
Matrix.prototype.transpose = function transpose() {
    var result = [];
    var M = this.get();
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            result[row][col] = M[col][row];
        }
    }
    return _register.set(result);
};
Matrix.prototype.clone = function clone() {
    var values = this.get();
    var M = [];
    for (var row = 0; row < 3; row++)
        M[row] = values[row].slice();
    return new Matrix(M);
};
module.exports = Matrix;
},{"./Vector":41}],38:[function(require,module,exports){
var Matrix = require('./Matrix');
function Quaternion(w, x, y, z) {
    if (arguments.length === 1)
        this.set(w);
    else {
        this.w = w !== undefined ? w : 1;
        this.x = x !== undefined ? x : 0;
        this.y = y !== undefined ? y : 0;
        this.z = z !== undefined ? z : 0;
    }
    return this;
}
var register = new Quaternion(1, 0, 0, 0);
Quaternion.prototype.add = function add(q) {
    return register.setWXYZ(this.w + q.w, this.x + q.x, this.y + q.y, this.z + q.z);
};
Quaternion.prototype.sub = function sub(q) {
    return register.setWXYZ(this.w - q.w, this.x - q.x, this.y - q.y, this.z - q.z);
};
Quaternion.prototype.scalarDivide = function scalarDivide(s) {
    return this.scalarMultiply(1 / s);
};
Quaternion.prototype.scalarMultiply = function scalarMultiply(s) {
    return register.setWXYZ(this.w * s, this.x * s, this.y * s, this.z * s);
};
Quaternion.prototype.multiply = function multiply(q) {
    var x1 = this.x;
    var y1 = this.y;
    var z1 = this.z;
    var w1 = this.w;
    var x2 = q.x;
    var y2 = q.y;
    var z2 = q.z;
    var w2 = q.w || 0;
    return register.setWXYZ(w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2, x1 * w2 + x2 * w1 + y2 * z1 - y1 * z2, y1 * w2 + y2 * w1 + x1 * z2 - x2 * z1, z1 * w2 + z2 * w1 + x2 * y1 - x1 * y2);
};
var conj = new Quaternion(1, 0, 0, 0);
Quaternion.prototype.rotateVector = function rotateVector(v) {
    conj.set(this.conj());
    return register.set(this.multiply(v).multiply(conj));
};
Quaternion.prototype.inverse = function inverse() {
    return register.set(this.conj().scalarDivide(this.normSquared()));
};
Quaternion.prototype.negate = function negate() {
    return this.scalarMultiply(-1);
};
Quaternion.prototype.conj = function conj() {
    return register.setWXYZ(this.w, -this.x, -this.y, -this.z);
};
Quaternion.prototype.normalize = function normalize(length) {
    length = length === undefined ? 1 : length;
    return this.scalarDivide(length * this.norm());
};
Quaternion.prototype.makeFromAngleAndAxis = function makeFromAngleAndAxis(angle, v) {
    var n = v.normalize();
    var ha = angle * 0.5;
    var s = -Math.sin(ha);
    this.x = s * n.x;
    this.y = s * n.y;
    this.z = s * n.z;
    this.w = Math.cos(ha);
    return this;
};
Quaternion.prototype.setWXYZ = function setWXYZ(w, x, y, z) {
    register.clear();
    this.w = w;
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
};
Quaternion.prototype.set = function set(v) {
    if (v instanceof Array) {
        this.w = 0;
        this.x = v[0];
        this.y = v[1];
        this.z = v[2];
    } else {
        this.w = v.w;
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
    }
    if (this !== register)
        register.clear();
    return this;
};
Quaternion.prototype.put = function put(q) {
    q.set(register);
};
Quaternion.prototype.clone = function clone() {
    return new Quaternion(this);
};
Quaternion.prototype.clear = function clear() {
    this.w = 1;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    return this;
};
Quaternion.prototype.isEqual = function isEqual(q) {
    return q.w === this.w && q.x === this.x && q.y === this.y && q.z === this.z;
};
Quaternion.prototype.dot = function dot(q) {
    return this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;
};
Quaternion.prototype.normSquared = function normSquared() {
    return this.dot(this);
};
Quaternion.prototype.norm = function norm() {
    return Math.sqrt(this.normSquared());
};
Quaternion.prototype.isZero = function isZero() {
    return !(this.x || this.y || this.z);
};
Quaternion.prototype.getTransform = function getTransform() {
    var temp = this.normalize(1);
    var x = temp.x;
    var y = temp.y;
    var z = temp.z;
    var w = temp.w;
    return [
        1 - 2 * y * y - 2 * z * z,
        2 * x * y - 2 * z * w,
        2 * x * z + 2 * y * w,
        0,
        2 * x * y + 2 * z * w,
        1 - 2 * x * x - 2 * z * z,
        2 * y * z - 2 * x * w,
        0,
        2 * x * z - 2 * y * w,
        2 * y * z + 2 * x * w,
        1 - 2 * x * x - 2 * y * y,
        0,
        0,
        0,
        0,
        1
    ];
};
var matrixRegister = new Matrix();
Quaternion.prototype.getMatrix = function getMatrix() {
    var temp = this.normalize(1);
    var x = temp.x;
    var y = temp.y;
    var z = temp.z;
    var w = temp.w;
    return matrixRegister.set([
        [
            1 - 2 * y * y - 2 * z * z,
            2 * x * y + 2 * z * w,
            2 * x * z - 2 * y * w
        ],
        [
            2 * x * y - 2 * z * w,
            1 - 2 * x * x - 2 * z * z,
            2 * y * z + 2 * x * w
        ],
        [
            2 * x * z + 2 * y * w,
            2 * y * z - 2 * x * w,
            1 - 2 * x * x - 2 * y * y
        ]
    ]);
};
var epsilon = 0.00001;
Quaternion.prototype.slerp = function slerp(q, t) {
    var omega;
    var cosomega;
    var sinomega;
    var scaleFrom;
    var scaleTo;
    cosomega = this.dot(q);
    if (1 - cosomega > epsilon) {
        omega = Math.acos(cosomega);
        sinomega = Math.sin(omega);
        scaleFrom = Math.sin((1 - t) * omega) / sinomega;
        scaleTo = Math.sin(t * omega) / sinomega;
    } else {
        scaleFrom = 1 - t;
        scaleTo = t;
    }
    return register.set(this.scalarMultiply(scaleFrom / scaleTo).add(q).multiply(scaleTo));
};
module.exports = Quaternion;
},{"./Matrix":37}],39:[function(require,module,exports){
var RAND = Math.random;
function _randomFloat(min, max) {
    return min + RAND() * (max - min);
}
function _randomInteger(min, max) {
    return min + RAND() * (max - min + 1) >> 0;
}
var Random = {};
Random.integer = function integer(min, max, dim) {
    min = min !== undefined ? min : 0;
    max = max !== undefined ? max : 1;
    if (dim !== undefined) {
        var result = [];
        for (var i = 0; i < dim; i++)
            result.push(_randomInteger(min, max));
        return result;
    } else
        return _randomInteger(min, max);
};
Random.range = function range(min, max, dim) {
    min = min !== undefined ? min : 0;
    max = max !== undefined ? max : 1;
    if (dim !== undefined) {
        var result = [];
        for (var i = 0; i < dim; i++)
            result.push(_randomFloat(min, max));
        return result;
    } else
        return _randomFloat(min, max);
};
Random.sign = function sign(prob) {
    prob = prob !== undefined ? prob : 0.5;
    return RAND() < prob ? 1 : -1;
};
Random.bool = function bool(prob) {
    prob = prob !== undefined ? prob : 0.5;
    return RAND() < prob;
};
module.exports = Random;
},{}],40:[function(require,module,exports){
var Utilities = {};
Utilities.clamp = function clamp(value, range) {
    return Math.max(Math.min(value, range[1]), range[0]);
};
Utilities.length = function length(array) {
    var distanceSquared = 0;
    for (var i = 0; i < array.length; i++) {
        distanceSquared += array[i] * array[i];
    }
    return Math.sqrt(distanceSquared);
};
module.exports = Utilities;
},{}],41:[function(require,module,exports){
function Vector(x, y, z) {
    if (arguments.length === 1 && x !== undefined)
        this.set(x);
    else {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    return this;
}
var _register = new Vector(0, 0, 0);
Vector.prototype.add = function add(v) {
    return _setXYZ.call(_register, this.x + v.x, this.y + v.y, this.z + v.z);
};
Vector.prototype.sub = function sub(v) {
    return _setXYZ.call(_register, this.x - v.x, this.y - v.y, this.z - v.z);
};
Vector.prototype.mult = function mult(r) {
    return _setXYZ.call(_register, r * this.x, r * this.y, r * this.z);
};
Vector.prototype.div = function div(r) {
    return this.mult(1 / r);
};
Vector.prototype.cross = function cross(v) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var vx = v.x;
    var vy = v.y;
    var vz = v.z;
    return _setXYZ.call(_register, z * vy - y * vz, x * vz - z * vx, y * vx - x * vy);
};
Vector.prototype.equals = function equals(v) {
    return v.x === this.x && v.y === this.y && v.z === this.z;
};
Vector.prototype.rotateX = function rotateX(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, x, y * cosTheta - z * sinTheta, y * sinTheta + z * cosTheta);
};
Vector.prototype.rotateY = function rotateY(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, z * sinTheta + x * cosTheta, y, z * cosTheta - x * sinTheta);
};
Vector.prototype.rotateZ = function rotateZ(theta) {
    var x = this.x;
    var y = this.y;
    var z = this.z;
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return _setXYZ.call(_register, x * cosTheta - y * sinTheta, x * sinTheta + y * cosTheta, z);
};
Vector.prototype.dot = function dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
};
Vector.prototype.normSquared = function normSquared() {
    return this.dot(this);
};
Vector.prototype.norm = function norm() {
    return Math.sqrt(this.normSquared());
};
Vector.prototype.normalize = function normalize(length) {
    if (arguments.length === 0)
        length = 1;
    var norm = this.norm();
    if (norm > 1e-7)
        return _setFromVector.call(_register, this.mult(length / norm));
    else
        return _setXYZ.call(_register, length, 0, 0);
};
Vector.prototype.clone = function clone() {
    return new Vector(this);
};
Vector.prototype.isZero = function isZero() {
    return !(this.x || this.y || this.z);
};
function _setXYZ(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
}
function _setFromArray(v) {
    return _setXYZ.call(this, v[0], v[1], v[2] || 0);
}
function _setFromVector(v) {
    return _setXYZ.call(this, v.x, v.y, v.z);
}
function _setFromNumber(x) {
    return _setXYZ.call(this, x, 0, 0);
}
Vector.prototype.set = function set(v) {
    if (v instanceof Array)
        return _setFromArray.call(this, v);
    if (typeof v === 'number')
        return _setFromNumber.call(this, v);
    return _setFromVector.call(this, v);
};
Vector.prototype.setXYZ = function (x, y, z) {
    return _setXYZ.apply(this, arguments);
};
Vector.prototype.set1D = function (x) {
    return _setFromNumber.call(this, x);
};
Vector.prototype.put = function put(v) {
    if (this === _register)
        _setFromVector.call(v, _register);
    else
        _setFromVector.call(v, this);
};
Vector.prototype.clear = function clear() {
    return _setXYZ.call(this, 0, 0, 0);
};
Vector.prototype.cap = function cap(cap) {
    if (cap === Infinity)
        return _setFromVector.call(_register, this);
    var norm = this.norm();
    if (norm > cap)
        return _setFromVector.call(_register, this.mult(cap / norm));
    else
        return _setFromVector.call(_register, this);
};
Vector.prototype.project = function project(n) {
    return n.mult(this.dot(n));
};
Vector.prototype.reflectAcross = function reflectAcross(n) {
    n.normalize().put(n);
    return _setFromVector(_register, this.sub(this.project(n).mult(2)));
};
Vector.prototype.get = function get() {
    return [
        this.x,
        this.y,
        this.z
    ];
};
Vector.prototype.get1D = function () {
    return this.x;
};
module.exports = Vector;
},{}],42:[function(require,module,exports){
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var EventHandler = require('famous/core/EventHandler');
var Utilities = require('famous/math/Utilities');
var GenericSync = require('famous/inputs/GenericSync');
var MouseSync = require('famous/inputs/MouseSync');
var TouchSync = require('famous/inputs/TouchSync');
GenericSync.register({
    'mouse': MouseSync,
    'touch': TouchSync
});
function Draggable(options) {
    this.options = Object.create(Draggable.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._positionState = new Transitionable([
        0,
        0
    ]);
    this._differential = [
        0,
        0
    ];
    this._active = true;
    this.sync = new GenericSync([
        'mouse',
        'touch'
    ], { scale: this.options.scale });
    this.eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this.sync);
    EventHandler.setOutputHandler(this, this.eventOutput);
    _bindEvents.call(this);
}
var _direction = {
        x: 1,
        y: 2
    };
Draggable.DIRECTION_X = _direction.x;
Draggable.DIRECTION_Y = _direction.y;
var _clamp = Utilities.clamp;
Draggable.DEFAULT_OPTIONS = {
    projection: _direction.x | _direction.y,
    scale: 1,
    xRange: null,
    yRange: null,
    snapX: 0,
    snapY: 0,
    transition: { duration: 0 }
};
function _mapDifferential(differential) {
    var opts = this.options;
    var projection = opts.projection;
    var snapX = opts.snapX;
    var snapY = opts.snapY;
    var tx = projection & _direction.x ? differential[0] : 0;
    var ty = projection & _direction.y ? differential[1] : 0;
    if (snapX > 0)
        tx -= tx % snapX;
    if (snapY > 0)
        ty -= ty % snapY;
    return [
        tx,
        ty
    ];
}
function _handleStart() {
    if (!this._active)
        return;
    if (this._positionState.isActive())
        this._positionState.halt();
    this.eventOutput.emit('start', { position: this.getPosition() });
}
function _handleMove(event) {
    if (!this._active)
        return;
    var options = this.options;
    this._differential = event.position;
    var newDifferential = _mapDifferential.call(this, this._differential);
    this._differential[0] -= newDifferential[0];
    this._differential[1] -= newDifferential[1];
    var pos = this.getPosition();
    pos[0] += newDifferential[0];
    pos[1] += newDifferential[1];
    if (options.xRange) {
        var xRange = [
                options.xRange[0] + 0.5 * options.snapX,
                options.xRange[1] - 0.5 * options.snapX
            ];
        pos[0] = _clamp(pos[0], xRange);
    }
    if (options.yRange) {
        var yRange = [
                options.yRange[0] + 0.5 * options.snapY,
                options.yRange[1] - 0.5 * options.snapY
            ];
        pos[1] = _clamp(pos[1], yRange);
    }
    this.eventOutput.emit('update', { position: pos });
}
function _handleEnd() {
    if (!this._active)
        return;
    this.eventOutput.emit('end', { position: this.getPosition() });
}
function _bindEvents() {
    this.sync.on('start', _handleStart.bind(this));
    this.sync.on('update', _handleMove.bind(this));
    this.sync.on('end', _handleEnd.bind(this));
}
Draggable.prototype.setOptions = function setOptions(options) {
    var currentOptions = this.options;
    if (options.projection !== undefined) {
        var proj = options.projection;
        this.options.projection = 0;
        [
            'x',
            'y'
        ].forEach(function (val) {
            if (proj.indexOf(val) !== -1)
                currentOptions.projection |= _direction[val];
        });
    }
    if (options.scale !== undefined) {
        currentOptions.scale = options.scale;
        this.sync.setOptions({ scale: options.scale });
    }
    if (options.xRange !== undefined)
        currentOptions.xRange = options.xRange;
    if (options.yRange !== undefined)
        currentOptions.yRange = options.yRange;
    if (options.snapX !== undefined)
        currentOptions.snapX = options.snapX;
    if (options.snapY !== undefined)
        currentOptions.snapY = options.snapY;
};
Draggable.prototype.getPosition = function getPosition() {
    return this._positionState.get();
};
Draggable.prototype.setRelativePosition = function setRelativePosition(position, transition, callback) {
    var currPos = this.getPosition();
    var relativePosition = [
            currPos[0] + position[0],
            currPos[1] + position[1]
        ];
    this.setPosition(relativePosition, transition, callback);
};
Draggable.prototype.setPosition = function setPosition(position, transition, callback) {
    if (this._positionState.isActive())
        this._positionState.halt();
    this._positionState.set(position, transition, callback);
};
Draggable.prototype.activate = function activate() {
    this._active = true;
};
Draggable.prototype.deactivate = function deactivate() {
    this._active = false;
};
Draggable.prototype.toggle = function toggle() {
    this._active = !this._active;
};
Draggable.prototype.modify = function modify(target) {
    var pos = this.getPosition();
    return {
        transform: Transform.translate(pos[0], pos[1]),
        target: target
    };
};
module.exports = Draggable;
},{"famous/core/EventHandler":12,"famous/core/Transform":20,"famous/inputs/GenericSync":28,"famous/inputs/MouseSync":29,"famous/inputs/TouchSync":34,"famous/math/Utilities":40,"famous/transitions/Transitionable":80}],43:[function(require,module,exports){
var Transitionable = require('famous/transitions/Transitionable');
var OptionsManager = require('famous/core/OptionsManager');
function Fader(options, startState) {
    this.options = Object.create(Fader.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    if (!startState)
        startState = 0;
    this.transitionHelper = new Transitionable(startState);
}
Fader.DEFAULT_OPTIONS = {
    cull: false,
    transition: true,
    pulseInTransition: true,
    pulseOutTransition: true
};
Fader.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
Fader.prototype.show = function show(transition, callback) {
    transition = transition || this.options.transition;
    this.set(1, transition, callback);
};
Fader.prototype.hide = function hide(transition, callback) {
    transition = transition || this.options.transition;
    this.set(0, transition, callback);
};
Fader.prototype.set = function set(state, transition, callback) {
    this.halt();
    this.transitionHelper.set(state, transition, callback);
};
Fader.prototype.halt = function halt() {
    this.transitionHelper.halt();
};
Fader.prototype.isVisible = function isVisible() {
    return this.transitionHelper.get() > 0;
};
Fader.prototype.modify = function modify(target) {
    var currOpacity = this.transitionHelper.get();
    if (this.options.cull && !currOpacity)
        return undefined;
    else
        return {
            opacity: currOpacity,
            target: target
        };
};
module.exports = Fader;
},{"famous/core/OptionsManager":15,"famous/transitions/Transitionable":80}],44:[function(require,module,exports){
function ModifierChain() {
    this._chain = [];
    if (arguments.length)
        this.addModifier.apply(this, arguments);
}
ModifierChain.prototype.addModifier = function addModifier(varargs) {
    Array.prototype.push.apply(this._chain, arguments);
};
ModifierChain.prototype.removeModifier = function removeModifier(modifier) {
    var index = this._chain.indexOf(modifier);
    if (index < 0)
        return;
    this._chain.splice(index, 1);
};
ModifierChain.prototype.modify = function modify(input) {
    var chain = this._chain;
    var result = input;
    for (var i = 0; i < chain.length; i++) {
        result = chain[i].modify(result);
    }
    return result;
};
module.exports = ModifierChain;
},{}],45:[function(require,module,exports){
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');
function StateModifier(options) {
    this._transformState = new TransitionableTransform(Transform.identity);
    this._opacityState = new Transitionable(1);
    this._originState = new Transitionable([
        0,
        0
    ]);
    this._alignState = new Transitionable([
        0,
        0
    ]);
    this._sizeState = new Transitionable([
        0,
        0
    ]);
    this._proportionsState = new Transitionable([
        0,
        0
    ]);
    this._modifier = new Modifier({
        transform: this._transformState,
        opacity: this._opacityState,
        origin: null,
        align: null,
        size: null,
        proportions: null
    });
    this._hasOrigin = false;
    this._hasAlign = false;
    this._hasSize = false;
    this._hasProportions = false;
    if (options) {
        if (options.transform)
            this.setTransform(options.transform);
        if (options.opacity !== undefined)
            this.setOpacity(options.opacity);
        if (options.origin)
            this.setOrigin(options.origin);
        if (options.align)
            this.setAlign(options.align);
        if (options.size)
            this.setSize(options.size);
        if (options.proportions)
            this.setProportions(options.proportions);
    }
}
StateModifier.prototype.setTransform = function setTransform(transform, transition, callback) {
    this._transformState.set(transform, transition, callback);
    return this;
};
StateModifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
    this._opacityState.set(opacity, transition, callback);
    return this;
};
StateModifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
    if (origin === null) {
        if (this._hasOrigin) {
            this._modifier.originFrom(null);
            this._hasOrigin = false;
        }
        return this;
    } else if (!this._hasOrigin) {
        this._hasOrigin = true;
        this._modifier.originFrom(this._originState);
    }
    this._originState.set(origin, transition, callback);
    return this;
};
StateModifier.prototype.setAlign = function setOrigin(align, transition, callback) {
    if (align === null) {
        if (this._hasAlign) {
            this._modifier.alignFrom(null);
            this._hasAlign = false;
        }
        return this;
    } else if (!this._hasAlign) {
        this._hasAlign = true;
        this._modifier.alignFrom(this._alignState);
    }
    this._alignState.set(align, transition, callback);
    return this;
};
StateModifier.prototype.setSize = function setSize(size, transition, callback) {
    if (size === null) {
        if (this._hasSize) {
            this._modifier.sizeFrom(null);
            this._hasSize = false;
        }
        return this;
    } else if (!this._hasSize) {
        this._hasSize = true;
        this._modifier.sizeFrom(this._sizeState);
    }
    this._sizeState.set(size, transition, callback);
    return this;
};
StateModifier.prototype.setProportions = function setSize(proportions, transition, callback) {
    if (proportions === null) {
        if (this._hasProportions) {
            this._modifier.proportionsFrom(null);
            this._hasProportions = false;
        }
        return this;
    } else if (!this._hasProportions) {
        this._hasProportions = true;
        this._modifier.proportionsFrom(this._proportionsState);
    }
    this._proportionsState.set(proportions, transition, callback);
    return this;
};
StateModifier.prototype.halt = function halt() {
    this._transformState.halt();
    this._opacityState.halt();
    this._originState.halt();
    this._alignState.halt();
    this._sizeState.halt();
    this._proportionsState.halt();
};
StateModifier.prototype.getTransform = function getTransform() {
    return this._transformState.get();
};
StateModifier.prototype.getFinalTransform = function getFinalTransform() {
    return this._transformState.getFinal();
};
StateModifier.prototype.getOpacity = function getOpacity() {
    return this._opacityState.get();
};
StateModifier.prototype.getOrigin = function getOrigin() {
    return this._hasOrigin ? this._originState.get() : null;
};
StateModifier.prototype.getAlign = function getAlign() {
    return this._hasAlign ? this._alignState.get() : null;
};
StateModifier.prototype.getSize = function getSize() {
    return this._hasSize ? this._sizeState.get() : null;
};
StateModifier.prototype.getProportions = function getProportions() {
    return this._hasProportions ? this._proportionsState.get() : null;
};
StateModifier.prototype.modify = function modify(target) {
    return this._modifier.modify(target);
};
module.exports = StateModifier;
},{"famous/core/Modifier":14,"famous/core/Transform":20,"famous/transitions/Transitionable":80,"famous/transitions/TransitionableTransform":81}],46:[function(require,module,exports){
var EventHandler = require('famous/core/EventHandler');
function PhysicsEngine(options) {
    this.options = Object.create(PhysicsEngine.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._particles = [];
    this._bodies = [];
    this._agentData = {};
    this._forces = [];
    this._constraints = [];
    this._buffer = 0;
    this._prevTime = now();
    this._isSleeping = false;
    this._eventHandler = null;
    this._currAgentId = 0;
    this._hasBodies = false;
    this._eventHandler = null;
}
var TIMESTEP = 17;
var MIN_TIME_STEP = 1000 / 120;
var MAX_TIME_STEP = 17;
var now = Date.now;
var _events = {
        start: 'start',
        update: 'update',
        end: 'end'
    };
PhysicsEngine.DEFAULT_OPTIONS = {
    constraintSteps: 1,
    sleepTolerance: 1e-7,
    velocityCap: undefined,
    angularVelocityCap: undefined
};
PhysicsEngine.prototype.setOptions = function setOptions(opts) {
    for (var key in opts)
        if (this.options[key])
            this.options[key] = opts[key];
};
PhysicsEngine.prototype.addBody = function addBody(body) {
    body._engine = this;
    if (body.isBody) {
        this._bodies.push(body);
        this._hasBodies = true;
    } else
        this._particles.push(body);
    body.on('start', this.wake.bind(this));
    return body;
};
PhysicsEngine.prototype.removeBody = function removeBody(body) {
    var array = body.isBody ? this._bodies : this._particles;
    var index = array.indexOf(body);
    if (index > -1) {
        for (var agent in this._agentData)
            this.detachFrom(agent.id, body);
        array.splice(index, 1);
    }
    if (this.getBodies().length === 0)
        this._hasBodies = false;
};
function _mapAgentArray(agent) {
    if (agent.applyForce)
        return this._forces;
    if (agent.applyConstraint)
        return this._constraints;
}
function _attachOne(agent, targets, source) {
    if (targets === undefined)
        targets = this.getParticlesAndBodies();
    if (!(targets instanceof Array))
        targets = [targets];
    agent.on('change', this.wake.bind(this));
    this._agentData[this._currAgentId] = {
        agent: agent,
        id: this._currAgentId,
        targets: targets,
        source: source
    };
    _mapAgentArray.call(this, agent).push(this._currAgentId);
    return this._currAgentId++;
}
PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
    this.wake();
    if (agents instanceof Array) {
        var agentIDs = [];
        for (var i = 0; i < agents.length; i++)
            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
        return agentIDs;
    } else
        return _attachOne.call(this, agents, targets, source);
};
PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
    _getAgentData.call(this, agentID).targets.push(target);
};
PhysicsEngine.prototype.detach = function detach(id) {
    var agent = this.getAgent(id);
    var agentArray = _mapAgentArray.call(this, agent);
    var index = agentArray.indexOf(id);
    agentArray.splice(index, 1);
    delete this._agentData[id];
};
PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
    var boundAgent = _getAgentData.call(this, id);
    if (boundAgent.source === target)
        this.detach(id);
    else {
        var targets = boundAgent.targets;
        var index = targets.indexOf(target);
        if (index > -1)
            targets.splice(index, 1);
    }
};
PhysicsEngine.prototype.detachAll = function detachAll() {
    this._agentData = {};
    this._forces = [];
    this._constraints = [];
    this._currAgentId = 0;
};
function _getAgentData(id) {
    return this._agentData[id];
}
PhysicsEngine.prototype.getAgent = function getAgent(id) {
    return _getAgentData.call(this, id).agent;
};
PhysicsEngine.prototype.getParticles = function getParticles() {
    return this._particles;
};
PhysicsEngine.prototype.getBodies = function getBodies() {
    return this._bodies;
};
PhysicsEngine.prototype.getParticlesAndBodies = function getParticlesAndBodies() {
    return this.getParticles().concat(this.getBodies());
};
PhysicsEngine.prototype.forEachParticle = function forEachParticle(fn, dt) {
    var particles = this.getParticles();
    for (var index = 0, len = particles.length; index < len; index++)
        fn.call(this, particles[index], dt);
};
PhysicsEngine.prototype.forEachBody = function forEachBody(fn, dt) {
    if (!this._hasBodies)
        return;
    var bodies = this.getBodies();
    for (var index = 0, len = bodies.length; index < len; index++)
        fn.call(this, bodies[index], dt);
};
PhysicsEngine.prototype.forEach = function forEach(fn, dt) {
    this.forEachParticle(fn, dt);
    this.forEachBody(fn, dt);
};
function _updateForce(index) {
    var boundAgent = _getAgentData.call(this, this._forces[index]);
    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
}
function _updateForces() {
    for (var index = this._forces.length - 1; index > -1; index--)
        _updateForce.call(this, index);
}
function _updateConstraint(index, dt) {
    var boundAgent = this._agentData[this._constraints[index]];
    return boundAgent.agent.applyConstraint(boundAgent.targets, boundAgent.source, dt);
}
function _updateConstraints(dt) {
    var iteration = 0;
    while (iteration < this.options.constraintSteps) {
        for (var index = this._constraints.length - 1; index > -1; index--)
            _updateConstraint.call(this, index, dt);
        iteration++;
    }
}
function _updateVelocities(body, dt) {
    body.integrateVelocity(dt);
    if (this.options.velocityCap)
        body.velocity.cap(this.options.velocityCap).put(body.velocity);
}
function _updateAngularVelocities(body, dt) {
    body.integrateAngularMomentum(dt);
    body.updateAngularVelocity();
    if (this.options.angularVelocityCap)
        body.angularVelocity.cap(this.options.angularVelocityCap).put(body.angularVelocity);
}
function _updateOrientations(body, dt) {
    body.integrateOrientation(dt);
}
function _updatePositions(body, dt) {
    body.integratePosition(dt);
    body.emit(_events.update, body);
}
function _integrate(dt) {
    _updateForces.call(this, dt);
    this.forEach(_updateVelocities, dt);
    this.forEachBody(_updateAngularVelocities, dt);
    _updateConstraints.call(this, dt);
    this.forEachBody(_updateOrientations, dt);
    this.forEach(_updatePositions, dt);
}
function _getParticlesEnergy() {
    var energy = 0;
    var particleEnergy = 0;
    this.forEach(function (particle) {
        particleEnergy = particle.getEnergy();
        energy += particleEnergy;
    });
    return energy;
}
function _getAgentsEnergy() {
    var energy = 0;
    for (var id in this._agentData)
        energy += this.getAgentEnergy(id);
    return energy;
}
PhysicsEngine.prototype.getAgentEnergy = function (agentId) {
    var agentData = _getAgentData.call(this, agentId);
    return agentData.agent.getEnergy(agentData.targets, agentData.source);
};
PhysicsEngine.prototype.getEnergy = function getEnergy() {
    return _getParticlesEnergy.call(this) + _getAgentsEnergy.call(this);
};
PhysicsEngine.prototype.step = function step() {
    if (this.isSleeping())
        return;
    var currTime = now();
    var dtFrame = currTime - this._prevTime;
    this._prevTime = currTime;
    if (dtFrame < MIN_TIME_STEP)
        return;
    if (dtFrame > MAX_TIME_STEP)
        dtFrame = MAX_TIME_STEP;
    _integrate.call(this, TIMESTEP);
    this.emit(_events.update, this);
    if (this.getEnergy() < this.options.sleepTolerance)
        this.sleep();
};
PhysicsEngine.prototype.isSleeping = function isSleeping() {
    return this._isSleeping;
};
PhysicsEngine.prototype.isActive = function isSleeping() {
    return !this._isSleeping;
};
PhysicsEngine.prototype.sleep = function sleep() {
    if (this._isSleeping)
        return;
    this.forEach(function (body) {
        body.sleep();
    });
    this.emit(_events.end, this);
    this._isSleeping = true;
};
PhysicsEngine.prototype.wake = function wake() {
    if (!this._isSleeping)
        return;
    this._prevTime = now();
    this.emit(_events.start, this);
    this._isSleeping = false;
};
PhysicsEngine.prototype.emit = function emit(type, data) {
    if (this._eventHandler === null)
        return;
    this._eventHandler.emit(type, data);
};
PhysicsEngine.prototype.on = function on(event, fn) {
    if (this._eventHandler === null)
        this._eventHandler = new EventHandler();
    this._eventHandler.on(event, fn);
};
module.exports = PhysicsEngine;
},{"famous/core/EventHandler":12}],47:[function(require,module,exports){
var Particle = require('./Particle');
var Transform = require('famous/core/Transform');
var Vector = require('famous/math/Vector');
var Quaternion = require('famous/math/Quaternion');
var Matrix = require('famous/math/Matrix');
var Integrator = require('../integrators/SymplecticEuler');
function Body(options) {
    Particle.call(this, options);
    options = options || {};
    this.orientation = new Quaternion();
    this.angularVelocity = new Vector();
    this.angularMomentum = new Vector();
    this.torque = new Vector();
    if (options.orientation)
        this.orientation.set(options.orientation);
    if (options.angularVelocity)
        this.angularVelocity.set(options.angularVelocity);
    if (options.angularMomentum)
        this.angularMomentum.set(options.angularMomentum);
    if (options.torque)
        this.torque.set(options.torque);
    this.angularVelocity.w = 0;
    this.setMomentsOfInertia();
    this.pWorld = new Vector();
}
Body.DEFAULT_OPTIONS = Particle.DEFAULT_OPTIONS;
Body.DEFAULT_OPTIONS.orientation = [
    0,
    0,
    0,
    1
];
Body.DEFAULT_OPTIONS.angularVelocity = [
    0,
    0,
    0
];
Body.prototype = Object.create(Particle.prototype);
Body.prototype.constructor = Body;
Body.prototype.isBody = true;
Body.prototype.setMass = function setMass() {
    Particle.prototype.setMass.apply(this, arguments);
    this.setMomentsOfInertia();
};
Body.prototype.setMomentsOfInertia = function setMomentsOfInertia() {
    this.inertia = new Matrix();
    this.inverseInertia = new Matrix();
};
Body.prototype.updateAngularVelocity = function updateAngularVelocity() {
    this.angularVelocity.set(this.inverseInertia.vectorMultiply(this.angularMomentum));
};
Body.prototype.toWorldCoordinates = function toWorldCoordinates(localPosition) {
    return this.pWorld.set(this.orientation.rotateVector(localPosition));
};
Body.prototype.getEnergy = function getEnergy() {
    return Particle.prototype.getEnergy.call(this) + 0.5 * this.inertia.vectorMultiply(this.angularVelocity).dot(this.angularVelocity);
};
Body.prototype.reset = function reset(p, v, q, L) {
    Particle.prototype.reset.call(this, p, v);
    this.angularVelocity.clear();
    this.setOrientation(q || [
        1,
        0,
        0,
        0
    ]);
    this.setAngularMomentum(L || [
        0,
        0,
        0
    ]);
};
Body.prototype.setOrientation = function setOrientation(q) {
    this.orientation.set(q);
};
Body.prototype.setAngularVelocity = function setAngularVelocity(w) {
    this.wake();
    this.angularVelocity.set(w);
};
Body.prototype.setAngularMomentum = function setAngularMomentum(L) {
    this.wake();
    this.angularMomentum.set(L);
};
Body.prototype.applyForce = function applyForce(force, location) {
    Particle.prototype.applyForce.call(this, force);
    if (location !== undefined)
        this.applyTorque(location.cross(force));
};
Body.prototype.applyTorque = function applyTorque(torque) {
    this.wake();
    this.torque.set(this.torque.add(torque));
};
Body.prototype.getTransform = function getTransform() {
    return Transform.thenMove(this.orientation.getTransform(), Transform.getTranslate(Particle.prototype.getTransform.call(this)));
};
Body.prototype._integrate = function _integrate(dt) {
    Particle.prototype._integrate.call(this, dt);
    this.integrateAngularMomentum(dt);
    this.updateAngularVelocity(dt);
    this.integrateOrientation(dt);
};
Body.prototype.integrateAngularMomentum = function integrateAngularMomentum(dt) {
    Integrator.integrateAngularMomentum(this, dt);
};
Body.prototype.integrateOrientation = function integrateOrientation(dt) {
    Integrator.integrateOrientation(this, dt);
};
module.exports = Body;
},{"../integrators/SymplecticEuler":66,"./Particle":49,"famous/core/Transform":20,"famous/math/Matrix":37,"famous/math/Quaternion":38,"famous/math/Vector":41}],48:[function(require,module,exports){
var Body = require('./Body');
var Matrix = require('famous/math/Matrix');
function Circle(options) {
    options = options || {};
    this.setRadius(options.radius || 0);
    Body.call(this, options);
}
Circle.prototype = Object.create(Body.prototype);
Circle.prototype.constructor = Circle;
Circle.prototype.setRadius = function setRadius(r) {
    this.radius = r;
    this.size = [
        2 * this.radius,
        2 * this.radius
    ];
    this.setMomentsOfInertia();
};
Circle.prototype.setMomentsOfInertia = function setMomentsOfInertia() {
    var m = this.mass;
    var r = this.radius;
    this.inertia = new Matrix([
        [
            0.25 * m * r * r,
            0,
            0
        ],
        [
            0,
            0.25 * m * r * r,
            0
        ],
        [
            0,
            0,
            0.5 * m * r * r
        ]
    ]);
    this.inverseInertia = new Matrix([
        [
            4 / (m * r * r),
            0,
            0
        ],
        [
            0,
            4 / (m * r * r),
            0
        ],
        [
            0,
            0,
            2 / (m * r * r)
        ]
    ]);
};
module.exports = Circle;
},{"./Body":47,"famous/math/Matrix":37}],49:[function(require,module,exports){
var Vector = require('famous/math/Vector');
var Transform = require('famous/core/Transform');
var EventHandler = require('famous/core/EventHandler');
var Integrator = require('../integrators/SymplecticEuler');
function Particle(options) {
    options = options || {};
    var defaults = Particle.DEFAULT_OPTIONS;
    this.position = new Vector();
    this.velocity = new Vector();
    this.force = new Vector();
    this._engine = null;
    this._isSleeping = true;
    this._eventOutput = null;
    this.mass = options.mass !== undefined ? options.mass : defaults.mass;
    this.inverseMass = 1 / this.mass;
    this.setPosition(options.position || defaults.position);
    this.setVelocity(options.velocity || defaults.velocity);
    this.force.set(options.force || [
        0,
        0,
        0
    ]);
    this.transform = Transform.identity.slice();
    this._spec = {
        size: [
            true,
            true
        ],
        target: {
            transform: this.transform,
            origin: [
                0.5,
                0.5
            ],
            target: null
        }
    };
}
Particle.DEFAULT_OPTIONS = {
    position: [
        0,
        0,
        0
    ],
    velocity: [
        0,
        0,
        0
    ],
    mass: 1
};
var _events = {
        start: 'start',
        update: 'update',
        end: 'end'
    };
var now = Date.now;
Particle.prototype.isBody = false;
Particle.prototype.isActive = function isActive() {
    return !this._isSleeping;
};
Particle.prototype.sleep = function sleep() {
    if (this._isSleeping)
        return;
    this.emit(_events.end, this);
    this._isSleeping = true;
};
Particle.prototype.wake = function wake() {
    if (!this._isSleeping)
        return;
    this.emit(_events.start, this);
    this._isSleeping = false;
    this._prevTime = now();
    if (this._engine)
        this._engine.wake();
};
Particle.prototype.setPosition = function setPosition(position) {
    this.position.set(position);
};
Particle.prototype.setPosition1D = function setPosition1D(x) {
    this.position.x = x;
};
Particle.prototype.getPosition = function getPosition() {
    this._engine.step();
    return this.position.get();
};
Particle.prototype.getPosition1D = function getPosition1D() {
    this._engine.step();
    return this.position.x;
};
Particle.prototype.setVelocity = function setVelocity(velocity) {
    this.velocity.set(velocity);
    if (!(velocity[0] === 0 && velocity[1] === 0 && velocity[2] === 0))
        this.wake();
};
Particle.prototype.setVelocity1D = function setVelocity1D(x) {
    this.velocity.x = x;
    if (x !== 0)
        this.wake();
};
Particle.prototype.getVelocity = function getVelocity() {
    return this.velocity.get();
};
Particle.prototype.setForce = function setForce(force) {
    this.force.set(force);
    this.wake();
};
Particle.prototype.getVelocity1D = function getVelocity1D() {
    return this.velocity.x;
};
Particle.prototype.setMass = function setMass(mass) {
    this.mass = mass;
    this.inverseMass = 1 / mass;
};
Particle.prototype.getMass = function getMass() {
    return this.mass;
};
Particle.prototype.reset = function reset(position, velocity) {
    this.setPosition(position || [
        0,
        0,
        0
    ]);
    this.setVelocity(velocity || [
        0,
        0,
        0
    ]);
};
Particle.prototype.applyForce = function applyForce(force) {
    if (force.isZero())
        return;
    this.force.add(force).put(this.force);
    this.wake();
};
Particle.prototype.applyImpulse = function applyImpulse(impulse) {
    if (impulse.isZero())
        return;
    var velocity = this.velocity;
    velocity.add(impulse.mult(this.inverseMass)).put(velocity);
};
Particle.prototype.integrateVelocity = function integrateVelocity(dt) {
    Integrator.integrateVelocity(this, dt);
};
Particle.prototype.integratePosition = function integratePosition(dt) {
    Integrator.integratePosition(this, dt);
};
Particle.prototype._integrate = function _integrate(dt) {
    this.integrateVelocity(dt);
    this.integratePosition(dt);
};
Particle.prototype.getEnergy = function getEnergy() {
    return 0.5 * this.mass * this.velocity.normSquared();
};
Particle.prototype.getTransform = function getTransform() {
    this._engine.step();
    var position = this.position;
    var transform = this.transform;
    transform[12] = position.x;
    transform[13] = position.y;
    transform[14] = position.z;
    return transform;
};
Particle.prototype.modify = function modify(target) {
    var _spec = this._spec.target;
    _spec.transform = this.getTransform();
    _spec.target = target;
    return this._spec;
};
function _createEventOutput() {
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Particle.prototype.emit = function emit(type, data) {
    if (!this._eventOutput)
        return;
    this._eventOutput.emit(type, data);
};
Particle.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
Particle.prototype.removeListener = function removeListener() {
    _createEventOutput.call(this);
    return this.removeListener.apply(this, arguments);
};
Particle.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
Particle.prototype.unpipe = function unpipe() {
    _createEventOutput.call(this);
    return this.unpipe.apply(this, arguments);
};
module.exports = Particle;
},{"../integrators/SymplecticEuler":66,"famous/core/EventHandler":12,"famous/core/Transform":20,"famous/math/Vector":41}],50:[function(require,module,exports){
var Body = require('./Body');
var Matrix = require('famous/math/Matrix');
function Rectangle(options) {
    options = options || {};
    this.size = options.size || [
        0,
        0
    ];
    Body.call(this, options);
}
Rectangle.prototype = Object.create(Body.prototype);
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.setSize = function setSize(size) {
    this.size = size;
    this.setMomentsOfInertia();
};
Rectangle.prototype.setMomentsOfInertia = function setMomentsOfInertia() {
    var m = this.mass;
    var w = this.size[0];
    var h = this.size[1];
    this.inertia = new Matrix([
        [
            m * h * h / 12,
            0,
            0
        ],
        [
            0,
            m * w * w / 12,
            0
        ],
        [
            0,
            0,
            m * (w * w + h * h) / 12
        ]
    ]);
    this.inverseInertia = new Matrix([
        [
            12 / (m * h * h),
            0,
            0
        ],
        [
            0,
            12 / (m * w * w),
            0
        ],
        [
            0,
            0,
            12 / (m * (w * w + h * h))
        ]
    ]);
};
module.exports = Rectangle;
},{"./Body":47,"famous/math/Matrix":37}],51:[function(require,module,exports){
var Constraint = require('./Constraint');
var Vector = require('famous/math/Vector');
function Collision(options) {
    this.options = Object.create(Collision.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.normal = new Vector();
    this.pDiff = new Vector();
    this.vDiff = new Vector();
    this.impulse1 = new Vector();
    this.impulse2 = new Vector();
    Constraint.call(this);
}
Collision.prototype = Object.create(Constraint.prototype);
Collision.prototype.constructor = Collision;
Collision.DEFAULT_OPTIONS = {
    restitution: 0.5,
    drift: 0.5,
    slop: 0
};
function _normalVelocity(particle1, particle2) {
    return particle1.velocity.dot(particle2.velocity);
}
Collision.prototype.setOptions = function setOptions(options) {
    for (var key in options)
        this.options[key] = options[key];
};
Collision.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    if (source === undefined)
        return;
    var v1 = source.velocity;
    var p1 = source.position;
    var w1 = source.inverseMass;
    var r1 = source.radius;
    var options = this.options;
    var drift = options.drift;
    var slop = -options.slop;
    var restitution = options.restitution;
    var n = this.normal;
    var pDiff = this.pDiff;
    var vDiff = this.vDiff;
    var impulse1 = this.impulse1;
    var impulse2 = this.impulse2;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        if (target === source)
            continue;
        var v2 = target.velocity;
        var p2 = target.position;
        var w2 = target.inverseMass;
        var r2 = target.radius;
        pDiff.set(p2.sub(p1));
        vDiff.set(v2.sub(v1));
        var dist = pDiff.norm();
        var overlap = dist - (r1 + r2);
        var effMass = 1 / (w1 + w2);
        var gamma = 0;
        if (overlap < 0) {
            n.set(pDiff.normalize());
            if (this._eventOutput) {
                var collisionData = {
                        target: target,
                        source: source,
                        overlap: overlap,
                        normal: n
                    };
                this._eventOutput.emit('preCollision', collisionData);
                this._eventOutput.emit('collision', collisionData);
            }
            var lambda = overlap <= slop ? ((1 + restitution) * n.dot(vDiff) + drift / dt * (overlap - slop)) / (gamma + dt / effMass) : (1 + restitution) * n.dot(vDiff) / (gamma + dt / effMass);
            n.mult(dt * lambda).put(impulse1);
            impulse1.mult(-1).put(impulse2);
            source.applyImpulse(impulse1);
            target.applyImpulse(impulse2);
            if (this._eventOutput)
                this._eventOutput.emit('postCollision', collisionData);
        }
    }
};
module.exports = Collision;
},{"./Constraint":52,"famous/math/Vector":41}],52:[function(require,module,exports){
var EventHandler = require('famous/core/EventHandler');
function Constraint() {
    this.options = this.options || {};
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Constraint.prototype.setOptions = function setOptions(options) {
    this._eventOutput.emit('change', options);
};
Constraint.prototype.applyConstraint = function applyConstraint() {
};
Constraint.prototype.getEnergy = function getEnergy() {
    return 0;
};
module.exports = Constraint;
},{"famous/core/EventHandler":12}],53:[function(require,module,exports){
var Constraint = require('./Constraint');
var Vector = require('famous/math/Vector');
function Curve(options) {
    this.options = Object.create(Curve.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.J = new Vector();
    this.impulse = new Vector();
    Constraint.call(this);
}
Curve.prototype = Object.create(Constraint.prototype);
Curve.prototype.constructor = Curve;
var epsilon = 1e-7;
var pi = Math.PI;
Curve.DEFAULT_OPTIONS = {
    equation: function (x, y, z) {
        return 0;
    },
    plane: function (x, y, z) {
        return z;
    },
    period: 0,
    dampingRatio: 0
};
Curve.prototype.setOptions = function setOptions(options) {
    for (var key in options)
        this.options[key] = options[key];
};
Curve.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    var options = this.options;
    var impulse = this.impulse;
    var J = this.J;
    var f = options.equation;
    var g = options.plane;
    var dampingRatio = options.dampingRatio;
    var period = options.period;
    for (var i = 0; i < targets.length; i++) {
        var body = targets[i];
        var v = body.velocity;
        var p = body.position;
        var m = body.mass;
        var gamma;
        var beta;
        if (period === 0) {
            gamma = 0;
            beta = 1;
        } else {
            var c = 4 * m * pi * dampingRatio / period;
            var k = 4 * m * pi * pi / (period * period);
            gamma = 1 / (c + dt * k);
            beta = dt * k / (c + dt * k);
        }
        var x = p.x;
        var y = p.y;
        var z = p.z;
        var f0 = f(x, y, z);
        var dfx = (f(x + epsilon, p, p) - f0) / epsilon;
        var dfy = (f(x, y + epsilon, p) - f0) / epsilon;
        var dfz = (f(x, y, p + epsilon) - f0) / epsilon;
        var g0 = g(x, y, z);
        var dgx = (g(x + epsilon, y, z) - g0) / epsilon;
        var dgy = (g(x, y + epsilon, z) - g0) / epsilon;
        var dgz = (g(x, y, z + epsilon) - g0) / epsilon;
        J.setXYZ(dfx + dgx, dfy + dgy, dfz + dgz);
        var antiDrift = beta / dt * (f0 + g0);
        var lambda = -(J.dot(v) + antiDrift) / (gamma + dt * J.normSquared() / m);
        impulse.set(J.mult(dt * lambda));
        body.applyImpulse(impulse);
    }
};
module.exports = Curve;
},{"./Constraint":52,"famous/math/Vector":41}],54:[function(require,module,exports){
var Constraint = require('./Constraint');
var Vector = require('famous/math/Vector');
function Distance(options) {
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.impulse = new Vector();
    this.normal = new Vector();
    this.diffP = new Vector();
    this.diffV = new Vector();
    Constraint.call(this);
}
Distance.prototype = Object.create(Constraint.prototype);
Distance.prototype.constructor = Distance;
Distance.DEFAULT_OPTIONS = {
    anchor: null,
    length: 0,
    minLength: 0,
    period: 0,
    dampingRatio: 0
};
var pi = Math.PI;
Distance.prototype.setOptions = function setOptions(options) {
    if (options.anchor) {
        if (options.anchor.position instanceof Vector)
            this.options.anchor = options.anchor.position;
        if (options.anchor instanceof Vector)
            this.options.anchor = options.anchor;
        if (options.anchor instanceof Array)
            this.options.anchor = new Vector(options.anchor);
    }
    if (options.length !== undefined)
        this.options.length = options.length;
    if (options.dampingRatio !== undefined)
        this.options.dampingRatio = options.dampingRatio;
    if (options.period !== undefined)
        this.options.period = options.period;
    if (options.minLength !== undefined)
        this.options.minLength = options.minLength;
};
function _calcError(impulse, body) {
    return body.mass * impulse.norm();
}
Distance.prototype.setAnchor = function setAnchor(anchor) {
    if (!this.options.anchor)
        this.options.anchor = new Vector();
    this.options.anchor.set(anchor);
};
Distance.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    var n = this.normal;
    var diffP = this.diffP;
    var diffV = this.diffV;
    var impulse = this.impulse;
    var options = this.options;
    var dampingRatio = options.dampingRatio;
    var period = options.period;
    var minLength = options.minLength;
    var p2;
    var w2;
    if (source) {
        var v2 = source.velocity;
        p2 = source.position;
        w2 = source.inverseMass;
    } else {
        p2 = this.options.anchor;
        w2 = 0;
    }
    var length = this.options.length;
    for (var i = 0; i < targets.length; i++) {
        var body = targets[i];
        var v1 = body.velocity;
        var p1 = body.position;
        var w1 = body.inverseMass;
        diffP.set(p1.sub(p2));
        n.set(diffP.normalize());
        var dist = diffP.norm() - length;
        if (Math.abs(dist) < minLength)
            return;
        if (source)
            diffV.set(v1.sub(v2));
        else
            diffV.set(v1);
        var effMass = 1 / (w1 + w2);
        var gamma;
        var beta;
        if (period === 0) {
            gamma = 0;
            beta = 1;
        } else {
            var c = 4 * effMass * pi * dampingRatio / period;
            var k = 4 * effMass * pi * pi / (period * period);
            gamma = 1 / (c + dt * k);
            beta = dt * k / (c + dt * k);
        }
        var antiDrift = beta / dt * dist;
        var lambda = -(n.dot(diffV) + antiDrift) / (gamma + dt / effMass);
        impulse.set(n.mult(dt * lambda));
        body.applyImpulse(impulse);
        if (source)
            source.applyImpulse(impulse.mult(-1));
    }
};
module.exports = Distance;
},{"./Constraint":52,"famous/math/Vector":41}],55:[function(require,module,exports){
var Constraint = require('./Constraint');
var Vector = require('famous/math/Vector');
function Snap(options) {
    Constraint.call(this);
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.pDiff = new Vector();
    this.vDiff = new Vector();
    this.impulse1 = new Vector();
    this.impulse2 = new Vector();
}
Snap.prototype = Object.create(Constraint.prototype);
Snap.prototype.constructor = Snap;
Snap.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.1,
    length: 0,
    anchor: undefined
};
var pi = Math.PI;
Snap.prototype.setOptions = function setOptions(options) {
    if (options.anchor !== undefined) {
        if (options.anchor instanceof Vector)
            this.options.anchor = options.anchor;
        if (options.anchor.position instanceof Vector)
            this.options.anchor = options.anchor.position;
        if (options.anchor instanceof Array)
            this.options.anchor = new Vector(options.anchor);
    }
    if (options.length !== undefined)
        this.options.length = options.length;
    if (options.dampingRatio !== undefined)
        this.options.dampingRatio = options.dampingRatio;
    if (options.period !== undefined)
        this.options.period = options.period;
    Constraint.prototype.setOptions.call(this, options);
};
Snap.prototype.getEnergy = function getEnergy(targets, source) {
    var options = this.options;
    var restLength = options.length;
    var anchor = options.anchor || source.position;
    var strength = Math.pow(2 * pi / options.period, 2);
    var energy = 0;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var dist = anchor.sub(target.position).norm() - restLength;
        energy += 0.5 * strength * dist * dist;
    }
    return energy;
};
Snap.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    var options = this.options;
    var pDiff = this.pDiff;
    var vDiff = this.vDiff;
    var impulse1 = this.impulse1;
    var impulse2 = this.impulse2;
    var length = options.length;
    var anchor = options.anchor || source.position;
    var period = options.period;
    var dampingRatio = options.dampingRatio;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var p1 = target.position;
        var v1 = target.velocity;
        var m1 = target.mass;
        var w1 = target.inverseMass;
        pDiff.set(p1.sub(anchor));
        var dist = pDiff.norm() - length;
        var effMass;
        if (source) {
            var w2 = source.inverseMass;
            var v2 = source.velocity;
            vDiff.set(v1.sub(v2));
            effMass = 1 / (w1 + w2);
        } else {
            vDiff.set(v1);
            effMass = m1;
        }
        var gamma;
        var beta;
        if (this.options.period === 0) {
            gamma = 0;
            beta = 1;
        } else {
            var k = 4 * effMass * pi * pi / (period * period);
            var c = 4 * effMass * pi * dampingRatio / period;
            beta = dt * k / (c + dt * k);
            gamma = 1 / (c + dt * k);
        }
        var antiDrift = beta / dt * dist;
        pDiff.normalize(-antiDrift).sub(vDiff).mult(dt / (gamma + dt / effMass)).put(impulse1);
        target.applyImpulse(impulse1);
        if (source) {
            impulse1.mult(-1).put(impulse2);
            source.applyImpulse(impulse2);
        }
    }
};
module.exports = Snap;
},{"./Constraint":52,"famous/math/Vector":41}],56:[function(require,module,exports){
var Constraint = require('./Constraint');
var Vector = require('famous/math/Vector');
function Surface(options) {
    this.options = Object.create(Surface.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.J = new Vector();
    this.impulse = new Vector();
    Constraint.call(this);
}
Surface.prototype = Object.create(Constraint.prototype);
Surface.prototype.constructor = Surface;
Surface.DEFAULT_OPTIONS = {
    equation: undefined,
    period: 0,
    dampingRatio: 0
};
var epsilon = 1e-7;
var pi = Math.PI;
Surface.prototype.setOptions = function setOptions(options) {
    for (var key in options)
        this.options[key] = options[key];
};
Surface.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    var impulse = this.impulse;
    var J = this.J;
    var options = this.options;
    var f = options.equation;
    var dampingRatio = options.dampingRatio;
    var period = options.period;
    for (var i = 0; i < targets.length; i++) {
        var particle = targets[i];
        var v = particle.velocity;
        var p = particle.position;
        var m = particle.mass;
        var gamma;
        var beta;
        if (period === 0) {
            gamma = 0;
            beta = 1;
        } else {
            var c = 4 * m * pi * dampingRatio / period;
            var k = 4 * m * pi * pi / (period * period);
            gamma = 1 / (c + dt * k);
            beta = dt * k / (c + dt * k);
        }
        var x = p.x;
        var y = p.y;
        var z = p.z;
        var f0 = f(x, y, z);
        var dfx = (f(x + epsilon, p, p) - f0) / epsilon;
        var dfy = (f(x, y + epsilon, p) - f0) / epsilon;
        var dfz = (f(x, y, p + epsilon) - f0) / epsilon;
        J.setXYZ(dfx, dfy, dfz);
        var antiDrift = beta / dt * f0;
        var lambda = -(J.dot(v) + antiDrift) / (gamma + dt * J.normSquared() / m);
        impulse.set(J.mult(dt * lambda));
        particle.applyImpulse(impulse);
    }
};
module.exports = Surface;
},{"./Constraint":52,"famous/math/Vector":41}],57:[function(require,module,exports){
var Constraint = require('./Constraint');
var Vector = require('famous/math/Vector');
function Wall(options) {
    this.options = Object.create(Wall.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.diff = new Vector();
    this.impulse = new Vector();
    Constraint.call(this);
}
Wall.prototype = Object.create(Constraint.prototype);
Wall.prototype.constructor = Wall;
Wall.ON_CONTACT = {
    REFLECT: 0,
    SILENT: 1
};
Wall.DEFAULT_OPTIONS = {
    restitution: 0.5,
    drift: 0.5,
    slop: 0,
    normal: [
        1,
        0,
        0
    ],
    distance: 0,
    onContact: Wall.ON_CONTACT.REFLECT
};
Wall.prototype.setOptions = function setOptions(options) {
    if (options.normal !== undefined) {
        if (options.normal instanceof Vector)
            this.options.normal = options.normal.clone();
        if (options.normal instanceof Array)
            this.options.normal = new Vector(options.normal);
    }
    if (options.restitution !== undefined)
        this.options.restitution = options.restitution;
    if (options.drift !== undefined)
        this.options.drift = options.drift;
    if (options.slop !== undefined)
        this.options.slop = options.slop;
    if (options.distance !== undefined)
        this.options.distance = options.distance;
    if (options.onContact !== undefined)
        this.options.onContact = options.onContact;
};
function _getNormalVelocity(n, v) {
    return v.dot(n);
}
function _getDistanceFromOrigin(p) {
    var n = this.options.normal;
    var d = this.options.distance;
    return p.dot(n) + d;
}
function _onEnter(particle, overlap, dt) {
    var p = particle.position;
    var v = particle.velocity;
    var m = particle.mass;
    var n = this.options.normal;
    var action = this.options.onContact;
    var restitution = this.options.restitution;
    var impulse = this.impulse;
    var drift = this.options.drift;
    var slop = -this.options.slop;
    var gamma = 0;
    if (this._eventOutput) {
        var data = {
                particle: particle,
                wall: this,
                overlap: overlap,
                normal: n
            };
        this._eventOutput.emit('preCollision', data);
        this._eventOutput.emit('collision', data);
    }
    switch (action) {
    case Wall.ON_CONTACT.REFLECT:
        var lambda = overlap < slop ? -((1 + restitution) * n.dot(v) + drift / dt * (overlap - slop)) / (m * dt + gamma) : -((1 + restitution) * n.dot(v)) / (m * dt + gamma);
        impulse.set(n.mult(dt * lambda));
        particle.applyImpulse(impulse);
        particle.setPosition(p.add(n.mult(-overlap)));
        break;
    }
    if (this._eventOutput)
        this._eventOutput.emit('postCollision', data);
}
function _onExit(particle, overlap, dt) {
    var action = this.options.onContact;
    var p = particle.position;
    var n = this.options.normal;
    if (action === Wall.ON_CONTACT.REFLECT) {
        particle.setPosition(p.add(n.mult(-overlap)));
    }
}
Wall.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    var n = this.options.normal;
    for (var i = 0; i < targets.length; i++) {
        var particle = targets[i];
        var p = particle.position;
        var v = particle.velocity;
        var r = particle.radius || 0;
        var overlap = _getDistanceFromOrigin.call(this, p.add(n.mult(-r)));
        var nv = _getNormalVelocity.call(this, n, v);
        if (overlap <= 0) {
            if (nv < 0)
                _onEnter.call(this, particle, overlap, dt);
            else
                _onExit.call(this, particle, overlap, dt);
        }
    }
};
module.exports = Wall;
},{"./Constraint":52,"famous/math/Vector":41}],58:[function(require,module,exports){
var Constraint = require('./Constraint');
var Wall = require('./Wall');
var Vector = require('famous/math/Vector');
function Walls(options) {
    this.options = Object.create(Walls.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    _createComponents.call(this, options.sides || this.options.sides);
    Constraint.call(this);
}
Walls.prototype = Object.create(Constraint.prototype);
Walls.prototype.constructor = Walls;
Walls.ON_CONTACT = Wall.ON_CONTACT;
Walls.SIDES = {
    LEFT: 0,
    RIGHT: 1,
    TOP: 2,
    BOTTOM: 3,
    FRONT: 4,
    BACK: 5,
    TWO_DIMENSIONAL: [
        0,
        1,
        2,
        3
    ],
    THREE_DIMENSIONAL: [
        0,
        1,
        2,
        3,
        4,
        5
    ]
};
Walls.DEFAULT_OPTIONS = {
    sides: Walls.SIDES.TWO_DIMENSIONAL,
    size: [
        window.innerWidth,
        window.innerHeight,
        0
    ],
    origin: [
        0.5,
        0.5,
        0.5
    ],
    drift: 0.5,
    slop: 0,
    restitution: 0.5,
    onContact: Walls.ON_CONTACT.REFLECT
};
var _SIDE_NORMALS = {
        0: new Vector(1, 0, 0),
        1: new Vector(-1, 0, 0),
        2: new Vector(0, 1, 0),
        3: new Vector(0, -1, 0),
        4: new Vector(0, 0, 1),
        5: new Vector(0, 0, -1)
    };
function _getDistance(side, size, origin) {
    var distance;
    var SIDES = Walls.SIDES;
    switch (parseInt(side)) {
    case SIDES.LEFT:
        distance = size[0] * origin[0];
        break;
    case SIDES.TOP:
        distance = size[1] * origin[1];
        break;
    case SIDES.FRONT:
        distance = size[2] * origin[2];
        break;
    case SIDES.RIGHT:
        distance = size[0] * (1 - origin[0]);
        break;
    case SIDES.BOTTOM:
        distance = size[1] * (1 - origin[1]);
        break;
    case SIDES.BACK:
        distance = size[2] * (1 - origin[2]);
        break;
    }
    return distance;
}
Walls.prototype.setOptions = function setOptions(options) {
    var resizeFlag = false;
    if (options.restitution !== undefined)
        _setOptionsForEach.call(this, { restitution: options.restitution });
    if (options.drift !== undefined)
        _setOptionsForEach.call(this, { drift: options.drift });
    if (options.slop !== undefined)
        _setOptionsForEach.call(this, { slop: options.slop });
    if (options.onContact !== undefined)
        _setOptionsForEach.call(this, { onContact: options.onContact });
    if (options.size !== undefined)
        resizeFlag = true;
    if (options.sides !== undefined)
        this.options.sides = options.sides;
    if (options.origin !== undefined)
        resizeFlag = true;
    if (resizeFlag)
        this.setSize(options.size, options.origin);
};
function _createComponents(sides) {
    this.components = {};
    var components = this.components;
    for (var i = 0; i < sides.length; i++) {
        var side = sides[i];
        components[i] = new Wall({
            normal: _SIDE_NORMALS[side].clone(),
            distance: _getDistance(side, this.options.size, this.options.origin)
        });
    }
}
Walls.prototype.setSize = function setSize(size, origin) {
    origin = origin || this.options.origin;
    if (origin.length < 3)
        origin[2] = 0.5;
    this.forEach(function (wall, side) {
        var d = _getDistance(side, size, origin);
        wall.setOptions({ distance: d });
    });
    this.options.size = size;
    this.options.origin = origin;
};
function _setOptionsForEach(options) {
    this.forEach(function (wall) {
        wall.setOptions(options);
    });
    for (var key in options)
        this.options[key] = options[key];
}
Walls.prototype.applyConstraint = function applyConstraint(targets, source, dt) {
    this.forEach(function (wall) {
        wall.applyConstraint(targets, source, dt);
    });
};
Walls.prototype.forEach = function forEach(fn) {
    var sides = this.options.sides;
    for (var key in this.sides)
        fn(sides[key], key);
};
Walls.prototype.rotateZ = function rotateZ(angle) {
    this.forEach(function (wall) {
        var n = wall.options.normal;
        n.rotateZ(angle).put(n);
    });
};
Walls.prototype.rotateX = function rotateX(angle) {
    this.forEach(function (wall) {
        var n = wall.options.normal;
        n.rotateX(angle).put(n);
    });
};
Walls.prototype.rotateY = function rotateY(angle) {
    this.forEach(function (wall) {
        var n = wall.options.normal;
        n.rotateY(angle).put(n);
    });
};
module.exports = Walls;
},{"./Constraint":52,"./Wall":57,"famous/math/Vector":41}],59:[function(require,module,exports){
var Force = require('./Force');
function Drag(options) {
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    Force.call(this);
}
Drag.prototype = Object.create(Force.prototype);
Drag.prototype.constructor = Drag;
Drag.FORCE_FUNCTIONS = {
    LINEAR: function (velocity) {
        return velocity;
    },
    QUADRATIC: function (velocity) {
        return velocity.mult(velocity.norm());
    }
};
Drag.DEFAULT_OPTIONS = {
    strength: 0.01,
    forceFunction: Drag.FORCE_FUNCTIONS.LINEAR
};
Drag.prototype.applyForce = function applyForce(targets) {
    var strength = this.options.strength;
    var forceFunction = this.options.forceFunction;
    var force = this.force;
    for (var index = 0; index < targets.length; index++) {
        var particle = targets[index];
        forceFunction(particle.velocity).mult(-strength).put(force);
        particle.applyForce(force);
    }
};
Drag.prototype.setOptions = function setOptions(options) {
    for (var key in options)
        this.options[key] = options[key];
};
module.exports = Drag;
},{"./Force":60}],60:[function(require,module,exports){
var Vector = require('famous/math/Vector');
var EventHandler = require('famous/core/EventHandler');
function Force(force) {
    this.force = new Vector(force);
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Force.prototype.setOptions = function setOptions(options) {
    this._eventOutput.emit('change', options);
};
Force.prototype.applyForce = function applyForce(body) {
    body.applyForce(this.force);
};
Force.prototype.getEnergy = function getEnergy() {
    return 0;
};
module.exports = Force;
},{"famous/core/EventHandler":12,"famous/math/Vector":41}],61:[function(require,module,exports){
var Force = require('./Force');
var Vector = require('famous/math/Vector');
function Repulsion(options) {
    this.options = Object.create(Repulsion.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.disp = new Vector();
    Force.call(this);
}
Repulsion.prototype = Object.create(Force.prototype);
Repulsion.prototype.constructor = Repulsion;
Repulsion.DECAY_FUNCTIONS = {
    LINEAR: function (r, cutoff) {
        return Math.max(1 - 1 / cutoff * r, 0);
    },
    MORSE: function (r, cutoff) {
        var r0 = cutoff === 0 ? 100 : cutoff;
        var rShifted = r + r0 * (1 - Math.log(2));
        return Math.max(1 - Math.pow(1 - Math.exp(rShifted / r0 - 1), 2), 0);
    },
    INVERSE: function (r, cutoff) {
        return 1 / (1 - cutoff + r);
    },
    GRAVITY: function (r, cutoff) {
        return 1 / (1 - cutoff + r * r);
    }
};
Repulsion.DEFAULT_OPTIONS = {
    strength: 1,
    anchor: undefined,
    range: [
        0,
        Infinity
    ],
    cutoff: 0,
    cap: Infinity,
    decayFunction: Repulsion.DECAY_FUNCTIONS.GRAVITY
};
Repulsion.prototype.setOptions = function setOptions(options) {
    if (options.anchor !== undefined) {
        if (options.anchor.position instanceof Vector)
            this.options.anchor = options.anchor.position;
        if (options.anchor instanceof Array)
            this.options.anchor = new Vector(options.anchor);
        delete options.anchor;
    }
    for (var key in options)
        this.options[key] = options[key];
};
Repulsion.prototype.applyForce = function applyForce(targets, source) {
    var options = this.options;
    var force = this.force;
    var disp = this.disp;
    var strength = options.strength;
    var anchor = options.anchor || source.position;
    var cap = options.cap;
    var cutoff = options.cutoff;
    var rMin = options.range[0];
    var rMax = options.range[1];
    var decayFn = options.decayFunction;
    if (strength === 0)
        return;
    for (var index in targets) {
        var particle = targets[index];
        if (particle === source)
            continue;
        var m1 = particle.mass;
        var p1 = particle.position;
        disp.set(p1.sub(anchor));
        var r = disp.norm();
        if (r < rMax && r > rMin) {
            force.set(disp.normalize(strength * m1 * decayFn(r, cutoff)).cap(cap));
            particle.applyForce(force);
        }
    }
};
module.exports = Repulsion;
},{"./Force":60,"famous/math/Vector":41}],62:[function(require,module,exports){
var Drag = require('./Drag');
function RotationalDrag(options) {
    Drag.call(this, options);
}
RotationalDrag.prototype = Object.create(Drag.prototype);
RotationalDrag.prototype.constructor = RotationalDrag;
RotationalDrag.DEFAULT_OPTIONS = Drag.DEFAULT_OPTIONS;
RotationalDrag.FORCE_FUNCTIONS = Drag.FORCE_FUNCTIONS;
RotationalDrag.FORCE_FUNCTIONS = {
    LINEAR: function (angularVelocity) {
        return angularVelocity;
    },
    QUADRATIC: function (angularVelocity) {
        return angularVelocity.mult(angularVelocity.norm());
    }
};
RotationalDrag.prototype.applyForce = function applyForce(targets) {
    var strength = this.options.strength;
    var forceFunction = this.options.forceFunction;
    var force = this.force;
    for (var index = 0; index < targets.length; index++) {
        var particle = targets[index];
        forceFunction(particle.angularVelocity).mult(-100 * strength).put(force);
        particle.applyTorque(force);
    }
};
RotationalDrag.prototype.setOptions = function setOptions(options) {
    for (var key in options)
        this.options[key] = options[key];
};
module.exports = RotationalDrag;
},{"./Drag":59}],63:[function(require,module,exports){
var Force = require('./Force');
var Spring = require('./Spring');
var Quaternion = require('famous/math/Quaternion');
function RotationalSpring(options) {
    Spring.call(this, options);
}
RotationalSpring.prototype = Object.create(Spring.prototype);
RotationalSpring.prototype.constructor = RotationalSpring;
RotationalSpring.DEFAULT_OPTIONS = Spring.DEFAULT_OPTIONS;
RotationalSpring.FORCE_FUNCTIONS = Spring.FORCE_FUNCTIONS;
var pi = Math.PI;
function _calcStiffness() {
    var options = this.options;
    options.stiffness = Math.pow(2 * pi / options.period, 2);
}
function _calcDamping() {
    var options = this.options;
    options.damping = 4 * pi * options.dampingRatio / options.period;
}
function _init() {
    _calcStiffness.call(this);
    _calcDamping.call(this);
}
RotationalSpring.prototype.setOptions = function setOptions(options) {
    if (options.anchor !== undefined) {
        if (options.anchor instanceof Quaternion)
            this.options.anchor = options.anchor;
        if (options.anchor instanceof Array)
            this.options.anchor = new Quaternion(options.anchor);
    }
    if (options.period !== undefined) {
        this.options.period = options.period;
    }
    if (options.dampingRatio !== undefined)
        this.options.dampingRatio = options.dampingRatio;
    if (options.length !== undefined)
        this.options.length = options.length;
    if (options.forceFunction !== undefined)
        this.options.forceFunction = options.forceFunction;
    if (options.maxLength !== undefined)
        this.options.maxLength = options.maxLength;
    _init.call(this);
    Force.prototype.setOptions.call(this, options);
};
RotationalSpring.prototype.applyForce = function applyForce(targets) {
    var force = this.force;
    var options = this.options;
    var disp = this.disp;
    var stiffness = options.stiffness;
    var damping = options.damping;
    var restLength = options.length;
    var anchor = options.anchor;
    var forceFunction = options.forceFunction;
    var maxLength = options.maxLength;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        disp.set(anchor.sub(target.orientation));
        var dist = disp.norm() - restLength;
        if (dist === 0)
            return;
        var m = target.mass;
        stiffness *= m;
        damping *= m;
        force.set(disp.normalize(stiffness * forceFunction(dist, maxLength)));
        if (damping)
            force.add(target.angularVelocity.mult(-damping)).put(force);
        target.applyTorque(force);
    }
};
RotationalSpring.prototype.getEnergy = function getEnergy(targets) {
    var options = this.options;
    var restLength = options.length;
    var anchor = options.anchor;
    var strength = options.stiffness;
    var energy = 0;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var dist = anchor.sub(target.orientation).norm() - restLength;
        energy += 0.5 * strength * dist * dist;
    }
    return energy;
};
module.exports = RotationalSpring;
},{"./Force":60,"./Spring":64,"famous/math/Quaternion":38}],64:[function(require,module,exports){
var Force = require('./Force');
var Vector = require('famous/math/Vector');
function Spring(options) {
    Force.call(this);
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.disp = new Vector(0, 0, 0);
    _init.call(this);
}
Spring.prototype = Object.create(Force.prototype);
Spring.prototype.constructor = Spring;
var pi = Math.PI;
var MIN_PERIOD = 150;
Spring.FORCE_FUNCTIONS = {
    FENE: function (dist, rMax) {
        var rMaxSmall = rMax * 0.99;
        var r = Math.max(Math.min(dist, rMaxSmall), -rMaxSmall);
        return r / (1 - r * r / (rMax * rMax));
    },
    HOOK: function (dist) {
        return dist;
    }
};
Spring.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.1,
    length: 0,
    maxLength: Infinity,
    anchor: undefined,
    forceFunction: Spring.FORCE_FUNCTIONS.HOOK
};
function _calcStiffness() {
    var options = this.options;
    options.stiffness = Math.pow(2 * pi / options.period, 2);
}
function _calcDamping() {
    var options = this.options;
    options.damping = 4 * pi * options.dampingRatio / options.period;
}
function _init() {
    _calcStiffness.call(this);
    _calcDamping.call(this);
}
Spring.prototype.setOptions = function setOptions(options) {
    if (options.anchor !== undefined) {
        if (options.anchor.position instanceof Vector)
            this.options.anchor = options.anchor.position;
        if (options.anchor instanceof Vector)
            this.options.anchor = options.anchor;
        if (options.anchor instanceof Array)
            this.options.anchor = new Vector(options.anchor);
    }
    if (options.period !== undefined) {
        if (options.period < MIN_PERIOD) {
            options.period = MIN_PERIOD;
            console.warn('The period of a SpringTransition is capped at ' + MIN_PERIOD + ' ms. Use a SnapTransition for faster transitions');
        }
        this.options.period = options.period;
    }
    if (options.dampingRatio !== undefined)
        this.options.dampingRatio = options.dampingRatio;
    if (options.length !== undefined)
        this.options.length = options.length;
    if (options.forceFunction !== undefined)
        this.options.forceFunction = options.forceFunction;
    if (options.maxLength !== undefined)
        this.options.maxLength = options.maxLength;
    _init.call(this);
    Force.prototype.setOptions.call(this, options);
};
Spring.prototype.applyForce = function applyForce(targets, source) {
    var force = this.force;
    var disp = this.disp;
    var options = this.options;
    var stiffness = options.stiffness;
    var damping = options.damping;
    var restLength = options.length;
    var maxLength = options.maxLength;
    var anchor = options.anchor || source.position;
    var forceFunction = options.forceFunction;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var p2 = target.position;
        var v2 = target.velocity;
        anchor.sub(p2).put(disp);
        var dist = disp.norm() - restLength;
        if (dist === 0)
            return;
        var m = target.mass;
        stiffness *= m;
        damping *= m;
        disp.normalize(stiffness * forceFunction(dist, maxLength)).put(force);
        if (damping)
            if (source)
                force.add(v2.sub(source.velocity).mult(-damping)).put(force);
            else
                force.add(v2.mult(-damping)).put(force);
        target.applyForce(force);
        if (source)
            source.applyForce(force.mult(-1));
    }
};
Spring.prototype.getEnergy = function getEnergy(targets, source) {
    var options = this.options;
    var restLength = options.length;
    var anchor = source ? source.position : options.anchor;
    var strength = options.stiffness;
    var energy = 0;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var dist = anchor.sub(target.position).norm() - restLength;
        energy += 0.5 * strength * dist * dist;
    }
    return energy;
};
module.exports = Spring;
},{"./Force":60,"famous/math/Vector":41}],65:[function(require,module,exports){
var Force = require('./Force');
var Vector = require('famous/math/Vector');
function VectorField(options) {
    Force.call(this);
    this.options = Object.create(VectorField.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.evaluation = new Vector();
}
VectorField.prototype = Object.create(Force.prototype);
VectorField.prototype.constructor = VectorField;
VectorField.FIELDS = {
    CONSTANT: function (v, options) {
        options.direction.put(this.evaluation);
    },
    LINEAR: function (v) {
        v.put(this.evaluation);
    },
    RADIAL: function (v) {
        v.mult(-1).put(this.evaluation);
    },
    POINT_ATTRACTOR: function (v, options) {
        options.position.sub(v).put(this.evaluation);
    }
};
VectorField.DEFAULT_OPTIONS = {
    strength: 0.01,
    field: VectorField.FIELDS.CONSTANT
};
VectorField.prototype.setOptions = function setOptions(options) {
    if (options.strength !== undefined)
        this.options.strength = options.strength;
    if (options.field !== undefined) {
        this.options.field = options.field;
        _setFieldOptions.call(this, this.options.field);
    }
};
function _setFieldOptions(field) {
    var FIELDS = VectorField.FIELDS;
    switch (field) {
    case FIELDS.CONSTANT:
        if (!this.options.direction)
            this.options.direction = new Vector(0, 1, 0);
        else if (this.options.direction instanceof Array)
            this.options.direction = new Vector(this.options.direction);
        break;
    case FIELDS.POINT_ATTRACTOR:
        if (!this.options.position)
            this.options.position = new Vector(0, 0, 0);
        else if (this.options.position instanceof Array)
            this.options.position = new Vector(this.options.position);
        break;
    }
}
VectorField.prototype.applyForce = function applyForce(targets) {
    var force = this.force;
    var strength = this.options.strength;
    var field = this.options.field;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        field.call(this, target.position, this.options);
        this.evaluation.mult(target.mass * strength).put(force);
        target.applyForce(force);
    }
};
VectorField.prototype.getEnergy = function getEnergy(targets) {
    var field = this.options.field;
    var FIELDS = VectorField.FIELDS;
    var energy = 0;
    var i;
    var target;
    switch (field) {
    case FIELDS.CONSTANT:
        energy = targets.length * this.options.direction.norm();
        break;
    case FIELDS.RADIAL:
        for (i = 0; i < targets.length; i++) {
            target = targets[i];
            energy += target.position.norm();
        }
        break;
    case FIELDS.POINT_ATTRACTOR:
        for (i = 0; i < targets.length; i++) {
            target = targets[i];
            energy += target.position.sub(this.options.position).norm();
        }
        break;
    }
    energy *= this.options.strength;
    return energy;
};
module.exports = VectorField;
},{"./Force":60,"famous/math/Vector":41}],66:[function(require,module,exports){
var SymplecticEuler = {};
SymplecticEuler.integrateVelocity = function integrateVelocity(body, dt) {
    var v = body.velocity;
    var w = body.inverseMass;
    var f = body.force;
    if (f.isZero())
        return;
    v.add(f.mult(dt * w)).put(v);
    f.clear();
};
SymplecticEuler.integratePosition = function integratePosition(body, dt) {
    var p = body.position;
    var v = body.velocity;
    p.add(v.mult(dt)).put(p);
};
SymplecticEuler.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
    var L = body.angularMomentum;
    var t = body.torque;
    if (t.isZero())
        return;
    L.add(t.mult(dt)).put(L);
    t.clear();
};
SymplecticEuler.integrateOrientation = function integrateOrientation(body, dt) {
    var q = body.orientation;
    var w = body.angularVelocity;
    if (w.isZero())
        return;
    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
};
module.exports = SymplecticEuler;
},{}],67:[function(require,module,exports){
var Surface = require('famous/core/Surface');
function CanvasSurface(options) {
    if (options && options.canvasSize)
        this._canvasSize = options.canvasSize;
    Surface.apply(this, arguments);
    if (!this._canvasSize)
        this._canvasSize = this.getSize();
    this._backBuffer = document.createElement('canvas');
    if (this._canvasSize) {
        this._backBuffer.width = this._canvasSize[0];
        this._backBuffer.height = this._canvasSize[1];
    }
    this._contextId = undefined;
}
CanvasSurface.prototype = Object.create(Surface.prototype);
CanvasSurface.prototype.constructor = CanvasSurface;
CanvasSurface.prototype.elementType = 'canvas';
CanvasSurface.prototype.elementClass = 'famous-surface';
CanvasSurface.prototype.setContent = function setContent() {
};
CanvasSurface.prototype.deploy = function deploy(target) {
    if (this._canvasSize) {
        target.width = this._canvasSize[0];
        target.height = this._canvasSize[1];
    }
    if (this._contextId === '2d') {
        target.getContext(this._contextId).drawImage(this._backBuffer, 0, 0);
        this._backBuffer.width = 0;
        this._backBuffer.height = 0;
    }
};
CanvasSurface.prototype.recall = function recall(target) {
    var size = this.getSize();
    this._backBuffer.width = target.width;
    this._backBuffer.height = target.height;
    if (this._contextId === '2d') {
        this._backBuffer.getContext(this._contextId).drawImage(target, 0, 0);
        target.width = 0;
        target.height = 0;
    }
};
CanvasSurface.prototype.getContext = function getContext(contextId) {
    this._contextId = contextId;
    return this._currentTarget ? this._currentTarget.getContext(contextId) : this._backBuffer.getContext(contextId);
};
CanvasSurface.prototype.setSize = function setSize(size, canvasSize) {
    Surface.prototype.setSize.apply(this, arguments);
    if (canvasSize)
        this._canvasSize = [
            canvasSize[0],
            canvasSize[1]
        ];
    if (this._currentTarget) {
        this._currentTarget.width = this._canvasSize[0];
        this._currentTarget.height = this._canvasSize[1];
    }
};
module.exports = CanvasSurface;
},{"famous/core/Surface":19}],68:[function(require,module,exports){
var Surface = require('famous/core/Surface');
var Context = require('famous/core/Context');
function ContainerSurface(options) {
    Surface.call(this, options);
    this._container = document.createElement('div');
    this._container.classList.add('famous-group');
    this._container.classList.add('famous-container-group');
    this._shouldRecalculateSize = false;
    this.context = new Context(this._container);
    this.setContent(this._container);
}
ContainerSurface.prototype = Object.create(Surface.prototype);
ContainerSurface.prototype.constructor = ContainerSurface;
ContainerSurface.prototype.elementType = 'div';
ContainerSurface.prototype.elementClass = 'famous-surface';
ContainerSurface.prototype.add = function add() {
    return this.context.add.apply(this.context, arguments);
};
ContainerSurface.prototype.render = function render() {
    if (this._sizeDirty)
        this._shouldRecalculateSize = true;
    return Surface.prototype.render.apply(this, arguments);
};
ContainerSurface.prototype.deploy = function deploy() {
    this._shouldRecalculateSize = true;
    return Surface.prototype.deploy.apply(this, arguments);
};
ContainerSurface.prototype.commit = function commit(context, transform, opacity, origin, size) {
    var previousSize = this._size ? [
            this._size[0],
            this._size[1]
        ] : null;
    var result = Surface.prototype.commit.apply(this, arguments);
    if (this._shouldRecalculateSize || previousSize && (this._size[0] !== previousSize[0] || this._size[1] !== previousSize[1])) {
        this.context.setSize();
        this._shouldRecalculateSize = false;
    }
    this.context.update();
    return result;
};
module.exports = ContainerSurface;
},{"famous/core/Context":6,"famous/core/Surface":19}],69:[function(require,module,exports){
var ContainerSurface = require('./ContainerSurface');
function FormContainerSurface(options) {
    if (options)
        this._method = options.method || '';
    ContainerSurface.apply(this, arguments);
}
FormContainerSurface.prototype = Object.create(ContainerSurface.prototype);
FormContainerSurface.prototype.constructor = FormContainerSurface;
FormContainerSurface.prototype.elementType = 'form';
FormContainerSurface.prototype.deploy = function deploy(target) {
    if (this._method)
        target.method = this._method;
    return ContainerSurface.prototype.deploy.apply(this, arguments);
};
module.exports = FormContainerSurface;
},{"./ContainerSurface":68}],70:[function(require,module,exports){
var Surface = require('famous/core/Surface');
function ImageSurface(options) {
    this._imageUrl = undefined;
    Surface.apply(this, arguments);
}
var urlCache = [];
var countCache = [];
var nodeCache = [];
var cacheEnabled = true;
ImageSurface.enableCache = function enableCache() {
    cacheEnabled = true;
};
ImageSurface.disableCache = function disableCache() {
    cacheEnabled = false;
};
ImageSurface.clearCache = function clearCache() {
    urlCache = [];
    countCache = [];
    nodeCache = [];
};
ImageSurface.getCache = function getCache() {
    return {
        urlCache: urlCache,
        countCache: countCache,
        nodeCache: countCache
    };
};
ImageSurface.prototype = Object.create(Surface.prototype);
ImageSurface.prototype.constructor = ImageSurface;
ImageSurface.prototype.elementType = 'img';
ImageSurface.prototype.elementClass = 'famous-surface';
ImageSurface.prototype.setContent = function setContent(imageUrl) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (urlIndex !== -1) {
        if (countCache[urlIndex] === 1) {
            urlCache.splice(urlIndex, 1);
            countCache.splice(urlIndex, 1);
            nodeCache.splice(urlIndex, 1);
        } else {
            countCache[urlIndex]--;
        }
    }
    urlIndex = urlCache.indexOf(imageUrl);
    if (urlIndex === -1) {
        urlCache.push(imageUrl);
        countCache.push(1);
    } else {
        countCache[urlIndex]++;
    }
    this._imageUrl = imageUrl;
    this._contentDirty = true;
};
ImageSurface.prototype.deploy = function deploy(target) {
    var urlIndex = urlCache.indexOf(this._imageUrl);
    if (nodeCache[urlIndex] === undefined && cacheEnabled) {
        var img = new Image();
        img.src = this._imageUrl || '';
        nodeCache[urlIndex] = img;
    }
    target.src = this._imageUrl || '';
};
ImageSurface.prototype.recall = function recall(target) {
    target.src = '';
};
module.exports = ImageSurface;
},{"famous/core/Surface":19}],71:[function(require,module,exports){
var Surface = require('famous/core/Surface');
function InputSurface(options) {
    this._placeholder = options.placeholder || '';
    this._value = options.value || '';
    this._type = options.type || 'text';
    this._name = options.name || '';
    Surface.apply(this, arguments);
    this.on('click', this.focus.bind(this));
    window.addEventListener('click', function (event) {
        if (event.target !== this._currentTarget)
            this.blur();
    }.bind(this));
}
InputSurface.prototype = Object.create(Surface.prototype);
InputSurface.prototype.constructor = InputSurface;
InputSurface.prototype.elementType = 'input';
InputSurface.prototype.elementClass = 'famous-surface';
InputSurface.prototype.setPlaceholder = function setPlaceholder(str) {
    this._placeholder = str;
    this._contentDirty = true;
    return this;
};
InputSurface.prototype.focus = function focus() {
    if (this._currentTarget)
        this._currentTarget.focus();
    return this;
};
InputSurface.prototype.blur = function blur() {
    if (this._currentTarget)
        this._currentTarget.blur();
    return this;
};
InputSurface.prototype.setValue = function setValue(str) {
    this._value = str;
    this._contentDirty = true;
    return this;
};
InputSurface.prototype.setType = function setType(str) {
    this._type = str;
    this._contentDirty = true;
    return this;
};
InputSurface.prototype.getValue = function getValue() {
    if (this._currentTarget) {
        return this._currentTarget.value;
    } else {
        return this._value;
    }
};
InputSurface.prototype.setName = function setName(str) {
    this._name = str;
    this._contentDirty = true;
    return this;
};
InputSurface.prototype.getName = function getName() {
    return this._name;
};
InputSurface.prototype.deploy = function deploy(target) {
    if (this._placeholder !== '')
        target.placeholder = this._placeholder;
    target.value = this._value;
    target.type = this._type;
    target.name = this._name;
};
module.exports = InputSurface;
},{"famous/core/Surface":19}],72:[function(require,module,exports){
var InputSurface = require('./InputSurface');
function SubmitInputSurface(options) {
    InputSurface.apply(this, arguments);
    this._type = 'submit';
    if (options && options.onClick)
        this.setOnClick(options.onClick);
}
SubmitInputSurface.prototype = Object.create(InputSurface.prototype);
SubmitInputSurface.prototype.constructor = SubmitInputSurface;
SubmitInputSurface.prototype.setOnClick = function (onClick) {
    this.onClick = onClick;
};
SubmitInputSurface.prototype.deploy = function deploy(target) {
    if (this.onclick)
        target.onClick = this.onClick;
    InputSurface.prototype.deploy.apply(this, arguments);
};
module.exports = SubmitInputSurface;
},{"./InputSurface":71}],73:[function(require,module,exports){
var Surface = require('famous/core/Surface');
function TextareaSurface(options) {
    this._placeholder = options.placeholder || '';
    this._value = options.value || '';
    this._name = options.name || '';
    this._wrap = options.wrap || '';
    this._cols = options.cols || '';
    this._rows = options.rows || '';
    Surface.apply(this, arguments);
    this.on('click', this.focus.bind(this));
}
TextareaSurface.prototype = Object.create(Surface.prototype);
TextareaSurface.prototype.constructor = TextareaSurface;
TextareaSurface.prototype.elementType = 'textarea';
TextareaSurface.prototype.elementClass = 'famous-surface';
TextareaSurface.prototype.setPlaceholder = function setPlaceholder(str) {
    this._placeholder = str;
    this._contentDirty = true;
    return this;
};
TextareaSurface.prototype.focus = function focus() {
    if (this._currentTarget)
        this._currentTarget.focus();
    return this;
};
TextareaSurface.prototype.blur = function blur() {
    if (this._currentTarget)
        this._currentTarget.blur();
    return this;
};
TextareaSurface.prototype.setValue = function setValue(str) {
    this._value = str;
    this._contentDirty = true;
    return this;
};
TextareaSurface.prototype.getValue = function getValue() {
    if (this._currentTarget) {
        return this._currentTarget.value;
    } else {
        return this._value;
    }
};
TextareaSurface.prototype.setName = function setName(str) {
    this._name = str;
    this._contentDirty = true;
    return this;
};
TextareaSurface.prototype.getName = function getName() {
    return this._name;
};
TextareaSurface.prototype.setWrap = function setWrap(str) {
    this._wrap = str;
    this._contentDirty = true;
    return this;
};
TextareaSurface.prototype.setColumns = function setColumns(num) {
    this._cols = num;
    this._contentDirty = true;
    return this;
};
TextareaSurface.prototype.setRows = function setRows(num) {
    this._rows = num;
    this._contentDirty = true;
    return this;
};
TextareaSurface.prototype.deploy = function deploy(target) {
    if (this._placeholder !== '')
        target.placeholder = this._placeholder;
    if (this._value !== '')
        target.value = this._value;
    if (this._name !== '')
        target.name = this._name;
    if (this._wrap !== '')
        target.wrap = this._wrap;
    if (this._cols !== '')
        target.cols = this._cols;
    if (this._rows !== '')
        target.rows = this._rows;
};
module.exports = TextareaSurface;
},{"famous/core/Surface":19}],74:[function(require,module,exports){
var Surface = require('famous/core/Surface');
function VideoSurface(options) {
    this._videoUrl = undefined;
    this.options = Object.create(VideoSurface.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    Surface.apply(this, arguments);
}
VideoSurface.prototype = Object.create(Surface.prototype);
VideoSurface.prototype.constructor = VideoSurface;
VideoSurface.DEFAULT_OPTIONS = { autoplay: false };
VideoSurface.prototype.elementType = 'video';
VideoSurface.prototype.elementClass = 'famous-surface';
VideoSurface.prototype.setOptions = function setOptions(options) {
    if (options.size)
        this.setSize(options.size);
    if (options.classes)
        this.setClasses(options.classes);
    if (options.properties)
        this.setProperties(options.properties);
    if (options.autoplay)
        this.options.autoplay = options.autoplay;
    if (options.src) {
        this._videoUrl = options.src;
        this._contentDirty = true;
    }
};
VideoSurface.prototype.setContent = function setContent(videoUrl) {
    this._videoUrl = videoUrl;
    this._contentDirty = true;
};
VideoSurface.prototype.deploy = function deploy(target) {
    target.src = this._videoUrl;
    target.autoplay = this.options.autoplay;
};
VideoSurface.prototype.recall = function recall(target) {
    target.src = '';
};
module.exports = VideoSurface;
},{"famous/core/Surface":19}],75:[function(require,module,exports){
function CachedMap(mappingFunction) {
    this._map = mappingFunction || null;
    this._cachedOutput = null;
    this._cachedInput = Number.NaN;
}
CachedMap.create = function create(mappingFunction) {
    var instance = new CachedMap(mappingFunction);
    return instance.get.bind(instance);
};
CachedMap.prototype.get = function get(input) {
    if (input !== this._cachedInput) {
        this._cachedInput = input;
        this._cachedOutput = this._map(input);
    }
    return this._cachedOutput;
};
module.exports = CachedMap;
},{}],76:[function(require,module,exports){
var Easing = {
        inQuad: function (t) {
            return t * t;
        },
        outQuad: function (t) {
            return -(t -= 1) * t + 1;
        },
        inOutQuad: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t;
            return -0.5 * (--t * (t - 2) - 1);
        },
        inCubic: function (t) {
            return t * t * t;
        },
        outCubic: function (t) {
            return --t * t * t + 1;
        },
        inOutCubic: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t * t;
            return 0.5 * ((t -= 2) * t * t + 2);
        },
        inQuart: function (t) {
            return t * t * t * t;
        },
        outQuart: function (t) {
            return -(--t * t * t * t - 1);
        },
        inOutQuart: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t * t * t;
            return -0.5 * ((t -= 2) * t * t * t - 2);
        },
        inQuint: function (t) {
            return t * t * t * t * t;
        },
        outQuint: function (t) {
            return --t * t * t * t * t + 1;
        },
        inOutQuint: function (t) {
            if ((t /= 0.5) < 1)
                return 0.5 * t * t * t * t * t;
            return 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
        inSine: function (t) {
            return -1 * Math.cos(t * (Math.PI / 2)) + 1;
        },
        outSine: function (t) {
            return Math.sin(t * (Math.PI / 2));
        },
        inOutSine: function (t) {
            return -0.5 * (Math.cos(Math.PI * t) - 1);
        },
        inExpo: function (t) {
            return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
        },
        outExpo: function (t) {
            return t === 1 ? 1 : -Math.pow(2, -10 * t) + 1;
        },
        inOutExpo: function (t) {
            if (t === 0)
                return 0;
            if (t === 1)
                return 1;
            if ((t /= 0.5) < 1)
                return 0.5 * Math.pow(2, 10 * (t - 1));
            return 0.5 * (-Math.pow(2, -10 * --t) + 2);
        },
        inCirc: function (t) {
            return -(Math.sqrt(1 - t * t) - 1);
        },
        outCirc: function (t) {
            return Math.sqrt(1 - --t * t);
        },
        inOutCirc: function (t) {
            if ((t /= 0.5) < 1)
                return -0.5 * (Math.sqrt(1 - t * t) - 1);
            return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        inElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0)
                return 0;
            if (t === 1)
                return 1;
            if (!p)
                p = 0.3;
            s = p / (2 * Math.PI) * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
        },
        outElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0)
                return 0;
            if (t === 1)
                return 1;
            if (!p)
                p = 0.3;
            s = p / (2 * Math.PI) * Math.asin(1 / a);
            return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
        },
        inOutElastic: function (t) {
            var s = 1.70158;
            var p = 0;
            var a = 1;
            if (t === 0)
                return 0;
            if ((t /= 0.5) === 2)
                return 1;
            if (!p)
                p = 0.3 * 1.5;
            s = p / (2 * Math.PI) * Math.asin(1 / a);
            if (t < 1)
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p));
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * (2 * Math.PI) / p) * 0.5 + 1;
        },
        inBack: function (t, s) {
            if (s === undefined)
                s = 1.70158;
            return t * t * ((s + 1) * t - s);
        },
        outBack: function (t, s) {
            if (s === undefined)
                s = 1.70158;
            return --t * t * ((s + 1) * t + s) + 1;
        },
        inOutBack: function (t, s) {
            if (s === undefined)
                s = 1.70158;
            if ((t /= 0.5) < 1)
                return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
            return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
        },
        inBounce: function (t) {
            return 1 - Easing.outBounce(1 - t);
        },
        outBounce: function (t) {
            if (t < 1 / 2.75) {
                return 7.5625 * t * t;
            } else if (t < 2 / 2.75) {
                return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
            } else if (t < 2.5 / 2.75) {
                return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
            } else {
                return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
            }
        },
        inOutBounce: function (t) {
            if (t < 0.5)
                return Easing.inBounce(t * 2) * 0.5;
            return Easing.outBounce(t * 2 - 1) * 0.5 + 0.5;
        }
    };
module.exports = Easing;
},{}],77:[function(require,module,exports){
var Utility = require('famous/utilities/Utility');
function MultipleTransition(method) {
    this.method = method;
    this._instances = [];
    this.state = [];
}
MultipleTransition.SUPPORTS_MULTIPLE = true;
MultipleTransition.prototype.get = function get() {
    for (var i = 0; i < this._instances.length; i++) {
        this.state[i] = this._instances[i].get();
    }
    return this.state;
};
MultipleTransition.prototype.set = function set(endState, transition, callback) {
    var _allCallback = Utility.after(endState.length, callback);
    for (var i = 0; i < endState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].set(endState[i], transition, _allCallback);
    }
};
MultipleTransition.prototype.reset = function reset(startState) {
    for (var i = 0; i < startState.length; i++) {
        if (!this._instances[i])
            this._instances[i] = new this.method();
        this._instances[i].reset(startState[i]);
    }
};
module.exports = MultipleTransition;
},{"famous/utilities/Utility":86}],78:[function(require,module,exports){
var PE = require('famous/physics/PhysicsEngine');
var Particle = require('famous/physics/bodies/Particle');
var Spring = require('famous/physics/constraints/Snap');
var Vector = require('famous/math/Vector');
function SnapTransition(state) {
    state = state || 0;
    this.endState = new Vector(state);
    this.initState = new Vector();
    this._dimensions = 1;
    this._restTolerance = 1e-10;
    this._absRestTolerance = this._restTolerance;
    this._callback = undefined;
    this.PE = new PE();
    this.particle = new Particle();
    this.spring = new Spring({ anchor: this.endState });
    this.PE.addBody(this.particle);
    this.PE.attach(this.spring, this.particle);
}
SnapTransition.SUPPORTS_MULTIPLE = 3;
SnapTransition.DEFAULT_OPTIONS = {
    period: 100,
    dampingRatio: 0.2,
    velocity: 0
};
function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
}
function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
}
function _setTarget(target) {
    this.endState.set(target);
    _setAbsoluteRestTolerance.call(this);
}
function _wake() {
    this.PE.wake();
}
function _sleep() {
    this.PE.sleep();
}
function _setParticlePosition(p) {
    this.particle.position.set(p);
}
function _setParticleVelocity(v) {
    this.particle.velocity.set(v);
}
function _getParticlePosition() {
    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
}
function _getParticleVelocity() {
    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
}
function _setCallback(callback) {
    this._callback = callback;
}
function _setupDefinition(definition) {
    var defaults = SnapTransition.DEFAULT_OPTIONS;
    if (definition.period === undefined)
        definition.period = defaults.period;
    if (definition.dampingRatio === undefined)
        definition.dampingRatio = defaults.dampingRatio;
    if (definition.velocity === undefined)
        definition.velocity = defaults.velocity;
    this.spring.setOptions({
        period: definition.period,
        dampingRatio: definition.dampingRatio
    });
    _setParticleVelocity.call(this, definition.velocity);
}
function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }
    if (_getEnergy.call(this) < this._absRestTolerance) {
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [
            0,
            0,
            0
        ]);
        _sleep.call(this);
    }
}
SnapTransition.prototype.reset = function reset(state, velocity) {
    this._dimensions = state instanceof Array ? state.length : 0;
    this.initState.set(state);
    _setParticlePosition.call(this, state);
    _setTarget.call(this, state);
    if (velocity)
        _setParticleVelocity.call(this, velocity);
    _setCallback.call(this, undefined);
};
SnapTransition.prototype.getVelocity = function getVelocity() {
    return _getParticleVelocity.call(this);
};
SnapTransition.prototype.setVelocity = function setVelocity(velocity) {
    this.call(this, _setParticleVelocity(velocity));
};
SnapTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};
SnapTransition.prototype.halt = function halt() {
    this.set(this.get());
};
SnapTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};
SnapTransition.prototype.set = function set(state, definition, callback) {
    if (!definition) {
        this.reset(state);
        if (callback)
            callback();
        return;
    }
    this._dimensions = state instanceof Array ? state.length : 0;
    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, state);
    _setCallback.call(this, callback);
};
module.exports = SnapTransition;
},{"famous/math/Vector":41,"famous/physics/PhysicsEngine":46,"famous/physics/bodies/Particle":49,"famous/physics/constraints/Snap":55}],79:[function(require,module,exports){
var PE = require('famous/physics/PhysicsEngine');
var Particle = require('famous/physics/bodies/Particle');
var Spring = require('famous/physics/forces/Spring');
var Vector = require('famous/math/Vector');
function SpringTransition(state) {
    state = state || 0;
    this.endState = new Vector(state);
    this.initState = new Vector();
    this._dimensions = undefined;
    this._restTolerance = 1e-10;
    this._absRestTolerance = this._restTolerance;
    this._callback = undefined;
    this.PE = new PE();
    this.spring = new Spring({ anchor: this.endState });
    this.particle = new Particle();
    this.PE.addBody(this.particle);
    this.PE.attach(this.spring, this.particle);
}
SpringTransition.SUPPORTS_MULTIPLE = 3;
SpringTransition.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.5,
    velocity: 0
};
function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
}
function _setParticlePosition(p) {
    this.particle.setPosition(p);
}
function _setParticleVelocity(v) {
    this.particle.setVelocity(v);
}
function _getParticlePosition() {
    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
}
function _getParticleVelocity() {
    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
}
function _setCallback(callback) {
    this._callback = callback;
}
function _wake() {
    this.PE.wake();
}
function _sleep() {
    this.PE.sleep();
}
function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }
    if (_getEnergy.call(this) < this._absRestTolerance) {
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [
            0,
            0,
            0
        ]);
        _sleep.call(this);
    }
}
function _setupDefinition(definition) {
    var defaults = SpringTransition.DEFAULT_OPTIONS;
    if (definition.period === undefined)
        definition.period = defaults.period;
    if (definition.dampingRatio === undefined)
        definition.dampingRatio = defaults.dampingRatio;
    if (definition.velocity === undefined)
        definition.velocity = defaults.velocity;
    if (definition.period < 150) {
        definition.period = 150;
        console.warn('The period of a SpringTransition is capped at 150 ms. Use a SnapTransition for faster transitions');
    }
    this.spring.setOptions({
        period: definition.period,
        dampingRatio: definition.dampingRatio
    });
    _setParticleVelocity.call(this, definition.velocity);
}
function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
}
function _setTarget(target) {
    this.endState.set(target);
    _setAbsoluteRestTolerance.call(this);
}
SpringTransition.prototype.reset = function reset(pos, vel) {
    this._dimensions = pos instanceof Array ? pos.length : 0;
    this.initState.set(pos);
    _setParticlePosition.call(this, pos);
    _setTarget.call(this, pos);
    if (vel)
        _setParticleVelocity.call(this, vel);
    _setCallback.call(this, undefined);
};
SpringTransition.prototype.getVelocity = function getVelocity() {
    return _getParticleVelocity.call(this);
};
SpringTransition.prototype.setVelocity = function setVelocity(v) {
    this.call(this, _setParticleVelocity(v));
};
SpringTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};
SpringTransition.prototype.halt = function halt() {
    this.set(this.get());
};
SpringTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};
SpringTransition.prototype.set = function set(endState, definition, callback) {
    if (!definition) {
        this.reset(endState);
        if (callback)
            callback();
        return;
    }
    this._dimensions = endState instanceof Array ? endState.length : 0;
    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, endState);
    _setCallback.call(this, callback);
};
module.exports = SpringTransition;
},{"famous/math/Vector":41,"famous/physics/PhysicsEngine":46,"famous/physics/bodies/Particle":49,"famous/physics/forces/Spring":64}],80:[function(require,module,exports){
var MultipleTransition = require('./MultipleTransition');
var TweenTransition = require('./TweenTransition');
function Transitionable(start) {
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
    this.state = 0;
    this.velocity = undefined;
    this._callback = undefined;
    this._engineInstance = null;
    this._currentMethod = null;
    this.set(start);
}
var transitionMethods = {};
Transitionable.registerMethod = function registerMethod(name, engineClass) {
    if (!(name in transitionMethods)) {
        transitionMethods[name] = engineClass;
        return true;
    } else
        return false;
};
Transitionable.unregisterMethod = function unregisterMethod(name) {
    if (name in transitionMethods) {
        delete transitionMethods[name];
        return true;
    } else
        return false;
};
function _loadNext() {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    if (this.actionQueue.length <= 0) {
        this.set(this.get());
        return;
    }
    this.currentAction = this.actionQueue.shift();
    this._callback = this.callbackQueue.shift();
    var method = null;
    var endValue = this.currentAction[0];
    var transition = this.currentAction[1];
    if (transition instanceof Object && transition.method) {
        method = transition.method;
        if (typeof method === 'string')
            method = transitionMethods[method];
    } else {
        method = TweenTransition;
    }
    if (this._currentMethod !== method) {
        if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
            this._engineInstance = new method();
        } else {
            this._engineInstance = new MultipleTransition(method);
        }
        this._currentMethod = method;
    }
    this._engineInstance.reset(this.state, this.velocity);
    if (this.velocity !== undefined)
        transition.velocity = this.velocity;
    this._engineInstance.set(endValue, transition, _loadNext.bind(this));
}
Transitionable.prototype.set = function set(endState, transition, callback) {
    if (!transition) {
        this.reset(endState);
        if (callback)
            callback();
        return this;
    }
    var action = [
            endState,
            transition
        ];
    this.actionQueue.push(action);
    this.callbackQueue.push(callback);
    if (!this.currentAction)
        _loadNext.call(this);
    return this;
};
Transitionable.prototype.reset = function reset(startState, startVelocity) {
    this._currentMethod = null;
    this._engineInstance = null;
    this._callback = undefined;
    this.state = startState;
    this.velocity = startVelocity;
    this.currentAction = null;
    this.actionQueue = [];
    this.callbackQueue = [];
};
Transitionable.prototype.delay = function delay(duration, callback) {
    this.set(this.get(), {
        duration: duration,
        curve: function () {
            return 0;
        }
    }, callback);
};
Transitionable.prototype.get = function get(timestamp) {
    if (this._engineInstance) {
        if (this._engineInstance.getVelocity)
            this.velocity = this._engineInstance.getVelocity();
        this.state = this._engineInstance.get(timestamp);
    }
    return this.state;
};
Transitionable.prototype.isActive = function isActive() {
    return !!this.currentAction;
};
Transitionable.prototype.halt = function halt() {
    return this.set(this.get());
};
module.exports = Transitionable;
},{"./MultipleTransition":77,"./TweenTransition":82}],81:[function(require,module,exports){
var Transitionable = require('./Transitionable');
var Transform = require('famous/core/Transform');
var Utility = require('famous/utilities/Utility');
function TransitionableTransform(transform) {
    this._final = Transform.identity.slice();
    this._finalTranslate = [
        0,
        0,
        0
    ];
    this._finalRotate = [
        0,
        0,
        0
    ];
    this._finalSkew = [
        0,
        0,
        0
    ];
    this._finalScale = [
        1,
        1,
        1
    ];
    this.translate = new Transitionable(this._finalTranslate);
    this.rotate = new Transitionable(this._finalRotate);
    this.skew = new Transitionable(this._finalSkew);
    this.scale = new Transitionable(this._finalScale);
    if (transform)
        this.set(transform);
}
function _build() {
    return Transform.build({
        translate: this.translate.get(),
        rotate: this.rotate.get(),
        skew: this.skew.get(),
        scale: this.scale.get()
    });
}
function _buildFinal() {
    return Transform.build({
        translate: this._finalTranslate,
        rotate: this._finalRotate,
        skew: this._finalSkew,
        scale: this._finalScale
    });
}
TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
    this._finalTranslate = translate;
    this._final = _buildFinal.call(this);
    this.translate.set(translate, transition, callback);
    return this;
};
TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
    this._finalScale = scale;
    this._final = _buildFinal.call(this);
    this.scale.set(scale, transition, callback);
    return this;
};
TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
    this._finalRotate = eulerAngles;
    this._final = _buildFinal.call(this);
    this.rotate.set(eulerAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
    this._finalSkew = skewAngles;
    this._final = _buildFinal.call(this);
    this.skew.set(skewAngles, transition, callback);
    return this;
};
TransitionableTransform.prototype.set = function set(transform, transition, callback) {
    var components = Transform.interpret(transform);
    this._finalTranslate = components.translate;
    this._finalRotate = components.rotate;
    this._finalSkew = components.skew;
    this._finalScale = components.scale;
    this._final = transform;
    var _callback = callback ? Utility.after(4, callback) : null;
    this.translate.set(components.translate, transition, _callback);
    this.rotate.set(components.rotate, transition, _callback);
    this.skew.set(components.skew, transition, _callback);
    this.scale.set(components.scale, transition, _callback);
    return this;
};
TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
    this.translate.setDefault(transition);
    this.rotate.setDefault(transition);
    this.skew.setDefault(transition);
    this.scale.setDefault(transition);
};
TransitionableTransform.prototype.get = function get() {
    if (this.isActive()) {
        return _build.call(this);
    } else
        return this._final;
};
TransitionableTransform.prototype.getFinal = function getFinal() {
    return this._final;
};
TransitionableTransform.prototype.isActive = function isActive() {
    return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
};
TransitionableTransform.prototype.halt = function halt() {
    this.translate.halt();
    this.rotate.halt();
    this.skew.halt();
    this.scale.halt();
    this._final = this.get();
    this._finalTranslate = this.translate.get();
    this._finalRotate = this.rotate.get();
    this._finalSkew = this.skew.get();
    this._finalScale = this.scale.get();
};
module.exports = TransitionableTransform;
},{"./Transitionable":80,"famous/core/Transform":20,"famous/utilities/Utility":86}],82:[function(require,module,exports){
function TweenTransition(options) {
    this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this._startTime = 0;
    this._startValue = 0;
    this._updateTime = 0;
    this._endValue = 0;
    this._curve = undefined;
    this._duration = 0;
    this._active = false;
    this._callback = undefined;
    this.state = 0;
    this.velocity = undefined;
}
TweenTransition.Curves = {
    linear: function (t) {
        return t;
    },
    easeIn: function (t) {
        return t * t;
    },
    easeOut: function (t) {
        return t * (2 - t);
    },
    easeInOut: function (t) {
        if (t <= 0.5)
            return 2 * t * t;
        else
            return -2 * t * t + 4 * t - 1;
    },
    easeOutBounce: function (t) {
        return t * (3 - 2 * t);
    },
    spring: function (t) {
        return (1 - t) * Math.sin(6 * Math.PI * t) + t;
    }
};
TweenTransition.SUPPORTS_MULTIPLE = true;
TweenTransition.DEFAULT_OPTIONS = {
    curve: TweenTransition.Curves.linear,
    duration: 500,
    speed: 0
};
var registeredCurves = {};
TweenTransition.registerCurve = function registerCurve(curveName, curve) {
    if (!registeredCurves[curveName]) {
        registeredCurves[curveName] = curve;
        return true;
    } else {
        return false;
    }
};
TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
    if (registeredCurves[curveName]) {
        delete registeredCurves[curveName];
        return true;
    } else {
        return false;
    }
};
TweenTransition.getCurve = function getCurve(curveName) {
    var curve = registeredCurves[curveName];
    if (curve !== undefined)
        return curve;
    else
        throw new Error('curve not registered');
};
TweenTransition.getCurves = function getCurves() {
    return registeredCurves;
};
function _interpolate(a, b, t) {
    return (1 - t) * a + t * b;
}
function _clone(obj) {
    if (obj instanceof Object) {
        if (obj instanceof Array)
            return obj.slice(0);
        else
            return Object.create(obj);
    } else
        return obj;
}
function _normalize(transition, defaultTransition) {
    var result = { curve: defaultTransition.curve };
    if (defaultTransition.duration)
        result.duration = defaultTransition.duration;
    if (defaultTransition.speed)
        result.speed = defaultTransition.speed;
    if (transition instanceof Object) {
        if (transition.duration !== undefined)
            result.duration = transition.duration;
        if (transition.curve)
            result.curve = transition.curve;
        if (transition.speed)
            result.speed = transition.speed;
    }
    if (typeof result.curve === 'string')
        result.curve = TweenTransition.getCurve(result.curve);
    return result;
}
TweenTransition.prototype.setOptions = function setOptions(options) {
    if (options.curve !== undefined)
        this.options.curve = options.curve;
    if (options.duration !== undefined)
        this.options.duration = options.duration;
    if (options.speed !== undefined)
        this.options.speed = options.speed;
};
TweenTransition.prototype.set = function set(endValue, transition, callback) {
    if (!transition) {
        this.reset(endValue);
        if (callback)
            callback();
        return;
    }
    this._startValue = _clone(this.get());
    transition = _normalize(transition, this.options);
    if (transition.speed) {
        var startValue = this._startValue;
        if (startValue instanceof Object) {
            var variance = 0;
            for (var i in startValue)
                variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
            transition.duration = Math.sqrt(variance) / transition.speed;
        } else {
            transition.duration = Math.abs(endValue - startValue) / transition.speed;
        }
    }
    this._startTime = Date.now();
    this._endValue = _clone(endValue);
    this._startVelocity = _clone(transition.velocity);
    this._duration = transition.duration;
    this._curve = transition.curve;
    this._active = true;
    this._callback = callback;
};
TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
    if (this._callback) {
        var callback = this._callback;
        this._callback = undefined;
        callback();
    }
    this.state = _clone(startValue);
    this.velocity = _clone(startVelocity);
    this._startTime = 0;
    this._duration = 0;
    this._updateTime = 0;
    this._startValue = this.state;
    this._startVelocity = this.velocity;
    this._endValue = this.state;
    this._active = false;
};
TweenTransition.prototype.getVelocity = function getVelocity() {
    return this.velocity;
};
TweenTransition.prototype.get = function get(timestamp) {
    this.update(timestamp);
    return this.state;
};
function _calculateVelocity(current, start, curve, duration, t) {
    var velocity;
    var eps = 1e-7;
    var speed = (curve(t) - curve(t - eps)) / eps;
    if (current instanceof Array) {
        velocity = [];
        for (var i = 0; i < current.length; i++) {
            if (typeof current[i] === 'number')
                velocity[i] = speed * (current[i] - start[i]) / duration;
            else
                velocity[i] = 0;
        }
    } else
        velocity = speed * (current - start) / duration;
    return velocity;
}
function _calculateState(start, end, t) {
    var state;
    if (start instanceof Array) {
        state = [];
        for (var i = 0; i < start.length; i++) {
            if (typeof start[i] === 'number')
                state[i] = _interpolate(start[i], end[i], t);
            else
                state[i] = start[i];
        }
    } else
        state = _interpolate(start, end, t);
    return state;
}
TweenTransition.prototype.update = function update(timestamp) {
    if (!this._active) {
        if (this._callback) {
            var callback = this._callback;
            this._callback = undefined;
            callback();
        }
        return;
    }
    if (!timestamp)
        timestamp = Date.now();
    if (this._updateTime >= timestamp)
        return;
    this._updateTime = timestamp;
    var timeSinceStart = timestamp - this._startTime;
    if (timeSinceStart >= this._duration) {
        this.state = this._endValue;
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
        this._active = false;
    } else if (timeSinceStart < 0) {
        this.state = this._startValue;
        this.velocity = this._startVelocity;
    } else {
        var t = timeSinceStart / this._duration;
        this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
        this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
    }
};
TweenTransition.prototype.isActive = function isActive() {
    return this._active;
};
TweenTransition.prototype.halt = function halt() {
    this.reset(this.get());
};
TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
TweenTransition.customCurve = function customCurve(v1, v2) {
    v1 = v1 || 0;
    v2 = v2 || 0;
    return function (t) {
        return v1 * t + (-2 * v1 - v2 + 3) * t * t + (v1 + v2 - 2) * t * t * t;
    };
};
module.exports = TweenTransition;
},{}],83:[function(require,module,exports){
var PE = require('famous/physics/PhysicsEngine');
var Particle = require('famous/physics/bodies/Particle');
var Spring = require('famous/physics/forces/Spring');
var Wall = require('famous/physics/constraints/Wall');
var Vector = require('famous/math/Vector');
function WallTransition(state) {
    state = state || 0;
    this.endState = new Vector(state);
    this.initState = new Vector();
    this.spring = new Spring({ anchor: this.endState });
    this.wall = new Wall();
    this._restTolerance = 1e-10;
    this._dimensions = 1;
    this._absRestTolerance = this._restTolerance;
    this._callback = undefined;
    this.PE = new PE();
    this.particle = new Particle();
    this.PE.addBody(this.particle);
    this.PE.attach([
        this.wall,
        this.spring
    ], this.particle);
}
WallTransition.SUPPORTS_MULTIPLE = 3;
WallTransition.DEFAULT_OPTIONS = {
    period: 300,
    dampingRatio: 0.5,
    velocity: 0,
    restitution: 0.5
};
function _getEnergy() {
    return this.particle.getEnergy() + this.spring.getEnergy([this.particle]);
}
function _setAbsoluteRestTolerance() {
    var distance = this.endState.sub(this.initState).normSquared();
    this._absRestTolerance = distance === 0 ? this._restTolerance : this._restTolerance * distance;
}
function _wake() {
    this.PE.wake();
}
function _sleep() {
    this.PE.sleep();
}
function _setTarget(target) {
    this.endState.set(target);
    var dist = this.endState.sub(this.initState).norm();
    this.wall.setOptions({
        distance: this.endState.norm(),
        normal: dist === 0 ? this.particle.velocity.normalize(-1) : this.endState.sub(this.initState).normalize(-1)
    });
    _setAbsoluteRestTolerance.call(this);
}
function _setParticlePosition(p) {
    this.particle.position.set(p);
}
function _setParticleVelocity(v) {
    this.particle.velocity.set(v);
}
function _getParticlePosition() {
    return this._dimensions === 0 ? this.particle.getPosition1D() : this.particle.getPosition();
}
function _getParticleVelocity() {
    return this._dimensions === 0 ? this.particle.getVelocity1D() : this.particle.getVelocity();
}
function _setCallback(callback) {
    this._callback = callback;
}
function _update() {
    if (this.PE.isSleeping()) {
        if (this._callback) {
            var cb = this._callback;
            this._callback = undefined;
            cb();
        }
        return;
    }
    var energy = _getEnergy.call(this);
    if (energy < this._absRestTolerance) {
        _sleep.call(this);
        _setParticlePosition.call(this, this.endState);
        _setParticleVelocity.call(this, [
            0,
            0,
            0
        ]);
    }
}
function _setupDefinition(def) {
    var defaults = WallTransition.DEFAULT_OPTIONS;
    if (def.period === undefined)
        def.period = defaults.period;
    if (def.dampingRatio === undefined)
        def.dampingRatio = defaults.dampingRatio;
    if (def.velocity === undefined)
        def.velocity = defaults.velocity;
    if (def.restitution === undefined)
        def.restitution = defaults.restitution;
    this.spring.setOptions({
        period: def.period,
        dampingRatio: def.dampingRatio
    });
    this.wall.setOptions({ restitution: def.restitution });
    _setParticleVelocity.call(this, def.velocity);
}
WallTransition.prototype.reset = function reset(state, velocity) {
    this._dimensions = state instanceof Array ? state.length : 0;
    this.initState.set(state);
    _setParticlePosition.call(this, state);
    if (velocity)
        _setParticleVelocity.call(this, velocity);
    _setTarget.call(this, state);
    _setCallback.call(this, undefined);
};
WallTransition.prototype.getVelocity = function getVelocity() {
    return _getParticleVelocity.call(this);
};
WallTransition.prototype.setVelocity = function setVelocity(velocity) {
    this.call(this, _setParticleVelocity(velocity));
};
WallTransition.prototype.isActive = function isActive() {
    return !this.PE.isSleeping();
};
WallTransition.prototype.halt = function halt() {
    this.set(this.get());
};
WallTransition.prototype.get = function get() {
    _update.call(this);
    return _getParticlePosition.call(this);
};
WallTransition.prototype.set = function set(state, definition, callback) {
    if (!definition) {
        this.reset(state);
        if (callback)
            callback();
        return;
    }
    this._dimensions = state instanceof Array ? state.length : 0;
    _wake.call(this);
    _setupDefinition.call(this, definition);
    _setTarget.call(this, state);
    _setCallback.call(this, callback);
};
module.exports = WallTransition;
},{"famous/math/Vector":41,"famous/physics/PhysicsEngine":46,"famous/physics/bodies/Particle":49,"famous/physics/constraints/Wall":57,"famous/physics/forces/Spring":64}],84:[function(require,module,exports){
var KeyCodes = {
        0: 48,
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        8: 56,
        9: 57,
        a: 97,
        b: 98,
        c: 99,
        d: 100,
        e: 101,
        f: 102,
        g: 103,
        h: 104,
        i: 105,
        j: 106,
        k: 107,
        l: 108,
        m: 109,
        n: 110,
        o: 111,
        p: 112,
        q: 113,
        r: 114,
        s: 115,
        t: 116,
        u: 117,
        v: 118,
        w: 119,
        x: 120,
        y: 121,
        z: 122,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        ENTER: 13,
        LEFT_ARROW: 37,
        RIGHT_ARROW: 39,
        UP_ARROW: 38,
        DOWN_ARROW: 40,
        SPACE: 32,
        SHIFT: 16,
        TAB: 9
    };
module.exports = KeyCodes;
},{}],85:[function(require,module,exports){
var FamousEngine = require('famous/core/Engine');
var _event = 'prerender';
var getTime = window.performance && window.performance.now ? function () {
        return window.performance.now();
    } : function () {
        return Date.now();
    };
function addTimerFunction(fn) {
    FamousEngine.on(_event, fn);
    return fn;
}
function setTimeout(fn, duration) {
    var t = getTime();
    var callback = function () {
        var t2 = getTime();
        if (t2 - t >= duration) {
            fn.apply(this, arguments);
            FamousEngine.removeListener(_event, callback);
        }
    };
    return addTimerFunction(callback);
}
function setInterval(fn, duration) {
    var t = getTime();
    var callback = function () {
        var t2 = getTime();
        if (t2 - t >= duration) {
            fn.apply(this, arguments);
            t = getTime();
        }
    };
    return addTimerFunction(callback);
}
function after(fn, numTicks) {
    if (numTicks === undefined)
        return undefined;
    var callback = function () {
        numTicks--;
        if (numTicks <= 0) {
            fn.apply(this, arguments);
            clear(callback);
        }
    };
    return addTimerFunction(callback);
}
function every(fn, numTicks) {
    numTicks = numTicks || 1;
    var initial = numTicks;
    var callback = function () {
        numTicks--;
        if (numTicks <= 0) {
            fn.apply(this, arguments);
            numTicks = initial;
        }
    };
    return addTimerFunction(callback);
}
function clear(fn) {
    FamousEngine.removeListener(_event, fn);
}
function debounce(func, wait) {
    var timeout;
    var ctx;
    var timestamp;
    var result;
    var args;
    return function () {
        ctx = this;
        args = arguments;
        timestamp = getTime();
        var fn = function () {
            var last = getTime - timestamp;
            if (last < wait) {
                timeout = setTimeout(fn, wait - last);
            } else {
                timeout = null;
                result = func.apply(ctx, args);
            }
        };
        clear(timeout);
        timeout = setTimeout(fn, wait);
        return result;
    };
}
module.exports = {
    setTimeout: setTimeout,
    setInterval: setInterval,
    debounce: debounce,
    after: after,
    every: every,
    clear: clear
};
},{"famous/core/Engine":9}],86:[function(require,module,exports){
var Utility = {};
Utility.Direction = {
    X: 0,
    Y: 1,
    Z: 2
};
Utility.after = function after(count, callback) {
    var counter = count;
    return function () {
        counter--;
        if (counter === 0)
            callback.apply(this, arguments);
    };
};
Utility.loadURL = function loadURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function onreadystatechange() {
        if (this.readyState === 4) {
            if (callback)
                callback(this.responseText);
        }
    };
    xhr.open('GET', url);
    xhr.send();
};
Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
    var element = document.createElement('div');
    element.innerHTML = html;
    var result = document.createDocumentFragment();
    while (element.hasChildNodes())
        result.appendChild(element.firstChild);
    return result;
};
Utility.clone = function clone(b) {
    var a;
    if (typeof b === 'object') {
        a = b instanceof Array ? [] : {};
        for (var key in b) {
            if (typeof b[key] === 'object' && b[key] !== null) {
                if (b[key] instanceof Array) {
                    a[key] = new Array(b[key].length);
                    for (var i = 0; i < b[key].length; i++) {
                        a[key][i] = Utility.clone(b[key][i]);
                    }
                } else {
                    a[key] = Utility.clone(b[key]);
                }
            } else {
                a[key] = b[key];
            }
        }
    } else {
        a = b;
    }
    return a;
};
module.exports = Utility;
},{}],87:[function(require,module,exports){
var Entity = require('famous/core/Entity');
var Transform = require('famous/core/Transform');
var EventHandler = require('famous/core/EventHandler');
var OptionsManager = require('famous/core/OptionsManager');
function ContextualView(options) {
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS || ContextualView.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._id = Entity.register(this);
}
ContextualView.DEFAULT_OPTIONS = {};
ContextualView.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
ContextualView.prototype.getOptions = function getOptions(key) {
    return this._optionsManager.getOptions(key);
};
ContextualView.prototype.render = function render() {
    return this._id;
};
ContextualView.prototype.commit = function commit(context) {
};
module.exports = ContextualView;
},{"famous/core/Entity":10,"famous/core/EventHandler":12,"famous/core/OptionsManager":15,"famous/core/Transform":20}],88:[function(require,module,exports){
var Transform = require('famous/core/Transform');
var OptionsManager = require('famous/core/OptionsManager');
var Transitionable = require('famous/transitions/Transitionable');
var Utility = require('famous/utilities/Utility');
var SequentialLayout = require('./SequentialLayout');
function Deck(options) {
    SequentialLayout.apply(this, arguments);
    this.state = new Transitionable(0);
    this._isOpen = false;
    this.setOutputFunction(function (input, offset, index) {
        var state = _getState.call(this);
        var positionMatrix = this.options.direction === Utility.Direction.X ? Transform.translate(state * offset, 0, 0.001 * (state - 1) * offset) : Transform.translate(0, state * offset, 0.001 * (state - 1) * offset);
        var output = input.render();
        if (this.options.stackRotation) {
            var amount = this.options.stackRotation * index * (1 - state);
            output = {
                transform: Transform.rotateZ(amount),
                origin: [
                    0.5,
                    0.5
                ],
                target: output
            };
        }
        return {
            transform: positionMatrix,
            size: input.getSize(),
            target: output
        };
    });
}
Deck.prototype = Object.create(SequentialLayout.prototype);
Deck.prototype.constructor = Deck;
Deck.DEFAULT_OPTIONS = OptionsManager.patch(SequentialLayout.DEFAULT_OPTIONS, {
    transition: {
        curve: 'easeOutBounce',
        duration: 500
    },
    stackRotation: 0
});
Deck.prototype.getSize = function getSize() {
    var originalSize = SequentialLayout.prototype.getSize.apply(this, arguments);
    var firstSize = this._items ? this._items.get().getSize() : [
            0,
            0
        ];
    if (!firstSize)
        firstSize = [
            0,
            0
        ];
    var state = _getState.call(this);
    var invState = 1 - state;
    return [
        firstSize[0] * invState + originalSize[0] * state,
        firstSize[1] * invState + originalSize[1] * state
    ];
};
function _getState(returnFinal) {
    if (returnFinal)
        return this._isOpen ? 1 : 0;
    else
        return this.state.get();
}
function _setState(pos, transition, callback) {
    this.state.halt();
    this.state.set(pos, transition, callback);
}
Deck.prototype.isOpen = function isOpen() {
    return this._isOpen;
};
Deck.prototype.open = function open(callback) {
    this._isOpen = true;
    _setState.call(this, 1, this.options.transition, callback);
};
Deck.prototype.close = function close(callback) {
    this._isOpen = false;
    _setState.call(this, 0, this.options.transition, callback);
};
Deck.prototype.toggle = function toggle(callback) {
    if (this._isOpen)
        this.close(callback);
    else
        this.open(callback);
};
module.exports = Deck;
},{"./SequentialLayout":99,"famous/core/OptionsManager":15,"famous/core/Transform":20,"famous/transitions/Transitionable":80,"famous/utilities/Utility":86}],89:[function(require,module,exports){
var CachedMap = require('famous/transitions/CachedMap');
var Entity = require('famous/core/Entity');
var EventHandler = require('famous/core/EventHandler');
var Transform = require('famous/core/Transform');
var RenderController = require('./RenderController');
function EdgeSwapper(options) {
    this._currentTarget = null;
    this._size = [
        undefined,
        undefined
    ];
    this._controller = new RenderController(options);
    this._controller.inTransformFrom(CachedMap.create(_transformMap.bind(this, 0.0001)));
    this._controller.outTransformFrom(CachedMap.create(_transformMap.bind(this, -0.0001)));
    this._eventInput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    this._entityId = Entity.register(this);
    if (options)
        this.setOptions(options);
}
function _transformMap(zMax, progress) {
    return Transform.translate(this._size[0] * (1 - progress), 0, zMax * (1 - progress));
}
EdgeSwapper.prototype.show = function show(content) {
    if (this._currentTarget)
        this._eventInput.unpipe(this._currentTarget);
    this._currentTarget = content;
    if (this._currentTarget && this._currentTarget.trigger)
        this._eventInput.pipe(this._currentTarget);
    this._controller.show.apply(this._controller, arguments);
};
EdgeSwapper.prototype.setOptions = function setOptions(options) {
    this._controller.setOptions(options);
};
EdgeSwapper.prototype.render = function render() {
    return this._entityId;
};
EdgeSwapper.prototype.commit = function commit(context) {
    this._size[0] = context.size[0];
    this._size[1] = context.size[1];
    return {
        transform: context.transform,
        opacity: context.opacity,
        origin: context.origin,
        size: context.size,
        target: this._controller.render()
    };
};
module.exports = EdgeSwapper;
},{"./RenderController":95,"famous/core/Entity":10,"famous/core/EventHandler":12,"famous/core/Transform":20,"famous/transitions/CachedMap":75}],90:[function(require,module,exports){
var Entity = require('famous/core/Entity');
var Transform = require('famous/core/Transform');
var OptionsManager = require('famous/core/OptionsManager');
var EventHandler = require('famous/core/EventHandler');
var Transitionable = require('famous/transitions/Transitionable');
function FlexibleLayout(options) {
    this.options = Object.create(FlexibleLayout.DEFAULT_OPTIONS);
    this.optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this.id = Entity.register(this);
    this._ratios = new Transitionable(this.options.ratios);
    this._nodes = [];
    this._cachedDirection = null;
    this._cachedTotalLength = false;
    this._cachedLengths = [];
    this._cachedTransforms = null;
    this._ratiosDirty = false;
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
FlexibleLayout.DIRECTION_X = 0;
FlexibleLayout.DIRECTION_Y = 1;
FlexibleLayout.DEFAULT_OPTIONS = {
    direction: FlexibleLayout.DIRECTION_X,
    transition: false,
    ratios: []
};
function _reflow(ratios, length, direction) {
    var currTransform;
    var translation = 0;
    var flexLength = length;
    var ratioSum = 0;
    var ratio;
    var node;
    var i;
    this._cachedLengths = [];
    this._cachedTransforms = [];
    for (i = 0; i < ratios.length; i++) {
        ratio = ratios[i];
        node = this._nodes[i];
        if (typeof ratio !== 'number')
            flexLength -= node.getSize()[direction] || 0;
        else
            ratioSum += ratio;
    }
    for (i = 0; i < ratios.length; i++) {
        node = this._nodes[i];
        ratio = ratios[i];
        length = typeof ratio === 'number' ? flexLength * ratio / ratioSum : node.getSize()[direction];
        currTransform = direction === FlexibleLayout.DIRECTION_X ? Transform.translate(translation, 0, 0) : Transform.translate(0, translation, 0);
        this._cachedTransforms.push(currTransform);
        this._cachedLengths.push(length);
        translation += length;
    }
}
FlexibleLayout.prototype.render = function render() {
    return this.id;
};
FlexibleLayout.prototype.setOptions = function setOptions(options) {
    this.optionsManager.setOptions(options);
};
FlexibleLayout.prototype.sequenceFrom = function sequenceFrom(sequence) {
    this._nodes = sequence;
    if (this._ratios.get().length === 0) {
        var ratios = [];
        for (var i = 0; i < this._nodes.length; i++)
            ratios.push(1);
        this.setRatios(ratios);
    }
};
FlexibleLayout.prototype.setRatios = function setRatios(ratios, transition, callback) {
    if (transition === undefined)
        transition = this.options.transition;
    var currRatios = this._ratios;
    if (currRatios.get().length === 0)
        transition = undefined;
    if (currRatios.isActive())
        currRatios.halt();
    currRatios.set(ratios, transition, callback);
    this._ratiosDirty = true;
};
FlexibleLayout.prototype.commit = function commit(context) {
    var parentSize = context.size;
    var parentTransform = context.transform;
    var parentOrigin = context.origin;
    var parentOpacity = context.opacity;
    var ratios = this._ratios.get();
    var direction = this.options.direction;
    var length = parentSize[direction];
    var size;
    if (length !== this._cachedTotalLength || this._ratiosDirty || this._ratios.isActive() || direction !== this._cachedDirection) {
        _reflow.call(this, ratios, length, direction);
        if (length !== this._cachedTotalLength)
            this._cachedTotalLength = length;
        if (direction !== this._cachedDirection)
            this._cachedDirection = direction;
        if (this._ratiosDirty)
            this._ratiosDirty = false;
    }
    var result = [];
    for (var i = 0; i < ratios.length; i++) {
        size = [
            undefined,
            undefined
        ];
        length = this._cachedLengths[i];
        size[direction] = length;
        result.push({
            transform: this._cachedTransforms[i],
            size: size,
            target: this._nodes[i].render()
        });
    }
    if (parentSize && (parentOrigin[0] !== 0 && parentOrigin[1] !== 0))
        parentTransform = Transform.moveThen([
            -parentSize[0] * parentOrigin[0],
            -parentSize[1] * parentOrigin[1],
            0
        ], parentTransform);
    return {
        transform: parentTransform,
        size: parentSize,
        opacity: parentOpacity,
        target: result
    };
};
module.exports = FlexibleLayout;
},{"famous/core/Entity":10,"famous/core/EventHandler":12,"famous/core/OptionsManager":15,"famous/core/Transform":20,"famous/transitions/Transitionable":80}],91:[function(require,module,exports){
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var RenderNode = require('famous/core/RenderNode');
var OptionsManager = require('famous/core/OptionsManager');
function Flipper(options) {
    this.options = Object.create(Flipper.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this.angle = new Transitionable(0);
    this.frontNode = undefined;
    this.backNode = undefined;
    this.flipped = false;
}
Flipper.DIRECTION_X = 0;
Flipper.DIRECTION_Y = 1;
var SEPERATION_LENGTH = 1;
Flipper.DEFAULT_OPTIONS = {
    transition: true,
    direction: Flipper.DIRECTION_X
};
Flipper.prototype.flip = function flip(transition, callback) {
    var angle = this.flipped ? 0 : Math.PI;
    this.setAngle(angle, transition, callback);
    this.flipped = !this.flipped;
};
Flipper.prototype.setAngle = function setAngle(angle, transition, callback) {
    if (transition === undefined)
        transition = this.options.transition;
    if (this.angle.isActive())
        this.angle.halt();
    this.angle.set(angle, transition, callback);
};
Flipper.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
Flipper.prototype.setFront = function setFront(node) {
    this.frontNode = node;
};
Flipper.prototype.setBack = function setBack(node) {
    this.backNode = node;
};
Flipper.prototype.render = function render() {
    var angle = this.angle.get();
    var frontTransform;
    var backTransform;
    if (this.options.direction === Flipper.DIRECTION_X) {
        frontTransform = Transform.rotateY(angle);
        backTransform = Transform.rotateY(angle + Math.PI);
    } else {
        frontTransform = Transform.rotateX(angle);
        backTransform = Transform.rotateX(angle + Math.PI);
    }
    var result = [];
    if (this.frontNode) {
        result.push({
            transform: frontTransform,
            target: this.frontNode.render()
        });
    }
    if (this.backNode) {
        result.push({
            transform: Transform.moveThen([
                0,
                0,
                SEPERATION_LENGTH
            ], backTransform),
            target: this.backNode.render()
        });
    }
    return result;
};
module.exports = Flipper;
},{"famous/core/OptionsManager":15,"famous/core/RenderNode":16,"famous/core/Transform":20,"famous/transitions/Transitionable":80}],92:[function(require,module,exports){
var Entity = require('famous/core/Entity');
var RenderNode = require('famous/core/RenderNode');
var Transform = require('famous/core/Transform');
var ViewSequence = require('famous/core/ViewSequence');
var EventHandler = require('famous/core/EventHandler');
var Modifier = require('famous/core/Modifier');
var OptionsManager = require('famous/core/OptionsManager');
var Transitionable = require('famous/transitions/Transitionable');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');
function GridLayout(options) {
    this.options = Object.create(GridLayout.DEFAULT_OPTIONS);
    this.optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this.id = Entity.register(this);
    this._modifiers = [];
    this._states = [];
    this._contextSizeCache = [
        0,
        0
    ];
    this._dimensionsCache = [
        0,
        0
    ];
    this._activeCount = 0;
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
}
function _reflow(size, cols, rows) {
    var usableSize = [
            size[0],
            size[1]
        ];
    usableSize[0] -= this.options.gutterSize[0] * (cols - 1);
    usableSize[1] -= this.options.gutterSize[1] * (rows - 1);
    var rowSize = Math.round(usableSize[1] / rows);
    var colSize = Math.round(usableSize[0] / cols);
    var currY = 0;
    var currX;
    var currIndex = 0;
    for (var i = 0; i < rows; i++) {
        currX = 0;
        for (var j = 0; j < cols; j++) {
            if (this._modifiers[currIndex] === undefined) {
                _createModifier.call(this, currIndex, [
                    colSize,
                    rowSize
                ], [
                    currX,
                    currY,
                    0
                ], 1);
            } else {
                _animateModifier.call(this, currIndex, [
                    colSize,
                    rowSize
                ], [
                    currX,
                    currY,
                    0
                ], 1);
            }
            currIndex++;
            currX += colSize + this.options.gutterSize[0];
        }
        currY += rowSize + this.options.gutterSize[1];
    }
    this._dimensionsCache = [
        this.options.dimensions[0],
        this.options.dimensions[1]
    ];
    this._contextSizeCache = [
        size[0],
        size[1]
    ];
    this._activeCount = rows * cols;
    for (i = this._activeCount; i < this._modifiers.length; i++)
        _animateModifier.call(this, i, [
            Math.round(colSize),
            Math.round(rowSize)
        ], [
            0,
            0
        ], 0);
    this._eventOutput.emit('reflow');
}
function _createModifier(index, size, position, opacity) {
    var transitionItem = {
            transform: new TransitionableTransform(Transform.translate.apply(null, position)),
            opacity: new Transitionable(opacity),
            size: new Transitionable(size)
        };
    var modifier = new Modifier({
            transform: transitionItem.transform,
            opacity: transitionItem.opacity,
            size: transitionItem.size
        });
    this._states[index] = transitionItem;
    this._modifiers[index] = modifier;
}
function _animateModifier(index, size, position, opacity) {
    var currState = this._states[index];
    var currSize = currState.size;
    var currOpacity = currState.opacity;
    var currTransform = currState.transform;
    var transition = this.options.transition;
    currTransform.halt();
    currOpacity.halt();
    currSize.halt();
    currTransform.setTranslate(position, transition);
    currSize.set(size, transition);
    currOpacity.set(opacity, transition);
}
GridLayout.DEFAULT_OPTIONS = {
    dimensions: [
        1,
        1
    ],
    transition: false,
    gutterSize: [
        0,
        0
    ]
};
GridLayout.prototype.render = function render() {
    return this.id;
};
GridLayout.prototype.setOptions = function setOptions(options) {
    return this.optionsManager.setOptions(options);
};
GridLayout.prototype.sequenceFrom = function sequenceFrom(sequence) {
    if (sequence instanceof Array)
        sequence = new ViewSequence(sequence);
    this.sequence = sequence;
};
GridLayout.prototype.commit = function commit(context) {
    var transform = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;
    var cols = this.options.dimensions[0];
    var rows = this.options.dimensions[1];
    if (size[0] !== this._contextSizeCache[0] || size[1] !== this._contextSizeCache[1] || cols !== this._dimensionsCache[0] || rows !== this._dimensionsCache[1]) {
        _reflow.call(this, size, cols, rows);
    }
    var sequence = this.sequence;
    var result = [];
    var currIndex = 0;
    while (sequence && currIndex < this._modifiers.length) {
        var item = sequence.get();
        var modifier = this._modifiers[currIndex];
        if (currIndex >= this._activeCount && this._states[currIndex].opacity.isActive()) {
            this._modifiers.splice(currIndex, 1);
            this._states.splice(currIndex, 1);
        }
        if (item) {
            result.push(modifier.modify({
                origin: origin,
                target: item.render()
            }));
        }
        sequence = sequence.getNext();
        currIndex++;
    }
    if (size)
        transform = Transform.moveThen([
            -size[0] * origin[0],
            -size[1] * origin[1],
            0
        ], transform);
    return {
        transform: transform,
        opacity: opacity,
        size: size,
        target: result
    };
};
module.exports = GridLayout;
},{"famous/core/Entity":10,"famous/core/EventHandler":12,"famous/core/Modifier":14,"famous/core/OptionsManager":15,"famous/core/RenderNode":16,"famous/core/Transform":20,"famous/core/ViewSequence":22,"famous/transitions/Transitionable":80,"famous/transitions/TransitionableTransform":81}],93:[function(require,module,exports){
var Entity = require('famous/core/Entity');
var RenderNode = require('famous/core/RenderNode');
var Transform = require('famous/core/Transform');
var OptionsManager = require('famous/core/OptionsManager');
function HeaderFooterLayout(options) {
    this.options = Object.create(HeaderFooterLayout.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._entityId = Entity.register(this);
    this.header = new RenderNode();
    this.footer = new RenderNode();
    this.content = new RenderNode();
}
HeaderFooterLayout.DIRECTION_X = 0;
HeaderFooterLayout.DIRECTION_Y = 1;
HeaderFooterLayout.DEFAULT_OPTIONS = {
    direction: HeaderFooterLayout.DIRECTION_Y,
    headerSize: undefined,
    footerSize: undefined,
    defaultHeaderSize: 0,
    defaultFooterSize: 0
};
HeaderFooterLayout.prototype.render = function render() {
    return this._entityId;
};
HeaderFooterLayout.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
function _resolveNodeSize(node, defaultSize) {
    var nodeSize = node.getSize();
    return nodeSize ? nodeSize[this.options.direction] : defaultSize;
}
function _outputTransform(offset) {
    if (this.options.direction === HeaderFooterLayout.DIRECTION_X)
        return Transform.translate(offset, 0, 0);
    else
        return Transform.translate(0, offset, 0);
}
function _finalSize(directionSize, size) {
    if (this.options.direction === HeaderFooterLayout.DIRECTION_X)
        return [
            directionSize,
            size[1]
        ];
    else
        return [
            size[0],
            directionSize
        ];
}
HeaderFooterLayout.prototype.commit = function commit(context) {
    var transform = context.transform;
    var origin = context.origin;
    var size = context.size;
    var opacity = context.opacity;
    var headerSize = this.options.headerSize !== undefined ? this.options.headerSize : _resolveNodeSize.call(this, this.header, this.options.defaultHeaderSize);
    var footerSize = this.options.footerSize !== undefined ? this.options.footerSize : _resolveNodeSize.call(this, this.footer, this.options.defaultFooterSize);
    var contentSize = size[this.options.direction] - headerSize - footerSize;
    if (size)
        transform = Transform.moveThen([
            -size[0] * origin[0],
            -size[1] * origin[1],
            0
        ], transform);
    var result = [
            {
                size: _finalSize.call(this, headerSize, size),
                target: this.header.render()
            },
            {
                transform: _outputTransform.call(this, headerSize),
                size: _finalSize.call(this, contentSize, size),
                target: this.content.render()
            },
            {
                transform: _outputTransform.call(this, headerSize + contentSize),
                size: _finalSize.call(this, footerSize, size),
                target: this.footer.render()
            }
        ];
    return {
        transform: transform,
        opacity: opacity,
        size: size,
        target: result
    };
};
module.exports = HeaderFooterLayout;
},{"famous/core/Entity":10,"famous/core/OptionsManager":15,"famous/core/RenderNode":16,"famous/core/Transform":20}],94:[function(require,module,exports){
var Transform = require('famous/core/Transform');
var Modifier = require('famous/core/Modifier');
var RenderNode = require('famous/core/RenderNode');
var Utility = require('famous/utilities/Utility');
var OptionsManager = require('famous/core/OptionsManager');
var Transitionable = require('famous/transitions/Transitionable');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');
function Lightbox(options) {
    this.options = Object.create(Lightbox.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this._showing = false;
    this.nodes = [];
    this.transforms = [];
    this.states = [];
}
Lightbox.DEFAULT_OPTIONS = {
    inTransform: Transform.scale(0.001, 0.001, 0.001),
    inOpacity: 0,
    inOrigin: [
        0.5,
        0.5
    ],
    outTransform: Transform.scale(0.001, 0.001, 0.001),
    outOpacity: 0,
    outOrigin: [
        0.5,
        0.5
    ],
    showTransform: Transform.identity,
    showOpacity: 1,
    showOrigin: [
        0.5,
        0.5
    ],
    inTransition: true,
    outTransition: true,
    overlap: false
};
Lightbox.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
Lightbox.prototype.show = function show(renderable, transition, callback) {
    if (!renderable) {
        return this.hide(callback);
    }
    if (transition instanceof Function) {
        callback = transition;
        transition = undefined;
    }
    if (this._showing) {
        if (this.options.overlap)
            this.hide();
        else {
            return this.hide(this.show.bind(this, renderable, transition, callback));
        }
    }
    this._showing = true;
    var stateItem = {
            transform: new TransitionableTransform(this.options.inTransform),
            origin: new Transitionable(this.options.inOrigin),
            opacity: new Transitionable(this.options.inOpacity)
        };
    var transform = new Modifier({
            transform: stateItem.transform,
            opacity: stateItem.opacity,
            origin: stateItem.origin
        });
    var node = new RenderNode();
    node.add(transform).add(renderable);
    this.nodes.push(node);
    this.states.push(stateItem);
    this.transforms.push(transform);
    var _cb = callback ? Utility.after(3, callback) : undefined;
    if (!transition)
        transition = this.options.inTransition;
    stateItem.transform.set(this.options.showTransform, transition, _cb);
    stateItem.opacity.set(this.options.showOpacity, transition, _cb);
    stateItem.origin.set(this.options.showOrigin, transition, _cb);
};
Lightbox.prototype.hide = function hide(transition, callback) {
    if (!this._showing)
        return;
    this._showing = false;
    if (transition instanceof Function) {
        callback = transition;
        transition = undefined;
    }
    var node = this.nodes[this.nodes.length - 1];
    var transform = this.transforms[this.transforms.length - 1];
    var stateItem = this.states[this.states.length - 1];
    var _cb = Utility.after(3, function () {
            this.nodes.splice(this.nodes.indexOf(node), 1);
            this.states.splice(this.states.indexOf(stateItem), 1);
            this.transforms.splice(this.transforms.indexOf(transform), 1);
            if (callback)
                callback.call(this);
        }.bind(this));
    if (!transition)
        transition = this.options.outTransition;
    stateItem.transform.set(this.options.outTransform, transition, _cb);
    stateItem.opacity.set(this.options.outOpacity, transition, _cb);
    stateItem.origin.set(this.options.outOrigin, transition, _cb);
};
Lightbox.prototype.render = function render() {
    var result = [];
    for (var i = 0; i < this.nodes.length; i++) {
        result.push(this.nodes[i].render());
    }
    return result;
};
module.exports = Lightbox;
},{"famous/core/Modifier":14,"famous/core/OptionsManager":15,"famous/core/RenderNode":16,"famous/core/Transform":20,"famous/transitions/Transitionable":80,"famous/transitions/TransitionableTransform":81,"famous/utilities/Utility":86}],95:[function(require,module,exports){
var Modifier = require('famous/core/Modifier');
var RenderNode = require('famous/core/RenderNode');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var View = require('famous/core/View');
function RenderController(options) {
    View.apply(this, arguments);
    this._showing = -1;
    this._outgoingRenderables = [];
    this._nextRenderable = null;
    this._renderables = [];
    this._nodes = [];
    this._modifiers = [];
    this._states = [];
    this.inTransformMap = RenderController.DefaultMap.transform;
    this.inOpacityMap = RenderController.DefaultMap.opacity;
    this.inOriginMap = RenderController.DefaultMap.origin;
    this.outTransformMap = RenderController.DefaultMap.transform;
    this.outOpacityMap = RenderController.DefaultMap.opacity;
    this.outOriginMap = RenderController.DefaultMap.origin;
    this._output = [];
}
RenderController.prototype = Object.create(View.prototype);
RenderController.prototype.constructor = RenderController;
RenderController.DEFAULT_OPTIONS = {
    inTransition: true,
    outTransition: true,
    overlap: true
};
RenderController.DefaultMap = {
    transform: function () {
        return Transform.identity;
    },
    opacity: function (progress) {
        return progress;
    },
    origin: null
};
function _mappedState(map, state) {
    return map(state.get());
}
RenderController.prototype.inTransformFrom = function inTransformFrom(transform) {
    if (transform instanceof Function)
        this.inTransformMap = transform;
    else if (transform && transform.get)
        this.inTransformMap = transform.get.bind(transform);
    else
        throw new Error('inTransformFrom takes only function or getter object');
    return this;
};
RenderController.prototype.inOpacityFrom = function inOpacityFrom(opacity) {
    if (opacity instanceof Function)
        this.inOpacityMap = opacity;
    else if (opacity && opacity.get)
        this.inOpacityMap = opacity.get.bind(opacity);
    else
        throw new Error('inOpacityFrom takes only function or getter object');
    return this;
};
RenderController.prototype.inOriginFrom = function inOriginFrom(origin) {
    if (origin instanceof Function)
        this.inOriginMap = origin;
    else if (origin && origin.get)
        this.inOriginMap = origin.get.bind(origin);
    else
        throw new Error('inOriginFrom takes only function or getter object');
    return this;
};
RenderController.prototype.outTransformFrom = function outTransformFrom(transform) {
    if (transform instanceof Function)
        this.outTransformMap = transform;
    else if (transform && transform.get)
        this.outTransformMap = transform.get.bind(transform);
    else
        throw new Error('outTransformFrom takes only function or getter object');
    return this;
};
RenderController.prototype.outOpacityFrom = function outOpacityFrom(opacity) {
    if (opacity instanceof Function)
        this.outOpacityMap = opacity;
    else if (opacity && opacity.get)
        this.outOpacityMap = opacity.get.bind(opacity);
    else
        throw new Error('outOpacityFrom takes only function or getter object');
    return this;
};
RenderController.prototype.outOriginFrom = function outOriginFrom(origin) {
    if (origin instanceof Function)
        this.outOriginMap = origin;
    else if (origin && origin.get)
        this.outOriginMap = origin.get.bind(origin);
    else
        throw new Error('outOriginFrom takes only function or getter object');
    return this;
};
RenderController.prototype.show = function show(renderable, transition, callback) {
    if (!renderable) {
        return this.hide(callback);
    }
    if (transition instanceof Function) {
        callback = transition;
        transition = null;
    }
    if (this._showing >= 0) {
        if (this.options.overlap)
            this.hide();
        else {
            if (this._nextRenderable) {
                this._nextRenderable = renderable;
            } else {
                this._nextRenderable = renderable;
                this.hide(function () {
                    if (this._nextRenderable === renderable)
                        this.show(this._nextRenderable, callback);
                    this._nextRenderable = null;
                });
            }
            return undefined;
        }
    }
    var state = null;
    var renderableIndex = this._renderables.indexOf(renderable);
    if (renderableIndex >= 0) {
        this._showing = renderableIndex;
        state = this._states[renderableIndex];
        state.halt();
        var outgoingIndex = this._outgoingRenderables.indexOf(renderable);
        if (outgoingIndex >= 0)
            this._outgoingRenderables.splice(outgoingIndex, 1);
    } else {
        state = new Transitionable(0);
        var modifier = new Modifier({
                transform: this.inTransformMap ? _mappedState.bind(this, this.inTransformMap, state) : null,
                opacity: this.inOpacityMap ? _mappedState.bind(this, this.inOpacityMap, state) : null,
                origin: this.inOriginMap ? _mappedState.bind(this, this.inOriginMap, state) : null
            });
        var node = new RenderNode();
        node.add(modifier).add(renderable);
        this._showing = this._nodes.length;
        this._nodes.push(node);
        this._modifiers.push(modifier);
        this._states.push(state);
        this._renderables.push(renderable);
    }
    if (!transition)
        transition = this.options.inTransition;
    state.set(1, transition, callback);
};
RenderController.prototype.hide = function hide(transition, callback) {
    if (this._showing < 0)
        return;
    var index = this._showing;
    this._showing = -1;
    if (transition instanceof Function) {
        callback = transition;
        transition = undefined;
    }
    var node = this._nodes[index];
    var modifier = this._modifiers[index];
    var state = this._states[index];
    var renderable = this._renderables[index];
    modifier.transformFrom(this.outTransformMap ? _mappedState.bind(this, this.outTransformMap, state) : null);
    modifier.opacityFrom(this.outOpacityMap ? _mappedState.bind(this, this.outOpacityMap, state) : null);
    modifier.originFrom(this.outOriginMap ? _mappedState.bind(this, this.outOriginMap, state) : null);
    if (this._outgoingRenderables.indexOf(renderable) < 0)
        this._outgoingRenderables.push(renderable);
    if (!transition)
        transition = this.options.outTransition;
    state.halt();
    state.set(0, transition, function (node, modifier, state, renderable) {
        if (this._outgoingRenderables.indexOf(renderable) >= 0) {
            var index = this._nodes.indexOf(node);
            this._nodes.splice(index, 1);
            this._modifiers.splice(index, 1);
            this._states.splice(index, 1);
            this._renderables.splice(index, 1);
            this._outgoingRenderables.splice(this._outgoingRenderables.indexOf(renderable), 1);
            if (this._showing >= index)
                this._showing--;
        }
        if (callback)
            callback.call(this);
    }.bind(this, node, modifier, state, renderable));
};
RenderController.prototype.render = function render() {
    var result = this._output;
    if (result.length > this._nodes.length)
        result.splice(this._nodes.length);
    for (var i = 0; i < this._nodes.length; i++) {
        result[i] = this._nodes[i].render();
    }
    return result;
};
module.exports = RenderController;
},{"famous/core/Modifier":14,"famous/core/RenderNode":16,"famous/core/Transform":20,"famous/core/View":21,"famous/transitions/Transitionable":80}],96:[function(require,module,exports){
var ContainerSurface = require('famous/surfaces/ContainerSurface');
var EventHandler = require('famous/core/EventHandler');
var Scrollview = require('./Scrollview');
var Utility = require('famous/utilities/Utility');
var OptionsManager = require('famous/core/OptionsManager');
function ScrollContainer(options) {
    this.options = Object.create(ScrollContainer.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this.container = new ContainerSurface(this.options.container);
    this.scrollview = new Scrollview(this.options.scrollview);
    this.container.add(this.scrollview);
    this._eventInput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    this._eventInput.pipe(this.scrollview);
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
    this.container.pipe(this._eventOutput);
    this.scrollview.pipe(this._eventOutput);
}
ScrollContainer.DEFAULT_OPTIONS = {
    container: { properties: { overflow: 'hidden' } },
    scrollview: {}
};
ScrollContainer.prototype.setOptions = function setOptions(options) {
    return this._optionsManager.setOptions(options);
};
ScrollContainer.prototype.sequenceFrom = function sequenceFrom() {
    return this.scrollview.sequenceFrom.apply(this.scrollview, arguments);
};
ScrollContainer.prototype.getSize = function getSize() {
    return this.container.getSize.apply(this.container, arguments);
};
ScrollContainer.prototype.render = function render() {
    return this.container.render();
};
module.exports = ScrollContainer;
},{"./Scrollview":98,"famous/core/EventHandler":12,"famous/core/OptionsManager":15,"famous/surfaces/ContainerSurface":68,"famous/utilities/Utility":86}],97:[function(require,module,exports){
var Entity = require('famous/core/Entity');
var Group = require('famous/core/Group');
var OptionsManager = require('famous/core/OptionsManager');
var Transform = require('famous/core/Transform');
var Utility = require('famous/utilities/Utility');
var ViewSequence = require('famous/core/ViewSequence');
var EventHandler = require('famous/core/EventHandler');
function Scroller(options) {
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this._optionsManager.setOptions(options);
    this._node = null;
    this._position = 0;
    this._positionOffset = 0;
    this._positionGetter = null;
    this._outputFunction = null;
    this._masterOutputFunction = null;
    this.outputFrom();
    this._onEdge = 0;
    this.group = new Group();
    this.group.add({ render: _innerRender.bind(this) });
    this._entityId = Entity.register(this);
    this._size = [
        undefined,
        undefined
    ];
    this._contextSize = [
        undefined,
        undefined
    ];
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Scroller.DEFAULT_OPTIONS = {
    direction: Utility.Direction.Y,
    margin: 0,
    clipSize: undefined,
    groupScroll: false
};
var EDGE_TOLERANCE = 0;
function _sizeForDir(size) {
    if (!size)
        size = this._contextSize;
    var dimension = this.options.direction;
    return size[dimension] === undefined ? this._contextSize[dimension] : size[dimension];
}
function _output(node, offset, target) {
    var size = node.getSize ? node.getSize() : this._contextSize;
    var transform = this._outputFunction(offset);
    target.push({
        transform: transform,
        target: node.render()
    });
    return _sizeForDir.call(this, size);
}
function _getClipSize() {
    if (this.options.clipSize !== undefined)
        return this.options.clipSize;
    if (this._contextSize[this.options.direction] > this.getCumulativeSize()[this.options.direction]) {
        return _sizeForDir.call(this, this.getCumulativeSize());
    } else {
        return _sizeForDir.call(this, this._contextSize);
    }
}
Scroller.prototype.getCumulativeSize = function (index) {
    if (index === undefined)
        index = this._node._.cumulativeSizes.length - 1;
    return this._node._.getSize(index);
};
Scroller.prototype.setOptions = function setOptions(options) {
    if (options.groupScroll !== this.options.groupScroll) {
        if (options.groupScroll)
            this.group.pipe(this._eventOutput);
        else
            this.group.unpipe(this._eventOutput);
    }
    this._optionsManager.setOptions(options);
};
Scroller.prototype.onEdge = function onEdge() {
    return this._onEdge;
};
Scroller.prototype.outputFrom = function outputFrom(fn, masterFn) {
    if (!fn) {
        fn = function (offset) {
            return this.options.direction === Utility.Direction.X ? Transform.translate(offset, 0) : Transform.translate(0, offset);
        }.bind(this);
        if (!masterFn)
            masterFn = fn;
    }
    this._outputFunction = fn;
    this._masterOutputFunction = masterFn ? masterFn : function (offset) {
        return Transform.inverse(fn(-offset));
    };
};
Scroller.prototype.positionFrom = function positionFrom(position) {
    if (position instanceof Function)
        this._positionGetter = position;
    else if (position && position.get)
        this._positionGetter = position.get.bind(position);
    else {
        this._positionGetter = null;
        this._position = position;
    }
    if (this._positionGetter)
        this._position = this._positionGetter.call(this);
};
Scroller.prototype.sequenceFrom = function sequenceFrom(node) {
    if (node instanceof Array)
        node = new ViewSequence({ array: node });
    this._node = node;
    this._positionOffset = 0;
};
Scroller.prototype.getSize = function getSize(actual) {
    return actual ? this._contextSize : this._size;
};
Scroller.prototype.render = function render() {
    if (!this._node)
        return null;
    if (this._positionGetter)
        this._position = this._positionGetter.call(this);
    return this._entityId;
};
Scroller.prototype.commit = function commit(context) {
    var transform = context.transform;
    var opacity = context.opacity;
    var origin = context.origin;
    var size = context.size;
    if (!this.options.clipSize && (size[0] !== this._contextSize[0] || size[1] !== this._contextSize[1])) {
        this._onEdge = 0;
        this._contextSize[0] = size[0];
        this._contextSize[1] = size[1];
        if (this.options.direction === Utility.Direction.X) {
            this._size[0] = _getClipSize.call(this);
            this._size[1] = undefined;
        } else {
            this._size[0] = undefined;
            this._size[1] = _getClipSize.call(this);
        }
    }
    var scrollTransform = this._masterOutputFunction(-this._position);
    return {
        transform: Transform.multiply(transform, scrollTransform),
        size: size,
        opacity: opacity,
        origin: origin,
        target: this.group.render()
    };
};
function _innerRender() {
    var size = null;
    var position = this._position;
    var result = [];
    var offset = -this._positionOffset;
    var clipSize = _getClipSize.call(this);
    var currNode = this._node;
    while (currNode && offset - position < clipSize + this.options.margin) {
        offset += _output.call(this, currNode, offset, result);
        currNode = currNode.getNext ? currNode.getNext() : null;
    }
    var sizeNode = this._node;
    var nodesSize = _sizeForDir.call(this, sizeNode.getSize());
    if (offset < clipSize) {
        while (sizeNode && nodesSize < clipSize) {
            sizeNode = sizeNode.getPrevious();
            if (sizeNode)
                nodesSize += _sizeForDir.call(this, sizeNode.getSize());
        }
        sizeNode = this._node;
        while (sizeNode && nodesSize < clipSize) {
            sizeNode = sizeNode.getNext();
            if (sizeNode)
                nodesSize += _sizeForDir.call(this, sizeNode.getSize());
        }
    }
    if (!currNode && offset - position < clipSize - EDGE_TOLERANCE) {
        if (this._onEdge !== 1) {
            this._onEdge = 1;
            this._eventOutput.emit('onEdge', { position: offset - clipSize });
        }
    } else if (!this._node.getPrevious() && position < -EDGE_TOLERANCE) {
        if (this._onEdge !== -1) {
            this._onEdge = -1;
            this._eventOutput.emit('onEdge', { position: 0 });
        }
    } else {
        if (this._onEdge !== 0) {
            this._onEdge = 0;
            this._eventOutput.emit('offEdge');
        }
    }
    currNode = this._node && this._node.getPrevious ? this._node.getPrevious() : null;
    offset = -this._positionOffset;
    if (currNode) {
        size = currNode.getSize ? currNode.getSize() : this._contextSize;
        offset -= _sizeForDir.call(this, size);
    }
    while (currNode && offset - position > -(clipSize + this.options.margin)) {
        _output.call(this, currNode, offset, result);
        currNode = currNode.getPrevious ? currNode.getPrevious() : null;
        if (currNode) {
            size = currNode.getSize ? currNode.getSize() : this._contextSize;
            offset -= _sizeForDir.call(this, size);
        }
    }
    return result;
}
module.exports = Scroller;
},{"famous/core/Entity":10,"famous/core/EventHandler":12,"famous/core/Group":13,"famous/core/OptionsManager":15,"famous/core/Transform":20,"famous/core/ViewSequence":22,"famous/utilities/Utility":86}],98:[function(require,module,exports){
var PhysicsEngine = require('famous/physics/PhysicsEngine');
var Particle = require('famous/physics/bodies/Particle');
var Drag = require('famous/physics/forces/Drag');
var Spring = require('famous/physics/forces/Spring');
var EventHandler = require('famous/core/EventHandler');
var OptionsManager = require('famous/core/OptionsManager');
var ViewSequence = require('famous/core/ViewSequence');
var Scroller = require('famous/views/Scroller');
var Utility = require('famous/utilities/Utility');
var GenericSync = require('famous/inputs/GenericSync');
var ScrollSync = require('famous/inputs/ScrollSync');
var TouchSync = require('famous/inputs/TouchSync');
GenericSync.register({
    scroll: ScrollSync,
    touch: TouchSync
});
var TOLERANCE = 0.5;
var SpringStates = {
        NONE: 0,
        EDGE: 1,
        PAGE: 2
    };
var EdgeStates = {
        TOP: -1,
        NONE: 0,
        BOTTOM: 1
    };
function Scrollview(options) {
    this.options = Object.create(Scrollview.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    this._scroller = new Scroller(this.options);
    this.sync = new GenericSync([
        'scroll',
        'touch'
    ], {
        direction: this.options.direction,
        scale: this.options.syncScale,
        rails: this.options.rails,
        preventDefault: this.options.preventDefault
    });
    this._physicsEngine = new PhysicsEngine();
    this._particle = new Particle();
    this._physicsEngine.addBody(this._particle);
    this.spring = new Spring({
        anchor: [
            0,
            0,
            0
        ],
        period: this.options.edgePeriod,
        dampingRatio: this.options.edgeDamp
    });
    this.drag = new Drag({
        forceFunction: Drag.FORCE_FUNCTIONS.QUADRATIC,
        strength: this.options.drag
    });
    this.friction = new Drag({
        forceFunction: Drag.FORCE_FUNCTIONS.LINEAR,
        strength: this.options.friction
    });
    this._node = null;
    this._touchCount = 0;
    this._springState = SpringStates.NONE;
    this._onEdge = EdgeStates.NONE;
    this._pageSpringPosition = 0;
    this._edgeSpringPosition = 0;
    this._touchVelocity = 0;
    this._earlyEnd = false;
    this._needsPaginationCheck = false;
    this._displacement = 0;
    this._totalShift = 0;
    this._cachedIndex = 0;
    this._scroller.positionFrom(this.getPosition.bind(this));
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    this._eventInput.pipe(this.sync);
    this.sync.pipe(this._eventInput);
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    _bindEvents.call(this);
    if (options)
        this.setOptions(options);
}
Scrollview.DEFAULT_OPTIONS = {
    direction: Utility.Direction.Y,
    rails: true,
    friction: 0.005,
    drag: 0.0001,
    edgeGrip: 0.2,
    edgePeriod: 300,
    edgeDamp: 1,
    margin: 1000,
    paginated: false,
    pagePeriod: 500,
    pageDamp: 0.8,
    pageStopSpeed: 10,
    pageSwitchSpeed: 0.5,
    speedLimit: 5,
    groupScroll: false,
    syncScale: 1
};
function _handleStart(event) {
    this._touchCount = event.count;
    if (event.count === undefined)
        this._touchCount = 1;
    _detachAgents.call(this);
    this.setVelocity(0);
    this._touchVelocity = 0;
    this._earlyEnd = false;
}
function _handleMove(event) {
    var velocity = -event.velocity;
    var delta = -event.delta;
    if (this._onEdge !== EdgeStates.NONE && event.slip) {
        if (velocity < 0 && this._onEdge === EdgeStates.TOP || velocity > 0 && this._onEdge === EdgeStates.BOTTOM) {
            if (!this._earlyEnd) {
                _handleEnd.call(this, event);
                this._earlyEnd = true;
            }
        } else if (this._earlyEnd && Math.abs(velocity) > Math.abs(this.getVelocity())) {
            _handleStart.call(this, event);
        }
    }
    if (this._earlyEnd)
        return;
    this._touchVelocity = velocity;
    if (event.slip) {
        var speedLimit = this.options.speedLimit;
        if (velocity < -speedLimit)
            velocity = -speedLimit;
        else if (velocity > speedLimit)
            velocity = speedLimit;
        this.setVelocity(velocity);
        var deltaLimit = speedLimit * 16;
        if (delta > deltaLimit)
            delta = deltaLimit;
        else if (delta < -deltaLimit)
            delta = -deltaLimit;
    }
    this.setPosition(this.getPosition() + delta);
    this._displacement += delta;
    if (this._springState === SpringStates.NONE)
        _normalizeState.call(this);
}
function _handleEnd(event) {
    this._touchCount = event.count || 0;
    if (!this._touchCount) {
        _detachAgents.call(this);
        if (this._onEdge !== EdgeStates.NONE)
            _setSpring.call(this, this._edgeSpringPosition, SpringStates.EDGE);
        _attachAgents.call(this);
        var velocity = -event.velocity;
        var speedLimit = this.options.speedLimit;
        if (event.slip)
            speedLimit *= this.options.edgeGrip;
        if (velocity < -speedLimit)
            velocity = -speedLimit;
        else if (velocity > speedLimit)
            velocity = speedLimit;
        this.setVelocity(velocity);
        this._touchVelocity = 0;
        this._needsPaginationCheck = true;
    }
}
function _bindEvents() {
    this._eventInput.bindThis(this);
    this._eventInput.on('start', _handleStart);
    this._eventInput.on('update', _handleMove);
    this._eventInput.on('end', _handleEnd);
    this._eventInput.on('resize', function () {
        this._node._.calculateSize();
    }.bind(this));
    this._scroller.on('onEdge', function (data) {
        this._edgeSpringPosition = data.position;
        _handleEdge.call(this, this._scroller.onEdge());
        this._eventOutput.emit('onEdge');
    }.bind(this));
    this._scroller.on('offEdge', function () {
        this.sync.setOptions({ scale: this.options.syncScale });
        this._onEdge = this._scroller.onEdge();
        this._eventOutput.emit('offEdge');
    }.bind(this));
    this._particle.on('update', function (particle) {
        if (this._springState === SpringStates.NONE)
            _normalizeState.call(this);
        this._displacement = particle.position.x - this._totalShift;
    }.bind(this));
    this._particle.on('end', function () {
        if (!this.options.paginated || this.options.paginated && this._springState !== SpringStates.NONE)
            this._eventOutput.emit('settle');
    }.bind(this));
}
function _attachAgents() {
    if (this._springState)
        this._physicsEngine.attach([this.spring], this._particle);
    else
        this._physicsEngine.attach([
            this.drag,
            this.friction
        ], this._particle);
}
function _detachAgents() {
    this._springState = SpringStates.NONE;
    this._physicsEngine.detachAll();
}
function _nodeSizeForDirection(node) {
    var direction = this.options.direction;
    var nodeSize = node.getSize();
    return !nodeSize ? this._scroller.getSize()[direction] : nodeSize[direction];
}
function _handleEdge(edge) {
    this.sync.setOptions({ scale: this.options.edgeGrip });
    this._onEdge = edge;
    if (!this._touchCount && this._springState !== SpringStates.EDGE) {
        _setSpring.call(this, this._edgeSpringPosition, SpringStates.EDGE);
    }
    if (this._springState && Math.abs(this.getVelocity()) < 0.001) {
        _detachAgents.call(this);
        _attachAgents.call(this);
    }
}
function _handlePagination() {
    if (this._touchCount)
        return;
    if (this._springState === SpringStates.EDGE)
        return;
    var velocity = this.getVelocity();
    if (Math.abs(velocity) >= this.options.pageStopSpeed)
        return;
    var position = this.getPosition();
    var velocitySwitch = Math.abs(velocity) > this.options.pageSwitchSpeed;
    var nodeSize = _nodeSizeForDirection.call(this, this._node);
    var positionNext = position > 0.5 * nodeSize;
    var positionPrev = position < 0.5 * nodeSize;
    var velocityNext = velocity > 0;
    var velocityPrev = velocity < 0;
    this._needsPaginationCheck = false;
    if (positionNext && !velocitySwitch || velocitySwitch && velocityNext) {
        this.goToNextPage();
    } else if (velocitySwitch && velocityPrev) {
        this.goToPreviousPage();
    } else
        _setSpring.call(this, 0, SpringStates.PAGE);
}
function _setSpring(position, springState) {
    var springOptions;
    if (springState === SpringStates.EDGE) {
        this._edgeSpringPosition = position;
        springOptions = {
            anchor: [
                this._edgeSpringPosition,
                0,
                0
            ],
            period: this.options.edgePeriod,
            dampingRatio: this.options.edgeDamp
        };
    } else if (springState === SpringStates.PAGE) {
        this._pageSpringPosition = position;
        springOptions = {
            anchor: [
                this._pageSpringPosition,
                0,
                0
            ],
            period: this.options.pagePeriod,
            dampingRatio: this.options.pageDamp
        };
    }
    this.spring.setOptions(springOptions);
    if (springState && !this._springState) {
        _detachAgents.call(this);
        this._springState = springState;
        _attachAgents.call(this);
    }
    this._springState = springState;
}
function _normalizeState() {
    var offset = 0;
    var position = this.getPosition();
    position += (position < 0 ? -0.5 : 0.5) >> 0;
    var nodeSize = _nodeSizeForDirection.call(this, this._node);
    var nextNode = this._node.getNext();
    while (offset + position >= nodeSize && nextNode) {
        offset -= nodeSize;
        this._scroller.sequenceFrom(nextNode);
        this._node = nextNode;
        nextNode = this._node.getNext();
        nodeSize = _nodeSizeForDirection.call(this, this._node);
    }
    var previousNode = this._node.getPrevious();
    var previousNodeSize;
    while (offset + position <= 0 && previousNode) {
        previousNodeSize = _nodeSizeForDirection.call(this, previousNode);
        this._scroller.sequenceFrom(previousNode);
        this._node = previousNode;
        offset += previousNodeSize;
        previousNode = this._node.getPrevious();
    }
    if (offset)
        _shiftOrigin.call(this, offset);
    if (this._node) {
        if (this._node.index !== this._cachedIndex) {
            if (this.getPosition() < 0.5 * nodeSize) {
                this._cachedIndex = this._node.index;
                this._eventOutput.emit('pageChange', {
                    direction: -1,
                    index: this._cachedIndex
                });
            }
        } else {
            if (this.getPosition() > 0.5 * nodeSize) {
                this._cachedIndex = this._node.index + 1;
                this._eventOutput.emit('pageChange', {
                    direction: 1,
                    index: this._cachedIndex
                });
            }
        }
    }
}
function _shiftOrigin(amount) {
    this._edgeSpringPosition += amount;
    this._pageSpringPosition += amount;
    this.setPosition(this.getPosition() + amount);
    this._totalShift += amount;
    if (this._springState === SpringStates.EDGE) {
        this.spring.setOptions({
            anchor: [
                this._edgeSpringPosition,
                0,
                0
            ]
        });
    } else if (this._springState === SpringStates.PAGE) {
        this.spring.setOptions({
            anchor: [
                this._pageSpringPosition,
                0,
                0
            ]
        });
    }
}
Scrollview.prototype.getCurrentIndex = function getCurrentIndex() {
    return this._node.index;
};
Scrollview.prototype.goToPreviousPage = function goToPreviousPage() {
    if (!this._node || this._onEdge === EdgeStates.TOP)
        return null;
    if (this.getPosition() > 1 && this._springState === SpringStates.NONE) {
        _setSpring.call(this, 0, SpringStates.PAGE);
        return this._node;
    }
    var previousNode = this._node.getPrevious();
    if (previousNode) {
        var previousNodeSize = _nodeSizeForDirection.call(this, previousNode);
        this._scroller.sequenceFrom(previousNode);
        this._node = previousNode;
        _shiftOrigin.call(this, previousNodeSize);
        _setSpring.call(this, 0, SpringStates.PAGE);
    }
    return previousNode;
};
Scrollview.prototype.goToNextPage = function goToNextPage() {
    if (!this._node || this._onEdge === EdgeStates.BOTTOM)
        return null;
    var nextNode = this._node.getNext();
    if (nextNode) {
        var currentNodeSize = _nodeSizeForDirection.call(this, this._node);
        this._scroller.sequenceFrom(nextNode);
        this._node = nextNode;
        _shiftOrigin.call(this, -currentNodeSize);
        _setSpring.call(this, 0, SpringStates.PAGE);
    }
    return nextNode;
};
Scrollview.prototype.goToPage = function goToPage(index) {
    var currentIndex = this.getCurrentIndex();
    var i;
    if (currentIndex > index) {
        for (i = 0; i < currentIndex - index; i++)
            this.goToPreviousPage();
    }
    if (currentIndex < index) {
        for (i = 0; i < index - currentIndex; i++)
            this.goToNextPage();
    }
};
Scrollview.prototype.outputFrom = function outputFrom() {
    return this._scroller.outputFrom.apply(this._scroller, arguments);
};
Scrollview.prototype.getPosition = function getPosition() {
    return this._particle.getPosition1D();
};
Scrollview.prototype.getAbsolutePosition = function getAbsolutePosition() {
    return this._scroller.getCumulativeSize(this.getCurrentIndex())[this.options.direction] + this.getPosition();
};
Scrollview.prototype.getOffset = Scrollview.prototype.getPosition;
Scrollview.prototype.setPosition = function setPosition(x) {
    this._particle.setPosition1D(x);
};
Scrollview.prototype.setOffset = Scrollview.prototype.setPosition;
Scrollview.prototype.getVelocity = function getVelocity() {
    return this._touchCount ? this._touchVelocity : this._particle.getVelocity1D();
};
Scrollview.prototype.setVelocity = function setVelocity(v) {
    this._particle.setVelocity1D(v);
};
Scrollview.prototype.setOptions = function setOptions(options) {
    if (options.direction !== undefined) {
        if (options.direction === 'x')
            options.direction = Utility.Direction.X;
        else if (options.direction === 'y')
            options.direction = Utility.Direction.Y;
    }
    if (options.groupScroll !== this.options.groupScroll) {
        if (options.groupScroll)
            this.subscribe(this._scroller);
        else
            this.unsubscribe(this._scroller);
    }
    this._optionsManager.setOptions(options);
    this._scroller.setOptions(options);
    if (options.drag !== undefined)
        this.drag.setOptions({ strength: this.options.drag });
    if (options.friction !== undefined)
        this.friction.setOptions({ strength: this.options.friction });
    if (options.edgePeriod !== undefined || options.edgeDamp !== undefined) {
        this.spring.setOptions({
            period: this.options.edgePeriod,
            dampingRatio: this.options.edgeDamp
        });
    }
    if (options.rails || options.direction !== undefined || options.syncScale !== undefined || options.preventDefault) {
        this.sync.setOptions({
            rails: this.options.rails,
            direction: this.options.direction === Utility.Direction.X ? GenericSync.DIRECTION_X : GenericSync.DIRECTION_Y,
            scale: this.options.syncScale,
            preventDefault: this.options.preventDefault
        });
    }
};
Scrollview.prototype.sequenceFrom = function sequenceFrom(node) {
    if (node instanceof Array)
        node = new ViewSequence({
            array: node,
            trackSize: true
        });
    this._node = node;
    return this._scroller.sequenceFrom(node);
};
Scrollview.prototype.getSize = function getSize() {
    return this._scroller.getSize.apply(this._scroller, arguments);
};
Scrollview.prototype.render = function render() {
    if (this.options.paginated && this._needsPaginationCheck)
        _handlePagination.call(this);
    return this._scroller.render();
};
module.exports = Scrollview;
},{"famous/core/EventHandler":12,"famous/core/OptionsManager":15,"famous/core/ViewSequence":22,"famous/inputs/GenericSync":28,"famous/inputs/ScrollSync":33,"famous/inputs/TouchSync":34,"famous/physics/PhysicsEngine":46,"famous/physics/bodies/Particle":49,"famous/physics/forces/Drag":59,"famous/physics/forces/Spring":64,"famous/utilities/Utility":86,"famous/views/Scroller":97}],99:[function(require,module,exports){
var OptionsManager = require('famous/core/OptionsManager');
var Transform = require('famous/core/Transform');
var ViewSequence = require('famous/core/ViewSequence');
var Utility = require('famous/utilities/Utility');
function SequentialLayout(options) {
    this._items = null;
    this._size = null;
    this._outputFunction = SequentialLayout.DEFAULT_OUTPUT_FUNCTION;
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    this.optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
}
SequentialLayout.DEFAULT_OPTIONS = { direction: Utility.Direction.Y };
SequentialLayout.DEFAULT_OUTPUT_FUNCTION = function DEFAULT_OUTPUT_FUNCTION(input, offset, index) {
    var transform = this.options.direction === Utility.Direction.X ? Transform.translate(offset, 0) : Transform.translate(0, offset);
    return {
        transform: transform,
        target: input.render()
    };
};
SequentialLayout.prototype.getSize = function getSize() {
    if (!this._size)
        this.render();
    return this._size;
};
SequentialLayout.prototype.sequenceFrom = function sequenceFrom(items) {
    if (items instanceof Array)
        items = new ViewSequence(items);
    this._items = items;
    return this;
};
SequentialLayout.prototype.setOptions = function setOptions(options) {
    this.optionsManager.setOptions.apply(this.optionsManager, arguments);
    return this;
};
SequentialLayout.prototype.setOutputFunction = function setOutputFunction(outputFunction) {
    this._outputFunction = outputFunction;
    return this;
};
SequentialLayout.prototype.render = function render() {
    var length = 0;
    var secondaryDirection = this.options.direction ^ 1;
    var currentNode = this._items;
    var item = null;
    var itemSize = [];
    var output = {};
    var result = [];
    var i = 0;
    this._size = [
        0,
        0
    ];
    while (currentNode) {
        item = currentNode.get();
        if (!item)
            break;
        if (item.getSize)
            itemSize = item.getSize();
        output = this._outputFunction.call(this, item, length, i++);
        result.push(output);
        if (itemSize) {
            if (itemSize[this.options.direction])
                length += itemSize[this.options.direction];
            if (itemSize[secondaryDirection] > this._size[secondaryDirection])
                this._size[secondaryDirection] = itemSize[secondaryDirection];
        }
        currentNode = currentNode.getNext();
    }
    this._size[this.options.direction] = length;
    return result;
};
module.exports = SequentialLayout;
},{"famous/core/OptionsManager":15,"famous/core/Transform":20,"famous/core/ViewSequence":22,"famous/utilities/Utility":86}],100:[function(require,module,exports){
var Scene = require('famous/core/Scene');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var View = require('famous/core/View');
function NavigationBar(options) {
    View.apply(this, arguments);
    this.title = new Surface({
        classes: this.options.classes,
        content: this.options.content
    });
    this.back = new Surface({
        size: [
            this.options.size[1],
            this.options.size[1]
        ],
        classes: this.options.classes,
        content: this.options.backContent
    });
    this.back.on('click', function () {
        this._eventOutput.emit('back', {});
    }.bind(this));
    this.more = new Surface({
        size: [
            this.options.size[1],
            this.options.size[1]
        ],
        classes: this.options.classes,
        content: this.options.moreContent
    });
    this.more.on('click', function () {
        this._eventOutput.emit('more', {});
    }.bind(this));
    this.layout = new Scene({
        id: 'master',
        size: this.options.size,
        target: [
            {
                transform: Transform.inFront,
                origin: [
                    0,
                    0.5
                ],
                target: this.back
            },
            {
                origin: [
                    0.5,
                    0.5
                ],
                target: this.title
            },
            {
                transform: Transform.inFront,
                origin: [
                    1,
                    0.5
                ],
                target: this.more
            }
        ]
    });
    this._add(this.layout);
    this._optionsManager.on('change', function (event) {
        var key = event.id;
        var data = event.value;
        if (key === 'size') {
            this.layout.id.master.setSize(data);
            this.title.setSize(data);
            this.back.setSize([
                data[1],
                data[1]
            ]);
            this.more.setSize([
                data[1],
                data[1]
            ]);
        } else if (key === 'backClasses') {
            this.back.setOptions({ classes: this.options.classes.concat(this.options.backClasses) });
        } else if (key === 'backContent') {
            this.back.setContent(this.options.backContent);
        } else if (key === 'classes') {
            this.title.setOptions({ classes: this.options.classes });
            this.back.setOptions({ classes: this.options.classes.concat(this.options.backClasses) });
            this.more.setOptions({ classes: this.options.classes.concat(this.options.moreClasses) });
        } else if (key === 'content') {
            this.setContent(this.options.content);
        } else if (key === 'moreClasses') {
            this.more.setOptions({ classes: this.options.classes.concat(this.options.moreClasses) });
        } else if (key === 'moreContent') {
            this.more.setContent(this.options.content);
        }
    }.bind(this));
}
NavigationBar.prototype = Object.create(View.prototype);
NavigationBar.prototype.constructor = NavigationBar;
NavigationBar.DEFAULT_OPTIONS = {
    size: [
        undefined,
        50
    ],
    backClasses: ['back'],
    backContent: '&#x25c0;',
    classes: ['navigation'],
    content: '',
    moreClasses: ['more'],
    moreContent: '&#x271a;'
};
NavigationBar.prototype.setContent = function setContent(content) {
    return this.title.setContent(content);
};
module.exports = NavigationBar;
},{"famous/core/Scene":17,"famous/core/Surface":19,"famous/core/Transform":20,"famous/core/View":21}],101:[function(require,module,exports){
var Surface = require('famous/core/Surface');
var CanvasSurface = require('famous/surfaces/CanvasSurface');
var Transform = require('famous/core/Transform');
var EventHandler = require('famous/core/EventHandler');
var Utilities = require('famous/math/Utilities');
var OptionsManager = require('famous/core/OptionsManager');
var MouseSync = require('famous/inputs/MouseSync');
var TouchSync = require('famous/inputs/TouchSync');
var GenericSync = require('famous/inputs/GenericSync');
GenericSync.register({
    mouse: MouseSync,
    touch: TouchSync
});
function Slider(options) {
    this.options = Object.create(Slider.DEFAULT_OPTIONS);
    this.optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
    this.indicator = new CanvasSurface({
        size: this.options.indicatorSize,
        classes: ['slider-back']
    });
    this.label = new Surface({
        size: this.options.labelSize,
        content: this.options.label,
        properties: { pointerEvents: 'none' },
        classes: ['slider-label']
    });
    this.eventOutput = new EventHandler();
    this.eventInput = new EventHandler();
    EventHandler.setInputHandler(this, this.eventInput);
    EventHandler.setOutputHandler(this, this.eventOutput);
    var scale = (this.options.range[1] - this.options.range[0]) / this.options.indicatorSize[0];
    this.sync = new GenericSync([
        'mouse',
        'touch'
    ], {
        scale: scale,
        direction: GenericSync.DIRECTION_X
    });
    this.indicator.pipe(this.sync);
    this.sync.pipe(this);
    this.eventInput.on('update', function (data) {
        this.set(data.position);
    }.bind(this));
    this._drawPos = 0;
    _updateLabel.call(this);
}
Slider.DEFAULT_OPTIONS = {
    size: [
        200,
        60
    ],
    indicatorSize: [
        200,
        30
    ],
    labelSize: [
        200,
        30
    ],
    range: [
        0,
        1
    ],
    precision: 2,
    value: 0,
    label: '',
    fillColor: 'rgba(170, 170, 170, 1)'
};
function _updateLabel() {
    this.label.setContent(this.options.label + '<span style="float: right">' + this.get().toFixed(this.options.precision) + '</span>');
}
Slider.prototype.setOptions = function setOptions(options) {
    return this.optionsManager.setOptions(options);
};
Slider.prototype.get = function get() {
    return this.options.value;
};
Slider.prototype.set = function set(value) {
    if (value === this.options.value)
        return;
    this.options.value = Utilities.clamp(value, this.options.range);
    _updateLabel.call(this);
    this.eventOutput.emit('change', { value: value });
};
Slider.prototype.getSize = function getSize() {
    return this.options.size;
};
Slider.prototype.render = function render() {
    var range = this.options.range;
    var fillSize = Math.floor((this.get() - range[0]) / (range[1] - range[0]) * this.options.indicatorSize[0]);
    if (fillSize < this._drawPos) {
        this.indicator.getContext('2d').clearRect(fillSize, 0, this._drawPos - fillSize + 1, this.options.indicatorSize[1]);
    } else if (fillSize > this._drawPos) {
        var ctx = this.indicator.getContext('2d');
        ctx.fillStyle = this.options.fillColor;
        ctx.fillRect(this._drawPos - 1, 0, fillSize - this._drawPos + 1, this.options.indicatorSize[1]);
    }
    this._drawPos = fillSize;
    return {
        size: this.options.size,
        target: [
            {
                origin: [
                    0,
                    0
                ],
                target: this.indicator.render()
            },
            {
                transform: Transform.translate(0, 0, 1),
                origin: [
                    0,
                    0
                ],
                target: this.label.render()
            }
        ]
    };
};
module.exports = Slider;
},{"famous/core/EventHandler":12,"famous/core/OptionsManager":15,"famous/core/Surface":19,"famous/core/Transform":20,"famous/inputs/GenericSync":28,"famous/inputs/MouseSync":29,"famous/inputs/TouchSync":34,"famous/math/Utilities":40,"famous/surfaces/CanvasSurface":67}],102:[function(require,module,exports){
var Utility = require('famous/utilities/Utility');
var View = require('famous/core/View');
var GridLayout = require('famous/views/GridLayout');
var ToggleButton = require('./ToggleButton');
function TabBar(options) {
    View.apply(this, arguments);
    this.layout = new GridLayout();
    this.buttons = [];
    this._buttonIds = {};
    this._buttonCallbacks = {};
    this.layout.sequenceFrom(this.buttons);
    this._add(this.layout);
    this._optionsManager.on('change', _updateOptions.bind(this));
}
TabBar.prototype = Object.create(View.prototype);
TabBar.prototype.constructor = TabBar;
TabBar.DEFAULT_OPTIONS = {
    sections: [],
    widget: ToggleButton,
    size: [
        undefined,
        50
    ],
    direction: Utility.Direction.X,
    buttons: { toggleMode: ToggleButton.ON }
};
function _updateOptions(data) {
    var id = data.id;
    var value = data.value;
    if (id === 'direction') {
        this.layout.setOptions({ dimensions: _resolveGridDimensions.call(this.buttons.length, this.options.direction) });
    } else if (id === 'buttons') {
        for (var i in this.buttons) {
            this.buttons[i].setOptions(value);
        }
    } else if (id === 'sections') {
        for (var sectionId in this.options.sections) {
            this.defineSection(sectionId, this.options.sections[sectionId]);
        }
    }
}
function _resolveGridDimensions(count, direction) {
    if (direction === Utility.Direction.X)
        return [
            count,
            1
        ];
    else
        return [
            1,
            count
        ];
}
TabBar.prototype.defineSection = function defineSection(id, content) {
    var button;
    var i = this._buttonIds[id];
    if (i === undefined) {
        i = this.buttons.length;
        this._buttonIds[id] = i;
        var widget = this.options.widget;
        button = new widget();
        this.buttons[i] = button;
        this.layout.setOptions({ dimensions: _resolveGridDimensions(this.buttons.length, this.options.direction) });
    } else {
        button = this.buttons[i];
        button.unbind('select', this._buttonCallbacks[id]);
    }
    if (this.options.buttons)
        button.setOptions(this.options.buttons);
    button.setOptions(content);
    this._buttonCallbacks[id] = this.select.bind(this, id);
    button.on('select', this._buttonCallbacks[id]);
};
TabBar.prototype.select = function select(id) {
    var btn = this._buttonIds[id];
    if (this.buttons[btn] && this.buttons[btn].isSelected()) {
        this._eventOutput.emit('select', { id: id });
    } else if (this.buttons[btn]) {
        this.buttons[btn].select();
    }
    for (var i = 0; i < this.buttons.length; i++) {
        if (i !== btn)
            this.buttons[i].deselect();
    }
};
module.exports = TabBar;
},{"./ToggleButton":103,"famous/core/View":21,"famous/utilities/Utility":86,"famous/views/GridLayout":92}],103:[function(require,module,exports){
var Surface = require('famous/core/Surface');
var EventHandler = require('famous/core/EventHandler');
var RenderController = require('famous/views/RenderController');
function ToggleButton(options) {
    this.options = {
        content: '',
        offClasses: ['off'],
        onClasses: ['on'],
        size: undefined,
        outTransition: {
            curve: 'easeInOut',
            duration: 300
        },
        inTransition: {
            curve: 'easeInOut',
            duration: 300
        },
        toggleMode: ToggleButton.TOGGLE,
        crossfade: true
    };
    this._eventOutput = new EventHandler();
    EventHandler.setOutputHandler(this, this._eventOutput);
    this.offSurface = new Surface();
    this.offSurface.on('click', function () {
        if (this.options.toggleMode !== ToggleButton.OFF)
            this.select();
    }.bind(this));
    this.offSurface.pipe(this._eventOutput);
    this.onSurface = new Surface();
    this.onSurface.on('click', function () {
        if (this.options.toggleMode !== ToggleButton.ON)
            this.deselect();
    }.bind(this));
    this.onSurface.pipe(this._eventOutput);
    this.arbiter = new RenderController({ overlap: this.options.crossfade });
    this.deselect();
    if (options)
        this.setOptions(options);
}
ToggleButton.OFF = 0;
ToggleButton.ON = 1;
ToggleButton.TOGGLE = 2;
ToggleButton.prototype.select = function select() {
    this.selected = true;
    this.arbiter.show(this.onSurface, this.options.inTransition);
    this._eventOutput.emit('select');
};
ToggleButton.prototype.deselect = function deselect() {
    this.selected = false;
    this.arbiter.show(this.offSurface, this.options.outTransition);
    this._eventOutput.emit('deselect');
};
ToggleButton.prototype.isSelected = function isSelected() {
    return this.selected;
};
ToggleButton.prototype.setOptions = function setOptions(options) {
    if (options.content !== undefined) {
        this.options.content = options.content;
        this.offSurface.setContent(this.options.content);
        this.onSurface.setContent(this.options.content);
    }
    if (options.offClasses) {
        this.options.offClasses = options.offClasses;
        this.offSurface.setClasses(this.options.offClasses);
    }
    if (options.onClasses) {
        this.options.onClasses = options.onClasses;
        this.onSurface.setClasses(this.options.onClasses);
    }
    if (options.size !== undefined) {
        this.options.size = options.size;
        this.onSurface.setSize(this.options.size);
        this.offSurface.setSize(this.options.size);
    }
    if (options.toggleMode !== undefined)
        this.options.toggleMode = options.toggleMode;
    if (options.outTransition !== undefined)
        this.options.outTransition = options.outTransition;
    if (options.inTransition !== undefined)
        this.options.inTransition = options.inTransition;
    if (options.crossfade !== undefined) {
        this.options.crossfade = options.crossfade;
        this.arbiter.setOptions({ overlap: this.options.crossfade });
    }
};
ToggleButton.prototype.getSize = function getSize() {
    return this.options.size;
};
ToggleButton.prototype.render = function render() {
    return this.arbiter.render();
};
module.exports = ToggleButton;
},{"famous/core/EventHandler":12,"famous/core/Surface":19,"famous/views/RenderController":95}],104:[function(require,module,exports){
// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

famous = {
  core: {
    Context: require('famous/core/Context'),
    ElementAllocator: require('famous/core/ElementAllocator'),
    Engine: require('famous/core/Engine'),
    Entity: require('famous/core/Entity'),
    EventEmitter: require('famous/core/EventEmitter'),
    EventHandler: require('famous/core/EventHandler'),
    Group: require('famous/core/Group'),
    Modifier: require('famous/core/Modifier'),
    OptionsManager: require('famous/core/OptionsManager'),
    RenderNode: require('famous/core/RenderNode'),
    Scene: require('famous/core/Scene'),
    SpecParser: require('famous/core/SpecParser'),
    Surface: require('famous/core/Surface'),
    Transform: require('famous/core/Transform'),
    View: require('famous/core/View'),
    ViewSequence: require('famous/core/ViewSequence')
  },
  events: {
    EventArbiter: require('famous/events/EventArbiter'),
    EventFilter: require('famous/events/EventFilter'),
    EventMapper: require('famous/events/EventMapper')
  },
  inputs: {
    Accumulator: require('famous/inputs/Accumulator'),
    FastClick: require('famous/inputs/FastClick'),
    GenericSync: require('famous/inputs/GenericSync'),
    MouseSync: require('famous/inputs/MouseSync'),
    PinchSync: require('famous/inputs/PinchSync'),
    RotateSync: require('famous/inputs/RotateSync'),
    ScaleSync: require('famous/inputs/ScaleSync'),
    ScrollSync: require('famous/inputs/ScrollSync'),
    TouchSync: require('famous/inputs/TouchSync'),
    TouchTracker: require('famous/inputs/TouchTracker'),
    TwoFingerSync: require('famous/inputs/TwoFingerSync')
  },
  math: {
    Matrix: require('famous/math/Matrix'),
    Quaternion: require('famous/math/Quaternion'),
    Random: require('famous/math/Random'),
    Utilities: require('famous/math/Utilities'),
    Vector: require('famous/math/Vector')
  },
  modifiers: {
    Draggable: require('famous/modifiers/Draggable'),
    Fader: require('famous/modifiers/Fader'),
    ModifierChain: require('famous/modifiers/ModifierChain'),
    StateModifier: require('famous/modifiers/StateModifier')
  },
  physics: {
    bodies: {
      Body: require('famous/physics/bodies/Body'),
      Circle: require('famous/physics/bodies/Circle'),
      Particle: require('famous/physics/bodies/Particle'),
      Rectangle: require('famous/physics/bodies/Rectangle')
    },
    constraints: {
      Collision: require('famous/physics/constraints/Collision'),
      Constraint: require('famous/physics/constraints/Constraint'),
      Curve: require('famous/physics/constraints/Curve'),
      Distance: require('famous/physics/constraints/Distance'),
      Snap: require('famous/physics/constraints/Snap'),
      Surface: require('famous/physics/constraints/Surface'),
      Wall: require('famous/physics/constraints/Wall'),
      Walls: require('famous/physics/constraints/Walls')
    },
    forces: {
      Drag: require('famous/physics/forces/Drag'),
      Force: require('famous/physics/forces/Force'),
      Repulsion: require('famous/physics/forces/Repulsion'),
      RotationalDrag: require('famous/physics/forces/RotationalDrag'),
      RotationalSpring: require('famous/physics/forces/RotationalSpring'),
      Spring: require('famous/physics/forces/Spring'),
      VectorField: require('famous/physics/forces/VectorField')
    },
    integrators: {
      SymplecticEuler: require('famous/physics/integrators/SymplecticEuler')
    },
    PhysicsEngine: require('famous/physics/PhysicsEngine')
  },
  surfaces: {
    CanvasSurface: require('famous/surfaces/CanvasSurface'),
    ContainerSurface: require('famous/surfaces/ContainerSurface'),
    FormContainerSurface: require('famous/surfaces/FormContainerSurface'),
    ImageSurface: require('famous/surfaces/ImageSurface'),
    InputSurface: require('famous/surfaces/InputSurface'),
    SubmitInputSurface: require('famous/surfaces/SubmitInputSurface'),
    TextareaSurface: require('famous/surfaces/TextareaSurface'),
    VideoSurface: require('famous/surfaces/VideoSurface')
  },
  transitions: {
    CachedMap: require('famous/transitions/CachedMap'),
    Easing: require('famous/transitions/Easing'),
    MultipleTransition: require('famous/transitions/MultipleTransition'),
    SnapTransition: require('famous/transitions/SnapTransition'),
    SpringTransition: require('famous/transitions/SpringTransition'),
    Transitionable: require('famous/transitions/Transitionable'),
    TransitionableTransform: require('famous/transitions/TransitionableTransform'),
    TweenTransition: require('famous/transitions/TweenTransition'),
    WallTransition: require('famous/transitions/WallTransition')
  },
  utilities: {
    KeyCodes: require('famous/utilities/KeyCodes'),
    Timer: require('famous/utilities/Timer'),
    Utility: require('famous/utilities/Utility')
  },
  views: {
    ContextualView: require('famous/views/ContextualView'),
    Deck: require('famous/views/Deck'),
    EdgeSwapper: require('famous/views/EdgeSwapper'),
    FlexibleLayout: require('famous/views/FlexibleLayout'),
    Flipper: require('famous/views/Flipper'),
    GridLayout: require('famous/views/GridLayout'),
    HeaderFooterLayout: require('famous/views/HeaderFooterLayout'),
    Lightbox: require('famous/views/Lightbox'),
    RenderController: require('famous/views/RenderController'),
    ScrollContainer: require('famous/views/ScrollContainer'),
    Scroller: require('famous/views/Scroller'),
    Scrollview: require('famous/views/Scrollview'),
    SequentialLayout: require('famous/views/SequentialLayout')
  },
  widgets: {
    NavigationBar: require('famous/widgets/NavigationBar'),
    Slider: require('famous/widgets/Slider'),
    TabBar: require('famous/widgets/TabBar'),
    ToggleButton: require('famous/widgets/ToggleButton')
  }
};

},{"./styles":107,"famous-polyfills":4,"famous/core/Context":6,"famous/core/ElementAllocator":7,"famous/core/Engine":9,"famous/core/Entity":10,"famous/core/EventEmitter":11,"famous/core/EventHandler":12,"famous/core/Group":13,"famous/core/Modifier":14,"famous/core/OptionsManager":15,"famous/core/RenderNode":16,"famous/core/Scene":17,"famous/core/SpecParser":18,"famous/core/Surface":19,"famous/core/Transform":20,"famous/core/View":21,"famous/core/ViewSequence":22,"famous/events/EventArbiter":23,"famous/events/EventFilter":24,"famous/events/EventMapper":25,"famous/inputs/Accumulator":26,"famous/inputs/FastClick":27,"famous/inputs/GenericSync":28,"famous/inputs/MouseSync":29,"famous/inputs/PinchSync":30,"famous/inputs/RotateSync":31,"famous/inputs/ScaleSync":32,"famous/inputs/ScrollSync":33,"famous/inputs/TouchSync":34,"famous/inputs/TouchTracker":35,"famous/inputs/TwoFingerSync":36,"famous/math/Matrix":37,"famous/math/Quaternion":38,"famous/math/Random":39,"famous/math/Utilities":40,"famous/math/Vector":41,"famous/modifiers/Draggable":42,"famous/modifiers/Fader":43,"famous/modifiers/ModifierChain":44,"famous/modifiers/StateModifier":45,"famous/physics/PhysicsEngine":46,"famous/physics/bodies/Body":47,"famous/physics/bodies/Circle":48,"famous/physics/bodies/Particle":49,"famous/physics/bodies/Rectangle":50,"famous/physics/constraints/Collision":51,"famous/physics/constraints/Constraint":52,"famous/physics/constraints/Curve":53,"famous/physics/constraints/Distance":54,"famous/physics/constraints/Snap":55,"famous/physics/constraints/Surface":56,"famous/physics/constraints/Wall":57,"famous/physics/constraints/Walls":58,"famous/physics/forces/Drag":59,"famous/physics/forces/Force":60,"famous/physics/forces/Repulsion":61,"famous/physics/forces/RotationalDrag":62,"famous/physics/forces/RotationalSpring":63,"famous/physics/forces/Spring":64,"famous/physics/forces/VectorField":65,"famous/physics/integrators/SymplecticEuler":66,"famous/surfaces/CanvasSurface":67,"famous/surfaces/ContainerSurface":68,"famous/surfaces/FormContainerSurface":69,"famous/surfaces/ImageSurface":70,"famous/surfaces/InputSurface":71,"famous/surfaces/SubmitInputSurface":72,"famous/surfaces/TextareaSurface":73,"famous/surfaces/VideoSurface":74,"famous/transitions/CachedMap":75,"famous/transitions/Easing":76,"famous/transitions/MultipleTransition":77,"famous/transitions/SnapTransition":78,"famous/transitions/SpringTransition":79,"famous/transitions/Transitionable":80,"famous/transitions/TransitionableTransform":81,"famous/transitions/TweenTransition":82,"famous/transitions/WallTransition":83,"famous/utilities/KeyCodes":84,"famous/utilities/Timer":85,"famous/utilities/Utility":86,"famous/views/ContextualView":87,"famous/views/Deck":88,"famous/views/EdgeSwapper":89,"famous/views/FlexibleLayout":90,"famous/views/Flipper":91,"famous/views/GridLayout":92,"famous/views/HeaderFooterLayout":93,"famous/views/Lightbox":94,"famous/views/RenderController":95,"famous/views/ScrollContainer":96,"famous/views/Scroller":97,"famous/views/Scrollview":98,"famous/views/SequentialLayout":99,"famous/widgets/NavigationBar":100,"famous/widgets/Slider":101,"famous/widgets/TabBar":102,"famous/widgets/ToggleButton":103}],105:[function(require,module,exports){
var css = "html {\n  background: #fff;\n}\n\n.backfaceVisibility {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n}\n"; (require("/home/jens/mjn-famous/node_modules/cssify"))(css); module.exports = css;
},{"/home/jens/mjn-famous/node_modules/cssify":1}],106:[function(require,module,exports){
var css = "/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n\nhtml {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\nbody {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-font-smoothing: antialiased;\n    -webkit-tap-highlight-color: transparent;\n    -webkit-perspective: 0;\n    perspective: none;\n    overflow: hidden;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: flat;\n    transform-style: preserve-3d; /* performance */\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n"; (require("/home/jens/mjn-famous/node_modules/cssify"))(css); module.exports = css;
},{"/home/jens/mjn-famous/node_modules/cssify":1}],107:[function(require,module,exports){
// load css
require('./famous.css');
require('./app.css');

},{"./app.css":105,"./famous.css":106}]},{},[104])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9jc3NpZnkvYnJvd3Nlci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9jbGFzc0xpc3QuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy1wb2x5ZmlsbHMvZnVuY3Rpb25Qcm90b3R5cGVCaW5kLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMtcG9seWZpbGxzL2luZGV4LmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMtcG9seWZpbGxzL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvQ29udGV4dC5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRWxlbWVudEFsbG9jYXRvci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRWxlbWVudE91dHB1dC5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRW5naW5lLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9FbnRpdHkuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL0V2ZW50RW1pdHRlci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9Hcm91cC5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvTW9kaWZpZXIuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9SZW5kZXJOb2RlLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9TY2VuZS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvU3BlY1BhcnNlci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvU3VyZmFjZS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvVHJhbnNmb3JtLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9WaWV3LmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9WaWV3U2VxdWVuY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9ldmVudHMvRXZlbnRBcmJpdGVyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvZXZlbnRzL0V2ZW50RmlsdGVyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvZXZlbnRzL0V2ZW50TWFwcGVyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvaW5wdXRzL0FjY3VtdWxhdG9yLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvaW5wdXRzL0Zhc3RDbGljay5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2lucHV0cy9HZW5lcmljU3luYy5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2lucHV0cy9Nb3VzZVN5bmMuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9pbnB1dHMvUGluY2hTeW5jLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvaW5wdXRzL1JvdGF0ZVN5bmMuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9pbnB1dHMvU2NhbGVTeW5jLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvaW5wdXRzL1Njcm9sbFN5bmMuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9pbnB1dHMvVG91Y2hTeW5jLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvaW5wdXRzL1RvdWNoVHJhY2tlci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2lucHV0cy9Ud29GaW5nZXJTeW5jLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvbWF0aC9NYXRyaXguanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9tYXRoL1F1YXRlcm5pb24uanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9tYXRoL1JhbmRvbS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL21hdGgvVXRpbGl0aWVzLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvbWF0aC9WZWN0b3IuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9tb2RpZmllcnMvRHJhZ2dhYmxlLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvbW9kaWZpZXJzL0ZhZGVyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvbW9kaWZpZXJzL01vZGlmaWVyQ2hhaW4uanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9tb2RpZmllcnMvU3RhdGVNb2RpZmllci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvUGh5c2ljc0VuZ2luZS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvYm9kaWVzL0JvZHkuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2JvZGllcy9DaXJjbGUuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2JvZGllcy9QYXJ0aWNsZS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvYm9kaWVzL1JlY3RhbmdsZS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvQ29sbGlzaW9uLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9Db25zdHJhaW50LmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9DdXJ2ZS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvRGlzdGFuY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1NuYXAuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1N1cmZhY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1dhbGwuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1dhbGxzLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvRHJhZy5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvZm9yY2VzL0ZvcmNlLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvUmVwdWxzaW9uLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvUm90YXRpb25hbERyYWcuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9Sb3RhdGlvbmFsU3ByaW5nLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvU3ByaW5nLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvVmVjdG9yRmllbGQuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2ludGVncmF0b3JzL1N5bXBsZWN0aWNFdWxlci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3N1cmZhY2VzL0NhbnZhc1N1cmZhY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9Db250YWluZXJTdXJmYWNlLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvc3VyZmFjZXMvRm9ybUNvbnRhaW5lclN1cmZhY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9JbWFnZVN1cmZhY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9JbnB1dFN1cmZhY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9TdWJtaXRJbnB1dFN1cmZhY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9UZXh0YXJlYVN1cmZhY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9WaWRlb1N1cmZhY2UuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy90cmFuc2l0aW9ucy9DYWNoZWRNYXAuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy90cmFuc2l0aW9ucy9FYXNpbmcuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy90cmFuc2l0aW9ucy9NdWx0aXBsZVRyYW5zaXRpb24uanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy90cmFuc2l0aW9ucy9TbmFwVHJhbnNpdGlvbi5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3RyYW5zaXRpb25zL1NwcmluZ1RyYW5zaXRpb24uanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlVHJhbnNmb3JtLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdHJhbnNpdGlvbnMvVHdlZW5UcmFuc2l0aW9uLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdHJhbnNpdGlvbnMvV2FsbFRyYW5zaXRpb24uanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy91dGlsaXRpZXMvS2V5Q29kZXMuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy91dGlsaXRpZXMvVGltZXIuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eS5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3ZpZXdzL0NvbnRleHR1YWxWaWV3LmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvRGVjay5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3ZpZXdzL0VkZ2VTd2FwcGVyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvRmxleGlibGVMYXlvdXQuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy92aWV3cy9GbGlwcGVyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvR3JpZExheW91dC5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3ZpZXdzL0hlYWRlckZvb3RlckxheW91dC5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3ZpZXdzL0xpZ2h0Ym94LmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvUmVuZGVyQ29udHJvbGxlci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3ZpZXdzL1Njcm9sbENvbnRhaW5lci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3ZpZXdzL1Njcm9sbGVyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvU2Nyb2xsdmlldy5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3ZpZXdzL1NlcXVlbnRpYWxMYXlvdXQuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy93aWRnZXRzL05hdmlnYXRpb25CYXIuanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy93aWRnZXRzL1NsaWRlci5qcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3dpZGdldHMvVGFiQmFyLmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvd2lkZ2V0cy9Ub2dnbGVCdXR0b24uanMiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvc3JjL2luZGV4LmpzIiwiL2hvbWUvamVucy9tam4tZmFtb3VzL3NyYy9zdHlsZXMvYXBwLmNzcyIsIi9ob21lL2plbnMvbWpuLWZhbW91cy9zcmMvc3R5bGVzL2ZhbW91cy5jc3MiLCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvc3JjL3N0eWxlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeHJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9HQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzLCBjdXN0b21Eb2N1bWVudCkge1xuICB2YXIgZG9jID0gY3VzdG9tRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG4gIGlmIChkb2MuY3JlYXRlU3R5bGVTaGVldCkge1xuICAgIGRvYy5jcmVhdGVTdHlsZVNoZWV0KCkuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB2YXIgaGVhZCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLFxuICAgICAgICBzdHlsZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gICAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gIFxuICAgIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgICB9XG4gICAgXG4gICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7IFxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5ieVVybCA9IGZ1bmN0aW9uKHVybCkge1xuICBpZiAoZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCkge1xuICAgIGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQodXJsKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gIFxuICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluayk7IFxuICB9XG59O1xuIiwiXG4vKlxuICogY2xhc3NMaXN0LmpzOiBDcm9zcy1icm93c2VyIGZ1bGwgZWxlbWVudC5jbGFzc0xpc3QgaW1wbGVtZW50YXRpb24uXG4gKiAyMDExLTA2LTE1XG4gKlxuICogQnkgRWxpIEdyZXksIGh0dHA6Ly9lbGlncmV5LmNvbVxuICogUHVibGljIERvbWFpbi5cbiAqIE5PIFdBUlJBTlRZIEVYUFJFU1NFRCBPUiBJTVBMSUVELiBVU0UgQVQgWU9VUiBPV04gUklTSy5cbiAqL1xuXG4vKmdsb2JhbCBzZWxmLCBkb2N1bWVudCwgRE9NRXhjZXB0aW9uICovXG5cbi8qISBAc291cmNlIGh0dHA6Ly9wdXJsLmVsaWdyZXkuY29tL2dpdGh1Yi9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvY2xhc3NMaXN0LmpzKi9cblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhKFwiY2xhc3NMaXN0XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikpKSB7XG5cbihmdW5jdGlvbiAodmlldykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyXG4gICAgICBjbGFzc0xpc3RQcm9wID0gXCJjbGFzc0xpc3RcIlxuICAgICwgcHJvdG9Qcm9wID0gXCJwcm90b3R5cGVcIlxuICAgICwgZWxlbUN0clByb3RvID0gKHZpZXcuSFRNTEVsZW1lbnQgfHwgdmlldy5FbGVtZW50KVtwcm90b1Byb3BdXG4gICAgLCBvYmpDdHIgPSBPYmplY3RcbiAgICAsIHN0clRyaW0gPSBTdHJpbmdbcHJvdG9Qcm9wXS50cmltIHx8IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgXCJcIik7XG4gICAgfVxuICAgICwgYXJySW5kZXhPZiA9IEFycmF5W3Byb3RvUHJvcF0uaW5kZXhPZiB8fCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgICAgaSA9IDBcbiAgICAgICAgICAgICwgbGVuID0gdGhpcy5sZW5ndGhcbiAgICAgICAgO1xuICAgICAgICBmb3IgKDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIC8vIFZlbmRvcnM6IHBsZWFzZSBhbGxvdyBjb250ZW50IGNvZGUgdG8gaW5zdGFudGlhdGUgRE9NRXhjZXB0aW9uc1xuICAgICwgRE9NRXggPSBmdW5jdGlvbiAodHlwZSwgbWVzc2FnZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSB0eXBlO1xuICAgICAgICB0aGlzLmNvZGUgPSBET01FeGNlcHRpb25bdHlwZV07XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICAgICwgY2hlY2tUb2tlbkFuZEdldEluZGV4ID0gZnVuY3Rpb24gKGNsYXNzTGlzdCwgdG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuID09PSBcIlwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRE9NRXgoXG4gICAgICAgICAgICAgICAgICBcIlNZTlRBWF9FUlJcIlxuICAgICAgICAgICAgICAgICwgXCJBbiBpbnZhbGlkIG9yIGlsbGVnYWwgc3RyaW5nIHdhcyBzcGVjaWZpZWRcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL1xccy8udGVzdCh0b2tlbikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgICAgICAgIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCJcbiAgICAgICAgICAgICAgICAsIFwiU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFyckluZGV4T2YuY2FsbChjbGFzc0xpc3QsIHRva2VuKTtcbiAgICB9XG4gICAgLCBDbGFzc0xpc3QgPSBmdW5jdGlvbiAoZWxlbSkge1xuICAgICAgICB2YXJcbiAgICAgICAgICAgICAgdHJpbW1lZENsYXNzZXMgPSBzdHJUcmltLmNhbGwoZWxlbS5jbGFzc05hbWUpXG4gICAgICAgICAgICAsIGNsYXNzZXMgPSB0cmltbWVkQ2xhc3NlcyA/IHRyaW1tZWRDbGFzc2VzLnNwbGl0KC9cXHMrLykgOiBbXVxuICAgICAgICAgICAgLCBpID0gMFxuICAgICAgICAgICAgLCBsZW4gPSBjbGFzc2VzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChjbGFzc2VzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbGVtLmNsYXNzTmFtZSA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLCBjbGFzc0xpc3RQcm90byA9IENsYXNzTGlzdFtwcm90b1Byb3BdID0gW11cbiAgICAsIGNsYXNzTGlzdEdldHRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDbGFzc0xpc3QodGhpcyk7XG4gICAgfVxuO1xuLy8gTW9zdCBET01FeGNlcHRpb24gaW1wbGVtZW50YXRpb25zIGRvbid0IGFsbG93IGNhbGxpbmcgRE9NRXhjZXB0aW9uJ3MgdG9TdHJpbmcoKVxuLy8gb24gbm9uLURPTUV4Y2VwdGlvbnMuIEVycm9yJ3MgdG9TdHJpbmcoKSBpcyBzdWZmaWNpZW50IGhlcmUuXG5ET01FeFtwcm90b1Byb3BdID0gRXJyb3JbcHJvdG9Qcm9wXTtcbmNsYXNzTGlzdFByb3RvLml0ZW0gPSBmdW5jdGlvbiAoaSkge1xuICAgIHJldHVybiB0aGlzW2ldIHx8IG51bGw7XG59O1xuY2xhc3NMaXN0UHJvdG8uY29udGFpbnMgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIHJldHVybiBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pICE9PSAtMTtcbn07XG5jbGFzc0xpc3RQcm90by5hZGQgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuICAgICAgICB0aGlzLnB1c2godG9rZW4pO1xuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcbiAgICB9XG59O1xuY2xhc3NMaXN0UHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcbiAgICB2YXIgaW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgdGhpcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcbiAgICB9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcbiAgICBpZiAoY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5hZGQodG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKHRva2VuKTtcbiAgICB9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuam9pbihcIiBcIik7XG59O1xuXG5pZiAob2JqQ3RyLmRlZmluZVByb3BlcnR5KSB7XG4gICAgdmFyIGNsYXNzTGlzdFByb3BEZXNjID0ge1xuICAgICAgICAgIGdldDogY2xhc3NMaXN0R2V0dGVyXG4gICAgICAgICwgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgICAsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgICAgb2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuICAgIH0gY2F0Y2ggKGV4KSB7IC8vIElFIDggZG9lc24ndCBzdXBwb3J0IGVudW1lcmFibGU6dHJ1ZVxuICAgICAgICBpZiAoZXgubnVtYmVyID09PSAtMHg3RkY1RUM1NCkge1xuICAgICAgICAgICAgY2xhc3NMaXN0UHJvcERlc2MuZW51bWVyYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgb2JqQ3RyLmRlZmluZVByb3BlcnR5KGVsZW1DdHJQcm90bywgY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0UHJvcERlc2MpO1xuICAgICAgICB9XG4gICAgfVxufSBlbHNlIGlmIChvYmpDdHJbcHJvdG9Qcm9wXS5fX2RlZmluZUdldHRlcl9fKSB7XG4gICAgZWxlbUN0clByb3RvLl9fZGVmaW5lR2V0dGVyX18oY2xhc3NMaXN0UHJvcCwgY2xhc3NMaXN0R2V0dGVyKTtcbn1cblxufShzZWxmKSk7XG5cbn1cbiIsImlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcbiAgICBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChvVGhpcykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgLy8gY2xvc2VzdCB0aGluZyBwb3NzaWJsZSB0byB0aGUgRUNNQVNjcmlwdCA1IGludGVybmFsIElzQ2FsbGFibGUgZnVuY3Rpb25cbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBhQXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgIGZUb0JpbmQgPSB0aGlzLFxuICAgICAgICBmTk9QID0gZnVuY3Rpb24gKCkge30sXG4gICAgICAgIGZCb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmVG9CaW5kLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBmTk9QICYmIG9UaGlzXG4gICAgICAgICAgICAgICAgPyB0aGlzXG4gICAgICAgICAgICAgICAgOiBvVGhpcyxcbiAgICAgICAgICAgICAgICBhQXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZOT1AucHJvdG90eXBlID0gdGhpcy5wcm90b3R5cGU7XG4gICAgICAgIGZCb3VuZC5wcm90b3R5cGUgPSBuZXcgZk5PUCgpO1xuXG4gICAgICAgIHJldHVybiBmQm91bmQ7XG4gICAgfTtcbn1cbiIsInJlcXVpcmUoJy4vY2xhc3NMaXN0LmpzJyk7XG5yZXF1aXJlKCcuL2Z1bmN0aW9uUHJvdG90eXBlQmluZC5qcycpO1xucmVxdWlyZSgnLi9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanMnKTsiLCIvLyBhZGRzIHJlcXVlc3RBbmltYXRpb25GcmFtZSBmdW5jdGlvbmFsaXR5XG4vLyBTb3VyY2U6IGh0dHA6Ly9zdHJkNi5jb20vMjAxMS8wNS9iZXR0ZXItd2luZG93LXJlcXVlc3RhbmltYXRpb25mcmFtZS1zaGltL1xuXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID1cbiAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgIHx8XG4gIHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICAgfHxcbiAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuICBmdW5jdGlvbihjYWxsYmFjaywgZWxlbWVudCkge1xuICAgIHJldHVybiB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGNhbGxiYWNrKCtuZXcgRGF0ZSgpKTtcbiAgfSwgMTAwMCAvIDYwKTtcbn0pO1xuIiwidmFyIFJlbmRlck5vZGUgPSByZXF1aXJlKCcuL1JlbmRlck5vZGUnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIEVsZW1lbnRBbGxvY2F0b3IgPSByZXF1aXJlKCcuL0VsZW1lbnRBbGxvY2F0b3InKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgX3plcm9aZXJvID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbnZhciB1c2VQcmVmaXggPSAhKCdwZXJzcGVjdGl2ZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlKTtcbmZ1bmN0aW9uIF9nZXRFbGVtZW50U2l6ZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgZWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgZWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICBdO1xufVxudmFyIF9zZXRQZXJzcGVjdGl2ZSA9IHVzZVByZWZpeCA/IGZ1bmN0aW9uIChlbGVtZW50LCBwZXJzcGVjdGl2ZSkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUgPyBwZXJzcGVjdGl2ZS50b0ZpeGVkKCkgKyAncHgnIDogJyc7XG4gICAgfSA6IGZ1bmN0aW9uIChlbGVtZW50LCBwZXJzcGVjdGl2ZSkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUgPyBwZXJzcGVjdGl2ZS50b0ZpeGVkKCkgKyAncHgnIDogJyc7XG4gICAgfTtcbmZ1bmN0aW9uIENvbnRleHQoY29udGFpbmVyKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5fYWxsb2NhdG9yID0gbmV3IEVsZW1lbnRBbGxvY2F0b3IoY29udGFpbmVyKTtcbiAgICB0aGlzLl9ub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9zaXplID0gX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKTtcbiAgICB0aGlzLl9wZXJzcGVjdGl2ZVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDApO1xuICAgIHRoaXMuX3BlcnNwZWN0aXZlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX25vZGVDb250ZXh0ID0ge1xuICAgICAgICBhbGxvY2F0b3I6IHRoaXMuX2FsbG9jYXRvcixcbiAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0uaWRlbnRpdHksXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIG9yaWdpbjogX3plcm9aZXJvLFxuICAgICAgICBhbGlnbjogX3plcm9aZXJvLFxuICAgICAgICBzaXplOiB0aGlzLl9zaXplXG4gICAgfTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5vbigncmVzaXplJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldFNpemUoX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbn1cbkNvbnRleHQucHJvdG90eXBlLmdldEFsbG9jYXRvciA9IGZ1bmN0aW9uIGdldEFsbG9jYXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5fYWxsb2NhdG9yO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChvYmopIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZS5hZGQob2JqKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5taWdyYXRlID0gZnVuY3Rpb24gbWlncmF0ZShjb250YWluZXIpIHtcbiAgICBpZiAoY29udGFpbmVyID09PSB0aGlzLmNvbnRhaW5lcilcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuX2FsbG9jYXRvci5taWdyYXRlKGNvbnRhaW5lcik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSkge1xuICAgIGlmICghc2l6ZSlcbiAgICAgICAgc2l6ZSA9IF9nZXRFbGVtZW50U2l6ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgdGhpcy5fc2l6ZVswXSA9IHNpemVbMF07XG4gICAgdGhpcy5fc2l6ZVsxXSA9IHNpemVbMV07XG59O1xuQ29udGV4dC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKGNvbnRleHRQYXJhbWV0ZXJzKSB7XG4gICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzKSB7XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC50cmFuc2Zvcm0gPSBjb250ZXh0UGFyYW1ldGVycy50cmFuc2Zvcm07XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5vcGFjaXR5KVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQub3BhY2l0eSA9IGNvbnRleHRQYXJhbWV0ZXJzLm9wYWNpdHk7XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5vcmlnaW4pXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC5vcmlnaW4gPSBjb250ZXh0UGFyYW1ldGVycy5vcmlnaW47XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5hbGlnbilcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0LmFsaWduID0gY29udGV4dFBhcmFtZXRlcnMuYWxpZ247XG4gICAgICAgIGlmIChjb250ZXh0UGFyYW1ldGVycy5zaXplKVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQuc2l6ZSA9IGNvbnRleHRQYXJhbWV0ZXJzLnNpemU7XG4gICAgfVxuICAgIHZhciBwZXJzcGVjdGl2ZSA9IHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuZ2V0KCk7XG4gICAgaWYgKHBlcnNwZWN0aXZlICE9PSB0aGlzLl9wZXJzcGVjdGl2ZSkge1xuICAgICAgICBfc2V0UGVyc3BlY3RpdmUodGhpcy5jb250YWluZXIsIHBlcnNwZWN0aXZlKTtcbiAgICAgICAgdGhpcy5fcGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZTtcbiAgICB9XG4gICAgdGhpcy5fbm9kZS5jb21taXQodGhpcy5fbm9kZUNvbnRleHQpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmdldFBlcnNwZWN0aXZlID0gZnVuY3Rpb24gZ2V0UGVyc3BlY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuZ2V0KCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuc2V0UGVyc3BlY3RpdmUgPSBmdW5jdGlvbiBzZXRQZXJzcGVjdGl2ZShwZXJzcGVjdGl2ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZS5zZXQocGVyc3BlY3RpdmUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5lbWl0KHR5cGUsIGV2ZW50KTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQub24odHlwZSwgaGFuZGxlcik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5waXBlKHRhcmdldCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC51bnBpcGUodGFyZ2V0KTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHQ7IiwiZnVuY3Rpb24gRWxlbWVudEFsbG9jYXRvcihjb250YWluZXIpIHtcbiAgICBpZiAoIWNvbnRhaW5lcilcbiAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuZGV0YWNoZWROb2RlcyA9IHt9O1xuICAgIHRoaXMubm9kZUNvdW50ID0gMDtcbn1cbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLm1pZ3JhdGUgPSBmdW5jdGlvbiBtaWdyYXRlKGNvbnRhaW5lcikge1xuICAgIHZhciBvbGRDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICBpZiAoY29udGFpbmVyID09PSBvbGRDb250YWluZXIpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkQ29udGFpbmVyIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQob2xkQ29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAob2xkQ29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9sZENvbnRhaW5lci5yZW1vdmVDaGlsZChvbGRDb250YWluZXIuZmlyc3RDaGlsZCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmFsbG9jYXRlID0gZnVuY3Rpb24gYWxsb2NhdGUodHlwZSkge1xuICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmRldGFjaGVkTm9kZXMpKVxuICAgICAgICB0aGlzLmRldGFjaGVkTm9kZXNbdHlwZV0gPSBbXTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW3R5cGVdO1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKG5vZGVTdG9yZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5vZGVTdG9yZS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgIH1cbiAgICB0aGlzLm5vZGVDb3VudCsrO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUuZGVhbGxvY2F0ZSA9IGZ1bmN0aW9uIGRlYWxsb2NhdGUoZWxlbWVudCkge1xuICAgIHZhciBub2RlVHlwZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW25vZGVUeXBlXTtcbiAgICBub2RlU3RvcmUucHVzaChlbGVtZW50KTtcbiAgICB0aGlzLm5vZGVDb3VudC0tO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmdldE5vZGVDb3VudCA9IGZ1bmN0aW9uIGdldE5vZGVDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ291bnQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50QWxsb2NhdG9yOyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL0VudGl0eScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciB1c2VQcmVmaXggPSAhKCd0cmFuc2Zvcm0nIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSk7XG52YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5mdW5jdGlvbiBFbGVtZW50T3V0cHV0KGVsZW1lbnQpIHtcbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHkgPSAxO1xuICAgIHRoaXMuX29yaWdpbiA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZSA9IG51bGw7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgdGhpcy5ldmVudEZvcndhcmRlciA9IGZ1bmN0aW9uIGV2ZW50Rm9yd2FyZGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoZXZlbnQudHlwZSwgZXZlbnQpO1xuICAgIH0uYmluZCh0aGlzKTtcbiAgICB0aGlzLmlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLl9pbnZpc2libGUgPSBmYWxzZTtcbiAgICBpZiAoZWxlbWVudClcbiAgICAgICAgdGhpcy5hdHRhY2goZWxlbWVudCk7XG59XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGZuKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCB0aGlzLmV2ZW50Rm9yd2FyZGVyKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5vbih0eXBlLCBmbik7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBmbikge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LnJlbW92ZUxpc3RlbmVyKHR5cGUsIGZuKTtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIGlmIChldmVudCAmJiAhZXZlbnQub3JpZ2luKVxuICAgICAgICBldmVudC5vcmlnaW4gPSB0aGlzO1xuICAgIHZhciBoYW5kbGVkID0gdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCh0eXBlLCBldmVudCk7XG4gICAgaWYgKGhhbmRsZWQgJiYgZXZlbnQgJiYgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKVxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICByZXR1cm4gaGFuZGxlZDtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQucGlwZSh0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQudW5waXBlKHRhcmdldCk7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xufTtcbmZ1bmN0aW9uIF9hZGRFdmVudExpc3RlbmVycyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX2V2ZW50T3V0cHV0Lmxpc3RlbmVycykge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihpLCB0aGlzLmV2ZW50Rm9yd2FyZGVyKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfcmVtb3ZlRXZlbnRMaXN0ZW5lcnModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9ldmVudE91dHB1dC5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoaSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgfVxufVxuZnVuY3Rpb24gX2Zvcm1hdENTU1RyYW5zZm9ybShtKSB7XG4gICAgbVsxMl0gPSBNYXRoLnJvdW5kKG1bMTJdICogZGV2aWNlUGl4ZWxSYXRpbykgLyBkZXZpY2VQaXhlbFJhdGlvO1xuICAgIG1bMTNdID0gTWF0aC5yb3VuZChtWzEzXSAqIGRldmljZVBpeGVsUmF0aW8pIC8gZGV2aWNlUGl4ZWxSYXRpbztcbiAgICB2YXIgcmVzdWx0ID0gJ21hdHJpeDNkKCc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBtW2ldIDwgMC4wMDAwMDEgJiYgbVtpXSA+IC0wLjAwMDAwMSA/ICcwLCcgOiBtW2ldICsgJywnO1xuICAgIH1cbiAgICByZXN1bHQgKz0gbVsxNV0gKyAnKSc7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbnZhciBfc2V0TWF0cml4O1xuaWYgKG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdmaXJlZm94JykgPiAtMSkge1xuICAgIF9zZXRNYXRyaXggPSBmdW5jdGlvbiAoZWxlbWVudCwgbWF0cml4KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuekluZGV4ID0gbWF0cml4WzE0XSAqIDEwMDAwMDAgfCAwO1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufSBlbHNlIGlmICh1c2VQcmVmaXgpIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IF9mb3JtYXRDU1NUcmFuc2Zvcm0obWF0cml4KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gX2Zvcm1hdENTU09yaWdpbihvcmlnaW4pIHtcbiAgICByZXR1cm4gMTAwICogb3JpZ2luWzBdICsgJyUgJyArIDEwMCAqIG9yaWdpblsxXSArICclJztcbn1cbnZhciBfc2V0T3JpZ2luID0gdXNlUHJlZml4ID8gZnVuY3Rpb24gKGVsZW1lbnQsIG9yaWdpbikge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKTtcbiAgICB9IDogZnVuY3Rpb24gKGVsZW1lbnQsIG9yaWdpbikge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9IF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKTtcbiAgICB9O1xudmFyIF9zZXRJbnZpc2libGUgPSB1c2VQcmVmaXggPyBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZTNkKDAuMDAwMSwwLjAwMDEsMC4wMDAxKSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgfSA6IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3NjYWxlM2QoMC4wMDAxLDAuMDAwMSwwLjAwMDEpJztcbiAgICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB9O1xuZnVuY3Rpb24gX3h5Tm90RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdIDogYSAhPT0gYjtcbn1cbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2VsZW1lbnQ7XG4gICAgaWYgKCF0YXJnZXQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgbWF0cml4ID0gY29udGV4dC50cmFuc2Zvcm07XG4gICAgdmFyIG9wYWNpdHkgPSBjb250ZXh0Lm9wYWNpdHk7XG4gICAgdmFyIG9yaWdpbiA9IGNvbnRleHQub3JpZ2luO1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIGlmICghbWF0cml4ICYmIHRoaXMuX21hdHJpeCkge1xuICAgICAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMDtcbiAgICAgICAgX3NldEludmlzaWJsZSh0YXJnZXQpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChfeHlOb3RFcXVhbHModGhpcy5fb3JpZ2luLCBvcmlnaW4pKVxuICAgICAgICB0aGlzLl9vcmlnaW5EaXJ0eSA9IHRydWU7XG4gICAgaWYgKFRyYW5zZm9ybS5ub3RFcXVhbHModGhpcy5fbWF0cml4LCBtYXRyaXgpKVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1EaXJ0eSA9IHRydWU7XG4gICAgaWYgKHRoaXMuX2ludmlzaWJsZSkge1xuICAgICAgICB0aGlzLl9pbnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcGFjaXR5ICE9PSBvcGFjaXR5KSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHkgPSBvcGFjaXR5O1xuICAgICAgICB0YXJnZXQuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHkgPj0gMSA/ICcwLjk5OTk5OScgOiBvcGFjaXR5O1xuICAgIH1cbiAgICBpZiAodGhpcy5fdHJhbnNmb3JtRGlydHkgfHwgdGhpcy5fb3JpZ2luRGlydHkgfHwgdGhpcy5fc2l6ZURpcnR5KSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplRGlydHkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fc2l6ZSlcbiAgICAgICAgICAgICAgICB0aGlzLl9zaXplID0gW1xuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMuX3NpemVbMF0gPSBzaXplWzBdO1xuICAgICAgICAgICAgdGhpcy5fc2l6ZVsxXSA9IHNpemVbMV07XG4gICAgICAgICAgICB0aGlzLl9zaXplRGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb3JpZ2luRGlydHkpIHtcbiAgICAgICAgICAgIGlmIChvcmlnaW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX29yaWdpbilcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vcmlnaW5bMF0gPSBvcmlnaW5bMF07XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luWzFdID0gb3JpZ2luWzFdO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luID0gbnVsbDtcbiAgICAgICAgICAgIF9zZXRPcmlnaW4odGFyZ2V0LCB0aGlzLl9vcmlnaW4pO1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luRGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdHJpeClcbiAgICAgICAgICAgIG1hdHJpeCA9IFRyYW5zZm9ybS5pZGVudGl0eTtcbiAgICAgICAgdGhpcy5fbWF0cml4ID0gbWF0cml4O1xuICAgICAgICB2YXIgYWFNYXRyaXggPSB0aGlzLl9zaXplID8gVHJhbnNmb3JtLnRoZW5Nb3ZlKG1hdHJpeCwgW1xuICAgICAgICAgICAgICAgIC10aGlzLl9zaXplWzBdICogb3JpZ2luWzBdLFxuICAgICAgICAgICAgICAgIC10aGlzLl9zaXplWzFdICogb3JpZ2luWzFdLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pIDogbWF0cml4O1xuICAgICAgICBfc2V0TWF0cml4KHRhcmdldCwgYWFNYXRyaXgpO1xuICAgICAgICB0aGlzLl90cmFuc2Zvcm1EaXJ0eSA9IGZhbHNlO1xuICAgIH1cbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudCkge1xuICAgICAgICB0aGlzLl9pbnZpc2libGUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uIGF0dGFjaCh0YXJnZXQpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gdGFyZ2V0O1xuICAgIF9hZGRFdmVudExpc3RlbmVycy5jYWxsKHRoaXMsIHRhcmdldCk7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gZGV0YWNoKCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9lbGVtZW50O1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgX3JlbW92ZUV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgaWYgKHRoaXMuX2ludmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5faW52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudE91dHB1dDsiLCJ2YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vQ29udGV4dCcpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgRW5naW5lID0ge307XG52YXIgY29udGV4dHMgPSBbXTtcbnZhciBuZXh0VGlja1F1ZXVlID0gW107XG52YXIgZGVmZXJRdWV1ZSA9IFtdO1xudmFyIGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcbnZhciBmcmFtZVRpbWU7XG52YXIgZnJhbWVUaW1lTGltaXQ7XG52YXIgbG9vcEVuYWJsZWQgPSB0cnVlO1xudmFyIGV2ZW50Rm9yd2FyZGVycyA9IHt9O1xudmFyIGV2ZW50SGFuZGxlciA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbnZhciBvcHRpb25zID0ge1xuICAgICAgICBjb250YWluZXJUeXBlOiAnZGl2JyxcbiAgICAgICAgY29udGFpbmVyQ2xhc3M6ICdmYW1vdXMtY29udGFpbmVyJyxcbiAgICAgICAgZnBzQ2FwOiB1bmRlZmluZWQsXG4gICAgICAgIHJ1bkxvb3A6IHRydWUsXG4gICAgICAgIGFwcE1vZGU6IHRydWVcbiAgICB9O1xudmFyIG9wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKG9wdGlvbnMpO1xudmFyIE1BWF9ERUZFUl9GUkFNRV9USU1FID0gMTA7XG5FbmdpbmUuc3RlcCA9IGZ1bmN0aW9uIHN0ZXAoKSB7XG4gICAgdmFyIGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBpZiAoZnJhbWVUaW1lTGltaXQgJiYgY3VycmVudFRpbWUgLSBsYXN0VGltZSA8IGZyYW1lVGltZUxpbWl0KVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGkgPSAwO1xuICAgIGZyYW1lVGltZSA9IGN1cnJlbnRUaW1lIC0gbGFzdFRpbWU7XG4gICAgbGFzdFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICBldmVudEhhbmRsZXIuZW1pdCgncHJlcmVuZGVyJyk7XG4gICAgZm9yIChpID0gMDsgaSA8IG5leHRUaWNrUXVldWUubGVuZ3RoOyBpKyspXG4gICAgICAgIG5leHRUaWNrUXVldWVbaV0uY2FsbCh0aGlzKTtcbiAgICBuZXh0VGlja1F1ZXVlLnNwbGljZSgwKTtcbiAgICB3aGlsZSAoZGVmZXJRdWV1ZS5sZW5ndGggJiYgRGF0ZS5ub3coKSAtIGN1cnJlbnRUaW1lIDwgTUFYX0RFRkVSX0ZSQU1FX1RJTUUpIHtcbiAgICAgICAgZGVmZXJRdWV1ZS5zaGlmdCgpLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBjb250ZXh0cy5sZW5ndGg7IGkrKylcbiAgICAgICAgY29udGV4dHNbaV0udXBkYXRlKCk7XG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3Bvc3RyZW5kZXInKTtcbn07XG5mdW5jdGlvbiBsb29wKCkge1xuICAgIGlmIChvcHRpb25zLnJ1bkxvb3ApIHtcbiAgICAgICAgRW5naW5lLnN0ZXAoKTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICB9IGVsc2VcbiAgICAgICAgbG9vcEVuYWJsZWQgPSBmYWxzZTtcbn1cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5mdW5jdGlvbiBoYW5kbGVSZXNpemUoZXZlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRleHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnRleHRzW2ldLmVtaXQoJ3Jlc2l6ZScpO1xuICAgIH1cbiAgICBldmVudEhhbmRsZXIuZW1pdCgncmVzaXplJyk7XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlUmVzaXplLCBmYWxzZSk7XG5oYW5kbGVSZXNpemUoKTtcbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sIHRydWUpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZmFtb3VzLXJvb3QnKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmFtb3VzLXJvb3QnKTtcbn1cbnZhciBpbml0aWFsaXplZCA9IGZhbHNlO1xuRW5naW5lLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQuc3Vic2NyaWJlKEVuZ2luZSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gZXZlbnRIYW5kbGVyLnBpcGUodGFyZ2V0KTtcbn07XG5FbmdpbmUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQudW5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC51bnN1YnNjcmliZShFbmdpbmUpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlci51bnBpcGUodGFyZ2V0KTtcbn07XG5FbmdpbmUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgaWYgKCEodHlwZSBpbiBldmVudEZvcndhcmRlcnMpKSB7XG4gICAgICAgIGV2ZW50Rm9yd2FyZGVyc1t0eXBlXSA9IGV2ZW50SGFuZGxlci5lbWl0LmJpbmQoZXZlbnRIYW5kbGVyLCB0eXBlKTtcbiAgICAgICAgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBldmVudEZvcndhcmRlcnNbdHlwZV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgRW5naW5lLm5leHRUaWNrKGZ1bmN0aW9uICh0eXBlLCBmb3J3YXJkZXIpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm9yd2FyZGVyKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzLCB0eXBlLCBldmVudEZvcndhcmRlcnNbdHlwZV0pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyLm9uKHR5cGUsIGhhbmRsZXIpO1xufTtcbkVuZ2luZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHJldHVybiBldmVudEhhbmRsZXIuZW1pdCh0eXBlLCBldmVudCk7XG59O1xuRW5naW5lLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgIHJldHVybiBldmVudEhhbmRsZXIucmVtb3ZlTGlzdGVuZXIodHlwZSwgaGFuZGxlcik7XG59O1xuRW5naW5lLmdldEZQUyA9IGZ1bmN0aW9uIGdldEZQUygpIHtcbiAgICByZXR1cm4gMTAwMCAvIGZyYW1lVGltZTtcbn07XG5FbmdpbmUuc2V0RlBTQ2FwID0gZnVuY3Rpb24gc2V0RlBTQ2FwKGZwcykge1xuICAgIGZyYW1lVGltZUxpbWl0ID0gTWF0aC5mbG9vcigxMDAwIC8gZnBzKTtcbn07XG5FbmdpbmUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoa2V5KSB7XG4gICAgcmV0dXJuIG9wdGlvbnNNYW5hZ2VyLmdldE9wdGlvbnMoa2V5KTtcbn07XG5FbmdpbmUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zTWFuYWdlci5zZXRPcHRpb25zLmFwcGx5KG9wdGlvbnNNYW5hZ2VyLCBhcmd1bWVudHMpO1xufTtcbkVuZ2luZS5jcmVhdGVDb250ZXh0ID0gZnVuY3Rpb24gY3JlYXRlQ29udGV4dChlbCkge1xuICAgIGlmICghaW5pdGlhbGl6ZWQgJiYgb3B0aW9ucy5hcHBNb2RlKVxuICAgICAgICBFbmdpbmUubmV4dFRpY2soaW5pdGlhbGl6ZSk7XG4gICAgdmFyIG5lZWRNb3VudENvbnRhaW5lciA9IGZhbHNlO1xuICAgIGlmICghZWwpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG9wdGlvbnMuY29udGFpbmVyVHlwZSk7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQob3B0aW9ucy5jb250YWluZXJDbGFzcyk7XG4gICAgICAgIG5lZWRNb3VudENvbnRhaW5lciA9IHRydWU7XG4gICAgfVxuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoZWwpO1xuICAgIEVuZ2luZS5yZWdpc3RlckNvbnRleHQoY29udGV4dCk7XG4gICAgaWYgKG5lZWRNb3VudENvbnRhaW5lcikge1xuICAgICAgICBFbmdpbmUubmV4dFRpY2soZnVuY3Rpb24gKGNvbnRleHQsIGVsKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgICAgIGNvbnRleHQuZW1pdCgncmVzaXplJyk7XG4gICAgICAgIH0uYmluZCh0aGlzLCBjb250ZXh0LCBlbCkpO1xuICAgIH1cbiAgICByZXR1cm4gY29udGV4dDtcbn07XG5FbmdpbmUucmVnaXN0ZXJDb250ZXh0ID0gZnVuY3Rpb24gcmVnaXN0ZXJDb250ZXh0KGNvbnRleHQpIHtcbiAgICBjb250ZXh0cy5wdXNoKGNvbnRleHQpO1xuICAgIHJldHVybiBjb250ZXh0O1xufTtcbkVuZ2luZS5nZXRDb250ZXh0cyA9IGZ1bmN0aW9uIGdldENvbnRleHRzKCkge1xuICAgIHJldHVybiBjb250ZXh0cztcbn07XG5FbmdpbmUuZGVyZWdpc3RlckNvbnRleHQgPSBmdW5jdGlvbiBkZXJlZ2lzdGVyQ29udGV4dChjb250ZXh0KSB7XG4gICAgdmFyIGkgPSBjb250ZXh0cy5pbmRleE9mKGNvbnRleHQpO1xuICAgIGlmIChpID49IDApXG4gICAgICAgIGNvbnRleHRzLnNwbGljZShpLCAxKTtcbn07XG5FbmdpbmUubmV4dFRpY2sgPSBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgIG5leHRUaWNrUXVldWUucHVzaChmbik7XG59O1xuRW5naW5lLmRlZmVyID0gZnVuY3Rpb24gZGVmZXIoZm4pIHtcbiAgICBkZWZlclF1ZXVlLnB1c2goZm4pO1xufTtcbm9wdGlvbnNNYW5hZ2VyLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGlmIChkYXRhLmlkID09PSAnZnBzQ2FwJylcbiAgICAgICAgRW5naW5lLnNldEZQU0NhcChkYXRhLnZhbHVlKTtcbiAgICBlbHNlIGlmIChkYXRhLmlkID09PSAncnVuTG9vcCcpIHtcbiAgICAgICAgaWYgKCFsb29wRW5hYmxlZCAmJiBkYXRhLnZhbHVlKSB7XG4gICAgICAgICAgICBsb29wRW5hYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZTsiLCJ2YXIgZW50aXRpZXMgPSBbXTtcbmZ1bmN0aW9uIGdldChpZCkge1xuICAgIHJldHVybiBlbnRpdGllc1tpZF07XG59XG5mdW5jdGlvbiBzZXQoaWQsIGVudGl0eSkge1xuICAgIGVudGl0aWVzW2lkXSA9IGVudGl0eTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyKGVudGl0eSkge1xuICAgIHZhciBpZCA9IGVudGl0aWVzLmxlbmd0aDtcbiAgICBzZXQoaWQsIGVudGl0eSk7XG4gICAgcmV0dXJuIGlkO1xufVxuZnVuY3Rpb24gdW5yZWdpc3RlcihpZCkge1xuICAgIHNldChpZCwgbnVsbCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICByZWdpc3RlcjogcmVnaXN0ZXIsXG4gICAgdW5yZWdpc3RlcjogdW5yZWdpc3RlcixcbiAgICBnZXQ6IGdldCxcbiAgICBzZXQ6IHNldFxufTsiLCJmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICB0aGlzLl9vd25lciA9IHRoaXM7XG59XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGV2ZW50KSB7XG4gICAgdmFyIGhhbmRsZXJzID0gdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgaWYgKGhhbmRsZXJzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGhhbmRsZXJzW2ldLmNhbGwodGhpcy5fb3duZXIsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKVxuICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgIHZhciBpbmRleCA9IHRoaXMubGlzdGVuZXJzW3R5cGVdLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChoYW5kbGVyKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gdGhpcy5saXN0ZW5lcnNbdHlwZV07XG4gICAgaWYgKGxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbGlzdGVuZXIuaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApXG4gICAgICAgICAgICBsaXN0ZW5lci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmJpbmRUaGlzID0gZnVuY3Rpb24gYmluZFRoaXMob3duZXIpIHtcbiAgICB0aGlzLl9vd25lciA9IG93bmVyO1xufTtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyOyIsInZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCcuL0V2ZW50RW1pdHRlcicpO1xuZnVuY3Rpb24gRXZlbnRIYW5kbGVyKCkge1xuICAgIEV2ZW50RW1pdHRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuZG93bnN0cmVhbSA9IFtdO1xuICAgIHRoaXMuZG93bnN0cmVhbUZuID0gW107XG4gICAgdGhpcy51cHN0cmVhbSA9IFtdO1xuICAgIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMgPSB7fTtcbn1cbkV2ZW50SGFuZGxlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpO1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEV2ZW50SGFuZGxlcjtcbkV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIgPSBmdW5jdGlvbiBzZXRJbnB1dEhhbmRsZXIob2JqZWN0LCBoYW5kbGVyKSB7XG4gICAgb2JqZWN0LnRyaWdnZXIgPSBoYW5kbGVyLnRyaWdnZXIuYmluZChoYW5kbGVyKTtcbiAgICBpZiAoaGFuZGxlci5zdWJzY3JpYmUgJiYgaGFuZGxlci51bnN1YnNjcmliZSkge1xuICAgICAgICBvYmplY3Quc3Vic2NyaWJlID0gaGFuZGxlci5zdWJzY3JpYmUuYmluZChoYW5kbGVyKTtcbiAgICAgICAgb2JqZWN0LnVuc3Vic2NyaWJlID0gaGFuZGxlci51bnN1YnNjcmliZS5iaW5kKGhhbmRsZXIpO1xuICAgIH1cbn07XG5FdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlciA9IGZ1bmN0aW9uIHNldE91dHB1dEhhbmRsZXIob2JqZWN0LCBoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIgaW5zdGFuY2VvZiBFdmVudEhhbmRsZXIpXG4gICAgICAgIGhhbmRsZXIuYmluZFRoaXMob2JqZWN0KTtcbiAgICBvYmplY3QucGlwZSA9IGhhbmRsZXIucGlwZS5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC51bnBpcGUgPSBoYW5kbGVyLnVucGlwZS5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC5vbiA9IGhhbmRsZXIub24uYmluZChoYW5kbGVyKTtcbiAgICBvYmplY3QuYWRkTGlzdGVuZXIgPSBvYmplY3Qub247XG4gICAgb2JqZWN0LnJlbW92ZUxpc3RlbmVyID0gaGFuZGxlci5yZW1vdmVMaXN0ZW5lci5iaW5kKGhhbmRsZXIpO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgaSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZG93bnN0cmVhbS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5kb3duc3RyZWFtW2ldLnRyaWdnZXIpXG4gICAgICAgICAgICB0aGlzLmRvd25zdHJlYW1baV0udHJpZ2dlcih0eXBlLCBldmVudCk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmRvd25zdHJlYW1Gbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmRvd25zdHJlYW1GbltpXSh0eXBlLCBldmVudCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudHJpZ2dlciA9IEV2ZW50SGFuZGxlci5wcm90b3R5cGUuZW1pdDtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldC5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC5zdWJzY3JpYmUodGhpcyk7XG4gICAgdmFyIGRvd25zdHJlYW1DdHggPSB0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHRoaXMuZG93bnN0cmVhbUZuIDogdGhpcy5kb3duc3RyZWFtO1xuICAgIHZhciBpbmRleCA9IGRvd25zdHJlYW1DdHguaW5kZXhPZih0YXJnZXQpO1xuICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgIGRvd25zdHJlYW1DdHgucHVzaCh0YXJnZXQpO1xuICAgIGlmICh0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGFyZ2V0KCdwaXBlJywgbnVsbCk7XG4gICAgZWxzZSBpZiAodGFyZ2V0LnRyaWdnZXIpXG4gICAgICAgIHRhcmdldC50cmlnZ2VyKCdwaXBlJywgbnVsbCk7XG4gICAgcmV0dXJuIHRhcmdldDtcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnVuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQudW5zdWJzY3JpYmUodGhpcyk7XG4gICAgdmFyIGRvd25zdHJlYW1DdHggPSB0YXJnZXQgaW5zdGFuY2VvZiBGdW5jdGlvbiA/IHRoaXMuZG93bnN0cmVhbUZuIDogdGhpcy5kb3duc3RyZWFtO1xuICAgIHZhciBpbmRleCA9IGRvd25zdHJlYW1DdHguaW5kZXhPZih0YXJnZXQpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgIGRvd25zdHJlYW1DdHguc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICAgICAgdGFyZ2V0KCd1bnBpcGUnLCBudWxsKTtcbiAgICAgICAgZWxzZSBpZiAodGFyZ2V0LnRyaWdnZXIpXG4gICAgICAgICAgICB0YXJnZXQudHJpZ2dlcigndW5waXBlJywgbnVsbCk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMpKSB7XG4gICAgICAgIHZhciB1cHN0cmVhbUxpc3RlbmVyID0gdGhpcy50cmlnZ2VyLmJpbmQodGhpcywgdHlwZSk7XG4gICAgICAgIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnNbdHlwZV0gPSB1cHN0cmVhbUxpc3RlbmVyO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudXBzdHJlYW0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMudXBzdHJlYW1baV0ub24odHlwZSwgdXBzdHJlYW1MaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50SGFuZGxlci5wcm90b3R5cGUub247XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShzb3VyY2UpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnVwc3RyZWFtLmluZGV4T2Yoc291cmNlKTtcbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgIHRoaXMudXBzdHJlYW0ucHVzaChzb3VyY2UpO1xuICAgICAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHNvdXJjZS5vbih0eXBlLCB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUoc291cmNlKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy51cHN0cmVhbS5pbmRleE9mKHNvdXJjZSk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy51cHN0cmVhbS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBmb3IgKHZhciB0eXBlIGluIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVMaXN0ZW5lcih0eXBlLCB0aGlzLnVwc3RyZWFtTGlzdGVuZXJzW3R5cGVdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50SGFuZGxlcjsiLCJ2YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vQ29udGV4dCcpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG52YXIgU3VyZmFjZSA9IHJlcXVpcmUoJy4vU3VyZmFjZScpO1xuZnVuY3Rpb24gR3JvdXAob3B0aW9ucykge1xuICAgIFN1cmZhY2UuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB0aGlzLl9zaG91bGRSZWNhbGN1bGF0ZVNpemUgPSBmYWxzZTtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgdGhpcy5jb250ZXh0ID0gbmV3IENvbnRleHQodGhpcy5fY29udGFpbmVyKTtcbiAgICB0aGlzLnNldENvbnRlbnQodGhpcy5fY29udGFpbmVyKTtcbiAgICB0aGlzLl9ncm91cFNpemUgPSBbXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgdW5kZWZpbmVkXG4gICAgXTtcbn1cbkdyb3VwLlNJWkVfWkVSTyA9IFtcbiAgICAwLFxuICAgIDBcbl07XG5Hcm91cC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cmZhY2UucHJvdG90eXBlKTtcbkdyb3VwLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdkaXYnO1xuR3JvdXAucHJvdG90eXBlLmVsZW1lbnRDbGFzcyA9ICdmYW1vdXMtZ3JvdXAnO1xuR3JvdXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmFkZC5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XG59O1xuR3JvdXAucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyLmNhbGwodGhpcyk7XG59O1xuR3JvdXAucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICB0aGlzLmNvbnRleHQubWlncmF0ZSh0YXJnZXQpO1xufTtcbkdyb3VwLnByb3RvdHlwZS5yZWNhbGwgPSBmdW5jdGlvbiByZWNhbGwodGFyZ2V0KSB7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHRoaXMuY29udGV4dC5taWdyYXRlKHRoaXMuX2NvbnRhaW5lcik7XG59O1xuR3JvdXAucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHRyYW5zZm9ybSA9IGNvbnRleHQudHJhbnNmb3JtO1xuICAgIHZhciBvcmlnaW4gPSBjb250ZXh0Lm9yaWdpbjtcbiAgICB2YXIgb3BhY2l0eSA9IGNvbnRleHQub3BhY2l0eTtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICB2YXIgcmVzdWx0ID0gU3VyZmFjZS5wcm90b3R5cGUuY29tbWl0LmNhbGwodGhpcywge1xuICAgICAgICAgICAgYWxsb2NhdG9yOiBjb250ZXh0LmFsbG9jYXRvcixcbiAgICAgICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLnRoZW5Nb3ZlKHRyYW5zZm9ybSwgW1xuICAgICAgICAgICAgICAgIC1vcmlnaW5bMF0gKiBzaXplWzBdLFxuICAgICAgICAgICAgICAgIC1vcmlnaW5bMV0gKiBzaXplWzFdLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgICAgIG9yaWdpbjogb3JpZ2luLFxuICAgICAgICAgICAgc2l6ZTogR3JvdXAuU0laRV9aRVJPXG4gICAgICAgIH0pO1xuICAgIGlmIChzaXplWzBdICE9PSB0aGlzLl9ncm91cFNpemVbMF0gfHwgc2l6ZVsxXSAhPT0gdGhpcy5fZ3JvdXBTaXplWzFdKSB7XG4gICAgICAgIHRoaXMuX2dyb3VwU2l6ZVswXSA9IHNpemVbMF07XG4gICAgICAgIHRoaXMuX2dyb3VwU2l6ZVsxXSA9IHNpemVbMV07XG4gICAgICAgIHRoaXMuY29udGV4dC5zZXRTaXplKHNpemUpO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQudXBkYXRlKHtcbiAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0udHJhbnNsYXRlKC1vcmlnaW5bMF0gKiBzaXplWzBdLCAtb3JpZ2luWzFdICogc2l6ZVsxXSwgMCksXG4gICAgICAgIG9yaWdpbjogb3JpZ2luLFxuICAgICAgICBzaXplOiBzaXplXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEdyb3VwOyIsInZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCcuL1RyYW5zZm9ybScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIE1vZGlmaWVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX3Byb3BvcnRpb25HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX2xlZ2FjeVN0YXRlcyA9IHt9O1xuICAgIHRoaXMuX291dHB1dCA9IHtcbiAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0uaWRlbnRpdHksXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIG9yaWdpbjogbnVsbCxcbiAgICAgICAgYWxpZ246IG51bGwsXG4gICAgICAgIHNpemU6IG51bGwsXG4gICAgICAgIHByb3BvcnRpb25zOiBudWxsLFxuICAgICAgICB0YXJnZXQ6IG51bGxcbiAgICB9O1xuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnRyYW5zZm9ybSlcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRnJvbShvcHRpb25zLnRyYW5zZm9ybSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9wYWNpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eUZyb20ob3B0aW9ucy5vcGFjaXR5KTtcbiAgICAgICAgaWYgKG9wdGlvbnMub3JpZ2luKVxuICAgICAgICAgICAgdGhpcy5vcmlnaW5Gcm9tKG9wdGlvbnMub3JpZ2luKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYWxpZ24pXG4gICAgICAgICAgICB0aGlzLmFsaWduRnJvbShvcHRpb25zLmFsaWduKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuc2l6ZUZyb20ob3B0aW9ucy5zaXplKTtcbiAgICAgICAgaWYgKG9wdGlvbnMucHJvcG9ydGlvbnMpXG4gICAgICAgICAgICB0aGlzLnByb3BvcnRpb25zRnJvbShvcHRpb25zLnByb3BvcnRpb25zKTtcbiAgICB9XG59XG5Nb2RpZmllci5wcm90b3R5cGUudHJhbnNmb3JtRnJvbSA9IGZ1bmN0aW9uIHRyYW5zZm9ybUZyb20odHJhbnNmb3JtKSB7XG4gICAgaWYgKHRyYW5zZm9ybSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSB0cmFuc2Zvcm07XG4gICAgZWxzZSBpZiAodHJhbnNmb3JtIGluc3RhbmNlb2YgT2JqZWN0ICYmIHRyYW5zZm9ybS5nZXQpXG4gICAgICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IHRyYW5zZm9ybS5nZXQuYmluZCh0cmFuc2Zvcm0pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUub3BhY2l0eUZyb20gPSBmdW5jdGlvbiBvcGFjaXR5RnJvbShvcGFjaXR5KSB7XG4gICAgaWYgKG9wYWNpdHkgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG9wYWNpdHk7XG4gICAgZWxzZSBpZiAob3BhY2l0eSBpbnN0YW5jZW9mIE9iamVjdCAmJiBvcGFjaXR5LmdldClcbiAgICAgICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG9wYWNpdHkuZ2V0LmJpbmQob3BhY2l0eSk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5vcmlnaW5Gcm9tID0gZnVuY3Rpb24gb3JpZ2luRnJvbShvcmlnaW4pIHtcbiAgICBpZiAob3JpZ2luIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG9yaWdpbjtcbiAgICBlbHNlIGlmIChvcmlnaW4gaW5zdGFuY2VvZiBPYmplY3QgJiYgb3JpZ2luLmdldClcbiAgICAgICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gb3JpZ2luLmdldC5iaW5kKG9yaWdpbik7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5vcmlnaW4gPSBvcmlnaW47XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5hbGlnbkZyb20gPSBmdW5jdGlvbiBhbGlnbkZyb20oYWxpZ24pIHtcbiAgICBpZiAoYWxpZ24gaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBhbGlnbjtcbiAgICBlbHNlIGlmIChhbGlnbiBpbnN0YW5jZW9mIE9iamVjdCAmJiBhbGlnbi5nZXQpXG4gICAgICAgIHRoaXMuX2FsaWduR2V0dGVyID0gYWxpZ24uZ2V0LmJpbmQoYWxpZ24pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5hbGlnbiA9IGFsaWduO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2l6ZUZyb20gPSBmdW5jdGlvbiBzaXplRnJvbShzaXplKSB7XG4gICAgaWYgKHNpemUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fc2l6ZUdldHRlciA9IHNpemU7XG4gICAgZWxzZSBpZiAoc2l6ZSBpbnN0YW5jZW9mIE9iamVjdCAmJiBzaXplLmdldClcbiAgICAgICAgdGhpcy5fc2l6ZUdldHRlciA9IHNpemUuZ2V0LmJpbmQoc2l6ZSk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQuc2l6ZSA9IHNpemU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5wcm9wb3J0aW9uc0Zyb20gPSBmdW5jdGlvbiBwcm9wb3J0aW9uc0Zyb20ocHJvcG9ydGlvbnMpIHtcbiAgICBpZiAocHJvcG9ydGlvbnMgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IHByb3BvcnRpb25zO1xuICAgIGVsc2UgaWYgKHByb3BvcnRpb25zIGluc3RhbmNlb2YgT2JqZWN0ICYmIHByb3BvcnRpb25zLmdldClcbiAgICAgICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IHByb3BvcnRpb25zLmdldC5iaW5kKHByb3BvcnRpb25zKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX291dHB1dC5wcm9wb3J0aW9ucyA9IHByb3BvcnRpb25zO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSh0aGlzLl9vdXRwdXQudHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3RyYW5zZm9ybUdldHRlcilcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5zZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Gcm9tKHRyYW5zZm9ybSk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldE9wYWNpdHkgPSBmdW5jdGlvbiBzZXRPcGFjaXR5KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0Lm9wYWNpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fb3BhY2l0eUdldHRlcilcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eUZyb20odGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMub3BhY2l0eUZyb20ob3BhY2l0eSk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldE9yaWdpbiA9IGZ1bmN0aW9uIHNldE9yaWdpbihvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbikge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4gPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0Lm9yaWdpbiB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbkdldHRlcilcbiAgICAgICAgICAgIHRoaXMub3JpZ2luRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbi5zZXQob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5Gcm9tKG9yaWdpbik7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldEFsaWduID0gZnVuY3Rpb24gc2V0QWxpZ24oYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24gPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LmFsaWduIHx8IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fYWxpZ25HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLmFsaWduRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24pO1xuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24uc2V0KGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5hbGlnbkZyb20oYWxpZ24pO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChzaXplICYmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9vdXRwdXQuc2l6ZSB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3NpemVHZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLnNpemVGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUuc2V0KHNpemUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLnNpemVGcm9tKHNpemUpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRQcm9wb3J0aW9ucyA9IGZ1bmN0aW9uIHNldFByb3BvcnRpb25zKHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChwcm9wb3J0aW9ucyAmJiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMpKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LnByb3BvcnRpb25zIHx8IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fcHJvcG9ydGlvbkdldHRlcilcbiAgICAgICAgICAgIHRoaXMucHJvcG9ydGlvbnNGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5wcm9wb3J0aW9ucy5zZXQocHJvcG9ydGlvbnMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BvcnRpb25zRnJvbShwcm9wb3J0aW9ucyk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5LmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbilcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbi5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbilcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLnNpemUpXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplLmhhbHQoKTtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLnByb3BvcnRpb25zKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMucHJvcG9ydGlvbnMuaGFsdCgpO1xuICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fcHJvcG9ydGlvbkdldHRlciA9IG51bGw7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldFRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdHJhbnNmb3JtR2V0dGVyKCk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldEZpbmFsVHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0RmluYWxUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0gPyB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtLmdldEZpbmFsKCkgOiB0aGlzLl9vdXRwdXQudHJhbnNmb3JtO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRPcGFjaXR5ID0gZnVuY3Rpb24gZ2V0T3BhY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fb3BhY2l0eUdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbiBnZXRPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbkdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRBbGlnbiA9IGZ1bmN0aW9uIGdldEFsaWduKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGlnbkdldHRlcigpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZUdldHRlciA/IHRoaXMuX3NpemVHZXR0ZXIoKSA6IHRoaXMuX291dHB1dC5zaXplO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5nZXRQcm9wb3J0aW9ucyA9IGZ1bmN0aW9uIGdldFByb3BvcnRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9wcm9wb3J0aW9uR2V0dGVyID8gdGhpcy5fcHJvcG9ydGlvbkdldHRlcigpIDogdGhpcy5fb3V0cHV0LnByb3BvcnRpb25zO1xufTtcbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuX3RyYW5zZm9ybUdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LnRyYW5zZm9ybSA9IHRoaXMuX3RyYW5zZm9ybUdldHRlcigpO1xuICAgIGlmICh0aGlzLl9vcGFjaXR5R2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQub3BhY2l0eSA9IHRoaXMuX29wYWNpdHlHZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fb3JpZ2luR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQub3JpZ2luID0gdGhpcy5fb3JpZ2luR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX2FsaWduR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQuYWxpZ24gPSB0aGlzLl9hbGlnbkdldHRlcigpO1xuICAgIGlmICh0aGlzLl9zaXplR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQuc2l6ZSA9IHRoaXMuX3NpemVHZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fcHJvcG9ydGlvbkdldHRlcilcbiAgICAgICAgdGhpcy5fb3V0cHV0LnByb3BvcnRpb25zID0gdGhpcy5fcHJvcG9ydGlvbkdldHRlcigpO1xufVxuTW9kaWZpZXIucHJvdG90eXBlLm1vZGlmeSA9IGZ1bmN0aW9uIG1vZGlmeSh0YXJnZXQpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fb3V0cHV0LnRhcmdldCA9IHRhcmdldDtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gTW9kaWZpZXI7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBPcHRpb25zTWFuYWdlcih2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG51bGw7XG59XG5PcHRpb25zTWFuYWdlci5wYXRjaCA9IGZ1bmN0aW9uIHBhdGNoT2JqZWN0KHNvdXJjZSwgZGF0YSkge1xuICAgIHZhciBtYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHNvdXJjZSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICAgIG1hbmFnZXIucGF0Y2goYXJndW1lbnRzW2ldKTtcbiAgICByZXR1cm4gc291cmNlO1xufTtcbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLmV2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG59XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGF0Y2ggPSBmdW5jdGlvbiBwYXRjaCgpIHtcbiAgICB2YXIgbXlTdGF0ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBrIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChrIGluIG15U3RhdGUgJiYgKGRhdGFba10gJiYgZGF0YVtrXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSAmJiAobXlTdGF0ZVtrXSAmJiBteVN0YXRlW2tdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFteVN0YXRlLmhhc093blByb3BlcnR5KGspKVxuICAgICAgICAgICAgICAgICAgICBteVN0YXRlW2tdID0gT2JqZWN0LmNyZWF0ZShteVN0YXRlW2tdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtleShrKS5wYXRjaChkYXRhW2tdKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudE91dHB1dClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogayxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmtleShrKS52YWx1ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoaywgZGF0YVtrXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBPcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGF0Y2g7XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUua2V5ID0gZnVuY3Rpb24ga2V5KGlkZW50aWZpZXIpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMuX3ZhbHVlW2lkZW50aWZpZXJdKTtcbiAgICBpZiAoIShyZXN1bHQuX3ZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCByZXN1bHQuX3ZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJlc3VsdC5fdmFsdWUgPSB7fTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIGtleSA/IHRoaXMuX3ZhbHVlW2tleV0gOiB0aGlzLl92YWx1ZTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IE9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5nZXQ7XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICB2YXIgb3JpZ2luYWxWYWx1ZSA9IHRoaXMuZ2V0KGtleSk7XG4gICAgdGhpcy5fdmFsdWVba2V5XSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmV2ZW50T3V0cHV0ICYmIHZhbHVlICE9PSBvcmlnaW5hbFZhbHVlKVxuICAgICAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgIGlkOiBrZXksXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy51bnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvbnNNYW5hZ2VyOyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL0VudGl0eScpO1xudmFyIFNwZWNQYXJzZXIgPSByZXF1aXJlKCcuL1NwZWNQYXJzZXInKTtcbmZ1bmN0aW9uIFJlbmRlck5vZGUob2JqZWN0KSB7XG4gICAgdGhpcy5fb2JqZWN0ID0gbnVsbDtcbiAgICB0aGlzLl9jaGlsZCA9IG51bGw7XG4gICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUmVuZGVyYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuX2lzTW9kaWZpZXIgPSBmYWxzZTtcbiAgICB0aGlzLl9yZXN1bHRDYWNoZSA9IHt9O1xuICAgIHRoaXMuX3ByZXZSZXN1bHRzID0ge307XG4gICAgdGhpcy5fY2hpbGRSZXN1bHQgPSBudWxsO1xuICAgIGlmIChvYmplY3QpXG4gICAgICAgIHRoaXMuc2V0KG9iamVjdCk7XG59XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQoY2hpbGQpIHtcbiAgICB2YXIgY2hpbGROb2RlID0gY2hpbGQgaW5zdGFuY2VvZiBSZW5kZXJOb2RlID8gY2hpbGQgOiBuZXcgUmVuZGVyTm9kZShjaGlsZCk7XG4gICAgaWYgKHRoaXMuX2NoaWxkIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHRoaXMuX2NoaWxkLnB1c2goY2hpbGROb2RlKTtcbiAgICBlbHNlIGlmICh0aGlzLl9jaGlsZCkge1xuICAgICAgICB0aGlzLl9jaGlsZCA9IFtcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkLFxuICAgICAgICAgICAgY2hpbGROb2RlXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPSB0cnVlO1xuICAgICAgICB0aGlzLl9jaGlsZFJlc3VsdCA9IFtdO1xuICAgIH0gZWxzZVxuICAgICAgICB0aGlzLl9jaGlsZCA9IGNoaWxkTm9kZTtcbiAgICByZXR1cm4gY2hpbGROb2RlO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2JqZWN0IHx8ICh0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuID8gbnVsbCA6IHRoaXMuX2NoaWxkID8gdGhpcy5fY2hpbGQuZ2V0KCkgOiBudWxsKTtcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoY2hpbGQpIHtcbiAgICB0aGlzLl9jaGlsZFJlc3VsdCA9IG51bGw7XG4gICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUmVuZGVyYWJsZSA9IGNoaWxkLnJlbmRlciA/IHRydWUgOiBmYWxzZTtcbiAgICB0aGlzLl9pc01vZGlmaWVyID0gY2hpbGQubW9kaWZ5ID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuX29iamVjdCA9IGNoaWxkO1xuICAgIHRoaXMuX2NoaWxkID0gbnVsbDtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBSZW5kZXJOb2RlKVxuICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gdGhpcztcbn07XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXQoKTtcbiAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5nZXRTaXplKVxuICAgICAgICByZXN1bHQgPSB0YXJnZXQuZ2V0U2l6ZSgpO1xuICAgIGlmICghcmVzdWx0ICYmIHRoaXMuX2NoaWxkICYmIHRoaXMuX2NoaWxkLmdldFNpemUpXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2NoaWxkLmdldFNpemUoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbmZ1bmN0aW9uIF9hcHBseUNvbW1pdChzcGVjLCBjb250ZXh0LCBjYWNoZVN0b3JhZ2UpIHtcbiAgICB2YXIgcmVzdWx0ID0gU3BlY1BhcnNlci5wYXJzZShzcGVjLCBjb250ZXh0KTtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJlc3VsdCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IGtleXNbaV07XG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSBFbnRpdHkuZ2V0KGlkKTtcbiAgICAgICAgdmFyIGNvbW1pdFBhcmFtcyA9IHJlc3VsdFtpZF07XG4gICAgICAgIGNvbW1pdFBhcmFtcy5hbGxvY2F0b3IgPSBjb250ZXh0LmFsbG9jYXRvcjtcbiAgICAgICAgdmFyIGNvbW1pdFJlc3VsdCA9IGNoaWxkTm9kZS5jb21taXQoY29tbWl0UGFyYW1zKTtcbiAgICAgICAgaWYgKGNvbW1pdFJlc3VsdClcbiAgICAgICAgICAgIF9hcHBseUNvbW1pdChjb21taXRSZXN1bHQsIGNvbnRleHQsIGNhY2hlU3RvcmFnZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGNhY2hlU3RvcmFnZVtpZF0gPSBjb21taXRQYXJhbXM7XG4gICAgfVxufVxuUmVuZGVyTm9kZS5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICB2YXIgcHJldktleXMgPSBPYmplY3Qua2V5cyh0aGlzLl9wcmV2UmVzdWx0cyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmV2S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBwcmV2S2V5c1tpXTtcbiAgICAgICAgaWYgKHRoaXMuX3Jlc3VsdENhY2hlW2lkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gRW50aXR5LmdldChpZCk7XG4gICAgICAgICAgICBpZiAob2JqZWN0LmNsZWFudXApXG4gICAgICAgICAgICAgICAgb2JqZWN0LmNsZWFudXAoY29udGV4dC5hbGxvY2F0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3ByZXZSZXN1bHRzID0gdGhpcy5fcmVzdWx0Q2FjaGU7XG4gICAgdGhpcy5fcmVzdWx0Q2FjaGUgPSB7fTtcbiAgICBfYXBwbHlDb21taXQodGhpcy5yZW5kZXIoKSwgY29udGV4dCwgdGhpcy5fcmVzdWx0Q2FjaGUpO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5faXNSZW5kZXJhYmxlKVxuICAgICAgICByZXR1cm4gdGhpcy5fb2JqZWN0LnJlbmRlcigpO1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGlmICh0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2NoaWxkUmVzdWx0O1xuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLl9jaGlsZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0W2ldID0gY2hpbGRyZW5baV0ucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2NoaWxkKVxuICAgICAgICByZXN1bHQgPSB0aGlzLl9jaGlsZC5yZW5kZXIoKTtcbiAgICByZXR1cm4gdGhpcy5faXNNb2RpZmllciA/IHRoaXMuX29iamVjdC5tb2RpZnkocmVzdWx0KSA6IHJlc3VsdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlck5vZGU7IiwidmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCcuL01vZGlmaWVyJyk7XG52YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJy4vUmVuZGVyTm9kZScpO1xuZnVuY3Rpb24gU2NlbmUoZGVmaW5pdGlvbikge1xuICAgIHRoaXMuaWQgPSBudWxsO1xuICAgIHRoaXMuX29iamVjdHMgPSBudWxsO1xuICAgIHRoaXMubm9kZSA9IG5ldyBSZW5kZXJOb2RlKCk7XG4gICAgdGhpcy5fZGVmaW5pdGlvbiA9IG51bGw7XG4gICAgaWYgKGRlZmluaXRpb24pXG4gICAgICAgIHRoaXMubG9hZChkZWZpbml0aW9uKTtcbn1cbnZhciBfTUFUUklYX0dFTkVSQVRPUlMgPSB7XG4gICAgICAgICd0cmFuc2xhdGUnOiBUcmFuc2Zvcm0udHJhbnNsYXRlLFxuICAgICAgICAncm90YXRlJzogVHJhbnNmb3JtLnJvdGF0ZSxcbiAgICAgICAgJ3JvdGF0ZVgnOiBUcmFuc2Zvcm0ucm90YXRlWCxcbiAgICAgICAgJ3JvdGF0ZVknOiBUcmFuc2Zvcm0ucm90YXRlWSxcbiAgICAgICAgJ3JvdGF0ZVonOiBUcmFuc2Zvcm0ucm90YXRlWixcbiAgICAgICAgJ3JvdGF0ZUF4aXMnOiBUcmFuc2Zvcm0ucm90YXRlQXhpcyxcbiAgICAgICAgJ3NjYWxlJzogVHJhbnNmb3JtLnNjYWxlLFxuICAgICAgICAnc2tldyc6IFRyYW5zZm9ybS5za2V3LFxuICAgICAgICAnbWF0cml4M2QnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzO1xuICAgICAgICB9XG4gICAgfTtcblNjZW5lLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBTY2VuZSh0aGlzLl9kZWZpbml0aW9uKTtcbn07XG5mdW5jdGlvbiBfcmVzb2x2ZVRyYW5zZm9ybU1hdHJpeChtYXRyaXhEZWZpbml0aW9uKSB7XG4gICAgZm9yICh2YXIgdHlwZSBpbiBfTUFUUklYX0dFTkVSQVRPUlMpIHtcbiAgICAgICAgaWYgKHR5cGUgaW4gbWF0cml4RGVmaW5pdGlvbikge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBtYXRyaXhEZWZpbml0aW9uW3R5cGVdO1xuICAgICAgICAgICAgaWYgKCEoYXJncyBpbnN0YW5jZW9mIEFycmF5KSlcbiAgICAgICAgICAgICAgICBhcmdzID0gW2FyZ3NdO1xuICAgICAgICAgICAgcmV0dXJuIF9NQVRSSVhfR0VORVJBVE9SU1t0eXBlXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIF9wYXJzZVRyYW5zZm9ybShkZWZpbml0aW9uKSB7XG4gICAgdmFyIHRyYW5zZm9ybURlZmluaXRpb24gPSBkZWZpbml0aW9uLnRyYW5zZm9ybTtcbiAgICB2YXIgb3BhY2l0eSA9IGRlZmluaXRpb24ub3BhY2l0eTtcbiAgICB2YXIgb3JpZ2luID0gZGVmaW5pdGlvbi5vcmlnaW47XG4gICAgdmFyIGFsaWduID0gZGVmaW5pdGlvbi5hbGlnbjtcbiAgICB2YXIgc2l6ZSA9IGRlZmluaXRpb24uc2l6ZTtcbiAgICB2YXIgdHJhbnNmb3JtID0gVHJhbnNmb3JtLmlkZW50aXR5O1xuICAgIGlmICh0cmFuc2Zvcm1EZWZpbml0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaWYgKHRyYW5zZm9ybURlZmluaXRpb24ubGVuZ3RoID09PSAxNiAmJiB0eXBlb2YgdHJhbnNmb3JtRGVmaW5pdGlvblswXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybURlZmluaXRpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYW5zZm9ybURlZmluaXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubXVsdGlwbHkodHJhbnNmb3JtLCBfcmVzb2x2ZVRyYW5zZm9ybU1hdHJpeCh0cmFuc2Zvcm1EZWZpbml0aW9uW2ldKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRyYW5zZm9ybURlZmluaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICB0cmFuc2Zvcm0gPSB0cmFuc2Zvcm1EZWZpbml0aW9uO1xuICAgIH0gZWxzZSBpZiAodHJhbnNmb3JtRGVmaW5pdGlvbiBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICB0cmFuc2Zvcm0gPSBfcmVzb2x2ZVRyYW5zZm9ybU1hdHJpeCh0cmFuc2Zvcm1EZWZpbml0aW9uKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBNb2RpZmllcih7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHksXG4gICAgICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgICAgIGFsaWduOiBhbGlnbixcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIF9wYXJzZUFycmF5KGRlZmluaXRpb24pIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlZmluaXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG9iaiA9IF9wYXJzZS5jYWxsKHRoaXMsIGRlZmluaXRpb25baV0pO1xuICAgICAgICBpZiAob2JqKVxuICAgICAgICAgICAgcmVzdWx0LmFkZChvYmopO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gX3BhcnNlKGRlZmluaXRpb24pIHtcbiAgICB2YXIgcmVzdWx0O1xuICAgIHZhciBpZDtcbiAgICBpZiAoZGVmaW5pdGlvbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJlc3VsdCA9IF9wYXJzZUFycmF5LmNhbGwodGhpcywgZGVmaW5pdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWQgPSB0aGlzLl9vYmplY3RzLmxlbmd0aDtcbiAgICAgICAgaWYgKGRlZmluaXRpb24ucmVuZGVyICYmIGRlZmluaXRpb24ucmVuZGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGRlZmluaXRpb247XG4gICAgICAgIH0gZWxzZSBpZiAoZGVmaW5pdGlvbi50YXJnZXQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXRPYmogPSBfcGFyc2UuY2FsbCh0aGlzLCBkZWZpbml0aW9uLnRhcmdldCk7XG4gICAgICAgICAgICB2YXIgb2JqID0gX3BhcnNlVHJhbnNmb3JtLmNhbGwodGhpcywgZGVmaW5pdGlvbik7XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgUmVuZGVyTm9kZShvYmopO1xuICAgICAgICAgICAgcmVzdWx0LmFkZCh0YXJnZXRPYmopO1xuICAgICAgICAgICAgaWYgKGRlZmluaXRpb24uaWQpXG4gICAgICAgICAgICAgICAgdGhpcy5pZFtkZWZpbml0aW9uLmlkXSA9IG9iajtcbiAgICAgICAgfSBlbHNlIGlmIChkZWZpbml0aW9uLmlkKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgUmVuZGVyTm9kZSgpO1xuICAgICAgICAgICAgdGhpcy5pZFtkZWZpbml0aW9uLmlkXSA9IHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9vYmplY3RzW2lkXSA9IHJlc3VsdDtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuU2NlbmUucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiBsb2FkKGRlZmluaXRpb24pIHtcbiAgICB0aGlzLl9kZWZpbml0aW9uID0gZGVmaW5pdGlvbjtcbiAgICB0aGlzLmlkID0ge307XG4gICAgdGhpcy5fb2JqZWN0cyA9IFtdO1xuICAgIHRoaXMubm9kZS5zZXQoX3BhcnNlLmNhbGwodGhpcywgZGVmaW5pdGlvbikpO1xufTtcblNjZW5lLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5hZGQuYXBwbHkodGhpcy5ub2RlLCBhcmd1bWVudHMpO1xufTtcblNjZW5lLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubm9kZS5yZW5kZXIuYXBwbHkodGhpcy5ub2RlLCBhcmd1bWVudHMpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU2NlbmU7IiwidmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG5mdW5jdGlvbiBTcGVjUGFyc2VyKCkge1xuICAgIHRoaXMucmVzdWx0ID0ge307XG59XG5TcGVjUGFyc2VyLl9pbnN0YW5jZSA9IG5ldyBTcGVjUGFyc2VyKCk7XG5TcGVjUGFyc2VyLnBhcnNlID0gZnVuY3Rpb24gcGFyc2Uoc3BlYywgY29udGV4dCkge1xuICAgIHJldHVybiBTcGVjUGFyc2VyLl9pbnN0YW5jZS5wYXJzZShzcGVjLCBjb250ZXh0KTtcbn07XG5TcGVjUGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKHNwZWMsIGNvbnRleHQpIHtcbiAgICB0aGlzLnJlc2V0KCk7XG4gICAgdGhpcy5fcGFyc2VTcGVjKHNwZWMsIGNvbnRleHQsIFRyYW5zZm9ybS5pZGVudGl0eSk7XG4gICAgcmV0dXJuIHRoaXMucmVzdWx0O1xufTtcblNwZWNQYXJzZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSB7fTtcbn07XG5mdW5jdGlvbiBfdmVjSW5Db250ZXh0KHYsIG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB2WzBdICogbVswXSArIHZbMV0gKiBtWzRdICsgdlsyXSAqIG1bOF0sXG4gICAgICAgIHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XSxcbiAgICAgICAgdlswXSAqIG1bMl0gKyB2WzFdICogbVs2XSArIHZbMl0gKiBtWzEwXVxuICAgIF07XG59XG52YXIgX3plcm9aZXJvID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcblNwZWNQYXJzZXIucHJvdG90eXBlLl9wYXJzZVNwZWMgPSBmdW5jdGlvbiBfcGFyc2VTcGVjKHNwZWMsIHBhcmVudENvbnRleHQsIHNpemVDb250ZXh0KSB7XG4gICAgdmFyIGlkO1xuICAgIHZhciB0YXJnZXQ7XG4gICAgdmFyIHRyYW5zZm9ybTtcbiAgICB2YXIgb3BhY2l0eTtcbiAgICB2YXIgb3JpZ2luO1xuICAgIHZhciBhbGlnbjtcbiAgICB2YXIgc2l6ZTtcbiAgICBpZiAodHlwZW9mIHNwZWMgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlkID0gc3BlYztcbiAgICAgICAgdHJhbnNmb3JtID0gcGFyZW50Q29udGV4dC50cmFuc2Zvcm07XG4gICAgICAgIGFsaWduID0gcGFyZW50Q29udGV4dC5hbGlnbiB8fCBfemVyb1plcm87XG4gICAgICAgIGlmIChwYXJlbnRDb250ZXh0LnNpemUgJiYgYWxpZ24gJiYgKGFsaWduWzBdIHx8IGFsaWduWzFdKSkge1xuICAgICAgICAgICAgdmFyIGFsaWduQWRqdXN0ID0gW1xuICAgICAgICAgICAgICAgICAgICBhbGlnblswXSAqIHBhcmVudENvbnRleHQuc2l6ZVswXSxcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25bMV0gKiBwYXJlbnRDb250ZXh0LnNpemVbMV0sXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLnRoZW5Nb3ZlKHRyYW5zZm9ybSwgX3ZlY0luQ29udGV4dChhbGlnbkFkanVzdCwgc2l6ZUNvbnRleHQpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3VsdFtpZF0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9wYWNpdHk6IHBhcmVudENvbnRleHQub3BhY2l0eSxcbiAgICAgICAgICAgIG9yaWdpbjogcGFyZW50Q29udGV4dC5vcmlnaW4gfHwgX3plcm9aZXJvLFxuICAgICAgICAgICAgYWxpZ246IHBhcmVudENvbnRleHQuYWxpZ24gfHwgX3plcm9aZXJvLFxuICAgICAgICAgICAgc2l6ZTogcGFyZW50Q29udGV4dC5zaXplXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICghc3BlYykge1xuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChzcGVjIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzcGVjLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJzZVNwZWMoc3BlY1tpXSwgcGFyZW50Q29udGV4dCwgc2l6ZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gc3BlYy50YXJnZXQ7XG4gICAgICAgIHRyYW5zZm9ybSA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICBvcGFjaXR5ID0gcGFyZW50Q29udGV4dC5vcGFjaXR5O1xuICAgICAgICBvcmlnaW4gPSBwYXJlbnRDb250ZXh0Lm9yaWdpbjtcbiAgICAgICAgYWxpZ24gPSBwYXJlbnRDb250ZXh0LmFsaWduO1xuICAgICAgICBzaXplID0gcGFyZW50Q29udGV4dC5zaXplO1xuICAgICAgICB2YXIgbmV4dFNpemVDb250ZXh0ID0gc2l6ZUNvbnRleHQ7XG4gICAgICAgIGlmIChzcGVjLm9wYWNpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG9wYWNpdHkgPSBwYXJlbnRDb250ZXh0Lm9wYWNpdHkgKiBzcGVjLm9wYWNpdHk7XG4gICAgICAgIGlmIChzcGVjLnRyYW5zZm9ybSlcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tdWx0aXBseShwYXJlbnRDb250ZXh0LnRyYW5zZm9ybSwgc3BlYy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAoc3BlYy5vcmlnaW4pIHtcbiAgICAgICAgICAgIG9yaWdpbiA9IHNwZWMub3JpZ2luO1xuICAgICAgICAgICAgbmV4dFNpemVDb250ZXh0ID0gcGFyZW50Q29udGV4dC50cmFuc2Zvcm07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwZWMuYWxpZ24pXG4gICAgICAgICAgICBhbGlnbiA9IHNwZWMuYWxpZ247XG4gICAgICAgIGlmIChzcGVjLnNpemUgfHwgc3BlYy5wcm9wb3J0aW9ucykge1xuICAgICAgICAgICAgdmFyIHBhcmVudFNpemUgPSBzaXplO1xuICAgICAgICAgICAgc2l6ZSA9IFtcbiAgICAgICAgICAgICAgICBzaXplWzBdLFxuICAgICAgICAgICAgICAgIHNpemVbMV1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAoc3BlYy5zaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWMuc2l6ZVswXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICBzaXplWzBdID0gc3BlYy5zaXplWzBdO1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnNpemVbMV0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVsxXSA9IHNwZWMuc2l6ZVsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcGVjLnByb3BvcnRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWMucHJvcG9ydGlvbnNbMF0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgc2l6ZVswXSA9IHNpemVbMF0gKiBzcGVjLnByb3BvcnRpb25zWzBdO1xuICAgICAgICAgICAgICAgIGlmIChzcGVjLnByb3BvcnRpb25zWzFdICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMV0gPSBzaXplWzFdICogc3BlYy5wcm9wb3J0aW9uc1sxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFsaWduICYmIChhbGlnblswXSB8fCBhbGlnblsxXSkpXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS50aGVuTW92ZSh0cmFuc2Zvcm0sIF92ZWNJbkNvbnRleHQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25bMF0gKiBwYXJlbnRTaXplWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25bMV0gKiBwYXJlbnRTaXplWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICBdLCBzaXplQ29udGV4dCkpO1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW4gJiYgKG9yaWdpblswXSB8fCBvcmlnaW5bMV0pKVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubW92ZVRoZW4oW1xuICAgICAgICAgICAgICAgICAgICAgICAgLW9yaWdpblswXSAqIHNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAtb3JpZ2luWzFdICogc2l6ZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgXSwgdHJhbnNmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHRTaXplQ29udGV4dCA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICAgICAgb3JpZ2luID0gbnVsbDtcbiAgICAgICAgICAgIGFsaWduID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXJzZVNwZWModGFyZ2V0LCB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHksXG4gICAgICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgICAgIGFsaWduOiBhbGlnbixcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfSwgbmV4dFNpemVDb250ZXh0KTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTcGVjUGFyc2VyOyIsInZhciBFbGVtZW50T3V0cHV0ID0gcmVxdWlyZSgnLi9FbGVtZW50T3V0cHV0Jyk7XG5mdW5jdGlvbiBTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICBFbGVtZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gICAgdGhpcy5jb250ZW50ID0gJyc7XG4gICAgdGhpcy5jbGFzc0xpc3QgPSBbXTtcbiAgICB0aGlzLnNpemUgPSBudWxsO1xuICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc3R5bGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIHRoaXMuX2RpcnR5Q2xhc3NlcyA9IFtdO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IG51bGw7XG59XG5TdXJmYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRWxlbWVudE91dHB1dC5wcm90b3R5cGUpO1xuU3VyZmFjZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTdXJmYWNlO1xuU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAnZGl2JztcblN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRDbGFzcyA9ICdmYW1vdXMtc3VyZmFjZSc7XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVzID0gZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG4gICAgZm9yICh2YXIgbiBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChuID09PSAnc3R5bGUnKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2V0IHN0eWxlcyB2aWEgXCJzZXRBdHRyaWJ1dGVzXCIgYXMgaXQgd2lsbCBicmVhayBGYW1vLnVzLiAgVXNlIFwic2V0UHJvcGVydGllc1wiIGluc3RlYWQuJyk7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlc1tuXSA9IGF0dHJpYnV0ZXNbbl07XG4gICAgfVxuICAgIHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSA9IHRydWU7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0QXR0cmlidXRlcyA9IGZ1bmN0aW9uIGdldEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXR0cmlidXRlcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gc2V0UHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgZm9yICh2YXIgbiBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRoaXMucHJvcGVydGllc1tuXSA9IHByb3BlcnRpZXNbbl07XG4gICAgfVxuICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZ2V0UHJvcGVydGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKHRoaXMuY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKSA8IDApIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucHVzaChjbGFzc05hbWUpO1xuICAgICAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5jbGFzc0xpc3QuaW5kZXhPZihjbGFzc05hbWUpO1xuICAgIGlmIChpID49IDApIHtcbiAgICAgICAgdGhpcy5fZGlydHlDbGFzc2VzLnB1c2godGhpcy5jbGFzc0xpc3Quc3BsaWNlKGksIDEpWzBdKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbiB0b2dnbGVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZENsYXNzKGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldENsYXNzZXMgPSBmdW5jdGlvbiBzZXRDbGFzc2VzKGNsYXNzTGlzdCkge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVtb3ZhbCA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmNsYXNzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY2xhc3NMaXN0LmluZGV4T2YodGhpcy5jbGFzc0xpc3RbaV0pIDwgMClcbiAgICAgICAgICAgIHJlbW92YWwucHVzaCh0aGlzLmNsYXNzTGlzdFtpXSk7XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCByZW1vdmFsLmxlbmd0aDsgaSsrKVxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKHJlbW92YWxbaV0pO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoY2xhc3NMaXN0W2ldKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRDbGFzc0xpc3QgPSBmdW5jdGlvbiBnZXRDbGFzc0xpc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3NMaXN0O1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICBpZiAodGhpcy5jb250ZW50ICE9PSBjb250ZW50KSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmdldENvbnRlbnQgPSBmdW5jdGlvbiBnZXRDb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRlbnQ7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLnNpemUpXG4gICAgICAgIHRoaXMuc2V0U2l6ZShvcHRpb25zLnNpemUpO1xuICAgIGlmIChvcHRpb25zLmNsYXNzZXMpXG4gICAgICAgIHRoaXMuc2V0Q2xhc3NlcyhvcHRpb25zLmNsYXNzZXMpO1xuICAgIGlmIChvcHRpb25zLnByb3BlcnRpZXMpXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhvcHRpb25zLnByb3BlcnRpZXMpO1xuICAgIGlmIChvcHRpb25zLmF0dHJpYnV0ZXMpXG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlcyhvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICAgIGlmIChvcHRpb25zLmNvbnRlbnQpXG4gICAgICAgIHRoaXMuc2V0Q29udGVudChvcHRpb25zLmNvbnRlbnQpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbmZ1bmN0aW9uIF9jbGVhbnVwQ2xhc3Nlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2RpcnR5Q2xhc3Nlcy5sZW5ndGg7IGkrKylcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fZGlydHlDbGFzc2VzW2ldKTtcbiAgICB0aGlzLl9kaXJ0eUNsYXNzZXMgPSBbXTtcbn1cbmZ1bmN0aW9uIF9hcHBseVN0eWxlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICB0YXJnZXQuc3R5bGVbbl0gPSB0aGlzLnByb3BlcnRpZXNbbl07XG4gICAgfVxufVxuZnVuY3Rpb24gX2NsZWFudXBTdHlsZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlW25dID0gJyc7XG4gICAgfVxufVxuZnVuY3Rpb24gX2FwcGx5QXR0cmlidXRlcyh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBuIGluIHRoaXMuYXR0cmlidXRlcykge1xuICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKG4sIHRoaXMuYXR0cmlidXRlc1tuXSk7XG4gICAgfVxufVxuZnVuY3Rpb24gX2NsZWFudXBBdHRyaWJ1dGVzKHRhcmdldCkge1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5hdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobik7XG4gICAgfVxufVxuZnVuY3Rpb24gX3h5Tm90RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYSAmJiBiID8gYVswXSAhPT0gYlswXSB8fCBhWzFdICE9PSBiWzFdIDogYSAhPT0gYjtcbn1cblN1cmZhY2UucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24gc2V0dXAoYWxsb2NhdG9yKSB7XG4gICAgdmFyIHRhcmdldCA9IGFsbG9jYXRvci5hbGxvY2F0ZSh0aGlzLmVsZW1lbnRUeXBlKTtcbiAgICBpZiAodGhpcy5lbGVtZW50Q2xhc3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudENsYXNzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50Q2xhc3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmVsZW1lbnRDbGFzc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCh0aGlzLmVsZW1lbnRDbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGFyZ2V0LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB0aGlzLmF0dGFjaCh0YXJnZXQpO1xuICAgIHRoaXMuX29wYWNpdHkgPSBudWxsO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSB0YXJnZXQ7XG4gICAgdGhpcy5fc3R5bGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fYXR0cmlidXRlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fb3JpZ2luRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3RyYW5zZm9ybURpcnR5ID0gdHJ1ZTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIGlmICghdGhpcy5fY3VycmVudFRhcmdldClcbiAgICAgICAgdGhpcy5zZXR1cChjb250ZXh0LmFsbG9jYXRvcik7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX2N1cnJlbnRUYXJnZXQ7XG4gICAgdmFyIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgaWYgKHRoaXMuX2NsYXNzZXNEaXJ0eSkge1xuICAgICAgICBfY2xlYW51cENsYXNzZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB2YXIgY2xhc3NMaXN0ID0gdGhpcy5nZXRDbGFzc0xpc3QoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChjbGFzc0xpc3RbaV0pO1xuICAgICAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zdHlsZXNEaXJ0eSkge1xuICAgICAgICBfYXBwbHlTdHlsZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgICAgICB0aGlzLl9zdHlsZXNEaXJ0eSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl90cnVlU2l6ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2F0dHJpYnV0ZXNEaXJ0eSkge1xuICAgICAgICBfYXBwbHlBdHRyaWJ1dGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fYXR0cmlidXRlc0RpcnR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3RydWVTaXplQ2hlY2sgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgIHZhciBvcmlnU2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICAgICAgc2l6ZSA9IFtcbiAgICAgICAgICAgIHRoaXMuc2l6ZVswXSxcbiAgICAgICAgICAgIHRoaXMuc2l6ZVsxXVxuICAgICAgICBdO1xuICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2l6ZVswXSA9IG9yaWdTaXplWzBdO1xuICAgICAgICBpZiAoc2l6ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgc2l6ZVsxXSA9IG9yaWdTaXplWzFdO1xuICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdHJ1ZSB8fCBzaXplWzFdID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoc2l6ZVswXSA9PT0gdHJ1ZSAmJiAodGhpcy5fdHJ1ZVNpemVDaGVjayB8fCB0aGlzLl9zaXplWzBdID09PSAwKSkge1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHRhcmdldC5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2l6ZSAmJiB0aGlzLl9zaXplWzBdICE9PSB3aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaXplWzBdID0gd2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNpemVbMF0gPSB3aWR0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMF0gPSB0aGlzLl9zaXplWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNpemVbMV0gPT09IHRydWUgJiYgKHRoaXMuX3RydWVTaXplQ2hlY2sgfHwgdGhpcy5fc2l6ZVsxXSA9PT0gMCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gdGFyZ2V0LmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2l6ZSAmJiB0aGlzLl9zaXplWzFdICE9PSBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2l6ZVsxXSA9IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2l6ZVsxXSA9IGhlaWdodDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NpemUpXG4gICAgICAgICAgICAgICAgICAgIHNpemVbMV0gPSB0aGlzLl9zaXplWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChfeHlOb3RFcXVhbHModGhpcy5fc2l6ZSwgc2l6ZSkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9zaXplKVxuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF07XG4gICAgICAgIHRoaXMuX3NpemVbMF0gPSBzaXplWzBdO1xuICAgICAgICB0aGlzLl9zaXplWzFdID0gc2l6ZVsxXTtcbiAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NpemVEaXJ0eSkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZSkge1xuICAgICAgICAgICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gdGhpcy5zaXplICYmIHRoaXMuc2l6ZVswXSA9PT0gdHJ1ZSA/ICcnIDogdGhpcy5fc2l6ZVswXSArICdweCc7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUuaGVpZ2h0ID0gdGhpcy5zaXplICYmIHRoaXMuc2l6ZVsxXSA9PT0gdHJ1ZSA/ICcnIDogdGhpcy5fc2l6ZVsxXSArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncmVzaXplJyk7XG4gICAgICAgIHRoaXMuX3NpemVEaXJ0eSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY29udGVudERpcnR5KSB7XG4gICAgICAgIHRoaXMuZGVwbG95KHRhcmdldCk7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2RlcGxveScpO1xuICAgICAgICB0aGlzLl9jb250ZW50RGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdHJ1ZVNpemVDaGVjayA9IHRydWU7XG4gICAgfVxuICAgIEVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmNvbW1pdC5jYWxsKHRoaXMsIGNvbnRleHQpO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiBjbGVhbnVwKGFsbG9jYXRvcikge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdyZWNhbGwnKTtcbiAgICB0aGlzLnJlY2FsbCh0YXJnZXQpO1xuICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRhcmdldC5zdHlsZS5vcGFjaXR5ID0gJyc7XG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gJyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcnO1xuICAgIF9jbGVhbnVwU3R5bGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICBfY2xlYW51cEF0dHJpYnV0ZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgIHZhciBjbGFzc0xpc3QgPSB0aGlzLmdldENsYXNzTGlzdCgpO1xuICAgIF9jbGVhbnVwQ2xhc3Nlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgZm9yIChpID0gMDsgaSA8IGNsYXNzTGlzdC5sZW5ndGg7IGkrKylcbiAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NMaXN0W2ldKTtcbiAgICBpZiAodGhpcy5lbGVtZW50Q2xhc3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudENsYXNzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRDbGFzcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZWxlbWVudENsYXNzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZWxlbWVudENsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRldGFjaCh0YXJnZXQpO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBudWxsO1xuICAgIGFsbG9jYXRvci5kZWFsbG9jYXRlKHRhcmdldCk7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gZGVwbG95KHRhcmdldCkge1xuICAgIHZhciBjb250ZW50ID0gdGhpcy5nZXRDb250ZW50KCk7XG4gICAgaWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIHdoaWxlICh0YXJnZXQuaGFzQ2hpbGROb2RlcygpKVxuICAgICAgICAgICAgdGFyZ2V0LnJlbW92ZUNoaWxkKHRhcmdldC5maXJzdENoaWxkKTtcbiAgICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH0gZWxzZVxuICAgICAgICB0YXJnZXQuaW5uZXJIVE1MID0gY29udGVudDtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5yZWNhbGwgPSBmdW5jdGlvbiByZWNhbGwodGFyZ2V0KSB7XG4gICAgdmFyIGRmID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlICh0YXJnZXQuaGFzQ2hpbGROb2RlcygpKVxuICAgICAgICBkZi5hcHBlbmRDaGlsZCh0YXJnZXQuZmlyc3RDaGlsZCk7XG4gICAgdGhpcy5zZXRDb250ZW50KGRmKTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZSA/IHRoaXMuX3NpemUgOiB0aGlzLnNpemU7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSkge1xuICAgIHRoaXMuc2l6ZSA9IHNpemUgPyBbXG4gICAgICAgIHNpemVbMF0sXG4gICAgICAgIHNpemVbMV1cbiAgICBdIDogbnVsbDtcbiAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3VyZmFjZTsiLCJ2YXIgVHJhbnNmb3JtID0ge307XG5UcmFuc2Zvcm0ucHJlY2lzaW9uID0gMC4wMDAwMDE7XG5UcmFuc2Zvcm0uaWRlbnRpdHkgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMVxuXTtcblRyYW5zZm9ybS5tdWx0aXBseTR4NCA9IGZ1bmN0aW9uIG11bHRpcGx5NHg0KGEsIGIpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBhWzBdICogYlswXSArIGFbNF0gKiBiWzFdICsgYVs4XSAqIGJbMl0gKyBhWzEyXSAqIGJbM10sXG4gICAgICAgIGFbMV0gKiBiWzBdICsgYVs1XSAqIGJbMV0gKyBhWzldICogYlsyXSArIGFbMTNdICogYlszXSxcbiAgICAgICAgYVsyXSAqIGJbMF0gKyBhWzZdICogYlsxXSArIGFbMTBdICogYlsyXSArIGFbMTRdICogYlszXSxcbiAgICAgICAgYVszXSAqIGJbMF0gKyBhWzddICogYlsxXSArIGFbMTFdICogYlsyXSArIGFbMTVdICogYlszXSxcbiAgICAgICAgYVswXSAqIGJbNF0gKyBhWzRdICogYls1XSArIGFbOF0gKiBiWzZdICsgYVsxMl0gKiBiWzddLFxuICAgICAgICBhWzFdICogYls0XSArIGFbNV0gKiBiWzVdICsgYVs5XSAqIGJbNl0gKyBhWzEzXSAqIGJbN10sXG4gICAgICAgIGFbMl0gKiBiWzRdICsgYVs2XSAqIGJbNV0gKyBhWzEwXSAqIGJbNl0gKyBhWzE0XSAqIGJbN10sXG4gICAgICAgIGFbM10gKiBiWzRdICsgYVs3XSAqIGJbNV0gKyBhWzExXSAqIGJbNl0gKyBhWzE1XSAqIGJbN10sXG4gICAgICAgIGFbMF0gKiBiWzhdICsgYVs0XSAqIGJbOV0gKyBhWzhdICogYlsxMF0gKyBhWzEyXSAqIGJbMTFdLFxuICAgICAgICBhWzFdICogYls4XSArIGFbNV0gKiBiWzldICsgYVs5XSAqIGJbMTBdICsgYVsxM10gKiBiWzExXSxcbiAgICAgICAgYVsyXSAqIGJbOF0gKyBhWzZdICogYls5XSArIGFbMTBdICogYlsxMF0gKyBhWzE0XSAqIGJbMTFdLFxuICAgICAgICBhWzNdICogYls4XSArIGFbN10gKiBiWzldICsgYVsxMV0gKiBiWzEwXSArIGFbMTVdICogYlsxMV0sXG4gICAgICAgIGFbMF0gKiBiWzEyXSArIGFbNF0gKiBiWzEzXSArIGFbOF0gKiBiWzE0XSArIGFbMTJdICogYlsxNV0sXG4gICAgICAgIGFbMV0gKiBiWzEyXSArIGFbNV0gKiBiWzEzXSArIGFbOV0gKiBiWzE0XSArIGFbMTNdICogYlsxNV0sXG4gICAgICAgIGFbMl0gKiBiWzEyXSArIGFbNl0gKiBiWzEzXSArIGFbMTBdICogYlsxNF0gKyBhWzE0XSAqIGJbMTVdLFxuICAgICAgICBhWzNdICogYlsxMl0gKyBhWzddICogYlsxM10gKyBhWzExXSAqIGJbMTRdICsgYVsxNV0gKiBiWzE1XVxuICAgIF07XG59O1xuVHJhbnNmb3JtLm11bHRpcGx5ID0gZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGFbMF0gKiBiWzBdICsgYVs0XSAqIGJbMV0gKyBhWzhdICogYlsyXSxcbiAgICAgICAgYVsxXSAqIGJbMF0gKyBhWzVdICogYlsxXSArIGFbOV0gKiBiWzJdLFxuICAgICAgICBhWzJdICogYlswXSArIGFbNl0gKiBiWzFdICsgYVsxMF0gKiBiWzJdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYls0XSArIGFbNF0gKiBiWzVdICsgYVs4XSAqIGJbNl0sXG4gICAgICAgIGFbMV0gKiBiWzRdICsgYVs1XSAqIGJbNV0gKyBhWzldICogYls2XSxcbiAgICAgICAgYVsyXSAqIGJbNF0gKyBhWzZdICogYls1XSArIGFbMTBdICogYls2XSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbOF0gKyBhWzRdICogYls5XSArIGFbOF0gKiBiWzEwXSxcbiAgICAgICAgYVsxXSAqIGJbOF0gKyBhWzVdICogYls5XSArIGFbOV0gKiBiWzEwXSxcbiAgICAgICAgYVsyXSAqIGJbOF0gKyBhWzZdICogYls5XSArIGFbMTBdICogYlsxMF0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzEyXSArIGFbNF0gKiBiWzEzXSArIGFbOF0gKiBiWzE0XSArIGFbMTJdLFxuICAgICAgICBhWzFdICogYlsxMl0gKyBhWzVdICogYlsxM10gKyBhWzldICogYlsxNF0gKyBhWzEzXSxcbiAgICAgICAgYVsyXSAqIGJbMTJdICsgYVs2XSAqIGJbMTNdICsgYVsxMF0gKiBiWzE0XSArIGFbMTRdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0udGhlbk1vdmUgPSBmdW5jdGlvbiB0aGVuTW92ZShtLCB0KSB7XG4gICAgaWYgKCF0WzJdKVxuICAgICAgICB0WzJdID0gMDtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzBdLFxuICAgICAgICBtWzFdLFxuICAgICAgICBtWzJdLFxuICAgICAgICAwLFxuICAgICAgICBtWzRdLFxuICAgICAgICBtWzVdLFxuICAgICAgICBtWzZdLFxuICAgICAgICAwLFxuICAgICAgICBtWzhdLFxuICAgICAgICBtWzldLFxuICAgICAgICBtWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgbVsxMl0gKyB0WzBdLFxuICAgICAgICBtWzEzXSArIHRbMV0sXG4gICAgICAgIG1bMTRdICsgdFsyXSxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLm1vdmVUaGVuID0gZnVuY3Rpb24gbW92ZVRoZW4odiwgbSkge1xuICAgIGlmICghdlsyXSlcbiAgICAgICAgdlsyXSA9IDA7XG4gICAgdmFyIHQwID0gdlswXSAqIG1bMF0gKyB2WzFdICogbVs0XSArIHZbMl0gKiBtWzhdO1xuICAgIHZhciB0MSA9IHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XTtcbiAgICB2YXIgdDIgPSB2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUobSwgW1xuICAgICAgICB0MCxcbiAgICAgICAgdDEsXG4gICAgICAgIHQyXG4gICAgXSk7XG59O1xuVHJhbnNmb3JtLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIHRyYW5zbGF0ZSh4LCB5LCB6KSB7XG4gICAgaWYgKHogPT09IHVuZGVmaW5lZClcbiAgICAgICAgeiA9IDA7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgeixcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnRoZW5TY2FsZSA9IGZ1bmN0aW9uIHRoZW5TY2FsZShtLCBzKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgc1swXSAqIG1bMF0sXG4gICAgICAgIHNbMV0gKiBtWzFdLFxuICAgICAgICBzWzJdICogbVsyXSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bNF0sXG4gICAgICAgIHNbMV0gKiBtWzVdLFxuICAgICAgICBzWzJdICogbVs2XSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bOF0sXG4gICAgICAgIHNbMV0gKiBtWzldLFxuICAgICAgICBzWzJdICogbVsxMF0sXG4gICAgICAgIDAsXG4gICAgICAgIHNbMF0gKiBtWzEyXSxcbiAgICAgICAgc1sxXSAqIG1bMTNdLFxuICAgICAgICBzWzJdICogbVsxNF0sXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5zY2FsZSA9IGZ1bmN0aW9uIHNjYWxlKHgsIHksIHopIHtcbiAgICBpZiAoeiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB6ID0gMTtcbiAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB5ID0geDtcbiAgICByZXR1cm4gW1xuICAgICAgICB4LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICB5LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICB6LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlWCA9IGZ1bmN0aW9uIHJvdGF0ZVgodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgLXNpblRoZXRhLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZVkgPSBmdW5jdGlvbiByb3RhdGVZKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgLXNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGVaID0gZnVuY3Rpb24gcm90YXRlWih0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlID0gZnVuY3Rpb24gcm90YXRlKHBoaSwgdGhldGEsIHBzaSkge1xuICAgIHZhciBjb3NQaGkgPSBNYXRoLmNvcyhwaGkpO1xuICAgIHZhciBzaW5QaGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgdmFyIGNvc1BzaSA9IE1hdGguY29zKHBzaSk7XG4gICAgdmFyIHNpblBzaSA9IE1hdGguc2luKHBzaSk7XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIGNvc1RoZXRhICogY29zUHNpLFxuICAgICAgICAgICAgY29zUGhpICogc2luUHNpICsgc2luUGhpICogc2luVGhldGEgKiBjb3NQc2ksXG4gICAgICAgICAgICBzaW5QaGkgKiBzaW5Qc2kgLSBjb3NQaGkgKiBzaW5UaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAtY29zVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgICAgICBjb3NQaGkgKiBjb3NQc2kgLSBzaW5QaGkgKiBzaW5UaGV0YSAqIHNpblBzaSxcbiAgICAgICAgICAgIHNpblBoaSAqIGNvc1BzaSArIGNvc1BoaSAqIHNpblRoZXRhICogc2luUHNpLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHNpblRoZXRhLFxuICAgICAgICAgICAgLXNpblBoaSAqIGNvc1RoZXRhLFxuICAgICAgICAgICAgY29zUGhpICogY29zVGhldGEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLnJvdGF0ZUF4aXMgPSBmdW5jdGlvbiByb3RhdGVBeGlzKHYsIHRoZXRhKSB7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgdmVyVGhldGEgPSAxIC0gY29zVGhldGE7XG4gICAgdmFyIHh4ViA9IHZbMF0gKiB2WzBdICogdmVyVGhldGE7XG4gICAgdmFyIHh5ViA9IHZbMF0gKiB2WzFdICogdmVyVGhldGE7XG4gICAgdmFyIHh6ViA9IHZbMF0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHl5ViA9IHZbMV0gKiB2WzFdICogdmVyVGhldGE7XG4gICAgdmFyIHl6ViA9IHZbMV0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHp6ViA9IHZbMl0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHhzID0gdlswXSAqIHNpblRoZXRhO1xuICAgIHZhciB5cyA9IHZbMV0gKiBzaW5UaGV0YTtcbiAgICB2YXIgenMgPSB2WzJdICogc2luVGhldGE7XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIHh4ViArIGNvc1RoZXRhLFxuICAgICAgICAgICAgeHlWICsgenMsXG4gICAgICAgICAgICB4elYgLSB5cyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB4eVYgLSB6cyxcbiAgICAgICAgICAgIHl5ViArIGNvc1RoZXRhLFxuICAgICAgICAgICAgeXpWICsgeHMsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgeHpWICsgeXMsXG4gICAgICAgICAgICB5elYgLSB4cyxcbiAgICAgICAgICAgIHp6ViArIGNvc1RoZXRhLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5hYm91dE9yaWdpbiA9IGZ1bmN0aW9uIGFib3V0T3JpZ2luKHYsIG0pIHtcbiAgICB2YXIgdDAgPSB2WzBdIC0gKHZbMF0gKiBtWzBdICsgdlsxXSAqIG1bNF0gKyB2WzJdICogbVs4XSk7XG4gICAgdmFyIHQxID0gdlsxXSAtICh2WzBdICogbVsxXSArIHZbMV0gKiBtWzVdICsgdlsyXSAqIG1bOV0pO1xuICAgIHZhciB0MiA9IHZbMl0gLSAodlswXSAqIG1bMl0gKyB2WzFdICogbVs2XSArIHZbMl0gKiBtWzEwXSk7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShtLCBbXG4gICAgICAgIHQwLFxuICAgICAgICB0MSxcbiAgICAgICAgdDJcbiAgICBdKTtcbn07XG5UcmFuc2Zvcm0uc2tldyA9IGZ1bmN0aW9uIHNrZXcocGhpLCB0aGV0YSwgcHNpKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC50YW4odGhldGEpLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihwc2kpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihwaGkpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uc2tld1ggPSBmdW5jdGlvbiBza2V3WChhbmdsZSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKGFuZ2xlKSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNrZXdZID0gZnVuY3Rpb24gc2tld1koYW5nbGUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICBNYXRoLnRhbihhbmdsZSksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5wZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIHBlcnNwZWN0aXZlKGZvY3VzWikge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIC0xIC8gZm9jdXNaLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzEyXSxcbiAgICAgICAgbVsxM10sXG4gICAgICAgIG1bMTRdXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uaW52ZXJzZSA9IGZ1bmN0aW9uIGludmVyc2UobSkge1xuICAgIHZhciBjMCA9IG1bNV0gKiBtWzEwXSAtIG1bNl0gKiBtWzldO1xuICAgIHZhciBjMSA9IG1bNF0gKiBtWzEwXSAtIG1bNl0gKiBtWzhdO1xuICAgIHZhciBjMiA9IG1bNF0gKiBtWzldIC0gbVs1XSAqIG1bOF07XG4gICAgdmFyIGM0ID0gbVsxXSAqIG1bMTBdIC0gbVsyXSAqIG1bOV07XG4gICAgdmFyIGM1ID0gbVswXSAqIG1bMTBdIC0gbVsyXSAqIG1bOF07XG4gICAgdmFyIGM2ID0gbVswXSAqIG1bOV0gLSBtWzFdICogbVs4XTtcbiAgICB2YXIgYzggPSBtWzFdICogbVs2XSAtIG1bMl0gKiBtWzVdO1xuICAgIHZhciBjOSA9IG1bMF0gKiBtWzZdIC0gbVsyXSAqIG1bNF07XG4gICAgdmFyIGMxMCA9IG1bMF0gKiBtWzVdIC0gbVsxXSAqIG1bNF07XG4gICAgdmFyIGRldE0gPSBtWzBdICogYzAgLSBtWzFdICogYzEgKyBtWzJdICogYzI7XG4gICAgdmFyIGludkQgPSAxIC8gZGV0TTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgaW52RCAqIGMwLFxuICAgICAgICAgICAgLWludkQgKiBjNCxcbiAgICAgICAgICAgIGludkQgKiBjOCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAtaW52RCAqIGMxLFxuICAgICAgICAgICAgaW52RCAqIGM1LFxuICAgICAgICAgICAgLWludkQgKiBjOSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBpbnZEICogYzIsXG4gICAgICAgICAgICAtaW52RCAqIGM2LFxuICAgICAgICAgICAgaW52RCAqIGMxMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgcmVzdWx0WzEyXSA9IC1tWzEyXSAqIHJlc3VsdFswXSAtIG1bMTNdICogcmVzdWx0WzRdIC0gbVsxNF0gKiByZXN1bHRbOF07XG4gICAgcmVzdWx0WzEzXSA9IC1tWzEyXSAqIHJlc3VsdFsxXSAtIG1bMTNdICogcmVzdWx0WzVdIC0gbVsxNF0gKiByZXN1bHRbOV07XG4gICAgcmVzdWx0WzE0XSA9IC1tWzEyXSAqIHJlc3VsdFsyXSAtIG1bMTNdICogcmVzdWx0WzZdIC0gbVsxNF0gKiByZXN1bHRbMTBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLnRyYW5zcG9zZSA9IGZ1bmN0aW9uIHRyYW5zcG9zZShtKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbVswXSxcbiAgICAgICAgbVs0XSxcbiAgICAgICAgbVs4XSxcbiAgICAgICAgbVsxMl0sXG4gICAgICAgIG1bMV0sXG4gICAgICAgIG1bNV0sXG4gICAgICAgIG1bOV0sXG4gICAgICAgIG1bMTNdLFxuICAgICAgICBtWzJdLFxuICAgICAgICBtWzZdLFxuICAgICAgICBtWzEwXSxcbiAgICAgICAgbVsxNF0sXG4gICAgICAgIG1bM10sXG4gICAgICAgIG1bN10sXG4gICAgICAgIG1bMTFdLFxuICAgICAgICBtWzE1XVxuICAgIF07XG59O1xuZnVuY3Rpb24gX25vcm1TcXVhcmVkKHYpIHtcbiAgICByZXR1cm4gdi5sZW5ndGggPT09IDIgPyB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdIDogdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdO1xufVxuZnVuY3Rpb24gX25vcm0odikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoX25vcm1TcXVhcmVkKHYpKTtcbn1cbmZ1bmN0aW9uIF9zaWduKG4pIHtcbiAgICByZXR1cm4gbiA8IDAgPyAtMSA6IDE7XG59XG5UcmFuc2Zvcm0uaW50ZXJwcmV0ID0gZnVuY3Rpb24gaW50ZXJwcmV0KE0pIHtcbiAgICB2YXIgeCA9IFtcbiAgICAgICAgICAgIE1bMF0sXG4gICAgICAgICAgICBNWzFdLFxuICAgICAgICAgICAgTVsyXVxuICAgICAgICBdO1xuICAgIHZhciBzZ24gPSBfc2lnbih4WzBdKTtcbiAgICB2YXIgeE5vcm0gPSBfbm9ybSh4KTtcbiAgICB2YXIgdiA9IFtcbiAgICAgICAgICAgIHhbMF0gKyBzZ24gKiB4Tm9ybSxcbiAgICAgICAgICAgIHhbMV0sXG4gICAgICAgICAgICB4WzJdXG4gICAgICAgIF07XG4gICAgdmFyIG11bHQgPSAyIC8gX25vcm1TcXVhcmVkKHYpO1xuICAgIGlmIChtdWx0ID49IEluZmluaXR5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IFRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoTSksXG4gICAgICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjYWxlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBza2V3OiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmFyIFExID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIFExWzBdID0gMSAtIG11bHQgKiB2WzBdICogdlswXTtcbiAgICBRMVs1XSA9IDEgLSBtdWx0ICogdlsxXSAqIHZbMV07XG4gICAgUTFbMTBdID0gMSAtIG11bHQgKiB2WzJdICogdlsyXTtcbiAgICBRMVsxXSA9IC1tdWx0ICogdlswXSAqIHZbMV07XG4gICAgUTFbMl0gPSAtbXVsdCAqIHZbMF0gKiB2WzJdO1xuICAgIFExWzZdID0gLW11bHQgKiB2WzFdICogdlsyXTtcbiAgICBRMVs0XSA9IFExWzFdO1xuICAgIFExWzhdID0gUTFbMl07XG4gICAgUTFbOV0gPSBRMVs2XTtcbiAgICB2YXIgTVExID0gVHJhbnNmb3JtLm11bHRpcGx5KFExLCBNKTtcbiAgICB2YXIgeDIgPSBbXG4gICAgICAgICAgICBNUTFbNV0sXG4gICAgICAgICAgICBNUTFbNl1cbiAgICAgICAgXTtcbiAgICB2YXIgc2duMiA9IF9zaWduKHgyWzBdKTtcbiAgICB2YXIgeDJOb3JtID0gX25vcm0oeDIpO1xuICAgIHZhciB2MiA9IFtcbiAgICAgICAgICAgIHgyWzBdICsgc2duMiAqIHgyTm9ybSxcbiAgICAgICAgICAgIHgyWzFdXG4gICAgICAgIF07XG4gICAgdmFyIG11bHQyID0gMiAvIF9ub3JtU3F1YXJlZCh2Mik7XG4gICAgdmFyIFEyID0gW1xuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIFEyWzVdID0gMSAtIG11bHQyICogdjJbMF0gKiB2MlswXTtcbiAgICBRMlsxMF0gPSAxIC0gbXVsdDIgKiB2MlsxXSAqIHYyWzFdO1xuICAgIFEyWzZdID0gLW11bHQyICogdjJbMF0gKiB2MlsxXTtcbiAgICBRMls5XSA9IFEyWzZdO1xuICAgIHZhciBRID0gVHJhbnNmb3JtLm11bHRpcGx5KFEyLCBRMSk7XG4gICAgdmFyIFIgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUSwgTSk7XG4gICAgdmFyIHJlbW92ZXIgPSBUcmFuc2Zvcm0uc2NhbGUoUlswXSA8IDAgPyAtMSA6IDEsIFJbNV0gPCAwID8gLTEgOiAxLCBSWzEwXSA8IDAgPyAtMSA6IDEpO1xuICAgIFIgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUiwgcmVtb3Zlcik7XG4gICAgUSA9IFRyYW5zZm9ybS5tdWx0aXBseShyZW1vdmVyLCBRKTtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0LnRyYW5zbGF0ZSA9IFRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoTSk7XG4gICAgcmVzdWx0LnJvdGF0ZSA9IFtcbiAgICAgICAgTWF0aC5hdGFuMigtUVs2XSwgUVsxMF0pLFxuICAgICAgICBNYXRoLmFzaW4oUVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoLVFbMV0sIFFbMF0pXG4gICAgXTtcbiAgICBpZiAoIXJlc3VsdC5yb3RhdGVbMF0pIHtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSA9IDA7XG4gICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gPSBNYXRoLmF0YW4yKFFbNF0sIFFbNV0pO1xuICAgIH1cbiAgICByZXN1bHQuc2NhbGUgPSBbXG4gICAgICAgIFJbMF0sXG4gICAgICAgIFJbNV0sXG4gICAgICAgIFJbMTBdXG4gICAgXTtcbiAgICByZXN1bHQuc2tldyA9IFtcbiAgICAgICAgTWF0aC5hdGFuMihSWzldLCByZXN1bHQuc2NhbGVbMl0pLFxuICAgICAgICBNYXRoLmF0YW4yKFJbOF0sIHJlc3VsdC5zY2FsZVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoUls0XSwgcmVzdWx0LnNjYWxlWzBdKVxuICAgIF07XG4gICAgaWYgKE1hdGguYWJzKHJlc3VsdC5yb3RhdGVbMF0pICsgTWF0aC5hYnMocmVzdWx0LnJvdGF0ZVsyXSkgPiAxLjUgKiBNYXRoLlBJKSB7XG4gICAgICAgIHJlc3VsdC5yb3RhdGVbMV0gPSBNYXRoLlBJIC0gcmVzdWx0LnJvdGF0ZVsxXTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMV0gPiBNYXRoLlBJKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSAtPSAyICogTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMV0gPCAtTWF0aC5QSSlcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMV0gKz0gMiAqIE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzBdIDwgMClcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMF0gKz0gTWF0aC5QSTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSAtPSBNYXRoLlBJO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsyXSA8IDApXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzJdICs9IE1hdGguUEk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0uYXZlcmFnZSA9IGZ1bmN0aW9uIGF2ZXJhZ2UoTTEsIE0yLCB0KSB7XG4gICAgdCA9IHQgPT09IHVuZGVmaW5lZCA/IDAuNSA6IHQ7XG4gICAgdmFyIHNwZWNNMSA9IFRyYW5zZm9ybS5pbnRlcnByZXQoTTEpO1xuICAgIHZhciBzcGVjTTIgPSBUcmFuc2Zvcm0uaW50ZXJwcmV0KE0yKTtcbiAgICB2YXIgc3BlY0F2ZyA9IHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcm90YXRlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2FsZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2tldzogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgc3BlY0F2Zy50cmFuc2xhdGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnRyYW5zbGF0ZVtpXSArIHQgKiBzcGVjTTIudHJhbnNsYXRlW2ldO1xuICAgICAgICBzcGVjQXZnLnJvdGF0ZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEucm90YXRlW2ldICsgdCAqIHNwZWNNMi5yb3RhdGVbaV07XG4gICAgICAgIHNwZWNBdmcuc2NhbGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnNjYWxlW2ldICsgdCAqIHNwZWNNMi5zY2FsZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5za2V3W2ldID0gKDEgLSB0KSAqIHNwZWNNMS5za2V3W2ldICsgdCAqIHNwZWNNMi5za2V3W2ldO1xuICAgIH1cbiAgICByZXR1cm4gVHJhbnNmb3JtLmJ1aWxkKHNwZWNBdmcpO1xufTtcblRyYW5zZm9ybS5idWlsZCA9IGZ1bmN0aW9uIGJ1aWxkKHNwZWMpIHtcbiAgICB2YXIgc2NhbGVNYXRyaXggPSBUcmFuc2Zvcm0uc2NhbGUoc3BlYy5zY2FsZVswXSwgc3BlYy5zY2FsZVsxXSwgc3BlYy5zY2FsZVsyXSk7XG4gICAgdmFyIHNrZXdNYXRyaXggPSBUcmFuc2Zvcm0uc2tldyhzcGVjLnNrZXdbMF0sIHNwZWMuc2tld1sxXSwgc3BlYy5za2V3WzJdKTtcbiAgICB2YXIgcm90YXRlTWF0cml4ID0gVHJhbnNmb3JtLnJvdGF0ZShzcGVjLnJvdGF0ZVswXSwgc3BlYy5yb3RhdGVbMV0sIHNwZWMucm90YXRlWzJdKTtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnRoZW5Nb3ZlKFRyYW5zZm9ybS5tdWx0aXBseShUcmFuc2Zvcm0ubXVsdGlwbHkocm90YXRlTWF0cml4LCBza2V3TWF0cml4KSwgc2NhbGVNYXRyaXgpLCBzcGVjLnRyYW5zbGF0ZSk7XG59O1xuVHJhbnNmb3JtLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuICFUcmFuc2Zvcm0ubm90RXF1YWxzKGEsIGIpO1xufTtcblRyYW5zZm9ybS5ub3RFcXVhbHMgPSBmdW5jdGlvbiBub3RFcXVhbHMoYSwgYikge1xuICAgIGlmIChhID09PSBiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEoYSAmJiBiKSB8fCBhWzEyXSAhPT0gYlsxMl0gfHwgYVsxM10gIT09IGJbMTNdIHx8IGFbMTRdICE9PSBiWzE0XSB8fCBhWzBdICE9PSBiWzBdIHx8IGFbMV0gIT09IGJbMV0gfHwgYVsyXSAhPT0gYlsyXSB8fCBhWzRdICE9PSBiWzRdIHx8IGFbNV0gIT09IGJbNV0gfHwgYVs2XSAhPT0gYls2XSB8fCBhWzhdICE9PSBiWzhdIHx8IGFbOV0gIT09IGJbOV0gfHwgYVsxMF0gIT09IGJbMTBdO1xufTtcblRyYW5zZm9ybS5ub3JtYWxpemVSb3RhdGlvbiA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVJvdGF0aW9uKHJvdGF0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHJvdGF0aW9uLnNsaWNlKDApO1xuICAgIGlmIChyZXN1bHRbMF0gPT09IE1hdGguUEkgKiAwLjUgfHwgcmVzdWx0WzBdID09PSAtTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSAtcmVzdWx0WzBdO1xuICAgICAgICByZXN1bHRbMV0gPSBNYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFswXSA+IE1hdGguUEkgKiAwLjUpIHtcbiAgICAgICAgcmVzdWx0WzBdID0gcmVzdWx0WzBdIC0gTWF0aC5QSTtcbiAgICAgICAgcmVzdWx0WzFdID0gTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIGlmIChyZXN1bHRbMF0gPCAtTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSByZXN1bHRbMF0gKyBNYXRoLlBJO1xuICAgICAgICByZXN1bHRbMV0gPSAtTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIHdoaWxlIChyZXN1bHRbMV0gPCAtTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzFdICs9IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMV0gPj0gTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzFdIC09IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMl0gPCAtTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzJdICs9IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMl0gPj0gTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzJdIC09IDIgKiBNYXRoLlBJO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLmluRnJvbnQgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAuMDAxLFxuICAgIDFcbl07XG5UcmFuc2Zvcm0uYmVoaW5kID0gW1xuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAtMC4wMDEsXG4gICAgMVxuXTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNmb3JtOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi9PcHRpb25zTWFuYWdlcicpO1xudmFyIFJlbmRlck5vZGUgPSByZXF1aXJlKCcuL1JlbmRlck5vZGUnKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG5mdW5jdGlvbiBWaWV3KG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMub3B0aW9ucyA9IFV0aWxpdHkuY2xvbmUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMgfHwgVmlldy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn1cblZpZXcuREVGQVVMVF9PUFRJT05TID0ge307XG5WaWV3LnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucyhrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuZ2V0T3B0aW9ucyhrZXkpO1xufTtcblZpZXcucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlci5wYXRjaChvcHRpb25zKTtcbn07XG5WaWV3LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGUuYWRkLmFwcGx5KHRoaXMuX25vZGUsIGFyZ3VtZW50cyk7XG59O1xuVmlldy5wcm90b3R5cGUuX2FkZCA9IFZpZXcucHJvdG90eXBlLmFkZDtcblZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZS5yZW5kZXIoKTtcbn07XG5WaWV3LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICBpZiAodGhpcy5fbm9kZSAmJiB0aGlzLl9ub2RlLmdldFNpemUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGUuZ2V0U2l6ZS5hcHBseSh0aGlzLl9ub2RlLCBhcmd1bWVudHMpIHx8IHRoaXMub3B0aW9ucy5zaXplO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNpemU7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWaWV3OyIsImZ1bmN0aW9uIFZpZXdTZXF1ZW5jZShvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKVxuICAgICAgICBvcHRpb25zID0gW107XG4gICAgaWYgKG9wdGlvbnMgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgb3B0aW9ucyA9IHsgYXJyYXk6IG9wdGlvbnMgfTtcbiAgICB0aGlzLl8gPSBudWxsO1xuICAgIHRoaXMuaW5kZXggPSBvcHRpb25zLmluZGV4IHx8IDA7XG4gICAgaWYgKG9wdGlvbnMuYXJyYXkpXG4gICAgICAgIHRoaXMuXyA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yLkJhY2tpbmcob3B0aW9ucy5hcnJheSk7XG4gICAgZWxzZSBpZiAob3B0aW9ucy5fKVxuICAgICAgICB0aGlzLl8gPSBvcHRpb25zLl87XG4gICAgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4KVxuICAgICAgICB0aGlzLl8uZmlyc3ROb2RlID0gdGhpcztcbiAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXggKyB0aGlzLl8uYXJyYXkubGVuZ3RoIC0gMSlcbiAgICAgICAgdGhpcy5fLmxhc3ROb2RlID0gdGhpcztcbiAgICBpZiAob3B0aW9ucy5sb29wICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuXy5sb29wID0gb3B0aW9ucy5sb29wO1xuICAgIGlmIChvcHRpb25zLnRyYWNrU2l6ZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLl8udHJhY2tTaXplID0gb3B0aW9ucy50cmFja1NpemU7XG4gICAgdGhpcy5fcHJldmlvdXNOb2RlID0gbnVsbDtcbiAgICB0aGlzLl9uZXh0Tm9kZSA9IG51bGw7XG59XG5WaWV3U2VxdWVuY2UuQmFja2luZyA9IGZ1bmN0aW9uIEJhY2tpbmcoYXJyYXkpIHtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG4gICAgdGhpcy5maXJzdEluZGV4ID0gMDtcbiAgICB0aGlzLmxvb3AgPSBmYWxzZTtcbiAgICB0aGlzLmZpcnN0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5sYXN0Tm9kZSA9IG51bGw7XG4gICAgdGhpcy5jdW11bGF0aXZlU2l6ZXMgPSBbW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXV07XG4gICAgdGhpcy5zaXplRGlydHkgPSB0cnVlO1xuICAgIHRoaXMudHJhY2tTaXplID0gZmFsc2U7XG59O1xuVmlld1NlcXVlbmNlLkJhY2tpbmcucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoaSkge1xuICAgIHZhciBfaSA9IGkgLSB0aGlzLmZpcnN0SW5kZXg7XG4gICAgaWYgKF9pIDwgMCB8fCBfaSA+PSB0aGlzLmFycmF5Lmxlbmd0aClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMuYXJyYXlbX2ldO1xufTtcblZpZXdTZXF1ZW5jZS5CYWNraW5nLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uIHNldFZhbHVlKGksIHZhbHVlKSB7XG4gICAgdGhpcy5hcnJheVtpIC0gdGhpcy5maXJzdEluZGV4XSA9IHZhbHVlO1xufTtcblZpZXdTZXF1ZW5jZS5CYWNraW5nLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZShpbmRleCkge1xuICAgIHJldHVybiB0aGlzLmN1bXVsYXRpdmVTaXplc1tpbmRleF07XG59O1xuVmlld1NlcXVlbmNlLkJhY2tpbmcucHJvdG90eXBlLmNhbGN1bGF0ZVNpemUgPSBmdW5jdGlvbiBjYWxjdWxhdGVTaXplKGluZGV4KSB7XG4gICAgaW5kZXggPSBpbmRleCB8fCB0aGlzLmFycmF5Lmxlbmd0aDtcbiAgICB2YXIgc2l6ZSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleDsgaSsrKSB7XG4gICAgICAgIHZhciBub2RlU2l6ZSA9IHRoaXMuYXJyYXlbaV0uZ2V0U2l6ZSgpO1xuICAgICAgICBpZiAoIW5vZGVTaXplKVxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHNpemVbMF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG5vZGVTaXplWzBdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgc2l6ZVswXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzaXplWzBdICs9IG5vZGVTaXplWzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaXplWzFdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChub2RlU2l6ZVsxXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHNpemVbMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc2l6ZVsxXSArPSBub2RlU2l6ZVsxXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1bXVsYXRpdmVTaXplc1tpICsgMV0gPSBzaXplLnNsaWNlKCk7XG4gICAgfVxuICAgIHRoaXMuc2l6ZURpcnR5ID0gZmFsc2U7XG4gICAgcmV0dXJuIHNpemU7XG59O1xuVmlld1NlcXVlbmNlLkJhY2tpbmcucHJvdG90eXBlLnJlaW5kZXggPSBmdW5jdGlvbiByZWluZGV4KHN0YXJ0LCByZW1vdmVDb3VudCwgaW5zZXJ0Q291bnQpIHtcbiAgICBpZiAoIXRoaXMuYXJyYXlbMF0pXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5maXJzdEluZGV4O1xuICAgIHZhciBpbmRleFNoaWZ0QW1vdW50ID0gaW5zZXJ0Q291bnQgLSByZW1vdmVDb3VudDtcbiAgICB2YXIgbm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgIHdoaWxlIChpbmRleCA8IHN0YXJ0IC0gMSkge1xuICAgICAgICBub2RlID0gbm9kZS5nZXROZXh0KCk7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIHZhciBzcGxpY2VTdGFydE5vZGUgPSBub2RlO1xuICAgIGZvciAoaSA9IDA7IGkgPCByZW1vdmVDb3VudDsgaSsrKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLmdldE5leHQoKTtcbiAgICAgICAgaWYgKG5vZGUpXG4gICAgICAgICAgICBub2RlLl9wcmV2aW91c05vZGUgPSBzcGxpY2VTdGFydE5vZGU7XG4gICAgfVxuICAgIHZhciBzcGxpY2VSZXN1bWVOb2RlID0gbm9kZSA/IG5vZGUuZ2V0TmV4dCgpIDogbnVsbDtcbiAgICBzcGxpY2VTdGFydE5vZGUuX25leHROb2RlID0gbnVsbDtcbiAgICBub2RlID0gc3BsaWNlU3RhcnROb2RlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBpbnNlcnRDb3VudDsgaSsrKVxuICAgICAgICBub2RlID0gbm9kZS5nZXROZXh0KCk7XG4gICAgaW5kZXggKz0gaW5zZXJ0Q291bnQ7XG4gICAgaWYgKG5vZGUgIT09IHNwbGljZVJlc3VtZU5vZGUpIHtcbiAgICAgICAgbm9kZS5fbmV4dE5vZGUgPSBzcGxpY2VSZXN1bWVOb2RlO1xuICAgICAgICBpZiAoc3BsaWNlUmVzdW1lTm9kZSlcbiAgICAgICAgICAgIHNwbGljZVJlc3VtZU5vZGUuX3ByZXZpb3VzTm9kZSA9IG5vZGU7XG4gICAgfVxuICAgIGlmIChzcGxpY2VSZXN1bWVOb2RlKSB7XG4gICAgICAgIG5vZGUgPSBzcGxpY2VSZXN1bWVOb2RlO1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICB3aGlsZSAobm9kZSAmJiBpbmRleCA8IHRoaXMuYXJyYXkubGVuZ3RoICsgdGhpcy5maXJzdEluZGV4KSB7XG4gICAgICAgICAgICBpZiAobm9kZS5fbmV4dE5vZGUpXG4gICAgICAgICAgICAgICAgbm9kZS5pbmRleCArPSBpbmRleFNoaWZ0QW1vdW50O1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmdldE5leHQoKTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuXy50cmFja1NpemUpXG4gICAgICAgIHRoaXMuXy5zaXplRGlydHkgPSB0cnVlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0UHJldmlvdXMgPSBmdW5jdGlvbiBnZXRQcmV2aW91cygpIHtcbiAgICBpZiAodGhpcy5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuXy5sb29wKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUgPSB0aGlzLl8ubGFzdE5vZGUgfHwgbmV3IHRoaXMuY29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgICAgIF86IHRoaXMuXyxcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5fLmZpcnN0SW5kZXggKyB0aGlzLl8uYXJyYXkubGVuZ3RoIC0gMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUuX25leHROb2RlID0gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9wcmV2aW91c05vZGUpIHtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNOb2RlID0gbmV3IHRoaXMuY29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgXzogdGhpcy5fLFxuICAgICAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXggLSAxXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUuX25leHROb2RlID0gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3ByZXZpb3VzTm9kZTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLmdldE5leHQgPSBmdW5jdGlvbiBnZXROZXh0KCkge1xuICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleCArIHRoaXMuXy5hcnJheS5sZW5ndGggLSAxKSB7XG4gICAgICAgIGlmICh0aGlzLl8ubG9vcCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSB0aGlzLl8uZmlyc3ROb2RlIHx8IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuXy5maXJzdEluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX25leHROb2RlLl9wcmV2aW91c05vZGUgPSB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICghdGhpcy5fbmV4dE5vZGUpIHtcbiAgICAgICAgdGhpcy5fbmV4dE5vZGUgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCArIDFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX25leHROb2RlLl9wcmV2aW91c05vZGUgPSB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbmV4dE5vZGU7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5nZXRJbmRleCA9IGZ1bmN0aW9uIGdldEluZGV4KCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4O1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gJycgKyB0aGlzLmluZGV4O1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUudW5zaGlmdCA9IGZ1bmN0aW9uIHVuc2hpZnQodmFsdWUpIHtcbiAgICB0aGlzLl8uYXJyYXkudW5zaGlmdC5hcHBseSh0aGlzLl8uYXJyYXksIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5fLmZpcnN0SW5kZXggLT0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAodGhpcy5fLnRyYWNrU2l6ZSlcbiAgICAgICAgdGhpcy5fLnNpemVEaXJ0eSA9IHRydWU7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCh2YWx1ZSkge1xuICAgIHRoaXMuXy5hcnJheS5wdXNoLmFwcGx5KHRoaXMuXy5hcnJheSwgYXJndW1lbnRzKTtcbiAgICBpZiAodGhpcy5fLnRyYWNrU2l6ZSlcbiAgICAgICAgdGhpcy5fLnNpemVEaXJ0eSA9IHRydWU7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbiBzcGxpY2UoaW5kZXgsIGhvd01hbnkpIHtcbiAgICB2YXIgdmFsdWVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB0aGlzLl8uYXJyYXkuc3BsaWNlLmFwcGx5KHRoaXMuXy5hcnJheSwgW1xuICAgICAgICBpbmRleCAtIHRoaXMuXy5maXJzdEluZGV4LFxuICAgICAgICBob3dNYW55XG4gICAgXS5jb25jYXQodmFsdWVzKSk7XG4gICAgdGhpcy5fLnJlaW5kZXgoaW5kZXgsIGhvd01hbnksIHZhbHVlcy5sZW5ndGgpO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIHN3YXAob3RoZXIpIHtcbiAgICB2YXIgb3RoZXJWYWx1ZSA9IG90aGVyLmdldCgpO1xuICAgIHZhciBteVZhbHVlID0gdGhpcy5nZXQoKTtcbiAgICB0aGlzLl8uc2V0VmFsdWUodGhpcy5pbmRleCwgb3RoZXJWYWx1ZSk7XG4gICAgdGhpcy5fLnNldFZhbHVlKG90aGVyLmluZGV4LCBteVZhbHVlKTtcbiAgICB2YXIgbXlQcmV2aW91cyA9IHRoaXMuX3ByZXZpb3VzTm9kZTtcbiAgICB2YXIgbXlOZXh0ID0gdGhpcy5fbmV4dE5vZGU7XG4gICAgdmFyIG15SW5kZXggPSB0aGlzLmluZGV4O1xuICAgIHZhciBvdGhlclByZXZpb3VzID0gb3RoZXIuX3ByZXZpb3VzTm9kZTtcbiAgICB2YXIgb3RoZXJOZXh0ID0gb3RoZXIuX25leHROb2RlO1xuICAgIHZhciBvdGhlckluZGV4ID0gb3RoZXIuaW5kZXg7XG4gICAgdGhpcy5pbmRleCA9IG90aGVySW5kZXg7XG4gICAgdGhpcy5fcHJldmlvdXNOb2RlID0gb3RoZXJQcmV2aW91cyA9PT0gdGhpcyA/IG90aGVyIDogb3RoZXJQcmV2aW91cztcbiAgICBpZiAodGhpcy5fcHJldmlvdXNOb2RlKVxuICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUuX25leHROb2RlID0gdGhpcztcbiAgICB0aGlzLl9uZXh0Tm9kZSA9IG90aGVyTmV4dCA9PT0gdGhpcyA/IG90aGVyIDogb3RoZXJOZXh0O1xuICAgIGlmICh0aGlzLl9uZXh0Tm9kZSlcbiAgICAgICAgdGhpcy5fbmV4dE5vZGUuX3ByZXZpb3VzTm9kZSA9IHRoaXM7XG4gICAgb3RoZXIuaW5kZXggPSBteUluZGV4O1xuICAgIG90aGVyLl9wcmV2aW91c05vZGUgPSBteVByZXZpb3VzID09PSBvdGhlciA/IHRoaXMgOiBteVByZXZpb3VzO1xuICAgIGlmIChvdGhlci5fcHJldmlvdXNOb2RlKVxuICAgICAgICBvdGhlci5fcHJldmlvdXNOb2RlLl9uZXh0Tm9kZSA9IG90aGVyO1xuICAgIG90aGVyLl9uZXh0Tm9kZSA9IG15TmV4dCA9PT0gb3RoZXIgPyB0aGlzIDogbXlOZXh0O1xuICAgIGlmIChvdGhlci5fbmV4dE5vZGUpXG4gICAgICAgIG90aGVyLl9uZXh0Tm9kZS5fcHJldmlvdXNOb2RlID0gb3RoZXI7XG4gICAgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4KVxuICAgICAgICB0aGlzLl8uZmlyc3ROb2RlID0gdGhpcztcbiAgICBlbHNlIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleCArIHRoaXMuXy5hcnJheS5sZW5ndGggLSAxKVxuICAgICAgICB0aGlzLl8ubGFzdE5vZGUgPSB0aGlzO1xuICAgIGlmIChvdGhlci5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXgpXG4gICAgICAgIHRoaXMuXy5maXJzdE5vZGUgPSBvdGhlcjtcbiAgICBlbHNlIGlmIChvdGhlci5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXggKyB0aGlzLl8uYXJyYXkubGVuZ3RoIC0gMSlcbiAgICAgICAgdGhpcy5fLmxhc3ROb2RlID0gb3RoZXI7XG4gICAgaWYgKHRoaXMuXy50cmFja1NpemUpXG4gICAgICAgIHRoaXMuXy5zaXplRGlydHkgPSB0cnVlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl8uZ2V0VmFsdWUodGhpcy5pbmRleCk7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXQoKTtcbiAgICByZXR1cm4gdGFyZ2V0ID8gdGFyZ2V0LmdldFNpemUoKSA6IG51bGw7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMuXy50cmFja1NpemUgJiYgdGhpcy5fLnNpemVEaXJ0eSlcbiAgICAgICAgdGhpcy5fLmNhbGN1bGF0ZVNpemUoKTtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXQoKTtcbiAgICByZXR1cm4gdGFyZ2V0ID8gdGFyZ2V0LnJlbmRlci5hcHBseSh0YXJnZXQsIGFyZ3VtZW50cykgOiBudWxsO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVmlld1NlcXVlbmNlOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIEV2ZW50QXJiaXRlcihzdGFydE1vZGUpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXJzID0ge307XG4gICAgdGhpcy5jdXJyTW9kZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNldE1vZGUoc3RhcnRNb2RlKTtcbn1cbkV2ZW50QXJiaXRlci5wcm90b3R5cGUuc2V0TW9kZSA9IGZ1bmN0aW9uIHNldE1vZGUobW9kZSkge1xuICAgIGlmIChtb2RlICE9PSB0aGlzLmN1cnJNb2RlKSB7XG4gICAgICAgIHZhciBzdGFydE1vZGUgPSB0aGlzLmN1cnJNb2RlO1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVyc1t0aGlzLmN1cnJNb2RlXSlcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hlcnNbdGhpcy5jdXJyTW9kZV0udHJpZ2dlcigndW5waXBlJyk7XG4gICAgICAgIHRoaXMuY3Vyck1vZGUgPSBtb2RlO1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVyc1ttb2RlXSlcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hlcnNbbW9kZV0uZW1pdCgncGlwZScpO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgIGZyb206IHN0YXJ0TW9kZSxcbiAgICAgICAgICAgIHRvOiBtb2RlXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5FdmVudEFyYml0ZXIucHJvdG90eXBlLmZvck1vZGUgPSBmdW5jdGlvbiBmb3JNb2RlKG1vZGUpIHtcbiAgICBpZiAoIXRoaXMuZGlzcGF0Y2hlcnNbbW9kZV0pXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlcnNbbW9kZV0gPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlcnNbbW9kZV07XG59O1xuRXZlbnRBcmJpdGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudFR5cGUsIGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY3Vyck1vZGUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghZXZlbnQpXG4gICAgICAgIGV2ZW50ID0ge307XG4gICAgdmFyIGRpc3BhdGNoZXIgPSB0aGlzLmRpc3BhdGNoZXJzW3RoaXMuY3Vyck1vZGVdO1xuICAgIGlmIChkaXNwYXRjaGVyKVxuICAgICAgICByZXR1cm4gZGlzcGF0Y2hlci50cmlnZ2VyKGV2ZW50VHlwZSwgZXZlbnQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRBcmJpdGVyOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIEV2ZW50RmlsdGVyKGNvbmRpdGlvbikge1xuICAgIEV2ZW50SGFuZGxlci5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX2NvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbn1cbkV2ZW50RmlsdGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRIYW5kbGVyLnByb3RvdHlwZSk7XG5FdmVudEZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFdmVudEZpbHRlcjtcbkV2ZW50RmlsdGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgaWYgKHRoaXMuX2NvbmRpdGlvbih0eXBlLCBkYXRhKSlcbiAgICAgICAgcmV0dXJuIEV2ZW50SGFuZGxlci5wcm90b3R5cGUuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbkV2ZW50RmlsdGVyLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnRGaWx0ZXIucHJvdG90eXBlLmVtaXQ7XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RmlsdGVyOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIEV2ZW50TWFwcGVyKG1hcHBpbmdGdW5jdGlvbikge1xuICAgIEV2ZW50SGFuZGxlci5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX21hcHBpbmdGdW5jdGlvbiA9IG1hcHBpbmdGdW5jdGlvbjtcbn1cbkV2ZW50TWFwcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRIYW5kbGVyLnByb3RvdHlwZSk7XG5FdmVudE1hcHBlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFdmVudE1hcHBlcjtcbkV2ZW50TWFwcGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBudWxsO1xuRXZlbnRNYXBwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gbnVsbDtcbkV2ZW50TWFwcGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX21hcHBpbmdGdW5jdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmVtaXQgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGFyZ2V0LmVtaXQodHlwZSwgZGF0YSk7XG59O1xuRXZlbnRNYXBwZXIucHJvdG90eXBlLnRyaWdnZXIgPSBFdmVudE1hcHBlci5wcm90b3R5cGUuZW1pdDtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRNYXBwZXI7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG5mdW5jdGlvbiBBY2N1bXVsYXRvcih2YWx1ZSwgZXZlbnROYW1lKSB7XG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBldmVudE5hbWUgPSAndXBkYXRlJztcbiAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlICYmIHZhbHVlLmdldCAmJiB2YWx1ZS5zZXQgPyB2YWx1ZSA6IG5ldyBUcmFuc2l0aW9uYWJsZSh2YWx1ZSB8fCAwKTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbihldmVudE5hbWUsIF9oYW5kbGVVcGRhdGUuYmluZCh0aGlzKSk7XG59XG5mdW5jdGlvbiBfaGFuZGxlVXBkYXRlKGRhdGEpIHtcbiAgICB2YXIgZGVsdGEgPSBkYXRhLmRlbHRhO1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuZ2V0KCk7XG4gICAgaWYgKGRlbHRhLmNvbnN0cnVjdG9yID09PSBzdGF0ZS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBkZWx0YSBpbnN0YW5jZW9mIEFycmF5ID8gW1xuICAgICAgICAgICAgICAgIHN0YXRlWzBdICsgZGVsdGFbMF0sXG4gICAgICAgICAgICAgICAgc3RhdGVbMV0gKyBkZWx0YVsxXVxuICAgICAgICAgICAgXSA6IHN0YXRlICsgZGVsdGE7XG4gICAgICAgIHRoaXMuc2V0KG5ld1N0YXRlKTtcbiAgICB9XG59XG5BY2N1bXVsYXRvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5nZXQoKTtcbn07XG5BY2N1bXVsYXRvci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgdGhpcy5fc3RhdGUuc2V0KHZhbHVlKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEFjY3VtdWxhdG9yOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF3aW5kb3cuQ3VzdG9tRXZlbnQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgY2xpY2tUaHJlc2hvbGQgPSAzMDA7XG4gICAgdmFyIGNsaWNrV2luZG93ID0gNTAwO1xuICAgIHZhciBwb3RlbnRpYWxDbGlja3MgPSB7fTtcbiAgICB2YXIgcmVjZW50bHlEaXNwYXRjaGVkID0ge307XG4gICAgdmFyIF9ub3cgPSBEYXRlLm5vdztcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgdGltZXN0YW1wID0gX25vdygpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgICAgIHBvdGVudGlhbENsaWNrc1t0b3VjaC5pZGVudGlmaWVyXSA9IHRpbWVzdGFtcDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgICAgICBkZWxldGUgcG90ZW50aWFsQ2xpY2tzW3RvdWNoLmlkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBjdXJyVGltZSA9IF9ub3coKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lID0gcG90ZW50aWFsQ2xpY2tzW3RvdWNoLmlkZW50aWZpZXJdO1xuICAgICAgICAgICAgaWYgKHN0YXJ0VGltZSAmJiBjdXJyVGltZSAtIHN0YXJ0VGltZSA8IGNsaWNrVGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsaWNrRXZ0ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudCgnY2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnYnViYmxlcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGV0YWlsJzogdG91Y2hcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVjZW50bHlEaXNwYXRjaGVkW2N1cnJUaW1lXSA9IGV2ZW50O1xuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kaXNwYXRjaEV2ZW50KGNsaWNrRXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBwb3RlbnRpYWxDbGlja3NbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gX25vdygpO1xuICAgICAgICBmb3IgKHZhciBpIGluIHJlY2VudGx5RGlzcGF0Y2hlZCkge1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzRXZlbnQgPSByZWNlbnRseURpc3BhdGNoZWRbaV07XG4gICAgICAgICAgICBpZiAoY3VyclRpbWUgLSBpIDwgY2xpY2tXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuTW91c2VFdmVudCAmJiBldmVudC50YXJnZXQgPT09IHByZXZpb3VzRXZlbnQudGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIGRlbGV0ZSByZWNlbnRseURpc3BhdGNoZWRbaV07XG4gICAgICAgIH1cbiAgICB9LCB0cnVlKTtcbn0oKSk7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBHZW5lcmljU3luYyhzeW5jcywgb3B0aW9ucykge1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5fc3luY3MgPSB7fTtcbiAgICBpZiAoc3luY3MpXG4gICAgICAgIHRoaXMuYWRkU3luYyhzeW5jcyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn1cbkdlbmVyaWNTeW5jLkRJUkVDVElPTl9YID0gMDtcbkdlbmVyaWNTeW5jLkRJUkVDVElPTl9ZID0gMTtcbkdlbmVyaWNTeW5jLkRJUkVDVElPTl9aID0gMjtcbnZhciByZWdpc3RyeSA9IHt9O1xuR2VuZXJpY1N5bmMucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlcihzeW5jT2JqZWN0KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHN5bmNPYmplY3QpIHtcbiAgICAgICAgaWYgKHJlZ2lzdHJ5W2tleV0pIHtcbiAgICAgICAgICAgIGlmIChyZWdpc3RyeVtrZXldID09PSBzeW5jT2JqZWN0W2tleV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBrZXkgaXMgcmVnaXN0ZXJlZCB0byBhIGRpZmZlcmVudCBzeW5jIGNsYXNzJyk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmVnaXN0cnlba2V5XSA9IHN5bmNPYmplY3Rba2V5XTtcbiAgICB9XG59O1xuR2VuZXJpY1N5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9zeW5jcykge1xuICAgICAgICB0aGlzLl9zeW5jc1trZXldLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxufTtcbkdlbmVyaWNTeW5jLnByb3RvdHlwZS5waXBlU3luYyA9IGZ1bmN0aW9uIHBpcGVUb1N5bmMoa2V5KSB7XG4gICAgdmFyIHN5bmMgPSB0aGlzLl9zeW5jc1trZXldO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQucGlwZShzeW5jKTtcbiAgICBzeW5jLnBpcGUodGhpcy5fZXZlbnRPdXRwdXQpO1xufTtcbkdlbmVyaWNTeW5jLnByb3RvdHlwZS51bnBpcGVTeW5jID0gZnVuY3Rpb24gdW5waXBlRnJvbVN5bmMoa2V5KSB7XG4gICAgdmFyIHN5bmMgPSB0aGlzLl9zeW5jc1trZXldO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQudW5waXBlKHN5bmMpO1xuICAgIHN5bmMudW5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbn07XG5mdW5jdGlvbiBfYWRkU2luZ2xlU3luYyhrZXksIG9wdGlvbnMpIHtcbiAgICBpZiAoIXJlZ2lzdHJ5W2tleV0pXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9zeW5jc1trZXldID0gbmV3IHJlZ2lzdHJ5W2tleV0ob3B0aW9ucyk7XG4gICAgdGhpcy5waXBlU3luYyhrZXkpO1xufVxuR2VuZXJpY1N5bmMucHJvdG90eXBlLmFkZFN5bmMgPSBmdW5jdGlvbiBhZGRTeW5jKHN5bmNzKSB7XG4gICAgaWYgKHN5bmNzIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3luY3MubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBfYWRkU2luZ2xlU3luYy5jYWxsKHRoaXMsIHN5bmNzW2ldKTtcbiAgICBlbHNlIGlmIChzeW5jcyBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHN5bmNzKVxuICAgICAgICAgICAgX2FkZFNpbmdsZVN5bmMuY2FsbCh0aGlzLCBrZXksIHN5bmNzW2tleV0pO1xufTtcbm1vZHVsZS5leHBvcnRzID0gR2VuZXJpY1N5bmM7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBNb3VzZVN5bmMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoTW91c2VTeW5jLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2Vkb3duJywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNlbW92ZScsIF9oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNldXAnLCBfaGFuZGxlRW5kLmJpbmQodGhpcykpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvcG9nYXRlKVxuICAgICAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdtb3VzZWxlYXZlJywgX2hhbmRsZUxlYXZlLmJpbmQodGhpcykpO1xuICAgIGVsc2VcbiAgICAgICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2VsZWF2ZScsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fcGF5bG9hZCA9IHtcbiAgICAgICAgZGVsdGE6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICB2ZWxvY2l0eTogbnVsbCxcbiAgICAgICAgY2xpZW50WDogMCxcbiAgICAgICAgY2xpZW50WTogMCxcbiAgICAgICAgb2Zmc2V0WDogMCxcbiAgICAgICAgb2Zmc2V0WTogMFxuICAgIH07XG4gICAgdGhpcy5fcG9zaXRpb24gPSBudWxsO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2VGltZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kb3duID0gZmFsc2U7XG4gICAgdGhpcy5fbW92ZWQgPSBmYWxzZTtcbn1cbk1vdXNlU3luYy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGlyZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgcmFpbHM6IGZhbHNlLFxuICAgIHNjYWxlOiAxLFxuICAgIHByb3BvZ2F0ZTogdHJ1ZSxcbiAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxufTtcbk1vdXNlU3luYy5ESVJFQ1RJT05fWCA9IDA7XG5Nb3VzZVN5bmMuRElSRUNUSU9OX1kgPSAxO1xudmFyIE1JTklNVU1fVElDS19USU1FID0gODtcbnZhciBfbm93ID0gRGF0ZS5ub3c7XG5mdW5jdGlvbiBfaGFuZGxlU3RhcnQoZXZlbnQpIHtcbiAgICB2YXIgZGVsdGE7XG4gICAgdmFyIHZlbG9jaXR5O1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQpXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHggPSBldmVudC5jbGllbnRYO1xuICAgIHZhciB5ID0gZXZlbnQuY2xpZW50WTtcbiAgICB0aGlzLl9wcmV2Q29vcmQgPSBbXG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICBdO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gX25vdygpO1xuICAgIHRoaXMuX2Rvd24gPSB0cnVlO1xuICAgIHRoaXMuX21vdmUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgZGVsdGEgPSAwO1xuICAgICAgICB2ZWxvY2l0eSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICBkZWx0YSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgICAgIHZlbG9jaXR5ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICB9XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgIHBheWxvYWQuZGVsdGEgPSBkZWx0YTtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIHBheWxvYWQuY2xpZW50WCA9IHg7XG4gICAgcGF5bG9hZC5jbGllbnRZID0geTtcbiAgICBwYXlsb2FkLm9mZnNldFggPSBldmVudC5vZmZzZXRYO1xuICAgIHBheWxvYWQub2Zmc2V0WSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCBwYXlsb2FkKTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9wcmV2Q29vcmQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgcHJldkNvb3JkID0gdGhpcy5fcHJldkNvb3JkO1xuICAgIHZhciBwcmV2VGltZSA9IHRoaXMuX3ByZXZUaW1lO1xuICAgIHZhciB4ID0gZXZlbnQuY2xpZW50WDtcbiAgICB2YXIgeSA9IGV2ZW50LmNsaWVudFk7XG4gICAgdmFyIGN1cnJUaW1lID0gX25vdygpO1xuICAgIHZhciBkaWZmWCA9IHggLSBwcmV2Q29vcmRbMF07XG4gICAgdmFyIGRpZmZZID0geSAtIHByZXZDb29yZFsxXTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJhaWxzKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpXG4gICAgICAgICAgICBkaWZmWSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpZmZYID0gMDtcbiAgICB9XG4gICAgdmFyIGRpZmZUaW1lID0gTWF0aC5tYXgoY3VyclRpbWUgLSBwcmV2VGltZSwgTUlOSU1VTV9USUNLX1RJTUUpO1xuICAgIHZhciB2ZWxYID0gZGlmZlggLyBkaWZmVGltZTtcbiAgICB2YXIgdmVsWSA9IGRpZmZZIC8gZGlmZlRpbWU7XG4gICAgdmFyIHNjYWxlID0gdGhpcy5vcHRpb25zLnNjYWxlO1xuICAgIHZhciBuZXh0VmVsO1xuICAgIHZhciBuZXh0RGVsdGE7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IE1vdXNlU3luYy5ESVJFQ1RJT05fWCkge1xuICAgICAgICBuZXh0RGVsdGEgPSBzY2FsZSAqIGRpZmZYO1xuICAgICAgICBuZXh0VmVsID0gc2NhbGUgKiB2ZWxYO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiArPSBuZXh0RGVsdGE7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBNb3VzZVN5bmMuRElSRUNUSU9OX1kpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWTtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogdmVsWTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHREZWx0YSA9IFtcbiAgICAgICAgICAgIHNjYWxlICogZGlmZlgsXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZZXG4gICAgICAgIF07XG4gICAgICAgIG5leHRWZWwgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFgsXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFlcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMF0gKz0gbmV4dERlbHRhWzBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblsxXSArPSBuZXh0RGVsdGFbMV07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gbmV4dERlbHRhO1xuICAgIHBheWxvYWQucG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICBwYXlsb2FkLnZlbG9jaXR5ID0gbmV4dFZlbDtcbiAgICBwYXlsb2FkLmNsaWVudFggPSB4O1xuICAgIHBheWxvYWQuY2xpZW50WSA9IHk7XG4gICAgcGF5bG9hZC5vZmZzZXRYID0gZXZlbnQub2Zmc2V0WDtcbiAgICBwYXlsb2FkLm9mZnNldFkgPSBldmVudC5vZmZzZXRZO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3VwZGF0ZScsIHBheWxvYWQpO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IFtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgIF07XG4gICAgdGhpcy5fcHJldlRpbWUgPSBjdXJyVGltZTtcbiAgICB0aGlzLl9tb3ZlID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVFbmQoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2Rvd24pXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdlbmQnLCB0aGlzLl9wYXlsb2FkKTtcbiAgICB0aGlzLl9wcmV2Q29vcmQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJldlRpbWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZG93biA9IGZhbHNlO1xuICAgIHRoaXMuX21vdmUgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVMZWF2ZShldmVudCkge1xuICAgIGlmICghdGhpcy5fZG93biB8fCAhdGhpcy5fbW92ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBib3VuZE1vdmUgPSBfaGFuZGxlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHZhciBib3VuZEVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgX2hhbmRsZUVuZC5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGJvdW5kTW92ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYm91bmRFbmQpO1xuICAgICAgICB9LmJpbmQodGhpcywgZXZlbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGJvdW5kTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGJvdW5kRW5kKTtcbn1cbk1vdXNlU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5Nb3VzZVN5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE1vdXNlU3luYzsiLCJ2YXIgVHdvRmluZ2VyU3luYyA9IHJlcXVpcmUoJy4vVHdvRmluZ2VyU3luYycpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gUGluY2hTeW5jKG9wdGlvbnMpIHtcbiAgICBUd29GaW5nZXJTeW5jLmNhbGwodGhpcyk7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShQaW5jaFN5bmMuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fZGlzcGxhY2VtZW50ID0gMDtcbiAgICB0aGlzLl9wcmV2aW91c0Rpc3RhbmNlID0gMDtcbn1cblBpbmNoU3luYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFR3b0ZpbmdlclN5bmMucHJvdG90eXBlKTtcblBpbmNoU3luYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQaW5jaFN5bmM7XG5QaW5jaFN5bmMuREVGQVVMVF9PUFRJT05TID0geyBzY2FsZTogMSB9O1xuUGluY2hTeW5jLnByb3RvdHlwZS5fc3RhcnRVcGRhdGUgPSBmdW5jdGlvbiBfc3RhcnRVcGRhdGUoZXZlbnQpIHtcbiAgICB0aGlzLl9wcmV2aW91c0Rpc3RhbmNlID0gVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVEaXN0YW5jZSh0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdGhpcy5fZGlzcGxhY2VtZW50ID0gMDtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzdGFydCcsIHtcbiAgICAgICAgY291bnQ6IGV2ZW50LnRvdWNoZXMubGVuZ3RoLFxuICAgICAgICB0b3VjaGVzOiBbXG4gICAgICAgICAgICB0aGlzLnRvdWNoQUlkLFxuICAgICAgICAgICAgdGhpcy50b3VjaEJJZFxuICAgICAgICBdLFxuICAgICAgICBkaXN0YW5jZTogdGhpcy5fZGlzdCxcbiAgICAgICAgY2VudGVyOiBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZUNlbnRlcih0aGlzLnBvc0EsIHRoaXMucG9zQilcbiAgICB9KTtcbn07XG5QaW5jaFN5bmMucHJvdG90eXBlLl9tb3ZlVXBkYXRlID0gZnVuY3Rpb24gX21vdmVVcGRhdGUoZGlmZlRpbWUpIHtcbiAgICB2YXIgY3VyckRpc3QgPSBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZURpc3RhbmNlKHRoaXMucG9zQSwgdGhpcy5wb3NCKTtcbiAgICB2YXIgY2VudGVyID0gVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVDZW50ZXIodGhpcy5wb3NBLCB0aGlzLnBvc0IpO1xuICAgIHZhciBzY2FsZSA9IHRoaXMub3B0aW9ucy5zY2FsZTtcbiAgICB2YXIgZGVsdGEgPSBzY2FsZSAqIChjdXJyRGlzdCAtIHRoaXMuX3ByZXZpb3VzRGlzdGFuY2UpO1xuICAgIHZhciB2ZWxvY2l0eSA9IGRlbHRhIC8gZGlmZlRpbWU7XG4gICAgdGhpcy5fcHJldmlvdXNEaXN0YW5jZSA9IGN1cnJEaXN0O1xuICAgIHRoaXMuX2Rpc3BsYWNlbWVudCArPSBkZWx0YTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCd1cGRhdGUnLCB7XG4gICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICBkaXN0YW5jZTogY3VyckRpc3QsXG4gICAgICAgIGRpc3BsYWNlbWVudDogdGhpcy5fZGlzcGxhY2VtZW50LFxuICAgICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXVxuICAgIH0pO1xufTtcblBpbmNoU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5QaW5jaFN5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFBpbmNoU3luYzsiLCJ2YXIgVHdvRmluZ2VyU3luYyA9IHJlcXVpcmUoJy4vVHdvRmluZ2VyU3luYycpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gUm90YXRlU3luYyhvcHRpb25zKSB7XG4gICAgVHdvRmluZ2VyU3luYy5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoUm90YXRlU3luYy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9hbmdsZSA9IDA7XG4gICAgdGhpcy5fcHJldmlvdXNBbmdsZSA9IDA7XG59XG5Sb3RhdGVTeW5jLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVHdvRmluZ2VyU3luYy5wcm90b3R5cGUpO1xuUm90YXRlU3luYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSb3RhdGVTeW5jO1xuUm90YXRlU3luYy5ERUZBVUxUX09QVElPTlMgPSB7IHNjYWxlOiAxIH07XG5Sb3RhdGVTeW5jLnByb3RvdHlwZS5fc3RhcnRVcGRhdGUgPSBmdW5jdGlvbiBfc3RhcnRVcGRhdGUoZXZlbnQpIHtcbiAgICB0aGlzLl9hbmdsZSA9IDA7XG4gICAgdGhpcy5fcHJldmlvdXNBbmdsZSA9IFR3b0ZpbmdlclN5bmMuY2FsY3VsYXRlQW5nbGUodGhpcy5wb3NBLCB0aGlzLnBvc0IpO1xuICAgIHZhciBjZW50ZXIgPSBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZUNlbnRlcih0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCB7XG4gICAgICAgIGNvdW50OiBldmVudC50b3VjaGVzLmxlbmd0aCxcbiAgICAgICAgYW5nbGU6IHRoaXMuX2FuZ2xlLFxuICAgICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXVxuICAgIH0pO1xufTtcblJvdGF0ZVN5bmMucHJvdG90eXBlLl9tb3ZlVXBkYXRlID0gZnVuY3Rpb24gX21vdmVVcGRhdGUoZGlmZlRpbWUpIHtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLm9wdGlvbnMuc2NhbGU7XG4gICAgdmFyIGN1cnJBbmdsZSA9IFR3b0ZpbmdlclN5bmMuY2FsY3VsYXRlQW5nbGUodGhpcy5wb3NBLCB0aGlzLnBvc0IpO1xuICAgIHZhciBjZW50ZXIgPSBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZUNlbnRlcih0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdmFyIGRpZmZUaGV0YSA9IHNjYWxlICogKGN1cnJBbmdsZSAtIHRoaXMuX3ByZXZpb3VzQW5nbGUpO1xuICAgIHZhciB2ZWxUaGV0YSA9IGRpZmZUaGV0YSAvIGRpZmZUaW1lO1xuICAgIHRoaXMuX2FuZ2xlICs9IGRpZmZUaGV0YTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCd1cGRhdGUnLCB7XG4gICAgICAgIGRlbHRhOiBkaWZmVGhldGEsXG4gICAgICAgIHZlbG9jaXR5OiB2ZWxUaGV0YSxcbiAgICAgICAgYW5nbGU6IHRoaXMuX2FuZ2xlLFxuICAgICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXVxuICAgIH0pO1xuICAgIHRoaXMuX3ByZXZpb3VzQW5nbGUgPSBjdXJyQW5nbGU7XG59O1xuUm90YXRlU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5Sb3RhdGVTeW5jLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBSb3RhdGVTeW5jOyIsInZhciBUd29GaW5nZXJTeW5jID0gcmVxdWlyZSgnLi9Ud29GaW5nZXJTeW5jJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBTY2FsZVN5bmMob3B0aW9ucykge1xuICAgIFR3b0ZpbmdlclN5bmMuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFNjYWxlU3luYy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9zY2FsZUZhY3RvciA9IDE7XG4gICAgdGhpcy5fc3RhcnREaXN0ID0gMDtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdwaXBlJywgX3Jlc2V0LmJpbmQodGhpcykpO1xufVxuU2NhbGVTeW5jLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVHdvRmluZ2VyU3luYy5wcm90b3R5cGUpO1xuU2NhbGVTeW5jLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNjYWxlU3luYztcblNjYWxlU3luYy5ERUZBVUxUX09QVElPTlMgPSB7IHNjYWxlOiAxIH07XG5mdW5jdGlvbiBfcmVzZXQoKSB7XG4gICAgdGhpcy50b3VjaEFJZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRvdWNoQklkID0gdW5kZWZpbmVkO1xufVxuU2NhbGVTeW5jLnByb3RvdHlwZS5fc3RhcnRVcGRhdGUgPSBmdW5jdGlvbiBfc3RhcnRVcGRhdGUoZXZlbnQpIHtcbiAgICB0aGlzLl9zY2FsZUZhY3RvciA9IDE7XG4gICAgdGhpcy5fc3RhcnREaXN0ID0gVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVEaXN0YW5jZSh0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCB7XG4gICAgICAgIGNvdW50OiBldmVudC50b3VjaGVzLmxlbmd0aCxcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXSxcbiAgICAgICAgZGlzdGFuY2U6IHRoaXMuX3N0YXJ0RGlzdCxcbiAgICAgICAgY2VudGVyOiBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZUNlbnRlcih0aGlzLnBvc0EsIHRoaXMucG9zQilcbiAgICB9KTtcbn07XG5TY2FsZVN5bmMucHJvdG90eXBlLl9tb3ZlVXBkYXRlID0gZnVuY3Rpb24gX21vdmVVcGRhdGUoZGlmZlRpbWUpIHtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLm9wdGlvbnMuc2NhbGU7XG4gICAgdmFyIGN1cnJEaXN0ID0gVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVEaXN0YW5jZSh0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdmFyIGNlbnRlciA9IFR3b0ZpbmdlclN5bmMuY2FsY3VsYXRlQ2VudGVyKHRoaXMucG9zQSwgdGhpcy5wb3NCKTtcbiAgICB2YXIgZGVsdGEgPSAoY3VyckRpc3QgLSB0aGlzLl9zdGFydERpc3QpIC8gdGhpcy5fc3RhcnREaXN0O1xuICAgIHZhciBuZXdTY2FsZUZhY3RvciA9IE1hdGgubWF4KDEgKyBzY2FsZSAqIGRlbHRhLCAwKTtcbiAgICB2YXIgdmVsb1NjYWxlID0gKG5ld1NjYWxlRmFjdG9yIC0gdGhpcy5fc2NhbGVGYWN0b3IpIC8gZGlmZlRpbWU7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgndXBkYXRlJywge1xuICAgICAgICBkZWx0YTogZGVsdGEsXG4gICAgICAgIHNjYWxlOiBuZXdTY2FsZUZhY3RvcixcbiAgICAgICAgdmVsb2NpdHk6IHZlbG9TY2FsZSxcbiAgICAgICAgZGlzdGFuY2U6IGN1cnJEaXN0LFxuICAgICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXVxuICAgIH0pO1xuICAgIHRoaXMuX3NjYWxlRmFjdG9yID0gbmV3U2NhbGVGYWN0b3I7XG59O1xuU2NhbGVTeW5jLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xufTtcblNjYWxlU3luYy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU2NhbGVTeW5jOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIEVuZ2luZSA9IHJlcXVpcmUoJy4uL2NvcmUvRW5naW5lJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBTY3JvbGxTeW5jKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFNjcm9sbFN5bmMuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fcGF5bG9hZCA9IHtcbiAgICAgICAgZGVsdGE6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICB2ZWxvY2l0eTogbnVsbCxcbiAgICAgICAgc2xpcDogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5fZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50SW5wdXQpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IHVuZGVmaW5lZCA/IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0gOiAwO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZXZWZWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2V3aGVlbCcsIF9oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ3doZWVsJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5faW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIHRoaXMuX2xvb3BCb3VuZCA9IGZhbHNlO1xufVxuU2Nyb2xsU3luYy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGlyZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgbWluaW11bUVuZFNwZWVkOiBJbmZpbml0eSxcbiAgICByYWlsczogZmFsc2UsXG4gICAgc2NhbGU6IDEsXG4gICAgc3RhbGxUaW1lOiA1MCxcbiAgICBsaW5lSGVpZ2h0OiA0MCxcbiAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxufTtcblNjcm9sbFN5bmMuRElSRUNUSU9OX1ggPSAwO1xuU2Nyb2xsU3luYy5ESVJFQ1RJT05fWSA9IDE7XG52YXIgTUlOSU1VTV9USUNLX1RJTUUgPSA4O1xudmFyIF9ub3cgPSBEYXRlLm5vdztcbmZ1bmN0aW9uIF9uZXdGcmFtZSgpIHtcbiAgICBpZiAodGhpcy5faW5Qcm9ncmVzcyAmJiBfbm93KCkgLSB0aGlzLl9wcmV2VGltZSA+IHRoaXMub3B0aW9ucy5zdGFsbFRpbWUpIHtcbiAgICAgICAgdGhpcy5faW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB2YXIgZmluYWxWZWwgPSBNYXRoLmFicyh0aGlzLl9wcmV2VmVsKSA+PSB0aGlzLm9wdGlvbnMubWluaW11bUVuZFNwZWVkID8gdGhpcy5fcHJldlZlbCA6IDA7XG4gICAgICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICAgICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgICAgICBwYXlsb2FkLnZlbG9jaXR5ID0gZmluYWxWZWw7XG4gICAgICAgIHBheWxvYWQuc2xpcCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHBheWxvYWQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRoaXMuX2luUHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5faW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkID8gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSA6IDA7XG4gICAgICAgIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgICAgICBwYXlsb2FkLnNsaXAgPSB0cnVlO1xuICAgICAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgICAgIHBheWxvYWQuY2xpZW50WCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIHBheWxvYWQuY2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgIHBheWxvYWQub2Zmc2V0WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIHBheWxvYWQub2Zmc2V0WSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3N0YXJ0JywgcGF5bG9hZCk7XG4gICAgICAgIGlmICghdGhpcy5fbG9vcEJvdW5kKSB7XG4gICAgICAgICAgICBFbmdpbmUub24oJ3ByZXJlbmRlcicsIF9uZXdGcmFtZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuX2xvb3BCb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGN1cnJUaW1lID0gX25vdygpO1xuICAgIHZhciBwcmV2VGltZSA9IHRoaXMuX3ByZXZUaW1lIHx8IGN1cnJUaW1lO1xuICAgIHZhciBkaWZmWCA9IGV2ZW50LndoZWVsRGVsdGFYICE9PSB1bmRlZmluZWQgPyBldmVudC53aGVlbERlbHRhWCA6IC1ldmVudC5kZWx0YVg7XG4gICAgdmFyIGRpZmZZID0gZXZlbnQud2hlZWxEZWx0YVkgIT09IHVuZGVmaW5lZCA/IGV2ZW50LndoZWVsRGVsdGFZIDogLWV2ZW50LmRlbHRhWTtcbiAgICBpZiAoZXZlbnQuZGVsdGFNb2RlID09PSAxKSB7XG4gICAgICAgIGRpZmZYICo9IHRoaXMub3B0aW9ucy5saW5lSGVpZ2h0O1xuICAgICAgICBkaWZmWSAqPSB0aGlzLm9wdGlvbnMubGluZUhlaWdodDtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yYWlscykge1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKVxuICAgICAgICAgICAgZGlmZlkgPSAwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkaWZmWCA9IDA7XG4gICAgfVxuICAgIHZhciBkaWZmVGltZSA9IE1hdGgubWF4KGN1cnJUaW1lIC0gcHJldlRpbWUsIE1JTklNVU1fVElDS19USU1FKTtcbiAgICB2YXIgdmVsWCA9IGRpZmZYIC8gZGlmZlRpbWU7XG4gICAgdmFyIHZlbFkgPSBkaWZmWSAvIGRpZmZUaW1lO1xuICAgIHZhciBzY2FsZSA9IHRoaXMub3B0aW9ucy5zY2FsZTtcbiAgICB2YXIgbmV4dFZlbDtcbiAgICB2YXIgbmV4dERlbHRhO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBTY3JvbGxTeW5jLkRJUkVDVElPTl9YKSB7XG4gICAgICAgIG5leHREZWx0YSA9IHNjYWxlICogZGlmZlg7XG4gICAgICAgIG5leHRWZWwgPSBzY2FsZSAqIHZlbFg7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uICs9IG5leHREZWx0YTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFNjcm9sbFN5bmMuRElSRUNUSU9OX1kpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWTtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogdmVsWTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHREZWx0YSA9IFtcbiAgICAgICAgICAgIHNjYWxlICogZGlmZlgsXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZZXG4gICAgICAgIF07XG4gICAgICAgIG5leHRWZWwgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFgsXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFlcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMF0gKz0gbmV4dERlbHRhWzBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblsxXSArPSBuZXh0RGVsdGFbMV07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gbmV4dERlbHRhO1xuICAgIHBheWxvYWQudmVsb2NpdHkgPSBuZXh0VmVsO1xuICAgIHBheWxvYWQucG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICBwYXlsb2FkLnNsaXAgPSB0cnVlO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3VwZGF0ZScsIHBheWxvYWQpO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gY3VyclRpbWU7XG4gICAgdGhpcy5fcHJldlZlbCA9IG5leHRWZWw7XG59XG5TY3JvbGxTeW5jLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xufTtcblNjcm9sbFN5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbFN5bmM7IiwidmFyIFRvdWNoVHJhY2tlciA9IHJlcXVpcmUoJy4vVG91Y2hUcmFja2VyJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJy4uL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbmZ1bmN0aW9uIFRvdWNoU3luYyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShUb3VjaFN5bmMuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fdG91Y2hUcmFja2VyID0gbmV3IFRvdWNoVHJhY2tlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX3RvdWNoVHJhY2tlcik7XG4gICAgdGhpcy5fdG91Y2hUcmFja2VyLm9uKCd0cmFja3N0YXJ0JywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3RvdWNoVHJhY2tlci5vbigndHJhY2ttb3ZlJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fdG91Y2hUcmFja2VyLm9uKCd0cmFja2VuZCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fcGF5bG9hZCA9IHtcbiAgICAgICAgZGVsdGE6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICB2ZWxvY2l0eTogbnVsbCxcbiAgICAgICAgY2xpZW50WDogdW5kZWZpbmVkLFxuICAgICAgICBjbGllbnRZOiB1bmRlZmluZWQsXG4gICAgICAgIGNvdW50OiAwLFxuICAgICAgICB0b3VjaDogdW5kZWZpbmVkXG4gICAgfTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XG59XG5Ub3VjaFN5bmMuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpcmVjdGlvbjogdW5kZWZpbmVkLFxuICAgIHJhaWxzOiBmYWxzZSxcbiAgICBzY2FsZTogMVxufTtcblRvdWNoU3luYy5ESVJFQ1RJT05fWCA9IDA7XG5Ub3VjaFN5bmMuRElSRUNUSU9OX1kgPSAxO1xudmFyIE1JTklNVU1fVElDS19USU1FID0gODtcbmZ1bmN0aW9uIF9oYW5kbGVTdGFydChkYXRhKSB7XG4gICAgdmFyIHZlbG9jaXR5O1xuICAgIHZhciBkZWx0YTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgdmVsb2NpdHkgPSAwO1xuICAgICAgICBkZWx0YSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICB2ZWxvY2l0eSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgICAgIGRlbHRhID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICB9XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgIHBheWxvYWQuZGVsdGEgPSBkZWx0YTtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIHBheWxvYWQuY2xpZW50WCA9IGRhdGEueDtcbiAgICBwYXlsb2FkLmNsaWVudFkgPSBkYXRhLnk7XG4gICAgcGF5bG9hZC5jb3VudCA9IGRhdGEuY291bnQ7XG4gICAgcGF5bG9hZC50b3VjaCA9IGRhdGEuaWRlbnRpZmllcjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzdGFydCcsIHBheWxvYWQpO1xufVxuZnVuY3Rpb24gX2hhbmRsZU1vdmUoZGF0YSkge1xuICAgIHZhciBoaXN0b3J5ID0gZGF0YS5oaXN0b3J5O1xuICAgIHZhciBjdXJySGlzdG9yeSA9IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAxXTtcbiAgICB2YXIgcHJldkhpc3RvcnkgPSBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMl07XG4gICAgdmFyIHByZXZUaW1lID0gcHJldkhpc3RvcnkudGltZXN0YW1wO1xuICAgIHZhciBjdXJyVGltZSA9IGN1cnJIaXN0b3J5LnRpbWVzdGFtcDtcbiAgICB2YXIgZGlmZlggPSBjdXJySGlzdG9yeS54IC0gcHJldkhpc3RvcnkueDtcbiAgICB2YXIgZGlmZlkgPSBjdXJySGlzdG9yeS55IC0gcHJldkhpc3RvcnkueTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJhaWxzKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpXG4gICAgICAgICAgICBkaWZmWSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpZmZYID0gMDtcbiAgICB9XG4gICAgdmFyIGRpZmZUaW1lID0gTWF0aC5tYXgoY3VyclRpbWUgLSBwcmV2VGltZSwgTUlOSU1VTV9USUNLX1RJTUUpO1xuICAgIHZhciB2ZWxYID0gZGlmZlggLyBkaWZmVGltZTtcbiAgICB2YXIgdmVsWSA9IGRpZmZZIC8gZGlmZlRpbWU7XG4gICAgdmFyIHNjYWxlID0gdGhpcy5vcHRpb25zLnNjYWxlO1xuICAgIHZhciBuZXh0VmVsO1xuICAgIHZhciBuZXh0RGVsdGE7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFRvdWNoU3luYy5ESVJFQ1RJT05fWCkge1xuICAgICAgICBuZXh0RGVsdGEgPSBzY2FsZSAqIGRpZmZYO1xuICAgICAgICBuZXh0VmVsID0gc2NhbGUgKiB2ZWxYO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiArPSBuZXh0RGVsdGE7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBUb3VjaFN5bmMuRElSRUNUSU9OX1kpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWTtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogdmVsWTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHREZWx0YSA9IFtcbiAgICAgICAgICAgIHNjYWxlICogZGlmZlgsXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZZXG4gICAgICAgIF07XG4gICAgICAgIG5leHRWZWwgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFgsXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFlcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMF0gKz0gbmV4dERlbHRhWzBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblsxXSArPSBuZXh0RGVsdGFbMV07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gbmV4dERlbHRhO1xuICAgIHBheWxvYWQudmVsb2NpdHkgPSBuZXh0VmVsO1xuICAgIHBheWxvYWQucG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICBwYXlsb2FkLmNsaWVudFggPSBkYXRhLng7XG4gICAgcGF5bG9hZC5jbGllbnRZID0gZGF0YS55O1xuICAgIHBheWxvYWQuY291bnQgPSBkYXRhLmNvdW50O1xuICAgIHBheWxvYWQudG91Y2ggPSBkYXRhLmlkZW50aWZpZXI7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgndXBkYXRlJywgcGF5bG9hZCk7XG59XG5mdW5jdGlvbiBfaGFuZGxlRW5kKGRhdGEpIHtcbiAgICB0aGlzLl9wYXlsb2FkLmNvdW50ID0gZGF0YS5jb3VudDtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdlbmQnLCB0aGlzLl9wYXlsb2FkKTtcbn1cblRvdWNoU3luYy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcblRvdWNoU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRvdWNoU3luYzsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBfbm93ID0gRGF0ZS5ub3c7XG5mdW5jdGlvbiBfdGltZXN0YW1wVG91Y2godG91Y2gsIGV2ZW50LCBoaXN0b3J5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogdG91Y2guY2xpZW50WCxcbiAgICAgICAgeTogdG91Y2guY2xpZW50WSxcbiAgICAgICAgaWRlbnRpZmllcjogdG91Y2guaWRlbnRpZmllcixcbiAgICAgICAgb3JpZ2luOiBldmVudC5vcmlnaW4sXG4gICAgICAgIHRpbWVzdGFtcDogX25vdygpLFxuICAgICAgICBjb3VudDogZXZlbnQudG91Y2hlcy5sZW5ndGgsXG4gICAgICAgIGhpc3Rvcnk6IGhpc3RvcnlcbiAgICB9O1xufVxuZnVuY3Rpb24gX2hhbmRsZVN0YXJ0KGV2ZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGRhdGEgPSBfdGltZXN0YW1wVG91Y2godG91Y2gsIGV2ZW50LCBudWxsKTtcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja3N0YXJ0JywgZGF0YSk7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RpdmUgJiYgIXRoaXMudG91Y2hIaXN0b3J5W3RvdWNoLmlkZW50aWZpZXJdKVxuICAgICAgICAgICAgdGhpcy50cmFjayhkYXRhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlTW92ZShldmVudCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBoaXN0b3J5ID0gdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IF90aW1lc3RhbXBUb3VjaCh0b3VjaCwgZXZlbnQsIGhpc3RvcnkpO1xuICAgICAgICAgICAgdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl0ucHVzaChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgndHJhY2ttb3ZlJywgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlRW5kKGV2ZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLnRvdWNoSGlzdG9yeVt0b3VjaC5pZGVudGlmaWVyXTtcbiAgICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gX3RpbWVzdGFtcFRvdWNoKHRvdWNoLCBldmVudCwgaGlzdG9yeSk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ3RyYWNrZW5kJywgZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlVW5waXBlKCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy50b3VjaEhpc3RvcnkpIHtcbiAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLnRvdWNoSGlzdG9yeVtpXTtcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja2VuZCcsIHtcbiAgICAgICAgICAgIHRvdWNoOiBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMV0udG91Y2gsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICAgIGhpc3Rvcnk6IGhpc3RvcnlcbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnRvdWNoSGlzdG9yeVtpXTtcbiAgICB9XG59XG5mdW5jdGlvbiBUb3VjaFRyYWNrZXIoc2VsZWN0aXZlKSB7XG4gICAgdGhpcy5zZWxlY3RpdmUgPSBzZWxlY3RpdmU7XG4gICAgdGhpcy50b3VjaEhpc3RvcnkgPSB7fTtcbiAgICB0aGlzLmV2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaHN0YXJ0JywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuZXZlbnRJbnB1dC5vbigndG91Y2htb3ZlJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaGVuZCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaGNhbmNlbCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd1bnBpcGUnLCBfaGFuZGxlVW5waXBlLmJpbmQodGhpcykpO1xufVxuVG91Y2hUcmFja2VyLnByb3RvdHlwZS50cmFjayA9IGZ1bmN0aW9uIHRyYWNrKGRhdGEpIHtcbiAgICB0aGlzLnRvdWNoSGlzdG9yeVtkYXRhLmlkZW50aWZpZXJdID0gW2RhdGFdO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVG91Y2hUcmFja2VyOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gVHdvRmluZ2VyU3luYygpIHtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMudG91Y2hBRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudG91Y2hBSWQgPSAwO1xuICAgIHRoaXMucG9zQSA9IG51bGw7XG4gICAgdGhpcy50aW1lc3RhbXBBID0gMDtcbiAgICB0aGlzLnRvdWNoQkVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRvdWNoQklkID0gMDtcbiAgICB0aGlzLnBvc0IgPSBudWxsO1xuICAgIHRoaXMudGltZXN0YW1wQiA9IDA7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbigndG91Y2hjYW5jZWwnLCB0aGlzLmhhbmRsZUVuZC5iaW5kKHRoaXMpKTtcbn1cblR3b0ZpbmdlclN5bmMuY2FsY3VsYXRlQW5nbGUgPSBmdW5jdGlvbiAocG9zQSwgcG9zQikge1xuICAgIHZhciBkaWZmWCA9IHBvc0JbMF0gLSBwb3NBWzBdO1xuICAgIHZhciBkaWZmWSA9IHBvc0JbMV0gLSBwb3NBWzFdO1xuICAgIHJldHVybiBNYXRoLmF0YW4yKGRpZmZZLCBkaWZmWCk7XG59O1xuVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uIChwb3NBLCBwb3NCKSB7XG4gICAgdmFyIGRpZmZYID0gcG9zQlswXSAtIHBvc0FbMF07XG4gICAgdmFyIGRpZmZZID0gcG9zQlsxXSAtIHBvc0FbMV07XG4gICAgcmV0dXJuIE1hdGguc3FydChkaWZmWCAqIGRpZmZYICsgZGlmZlkgKiBkaWZmWSk7XG59O1xuVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVDZW50ZXIgPSBmdW5jdGlvbiAocG9zQSwgcG9zQikge1xuICAgIHJldHVybiBbXG4gICAgICAgIChwb3NBWzBdICsgcG9zQlswXSkgLyAyLFxuICAgICAgICAocG9zQVsxXSArIHBvc0JbMV0pIC8gMlxuICAgIF07XG59O1xudmFyIF9ub3cgPSBEYXRlLm5vdztcblR3b0ZpbmdlclN5bmMucHJvdG90eXBlLmhhbmRsZVN0YXJ0ID0gZnVuY3Rpb24gaGFuZGxlU3RhcnQoZXZlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICBpZiAoIXRoaXMudG91Y2hBRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCA9IHRvdWNoLmlkZW50aWZpZXI7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQUVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wb3NBID0gW1xuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VZXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy50aW1lc3RhbXBBID0gX25vdygpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnRvdWNoQkVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWQgPSB0b3VjaC5pZGVudGlmaWVyO1xuICAgICAgICAgICAgdGhpcy50b3VjaEJFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucG9zQiA9IFtcbiAgICAgICAgICAgICAgICB0b3VjaC5wYWdlWCxcbiAgICAgICAgICAgICAgICB0b3VjaC5wYWdlWVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMudGltZXN0YW1wQiA9IF9ub3coKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0VXBkYXRlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5Ud29GaW5nZXJTeW5jLnByb3RvdHlwZS5oYW5kbGVNb3ZlID0gZnVuY3Rpb24gaGFuZGxlTW92ZShldmVudCkge1xuICAgIGlmICghKHRoaXMudG91Y2hBRW5hYmxlZCAmJiB0aGlzLnRvdWNoQkVuYWJsZWQpKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIHByZXZUaW1lQSA9IHRoaXMudGltZXN0YW1wQTtcbiAgICB2YXIgcHJldlRpbWVCID0gdGhpcy50aW1lc3RhbXBCO1xuICAgIHZhciBkaWZmVGltZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy50b3VjaEFJZCkge1xuICAgICAgICAgICAgdGhpcy5wb3NBID0gW1xuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VZXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy50aW1lc3RhbXBBID0gX25vdygpO1xuICAgICAgICAgICAgZGlmZlRpbWUgPSB0aGlzLnRpbWVzdGFtcEEgLSBwcmV2VGltZUE7XG4gICAgICAgIH0gZWxzZSBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy50b3VjaEJJZCkge1xuICAgICAgICAgICAgdGhpcy5wb3NCID0gW1xuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VZXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy50aW1lc3RhbXBCID0gX25vdygpO1xuICAgICAgICAgICAgZGlmZlRpbWUgPSB0aGlzLnRpbWVzdGFtcEIgLSBwcmV2VGltZUI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRpZmZUaW1lKVxuICAgICAgICB0aGlzLl9tb3ZlVXBkYXRlKGRpZmZUaW1lKTtcbn07XG5Ud29GaW5nZXJTeW5jLnByb3RvdHlwZS5oYW5kbGVFbmQgPSBmdW5jdGlvbiBoYW5kbGVFbmQoZXZlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy50b3VjaEFJZCB8fCB0b3VjaC5pZGVudGlmaWVyID09PSB0aGlzLnRvdWNoQklkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50b3VjaEFFbmFibGVkICYmIHRoaXMudG91Y2hCRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYW5nbGU6IHRoaXMuX2FuZ2xlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRvdWNoQUVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudG91Y2hBSWQgPSAwO1xuICAgICAgICAgICAgdGhpcy50b3VjaEJFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQklkID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFR3b0ZpbmdlclN5bmM7IiwidmFyIFZlY3RvciA9IHJlcXVpcmUoJy4vVmVjdG9yJyk7XG5mdW5jdGlvbiBNYXRyaXgodmFsdWVzKSB7XG4gICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXMgfHwgW1xuICAgICAgICBbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdXG4gICAgXTtcbiAgICByZXR1cm4gdGhpcztcbn1cbnZhciBfcmVnaXN0ZXIgPSBuZXcgTWF0cml4KCk7XG52YXIgX3ZlY3RvclJlZ2lzdGVyID0gbmV3IFZlY3RvcigpO1xuTWF0cml4LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzO1xufTtcbk1hdHJpeC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHZhbHVlcykge1xuICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xufTtcbk1hdHJpeC5wcm90b3R5cGUudmVjdG9yTXVsdGlwbHkgPSBmdW5jdGlvbiB2ZWN0b3JNdWx0aXBseSh2KSB7XG4gICAgdmFyIE0gPSB0aGlzLmdldCgpO1xuICAgIHZhciB2MCA9IHYueDtcbiAgICB2YXIgdjEgPSB2Lnk7XG4gICAgdmFyIHYyID0gdi56O1xuICAgIHZhciBNMCA9IE1bMF07XG4gICAgdmFyIE0xID0gTVsxXTtcbiAgICB2YXIgTTIgPSBNWzJdO1xuICAgIHZhciBNMDAgPSBNMFswXTtcbiAgICB2YXIgTTAxID0gTTBbMV07XG4gICAgdmFyIE0wMiA9IE0wWzJdO1xuICAgIHZhciBNMTAgPSBNMVswXTtcbiAgICB2YXIgTTExID0gTTFbMV07XG4gICAgdmFyIE0xMiA9IE0xWzJdO1xuICAgIHZhciBNMjAgPSBNMlswXTtcbiAgICB2YXIgTTIxID0gTTJbMV07XG4gICAgdmFyIE0yMiA9IE0yWzJdO1xuICAgIHJldHVybiBfdmVjdG9yUmVnaXN0ZXIuc2V0WFlaKE0wMCAqIHYwICsgTTAxICogdjEgKyBNMDIgKiB2MiwgTTEwICogdjAgKyBNMTEgKiB2MSArIE0xMiAqIHYyLCBNMjAgKiB2MCArIE0yMSAqIHYxICsgTTIyICogdjIpO1xufTtcbk1hdHJpeC5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShNMikge1xuICAgIHZhciBNMSA9IHRoaXMuZ2V0KCk7XG4gICAgdmFyIHJlc3VsdCA9IFtbXV07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gW107XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgMzsgaysrKSB7XG4gICAgICAgICAgICAgICAgc3VtICs9IE0xW2ldW2tdICogTTJba11bal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbaV1bal0gPSBzdW07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5zZXQocmVzdWx0KTtcbn07XG5NYXRyaXgucHJvdG90eXBlLnRyYW5zcG9zZSA9IGZ1bmN0aW9uIHRyYW5zcG9zZSgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIE0gPSB0aGlzLmdldCgpO1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IDM7IHJvdysrKSB7XG4gICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IDM7IGNvbCsrKSB7XG4gICAgICAgICAgICByZXN1bHRbcm93XVtjb2xdID0gTVtjb2xdW3Jvd107XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5zZXQocmVzdWx0KTtcbn07XG5NYXRyaXgucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuZ2V0KCk7XG4gICAgdmFyIE0gPSBbXTtcbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCAzOyByb3crKylcbiAgICAgICAgTVtyb3ddID0gdmFsdWVzW3Jvd10uc2xpY2UoKTtcbiAgICByZXR1cm4gbmV3IE1hdHJpeChNKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE1hdHJpeDsiLCJ2YXIgTWF0cml4ID0gcmVxdWlyZSgnLi9NYXRyaXgnKTtcbmZ1bmN0aW9uIFF1YXRlcm5pb24odywgeCwgeSwgeikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKVxuICAgICAgICB0aGlzLnNldCh3KTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy53ID0gdyAhPT0gdW5kZWZpbmVkID8gdyA6IDE7XG4gICAgICAgIHRoaXMueCA9IHggIT09IHVuZGVmaW5lZCA/IHggOiAwO1xuICAgICAgICB0aGlzLnkgPSB5ICE9PSB1bmRlZmluZWQgPyB5IDogMDtcbiAgICAgICAgdGhpcy56ID0geiAhPT0gdW5kZWZpbmVkID8geiA6IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxudmFyIHJlZ2lzdGVyID0gbmV3IFF1YXRlcm5pb24oMSwgMCwgMCwgMCk7XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQocSkge1xuICAgIHJldHVybiByZWdpc3Rlci5zZXRXWFlaKHRoaXMudyArIHEudywgdGhpcy54ICsgcS54LCB0aGlzLnkgKyBxLnksIHRoaXMueiArIHEueik7XG59O1xuUXVhdGVybmlvbi5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gc3ViKHEpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXIuc2V0V1hZWih0aGlzLncgLSBxLncsIHRoaXMueCAtIHEueCwgdGhpcy55IC0gcS55LCB0aGlzLnogLSBxLnopO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnNjYWxhckRpdmlkZSA9IGZ1bmN0aW9uIHNjYWxhckRpdmlkZShzKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NhbGFyTXVsdGlwbHkoMSAvIHMpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnNjYWxhck11bHRpcGx5ID0gZnVuY3Rpb24gc2NhbGFyTXVsdGlwbHkocykge1xuICAgIHJldHVybiByZWdpc3Rlci5zZXRXWFlaKHRoaXMudyAqIHMsIHRoaXMueCAqIHMsIHRoaXMueSAqIHMsIHRoaXMueiAqIHMpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gbXVsdGlwbHkocSkge1xuICAgIHZhciB4MSA9IHRoaXMueDtcbiAgICB2YXIgeTEgPSB0aGlzLnk7XG4gICAgdmFyIHoxID0gdGhpcy56O1xuICAgIHZhciB3MSA9IHRoaXMudztcbiAgICB2YXIgeDIgPSBxLng7XG4gICAgdmFyIHkyID0gcS55O1xuICAgIHZhciB6MiA9IHEuejtcbiAgICB2YXIgdzIgPSBxLncgfHwgMDtcbiAgICByZXR1cm4gcmVnaXN0ZXIuc2V0V1hZWih3MSAqIHcyIC0geDEgKiB4MiAtIHkxICogeTIgLSB6MSAqIHoyLCB4MSAqIHcyICsgeDIgKiB3MSArIHkyICogejEgLSB5MSAqIHoyLCB5MSAqIHcyICsgeTIgKiB3MSArIHgxICogejIgLSB4MiAqIHoxLCB6MSAqIHcyICsgejIgKiB3MSArIHgyICogeTEgLSB4MSAqIHkyKTtcbn07XG52YXIgY29uaiA9IG5ldyBRdWF0ZXJuaW9uKDEsIDAsIDAsIDApO1xuUXVhdGVybmlvbi5wcm90b3R5cGUucm90YXRlVmVjdG9yID0gZnVuY3Rpb24gcm90YXRlVmVjdG9yKHYpIHtcbiAgICBjb25qLnNldCh0aGlzLmNvbmooKSk7XG4gICAgcmV0dXJuIHJlZ2lzdGVyLnNldCh0aGlzLm11bHRpcGx5KHYpLm11bHRpcGx5KGNvbmopKTtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5pbnZlcnNlID0gZnVuY3Rpb24gaW52ZXJzZSgpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXIuc2V0KHRoaXMuY29uaigpLnNjYWxhckRpdmlkZSh0aGlzLm5vcm1TcXVhcmVkKCkpKTtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5uZWdhdGUgPSBmdW5jdGlvbiBuZWdhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NhbGFyTXVsdGlwbHkoLTEpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLmNvbmogPSBmdW5jdGlvbiBjb25qKCkge1xuICAgIHJldHVybiByZWdpc3Rlci5zZXRXWFlaKHRoaXMudywgLXRoaXMueCwgLXRoaXMueSwgLXRoaXMueik7XG59O1xuUXVhdGVybmlvbi5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gbm9ybWFsaXplKGxlbmd0aCkge1xuICAgIGxlbmd0aCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gMSA6IGxlbmd0aDtcbiAgICByZXR1cm4gdGhpcy5zY2FsYXJEaXZpZGUobGVuZ3RoICogdGhpcy5ub3JtKCkpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLm1ha2VGcm9tQW5nbGVBbmRBeGlzID0gZnVuY3Rpb24gbWFrZUZyb21BbmdsZUFuZEF4aXMoYW5nbGUsIHYpIHtcbiAgICB2YXIgbiA9IHYubm9ybWFsaXplKCk7XG4gICAgdmFyIGhhID0gYW5nbGUgKiAwLjU7XG4gICAgdmFyIHMgPSAtTWF0aC5zaW4oaGEpO1xuICAgIHRoaXMueCA9IHMgKiBuLng7XG4gICAgdGhpcy55ID0gcyAqIG4ueTtcbiAgICB0aGlzLnogPSBzICogbi56O1xuICAgIHRoaXMudyA9IE1hdGguY29zKGhhKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5zZXRXWFlaID0gZnVuY3Rpb24gc2V0V1hZWih3LCB4LCB5LCB6KSB7XG4gICAgcmVnaXN0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLncgPSB3O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnogPSB6O1xuICAgIHJldHVybiB0aGlzO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCh2KSB7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB0aGlzLncgPSAwO1xuICAgICAgICB0aGlzLnggPSB2WzBdO1xuICAgICAgICB0aGlzLnkgPSB2WzFdO1xuICAgICAgICB0aGlzLnogPSB2WzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudyA9IHYudztcbiAgICAgICAgdGhpcy54ID0gdi54O1xuICAgICAgICB0aGlzLnkgPSB2Lnk7XG4gICAgICAgIHRoaXMueiA9IHYuejtcbiAgICB9XG4gICAgaWYgKHRoaXMgIT09IHJlZ2lzdGVyKVxuICAgICAgICByZWdpc3Rlci5jbGVhcigpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uIHB1dChxKSB7XG4gICAgcS5zZXQocmVnaXN0ZXIpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBRdWF0ZXJuaW9uKHRoaXMpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdGhpcy53ID0gMTtcbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gICAgdGhpcy56ID0gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5pc0VxdWFsID0gZnVuY3Rpb24gaXNFcXVhbChxKSB7XG4gICAgcmV0dXJuIHEudyA9PT0gdGhpcy53ICYmIHEueCA9PT0gdGhpcy54ICYmIHEueSA9PT0gdGhpcy55ICYmIHEueiA9PT0gdGhpcy56O1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIGRvdChxKSB7XG4gICAgcmV0dXJuIHRoaXMudyAqIHEudyArIHRoaXMueCAqIHEueCArIHRoaXMueSAqIHEueSArIHRoaXMueiAqIHEuejtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5ub3JtU3F1YXJlZCA9IGZ1bmN0aW9uIG5vcm1TcXVhcmVkKCkge1xuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5ub3JtID0gZnVuY3Rpb24gbm9ybSgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubm9ybVNxdWFyZWQoKSk7XG59O1xuUXVhdGVybmlvbi5wcm90b3R5cGUuaXNaZXJvID0gZnVuY3Rpb24gaXNaZXJvKCkge1xuICAgIHJldHVybiAhKHRoaXMueCB8fCB0aGlzLnkgfHwgdGhpcy56KTtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgdmFyIHRlbXAgPSB0aGlzLm5vcm1hbGl6ZSgxKTtcbiAgICB2YXIgeCA9IHRlbXAueDtcbiAgICB2YXIgeSA9IHRlbXAueTtcbiAgICB2YXIgeiA9IHRlbXAuejtcbiAgICB2YXIgdyA9IHRlbXAudztcbiAgICByZXR1cm4gW1xuICAgICAgICAxIC0gMiAqIHkgKiB5IC0gMiAqIHogKiB6LFxuICAgICAgICAyICogeCAqIHkgLSAyICogeiAqIHcsXG4gICAgICAgIDIgKiB4ICogeiArIDIgKiB5ICogdyxcbiAgICAgICAgMCxcbiAgICAgICAgMiAqIHggKiB5ICsgMiAqIHogKiB3LFxuICAgICAgICAxIC0gMiAqIHggKiB4IC0gMiAqIHogKiB6LFxuICAgICAgICAyICogeSAqIHogLSAyICogeCAqIHcsXG4gICAgICAgIDAsXG4gICAgICAgIDIgKiB4ICogeiAtIDIgKiB5ICogdyxcbiAgICAgICAgMiAqIHkgKiB6ICsgMiAqIHggKiB3LFxuICAgICAgICAxIC0gMiAqIHggKiB4IC0gMiAqIHkgKiB5LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG52YXIgbWF0cml4UmVnaXN0ZXIgPSBuZXcgTWF0cml4KCk7XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5nZXRNYXRyaXggPSBmdW5jdGlvbiBnZXRNYXRyaXgoKSB7XG4gICAgdmFyIHRlbXAgPSB0aGlzLm5vcm1hbGl6ZSgxKTtcbiAgICB2YXIgeCA9IHRlbXAueDtcbiAgICB2YXIgeSA9IHRlbXAueTtcbiAgICB2YXIgeiA9IHRlbXAuejtcbiAgICB2YXIgdyA9IHRlbXAudztcbiAgICByZXR1cm4gbWF0cml4UmVnaXN0ZXIuc2V0KFtcbiAgICAgICAgW1xuICAgICAgICAgICAgMSAtIDIgKiB5ICogeSAtIDIgKiB6ICogeixcbiAgICAgICAgICAgIDIgKiB4ICogeSArIDIgKiB6ICogdyxcbiAgICAgICAgICAgIDIgKiB4ICogeiAtIDIgKiB5ICogd1xuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICAyICogeCAqIHkgLSAyICogeiAqIHcsXG4gICAgICAgICAgICAxIC0gMiAqIHggKiB4IC0gMiAqIHogKiB6LFxuICAgICAgICAgICAgMiAqIHkgKiB6ICsgMiAqIHggKiB3XG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDIgKiB4ICogeiArIDIgKiB5ICogdyxcbiAgICAgICAgICAgIDIgKiB5ICogeiAtIDIgKiB4ICogdyxcbiAgICAgICAgICAgIDEgLSAyICogeCAqIHggLSAyICogeSAqIHlcbiAgICAgICAgXVxuICAgIF0pO1xufTtcbnZhciBlcHNpbG9uID0gMC4wMDAwMTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnNsZXJwID0gZnVuY3Rpb24gc2xlcnAocSwgdCkge1xuICAgIHZhciBvbWVnYTtcbiAgICB2YXIgY29zb21lZ2E7XG4gICAgdmFyIHNpbm9tZWdhO1xuICAgIHZhciBzY2FsZUZyb207XG4gICAgdmFyIHNjYWxlVG87XG4gICAgY29zb21lZ2EgPSB0aGlzLmRvdChxKTtcbiAgICBpZiAoMSAtIGNvc29tZWdhID4gZXBzaWxvbikge1xuICAgICAgICBvbWVnYSA9IE1hdGguYWNvcyhjb3NvbWVnYSk7XG4gICAgICAgIHNpbm9tZWdhID0gTWF0aC5zaW4ob21lZ2EpO1xuICAgICAgICBzY2FsZUZyb20gPSBNYXRoLnNpbigoMSAtIHQpICogb21lZ2EpIC8gc2lub21lZ2E7XG4gICAgICAgIHNjYWxlVG8gPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2lub21lZ2E7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2NhbGVGcm9tID0gMSAtIHQ7XG4gICAgICAgIHNjYWxlVG8gPSB0O1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXIuc2V0KHRoaXMuc2NhbGFyTXVsdGlwbHkoc2NhbGVGcm9tIC8gc2NhbGVUbykuYWRkKHEpLm11bHRpcGx5KHNjYWxlVG8pKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFF1YXRlcm5pb247IiwidmFyIFJBTkQgPSBNYXRoLnJhbmRvbTtcbmZ1bmN0aW9uIF9yYW5kb21GbG9hdChtaW4sIG1heCkge1xuICAgIHJldHVybiBtaW4gKyBSQU5EKCkgKiAobWF4IC0gbWluKTtcbn1cbmZ1bmN0aW9uIF9yYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIG1pbiArIFJBTkQoKSAqIChtYXggLSBtaW4gKyAxKSA+PiAwO1xufVxudmFyIFJhbmRvbSA9IHt9O1xuUmFuZG9tLmludGVnZXIgPSBmdW5jdGlvbiBpbnRlZ2VyKG1pbiwgbWF4LCBkaW0pIHtcbiAgICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDA7XG4gICAgbWF4ID0gbWF4ICE9PSB1bmRlZmluZWQgPyBtYXggOiAxO1xuICAgIGlmIChkaW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChfcmFuZG9tSW50ZWdlcihtaW4sIG1heCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gX3JhbmRvbUludGVnZXIobWluLCBtYXgpO1xufTtcblJhbmRvbS5yYW5nZSA9IGZ1bmN0aW9uIHJhbmdlKG1pbiwgbWF4LCBkaW0pIHtcbiAgICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDA7XG4gICAgbWF4ID0gbWF4ICE9PSB1bmRlZmluZWQgPyBtYXggOiAxO1xuICAgIGlmIChkaW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChfcmFuZG9tRmxvYXQobWluLCBtYXgpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIF9yYW5kb21GbG9hdChtaW4sIG1heCk7XG59O1xuUmFuZG9tLnNpZ24gPSBmdW5jdGlvbiBzaWduKHByb2IpIHtcbiAgICBwcm9iID0gcHJvYiAhPT0gdW5kZWZpbmVkID8gcHJvYiA6IDAuNTtcbiAgICByZXR1cm4gUkFORCgpIDwgcHJvYiA/IDEgOiAtMTtcbn07XG5SYW5kb20uYm9vbCA9IGZ1bmN0aW9uIGJvb2wocHJvYikge1xuICAgIHByb2IgPSBwcm9iICE9PSB1bmRlZmluZWQgPyBwcm9iIDogMC41O1xuICAgIHJldHVybiBSQU5EKCkgPCBwcm9iO1xufTtcbm1vZHVsZS5leHBvcnRzID0gUmFuZG9tOyIsInZhciBVdGlsaXRpZXMgPSB7fTtcblV0aWxpdGllcy5jbGFtcCA9IGZ1bmN0aW9uIGNsYW1wKHZhbHVlLCByYW5nZSkge1xuICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgcmFuZ2VbMV0pLCByYW5nZVswXSk7XG59O1xuVXRpbGl0aWVzLmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aChhcnJheSkge1xuICAgIHZhciBkaXN0YW5jZVNxdWFyZWQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGlzdGFuY2VTcXVhcmVkICs9IGFycmF5W2ldICogYXJyYXlbaV07XG4gICAgfVxuICAgIHJldHVybiBNYXRoLnNxcnQoZGlzdGFuY2VTcXVhcmVkKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxpdGllczsiLCJmdW5jdGlvbiBWZWN0b3IoeCwgeSwgeikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5zZXQoeCk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgdGhpcy55ID0geSB8fCAwO1xuICAgICAgICB0aGlzLnogPSB6IHx8IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxudmFyIF9yZWdpc3RlciA9IG5ldyBWZWN0b3IoMCwgMCwgMCk7XG5WZWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCh2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopO1xufTtcblZlY3Rvci5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gc3ViKHYpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgdGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnksIHRoaXMueiAtIHYueik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5tdWx0ID0gZnVuY3Rpb24gbXVsdChyKSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHIgKiB0aGlzLngsIHIgKiB0aGlzLnksIHIgKiB0aGlzLnopO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZGl2ID0gZnVuY3Rpb24gZGl2KHIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0KDEgLyByKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmNyb3NzID0gZnVuY3Rpb24gY3Jvc3Modikge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciB2eCA9IHYueDtcbiAgICB2YXIgdnkgPSB2Lnk7XG4gICAgdmFyIHZ6ID0gdi56O1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB6ICogdnkgLSB5ICogdnosIHggKiB2eiAtIHogKiB2eCwgeSAqIHZ4IC0geCAqIHZ5KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYueCA9PT0gdGhpcy54ICYmIHYueSA9PT0gdGhpcy55ICYmIHYueiA9PT0gdGhpcy56O1xufTtcblZlY3Rvci5wcm90b3R5cGUucm90YXRlWCA9IGZ1bmN0aW9uIHJvdGF0ZVgodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB4LCB5ICogY29zVGhldGEgLSB6ICogc2luVGhldGEsIHkgKiBzaW5UaGV0YSArIHogKiBjb3NUaGV0YSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yb3RhdGVZID0gZnVuY3Rpb24gcm90YXRlWSh0aGV0YSkge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHogKiBzaW5UaGV0YSArIHggKiBjb3NUaGV0YSwgeSwgeiAqIGNvc1RoZXRhIC0geCAqIHNpblRoZXRhKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJvdGF0ZVogPSBmdW5jdGlvbiByb3RhdGVaKHRoZXRhKSB7XG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeCAqIGNvc1RoZXRhIC0geSAqIHNpblRoZXRhLCB4ICogc2luVGhldGEgKyB5ICogY29zVGhldGEsIHopO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gZG90KHYpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55ICsgdGhpcy56ICogdi56O1xufTtcblZlY3Rvci5wcm90b3R5cGUubm9ybVNxdWFyZWQgPSBmdW5jdGlvbiBub3JtU3F1YXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5ub3JtID0gZnVuY3Rpb24gbm9ybSgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubm9ybVNxdWFyZWQoKSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUobGVuZ3RoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICAgIGxlbmd0aCA9IDE7XG4gICAgdmFyIG5vcm0gPSB0aGlzLm5vcm0oKTtcbiAgICBpZiAobm9ybSA+IDFlLTcpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcy5tdWx0KGxlbmd0aCAvIG5vcm0pKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCBsZW5ndGgsIDAsIDApO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmlzWmVybyA9IGZ1bmN0aW9uIGlzWmVybygpIHtcbiAgICByZXR1cm4gISh0aGlzLnggfHwgdGhpcy55IHx8IHRoaXMueik7XG59O1xuZnVuY3Rpb24gX3NldFhZWih4LCB5LCB6KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMueiA9IHo7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBfc2V0RnJvbUFycmF5KHYpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIHZbMF0sIHZbMV0sIHZbMl0gfHwgMCk7XG59XG5mdW5jdGlvbiBfc2V0RnJvbVZlY3Rvcih2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB2LngsIHYueSwgdi56KTtcbn1cbmZ1bmN0aW9uIF9zZXRGcm9tTnVtYmVyKHgpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIHgsIDAsIDApO1xufVxuVmVjdG9yLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQodikge1xuICAgIGlmICh2IGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbUFycmF5LmNhbGwodGhpcywgdik7XG4gICAgaWYgKHR5cGVvZiB2ID09PSAnbnVtYmVyJylcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tTnVtYmVyLmNhbGwodGhpcywgdik7XG4gICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwodGhpcywgdik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5zZXRYWVogPSBmdW5jdGlvbiAoeCwgeSwgeikge1xuICAgIHJldHVybiBfc2V0WFlaLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5zZXQxRCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIF9zZXRGcm9tTnVtYmVyLmNhbGwodGhpcywgeCk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiBwdXQodikge1xuICAgIGlmICh0aGlzID09PSBfcmVnaXN0ZXIpXG4gICAgICAgIF9zZXRGcm9tVmVjdG9yLmNhbGwodiwgX3JlZ2lzdGVyKTtcbiAgICBlbHNlXG4gICAgICAgIF9zZXRGcm9tVmVjdG9yLmNhbGwodiwgdGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcywgMCwgMCwgMCk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jYXAgPSBmdW5jdGlvbiBjYXAoY2FwKSB7XG4gICAgaWYgKGNhcCA9PT0gSW5maW5pdHkpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcyk7XG4gICAgdmFyIG5vcm0gPSB0aGlzLm5vcm0oKTtcbiAgICBpZiAobm9ybSA+IGNhcClcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwoX3JlZ2lzdGVyLCB0aGlzLm11bHQoY2FwIC8gbm9ybSkpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwoX3JlZ2lzdGVyLCB0aGlzKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnByb2plY3QgPSBmdW5jdGlvbiBwcm9qZWN0KG4pIHtcbiAgICByZXR1cm4gbi5tdWx0KHRoaXMuZG90KG4pKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJlZmxlY3RBY3Jvc3MgPSBmdW5jdGlvbiByZWZsZWN0QWNyb3NzKG4pIHtcbiAgICBuLm5vcm1hbGl6ZSgpLnB1dChuKTtcbiAgICByZXR1cm4gX3NldEZyb21WZWN0b3IoX3JlZ2lzdGVyLCB0aGlzLnN1Yih0aGlzLnByb2plY3QobikubXVsdCgyKSkpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMueCxcbiAgICAgICAgdGhpcy55LFxuICAgICAgICB0aGlzLnpcbiAgICBdO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZ2V0MUQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMueDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvcjsiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBVdGlsaXRpZXMgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9VdGlsaXRpZXMnKTtcbnZhciBHZW5lcmljU3luYyA9IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvR2VuZXJpY1N5bmMnKTtcbnZhciBNb3VzZVN5bmMgPSByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL01vdXNlU3luYycpO1xudmFyIFRvdWNoU3luYyA9IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvVG91Y2hTeW5jJyk7XG5HZW5lcmljU3luYy5yZWdpc3Rlcih7XG4gICAgJ21vdXNlJzogTW91c2VTeW5jLFxuICAgICd0b3VjaCc6IFRvdWNoU3luY1xufSk7XG5mdW5jdGlvbiBEcmFnZ2FibGUob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoRHJhZ2dhYmxlLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9wb3NpdGlvblN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX2RpZmZlcmVudGlhbCA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnN5bmMgPSBuZXcgR2VuZXJpY1N5bmMoW1xuICAgICAgICAnbW91c2UnLFxuICAgICAgICAndG91Y2gnXG4gICAgXSwgeyBzY2FsZTogdGhpcy5vcHRpb25zLnNjYWxlIH0pO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLnN5bmMpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRPdXRwdXQpO1xuICAgIF9iaW5kRXZlbnRzLmNhbGwodGhpcyk7XG59XG52YXIgX2RpcmVjdGlvbiA9IHtcbiAgICAgICAgeDogMSxcbiAgICAgICAgeTogMlxuICAgIH07XG5EcmFnZ2FibGUuRElSRUNUSU9OX1ggPSBfZGlyZWN0aW9uLng7XG5EcmFnZ2FibGUuRElSRUNUSU9OX1kgPSBfZGlyZWN0aW9uLnk7XG52YXIgX2NsYW1wID0gVXRpbGl0aWVzLmNsYW1wO1xuRHJhZ2dhYmxlLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwcm9qZWN0aW9uOiBfZGlyZWN0aW9uLnggfCBfZGlyZWN0aW9uLnksXG4gICAgc2NhbGU6IDEsXG4gICAgeFJhbmdlOiBudWxsLFxuICAgIHlSYW5nZTogbnVsbCxcbiAgICBzbmFwWDogMCxcbiAgICBzbmFwWTogMCxcbiAgICB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwIH1cbn07XG5mdW5jdGlvbiBfbWFwRGlmZmVyZW50aWFsKGRpZmZlcmVudGlhbCkge1xuICAgIHZhciBvcHRzID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBwcm9qZWN0aW9uID0gb3B0cy5wcm9qZWN0aW9uO1xuICAgIHZhciBzbmFwWCA9IG9wdHMuc25hcFg7XG4gICAgdmFyIHNuYXBZID0gb3B0cy5zbmFwWTtcbiAgICB2YXIgdHggPSBwcm9qZWN0aW9uICYgX2RpcmVjdGlvbi54ID8gZGlmZmVyZW50aWFsWzBdIDogMDtcbiAgICB2YXIgdHkgPSBwcm9qZWN0aW9uICYgX2RpcmVjdGlvbi55ID8gZGlmZmVyZW50aWFsWzFdIDogMDtcbiAgICBpZiAoc25hcFggPiAwKVxuICAgICAgICB0eCAtPSB0eCAlIHNuYXBYO1xuICAgIGlmIChzbmFwWSA+IDApXG4gICAgICAgIHR5IC09IHR5ICUgc25hcFk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgdHgsXG4gICAgICAgIHR5XG4gICAgXTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVTdGFydCgpIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICh0aGlzLl9wb3NpdGlvblN0YXRlLmlzQWN0aXZlKCkpXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCB7IHBvc2l0aW9uOiB0aGlzLmdldFBvc2l0aW9uKCkgfSk7XG59XG5mdW5jdGlvbiBfaGFuZGxlTW92ZShldmVudCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdGhpcy5fZGlmZmVyZW50aWFsID0gZXZlbnQucG9zaXRpb247XG4gICAgdmFyIG5ld0RpZmZlcmVudGlhbCA9IF9tYXBEaWZmZXJlbnRpYWwuY2FsbCh0aGlzLCB0aGlzLl9kaWZmZXJlbnRpYWwpO1xuICAgIHRoaXMuX2RpZmZlcmVudGlhbFswXSAtPSBuZXdEaWZmZXJlbnRpYWxbMF07XG4gICAgdGhpcy5fZGlmZmVyZW50aWFsWzFdIC09IG5ld0RpZmZlcmVudGlhbFsxXTtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgIHBvc1swXSArPSBuZXdEaWZmZXJlbnRpYWxbMF07XG4gICAgcG9zWzFdICs9IG5ld0RpZmZlcmVudGlhbFsxXTtcbiAgICBpZiAob3B0aW9ucy54UmFuZ2UpIHtcbiAgICAgICAgdmFyIHhSYW5nZSA9IFtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnhSYW5nZVswXSArIDAuNSAqIG9wdGlvbnMuc25hcFgsXG4gICAgICAgICAgICAgICAgb3B0aW9ucy54UmFuZ2VbMV0gLSAwLjUgKiBvcHRpb25zLnNuYXBYXG4gICAgICAgICAgICBdO1xuICAgICAgICBwb3NbMF0gPSBfY2xhbXAocG9zWzBdLCB4UmFuZ2UpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy55UmFuZ2UpIHtcbiAgICAgICAgdmFyIHlSYW5nZSA9IFtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnlSYW5nZVswXSArIDAuNSAqIG9wdGlvbnMuc25hcFksXG4gICAgICAgICAgICAgICAgb3B0aW9ucy55UmFuZ2VbMV0gLSAwLjUgKiBvcHRpb25zLnNuYXBZXG4gICAgICAgICAgICBdO1xuICAgICAgICBwb3NbMV0gPSBfY2xhbXAocG9zWzFdLCB5UmFuZ2UpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ3VwZGF0ZScsIHsgcG9zaXRpb246IHBvcyB9KTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmUpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHsgcG9zaXRpb246IHRoaXMuZ2V0UG9zaXRpb24oKSB9KTtcbn1cbmZ1bmN0aW9uIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3luYy5vbignc3RhcnQnLCBfaGFuZGxlU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zeW5jLm9uKCd1cGRhdGUnLCBfaGFuZGxlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnN5bmMub24oJ2VuZCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG59XG5EcmFnZ2FibGUucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB2YXIgY3VycmVudE9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMucHJvamVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBwcm9qID0gb3B0aW9ucy5wcm9qZWN0aW9uO1xuICAgICAgICB0aGlzLm9wdGlvbnMucHJvamVjdGlvbiA9IDA7XG4gICAgICAgIFtcbiAgICAgICAgICAgICd4JyxcbiAgICAgICAgICAgICd5J1xuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHByb2ouaW5kZXhPZih2YWwpICE9PSAtMSlcbiAgICAgICAgICAgICAgICBjdXJyZW50T3B0aW9ucy5wcm9qZWN0aW9uIHw9IF9kaXJlY3Rpb25bdmFsXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3VycmVudE9wdGlvbnMuc2NhbGUgPSBvcHRpb25zLnNjYWxlO1xuICAgICAgICB0aGlzLnN5bmMuc2V0T3B0aW9ucyh7IHNjYWxlOiBvcHRpb25zLnNjYWxlIH0pO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy54UmFuZ2UgIT09IHVuZGVmaW5lZClcbiAgICAgICAgY3VycmVudE9wdGlvbnMueFJhbmdlID0gb3B0aW9ucy54UmFuZ2U7XG4gICAgaWYgKG9wdGlvbnMueVJhbmdlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGN1cnJlbnRPcHRpb25zLnlSYW5nZSA9IG9wdGlvbnMueVJhbmdlO1xuICAgIGlmIChvcHRpb25zLnNuYXBYICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGN1cnJlbnRPcHRpb25zLnNuYXBYID0gb3B0aW9ucy5zbmFwWDtcbiAgICBpZiAob3B0aW9ucy5zbmFwWSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBjdXJyZW50T3B0aW9ucy5zbmFwWSA9IG9wdGlvbnMuc25hcFk7XG59O1xuRHJhZ2dhYmxlLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvblN0YXRlLmdldCgpO1xufTtcbkRyYWdnYWJsZS5wcm90b3R5cGUuc2V0UmVsYXRpdmVQb3NpdGlvbiA9IGZ1bmN0aW9uIHNldFJlbGF0aXZlUG9zaXRpb24ocG9zaXRpb24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGN1cnJQb3MgPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIHJlbGF0aXZlUG9zaXRpb24gPSBbXG4gICAgICAgICAgICBjdXJyUG9zWzBdICsgcG9zaXRpb25bMF0sXG4gICAgICAgICAgICBjdXJyUG9zWzFdICsgcG9zaXRpb25bMV1cbiAgICAgICAgXTtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHJlbGF0aXZlUG9zaXRpb24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5EcmFnZ2FibGUucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gc2V0UG9zaXRpb24ocG9zaXRpb24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uU3RhdGUuaXNBY3RpdmUoKSlcbiAgICAgICAgdGhpcy5fcG9zaXRpb25TdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fcG9zaXRpb25TdGF0ZS5zZXQocG9zaXRpb24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5EcmFnZ2FibGUucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbn07XG5EcmFnZ2FibGUucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xufTtcbkRyYWdnYWJsZS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9ICF0aGlzLl9hY3RpdmU7XG59O1xuRHJhZ2dhYmxlLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS50cmFuc2xhdGUocG9zWzBdLCBwb3NbMV0pLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldFxuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGU7IiwidmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gRmFkZXIob3B0aW9ucywgc3RhcnRTdGF0ZSkge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoRmFkZXIuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgaWYgKCFzdGFydFN0YXRlKVxuICAgICAgICBzdGFydFN0YXRlID0gMDtcbiAgICB0aGlzLnRyYW5zaXRpb25IZWxwZXIgPSBuZXcgVHJhbnNpdGlvbmFibGUoc3RhcnRTdGF0ZSk7XG59XG5GYWRlci5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgY3VsbDogZmFsc2UsXG4gICAgdHJhbnNpdGlvbjogdHJ1ZSxcbiAgICBwdWxzZUluVHJhbnNpdGlvbjogdHJ1ZSxcbiAgICBwdWxzZU91dFRyYW5zaXRpb246IHRydWVcbn07XG5GYWRlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbkZhZGVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gc2hvdyh0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uIHx8IHRoaXMub3B0aW9ucy50cmFuc2l0aW9uO1xuICAgIHRoaXMuc2V0KDEsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5GYWRlci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIGhpZGUodHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0cmFuc2l0aW9uID0gdHJhbnNpdGlvbiB8fCB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICB0aGlzLnNldCgwLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG59O1xuRmFkZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChzdGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmhhbHQoKTtcbiAgICB0aGlzLnRyYW5zaXRpb25IZWxwZXIuc2V0KHN0YXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG59O1xuRmFkZXIucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMudHJhbnNpdGlvbkhlbHBlci5oYWx0KCk7XG59O1xuRmFkZXIucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uSGVscGVyLmdldCgpID4gMDtcbn07XG5GYWRlci5wcm90b3R5cGUubW9kaWZ5ID0gZnVuY3Rpb24gbW9kaWZ5KHRhcmdldCkge1xuICAgIHZhciBjdXJyT3BhY2l0eSA9IHRoaXMudHJhbnNpdGlvbkhlbHBlci5nZXQoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmN1bGwgJiYgIWN1cnJPcGFjaXR5KVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGN1cnJPcGFjaXR5LFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZhZGVyOyIsImZ1bmN0aW9uIE1vZGlmaWVyQ2hhaW4oKSB7XG4gICAgdGhpcy5fY2hhaW4gPSBbXTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgdGhpcy5hZGRNb2RpZmllci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuTW9kaWZpZXJDaGFpbi5wcm90b3R5cGUuYWRkTW9kaWZpZXIgPSBmdW5jdGlvbiBhZGRNb2RpZmllcih2YXJhcmdzKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5fY2hhaW4sIGFyZ3VtZW50cyk7XG59O1xuTW9kaWZpZXJDaGFpbi5wcm90b3R5cGUucmVtb3ZlTW9kaWZpZXIgPSBmdW5jdGlvbiByZW1vdmVNb2RpZmllcihtb2RpZmllcikge1xuICAgIHZhciBpbmRleCA9IHRoaXMuX2NoYWluLmluZGV4T2YobW9kaWZpZXIpO1xuICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9jaGFpbi5zcGxpY2UoaW5kZXgsIDEpO1xufTtcbk1vZGlmaWVyQ2hhaW4ucHJvdG90eXBlLm1vZGlmeSA9IGZ1bmN0aW9uIG1vZGlmeShpbnB1dCkge1xuICAgIHZhciBjaGFpbiA9IHRoaXMuX2NoYWluO1xuICAgIHZhciByZXN1bHQgPSBpbnB1dDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYWluLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCA9IGNoYWluW2ldLm1vZGlmeShyZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gTW9kaWZpZXJDaGFpbjsiLCJ2YXIgTW9kaWZpZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9Nb2RpZmllcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIFN0YXRlTW9kaWZpZXIob3B0aW9ucykge1xuICAgIHRoaXMuX3RyYW5zZm9ybVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtKFRyYW5zZm9ybS5pZGVudGl0eSk7XG4gICAgdGhpcy5fb3BhY2l0eVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDEpO1xuICAgIHRoaXMuX29yaWdpblN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX2FsaWduU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5fc2l6ZVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX3Byb3BvcnRpb25zU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5fbW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICB0cmFuc2Zvcm06IHRoaXMuX3RyYW5zZm9ybVN0YXRlLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLl9vcGFjaXR5U3RhdGUsXG4gICAgICAgIG9yaWdpbjogbnVsbCxcbiAgICAgICAgYWxpZ246IG51bGwsXG4gICAgICAgIHNpemU6IG51bGwsXG4gICAgICAgIHByb3BvcnRpb25zOiBudWxsXG4gICAgfSk7XG4gICAgdGhpcy5faGFzT3JpZ2luID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQWxpZ24gPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNTaXplID0gZmFsc2U7XG4gICAgdGhpcy5faGFzUHJvcG9ydGlvbnMgPSBmYWxzZTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zZm9ybShvcHRpb25zLnRyYW5zZm9ybSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9wYWNpdHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMuc2V0T3BhY2l0eShvcHRpb25zLm9wYWNpdHkpO1xuICAgICAgICBpZiAob3B0aW9ucy5vcmlnaW4pXG4gICAgICAgICAgICB0aGlzLnNldE9yaWdpbihvcHRpb25zLm9yaWdpbik7XG4gICAgICAgIGlmIChvcHRpb25zLmFsaWduKVxuICAgICAgICAgICAgdGhpcy5zZXRBbGlnbihvcHRpb25zLmFsaWduKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2l6ZSlcbiAgICAgICAgICAgIHRoaXMuc2V0U2l6ZShvcHRpb25zLnNpemUpO1xuICAgICAgICBpZiAob3B0aW9ucy5wcm9wb3J0aW9ucylcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcG9ydGlvbnMob3B0aW9ucy5wcm9wb3J0aW9ucyk7XG4gICAgfVxufVxuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5zZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0T3BhY2l0eSA9IGZ1bmN0aW9uIHNldE9wYWNpdHkob3BhY2l0eSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9vcGFjaXR5U3RhdGUuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcmlnaW4gPSBmdW5jdGlvbiBzZXRPcmlnaW4ob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChvcmlnaW4gPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc09yaWdpbikge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIub3JpZ2luRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc09yaWdpbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2hhc09yaWdpbikge1xuICAgICAgICB0aGlzLl9oYXNPcmlnaW4gPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5vcmlnaW5Gcm9tKHRoaXMuX29yaWdpblN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fb3JpZ2luU3RhdGUuc2V0KG9yaWdpbiwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLnNldEFsaWduID0gZnVuY3Rpb24gc2V0T3JpZ2luKGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChhbGlnbiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzQWxpZ24pIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVyLmFsaWduRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc0FsaWduID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzQWxpZ24pIHtcbiAgICAgICAgdGhpcy5faGFzQWxpZ24gPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5hbGlnbkZyb20odGhpcy5fYWxpZ25TdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuX2FsaWduU3RhdGUuc2V0KGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoc2l6ZSA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzU2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIuc2l6ZUZyb20obnVsbCk7XG4gICAgICAgICAgICB0aGlzLl9oYXNTaXplID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzU2l6ZSkge1xuICAgICAgICB0aGlzLl9oYXNTaXplID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbW9kaWZpZXIuc2l6ZUZyb20odGhpcy5fc2l6ZVN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fc2l6ZVN0YXRlLnNldChzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBzZXRTaXplKHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChwcm9wb3J0aW9ucyA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzUHJvcG9ydGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVyLnByb3BvcnRpb25zRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc1Byb3BvcnRpb25zID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzUHJvcG9ydGlvbnMpIHtcbiAgICAgICAgdGhpcy5faGFzUHJvcG9ydGlvbnMgPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5wcm9wb3J0aW9uc0Zyb20odGhpcy5fcHJvcG9ydGlvbnNTdGF0ZSk7XG4gICAgfVxuICAgIHRoaXMuX3Byb3BvcnRpb25zU3RhdGUuc2V0KHByb3BvcnRpb25zLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5fdHJhbnNmb3JtU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX29wYWNpdHlTdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fb3JpZ2luU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX2FsaWduU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuX3NpemVTdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fcHJvcG9ydGlvbnNTdGF0ZS5oYWx0KCk7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5nZXQoKTtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRGaW5hbFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldEZpbmFsVHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5nZXRGaW5hbCgpO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmdldE9wYWNpdHkgPSBmdW5jdGlvbiBnZXRPcGFjaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9vcGFjaXR5U3RhdGUuZ2V0KCk7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0T3JpZ2luID0gZnVuY3Rpb24gZ2V0T3JpZ2luKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNPcmlnaW4gPyB0aGlzLl9vcmlnaW5TdGF0ZS5nZXQoKSA6IG51bGw7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0QWxpZ24gPSBmdW5jdGlvbiBnZXRBbGlnbigpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzQWxpZ24gPyB0aGlzLl9hbGlnblN0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzU2l6ZSA/IHRoaXMuX3NpemVTdGF0ZS5nZXQoKSA6IG51bGw7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0UHJvcG9ydGlvbnMgPSBmdW5jdGlvbiBnZXRQcm9wb3J0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzUHJvcG9ydGlvbnMgPyB0aGlzLl9wcm9wb3J0aW9uc1N0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGlmaWVyLm1vZGlmeSh0YXJnZXQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3RhdGVNb2RpZmllcjsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBQaHlzaWNzRW5naW5lKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFBoeXNpY3NFbmdpbmUuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX3BhcnRpY2xlcyA9IFtdO1xuICAgIHRoaXMuX2JvZGllcyA9IFtdO1xuICAgIHRoaXMuX2FnZW50RGF0YSA9IHt9O1xuICAgIHRoaXMuX2ZvcmNlcyA9IFtdO1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzID0gW107XG4gICAgdGhpcy5fYnVmZmVyID0gMDtcbiAgICB0aGlzLl9wcmV2VGltZSA9IG5vdygpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIgPSBudWxsO1xuICAgIHRoaXMuX2N1cnJBZ2VudElkID0gMDtcbiAgICB0aGlzLl9oYXNCb2RpZXMgPSBmYWxzZTtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIgPSBudWxsO1xufVxudmFyIFRJTUVTVEVQID0gMTc7XG52YXIgTUlOX1RJTUVfU1RFUCA9IDEwMDAgLyAxMjA7XG52YXIgTUFYX1RJTUVfU1RFUCA9IDE3O1xudmFyIG5vdyA9IERhdGUubm93O1xudmFyIF9ldmVudHMgPSB7XG4gICAgICAgIHN0YXJ0OiAnc3RhcnQnLFxuICAgICAgICB1cGRhdGU6ICd1cGRhdGUnLFxuICAgICAgICBlbmQ6ICdlbmQnXG4gICAgfTtcblBoeXNpY3NFbmdpbmUuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGNvbnN0cmFpbnRTdGVwczogMSxcbiAgICBzbGVlcFRvbGVyYW5jZTogMWUtNyxcbiAgICB2ZWxvY2l0eUNhcDogdW5kZWZpbmVkLFxuICAgIGFuZ3VsYXJWZWxvY2l0eUNhcDogdW5kZWZpbmVkXG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0cykge1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRzKVxuICAgICAgICBpZiAodGhpcy5vcHRpb25zW2tleV0pXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5hZGRCb2R5ID0gZnVuY3Rpb24gYWRkQm9keShib2R5KSB7XG4gICAgYm9keS5fZW5naW5lID0gdGhpcztcbiAgICBpZiAoYm9keS5pc0JvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9kaWVzLnB1c2goYm9keSk7XG4gICAgICAgIHRoaXMuX2hhc0JvZGllcyA9IHRydWU7XG4gICAgfSBlbHNlXG4gICAgICAgIHRoaXMuX3BhcnRpY2xlcy5wdXNoKGJvZHkpO1xuICAgIGJvZHkub24oJ3N0YXJ0JywgdGhpcy53YWtlLmJpbmQodGhpcykpO1xuICAgIHJldHVybiBib2R5O1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnJlbW92ZUJvZHkgPSBmdW5jdGlvbiByZW1vdmVCb2R5KGJvZHkpIHtcbiAgICB2YXIgYXJyYXkgPSBib2R5LmlzQm9keSA/IHRoaXMuX2JvZGllcyA6IHRoaXMuX3BhcnRpY2xlcztcbiAgICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKGJvZHkpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGZvciAodmFyIGFnZW50IGluIHRoaXMuX2FnZW50RGF0YSlcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoRnJvbShhZ2VudC5pZCwgYm9keSk7XG4gICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdldEJvZGllcygpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdGhpcy5faGFzQm9kaWVzID0gZmFsc2U7XG59O1xuZnVuY3Rpb24gX21hcEFnZW50QXJyYXkoYWdlbnQpIHtcbiAgICBpZiAoYWdlbnQuYXBwbHlGb3JjZSlcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcmNlcztcbiAgICBpZiAoYWdlbnQuYXBwbHlDb25zdHJhaW50KVxuICAgICAgICByZXR1cm4gdGhpcy5fY29uc3RyYWludHM7XG59XG5mdW5jdGlvbiBfYXR0YWNoT25lKGFnZW50LCB0YXJnZXRzLCBzb3VyY2UpIHtcbiAgICBpZiAodGFyZ2V0cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB0YXJnZXRzID0gdGhpcy5nZXRQYXJ0aWNsZXNBbmRCb2RpZXMoKTtcbiAgICBpZiAoISh0YXJnZXRzIGluc3RhbmNlb2YgQXJyYXkpKVxuICAgICAgICB0YXJnZXRzID0gW3RhcmdldHNdO1xuICAgIGFnZW50Lm9uKCdjaGFuZ2UnLCB0aGlzLndha2UuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fYWdlbnREYXRhW3RoaXMuX2N1cnJBZ2VudElkXSA9IHtcbiAgICAgICAgYWdlbnQ6IGFnZW50LFxuICAgICAgICBpZDogdGhpcy5fY3VyckFnZW50SWQsXG4gICAgICAgIHRhcmdldHM6IHRhcmdldHMsXG4gICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgfTtcbiAgICBfbWFwQWdlbnRBcnJheS5jYWxsKHRoaXMsIGFnZW50KS5wdXNoKHRoaXMuX2N1cnJBZ2VudElkKTtcbiAgICByZXR1cm4gdGhpcy5fY3VyckFnZW50SWQrKztcbn1cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uIGF0dGFjaChhZ2VudHMsIHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHRoaXMud2FrZSgpO1xuICAgIGlmIChhZ2VudHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB2YXIgYWdlbnRJRHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBhZ2VudElEc1tpXSA9IF9hdHRhY2hPbmUuY2FsbCh0aGlzLCBhZ2VudHNbaV0sIHRhcmdldHMsIHNvdXJjZSk7XG4gICAgICAgIHJldHVybiBhZ2VudElEcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIF9hdHRhY2hPbmUuY2FsbCh0aGlzLCBhZ2VudHMsIHRhcmdldHMsIHNvdXJjZSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuYXR0YWNoVG8gPSBmdW5jdGlvbiBhdHRhY2hUbyhhZ2VudElELCB0YXJnZXQpIHtcbiAgICBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgYWdlbnRJRCkudGFyZ2V0cy5wdXNoKHRhcmdldCk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gZGV0YWNoKGlkKSB7XG4gICAgdmFyIGFnZW50ID0gdGhpcy5nZXRBZ2VudChpZCk7XG4gICAgdmFyIGFnZW50QXJyYXkgPSBfbWFwQWdlbnRBcnJheS5jYWxsKHRoaXMsIGFnZW50KTtcbiAgICB2YXIgaW5kZXggPSBhZ2VudEFycmF5LmluZGV4T2YoaWQpO1xuICAgIGFnZW50QXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBkZWxldGUgdGhpcy5fYWdlbnREYXRhW2lkXTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5kZXRhY2hGcm9tID0gZnVuY3Rpb24gZGV0YWNoRnJvbShpZCwgdGFyZ2V0KSB7XG4gICAgdmFyIGJvdW5kQWdlbnQgPSBfZ2V0QWdlbnREYXRhLmNhbGwodGhpcywgaWQpO1xuICAgIGlmIChib3VuZEFnZW50LnNvdXJjZSA9PT0gdGFyZ2V0KVxuICAgICAgICB0aGlzLmRldGFjaChpZCk7XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciB0YXJnZXRzID0gYm91bmRBZ2VudC50YXJnZXRzO1xuICAgICAgICB2YXIgaW5kZXggPSB0YXJnZXRzLmluZGV4T2YodGFyZ2V0KTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpXG4gICAgICAgICAgICB0YXJnZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmRldGFjaEFsbCA9IGZ1bmN0aW9uIGRldGFjaEFsbCgpIHtcbiAgICB0aGlzLl9hZ2VudERhdGEgPSB7fTtcbiAgICB0aGlzLl9mb3JjZXMgPSBbXTtcbiAgICB0aGlzLl9jb25zdHJhaW50cyA9IFtdO1xuICAgIHRoaXMuX2N1cnJBZ2VudElkID0gMDtcbn07XG5mdW5jdGlvbiBfZ2V0QWdlbnREYXRhKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FnZW50RGF0YVtpZF07XG59XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRBZ2VudCA9IGZ1bmN0aW9uIGdldEFnZW50KGlkKSB7XG4gICAgcmV0dXJuIF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCBpZCkuYWdlbnQ7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0UGFydGljbGVzID0gZnVuY3Rpb24gZ2V0UGFydGljbGVzKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJ0aWNsZXM7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0Qm9kaWVzID0gZnVuY3Rpb24gZ2V0Qm9kaWVzKCkge1xuICAgIHJldHVybiB0aGlzLl9ib2RpZXM7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0UGFydGljbGVzQW5kQm9kaWVzID0gZnVuY3Rpb24gZ2V0UGFydGljbGVzQW5kQm9kaWVzKCkge1xuICAgIHJldHVybiB0aGlzLmdldFBhcnRpY2xlcygpLmNvbmNhdCh0aGlzLmdldEJvZGllcygpKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5mb3JFYWNoUGFydGljbGUgPSBmdW5jdGlvbiBmb3JFYWNoUGFydGljbGUoZm4sIGR0KSB7XG4gICAgdmFyIHBhcnRpY2xlcyA9IHRoaXMuZ2V0UGFydGljbGVzKCk7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW4gPSBwYXJ0aWNsZXMubGVuZ3RoOyBpbmRleCA8IGxlbjsgaW5kZXgrKylcbiAgICAgICAgZm4uY2FsbCh0aGlzLCBwYXJ0aWNsZXNbaW5kZXhdLCBkdCk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZm9yRWFjaEJvZHkgPSBmdW5jdGlvbiBmb3JFYWNoQm9keShmbiwgZHQpIHtcbiAgICBpZiAoIXRoaXMuX2hhc0JvZGllcylcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBib2RpZXMgPSB0aGlzLmdldEJvZGllcygpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuID0gYm9kaWVzLmxlbmd0aDsgaW5kZXggPCBsZW47IGluZGV4KyspXG4gICAgICAgIGZuLmNhbGwodGhpcywgYm9kaWVzW2luZGV4XSwgZHQpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuLCBkdCkge1xuICAgIHRoaXMuZm9yRWFjaFBhcnRpY2xlKGZuLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoQm9keShmbiwgZHQpO1xufTtcbmZ1bmN0aW9uIF91cGRhdGVGb3JjZShpbmRleCkge1xuICAgIHZhciBib3VuZEFnZW50ID0gX2dldEFnZW50RGF0YS5jYWxsKHRoaXMsIHRoaXMuX2ZvcmNlc1tpbmRleF0pO1xuICAgIGJvdW5kQWdlbnQuYWdlbnQuYXBwbHlGb3JjZShib3VuZEFnZW50LnRhcmdldHMsIGJvdW5kQWdlbnQuc291cmNlKTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVGb3JjZXMoKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSB0aGlzLl9mb3JjZXMubGVuZ3RoIC0gMTsgaW5kZXggPiAtMTsgaW5kZXgtLSlcbiAgICAgICAgX3VwZGF0ZUZvcmNlLmNhbGwodGhpcywgaW5kZXgpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUNvbnN0cmFpbnQoaW5kZXgsIGR0KSB7XG4gICAgdmFyIGJvdW5kQWdlbnQgPSB0aGlzLl9hZ2VudERhdGFbdGhpcy5fY29uc3RyYWludHNbaW5kZXhdXTtcbiAgICByZXR1cm4gYm91bmRBZ2VudC5hZ2VudC5hcHBseUNvbnN0cmFpbnQoYm91bmRBZ2VudC50YXJnZXRzLCBib3VuZEFnZW50LnNvdXJjZSwgZHQpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUNvbnN0cmFpbnRzKGR0KSB7XG4gICAgdmFyIGl0ZXJhdGlvbiA9IDA7XG4gICAgd2hpbGUgKGl0ZXJhdGlvbiA8IHRoaXMub3B0aW9ucy5jb25zdHJhaW50U3RlcHMpIHtcbiAgICAgICAgZm9yICh2YXIgaW5kZXggPSB0aGlzLl9jb25zdHJhaW50cy5sZW5ndGggLSAxOyBpbmRleCA+IC0xOyBpbmRleC0tKVxuICAgICAgICAgICAgX3VwZGF0ZUNvbnN0cmFpbnQuY2FsbCh0aGlzLCBpbmRleCwgZHQpO1xuICAgICAgICBpdGVyYXRpb24rKztcbiAgICB9XG59XG5mdW5jdGlvbiBfdXBkYXRlVmVsb2NpdGllcyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlVmVsb2NpdHkoZHQpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudmVsb2NpdHlDYXApXG4gICAgICAgIGJvZHkudmVsb2NpdHkuY2FwKHRoaXMub3B0aW9ucy52ZWxvY2l0eUNhcCkucHV0KGJvZHkudmVsb2NpdHkpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUFuZ3VsYXJWZWxvY2l0aWVzKGJvZHksIGR0KSB7XG4gICAgYm9keS5pbnRlZ3JhdGVBbmd1bGFyTW9tZW50dW0oZHQpO1xuICAgIGJvZHkudXBkYXRlQW5ndWxhclZlbG9jaXR5KCk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmd1bGFyVmVsb2NpdHlDYXApXG4gICAgICAgIGJvZHkuYW5ndWxhclZlbG9jaXR5LmNhcCh0aGlzLm9wdGlvbnMuYW5ndWxhclZlbG9jaXR5Q2FwKS5wdXQoYm9keS5hbmd1bGFyVmVsb2NpdHkpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZU9yaWVudGF0aW9ucyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlT3JpZW50YXRpb24oZHQpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZVBvc2l0aW9ucyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlUG9zaXRpb24oZHQpO1xuICAgIGJvZHkuZW1pdChfZXZlbnRzLnVwZGF0ZSwgYm9keSk7XG59XG5mdW5jdGlvbiBfaW50ZWdyYXRlKGR0KSB7XG4gICAgX3VwZGF0ZUZvcmNlcy5jYWxsKHRoaXMsIGR0KTtcbiAgICB0aGlzLmZvckVhY2goX3VwZGF0ZVZlbG9jaXRpZXMsIGR0KTtcbiAgICB0aGlzLmZvckVhY2hCb2R5KF91cGRhdGVBbmd1bGFyVmVsb2NpdGllcywgZHQpO1xuICAgIF91cGRhdGVDb25zdHJhaW50cy5jYWxsKHRoaXMsIGR0KTtcbiAgICB0aGlzLmZvckVhY2hCb2R5KF91cGRhdGVPcmllbnRhdGlvbnMsIGR0KTtcbiAgICB0aGlzLmZvckVhY2goX3VwZGF0ZVBvc2l0aW9ucywgZHQpO1xufVxuZnVuY3Rpb24gX2dldFBhcnRpY2xlc0VuZXJneSgpIHtcbiAgICB2YXIgZW5lcmd5ID0gMDtcbiAgICB2YXIgcGFydGljbGVFbmVyZ3kgPSAwO1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAocGFydGljbGUpIHtcbiAgICAgICAgcGFydGljbGVFbmVyZ3kgPSBwYXJ0aWNsZS5nZXRFbmVyZ3koKTtcbiAgICAgICAgZW5lcmd5ICs9IHBhcnRpY2xlRW5lcmd5O1xuICAgIH0pO1xuICAgIHJldHVybiBlbmVyZ3k7XG59XG5mdW5jdGlvbiBfZ2V0QWdlbnRzRW5lcmd5KCkge1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIGZvciAodmFyIGlkIGluIHRoaXMuX2FnZW50RGF0YSlcbiAgICAgICAgZW5lcmd5ICs9IHRoaXMuZ2V0QWdlbnRFbmVyZ3koaWQpO1xuICAgIHJldHVybiBlbmVyZ3k7XG59XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRBZ2VudEVuZXJneSA9IGZ1bmN0aW9uIChhZ2VudElkKSB7XG4gICAgdmFyIGFnZW50RGF0YSA9IF9nZXRBZ2VudERhdGEuY2FsbCh0aGlzLCBhZ2VudElkKTtcbiAgICByZXR1cm4gYWdlbnREYXRhLmFnZW50LmdldEVuZXJneShhZ2VudERhdGEudGFyZ2V0cywgYWdlbnREYXRhLnNvdXJjZSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVzRW5lcmd5LmNhbGwodGhpcykgKyBfZ2V0QWdlbnRzRW5lcmd5LmNhbGwodGhpcyk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuc3RlcCA9IGZ1bmN0aW9uIHN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuaXNTbGVlcGluZygpKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGN1cnJUaW1lID0gbm93KCk7XG4gICAgdmFyIGR0RnJhbWUgPSBjdXJyVGltZSAtIHRoaXMuX3ByZXZUaW1lO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gY3VyclRpbWU7XG4gICAgaWYgKGR0RnJhbWUgPCBNSU5fVElNRV9TVEVQKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKGR0RnJhbWUgPiBNQVhfVElNRV9TVEVQKVxuICAgICAgICBkdEZyYW1lID0gTUFYX1RJTUVfU1RFUDtcbiAgICBfaW50ZWdyYXRlLmNhbGwodGhpcywgVElNRVNURVApO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLnVwZGF0ZSwgdGhpcyk7XG4gICAgaWYgKHRoaXMuZ2V0RW5lcmd5KCkgPCB0aGlzLm9wdGlvbnMuc2xlZXBUb2xlcmFuY2UpXG4gICAgICAgIHRoaXMuc2xlZXAoKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5pc1NsZWVwaW5nID0gZnVuY3Rpb24gaXNTbGVlcGluZygpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTbGVlcGluZztcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzU2xlZXBpbmcoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pc1NsZWVwaW5nO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLnNsZWVwID0gZnVuY3Rpb24gc2xlZXAoKSB7XG4gICAgaWYgKHRoaXMuX2lzU2xlZXBpbmcpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGJvZHkpIHtcbiAgICAgICAgYm9keS5zbGVlcCgpO1xuICAgIH0pO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLmVuZCwgdGhpcyk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IHRydWU7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUud2FrZSA9IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fcHJldlRpbWUgPSBub3coKTtcbiAgICB0aGlzLmVtaXQoX2V2ZW50cy5zdGFydCwgdGhpcyk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IGZhbHNlO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5fZXZlbnRIYW5kbGVyID09PSBudWxsKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLmVtaXQodHlwZSwgZGF0YSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4pIHtcbiAgICBpZiAodGhpcy5fZXZlbnRIYW5kbGVyID09PSBudWxsKVxuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRIYW5kbGVyLm9uKGV2ZW50LCBmbik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBQaHlzaWNzRW5naW5lOyIsInZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoJy4vUGFydGljbGUnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9WZWN0b3InKTtcbnZhciBRdWF0ZXJuaW9uID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvUXVhdGVybmlvbicpO1xudmFyIE1hdHJpeCA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL01hdHJpeCcpO1xudmFyIEludGVncmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlZ3JhdG9ycy9TeW1wbGVjdGljRXVsZXInKTtcbmZ1bmN0aW9uIEJvZHkob3B0aW9ucykge1xuICAgIFBhcnRpY2xlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG5ldyBRdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5hbmd1bGFyVmVsb2NpdHkgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5hbmd1bGFyTW9tZW50dW0gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy50b3JxdWUgPSBuZXcgVmVjdG9yKCk7XG4gICAgaWYgKG9wdGlvbnMub3JpZW50YXRpb24pXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24uc2V0KG9wdGlvbnMub3JpZW50YXRpb24pO1xuICAgIGlmIChvcHRpb25zLmFuZ3VsYXJWZWxvY2l0eSlcbiAgICAgICAgdGhpcy5hbmd1bGFyVmVsb2NpdHkuc2V0KG9wdGlvbnMuYW5ndWxhclZlbG9jaXR5KTtcbiAgICBpZiAob3B0aW9ucy5hbmd1bGFyTW9tZW50dW0pXG4gICAgICAgIHRoaXMuYW5ndWxhck1vbWVudHVtLnNldChvcHRpb25zLmFuZ3VsYXJNb21lbnR1bSk7XG4gICAgaWYgKG9wdGlvbnMudG9ycXVlKVxuICAgICAgICB0aGlzLnRvcnF1ZS5zZXQob3B0aW9ucy50b3JxdWUpO1xuICAgIHRoaXMuYW5ndWxhclZlbG9jaXR5LncgPSAwO1xuICAgIHRoaXMuc2V0TW9tZW50c09mSW5lcnRpYSgpO1xuICAgIHRoaXMucFdvcmxkID0gbmV3IFZlY3RvcigpO1xufVxuQm9keS5ERUZBVUxUX09QVElPTlMgPSBQYXJ0aWNsZS5ERUZBVUxUX09QVElPTlM7XG5Cb2R5LkRFRkFVTFRfT1BUSU9OUy5vcmllbnRhdGlvbiA9IFtcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxXG5dO1xuQm9keS5ERUZBVUxUX09QVElPTlMuYW5ndWxhclZlbG9jaXR5ID0gW1xuICAgIDAsXG4gICAgMCxcbiAgICAwXG5dO1xuQm9keS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFBhcnRpY2xlLnByb3RvdHlwZSk7XG5Cb2R5LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEJvZHk7XG5Cb2R5LnByb3RvdHlwZS5pc0JvZHkgPSB0cnVlO1xuQm9keS5wcm90b3R5cGUuc2V0TWFzcyA9IGZ1bmN0aW9uIHNldE1hc3MoKSB7XG4gICAgUGFydGljbGUucHJvdG90eXBlLnNldE1hc3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnNldE1vbWVudHNPZkluZXJ0aWEoKTtcbn07XG5Cb2R5LnByb3RvdHlwZS5zZXRNb21lbnRzT2ZJbmVydGlhID0gZnVuY3Rpb24gc2V0TW9tZW50c09mSW5lcnRpYSgpIHtcbiAgICB0aGlzLmluZXJ0aWEgPSBuZXcgTWF0cml4KCk7XG4gICAgdGhpcy5pbnZlcnNlSW5lcnRpYSA9IG5ldyBNYXRyaXgoKTtcbn07XG5Cb2R5LnByb3RvdHlwZS51cGRhdGVBbmd1bGFyVmVsb2NpdHkgPSBmdW5jdGlvbiB1cGRhdGVBbmd1bGFyVmVsb2NpdHkoKSB7XG4gICAgdGhpcy5hbmd1bGFyVmVsb2NpdHkuc2V0KHRoaXMuaW52ZXJzZUluZXJ0aWEudmVjdG9yTXVsdGlwbHkodGhpcy5hbmd1bGFyTW9tZW50dW0pKTtcbn07XG5Cb2R5LnByb3RvdHlwZS50b1dvcmxkQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbiB0b1dvcmxkQ29vcmRpbmF0ZXMobG9jYWxQb3NpdGlvbikge1xuICAgIHJldHVybiB0aGlzLnBXb3JsZC5zZXQodGhpcy5vcmllbnRhdGlvbi5yb3RhdGVWZWN0b3IobG9jYWxQb3NpdGlvbikpO1xufTtcbkJvZHkucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gUGFydGljbGUucHJvdG90eXBlLmdldEVuZXJneS5jYWxsKHRoaXMpICsgMC41ICogdGhpcy5pbmVydGlhLnZlY3Rvck11bHRpcGx5KHRoaXMuYW5ndWxhclZlbG9jaXR5KS5kb3QodGhpcy5hbmd1bGFyVmVsb2NpdHkpO1xufTtcbkJvZHkucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQocCwgdiwgcSwgTCkge1xuICAgIFBhcnRpY2xlLnByb3RvdHlwZS5yZXNldC5jYWxsKHRoaXMsIHAsIHYpO1xuICAgIHRoaXMuYW5ndWxhclZlbG9jaXR5LmNsZWFyKCk7XG4gICAgdGhpcy5zZXRPcmllbnRhdGlvbihxIHx8IFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuc2V0QW5ndWxhck1vbWVudHVtKEwgfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG59O1xuQm9keS5wcm90b3R5cGUuc2V0T3JpZW50YXRpb24gPSBmdW5jdGlvbiBzZXRPcmllbnRhdGlvbihxKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbi5zZXQocSk7XG59O1xuQm9keS5wcm90b3R5cGUuc2V0QW5ndWxhclZlbG9jaXR5ID0gZnVuY3Rpb24gc2V0QW5ndWxhclZlbG9jaXR5KHcpIHtcbiAgICB0aGlzLndha2UoKTtcbiAgICB0aGlzLmFuZ3VsYXJWZWxvY2l0eS5zZXQodyk7XG59O1xuQm9keS5wcm90b3R5cGUuc2V0QW5ndWxhck1vbWVudHVtID0gZnVuY3Rpb24gc2V0QW5ndWxhck1vbWVudHVtKEwpIHtcbiAgICB0aGlzLndha2UoKTtcbiAgICB0aGlzLmFuZ3VsYXJNb21lbnR1bS5zZXQoTCk7XG59O1xuQm9keS5wcm90b3R5cGUuYXBwbHlGb3JjZSA9IGZ1bmN0aW9uIGFwcGx5Rm9yY2UoZm9yY2UsIGxvY2F0aW9uKSB7XG4gICAgUGFydGljbGUucHJvdG90eXBlLmFwcGx5Rm9yY2UuY2FsbCh0aGlzLCBmb3JjZSk7XG4gICAgaWYgKGxvY2F0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuYXBwbHlUb3JxdWUobG9jYXRpb24uY3Jvc3MoZm9yY2UpKTtcbn07XG5Cb2R5LnByb3RvdHlwZS5hcHBseVRvcnF1ZSA9IGZ1bmN0aW9uIGFwcGx5VG9ycXVlKHRvcnF1ZSkge1xuICAgIHRoaXMud2FrZSgpO1xuICAgIHRoaXMudG9ycXVlLnNldCh0aGlzLnRvcnF1ZS5hZGQodG9ycXVlKSk7XG59O1xuQm9keS5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKCkge1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUodGhpcy5vcmllbnRhdGlvbi5nZXRUcmFuc2Zvcm0oKSwgVHJhbnNmb3JtLmdldFRyYW5zbGF0ZShQYXJ0aWNsZS5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtLmNhbGwodGhpcykpKTtcbn07XG5Cb2R5LnByb3RvdHlwZS5faW50ZWdyYXRlID0gZnVuY3Rpb24gX2ludGVncmF0ZShkdCkge1xuICAgIFBhcnRpY2xlLnByb3RvdHlwZS5faW50ZWdyYXRlLmNhbGwodGhpcywgZHQpO1xuICAgIHRoaXMuaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtKGR0KTtcbiAgICB0aGlzLnVwZGF0ZUFuZ3VsYXJWZWxvY2l0eShkdCk7XG4gICAgdGhpcy5pbnRlZ3JhdGVPcmllbnRhdGlvbihkdCk7XG59O1xuQm9keS5wcm90b3R5cGUuaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtID0gZnVuY3Rpb24gaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtKGR0KSB7XG4gICAgSW50ZWdyYXRvci5pbnRlZ3JhdGVBbmd1bGFyTW9tZW50dW0odGhpcywgZHQpO1xufTtcbkJvZHkucHJvdG90eXBlLmludGVncmF0ZU9yaWVudGF0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlT3JpZW50YXRpb24oZHQpIHtcbiAgICBJbnRlZ3JhdG9yLmludGVncmF0ZU9yaWVudGF0aW9uKHRoaXMsIGR0KTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEJvZHk7IiwidmFyIEJvZHkgPSByZXF1aXJlKCcuL0JvZHknKTtcbnZhciBNYXRyaXggPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9NYXRyaXgnKTtcbmZ1bmN0aW9uIENpcmNsZShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5zZXRSYWRpdXMob3B0aW9ucy5yYWRpdXMgfHwgMCk7XG4gICAgQm9keS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufVxuQ2lyY2xlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQm9keS5wcm90b3R5cGUpO1xuQ2lyY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENpcmNsZTtcbkNpcmNsZS5wcm90b3R5cGUuc2V0UmFkaXVzID0gZnVuY3Rpb24gc2V0UmFkaXVzKHIpIHtcbiAgICB0aGlzLnJhZGl1cyA9IHI7XG4gICAgdGhpcy5zaXplID0gW1xuICAgICAgICAyICogdGhpcy5yYWRpdXMsXG4gICAgICAgIDIgKiB0aGlzLnJhZGl1c1xuICAgIF07XG4gICAgdGhpcy5zZXRNb21lbnRzT2ZJbmVydGlhKCk7XG59O1xuQ2lyY2xlLnByb3RvdHlwZS5zZXRNb21lbnRzT2ZJbmVydGlhID0gZnVuY3Rpb24gc2V0TW9tZW50c09mSW5lcnRpYSgpIHtcbiAgICB2YXIgbSA9IHRoaXMubWFzcztcbiAgICB2YXIgciA9IHRoaXMucmFkaXVzO1xuICAgIHRoaXMuaW5lcnRpYSA9IG5ldyBNYXRyaXgoW1xuICAgICAgICBbXG4gICAgICAgICAgICAwLjI1ICogbSAqIHIgKiByLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAuMjUgKiBtICogciAqIHIsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMC41ICogbSAqIHIgKiByXG4gICAgICAgIF1cbiAgICBdKTtcbiAgICB0aGlzLmludmVyc2VJbmVydGlhID0gbmV3IE1hdHJpeChbXG4gICAgICAgIFtcbiAgICAgICAgICAgIDQgLyAobSAqIHIgKiByKSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICA0IC8gKG0gKiByICogciksXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMiAvIChtICogciAqIHIpXG4gICAgICAgIF1cbiAgICBdKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IENpcmNsZTsiLCJ2YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgSW50ZWdyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVncmF0b3JzL1N5bXBsZWN0aWNFdWxlcicpO1xuZnVuY3Rpb24gUGFydGljbGUob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHZhciBkZWZhdWx0cyA9IFBhcnRpY2xlLkRFRkFVTFRfT1BUSU9OUztcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudmVsb2NpdHkgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5mb3JjZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLl9lbmdpbmUgPSBudWxsO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbnVsbDtcbiAgICB0aGlzLm1hc3MgPSBvcHRpb25zLm1hc3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubWFzcyA6IGRlZmF1bHRzLm1hc3M7XG4gICAgdGhpcy5pbnZlcnNlTWFzcyA9IDEgLyB0aGlzLm1hc3M7XG4gICAgdGhpcy5zZXRQb3NpdGlvbihvcHRpb25zLnBvc2l0aW9uIHx8IGRlZmF1bHRzLnBvc2l0aW9uKTtcbiAgICB0aGlzLnNldFZlbG9jaXR5KG9wdGlvbnMudmVsb2NpdHkgfHwgZGVmYXVsdHMudmVsb2NpdHkpO1xuICAgIHRoaXMuZm9yY2Uuc2V0KG9wdGlvbnMuZm9yY2UgfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBUcmFuc2Zvcm0uaWRlbnRpdHkuc2xpY2UoKTtcbiAgICB0aGlzLl9zcGVjID0ge1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICBdLFxuICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdGhpcy50cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgICAgICAwLjUsXG4gICAgICAgICAgICAgICAgMC41XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgdGFyZ2V0OiBudWxsXG4gICAgICAgIH1cbiAgICB9O1xufVxuUGFydGljbGUuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBvc2l0aW9uOiBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdLFxuICAgIHZlbG9jaXR5OiBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdLFxuICAgIG1hc3M6IDFcbn07XG52YXIgX2V2ZW50cyA9IHtcbiAgICAgICAgc3RhcnQ6ICdzdGFydCcsXG4gICAgICAgIHVwZGF0ZTogJ3VwZGF0ZScsXG4gICAgICAgIGVuZDogJ2VuZCdcbiAgICB9O1xudmFyIG5vdyA9IERhdGUubm93O1xuUGFydGljbGUucHJvdG90eXBlLmlzQm9keSA9IGZhbHNlO1xuUGFydGljbGUucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLl9pc1NsZWVwaW5nO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zbGVlcCA9IGZ1bmN0aW9uIHNsZWVwKCkge1xuICAgIGlmICh0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuZW5kLCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gdHJ1ZTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUud2FrZSA9IGZ1bmN0aW9uIHdha2UoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NsZWVwaW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5lbWl0KF9ldmVudHMuc3RhcnQsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9wcmV2VGltZSA9IG5vdygpO1xuICAgIGlmICh0aGlzLl9lbmdpbmUpXG4gICAgICAgIHRoaXMuX2VuZ2luZS53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gc2V0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICB0aGlzLnBvc2l0aW9uLnNldChwb3NpdGlvbik7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldFBvc2l0aW9uMUQgPSBmdW5jdGlvbiBzZXRQb3NpdGlvbjFEKHgpIHtcbiAgICB0aGlzLnBvc2l0aW9uLnggPSB4O1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uZ2V0KCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFBvc2l0aW9uMUQgPSBmdW5jdGlvbiBnZXRQb3NpdGlvbjFEKCkge1xuICAgIHRoaXMuX2VuZ2luZS5zdGVwKCk7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24ueDtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2ZWxvY2l0eSkge1xuICAgIHRoaXMudmVsb2NpdHkuc2V0KHZlbG9jaXR5KTtcbiAgICBpZiAoISh2ZWxvY2l0eVswXSA9PT0gMCAmJiB2ZWxvY2l0eVsxXSA9PT0gMCAmJiB2ZWxvY2l0eVsyXSA9PT0gMCkpXG4gICAgICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRWZWxvY2l0eTFEID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkxRCh4KSB7XG4gICAgdGhpcy52ZWxvY2l0eS54ID0geDtcbiAgICBpZiAoeCAhPT0gMClcbiAgICAgICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVsb2NpdHkuZ2V0KCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldEZvcmNlID0gZnVuY3Rpb24gc2V0Rm9yY2UoZm9yY2UpIHtcbiAgICB0aGlzLmZvcmNlLnNldChmb3JjZSk7XG4gICAgdGhpcy53YWtlKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFZlbG9jaXR5MUQgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eTFEKCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5Lng7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnNldE1hc3MgPSBmdW5jdGlvbiBzZXRNYXNzKG1hc3MpIHtcbiAgICB0aGlzLm1hc3MgPSBtYXNzO1xuICAgIHRoaXMuaW52ZXJzZU1hc3MgPSAxIC8gbWFzcztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0TWFzcyA9IGZ1bmN0aW9uIGdldE1hc3MoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFzcztcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChwb3NpdGlvbiwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHBvc2l0aW9uIHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuc2V0VmVsb2NpdHkodmVsb2NpdHkgfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKGZvcmNlKSB7XG4gICAgaWYgKGZvcmNlLmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5mb3JjZS5hZGQoZm9yY2UpLnB1dCh0aGlzLmZvcmNlKTtcbiAgICB0aGlzLndha2UoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuYXBwbHlJbXB1bHNlID0gZnVuY3Rpb24gYXBwbHlJbXB1bHNlKGltcHVsc2UpIHtcbiAgICBpZiAoaW1wdWxzZS5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciB2ZWxvY2l0eSA9IHRoaXMudmVsb2NpdHk7XG4gICAgdmVsb2NpdHkuYWRkKGltcHVsc2UubXVsdCh0aGlzLmludmVyc2VNYXNzKSkucHV0KHZlbG9jaXR5KTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuaW50ZWdyYXRlVmVsb2NpdHkgPSBmdW5jdGlvbiBpbnRlZ3JhdGVWZWxvY2l0eShkdCkge1xuICAgIEludGVncmF0b3IuaW50ZWdyYXRlVmVsb2NpdHkodGhpcywgZHQpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5pbnRlZ3JhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uIGludGVncmF0ZVBvc2l0aW9uKGR0KSB7XG4gICAgSW50ZWdyYXRvci5pbnRlZ3JhdGVQb3NpdGlvbih0aGlzLCBkdCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLl9pbnRlZ3JhdGUgPSBmdW5jdGlvbiBfaW50ZWdyYXRlKGR0KSB7XG4gICAgdGhpcy5pbnRlZ3JhdGVWZWxvY2l0eShkdCk7XG4gICAgdGhpcy5pbnRlZ3JhdGVQb3NpdGlvbihkdCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gMC41ICogdGhpcy5tYXNzICogdGhpcy52ZWxvY2l0eS5ub3JtU3F1YXJlZCgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgdGhpcy5fZW5naW5lLnN0ZXAoKTtcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xuICAgIHZhciB0cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybTtcbiAgICB0cmFuc2Zvcm1bMTJdID0gcG9zaXRpb24ueDtcbiAgICB0cmFuc2Zvcm1bMTNdID0gcG9zaXRpb24ueTtcbiAgICB0cmFuc2Zvcm1bMTRdID0gcG9zaXRpb24uejtcbiAgICByZXR1cm4gdHJhbnNmb3JtO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgdmFyIF9zcGVjID0gdGhpcy5fc3BlYy50YXJnZXQ7XG4gICAgX3NwZWMudHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICBfc3BlYy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgcmV0dXJuIHRoaXMuX3NwZWM7XG59O1xuZnVuY3Rpb24gX2NyZWF0ZUV2ZW50T3V0cHV0KCkge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cblBhcnRpY2xlLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudE91dHB1dClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQodHlwZSwgZGF0YSk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSgpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy51bnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRpY2xlOyIsInZhciBCb2R5ID0gcmVxdWlyZSgnLi9Cb2R5Jyk7XG52YXIgTWF0cml4ID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvTWF0cml4Jyk7XG5mdW5jdGlvbiBSZWN0YW5nbGUob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuc2l6ZSA9IG9wdGlvbnMuc2l6ZSB8fCBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIEJvZHkuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblJlY3RhbmdsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJvZHkucHJvdG90eXBlKTtcblJlY3RhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSZWN0YW5nbGU7XG5SZWN0YW5nbGUucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplKHNpemUpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgIHRoaXMuc2V0TW9tZW50c09mSW5lcnRpYSgpO1xufTtcblJlY3RhbmdsZS5wcm90b3R5cGUuc2V0TW9tZW50c09mSW5lcnRpYSA9IGZ1bmN0aW9uIHNldE1vbWVudHNPZkluZXJ0aWEoKSB7XG4gICAgdmFyIG0gPSB0aGlzLm1hc3M7XG4gICAgdmFyIHcgPSB0aGlzLnNpemVbMF07XG4gICAgdmFyIGggPSB0aGlzLnNpemVbMV07XG4gICAgdGhpcy5pbmVydGlhID0gbmV3IE1hdHJpeChbXG4gICAgICAgIFtcbiAgICAgICAgICAgIG0gKiBoICogaCAvIDEyLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIG0gKiB3ICogdyAvIDEyLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIG0gKiAodyAqIHcgKyBoICogaCkgLyAxMlxuICAgICAgICBdXG4gICAgXSk7XG4gICAgdGhpcy5pbnZlcnNlSW5lcnRpYSA9IG5ldyBNYXRyaXgoW1xuICAgICAgICBbXG4gICAgICAgICAgICAxMiAvIChtICogaCAqIGgpLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEyIC8gKG0gKiB3ICogdyksXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMTIgLyAobSAqICh3ICogdyArIGggKiBoKSlcbiAgICAgICAgXVxuICAgIF0pO1xufTtcbm1vZHVsZS5leHBvcnRzID0gUmVjdGFuZ2xlOyIsInZhciBDb25zdHJhaW50ID0gcmVxdWlyZSgnLi9Db25zdHJhaW50Jyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBDb2xsaXNpb24ob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoQ29sbGlzaW9uLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLm5vcm1hbCA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnBEaWZmID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMudkRpZmYgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5pbXB1bHNlMSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UyID0gbmV3IFZlY3RvcigpO1xuICAgIENvbnN0cmFpbnQuY2FsbCh0aGlzKTtcbn1cbkNvbGxpc2lvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcbkNvbGxpc2lvbi5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb2xsaXNpb247XG5Db2xsaXNpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHJlc3RpdHV0aW9uOiAwLjUsXG4gICAgZHJpZnQ6IDAuNSxcbiAgICBzbG9wOiAwXG59O1xuZnVuY3Rpb24gX25vcm1hbFZlbG9jaXR5KHBhcnRpY2xlMSwgcGFydGljbGUyKSB7XG4gICAgcmV0dXJuIHBhcnRpY2xlMS52ZWxvY2l0eS5kb3QocGFydGljbGUyLnZlbG9jaXR5KTtcbn1cbkNvbGxpc2lvbi5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKVxuICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbn07XG5Db2xsaXNpb24ucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludCA9IGZ1bmN0aW9uIGFwcGx5Q29uc3RyYWludCh0YXJnZXRzLCBzb3VyY2UsIGR0KSB7XG4gICAgaWYgKHNvdXJjZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIHYxID0gc291cmNlLnZlbG9jaXR5O1xuICAgIHZhciBwMSA9IHNvdXJjZS5wb3NpdGlvbjtcbiAgICB2YXIgdzEgPSBzb3VyY2UuaW52ZXJzZU1hc3M7XG4gICAgdmFyIHIxID0gc291cmNlLnJhZGl1cztcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgZHJpZnQgPSBvcHRpb25zLmRyaWZ0O1xuICAgIHZhciBzbG9wID0gLW9wdGlvbnMuc2xvcDtcbiAgICB2YXIgcmVzdGl0dXRpb24gPSBvcHRpb25zLnJlc3RpdHV0aW9uO1xuICAgIHZhciBuID0gdGhpcy5ub3JtYWw7XG4gICAgdmFyIHBEaWZmID0gdGhpcy5wRGlmZjtcbiAgICB2YXIgdkRpZmYgPSB0aGlzLnZEaWZmO1xuICAgIHZhciBpbXB1bHNlMSA9IHRoaXMuaW1wdWxzZTE7XG4gICAgdmFyIGltcHVsc2UyID0gdGhpcy5pbXB1bHNlMjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgIGlmICh0YXJnZXQgPT09IHNvdXJjZSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB2YXIgdjIgPSB0YXJnZXQudmVsb2NpdHk7XG4gICAgICAgIHZhciBwMiA9IHRhcmdldC5wb3NpdGlvbjtcbiAgICAgICAgdmFyIHcyID0gdGFyZ2V0LmludmVyc2VNYXNzO1xuICAgICAgICB2YXIgcjIgPSB0YXJnZXQucmFkaXVzO1xuICAgICAgICBwRGlmZi5zZXQocDIuc3ViKHAxKSk7XG4gICAgICAgIHZEaWZmLnNldCh2Mi5zdWIodjEpKTtcbiAgICAgICAgdmFyIGRpc3QgPSBwRGlmZi5ub3JtKCk7XG4gICAgICAgIHZhciBvdmVybGFwID0gZGlzdCAtIChyMSArIHIyKTtcbiAgICAgICAgdmFyIGVmZk1hc3MgPSAxIC8gKHcxICsgdzIpO1xuICAgICAgICB2YXIgZ2FtbWEgPSAwO1xuICAgICAgICBpZiAob3ZlcmxhcCA8IDApIHtcbiAgICAgICAgICAgIG4uc2V0KHBEaWZmLm5vcm1hbGl6ZSgpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudE91dHB1dCkge1xuICAgICAgICAgICAgICAgIHZhciBjb2xsaXNpb25EYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXA6IG92ZXJsYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWw6IG5cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdwcmVDb2xsaXNpb24nLCBjb2xsaXNpb25EYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdjb2xsaXNpb24nLCBjb2xsaXNpb25EYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsYW1iZGEgPSBvdmVybGFwIDw9IHNsb3AgPyAoKDEgKyByZXN0aXR1dGlvbikgKiBuLmRvdCh2RGlmZikgKyBkcmlmdCAvIGR0ICogKG92ZXJsYXAgLSBzbG9wKSkgLyAoZ2FtbWEgKyBkdCAvIGVmZk1hc3MpIDogKDEgKyByZXN0aXR1dGlvbikgKiBuLmRvdCh2RGlmZikgLyAoZ2FtbWEgKyBkdCAvIGVmZk1hc3MpO1xuICAgICAgICAgICAgbi5tdWx0KGR0ICogbGFtYmRhKS5wdXQoaW1wdWxzZTEpO1xuICAgICAgICAgICAgaW1wdWxzZTEubXVsdCgtMSkucHV0KGltcHVsc2UyKTtcbiAgICAgICAgICAgIHNvdXJjZS5hcHBseUltcHVsc2UoaW1wdWxzZTEpO1xuICAgICAgICAgICAgdGFyZ2V0LmFwcGx5SW1wdWxzZShpbXB1bHNlMik7XG4gICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRPdXRwdXQpXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncG9zdENvbGxpc2lvbicsIGNvbGxpc2lvbkRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gQ29sbGlzaW9uOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIENvbnN0cmFpbnQoKSB7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cbkNvbnN0cmFpbnQucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCBvcHRpb25zKTtcbn07XG5Db25zdHJhaW50LnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQoKSB7XG59O1xuQ29uc3RyYWludC5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiAwO1xufTtcbm1vZHVsZS5leHBvcnRzID0gQ29uc3RyYWludDsiLCJ2YXIgQ29uc3RyYWludCA9IHJlcXVpcmUoJy4vQ29uc3RyYWludCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gQ3VydmUob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoQ3VydmUuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuSiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UgPSBuZXcgVmVjdG9yKCk7XG4gICAgQ29uc3RyYWludC5jYWxsKHRoaXMpO1xufVxuQ3VydmUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb25zdHJhaW50LnByb3RvdHlwZSk7XG5DdXJ2ZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDdXJ2ZTtcbnZhciBlcHNpbG9uID0gMWUtNztcbnZhciBwaSA9IE1hdGguUEk7XG5DdXJ2ZS5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZXF1YXRpb246IGZ1bmN0aW9uICh4LCB5LCB6KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH0sXG4gICAgcGxhbmU6IGZ1bmN0aW9uICh4LCB5LCB6KSB7XG4gICAgICAgIHJldHVybiB6O1xuICAgIH0sXG4gICAgcGVyaW9kOiAwLFxuICAgIGRhbXBpbmdSYXRpbzogMFxufTtcbkN1cnZlLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpXG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xufTtcbkN1cnZlLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQodGFyZ2V0cywgc291cmNlLCBkdCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBpbXB1bHNlID0gdGhpcy5pbXB1bHNlO1xuICAgIHZhciBKID0gdGhpcy5KO1xuICAgIHZhciBmID0gb3B0aW9ucy5lcXVhdGlvbjtcbiAgICB2YXIgZyA9IG9wdGlvbnMucGxhbmU7XG4gICAgdmFyIGRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIHZhciBwZXJpb2QgPSBvcHRpb25zLnBlcmlvZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGJvZHkgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgdiA9IGJvZHkudmVsb2NpdHk7XG4gICAgICAgIHZhciBwID0gYm9keS5wb3NpdGlvbjtcbiAgICAgICAgdmFyIG0gPSBib2R5Lm1hc3M7XG4gICAgICAgIHZhciBnYW1tYTtcbiAgICAgICAgdmFyIGJldGE7XG4gICAgICAgIGlmIChwZXJpb2QgPT09IDApIHtcbiAgICAgICAgICAgIGdhbW1hID0gMDtcbiAgICAgICAgICAgIGJldGEgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGMgPSA0ICogbSAqIHBpICogZGFtcGluZ1JhdGlvIC8gcGVyaW9kO1xuICAgICAgICAgICAgdmFyIGsgPSA0ICogbSAqIHBpICogcGkgLyAocGVyaW9kICogcGVyaW9kKTtcbiAgICAgICAgICAgIGdhbW1hID0gMSAvIChjICsgZHQgKiBrKTtcbiAgICAgICAgICAgIGJldGEgPSBkdCAqIGsgLyAoYyArIGR0ICogayk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSBwLng7XG4gICAgICAgIHZhciB5ID0gcC55O1xuICAgICAgICB2YXIgeiA9IHAuejtcbiAgICAgICAgdmFyIGYwID0gZih4LCB5LCB6KTtcbiAgICAgICAgdmFyIGRmeCA9IChmKHggKyBlcHNpbG9uLCBwLCBwKSAtIGYwKSAvIGVwc2lsb247XG4gICAgICAgIHZhciBkZnkgPSAoZih4LCB5ICsgZXBzaWxvbiwgcCkgLSBmMCkgLyBlcHNpbG9uO1xuICAgICAgICB2YXIgZGZ6ID0gKGYoeCwgeSwgcCArIGVwc2lsb24pIC0gZjApIC8gZXBzaWxvbjtcbiAgICAgICAgdmFyIGcwID0gZyh4LCB5LCB6KTtcbiAgICAgICAgdmFyIGRneCA9IChnKHggKyBlcHNpbG9uLCB5LCB6KSAtIGcwKSAvIGVwc2lsb247XG4gICAgICAgIHZhciBkZ3kgPSAoZyh4LCB5ICsgZXBzaWxvbiwgeikgLSBnMCkgLyBlcHNpbG9uO1xuICAgICAgICB2YXIgZGd6ID0gKGcoeCwgeSwgeiArIGVwc2lsb24pIC0gZzApIC8gZXBzaWxvbjtcbiAgICAgICAgSi5zZXRYWVooZGZ4ICsgZGd4LCBkZnkgKyBkZ3ksIGRmeiArIGRneik7XG4gICAgICAgIHZhciBhbnRpRHJpZnQgPSBiZXRhIC8gZHQgKiAoZjAgKyBnMCk7XG4gICAgICAgIHZhciBsYW1iZGEgPSAtKEouZG90KHYpICsgYW50aURyaWZ0KSAvIChnYW1tYSArIGR0ICogSi5ub3JtU3F1YXJlZCgpIC8gbSk7XG4gICAgICAgIGltcHVsc2Uuc2V0KEoubXVsdChkdCAqIGxhbWJkYSkpO1xuICAgICAgICBib2R5LmFwcGx5SW1wdWxzZShpbXB1bHNlKTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBDdXJ2ZTsiLCJ2YXIgQ29uc3RyYWludCA9IHJlcXVpcmUoJy4vQ29uc3RyYWludCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gRGlzdGFuY2Uob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5pbXB1bHNlID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMubm9ybWFsID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuZGlmZlAgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5kaWZmViA9IG5ldyBWZWN0b3IoKTtcbiAgICBDb25zdHJhaW50LmNhbGwodGhpcyk7XG59XG5EaXN0YW5jZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcbkRpc3RhbmNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERpc3RhbmNlO1xuRGlzdGFuY2UuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGFuY2hvcjogbnVsbCxcbiAgICBsZW5ndGg6IDAsXG4gICAgbWluTGVuZ3RoOiAwLFxuICAgIHBlcmlvZDogMCxcbiAgICBkYW1waW5nUmF0aW86IDBcbn07XG52YXIgcGkgPSBNYXRoLlBJO1xuRGlzdGFuY2UucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5hbmNob3IpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yLnBvc2l0aW9uIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yLnBvc2l0aW9uO1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3I7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG5ldyBWZWN0b3Iob3B0aW9ucy5hbmNob3IpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5sZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmxlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIGlmIChvcHRpb25zLmRhbXBpbmdSYXRpbyAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZGFtcGluZ1JhdGlvID0gb3B0aW9ucy5kYW1waW5nUmF0aW87XG4gICAgaWYgKG9wdGlvbnMucGVyaW9kICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5wZXJpb2QgPSBvcHRpb25zLnBlcmlvZDtcbiAgICBpZiAob3B0aW9ucy5taW5MZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLm1pbkxlbmd0aCA9IG9wdGlvbnMubWluTGVuZ3RoO1xufTtcbmZ1bmN0aW9uIF9jYWxjRXJyb3IoaW1wdWxzZSwgYm9keSkge1xuICAgIHJldHVybiBib2R5Lm1hc3MgKiBpbXB1bHNlLm5vcm0oKTtcbn1cbkRpc3RhbmNlLnByb3RvdHlwZS5zZXRBbmNob3IgPSBmdW5jdGlvbiBzZXRBbmNob3IoYW5jaG9yKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYW5jaG9yKVxuICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMub3B0aW9ucy5hbmNob3Iuc2V0KGFuY2hvcik7XG59O1xuRGlzdGFuY2UucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludCA9IGZ1bmN0aW9uIGFwcGx5Q29uc3RyYWludCh0YXJnZXRzLCBzb3VyY2UsIGR0KSB7XG4gICAgdmFyIG4gPSB0aGlzLm5vcm1hbDtcbiAgICB2YXIgZGlmZlAgPSB0aGlzLmRpZmZQO1xuICAgIHZhciBkaWZmViA9IHRoaXMuZGlmZlY7XG4gICAgdmFyIGltcHVsc2UgPSB0aGlzLmltcHVsc2U7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIGRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIHZhciBwZXJpb2QgPSBvcHRpb25zLnBlcmlvZDtcbiAgICB2YXIgbWluTGVuZ3RoID0gb3B0aW9ucy5taW5MZW5ndGg7XG4gICAgdmFyIHAyO1xuICAgIHZhciB3MjtcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIHZhciB2MiA9IHNvdXJjZS52ZWxvY2l0eTtcbiAgICAgICAgcDIgPSBzb3VyY2UucG9zaXRpb247XG4gICAgICAgIHcyID0gc291cmNlLmludmVyc2VNYXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHAyID0gdGhpcy5vcHRpb25zLmFuY2hvcjtcbiAgICAgICAgdzIgPSAwO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5vcHRpb25zLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGJvZHkgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgdjEgPSBib2R5LnZlbG9jaXR5O1xuICAgICAgICB2YXIgcDEgPSBib2R5LnBvc2l0aW9uO1xuICAgICAgICB2YXIgdzEgPSBib2R5LmludmVyc2VNYXNzO1xuICAgICAgICBkaWZmUC5zZXQocDEuc3ViKHAyKSk7XG4gICAgICAgIG4uc2V0KGRpZmZQLm5vcm1hbGl6ZSgpKTtcbiAgICAgICAgdmFyIGRpc3QgPSBkaWZmUC5ub3JtKCkgLSBsZW5ndGg7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaXN0KSA8IG1pbkxlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHNvdXJjZSlcbiAgICAgICAgICAgIGRpZmZWLnNldCh2MS5zdWIodjIpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGlmZlYuc2V0KHYxKTtcbiAgICAgICAgdmFyIGVmZk1hc3MgPSAxIC8gKHcxICsgdzIpO1xuICAgICAgICB2YXIgZ2FtbWE7XG4gICAgICAgIHZhciBiZXRhO1xuICAgICAgICBpZiAocGVyaW9kID09PSAwKSB7XG4gICAgICAgICAgICBnYW1tYSA9IDA7XG4gICAgICAgICAgICBiZXRhID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBjID0gNCAqIGVmZk1hc3MgKiBwaSAqIGRhbXBpbmdSYXRpbyAvIHBlcmlvZDtcbiAgICAgICAgICAgIHZhciBrID0gNCAqIGVmZk1hc3MgKiBwaSAqIHBpIC8gKHBlcmlvZCAqIHBlcmlvZCk7XG4gICAgICAgICAgICBnYW1tYSA9IDEgLyAoYyArIGR0ICogayk7XG4gICAgICAgICAgICBiZXRhID0gZHQgKiBrIC8gKGMgKyBkdCAqIGspO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbnRpRHJpZnQgPSBiZXRhIC8gZHQgKiBkaXN0O1xuICAgICAgICB2YXIgbGFtYmRhID0gLShuLmRvdChkaWZmVikgKyBhbnRpRHJpZnQpIC8gKGdhbW1hICsgZHQgLyBlZmZNYXNzKTtcbiAgICAgICAgaW1wdWxzZS5zZXQobi5tdWx0KGR0ICogbGFtYmRhKSk7XG4gICAgICAgIGJvZHkuYXBwbHlJbXB1bHNlKGltcHVsc2UpO1xuICAgICAgICBpZiAoc291cmNlKVxuICAgICAgICAgICAgc291cmNlLmFwcGx5SW1wdWxzZShpbXB1bHNlLm11bHQoLTEpKTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBEaXN0YW5jZTsiLCJ2YXIgQ29uc3RyYWludCA9IHJlcXVpcmUoJy4vQ29uc3RyYWludCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU25hcChvcHRpb25zKSB7XG4gICAgQ29uc3RyYWludC5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5wRGlmZiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnZEaWZmID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuaW1wdWxzZTEgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5pbXB1bHNlMiA9IG5ldyBWZWN0b3IoKTtcbn1cblNuYXAucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb25zdHJhaW50LnByb3RvdHlwZSk7XG5TbmFwLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNuYXA7XG5TbmFwLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDMwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuMSxcbiAgICBsZW5ndGg6IDAsXG4gICAgYW5jaG9yOiB1bmRlZmluZWRcbn07XG52YXIgcGkgPSBNYXRoLlBJO1xuU25hcC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmFuY2hvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvcjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yLnBvc2l0aW9uIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yLnBvc2l0aW9uO1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBuZXcgVmVjdG9yKG9wdGlvbnMuYW5jaG9yKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMubGVuZ3RoICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5sZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICBpZiAob3B0aW9ucy5kYW1waW5nUmF0aW8gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChvcHRpb25zLnBlcmlvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMucGVyaW9kID0gb3B0aW9ucy5wZXJpb2Q7XG4gICAgQ29uc3RyYWludC5wcm90b3R5cGUuc2V0T3B0aW9ucy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufTtcblNuYXAucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSh0YXJnZXRzLCBzb3VyY2UpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgcmVzdExlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIHN0cmVuZ3RoID0gTWF0aC5wb3coMiAqIHBpIC8gb3B0aW9ucy5wZXJpb2QsIDIpO1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgdmFyIGRpc3QgPSBhbmNob3Iuc3ViKHRhcmdldC5wb3NpdGlvbikubm9ybSgpIC0gcmVzdExlbmd0aDtcbiAgICAgICAgZW5lcmd5ICs9IDAuNSAqIHN0cmVuZ3RoICogZGlzdCAqIGRpc3Q7XG4gICAgfVxuICAgIHJldHVybiBlbmVyZ3k7XG59O1xuU25hcC5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50ID0gZnVuY3Rpb24gYXBwbHlDb25zdHJhaW50KHRhcmdldHMsIHNvdXJjZSwgZHQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgcERpZmYgPSB0aGlzLnBEaWZmO1xuICAgIHZhciB2RGlmZiA9IHRoaXMudkRpZmY7XG4gICAgdmFyIGltcHVsc2UxID0gdGhpcy5pbXB1bHNlMTtcbiAgICB2YXIgaW1wdWxzZTIgPSB0aGlzLmltcHVsc2UyO1xuICAgIHZhciBsZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gb3B0aW9ucy5hbmNob3IgfHwgc291cmNlLnBvc2l0aW9uO1xuICAgIHZhciBwZXJpb2QgPSBvcHRpb25zLnBlcmlvZDtcbiAgICB2YXIgZGFtcGluZ1JhdGlvID0gb3B0aW9ucy5kYW1waW5nUmF0aW87XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgcDEgPSB0YXJnZXQucG9zaXRpb247XG4gICAgICAgIHZhciB2MSA9IHRhcmdldC52ZWxvY2l0eTtcbiAgICAgICAgdmFyIG0xID0gdGFyZ2V0Lm1hc3M7XG4gICAgICAgIHZhciB3MSA9IHRhcmdldC5pbnZlcnNlTWFzcztcbiAgICAgICAgcERpZmYuc2V0KHAxLnN1YihhbmNob3IpKTtcbiAgICAgICAgdmFyIGRpc3QgPSBwRGlmZi5ub3JtKCkgLSBsZW5ndGg7XG4gICAgICAgIHZhciBlZmZNYXNzO1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICB2YXIgdzIgPSBzb3VyY2UuaW52ZXJzZU1hc3M7XG4gICAgICAgICAgICB2YXIgdjIgPSBzb3VyY2UudmVsb2NpdHk7XG4gICAgICAgICAgICB2RGlmZi5zZXQodjEuc3ViKHYyKSk7XG4gICAgICAgICAgICBlZmZNYXNzID0gMSAvICh3MSArIHcyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZEaWZmLnNldCh2MSk7XG4gICAgICAgICAgICBlZmZNYXNzID0gbTE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdhbW1hO1xuICAgICAgICB2YXIgYmV0YTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZXJpb2QgPT09IDApIHtcbiAgICAgICAgICAgIGdhbW1hID0gMDtcbiAgICAgICAgICAgIGJldGEgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGsgPSA0ICogZWZmTWFzcyAqIHBpICogcGkgLyAocGVyaW9kICogcGVyaW9kKTtcbiAgICAgICAgICAgIHZhciBjID0gNCAqIGVmZk1hc3MgKiBwaSAqIGRhbXBpbmdSYXRpbyAvIHBlcmlvZDtcbiAgICAgICAgICAgIGJldGEgPSBkdCAqIGsgLyAoYyArIGR0ICogayk7XG4gICAgICAgICAgICBnYW1tYSA9IDEgLyAoYyArIGR0ICogayk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFudGlEcmlmdCA9IGJldGEgLyBkdCAqIGRpc3Q7XG4gICAgICAgIHBEaWZmLm5vcm1hbGl6ZSgtYW50aURyaWZ0KS5zdWIodkRpZmYpLm11bHQoZHQgLyAoZ2FtbWEgKyBkdCAvIGVmZk1hc3MpKS5wdXQoaW1wdWxzZTEpO1xuICAgICAgICB0YXJnZXQuYXBwbHlJbXB1bHNlKGltcHVsc2UxKTtcbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgaW1wdWxzZTEubXVsdCgtMSkucHV0KGltcHVsc2UyKTtcbiAgICAgICAgICAgIHNvdXJjZS5hcHBseUltcHVsc2UoaW1wdWxzZTIpO1xuICAgICAgICB9XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gU25hcDsiLCJ2YXIgQ29uc3RyYWludCA9IHJlcXVpcmUoJy4vQ29uc3RyYWludCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU3VyZmFjZShvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLkogPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5pbXB1bHNlID0gbmV3IFZlY3RvcigpO1xuICAgIENvbnN0cmFpbnQuY2FsbCh0aGlzKTtcbn1cblN1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb25zdHJhaW50LnByb3RvdHlwZSk7XG5TdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFN1cmZhY2U7XG5TdXJmYWNlLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBlcXVhdGlvbjogdW5kZWZpbmVkLFxuICAgIHBlcmlvZDogMCxcbiAgICBkYW1waW5nUmF0aW86IDBcbn07XG52YXIgZXBzaWxvbiA9IDFlLTc7XG52YXIgcGkgPSBNYXRoLlBJO1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKVxuICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQodGFyZ2V0cywgc291cmNlLCBkdCkge1xuICAgIHZhciBpbXB1bHNlID0gdGhpcy5pbXB1bHNlO1xuICAgIHZhciBKID0gdGhpcy5KO1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBmID0gb3B0aW9ucy5lcXVhdGlvbjtcbiAgICB2YXIgZGFtcGluZ1JhdGlvID0gb3B0aW9ucy5kYW1waW5nUmF0aW87XG4gICAgdmFyIHBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFydGljbGUgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgdiA9IHBhcnRpY2xlLnZlbG9jaXR5O1xuICAgICAgICB2YXIgcCA9IHBhcnRpY2xlLnBvc2l0aW9uO1xuICAgICAgICB2YXIgbSA9IHBhcnRpY2xlLm1hc3M7XG4gICAgICAgIHZhciBnYW1tYTtcbiAgICAgICAgdmFyIGJldGE7XG4gICAgICAgIGlmIChwZXJpb2QgPT09IDApIHtcbiAgICAgICAgICAgIGdhbW1hID0gMDtcbiAgICAgICAgICAgIGJldGEgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGMgPSA0ICogbSAqIHBpICogZGFtcGluZ1JhdGlvIC8gcGVyaW9kO1xuICAgICAgICAgICAgdmFyIGsgPSA0ICogbSAqIHBpICogcGkgLyAocGVyaW9kICogcGVyaW9kKTtcbiAgICAgICAgICAgIGdhbW1hID0gMSAvIChjICsgZHQgKiBrKTtcbiAgICAgICAgICAgIGJldGEgPSBkdCAqIGsgLyAoYyArIGR0ICogayk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSBwLng7XG4gICAgICAgIHZhciB5ID0gcC55O1xuICAgICAgICB2YXIgeiA9IHAuejtcbiAgICAgICAgdmFyIGYwID0gZih4LCB5LCB6KTtcbiAgICAgICAgdmFyIGRmeCA9IChmKHggKyBlcHNpbG9uLCBwLCBwKSAtIGYwKSAvIGVwc2lsb247XG4gICAgICAgIHZhciBkZnkgPSAoZih4LCB5ICsgZXBzaWxvbiwgcCkgLSBmMCkgLyBlcHNpbG9uO1xuICAgICAgICB2YXIgZGZ6ID0gKGYoeCwgeSwgcCArIGVwc2lsb24pIC0gZjApIC8gZXBzaWxvbjtcbiAgICAgICAgSi5zZXRYWVooZGZ4LCBkZnksIGRmeik7XG4gICAgICAgIHZhciBhbnRpRHJpZnQgPSBiZXRhIC8gZHQgKiBmMDtcbiAgICAgICAgdmFyIGxhbWJkYSA9IC0oSi5kb3QodikgKyBhbnRpRHJpZnQpIC8gKGdhbW1hICsgZHQgKiBKLm5vcm1TcXVhcmVkKCkgLyBtKTtcbiAgICAgICAgaW1wdWxzZS5zZXQoSi5tdWx0KGR0ICogbGFtYmRhKSk7XG4gICAgICAgIHBhcnRpY2xlLmFwcGx5SW1wdWxzZShpbXB1bHNlKTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTdXJmYWNlOyIsInZhciBDb25zdHJhaW50ID0gcmVxdWlyZSgnLi9Db25zdHJhaW50Jyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBXYWxsKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFdhbGwuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuZGlmZiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UgPSBuZXcgVmVjdG9yKCk7XG4gICAgQ29uc3RyYWludC5jYWxsKHRoaXMpO1xufVxuV2FsbC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcbldhbGwucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gV2FsbDtcbldhbGwuT05fQ09OVEFDVCA9IHtcbiAgICBSRUZMRUNUOiAwLFxuICAgIFNJTEVOVDogMVxufTtcbldhbGwuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHJlc3RpdHV0aW9uOiAwLjUsXG4gICAgZHJpZnQ6IDAuNSxcbiAgICBzbG9wOiAwLFxuICAgIG5vcm1hbDogW1xuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSxcbiAgICBkaXN0YW5jZTogMCxcbiAgICBvbkNvbnRhY3Q6IFdhbGwuT05fQ09OVEFDVC5SRUZMRUNUXG59O1xuV2FsbC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLm5vcm1hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLm5vcm1hbCBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5ub3JtYWwgPSBvcHRpb25zLm5vcm1hbC5jbG9uZSgpO1xuICAgICAgICBpZiAob3B0aW9ucy5ub3JtYWwgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5ub3JtYWwgPSBuZXcgVmVjdG9yKG9wdGlvbnMubm9ybWFsKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucmVzdGl0dXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnJlc3RpdHV0aW9uID0gb3B0aW9ucy5yZXN0aXR1dGlvbjtcbiAgICBpZiAob3B0aW9ucy5kcmlmdCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZHJpZnQgPSBvcHRpb25zLmRyaWZ0O1xuICAgIGlmIChvcHRpb25zLnNsb3AgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnNsb3AgPSBvcHRpb25zLnNsb3A7XG4gICAgaWYgKG9wdGlvbnMuZGlzdGFuY2UgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZTtcbiAgICBpZiAob3B0aW9ucy5vbkNvbnRhY3QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQ29udGFjdCA9IG9wdGlvbnMub25Db250YWN0O1xufTtcbmZ1bmN0aW9uIF9nZXROb3JtYWxWZWxvY2l0eShuLCB2KSB7XG4gICAgcmV0dXJuIHYuZG90KG4pO1xufVxuZnVuY3Rpb24gX2dldERpc3RhbmNlRnJvbU9yaWdpbihwKSB7XG4gICAgdmFyIG4gPSB0aGlzLm9wdGlvbnMubm9ybWFsO1xuICAgIHZhciBkID0gdGhpcy5vcHRpb25zLmRpc3RhbmNlO1xuICAgIHJldHVybiBwLmRvdChuKSArIGQ7XG59XG5mdW5jdGlvbiBfb25FbnRlcihwYXJ0aWNsZSwgb3ZlcmxhcCwgZHQpIHtcbiAgICB2YXIgcCA9IHBhcnRpY2xlLnBvc2l0aW9uO1xuICAgIHZhciB2ID0gcGFydGljbGUudmVsb2NpdHk7XG4gICAgdmFyIG0gPSBwYXJ0aWNsZS5tYXNzO1xuICAgIHZhciBuID0gdGhpcy5vcHRpb25zLm5vcm1hbDtcbiAgICB2YXIgYWN0aW9uID0gdGhpcy5vcHRpb25zLm9uQ29udGFjdDtcbiAgICB2YXIgcmVzdGl0dXRpb24gPSB0aGlzLm9wdGlvbnMucmVzdGl0dXRpb247XG4gICAgdmFyIGltcHVsc2UgPSB0aGlzLmltcHVsc2U7XG4gICAgdmFyIGRyaWZ0ID0gdGhpcy5vcHRpb25zLmRyaWZ0O1xuICAgIHZhciBzbG9wID0gLXRoaXMub3B0aW9ucy5zbG9wO1xuICAgIHZhciBnYW1tYSA9IDA7XG4gICAgaWYgKHRoaXMuX2V2ZW50T3V0cHV0KSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICAgIHBhcnRpY2xlOiBwYXJ0aWNsZSxcbiAgICAgICAgICAgICAgICB3YWxsOiB0aGlzLFxuICAgICAgICAgICAgICAgIG92ZXJsYXA6IG92ZXJsYXAsXG4gICAgICAgICAgICAgICAgbm9ybWFsOiBuXG4gICAgICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdwcmVDb2xsaXNpb24nLCBkYXRhKTtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnY29sbGlzaW9uJywgZGF0YSk7XG4gICAgfVxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgY2FzZSBXYWxsLk9OX0NPTlRBQ1QuUkVGTEVDVDpcbiAgICAgICAgdmFyIGxhbWJkYSA9IG92ZXJsYXAgPCBzbG9wID8gLSgoMSArIHJlc3RpdHV0aW9uKSAqIG4uZG90KHYpICsgZHJpZnQgLyBkdCAqIChvdmVybGFwIC0gc2xvcCkpIC8gKG0gKiBkdCArIGdhbW1hKSA6IC0oKDEgKyByZXN0aXR1dGlvbikgKiBuLmRvdCh2KSkgLyAobSAqIGR0ICsgZ2FtbWEpO1xuICAgICAgICBpbXB1bHNlLnNldChuLm11bHQoZHQgKiBsYW1iZGEpKTtcbiAgICAgICAgcGFydGljbGUuYXBwbHlJbXB1bHNlKGltcHVsc2UpO1xuICAgICAgICBwYXJ0aWNsZS5zZXRQb3NpdGlvbihwLmFkZChuLm11bHQoLW92ZXJsYXApKSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZXZlbnRPdXRwdXQpXG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3Bvc3RDb2xsaXNpb24nLCBkYXRhKTtcbn1cbmZ1bmN0aW9uIF9vbkV4aXQocGFydGljbGUsIG92ZXJsYXAsIGR0KSB7XG4gICAgdmFyIGFjdGlvbiA9IHRoaXMub3B0aW9ucy5vbkNvbnRhY3Q7XG4gICAgdmFyIHAgPSBwYXJ0aWNsZS5wb3NpdGlvbjtcbiAgICB2YXIgbiA9IHRoaXMub3B0aW9ucy5ub3JtYWw7XG4gICAgaWYgKGFjdGlvbiA9PT0gV2FsbC5PTl9DT05UQUNULlJFRkxFQ1QpIHtcbiAgICAgICAgcGFydGljbGUuc2V0UG9zaXRpb24ocC5hZGQobi5tdWx0KC1vdmVybGFwKSkpO1xuICAgIH1cbn1cbldhbGwucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludCA9IGZ1bmN0aW9uIGFwcGx5Q29uc3RyYWludCh0YXJnZXRzLCBzb3VyY2UsIGR0KSB7XG4gICAgdmFyIG4gPSB0aGlzLm9wdGlvbnMubm9ybWFsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcGFydGljbGUgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgcCA9IHBhcnRpY2xlLnBvc2l0aW9uO1xuICAgICAgICB2YXIgdiA9IHBhcnRpY2xlLnZlbG9jaXR5O1xuICAgICAgICB2YXIgciA9IHBhcnRpY2xlLnJhZGl1cyB8fCAwO1xuICAgICAgICB2YXIgb3ZlcmxhcCA9IF9nZXREaXN0YW5jZUZyb21PcmlnaW4uY2FsbCh0aGlzLCBwLmFkZChuLm11bHQoLXIpKSk7XG4gICAgICAgIHZhciBudiA9IF9nZXROb3JtYWxWZWxvY2l0eS5jYWxsKHRoaXMsIG4sIHYpO1xuICAgICAgICBpZiAob3ZlcmxhcCA8PSAwKSB7XG4gICAgICAgICAgICBpZiAobnYgPCAwKVxuICAgICAgICAgICAgICAgIF9vbkVudGVyLmNhbGwodGhpcywgcGFydGljbGUsIG92ZXJsYXAsIGR0KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBfb25FeGl0LmNhbGwodGhpcywgcGFydGljbGUsIG92ZXJsYXAsIGR0KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFdhbGw7IiwidmFyIENvbnN0cmFpbnQgPSByZXF1aXJlKCcuL0NvbnN0cmFpbnQnKTtcbnZhciBXYWxsID0gcmVxdWlyZSgnLi9XYWxsJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBXYWxscyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShXYWxscy5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgX2NyZWF0ZUNvbXBvbmVudHMuY2FsbCh0aGlzLCBvcHRpb25zLnNpZGVzIHx8IHRoaXMub3B0aW9ucy5zaWRlcyk7XG4gICAgQ29uc3RyYWludC5jYWxsKHRoaXMpO1xufVxuV2FsbHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb25zdHJhaW50LnByb3RvdHlwZSk7XG5XYWxscy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBXYWxscztcbldhbGxzLk9OX0NPTlRBQ1QgPSBXYWxsLk9OX0NPTlRBQ1Q7XG5XYWxscy5TSURFUyA9IHtcbiAgICBMRUZUOiAwLFxuICAgIFJJR0hUOiAxLFxuICAgIFRPUDogMixcbiAgICBCT1RUT006IDMsXG4gICAgRlJPTlQ6IDQsXG4gICAgQkFDSzogNSxcbiAgICBUV09fRElNRU5TSU9OQUw6IFtcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMixcbiAgICAgICAgM1xuICAgIF0sXG4gICAgVEhSRUVfRElNRU5TSU9OQUw6IFtcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMixcbiAgICAgICAgMyxcbiAgICAgICAgNCxcbiAgICAgICAgNVxuICAgIF1cbn07XG5XYWxscy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgc2lkZXM6IFdhbGxzLlNJREVTLlRXT19ESU1FTlNJT05BTCxcbiAgICBzaXplOiBbXG4gICAgICAgIHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICAgIDBcbiAgICBdLFxuICAgIG9yaWdpbjogW1xuICAgICAgICAwLjUsXG4gICAgICAgIDAuNSxcbiAgICAgICAgMC41XG4gICAgXSxcbiAgICBkcmlmdDogMC41LFxuICAgIHNsb3A6IDAsXG4gICAgcmVzdGl0dXRpb246IDAuNSxcbiAgICBvbkNvbnRhY3Q6IFdhbGxzLk9OX0NPTlRBQ1QuUkVGTEVDVFxufTtcbnZhciBfU0lERV9OT1JNQUxTID0ge1xuICAgICAgICAwOiBuZXcgVmVjdG9yKDEsIDAsIDApLFxuICAgICAgICAxOiBuZXcgVmVjdG9yKC0xLCAwLCAwKSxcbiAgICAgICAgMjogbmV3IFZlY3RvcigwLCAxLCAwKSxcbiAgICAgICAgMzogbmV3IFZlY3RvcigwLCAtMSwgMCksXG4gICAgICAgIDQ6IG5ldyBWZWN0b3IoMCwgMCwgMSksXG4gICAgICAgIDU6IG5ldyBWZWN0b3IoMCwgMCwgLTEpXG4gICAgfTtcbmZ1bmN0aW9uIF9nZXREaXN0YW5jZShzaWRlLCBzaXplLCBvcmlnaW4pIHtcbiAgICB2YXIgZGlzdGFuY2U7XG4gICAgdmFyIFNJREVTID0gV2FsbHMuU0lERVM7XG4gICAgc3dpdGNoIChwYXJzZUludChzaWRlKSkge1xuICAgIGNhc2UgU0lERVMuTEVGVDpcbiAgICAgICAgZGlzdGFuY2UgPSBzaXplWzBdICogb3JpZ2luWzBdO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFNJREVTLlRPUDpcbiAgICAgICAgZGlzdGFuY2UgPSBzaXplWzFdICogb3JpZ2luWzFdO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFNJREVTLkZST05UOlxuICAgICAgICBkaXN0YW5jZSA9IHNpemVbMl0gKiBvcmlnaW5bMl07XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgU0lERVMuUklHSFQ6XG4gICAgICAgIGRpc3RhbmNlID0gc2l6ZVswXSAqICgxIC0gb3JpZ2luWzBdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBTSURFUy5CT1RUT006XG4gICAgICAgIGRpc3RhbmNlID0gc2l6ZVsxXSAqICgxIC0gb3JpZ2luWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBTSURFUy5CQUNLOlxuICAgICAgICBkaXN0YW5jZSA9IHNpemVbMl0gKiAoMSAtIG9yaWdpblsyXSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gZGlzdGFuY2U7XG59XG5XYWxscy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHZhciByZXNpemVGbGFnID0gZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMucmVzdGl0dXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgX3NldE9wdGlvbnNGb3JFYWNoLmNhbGwodGhpcywgeyByZXN0aXR1dGlvbjogb3B0aW9ucy5yZXN0aXR1dGlvbiB9KTtcbiAgICBpZiAob3B0aW9ucy5kcmlmdCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBfc2V0T3B0aW9uc0ZvckVhY2guY2FsbCh0aGlzLCB7IGRyaWZ0OiBvcHRpb25zLmRyaWZ0IH0pO1xuICAgIGlmIChvcHRpb25zLnNsb3AgIT09IHVuZGVmaW5lZClcbiAgICAgICAgX3NldE9wdGlvbnNGb3JFYWNoLmNhbGwodGhpcywgeyBzbG9wOiBvcHRpb25zLnNsb3AgfSk7XG4gICAgaWYgKG9wdGlvbnMub25Db250YWN0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIF9zZXRPcHRpb25zRm9yRWFjaC5jYWxsKHRoaXMsIHsgb25Db250YWN0OiBvcHRpb25zLm9uQ29udGFjdCB9KTtcbiAgICBpZiAob3B0aW9ucy5zaXplICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJlc2l6ZUZsYWcgPSB0cnVlO1xuICAgIGlmIChvcHRpb25zLnNpZGVzICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5zaWRlcyA9IG9wdGlvbnMuc2lkZXM7XG4gICAgaWYgKG9wdGlvbnMub3JpZ2luICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJlc2l6ZUZsYWcgPSB0cnVlO1xuICAgIGlmIChyZXNpemVGbGFnKVxuICAgICAgICB0aGlzLnNldFNpemUob3B0aW9ucy5zaXplLCBvcHRpb25zLm9yaWdpbik7XG59O1xuZnVuY3Rpb24gX2NyZWF0ZUNvbXBvbmVudHMoc2lkZXMpIHtcbiAgICB0aGlzLmNvbXBvbmVudHMgPSB7fTtcbiAgICB2YXIgY29tcG9uZW50cyA9IHRoaXMuY29tcG9uZW50cztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzaWRlID0gc2lkZXNbaV07XG4gICAgICAgIGNvbXBvbmVudHNbaV0gPSBuZXcgV2FsbCh7XG4gICAgICAgICAgICBub3JtYWw6IF9TSURFX05PUk1BTFNbc2lkZV0uY2xvbmUoKSxcbiAgICAgICAgICAgIGRpc3RhbmNlOiBfZ2V0RGlzdGFuY2Uoc2lkZSwgdGhpcy5vcHRpb25zLnNpemUsIHRoaXMub3B0aW9ucy5vcmlnaW4pXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbldhbGxzLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplLCBvcmlnaW4pIHtcbiAgICBvcmlnaW4gPSBvcmlnaW4gfHwgdGhpcy5vcHRpb25zLm9yaWdpbjtcbiAgICBpZiAob3JpZ2luLmxlbmd0aCA8IDMpXG4gICAgICAgIG9yaWdpblsyXSA9IDAuNTtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHdhbGwsIHNpZGUpIHtcbiAgICAgICAgdmFyIGQgPSBfZ2V0RGlzdGFuY2Uoc2lkZSwgc2l6ZSwgb3JpZ2luKTtcbiAgICAgICAgd2FsbC5zZXRPcHRpb25zKHsgZGlzdGFuY2U6IGQgfSk7XG4gICAgfSk7XG4gICAgdGhpcy5vcHRpb25zLnNpemUgPSBzaXplO1xuICAgIHRoaXMub3B0aW9ucy5vcmlnaW4gPSBvcmlnaW47XG59O1xuZnVuY3Rpb24gX3NldE9wdGlvbnNGb3JFYWNoKG9wdGlvbnMpIHtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHdhbGwpIHtcbiAgICAgICAgd2FsbC5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIH0pO1xuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKVxuICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbn1cbldhbGxzLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQodGFyZ2V0cywgc291cmNlLCBkdCkge1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAod2FsbCkge1xuICAgICAgICB3YWxsLmFwcGx5Q29uc3RyYWludCh0YXJnZXRzLCBzb3VyY2UsIGR0KTtcbiAgICB9KTtcbn07XG5XYWxscy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgICB2YXIgc2lkZXMgPSB0aGlzLm9wdGlvbnMuc2lkZXM7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuc2lkZXMpXG4gICAgICAgIGZuKHNpZGVzW2tleV0sIGtleSk7XG59O1xuV2FsbHMucHJvdG90eXBlLnJvdGF0ZVogPSBmdW5jdGlvbiByb3RhdGVaKGFuZ2xlKSB7XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uICh3YWxsKSB7XG4gICAgICAgIHZhciBuID0gd2FsbC5vcHRpb25zLm5vcm1hbDtcbiAgICAgICAgbi5yb3RhdGVaKGFuZ2xlKS5wdXQobik7XG4gICAgfSk7XG59O1xuV2FsbHMucHJvdG90eXBlLnJvdGF0ZVggPSBmdW5jdGlvbiByb3RhdGVYKGFuZ2xlKSB7XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uICh3YWxsKSB7XG4gICAgICAgIHZhciBuID0gd2FsbC5vcHRpb25zLm5vcm1hbDtcbiAgICAgICAgbi5yb3RhdGVYKGFuZ2xlKS5wdXQobik7XG4gICAgfSk7XG59O1xuV2FsbHMucHJvdG90eXBlLnJvdGF0ZVkgPSBmdW5jdGlvbiByb3RhdGVZKGFuZ2xlKSB7XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uICh3YWxsKSB7XG4gICAgICAgIHZhciBuID0gd2FsbC5vcHRpb25zLm5vcm1hbDtcbiAgICAgICAgbi5yb3RhdGVZKGFuZ2xlKS5wdXQobik7XG4gICAgfSk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBXYWxsczsiLCJ2YXIgRm9yY2UgPSByZXF1aXJlKCcuL0ZvcmNlJyk7XG5mdW5jdGlvbiBEcmFnKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIEZvcmNlLmNhbGwodGhpcyk7XG59XG5EcmFnLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9yY2UucHJvdG90eXBlKTtcbkRyYWcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRHJhZztcbkRyYWcuRk9SQ0VfRlVOQ1RJT05TID0ge1xuICAgIExJTkVBUjogZnVuY3Rpb24gKHZlbG9jaXR5KSB7XG4gICAgICAgIHJldHVybiB2ZWxvY2l0eTtcbiAgICB9LFxuICAgIFFVQURSQVRJQzogZnVuY3Rpb24gKHZlbG9jaXR5KSB7XG4gICAgICAgIHJldHVybiB2ZWxvY2l0eS5tdWx0KHZlbG9jaXR5Lm5vcm0oKSk7XG4gICAgfVxufTtcbkRyYWcuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHN0cmVuZ3RoOiAwLjAxLFxuICAgIGZvcmNlRnVuY3Rpb246IERyYWcuRk9SQ0VfRlVOQ1RJT05TLkxJTkVBUlxufTtcbkRyYWcucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMpIHtcbiAgICB2YXIgc3RyZW5ndGggPSB0aGlzLm9wdGlvbnMuc3RyZW5ndGg7XG4gICAgdmFyIGZvcmNlRnVuY3Rpb24gPSB0aGlzLm9wdGlvbnMuZm9yY2VGdW5jdGlvbjtcbiAgICB2YXIgZm9yY2UgPSB0aGlzLmZvcmNlO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0YXJnZXRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgcGFydGljbGUgPSB0YXJnZXRzW2luZGV4XTtcbiAgICAgICAgZm9yY2VGdW5jdGlvbihwYXJ0aWNsZS52ZWxvY2l0eSkubXVsdCgtc3RyZW5ndGgpLnB1dChmb3JjZSk7XG4gICAgICAgIHBhcnRpY2xlLmFwcGx5Rm9yY2UoZm9yY2UpO1xuICAgIH1cbn07XG5EcmFnLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpXG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xufTtcbm1vZHVsZS5leHBvcnRzID0gRHJhZzsiLCJ2YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBGb3JjZShmb3JjZSkge1xuICAgIHRoaXMuZm9yY2UgPSBuZXcgVmVjdG9yKGZvcmNlKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5Gb3JjZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2NoYW5nZScsIG9wdGlvbnMpO1xufTtcbkZvcmNlLnByb3RvdHlwZS5hcHBseUZvcmNlID0gZnVuY3Rpb24gYXBwbHlGb3JjZShib2R5KSB7XG4gICAgYm9keS5hcHBseUZvcmNlKHRoaXMuZm9yY2UpO1xufTtcbkZvcmNlLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIDA7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBGb3JjZTsiLCJ2YXIgRm9yY2UgPSByZXF1aXJlKCcuL0ZvcmNlJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBSZXB1bHNpb24ob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoUmVwdWxzaW9uLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmRpc3AgPSBuZXcgVmVjdG9yKCk7XG4gICAgRm9yY2UuY2FsbCh0aGlzKTtcbn1cblJlcHVsc2lvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvcmNlLnByb3RvdHlwZSk7XG5SZXB1bHNpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVwdWxzaW9uO1xuUmVwdWxzaW9uLkRFQ0FZX0ZVTkNUSU9OUyA9IHtcbiAgICBMSU5FQVI6IGZ1bmN0aW9uIChyLCBjdXRvZmYpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDEgLSAxIC8gY3V0b2ZmICogciwgMCk7XG4gICAgfSxcbiAgICBNT1JTRTogZnVuY3Rpb24gKHIsIGN1dG9mZikge1xuICAgICAgICB2YXIgcjAgPSBjdXRvZmYgPT09IDAgPyAxMDAgOiBjdXRvZmY7XG4gICAgICAgIHZhciByU2hpZnRlZCA9IHIgKyByMCAqICgxIC0gTWF0aC5sb2coMikpO1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMSAtIE1hdGgucG93KDEgLSBNYXRoLmV4cChyU2hpZnRlZCAvIHIwIC0gMSksIDIpLCAwKTtcbiAgICB9LFxuICAgIElOVkVSU0U6IGZ1bmN0aW9uIChyLCBjdXRvZmYpIHtcbiAgICAgICAgcmV0dXJuIDEgLyAoMSAtIGN1dG9mZiArIHIpO1xuICAgIH0sXG4gICAgR1JBVklUWTogZnVuY3Rpb24gKHIsIGN1dG9mZikge1xuICAgICAgICByZXR1cm4gMSAvICgxIC0gY3V0b2ZmICsgciAqIHIpO1xuICAgIH1cbn07XG5SZXB1bHNpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHN0cmVuZ3RoOiAxLFxuICAgIGFuY2hvcjogdW5kZWZpbmVkLFxuICAgIHJhbmdlOiBbXG4gICAgICAgIDAsXG4gICAgICAgIEluZmluaXR5XG4gICAgXSxcbiAgICBjdXRvZmY6IDAsXG4gICAgY2FwOiBJbmZpbml0eSxcbiAgICBkZWNheUZ1bmN0aW9uOiBSZXB1bHNpb24uREVDQVlfRlVOQ1RJT05TLkdSQVZJVFlcbn07XG5SZXB1bHNpb24ucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5hbmNob3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IucG9zaXRpb24gaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3IucG9zaXRpb247XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG5ldyBWZWN0b3Iob3B0aW9ucy5hbmNob3IpO1xuICAgICAgICBkZWxldGUgb3B0aW9ucy5hbmNob3I7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKVxuICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbn07XG5SZXB1bHNpb24ucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBmb3JjZSA9IHRoaXMuZm9yY2U7XG4gICAgdmFyIGRpc3AgPSB0aGlzLmRpc3A7XG4gICAgdmFyIHN0cmVuZ3RoID0gb3B0aW9ucy5zdHJlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gb3B0aW9ucy5hbmNob3IgfHwgc291cmNlLnBvc2l0aW9uO1xuICAgIHZhciBjYXAgPSBvcHRpb25zLmNhcDtcbiAgICB2YXIgY3V0b2ZmID0gb3B0aW9ucy5jdXRvZmY7XG4gICAgdmFyIHJNaW4gPSBvcHRpb25zLnJhbmdlWzBdO1xuICAgIHZhciByTWF4ID0gb3B0aW9ucy5yYW5nZVsxXTtcbiAgICB2YXIgZGVjYXlGbiA9IG9wdGlvbnMuZGVjYXlGdW5jdGlvbjtcbiAgICBpZiAoc3RyZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmb3IgKHZhciBpbmRleCBpbiB0YXJnZXRzKSB7XG4gICAgICAgIHZhciBwYXJ0aWNsZSA9IHRhcmdldHNbaW5kZXhdO1xuICAgICAgICBpZiAocGFydGljbGUgPT09IHNvdXJjZSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB2YXIgbTEgPSBwYXJ0aWNsZS5tYXNzO1xuICAgICAgICB2YXIgcDEgPSBwYXJ0aWNsZS5wb3NpdGlvbjtcbiAgICAgICAgZGlzcC5zZXQocDEuc3ViKGFuY2hvcikpO1xuICAgICAgICB2YXIgciA9IGRpc3Aubm9ybSgpO1xuICAgICAgICBpZiAociA8IHJNYXggJiYgciA+IHJNaW4pIHtcbiAgICAgICAgICAgIGZvcmNlLnNldChkaXNwLm5vcm1hbGl6ZShzdHJlbmd0aCAqIG0xICogZGVjYXlGbihyLCBjdXRvZmYpKS5jYXAoY2FwKSk7XG4gICAgICAgICAgICBwYXJ0aWNsZS5hcHBseUZvcmNlKGZvcmNlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFJlcHVsc2lvbjsiLCJ2YXIgRHJhZyA9IHJlcXVpcmUoJy4vRHJhZycpO1xuZnVuY3Rpb24gUm90YXRpb25hbERyYWcob3B0aW9ucykge1xuICAgIERyYWcuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblJvdGF0aW9uYWxEcmFnLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRHJhZy5wcm90b3R5cGUpO1xuUm90YXRpb25hbERyYWcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUm90YXRpb25hbERyYWc7XG5Sb3RhdGlvbmFsRHJhZy5ERUZBVUxUX09QVElPTlMgPSBEcmFnLkRFRkFVTFRfT1BUSU9OUztcblJvdGF0aW9uYWxEcmFnLkZPUkNFX0ZVTkNUSU9OUyA9IERyYWcuRk9SQ0VfRlVOQ1RJT05TO1xuUm90YXRpb25hbERyYWcuRk9SQ0VfRlVOQ1RJT05TID0ge1xuICAgIExJTkVBUjogZnVuY3Rpb24gKGFuZ3VsYXJWZWxvY2l0eSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclZlbG9jaXR5O1xuICAgIH0sXG4gICAgUVVBRFJBVElDOiBmdW5jdGlvbiAoYW5ndWxhclZlbG9jaXR5KSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVmVsb2NpdHkubXVsdChhbmd1bGFyVmVsb2NpdHkubm9ybSgpKTtcbiAgICB9XG59O1xuUm90YXRpb25hbERyYWcucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMpIHtcbiAgICB2YXIgc3RyZW5ndGggPSB0aGlzLm9wdGlvbnMuc3RyZW5ndGg7XG4gICAgdmFyIGZvcmNlRnVuY3Rpb24gPSB0aGlzLm9wdGlvbnMuZm9yY2VGdW5jdGlvbjtcbiAgICB2YXIgZm9yY2UgPSB0aGlzLmZvcmNlO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0YXJnZXRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgcGFydGljbGUgPSB0YXJnZXRzW2luZGV4XTtcbiAgICAgICAgZm9yY2VGdW5jdGlvbihwYXJ0aWNsZS5hbmd1bGFyVmVsb2NpdHkpLm11bHQoLTEwMCAqIHN0cmVuZ3RoKS5wdXQoZm9yY2UpO1xuICAgICAgICBwYXJ0aWNsZS5hcHBseVRvcnF1ZShmb3JjZSk7XG4gICAgfVxufTtcblJvdGF0aW9uYWxEcmFnLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpXG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xufTtcbm1vZHVsZS5leHBvcnRzID0gUm90YXRpb25hbERyYWc7IiwidmFyIEZvcmNlID0gcmVxdWlyZSgnLi9Gb3JjZScpO1xudmFyIFNwcmluZyA9IHJlcXVpcmUoJy4vU3ByaW5nJyk7XG52YXIgUXVhdGVybmlvbiA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1F1YXRlcm5pb24nKTtcbmZ1bmN0aW9uIFJvdGF0aW9uYWxTcHJpbmcob3B0aW9ucykge1xuICAgIFNwcmluZy5jYWxsKHRoaXMsIG9wdGlvbnMpO1xufVxuUm90YXRpb25hbFNwcmluZy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFNwcmluZy5wcm90b3R5cGUpO1xuUm90YXRpb25hbFNwcmluZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSb3RhdGlvbmFsU3ByaW5nO1xuUm90YXRpb25hbFNwcmluZy5ERUZBVUxUX09QVElPTlMgPSBTcHJpbmcuREVGQVVMVF9PUFRJT05TO1xuUm90YXRpb25hbFNwcmluZy5GT1JDRV9GVU5DVElPTlMgPSBTcHJpbmcuRk9SQ0VfRlVOQ1RJT05TO1xudmFyIHBpID0gTWF0aC5QSTtcbmZ1bmN0aW9uIF9jYWxjU3RpZmZuZXNzKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIG9wdGlvbnMuc3RpZmZuZXNzID0gTWF0aC5wb3coMiAqIHBpIC8gb3B0aW9ucy5wZXJpb2QsIDIpO1xufVxuZnVuY3Rpb24gX2NhbGNEYW1waW5nKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIG9wdGlvbnMuZGFtcGluZyA9IDQgKiBwaSAqIG9wdGlvbnMuZGFtcGluZ1JhdGlvIC8gb3B0aW9ucy5wZXJpb2Q7XG59XG5mdW5jdGlvbiBfaW5pdCgpIHtcbiAgICBfY2FsY1N0aWZmbmVzcy5jYWxsKHRoaXMpO1xuICAgIF9jYWxjRGFtcGluZy5jYWxsKHRoaXMpO1xufVxuUm90YXRpb25hbFNwcmluZy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmFuY2hvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIFF1YXRlcm5pb24pXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3I7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG5ldyBRdWF0ZXJuaW9uKG9wdGlvbnMuYW5jaG9yKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucGVyaW9kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kYW1waW5nUmF0aW8gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChvcHRpb25zLmxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgaWYgKG9wdGlvbnMuZm9yY2VGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yY2VGdW5jdGlvbiA9IG9wdGlvbnMuZm9yY2VGdW5jdGlvbjtcbiAgICBpZiAob3B0aW9ucy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLm1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIF9pbml0LmNhbGwodGhpcyk7XG4gICAgRm9yY2UucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn07XG5Sb3RhdGlvbmFsU3ByaW5nLnByb3RvdHlwZS5hcHBseUZvcmNlID0gZnVuY3Rpb24gYXBwbHlGb3JjZSh0YXJnZXRzKSB7XG4gICAgdmFyIGZvcmNlID0gdGhpcy5mb3JjZTtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgZGlzcCA9IHRoaXMuZGlzcDtcbiAgICB2YXIgc3RpZmZuZXNzID0gb3B0aW9ucy5zdGlmZm5lc3M7XG4gICAgdmFyIGRhbXBpbmcgPSBvcHRpb25zLmRhbXBpbmc7XG4gICAgdmFyIHJlc3RMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gb3B0aW9ucy5hbmNob3I7XG4gICAgdmFyIGZvcmNlRnVuY3Rpb24gPSBvcHRpb25zLmZvcmNlRnVuY3Rpb247XG4gICAgdmFyIG1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgZGlzcC5zZXQoYW5jaG9yLnN1Yih0YXJnZXQub3JpZW50YXRpb24pKTtcbiAgICAgICAgdmFyIGRpc3QgPSBkaXNwLm5vcm0oKSAtIHJlc3RMZW5ndGg7XG4gICAgICAgIGlmIChkaXN0ID09PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgbSA9IHRhcmdldC5tYXNzO1xuICAgICAgICBzdGlmZm5lc3MgKj0gbTtcbiAgICAgICAgZGFtcGluZyAqPSBtO1xuICAgICAgICBmb3JjZS5zZXQoZGlzcC5ub3JtYWxpemUoc3RpZmZuZXNzICogZm9yY2VGdW5jdGlvbihkaXN0LCBtYXhMZW5ndGgpKSk7XG4gICAgICAgIGlmIChkYW1waW5nKVxuICAgICAgICAgICAgZm9yY2UuYWRkKHRhcmdldC5hbmd1bGFyVmVsb2NpdHkubXVsdCgtZGFtcGluZykpLnB1dChmb3JjZSk7XG4gICAgICAgIHRhcmdldC5hcHBseVRvcnF1ZShmb3JjZSk7XG4gICAgfVxufTtcblJvdGF0aW9uYWxTcHJpbmcucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSh0YXJnZXRzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHJlc3RMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gb3B0aW9ucy5hbmNob3I7XG4gICAgdmFyIHN0cmVuZ3RoID0gb3B0aW9ucy5zdGlmZm5lc3M7XG4gICAgdmFyIGVuZXJneSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgZGlzdCA9IGFuY2hvci5zdWIodGFyZ2V0Lm9yaWVudGF0aW9uKS5ub3JtKCkgLSByZXN0TGVuZ3RoO1xuICAgICAgICBlbmVyZ3kgKz0gMC41ICogc3RyZW5ndGggKiBkaXN0ICogZGlzdDtcbiAgICB9XG4gICAgcmV0dXJuIGVuZXJneTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFJvdGF0aW9uYWxTcHJpbmc7IiwidmFyIEZvcmNlID0gcmVxdWlyZSgnLi9Gb3JjZScpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU3ByaW5nKG9wdGlvbnMpIHtcbiAgICBGb3JjZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5kaXNwID0gbmV3IFZlY3RvcigwLCAwLCAwKTtcbiAgICBfaW5pdC5jYWxsKHRoaXMpO1xufVxuU3ByaW5nLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9yY2UucHJvdG90eXBlKTtcblNwcmluZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTcHJpbmc7XG52YXIgcGkgPSBNYXRoLlBJO1xudmFyIE1JTl9QRVJJT0QgPSAxNTA7XG5TcHJpbmcuRk9SQ0VfRlVOQ1RJT05TID0ge1xuICAgIEZFTkU6IGZ1bmN0aW9uIChkaXN0LCByTWF4KSB7XG4gICAgICAgIHZhciByTWF4U21hbGwgPSByTWF4ICogMC45OTtcbiAgICAgICAgdmFyIHIgPSBNYXRoLm1heChNYXRoLm1pbihkaXN0LCByTWF4U21hbGwpLCAtck1heFNtYWxsKTtcbiAgICAgICAgcmV0dXJuIHIgLyAoMSAtIHIgKiByIC8gKHJNYXggKiByTWF4KSk7XG4gICAgfSxcbiAgICBIT09LOiBmdW5jdGlvbiAoZGlzdCkge1xuICAgICAgICByZXR1cm4gZGlzdDtcbiAgICB9XG59O1xuU3ByaW5nLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDMwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuMSxcbiAgICBsZW5ndGg6IDAsXG4gICAgbWF4TGVuZ3RoOiBJbmZpbml0eSxcbiAgICBhbmNob3I6IHVuZGVmaW5lZCxcbiAgICBmb3JjZUZ1bmN0aW9uOiBTcHJpbmcuRk9SQ0VfRlVOQ1RJT05TLkhPT0tcbn07XG5mdW5jdGlvbiBfY2FsY1N0aWZmbmVzcygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLnN0aWZmbmVzcyA9IE1hdGgucG93KDIgKiBwaSAvIG9wdGlvbnMucGVyaW9kLCAyKTtcbn1cbmZ1bmN0aW9uIF9jYWxjRGFtcGluZygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLmRhbXBpbmcgPSA0ICogcGkgKiBvcHRpb25zLmRhbXBpbmdSYXRpbyAvIG9wdGlvbnMucGVyaW9kO1xufVxuZnVuY3Rpb24gX2luaXQoKSB7XG4gICAgX2NhbGNTdGlmZm5lc3MuY2FsbCh0aGlzKTtcbiAgICBfY2FsY0RhbXBpbmcuY2FsbCh0aGlzKTtcbn1cblNwcmluZy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmFuY2hvciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvci5wb3NpdGlvbiBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvci5wb3NpdGlvbjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBuZXcgVmVjdG9yKG9wdGlvbnMuYW5jaG9yKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucGVyaW9kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGVyaW9kIDwgTUlOX1BFUklPRCkge1xuICAgICAgICAgICAgb3B0aW9ucy5wZXJpb2QgPSBNSU5fUEVSSU9EO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcGVyaW9kIG9mIGEgU3ByaW5nVHJhbnNpdGlvbiBpcyBjYXBwZWQgYXQgJyArIE1JTl9QRVJJT0QgKyAnIG1zLiBVc2UgYSBTbmFwVHJhbnNpdGlvbiBmb3IgZmFzdGVyIHRyYW5zaXRpb25zJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5kYW1waW5nUmF0aW8gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmRhbXBpbmdSYXRpbyA9IG9wdGlvbnMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChvcHRpb25zLmxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgaWYgKG9wdGlvbnMuZm9yY2VGdW5jdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZm9yY2VGdW5jdGlvbiA9IG9wdGlvbnMuZm9yY2VGdW5jdGlvbjtcbiAgICBpZiAob3B0aW9ucy5tYXhMZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLm1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIF9pbml0LmNhbGwodGhpcyk7XG4gICAgRm9yY2UucHJvdG90eXBlLnNldE9wdGlvbnMuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn07XG5TcHJpbmcucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBmb3JjZSA9IHRoaXMuZm9yY2U7XG4gICAgdmFyIGRpc3AgPSB0aGlzLmRpc3A7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHN0aWZmbmVzcyA9IG9wdGlvbnMuc3RpZmZuZXNzO1xuICAgIHZhciBkYW1waW5nID0gb3B0aW9ucy5kYW1waW5nO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIG1heExlbmd0aCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIGZvcmNlRnVuY3Rpb24gPSBvcHRpb25zLmZvcmNlRnVuY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgcDIgPSB0YXJnZXQucG9zaXRpb247XG4gICAgICAgIHZhciB2MiA9IHRhcmdldC52ZWxvY2l0eTtcbiAgICAgICAgYW5jaG9yLnN1YihwMikucHV0KGRpc3ApO1xuICAgICAgICB2YXIgZGlzdCA9IGRpc3Aubm9ybSgpIC0gcmVzdExlbmd0aDtcbiAgICAgICAgaWYgKGRpc3QgPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBtID0gdGFyZ2V0Lm1hc3M7XG4gICAgICAgIHN0aWZmbmVzcyAqPSBtO1xuICAgICAgICBkYW1waW5nICo9IG07XG4gICAgICAgIGRpc3Aubm9ybWFsaXplKHN0aWZmbmVzcyAqIGZvcmNlRnVuY3Rpb24oZGlzdCwgbWF4TGVuZ3RoKSkucHV0KGZvcmNlKTtcbiAgICAgICAgaWYgKGRhbXBpbmcpXG4gICAgICAgICAgICBpZiAoc291cmNlKVxuICAgICAgICAgICAgICAgIGZvcmNlLmFkZCh2Mi5zdWIoc291cmNlLnZlbG9jaXR5KS5tdWx0KC1kYW1waW5nKSkucHV0KGZvcmNlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBmb3JjZS5hZGQodjIubXVsdCgtZGFtcGluZykpLnB1dChmb3JjZSk7XG4gICAgICAgIHRhcmdldC5hcHBseUZvcmNlKGZvcmNlKTtcbiAgICAgICAgaWYgKHNvdXJjZSlcbiAgICAgICAgICAgIHNvdXJjZS5hcHBseUZvcmNlKGZvcmNlLm11bHQoLTEpKTtcbiAgICB9XG59O1xuU3ByaW5nLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3kodGFyZ2V0cywgc291cmNlKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIHJlc3RMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gc291cmNlID8gc291cmNlLnBvc2l0aW9uIDogb3B0aW9ucy5hbmNob3I7XG4gICAgdmFyIHN0cmVuZ3RoID0gb3B0aW9ucy5zdGlmZm5lc3M7XG4gICAgdmFyIGVuZXJneSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgZGlzdCA9IGFuY2hvci5zdWIodGFyZ2V0LnBvc2l0aW9uKS5ub3JtKCkgLSByZXN0TGVuZ3RoO1xuICAgICAgICBlbmVyZ3kgKz0gMC41ICogc3RyZW5ndGggKiBkaXN0ICogZGlzdDtcbiAgICB9XG4gICAgcmV0dXJuIGVuZXJneTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNwcmluZzsiLCJ2YXIgRm9yY2UgPSByZXF1aXJlKCcuL0ZvcmNlJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBWZWN0b3JGaWVsZChvcHRpb25zKSB7XG4gICAgRm9yY2UuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFZlY3RvckZpZWxkLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmV2YWx1YXRpb24gPSBuZXcgVmVjdG9yKCk7XG59XG5WZWN0b3JGaWVsZC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvcmNlLnByb3RvdHlwZSk7XG5WZWN0b3JGaWVsZC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBWZWN0b3JGaWVsZDtcblZlY3RvckZpZWxkLkZJRUxEUyA9IHtcbiAgICBDT05TVEFOVDogZnVuY3Rpb24gKHYsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy5kaXJlY3Rpb24ucHV0KHRoaXMuZXZhbHVhdGlvbik7XG4gICAgfSxcbiAgICBMSU5FQVI6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHYucHV0KHRoaXMuZXZhbHVhdGlvbik7XG4gICAgfSxcbiAgICBSQURJQUw6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIHYubXVsdCgtMSkucHV0KHRoaXMuZXZhbHVhdGlvbik7XG4gICAgfSxcbiAgICBQT0lOVF9BVFRSQUNUT1I6IGZ1bmN0aW9uICh2LCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMucG9zaXRpb24uc3ViKHYpLnB1dCh0aGlzLmV2YWx1YXRpb24pO1xuICAgIH1cbn07XG5WZWN0b3JGaWVsZC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgc3RyZW5ndGg6IDAuMDEsXG4gICAgZmllbGQ6IFZlY3RvckZpZWxkLkZJRUxEUy5DT05TVEFOVFxufTtcblZlY3RvckZpZWxkLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuc3RyZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnN0cmVuZ3RoID0gb3B0aW9ucy5zdHJlbmd0aDtcbiAgICBpZiAob3B0aW9ucy5maWVsZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5maWVsZCA9IG9wdGlvbnMuZmllbGQ7XG4gICAgICAgIF9zZXRGaWVsZE9wdGlvbnMuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnMuZmllbGQpO1xuICAgIH1cbn07XG5mdW5jdGlvbiBfc2V0RmllbGRPcHRpb25zKGZpZWxkKSB7XG4gICAgdmFyIEZJRUxEUyA9IFZlY3RvckZpZWxkLkZJRUxEUztcbiAgICBzd2l0Y2ggKGZpZWxkKSB7XG4gICAgY2FzZSBGSUVMRFMuQ09OU1RBTlQ6XG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zLmRpcmVjdGlvbilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPSBuZXcgVmVjdG9yKDAsIDEsIDApO1xuICAgICAgICBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID0gbmV3IFZlY3Rvcih0aGlzLm9wdGlvbnMuZGlyZWN0aW9uKTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBGSUVMRFMuUE9JTlRfQVRUUkFDVE9SOlxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5wb3NpdGlvbilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoMCwgMCwgMCk7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMub3B0aW9ucy5wb3NpdGlvbiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnBvc2l0aW9uID0gbmV3IFZlY3Rvcih0aGlzLm9wdGlvbnMucG9zaXRpb24pO1xuICAgICAgICBicmVhaztcbiAgICB9XG59XG5WZWN0b3JGaWVsZC5wcm90b3R5cGUuYXBwbHlGb3JjZSA9IGZ1bmN0aW9uIGFwcGx5Rm9yY2UodGFyZ2V0cykge1xuICAgIHZhciBmb3JjZSA9IHRoaXMuZm9yY2U7XG4gICAgdmFyIHN0cmVuZ3RoID0gdGhpcy5vcHRpb25zLnN0cmVuZ3RoO1xuICAgIHZhciBmaWVsZCA9IHRoaXMub3B0aW9ucy5maWVsZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgIGZpZWxkLmNhbGwodGhpcywgdGFyZ2V0LnBvc2l0aW9uLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmV2YWx1YXRpb24ubXVsdCh0YXJnZXQubWFzcyAqIHN0cmVuZ3RoKS5wdXQoZm9yY2UpO1xuICAgICAgICB0YXJnZXQuYXBwbHlGb3JjZShmb3JjZSk7XG4gICAgfVxufTtcblZlY3RvckZpZWxkLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3kodGFyZ2V0cykge1xuICAgIHZhciBmaWVsZCA9IHRoaXMub3B0aW9ucy5maWVsZDtcbiAgICB2YXIgRklFTERTID0gVmVjdG9yRmllbGQuRklFTERTO1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIHZhciBpO1xuICAgIHZhciB0YXJnZXQ7XG4gICAgc3dpdGNoIChmaWVsZCkge1xuICAgIGNhc2UgRklFTERTLkNPTlNUQU5UOlxuICAgICAgICBlbmVyZ3kgPSB0YXJnZXRzLmxlbmd0aCAqIHRoaXMub3B0aW9ucy5kaXJlY3Rpb24ubm9ybSgpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIEZJRUxEUy5SQURJQUw6XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICAgICAgZW5lcmd5ICs9IHRhcmdldC5wb3NpdGlvbi5ub3JtKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBGSUVMRFMuUE9JTlRfQVRUUkFDVE9SOlxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0c1tpXTtcbiAgICAgICAgICAgIGVuZXJneSArPSB0YXJnZXQucG9zaXRpb24uc3ViKHRoaXMub3B0aW9ucy5wb3NpdGlvbikubm9ybSgpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBlbmVyZ3kgKj0gdGhpcy5vcHRpb25zLnN0cmVuZ3RoO1xuICAgIHJldHVybiBlbmVyZ3k7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWZWN0b3JGaWVsZDsiLCJ2YXIgU3ltcGxlY3RpY0V1bGVyID0ge307XG5TeW1wbGVjdGljRXVsZXIuaW50ZWdyYXRlVmVsb2NpdHkgPSBmdW5jdGlvbiBpbnRlZ3JhdGVWZWxvY2l0eShib2R5LCBkdCkge1xuICAgIHZhciB2ID0gYm9keS52ZWxvY2l0eTtcbiAgICB2YXIgdyA9IGJvZHkuaW52ZXJzZU1hc3M7XG4gICAgdmFyIGYgPSBib2R5LmZvcmNlO1xuICAgIGlmIChmLmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgdi5hZGQoZi5tdWx0KGR0ICogdykpLnB1dCh2KTtcbiAgICBmLmNsZWFyKCk7XG59O1xuU3ltcGxlY3RpY0V1bGVyLmludGVncmF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlUG9zaXRpb24oYm9keSwgZHQpIHtcbiAgICB2YXIgcCA9IGJvZHkucG9zaXRpb247XG4gICAgdmFyIHYgPSBib2R5LnZlbG9jaXR5O1xuICAgIHAuYWRkKHYubXVsdChkdCkpLnB1dChwKTtcbn07XG5TeW1wbGVjdGljRXVsZXIuaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtID0gZnVuY3Rpb24gaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtKGJvZHksIGR0KSB7XG4gICAgdmFyIEwgPSBib2R5LmFuZ3VsYXJNb21lbnR1bTtcbiAgICB2YXIgdCA9IGJvZHkudG9ycXVlO1xuICAgIGlmICh0LmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgTC5hZGQodC5tdWx0KGR0KSkucHV0KEwpO1xuICAgIHQuY2xlYXIoKTtcbn07XG5TeW1wbGVjdGljRXVsZXIuaW50ZWdyYXRlT3JpZW50YXRpb24gPSBmdW5jdGlvbiBpbnRlZ3JhdGVPcmllbnRhdGlvbihib2R5LCBkdCkge1xuICAgIHZhciBxID0gYm9keS5vcmllbnRhdGlvbjtcbiAgICB2YXIgdyA9IGJvZHkuYW5ndWxhclZlbG9jaXR5O1xuICAgIGlmICh3LmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgcS5hZGQocS5tdWx0aXBseSh3KS5zY2FsYXJNdWx0aXBseSgwLjUgKiBkdCkpLnB1dChxKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFN5bXBsZWN0aWNFdWxlcjsiLCJ2YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1N1cmZhY2UnKTtcbmZ1bmN0aW9uIENhbnZhc1N1cmZhY2Uob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuY2FudmFzU2l6ZSlcbiAgICAgICAgdGhpcy5fY2FudmFzU2l6ZSA9IG9wdGlvbnMuY2FudmFzU2l6ZTtcbiAgICBTdXJmYWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCF0aGlzLl9jYW52YXNTaXplKVxuICAgICAgICB0aGlzLl9jYW52YXNTaXplID0gdGhpcy5nZXRTaXplKCk7XG4gICAgdGhpcy5fYmFja0J1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGlmICh0aGlzLl9jYW52YXNTaXplKSB7XG4gICAgICAgIHRoaXMuX2JhY2tCdWZmZXIud2lkdGggPSB0aGlzLl9jYW52YXNTaXplWzBdO1xuICAgICAgICB0aGlzLl9iYWNrQnVmZmVyLmhlaWdodCA9IHRoaXMuX2NhbnZhc1NpemVbMV07XG4gICAgfVxuICAgIHRoaXMuX2NvbnRleHRJZCA9IHVuZGVmaW5lZDtcbn1cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLnByb3RvdHlwZSk7XG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENhbnZhc1N1cmZhY2U7XG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdjYW52YXMnO1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudENsYXNzID0gJ2ZhbW91cy1zdXJmYWNlJztcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KCkge1xufTtcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5fY2FudmFzU2l6ZSkge1xuICAgICAgICB0YXJnZXQud2lkdGggPSB0aGlzLl9jYW52YXNTaXplWzBdO1xuICAgICAgICB0YXJnZXQuaGVpZ2h0ID0gdGhpcy5fY2FudmFzU2l6ZVsxXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbnRleHRJZCA9PT0gJzJkJykge1xuICAgICAgICB0YXJnZXQuZ2V0Q29udGV4dCh0aGlzLl9jb250ZXh0SWQpLmRyYXdJbWFnZSh0aGlzLl9iYWNrQnVmZmVyLCAwLCAwKTtcbiAgICAgICAgdGhpcy5fYmFja0J1ZmZlci53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuX2JhY2tCdWZmZXIuaGVpZ2h0ID0gMDtcbiAgICB9XG59O1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVjYWxsID0gZnVuY3Rpb24gcmVjYWxsKHRhcmdldCkge1xuICAgIHZhciBzaXplID0gdGhpcy5nZXRTaXplKCk7XG4gICAgdGhpcy5fYmFja0J1ZmZlci53aWR0aCA9IHRhcmdldC53aWR0aDtcbiAgICB0aGlzLl9iYWNrQnVmZmVyLmhlaWdodCA9IHRhcmdldC5oZWlnaHQ7XG4gICAgaWYgKHRoaXMuX2NvbnRleHRJZCA9PT0gJzJkJykge1xuICAgICAgICB0aGlzLl9iYWNrQnVmZmVyLmdldENvbnRleHQodGhpcy5fY29udGV4dElkKS5kcmF3SW1hZ2UodGFyZ2V0LCAwLCAwKTtcbiAgICAgICAgdGFyZ2V0LndpZHRoID0gMDtcbiAgICAgICAgdGFyZ2V0LmhlaWdodCA9IDA7XG4gICAgfVxufTtcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldENvbnRleHQgPSBmdW5jdGlvbiBnZXRDb250ZXh0KGNvbnRleHRJZCkge1xuICAgIHRoaXMuX2NvbnRleHRJZCA9IGNvbnRleHRJZDtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhcmdldCA/IHRoaXMuX2N1cnJlbnRUYXJnZXQuZ2V0Q29udGV4dChjb250ZXh0SWQpIDogdGhpcy5fYmFja0J1ZmZlci5nZXRDb250ZXh0KGNvbnRleHRJZCk7XG59O1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgY2FudmFzU2l6ZSkge1xuICAgIFN1cmZhY2UucHJvdG90eXBlLnNldFNpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoY2FudmFzU2l6ZSlcbiAgICAgICAgdGhpcy5fY2FudmFzU2l6ZSA9IFtcbiAgICAgICAgICAgIGNhbnZhc1NpemVbMF0sXG4gICAgICAgICAgICBjYW52YXNTaXplWzFdXG4gICAgICAgIF07XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFRhcmdldC53aWR0aCA9IHRoaXMuX2NhbnZhc1NpemVbMF07XG4gICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQuaGVpZ2h0ID0gdGhpcy5fY2FudmFzU2l6ZVsxXTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBDYW52YXNTdXJmYWNlOyIsInZhciBTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvU3VyZmFjZScpO1xudmFyIENvbnRleHQgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9Db250ZXh0Jyk7XG5mdW5jdGlvbiBDb250YWluZXJTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICBTdXJmYWNlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZhbW91cy1ncm91cCcpO1xuICAgIHRoaXMuX2NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmYW1vdXMtY29udGFpbmVyLWdyb3VwJyk7XG4gICAgdGhpcy5fc2hvdWxkUmVjYWxjdWxhdGVTaXplID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZXh0ID0gbmV3IENvbnRleHQodGhpcy5fY29udGFpbmVyKTtcbiAgICB0aGlzLnNldENvbnRlbnQodGhpcy5fY29udGFpbmVyKTtcbn1cbkNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLnByb3RvdHlwZSk7XG5Db250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbnRhaW5lclN1cmZhY2U7XG5Db250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdkaXYnO1xuQ29udGFpbmVyU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudENsYXNzID0gJ2ZhbW91cy1zdXJmYWNlJztcbkNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmFkZC5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XG59O1xuQ29udGFpbmVyU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLl9zaXplRGlydHkpXG4gICAgICAgIHRoaXMuX3Nob3VsZFJlY2FsY3VsYXRlU2l6ZSA9IHRydWU7XG4gICAgcmV0dXJuIFN1cmZhY2UucHJvdG90eXBlLnJlbmRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbkNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSgpIHtcbiAgICB0aGlzLl9zaG91bGRSZWNhbGN1bGF0ZVNpemUgPSB0cnVlO1xuICAgIHJldHVybiBTdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5Db250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCwgdHJhbnNmb3JtLCBvcGFjaXR5LCBvcmlnaW4sIHNpemUpIHtcbiAgICB2YXIgcHJldmlvdXNTaXplID0gdGhpcy5fc2l6ZSA/IFtcbiAgICAgICAgICAgIHRoaXMuX3NpemVbMF0sXG4gICAgICAgICAgICB0aGlzLl9zaXplWzFdXG4gICAgICAgIF0gOiBudWxsO1xuICAgIHZhciByZXN1bHQgPSBTdXJmYWNlLnByb3RvdHlwZS5jb21taXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodGhpcy5fc2hvdWxkUmVjYWxjdWxhdGVTaXplIHx8IHByZXZpb3VzU2l6ZSAmJiAodGhpcy5fc2l6ZVswXSAhPT0gcHJldmlvdXNTaXplWzBdIHx8IHRoaXMuX3NpemVbMV0gIT09IHByZXZpb3VzU2l6ZVsxXSkpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldFNpemUoKTtcbiAgICAgICAgdGhpcy5fc2hvdWxkUmVjYWxjdWxhdGVTaXplID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC51cGRhdGUoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyU3VyZmFjZTsiLCJ2YXIgQ29udGFpbmVyU3VyZmFjZSA9IHJlcXVpcmUoJy4vQ29udGFpbmVyU3VyZmFjZScpO1xuZnVuY3Rpb24gRm9ybUNvbnRhaW5lclN1cmZhY2Uob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLl9tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCAnJztcbiAgICBDb250YWluZXJTdXJmYWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5Gb3JtQ29udGFpbmVyU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlKTtcbkZvcm1Db250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZvcm1Db250YWluZXJTdXJmYWNlO1xuRm9ybUNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRUeXBlID0gJ2Zvcm0nO1xuRm9ybUNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5fbWV0aG9kKVxuICAgICAgICB0YXJnZXQubWV0aG9kID0gdGhpcy5fbWV0aG9kO1xuICAgIHJldHVybiBDb250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1Db250YWluZXJTdXJmYWNlOyIsInZhciBTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvU3VyZmFjZScpO1xuZnVuY3Rpb24gSW1hZ2VTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9pbWFnZVVybCA9IHVuZGVmaW5lZDtcbiAgICBTdXJmYWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG52YXIgdXJsQ2FjaGUgPSBbXTtcbnZhciBjb3VudENhY2hlID0gW107XG52YXIgbm9kZUNhY2hlID0gW107XG52YXIgY2FjaGVFbmFibGVkID0gdHJ1ZTtcbkltYWdlU3VyZmFjZS5lbmFibGVDYWNoZSA9IGZ1bmN0aW9uIGVuYWJsZUNhY2hlKCkge1xuICAgIGNhY2hlRW5hYmxlZCA9IHRydWU7XG59O1xuSW1hZ2VTdXJmYWNlLmRpc2FibGVDYWNoZSA9IGZ1bmN0aW9uIGRpc2FibGVDYWNoZSgpIHtcbiAgICBjYWNoZUVuYWJsZWQgPSBmYWxzZTtcbn07XG5JbWFnZVN1cmZhY2UuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gICAgdXJsQ2FjaGUgPSBbXTtcbiAgICBjb3VudENhY2hlID0gW107XG4gICAgbm9kZUNhY2hlID0gW107XG59O1xuSW1hZ2VTdXJmYWNlLmdldENhY2hlID0gZnVuY3Rpb24gZ2V0Q2FjaGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXJsQ2FjaGU6IHVybENhY2hlLFxuICAgICAgICBjb3VudENhY2hlOiBjb3VudENhY2hlLFxuICAgICAgICBub2RlQ2FjaGU6IGNvdW50Q2FjaGVcbiAgICB9O1xufTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cmZhY2UucHJvdG90eXBlKTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbWFnZVN1cmZhY2U7XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRUeXBlID0gJ2ltZyc7XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRDbGFzcyA9ICdmYW1vdXMtc3VyZmFjZSc7XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KGltYWdlVXJsKSB7XG4gICAgdmFyIHVybEluZGV4ID0gdXJsQ2FjaGUuaW5kZXhPZih0aGlzLl9pbWFnZVVybCk7XG4gICAgaWYgKHVybEluZGV4ICE9PSAtMSkge1xuICAgICAgICBpZiAoY291bnRDYWNoZVt1cmxJbmRleF0gPT09IDEpIHtcbiAgICAgICAgICAgIHVybENhY2hlLnNwbGljZSh1cmxJbmRleCwgMSk7XG4gICAgICAgICAgICBjb3VudENhY2hlLnNwbGljZSh1cmxJbmRleCwgMSk7XG4gICAgICAgICAgICBub2RlQ2FjaGUuc3BsaWNlKHVybEluZGV4LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvdW50Q2FjaGVbdXJsSW5kZXhdLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXJsSW5kZXggPSB1cmxDYWNoZS5pbmRleE9mKGltYWdlVXJsKTtcbiAgICBpZiAodXJsSW5kZXggPT09IC0xKSB7XG4gICAgICAgIHVybENhY2hlLnB1c2goaW1hZ2VVcmwpO1xuICAgICAgICBjb3VudENhY2hlLnB1c2goMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRDYWNoZVt1cmxJbmRleF0rKztcbiAgICB9XG4gICAgdGhpcy5faW1hZ2VVcmwgPSBpbWFnZVVybDtcbiAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xufTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gZGVwbG95KHRhcmdldCkge1xuICAgIHZhciB1cmxJbmRleCA9IHVybENhY2hlLmluZGV4T2YodGhpcy5faW1hZ2VVcmwpO1xuICAgIGlmIChub2RlQ2FjaGVbdXJsSW5kZXhdID09PSB1bmRlZmluZWQgJiYgY2FjaGVFbmFibGVkKSB7XG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHRoaXMuX2ltYWdlVXJsIHx8ICcnO1xuICAgICAgICBub2RlQ2FjaGVbdXJsSW5kZXhdID0gaW1nO1xuICAgIH1cbiAgICB0YXJnZXQuc3JjID0gdGhpcy5faW1hZ2VVcmwgfHwgJyc7XG59O1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5yZWNhbGwgPSBmdW5jdGlvbiByZWNhbGwodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnNyYyA9ICcnO1xufTtcbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VTdXJmYWNlOyIsInZhciBTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvU3VyZmFjZScpO1xuZnVuY3Rpb24gSW5wdXRTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgdGhpcy5fdmFsdWUgPSBvcHRpb25zLnZhbHVlIHx8ICcnO1xuICAgIHRoaXMuX3R5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ3RleHQnO1xuICAgIHRoaXMuX25hbWUgPSBvcHRpb25zLm5hbWUgfHwgJyc7XG4gICAgU3VyZmFjZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMub24oJ2NsaWNrJywgdGhpcy5mb2N1cy5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gdGhpcy5fY3VycmVudFRhcmdldClcbiAgICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgIH0uYmluZCh0aGlzKSk7XG59XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLnByb3RvdHlwZSk7XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW5wdXRTdXJmYWNlO1xuSW5wdXRTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdpbnB1dCc7XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRDbGFzcyA9ICdmYW1vdXMtc3VyZmFjZSc7XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLnNldFBsYWNlaG9sZGVyID0gZnVuY3Rpb24gc2V0UGxhY2Vob2xkZXIoc3RyKSB7XG4gICAgdGhpcy5fcGxhY2Vob2xkZXIgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmZvY3VzID0gZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUYXJnZXQpXG4gICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQuZm9jdXMoKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmJsdXIgPSBmdW5jdGlvbiBibHVyKCkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50VGFyZ2V0KVxuICAgICAgICB0aGlzLl9jdXJyZW50VGFyZ2V0LmJsdXIoKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gc2V0VmFsdWUoc3RyKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLnNldFR5cGUgPSBmdW5jdGlvbiBzZXRUeXBlKHN0cikge1xuICAgIHRoaXMuX3R5cGUgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLnNldE5hbWUgPSBmdW5jdGlvbiBzZXROYW1lKHN0cikge1xuICAgIHRoaXMuX25hbWUgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmdldE5hbWUgPSBmdW5jdGlvbiBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xufTtcbklucHV0U3VyZmFjZS5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gZGVwbG95KHRhcmdldCkge1xuICAgIGlmICh0aGlzLl9wbGFjZWhvbGRlciAhPT0gJycpXG4gICAgICAgIHRhcmdldC5wbGFjZWhvbGRlciA9IHRoaXMuX3BsYWNlaG9sZGVyO1xuICAgIHRhcmdldC52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIHRhcmdldC50eXBlID0gdGhpcy5fdHlwZTtcbiAgICB0YXJnZXQubmFtZSA9IHRoaXMuX25hbWU7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFN1cmZhY2U7IiwidmFyIElucHV0U3VyZmFjZSA9IHJlcXVpcmUoJy4vSW5wdXRTdXJmYWNlJyk7XG5mdW5jdGlvbiBTdWJtaXRJbnB1dFN1cmZhY2Uob3B0aW9ucykge1xuICAgIElucHV0U3VyZmFjZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuX3R5cGUgPSAnc3VibWl0JztcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9uQ2xpY2spXG4gICAgICAgIHRoaXMuc2V0T25DbGljayhvcHRpb25zLm9uQ2xpY2spO1xufVxuU3VibWl0SW5wdXRTdXJmYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSW5wdXRTdXJmYWNlLnByb3RvdHlwZSk7XG5TdWJtaXRJbnB1dFN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3VibWl0SW5wdXRTdXJmYWNlO1xuU3VibWl0SW5wdXRTdXJmYWNlLnByb3RvdHlwZS5zZXRPbkNsaWNrID0gZnVuY3Rpb24gKG9uQ2xpY2spIHtcbiAgICB0aGlzLm9uQ2xpY2sgPSBvbkNsaWNrO1xufTtcblN1Ym1pdElucHV0U3VyZmFjZS5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gZGVwbG95KHRhcmdldCkge1xuICAgIGlmICh0aGlzLm9uY2xpY2spXG4gICAgICAgIHRhcmdldC5vbkNsaWNrID0gdGhpcy5vbkNsaWNrO1xuICAgIElucHV0U3VyZmFjZS5wcm90b3R5cGUuZGVwbG95LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTdWJtaXRJbnB1dFN1cmZhY2U7IiwidmFyIFN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9TdXJmYWNlJyk7XG5mdW5jdGlvbiBUZXh0YXJlYVN1cmZhY2Uob3B0aW9ucykge1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICB0aGlzLl92YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgJyc7XG4gICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnJztcbiAgICB0aGlzLl93cmFwID0gb3B0aW9ucy53cmFwIHx8ICcnO1xuICAgIHRoaXMuX2NvbHMgPSBvcHRpb25zLmNvbHMgfHwgJyc7XG4gICAgdGhpcy5fcm93cyA9IG9wdGlvbnMucm93cyB8fCAnJztcbiAgICBTdXJmYWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5vbignY2xpY2snLCB0aGlzLmZvY3VzLmJpbmQodGhpcykpO1xufVxuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VyZmFjZS5wcm90b3R5cGUpO1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRleHRhcmVhU3VyZmFjZTtcblRleHRhcmVhU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAndGV4dGFyZWEnO1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5zZXRQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIHNldFBsYWNlaG9sZGVyKHN0cikge1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gc3RyO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5mb2N1cyA9IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50VGFyZ2V0KVxuICAgICAgICB0aGlzLl9jdXJyZW50VGFyZ2V0LmZvY3VzKCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5ibHVyID0gZnVuY3Rpb24gYmx1cigpIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFRhcmdldClcbiAgICAgICAgdGhpcy5fY3VycmVudFRhcmdldC5ibHVyKCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uIHNldFZhbHVlKHN0cikge1xuICAgIHRoaXMuX3ZhbHVlID0gc3RyO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgIGlmICh0aGlzLl9jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5zZXROYW1lID0gZnVuY3Rpb24gc2V0TmFtZShzdHIpIHtcbiAgICB0aGlzLl9uYW1lID0gc3RyO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5nZXROYW1lID0gZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbn07XG5UZXh0YXJlYVN1cmZhY2UucHJvdG90eXBlLnNldFdyYXAgPSBmdW5jdGlvbiBzZXRXcmFwKHN0cikge1xuICAgIHRoaXMuX3dyYXAgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UZXh0YXJlYVN1cmZhY2UucHJvdG90eXBlLnNldENvbHVtbnMgPSBmdW5jdGlvbiBzZXRDb2x1bW5zKG51bSkge1xuICAgIHRoaXMuX2NvbHMgPSBudW07XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UZXh0YXJlYVN1cmZhY2UucHJvdG90eXBlLnNldFJvd3MgPSBmdW5jdGlvbiBzZXRSb3dzKG51bSkge1xuICAgIHRoaXMuX3Jvd3MgPSBudW07XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UZXh0YXJlYVN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5fcGxhY2Vob2xkZXIgIT09ICcnKVxuICAgICAgICB0YXJnZXQucGxhY2Vob2xkZXIgPSB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICBpZiAodGhpcy5fdmFsdWUgIT09ICcnKVxuICAgICAgICB0YXJnZXQudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICBpZiAodGhpcy5fbmFtZSAhPT0gJycpXG4gICAgICAgIHRhcmdldC5uYW1lID0gdGhpcy5fbmFtZTtcbiAgICBpZiAodGhpcy5fd3JhcCAhPT0gJycpXG4gICAgICAgIHRhcmdldC53cmFwID0gdGhpcy5fd3JhcDtcbiAgICBpZiAodGhpcy5fY29scyAhPT0gJycpXG4gICAgICAgIHRhcmdldC5jb2xzID0gdGhpcy5fY29scztcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gJycpXG4gICAgICAgIHRhcmdldC5yb3dzID0gdGhpcy5fcm93cztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRleHRhcmVhU3VyZmFjZTsiLCJ2YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1N1cmZhY2UnKTtcbmZ1bmN0aW9uIFZpZGVvU3VyZmFjZShvcHRpb25zKSB7XG4gICAgdGhpcy5fdmlkZW9VcmwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShWaWRlb1N1cmZhY2UuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIFN1cmZhY2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblZpZGVvU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cmZhY2UucHJvdG90eXBlKTtcblZpZGVvU3VyZmFjZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBWaWRlb1N1cmZhY2U7XG5WaWRlb1N1cmZhY2UuREVGQVVMVF9PUFRJT05TID0geyBhdXRvcGxheTogZmFsc2UgfTtcblZpZGVvU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAndmlkZW8nO1xuVmlkZW9TdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuVmlkZW9TdXJmYWNlLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuc2l6ZSlcbiAgICAgICAgdGhpcy5zZXRTaXplKG9wdGlvbnMuc2l6ZSk7XG4gICAgaWYgKG9wdGlvbnMuY2xhc3NlcylcbiAgICAgICAgdGhpcy5zZXRDbGFzc2VzKG9wdGlvbnMuY2xhc3Nlcyk7XG4gICAgaWYgKG9wdGlvbnMucHJvcGVydGllcylcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKG9wdGlvbnMucHJvcGVydGllcyk7XG4gICAgaWYgKG9wdGlvbnMuYXV0b3BsYXkpXG4gICAgICAgIHRoaXMub3B0aW9ucy5hdXRvcGxheSA9IG9wdGlvbnMuYXV0b3BsYXk7XG4gICAgaWYgKG9wdGlvbnMuc3JjKSB7XG4gICAgICAgIHRoaXMuX3ZpZGVvVXJsID0gb3B0aW9ucy5zcmM7XG4gICAgICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgfVxufTtcblZpZGVvU3VyZmFjZS5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIHNldENvbnRlbnQodmlkZW9VcmwpIHtcbiAgICB0aGlzLl92aWRlb1VybCA9IHZpZGVvVXJsO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG59O1xuVmlkZW9TdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbiBkZXBsb3kodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnNyYyA9IHRoaXMuX3ZpZGVvVXJsO1xuICAgIHRhcmdldC5hdXRvcGxheSA9IHRoaXMub3B0aW9ucy5hdXRvcGxheTtcbn07XG5WaWRlb1N1cmZhY2UucHJvdG90eXBlLnJlY2FsbCA9IGZ1bmN0aW9uIHJlY2FsbCh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc3JjID0gJyc7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWaWRlb1N1cmZhY2U7IiwiZnVuY3Rpb24gQ2FjaGVkTWFwKG1hcHBpbmdGdW5jdGlvbikge1xuICAgIHRoaXMuX21hcCA9IG1hcHBpbmdGdW5jdGlvbiB8fCBudWxsO1xuICAgIHRoaXMuX2NhY2hlZE91dHB1dCA9IG51bGw7XG4gICAgdGhpcy5fY2FjaGVkSW5wdXQgPSBOdW1iZXIuTmFOO1xufVxuQ2FjaGVkTWFwLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShtYXBwaW5nRnVuY3Rpb24pIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBuZXcgQ2FjaGVkTWFwKG1hcHBpbmdGdW5jdGlvbik7XG4gICAgcmV0dXJuIGluc3RhbmNlLmdldC5iaW5kKGluc3RhbmNlKTtcbn07XG5DYWNoZWRNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldChpbnB1dCkge1xuICAgIGlmIChpbnB1dCAhPT0gdGhpcy5fY2FjaGVkSW5wdXQpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVkSW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5fY2FjaGVkT3V0cHV0ID0gdGhpcy5fbWFwKGlucHV0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlZE91dHB1dDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IENhY2hlZE1hcDsiLCJ2YXIgRWFzaW5nID0ge1xuICAgICAgICBpblF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIG91dFF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLSh0IC09IDEpICogdCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0UXVhZDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgtLXQgKiAodCAtIDIpIC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluQ3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRDdWJpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXQgKiB0ICogdCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Q3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdDtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIG91dFF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0oLS10ICogdCAqIHQgKiB0IC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0UXVhcnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblF1aW50OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXQgKiB0ICogdCAqIHQgKiB0ICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogdCAqIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblNpbmU6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLTEgKiBNYXRoLmNvcyh0ICogKE1hdGguUEkgLyAyKSkgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBvdXRTaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc2luKHQgKiAoTWF0aC5QSSAvIDIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRTaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQpIC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluRXhwbzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHQgLSAxKSk7XG4gICAgICAgIH0sXG4gICAgICAgIG91dEV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gMSA/IDEgOiAtTWF0aC5wb3coMiwgLTEwICogdCkgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBpbk91dEV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh0ID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpO1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpbkNpcmM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLShNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRDaXJjOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgxIC0gLS10ICogdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Q2lyYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5FbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zO1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRFbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zO1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRFbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA9PT0gMilcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zICogMS41O1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIGlmICh0IDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSAqIDAuNSArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluQmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0QmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gLS10ICogdCAqICgocyArIDEpICogdCArIHMpICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRCYWNrOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSk7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5Cb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gMSAtIEVhc2luZy5vdXRCb3VuY2UoMSAtIHQpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRCb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAodCA8IDEgLyAyLjc1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIHQgKiB0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgMC43NTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIDAuOTM3NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgMC45ODQzNzU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKHQgPCAwLjUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5pbkJvdW5jZSh0ICogMikgKiAwLjU7XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5nLm91dEJvdW5jZSh0ICogMiAtIDEpICogMC41ICsgMC41O1xuICAgICAgICB9XG4gICAgfTtcbm1vZHVsZS5leHBvcnRzID0gRWFzaW5nOyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG5mdW5jdGlvbiBNdWx0aXBsZVRyYW5zaXRpb24obWV0aG9kKSB7XG4gICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gICAgdGhpcy5faW5zdGFuY2VzID0gW107XG4gICAgdGhpcy5zdGF0ZSA9IFtdO1xufVxuTXVsdGlwbGVUcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gdHJ1ZTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc3RhdGVbaV0gPSB0aGlzLl9pbnN0YW5jZXNbaV0uZ2V0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGVuZFN0YXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBfYWxsQ2FsbGJhY2sgPSBVdGlsaXR5LmFmdGVyKGVuZFN0YXRlLmxlbmd0aCwgY2FsbGJhY2spO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5kU3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZXNbaV0pXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0gPSBuZXcgdGhpcy5tZXRob2QoKTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldLnNldChlbmRTdGF0ZVtpXSwgdHJhbnNpdGlvbiwgX2FsbENhbGxiYWNrKTtcbiAgICB9XG59O1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXJ0U3RhdGUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0U3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZXNbaV0pXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0gPSBuZXcgdGhpcy5tZXRob2QoKTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldLnJlc2V0KHN0YXJ0U3RhdGVbaV0pO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlVHJhbnNpdGlvbjsiLCJ2YXIgUEUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9QaHlzaWNzRW5naW5lJyk7XG52YXIgUGFydGljbGUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUnKTtcbnZhciBTcHJpbmcgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9TbmFwJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBTbmFwVHJhbnNpdGlvbihzdGF0ZSkge1xuICAgIHN0YXRlID0gc3RhdGUgfHwgMDtcbiAgICB0aGlzLmVuZFN0YXRlID0gbmV3IFZlY3RvcihzdGF0ZSk7XG4gICAgdGhpcy5pbml0U3RhdGUgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IDE7XG4gICAgdGhpcy5fcmVzdFRvbGVyYW5jZSA9IDFlLTEwO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSB0aGlzLl9yZXN0VG9sZXJhbmNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuUEUgPSBuZXcgUEUoKTtcbiAgICB0aGlzLnBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKCk7XG4gICAgdGhpcy5zcHJpbmcgPSBuZXcgU3ByaW5nKHsgYW5jaG9yOiB0aGlzLmVuZFN0YXRlIH0pO1xuICAgIHRoaXMuUEUuYWRkQm9keSh0aGlzLnBhcnRpY2xlKTtcbiAgICB0aGlzLlBFLmF0dGFjaCh0aGlzLnNwcmluZywgdGhpcy5wYXJ0aWNsZSk7XG59XG5TbmFwVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IDM7XG5TbmFwVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcGVyaW9kOiAxMDAsXG4gICAgZGFtcGluZ1JhdGlvOiAwLjIsXG4gICAgdmVsb2NpdHk6IDBcbn07XG5mdW5jdGlvbiBfZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiB0aGlzLnBhcnRpY2xlLmdldEVuZXJneSgpICsgdGhpcy5zcHJpbmcuZ2V0RW5lcmd5KFt0aGlzLnBhcnRpY2xlXSk7XG59XG5mdW5jdGlvbiBfc2V0QWJzb2x1dGVSZXN0VG9sZXJhbmNlKCkge1xuICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZW5kU3RhdGUuc3ViKHRoaXMuaW5pdFN0YXRlKS5ub3JtU3F1YXJlZCgpO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSBkaXN0YW5jZSA9PT0gMCA/IHRoaXMuX3Jlc3RUb2xlcmFuY2UgOiB0aGlzLl9yZXN0VG9sZXJhbmNlICogZGlzdGFuY2U7XG59XG5mdW5jdGlvbiBfc2V0VGFyZ2V0KHRhcmdldCkge1xuICAgIHRoaXMuZW5kU3RhdGUuc2V0KHRhcmdldCk7XG4gICAgX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZS5jYWxsKHRoaXMpO1xufVxuZnVuY3Rpb24gX3dha2UoKSB7XG4gICAgdGhpcy5QRS53YWtlKCk7XG59XG5mdW5jdGlvbiBfc2xlZXAoKSB7XG4gICAgdGhpcy5QRS5zbGVlcCgpO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlUG9zaXRpb24ocCkge1xuICAgIHRoaXMucGFydGljbGUucG9zaXRpb24uc2V0KHApO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlVmVsb2NpdHkodikge1xuICAgIHRoaXMucGFydGljbGUudmVsb2NpdHkuc2V0KHYpO1xufVxuZnVuY3Rpb24gX2dldFBhcnRpY2xlUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnMgPT09IDAgPyB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uMUQoKSA6IHRoaXMucGFydGljbGUuZ2V0UG9zaXRpb24oKTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eTFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFZlbG9jaXR5KCk7XG59XG5mdW5jdGlvbiBfc2V0Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xufVxuZnVuY3Rpb24gX3NldHVwRGVmaW5pdGlvbihkZWZpbml0aW9uKSB7XG4gICAgdmFyIGRlZmF1bHRzID0gU25hcFRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TO1xuICAgIGlmIChkZWZpbml0aW9uLnBlcmlvZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLnBlcmlvZCA9IGRlZmF1bHRzLnBlcmlvZDtcbiAgICBpZiAoZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPSBkZWZhdWx0cy5kYW1waW5nUmF0aW87XG4gICAgaWYgKGRlZmluaXRpb24udmVsb2NpdHkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi52ZWxvY2l0eSA9IGRlZmF1bHRzLnZlbG9jaXR5O1xuICAgIHRoaXMuc3ByaW5nLnNldE9wdGlvbnMoe1xuICAgICAgICBwZXJpb2Q6IGRlZmluaXRpb24ucGVyaW9kLFxuICAgICAgICBkYW1waW5nUmF0aW86IGRlZmluaXRpb24uZGFtcGluZ1JhdGlvXG4gICAgfSk7XG4gICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBkZWZpbml0aW9uLnZlbG9jaXR5KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuUEUuaXNTbGVlcGluZygpKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNiID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoX2dldEVuZXJneS5jYWxsKHRoaXMpIDwgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSkge1xuICAgICAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHRoaXMuZW5kU3RhdGUpO1xuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdKTtcbiAgICAgICAgX3NsZWVwLmNhbGwodGhpcyk7XG4gICAgfVxufVxuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhdGUsIHZlbG9jaXR5KSB7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBzdGF0ZS5sZW5ndGggOiAwO1xuICAgIHRoaXMuaW5pdFN0YXRlLnNldChzdGF0ZSk7XG4gICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgX3NldFRhcmdldC5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICBpZiAodmVsb2NpdHkpXG4gICAgICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgdmVsb2NpdHkpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcyk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLnNldFZlbG9jaXR5ID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkodmVsb2NpdHkpIHtcbiAgICB0aGlzLmNhbGwodGhpcywgX3NldFBhcnRpY2xlVmVsb2NpdHkodmVsb2NpdHkpKTtcbn07XG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gIXRoaXMuUEUuaXNTbGVlcGluZygpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIF91cGRhdGUuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzKTtcbn07XG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHN0YXRlLCBkZWZpbml0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICB0aGlzLnJlc2V0KHN0YXRlKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kaW1lbnNpb25zID0gc3RhdGUgaW5zdGFuY2VvZiBBcnJheSA/IHN0YXRlLmxlbmd0aCA6IDA7XG4gICAgX3dha2UuY2FsbCh0aGlzKTtcbiAgICBfc2V0dXBEZWZpbml0aW9uLmNhbGwodGhpcywgZGVmaW5pdGlvbik7XG4gICAgX3NldFRhcmdldC5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCBjYWxsYmFjayk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTbmFwVHJhbnNpdGlvbjsiLCJ2YXIgUEUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9QaHlzaWNzRW5naW5lJyk7XG52YXIgUGFydGljbGUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUnKTtcbnZhciBTcHJpbmcgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9mb3JjZXMvU3ByaW5nJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBTcHJpbmdUcmFuc2l0aW9uKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCAwO1xuICAgIHRoaXMuZW5kU3RhdGUgPSBuZXcgVmVjdG9yKHN0YXRlKTtcbiAgICB0aGlzLmluaXRTdGF0ZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3Jlc3RUb2xlcmFuY2UgPSAxZS0xMDtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gdGhpcy5fcmVzdFRvbGVyYW5jZTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLlBFID0gbmV3IFBFKCk7XG4gICAgdGhpcy5zcHJpbmcgPSBuZXcgU3ByaW5nKHsgYW5jaG9yOiB0aGlzLmVuZFN0YXRlIH0pO1xuICAgIHRoaXMucGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcbiAgICB0aGlzLlBFLmFkZEJvZHkodGhpcy5wYXJ0aWNsZSk7XG4gICAgdGhpcy5QRS5hdHRhY2godGhpcy5zcHJpbmcsIHRoaXMucGFydGljbGUpO1xufVxuU3ByaW5nVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IDM7XG5TcHJpbmdUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwZXJpb2Q6IDMwMCxcbiAgICBkYW1waW5nUmF0aW86IDAuNSxcbiAgICB2ZWxvY2l0eTogMFxufTtcbmZ1bmN0aW9uIF9nZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljbGUuZ2V0RW5lcmd5KCkgKyB0aGlzLnNwcmluZy5nZXRFbmVyZ3koW3RoaXMucGFydGljbGVdKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnNldFBvc2l0aW9uKHApO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlVmVsb2NpdHkodikge1xuICAgIHRoaXMucGFydGljbGUuc2V0VmVsb2NpdHkodik7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0UG9zaXRpb24xRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbigpO1xufVxuZnVuY3Rpb24gX2dldFBhcnRpY2xlVmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnMgPT09IDAgPyB0aGlzLnBhcnRpY2xlLmdldFZlbG9jaXR5MUQoKSA6IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkoKTtcbn1cbmZ1bmN0aW9uIF9zZXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG59XG5mdW5jdGlvbiBfd2FrZSgpIHtcbiAgICB0aGlzLlBFLndha2UoKTtcbn1cbmZ1bmN0aW9uIF9zbGVlcCgpIHtcbiAgICB0aGlzLlBFLnNsZWVwKCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLlBFLmlzU2xlZXBpbmcoKSkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjYiA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKF9nZXRFbmVyZ3kuY2FsbCh0aGlzKSA8IHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UpIHtcbiAgICAgICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCB0aGlzLmVuZFN0YXRlKTtcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSk7XG4gICAgICAgIF9zbGVlcC5jYWxsKHRoaXMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9zZXR1cERlZmluaXRpb24oZGVmaW5pdGlvbikge1xuICAgIHZhciBkZWZhdWx0cyA9IFNwcmluZ1RyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TO1xuICAgIGlmIChkZWZpbml0aW9uLnBlcmlvZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLnBlcmlvZCA9IGRlZmF1bHRzLnBlcmlvZDtcbiAgICBpZiAoZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi5kYW1waW5nUmF0aW8gPSBkZWZhdWx0cy5kYW1waW5nUmF0aW87XG4gICAgaWYgKGRlZmluaXRpb24udmVsb2NpdHkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi52ZWxvY2l0eSA9IGRlZmF1bHRzLnZlbG9jaXR5O1xuICAgIGlmIChkZWZpbml0aW9uLnBlcmlvZCA8IDE1MCkge1xuICAgICAgICBkZWZpbml0aW9uLnBlcmlvZCA9IDE1MDtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgcGVyaW9kIG9mIGEgU3ByaW5nVHJhbnNpdGlvbiBpcyBjYXBwZWQgYXQgMTUwIG1zLiBVc2UgYSBTbmFwVHJhbnNpdGlvbiBmb3IgZmFzdGVyIHRyYW5zaXRpb25zJyk7XG4gICAgfVxuICAgIHRoaXMuc3ByaW5nLnNldE9wdGlvbnMoe1xuICAgICAgICBwZXJpb2Q6IGRlZmluaXRpb24ucGVyaW9kLFxuICAgICAgICBkYW1waW5nUmF0aW86IGRlZmluaXRpb24uZGFtcGluZ1JhdGlvXG4gICAgfSk7XG4gICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBkZWZpbml0aW9uLnZlbG9jaXR5KTtcbn1cbmZ1bmN0aW9uIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UoKSB7XG4gICAgdmFyIGRpc3RhbmNlID0gdGhpcy5lbmRTdGF0ZS5zdWIodGhpcy5pbml0U3RhdGUpLm5vcm1TcXVhcmVkKCk7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IGRpc3RhbmNlID09PSAwID8gdGhpcy5fcmVzdFRvbGVyYW5jZSA6IHRoaXMuX3Jlc3RUb2xlcmFuY2UgKiBkaXN0YW5jZTtcbn1cbmZ1bmN0aW9uIF9zZXRUYXJnZXQodGFyZ2V0KSB7XG4gICAgdGhpcy5lbmRTdGF0ZS5zZXQodGFyZ2V0KTtcbiAgICBfc2V0QWJzb2x1dGVSZXN0VG9sZXJhbmNlLmNhbGwodGhpcyk7XG59XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHBvcywgdmVsKSB7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHBvcyBpbnN0YW5jZW9mIEFycmF5ID8gcG9zLmxlbmd0aCA6IDA7XG4gICAgdGhpcy5pbml0U3RhdGUuc2V0KHBvcyk7XG4gICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCBwb3MpO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBwb3MpO1xuICAgIGlmICh2ZWwpXG4gICAgICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgdmVsKTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCB1bmRlZmluZWQpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLmdldFZlbG9jaXR5ID0gZnVuY3Rpb24gZ2V0VmVsb2NpdHkoKSB7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcyk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2KSB7XG4gICAgdGhpcy5jYWxsKHRoaXMsIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHYpKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5QRS5pc1NsZWVwaW5nKCk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIF91cGRhdGUuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kU3RhdGUsIGRlZmluaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kU3RhdGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBlbmRTdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gZW5kU3RhdGUubGVuZ3RoIDogMDtcbiAgICBfd2FrZS5jYWxsKHRoaXMpO1xuICAgIF9zZXR1cERlZmluaXRpb24uY2FsbCh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgZW5kU3RhdGUpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNwcmluZ1RyYW5zaXRpb247IiwidmFyIE11bHRpcGxlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vTXVsdGlwbGVUcmFuc2l0aW9uJyk7XG52YXIgVHdlZW5UcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9Ud2VlblRyYW5zaXRpb24nKTtcbmZ1bmN0aW9uIFRyYW5zaXRpb25hYmxlKHN0YXJ0KSB7XG4gICAgdGhpcy5jdXJyZW50QWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLmFjdGlvblF1ZXVlID0gW107XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlID0gW107XG4gICAgdGhpcy5zdGF0ZSA9IDA7XG4gICAgdGhpcy52ZWxvY2l0eSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG51bGw7XG4gICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG51bGw7XG4gICAgdGhpcy5zZXQoc3RhcnQpO1xufVxudmFyIHRyYW5zaXRpb25NZXRob2RzID0ge307XG5UcmFuc2l0aW9uYWJsZS5yZWdpc3Rlck1ldGhvZCA9IGZ1bmN0aW9uIHJlZ2lzdGVyTWV0aG9kKG5hbWUsIGVuZ2luZUNsYXNzKSB7XG4gICAgaWYgKCEobmFtZSBpbiB0cmFuc2l0aW9uTWV0aG9kcykpIHtcbiAgICAgICAgdHJhbnNpdGlvbk1ldGhvZHNbbmFtZV0gPSBlbmdpbmVDbGFzcztcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBmYWxzZTtcbn07XG5UcmFuc2l0aW9uYWJsZS51bnJlZ2lzdGVyTWV0aG9kID0gZnVuY3Rpb24gdW5yZWdpc3Rlck1ldGhvZChuYW1lKSB7XG4gICAgaWYgKG5hbWUgaW4gdHJhbnNpdGlvbk1ldGhvZHMpIHtcbiAgICAgICAgZGVsZXRlIHRyYW5zaXRpb25NZXRob2RzW25hbWVdO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcbmZ1bmN0aW9uIF9sb2FkTmV4dCgpIHtcbiAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBpZiAodGhpcy5hY3Rpb25RdWV1ZS5sZW5ndGggPD0gMCkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSB0aGlzLmFjdGlvblF1ZXVlLnNoaWZ0KCk7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrUXVldWUuc2hpZnQoKTtcbiAgICB2YXIgbWV0aG9kID0gbnVsbDtcbiAgICB2YXIgZW5kVmFsdWUgPSB0aGlzLmN1cnJlbnRBY3Rpb25bMF07XG4gICAgdmFyIHRyYW5zaXRpb24gPSB0aGlzLmN1cnJlbnRBY3Rpb25bMV07XG4gICAgaWYgKHRyYW5zaXRpb24gaW5zdGFuY2VvZiBPYmplY3QgJiYgdHJhbnNpdGlvbi5tZXRob2QpIHtcbiAgICAgICAgbWV0aG9kID0gdHJhbnNpdGlvbi5tZXRob2Q7XG4gICAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIG1ldGhvZCA9IHRyYW5zaXRpb25NZXRob2RzW21ldGhvZF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWV0aG9kID0gVHdlZW5UcmFuc2l0aW9uO1xuICAgIH1cbiAgICBpZiAodGhpcy5fY3VycmVudE1ldGhvZCAhPT0gbWV0aG9kKSB7XG4gICAgICAgIGlmICghKGVuZFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCBtZXRob2QuU1VQUE9SVFNfTVVMVElQTEUgPT09IHRydWUgfHwgZW5kVmFsdWUubGVuZ3RoIDw9IG1ldGhvZC5TVVBQT1JUU19NVUxUSVBMRSkge1xuICAgICAgICAgICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBuZXcgbWV0aG9kKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG5ldyBNdWx0aXBsZVRyYW5zaXRpb24obWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50TWV0aG9kID0gbWV0aG9kO1xuICAgIH1cbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZS5yZXNldCh0aGlzLnN0YXRlLCB0aGlzLnZlbG9jaXR5KTtcbiAgICBpZiAodGhpcy52ZWxvY2l0eSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0cmFuc2l0aW9uLnZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZS5zZXQoZW5kVmFsdWUsIHRyYW5zaXRpb24sIF9sb2FkTmV4dC5iaW5kKHRoaXMpKTtcbn1cblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kU3RhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kU3RhdGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIGFjdGlvbiA9IFtcbiAgICAgICAgICAgIGVuZFN0YXRlLFxuICAgICAgICAgICAgdHJhbnNpdGlvblxuICAgICAgICBdO1xuICAgIHRoaXMuYWN0aW9uUXVldWUucHVzaChhY3Rpb24pO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICBpZiAoIXRoaXMuY3VycmVudEFjdGlvbilcbiAgICAgICAgX2xvYWROZXh0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRTdGF0ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBudWxsO1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbnVsbDtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnN0YXRlID0gc3RhcnRTdGF0ZTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gc3RhcnRWZWxvY2l0eTtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuYWN0aW9uUXVldWUgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBbXTtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuZGVsYXkgPSBmdW5jdGlvbiBkZWxheShkdXJhdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpLCB7XG4gICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcbiAgICAgICAgY3VydmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfSwgY2FsbGJhY2spO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQodGltZXN0YW1wKSB7XG4gICAgaWYgKHRoaXMuX2VuZ2luZUluc3RhbmNlKSB7XG4gICAgICAgIGlmICh0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXRWZWxvY2l0eSlcbiAgICAgICAgICAgIHRoaXMudmVsb2NpdHkgPSB0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXRWZWxvY2l0eSgpO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5fZW5naW5lSW5zdGFuY2UuZ2V0KHRpbWVzdGFtcCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhIXRoaXMuY3VycmVudEFjdGlvbjtcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbmFibGU7IiwidmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnLi9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCdmYW1vdXMvdXRpbGl0aWVzL1V0aWxpdHknKTtcbmZ1bmN0aW9uIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtKHRyYW5zZm9ybSkge1xuICAgIHRoaXMuX2ZpbmFsID0gVHJhbnNmb3JtLmlkZW50aXR5LnNsaWNlKCk7XG4gICAgdGhpcy5fZmluYWxUcmFuc2xhdGUgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSBbXG4gICAgICAgIDEsXG4gICAgICAgIDEsXG4gICAgICAgIDFcbiAgICBdO1xuICAgIHRoaXMudHJhbnNsYXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsVHJhbnNsYXRlKTtcbiAgICB0aGlzLnJvdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9maW5hbFJvdGF0ZSk7XG4gICAgdGhpcy5za2V3ID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsU2tldyk7XG4gICAgdGhpcy5zY2FsZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9maW5hbFNjYWxlKTtcbiAgICBpZiAodHJhbnNmb3JtKVxuICAgICAgICB0aGlzLnNldCh0cmFuc2Zvcm0pO1xufVxuZnVuY3Rpb24gX2J1aWxkKCkge1xuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoe1xuICAgICAgICB0cmFuc2xhdGU6IHRoaXMudHJhbnNsYXRlLmdldCgpLFxuICAgICAgICByb3RhdGU6IHRoaXMucm90YXRlLmdldCgpLFxuICAgICAgICBza2V3OiB0aGlzLnNrZXcuZ2V0KCksXG4gICAgICAgIHNjYWxlOiB0aGlzLnNjYWxlLmdldCgpXG4gICAgfSk7XG59XG5mdW5jdGlvbiBfYnVpbGRGaW5hbCgpIHtcbiAgICByZXR1cm4gVHJhbnNmb3JtLmJ1aWxkKHtcbiAgICAgICAgdHJhbnNsYXRlOiB0aGlzLl9maW5hbFRyYW5zbGF0ZSxcbiAgICAgICAgcm90YXRlOiB0aGlzLl9maW5hbFJvdGF0ZSxcbiAgICAgICAgc2tldzogdGhpcy5fZmluYWxTa2V3LFxuICAgICAgICBzY2FsZTogdGhpcy5fZmluYWxTY2FsZVxuICAgIH0pO1xufVxuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fZmluYWxUcmFuc2xhdGUgPSB0cmFuc2xhdGU7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMudHJhbnNsYXRlLnNldCh0cmFuc2xhdGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0U2NhbGUgPSBmdW5jdGlvbiBzZXRTY2FsZShzY2FsZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFNjYWxlID0gc2NhbGU7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuc2NhbGUuc2V0KHNjYWxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldFJvdGF0ZSA9IGZ1bmN0aW9uIHNldFJvdGF0ZShldWxlckFuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFJvdGF0ZSA9IGV1bGVyQW5nbGVzO1xuICAgIHRoaXMuX2ZpbmFsID0gX2J1aWxkRmluYWwuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXQoZXVsZXJBbmdsZXMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0U2tldyA9IGZ1bmN0aW9uIHNldFNrZXcoc2tld0FuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSBza2V3QW5nbGVzO1xuICAgIHRoaXMuX2ZpbmFsID0gX2J1aWxkRmluYWwuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnNrZXcuc2V0KHNrZXdBbmdsZXMsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgY29tcG9uZW50cyA9IFRyYW5zZm9ybS5pbnRlcnByZXQodHJhbnNmb3JtKTtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IGNvbXBvbmVudHMudHJhbnNsYXRlO1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gY29tcG9uZW50cy5yb3RhdGU7XG4gICAgdGhpcy5fZmluYWxTa2V3ID0gY29tcG9uZW50cy5za2V3O1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSBjb21wb25lbnRzLnNjYWxlO1xuICAgIHRoaXMuX2ZpbmFsID0gdHJhbnNmb3JtO1xuICAgIHZhciBfY2FsbGJhY2sgPSBjYWxsYmFjayA/IFV0aWxpdHkuYWZ0ZXIoNCwgY2FsbGJhY2spIDogbnVsbDtcbiAgICB0aGlzLnRyYW5zbGF0ZS5zZXQoY29tcG9uZW50cy50cmFuc2xhdGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5yb3RhdGUuc2V0KGNvbXBvbmVudHMucm90YXRlLCB0cmFuc2l0aW9uLCBfY2FsbGJhY2spO1xuICAgIHRoaXMuc2tldy5zZXQoY29tcG9uZW50cy5za2V3LCB0cmFuc2l0aW9uLCBfY2FsbGJhY2spO1xuICAgIHRoaXMuc2NhbGUuc2V0KGNvbXBvbmVudHMuc2NhbGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLnNldERlZmF1bHRUcmFuc2l0aW9uID0gZnVuY3Rpb24gc2V0RGVmYXVsdFRyYW5zaXRpb24odHJhbnNpdGlvbikge1xuICAgIHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHQodHJhbnNpdGlvbik7XG4gICAgdGhpcy5yb3RhdGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnNrZXcuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnNjYWxlLnNldERlZmF1bHQodHJhbnNpdGlvbik7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIHJldHVybiBfYnVpbGQuY2FsbCh0aGlzKTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbmFsO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5nZXRGaW5hbCA9IGZ1bmN0aW9uIGdldEZpbmFsKCkge1xuICAgIHJldHVybiB0aGlzLl9maW5hbDtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuaXNBY3RpdmUgPSBmdW5jdGlvbiBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaXNBY3RpdmUoKSB8fCB0aGlzLnJvdGF0ZS5pc0FjdGl2ZSgpIHx8IHRoaXMuc2NhbGUuaXNBY3RpdmUoKSB8fCB0aGlzLnNrZXcuaXNBY3RpdmUoKTtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy50cmFuc2xhdGUuaGFsdCgpO1xuICAgIHRoaXMucm90YXRlLmhhbHQoKTtcbiAgICB0aGlzLnNrZXcuaGFsdCgpO1xuICAgIHRoaXMuc2NhbGUuaGFsdCgpO1xuICAgIHRoaXMuX2ZpbmFsID0gdGhpcy5nZXQoKTtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IHRoaXMudHJhbnNsYXRlLmdldCgpO1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gdGhpcy5yb3RhdGUuZ2V0KCk7XG4gICAgdGhpcy5fZmluYWxTa2V3ID0gdGhpcy5za2V3LmdldCgpO1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSB0aGlzLnNjYWxlLmdldCgpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm07IiwiZnVuY3Rpb24gVHdlZW5UcmFuc2l0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFR3ZWVuVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IDA7XG4gICAgdGhpcy5fY3VydmUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudmVsb2NpdHkgPSB1bmRlZmluZWQ7XG59XG5Ud2VlblRyYW5zaXRpb24uQ3VydmVzID0ge1xuICAgIGxpbmVhcjogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfSxcbiAgICBlYXNlSW46IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogdDtcbiAgICB9LFxuICAgIGVhc2VPdXQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogKDIgLSB0KTtcbiAgICB9LFxuICAgIGVhc2VJbk91dDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQgPD0gMC41KVxuICAgICAgICAgICAgcmV0dXJuIDIgKiB0ICogdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIC0yICogdCAqIHQgKyA0ICogdCAtIDE7XG4gICAgfSxcbiAgICBlYXNlT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqICgzIC0gMiAqIHQpO1xuICAgIH0sXG4gICAgc3ByaW5nOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gKDEgLSB0KSAqIE1hdGguc2luKDYgKiBNYXRoLlBJICogdCkgKyB0O1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSB0cnVlO1xuVHdlZW5UcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBjdXJ2ZTogVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5saW5lYXIsXG4gICAgZHVyYXRpb246IDUwMCxcbiAgICBzcGVlZDogMFxufTtcbnZhciByZWdpc3RlcmVkQ3VydmVzID0ge307XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lLCBjdXJ2ZSkge1xuICAgIGlmICghcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSA9IGN1cnZlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi51bnJlZ2lzdGVyQ3VydmUgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lKSB7XG4gICAgaWYgKHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSkge1xuICAgICAgICBkZWxldGUgcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZSA9IGZ1bmN0aW9uIGdldEN1cnZlKGN1cnZlTmFtZSkge1xuICAgIHZhciBjdXJ2ZSA9IHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXTtcbiAgICBpZiAoY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGN1cnZlO1xuICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXJ2ZSBub3QgcmVnaXN0ZXJlZCcpO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZXMgPSBmdW5jdGlvbiBnZXRDdXJ2ZXMoKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRDdXJ2ZXM7XG59O1xuZnVuY3Rpb24gX2ludGVycG9sYXRlKGEsIGIsIHQpIHtcbiAgICByZXR1cm4gKDEgLSB0KSAqIGEgKyB0ICogYjtcbn1cbmZ1bmN0aW9uIF9jbG9uZShvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBvYmouc2xpY2UoMCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG9iaik7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplKHRyYW5zaXRpb24sIGRlZmF1bHRUcmFuc2l0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHsgY3VydmU6IGRlZmF1bHRUcmFuc2l0aW9uLmN1cnZlIH07XG4gICAgaWYgKGRlZmF1bHRUcmFuc2l0aW9uLmR1cmF0aW9uKVxuICAgICAgICByZXN1bHQuZHVyYXRpb24gPSBkZWZhdWx0VHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICBpZiAoZGVmYXVsdFRyYW5zaXRpb24uc3BlZWQpXG4gICAgICAgIHJlc3VsdC5zcGVlZCA9IGRlZmF1bHRUcmFuc2l0aW9uLnNwZWVkO1xuICAgIGlmICh0cmFuc2l0aW9uIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXN1bHQuZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5jdXJ2ZSlcbiAgICAgICAgICAgIHJlc3VsdC5jdXJ2ZSA9IHRyYW5zaXRpb24uY3VydmU7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLnNwZWVkKVxuICAgICAgICAgICAgcmVzdWx0LnNwZWVkID0gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQuY3VydmUgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXN1bHQuY3VydmUgPSBUd2VlblRyYW5zaXRpb24uZ2V0Q3VydmUocmVzdWx0LmN1cnZlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmN1cnZlID0gb3B0aW9ucy5jdXJ2ZTtcbiAgICBpZiAob3B0aW9ucy5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgIGlmIChvcHRpb25zLnNwZWVkICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5zcGVlZCA9IG9wdGlvbnMuc3BlZWQ7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kVmFsdWUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kVmFsdWUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSBfY2xvbmUodGhpcy5nZXQoKSk7XG4gICAgdHJhbnNpdGlvbiA9IF9ub3JtYWxpemUodHJhbnNpdGlvbiwgdGhpcy5vcHRpb25zKTtcbiAgICBpZiAodHJhbnNpdGlvbi5zcGVlZCkge1xuICAgICAgICB2YXIgc3RhcnRWYWx1ZSA9IHRoaXMuX3N0YXJ0VmFsdWU7XG4gICAgICAgIGlmIChzdGFydFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgdmFyaWFuY2UgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzdGFydFZhbHVlKVxuICAgICAgICAgICAgICAgIHZhcmlhbmNlICs9IChlbmRWYWx1ZVtpXSAtIHN0YXJ0VmFsdWVbaV0pICogKGVuZFZhbHVlW2ldIC0gc3RhcnRWYWx1ZVtpXSk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5zcXJ0KHZhcmlhbmNlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5hYnMoZW5kVmFsdWUgLSBzdGFydFZhbHVlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IF9jbG9uZShlbmRWYWx1ZSk7XG4gICAgdGhpcy5fc3RhcnRWZWxvY2l0eSA9IF9jbG9uZSh0cmFuc2l0aW9uLnZlbG9jaXR5KTtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IHRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgdGhpcy5fY3VydmUgPSB0cmFuc2l0aW9uLmN1cnZlO1xuICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRWYWx1ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBfY2xvbmUoc3RhcnRWYWx1ZSk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IF9jbG9uZShzdGFydFZlbG9jaXR5KTtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLl9zdGFydFZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5O1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KHRpbWVzdGFtcCkge1xuICAgIHRoaXMudXBkYXRlKHRpbWVzdGFtcCk7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuZnVuY3Rpb24gX2NhbGN1bGF0ZVZlbG9jaXR5KGN1cnJlbnQsIHN0YXJ0LCBjdXJ2ZSwgZHVyYXRpb24sIHQpIHtcbiAgICB2YXIgdmVsb2NpdHk7XG4gICAgdmFyIGVwcyA9IDFlLTc7XG4gICAgdmFyIHNwZWVkID0gKGN1cnZlKHQpIC0gY3VydmUodCAtIGVwcykpIC8gZXBzO1xuICAgIGlmIChjdXJyZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdmVsb2NpdHkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gc3BlZWQgKiAoY3VycmVudFtpXSAtIHN0YXJ0W2ldKSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZVxuICAgICAgICB2ZWxvY2l0eSA9IHNwZWVkICogKGN1cnJlbnQgLSBzdGFydCkgLyBkdXJhdGlvbjtcbiAgICByZXR1cm4gdmVsb2NpdHk7XG59XG5mdW5jdGlvbiBfY2FsY3VsYXRlU3RhdGUoc3RhcnQsIGVuZCwgdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoc3RhcnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBzdGF0ZSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0W2ldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IF9pbnRlcnBvbGF0ZShzdGFydFtpXSwgZW5kW2ldLCB0KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IHN0YXJ0W2ldO1xuICAgICAgICB9XG4gICAgfSBlbHNlXG4gICAgICAgIHN0YXRlID0gX2ludGVycG9sYXRlKHN0YXJ0LCBlbmQsIHQpO1xuICAgIHJldHVybiBzdGF0ZTtcbn1cblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKHRpbWVzdGFtcCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRpbWVzdGFtcClcbiAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBpZiAodGhpcy5fdXBkYXRlVGltZSA+PSB0aW1lc3RhbXApXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gdGltZXN0YW1wO1xuICAgIHZhciB0aW1lU2luY2VTdGFydCA9IHRpbWVzdGFtcCAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICBpZiAodGltZVNpbmNlU3RhcnQgPj0gdGhpcy5fZHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2VuZFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gX2NhbGN1bGF0ZVZlbG9jaXR5KHRoaXMuc3RhdGUsIHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2N1cnZlLCB0aGlzLl9kdXJhdGlvbiwgMSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGltZVNpbmNlU3RhcnQgPCAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9zdGFydFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5fc3RhcnRWZWxvY2l0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdCA9IHRpbWVTaW5jZVN0YXJ0IC8gdGhpcy5fZHVyYXRpb247XG4gICAgICAgIHRoaXMuc3RhdGUgPSBfY2FsY3VsYXRlU3RhdGUodGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fZW5kVmFsdWUsIHRoaXMuX2N1cnZlKHQpKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IF9jYWxjdWxhdGVWZWxvY2l0eSh0aGlzLnN0YXRlLCB0aGlzLl9zdGFydFZhbHVlLCB0aGlzLl9jdXJ2ZSwgdGhpcy5fZHVyYXRpb24sIHQpO1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMucmVzZXQodGhpcy5nZXQoKSk7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2xpbmVhcicsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMubGluZWFyKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlSW4nLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VJbik7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZU91dCcsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZU91dCk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZUluT3V0JywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlSW5PdXQpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VPdXRCb3VuY2UnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VPdXRCb3VuY2UpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ3NwcmluZycsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuc3ByaW5nKTtcblR3ZWVuVHJhbnNpdGlvbi5jdXN0b21DdXJ2ZSA9IGZ1bmN0aW9uIGN1c3RvbUN1cnZlKHYxLCB2Mikge1xuICAgIHYxID0gdjEgfHwgMDtcbiAgICB2MiA9IHYyIHx8IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB2MSAqIHQgKyAoLTIgKiB2MSAtIHYyICsgMykgKiB0ICogdCArICh2MSArIHYyIC0gMikgKiB0ICogdCAqIHQ7XG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFR3ZWVuVHJhbnNpdGlvbjsiLCJ2YXIgUEUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9QaHlzaWNzRW5naW5lJyk7XG52YXIgUGFydGljbGUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUnKTtcbnZhciBTcHJpbmcgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9mb3JjZXMvU3ByaW5nJyk7XG52YXIgV2FsbCA9IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1dhbGwnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFdhbGxUcmFuc2l0aW9uKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCAwO1xuICAgIHRoaXMuZW5kU3RhdGUgPSBuZXcgVmVjdG9yKHN0YXRlKTtcbiAgICB0aGlzLmluaXRTdGF0ZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnNwcmluZyA9IG5ldyBTcHJpbmcoeyBhbmNob3I6IHRoaXMuZW5kU3RhdGUgfSk7XG4gICAgdGhpcy53YWxsID0gbmV3IFdhbGwoKTtcbiAgICB0aGlzLl9yZXN0VG9sZXJhbmNlID0gMWUtMTA7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IDE7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IHRoaXMuX3Jlc3RUb2xlcmFuY2U7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5QRSA9IG5ldyBQRSgpO1xuICAgIHRoaXMucGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcbiAgICB0aGlzLlBFLmFkZEJvZHkodGhpcy5wYXJ0aWNsZSk7XG4gICAgdGhpcy5QRS5hdHRhY2goW1xuICAgICAgICB0aGlzLndhbGwsXG4gICAgICAgIHRoaXMuc3ByaW5nXG4gICAgXSwgdGhpcy5wYXJ0aWNsZSk7XG59XG5XYWxsVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IDM7XG5XYWxsVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcGVyaW9kOiAzMDAsXG4gICAgZGFtcGluZ1JhdGlvOiAwLjUsXG4gICAgdmVsb2NpdHk6IDAsXG4gICAgcmVzdGl0dXRpb246IDAuNVxufTtcbmZ1bmN0aW9uIF9nZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljbGUuZ2V0RW5lcmd5KCkgKyB0aGlzLnNwcmluZy5nZXRFbmVyZ3koW3RoaXMucGFydGljbGVdKTtcbn1cbmZ1bmN0aW9uIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UoKSB7XG4gICAgdmFyIGRpc3RhbmNlID0gdGhpcy5lbmRTdGF0ZS5zdWIodGhpcy5pbml0U3RhdGUpLm5vcm1TcXVhcmVkKCk7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IGRpc3RhbmNlID09PSAwID8gdGhpcy5fcmVzdFRvbGVyYW5jZSA6IHRoaXMuX3Jlc3RUb2xlcmFuY2UgKiBkaXN0YW5jZTtcbn1cbmZ1bmN0aW9uIF93YWtlKCkge1xuICAgIHRoaXMuUEUud2FrZSgpO1xufVxuZnVuY3Rpb24gX3NsZWVwKCkge1xuICAgIHRoaXMuUEUuc2xlZXAoKTtcbn1cbmZ1bmN0aW9uIF9zZXRUYXJnZXQodGFyZ2V0KSB7XG4gICAgdGhpcy5lbmRTdGF0ZS5zZXQodGFyZ2V0KTtcbiAgICB2YXIgZGlzdCA9IHRoaXMuZW5kU3RhdGUuc3ViKHRoaXMuaW5pdFN0YXRlKS5ub3JtKCk7XG4gICAgdGhpcy53YWxsLnNldE9wdGlvbnMoe1xuICAgICAgICBkaXN0YW5jZTogdGhpcy5lbmRTdGF0ZS5ub3JtKCksXG4gICAgICAgIG5vcm1hbDogZGlzdCA9PT0gMCA/IHRoaXMucGFydGljbGUudmVsb2NpdHkubm9ybWFsaXplKC0xKSA6IHRoaXMuZW5kU3RhdGUuc3ViKHRoaXMuaW5pdFN0YXRlKS5ub3JtYWxpemUoLTEpXG4gICAgfSk7XG4gICAgX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZS5jYWxsKHRoaXMpO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlUG9zaXRpb24ocCkge1xuICAgIHRoaXMucGFydGljbGUucG9zaXRpb24uc2V0KHApO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlVmVsb2NpdHkodikge1xuICAgIHRoaXMucGFydGljbGUudmVsb2NpdHkuc2V0KHYpO1xufVxuZnVuY3Rpb24gX2dldFBhcnRpY2xlUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbnMgPT09IDAgPyB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uMUQoKSA6IHRoaXMucGFydGljbGUuZ2V0UG9zaXRpb24oKTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eTFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFZlbG9jaXR5KCk7XG59XG5mdW5jdGlvbiBfc2V0Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB0aGlzLl9jYWxsYmFjayA9IGNhbGxiYWNrO1xufVxuZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5QRS5pc1NsZWVwaW5nKCkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgY2IgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2IoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBlbmVyZ3kgPSBfZ2V0RW5lcmd5LmNhbGwodGhpcyk7XG4gICAgaWYgKGVuZXJneSA8IHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UpIHtcbiAgICAgICAgX3NsZWVwLmNhbGwodGhpcyk7XG4gICAgICAgIF9zZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcywgdGhpcy5lbmRTdGF0ZSk7XG4gICAgICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9zZXR1cERlZmluaXRpb24oZGVmKSB7XG4gICAgdmFyIGRlZmF1bHRzID0gV2FsbFRyYW5zaXRpb24uREVGQVVMVF9PUFRJT05TO1xuICAgIGlmIChkZWYucGVyaW9kID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5wZXJpb2QgPSBkZWZhdWx0cy5wZXJpb2Q7XG4gICAgaWYgKGRlZi5kYW1waW5nUmF0aW8gPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmLmRhbXBpbmdSYXRpbyA9IGRlZmF1bHRzLmRhbXBpbmdSYXRpbztcbiAgICBpZiAoZGVmLnZlbG9jaXR5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi52ZWxvY2l0eSA9IGRlZmF1bHRzLnZlbG9jaXR5O1xuICAgIGlmIChkZWYucmVzdGl0dXRpb24gPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmLnJlc3RpdHV0aW9uID0gZGVmYXVsdHMucmVzdGl0dXRpb247XG4gICAgdGhpcy5zcHJpbmcuc2V0T3B0aW9ucyh7XG4gICAgICAgIHBlcmlvZDogZGVmLnBlcmlvZCxcbiAgICAgICAgZGFtcGluZ1JhdGlvOiBkZWYuZGFtcGluZ1JhdGlvXG4gICAgfSk7XG4gICAgdGhpcy53YWxsLnNldE9wdGlvbnMoeyByZXN0aXR1dGlvbjogZGVmLnJlc3RpdHV0aW9uIH0pO1xuICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgZGVmLnZlbG9jaXR5KTtcbn1cbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXRlLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBzdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gc3RhdGUubGVuZ3RoIDogMDtcbiAgICB0aGlzLmluaXRTdGF0ZS5zZXQoc3RhdGUpO1xuICAgIF9zZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcywgc3RhdGUpO1xuICAgIGlmICh2ZWxvY2l0eSlcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCB2ZWxvY2l0eSk7XG4gICAgX3NldFRhcmdldC5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCB1bmRlZmluZWQpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHZlbG9jaXR5KSB7XG4gICAgdGhpcy5jYWxsKHRoaXMsIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHZlbG9jaXR5KSk7XG59O1xuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLlBFLmlzU2xlZXBpbmcoKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcyk7XG59O1xuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChzdGF0ZSwgZGVmaW5pdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChzdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBzdGF0ZS5sZW5ndGggOiAwO1xuICAgIF93YWtlLmNhbGwodGhpcyk7XG4gICAgX3NldHVwRGVmaW5pdGlvbi5jYWxsKHRoaXMsIGRlZmluaXRpb24pO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcbm1vZHVsZS5leHBvcnRzID0gV2FsbFRyYW5zaXRpb247IiwidmFyIEtleUNvZGVzID0ge1xuICAgICAgICAwOiA0OCxcbiAgICAgICAgMTogNDksXG4gICAgICAgIDI6IDUwLFxuICAgICAgICAzOiA1MSxcbiAgICAgICAgNDogNTIsXG4gICAgICAgIDU6IDUzLFxuICAgICAgICA2OiA1NCxcbiAgICAgICAgNzogNTUsXG4gICAgICAgIDg6IDU2LFxuICAgICAgICA5OiA1NyxcbiAgICAgICAgYTogOTcsXG4gICAgICAgIGI6IDk4LFxuICAgICAgICBjOiA5OSxcbiAgICAgICAgZDogMTAwLFxuICAgICAgICBlOiAxMDEsXG4gICAgICAgIGY6IDEwMixcbiAgICAgICAgZzogMTAzLFxuICAgICAgICBoOiAxMDQsXG4gICAgICAgIGk6IDEwNSxcbiAgICAgICAgajogMTA2LFxuICAgICAgICBrOiAxMDcsXG4gICAgICAgIGw6IDEwOCxcbiAgICAgICAgbTogMTA5LFxuICAgICAgICBuOiAxMTAsXG4gICAgICAgIG86IDExMSxcbiAgICAgICAgcDogMTEyLFxuICAgICAgICBxOiAxMTMsXG4gICAgICAgIHI6IDExNCxcbiAgICAgICAgczogMTE1LFxuICAgICAgICB0OiAxMTYsXG4gICAgICAgIHU6IDExNyxcbiAgICAgICAgdjogMTE4LFxuICAgICAgICB3OiAxMTksXG4gICAgICAgIHg6IDEyMCxcbiAgICAgICAgeTogMTIxLFxuICAgICAgICB6OiAxMjIsXG4gICAgICAgIEE6IDY1LFxuICAgICAgICBCOiA2NixcbiAgICAgICAgQzogNjcsXG4gICAgICAgIEQ6IDY4LFxuICAgICAgICBFOiA2OSxcbiAgICAgICAgRjogNzAsXG4gICAgICAgIEc6IDcxLFxuICAgICAgICBIOiA3MixcbiAgICAgICAgSTogNzMsXG4gICAgICAgIEo6IDc0LFxuICAgICAgICBLOiA3NSxcbiAgICAgICAgTDogNzYsXG4gICAgICAgIE06IDc3LFxuICAgICAgICBOOiA3OCxcbiAgICAgICAgTzogNzksXG4gICAgICAgIFA6IDgwLFxuICAgICAgICBROiA4MSxcbiAgICAgICAgUjogODIsXG4gICAgICAgIFM6IDgzLFxuICAgICAgICBUOiA4NCxcbiAgICAgICAgVTogODUsXG4gICAgICAgIFY6IDg2LFxuICAgICAgICBXOiA4NyxcbiAgICAgICAgWDogODgsXG4gICAgICAgIFk6IDg5LFxuICAgICAgICBaOiA5MCxcbiAgICAgICAgRU5URVI6IDEzLFxuICAgICAgICBMRUZUX0FSUk9XOiAzNyxcbiAgICAgICAgUklHSFRfQVJST1c6IDM5LFxuICAgICAgICBVUF9BUlJPVzogMzgsXG4gICAgICAgIERPV05fQVJST1c6IDQwLFxuICAgICAgICBTUEFDRTogMzIsXG4gICAgICAgIFNISUZUOiAxNixcbiAgICAgICAgVEFCOiA5XG4gICAgfTtcbm1vZHVsZS5leHBvcnRzID0gS2V5Q29kZXM7IiwidmFyIEZhbW91c0VuZ2luZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0VuZ2luZScpO1xudmFyIF9ldmVudCA9ICdwcmVyZW5kZXInO1xudmFyIGdldFRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2UgJiYgd2luZG93LnBlcmZvcm1hbmNlLm5vdyA/IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICB9IDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgICB9O1xuZnVuY3Rpb24gYWRkVGltZXJGdW5jdGlvbihmbikge1xuICAgIEZhbW91c0VuZ2luZS5vbihfZXZlbnQsIGZuKTtcbiAgICByZXR1cm4gZm47XG59XG5mdW5jdGlvbiBzZXRUaW1lb3V0KGZuLCBkdXJhdGlvbikge1xuICAgIHZhciB0ID0gZ2V0VGltZSgpO1xuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHQyID0gZ2V0VGltZSgpO1xuICAgICAgICBpZiAodDIgLSB0ID49IGR1cmF0aW9uKSB7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgRmFtb3VzRW5naW5lLnJlbW92ZUxpc3RlbmVyKF9ldmVudCwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gYWRkVGltZXJGdW5jdGlvbihjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBzZXRJbnRlcnZhbChmbiwgZHVyYXRpb24pIHtcbiAgICB2YXIgdCA9IGdldFRpbWUoKTtcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0MiA9IGdldFRpbWUoKTtcbiAgICAgICAgaWYgKHQyIC0gdCA+PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHQgPSBnZXRUaW1lKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBhZGRUaW1lckZ1bmN0aW9uKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGFmdGVyKGZuLCBudW1UaWNrcykge1xuICAgIGlmIChudW1UaWNrcyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbnVtVGlja3MtLTtcbiAgICAgICAgaWYgKG51bVRpY2tzIDw9IDApIHtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBjbGVhcihjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBhZGRUaW1lckZ1bmN0aW9uKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGV2ZXJ5KGZuLCBudW1UaWNrcykge1xuICAgIG51bVRpY2tzID0gbnVtVGlja3MgfHwgMTtcbiAgICB2YXIgaW5pdGlhbCA9IG51bVRpY2tzO1xuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbnVtVGlja3MtLTtcbiAgICAgICAgaWYgKG51bVRpY2tzIDw9IDApIHtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBudW1UaWNrcyA9IGluaXRpYWw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBhZGRUaW1lckZ1bmN0aW9uKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGNsZWFyKGZuKSB7XG4gICAgRmFtb3VzRW5naW5lLnJlbW92ZUxpc3RlbmVyKF9ldmVudCwgZm4pO1xufVxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuICAgIHZhciB0aW1lb3V0O1xuICAgIHZhciBjdHg7XG4gICAgdmFyIHRpbWVzdGFtcDtcbiAgICB2YXIgcmVzdWx0O1xuICAgIHZhciBhcmdzO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGN0eCA9IHRoaXM7XG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHRpbWVzdGFtcCA9IGdldFRpbWUoKTtcbiAgICAgICAgdmFyIGZuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGxhc3QgPSBnZXRUaW1lIC0gdGltZXN0YW1wO1xuICAgICAgICAgICAgaWYgKGxhc3QgPCB3YWl0KSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZm4sIHdhaXQgLSBsYXN0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjdHgsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjbGVhcih0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZm4sIHdhaXQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBzZXRUaW1lb3V0OiBzZXRUaW1lb3V0LFxuICAgIHNldEludGVydmFsOiBzZXRJbnRlcnZhbCxcbiAgICBkZWJvdW5jZTogZGVib3VuY2UsXG4gICAgYWZ0ZXI6IGFmdGVyLFxuICAgIGV2ZXJ5OiBldmVyeSxcbiAgICBjbGVhcjogY2xlYXJcbn07IiwidmFyIFV0aWxpdHkgPSB7fTtcblV0aWxpdHkuRGlyZWN0aW9uID0ge1xuICAgIFg6IDAsXG4gICAgWTogMSxcbiAgICBaOiAyXG59O1xuVXRpbGl0eS5hZnRlciA9IGZ1bmN0aW9uIGFmdGVyKGNvdW50LCBjYWxsYmFjaykge1xuICAgIHZhciBjb3VudGVyID0gY291bnQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY291bnRlci0tO1xuICAgICAgICBpZiAoY291bnRlciA9PT0gMClcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn07XG5VdGlsaXR5LmxvYWRVUkwgPSBmdW5jdGlvbiBsb2FkVVJMKHVybCwgY2FsbGJhY2spIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIG9ucmVhZHlzdGF0ZWNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgeGhyLnNlbmQoKTtcbn07XG5VdGlsaXR5LmNyZWF0ZURvY3VtZW50RnJhZ21lbnRGcm9tSFRNTCA9IGZ1bmN0aW9uIGNyZWF0ZURvY3VtZW50RnJhZ21lbnRGcm9tSFRNTChodG1sKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmlubmVySFRNTCA9IGh0bWw7XG4gICAgdmFyIHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAoZWxlbWVudC5oYXNDaGlsZE5vZGVzKCkpXG4gICAgICAgIHJlc3VsdC5hcHBlbmRDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVXRpbGl0eS5jbG9uZSA9IGZ1bmN0aW9uIGNsb25lKGIpIHtcbiAgICB2YXIgYTtcbiAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGEgPSBiIGluc3RhbmNlb2YgQXJyYXkgPyBbXSA6IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBiW2tleV0gPT09ICdvYmplY3QnICYmIGJba2V5XSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChiW2tleV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBhW2tleV0gPSBuZXcgQXJyYXkoYltrZXldLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYltrZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhW2tleV1baV0gPSBVdGlsaXR5LmNsb25lKGJba2V5XVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhW2tleV0gPSBVdGlsaXR5LmNsb25lKGJba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBhID0gYjtcbiAgICB9XG4gICAgcmV0dXJuIGE7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBVdGlsaXR5OyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FbnRpdHknKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBDb250ZXh0dWFsVmlldyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvbnN0cnVjdG9yLkRFRkFVTFRfT1BUSU9OUyB8fCBDb250ZXh0dWFsVmlldy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMuX2lkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xufVxuQ29udGV4dHVhbFZpZXcuREVGQVVMVF9PUFRJT05TID0ge307XG5Db250ZXh0dWFsVmlldy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbkNvbnRleHR1YWxWaWV3LnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucyhrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuZ2V0T3B0aW9ucyhrZXkpO1xufTtcbkNvbnRleHR1YWxWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lkO1xufTtcbkNvbnRleHR1YWxWaWV3LnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xufTtcbm1vZHVsZS5leHBvcnRzID0gQ29udGV4dHVhbFZpZXc7IiwidmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCdmYW1vdXMvdXRpbGl0aWVzL1V0aWxpdHknKTtcbnZhciBTZXF1ZW50aWFsTGF5b3V0ID0gcmVxdWlyZSgnLi9TZXF1ZW50aWFsTGF5b3V0Jyk7XG5mdW5jdGlvbiBEZWNrKG9wdGlvbnMpIHtcbiAgICBTZXF1ZW50aWFsTGF5b3V0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5zdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSgwKTtcbiAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnNldE91dHB1dEZ1bmN0aW9uKGZ1bmN0aW9uIChpbnB1dCwgb2Zmc2V0LCBpbmRleCkge1xuICAgICAgICB2YXIgc3RhdGUgPSBfZ2V0U3RhdGUuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uTWF0cml4ID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVXRpbGl0eS5EaXJlY3Rpb24uWCA/IFRyYW5zZm9ybS50cmFuc2xhdGUoc3RhdGUgKiBvZmZzZXQsIDAsIDAuMDAxICogKHN0YXRlIC0gMSkgKiBvZmZzZXQpIDogVHJhbnNmb3JtLnRyYW5zbGF0ZSgwLCBzdGF0ZSAqIG9mZnNldCwgMC4wMDEgKiAoc3RhdGUgLSAxKSAqIG9mZnNldCk7XG4gICAgICAgIHZhciBvdXRwdXQgPSBpbnB1dC5yZW5kZXIoKTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zdGFja1JvdGF0aW9uKSB7XG4gICAgICAgICAgICB2YXIgYW1vdW50ID0gdGhpcy5vcHRpb25zLnN0YWNrUm90YXRpb24gKiBpbmRleCAqICgxIC0gc3RhdGUpO1xuICAgICAgICAgICAgb3V0cHV0ID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLnJvdGF0ZVooYW1vdW50KSxcbiAgICAgICAgICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgICAgICAgICAgMC41LFxuICAgICAgICAgICAgICAgICAgICAwLjVcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHRhcmdldDogb3V0cHV0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHBvc2l0aW9uTWF0cml4LFxuICAgICAgICAgICAgc2l6ZTogaW5wdXQuZ2V0U2l6ZSgpLFxuICAgICAgICAgICAgdGFyZ2V0OiBvdXRwdXRcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbkRlY2sucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTZXF1ZW50aWFsTGF5b3V0LnByb3RvdHlwZSk7XG5EZWNrLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERlY2s7XG5EZWNrLkRFRkFVTFRfT1BUSU9OUyA9IE9wdGlvbnNNYW5hZ2VyLnBhdGNoKFNlcXVlbnRpYWxMYXlvdXQuREVGQVVMVF9PUFRJT05TLCB7XG4gICAgdHJhbnNpdGlvbjoge1xuICAgICAgICBjdXJ2ZTogJ2Vhc2VPdXRCb3VuY2UnLFxuICAgICAgICBkdXJhdGlvbjogNTAwXG4gICAgfSxcbiAgICBzdGFja1JvdGF0aW9uOiAwXG59KTtcbkRlY2sucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHZhciBvcmlnaW5hbFNpemUgPSBTZXF1ZW50aWFsTGF5b3V0LnByb3RvdHlwZS5nZXRTaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGZpcnN0U2l6ZSA9IHRoaXMuX2l0ZW1zID8gdGhpcy5faXRlbXMuZ2V0KCkuZ2V0U2l6ZSgpIDogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICBpZiAoIWZpcnN0U2l6ZSlcbiAgICAgICAgZmlyc3RTaXplID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICB2YXIgc3RhdGUgPSBfZ2V0U3RhdGUuY2FsbCh0aGlzKTtcbiAgICB2YXIgaW52U3RhdGUgPSAxIC0gc3RhdGU7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgZmlyc3RTaXplWzBdICogaW52U3RhdGUgKyBvcmlnaW5hbFNpemVbMF0gKiBzdGF0ZSxcbiAgICAgICAgZmlyc3RTaXplWzFdICogaW52U3RhdGUgKyBvcmlnaW5hbFNpemVbMV0gKiBzdGF0ZVxuICAgIF07XG59O1xuZnVuY3Rpb24gX2dldFN0YXRlKHJldHVybkZpbmFsKSB7XG4gICAgaWYgKHJldHVybkZpbmFsKVxuICAgICAgICByZXR1cm4gdGhpcy5faXNPcGVuID8gMSA6IDA7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5nZXQoKTtcbn1cbmZ1bmN0aW9uIF9zZXRTdGF0ZShwb3MsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5zdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5zdGF0ZS5zZXQocG9zLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG59XG5EZWNrLnByb3RvdHlwZS5pc09wZW4gPSBmdW5jdGlvbiBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzT3Blbjtcbn07XG5EZWNrLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gb3BlbihjYWxsYmFjaykge1xuICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XG4gICAgX3NldFN0YXRlLmNhbGwodGhpcywgMSwgdGhpcy5vcHRpb25zLnRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5EZWNrLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uIGNsb3NlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG4gICAgX3NldFN0YXRlLmNhbGwodGhpcywgMCwgdGhpcy5vcHRpb25zLnRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5EZWNrLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiB0b2dnbGUoY2FsbGJhY2spIHtcbiAgICBpZiAodGhpcy5faXNPcGVuKVxuICAgICAgICB0aGlzLmNsb3NlKGNhbGxiYWNrKTtcbiAgICBlbHNlXG4gICAgICAgIHRoaXMub3BlbihjYWxsYmFjayk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBEZWNrOyIsInZhciBDYWNoZWRNYXAgPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvQ2FjaGVkTWFwJyk7XG52YXIgRW50aXR5ID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRW50aXR5Jyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgUmVuZGVyQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vUmVuZGVyQ29udHJvbGxlcicpO1xuZnVuY3Rpb24gRWRnZVN3YXBwZXIob3B0aW9ucykge1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBudWxsO1xuICAgIHRoaXMuX3NpemUgPSBbXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgdW5kZWZpbmVkXG4gICAgXTtcbiAgICB0aGlzLl9jb250cm9sbGVyID0gbmV3IFJlbmRlckNvbnRyb2xsZXIob3B0aW9ucyk7XG4gICAgdGhpcy5fY29udHJvbGxlci5pblRyYW5zZm9ybUZyb20oQ2FjaGVkTWFwLmNyZWF0ZShfdHJhbnNmb3JtTWFwLmJpbmQodGhpcywgMC4wMDAxKSkpO1xuICAgIHRoaXMuX2NvbnRyb2xsZXIub3V0VHJhbnNmb3JtRnJvbShDYWNoZWRNYXAuY3JlYXRlKF90cmFuc2Zvcm1NYXAuYmluZCh0aGlzLCAtMC4wMDAxKSkpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICB0aGlzLl9lbnRpdHlJZCA9IEVudGl0eS5yZWdpc3Rlcih0aGlzKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gX3RyYW5zZm9ybU1hcCh6TWF4LCBwcm9ncmVzcykge1xuICAgIHJldHVybiBUcmFuc2Zvcm0udHJhbnNsYXRlKHRoaXMuX3NpemVbMF0gKiAoMSAtIHByb2dyZXNzKSwgMCwgek1heCAqICgxIC0gcHJvZ3Jlc3MpKTtcbn1cbkVkZ2VTd2FwcGVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gc2hvdyhjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUYXJnZXQpXG4gICAgICAgIHRoaXMuX2V2ZW50SW5wdXQudW5waXBlKHRoaXMuX2N1cnJlbnRUYXJnZXQpO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBjb250ZW50O1xuICAgIGlmICh0aGlzLl9jdXJyZW50VGFyZ2V0ICYmIHRoaXMuX2N1cnJlbnRUYXJnZXQudHJpZ2dlcilcbiAgICAgICAgdGhpcy5fZXZlbnRJbnB1dC5waXBlKHRoaXMuX2N1cnJlbnRUYXJnZXQpO1xuICAgIHRoaXMuX2NvbnRyb2xsZXIuc2hvdy5hcHBseSh0aGlzLl9jb250cm9sbGVyLCBhcmd1bWVudHMpO1xufTtcbkVkZ2VTd2FwcGVyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5fY29udHJvbGxlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbkVkZ2VTd2FwcGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudGl0eUlkO1xufTtcbkVkZ2VTd2FwcGVyLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHRoaXMuX3NpemVbMF0gPSBjb250ZXh0LnNpemVbMF07XG4gICAgdGhpcy5fc2l6ZVsxXSA9IGNvbnRleHQuc2l6ZVsxXTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IGNvbnRleHQudHJhbnNmb3JtLFxuICAgICAgICBvcGFjaXR5OiBjb250ZXh0Lm9wYWNpdHksXG4gICAgICAgIG9yaWdpbjogY29udGV4dC5vcmlnaW4sXG4gICAgICAgIHNpemU6IGNvbnRleHQuc2l6ZSxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLl9jb250cm9sbGVyLnJlbmRlcigpXG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEVkZ2VTd2FwcGVyOyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FbnRpdHknKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbmZ1bmN0aW9uIEZsZXhpYmxlTGF5b3V0KG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKEZsZXhpYmxlTGF5b3V0LkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5pZCA9IEVudGl0eS5yZWdpc3Rlcih0aGlzKTtcbiAgICB0aGlzLl9yYXRpb3MgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5vcHRpb25zLnJhdGlvcyk7XG4gICAgdGhpcy5fbm9kZXMgPSBbXTtcbiAgICB0aGlzLl9jYWNoZWREaXJlY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuX2NhY2hlZFRvdGFsTGVuZ3RoID0gZmFsc2U7XG4gICAgdGhpcy5fY2FjaGVkTGVuZ3RocyA9IFtdO1xuICAgIHRoaXMuX2NhY2hlZFRyYW5zZm9ybXMgPSBudWxsO1xuICAgIHRoaXMuX3JhdGlvc0RpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xufVxuRmxleGlibGVMYXlvdXQuRElSRUNUSU9OX1ggPSAwO1xuRmxleGlibGVMYXlvdXQuRElSRUNUSU9OX1kgPSAxO1xuRmxleGlibGVMYXlvdXQuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpcmVjdGlvbjogRmxleGlibGVMYXlvdXQuRElSRUNUSU9OX1gsXG4gICAgdHJhbnNpdGlvbjogZmFsc2UsXG4gICAgcmF0aW9zOiBbXVxufTtcbmZ1bmN0aW9uIF9yZWZsb3cocmF0aW9zLCBsZW5ndGgsIGRpcmVjdGlvbikge1xuICAgIHZhciBjdXJyVHJhbnNmb3JtO1xuICAgIHZhciB0cmFuc2xhdGlvbiA9IDA7XG4gICAgdmFyIGZsZXhMZW5ndGggPSBsZW5ndGg7XG4gICAgdmFyIHJhdGlvU3VtID0gMDtcbiAgICB2YXIgcmF0aW87XG4gICAgdmFyIG5vZGU7XG4gICAgdmFyIGk7XG4gICAgdGhpcy5fY2FjaGVkTGVuZ3RocyA9IFtdO1xuICAgIHRoaXMuX2NhY2hlZFRyYW5zZm9ybXMgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgcmF0aW9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJhdGlvID0gcmF0aW9zW2ldO1xuICAgICAgICBub2RlID0gdGhpcy5fbm9kZXNbaV07XG4gICAgICAgIGlmICh0eXBlb2YgcmF0aW8gIT09ICdudW1iZXInKVxuICAgICAgICAgICAgZmxleExlbmd0aCAtPSBub2RlLmdldFNpemUoKVtkaXJlY3Rpb25dIHx8IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJhdGlvU3VtICs9IHJhdGlvO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgcmF0aW9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5vZGUgPSB0aGlzLl9ub2Rlc1tpXTtcbiAgICAgICAgcmF0aW8gPSByYXRpb3NbaV07XG4gICAgICAgIGxlbmd0aCA9IHR5cGVvZiByYXRpbyA9PT0gJ251bWJlcicgPyBmbGV4TGVuZ3RoICogcmF0aW8gLyByYXRpb1N1bSA6IG5vZGUuZ2V0U2l6ZSgpW2RpcmVjdGlvbl07XG4gICAgICAgIGN1cnJUcmFuc2Zvcm0gPSBkaXJlY3Rpb24gPT09IEZsZXhpYmxlTGF5b3V0LkRJUkVDVElPTl9YID8gVHJhbnNmb3JtLnRyYW5zbGF0ZSh0cmFuc2xhdGlvbiwgMCwgMCkgOiBUcmFuc2Zvcm0udHJhbnNsYXRlKDAsIHRyYW5zbGF0aW9uLCAwKTtcbiAgICAgICAgdGhpcy5fY2FjaGVkVHJhbnNmb3Jtcy5wdXNoKGN1cnJUcmFuc2Zvcm0pO1xuICAgICAgICB0aGlzLl9jYWNoZWRMZW5ndGhzLnB1c2gobGVuZ3RoKTtcbiAgICAgICAgdHJhbnNsYXRpb24gKz0gbGVuZ3RoO1xuICAgIH1cbn1cbkZsZXhpYmxlTGF5b3V0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaWQ7XG59O1xuRmxleGlibGVMYXlvdXQucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuRmxleGlibGVMYXlvdXQucHJvdG90eXBlLnNlcXVlbmNlRnJvbSA9IGZ1bmN0aW9uIHNlcXVlbmNlRnJvbShzZXF1ZW5jZSkge1xuICAgIHRoaXMuX25vZGVzID0gc2VxdWVuY2U7XG4gICAgaWYgKHRoaXMuX3JhdGlvcy5nZXQoKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIHJhdGlvcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX25vZGVzLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgcmF0aW9zLnB1c2goMSk7XG4gICAgICAgIHRoaXMuc2V0UmF0aW9zKHJhdGlvcyk7XG4gICAgfVxufTtcbkZsZXhpYmxlTGF5b3V0LnByb3RvdHlwZS5zZXRSYXRpb3MgPSBmdW5jdGlvbiBzZXRSYXRpb3MocmF0aW9zLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRyYW5zaXRpb24gPSB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICB2YXIgY3VyclJhdGlvcyA9IHRoaXMuX3JhdGlvcztcbiAgICBpZiAoY3VyclJhdGlvcy5nZXQoKS5sZW5ndGggPT09IDApXG4gICAgICAgIHRyYW5zaXRpb24gPSB1bmRlZmluZWQ7XG4gICAgaWYgKGN1cnJSYXRpb3MuaXNBY3RpdmUoKSlcbiAgICAgICAgY3VyclJhdGlvcy5oYWx0KCk7XG4gICAgY3VyclJhdGlvcy5zZXQocmF0aW9zLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgdGhpcy5fcmF0aW9zRGlydHkgPSB0cnVlO1xufTtcbkZsZXhpYmxlTGF5b3V0LnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciBwYXJlbnRTaXplID0gY29udGV4dC5zaXplO1xuICAgIHZhciBwYXJlbnRUcmFuc2Zvcm0gPSBjb250ZXh0LnRyYW5zZm9ybTtcbiAgICB2YXIgcGFyZW50T3JpZ2luID0gY29udGV4dC5vcmlnaW47XG4gICAgdmFyIHBhcmVudE9wYWNpdHkgPSBjb250ZXh0Lm9wYWNpdHk7XG4gICAgdmFyIHJhdGlvcyA9IHRoaXMuX3JhdGlvcy5nZXQoKTtcbiAgICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICB2YXIgbGVuZ3RoID0gcGFyZW50U2l6ZVtkaXJlY3Rpb25dO1xuICAgIHZhciBzaXplO1xuICAgIGlmIChsZW5ndGggIT09IHRoaXMuX2NhY2hlZFRvdGFsTGVuZ3RoIHx8IHRoaXMuX3JhdGlvc0RpcnR5IHx8IHRoaXMuX3JhdGlvcy5pc0FjdGl2ZSgpIHx8IGRpcmVjdGlvbiAhPT0gdGhpcy5fY2FjaGVkRGlyZWN0aW9uKSB7XG4gICAgICAgIF9yZWZsb3cuY2FsbCh0aGlzLCByYXRpb3MsIGxlbmd0aCwgZGlyZWN0aW9uKTtcbiAgICAgICAgaWYgKGxlbmd0aCAhPT0gdGhpcy5fY2FjaGVkVG90YWxMZW5ndGgpXG4gICAgICAgICAgICB0aGlzLl9jYWNoZWRUb3RhbExlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiAhPT0gdGhpcy5fY2FjaGVkRGlyZWN0aW9uKVxuICAgICAgICAgICAgdGhpcy5fY2FjaGVkRGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICBpZiAodGhpcy5fcmF0aW9zRGlydHkpXG4gICAgICAgICAgICB0aGlzLl9yYXRpb3NEaXJ0eSA9IGZhbHNlO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYXRpb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2l6ZSA9IFtcbiAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICBdO1xuICAgICAgICBsZW5ndGggPSB0aGlzLl9jYWNoZWRMZW5ndGhzW2ldO1xuICAgICAgICBzaXplW2RpcmVjdGlvbl0gPSBsZW5ndGg7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdGhpcy5fY2FjaGVkVHJhbnNmb3Jtc1tpXSxcbiAgICAgICAgICAgIHNpemU6IHNpemUsXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuX25vZGVzW2ldLnJlbmRlcigpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocGFyZW50U2l6ZSAmJiAocGFyZW50T3JpZ2luWzBdICE9PSAwICYmIHBhcmVudE9yaWdpblsxXSAhPT0gMCkpXG4gICAgICAgIHBhcmVudFRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tb3ZlVGhlbihbXG4gICAgICAgICAgICAtcGFyZW50U2l6ZVswXSAqIHBhcmVudE9yaWdpblswXSxcbiAgICAgICAgICAgIC1wYXJlbnRTaXplWzFdICogcGFyZW50T3JpZ2luWzFdLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLCBwYXJlbnRUcmFuc2Zvcm0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogcGFyZW50VHJhbnNmb3JtLFxuICAgICAgICBzaXplOiBwYXJlbnRTaXplLFxuICAgICAgICBvcGFjaXR5OiBwYXJlbnRPcGFjaXR5LFxuICAgICAgICB0YXJnZXQ6IHJlc3VsdFxuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBGbGV4aWJsZUxheW91dDsiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvUmVuZGVyTm9kZScpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbmZ1bmN0aW9uIEZsaXBwZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoRmxpcHBlci5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmFuZ2xlID0gbmV3IFRyYW5zaXRpb25hYmxlKDApO1xuICAgIHRoaXMuZnJvbnROb2RlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuYmFja05vZGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5mbGlwcGVkID0gZmFsc2U7XG59XG5GbGlwcGVyLkRJUkVDVElPTl9YID0gMDtcbkZsaXBwZXIuRElSRUNUSU9OX1kgPSAxO1xudmFyIFNFUEVSQVRJT05fTEVOR1RIID0gMTtcbkZsaXBwZXIuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHRyYW5zaXRpb246IHRydWUsXG4gICAgZGlyZWN0aW9uOiBGbGlwcGVyLkRJUkVDVElPTl9YXG59O1xuRmxpcHBlci5wcm90b3R5cGUuZmxpcCA9IGZ1bmN0aW9uIGZsaXAodHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB2YXIgYW5nbGUgPSB0aGlzLmZsaXBwZWQgPyAwIDogTWF0aC5QSTtcbiAgICB0aGlzLnNldEFuZ2xlKGFuZ2xlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgdGhpcy5mbGlwcGVkID0gIXRoaXMuZmxpcHBlZDtcbn07XG5GbGlwcGVyLnByb3RvdHlwZS5zZXRBbmdsZSA9IGZ1bmN0aW9uIHNldEFuZ2xlKGFuZ2xlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0cmFuc2l0aW9uID09PSB1bmRlZmluZWQpXG4gICAgICAgIHRyYW5zaXRpb24gPSB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICBpZiAodGhpcy5hbmdsZS5pc0FjdGl2ZSgpKVxuICAgICAgICB0aGlzLmFuZ2xlLmhhbHQoKTtcbiAgICB0aGlzLmFuZ2xlLnNldChhbmdsZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xufTtcbkZsaXBwZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5GbGlwcGVyLnByb3RvdHlwZS5zZXRGcm9udCA9IGZ1bmN0aW9uIHNldEZyb250KG5vZGUpIHtcbiAgICB0aGlzLmZyb250Tm9kZSA9IG5vZGU7XG59O1xuRmxpcHBlci5wcm90b3R5cGUuc2V0QmFjayA9IGZ1bmN0aW9uIHNldEJhY2sobm9kZSkge1xuICAgIHRoaXMuYmFja05vZGUgPSBub2RlO1xufTtcbkZsaXBwZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgYW5nbGUgPSB0aGlzLmFuZ2xlLmdldCgpO1xuICAgIHZhciBmcm9udFRyYW5zZm9ybTtcbiAgICB2YXIgYmFja1RyYW5zZm9ybTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gRmxpcHBlci5ESVJFQ1RJT05fWCkge1xuICAgICAgICBmcm9udFRyYW5zZm9ybSA9IFRyYW5zZm9ybS5yb3RhdGVZKGFuZ2xlKTtcbiAgICAgICAgYmFja1RyYW5zZm9ybSA9IFRyYW5zZm9ybS5yb3RhdGVZKGFuZ2xlICsgTWF0aC5QSSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZnJvbnRUcmFuc2Zvcm0gPSBUcmFuc2Zvcm0ucm90YXRlWChhbmdsZSk7XG4gICAgICAgIGJhY2tUcmFuc2Zvcm0gPSBUcmFuc2Zvcm0ucm90YXRlWChhbmdsZSArIE1hdGguUEkpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgaWYgKHRoaXMuZnJvbnROb2RlKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogZnJvbnRUcmFuc2Zvcm0sXG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXMuZnJvbnROb2RlLnJlbmRlcigpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5iYWNrTm9kZSkge1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS5tb3ZlVGhlbihbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIFNFUEVSQVRJT05fTEVOR1RIXG4gICAgICAgICAgICBdLCBiYWNrVHJhbnNmb3JtKSxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5iYWNrTm9kZS5yZW5kZXIoKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZsaXBwZXI7IiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0VudGl0eScpO1xudmFyIFJlbmRlck5vZGUgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9SZW5kZXJOb2RlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVmlld1NlcXVlbmNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVmlld1NlcXVlbmNlJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9Nb2RpZmllcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlVHJhbnNmb3JtJyk7XG5mdW5jdGlvbiBHcmlkTGF5b3V0KG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKEdyaWRMYXlvdXQuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLm9wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuX21vZGlmaWVycyA9IFtdO1xuICAgIHRoaXMuX3N0YXRlcyA9IFtdO1xuICAgIHRoaXMuX2NvbnRleHRTaXplQ2FjaGUgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2RpbWVuc2lvbnNDYWNoZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fYWN0aXZlQ291bnQgPSAwO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cbmZ1bmN0aW9uIF9yZWZsb3coc2l6ZSwgY29scywgcm93cykge1xuICAgIHZhciB1c2FibGVTaXplID0gW1xuICAgICAgICAgICAgc2l6ZVswXSxcbiAgICAgICAgICAgIHNpemVbMV1cbiAgICAgICAgXTtcbiAgICB1c2FibGVTaXplWzBdIC09IHRoaXMub3B0aW9ucy5ndXR0ZXJTaXplWzBdICogKGNvbHMgLSAxKTtcbiAgICB1c2FibGVTaXplWzFdIC09IHRoaXMub3B0aW9ucy5ndXR0ZXJTaXplWzFdICogKHJvd3MgLSAxKTtcbiAgICB2YXIgcm93U2l6ZSA9IE1hdGgucm91bmQodXNhYmxlU2l6ZVsxXSAvIHJvd3MpO1xuICAgIHZhciBjb2xTaXplID0gTWF0aC5yb3VuZCh1c2FibGVTaXplWzBdIC8gY29scyk7XG4gICAgdmFyIGN1cnJZID0gMDtcbiAgICB2YXIgY3Vyclg7XG4gICAgdmFyIGN1cnJJbmRleCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcbiAgICAgICAgY3VyclggPSAwO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNvbHM7IGorKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX21vZGlmaWVyc1tjdXJySW5kZXhdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBfY3JlYXRlTW9kaWZpZXIuY2FsbCh0aGlzLCBjdXJySW5kZXgsIFtcbiAgICAgICAgICAgICAgICAgICAgY29sU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgcm93U2l6ZVxuICAgICAgICAgICAgICAgIF0sIFtcbiAgICAgICAgICAgICAgICAgICAgY3VyclgsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJZLFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgXSwgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9hbmltYXRlTW9kaWZpZXIuY2FsbCh0aGlzLCBjdXJySW5kZXgsIFtcbiAgICAgICAgICAgICAgICAgICAgY29sU2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgcm93U2l6ZVxuICAgICAgICAgICAgICAgIF0sIFtcbiAgICAgICAgICAgICAgICAgICAgY3VyclgsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJZLFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgXSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJySW5kZXgrKztcbiAgICAgICAgICAgIGN1cnJYICs9IGNvbFNpemUgKyB0aGlzLm9wdGlvbnMuZ3V0dGVyU2l6ZVswXTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyWSArPSByb3dTaXplICsgdGhpcy5vcHRpb25zLmd1dHRlclNpemVbMV07XG4gICAgfVxuICAgIHRoaXMuX2RpbWVuc2lvbnNDYWNoZSA9IFtcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpbWVuc2lvbnNbMF0sXG4gICAgICAgIHRoaXMub3B0aW9ucy5kaW1lbnNpb25zWzFdXG4gICAgXTtcbiAgICB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlID0gW1xuICAgICAgICBzaXplWzBdLFxuICAgICAgICBzaXplWzFdXG4gICAgXTtcbiAgICB0aGlzLl9hY3RpdmVDb3VudCA9IHJvd3MgKiBjb2xzO1xuICAgIGZvciAoaSA9IHRoaXMuX2FjdGl2ZUNvdW50OyBpIDwgdGhpcy5fbW9kaWZpZXJzLmxlbmd0aDsgaSsrKVxuICAgICAgICBfYW5pbWF0ZU1vZGlmaWVyLmNhbGwodGhpcywgaSwgW1xuICAgICAgICAgICAgTWF0aC5yb3VuZChjb2xTaXplKSxcbiAgICAgICAgICAgIE1hdGgucm91bmQocm93U2l6ZSlcbiAgICAgICAgXSwgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSwgMCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncmVmbG93Jyk7XG59XG5mdW5jdGlvbiBfY3JlYXRlTW9kaWZpZXIoaW5kZXgsIHNpemUsIHBvc2l0aW9uLCBvcGFjaXR5KSB7XG4gICAgdmFyIHRyYW5zaXRpb25JdGVtID0ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBuZXcgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0oVHJhbnNmb3JtLnRyYW5zbGF0ZS5hcHBseShudWxsLCBwb3NpdGlvbikpLFxuICAgICAgICAgICAgb3BhY2l0eTogbmV3IFRyYW5zaXRpb25hYmxlKG9wYWNpdHkpLFxuICAgICAgICAgICAgc2l6ZTogbmV3IFRyYW5zaXRpb25hYmxlKHNpemUpXG4gICAgICAgIH07XG4gICAgdmFyIG1vZGlmaWVyID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNpdGlvbkl0ZW0udHJhbnNmb3JtLFxuICAgICAgICAgICAgb3BhY2l0eTogdHJhbnNpdGlvbkl0ZW0ub3BhY2l0eSxcbiAgICAgICAgICAgIHNpemU6IHRyYW5zaXRpb25JdGVtLnNpemVcbiAgICAgICAgfSk7XG4gICAgdGhpcy5fc3RhdGVzW2luZGV4XSA9IHRyYW5zaXRpb25JdGVtO1xuICAgIHRoaXMuX21vZGlmaWVyc1tpbmRleF0gPSBtb2RpZmllcjtcbn1cbmZ1bmN0aW9uIF9hbmltYXRlTW9kaWZpZXIoaW5kZXgsIHNpemUsIHBvc2l0aW9uLCBvcGFjaXR5KSB7XG4gICAgdmFyIGN1cnJTdGF0ZSA9IHRoaXMuX3N0YXRlc1tpbmRleF07XG4gICAgdmFyIGN1cnJTaXplID0gY3VyclN0YXRlLnNpemU7XG4gICAgdmFyIGN1cnJPcGFjaXR5ID0gY3VyclN0YXRlLm9wYWNpdHk7XG4gICAgdmFyIGN1cnJUcmFuc2Zvcm0gPSBjdXJyU3RhdGUudHJhbnNmb3JtO1xuICAgIHZhciB0cmFuc2l0aW9uID0gdGhpcy5vcHRpb25zLnRyYW5zaXRpb247XG4gICAgY3VyclRyYW5zZm9ybS5oYWx0KCk7XG4gICAgY3Vyck9wYWNpdHkuaGFsdCgpO1xuICAgIGN1cnJTaXplLmhhbHQoKTtcbiAgICBjdXJyVHJhbnNmb3JtLnNldFRyYW5zbGF0ZShwb3NpdGlvbiwgdHJhbnNpdGlvbik7XG4gICAgY3VyclNpemUuc2V0KHNpemUsIHRyYW5zaXRpb24pO1xuICAgIGN1cnJPcGFjaXR5LnNldChvcGFjaXR5LCB0cmFuc2l0aW9uKTtcbn1cbkdyaWRMYXlvdXQuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpbWVuc2lvbnM6IFtcbiAgICAgICAgMSxcbiAgICAgICAgMVxuICAgIF0sXG4gICAgdHJhbnNpdGlvbjogZmFsc2UsXG4gICAgZ3V0dGVyU2l6ZTogW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXVxufTtcbkdyaWRMYXlvdXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbn07XG5HcmlkTGF5b3V0LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5HcmlkTGF5b3V0LnByb3RvdHlwZS5zZXF1ZW5jZUZyb20gPSBmdW5jdGlvbiBzZXF1ZW5jZUZyb20oc2VxdWVuY2UpIHtcbiAgICBpZiAoc2VxdWVuY2UgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgc2VxdWVuY2UgPSBuZXcgVmlld1NlcXVlbmNlKHNlcXVlbmNlKTtcbiAgICB0aGlzLnNlcXVlbmNlID0gc2VxdWVuY2U7XG59O1xuR3JpZExheW91dC5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICB2YXIgdHJhbnNmb3JtID0gY29udGV4dC50cmFuc2Zvcm07XG4gICAgdmFyIG9wYWNpdHkgPSBjb250ZXh0Lm9wYWNpdHk7XG4gICAgdmFyIG9yaWdpbiA9IGNvbnRleHQub3JpZ2luO1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIHZhciBjb2xzID0gdGhpcy5vcHRpb25zLmRpbWVuc2lvbnNbMF07XG4gICAgdmFyIHJvd3MgPSB0aGlzLm9wdGlvbnMuZGltZW5zaW9uc1sxXTtcbiAgICBpZiAoc2l6ZVswXSAhPT0gdGhpcy5fY29udGV4dFNpemVDYWNoZVswXSB8fCBzaXplWzFdICE9PSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzFdIHx8IGNvbHMgIT09IHRoaXMuX2RpbWVuc2lvbnNDYWNoZVswXSB8fCByb3dzICE9PSB0aGlzLl9kaW1lbnNpb25zQ2FjaGVbMV0pIHtcbiAgICAgICAgX3JlZmxvdy5jYWxsKHRoaXMsIHNpemUsIGNvbHMsIHJvd3MpO1xuICAgIH1cbiAgICB2YXIgc2VxdWVuY2UgPSB0aGlzLnNlcXVlbmNlO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB2YXIgY3VyckluZGV4ID0gMDtcbiAgICB3aGlsZSAoc2VxdWVuY2UgJiYgY3VyckluZGV4IDwgdGhpcy5fbW9kaWZpZXJzLmxlbmd0aCkge1xuICAgICAgICB2YXIgaXRlbSA9IHNlcXVlbmNlLmdldCgpO1xuICAgICAgICB2YXIgbW9kaWZpZXIgPSB0aGlzLl9tb2RpZmllcnNbY3VyckluZGV4XTtcbiAgICAgICAgaWYgKGN1cnJJbmRleCA+PSB0aGlzLl9hY3RpdmVDb3VudCAmJiB0aGlzLl9zdGF0ZXNbY3VyckluZGV4XS5vcGFjaXR5LmlzQWN0aXZlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVycy5zcGxpY2UoY3VyckluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRlcy5zcGxpY2UoY3VyckluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobW9kaWZpZXIubW9kaWZ5KHtcbiAgICAgICAgICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IGl0ZW0ucmVuZGVyKClcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBzZXF1ZW5jZSA9IHNlcXVlbmNlLmdldE5leHQoKTtcbiAgICAgICAgY3VyckluZGV4Kys7XG4gICAgfVxuICAgIGlmIChzaXplKVxuICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubW92ZVRoZW4oW1xuICAgICAgICAgICAgLXNpemVbMF0gKiBvcmlnaW5bMF0sXG4gICAgICAgICAgICAtc2l6ZVsxXSAqIG9yaWdpblsxXSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSwgdHJhbnNmb3JtKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgdGFyZ2V0OiByZXN1bHRcbiAgICB9O1xufTtcbm1vZHVsZS5leHBvcnRzID0gR3JpZExheW91dDsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRW50aXR5Jyk7XG52YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1JlbmRlck5vZGUnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBIZWFkZXJGb290ZXJMYXlvdXQob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoSGVhZGVyRm9vdGVyTGF5b3V0LkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2VudGl0eUlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuaGVhZGVyID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLmZvb3RlciA9IG5ldyBSZW5kZXJOb2RlKCk7XG4gICAgdGhpcy5jb250ZW50ID0gbmV3IFJlbmRlck5vZGUoKTtcbn1cbkhlYWRlckZvb3RlckxheW91dC5ESVJFQ1RJT05fWCA9IDA7XG5IZWFkZXJGb290ZXJMYXlvdXQuRElSRUNUSU9OX1kgPSAxO1xuSGVhZGVyRm9vdGVyTGF5b3V0LkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBkaXJlY3Rpb246IEhlYWRlckZvb3RlckxheW91dC5ESVJFQ1RJT05fWSxcbiAgICBoZWFkZXJTaXplOiB1bmRlZmluZWQsXG4gICAgZm9vdGVyU2l6ZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHRIZWFkZXJTaXplOiAwLFxuICAgIGRlZmF1bHRGb290ZXJTaXplOiAwXG59O1xuSGVhZGVyRm9vdGVyTGF5b3V0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2VudGl0eUlkO1xufTtcbkhlYWRlckZvb3RlckxheW91dC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbmZ1bmN0aW9uIF9yZXNvbHZlTm9kZVNpemUobm9kZSwgZGVmYXVsdFNpemUpIHtcbiAgICB2YXIgbm9kZVNpemUgPSBub2RlLmdldFNpemUoKTtcbiAgICByZXR1cm4gbm9kZVNpemUgPyBub2RlU2l6ZVt0aGlzLm9wdGlvbnMuZGlyZWN0aW9uXSA6IGRlZmF1bHRTaXplO1xufVxuZnVuY3Rpb24gX291dHB1dFRyYW5zZm9ybShvZmZzZXQpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gSGVhZGVyRm9vdGVyTGF5b3V0LkRJUkVDVElPTl9YKVxuICAgICAgICByZXR1cm4gVHJhbnNmb3JtLnRyYW5zbGF0ZShvZmZzZXQsIDAsIDApO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIFRyYW5zZm9ybS50cmFuc2xhdGUoMCwgb2Zmc2V0LCAwKTtcbn1cbmZ1bmN0aW9uIF9maW5hbFNpemUoZGlyZWN0aW9uU2l6ZSwgc2l6ZSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBIZWFkZXJGb290ZXJMYXlvdXQuRElSRUNUSU9OX1gpXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBkaXJlY3Rpb25TaXplLFxuICAgICAgICAgICAgc2l6ZVsxXVxuICAgICAgICBdO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHNpemVbMF0sXG4gICAgICAgICAgICBkaXJlY3Rpb25TaXplXG4gICAgICAgIF07XG59XG5IZWFkZXJGb290ZXJMYXlvdXQucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHRyYW5zZm9ybSA9IGNvbnRleHQudHJhbnNmb3JtO1xuICAgIHZhciBvcmlnaW4gPSBjb250ZXh0Lm9yaWdpbjtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICB2YXIgb3BhY2l0eSA9IGNvbnRleHQub3BhY2l0eTtcbiAgICB2YXIgaGVhZGVyU2l6ZSA9IHRoaXMub3B0aW9ucy5oZWFkZXJTaXplICE9PSB1bmRlZmluZWQgPyB0aGlzLm9wdGlvbnMuaGVhZGVyU2l6ZSA6IF9yZXNvbHZlTm9kZVNpemUuY2FsbCh0aGlzLCB0aGlzLmhlYWRlciwgdGhpcy5vcHRpb25zLmRlZmF1bHRIZWFkZXJTaXplKTtcbiAgICB2YXIgZm9vdGVyU2l6ZSA9IHRoaXMub3B0aW9ucy5mb290ZXJTaXplICE9PSB1bmRlZmluZWQgPyB0aGlzLm9wdGlvbnMuZm9vdGVyU2l6ZSA6IF9yZXNvbHZlTm9kZVNpemUuY2FsbCh0aGlzLCB0aGlzLmZvb3RlciwgdGhpcy5vcHRpb25zLmRlZmF1bHRGb290ZXJTaXplKTtcbiAgICB2YXIgY29udGVudFNpemUgPSBzaXplW3RoaXMub3B0aW9ucy5kaXJlY3Rpb25dIC0gaGVhZGVyU2l6ZSAtIGZvb3RlclNpemU7XG4gICAgaWYgKHNpemUpXG4gICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tb3ZlVGhlbihbXG4gICAgICAgICAgICAtc2l6ZVswXSAqIG9yaWdpblswXSxcbiAgICAgICAgICAgIC1zaXplWzFdICogb3JpZ2luWzFdLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLCB0cmFuc2Zvcm0pO1xuICAgIHZhciByZXN1bHQgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2l6ZTogX2ZpbmFsU2l6ZS5jYWxsKHRoaXMsIGhlYWRlclNpemUsIHNpemUpLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5oZWFkZXIucmVuZGVyKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBfb3V0cHV0VHJhbnNmb3JtLmNhbGwodGhpcywgaGVhZGVyU2l6ZSksXG4gICAgICAgICAgICAgICAgc2l6ZTogX2ZpbmFsU2l6ZS5jYWxsKHRoaXMsIGNvbnRlbnRTaXplLCBzaXplKSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMuY29udGVudC5yZW5kZXIoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IF9vdXRwdXRUcmFuc2Zvcm0uY2FsbCh0aGlzLCBoZWFkZXJTaXplICsgY29udGVudFNpemUpLFxuICAgICAgICAgICAgICAgIHNpemU6IF9maW5hbFNpemUuY2FsbCh0aGlzLCBmb290ZXJTaXplLCBzaXplKSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMuZm9vdGVyLnJlbmRlcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgIG9wYWNpdHk6IG9wYWNpdHksXG4gICAgICAgIHNpemU6IHNpemUsXG4gICAgICAgIHRhcmdldDogcmVzdWx0XG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlckZvb3RlckxheW91dDsiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgTW9kaWZpZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9Nb2RpZmllcicpO1xudmFyIFJlbmRlck5vZGUgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9SZW5kZXJOb2RlJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eScpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlVHJhbnNmb3JtJyk7XG5mdW5jdGlvbiBMaWdodGJveChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShMaWdodGJveC5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9zaG93aW5nID0gZmFsc2U7XG4gICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgIHRoaXMudHJhbnNmb3JtcyA9IFtdO1xuICAgIHRoaXMuc3RhdGVzID0gW107XG59XG5MaWdodGJveC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgaW5UcmFuc2Zvcm06IFRyYW5zZm9ybS5zY2FsZSgwLjAwMSwgMC4wMDEsIDAuMDAxKSxcbiAgICBpbk9wYWNpdHk6IDAsXG4gICAgaW5PcmlnaW46IFtcbiAgICAgICAgMC41LFxuICAgICAgICAwLjVcbiAgICBdLFxuICAgIG91dFRyYW5zZm9ybTogVHJhbnNmb3JtLnNjYWxlKDAuMDAxLCAwLjAwMSwgMC4wMDEpLFxuICAgIG91dE9wYWNpdHk6IDAsXG4gICAgb3V0T3JpZ2luOiBbXG4gICAgICAgIDAuNSxcbiAgICAgICAgMC41XG4gICAgXSxcbiAgICBzaG93VHJhbnNmb3JtOiBUcmFuc2Zvcm0uaWRlbnRpdHksXG4gICAgc2hvd09wYWNpdHk6IDEsXG4gICAgc2hvd09yaWdpbjogW1xuICAgICAgICAwLjUsXG4gICAgICAgIDAuNVxuICAgIF0sXG4gICAgaW5UcmFuc2l0aW9uOiB0cnVlLFxuICAgIG91dFRyYW5zaXRpb246IHRydWUsXG4gICAgb3ZlcmxhcDogZmFsc2Vcbn07XG5MaWdodGJveC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbkxpZ2h0Ym94LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gc2hvdyhyZW5kZXJhYmxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghcmVuZGVyYWJsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRlKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKHRyYW5zaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICBjYWxsYmFjayA9IHRyYW5zaXRpb247XG4gICAgICAgIHRyYW5zaXRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zaG93aW5nKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxhcClcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhpZGUodGhpcy5zaG93LmJpbmQodGhpcywgcmVuZGVyYWJsZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9zaG93aW5nID0gdHJ1ZTtcbiAgICB2YXIgc3RhdGVJdGVtID0ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBuZXcgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0odGhpcy5vcHRpb25zLmluVHJhbnNmb3JtKSxcbiAgICAgICAgICAgIG9yaWdpbjogbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMub3B0aW9ucy5pbk9yaWdpbiksXG4gICAgICAgICAgICBvcGFjaXR5OiBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5vcHRpb25zLmluT3BhY2l0eSlcbiAgICAgICAgfTtcbiAgICB2YXIgdHJhbnNmb3JtID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc3RhdGVJdGVtLnRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9wYWNpdHk6IHN0YXRlSXRlbS5vcGFjaXR5LFxuICAgICAgICAgICAgb3JpZ2luOiBzdGF0ZUl0ZW0ub3JpZ2luXG4gICAgICAgIH0pO1xuICAgIHZhciBub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICBub2RlLmFkZCh0cmFuc2Zvcm0pLmFkZChyZW5kZXJhYmxlKTtcbiAgICB0aGlzLm5vZGVzLnB1c2gobm9kZSk7XG4gICAgdGhpcy5zdGF0ZXMucHVzaChzdGF0ZUl0ZW0pO1xuICAgIHRoaXMudHJhbnNmb3Jtcy5wdXNoKHRyYW5zZm9ybSk7XG4gICAgdmFyIF9jYiA9IGNhbGxiYWNrID8gVXRpbGl0eS5hZnRlcigzLCBjYWxsYmFjaykgOiB1bmRlZmluZWQ7XG4gICAgaWYgKCF0cmFuc2l0aW9uKVxuICAgICAgICB0cmFuc2l0aW9uID0gdGhpcy5vcHRpb25zLmluVHJhbnNpdGlvbjtcbiAgICBzdGF0ZUl0ZW0udHJhbnNmb3JtLnNldCh0aGlzLm9wdGlvbnMuc2hvd1RyYW5zZm9ybSwgdHJhbnNpdGlvbiwgX2NiKTtcbiAgICBzdGF0ZUl0ZW0ub3BhY2l0eS5zZXQodGhpcy5vcHRpb25zLnNob3dPcGFjaXR5LCB0cmFuc2l0aW9uLCBfY2IpO1xuICAgIHN0YXRlSXRlbS5vcmlnaW4uc2V0KHRoaXMub3B0aW9ucy5zaG93T3JpZ2luLCB0cmFuc2l0aW9uLCBfY2IpO1xufTtcbkxpZ2h0Ym94LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gaGlkZSh0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghdGhpcy5fc2hvd2luZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX3Nob3dpbmcgPSBmYWxzZTtcbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGNhbGxiYWNrID0gdHJhbnNpdGlvbjtcbiAgICAgICAgdHJhbnNpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIG5vZGUgPSB0aGlzLm5vZGVzW3RoaXMubm9kZXMubGVuZ3RoIC0gMV07XG4gICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3Jtc1t0aGlzLnRyYW5zZm9ybXMubGVuZ3RoIC0gMV07XG4gICAgdmFyIHN0YXRlSXRlbSA9IHRoaXMuc3RhdGVzW3RoaXMuc3RhdGVzLmxlbmd0aCAtIDFdO1xuICAgIHZhciBfY2IgPSBVdGlsaXR5LmFmdGVyKDMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZXMuc3BsaWNlKHRoaXMubm9kZXMuaW5kZXhPZihub2RlKSwgMSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlcy5zcGxpY2UodGhpcy5zdGF0ZXMuaW5kZXhPZihzdGF0ZUl0ZW0pLCAxKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3Jtcy5zcGxpY2UodGhpcy50cmFuc2Zvcm1zLmluZGV4T2YodHJhbnNmb3JtKSwgMSk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICBpZiAoIXRyYW5zaXRpb24pXG4gICAgICAgIHRyYW5zaXRpb24gPSB0aGlzLm9wdGlvbnMub3V0VHJhbnNpdGlvbjtcbiAgICBzdGF0ZUl0ZW0udHJhbnNmb3JtLnNldCh0aGlzLm9wdGlvbnMub3V0VHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBfY2IpO1xuICAgIHN0YXRlSXRlbS5vcGFjaXR5LnNldCh0aGlzLm9wdGlvbnMub3V0T3BhY2l0eSwgdHJhbnNpdGlvbiwgX2NiKTtcbiAgICBzdGF0ZUl0ZW0ub3JpZ2luLnNldCh0aGlzLm9wdGlvbnMub3V0T3JpZ2luLCB0cmFuc2l0aW9uLCBfY2IpO1xufTtcbkxpZ2h0Ym94LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLm5vZGVzW2ldLnJlbmRlcigpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IExpZ2h0Ym94OyIsInZhciBNb2RpZmllciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL01vZGlmaWVyJyk7XG52YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1JlbmRlck5vZGUnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFZpZXcgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9WaWV3Jyk7XG5mdW5jdGlvbiBSZW5kZXJDb250cm9sbGVyKG9wdGlvbnMpIHtcbiAgICBWaWV3LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5fc2hvd2luZyA9IC0xO1xuICAgIHRoaXMuX291dGdvaW5nUmVuZGVyYWJsZXMgPSBbXTtcbiAgICB0aGlzLl9uZXh0UmVuZGVyYWJsZSA9IG51bGw7XG4gICAgdGhpcy5fcmVuZGVyYWJsZXMgPSBbXTtcbiAgICB0aGlzLl9ub2RlcyA9IFtdO1xuICAgIHRoaXMuX21vZGlmaWVycyA9IFtdO1xuICAgIHRoaXMuX3N0YXRlcyA9IFtdO1xuICAgIHRoaXMuaW5UcmFuc2Zvcm1NYXAgPSBSZW5kZXJDb250cm9sbGVyLkRlZmF1bHRNYXAudHJhbnNmb3JtO1xuICAgIHRoaXMuaW5PcGFjaXR5TWFwID0gUmVuZGVyQ29udHJvbGxlci5EZWZhdWx0TWFwLm9wYWNpdHk7XG4gICAgdGhpcy5pbk9yaWdpbk1hcCA9IFJlbmRlckNvbnRyb2xsZXIuRGVmYXVsdE1hcC5vcmlnaW47XG4gICAgdGhpcy5vdXRUcmFuc2Zvcm1NYXAgPSBSZW5kZXJDb250cm9sbGVyLkRlZmF1bHRNYXAudHJhbnNmb3JtO1xuICAgIHRoaXMub3V0T3BhY2l0eU1hcCA9IFJlbmRlckNvbnRyb2xsZXIuRGVmYXVsdE1hcC5vcGFjaXR5O1xuICAgIHRoaXMub3V0T3JpZ2luTWFwID0gUmVuZGVyQ29udHJvbGxlci5EZWZhdWx0TWFwLm9yaWdpbjtcbiAgICB0aGlzLl9vdXRwdXQgPSBbXTtcbn1cblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShWaWV3LnByb3RvdHlwZSk7XG5SZW5kZXJDb250cm9sbGVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlbmRlckNvbnRyb2xsZXI7XG5SZW5kZXJDb250cm9sbGVyLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBpblRyYW5zaXRpb246IHRydWUsXG4gICAgb3V0VHJhbnNpdGlvbjogdHJ1ZSxcbiAgICBvdmVybGFwOiB0cnVlXG59O1xuUmVuZGVyQ29udHJvbGxlci5EZWZhdWx0TWFwID0ge1xuICAgIHRyYW5zZm9ybTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gVHJhbnNmb3JtLmlkZW50aXR5O1xuICAgIH0sXG4gICAgb3BhY2l0eTogZnVuY3Rpb24gKHByb2dyZXNzKSB7XG4gICAgICAgIHJldHVybiBwcm9ncmVzcztcbiAgICB9LFxuICAgIG9yaWdpbjogbnVsbFxufTtcbmZ1bmN0aW9uIF9tYXBwZWRTdGF0ZShtYXAsIHN0YXRlKSB7XG4gICAgcmV0dXJuIG1hcChzdGF0ZS5nZXQoKSk7XG59XG5SZW5kZXJDb250cm9sbGVyLnByb3RvdHlwZS5pblRyYW5zZm9ybUZyb20gPSBmdW5jdGlvbiBpblRyYW5zZm9ybUZyb20odHJhbnNmb3JtKSB7XG4gICAgaWYgKHRyYW5zZm9ybSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLmluVHJhbnNmb3JtTWFwID0gdHJhbnNmb3JtO1xuICAgIGVsc2UgaWYgKHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uZ2V0KVxuICAgICAgICB0aGlzLmluVHJhbnNmb3JtTWFwID0gdHJhbnNmb3JtLmdldC5iaW5kKHRyYW5zZm9ybSk7XG4gICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2luVHJhbnNmb3JtRnJvbSB0YWtlcyBvbmx5IGZ1bmN0aW9uIG9yIGdldHRlciBvYmplY3QnKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5SZW5kZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbk9wYWNpdHlGcm9tID0gZnVuY3Rpb24gaW5PcGFjaXR5RnJvbShvcGFjaXR5KSB7XG4gICAgaWYgKG9wYWNpdHkgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5pbk9wYWNpdHlNYXAgPSBvcGFjaXR5O1xuICAgIGVsc2UgaWYgKG9wYWNpdHkgJiYgb3BhY2l0eS5nZXQpXG4gICAgICAgIHRoaXMuaW5PcGFjaXR5TWFwID0gb3BhY2l0eS5nZXQuYmluZChvcGFjaXR5KTtcbiAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW5PcGFjaXR5RnJvbSB0YWtlcyBvbmx5IGZ1bmN0aW9uIG9yIGdldHRlciBvYmplY3QnKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5SZW5kZXJDb250cm9sbGVyLnByb3RvdHlwZS5pbk9yaWdpbkZyb20gPSBmdW5jdGlvbiBpbk9yaWdpbkZyb20ob3JpZ2luKSB7XG4gICAgaWYgKG9yaWdpbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLmluT3JpZ2luTWFwID0gb3JpZ2luO1xuICAgIGVsc2UgaWYgKG9yaWdpbiAmJiBvcmlnaW4uZ2V0KVxuICAgICAgICB0aGlzLmluT3JpZ2luTWFwID0gb3JpZ2luLmdldC5iaW5kKG9yaWdpbik7XG4gICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2luT3JpZ2luRnJvbSB0YWtlcyBvbmx5IGZ1bmN0aW9uIG9yIGdldHRlciBvYmplY3QnKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5SZW5kZXJDb250cm9sbGVyLnByb3RvdHlwZS5vdXRUcmFuc2Zvcm1Gcm9tID0gZnVuY3Rpb24gb3V0VHJhbnNmb3JtRnJvbSh0cmFuc2Zvcm0pIHtcbiAgICBpZiAodHJhbnNmb3JtIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMub3V0VHJhbnNmb3JtTWFwID0gdHJhbnNmb3JtO1xuICAgIGVsc2UgaWYgKHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0uZ2V0KVxuICAgICAgICB0aGlzLm91dFRyYW5zZm9ybU1hcCA9IHRyYW5zZm9ybS5nZXQuYmluZCh0cmFuc2Zvcm0pO1xuICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvdXRUcmFuc2Zvcm1Gcm9tIHRha2VzIG9ubHkgZnVuY3Rpb24gb3IgZ2V0dGVyIG9iamVjdCcpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlLm91dE9wYWNpdHlGcm9tID0gZnVuY3Rpb24gb3V0T3BhY2l0eUZyb20ob3BhY2l0eSkge1xuICAgIGlmIChvcGFjaXR5IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMub3V0T3BhY2l0eU1hcCA9IG9wYWNpdHk7XG4gICAgZWxzZSBpZiAob3BhY2l0eSAmJiBvcGFjaXR5LmdldClcbiAgICAgICAgdGhpcy5vdXRPcGFjaXR5TWFwID0gb3BhY2l0eS5nZXQuYmluZChvcGFjaXR5KTtcbiAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignb3V0T3BhY2l0eUZyb20gdGFrZXMgb25seSBmdW5jdGlvbiBvciBnZXR0ZXIgb2JqZWN0Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuUmVuZGVyQ29udHJvbGxlci5wcm90b3R5cGUub3V0T3JpZ2luRnJvbSA9IGZ1bmN0aW9uIG91dE9yaWdpbkZyb20ob3JpZ2luKSB7XG4gICAgaWYgKG9yaWdpbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLm91dE9yaWdpbk1hcCA9IG9yaWdpbjtcbiAgICBlbHNlIGlmIChvcmlnaW4gJiYgb3JpZ2luLmdldClcbiAgICAgICAgdGhpcy5vdXRPcmlnaW5NYXAgPSBvcmlnaW4uZ2V0LmJpbmQob3JpZ2luKTtcbiAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignb3V0T3JpZ2luRnJvbSB0YWtlcyBvbmx5IGZ1bmN0aW9uIG9yIGdldHRlciBvYmplY3QnKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5SZW5kZXJDb250cm9sbGVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gc2hvdyhyZW5kZXJhYmxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICghcmVuZGVyYWJsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWRlKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgaWYgKHRyYW5zaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICBjYWxsYmFjayA9IHRyYW5zaXRpb247XG4gICAgICAgIHRyYW5zaXRpb24gPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2hvd2luZyA+PSAwKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMub3ZlcmxhcClcbiAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0UmVuZGVyYWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRSZW5kZXJhYmxlID0gcmVuZGVyYWJsZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dFJlbmRlcmFibGUgPSByZW5kZXJhYmxlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9uZXh0UmVuZGVyYWJsZSA9PT0gcmVuZGVyYWJsZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvdyh0aGlzLl9uZXh0UmVuZGVyYWJsZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXh0UmVuZGVyYWJsZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBzdGF0ZSA9IG51bGw7XG4gICAgdmFyIHJlbmRlcmFibGVJbmRleCA9IHRoaXMuX3JlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XG4gICAgaWYgKHJlbmRlcmFibGVJbmRleCA+PSAwKSB7XG4gICAgICAgIHRoaXMuX3Nob3dpbmcgPSByZW5kZXJhYmxlSW5kZXg7XG4gICAgICAgIHN0YXRlID0gdGhpcy5fc3RhdGVzW3JlbmRlcmFibGVJbmRleF07XG4gICAgICAgIHN0YXRlLmhhbHQoKTtcbiAgICAgICAgdmFyIG91dGdvaW5nSW5kZXggPSB0aGlzLl9vdXRnb2luZ1JlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSk7XG4gICAgICAgIGlmIChvdXRnb2luZ0luZGV4ID49IDApXG4gICAgICAgICAgICB0aGlzLl9vdXRnb2luZ1JlbmRlcmFibGVzLnNwbGljZShvdXRnb2luZ0luZGV4LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSgwKTtcbiAgICAgICAgdmFyIG1vZGlmaWVyID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRoaXMuaW5UcmFuc2Zvcm1NYXAgPyBfbWFwcGVkU3RhdGUuYmluZCh0aGlzLCB0aGlzLmluVHJhbnNmb3JtTWFwLCBzdGF0ZSkgOiBudWxsLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IHRoaXMuaW5PcGFjaXR5TWFwID8gX21hcHBlZFN0YXRlLmJpbmQodGhpcywgdGhpcy5pbk9wYWNpdHlNYXAsIHN0YXRlKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgb3JpZ2luOiB0aGlzLmluT3JpZ2luTWFwID8gX21hcHBlZFN0YXRlLmJpbmQodGhpcywgdGhpcy5pbk9yaWdpbk1hcCwgc3RhdGUpIDogbnVsbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciBub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICAgICAgbm9kZS5hZGQobW9kaWZpZXIpLmFkZChyZW5kZXJhYmxlKTtcbiAgICAgICAgdGhpcy5fc2hvd2luZyA9IHRoaXMuX25vZGVzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5fbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgdGhpcy5fbW9kaWZpZXJzLnB1c2gobW9kaWZpZXIpO1xuICAgICAgICB0aGlzLl9zdGF0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmFibGVzLnB1c2gocmVuZGVyYWJsZSk7XG4gICAgfVxuICAgIGlmICghdHJhbnNpdGlvbilcbiAgICAgICAgdHJhbnNpdGlvbiA9IHRoaXMub3B0aW9ucy5pblRyYW5zaXRpb247XG4gICAgc3RhdGUuc2V0KDEsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5SZW5kZXJDb250cm9sbGVyLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gaGlkZSh0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLl9zaG93aW5nIDwgMClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBpbmRleCA9IHRoaXMuX3Nob3dpbmc7XG4gICAgdGhpcy5fc2hvd2luZyA9IC0xO1xuICAgIGlmICh0cmFuc2l0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgY2FsbGJhY2sgPSB0cmFuc2l0aW9uO1xuICAgICAgICB0cmFuc2l0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgbm9kZSA9IHRoaXMuX25vZGVzW2luZGV4XTtcbiAgICB2YXIgbW9kaWZpZXIgPSB0aGlzLl9tb2RpZmllcnNbaW5kZXhdO1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuX3N0YXRlc1tpbmRleF07XG4gICAgdmFyIHJlbmRlcmFibGUgPSB0aGlzLl9yZW5kZXJhYmxlc1tpbmRleF07XG4gICAgbW9kaWZpZXIudHJhbnNmb3JtRnJvbSh0aGlzLm91dFRyYW5zZm9ybU1hcCA/IF9tYXBwZWRTdGF0ZS5iaW5kKHRoaXMsIHRoaXMub3V0VHJhbnNmb3JtTWFwLCBzdGF0ZSkgOiBudWxsKTtcbiAgICBtb2RpZmllci5vcGFjaXR5RnJvbSh0aGlzLm91dE9wYWNpdHlNYXAgPyBfbWFwcGVkU3RhdGUuYmluZCh0aGlzLCB0aGlzLm91dE9wYWNpdHlNYXAsIHN0YXRlKSA6IG51bGwpO1xuICAgIG1vZGlmaWVyLm9yaWdpbkZyb20odGhpcy5vdXRPcmlnaW5NYXAgPyBfbWFwcGVkU3RhdGUuYmluZCh0aGlzLCB0aGlzLm91dE9yaWdpbk1hcCwgc3RhdGUpIDogbnVsbCk7XG4gICAgaWYgKHRoaXMuX291dGdvaW5nUmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKSA8IDApXG4gICAgICAgIHRoaXMuX291dGdvaW5nUmVuZGVyYWJsZXMucHVzaChyZW5kZXJhYmxlKTtcbiAgICBpZiAoIXRyYW5zaXRpb24pXG4gICAgICAgIHRyYW5zaXRpb24gPSB0aGlzLm9wdGlvbnMub3V0VHJhbnNpdGlvbjtcbiAgICBzdGF0ZS5oYWx0KCk7XG4gICAgc3RhdGUuc2V0KDAsIHRyYW5zaXRpb24sIGZ1bmN0aW9uIChub2RlLCBtb2RpZmllciwgc3RhdGUsIHJlbmRlcmFibGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX291dGdvaW5nUmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKSA+PSAwKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9ub2Rlcy5pbmRleE9mKG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5fbm9kZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuX21vZGlmaWVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fb3V0Z29pbmdSZW5kZXJhYmxlcy5zcGxpY2UodGhpcy5fb3V0Z29pbmdSZW5kZXJhYmxlcy5pbmRleE9mKHJlbmRlcmFibGUpLCAxKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zaG93aW5nID49IGluZGV4KVxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dpbmctLTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgIH0uYmluZCh0aGlzLCBub2RlLCBtb2RpZmllciwgc3RhdGUsIHJlbmRlcmFibGUpKTtcbn07XG5SZW5kZXJDb250cm9sbGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMuX291dHB1dDtcbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IHRoaXMuX25vZGVzLmxlbmd0aClcbiAgICAgICAgcmVzdWx0LnNwbGljZSh0aGlzLl9ub2Rlcy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gdGhpcy5fbm9kZXNbaV0ucmVuZGVyKCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBSZW5kZXJDb250cm9sbGVyOyIsInZhciBDb250YWluZXJTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL3N1cmZhY2VzL0NvbnRhaW5lclN1cmZhY2UnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBTY3JvbGx2aWV3ID0gcmVxdWlyZSgnLi9TY3JvbGx2aWV3Jyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eScpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbmZ1bmN0aW9uIFNjcm9sbENvbnRhaW5lcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShTY3JvbGxDb250YWluZXIuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5jb250YWluZXIgPSBuZXcgQ29udGFpbmVyU3VyZmFjZSh0aGlzLm9wdGlvbnMuY29udGFpbmVyKTtcbiAgICB0aGlzLnNjcm9sbHZpZXcgPSBuZXcgU2Nyb2xsdmlldyh0aGlzLm9wdGlvbnMuc2Nyb2xsdmlldyk7XG4gICAgdGhpcy5jb250YWluZXIuYWRkKHRoaXMuc2Nyb2xsdmlldyk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50SW5wdXQpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQucGlwZSh0aGlzLnNjcm9sbHZpZXcpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB0aGlzLmNvbnRhaW5lci5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB0aGlzLnNjcm9sbHZpZXcucGlwZSh0aGlzLl9ldmVudE91dHB1dCk7XG59XG5TY3JvbGxDb250YWluZXIuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGNvbnRhaW5lcjogeyBwcm9wZXJ0aWVzOiB7IG92ZXJmbG93OiAnaGlkZGVuJyB9IH0sXG4gICAgc2Nyb2xsdmlldzoge31cbn07XG5TY3JvbGxDb250YWluZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5TY3JvbGxDb250YWluZXIucHJvdG90eXBlLnNlcXVlbmNlRnJvbSA9IGZ1bmN0aW9uIHNlcXVlbmNlRnJvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5zY3JvbGx2aWV3LnNlcXVlbmNlRnJvbS5hcHBseSh0aGlzLnNjcm9sbHZpZXcsIGFyZ3VtZW50cyk7XG59O1xuU2Nyb2xsQ29udGFpbmVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuZ2V0U2l6ZS5hcHBseSh0aGlzLmNvbnRhaW5lciwgYXJndW1lbnRzKTtcbn07XG5TY3JvbGxDb250YWluZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIucmVuZGVyKCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxDb250YWluZXI7IiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0VudGl0eScpO1xudmFyIEdyb3VwID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvR3JvdXAnKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eScpO1xudmFyIFZpZXdTZXF1ZW5jZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1ZpZXdTZXF1ZW5jZScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gU2Nyb2xsZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fbm9kZSA9IG51bGw7XG4gICAgdGhpcy5fcG9zaXRpb24gPSAwO1xuICAgIHRoaXMuX3Bvc2l0aW9uT2Zmc2V0ID0gMDtcbiAgICB0aGlzLl9wb3NpdGlvbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3V0cHV0RnVuY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuX21hc3Rlck91dHB1dEZ1bmN0aW9uID0gbnVsbDtcbiAgICB0aGlzLm91dHB1dEZyb20oKTtcbiAgICB0aGlzLl9vbkVkZ2UgPSAwO1xuICAgIHRoaXMuZ3JvdXAgPSBuZXcgR3JvdXAoKTtcbiAgICB0aGlzLmdyb3VwLmFkZCh7IHJlbmRlcjogX2lubmVyUmVuZGVyLmJpbmQodGhpcykgfSk7XG4gICAgdGhpcy5fZW50aXR5SWQgPSBFbnRpdHkucmVnaXN0ZXIodGhpcyk7XG4gICAgdGhpcy5fc2l6ZSA9IFtcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICB1bmRlZmluZWRcbiAgICBdO1xuICAgIHRoaXMuX2NvbnRleHRTaXplID0gW1xuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHVuZGVmaW5lZFxuICAgIF07XG4gICAgdGhpcy5fZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50SW5wdXQpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cblNjcm9sbGVyLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBkaXJlY3Rpb246IFV0aWxpdHkuRGlyZWN0aW9uLlksXG4gICAgbWFyZ2luOiAwLFxuICAgIGNsaXBTaXplOiB1bmRlZmluZWQsXG4gICAgZ3JvdXBTY3JvbGw6IGZhbHNlXG59O1xudmFyIEVER0VfVE9MRVJBTkNFID0gMDtcbmZ1bmN0aW9uIF9zaXplRm9yRGlyKHNpemUpIHtcbiAgICBpZiAoIXNpemUpXG4gICAgICAgIHNpemUgPSB0aGlzLl9jb250ZXh0U2l6ZTtcbiAgICB2YXIgZGltZW5zaW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbjtcbiAgICByZXR1cm4gc2l6ZVtkaW1lbnNpb25dID09PSB1bmRlZmluZWQgPyB0aGlzLl9jb250ZXh0U2l6ZVtkaW1lbnNpb25dIDogc2l6ZVtkaW1lbnNpb25dO1xufVxuZnVuY3Rpb24gX291dHB1dChub2RlLCBvZmZzZXQsIHRhcmdldCkge1xuICAgIHZhciBzaXplID0gbm9kZS5nZXRTaXplID8gbm9kZS5nZXRTaXplKCkgOiB0aGlzLl9jb250ZXh0U2l6ZTtcbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5fb3V0cHV0RnVuY3Rpb24ob2Zmc2V0KTtcbiAgICB0YXJnZXQucHVzaCh7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICB0YXJnZXQ6IG5vZGUucmVuZGVyKClcbiAgICB9KTtcbiAgICByZXR1cm4gX3NpemVGb3JEaXIuY2FsbCh0aGlzLCBzaXplKTtcbn1cbmZ1bmN0aW9uIF9nZXRDbGlwU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmNsaXBTaXplICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2xpcFNpemU7XG4gICAgaWYgKHRoaXMuX2NvbnRleHRTaXplW3RoaXMub3B0aW9ucy5kaXJlY3Rpb25dID4gdGhpcy5nZXRDdW11bGF0aXZlU2l6ZSgpW3RoaXMub3B0aW9ucy5kaXJlY3Rpb25dKSB7XG4gICAgICAgIHJldHVybiBfc2l6ZUZvckRpci5jYWxsKHRoaXMsIHRoaXMuZ2V0Q3VtdWxhdGl2ZVNpemUoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIF9zaXplRm9yRGlyLmNhbGwodGhpcywgdGhpcy5fY29udGV4dFNpemUpO1xuICAgIH1cbn1cblNjcm9sbGVyLnByb3RvdHlwZS5nZXRDdW11bGF0aXZlU2l6ZSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBpbmRleCA9IHRoaXMuX25vZGUuXy5jdW11bGF0aXZlU2l6ZXMubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gdGhpcy5fbm9kZS5fLmdldFNpemUoaW5kZXgpO1xufTtcblNjcm9sbGVyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuZ3JvdXBTY3JvbGwgIT09IHRoaXMub3B0aW9ucy5ncm91cFNjcm9sbCkge1xuICAgICAgICBpZiAob3B0aW9ucy5ncm91cFNjcm9sbClcbiAgICAgICAgICAgIHRoaXMuZ3JvdXAucGlwZSh0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZ3JvdXAudW5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB9XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5TY3JvbGxlci5wcm90b3R5cGUub25FZGdlID0gZnVuY3Rpb24gb25FZGdlKCkge1xuICAgIHJldHVybiB0aGlzLl9vbkVkZ2U7XG59O1xuU2Nyb2xsZXIucHJvdG90eXBlLm91dHB1dEZyb20gPSBmdW5jdGlvbiBvdXRwdXRGcm9tKGZuLCBtYXN0ZXJGbikge1xuICAgIGlmICghZm4pIHtcbiAgICAgICAgZm4gPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVXRpbGl0eS5EaXJlY3Rpb24uWCA/IFRyYW5zZm9ybS50cmFuc2xhdGUob2Zmc2V0LCAwKSA6IFRyYW5zZm9ybS50cmFuc2xhdGUoMCwgb2Zmc2V0KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAgICBpZiAoIW1hc3RlckZuKVxuICAgICAgICAgICAgbWFzdGVyRm4gPSBmbjtcbiAgICB9XG4gICAgdGhpcy5fb3V0cHV0RnVuY3Rpb24gPSBmbjtcbiAgICB0aGlzLl9tYXN0ZXJPdXRwdXRGdW5jdGlvbiA9IG1hc3RlckZuID8gbWFzdGVyRm4gOiBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBUcmFuc2Zvcm0uaW52ZXJzZShmbigtb2Zmc2V0KSk7XG4gICAgfTtcbn07XG5TY3JvbGxlci5wcm90b3R5cGUucG9zaXRpb25Gcm9tID0gZnVuY3Rpb24gcG9zaXRpb25Gcm9tKHBvc2l0aW9uKSB7XG4gICAgaWYgKHBvc2l0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uR2V0dGVyID0gcG9zaXRpb247XG4gICAgZWxzZSBpZiAocG9zaXRpb24gJiYgcG9zaXRpb24uZ2V0KVxuICAgICAgICB0aGlzLl9wb3NpdGlvbkdldHRlciA9IHBvc2l0aW9uLmdldC5iaW5kKHBvc2l0aW9uKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcG9zaXRpb25HZXR0ZXIpXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fcG9zaXRpb25HZXR0ZXIuY2FsbCh0aGlzKTtcbn07XG5TY3JvbGxlci5wcm90b3R5cGUuc2VxdWVuY2VGcm9tID0gZnVuY3Rpb24gc2VxdWVuY2VGcm9tKG5vZGUpIHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICBub2RlID0gbmV3IFZpZXdTZXF1ZW5jZSh7IGFycmF5OiBub2RlIH0pO1xuICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIHRoaXMuX3Bvc2l0aW9uT2Zmc2V0ID0gMDtcbn07XG5TY3JvbGxlci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoYWN0dWFsKSB7XG4gICAgcmV0dXJuIGFjdHVhbCA/IHRoaXMuX2NvbnRleHRTaXplIDogdGhpcy5fc2l6ZTtcbn07XG5TY3JvbGxlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5fbm9kZSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uR2V0dGVyKVxuICAgICAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uR2V0dGVyLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuX2VudGl0eUlkO1xufTtcblNjcm9sbGVyLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciB0cmFuc2Zvcm0gPSBjb250ZXh0LnRyYW5zZm9ybTtcbiAgICB2YXIgb3BhY2l0eSA9IGNvbnRleHQub3BhY2l0eTtcbiAgICB2YXIgb3JpZ2luID0gY29udGV4dC5vcmlnaW47XG4gICAgdmFyIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2xpcFNpemUgJiYgKHNpemVbMF0gIT09IHRoaXMuX2NvbnRleHRTaXplWzBdIHx8IHNpemVbMV0gIT09IHRoaXMuX2NvbnRleHRTaXplWzFdKSkge1xuICAgICAgICB0aGlzLl9vbkVkZ2UgPSAwO1xuICAgICAgICB0aGlzLl9jb250ZXh0U2l6ZVswXSA9IHNpemVbMF07XG4gICAgICAgIHRoaXMuX2NvbnRleHRTaXplWzFdID0gc2l6ZVsxXTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFV0aWxpdHkuRGlyZWN0aW9uLlgpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpemVbMF0gPSBfZ2V0Q2xpcFNpemUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3NpemVbMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zaXplWzBdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5fc2l6ZVsxXSA9IF9nZXRDbGlwU2l6ZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBzY3JvbGxUcmFuc2Zvcm0gPSB0aGlzLl9tYXN0ZXJPdXRwdXRGdW5jdGlvbigtdGhpcy5fcG9zaXRpb24pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLm11bHRpcGx5KHRyYW5zZm9ybSwgc2Nyb2xsVHJhbnNmb3JtKSxcbiAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgb3JpZ2luOiBvcmlnaW4sXG4gICAgICAgIHRhcmdldDogdGhpcy5ncm91cC5yZW5kZXIoKVxuICAgIH07XG59O1xuZnVuY3Rpb24gX2lubmVyUmVuZGVyKCkge1xuICAgIHZhciBzaXplID0gbnVsbDtcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIG9mZnNldCA9IC10aGlzLl9wb3NpdGlvbk9mZnNldDtcbiAgICB2YXIgY2xpcFNpemUgPSBfZ2V0Q2xpcFNpemUuY2FsbCh0aGlzKTtcbiAgICB2YXIgY3Vyck5vZGUgPSB0aGlzLl9ub2RlO1xuICAgIHdoaWxlIChjdXJyTm9kZSAmJiBvZmZzZXQgLSBwb3NpdGlvbiA8IGNsaXBTaXplICsgdGhpcy5vcHRpb25zLm1hcmdpbikge1xuICAgICAgICBvZmZzZXQgKz0gX291dHB1dC5jYWxsKHRoaXMsIGN1cnJOb2RlLCBvZmZzZXQsIHJlc3VsdCk7XG4gICAgICAgIGN1cnJOb2RlID0gY3Vyck5vZGUuZ2V0TmV4dCA/IGN1cnJOb2RlLmdldE5leHQoKSA6IG51bGw7XG4gICAgfVxuICAgIHZhciBzaXplTm9kZSA9IHRoaXMuX25vZGU7XG4gICAgdmFyIG5vZGVzU2l6ZSA9IF9zaXplRm9yRGlyLmNhbGwodGhpcywgc2l6ZU5vZGUuZ2V0U2l6ZSgpKTtcbiAgICBpZiAob2Zmc2V0IDwgY2xpcFNpemUpIHtcbiAgICAgICAgd2hpbGUgKHNpemVOb2RlICYmIG5vZGVzU2l6ZSA8IGNsaXBTaXplKSB7XG4gICAgICAgICAgICBzaXplTm9kZSA9IHNpemVOb2RlLmdldFByZXZpb3VzKCk7XG4gICAgICAgICAgICBpZiAoc2l6ZU5vZGUpXG4gICAgICAgICAgICAgICAgbm9kZXNTaXplICs9IF9zaXplRm9yRGlyLmNhbGwodGhpcywgc2l6ZU5vZGUuZ2V0U2l6ZSgpKTtcbiAgICAgICAgfVxuICAgICAgICBzaXplTm9kZSA9IHRoaXMuX25vZGU7XG4gICAgICAgIHdoaWxlIChzaXplTm9kZSAmJiBub2Rlc1NpemUgPCBjbGlwU2l6ZSkge1xuICAgICAgICAgICAgc2l6ZU5vZGUgPSBzaXplTm9kZS5nZXROZXh0KCk7XG4gICAgICAgICAgICBpZiAoc2l6ZU5vZGUpXG4gICAgICAgICAgICAgICAgbm9kZXNTaXplICs9IF9zaXplRm9yRGlyLmNhbGwodGhpcywgc2l6ZU5vZGUuZ2V0U2l6ZSgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWN1cnJOb2RlICYmIG9mZnNldCAtIHBvc2l0aW9uIDwgY2xpcFNpemUgLSBFREdFX1RPTEVSQU5DRSkge1xuICAgICAgICBpZiAodGhpcy5fb25FZGdlICE9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9vbkVkZ2UgPSAxO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnb25FZGdlJywgeyBwb3NpdGlvbjogb2Zmc2V0IC0gY2xpcFNpemUgfSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9ub2RlLmdldFByZXZpb3VzKCkgJiYgcG9zaXRpb24gPCAtRURHRV9UT0xFUkFOQ0UpIHtcbiAgICAgICAgaWYgKHRoaXMuX29uRWRnZSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX29uRWRnZSA9IC0xO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnb25FZGdlJywgeyBwb3NpdGlvbjogMCB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9vbkVkZ2UgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX29uRWRnZSA9IDA7XG4gICAgICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdvZmZFZGdlJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3Vyck5vZGUgPSB0aGlzLl9ub2RlICYmIHRoaXMuX25vZGUuZ2V0UHJldmlvdXMgPyB0aGlzLl9ub2RlLmdldFByZXZpb3VzKCkgOiBudWxsO1xuICAgIG9mZnNldCA9IC10aGlzLl9wb3NpdGlvbk9mZnNldDtcbiAgICBpZiAoY3Vyck5vZGUpIHtcbiAgICAgICAgc2l6ZSA9IGN1cnJOb2RlLmdldFNpemUgPyBjdXJyTm9kZS5nZXRTaXplKCkgOiB0aGlzLl9jb250ZXh0U2l6ZTtcbiAgICAgICAgb2Zmc2V0IC09IF9zaXplRm9yRGlyLmNhbGwodGhpcywgc2l6ZSk7XG4gICAgfVxuICAgIHdoaWxlIChjdXJyTm9kZSAmJiBvZmZzZXQgLSBwb3NpdGlvbiA+IC0oY2xpcFNpemUgKyB0aGlzLm9wdGlvbnMubWFyZ2luKSkge1xuICAgICAgICBfb3V0cHV0LmNhbGwodGhpcywgY3Vyck5vZGUsIG9mZnNldCwgcmVzdWx0KTtcbiAgICAgICAgY3Vyck5vZGUgPSBjdXJyTm9kZS5nZXRQcmV2aW91cyA/IGN1cnJOb2RlLmdldFByZXZpb3VzKCkgOiBudWxsO1xuICAgICAgICBpZiAoY3Vyck5vZGUpIHtcbiAgICAgICAgICAgIHNpemUgPSBjdXJyTm9kZS5nZXRTaXplID8gY3Vyck5vZGUuZ2V0U2l6ZSgpIDogdGhpcy5fY29udGV4dFNpemU7XG4gICAgICAgICAgICBvZmZzZXQgLT0gX3NpemVGb3JEaXIuY2FsbCh0aGlzLCBzaXplKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxlcjsiLCJ2YXIgUGh5c2ljc0VuZ2luZSA9IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL1BoeXNpY3NFbmdpbmUnKTtcbnZhciBQYXJ0aWNsZSA9IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2JvZGllcy9QYXJ0aWNsZScpO1xudmFyIERyYWcgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9mb3JjZXMvRHJhZycpO1xudmFyIFNwcmluZyA9IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9TcHJpbmcnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgVmlld1NlcXVlbmNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVmlld1NlcXVlbmNlJyk7XG52YXIgU2Nyb2xsZXIgPSByZXF1aXJlKCdmYW1vdXMvdmlld3MvU2Nyb2xsZXInKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG52YXIgR2VuZXJpY1N5bmMgPSByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL0dlbmVyaWNTeW5jJyk7XG52YXIgU2Nyb2xsU3luYyA9IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvU2Nyb2xsU3luYycpO1xudmFyIFRvdWNoU3luYyA9IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvVG91Y2hTeW5jJyk7XG5HZW5lcmljU3luYy5yZWdpc3Rlcih7XG4gICAgc2Nyb2xsOiBTY3JvbGxTeW5jLFxuICAgIHRvdWNoOiBUb3VjaFN5bmNcbn0pO1xudmFyIFRPTEVSQU5DRSA9IDAuNTtcbnZhciBTcHJpbmdTdGF0ZXMgPSB7XG4gICAgICAgIE5PTkU6IDAsXG4gICAgICAgIEVER0U6IDEsXG4gICAgICAgIFBBR0U6IDJcbiAgICB9O1xudmFyIEVkZ2VTdGF0ZXMgPSB7XG4gICAgICAgIFRPUDogLTEsXG4gICAgICAgIE5PTkU6IDAsXG4gICAgICAgIEJPVFRPTTogMVxuICAgIH07XG5mdW5jdGlvbiBTY3JvbGx2aWV3KG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFNjcm9sbHZpZXcuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuX3Njcm9sbGVyID0gbmV3IFNjcm9sbGVyKHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5zeW5jID0gbmV3IEdlbmVyaWNTeW5jKFtcbiAgICAgICAgJ3Njcm9sbCcsXG4gICAgICAgICd0b3VjaCdcbiAgICBdLCB7XG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5vcHRpb25zLmRpcmVjdGlvbixcbiAgICAgICAgc2NhbGU6IHRoaXMub3B0aW9ucy5zeW5jU2NhbGUsXG4gICAgICAgIHJhaWxzOiB0aGlzLm9wdGlvbnMucmFpbHMsXG4gICAgICAgIHByZXZlbnREZWZhdWx0OiB0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHRcbiAgICB9KTtcbiAgICB0aGlzLl9waHlzaWNzRW5naW5lID0gbmV3IFBoeXNpY3NFbmdpbmUoKTtcbiAgICB0aGlzLl9wYXJ0aWNsZSA9IG5ldyBQYXJ0aWNsZSgpO1xuICAgIHRoaXMuX3BoeXNpY3NFbmdpbmUuYWRkQm9keSh0aGlzLl9wYXJ0aWNsZSk7XG4gICAgdGhpcy5zcHJpbmcgPSBuZXcgU3ByaW5nKHtcbiAgICAgICAgYW5jaG9yOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgcGVyaW9kOiB0aGlzLm9wdGlvbnMuZWRnZVBlcmlvZCxcbiAgICAgICAgZGFtcGluZ1JhdGlvOiB0aGlzLm9wdGlvbnMuZWRnZURhbXBcbiAgICB9KTtcbiAgICB0aGlzLmRyYWcgPSBuZXcgRHJhZyh7XG4gICAgICAgIGZvcmNlRnVuY3Rpb246IERyYWcuRk9SQ0VfRlVOQ1RJT05TLlFVQURSQVRJQyxcbiAgICAgICAgc3RyZW5ndGg6IHRoaXMub3B0aW9ucy5kcmFnXG4gICAgfSk7XG4gICAgdGhpcy5mcmljdGlvbiA9IG5ldyBEcmFnKHtcbiAgICAgICAgZm9yY2VGdW5jdGlvbjogRHJhZy5GT1JDRV9GVU5DVElPTlMuTElORUFSLFxuICAgICAgICBzdHJlbmd0aDogdGhpcy5vcHRpb25zLmZyaWN0aW9uXG4gICAgfSk7XG4gICAgdGhpcy5fbm9kZSA9IG51bGw7XG4gICAgdGhpcy5fdG91Y2hDb3VudCA9IDA7XG4gICAgdGhpcy5fc3ByaW5nU3RhdGUgPSBTcHJpbmdTdGF0ZXMuTk9ORTtcbiAgICB0aGlzLl9vbkVkZ2UgPSBFZGdlU3RhdGVzLk5PTkU7XG4gICAgdGhpcy5fcGFnZVNwcmluZ1Bvc2l0aW9uID0gMDtcbiAgICB0aGlzLl9lZGdlU3ByaW5nUG9zaXRpb24gPSAwO1xuICAgIHRoaXMuX3RvdWNoVmVsb2NpdHkgPSAwO1xuICAgIHRoaXMuX2Vhcmx5RW5kID0gZmFsc2U7XG4gICAgdGhpcy5fbmVlZHNQYWdpbmF0aW9uQ2hlY2sgPSBmYWxzZTtcbiAgICB0aGlzLl9kaXNwbGFjZW1lbnQgPSAwO1xuICAgIHRoaXMuX3RvdGFsU2hpZnQgPSAwO1xuICAgIHRoaXMuX2NhY2hlZEluZGV4ID0gMDtcbiAgICB0aGlzLl9zY3JvbGxlci5wb3NpdGlvbkZyb20odGhpcy5nZXRQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQucGlwZSh0aGlzLnN5bmMpO1xuICAgIHRoaXMuc3luYy5waXBlKHRoaXMuX2V2ZW50SW5wdXQpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIF9iaW5kRXZlbnRzLmNhbGwodGhpcyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn1cblNjcm9sbHZpZXcuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpcmVjdGlvbjogVXRpbGl0eS5EaXJlY3Rpb24uWSxcbiAgICByYWlsczogdHJ1ZSxcbiAgICBmcmljdGlvbjogMC4wMDUsXG4gICAgZHJhZzogMC4wMDAxLFxuICAgIGVkZ2VHcmlwOiAwLjIsXG4gICAgZWRnZVBlcmlvZDogMzAwLFxuICAgIGVkZ2VEYW1wOiAxLFxuICAgIG1hcmdpbjogMTAwMCxcbiAgICBwYWdpbmF0ZWQ6IGZhbHNlLFxuICAgIHBhZ2VQZXJpb2Q6IDUwMCxcbiAgICBwYWdlRGFtcDogMC44LFxuICAgIHBhZ2VTdG9wU3BlZWQ6IDEwLFxuICAgIHBhZ2VTd2l0Y2hTcGVlZDogMC41LFxuICAgIHNwZWVkTGltaXQ6IDUsXG4gICAgZ3JvdXBTY3JvbGw6IGZhbHNlLFxuICAgIHN5bmNTY2FsZTogMVxufTtcbmZ1bmN0aW9uIF9oYW5kbGVTdGFydChldmVudCkge1xuICAgIHRoaXMuX3RvdWNoQ291bnQgPSBldmVudC5jb3VudDtcbiAgICBpZiAoZXZlbnQuY291bnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5fdG91Y2hDb3VudCA9IDE7XG4gICAgX2RldGFjaEFnZW50cy5jYWxsKHRoaXMpO1xuICAgIHRoaXMuc2V0VmVsb2NpdHkoMCk7XG4gICAgdGhpcy5fdG91Y2hWZWxvY2l0eSA9IDA7XG4gICAgdGhpcy5fZWFybHlFbmQgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGV2ZW50KSB7XG4gICAgdmFyIHZlbG9jaXR5ID0gLWV2ZW50LnZlbG9jaXR5O1xuICAgIHZhciBkZWx0YSA9IC1ldmVudC5kZWx0YTtcbiAgICBpZiAodGhpcy5fb25FZGdlICE9PSBFZGdlU3RhdGVzLk5PTkUgJiYgZXZlbnQuc2xpcCkge1xuICAgICAgICBpZiAodmVsb2NpdHkgPCAwICYmIHRoaXMuX29uRWRnZSA9PT0gRWRnZVN0YXRlcy5UT1AgfHwgdmVsb2NpdHkgPiAwICYmIHRoaXMuX29uRWRnZSA9PT0gRWRnZVN0YXRlcy5CT1RUT00pIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWFybHlFbmQpIHtcbiAgICAgICAgICAgICAgICBfaGFuZGxlRW5kLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vhcmx5RW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9lYXJseUVuZCAmJiBNYXRoLmFicyh2ZWxvY2l0eSkgPiBNYXRoLmFicyh0aGlzLmdldFZlbG9jaXR5KCkpKSB7XG4gICAgICAgICAgICBfaGFuZGxlU3RhcnQuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX2Vhcmx5RW5kKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fdG91Y2hWZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIGlmIChldmVudC5zbGlwKSB7XG4gICAgICAgIHZhciBzcGVlZExpbWl0ID0gdGhpcy5vcHRpb25zLnNwZWVkTGltaXQ7XG4gICAgICAgIGlmICh2ZWxvY2l0eSA8IC1zcGVlZExpbWl0KVxuICAgICAgICAgICAgdmVsb2NpdHkgPSAtc3BlZWRMaW1pdDtcbiAgICAgICAgZWxzZSBpZiAodmVsb2NpdHkgPiBzcGVlZExpbWl0KVxuICAgICAgICAgICAgdmVsb2NpdHkgPSBzcGVlZExpbWl0O1xuICAgICAgICB0aGlzLnNldFZlbG9jaXR5KHZlbG9jaXR5KTtcbiAgICAgICAgdmFyIGRlbHRhTGltaXQgPSBzcGVlZExpbWl0ICogMTY7XG4gICAgICAgIGlmIChkZWx0YSA+IGRlbHRhTGltaXQpXG4gICAgICAgICAgICBkZWx0YSA9IGRlbHRhTGltaXQ7XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhIDwgLWRlbHRhTGltaXQpXG4gICAgICAgICAgICBkZWx0YSA9IC1kZWx0YUxpbWl0O1xuICAgIH1cbiAgICB0aGlzLnNldFBvc2l0aW9uKHRoaXMuZ2V0UG9zaXRpb24oKSArIGRlbHRhKTtcbiAgICB0aGlzLl9kaXNwbGFjZW1lbnQgKz0gZGVsdGE7XG4gICAgaWYgKHRoaXMuX3NwcmluZ1N0YXRlID09PSBTcHJpbmdTdGF0ZXMuTk9ORSlcbiAgICAgICAgX25vcm1hbGl6ZVN0YXRlLmNhbGwodGhpcyk7XG59XG5mdW5jdGlvbiBfaGFuZGxlRW5kKGV2ZW50KSB7XG4gICAgdGhpcy5fdG91Y2hDb3VudCA9IGV2ZW50LmNvdW50IHx8IDA7XG4gICAgaWYgKCF0aGlzLl90b3VjaENvdW50KSB7XG4gICAgICAgIF9kZXRhY2hBZ2VudHMuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKHRoaXMuX29uRWRnZSAhPT0gRWRnZVN0YXRlcy5OT05FKVxuICAgICAgICAgICAgX3NldFNwcmluZy5jYWxsKHRoaXMsIHRoaXMuX2VkZ2VTcHJpbmdQb3NpdGlvbiwgU3ByaW5nU3RhdGVzLkVER0UpO1xuICAgICAgICBfYXR0YWNoQWdlbnRzLmNhbGwodGhpcyk7XG4gICAgICAgIHZhciB2ZWxvY2l0eSA9IC1ldmVudC52ZWxvY2l0eTtcbiAgICAgICAgdmFyIHNwZWVkTGltaXQgPSB0aGlzLm9wdGlvbnMuc3BlZWRMaW1pdDtcbiAgICAgICAgaWYgKGV2ZW50LnNsaXApXG4gICAgICAgICAgICBzcGVlZExpbWl0ICo9IHRoaXMub3B0aW9ucy5lZGdlR3JpcDtcbiAgICAgICAgaWYgKHZlbG9jaXR5IDwgLXNwZWVkTGltaXQpXG4gICAgICAgICAgICB2ZWxvY2l0eSA9IC1zcGVlZExpbWl0O1xuICAgICAgICBlbHNlIGlmICh2ZWxvY2l0eSA+IHNwZWVkTGltaXQpXG4gICAgICAgICAgICB2ZWxvY2l0eSA9IHNwZWVkTGltaXQ7XG4gICAgICAgIHRoaXMuc2V0VmVsb2NpdHkodmVsb2NpdHkpO1xuICAgICAgICB0aGlzLl90b3VjaFZlbG9jaXR5ID0gMDtcbiAgICAgICAgdGhpcy5fbmVlZHNQYWdpbmF0aW9uQ2hlY2sgPSB0cnVlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuX2V2ZW50SW5wdXQuYmluZFRoaXModGhpcyk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbignc3RhcnQnLCBfaGFuZGxlU3RhcnQpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ3VwZGF0ZScsIF9oYW5kbGVNb3ZlKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdlbmQnLCBfaGFuZGxlRW5kKTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX25vZGUuXy5jYWxjdWxhdGVTaXplKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9zY3JvbGxlci5vbignb25FZGdlJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fZWRnZVNwcmluZ1Bvc2l0aW9uID0gZGF0YS5wb3NpdGlvbjtcbiAgICAgICAgX2hhbmRsZUVkZ2UuY2FsbCh0aGlzLCB0aGlzLl9zY3JvbGxlci5vbkVkZ2UoKSk7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ29uRWRnZScpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fc2Nyb2xsZXIub24oJ29mZkVkZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3luYy5zZXRPcHRpb25zKHsgc2NhbGU6IHRoaXMub3B0aW9ucy5zeW5jU2NhbGUgfSk7XG4gICAgICAgIHRoaXMuX29uRWRnZSA9IHRoaXMuX3Njcm9sbGVyLm9uRWRnZSgpO1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdvZmZFZGdlJyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9wYXJ0aWNsZS5vbigndXBkYXRlJywgZnVuY3Rpb24gKHBhcnRpY2xlKSB7XG4gICAgICAgIGlmICh0aGlzLl9zcHJpbmdTdGF0ZSA9PT0gU3ByaW5nU3RhdGVzLk5PTkUpXG4gICAgICAgICAgICBfbm9ybWFsaXplU3RhdGUuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZGlzcGxhY2VtZW50ID0gcGFydGljbGUucG9zaXRpb24ueCAtIHRoaXMuX3RvdGFsU2hpZnQ7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9wYXJ0aWNsZS5vbignZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5wYWdpbmF0ZWQgfHwgdGhpcy5vcHRpb25zLnBhZ2luYXRlZCAmJiB0aGlzLl9zcHJpbmdTdGF0ZSAhPT0gU3ByaW5nU3RhdGVzLk5PTkUpXG4gICAgICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzZXR0bGUnKTtcbiAgICB9LmJpbmQodGhpcykpO1xufVxuZnVuY3Rpb24gX2F0dGFjaEFnZW50cygpIHtcbiAgICBpZiAodGhpcy5fc3ByaW5nU3RhdGUpXG4gICAgICAgIHRoaXMuX3BoeXNpY3NFbmdpbmUuYXR0YWNoKFt0aGlzLnNwcmluZ10sIHRoaXMuX3BhcnRpY2xlKTtcbiAgICBlbHNlXG4gICAgICAgIHRoaXMuX3BoeXNpY3NFbmdpbmUuYXR0YWNoKFtcbiAgICAgICAgICAgIHRoaXMuZHJhZyxcbiAgICAgICAgICAgIHRoaXMuZnJpY3Rpb25cbiAgICAgICAgXSwgdGhpcy5fcGFydGljbGUpO1xufVxuZnVuY3Rpb24gX2RldGFjaEFnZW50cygpIHtcbiAgICB0aGlzLl9zcHJpbmdTdGF0ZSA9IFNwcmluZ1N0YXRlcy5OT05FO1xuICAgIHRoaXMuX3BoeXNpY3NFbmdpbmUuZGV0YWNoQWxsKCk7XG59XG5mdW5jdGlvbiBfbm9kZVNpemVGb3JEaXJlY3Rpb24obm9kZSkge1xuICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIHZhciBub2RlU2l6ZSA9IG5vZGUuZ2V0U2l6ZSgpO1xuICAgIHJldHVybiAhbm9kZVNpemUgPyB0aGlzLl9zY3JvbGxlci5nZXRTaXplKClbZGlyZWN0aW9uXSA6IG5vZGVTaXplW2RpcmVjdGlvbl07XG59XG5mdW5jdGlvbiBfaGFuZGxlRWRnZShlZGdlKSB7XG4gICAgdGhpcy5zeW5jLnNldE9wdGlvbnMoeyBzY2FsZTogdGhpcy5vcHRpb25zLmVkZ2VHcmlwIH0pO1xuICAgIHRoaXMuX29uRWRnZSA9IGVkZ2U7XG4gICAgaWYgKCF0aGlzLl90b3VjaENvdW50ICYmIHRoaXMuX3NwcmluZ1N0YXRlICE9PSBTcHJpbmdTdGF0ZXMuRURHRSkge1xuICAgICAgICBfc2V0U3ByaW5nLmNhbGwodGhpcywgdGhpcy5fZWRnZVNwcmluZ1Bvc2l0aW9uLCBTcHJpbmdTdGF0ZXMuRURHRSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zcHJpbmdTdGF0ZSAmJiBNYXRoLmFicyh0aGlzLmdldFZlbG9jaXR5KCkpIDwgMC4wMDEpIHtcbiAgICAgICAgX2RldGFjaEFnZW50cy5jYWxsKHRoaXMpO1xuICAgICAgICBfYXR0YWNoQWdlbnRzLmNhbGwodGhpcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX2hhbmRsZVBhZ2luYXRpb24oKSB7XG4gICAgaWYgKHRoaXMuX3RvdWNoQ291bnQpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAodGhpcy5fc3ByaW5nU3RhdGUgPT09IFNwcmluZ1N0YXRlcy5FREdFKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIHZlbG9jaXR5ID0gdGhpcy5nZXRWZWxvY2l0eSgpO1xuICAgIGlmIChNYXRoLmFicyh2ZWxvY2l0eSkgPj0gdGhpcy5vcHRpb25zLnBhZ2VTdG9wU3BlZWQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIHZlbG9jaXR5U3dpdGNoID0gTWF0aC5hYnModmVsb2NpdHkpID4gdGhpcy5vcHRpb25zLnBhZ2VTd2l0Y2hTcGVlZDtcbiAgICB2YXIgbm9kZVNpemUgPSBfbm9kZVNpemVGb3JEaXJlY3Rpb24uY2FsbCh0aGlzLCB0aGlzLl9ub2RlKTtcbiAgICB2YXIgcG9zaXRpb25OZXh0ID0gcG9zaXRpb24gPiAwLjUgKiBub2RlU2l6ZTtcbiAgICB2YXIgcG9zaXRpb25QcmV2ID0gcG9zaXRpb24gPCAwLjUgKiBub2RlU2l6ZTtcbiAgICB2YXIgdmVsb2NpdHlOZXh0ID0gdmVsb2NpdHkgPiAwO1xuICAgIHZhciB2ZWxvY2l0eVByZXYgPSB2ZWxvY2l0eSA8IDA7XG4gICAgdGhpcy5fbmVlZHNQYWdpbmF0aW9uQ2hlY2sgPSBmYWxzZTtcbiAgICBpZiAocG9zaXRpb25OZXh0ICYmICF2ZWxvY2l0eVN3aXRjaCB8fCB2ZWxvY2l0eVN3aXRjaCAmJiB2ZWxvY2l0eU5leHQpIHtcbiAgICAgICAgdGhpcy5nb1RvTmV4dFBhZ2UoKTtcbiAgICB9IGVsc2UgaWYgKHZlbG9jaXR5U3dpdGNoICYmIHZlbG9jaXR5UHJldikge1xuICAgICAgICB0aGlzLmdvVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9IGVsc2VcbiAgICAgICAgX3NldFNwcmluZy5jYWxsKHRoaXMsIDAsIFNwcmluZ1N0YXRlcy5QQUdFKTtcbn1cbmZ1bmN0aW9uIF9zZXRTcHJpbmcocG9zaXRpb24sIHNwcmluZ1N0YXRlKSB7XG4gICAgdmFyIHNwcmluZ09wdGlvbnM7XG4gICAgaWYgKHNwcmluZ1N0YXRlID09PSBTcHJpbmdTdGF0ZXMuRURHRSkge1xuICAgICAgICB0aGlzLl9lZGdlU3ByaW5nUG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgc3ByaW5nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGFuY2hvcjogW1xuICAgICAgICAgICAgICAgIHRoaXMuX2VkZ2VTcHJpbmdQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBwZXJpb2Q6IHRoaXMub3B0aW9ucy5lZGdlUGVyaW9kLFxuICAgICAgICAgICAgZGFtcGluZ1JhdGlvOiB0aGlzLm9wdGlvbnMuZWRnZURhbXBcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHNwcmluZ1N0YXRlID09PSBTcHJpbmdTdGF0ZXMuUEFHRSkge1xuICAgICAgICB0aGlzLl9wYWdlU3ByaW5nUG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgICAgc3ByaW5nT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGFuY2hvcjogW1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhZ2VTcHJpbmdQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBwZXJpb2Q6IHRoaXMub3B0aW9ucy5wYWdlUGVyaW9kLFxuICAgICAgICAgICAgZGFtcGluZ1JhdGlvOiB0aGlzLm9wdGlvbnMucGFnZURhbXBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5zcHJpbmcuc2V0T3B0aW9ucyhzcHJpbmdPcHRpb25zKTtcbiAgICBpZiAoc3ByaW5nU3RhdGUgJiYgIXRoaXMuX3NwcmluZ1N0YXRlKSB7XG4gICAgICAgIF9kZXRhY2hBZ2VudHMuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5fc3ByaW5nU3RhdGUgPSBzcHJpbmdTdGF0ZTtcbiAgICAgICAgX2F0dGFjaEFnZW50cy5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLl9zcHJpbmdTdGF0ZSA9IHNwcmluZ1N0YXRlO1xufVxuZnVuY3Rpb24gX25vcm1hbGl6ZVN0YXRlKCkge1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICBwb3NpdGlvbiArPSAocG9zaXRpb24gPCAwID8gLTAuNSA6IDAuNSkgPj4gMDtcbiAgICB2YXIgbm9kZVNpemUgPSBfbm9kZVNpemVGb3JEaXJlY3Rpb24uY2FsbCh0aGlzLCB0aGlzLl9ub2RlKTtcbiAgICB2YXIgbmV4dE5vZGUgPSB0aGlzLl9ub2RlLmdldE5leHQoKTtcbiAgICB3aGlsZSAob2Zmc2V0ICsgcG9zaXRpb24gPj0gbm9kZVNpemUgJiYgbmV4dE5vZGUpIHtcbiAgICAgICAgb2Zmc2V0IC09IG5vZGVTaXplO1xuICAgICAgICB0aGlzLl9zY3JvbGxlci5zZXF1ZW5jZUZyb20obmV4dE5vZGUpO1xuICAgICAgICB0aGlzLl9ub2RlID0gbmV4dE5vZGU7XG4gICAgICAgIG5leHROb2RlID0gdGhpcy5fbm9kZS5nZXROZXh0KCk7XG4gICAgICAgIG5vZGVTaXplID0gX25vZGVTaXplRm9yRGlyZWN0aW9uLmNhbGwodGhpcywgdGhpcy5fbm9kZSk7XG4gICAgfVxuICAgIHZhciBwcmV2aW91c05vZGUgPSB0aGlzLl9ub2RlLmdldFByZXZpb3VzKCk7XG4gICAgdmFyIHByZXZpb3VzTm9kZVNpemU7XG4gICAgd2hpbGUgKG9mZnNldCArIHBvc2l0aW9uIDw9IDAgJiYgcHJldmlvdXNOb2RlKSB7XG4gICAgICAgIHByZXZpb3VzTm9kZVNpemUgPSBfbm9kZVNpemVGb3JEaXJlY3Rpb24uY2FsbCh0aGlzLCBwcmV2aW91c05vZGUpO1xuICAgICAgICB0aGlzLl9zY3JvbGxlci5zZXF1ZW5jZUZyb20ocHJldmlvdXNOb2RlKTtcbiAgICAgICAgdGhpcy5fbm9kZSA9IHByZXZpb3VzTm9kZTtcbiAgICAgICAgb2Zmc2V0ICs9IHByZXZpb3VzTm9kZVNpemU7XG4gICAgICAgIHByZXZpb3VzTm9kZSA9IHRoaXMuX25vZGUuZ2V0UHJldmlvdXMoKTtcbiAgICB9XG4gICAgaWYgKG9mZnNldClcbiAgICAgICAgX3NoaWZ0T3JpZ2luLmNhbGwodGhpcywgb2Zmc2V0KTtcbiAgICBpZiAodGhpcy5fbm9kZSkge1xuICAgICAgICBpZiAodGhpcy5fbm9kZS5pbmRleCAhPT0gdGhpcy5fY2FjaGVkSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFBvc2l0aW9uKCkgPCAwLjUgKiBub2RlU2l6ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlZEluZGV4ID0gdGhpcy5fbm9kZS5pbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdwYWdlQ2hhbmdlJywge1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb246IC0xLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5fY2FjaGVkSW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFBvc2l0aW9uKCkgPiAwLjUgKiBub2RlU2l6ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhY2hlZEluZGV4ID0gdGhpcy5fbm9kZS5pbmRleCArIDE7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncGFnZUNoYW5nZScsIHtcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uOiAxLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5fY2FjaGVkSW5kZXhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIF9zaGlmdE9yaWdpbihhbW91bnQpIHtcbiAgICB0aGlzLl9lZGdlU3ByaW5nUG9zaXRpb24gKz0gYW1vdW50O1xuICAgIHRoaXMuX3BhZ2VTcHJpbmdQb3NpdGlvbiArPSBhbW91bnQ7XG4gICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLmdldFBvc2l0aW9uKCkgKyBhbW91bnQpO1xuICAgIHRoaXMuX3RvdGFsU2hpZnQgKz0gYW1vdW50O1xuICAgIGlmICh0aGlzLl9zcHJpbmdTdGF0ZSA9PT0gU3ByaW5nU3RhdGVzLkVER0UpIHtcbiAgICAgICAgdGhpcy5zcHJpbmcuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICBhbmNob3I6IFtcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGdlU3ByaW5nUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc3ByaW5nU3RhdGUgPT09IFNwcmluZ1N0YXRlcy5QQUdFKSB7XG4gICAgICAgIHRoaXMuc3ByaW5nLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgYW5jaG9yOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZVNwcmluZ1Bvc2l0aW9uLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG59XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5nZXRDdXJyZW50SW5kZXggPSBmdW5jdGlvbiBnZXRDdXJyZW50SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGUuaW5kZXg7XG59O1xuU2Nyb2xsdmlldy5wcm90b3R5cGUuZ29Ub1ByZXZpb3VzUGFnZSA9IGZ1bmN0aW9uIGdvVG9QcmV2aW91c1BhZ2UoKSB7XG4gICAgaWYgKCF0aGlzLl9ub2RlIHx8IHRoaXMuX29uRWRnZSA9PT0gRWRnZVN0YXRlcy5UT1ApXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGlmICh0aGlzLmdldFBvc2l0aW9uKCkgPiAxICYmIHRoaXMuX3NwcmluZ1N0YXRlID09PSBTcHJpbmdTdGF0ZXMuTk9ORSkge1xuICAgICAgICBfc2V0U3ByaW5nLmNhbGwodGhpcywgMCwgU3ByaW5nU3RhdGVzLlBBR0UpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZTtcbiAgICB9XG4gICAgdmFyIHByZXZpb3VzTm9kZSA9IHRoaXMuX25vZGUuZ2V0UHJldmlvdXMoKTtcbiAgICBpZiAocHJldmlvdXNOb2RlKSB7XG4gICAgICAgIHZhciBwcmV2aW91c05vZGVTaXplID0gX25vZGVTaXplRm9yRGlyZWN0aW9uLmNhbGwodGhpcywgcHJldmlvdXNOb2RlKTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsZXIuc2VxdWVuY2VGcm9tKHByZXZpb3VzTm9kZSk7XG4gICAgICAgIHRoaXMuX25vZGUgPSBwcmV2aW91c05vZGU7XG4gICAgICAgIF9zaGlmdE9yaWdpbi5jYWxsKHRoaXMsIHByZXZpb3VzTm9kZVNpemUpO1xuICAgICAgICBfc2V0U3ByaW5nLmNhbGwodGhpcywgMCwgU3ByaW5nU3RhdGVzLlBBR0UpO1xuICAgIH1cbiAgICByZXR1cm4gcHJldmlvdXNOb2RlO1xufTtcblNjcm9sbHZpZXcucHJvdG90eXBlLmdvVG9OZXh0UGFnZSA9IGZ1bmN0aW9uIGdvVG9OZXh0UGFnZSgpIHtcbiAgICBpZiAoIXRoaXMuX25vZGUgfHwgdGhpcy5fb25FZGdlID09PSBFZGdlU3RhdGVzLkJPVFRPTSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgdmFyIG5leHROb2RlID0gdGhpcy5fbm9kZS5nZXROZXh0KCk7XG4gICAgaWYgKG5leHROb2RlKSB7XG4gICAgICAgIHZhciBjdXJyZW50Tm9kZVNpemUgPSBfbm9kZVNpemVGb3JEaXJlY3Rpb24uY2FsbCh0aGlzLCB0aGlzLl9ub2RlKTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsZXIuc2VxdWVuY2VGcm9tKG5leHROb2RlKTtcbiAgICAgICAgdGhpcy5fbm9kZSA9IG5leHROb2RlO1xuICAgICAgICBfc2hpZnRPcmlnaW4uY2FsbCh0aGlzLCAtY3VycmVudE5vZGVTaXplKTtcbiAgICAgICAgX3NldFNwcmluZy5jYWxsKHRoaXMsIDAsIFNwcmluZ1N0YXRlcy5QQUdFKTtcbiAgICB9XG4gICAgcmV0dXJuIG5leHROb2RlO1xufTtcblNjcm9sbHZpZXcucHJvdG90eXBlLmdvVG9QYWdlID0gZnVuY3Rpb24gZ29Ub1BhZ2UoaW5kZXgpIHtcbiAgICB2YXIgY3VycmVudEluZGV4ID0gdGhpcy5nZXRDdXJyZW50SW5kZXgoKTtcbiAgICB2YXIgaTtcbiAgICBpZiAoY3VycmVudEluZGV4ID4gaW5kZXgpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGN1cnJlbnRJbmRleCAtIGluZGV4OyBpKyspXG4gICAgICAgICAgICB0aGlzLmdvVG9QcmV2aW91c1BhZ2UoKTtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnRJbmRleCA8IGluZGV4KSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBpbmRleCAtIGN1cnJlbnRJbmRleDsgaSsrKVxuICAgICAgICAgICAgdGhpcy5nb1RvTmV4dFBhZ2UoKTtcbiAgICB9XG59O1xuU2Nyb2xsdmlldy5wcm90b3R5cGUub3V0cHV0RnJvbSA9IGZ1bmN0aW9uIG91dHB1dEZyb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGVyLm91dHB1dEZyb20uYXBwbHkodGhpcy5fc2Nyb2xsZXIsIGFyZ3VtZW50cyk7XG59O1xuU2Nyb2xsdmlldy5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFydGljbGUuZ2V0UG9zaXRpb24xRCgpO1xufTtcblNjcm9sbHZpZXcucHJvdG90eXBlLmdldEFic29sdXRlUG9zaXRpb24gPSBmdW5jdGlvbiBnZXRBYnNvbHV0ZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JvbGxlci5nZXRDdW11bGF0aXZlU2l6ZSh0aGlzLmdldEN1cnJlbnRJbmRleCgpKVt0aGlzLm9wdGlvbnMuZGlyZWN0aW9uXSArIHRoaXMuZ2V0UG9zaXRpb24oKTtcbn07XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5nZXRPZmZzZXQgPSBTY3JvbGx2aWV3LnByb3RvdHlwZS5nZXRQb3NpdGlvbjtcblNjcm9sbHZpZXcucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gc2V0UG9zaXRpb24oeCkge1xuICAgIHRoaXMuX3BhcnRpY2xlLnNldFBvc2l0aW9uMUQoeCk7XG59O1xuU2Nyb2xsdmlldy5wcm90b3R5cGUuc2V0T2Zmc2V0ID0gU2Nyb2xsdmlldy5wcm90b3R5cGUuc2V0UG9zaXRpb247XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl90b3VjaENvdW50ID8gdGhpcy5fdG91Y2hWZWxvY2l0eSA6IHRoaXMuX3BhcnRpY2xlLmdldFZlbG9jaXR5MUQoKTtcbn07XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLl9wYXJ0aWNsZS5zZXRWZWxvY2l0eTFEKHYpO1xufTtcblNjcm9sbHZpZXcucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5kaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5kaXJlY3Rpb24gPT09ICd4JylcbiAgICAgICAgICAgIG9wdGlvbnMuZGlyZWN0aW9uID0gVXRpbGl0eS5EaXJlY3Rpb24uWDtcbiAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5kaXJlY3Rpb24gPT09ICd5JylcbiAgICAgICAgICAgIG9wdGlvbnMuZGlyZWN0aW9uID0gVXRpbGl0eS5EaXJlY3Rpb24uWTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuZ3JvdXBTY3JvbGwgIT09IHRoaXMub3B0aW9ucy5ncm91cFNjcm9sbCkge1xuICAgICAgICBpZiAob3B0aW9ucy5ncm91cFNjcm9sbClcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlKHRoaXMuX3Njcm9sbGVyKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSh0aGlzLl9zY3JvbGxlcik7XG4gICAgfVxuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fc2Nyb2xsZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5kcmFnICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuZHJhZy5zZXRPcHRpb25zKHsgc3RyZW5ndGg6IHRoaXMub3B0aW9ucy5kcmFnIH0pO1xuICAgIGlmIChvcHRpb25zLmZyaWN0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMuZnJpY3Rpb24uc2V0T3B0aW9ucyh7IHN0cmVuZ3RoOiB0aGlzLm9wdGlvbnMuZnJpY3Rpb24gfSk7XG4gICAgaWYgKG9wdGlvbnMuZWRnZVBlcmlvZCAhPT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMuZWRnZURhbXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnNwcmluZy5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgIHBlcmlvZDogdGhpcy5vcHRpb25zLmVkZ2VQZXJpb2QsXG4gICAgICAgICAgICBkYW1waW5nUmF0aW86IHRoaXMub3B0aW9ucy5lZGdlRGFtcFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMucmFpbHMgfHwgb3B0aW9ucy5kaXJlY3Rpb24gIT09IHVuZGVmaW5lZCB8fCBvcHRpb25zLnN5bmNTY2FsZSAhPT0gdW5kZWZpbmVkIHx8IG9wdGlvbnMucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgdGhpcy5zeW5jLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgcmFpbHM6IHRoaXMub3B0aW9ucy5yYWlscyxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVXRpbGl0eS5EaXJlY3Rpb24uWCA/IEdlbmVyaWNTeW5jLkRJUkVDVElPTl9YIDogR2VuZXJpY1N5bmMuRElSRUNUSU9OX1ksXG4gICAgICAgICAgICBzY2FsZTogdGhpcy5vcHRpb25zLnN5bmNTY2FsZSxcbiAgICAgICAgICAgIHByZXZlbnREZWZhdWx0OiB0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHRcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblNjcm9sbHZpZXcucHJvdG90eXBlLnNlcXVlbmNlRnJvbSA9IGZ1bmN0aW9uIHNlcXVlbmNlRnJvbShub2RlKSB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgbm9kZSA9IG5ldyBWaWV3U2VxdWVuY2Uoe1xuICAgICAgICAgICAgYXJyYXk6IG5vZGUsXG4gICAgICAgICAgICB0cmFja1NpemU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGVyLnNlcXVlbmNlRnJvbShub2RlKTtcbn07XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsZXIuZ2V0U2l6ZS5hcHBseSh0aGlzLl9zY3JvbGxlciwgYXJndW1lbnRzKTtcbn07XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYWdpbmF0ZWQgJiYgdGhpcy5fbmVlZHNQYWdpbmF0aW9uQ2hlY2spXG4gICAgICAgIF9oYW5kbGVQYWdpbmF0aW9uLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGVyLnJlbmRlcigpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsdmlldzsiLCJ2YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFZpZXdTZXF1ZW5jZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1ZpZXdTZXF1ZW5jZScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCdmYW1vdXMvdXRpbGl0aWVzL1V0aWxpdHknKTtcbmZ1bmN0aW9uIFNlcXVlbnRpYWxMYXlvdXQob3B0aW9ucykge1xuICAgIHRoaXMuX2l0ZW1zID0gbnVsbDtcbiAgICB0aGlzLl9zaXplID0gbnVsbDtcbiAgICB0aGlzLl9vdXRwdXRGdW5jdGlvbiA9IFNlcXVlbnRpYWxMYXlvdXQuREVGQVVMVF9PVVRQVVRfRlVOQ1RJT047XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvbnN0cnVjdG9yLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG59XG5TZXF1ZW50aWFsTGF5b3V0LkRFRkFVTFRfT1BUSU9OUyA9IHsgZGlyZWN0aW9uOiBVdGlsaXR5LkRpcmVjdGlvbi5ZIH07XG5TZXF1ZW50aWFsTGF5b3V0LkRFRkFVTFRfT1VUUFVUX0ZVTkNUSU9OID0gZnVuY3Rpb24gREVGQVVMVF9PVVRQVVRfRlVOQ1RJT04oaW5wdXQsIG9mZnNldCwgaW5kZXgpIHtcbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVXRpbGl0eS5EaXJlY3Rpb24uWCA/IFRyYW5zZm9ybS50cmFuc2xhdGUob2Zmc2V0LCAwKSA6IFRyYW5zZm9ybS50cmFuc2xhdGUoMCwgb2Zmc2V0KTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgdGFyZ2V0OiBpbnB1dC5yZW5kZXIoKVxuICAgIH07XG59O1xuU2VxdWVudGlhbExheW91dC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgaWYgKCF0aGlzLl9zaXplKVxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xufTtcblNlcXVlbnRpYWxMYXlvdXQucHJvdG90eXBlLnNlcXVlbmNlRnJvbSA9IGZ1bmN0aW9uIHNlcXVlbmNlRnJvbShpdGVtcykge1xuICAgIGlmIChpdGVtcyBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICBpdGVtcyA9IG5ldyBWaWV3U2VxdWVuY2UoaXRlbXMpO1xuICAgIHRoaXMuX2l0ZW1zID0gaXRlbXM7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU2VxdWVudGlhbExheW91dC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucy5hcHBseSh0aGlzLm9wdGlvbnNNYW5hZ2VyLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblNlcXVlbnRpYWxMYXlvdXQucHJvdG90eXBlLnNldE91dHB1dEZ1bmN0aW9uID0gZnVuY3Rpb24gc2V0T3V0cHV0RnVuY3Rpb24ob3V0cHV0RnVuY3Rpb24pIHtcbiAgICB0aGlzLl9vdXRwdXRGdW5jdGlvbiA9IG91dHB1dEZ1bmN0aW9uO1xuICAgIHJldHVybiB0aGlzO1xufTtcblNlcXVlbnRpYWxMYXlvdXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgbGVuZ3RoID0gMDtcbiAgICB2YXIgc2Vjb25kYXJ5RGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiBeIDE7XG4gICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5faXRlbXM7XG4gICAgdmFyIGl0ZW0gPSBudWxsO1xuICAgIHZhciBpdGVtU2l6ZSA9IFtdO1xuICAgIHZhciBvdXRwdXQgPSB7fTtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIHRoaXMuX3NpemUgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHdoaWxlIChjdXJyZW50Tm9kZSkge1xuICAgICAgICBpdGVtID0gY3VycmVudE5vZGUuZ2V0KCk7XG4gICAgICAgIGlmICghaXRlbSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBpZiAoaXRlbS5nZXRTaXplKVxuICAgICAgICAgICAgaXRlbVNpemUgPSBpdGVtLmdldFNpemUoKTtcbiAgICAgICAgb3V0cHV0ID0gdGhpcy5fb3V0cHV0RnVuY3Rpb24uY2FsbCh0aGlzLCBpdGVtLCBsZW5ndGgsIGkrKyk7XG4gICAgICAgIHJlc3VsdC5wdXNoKG91dHB1dCk7XG4gICAgICAgIGlmIChpdGVtU2l6ZSkge1xuICAgICAgICAgICAgaWYgKGl0ZW1TaXplW3RoaXMub3B0aW9ucy5kaXJlY3Rpb25dKVxuICAgICAgICAgICAgICAgIGxlbmd0aCArPSBpdGVtU2l6ZVt0aGlzLm9wdGlvbnMuZGlyZWN0aW9uXTtcbiAgICAgICAgICAgIGlmIChpdGVtU2l6ZVtzZWNvbmRhcnlEaXJlY3Rpb25dID4gdGhpcy5fc2l6ZVtzZWNvbmRhcnlEaXJlY3Rpb25dKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NpemVbc2Vjb25kYXJ5RGlyZWN0aW9uXSA9IGl0ZW1TaXplW3NlY29uZGFyeURpcmVjdGlvbl07XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5nZXROZXh0KCk7XG4gICAgfVxuICAgIHRoaXMuX3NpemVbdGhpcy5vcHRpb25zLmRpcmVjdGlvbl0gPSBsZW5ndGg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNlcXVlbnRpYWxMYXlvdXQ7IiwidmFyIFNjZW5lID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvU2NlbmUnKTtcbnZhciBTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvU3VyZmFjZScpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFZpZXcgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9WaWV3Jyk7XG5mdW5jdGlvbiBOYXZpZ2F0aW9uQmFyKG9wdGlvbnMpIHtcbiAgICBWaWV3LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy50aXRsZSA9IG5ldyBTdXJmYWNlKHtcbiAgICAgICAgY2xhc3NlczogdGhpcy5vcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMub3B0aW9ucy5jb250ZW50XG4gICAgfSk7XG4gICAgdGhpcy5iYWNrID0gbmV3IFN1cmZhY2Uoe1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2l6ZVsxXSxcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zaXplWzFdXG4gICAgICAgIF0sXG4gICAgICAgIGNsYXNzZXM6IHRoaXMub3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBjb250ZW50OiB0aGlzLm9wdGlvbnMuYmFja0NvbnRlbnRcbiAgICB9KTtcbiAgICB0aGlzLmJhY2sub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdiYWNrJywge30pO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5tb3JlID0gbmV3IFN1cmZhY2Uoe1xuICAgICAgICBzaXplOiBbXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuc2l6ZVsxXSxcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zaXplWzFdXG4gICAgICAgIF0sXG4gICAgICAgIGNsYXNzZXM6IHRoaXMub3B0aW9ucy5jbGFzc2VzLFxuICAgICAgICBjb250ZW50OiB0aGlzLm9wdGlvbnMubW9yZUNvbnRlbnRcbiAgICB9KTtcbiAgICB0aGlzLm1vcmUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdtb3JlJywge30pO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5sYXlvdXQgPSBuZXcgU2NlbmUoe1xuICAgICAgICBpZDogJ21hc3RlcicsXG4gICAgICAgIHNpemU6IHRoaXMub3B0aW9ucy5zaXplLFxuICAgICAgICB0YXJnZXQ6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS5pbkZyb250LFxuICAgICAgICAgICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAwLjVcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5iYWNrXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgICAgICAgICAwLjUsXG4gICAgICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLnRpdGxlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLmluRnJvbnQsXG4gICAgICAgICAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLm1vcmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xuICAgIHRoaXMuX2FkZCh0aGlzLmxheW91dCk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIga2V5ID0gZXZlbnQuaWQ7XG4gICAgICAgIHZhciBkYXRhID0gZXZlbnQudmFsdWU7XG4gICAgICAgIGlmIChrZXkgPT09ICdzaXplJykge1xuICAgICAgICAgICAgdGhpcy5sYXlvdXQuaWQubWFzdGVyLnNldFNpemUoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLnRpdGxlLnNldFNpemUoZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmJhY2suc2V0U2l6ZShbXG4gICAgICAgICAgICAgICAgZGF0YVsxXSxcbiAgICAgICAgICAgICAgICBkYXRhWzFdXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIHRoaXMubW9yZS5zZXRTaXplKFtcbiAgICAgICAgICAgICAgICBkYXRhWzFdLFxuICAgICAgICAgICAgICAgIGRhdGFbMV1cbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2JhY2tDbGFzc2VzJykge1xuICAgICAgICAgICAgdGhpcy5iYWNrLnNldE9wdGlvbnMoeyBjbGFzc2VzOiB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5jb25jYXQodGhpcy5vcHRpb25zLmJhY2tDbGFzc2VzKSB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdiYWNrQ29udGVudCcpIHtcbiAgICAgICAgICAgIHRoaXMuYmFjay5zZXRDb250ZW50KHRoaXMub3B0aW9ucy5iYWNrQ29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY2xhc3NlcycpIHtcbiAgICAgICAgICAgIHRoaXMudGl0bGUuc2V0T3B0aW9ucyh7IGNsYXNzZXM6IHRoaXMub3B0aW9ucy5jbGFzc2VzIH0pO1xuICAgICAgICAgICAgdGhpcy5iYWNrLnNldE9wdGlvbnMoeyBjbGFzc2VzOiB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5jb25jYXQodGhpcy5vcHRpb25zLmJhY2tDbGFzc2VzKSB9KTtcbiAgICAgICAgICAgIHRoaXMubW9yZS5zZXRPcHRpb25zKHsgY2xhc3NlczogdGhpcy5vcHRpb25zLmNsYXNzZXMuY29uY2F0KHRoaXMub3B0aW9ucy5tb3JlQ2xhc3NlcykgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnY29udGVudCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudCh0aGlzLm9wdGlvbnMuY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnbW9yZUNsYXNzZXMnKSB7XG4gICAgICAgICAgICB0aGlzLm1vcmUuc2V0T3B0aW9ucyh7IGNsYXNzZXM6IHRoaXMub3B0aW9ucy5jbGFzc2VzLmNvbmNhdCh0aGlzLm9wdGlvbnMubW9yZUNsYXNzZXMpIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ21vcmVDb250ZW50Jykge1xuICAgICAgICAgICAgdGhpcy5tb3JlLnNldENvbnRlbnQodGhpcy5vcHRpb25zLmNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgfS5iaW5kKHRoaXMpKTtcbn1cbk5hdmlnYXRpb25CYXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShWaWV3LnByb3RvdHlwZSk7XG5OYXZpZ2F0aW9uQmFyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IE5hdmlnYXRpb25CYXI7XG5OYXZpZ2F0aW9uQmFyLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBzaXplOiBbXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgNTBcbiAgICBdLFxuICAgIGJhY2tDbGFzc2VzOiBbJ2JhY2snXSxcbiAgICBiYWNrQ29udGVudDogJyYjeDI1YzA7JyxcbiAgICBjbGFzc2VzOiBbJ25hdmlnYXRpb24nXSxcbiAgICBjb250ZW50OiAnJyxcbiAgICBtb3JlQ2xhc3NlczogWydtb3JlJ10sXG4gICAgbW9yZUNvbnRlbnQ6ICcmI3gyNzFhOydcbn07XG5OYXZpZ2F0aW9uQmFyLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgcmV0dXJuIHRoaXMudGl0bGUuc2V0Q29udGVudChjb250ZW50KTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE5hdmlnYXRpb25CYXI7IiwidmFyIFN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9TdXJmYWNlJyk7XG52YXIgQ2FudmFzU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9zdXJmYWNlcy9DYW52YXNTdXJmYWNlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgVXRpbGl0aWVzID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVXRpbGl0aWVzJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xudmFyIE1vdXNlU3luYyA9IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvTW91c2VTeW5jJyk7XG52YXIgVG91Y2hTeW5jID0gcmVxdWlyZSgnZmFtb3VzL2lucHV0cy9Ub3VjaFN5bmMnKTtcbnZhciBHZW5lcmljU3luYyA9IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvR2VuZXJpY1N5bmMnKTtcbkdlbmVyaWNTeW5jLnJlZ2lzdGVyKHtcbiAgICBtb3VzZTogTW91c2VTeW5jLFxuICAgIHRvdWNoOiBUb3VjaFN5bmNcbn0pO1xuZnVuY3Rpb24gU2xpZGVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFNsaWRlci5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMub3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuaW5kaWNhdG9yID0gbmV3IENhbnZhc1N1cmZhY2Uoe1xuICAgICAgICBzaXplOiB0aGlzLm9wdGlvbnMuaW5kaWNhdG9yU2l6ZSxcbiAgICAgICAgY2xhc3NlczogWydzbGlkZXItYmFjayddXG4gICAgfSk7XG4gICAgdGhpcy5sYWJlbCA9IG5ldyBTdXJmYWNlKHtcbiAgICAgICAgc2l6ZTogdGhpcy5vcHRpb25zLmxhYmVsU2l6ZSxcbiAgICAgICAgY29udGVudDogdGhpcy5vcHRpb25zLmxhYmVsLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7IHBvaW50ZXJFdmVudHM6ICdub25lJyB9LFxuICAgICAgICBjbGFzc2VzOiBbJ3NsaWRlci1sYWJlbCddXG4gICAgfSk7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLmV2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLmV2ZW50SW5wdXQpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRPdXRwdXQpO1xuICAgIHZhciBzY2FsZSA9ICh0aGlzLm9wdGlvbnMucmFuZ2VbMV0gLSB0aGlzLm9wdGlvbnMucmFuZ2VbMF0pIC8gdGhpcy5vcHRpb25zLmluZGljYXRvclNpemVbMF07XG4gICAgdGhpcy5zeW5jID0gbmV3IEdlbmVyaWNTeW5jKFtcbiAgICAgICAgJ21vdXNlJyxcbiAgICAgICAgJ3RvdWNoJ1xuICAgIF0sIHtcbiAgICAgICAgc2NhbGU6IHNjYWxlLFxuICAgICAgICBkaXJlY3Rpb246IEdlbmVyaWNTeW5jLkRJUkVDVElPTl9YXG4gICAgfSk7XG4gICAgdGhpcy5pbmRpY2F0b3IucGlwZSh0aGlzLnN5bmMpO1xuICAgIHRoaXMuc3luYy5waXBlKHRoaXMpO1xuICAgIHRoaXMuZXZlbnRJbnB1dC5vbigndXBkYXRlJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdGhpcy5zZXQoZGF0YS5wb3NpdGlvbik7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLl9kcmF3UG9zID0gMDtcbiAgICBfdXBkYXRlTGFiZWwuY2FsbCh0aGlzKTtcbn1cblNsaWRlci5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgc2l6ZTogW1xuICAgICAgICAyMDAsXG4gICAgICAgIDYwXG4gICAgXSxcbiAgICBpbmRpY2F0b3JTaXplOiBbXG4gICAgICAgIDIwMCxcbiAgICAgICAgMzBcbiAgICBdLFxuICAgIGxhYmVsU2l6ZTogW1xuICAgICAgICAyMDAsXG4gICAgICAgIDMwXG4gICAgXSxcbiAgICByYW5nZTogW1xuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXSxcbiAgICBwcmVjaXNpb246IDIsXG4gICAgdmFsdWU6IDAsXG4gICAgbGFiZWw6ICcnLFxuICAgIGZpbGxDb2xvcjogJ3JnYmEoMTcwLCAxNzAsIDE3MCwgMSknXG59O1xuZnVuY3Rpb24gX3VwZGF0ZUxhYmVsKCkge1xuICAgIHRoaXMubGFiZWwuc2V0Q29udGVudCh0aGlzLm9wdGlvbnMubGFiZWwgKyAnPHNwYW4gc3R5bGU9XCJmbG9hdDogcmlnaHRcIj4nICsgdGhpcy5nZXQoKS50b0ZpeGVkKHRoaXMub3B0aW9ucy5wcmVjaXNpb24pICsgJzwvc3Bhbj4nKTtcbn1cblNsaWRlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuU2xpZGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy52YWx1ZTtcbn07XG5TbGlkZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5vcHRpb25zLnZhbHVlKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5vcHRpb25zLnZhbHVlID0gVXRpbGl0aWVzLmNsYW1wKHZhbHVlLCB0aGlzLm9wdGlvbnMucmFuZ2UpO1xuICAgIF91cGRhdGVMYWJlbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgnY2hhbmdlJywgeyB2YWx1ZTogdmFsdWUgfSk7XG59O1xuU2xpZGVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNpemU7XG59O1xuU2xpZGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIHJhbmdlID0gdGhpcy5vcHRpb25zLnJhbmdlO1xuICAgIHZhciBmaWxsU2l6ZSA9IE1hdGguZmxvb3IoKHRoaXMuZ2V0KCkgLSByYW5nZVswXSkgLyAocmFuZ2VbMV0gLSByYW5nZVswXSkgKiB0aGlzLm9wdGlvbnMuaW5kaWNhdG9yU2l6ZVswXSk7XG4gICAgaWYgKGZpbGxTaXplIDwgdGhpcy5fZHJhd1Bvcykge1xuICAgICAgICB0aGlzLmluZGljYXRvci5nZXRDb250ZXh0KCcyZCcpLmNsZWFyUmVjdChmaWxsU2l6ZSwgMCwgdGhpcy5fZHJhd1BvcyAtIGZpbGxTaXplICsgMSwgdGhpcy5vcHRpb25zLmluZGljYXRvclNpemVbMV0pO1xuICAgIH0gZWxzZSBpZiAoZmlsbFNpemUgPiB0aGlzLl9kcmF3UG9zKSB7XG4gICAgICAgIHZhciBjdHggPSB0aGlzLmluZGljYXRvci5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5vcHRpb25zLmZpbGxDb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMuX2RyYXdQb3MgLSAxLCAwLCBmaWxsU2l6ZSAtIHRoaXMuX2RyYXdQb3MgKyAxLCB0aGlzLm9wdGlvbnMuaW5kaWNhdG9yU2l6ZVsxXSk7XG4gICAgfVxuICAgIHRoaXMuX2RyYXdQb3MgPSBmaWxsU2l6ZTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzaXplOiB0aGlzLm9wdGlvbnMuc2l6ZSxcbiAgICAgICAgdGFyZ2V0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5pbmRpY2F0b3IucmVuZGVyKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0udHJhbnNsYXRlKDAsIDAsIDEpLFxuICAgICAgICAgICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMubGFiZWwucmVuZGVyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTbGlkZXI7IiwidmFyIFV0aWxpdHkgPSByZXF1aXJlKCdmYW1vdXMvdXRpbGl0aWVzL1V0aWxpdHknKTtcbnZhciBWaWV3ID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVmlldycpO1xudmFyIEdyaWRMYXlvdXQgPSByZXF1aXJlKCdmYW1vdXMvdmlld3MvR3JpZExheW91dCcpO1xudmFyIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4vVG9nZ2xlQnV0dG9uJyk7XG5mdW5jdGlvbiBUYWJCYXIob3B0aW9ucykge1xuICAgIFZpZXcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmxheW91dCA9IG5ldyBHcmlkTGF5b3V0KCk7XG4gICAgdGhpcy5idXR0b25zID0gW107XG4gICAgdGhpcy5fYnV0dG9uSWRzID0ge307XG4gICAgdGhpcy5fYnV0dG9uQ2FsbGJhY2tzID0ge307XG4gICAgdGhpcy5sYXlvdXQuc2VxdWVuY2VGcm9tKHRoaXMuYnV0dG9ucyk7XG4gICAgdGhpcy5fYWRkKHRoaXMubGF5b3V0KTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlci5vbignY2hhbmdlJywgX3VwZGF0ZU9wdGlvbnMuYmluZCh0aGlzKSk7XG59XG5UYWJCYXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShWaWV3LnByb3RvdHlwZSk7XG5UYWJCYXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGFiQmFyO1xuVGFiQmFyLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBzZWN0aW9uczogW10sXG4gICAgd2lkZ2V0OiBUb2dnbGVCdXR0b24sXG4gICAgc2l6ZTogW1xuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIDUwXG4gICAgXSxcbiAgICBkaXJlY3Rpb246IFV0aWxpdHkuRGlyZWN0aW9uLlgsXG4gICAgYnV0dG9uczogeyB0b2dnbGVNb2RlOiBUb2dnbGVCdXR0b24uT04gfVxufTtcbmZ1bmN0aW9uIF91cGRhdGVPcHRpb25zKGRhdGEpIHtcbiAgICB2YXIgaWQgPSBkYXRhLmlkO1xuICAgIHZhciB2YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgaWYgKGlkID09PSAnZGlyZWN0aW9uJykge1xuICAgICAgICB0aGlzLmxheW91dC5zZXRPcHRpb25zKHsgZGltZW5zaW9uczogX3Jlc29sdmVHcmlkRGltZW5zaW9ucy5jYWxsKHRoaXMuYnV0dG9ucy5sZW5ndGgsIHRoaXMub3B0aW9ucy5kaXJlY3Rpb24pIH0pO1xuICAgIH0gZWxzZSBpZiAoaWQgPT09ICdidXR0b25zJykge1xuICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuYnV0dG9ucykge1xuICAgICAgICAgICAgdGhpcy5idXR0b25zW2ldLnNldE9wdGlvbnModmFsdWUpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpZCA9PT0gJ3NlY3Rpb25zJykge1xuICAgICAgICBmb3IgKHZhciBzZWN0aW9uSWQgaW4gdGhpcy5vcHRpb25zLnNlY3Rpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmluZVNlY3Rpb24oc2VjdGlvbklkLCB0aGlzLm9wdGlvbnMuc2VjdGlvbnNbc2VjdGlvbklkXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfcmVzb2x2ZUdyaWREaW1lbnNpb25zKGNvdW50LCBkaXJlY3Rpb24pIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBVdGlsaXR5LkRpcmVjdGlvbi5YKVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgY291bnQsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIGNvdW50XG4gICAgICAgIF07XG59XG5UYWJCYXIucHJvdG90eXBlLmRlZmluZVNlY3Rpb24gPSBmdW5jdGlvbiBkZWZpbmVTZWN0aW9uKGlkLCBjb250ZW50KSB7XG4gICAgdmFyIGJ1dHRvbjtcbiAgICB2YXIgaSA9IHRoaXMuX2J1dHRvbklkc1tpZF07XG4gICAgaWYgKGkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpID0gdGhpcy5idXR0b25zLmxlbmd0aDtcbiAgICAgICAgdGhpcy5fYnV0dG9uSWRzW2lkXSA9IGk7XG4gICAgICAgIHZhciB3aWRnZXQgPSB0aGlzLm9wdGlvbnMud2lkZ2V0O1xuICAgICAgICBidXR0b24gPSBuZXcgd2lkZ2V0KCk7XG4gICAgICAgIHRoaXMuYnV0dG9uc1tpXSA9IGJ1dHRvbjtcbiAgICAgICAgdGhpcy5sYXlvdXQuc2V0T3B0aW9ucyh7IGRpbWVuc2lvbnM6IF9yZXNvbHZlR3JpZERpbWVuc2lvbnModGhpcy5idXR0b25zLmxlbmd0aCwgdGhpcy5vcHRpb25zLmRpcmVjdGlvbikgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uID0gdGhpcy5idXR0b25zW2ldO1xuICAgICAgICBidXR0b24udW5iaW5kKCdzZWxlY3QnLCB0aGlzLl9idXR0b25DYWxsYmFja3NbaWRdKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5idXR0b25zKVxuICAgICAgICBidXR0b24uc2V0T3B0aW9ucyh0aGlzLm9wdGlvbnMuYnV0dG9ucyk7XG4gICAgYnV0dG9uLnNldE9wdGlvbnMoY29udGVudCk7XG4gICAgdGhpcy5fYnV0dG9uQ2FsbGJhY2tzW2lkXSA9IHRoaXMuc2VsZWN0LmJpbmQodGhpcywgaWQpO1xuICAgIGJ1dHRvbi5vbignc2VsZWN0JywgdGhpcy5fYnV0dG9uQ2FsbGJhY2tzW2lkXSk7XG59O1xuVGFiQmFyLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiBzZWxlY3QoaWQpIHtcbiAgICB2YXIgYnRuID0gdGhpcy5fYnV0dG9uSWRzW2lkXTtcbiAgICBpZiAodGhpcy5idXR0b25zW2J0bl0gJiYgdGhpcy5idXR0b25zW2J0bl0uaXNTZWxlY3RlZCgpKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3NlbGVjdCcsIHsgaWQ6IGlkIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5idXR0b25zW2J0bl0pIHtcbiAgICAgICAgdGhpcy5idXR0b25zW2J0bl0uc2VsZWN0KCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5idXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpICE9PSBidG4pXG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0uZGVzZWxlY3QoKTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUYWJCYXI7IiwidmFyIFN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9TdXJmYWNlJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgUmVuZGVyQ29udHJvbGxlciA9IHJlcXVpcmUoJ2ZhbW91cy92aWV3cy9SZW5kZXJDb250cm9sbGVyJyk7XG5mdW5jdGlvbiBUb2dnbGVCdXR0b24ob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgICAgY29udGVudDogJycsXG4gICAgICAgIG9mZkNsYXNzZXM6IFsnb2ZmJ10sXG4gICAgICAgIG9uQ2xhc3NlczogWydvbiddLFxuICAgICAgICBzaXplOiB1bmRlZmluZWQsXG4gICAgICAgIG91dFRyYW5zaXRpb246IHtcbiAgICAgICAgICAgIGN1cnZlOiAnZWFzZUluT3V0JyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDBcbiAgICAgICAgfSxcbiAgICAgICAgaW5UcmFuc2l0aW9uOiB7XG4gICAgICAgICAgICBjdXJ2ZTogJ2Vhc2VJbk91dCcsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwXG4gICAgICAgIH0sXG4gICAgICAgIHRvZ2dsZU1vZGU6IFRvZ2dsZUJ1dHRvbi5UT0dHTEUsXG4gICAgICAgIGNyb3NzZmFkZTogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMub2ZmU3VyZmFjZSA9IG5ldyBTdXJmYWNlKCk7XG4gICAgdGhpcy5vZmZTdXJmYWNlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy50b2dnbGVNb2RlICE9PSBUb2dnbGVCdXR0b24uT0ZGKVxuICAgICAgICAgICAgdGhpcy5zZWxlY3QoKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHRoaXMub2ZmU3VyZmFjZS5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB0aGlzLm9uU3VyZmFjZSA9IG5ldyBTdXJmYWNlKCk7XG4gICAgdGhpcy5vblN1cmZhY2Uub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRvZ2dsZU1vZGUgIT09IFRvZ2dsZUJ1dHRvbi5PTilcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3QoKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHRoaXMub25TdXJmYWNlLnBpcGUodGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMuYXJiaXRlciA9IG5ldyBSZW5kZXJDb250cm9sbGVyKHsgb3ZlcmxhcDogdGhpcy5vcHRpb25zLmNyb3NzZmFkZSB9KTtcbiAgICB0aGlzLmRlc2VsZWN0KCk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn1cblRvZ2dsZUJ1dHRvbi5PRkYgPSAwO1xuVG9nZ2xlQnV0dG9uLk9OID0gMTtcblRvZ2dsZUJ1dHRvbi5UT0dHTEUgPSAyO1xuVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiBzZWxlY3QoKSB7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHRydWU7XG4gICAgdGhpcy5hcmJpdGVyLnNob3codGhpcy5vblN1cmZhY2UsIHRoaXMub3B0aW9ucy5pblRyYW5zaXRpb24pO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3NlbGVjdCcpO1xufTtcblRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuZGVzZWxlY3QgPSBmdW5jdGlvbiBkZXNlbGVjdCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5hcmJpdGVyLnNob3codGhpcy5vZmZTdXJmYWNlLCB0aGlzLm9wdGlvbnMub3V0VHJhbnNpdGlvbik7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnZGVzZWxlY3QnKTtcbn07XG5Ub2dnbGVCdXR0b24ucHJvdG90eXBlLmlzU2VsZWN0ZWQgPSBmdW5jdGlvbiBpc1NlbGVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xufTtcblRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmNvbnRlbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuY29udGVudCA9IG9wdGlvbnMuY29udGVudDtcbiAgICAgICAgdGhpcy5vZmZTdXJmYWNlLnNldENvbnRlbnQodGhpcy5vcHRpb25zLmNvbnRlbnQpO1xuICAgICAgICB0aGlzLm9uU3VyZmFjZS5zZXRDb250ZW50KHRoaXMub3B0aW9ucy5jb250ZW50KTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMub2ZmQ2xhc3Nlcykge1xuICAgICAgICB0aGlzLm9wdGlvbnMub2ZmQ2xhc3NlcyA9IG9wdGlvbnMub2ZmQ2xhc3NlcztcbiAgICAgICAgdGhpcy5vZmZTdXJmYWNlLnNldENsYXNzZXModGhpcy5vcHRpb25zLm9mZkNsYXNzZXMpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vbkNsYXNzZXMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLm9uQ2xhc3NlcyA9IG9wdGlvbnMub25DbGFzc2VzO1xuICAgICAgICB0aGlzLm9uU3VyZmFjZS5zZXRDbGFzc2VzKHRoaXMub3B0aW9ucy5vbkNsYXNzZXMpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnNpemUgPSBvcHRpb25zLnNpemU7XG4gICAgICAgIHRoaXMub25TdXJmYWNlLnNldFNpemUodGhpcy5vcHRpb25zLnNpemUpO1xuICAgICAgICB0aGlzLm9mZlN1cmZhY2Uuc2V0U2l6ZSh0aGlzLm9wdGlvbnMuc2l6ZSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnRvZ2dsZU1vZGUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnRvZ2dsZU1vZGUgPSBvcHRpb25zLnRvZ2dsZU1vZGU7XG4gICAgaWYgKG9wdGlvbnMub3V0VHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMub3V0VHJhbnNpdGlvbiA9IG9wdGlvbnMub3V0VHJhbnNpdGlvbjtcbiAgICBpZiAob3B0aW9ucy5pblRyYW5zaXRpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmluVHJhbnNpdGlvbiA9IG9wdGlvbnMuaW5UcmFuc2l0aW9uO1xuICAgIGlmIChvcHRpb25zLmNyb3NzZmFkZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5jcm9zc2ZhZGUgPSBvcHRpb25zLmNyb3NzZmFkZTtcbiAgICAgICAgdGhpcy5hcmJpdGVyLnNldE9wdGlvbnMoeyBvdmVybGFwOiB0aGlzLm9wdGlvbnMuY3Jvc3NmYWRlIH0pO1xuICAgIH1cbn07XG5Ub2dnbGVCdXR0b24ucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2l6ZTtcbn07XG5Ub2dnbGVCdXR0b24ucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5hcmJpdGVyLnJlbmRlcigpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVG9nZ2xlQnV0dG9uOyIsIi8vIGxvYWQgY3NzXG5yZXF1aXJlKCcuL3N0eWxlcycpO1xuXG4vLyBMb2FkIHBvbHlmaWxsc1xucmVxdWlyZSgnZmFtb3VzLXBvbHlmaWxscycpO1xuXG5mYW1vdXMgPSB7XG4gIGNvcmU6IHtcbiAgICBDb250ZXh0OiByZXF1aXJlKCdmYW1vdXMvY29yZS9Db250ZXh0JyksXG4gICAgRWxlbWVudEFsbG9jYXRvcjogcmVxdWlyZSgnZmFtb3VzL2NvcmUvRWxlbWVudEFsbG9jYXRvcicpLFxuICAgIEVuZ2luZTogcmVxdWlyZSgnZmFtb3VzL2NvcmUvRW5naW5lJyksXG4gICAgRW50aXR5OiByZXF1aXJlKCdmYW1vdXMvY29yZS9FbnRpdHknKSxcbiAgICBFdmVudEVtaXR0ZXI6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0V2ZW50RW1pdHRlcicpLFxuICAgIEV2ZW50SGFuZGxlcjogcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyksXG4gICAgR3JvdXA6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0dyb3VwJyksXG4gICAgTW9kaWZpZXI6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL01vZGlmaWVyJyksXG4gICAgT3B0aW9uc01hbmFnZXI6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyJyksXG4gICAgUmVuZGVyTm9kZTogcmVxdWlyZSgnZmFtb3VzL2NvcmUvUmVuZGVyTm9kZScpLFxuICAgIFNjZW5lOiByZXF1aXJlKCdmYW1vdXMvY29yZS9TY2VuZScpLFxuICAgIFNwZWNQYXJzZXI6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1NwZWNQYXJzZXInKSxcbiAgICBTdXJmYWNlOiByZXF1aXJlKCdmYW1vdXMvY29yZS9TdXJmYWNlJyksXG4gICAgVHJhbnNmb3JtOiByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKSxcbiAgICBWaWV3OiByZXF1aXJlKCdmYW1vdXMvY29yZS9WaWV3JyksXG4gICAgVmlld1NlcXVlbmNlOiByZXF1aXJlKCdmYW1vdXMvY29yZS9WaWV3U2VxdWVuY2UnKVxuICB9LFxuICBldmVudHM6IHtcbiAgICBFdmVudEFyYml0ZXI6IHJlcXVpcmUoJ2ZhbW91cy9ldmVudHMvRXZlbnRBcmJpdGVyJyksXG4gICAgRXZlbnRGaWx0ZXI6IHJlcXVpcmUoJ2ZhbW91cy9ldmVudHMvRXZlbnRGaWx0ZXInKSxcbiAgICBFdmVudE1hcHBlcjogcmVxdWlyZSgnZmFtb3VzL2V2ZW50cy9FdmVudE1hcHBlcicpXG4gIH0sXG4gIGlucHV0czoge1xuICAgIEFjY3VtdWxhdG9yOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL0FjY3VtdWxhdG9yJyksXG4gICAgRmFzdENsaWNrOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL0Zhc3RDbGljaycpLFxuICAgIEdlbmVyaWNTeW5jOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL0dlbmVyaWNTeW5jJyksXG4gICAgTW91c2VTeW5jOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL01vdXNlU3luYycpLFxuICAgIFBpbmNoU3luYzogcmVxdWlyZSgnZmFtb3VzL2lucHV0cy9QaW5jaFN5bmMnKSxcbiAgICBSb3RhdGVTeW5jOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL1JvdGF0ZVN5bmMnKSxcbiAgICBTY2FsZVN5bmM6IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvU2NhbGVTeW5jJyksXG4gICAgU2Nyb2xsU3luYzogcmVxdWlyZSgnZmFtb3VzL2lucHV0cy9TY3JvbGxTeW5jJyksXG4gICAgVG91Y2hTeW5jOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL1RvdWNoU3luYycpLFxuICAgIFRvdWNoVHJhY2tlcjogcmVxdWlyZSgnZmFtb3VzL2lucHV0cy9Ub3VjaFRyYWNrZXInKSxcbiAgICBUd29GaW5nZXJTeW5jOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL1R3b0ZpbmdlclN5bmMnKVxuICB9LFxuICBtYXRoOiB7XG4gICAgTWF0cml4OiByZXF1aXJlKCdmYW1vdXMvbWF0aC9NYXRyaXgnKSxcbiAgICBRdWF0ZXJuaW9uOiByZXF1aXJlKCdmYW1vdXMvbWF0aC9RdWF0ZXJuaW9uJyksXG4gICAgUmFuZG9tOiByZXF1aXJlKCdmYW1vdXMvbWF0aC9SYW5kb20nKSxcbiAgICBVdGlsaXRpZXM6IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1V0aWxpdGllcycpLFxuICAgIFZlY3RvcjogcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJylcbiAgfSxcbiAgbW9kaWZpZXJzOiB7XG4gICAgRHJhZ2dhYmxlOiByZXF1aXJlKCdmYW1vdXMvbW9kaWZpZXJzL0RyYWdnYWJsZScpLFxuICAgIEZhZGVyOiByZXF1aXJlKCdmYW1vdXMvbW9kaWZpZXJzL0ZhZGVyJyksXG4gICAgTW9kaWZpZXJDaGFpbjogcmVxdWlyZSgnZmFtb3VzL21vZGlmaWVycy9Nb2RpZmllckNoYWluJyksXG4gICAgU3RhdGVNb2RpZmllcjogcmVxdWlyZSgnZmFtb3VzL21vZGlmaWVycy9TdGF0ZU1vZGlmaWVyJylcbiAgfSxcbiAgcGh5c2ljczoge1xuICAgIGJvZGllczoge1xuICAgICAgQm9keTogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvYm9kaWVzL0JvZHknKSxcbiAgICAgIENpcmNsZTogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvYm9kaWVzL0NpcmNsZScpLFxuICAgICAgUGFydGljbGU6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2JvZGllcy9QYXJ0aWNsZScpLFxuICAgICAgUmVjdGFuZ2xlOiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9ib2RpZXMvUmVjdGFuZ2xlJylcbiAgICB9LFxuICAgIGNvbnN0cmFpbnRzOiB7XG4gICAgICBDb2xsaXNpb246IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL0NvbGxpc2lvbicpLFxuICAgICAgQ29uc3RyYWludDogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvQ29uc3RyYWludCcpLFxuICAgICAgQ3VydmU6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL0N1cnZlJyksXG4gICAgICBEaXN0YW5jZTogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvRGlzdGFuY2UnKSxcbiAgICAgIFNuYXA6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1NuYXAnKSxcbiAgICAgIFN1cmZhY2U6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1N1cmZhY2UnKSxcbiAgICAgIFdhbGw6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1dhbGwnKSxcbiAgICAgIFdhbGxzOiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9XYWxscycpXG4gICAgfSxcbiAgICBmb3JjZXM6IHtcbiAgICAgIERyYWc6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9EcmFnJyksXG4gICAgICBGb3JjZTogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvZm9yY2VzL0ZvcmNlJyksXG4gICAgICBSZXB1bHNpb246IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9SZXB1bHNpb24nKSxcbiAgICAgIFJvdGF0aW9uYWxEcmFnOiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9mb3JjZXMvUm90YXRpb25hbERyYWcnKSxcbiAgICAgIFJvdGF0aW9uYWxTcHJpbmc6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9Sb3RhdGlvbmFsU3ByaW5nJyksXG4gICAgICBTcHJpbmc6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9TcHJpbmcnKSxcbiAgICAgIFZlY3RvckZpZWxkOiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9mb3JjZXMvVmVjdG9yRmllbGQnKVxuICAgIH0sXG4gICAgaW50ZWdyYXRvcnM6IHtcbiAgICAgIFN5bXBsZWN0aWNFdWxlcjogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvaW50ZWdyYXRvcnMvU3ltcGxlY3RpY0V1bGVyJylcbiAgICB9LFxuICAgIFBoeXNpY3NFbmdpbmU6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL1BoeXNpY3NFbmdpbmUnKVxuICB9LFxuICBzdXJmYWNlczoge1xuICAgIENhbnZhc1N1cmZhY2U6IHJlcXVpcmUoJ2ZhbW91cy9zdXJmYWNlcy9DYW52YXNTdXJmYWNlJyksXG4gICAgQ29udGFpbmVyU3VyZmFjZTogcmVxdWlyZSgnZmFtb3VzL3N1cmZhY2VzL0NvbnRhaW5lclN1cmZhY2UnKSxcbiAgICBGb3JtQ29udGFpbmVyU3VyZmFjZTogcmVxdWlyZSgnZmFtb3VzL3N1cmZhY2VzL0Zvcm1Db250YWluZXJTdXJmYWNlJyksXG4gICAgSW1hZ2VTdXJmYWNlOiByZXF1aXJlKCdmYW1vdXMvc3VyZmFjZXMvSW1hZ2VTdXJmYWNlJyksXG4gICAgSW5wdXRTdXJmYWNlOiByZXF1aXJlKCdmYW1vdXMvc3VyZmFjZXMvSW5wdXRTdXJmYWNlJyksXG4gICAgU3VibWl0SW5wdXRTdXJmYWNlOiByZXF1aXJlKCdmYW1vdXMvc3VyZmFjZXMvU3VibWl0SW5wdXRTdXJmYWNlJyksXG4gICAgVGV4dGFyZWFTdXJmYWNlOiByZXF1aXJlKCdmYW1vdXMvc3VyZmFjZXMvVGV4dGFyZWFTdXJmYWNlJyksXG4gICAgVmlkZW9TdXJmYWNlOiByZXF1aXJlKCdmYW1vdXMvc3VyZmFjZXMvVmlkZW9TdXJmYWNlJylcbiAgfSxcbiAgdHJhbnNpdGlvbnM6IHtcbiAgICBDYWNoZWRNYXA6IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9DYWNoZWRNYXAnKSxcbiAgICBFYXNpbmc6IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9FYXNpbmcnKSxcbiAgICBNdWx0aXBsZVRyYW5zaXRpb246IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9NdWx0aXBsZVRyYW5zaXRpb24nKSxcbiAgICBTbmFwVHJhbnNpdGlvbjogcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1NuYXBUcmFuc2l0aW9uJyksXG4gICAgU3ByaW5nVHJhbnNpdGlvbjogcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1NwcmluZ1RyYW5zaXRpb24nKSxcbiAgICBUcmFuc2l0aW9uYWJsZTogcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyksXG4gICAgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm06IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybScpLFxuICAgIFR3ZWVuVHJhbnNpdGlvbjogcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1R3ZWVuVHJhbnNpdGlvbicpLFxuICAgIFdhbGxUcmFuc2l0aW9uOiByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvV2FsbFRyYW5zaXRpb24nKVxuICB9LFxuICB1dGlsaXRpZXM6IHtcbiAgICBLZXlDb2RlczogcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9LZXlDb2RlcycpLFxuICAgIFRpbWVyOiByZXF1aXJlKCdmYW1vdXMvdXRpbGl0aWVzL1RpbWVyJyksXG4gICAgVXRpbGl0eTogcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9VdGlsaXR5JylcbiAgfSxcbiAgdmlld3M6IHtcbiAgICBDb250ZXh0dWFsVmlldzogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL0NvbnRleHR1YWxWaWV3JyksXG4gICAgRGVjazogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL0RlY2snKSxcbiAgICBFZGdlU3dhcHBlcjogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL0VkZ2VTd2FwcGVyJyksXG4gICAgRmxleGlibGVMYXlvdXQ6IHJlcXVpcmUoJ2ZhbW91cy92aWV3cy9GbGV4aWJsZUxheW91dCcpLFxuICAgIEZsaXBwZXI6IHJlcXVpcmUoJ2ZhbW91cy92aWV3cy9GbGlwcGVyJyksXG4gICAgR3JpZExheW91dDogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL0dyaWRMYXlvdXQnKSxcbiAgICBIZWFkZXJGb290ZXJMYXlvdXQ6IHJlcXVpcmUoJ2ZhbW91cy92aWV3cy9IZWFkZXJGb290ZXJMYXlvdXQnKSxcbiAgICBMaWdodGJveDogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL0xpZ2h0Ym94JyksXG4gICAgUmVuZGVyQ29udHJvbGxlcjogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL1JlbmRlckNvbnRyb2xsZXInKSxcbiAgICBTY3JvbGxDb250YWluZXI6IHJlcXVpcmUoJ2ZhbW91cy92aWV3cy9TY3JvbGxDb250YWluZXInKSxcbiAgICBTY3JvbGxlcjogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL1Njcm9sbGVyJyksXG4gICAgU2Nyb2xsdmlldzogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL1Njcm9sbHZpZXcnKSxcbiAgICBTZXF1ZW50aWFsTGF5b3V0OiByZXF1aXJlKCdmYW1vdXMvdmlld3MvU2VxdWVudGlhbExheW91dCcpXG4gIH0sXG4gIHdpZGdldHM6IHtcbiAgICBOYXZpZ2F0aW9uQmFyOiByZXF1aXJlKCdmYW1vdXMvd2lkZ2V0cy9OYXZpZ2F0aW9uQmFyJyksXG4gICAgU2xpZGVyOiByZXF1aXJlKCdmYW1vdXMvd2lkZ2V0cy9TbGlkZXInKSxcbiAgICBUYWJCYXI6IHJlcXVpcmUoJ2ZhbW91cy93aWRnZXRzL1RhYkJhcicpLFxuICAgIFRvZ2dsZUJ1dHRvbjogcmVxdWlyZSgnZmFtb3VzL3dpZGdldHMvVG9nZ2xlQnV0dG9uJylcbiAgfVxufTtcbiIsInZhciBjc3MgPSBcImh0bWwge1xcbiAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXFxuLmJhY2tmYWNlVmlzaWJpbGl0eSB7XFxuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG5cIjsgKHJlcXVpcmUoXCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2Nzc2lmeVwiKSkoY3NzKTsgbW9kdWxlLmV4cG9ydHMgPSBjc3M7IiwidmFyIGNzcyA9IFwiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxcbiAqXFxuICogT3duZXI6IG1hcmtAZmFtby51c1xcbiAqIEBsaWNlbnNlIE1QTCAyLjBcXG4gKiBAY29weXJpZ2h0IEZhbW91cyBJbmR1c3RyaWVzLCBJbmMuIDIwMTRcXG4gKi9cXG5cXG5cXG5odG1sIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIHBhZGRpbmc6IDBweDtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICAtd2Via2l0LXBlcnNwZWN0aXZlOiAwO1xcbiAgICBwZXJzcGVjdGl2ZTogbm9uZTtcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLmZhbW91cy1jb250YWluZXIsIC5mYW1vdXMtZ3JvdXAge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMHB4O1xcbiAgICBsZWZ0OiAwcHg7XFxuICAgIGJvdHRvbTogMHB4O1xcbiAgICByaWdodDogMHB4O1xcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4uZmFtb3VzLWdyb3VwIHtcXG4gICAgd2lkdGg6IDBweDtcXG4gICAgaGVpZ2h0OiAwcHg7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBwYWRkaW5nOiAwcHg7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG59XFxuXFxuLmZhbW91cy1zdXJmYWNlIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XFxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XFxuICAgIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiBoaWRkZW47XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBmbGF0O1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkOyAvKiBwZXJmb3JtYW5jZSAqL1xcbiAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIC1tb3otYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XFxufVxcblxcbi5mYW1vdXMtY29udGFpbmVyLWdyb3VwIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cIjsgKHJlcXVpcmUoXCIvaG9tZS9qZW5zL21qbi1mYW1vdXMvbm9kZV9tb2R1bGVzL2Nzc2lmeVwiKSkoY3NzKTsgbW9kdWxlLmV4cG9ydHMgPSBjc3M7IiwiLy8gbG9hZCBjc3NcbnJlcXVpcmUoJy4vZmFtb3VzLmNzcycpO1xucmVxdWlyZSgnLi9hcHAuY3NzJyk7XG4iXX0=
