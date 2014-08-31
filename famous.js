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
var _originZeroZero = [
        0,
        0
    ];
function _getElementSize(element) {
    return [
        element.clientWidth,
        element.clientHeight
    ];
}
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
        origin: _originZeroZero,
        align: null,
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
        this.container.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
        this.container.style.webkitPerspective = perspective ? perspective.toFixed() : '';
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
var usePrefix = document.createElement('div').style.webkitTransform !== undefined;
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
Engine.getOptions = function getOptions() {
    return optionsManager.getOptions.apply(optionsManager, arguments);
};
Engine.setOptions = function setOptions(options) {
    return optionsManager.setOptions.apply(optionsManager, arguments);
};
Engine.createContext = function createContext(el) {
    if (!initialized && options.appMode)
        initialize();
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
    this._legacyStates = {};
    this._output = {
        transform: Transform.identity,
        opacity: 1,
        origin: null,
        align: null,
        size: null,
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
    this._transformGetter = null;
    this._opacityGetter = null;
    this._originGetter = null;
    this._alignGetter = null;
    this._sizeGetter = null;
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
    return this._value[key];
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
OptionsManager.prototype.value = function value() {
    return this._value;
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
var _originZeroZero = [
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
        align = parentContext.align || parentContext.origin;
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
            origin: parentContext.origin || _originZeroZero,
            align: parentContext.align || parentContext.origin || _originZeroZero,
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
        if (spec.size) {
            var parentSize = parentContext.size;
            size = [
                spec.size[0] !== undefined ? spec.size[0] : parentSize[0],
                spec.size[1] !== undefined ? spec.size[1] : parentSize[1]
            ];
            if (parentSize) {
                if (!align)
                    align = origin;
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
    this.content = '';
    this.classList = [];
    this.size = null;
    this._classesDirty = true;
    this._stylesDirty = true;
    this._sizeDirty = true;
    this._contentDirty = true;
    this._dirtyClasses = [];
    if (options)
        this.setOptions(options);
    this._currentTarget = null;
}
Surface.prototype = Object.create(ElementOutput.prototype);
Surface.prototype.constructor = Surface;
Surface.prototype.elementType = 'div';
Surface.prototype.elementClass = 'famous-surface';
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
    }
    if (this._stylesDirty) {
        _applyStyles.call(this, target);
        this._stylesDirty = false;
    }
    if (this.size) {
        var origSize = context.size;
        size = [
            this.size[0],
            this.size[1]
        ];
        if (size[0] === undefined)
            size[0] = origSize[0];
        else if (size[0] === true)
            size[0] = target.clientWidth;
        if (size[1] === undefined)
            size[1] = origSize[1];
        else if (size[1] === true)
            size[1] = target.clientHeight;
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
        this._sizeDirty = false;
    }
    if (this._contentDirty) {
        this.deploy(target);
        this._eventOutput.emit('deploy');
        this._contentDirty = false;
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
    this._size = null;
    _cleanupStyles.call(this, target);
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
    return this._size;
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
View.prototype.getOptions = function getOptions() {
    return this._optionsManager.value();
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
    this._previousNode = null;
    this._nextNode = null;
}
ViewSequence.Backing = function Backing(array) {
    this.array = array;
    this.firstIndex = 0;
    this.loop = false;
    this.firstNode = null;
    this.lastNode = null;
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
};
ViewSequence.prototype.push = function push(value) {
    this._.array.push.apply(this._.array, arguments);
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
};
ViewSequence.prototype.get = function get() {
    return this._.getValue(this.index);
};
ViewSequence.prototype.getSize = function getSize() {
    var target = this.get();
    return target ? target.getSize() : null;
};
ViewSequence.prototype.render = function render() {
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
    this._modifier = new Modifier({
        transform: this._transformState,
        opacity: this._opacityState,
        origin: null,
        align: null,
        size: null
    });
    this._hasOrigin = false;
    this._hasAlign = false;
    this._hasSize = false;
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
StateModifier.prototype.halt = function halt() {
    this._transformState.halt();
    this._opacityState.halt();
    this._originState.halt();
    this._alignState.halt();
    this._sizeState.halt();
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
    this._agents = {};
    this._forces = [];
    this._constraints = [];
    this._buffer = 0;
    this._prevTime = now();
    this._isSleeping = false;
    this._eventHandler = null;
    this._currAgentId = 0;
    this._hasBodies = false;
}
var TIMESTEP = 17;
var MIN_TIME_STEP = 1000 / 120;
var MAX_TIME_STEP = 17;
PhysicsEngine.DEFAULT_OPTIONS = {
    constraintSteps: 1,
    sleepTolerance: 1e-7
};
var now = function () {
        return Date.now;
    }();
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
    return body;
};
PhysicsEngine.prototype.removeBody = function removeBody(body) {
    var array = body.isBody ? this._bodies : this._particles;
    var index = array.indexOf(body);
    if (index > -1) {
        for (var i = 0; i < Object.keys(this._agents).length; i++)
            this.detachFrom(i, body);
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
    this._agents[this._currAgentId] = {
        agent: agent,
        targets: targets,
        source: source
    };
    _mapAgentArray.call(this, agent).push(this._currAgentId);
    return this._currAgentId++;
}
PhysicsEngine.prototype.attach = function attach(agents, targets, source) {
    if (agents instanceof Array) {
        var agentIDs = [];
        for (var i = 0; i < agents.length; i++)
            agentIDs[i] = _attachOne.call(this, agents[i], targets, source);
        return agentIDs;
    } else
        return _attachOne.call(this, agents, targets, source);
};
PhysicsEngine.prototype.attachTo = function attachTo(agentID, target) {
    _getBoundAgent.call(this, agentID).targets.push(target);
};
PhysicsEngine.prototype.detach = function detach(id) {
    var agent = this.getAgent(id);
    var agentArray = _mapAgentArray.call(this, agent);
    var index = agentArray.indexOf(id);
    agentArray.splice(index, 1);
    delete this._agents[id];
};
PhysicsEngine.prototype.detachFrom = function detachFrom(id, target) {
    var boundAgent = _getBoundAgent.call(this, id);
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
    this._agents = {};
    this._forces = [];
    this._constraints = [];
    this._currAgentId = 0;
};
function _getBoundAgent(id) {
    return this._agents[id];
}
PhysicsEngine.prototype.getAgent = function getAgent(id) {
    return _getBoundAgent.call(this, id).agent;
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
    var boundAgent = _getBoundAgent.call(this, this._forces[index]);
    boundAgent.agent.applyForce(boundAgent.targets, boundAgent.source);
}
function _updateForces() {
    for (var index = this._forces.length - 1; index > -1; index--)
        _updateForce.call(this, index);
}
function _updateConstraint(index, dt) {
    var boundAgent = this._agents[this._constraints[index]];
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
function _updateVelocities(particle, dt) {
    particle.integrateVelocity(dt);
}
function _updateAngularVelocities(body, dt) {
    body.integrateAngularMomentum(dt);
    body.updateAngularVelocity();
}
function _updateOrientations(body, dt) {
    body.integrateOrientation(dt);
}
function _updatePositions(particle, dt) {
    particle.integratePosition(dt);
    particle.emit('update', particle);
}
function _integrate(dt) {
    _updateForces.call(this, dt);
    this.forEach(_updateVelocities, dt);
    this.forEachBody(_updateAngularVelocities, dt);
    _updateConstraints.call(this, dt);
    this.forEachBody(_updateOrientations, dt);
    this.forEach(_updatePositions, dt);
}
function _getEnergyParticles() {
    var energy = 0;
    var particleEnergy = 0;
    this.forEach(function (particle) {
        particleEnergy = particle.getEnergy();
        energy += particleEnergy;
        if (particleEnergy < particle.sleepTolerance)
            particle.sleep();
    });
    return energy;
}
function _getEnergyForces() {
    var energy = 0;
    for (var index = this._forces.length - 1; index > -1; index--)
        energy += this._forces[index].getEnergy() || 0;
    return energy;
}
function _getEnergyConstraints() {
    var energy = 0;
    for (var index = this._constraints.length - 1; index > -1; index--)
        energy += this._constraints[index].getEnergy() || 0;
    return energy;
}
PhysicsEngine.prototype.getEnergy = function getEnergy() {
    return _getEnergyParticles.call(this) + _getEnergyForces.call(this) + _getEnergyConstraints.call(this);
};
PhysicsEngine.prototype.step = function step() {
    var currTime = now();
    var dtFrame = currTime - this._prevTime;
    this._prevTime = currTime;
    if (dtFrame < MIN_TIME_STEP)
        return;
    if (dtFrame > MAX_TIME_STEP)
        dtFrame = MAX_TIME_STEP;
    _integrate.call(this, TIMESTEP);
};
PhysicsEngine.prototype.isSleeping = function isSleeping() {
    return this._isSleeping;
};
PhysicsEngine.prototype.sleep = function sleep() {
    this.emit('end', this);
    this._isSleeping = true;
};
PhysicsEngine.prototype.wake = function wake() {
    this._prevTime = now();
    this.emit('start', this);
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
    this.setMomentsOfInertia();
    this.angularVelocity.w = 0;
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
Body.AXES = Particle.AXES;
Body.SLEEP_TOLERANCE = Particle.SLEEP_TOLERANCE;
Body.INTEGRATOR = Particle.INTEGRATOR;
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
    Body.INTEGRATOR.integrateAngularMomentum(this, dt);
};
Body.prototype.integrateOrientation = function integrateOrientation(dt) {
    Body.INTEGRATOR.integrateOrientation(this, dt);
};
module.exports = Body;
},{"./Particle":49,"famous/core/Transform":20,"famous/math/Matrix":37,"famous/math/Quaternion":38,"famous/math/Vector":41}],48:[function(require,module,exports){
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
    this.position = new Vector();
    this.velocity = new Vector();
    this.force = new Vector();
    var defaults = Particle.DEFAULT_OPTIONS;
    this.setPosition(options.position || defaults.position);
    this.setVelocity(options.velocity || defaults.velocity);
    this.force.set(options.force || [
        0,
        0,
        0
    ]);
    this.mass = options.mass !== undefined ? options.mass : defaults.mass;
    this.axis = options.axis !== undefined ? options.axis : defaults.axis;
    this.inverseMass = 1 / this.mass;
    this._isSleeping = false;
    this._engine = null;
    this._eventOutput = null;
    this._positionGetter = null;
    this.transform = Transform.identity.slice();
    this._spec = {
        transform: this.transform,
        target: null
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
    mass: 1,
    axis: undefined
};
Particle.SLEEP_TOLERANCE = 1e-7;
Particle.AXES = {
    X: 0,
    Y: 1,
    Z: 2
};
Particle.INTEGRATOR = new Integrator();
var _events = {
        start: 'start',
        update: 'update',
        end: 'end'
    };
var now = function () {
        return Date.now;
    }();
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
};
Particle.prototype.isBody = false;
Particle.prototype.setPosition = function setPosition(position) {
    this.position.set(position);
};
Particle.prototype.setPosition1D = function setPosition1D(x) {
    this.position.x = x;
};
Particle.prototype.getPosition = function getPosition() {
    if (this._positionGetter instanceof Function)
        this.setPosition(this._positionGetter());
    this._engine.step();
    return this.position.get();
};
Particle.prototype.getPosition1D = function getPosition1D() {
    this._engine.step();
    return this.position.x;
};
Particle.prototype.positionFrom = function positionFrom(positionGetter) {
    this._positionGetter = positionGetter;
};
Particle.prototype.setVelocity = function setVelocity(velocity) {
    this.velocity.set(velocity);
    this.wake();
};
Particle.prototype.setVelocity1D = function setVelocity1D(x) {
    this.velocity.x = x;
    this.wake();
};
Particle.prototype.getVelocity = function getVelocity() {
    return this.velocity.get();
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
    Particle.INTEGRATOR.integrateVelocity(this, dt);
};
Particle.prototype.integratePosition = function integratePosition(dt) {
    Particle.INTEGRATOR.integratePosition(this, dt);
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
    var axis = this.axis;
    var transform = this.transform;
    if (axis !== undefined) {
        if (axis & ~Particle.AXES.X) {
            position.x = 0;
        }
        if (axis & ~Particle.AXES.Y) {
            position.y = 0;
        }
        if (axis & ~Particle.AXES.Z) {
            position.z = 0;
        }
    }
    transform[12] = position.x;
    transform[13] = position.y;
    transform[14] = position.z;
    return transform;
};
Particle.prototype.modify = function modify(target) {
    var _spec = this._spec;
    _spec.transform = this.getTransform();
    _spec.target = target;
    return _spec;
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
    this._energy = 0;
    this._eventOutput = null;
}
Constraint.prototype.setOptions = function setOptions(options) {
    for (var key in options)
        this.options[key] = options[key];
};
Constraint.prototype.applyConstraint = function applyConstraint() {
};
Constraint.prototype.getEnergy = function getEnergy() {
    return this._energy;
};
Constraint.prototype.setEnergy = function setEnergy(energy) {
    this._energy = energy;
};
function _createEventOutput() {
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Constraint.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
Constraint.prototype.addListener = function addListener() {
    _createEventOutput.call(this);
    return this.addListener.apply(this, arguments);
};
Constraint.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
Constraint.prototype.removeListener = function removeListener() {
    return this.removeListener.apply(this, arguments);
};
Constraint.prototype.unpipe = function unpipe() {
    return this.unpipe.apply(this, arguments);
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
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.pDiff = new Vector();
    this.vDiff = new Vector();
    this.impulse1 = new Vector();
    this.impulse2 = new Vector();
    Constraint.call(this);
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
function _calcEnergy(impulse, disp, dt) {
    return Math.abs(impulse.dot(disp) / dt);
}
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
};
Snap.prototype.setAnchor = function setAnchor(v) {
    if (this.options.anchor !== undefined)
        this.options.anchor = new Vector();
    this.options.anchor.set(v);
};
Snap.prototype.getEnergy = function getEnergy(target, source) {
    var options = this.options;
    var restLength = options.length;
    var anchor = options.anchor || source.position;
    var strength = Math.pow(2 * pi / options.period, 2);
    var dist = anchor.sub(target.position).norm() - restLength;
    return 0.5 * strength * dist * dist;
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
        this.setEnergy(_calcEnergy(impulse1, pDiff, dt));
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
    this._energy = 0;
    this._eventOutput = null;
}
Force.prototype.setOptions = function setOptions(options) {
    for (var key in options)
        this.options[key] = options[key];
};
Force.prototype.applyForce = function applyForce(body) {
    body.applyForce(this.force);
};
Force.prototype.getEnergy = function getEnergy() {
    return this._energy;
};
Force.prototype.setEnergy = function setEnergy(energy) {
    this._energy = energy;
};
function _createEventOutput() {
    this._eventOutput = new EventHandler();
    this._eventOutput.bindThis(this);
    EventHandler.setOutputHandler(this, this._eventOutput);
}
Force.prototype.on = function on() {
    _createEventOutput.call(this);
    return this.on.apply(this, arguments);
};
Force.prototype.addListener = function addListener() {
    _createEventOutput.call(this);
    return this.addListener.apply(this, arguments);
};
Force.prototype.pipe = function pipe() {
    _createEventOutput.call(this);
    return this.pipe.apply(this, arguments);
};
Force.prototype.removeListener = function removeListener() {
    return this.removeListener.apply(this, arguments);
};
Force.prototype.unpipe = function unpipe() {
    return this.unpipe.apply(this, arguments);
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
var Spring = require('./Spring');
function RotationalSpring(options) {
    Spring.call(this, options);
}
RotationalSpring.prototype = Object.create(Spring.prototype);
RotationalSpring.prototype.constructor = RotationalSpring;
RotationalSpring.DEFAULT_OPTIONS = Spring.DEFAULT_OPTIONS;
RotationalSpring.FORCE_FUNCTIONS = Spring.FORCE_FUNCTIONS;
RotationalSpring.prototype.applyForce = function applyForce(targets) {
    var force = this.force;
    var options = this.options;
    var disp = this.disp;
    var stiffness = options.stiffness;
    var damping = options.damping;
    var restLength = options.length;
    var anchor = options.anchor;
    for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        disp.set(anchor.sub(target.orientation));
        var dist = disp.norm() - restLength;
        if (dist === 0)
            return;
        var m = target.mass;
        stiffness *= m;
        damping *= m;
        force.set(disp.normalize(stiffness * this.forceFunction(dist, this.options.lMax)));
        if (damping)
            force.set(force.add(target.angularVelocity.mult(-damping)));
        target.applyTorque(force);
    }
};
RotationalSpring.prototype.getEnergy = function getEnergy(target) {
    var options = this.options;
    var restLength = options.length;
    var anchor = options.anchor;
    var strength = options.stiffness;
    var dist = anchor.sub(target.orientation).norm() - restLength;
    return 0.5 * strength * dist * dist;
};
module.exports = RotationalSpring;
},{"./Spring":64}],64:[function(require,module,exports){
var Force = require('./Force');
var Vector = require('famous/math/Vector');
function Spring(options) {
    this.options = Object.create(this.constructor.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    this.disp = new Vector(0, 0, 0);
    _init.call(this);
    Force.call(this);
}
Spring.prototype = Object.create(Force.prototype);
Spring.prototype.constructor = Spring;
var pi = Math.PI;
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
function _setForceFunction(fn) {
    this.forceFunction = fn;
}
function _calcStiffness() {
    var options = this.options;
    options.stiffness = Math.pow(2 * pi / options.period, 2);
}
function _calcDamping() {
    var options = this.options;
    options.damping = 4 * pi * options.dampingRatio / options.period;
}
function _calcEnergy(strength, dist) {
    return 0.5 * strength * dist * dist;
}
function _init() {
    _setForceFunction.call(this, this.options.forceFunction);
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
    if (options.period !== undefined)
        this.options.period = options.period;
    if (options.dampingRatio !== undefined)
        this.options.dampingRatio = options.dampingRatio;
    if (options.length !== undefined)
        this.options.length = options.length;
    if (options.forceFunction !== undefined)
        this.options.forceFunction = options.forceFunction;
    if (options.maxLength !== undefined)
        this.options.maxLength = options.maxLength;
    _init.call(this);
};
Spring.prototype.applyForce = function applyForce(targets, source) {
    var force = this.force;
    var disp = this.disp;
    var options = this.options;
    var stiffness = options.stiffness;
    var damping = options.damping;
    var restLength = options.length;
    var lMax = options.maxLength;
    var anchor = options.anchor || source.position;
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
        disp.normalize(stiffness * this.forceFunction(dist, lMax)).put(force);
        if (damping)
            if (source)
                force.add(v2.sub(source.velocity).mult(-damping)).put(force);
            else
                force.add(v2.mult(-damping)).put(force);
        target.applyForce(force);
        if (source)
            source.applyForce(force.mult(-1));
        this.setEnergy(_calcEnergy(stiffness, dist));
    }
};
Spring.prototype.getEnergy = function getEnergy(target) {
    var options = this.options;
    var restLength = options.length;
    var anchor = options.anchor;
    var strength = options.stiffness;
    var dist = anchor.sub(target.position).norm() - restLength;
    return 0.5 * strength * dist * dist;
};
Spring.prototype.setAnchor = function setAnchor(anchor) {
    if (!this.options.anchor)
        this.options.anchor = new Vector();
    this.options.anchor.set(anchor);
};
module.exports = Spring;
},{"./Force":60,"famous/math/Vector":41}],65:[function(require,module,exports){
var Force = require('./Force');
var Vector = require('famous/math/Vector');
function VectorField(options) {
    this.options = Object.create(VectorField.DEFAULT_OPTIONS);
    if (options)
        this.setOptions(options);
    _setFieldOptions.call(this, this.options.field);
    Force.call(this);
    this.evaluation = new Vector(0, 0, 0);
}
VectorField.prototype = Object.create(Force.prototype);
VectorField.prototype.constructor = VectorField;
VectorField.FIELDS = {
    CONSTANT: function (v, options) {
        return v.set(options.direction);
    },
    LINEAR: function (v) {
        return v;
    },
    RADIAL: function (v) {
        return v.set(v.mult(-1, v));
    },
    SPHERE_ATTRACTOR: function (v, options) {
        return v.set(v.mult((options.radius - v.norm()) / v.norm()));
    },
    POINT_ATTRACTOR: function (v, options) {
        return v.set(options.position.sub(v));
    }
};
VectorField.DEFAULT_OPTIONS = {
    strength: 1,
    field: VectorField.FIELDS.CONSTANT
};
VectorField.prototype.setOptions = function setOptions(options) {
    for (var key in options)
        this.options[key] = options[key];
};
function _setFieldOptions(field) {
    var FIELDS = VectorField.FIELDS;
    switch (field) {
    case FIELDS.CONSTANT:
        if (!this.options.direction)
            this.options.direction = new Vector(0, 1, 0);
        break;
    case FIELDS.POINT_ATTRACTOR:
        if (!this.options.position)
            this.options.position = new Vector(0, 0, 0);
        break;
    case FIELDS.SPHERE_ATTRACTOR:
        if (!this.options.radius)
            this.options.radius = 1;
        break;
    }
}
function _evaluate(v) {
    var evaluation = this.evaluation;
    var field = this.options.field;
    evaluation.set(v);
    return field(evaluation, this.options);
}
VectorField.prototype.applyForce = function applyForce(targets) {
    var force = this.force;
    for (var i = 0; i < targets.length; i++) {
        var particle = targets[i];
        force.set(_evaluate.call(this, particle.position).mult(particle.mass * this.options.strength));
        particle.applyForce(force);
    }
};
module.exports = VectorField;
},{"./Force":60,"famous/math/Vector":41}],66:[function(require,module,exports){
var OptionsManager = require('famous/core/OptionsManager');
function SymplecticEuler(options) {
    this.options = Object.create(SymplecticEuler.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    if (options)
        this.setOptions(options);
}
SymplecticEuler.DEFAULT_OPTIONS = {
    velocityCap: undefined,
    angularVelocityCap: undefined
};
SymplecticEuler.prototype.setOptions = function setOptions(options) {
    this._optionsManager.patch(options);
};
SymplecticEuler.prototype.getOptions = function getOptions() {
    return this._optionsManager.value();
};
SymplecticEuler.prototype.integrateVelocity = function integrateVelocity(body, dt) {
    var v = body.velocity;
    var w = body.inverseMass;
    var f = body.force;
    if (f.isZero())
        return;
    v.add(f.mult(dt * w)).put(v);
    f.clear();
};
SymplecticEuler.prototype.integratePosition = function integratePosition(body, dt) {
    var p = body.position;
    var v = body.velocity;
    if (this.options.velocityCap)
        v.cap(this.options.velocityCap).put(v);
    p.add(v.mult(dt)).put(p);
};
SymplecticEuler.prototype.integrateAngularMomentum = function integrateAngularMomentum(body, dt) {
    var L = body.angularMomentum;
    var t = body.torque;
    if (t.isZero())
        return;
    if (this.options.angularVelocityCap)
        t.cap(this.options.angularVelocityCap).put(t);
    L.add(t.mult(dt)).put(L);
    t.clear();
};
SymplecticEuler.prototype.integrateOrientation = function integrateOrientation(body, dt) {
    var q = body.orientation;
    var w = body.angularVelocity;
    if (w.isZero())
        return;
    q.add(q.multiply(w).scalarMultiply(0.5 * dt)).put(q);
};
module.exports = SymplecticEuler;
},{"famous/core/OptionsManager":15}],67:[function(require,module,exports){
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
    return this._currTarget ? this._currTarget.getContext(contextId) : this._backBuffer.getContext(contextId);
};
CanvasSurface.prototype.setSize = function setSize(size, canvasSize) {
    Surface.prototype.setSize.apply(this, arguments);
    if (canvasSize)
        this._canvasSize = [
            canvasSize[0],
            canvasSize[1]
        ];
    if (this._currTarget) {
        this._currTarget.width = this._canvasSize[0];
        this._currTarget.height = this._canvasSize[1];
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
        if (event.target !== this._currTarget)
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
    if (this._currTarget)
        this._currTarget.focus();
    return this;
};
InputSurface.prototype.blur = function blur() {
    if (this._currTarget)
        this._currTarget.blur();
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
    if (this._currTarget) {
        return this._currTarget.value;
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
    if (this._currTarget)
        this._currTarget.focus();
    return this;
};
TextareaSurface.prototype.blur = function blur() {
    if (this._currTarget)
        this._currTarget.blur();
    return this;
};
TextareaSurface.prototype.setValue = function setValue(str) {
    this._value = str;
    this._contentDirty = true;
    return this;
};
TextareaSurface.prototype.getValue = function getValue() {
    if (this._currTarget) {
        return this._currTarget.value;
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
    return this.particle.getEnergy() + this.spring.getEnergy(this.particle);
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
    return this.particle.getEnergy() + this.spring.getEnergy(this.particle);
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
    this._final = this.get();
    this.translate.halt();
    this.rotate.halt();
    this.skew.halt();
    this.scale.halt();
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
    return this.particle.getEnergy() + this.spring.getEnergy(this.particle);
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
        a = {};
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
ContextualView.prototype.getOptions = function getOptions() {
    return this._optionsManager.getOptions();
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
    EventHandler.setInputHandler(this, this.scrollview);
    EventHandler.setOutputHandler(this, this.scrollview);
    this.scrollview.subscribe(this.container);
}
ScrollContainer.DEFAULT_OPTIONS = {
    container: { properties: { overflow: 'hidden' } },
    scrollview: { direction: Utility.Direction.Y }
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
    return this.container.render.apply(this.container, arguments);
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
function _sizeForDir(size) {
    if (!size)
        size = this._contextSize;
    var dimension = this.options.direction === Utility.Direction.X ? 0 : 1;
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
    if (this.options.clipSize)
        return this.options.clipSize;
    else
        return _sizeForDir.call(this, this._contextSize);
}
Scroller.prototype.setOptions = function setOptions(options) {
    this._optionsManager.setOptions(options);
    if (this.options.groupScroll) {
        this.group.pipe(this._eventOutput);
    } else {
        this.group.unpipe(this._eventOutput);
    }
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
function _normalizeState() {
    var nodeSize = _sizeForDir.call(this, this._node.getSize());
    var nextNode = this._node && this._node.getNext ? this._node.getNext() : null;
    while (nextNode && this._position + this._positionOffset >= nodeSize) {
        this._positionOffset -= nodeSize;
        this._node = nextNode;
        nodeSize = _sizeForDir.call(this, this._node.getSize());
        nextNode = this._node && this._node.getNext ? this._node.getNext() : null;
    }
    var prevNode = this._node && this._node.getPrevious ? this._node.getPrevious() : null;
    while (prevNode && this._position + this._positionOffset < 0) {
        var prevNodeSize = _sizeForDir.call(this, prevNode.getSize());
        this._positionOffset += prevNodeSize;
        this._node = prevNode;
        prevNode = this._node && this._node.getPrevious ? this._node.getPrevious() : null;
    }
}
function _innerRender() {
    var size = null;
    var position = this._position;
    var result = [];
    this._onEdge = 0;
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
    var edgeSize = nodesSize !== undefined && nodesSize < clipSize ? nodesSize : clipSize;
    if (!currNode && offset - position <= edgeSize) {
        this._onEdge = 1;
        this._eventOutput.emit('edgeHit', { position: offset - edgeSize });
    } else if (!this._node.getPrevious() && position <= 0) {
        this._onEdge = -1;
        this._eventOutput.emit('edgeHit', { position: 0 });
    }
    currNode = this._node && this._node.getPrevious ? this._node.getPrevious() : null;
    offset = -this._positionOffset;
    if (currNode) {
        size = currNode.getSize ? currNode.getSize() : this._contextSize;
        offset -= _sizeForDir.call(this, size);
    }
    while (currNode && offset - position > -(_getClipSize.call(this) + this.options.margin)) {
        _output.call(this, currNode, offset, result);
        currNode = currNode.getPrevious ? currNode.getPrevious() : null;
        if (currNode) {
            size = currNode.getSize ? currNode.getSize() : this._contextSize;
            offset -= _sizeForDir.call(this, size);
        }
    }
    _normalizeState.call(this);
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
function Scrollview(options) {
    this.options = Object.create(Scrollview.DEFAULT_OPTIONS);
    this._optionsManager = new OptionsManager(this.options);
    this._node = null;
    this._physicsEngine = new PhysicsEngine();
    this._particle = new Particle();
    this._physicsEngine.addBody(this._particle);
    this.spring = new Spring({
        anchor: [
            0,
            0,
            0
        ]
    });
    this.drag = new Drag({ forceFunction: Drag.FORCE_FUNCTIONS.QUADRATIC });
    this.friction = new Drag({ forceFunction: Drag.FORCE_FUNCTIONS.LINEAR });
    this.sync = new GenericSync([
        'scroll',
        'touch'
    ], {
        direction: this.options.direction,
        preventDefault: this.options.preventDefault
    });
    this._eventInput = new EventHandler();
    this._eventOutput = new EventHandler();
    this._eventInput.pipe(this.sync);
    this.sync.pipe(this._eventInput);
    EventHandler.setInputHandler(this, this._eventInput);
    EventHandler.setOutputHandler(this, this._eventOutput);
    this._touchCount = 0;
    this._springState = SpringStates.NONE;
    this._onEdge = 0;
    this._pageSpringPosition = 0;
    this._edgeSpringPosition = 0;
    this._touchVelocity = undefined;
    this._earlyEnd = false;
    this._needsPaginationCheck = false;
    this._scroller = new Scroller();
    this._scroller.positionFrom(this.getPosition.bind(this));
    this.setOptions(options);
    _bindEvents.call(this);
}
Scrollview.DEFAULT_OPTIONS = {
    direction: Utility.Direction.Y,
    rails: true,
    friction: 0.001,
    drag: 0.0001,
    edgeGrip: 0.5,
    edgePeriod: 300,
    edgeDamp: 1,
    margin: 1000,
    paginated: false,
    pagePeriod: 500,
    pageDamp: 0.8,
    pageStopSpeed: 10,
    pageSwitchSpeed: 0.5,
    speedLimit: 10,
    groupScroll: false
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
    if (this._onEdge && event.slip) {
        if (velocity < 0 && this._onEdge < 0 || velocity > 0 && this._onEdge > 0) {
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
    if (event.slip)
        this.setVelocity(velocity);
    else
        this.setPosition(this.getPosition() + delta);
}
function _handleEnd(event) {
    this._touchCount = event.count || 0;
    if (!this._touchCount) {
        _detachAgents.call(this);
        if (this._onEdge)
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
        this._touchVelocity = undefined;
        this._needsPaginationCheck = true;
    }
}
function _bindEvents() {
    this._eventInput.bindThis(this);
    this._eventInput.on('start', _handleStart);
    this._eventInput.on('update', _handleMove);
    this._eventInput.on('end', _handleEnd);
    this._scroller.on('edgeHit', function (data) {
        this._edgeSpringPosition = data.position;
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
    var nodeSize = (node.getSize() || this._scroller.getSize())[direction];
    if (!nodeSize)
        nodeSize = this._scroller.getSize()[direction];
    return nodeSize;
}
function _handleEdge(edgeDetected) {
    if (!this._onEdge && edgeDetected) {
        this.sync.setOptions({ scale: this.options.edgeGrip });
        if (!this._touchCount && this._springState !== SpringStates.EDGE) {
            _setSpring.call(this, this._edgeSpringPosition, SpringStates.EDGE);
        }
    } else if (this._onEdge && !edgeDetected) {
        this.sync.setOptions({ scale: 1 });
        if (this._springState && Math.abs(this.getVelocity()) < 0.001) {
            _detachAgents.call(this);
            _attachAgents.call(this);
        }
    }
    this._onEdge = edgeDetected;
}
function _handlePagination() {
    if (!this._needsPaginationCheck)
        return;
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
    var velocityNext = velocity > 0;
    if (positionNext && !velocitySwitch || velocitySwitch && velocityNext)
        this.goToNextPage();
    else
        _setSpring.call(this, 0, SpringStates.PAGE);
    this._needsPaginationCheck = false;
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
    var position = this.getPosition();
    var nodeSize = _nodeSizeForDirection.call(this, this._node);
    var nextNode = this._node.getNext();
    while (position > nodeSize + TOLERANCE && nextNode) {
        _shiftOrigin.call(this, -nodeSize);
        position -= nodeSize;
        this._scroller.sequenceFrom(nextNode);
        this._node = nextNode;
        nextNode = this._node.getNext();
        nodeSize = _nodeSizeForDirection.call(this, this._node);
    }
    var previousNode = this._node.getPrevious();
    var previousNodeSize;
    while (position < -TOLERANCE && previousNode) {
        previousNodeSize = _nodeSizeForDirection.call(this, previousNode);
        this._scroller.sequenceFrom(previousNode);
        this._node = previousNode;
        _shiftOrigin.call(this, previousNodeSize);
        position += previousNodeSize;
        previousNode = this._node.getPrevious();
    }
}
function _shiftOrigin(amount) {
    this._edgeSpringPosition += amount;
    this._pageSpringPosition += amount;
    this.setPosition(this.getPosition() + amount);
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
Scrollview.prototype.outputFrom = function outputFrom() {
    return this._scroller.outputFrom.apply(this._scroller, arguments);
};
Scrollview.prototype.getPosition = function getPosition() {
    return this._particle.getPosition1D();
};
Scrollview.prototype.setPosition = function setPosition(x) {
    this._particle.setPosition1D(x);
};
Scrollview.prototype.getVelocity = function getVelocity() {
    return this._touchCount ? this._touchVelocity : this._particle.getVelocity1D();
};
Scrollview.prototype.setVelocity = function setVelocity(v) {
    this._particle.setVelocity1D(v);
};
Scrollview.prototype.setOptions = function setOptions(options) {
    if (options) {
        if (options.direction !== undefined) {
            if (options.direction === 'x')
                options.direction = Utility.Direction.X;
            else if (options.direction === 'y')
                options.direction = Utility.Direction.Y;
        }
        this._scroller.setOptions(options);
        this._optionsManager.setOptions(options);
    }
    this._scroller.setOptions(this.options);
    if (this.options.groupScroll)
        this._scroller.pipe(this._eventInput);
    else
        this._scroller.unpipe(this._eventInput);
    this.drag.setOptions({ strength: this.options.drag });
    this.friction.setOptions({ strength: this.options.friction });
    this.spring.setOptions({
        period: this.options.edgePeriod,
        dampingRatio: this.options.edgeDamp
    });
    this.sync.setOptions({
        rails: this.options.rails,
        direction: this.options.direction === Utility.Direction.X ? GenericSync.DIRECTION_X : GenericSync.DIRECTION_Y,
        preventDefault: this.options.preventDefault
    });
};
Scrollview.prototype.goToPreviousPage = function goToPreviousPage() {
    if (!this._node)
        return null;
    var previousNode = this._node.getPrevious();
    if (previousNode) {
        var currentPosition = this.getPosition();
        var previousNodeSize = _nodeSizeForDirection.call(this, previousNode);
        this._scroller.sequenceFrom(previousNode);
        this._node = previousNode;
        var previousSpringPosition = currentPosition < TOLERANCE ? -previousNodeSize : 0;
        _setSpring.call(this, previousSpringPosition, SpringStates.PAGE);
        _shiftOrigin.call(this, previousNodeSize);
    }
    this._eventOutput.emit('pageChange', { direction: -1 });
    return previousNode;
};
Scrollview.prototype.goToNextPage = function goToNextPage() {
    if (!this._node)
        return null;
    var nextNode = this._node.getNext();
    if (nextNode) {
        var currentPosition = this.getPosition();
        var currentNodeSize = _nodeSizeForDirection.call(this, this._node);
        var nextNodeSize = _nodeSizeForDirection.call(this, nextNode);
        this._scroller.sequenceFrom(nextNode);
        this._node = nextNode;
        var nextSpringPosition = currentPosition > currentNodeSize - TOLERANCE ? currentNodeSize + nextNodeSize : currentNodeSize;
        _setSpring.call(this, nextSpringPosition, SpringStates.PAGE);
        _shiftOrigin.call(this, -currentNodeSize);
    }
    this._eventOutput.emit('pageChange', { direction: 1 });
    return nextNode;
};
Scrollview.prototype.sequenceFrom = function sequenceFrom(node) {
    if (node instanceof Array)
        node = new ViewSequence({ array: node });
    this._node = node;
    return this._scroller.sequenceFrom(node);
};
Scrollview.prototype.getSize = function getSize() {
    return this._scroller.getSize.apply(this._scroller, arguments);
};
Scrollview.prototype.render = function render() {
    if (!this._node)
        return null;
    _normalizeState.call(this);
    _handleEdge.call(this, this._scroller.onEdge());
    if (this.options.paginated)
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
    this._itemsCache = [];
    this._outputCache = {
        size: null,
        target: this._itemsCache
    };
    if (options)
        this.setOptions(options);
}
SequentialLayout.DEFAULT_OPTIONS = {
    direction: Utility.Direction.Y,
    itemSpacing: 0,
    defaultItemSize: [
        50,
        50
    ]
};
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
    var girth = 0;
    var lengthDim = this.options.direction === Utility.Direction.X ? 0 : 1;
    var girthDim = this.options.direction === Utility.Direction.X ? 1 : 0;
    var currentNode = this._items;
    var result = this._itemsCache;
    var i = 0;
    while (currentNode) {
        var item = currentNode.get();
        if (!item)
            break;
        var itemSize;
        if (item && item.getSize)
            itemSize = item.getSize();
        if (!itemSize)
            itemSize = this.options.defaultItemSize;
        if (itemSize[girthDim] !== true)
            girth = Math.max(girth, itemSize[girthDim]);
        var output = this._outputFunction.call(this, item, length, i);
        result[i] = output;
        if (itemSize[lengthDim] && itemSize[lengthDim] !== true)
            length += itemSize[lengthDim] + this.options.itemSpacing;
        currentNode = currentNode.getNext();
        i++;
    }
    this._itemsCache.splice(i);
    if (!girth)
        girth = undefined;
    if (!this._size)
        this._size = [
            0,
            0
        ];
    this._size[lengthDim] = length - this.options.itemSpacing;
    this._size[girthDim] = girth;
    this._outputCache.size = this.getSize();
    return this._outputCache;
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
var css = "html {\n  background: #fff;\n}\n\n.backfaceVisibility {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n}\n"; (require("/home/jens/famous/node_modules/cssify"))(css); module.exports = css;
},{"/home/jens/famous/node_modules/cssify":1}],106:[function(require,module,exports){
var css = "/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n\nhtml {\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    overflow: hidden;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\nbody {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-font-smoothing: antialiased;\n    -webkit-tap-highlight-color: transparent;\n    -webkit-perspective: 0;\n    perspective: none;\n    overflow: hidden;\n}\n\n.famous-container, .famous-group {\n    position: absolute;\n    top: 0px;\n    left: 0px;\n    bottom: 0px;\n    right: 0px;\n    overflow: visible;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-backface-visibility: visible;\n    backface-visibility: visible;\n    pointer-events: none;\n}\n\n.famous-group {\n    width: 0px;\n    height: 0px;\n    margin: 0px;\n    padding: 0px;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n}\n\n.famous-surface {\n    position: absolute;\n    -webkit-transform-origin: center center;\n    transform-origin: center center;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform-style: flat;\n    transform-style: preserve-3d; /* performance */\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    -webkit-tap-highlight-color: transparent;\n    pointer-events: auto;\n}\n\n.famous-container-group {\n    position: relative;\n    width: 100%;\n    height: 100%;\n}\n"; (require("/home/jens/famous/node_modules/cssify"))(css); module.exports = css;
},{"/home/jens/famous/node_modules/cssify":1}],107:[function(require,module,exports){
// load css
require('./famous.css');
require('./app.css');

},{"./app.css":105,"./famous.css":106}]},{},[104])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvY3NzaWZ5L2Jyb3dzZXIuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9jbGFzc0xpc3QuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9mdW5jdGlvblByb3RvdHlwZUJpbmQuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzLXBvbHlmaWxscy9pbmRleC5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMtcG9seWZpbGxzL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9Db250ZXh0LmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL0VsZW1lbnRBbGxvY2F0b3IuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRWxlbWVudE91dHB1dC5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9FbmdpbmUuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvRW50aXR5LmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL0V2ZW50RW1pdHRlci5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9FdmVudEhhbmRsZXIuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvR3JvdXAuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvTW9kaWZpZXIuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXIuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvUmVuZGVyTm9kZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9TY2VuZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvY29yZS9TcGVjUGFyc2VyLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL1N1cmZhY2UuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvVHJhbnNmb3JtLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9jb3JlL1ZpZXcuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2NvcmUvVmlld1NlcXVlbmNlLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9ldmVudHMvRXZlbnRBcmJpdGVyLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9ldmVudHMvRXZlbnRGaWx0ZXIuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2V2ZW50cy9FdmVudE1hcHBlci5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvaW5wdXRzL0FjY3VtdWxhdG9yLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9pbnB1dHMvRmFzdENsaWNrLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9pbnB1dHMvR2VuZXJpY1N5bmMuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2lucHV0cy9Nb3VzZVN5bmMuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2lucHV0cy9QaW5jaFN5bmMuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL2lucHV0cy9Sb3RhdGVTeW5jLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9pbnB1dHMvU2NhbGVTeW5jLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9pbnB1dHMvU2Nyb2xsU3luYy5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvaW5wdXRzL1RvdWNoU3luYy5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvaW5wdXRzL1RvdWNoVHJhY2tlci5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvaW5wdXRzL1R3b0ZpbmdlclN5bmMuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL21hdGgvTWF0cml4LmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9tYXRoL1F1YXRlcm5pb24uanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL21hdGgvUmFuZG9tLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9tYXRoL1V0aWxpdGllcy5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvbWF0aC9WZWN0b3IuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL21vZGlmaWVycy9EcmFnZ2FibGUuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL21vZGlmaWVycy9GYWRlci5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvbW9kaWZpZXJzL01vZGlmaWVyQ2hhaW4uanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL21vZGlmaWVycy9TdGF0ZU1vZGlmaWVyLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL1BoeXNpY3NFbmdpbmUuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvYm9kaWVzL0JvZHkuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvYm9kaWVzL0NpcmNsZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvYm9kaWVzL1JlY3RhbmdsZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9Db2xsaXNpb24uanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvQ29uc3RyYWludC5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9DdXJ2ZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9EaXN0YW5jZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9TbmFwLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1N1cmZhY2UuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvV2FsbC5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9XYWxscy5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvRHJhZy5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvRm9yY2UuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvZm9yY2VzL1JlcHVsc2lvbi5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvUm90YXRpb25hbERyYWcuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvZm9yY2VzL1JvdGF0aW9uYWxTcHJpbmcuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvZm9yY2VzL1NwcmluZy5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvcGh5c2ljcy9mb3JjZXMvVmVjdG9yRmllbGQuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3BoeXNpY3MvaW50ZWdyYXRvcnMvU3ltcGxlY3RpY0V1bGVyLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9DYW52YXNTdXJmYWNlLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9Db250YWluZXJTdXJmYWNlLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9Gb3JtQ29udGFpbmVyU3VyZmFjZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvc3VyZmFjZXMvSW1hZ2VTdXJmYWNlLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9JbnB1dFN1cmZhY2UuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3N1cmZhY2VzL1N1Ym1pdElucHV0U3VyZmFjZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvc3VyZmFjZXMvVGV4dGFyZWFTdXJmYWNlLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy9zdXJmYWNlcy9WaWRlb1N1cmZhY2UuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3RyYW5zaXRpb25zL0NhY2hlZE1hcC5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdHJhbnNpdGlvbnMvRWFzaW5nLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy90cmFuc2l0aW9ucy9NdWx0aXBsZVRyYW5zaXRpb24uanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3RyYW5zaXRpb25zL1NuYXBUcmFuc2l0aW9uLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy90cmFuc2l0aW9ucy9TcHJpbmdUcmFuc2l0aW9uLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0uanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3RyYW5zaXRpb25zL1R3ZWVuVHJhbnNpdGlvbi5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdHJhbnNpdGlvbnMvV2FsbFRyYW5zaXRpb24uanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3V0aWxpdGllcy9LZXlDb2Rlcy5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdXRpbGl0aWVzL1RpbWVyLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eS5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvQ29udGV4dHVhbFZpZXcuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3ZpZXdzL0RlY2suanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3ZpZXdzL0VkZ2VTd2FwcGVyLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy92aWV3cy9GbGV4aWJsZUxheW91dC5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvRmxpcHBlci5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvR3JpZExheW91dC5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvSGVhZGVyRm9vdGVyTGF5b3V0LmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy92aWV3cy9MaWdodGJveC5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvUmVuZGVyQ29udHJvbGxlci5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvU2Nyb2xsQ29udGFpbmVyLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy92aWV3cy9TY3JvbGxlci5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvU2Nyb2xsdmlldy5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvdmlld3MvU2VxdWVudGlhbExheW91dC5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvd2lkZ2V0cy9OYXZpZ2F0aW9uQmFyLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2ZhbW91cy93aWRnZXRzL1NsaWRlci5qcyIsIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9mYW1vdXMvd2lkZ2V0cy9UYWJCYXIuanMiLCIvaG9tZS9qZW5zL2ZhbW91cy9ub2RlX21vZHVsZXMvZmFtb3VzL3dpZGdldHMvVG9nZ2xlQnV0dG9uLmpzIiwiL2hvbWUvamVucy9mYW1vdXMvc3JjL2luZGV4LmpzIiwiL2hvbWUvamVucy9mYW1vdXMvc3JjL3N0eWxlcy9hcHAuY3NzIiwiL2hvbWUvamVucy9mYW1vdXMvc3JjL3N0eWxlcy9mYW1vdXMuY3NzIiwiL2hvbWUvamVucy9mYW1vdXMvc3JjL3N0eWxlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4ckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM01BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZJQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MsIGN1c3RvbURvY3VtZW50KSB7XG4gIHZhciBkb2MgPSBjdXN0b21Eb2N1bWVudCB8fCBkb2N1bWVudDtcbiAgaWYgKGRvYy5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgZG9jLmNyZWF0ZVN0eWxlU2hlZXQoKS5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHZhciBoZWFkID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sXG4gICAgICAgIHN0eWxlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgXG4gICAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICAgIH1cbiAgICBcbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTsgXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmJ5VXJsID0gZnVuY3Rpb24odXJsKSB7XG4gIGlmIChkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KSB7XG4gICAgZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCh1cmwpO1xuICB9IGVsc2Uge1xuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSxcbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcblxuICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgXG4gICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTsgXG4gIH1cbn07XG4iLCJcbi8qXG4gKiBjbGFzc0xpc3QuanM6IENyb3NzLWJyb3dzZXIgZnVsbCBlbGVtZW50LmNsYXNzTGlzdCBpbXBsZW1lbnRhdGlvbi5cbiAqIDIwMTEtMDYtMTVcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBQdWJsaWMgRG9tYWluLlxuICogTk8gV0FSUkFOVFkgRVhQUkVTU0VEIE9SIElNUExJRUQuIFVTRSBBVCBZT1VSIE9XTiBSSVNLLlxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMqL1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSkpIHtcblxuKGZ1bmN0aW9uICh2aWV3KSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXJcbiAgICAgIGNsYXNzTGlzdFByb3AgPSBcImNsYXNzTGlzdFwiXG4gICAgLCBwcm90b1Byb3AgPSBcInByb3RvdHlwZVwiXG4gICAgLCBlbGVtQ3RyUHJvdG8gPSAodmlldy5IVE1MRWxlbWVudCB8fCB2aWV3LkVsZW1lbnQpW3Byb3RvUHJvcF1cbiAgICAsIG9iakN0ciA9IE9iamVjdFxuICAgICwgc3RyVHJpbSA9IFN0cmluZ1twcm90b1Byb3BdLnRyaW0gfHwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICB9XG4gICAgLCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICBpID0gMFxuICAgICAgICAgICAgLCBsZW4gPSB0aGlzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLy8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG4gICAgLCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgLCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgICAgICAgIFwiU1lOVEFYX0VSUlwiXG4gICAgICAgICAgICAgICAgLCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4KFxuICAgICAgICAgICAgICAgICAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuICAgICAgICAgICAgICAgICwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuICAgIH1cbiAgICAsIENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmNsYXNzTmFtZSlcbiAgICAgICAgICAgICwgY2xhc3NlcyA9IHRyaW1tZWRDbGFzc2VzID8gdHJpbW1lZENsYXNzZXMuc3BsaXQoL1xccysvKSA6IFtdXG4gICAgICAgICAgICAsIGkgPSAwXG4gICAgICAgICAgICAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoXG4gICAgICAgIDtcbiAgICAgICAgZm9yICg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXNoKGNsYXNzZXNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsZW0uY2xhc3NOYW1lID0gdGhpcy50b1N0cmluZygpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAsIGNsYXNzTGlzdFByb3RvID0gQ2xhc3NMaXN0W3Byb3RvUHJvcF0gPSBbXVxuICAgICwgY2xhc3NMaXN0R2V0dGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IENsYXNzTGlzdCh0aGlzKTtcbiAgICB9XG47XG4vLyBNb3N0IERPTUV4Y2VwdGlvbiBpbXBsZW1lbnRhdGlvbnMgZG9uJ3QgYWxsb3cgY2FsbGluZyBET01FeGNlcHRpb24ncyB0b1N0cmluZygpXG4vLyBvbiBub24tRE9NRXhjZXB0aW9ucy4gRXJyb3IncyB0b1N0cmluZygpIGlzIHN1ZmZpY2llbnQgaGVyZS5cbkRPTUV4W3Byb3RvUHJvcF0gPSBFcnJvcltwcm90b1Byb3BdO1xuY2xhc3NMaXN0UHJvdG8uaXRlbSA9IGZ1bmN0aW9uIChpKSB7XG4gICAgcmV0dXJuIHRoaXNbaV0gfHwgbnVsbDtcbn07XG5jbGFzc0xpc3RQcm90by5jb250YWlucyA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgcmV0dXJuIGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgIT09IC0xO1xufTtcbmNsYXNzTGlzdFByb3RvLmFkZCA9IGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHRva2VuICs9IFwiXCI7XG4gICAgaWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG4gICAgICAgIHRoaXMucHVzaCh0b2tlbik7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by5yZW1vdmUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIHZhciBpbmRleCA9IGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbik7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNsYXNzTmFtZSgpO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by50b2dnbGUgPSBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICB0b2tlbiArPSBcIlwiO1xuICAgIGlmIChjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pID09PSAtMSkge1xuICAgICAgICB0aGlzLmFkZCh0b2tlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmUodG9rZW4pO1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbn07XG5cbmlmIChvYmpDdHIuZGVmaW5lUHJvcGVydHkpIHtcbiAgICB2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG4gICAgICAgICAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcbiAgICAgICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgfSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG4gICAgICAgIGlmIChleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG4gICAgICAgICAgICBjbGFzc0xpc3RQcm9wRGVzYy5lbnVtZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgICAgIH1cbiAgICB9XG59IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICBlbGVtQ3RyUHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RHZXR0ZXIpO1xufVxuXG59KHNlbGYpKTtcblxufVxuIiwiaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICAgIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKG9UaGlzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDUgaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGFBcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgZlRvQmluZCA9IHRoaXMsXG4gICAgICAgIGZOT1AgPSBmdW5jdGlvbiAoKSB7fSxcbiAgICAgICAgZkJvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZUb0JpbmQuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGZOT1AgJiYgb1RoaXNcbiAgICAgICAgICAgICAgICA/IHRoaXNcbiAgICAgICAgICAgICAgICA6IG9UaGlzLFxuICAgICAgICAgICAgICAgIGFBcmdzLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZk5PUC5wcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcbiAgICAgICAgZkJvdW5kLnByb3RvdHlwZSA9IG5ldyBmTk9QKCk7XG5cbiAgICAgICAgcmV0dXJuIGZCb3VuZDtcbiAgICB9O1xufVxuIiwicmVxdWlyZSgnLi9jbGFzc0xpc3QuanMnKTtcbnJlcXVpcmUoJy4vZnVuY3Rpb25Qcm90b3R5cGVCaW5kLmpzJyk7XG5yZXF1aXJlKCcuL3JlcXVlc3RBbmltYXRpb25GcmFtZS5qcycpOyIsIi8vIGFkZHMgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIGZ1bmN0aW9uYWxpdHlcbi8vIFNvdXJjZTogaHR0cDovL3N0cmQ2LmNvbS8yMDExLzA1L2JldHRlci13aW5kb3ctcmVxdWVzdGFuaW1hdGlvbmZyYW1lLXNoaW0vXG5cbndpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPVxuICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gIGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgcmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgY2FsbGJhY2soK25ldyBEYXRlKCkpO1xuICB9LCAxMDAwIC8gNjApO1xufSk7XG4iLCJ2YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJy4vUmVuZGVyTm9kZScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgRWxlbWVudEFsbG9jYXRvciA9IHJlcXVpcmUoJy4vRWxlbWVudEFsbG9jYXRvcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBfb3JpZ2luWmVyb1plcm8gPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuZnVuY3Rpb24gX2dldEVsZW1lbnRTaXplKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBlbGVtZW50LmNsaWVudFdpZHRoLFxuICAgICAgICBlbGVtZW50LmNsaWVudEhlaWdodFxuICAgIF07XG59XG5mdW5jdGlvbiBDb250ZXh0KGNvbnRhaW5lcikge1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuX2FsbG9jYXRvciA9IG5ldyBFbGVtZW50QWxsb2NhdG9yKGNvbnRhaW5lcik7XG4gICAgdGhpcy5fbm9kZSA9IG5ldyBSZW5kZXJOb2RlKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fc2l6ZSA9IF9nZXRFbGVtZW50U2l6ZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSgwKTtcbiAgICB0aGlzLl9wZXJzcGVjdGl2ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9ub2RlQ29udGV4dCA9IHtcbiAgICAgICAgYWxsb2NhdG9yOiB0aGlzLl9hbGxvY2F0b3IsXG4gICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLmlkZW50aXR5LFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBvcmlnaW46IF9vcmlnaW5aZXJvWmVybyxcbiAgICAgICAgYWxpZ246IG51bGwsXG4gICAgICAgIHNpemU6IHRoaXMuX3NpemVcbiAgICB9O1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0Lm9uKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0U2l6ZShfZ2V0RWxlbWVudFNpemUodGhpcy5jb250YWluZXIpKTtcbiAgICB9LmJpbmQodGhpcykpO1xufVxuQ29udGV4dC5wcm90b3R5cGUuZ2V0QWxsb2NhdG9yID0gZnVuY3Rpb24gZ2V0QWxsb2NhdG9yKCkge1xuICAgIHJldHVybiB0aGlzLl9hbGxvY2F0b3I7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKG9iaikge1xuICAgIHJldHVybiB0aGlzLl9ub2RlLmFkZChvYmopO1xufTtcbkNvbnRleHQucHJvdG90eXBlLm1pZ3JhdGUgPSBmdW5jdGlvbiBtaWdyYXRlKGNvbnRhaW5lcikge1xuICAgIGlmIChjb250YWluZXIgPT09IHRoaXMuY29udGFpbmVyKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy5fYWxsb2NhdG9yLm1pZ3JhdGUoY29udGFpbmVyKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplKSB7XG4gICAgaWYgKCFzaXplKVxuICAgICAgICBzaXplID0gX2dldEVsZW1lbnRTaXplKHRoaXMuY29udGFpbmVyKTtcbiAgICB0aGlzLl9zaXplWzBdID0gc2l6ZVswXTtcbiAgICB0aGlzLl9zaXplWzFdID0gc2l6ZVsxXTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoY29udGV4dFBhcmFtZXRlcnMpIHtcbiAgICBpZiAoY29udGV4dFBhcmFtZXRlcnMpIHtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLnRyYW5zZm9ybSlcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0LnRyYW5zZm9ybSA9IGNvbnRleHRQYXJhbWV0ZXJzLnRyYW5zZm9ybTtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLm9wYWNpdHkpXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC5vcGFjaXR5ID0gY29udGV4dFBhcmFtZXRlcnMub3BhY2l0eTtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLm9yaWdpbilcbiAgICAgICAgICAgIHRoaXMuX25vZGVDb250ZXh0Lm9yaWdpbiA9IGNvbnRleHRQYXJhbWV0ZXJzLm9yaWdpbjtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLmFsaWduKVxuICAgICAgICAgICAgdGhpcy5fbm9kZUNvbnRleHQuYWxpZ24gPSBjb250ZXh0UGFyYW1ldGVycy5hbGlnbjtcbiAgICAgICAgaWYgKGNvbnRleHRQYXJhbWV0ZXJzLnNpemUpXG4gICAgICAgICAgICB0aGlzLl9ub2RlQ29udGV4dC5zaXplID0gY29udGV4dFBhcmFtZXRlcnMuc2l6ZTtcbiAgICB9XG4gICAgdmFyIHBlcnNwZWN0aXZlID0gdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZS5nZXQoKTtcbiAgICBpZiAocGVyc3BlY3RpdmUgIT09IHRoaXMuX3BlcnNwZWN0aXZlKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUgPyBwZXJzcGVjdGl2ZS50b0ZpeGVkKCkgKyAncHgnIDogJyc7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gcGVyc3BlY3RpdmUgPyBwZXJzcGVjdGl2ZS50b0ZpeGVkKCkgOiAnJztcbiAgICAgICAgdGhpcy5fcGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZTtcbiAgICB9XG4gICAgdGhpcy5fbm9kZS5jb21taXQodGhpcy5fbm9kZUNvbnRleHQpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLmdldFBlcnNwZWN0aXZlID0gZnVuY3Rpb24gZ2V0UGVyc3BlY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlcnNwZWN0aXZlU3RhdGUuZ2V0KCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUuc2V0UGVyc3BlY3RpdmUgPSBmdW5jdGlvbiBzZXRQZXJzcGVjdGl2ZShwZXJzcGVjdGl2ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fcGVyc3BlY3RpdmVTdGF0ZS5zZXQocGVyc3BlY3RpdmUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5lbWl0KHR5cGUsIGV2ZW50KTtcbn07XG5Db250ZXh0LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gdGhpcy5fZXZlbnRPdXRwdXQub24odHlwZSwgaGFuZGxlcik7XG59O1xuQ29udGV4dC5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xufTtcbkNvbnRleHQucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC5waXBlKHRhcmdldCk7XG59O1xuQ29udGV4dC5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLl9ldmVudE91dHB1dC51bnBpcGUodGFyZ2V0KTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IENvbnRleHQ7IiwiZnVuY3Rpb24gRWxlbWVudEFsbG9jYXRvcihjb250YWluZXIpIHtcbiAgICBpZiAoIWNvbnRhaW5lcilcbiAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuZGV0YWNoZWROb2RlcyA9IHt9O1xuICAgIHRoaXMubm9kZUNvdW50ID0gMDtcbn1cbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLm1pZ3JhdGUgPSBmdW5jdGlvbiBtaWdyYXRlKGNvbnRhaW5lcikge1xuICAgIHZhciBvbGRDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcjtcbiAgICBpZiAoY29udGFpbmVyID09PSBvbGRDb250YWluZXIpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAob2xkQ29udGFpbmVyIGluc3RhbmNlb2YgRG9jdW1lbnRGcmFnbWVudCkge1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQob2xkQ29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAob2xkQ29udGFpbmVyLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG9sZENvbnRhaW5lci5yZW1vdmVDaGlsZChvbGRDb250YWluZXIuZmlyc3RDaGlsZCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmFsbG9jYXRlID0gZnVuY3Rpb24gYWxsb2NhdGUodHlwZSkge1xuICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmRldGFjaGVkTm9kZXMpKVxuICAgICAgICB0aGlzLmRldGFjaGVkTm9kZXNbdHlwZV0gPSBbXTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW3R5cGVdO1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKG5vZGVTdG9yZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdCA9IG5vZGVTdG9yZS5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHR5cGUpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChyZXN1bHQpO1xuICAgIH1cbiAgICB0aGlzLm5vZGVDb3VudCsrO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuRWxlbWVudEFsbG9jYXRvci5wcm90b3R5cGUuZGVhbGxvY2F0ZSA9IGZ1bmN0aW9uIGRlYWxsb2NhdGUoZWxlbWVudCkge1xuICAgIHZhciBub2RlVHlwZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbm9kZVN0b3JlID0gdGhpcy5kZXRhY2hlZE5vZGVzW25vZGVUeXBlXTtcbiAgICBub2RlU3RvcmUucHVzaChlbGVtZW50KTtcbiAgICB0aGlzLm5vZGVDb3VudC0tO1xufTtcbkVsZW1lbnRBbGxvY2F0b3IucHJvdG90eXBlLmdldE5vZGVDb3VudCA9IGZ1bmN0aW9uIGdldE5vZGVDb3VudCgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlQ291bnQ7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50QWxsb2NhdG9yOyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCcuL0VudGl0eScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciB1c2VQcmVmaXggPSBkb2N1bWVudC5ib2R5LnN0eWxlLndlYmtpdFRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkO1xudmFyIGRldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuZnVuY3Rpb24gRWxlbWVudE91dHB1dChlbGVtZW50KSB7XG4gICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcbiAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICB0aGlzLl9vcmlnaW4gPSBudWxsO1xuICAgIHRoaXMuX3NpemUgPSBudWxsO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIHRoaXMuZXZlbnRGb3J3YXJkZXIgPSBmdW5jdGlvbiBldmVudEZvcndhcmRlcihldmVudCkge1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KGV2ZW50LnR5cGUsIGV2ZW50KTtcbiAgICB9LmJpbmQodGhpcyk7XG4gICAgdGhpcy5pZCA9IEVudGl0eS5yZWdpc3Rlcih0aGlzKTtcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl9zaXplRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLl9vcmlnaW5EaXJ0eSA9IGZhbHNlO1xuICAgIHRoaXMuX3RyYW5zZm9ybURpcnR5ID0gZmFsc2U7XG4gICAgdGhpcy5faW52aXNpYmxlID0gZmFsc2U7XG4gICAgaWYgKGVsZW1lbnQpXG4gICAgICAgIHRoaXMuYXR0YWNoKGVsZW1lbnQpO1xufVxuRWxlbWVudE91dHB1dC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBmbikge1xuICAgIGlmICh0aGlzLl9lbGVtZW50KVxuICAgICAgICB0aGlzLl9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQub24odHlwZSwgZm4pO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgZm4pIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5yZW1vdmVMaXN0ZW5lcih0eXBlLCBmbik7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICBpZiAoZXZlbnQgJiYgIWV2ZW50Lm9yaWdpbilcbiAgICAgICAgZXZlbnQub3JpZ2luID0gdGhpcztcbiAgICB2YXIgaGFuZGxlZCA9IHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQodHlwZSwgZXZlbnQpO1xuICAgIGlmIChoYW5kbGVkICYmIGV2ZW50ICYmIGV2ZW50LnN0b3BQcm9wYWdhdGlvbilcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgcmV0dXJuIGhhbmRsZWQ7XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnBpcGUodGFyZ2V0KTtcbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2V2ZW50T3V0cHV0LnVucGlwZSh0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbn07XG5mdW5jdGlvbiBfYWRkRXZlbnRMaXN0ZW5lcnModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9ldmVudE91dHB1dC5saXN0ZW5lcnMpIHtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoaSwgdGhpcy5ldmVudEZvcndhcmRlcik7XG4gICAgfVxufVxuZnVuY3Rpb24gX3JlbW92ZUV2ZW50TGlzdGVuZXJzKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy5fZXZlbnRPdXRwdXQubGlzdGVuZXJzKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGksIHRoaXMuZXZlbnRGb3J3YXJkZXIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9mb3JtYXRDU1NUcmFuc2Zvcm0obSkge1xuICAgIG1bMTJdID0gTWF0aC5yb3VuZChtWzEyXSAqIGRldmljZVBpeGVsUmF0aW8pIC8gZGV2aWNlUGl4ZWxSYXRpbztcbiAgICBtWzEzXSA9IE1hdGgucm91bmQobVsxM10gKiBkZXZpY2VQaXhlbFJhdGlvKSAvIGRldmljZVBpeGVsUmF0aW87XG4gICAgdmFyIHJlc3VsdCA9ICdtYXRyaXgzZCgnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gbVtpXSA8IDAuMDAwMDAxICYmIG1baV0gPiAtMC4wMDAwMDEgPyAnMCwnIDogbVtpXSArICcsJztcbiAgICB9XG4gICAgcmVzdWx0ICs9IG1bMTVdICsgJyknO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG52YXIgX3NldE1hdHJpeDtcbmlmIChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignZmlyZWZveCcpID4gLTEpIHtcbiAgICBfc2V0TWF0cml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG1hdHJpeCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnpJbmRleCA9IG1hdHJpeFsxNF0gKiAxMDAwMDAwIHwgMDtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBfZm9ybWF0Q1NTVHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgfTtcbn0gZWxzZSBpZiAodXNlUHJlZml4KSB7XG4gICAgX3NldE1hdHJpeCA9IGZ1bmN0aW9uIChlbGVtZW50LCBtYXRyaXgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBfZm9ybWF0Q1NTVHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgX3NldE1hdHJpeCA9IGZ1bmN0aW9uIChlbGVtZW50LCBtYXRyaXgpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBfZm9ybWF0Q1NTVHJhbnNmb3JtKG1hdHJpeCk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIF9mb3JtYXRDU1NPcmlnaW4ob3JpZ2luKSB7XG4gICAgcmV0dXJuIDEwMCAqIG9yaWdpblswXSArICclICcgKyAxMDAgKiBvcmlnaW5bMV0gKyAnJSc7XG59XG52YXIgX3NldE9yaWdpbiA9IHVzZVByZWZpeCA/IGZ1bmN0aW9uIChlbGVtZW50LCBvcmlnaW4pIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gPSBfZm9ybWF0Q1NTT3JpZ2luKG9yaWdpbik7XG4gICAgfSA6IGZ1bmN0aW9uIChlbGVtZW50LCBvcmlnaW4pIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSBfZm9ybWF0Q1NTT3JpZ2luKG9yaWdpbik7XG4gICAgfTtcbnZhciBfc2V0SW52aXNpYmxlID0gdXNlUHJlZml4ID8gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUzZCgwLjAwMDEsMC4wMDAxLDAuMDAwMSknO1xuICAgICAgICBlbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIH0gOiBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICdzY2FsZTNkKDAuMDAwMSwwLjAwMDEsMC4wMDAxKSc7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgfTtcbmZ1bmN0aW9uIF94eU5vdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYiA/IGFbMF0gIT09IGJbMF0gfHwgYVsxXSAhPT0gYlsxXSA6IGEgIT09IGI7XG59XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLl9lbGVtZW50O1xuICAgIGlmICghdGFyZ2V0KVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIG1hdHJpeCA9IGNvbnRleHQudHJhbnNmb3JtO1xuICAgIHZhciBvcGFjaXR5ID0gY29udGV4dC5vcGFjaXR5O1xuICAgIHZhciBvcmlnaW4gPSBjb250ZXh0Lm9yaWdpbjtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICBpZiAoIW1hdHJpeCAmJiB0aGlzLl9tYXRyaXgpIHtcbiAgICAgICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDA7XG4gICAgICAgIF9zZXRJbnZpc2libGUodGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoX3h5Tm90RXF1YWxzKHRoaXMuX29yaWdpbiwgb3JpZ2luKSlcbiAgICAgICAgdGhpcy5fb3JpZ2luRGlydHkgPSB0cnVlO1xuICAgIGlmIChUcmFuc2Zvcm0ubm90RXF1YWxzKHRoaXMuX21hdHJpeCwgbWF0cml4KSlcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSB0cnVlO1xuICAgIGlmICh0aGlzLl9pbnZpc2libGUpIHtcbiAgICAgICAgdGhpcy5faW52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3BhY2l0eSAhPT0gb3BhY2l0eSkge1xuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gb3BhY2l0eTtcbiAgICAgICAgdGFyZ2V0LnN0eWxlLm9wYWNpdHkgPSBvcGFjaXR5ID49IDEgPyAnMC45OTk5OTknIDogb3BhY2l0eTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3RyYW5zZm9ybURpcnR5IHx8IHRoaXMuX29yaWdpbkRpcnR5IHx8IHRoaXMuX3NpemVEaXJ0eSkge1xuICAgICAgICBpZiAodGhpcy5fc2l6ZURpcnR5KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX3NpemUpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IFtcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB0aGlzLl9zaXplWzBdID0gc2l6ZVswXTtcbiAgICAgICAgICAgIHRoaXMuX3NpemVbMV0gPSBzaXplWzFdO1xuICAgICAgICAgICAgdGhpcy5fc2l6ZURpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX29yaWdpbkRpcnR5KSB7XG4gICAgICAgICAgICBpZiAob3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9vcmlnaW4pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbiA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JpZ2luWzBdID0gb3JpZ2luWzBdO1xuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpblsxXSA9IG9yaWdpblsxXTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMuX29yaWdpbiA9IG51bGw7XG4gICAgICAgICAgICBfc2V0T3JpZ2luKHRhcmdldCwgdGhpcy5fb3JpZ2luKTtcbiAgICAgICAgICAgIHRoaXMuX29yaWdpbkRpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRyaXgpXG4gICAgICAgICAgICBtYXRyaXggPSBUcmFuc2Zvcm0uaWRlbnRpdHk7XG4gICAgICAgIHRoaXMuX21hdHJpeCA9IG1hdHJpeDtcbiAgICAgICAgdmFyIGFhTWF0cml4ID0gdGhpcy5fc2l6ZSA/IFRyYW5zZm9ybS50aGVuTW92ZShtYXRyaXgsIFtcbiAgICAgICAgICAgICAgICAtdGhpcy5fc2l6ZVswXSAqIG9yaWdpblswXSxcbiAgICAgICAgICAgICAgICAtdGhpcy5fc2l6ZVsxXSAqIG9yaWdpblsxXSxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKSA6IG1hdHJpeDtcbiAgICAgICAgX3NldE1hdHJpeCh0YXJnZXQsIGFhTWF0cml4KTtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSBmYWxzZTtcbiAgICB9XG59O1xuRWxlbWVudE91dHB1dC5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5faW52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbn07XG5FbGVtZW50T3V0cHV0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiBhdHRhY2godGFyZ2V0KSB7XG4gICAgdGhpcy5fZWxlbWVudCA9IHRhcmdldDtcbiAgICBfYWRkRXZlbnRMaXN0ZW5lcnMuY2FsbCh0aGlzLCB0YXJnZXQpO1xufTtcbkVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uIGRldGFjaCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fZWxlbWVudDtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIF9yZW1vdmVFdmVudExpc3RlbmVycy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIGlmICh0aGlzLl9pbnZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2ludmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGw7XG4gICAgcmV0dXJuIHRhcmdldDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnRPdXRwdXQ7IiwidmFyIENvbnRleHQgPSByZXF1aXJlKCcuL0NvbnRleHQnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi9PcHRpb25zTWFuYWdlcicpO1xudmFyIEVuZ2luZSA9IHt9O1xudmFyIGNvbnRleHRzID0gW107XG52YXIgbmV4dFRpY2tRdWV1ZSA9IFtdO1xudmFyIGRlZmVyUXVldWUgPSBbXTtcbnZhciBsYXN0VGltZSA9IERhdGUubm93KCk7XG52YXIgZnJhbWVUaW1lO1xudmFyIGZyYW1lVGltZUxpbWl0O1xudmFyIGxvb3BFbmFibGVkID0gdHJ1ZTtcbnZhciBldmVudEZvcndhcmRlcnMgPSB7fTtcbnZhciBldmVudEhhbmRsZXIgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG52YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgY29udGFpbmVyVHlwZTogJ2RpdicsXG4gICAgICAgIGNvbnRhaW5lckNsYXNzOiAnZmFtb3VzLWNvbnRhaW5lcicsXG4gICAgICAgIGZwc0NhcDogdW5kZWZpbmVkLFxuICAgICAgICBydW5Mb29wOiB0cnVlLFxuICAgICAgICBhcHBNb2RlOiB0cnVlXG4gICAgfTtcbnZhciBvcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcihvcHRpb25zKTtcbnZhciBNQVhfREVGRVJfRlJBTUVfVElNRSA9IDEwO1xuRW5naW5lLnN0ZXAgPSBmdW5jdGlvbiBzdGVwKCkge1xuICAgIHZhciBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgaWYgKGZyYW1lVGltZUxpbWl0ICYmIGN1cnJlbnRUaW1lIC0gbGFzdFRpbWUgPCBmcmFtZVRpbWVMaW1pdClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBpID0gMDtcbiAgICBmcmFtZVRpbWUgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lO1xuICAgIGxhc3RUaW1lID0gY3VycmVudFRpbWU7XG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3ByZXJlbmRlcicpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBuZXh0VGlja1F1ZXVlLmxlbmd0aDsgaSsrKVxuICAgICAgICBuZXh0VGlja1F1ZXVlW2ldLmNhbGwodGhpcyk7XG4gICAgbmV4dFRpY2tRdWV1ZS5zcGxpY2UoMCk7XG4gICAgd2hpbGUgKGRlZmVyUXVldWUubGVuZ3RoICYmIERhdGUubm93KCkgLSBjdXJyZW50VGltZSA8IE1BWF9ERUZFUl9GUkFNRV9USU1FKSB7XG4gICAgICAgIGRlZmVyUXVldWUuc2hpZnQoKS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgY29udGV4dHMubGVuZ3RoOyBpKyspXG4gICAgICAgIGNvbnRleHRzW2ldLnVwZGF0ZSgpO1xuICAgIGV2ZW50SGFuZGxlci5lbWl0KCdwb3N0cmVuZGVyJyk7XG59O1xuZnVuY3Rpb24gbG9vcCgpIHtcbiAgICBpZiAob3B0aW9ucy5ydW5Mb29wKSB7XG4gICAgICAgIEVuZ2luZS5zdGVwKCk7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfSBlbHNlXG4gICAgICAgIGxvb3BFbmFibGVkID0gZmFsc2U7XG59XG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuZnVuY3Rpb24gaGFuZGxlUmVzaXplKGV2ZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZXh0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb250ZXh0c1tpXS5lbWl0KCdyZXNpemUnKTtcbiAgICB9XG4gICAgZXZlbnRIYW5kbGVyLmVtaXQoJ3Jlc2l6ZScpO1xufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSwgZmFsc2UpO1xuaGFuZGxlUmVzaXplKCk7XG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9LCB0cnVlKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2ZhbW91cy1yb290Jyk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZhbW91cy1yb290Jyk7XG59XG52YXIgaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbkVuZ2luZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnN1YnNjcmliZShFbmdpbmUpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGV2ZW50SGFuZGxlci5waXBlKHRhcmdldCk7XG59O1xuRW5naW5lLnVucGlwZSA9IGZ1bmN0aW9uIHVucGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnVuc3Vic2NyaWJlIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHJldHVybiB0YXJnZXQudW5zdWJzY3JpYmUoRW5naW5lKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBldmVudEhhbmRsZXIudW5waXBlKHRhcmdldCk7XG59O1xuRW5naW5lLm9uID0gZnVuY3Rpb24gb24odHlwZSwgaGFuZGxlcikge1xuICAgIGlmICghKHR5cGUgaW4gZXZlbnRGb3J3YXJkZXJzKSkge1xuICAgICAgICBldmVudEZvcndhcmRlcnNbdHlwZV0gPSBldmVudEhhbmRsZXIuZW1pdC5iaW5kKGV2ZW50SGFuZGxlciwgdHlwZSk7XG4gICAgICAgIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZXZlbnRGb3J3YXJkZXJzW3R5cGVdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEVuZ2luZS5uZXh0VGljayhmdW5jdGlvbiAodHlwZSwgZm9yd2FyZGVyKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGZvcndhcmRlcik7XG4gICAgICAgICAgICB9LmJpbmQodGhpcywgdHlwZSwgZXZlbnRGb3J3YXJkZXJzW3R5cGVdKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGV2ZW50SGFuZGxlci5vbih0eXBlLCBoYW5kbGVyKTtcbn07XG5FbmdpbmUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyLmVtaXQodHlwZSwgZXZlbnQpO1xufTtcbkVuZ2luZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gZXZlbnRIYW5kbGVyLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xufTtcbkVuZ2luZS5nZXRGUFMgPSBmdW5jdGlvbiBnZXRGUFMoKSB7XG4gICAgcmV0dXJuIDEwMDAgLyBmcmFtZVRpbWU7XG59O1xuRW5naW5lLnNldEZQU0NhcCA9IGZ1bmN0aW9uIHNldEZQU0NhcChmcHMpIHtcbiAgICBmcmFtZVRpbWVMaW1pdCA9IE1hdGguZmxvb3IoMTAwMCAvIGZwcyk7XG59O1xuRW5naW5lLmdldE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICAgIHJldHVybiBvcHRpb25zTWFuYWdlci5nZXRPcHRpb25zLmFwcGx5KG9wdGlvbnNNYW5hZ2VyLCBhcmd1bWVudHMpO1xufTtcbkVuZ2luZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMuYXBwbHkob3B0aW9uc01hbmFnZXIsIGFyZ3VtZW50cyk7XG59O1xuRW5naW5lLmNyZWF0ZUNvbnRleHQgPSBmdW5jdGlvbiBjcmVhdGVDb250ZXh0KGVsKSB7XG4gICAgaWYgKCFpbml0aWFsaXplZCAmJiBvcHRpb25zLmFwcE1vZGUpXG4gICAgICAgIGluaXRpYWxpemUoKTtcbiAgICB2YXIgbmVlZE1vdW50Q29udGFpbmVyID0gZmFsc2U7XG4gICAgaWYgKCFlbCkge1xuICAgICAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQob3B0aW9ucy5jb250YWluZXJUeXBlKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNvbnRhaW5lckNsYXNzKTtcbiAgICAgICAgbmVlZE1vdW50Q29udGFpbmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dChlbCk7XG4gICAgRW5naW5lLnJlZ2lzdGVyQ29udGV4dChjb250ZXh0KTtcbiAgICBpZiAobmVlZE1vdW50Q29udGFpbmVyKSB7XG4gICAgICAgIEVuZ2luZS5uZXh0VGljayhmdW5jdGlvbiAoY29udGV4dCwgZWwpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgICAgICAgY29udGV4dC5lbWl0KCdyZXNpemUnKTtcbiAgICAgICAgfS5iaW5kKHRoaXMsIGNvbnRleHQsIGVsKSk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZXh0O1xufTtcbkVuZ2luZS5yZWdpc3RlckNvbnRleHQgPSBmdW5jdGlvbiByZWdpc3RlckNvbnRleHQoY29udGV4dCkge1xuICAgIGNvbnRleHRzLnB1c2goY29udGV4dCk7XG4gICAgcmV0dXJuIGNvbnRleHQ7XG59O1xuRW5naW5lLmdldENvbnRleHRzID0gZnVuY3Rpb24gZ2V0Q29udGV4dHMoKSB7XG4gICAgcmV0dXJuIGNvbnRleHRzO1xufTtcbkVuZ2luZS5kZXJlZ2lzdGVyQ29udGV4dCA9IGZ1bmN0aW9uIGRlcmVnaXN0ZXJDb250ZXh0KGNvbnRleHQpIHtcbiAgICB2YXIgaSA9IGNvbnRleHRzLmluZGV4T2YoY29udGV4dCk7XG4gICAgaWYgKGkgPj0gMClcbiAgICAgICAgY29udGV4dHMuc3BsaWNlKGksIDEpO1xufTtcbkVuZ2luZS5uZXh0VGljayA9IGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgbmV4dFRpY2tRdWV1ZS5wdXNoKGZuKTtcbn07XG5FbmdpbmUuZGVmZXIgPSBmdW5jdGlvbiBkZWZlcihmbikge1xuICAgIGRlZmVyUXVldWUucHVzaChmbik7XG59O1xub3B0aW9uc01hbmFnZXIub24oJ2NoYW5nZScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKGRhdGEuaWQgPT09ICdmcHNDYXAnKVxuICAgICAgICBFbmdpbmUuc2V0RlBTQ2FwKGRhdGEudmFsdWUpO1xuICAgIGVsc2UgaWYgKGRhdGEuaWQgPT09ICdydW5Mb29wJykge1xuICAgICAgICBpZiAoIWxvb3BFbmFibGVkICYmIGRhdGEudmFsdWUpIHtcbiAgICAgICAgICAgIGxvb3BFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbm1vZHVsZS5leHBvcnRzID0gRW5naW5lOyIsInZhciBlbnRpdGllcyA9IFtdO1xuZnVuY3Rpb24gZ2V0KGlkKSB7XG4gICAgcmV0dXJuIGVudGl0aWVzW2lkXTtcbn1cbmZ1bmN0aW9uIHNldChpZCwgZW50aXR5KSB7XG4gICAgZW50aXRpZXNbaWRdID0gZW50aXR5O1xufVxuZnVuY3Rpb24gcmVnaXN0ZXIoZW50aXR5KSB7XG4gICAgdmFyIGlkID0gZW50aXRpZXMubGVuZ3RoO1xuICAgIHNldChpZCwgZW50aXR5KTtcbiAgICByZXR1cm4gaWQ7XG59XG5mdW5jdGlvbiB1bnJlZ2lzdGVyKGlkKSB7XG4gICAgc2V0KGlkLCBudWxsKTtcbn1cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHJlZ2lzdGVyOiByZWdpc3RlcixcbiAgICB1bnJlZ2lzdGVyOiB1bnJlZ2lzdGVyLFxuICAgIGdldDogZ2V0LFxuICAgIHNldDogc2V0XG59OyIsImZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgIHRoaXMuX293bmVyID0gdGhpcztcbn1cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZXZlbnQpIHtcbiAgICB2YXIgaGFuZGxlcnMgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgICBpZiAoaGFuZGxlcnMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaGFuZGxlcnNbaV0uY2FsbCh0aGlzLl9vd25lciwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykpXG4gICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW107XG4gICAgdmFyIGluZGV4ID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0uaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaW5kZXggPCAwKVxuICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcbiAgICBpZiAobGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgaW5kZXggPSBsaXN0ZW5lci5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMClcbiAgICAgICAgICAgIGxpc3RlbmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYmluZFRoaXMgPSBmdW5jdGlvbiBiaW5kVGhpcyhvd25lcikge1xuICAgIHRoaXMuX293bmVyID0gb3duZXI7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7IiwidmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyJyk7XG5mdW5jdGlvbiBFdmVudEhhbmRsZXIoKSB7XG4gICAgRXZlbnRFbWl0dGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5kb3duc3RyZWFtID0gW107XG4gICAgdGhpcy5kb3duc3RyZWFtRm4gPSBbXTtcbiAgICB0aGlzLnVwc3RyZWFtID0gW107XG4gICAgdGhpcy51cHN0cmVhbUxpc3RlbmVycyA9IHt9O1xufVxuRXZlbnRIYW5kbGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRXZlbnRIYW5kbGVyO1xuRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlciA9IGZ1bmN0aW9uIHNldElucHV0SGFuZGxlcihvYmplY3QsIGhhbmRsZXIpIHtcbiAgICBvYmplY3QudHJpZ2dlciA9IGhhbmRsZXIudHJpZ2dlci5iaW5kKGhhbmRsZXIpO1xuICAgIGlmIChoYW5kbGVyLnN1YnNjcmliZSAmJiBoYW5kbGVyLnVuc3Vic2NyaWJlKSB7XG4gICAgICAgIG9iamVjdC5zdWJzY3JpYmUgPSBoYW5kbGVyLnN1YnNjcmliZS5iaW5kKGhhbmRsZXIpO1xuICAgICAgICBvYmplY3QudW5zdWJzY3JpYmUgPSBoYW5kbGVyLnVuc3Vic2NyaWJlLmJpbmQoaGFuZGxlcik7XG4gICAgfVxufTtcbkV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyID0gZnVuY3Rpb24gc2V0T3V0cHV0SGFuZGxlcihvYmplY3QsIGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlciBpbnN0YW5jZW9mIEV2ZW50SGFuZGxlcilcbiAgICAgICAgaGFuZGxlci5iaW5kVGhpcyhvYmplY3QpO1xuICAgIG9iamVjdC5waXBlID0gaGFuZGxlci5waXBlLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0LnVucGlwZSA9IGhhbmRsZXIudW5waXBlLmJpbmQoaGFuZGxlcik7XG4gICAgb2JqZWN0Lm9uID0gaGFuZGxlci5vbi5iaW5kKGhhbmRsZXIpO1xuICAgIG9iamVjdC5hZGRMaXN0ZW5lciA9IG9iamVjdC5vbjtcbiAgICBvYmplY3QucmVtb3ZlTGlzdGVuZXIgPSBoYW5kbGVyLnJlbW92ZUxpc3RlbmVyLmJpbmQoaGFuZGxlcik7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBldmVudCkge1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciBpID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5kb3duc3RyZWFtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLmRvd25zdHJlYW1baV0udHJpZ2dlcilcbiAgICAgICAgICAgIHRoaXMuZG93bnN0cmVhbVtpXS50cmlnZ2VyKHR5cGUsIGV2ZW50KTtcbiAgICB9XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuZG93bnN0cmVhbUZuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZG93bnN0cmVhbUZuW2ldKHR5cGUsIGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5lbWl0O1xuRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gcGlwZSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0LnN1YnNjcmliZSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICByZXR1cm4gdGFyZ2V0LnN1YnNjcmliZSh0aGlzKTtcbiAgICB2YXIgZG93bnN0cmVhbUN0eCA9IHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gdGhpcy5kb3duc3RyZWFtRm4gOiB0aGlzLmRvd25zdHJlYW07XG4gICAgdmFyIGluZGV4ID0gZG93bnN0cmVhbUN0eC5pbmRleE9mKHRhcmdldCk7XG4gICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgZG93bnN0cmVhbUN0eC5wdXNoKHRhcmdldCk7XG4gICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0YXJnZXQoJ3BpcGUnLCBudWxsKTtcbiAgICBlbHNlIGlmICh0YXJnZXQudHJpZ2dlcilcbiAgICAgICAgdGFyZ2V0LnRyaWdnZXIoJ3BpcGUnLCBudWxsKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXQudW5zdWJzY3JpYmUgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgcmV0dXJuIHRhcmdldC51bnN1YnNjcmliZSh0aGlzKTtcbiAgICB2YXIgZG93bnN0cmVhbUN0eCA9IHRhcmdldCBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gdGhpcy5kb3duc3RyZWFtRm4gOiB0aGlzLmRvd25zdHJlYW07XG4gICAgdmFyIGluZGV4ID0gZG93bnN0cmVhbUN0eC5pbmRleE9mKHRhcmdldCk7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgZG93bnN0cmVhbUN0eC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgICAgICB0YXJnZXQoJ3VucGlwZScsIG51bGwpO1xuICAgICAgICBlbHNlIGlmICh0YXJnZXQudHJpZ2dlcilcbiAgICAgICAgICAgIHRhcmdldC50cmlnZ2VyKCd1bnBpcGUnLCBudWxsKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbih0eXBlLCBoYW5kbGVyKSB7XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy51cHN0cmVhbUxpc3RlbmVycykpIHtcbiAgICAgICAgdmFyIHVwc3RyZWFtTGlzdGVuZXIgPSB0aGlzLnRyaWdnZXIuYmluZCh0aGlzLCB0eXBlKTtcbiAgICAgICAgdGhpcy51cHN0cmVhbUxpc3RlbmVyc1t0eXBlXSA9IHVwc3RyZWFtTGlzdGVuZXI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy51cHN0cmVhbS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy51cHN0cmVhbVtpXS5vbih0eXBlLCB1cHN0cmVhbUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5FdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5vbjtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKHNvdXJjZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudXBzdHJlYW0uaW5kZXhPZihzb3VyY2UpO1xuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgdGhpcy51cHN0cmVhbS5wdXNoKHNvdXJjZSk7XG4gICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy51cHN0cmVhbUxpc3RlbmVycykge1xuICAgICAgICAgICAgc291cmNlLm9uKHR5cGUsIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnNbdHlwZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbkV2ZW50SGFuZGxlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShzb3VyY2UpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnVwc3RyZWFtLmluZGV4T2Yoc291cmNlKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICB0aGlzLnVwc3RyZWFtLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy51cHN0cmVhbUxpc3RlbmVycykge1xuICAgICAgICAgICAgc291cmNlLnJlbW92ZUxpc3RlbmVyKHR5cGUsIHRoaXMudXBzdHJlYW1MaXN0ZW5lcnNbdHlwZV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRIYW5kbGVyOyIsInZhciBDb250ZXh0ID0gcmVxdWlyZSgnLi9Db250ZXh0Jyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciBTdXJmYWNlID0gcmVxdWlyZSgnLi9TdXJmYWNlJyk7XG5mdW5jdGlvbiBHcm91cChvcHRpb25zKSB7XG4gICAgU3VyZmFjZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xuICAgIHRoaXMuX3Nob3VsZFJlY2FsY3VsYXRlU2l6ZSA9IGZhbHNlO1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dCh0aGlzLl9jb250YWluZXIpO1xuICAgIHRoaXMuc2V0Q29udGVudCh0aGlzLl9jb250YWluZXIpO1xuICAgIHRoaXMuX2dyb3VwU2l6ZSA9IFtcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICB1bmRlZmluZWRcbiAgICBdO1xufVxuR3JvdXAuU0laRV9aRVJPID0gW1xuICAgIDAsXG4gICAgMFxuXTtcbkdyb3VwLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VyZmFjZS5wcm90b3R5cGUpO1xuR3JvdXAucHJvdG90eXBlLmVsZW1lbnRUeXBlID0gJ2Rpdic7XG5Hcm91cC5wcm90b3R5cGUuZWxlbWVudENsYXNzID0gJ2ZhbW91cy1ncm91cCc7XG5Hcm91cC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRleHQuYWRkLmFwcGx5KHRoaXMuY29udGV4dCwgYXJndW1lbnRzKTtcbn07XG5Hcm91cC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiBTdXJmYWNlLnByb3RvdHlwZS5yZW5kZXIuY2FsbCh0aGlzKTtcbn07XG5Hcm91cC5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gZGVwbG95KHRhcmdldCkge1xuICAgIHRoaXMuY29udGV4dC5taWdyYXRlKHRhcmdldCk7XG59O1xuR3JvdXAucHJvdG90eXBlLnJlY2FsbCA9IGZ1bmN0aW9uIHJlY2FsbCh0YXJnZXQpIHtcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgdGhpcy5jb250ZXh0Lm1pZ3JhdGUodGhpcy5fY29udGFpbmVyKTtcbn07XG5Hcm91cC5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICB2YXIgdHJhbnNmb3JtID0gY29udGV4dC50cmFuc2Zvcm07XG4gICAgdmFyIG9yaWdpbiA9IGNvbnRleHQub3JpZ2luO1xuICAgIHZhciBvcGFjaXR5ID0gY29udGV4dC5vcGFjaXR5O1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIHZhciByZXN1bHQgPSBTdXJmYWNlLnByb3RvdHlwZS5jb21taXQuY2FsbCh0aGlzLCB7XG4gICAgICAgICAgICBhbGxvY2F0b3I6IGNvbnRleHQuYWxsb2NhdG9yLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0udGhlbk1vdmUodHJhbnNmb3JtLCBbXG4gICAgICAgICAgICAgICAgLW9yaWdpblswXSAqIHNpemVbMF0sXG4gICAgICAgICAgICAgICAgLW9yaWdpblsxXSAqIHNpemVbMV0sXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxuICAgICAgICAgICAgb3JpZ2luOiBvcmlnaW4sXG4gICAgICAgICAgICBzaXplOiBHcm91cC5TSVpFX1pFUk9cbiAgICAgICAgfSk7XG4gICAgaWYgKHNpemVbMF0gIT09IHRoaXMuX2dyb3VwU2l6ZVswXSB8fCBzaXplWzFdICE9PSB0aGlzLl9ncm91cFNpemVbMV0pIHtcbiAgICAgICAgdGhpcy5fZ3JvdXBTaXplWzBdID0gc2l6ZVswXTtcbiAgICAgICAgdGhpcy5fZ3JvdXBTaXplWzFdID0gc2l6ZVsxXTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldFNpemUoc2l6ZSk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC51cGRhdGUoe1xuICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS50cmFuc2xhdGUoLW9yaWdpblswXSAqIHNpemVbMF0sIC1vcmlnaW5bMV0gKiBzaXplWzFdLCAwKSxcbiAgICAgICAgb3JpZ2luOiBvcmlnaW4sXG4gICAgICAgIHNpemU6IHNpemVcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gR3JvdXA7IiwidmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybScpO1xuZnVuY3Rpb24gTW9kaWZpZXIob3B0aW9ucykge1xuICAgIHRoaXMuX3RyYW5zZm9ybUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3BhY2l0eUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fb3JpZ2luR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9hbGlnbkdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZUdldHRlciA9IG51bGw7XG4gICAgdGhpcy5fbGVnYWN5U3RhdGVzID0ge307XG4gICAgdGhpcy5fb3V0cHV0ID0ge1xuICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS5pZGVudGl0eSxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgb3JpZ2luOiBudWxsLFxuICAgICAgICBhbGlnbjogbnVsbCxcbiAgICAgICAgc2l6ZTogbnVsbCxcbiAgICAgICAgdGFyZ2V0OiBudWxsXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybUZyb20ob3B0aW9ucy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAob3B0aW9ucy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLm9wYWNpdHlGcm9tKG9wdGlvbnMub3BhY2l0eSk7XG4gICAgICAgIGlmIChvcHRpb25zLm9yaWdpbilcbiAgICAgICAgICAgIHRoaXMub3JpZ2luRnJvbShvcHRpb25zLm9yaWdpbik7XG4gICAgICAgIGlmIChvcHRpb25zLmFsaWduKVxuICAgICAgICAgICAgdGhpcy5hbGlnbkZyb20ob3B0aW9ucy5hbGlnbik7XG4gICAgICAgIGlmIChvcHRpb25zLnNpemUpXG4gICAgICAgICAgICB0aGlzLnNpemVGcm9tKG9wdGlvbnMuc2l6ZSk7XG4gICAgfVxufVxuTW9kaWZpZXIucHJvdG90eXBlLnRyYW5zZm9ybUZyb20gPSBmdW5jdGlvbiB0cmFuc2Zvcm1Gcm9tKHRyYW5zZm9ybSkge1xuICAgIGlmICh0cmFuc2Zvcm0gaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gdHJhbnNmb3JtO1xuICAgIGVsc2UgaWYgKHRyYW5zZm9ybSBpbnN0YW5jZW9mIE9iamVjdCAmJiB0cmFuc2Zvcm0uZ2V0KVxuICAgICAgICB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIgPSB0cmFuc2Zvcm0uZ2V0LmJpbmQodHJhbnNmb3JtKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLm9wYWNpdHlGcm9tID0gZnVuY3Rpb24gb3BhY2l0eUZyb20ob3BhY2l0eSkge1xuICAgIGlmIChvcGFjaXR5IGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBvcGFjaXR5O1xuICAgIGVsc2UgaWYgKG9wYWNpdHkgaW5zdGFuY2VvZiBPYmplY3QgJiYgb3BhY2l0eS5nZXQpXG4gICAgICAgIHRoaXMuX29wYWNpdHlHZXR0ZXIgPSBvcGFjaXR5LmdldC5iaW5kKG9wYWNpdHkpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9vcGFjaXR5R2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0Lm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUub3JpZ2luRnJvbSA9IGZ1bmN0aW9uIG9yaWdpbkZyb20ob3JpZ2luKSB7XG4gICAgaWYgKG9yaWdpbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBvcmlnaW47XG4gICAgZWxzZSBpZiAob3JpZ2luIGluc3RhbmNlb2YgT2JqZWN0ICYmIG9yaWdpbi5nZXQpXG4gICAgICAgIHRoaXMuX29yaWdpbkdldHRlciA9IG9yaWdpbi5nZXQuYmluZChvcmlnaW4pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQub3JpZ2luID0gb3JpZ2luO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuYWxpZ25Gcm9tID0gZnVuY3Rpb24gYWxpZ25Gcm9tKGFsaWduKSB7XG4gICAgaWYgKGFsaWduIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX2FsaWduR2V0dGVyID0gYWxpZ247XG4gICAgZWxzZSBpZiAoYWxpZ24gaW5zdGFuY2VvZiBPYmplY3QgJiYgYWxpZ24uZ2V0KVxuICAgICAgICB0aGlzLl9hbGlnbkdldHRlciA9IGFsaWduLmdldC5iaW5kKGFsaWduKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5fYWxpZ25HZXR0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9vdXRwdXQuYWxpZ24gPSBhbGlnbjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNpemVGcm9tID0gZnVuY3Rpb24gc2l6ZUZyb20oc2l6ZSkge1xuICAgIGlmIChzaXplIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBzaXplO1xuICAgIGVsc2UgaWYgKHNpemUgaW5zdGFuY2VvZiBPYmplY3QgJiYgc2l6ZS5nZXQpXG4gICAgICAgIHRoaXMuX3NpemVHZXR0ZXIgPSBzaXplLmdldC5iaW5kKHNpemUpO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9zaXplR2V0dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fb3V0cHV0LnNpemUgPSBzaXplO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuc2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gc2V0VHJhbnNmb3JtKHRyYW5zZm9ybSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAodHJhbnNpdGlvbiB8fCB0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSh0aGlzLl9vdXRwdXQudHJhbnNmb3JtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3RyYW5zZm9ybUdldHRlcilcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMudHJhbnNmb3JtKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5zZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm1Gcm9tKHRyYW5zZm9ybSk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldE9wYWNpdHkgPSBmdW5jdGlvbiBzZXRPcGFjaXR5KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eSkge1xuICAgICAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0Lm9wYWNpdHkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fb3BhY2l0eUdldHRlcilcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eUZyb20odGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVnYWN5U3RhdGVzLm9wYWNpdHkuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMub3BhY2l0eUZyb20ob3BhY2l0eSk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldE9yaWdpbiA9IGZ1bmN0aW9uIHNldE9yaWdpbihvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbikge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4gPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0Lm9yaWdpbiB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbkdldHRlcilcbiAgICAgICAgICAgIHRoaXMub3JpZ2luRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMub3JpZ2luKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLm9yaWdpbi5zZXQob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5Gcm9tKG9yaWdpbik7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLnNldEFsaWduID0gZnVuY3Rpb24gc2V0QWxpZ24oYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gfHwgdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB7XG4gICAgICAgIGlmICghdGhpcy5fbGVnYWN5U3RhdGVzLmFsaWduKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24gPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fb3V0cHV0LmFsaWduIHx8IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5fYWxpZ25HZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLmFsaWduRnJvbSh0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24pO1xuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24uc2V0KGFsaWduLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5hbGlnbkZyb20oYWxpZ24pO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChzaXplICYmICh0cmFuc2l0aW9uIHx8IHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKSkge1xuICAgICAgICBpZiAoIXRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZSA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLl9vdXRwdXQuc2l6ZSB8fCBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX3NpemVHZXR0ZXIpXG4gICAgICAgICAgICB0aGlzLnNpemVGcm9tKHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKTtcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnNpemUuc2V0KHNpemUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLnNpemVGcm9tKHNpemUpO1xufTtcbk1vZGlmaWVyLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICBpZiAodGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSlcbiAgICAgICAgdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybS5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcGFjaXR5KVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMub3BhY2l0eS5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4pXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5vcmlnaW4uaGFsdCgpO1xuICAgIGlmICh0aGlzLl9sZWdhY3lTdGF0ZXMuYWxpZ24pXG4gICAgICAgIHRoaXMuX2xlZ2FjeVN0YXRlcy5hbGlnbi5oYWx0KCk7XG4gICAgaWYgKHRoaXMuX2xlZ2FjeVN0YXRlcy5zaXplKVxuICAgICAgICB0aGlzLl9sZWdhY3lTdGF0ZXMuc2l6ZS5oYWx0KCk7XG4gICAgdGhpcy5fdHJhbnNmb3JtR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9vcGFjaXR5R2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9vcmlnaW5HZXR0ZXIgPSBudWxsO1xuICAgIHRoaXMuX2FsaWduR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9zaXplR2V0dGVyID0gbnVsbDtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0VHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKCkge1xuICAgIHJldHVybiB0aGlzLl90cmFuc2Zvcm1HZXR0ZXIoKTtcbn07XG5Nb2RpZmllci5wcm90b3R5cGUuZ2V0RmluYWxUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRGaW5hbFRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGVnYWN5U3RhdGVzLnRyYW5zZm9ybSA/IHRoaXMuX2xlZ2FjeVN0YXRlcy50cmFuc2Zvcm0uZ2V0RmluYWwoKSA6IHRoaXMuX291dHB1dC50cmFuc2Zvcm07XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldE9wYWNpdHkgPSBmdW5jdGlvbiBnZXRPcGFjaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl9vcGFjaXR5R2V0dGVyKCk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldE9yaWdpbiA9IGZ1bmN0aW9uIGdldE9yaWdpbigpIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luR2V0dGVyKCk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldEFsaWduID0gZnVuY3Rpb24gZ2V0QWxpZ24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FsaWduR2V0dGVyKCk7XG59O1xuTW9kaWZpZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplR2V0dGVyID8gdGhpcy5fc2l6ZUdldHRlcigpIDogdGhpcy5fb3V0cHV0LnNpemU7XG59O1xuZnVuY3Rpb24gX3VwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5fdHJhbnNmb3JtR2V0dGVyKVxuICAgICAgICB0aGlzLl9vdXRwdXQudHJhbnNmb3JtID0gdGhpcy5fdHJhbnNmb3JtR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX29wYWNpdHlHZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5vcGFjaXR5ID0gdGhpcy5fb3BhY2l0eUdldHRlcigpO1xuICAgIGlmICh0aGlzLl9vcmlnaW5HZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5vcmlnaW4gPSB0aGlzLl9vcmlnaW5HZXR0ZXIoKTtcbiAgICBpZiAodGhpcy5fYWxpZ25HZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5hbGlnbiA9IHRoaXMuX2FsaWduR2V0dGVyKCk7XG4gICAgaWYgKHRoaXMuX3NpemVHZXR0ZXIpXG4gICAgICAgIHRoaXMuX291dHB1dC5zaXplID0gdGhpcy5fc2l6ZUdldHRlcigpO1xufVxuTW9kaWZpZXIucHJvdG90eXBlLm1vZGlmeSA9IGZ1bmN0aW9uIG1vZGlmeSh0YXJnZXQpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5fb3V0cHV0LnRhcmdldCA9IHRhcmdldDtcbiAgICByZXR1cm4gdGhpcy5fb3V0cHV0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gTW9kaWZpZXI7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4vRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBPcHRpb25zTWFuYWdlcih2YWx1ZSkge1xuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG51bGw7XG59XG5PcHRpb25zTWFuYWdlci5wYXRjaCA9IGZ1bmN0aW9uIHBhdGNoT2JqZWN0KHNvdXJjZSwgZGF0YSkge1xuICAgIHZhciBtYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHNvdXJjZSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXG4gICAgICAgIG1hbmFnZXIucGF0Y2goYXJndW1lbnRzW2ldKTtcbiAgICByZXR1cm4gc291cmNlO1xufTtcbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLmV2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQuYmluZFRoaXModGhpcyk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG59XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGF0Y2ggPSBmdW5jdGlvbiBwYXRjaCgpIHtcbiAgICB2YXIgbXlTdGF0ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkYXRhID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHZhciBrIGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChrIGluIG15U3RhdGUgJiYgKGRhdGFba10gJiYgZGF0YVtrXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSAmJiAobXlTdGF0ZVtrXSAmJiBteVN0YXRlW2tdLmNvbnN0cnVjdG9yID09PSBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFteVN0YXRlLmhhc093blByb3BlcnR5KGspKVxuICAgICAgICAgICAgICAgICAgICBteVN0YXRlW2tdID0gT2JqZWN0LmNyZWF0ZShteVN0YXRlW2tdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmtleShrKS5wYXRjaChkYXRhW2tdKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudE91dHB1dClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogayxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmtleShrKS52YWx1ZSgpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQoaywgZGF0YVtrXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBPcHRpb25zTWFuYWdlci5wcm90b3R5cGUucGF0Y2g7XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUua2V5ID0gZnVuY3Rpb24ga2V5KGlkZW50aWZpZXIpIHtcbiAgICB2YXIgcmVzdWx0ID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMuX3ZhbHVlW2lkZW50aWZpZXJdKTtcbiAgICBpZiAoIShyZXN1bHQuX3ZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB8fCByZXN1bHQuX3ZhbHVlIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJlc3VsdC5fdmFsdWUgPSB7fTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlW2tleV07XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLmdldE9wdGlvbnMgPSBPcHRpb25zTWFuYWdlci5wcm90b3R5cGUuZ2V0O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgdmFyIG9yaWdpbmFsVmFsdWUgPSB0aGlzLmdldChrZXkpO1xuICAgIHRoaXMuX3ZhbHVlW2tleV0gPSB2YWx1ZTtcbiAgICBpZiAodGhpcy5ldmVudE91dHB1dCAmJiB2YWx1ZSAhPT0gb3JpZ2luYWxWYWx1ZSlcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCB7XG4gICAgICAgICAgICBpZDoga2V5LFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uIHZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5vbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbk9wdGlvbnNNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnJlbW92ZUxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuT3B0aW9uc01hbmFnZXIucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5PcHRpb25zTWFuYWdlci5wcm90b3R5cGUudW5waXBlID0gZnVuY3Rpb24gdW5waXBlKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnVucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uc01hbmFnZXI7IiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJy4vRW50aXR5Jyk7XG52YXIgU3BlY1BhcnNlciA9IHJlcXVpcmUoJy4vU3BlY1BhcnNlcicpO1xuZnVuY3Rpb24gUmVuZGVyTm9kZShvYmplY3QpIHtcbiAgICB0aGlzLl9vYmplY3QgPSBudWxsO1xuICAgIHRoaXMuX2NoaWxkID0gbnVsbDtcbiAgICB0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5faXNSZW5kZXJhYmxlID0gZmFsc2U7XG4gICAgdGhpcy5faXNNb2RpZmllciA9IGZhbHNlO1xuICAgIHRoaXMuX3Jlc3VsdENhY2hlID0ge307XG4gICAgdGhpcy5fcHJldlJlc3VsdHMgPSB7fTtcbiAgICB0aGlzLl9jaGlsZFJlc3VsdCA9IG51bGw7XG4gICAgaWYgKG9iamVjdClcbiAgICAgICAgdGhpcy5zZXQob2JqZWN0KTtcbn1cblJlbmRlck5vZGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZChjaGlsZCkge1xuICAgIHZhciBjaGlsZE5vZGUgPSBjaGlsZCBpbnN0YW5jZW9mIFJlbmRlck5vZGUgPyBjaGlsZCA6IG5ldyBSZW5kZXJOb2RlKGNoaWxkKTtcbiAgICBpZiAodGhpcy5fY2hpbGQgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgdGhpcy5fY2hpbGQucHVzaChjaGlsZE5vZGUpO1xuICAgIGVsc2UgaWYgKHRoaXMuX2NoaWxkKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkID0gW1xuICAgICAgICAgICAgdGhpcy5fY2hpbGQsXG4gICAgICAgICAgICBjaGlsZE5vZGVcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5faGFzTXVsdGlwbGVDaGlsZHJlbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NoaWxkUmVzdWx0ID0gW107XG4gICAgfSBlbHNlXG4gICAgICAgIHRoaXMuX2NoaWxkID0gY2hpbGROb2RlO1xuICAgIHJldHVybiBjaGlsZE5vZGU7XG59O1xuUmVuZGVyTm9kZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9vYmplY3QgfHwgKHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4gPyBudWxsIDogdGhpcy5fY2hpbGQgPyB0aGlzLl9jaGlsZC5nZXQoKSA6IG51bGwpO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChjaGlsZCkge1xuICAgIHRoaXMuX2NoaWxkUmVzdWx0ID0gbnVsbDtcbiAgICB0aGlzLl9oYXNNdWx0aXBsZUNoaWxkcmVuID0gZmFsc2U7XG4gICAgdGhpcy5faXNSZW5kZXJhYmxlID0gY2hpbGQucmVuZGVyID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMuX2lzTW9kaWZpZXIgPSBjaGlsZC5tb2RpZnkgPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5fb2JqZWN0ID0gY2hpbGQ7XG4gICAgdGhpcy5fY2hpbGQgPSBudWxsO1xuICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIFJlbmRlck5vZGUpXG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzO1xufTtcblJlbmRlck5vZGUucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLmdldCgpO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmdldFNpemUpXG4gICAgICAgIHJlc3VsdCA9IHRhcmdldC5nZXRTaXplKCk7XG4gICAgaWYgKCFyZXN1bHQgJiYgdGhpcy5fY2hpbGQgJiYgdGhpcy5fY2hpbGQuZ2V0U2l6ZSlcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fY2hpbGQuZ2V0U2l6ZSgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuZnVuY3Rpb24gX2FwcGx5Q29tbWl0KHNwZWMsIGNvbnRleHQsIGNhY2hlU3RvcmFnZSkge1xuICAgIHZhciByZXN1bHQgPSBTcGVjUGFyc2VyLnBhcnNlKHNwZWMsIGNvbnRleHQpO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmVzdWx0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIGNoaWxkTm9kZSA9IEVudGl0eS5nZXQoaWQpO1xuICAgICAgICB2YXIgY29tbWl0UGFyYW1zID0gcmVzdWx0W2lkXTtcbiAgICAgICAgY29tbWl0UGFyYW1zLmFsbG9jYXRvciA9IGNvbnRleHQuYWxsb2NhdG9yO1xuICAgICAgICB2YXIgY29tbWl0UmVzdWx0ID0gY2hpbGROb2RlLmNvbW1pdChjb21taXRQYXJhbXMpO1xuICAgICAgICBpZiAoY29tbWl0UmVzdWx0KVxuICAgICAgICAgICAgX2FwcGx5Q29tbWl0KGNvbW1pdFJlc3VsdCwgY29udGV4dCwgY2FjaGVTdG9yYWdlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY2FjaGVTdG9yYWdlW2lkXSA9IGNvbW1pdFBhcmFtcztcbiAgICB9XG59XG5SZW5kZXJOb2RlLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciBwcmV2S2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuX3ByZXZSZXN1bHRzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZXZLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IHByZXZLZXlzW2ldO1xuICAgICAgICBpZiAodGhpcy5fcmVzdWx0Q2FjaGVbaWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSBFbnRpdHkuZ2V0KGlkKTtcbiAgICAgICAgICAgIGlmIChvYmplY3QuY2xlYW51cClcbiAgICAgICAgICAgICAgICBvYmplY3QuY2xlYW51cChjb250ZXh0LmFsbG9jYXRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcHJldlJlc3VsdHMgPSB0aGlzLl9yZXN1bHRDYWNoZTtcbiAgICB0aGlzLl9yZXN1bHRDYWNoZSA9IHt9O1xuICAgIF9hcHBseUNvbW1pdCh0aGlzLnJlbmRlcigpLCBjb250ZXh0LCB0aGlzLl9yZXN1bHRDYWNoZSk7XG59O1xuUmVuZGVyTm9kZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLl9pc1JlbmRlcmFibGUpXG4gICAgICAgIHJldHVybiB0aGlzLl9vYmplY3QucmVuZGVyKCk7XG4gICAgdmFyIHJlc3VsdCA9IG51bGw7XG4gICAgaWYgKHRoaXMuX2hhc011bHRpcGxlQ2hpbGRyZW4pIHtcbiAgICAgICAgcmVzdWx0ID0gdGhpcy5fY2hpbGRSZXN1bHQ7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuX2NoaWxkO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZXN1bHRbaV0gPSBjaGlsZHJlbltpXS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fY2hpbGQpXG4gICAgICAgIHJlc3VsdCA9IHRoaXMuX2NoaWxkLnJlbmRlcigpO1xuICAgIHJldHVybiB0aGlzLl9pc01vZGlmaWVyID8gdGhpcy5fb2JqZWN0Lm1vZGlmeShyZXN1bHQpIDogcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gUmVuZGVyTm9kZTsiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbnZhciBNb2RpZmllciA9IHJlcXVpcmUoJy4vTW9kaWZpZXInKTtcbnZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnLi9SZW5kZXJOb2RlJyk7XG5mdW5jdGlvbiBTY2VuZShkZWZpbml0aW9uKSB7XG4gICAgdGhpcy5pZCA9IG51bGw7XG4gICAgdGhpcy5fb2JqZWN0cyA9IG51bGw7XG4gICAgdGhpcy5ub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLl9kZWZpbml0aW9uID0gbnVsbDtcbiAgICBpZiAoZGVmaW5pdGlvbilcbiAgICAgICAgdGhpcy5sb2FkKGRlZmluaXRpb24pO1xufVxudmFyIF9NQVRSSVhfR0VORVJBVE9SUyA9IHtcbiAgICAgICAgJ3RyYW5zbGF0ZSc6IFRyYW5zZm9ybS50cmFuc2xhdGUsXG4gICAgICAgICdyb3RhdGUnOiBUcmFuc2Zvcm0ucm90YXRlLFxuICAgICAgICAncm90YXRlWCc6IFRyYW5zZm9ybS5yb3RhdGVYLFxuICAgICAgICAncm90YXRlWSc6IFRyYW5zZm9ybS5yb3RhdGVZLFxuICAgICAgICAncm90YXRlWic6IFRyYW5zZm9ybS5yb3RhdGVaLFxuICAgICAgICAncm90YXRlQXhpcyc6IFRyYW5zZm9ybS5yb3RhdGVBeGlzLFxuICAgICAgICAnc2NhbGUnOiBUcmFuc2Zvcm0uc2NhbGUsXG4gICAgICAgICdza2V3JzogVHJhbnNmb3JtLnNrZXcsXG4gICAgICAgICdtYXRyaXgzZCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmd1bWVudHM7XG4gICAgICAgIH1cbiAgICB9O1xuU2NlbmUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFNjZW5lKHRoaXMuX2RlZmluaXRpb24pO1xufTtcbmZ1bmN0aW9uIF9yZXNvbHZlVHJhbnNmb3JtTWF0cml4KG1hdHJpeERlZmluaXRpb24pIHtcbiAgICBmb3IgKHZhciB0eXBlIGluIF9NQVRSSVhfR0VORVJBVE9SUykge1xuICAgICAgICBpZiAodHlwZSBpbiBtYXRyaXhEZWZpbml0aW9uKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IG1hdHJpeERlZmluaXRpb25bdHlwZV07XG4gICAgICAgICAgICBpZiAoIShhcmdzIGluc3RhbmNlb2YgQXJyYXkpKVxuICAgICAgICAgICAgICAgIGFyZ3MgPSBbYXJnc107XG4gICAgICAgICAgICByZXR1cm4gX01BVFJJWF9HRU5FUkFUT1JTW3R5cGVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gX3BhcnNlVHJhbnNmb3JtKGRlZmluaXRpb24pIHtcbiAgICB2YXIgdHJhbnNmb3JtRGVmaW5pdGlvbiA9IGRlZmluaXRpb24udHJhbnNmb3JtO1xuICAgIHZhciBvcGFjaXR5ID0gZGVmaW5pdGlvbi5vcGFjaXR5O1xuICAgIHZhciBvcmlnaW4gPSBkZWZpbml0aW9uLm9yaWdpbjtcbiAgICB2YXIgYWxpZ24gPSBkZWZpbml0aW9uLmFsaWduO1xuICAgIHZhciBzaXplID0gZGVmaW5pdGlvbi5zaXplO1xuICAgIHZhciB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0uaWRlbnRpdHk7XG4gICAgaWYgKHRyYW5zZm9ybURlZmluaXRpb24gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpZiAodHJhbnNmb3JtRGVmaW5pdGlvbi5sZW5ndGggPT09IDE2ICYmIHR5cGVvZiB0cmFuc2Zvcm1EZWZpbml0aW9uWzBdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdHJhbnNmb3JtID0gdHJhbnNmb3JtRGVmaW5pdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhbnNmb3JtRGVmaW5pdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tdWx0aXBseSh0cmFuc2Zvcm0sIF9yZXNvbHZlVHJhbnNmb3JtTWF0cml4KHRyYW5zZm9ybURlZmluaXRpb25baV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHJhbnNmb3JtRGVmaW5pdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybURlZmluaXRpb247XG4gICAgfSBlbHNlIGlmICh0cmFuc2Zvcm1EZWZpbml0aW9uIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIHRyYW5zZm9ybSA9IF9yZXNvbHZlVHJhbnNmb3JtTWF0cml4KHRyYW5zZm9ybURlZmluaXRpb24pO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgICAgIG9yaWdpbjogb3JpZ2luLFxuICAgICAgICAgICAgYWxpZ246IGFsaWduLFxuICAgICAgICAgICAgc2l6ZTogc2l6ZVxuICAgICAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gX3BhcnNlQXJyYXkoZGVmaW5pdGlvbikge1xuICAgIHZhciByZXN1bHQgPSBuZXcgUmVuZGVyTm9kZSgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVmaW5pdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgb2JqID0gX3BhcnNlLmNhbGwodGhpcywgZGVmaW5pdGlvbltpXSk7XG4gICAgICAgIGlmIChvYmopXG4gICAgICAgICAgICByZXN1bHQuYWRkKG9iaik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBfcGFyc2UoZGVmaW5pdGlvbikge1xuICAgIHZhciByZXN1bHQ7XG4gICAgdmFyIGlkO1xuICAgIGlmIChkZWZpbml0aW9uIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmVzdWx0ID0gX3BhcnNlQXJyYXkuY2FsbCh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9IHRoaXMuX29iamVjdHMubGVuZ3RoO1xuICAgICAgICBpZiAoZGVmaW5pdGlvbi5yZW5kZXIgJiYgZGVmaW5pdGlvbi5yZW5kZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gZGVmaW5pdGlvbjtcbiAgICAgICAgfSBlbHNlIGlmIChkZWZpbml0aW9uLnRhcmdldCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldE9iaiA9IF9wYXJzZS5jYWxsKHRoaXMsIGRlZmluaXRpb24udGFyZ2V0KTtcbiAgICAgICAgICAgIHZhciBvYmogPSBfcGFyc2VUcmFuc2Zvcm0uY2FsbCh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBSZW5kZXJOb2RlKG9iaik7XG4gICAgICAgICAgICByZXN1bHQuYWRkKHRhcmdldE9iaik7XG4gICAgICAgICAgICBpZiAoZGVmaW5pdGlvbi5pZClcbiAgICAgICAgICAgICAgICB0aGlzLmlkW2RlZmluaXRpb24uaWRdID0gb2JqO1xuICAgICAgICB9IGVsc2UgaWYgKGRlZmluaXRpb24uaWQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBSZW5kZXJOb2RlKCk7XG4gICAgICAgICAgICB0aGlzLmlkW2RlZmluaXRpb24uaWRdID0gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX29iamVjdHNbaWRdID0gcmVzdWx0O1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5TY2VuZS5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uIGxvYWQoZGVmaW5pdGlvbikge1xuICAgIHRoaXMuX2RlZmluaXRpb24gPSBkZWZpbml0aW9uO1xuICAgIHRoaXMuaWQgPSB7fTtcbiAgICB0aGlzLl9vYmplY3RzID0gW107XG4gICAgdGhpcy5ub2RlLnNldChfcGFyc2UuY2FsbCh0aGlzLCBkZWZpbml0aW9uKSk7XG59O1xuU2NlbmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCgpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLmFkZC5hcHBseSh0aGlzLm5vZGUsIGFyZ3VtZW50cyk7XG59O1xuU2NlbmUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5ub2RlLnJlbmRlci5hcHBseSh0aGlzLm5vZGUsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTY2VuZTsiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnLi9UcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIFNwZWNQYXJzZXIoKSB7XG4gICAgdGhpcy5yZXN1bHQgPSB7fTtcbn1cblNwZWNQYXJzZXIuX2luc3RhbmNlID0gbmV3IFNwZWNQYXJzZXIoKTtcblNwZWNQYXJzZXIucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShzcGVjLCBjb250ZXh0KSB7XG4gICAgcmV0dXJuIFNwZWNQYXJzZXIuX2luc3RhbmNlLnBhcnNlKHNwZWMsIGNvbnRleHQpO1xufTtcblNwZWNQYXJzZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2Uoc3BlYywgY29udGV4dCkge1xuICAgIHRoaXMucmVzZXQoKTtcbiAgICB0aGlzLl9wYXJzZVNwZWMoc3BlYywgY29udGV4dCwgVHJhbnNmb3JtLmlkZW50aXR5KTtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG59O1xuU3BlY1BhcnNlci5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldCgpIHtcbiAgICB0aGlzLnJlc3VsdCA9IHt9O1xufTtcbmZ1bmN0aW9uIF92ZWNJbkNvbnRleHQodiwgbSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIHZbMF0gKiBtWzBdICsgdlsxXSAqIG1bNF0gKyB2WzJdICogbVs4XSxcbiAgICAgICAgdlswXSAqIG1bMV0gKyB2WzFdICogbVs1XSArIHZbMl0gKiBtWzldLFxuICAgICAgICB2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdXG4gICAgXTtcbn1cbnZhciBfb3JpZ2luWmVyb1plcm8gPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuU3BlY1BhcnNlci5wcm90b3R5cGUuX3BhcnNlU3BlYyA9IGZ1bmN0aW9uIF9wYXJzZVNwZWMoc3BlYywgcGFyZW50Q29udGV4dCwgc2l6ZUNvbnRleHQpIHtcbiAgICB2YXIgaWQ7XG4gICAgdmFyIHRhcmdldDtcbiAgICB2YXIgdHJhbnNmb3JtO1xuICAgIHZhciBvcGFjaXR5O1xuICAgIHZhciBvcmlnaW47XG4gICAgdmFyIGFsaWduO1xuICAgIHZhciBzaXplO1xuICAgIGlmICh0eXBlb2Ygc3BlYyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaWQgPSBzcGVjO1xuICAgICAgICB0cmFuc2Zvcm0gPSBwYXJlbnRDb250ZXh0LnRyYW5zZm9ybTtcbiAgICAgICAgYWxpZ24gPSBwYXJlbnRDb250ZXh0LmFsaWduIHx8IHBhcmVudENvbnRleHQub3JpZ2luO1xuICAgICAgICBpZiAocGFyZW50Q29udGV4dC5zaXplICYmIGFsaWduICYmIChhbGlnblswXSB8fCBhbGlnblsxXSkpIHtcbiAgICAgICAgICAgIHZhciBhbGlnbkFkanVzdCA9IFtcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25bMF0gKiBwYXJlbnRDb250ZXh0LnNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgIGFsaWduWzFdICogcGFyZW50Q29udGV4dC5zaXplWzFdLFxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS50aGVuTW92ZSh0cmFuc2Zvcm0sIF92ZWNJbkNvbnRleHQoYWxpZ25BZGp1c3QsIHNpemVDb250ZXh0KSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXN1bHRbaWRdID0ge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcGFjaXR5OiBwYXJlbnRDb250ZXh0Lm9wYWNpdHksXG4gICAgICAgICAgICBvcmlnaW46IHBhcmVudENvbnRleHQub3JpZ2luIHx8IF9vcmlnaW5aZXJvWmVybyxcbiAgICAgICAgICAgIGFsaWduOiBwYXJlbnRDb250ZXh0LmFsaWduIHx8IHBhcmVudENvbnRleHQub3JpZ2luIHx8IF9vcmlnaW5aZXJvWmVybyxcbiAgICAgICAgICAgIHNpemU6IHBhcmVudENvbnRleHQuc2l6ZVxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoIXNwZWMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoc3BlYyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3BlYy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fcGFyc2VTcGVjKHNwZWNbaV0sIHBhcmVudENvbnRleHQsIHNpemVDb250ZXh0KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IHNwZWMudGFyZ2V0O1xuICAgICAgICB0cmFuc2Zvcm0gPSBwYXJlbnRDb250ZXh0LnRyYW5zZm9ybTtcbiAgICAgICAgb3BhY2l0eSA9IHBhcmVudENvbnRleHQub3BhY2l0eTtcbiAgICAgICAgb3JpZ2luID0gcGFyZW50Q29udGV4dC5vcmlnaW47XG4gICAgICAgIGFsaWduID0gcGFyZW50Q29udGV4dC5hbGlnbjtcbiAgICAgICAgc2l6ZSA9IHBhcmVudENvbnRleHQuc2l6ZTtcbiAgICAgICAgdmFyIG5leHRTaXplQ29udGV4dCA9IHNpemVDb250ZXh0O1xuICAgICAgICBpZiAoc3BlYy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBvcGFjaXR5ID0gcGFyZW50Q29udGV4dC5vcGFjaXR5ICogc3BlYy5vcGFjaXR5O1xuICAgICAgICBpZiAoc3BlYy50cmFuc2Zvcm0pXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubXVsdGlwbHkocGFyZW50Q29udGV4dC50cmFuc2Zvcm0sIHNwZWMudHJhbnNmb3JtKTtcbiAgICAgICAgaWYgKHNwZWMub3JpZ2luKSB7XG4gICAgICAgICAgICBvcmlnaW4gPSBzcGVjLm9yaWdpbjtcbiAgICAgICAgICAgIG5leHRTaXplQ29udGV4dCA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGVjLmFsaWduKVxuICAgICAgICAgICAgYWxpZ24gPSBzcGVjLmFsaWduO1xuICAgICAgICBpZiAoc3BlYy5zaXplKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50U2l6ZSA9IHBhcmVudENvbnRleHQuc2l6ZTtcbiAgICAgICAgICAgIHNpemUgPSBbXG4gICAgICAgICAgICAgICAgc3BlYy5zaXplWzBdICE9PSB1bmRlZmluZWQgPyBzcGVjLnNpemVbMF0gOiBwYXJlbnRTaXplWzBdLFxuICAgICAgICAgICAgICAgIHNwZWMuc2l6ZVsxXSAhPT0gdW5kZWZpbmVkID8gc3BlYy5zaXplWzFdIDogcGFyZW50U2l6ZVsxXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRTaXplKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFhbGlnbilcbiAgICAgICAgICAgICAgICAgICAgYWxpZ24gPSBvcmlnaW47XG4gICAgICAgICAgICAgICAgaWYgKGFsaWduICYmIChhbGlnblswXSB8fCBhbGlnblsxXSkpXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS50aGVuTW92ZSh0cmFuc2Zvcm0sIF92ZWNJbkNvbnRleHQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25bMF0gKiBwYXJlbnRTaXplWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25bMV0gKiBwYXJlbnRTaXplWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgICAgICBdLCBzaXplQ29udGV4dCkpO1xuICAgICAgICAgICAgICAgIGlmIChvcmlnaW4gJiYgKG9yaWdpblswXSB8fCBvcmlnaW5bMV0pKVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ubW92ZVRoZW4oW1xuICAgICAgICAgICAgICAgICAgICAgICAgLW9yaWdpblswXSAqIHNpemVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAtb3JpZ2luWzFdICogc2l6ZVsxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgICAgXSwgdHJhbnNmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHRTaXplQ29udGV4dCA9IHBhcmVudENvbnRleHQudHJhbnNmb3JtO1xuICAgICAgICAgICAgb3JpZ2luID0gbnVsbDtcbiAgICAgICAgICAgIGFsaWduID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wYXJzZVNwZWModGFyZ2V0LCB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHksXG4gICAgICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgICAgIGFsaWduOiBhbGlnbixcbiAgICAgICAgICAgIHNpemU6IHNpemVcbiAgICAgICAgfSwgbmV4dFNpemVDb250ZXh0KTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTcGVjUGFyc2VyOyIsInZhciBFbGVtZW50T3V0cHV0ID0gcmVxdWlyZSgnLi9FbGVtZW50T3V0cHV0Jyk7XG5mdW5jdGlvbiBTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICBFbGVtZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG4gICAgdGhpcy5jb250ZW50ID0gJyc7XG4gICAgdGhpcy5jbGFzc0xpc3QgPSBbXTtcbiAgICB0aGlzLnNpemUgPSBudWxsO1xuICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fc3R5bGVzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9kaXJ0eUNsYXNzZXMgPSBbXTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBudWxsO1xufVxuU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVsZW1lbnRPdXRwdXQucHJvdG90eXBlKTtcblN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3VyZmFjZTtcblN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRUeXBlID0gJ2Rpdic7XG5TdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIHNldFByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGZvciAodmFyIG4gaW4gcHJvcGVydGllcykge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbbl0gPSBwcm9wZXJ0aWVzW25dO1xuICAgIH1cbiAgICB0aGlzLl9zdHlsZXNEaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uIGdldFByb3BlcnRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIGFkZENsYXNzKGNsYXNzTmFtZSkge1xuICAgIGlmICh0aGlzLmNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSkgPCAwKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnB1c2goY2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5fY2xhc3Nlc0RpcnR5ID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuY2xhc3NMaXN0LmluZGV4T2YoY2xhc3NOYW1lKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHRoaXMuX2RpcnR5Q2xhc3Nlcy5wdXNoKHRoaXMuY2xhc3NMaXN0LnNwbGljZShpLCAxKVswXSk7XG4gICAgICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufTtcblN1cmZhY2UucHJvdG90eXBlLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgdmFyIGkgPSB0aGlzLmNsYXNzTGlzdC5pbmRleE9mKGNsYXNzTmFtZSk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDbGFzc2VzID0gZnVuY3Rpb24gc2V0Q2xhc3NlcyhjbGFzc0xpc3QpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJlbW92YWwgPSBbXTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNsYXNzTGlzdC5pbmRleE9mKHRoaXMuY2xhc3NMaXN0W2ldKSA8IDApXG4gICAgICAgICAgICByZW1vdmFsLnB1c2godGhpcy5jbGFzc0xpc3RbaV0pO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgcmVtb3ZhbC5sZW5ndGg7IGkrKylcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhyZW1vdmFsW2ldKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKVxuICAgICAgICB0aGlzLmFkZENsYXNzKGNsYXNzTGlzdFtpXSk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0Q2xhc3NMaXN0ID0gZnVuY3Rpb24gZ2V0Q2xhc3NMaXN0KCkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzTGlzdDtcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gc2V0Q29udGVudChjb250ZW50KSB7XG4gICAgaWYgKHRoaXMuY29udGVudCAhPT0gY29udGVudCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbn07XG5TdXJmYWNlLnByb3RvdHlwZS5nZXRDb250ZW50ID0gZnVuY3Rpb24gZ2V0Q29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50O1xufTtcblN1cmZhY2UucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5zaXplKVxuICAgICAgICB0aGlzLnNldFNpemUob3B0aW9ucy5zaXplKTtcbiAgICBpZiAob3B0aW9ucy5jbGFzc2VzKVxuICAgICAgICB0aGlzLnNldENsYXNzZXMob3B0aW9ucy5jbGFzc2VzKTtcbiAgICBpZiAob3B0aW9ucy5wcm9wZXJ0aWVzKVxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMob3B0aW9ucy5wcm9wZXJ0aWVzKTtcbiAgICBpZiAob3B0aW9ucy5jb250ZW50KVxuICAgICAgICB0aGlzLnNldENvbnRlbnQob3B0aW9ucy5jb250ZW50KTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5mdW5jdGlvbiBfY2xlYW51cENsYXNzZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kaXJ0eUNsYXNzZXMubGVuZ3RoOyBpKyspXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2RpcnR5Q2xhc3Nlc1tpXSk7XG4gICAgdGhpcy5fZGlydHlDbGFzc2VzID0gW107XG59XG5mdW5jdGlvbiBfYXBwbHlTdHlsZXModGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgdGFyZ2V0LnN0eWxlW25dID0gdGhpcy5wcm9wZXJ0aWVzW25dO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9jbGVhbnVwU3R5bGVzKHRhcmdldCkge1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIHRhcmdldC5zdHlsZVtuXSA9ICcnO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF94eU5vdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYiA/IGFbMF0gIT09IGJbMF0gfHwgYVsxXSAhPT0gYlsxXSA6IGEgIT09IGI7XG59XG5TdXJmYWNlLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uIHNldHVwKGFsbG9jYXRvcikge1xuICAgIHZhciB0YXJnZXQgPSBhbGxvY2F0b3IuYWxsb2NhdGUodGhpcy5lbGVtZW50VHlwZSk7XG4gICAgaWYgKHRoaXMuZWxlbWVudENsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudENsYXNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5lbGVtZW50Q2xhc3NbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5lbGVtZW50Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgdGhpcy5hdHRhY2godGFyZ2V0KTtcbiAgICB0aGlzLl9vcGFjaXR5ID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50VGFyZ2V0ID0gdGFyZ2V0O1xuICAgIHRoaXMuX3N0eWxlc0RpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9jbGFzc2VzRGlydHkgPSB0cnVlO1xuICAgIHRoaXMuX3NpemVEaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9vcmlnaW5EaXJ0eSA9IHRydWU7XG4gICAgdGhpcy5fdHJhbnNmb3JtRGlydHkgPSB0cnVlO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgaWYgKCF0aGlzLl9jdXJyZW50VGFyZ2V0KVxuICAgICAgICB0aGlzLnNldHVwKGNvbnRleHQuYWxsb2NhdG9yKTtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICBpZiAodGhpcy5fY2xhc3Nlc0RpcnR5KSB7XG4gICAgICAgIF9jbGVhbnVwQ2xhc3Nlcy5jYWxsKHRoaXMsIHRhcmdldCk7XG4gICAgICAgIHZhciBjbGFzc0xpc3QgPSB0aGlzLmdldENsYXNzTGlzdCgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzTGlzdC5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGNsYXNzTGlzdFtpXSk7XG4gICAgICAgIHRoaXMuX2NsYXNzZXNEaXJ0eSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc3R5bGVzRGlydHkpIHtcbiAgICAgICAgX2FwcGx5U3R5bGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICAgICAgdGhpcy5fc3R5bGVzRGlydHkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICB2YXIgb3JpZ1NpemUgPSBjb250ZXh0LnNpemU7XG4gICAgICAgIHNpemUgPSBbXG4gICAgICAgICAgICB0aGlzLnNpemVbMF0sXG4gICAgICAgICAgICB0aGlzLnNpemVbMV1cbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHNpemVbMF0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHNpemVbMF0gPSBvcmlnU2l6ZVswXTtcbiAgICAgICAgZWxzZSBpZiAoc2l6ZVswXSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHNpemVbMF0gPSB0YXJnZXQuY2xpZW50V2lkdGg7XG4gICAgICAgIGlmIChzaXplWzFdID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBzaXplWzFdID0gb3JpZ1NpemVbMV07XG4gICAgICAgIGVsc2UgaWYgKHNpemVbMV0gPT09IHRydWUpXG4gICAgICAgICAgICBzaXplWzFdID0gdGFyZ2V0LmNsaWVudEhlaWdodDtcbiAgICB9XG4gICAgaWYgKF94eU5vdEVxdWFscyh0aGlzLl9zaXplLCBzaXplKSkge1xuICAgICAgICBpZiAoIXRoaXMuX3NpemUpXG4gICAgICAgICAgICB0aGlzLl9zaXplID0gW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fc2l6ZVswXSA9IHNpemVbMF07XG4gICAgICAgIHRoaXMuX3NpemVbMV0gPSBzaXplWzFdO1xuICAgICAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2l6ZURpcnR5KSB7XG4gICAgICAgIGlmICh0aGlzLl9zaXplKSB7XG4gICAgICAgICAgICB0YXJnZXQuc3R5bGUud2lkdGggPSB0aGlzLnNpemUgJiYgdGhpcy5zaXplWzBdID09PSB0cnVlID8gJycgOiB0aGlzLl9zaXplWzBdICsgJ3B4JztcbiAgICAgICAgICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSB0aGlzLnNpemUgJiYgdGhpcy5zaXplWzFdID09PSB0cnVlID8gJycgOiB0aGlzLl9zaXplWzFdICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaXplRGlydHkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbnRlbnREaXJ0eSkge1xuICAgICAgICB0aGlzLmRlcGxveSh0YXJnZXQpO1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdkZXBsb3knKTtcbiAgICAgICAgdGhpcy5fY29udGVudERpcnR5ID0gZmFsc2U7XG4gICAgfVxuICAgIEVsZW1lbnRPdXRwdXQucHJvdG90eXBlLmNvbW1pdC5jYWxsKHRoaXMsIGNvbnRleHQpO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiBjbGVhbnVwKGFsbG9jYXRvcikge1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdyZWNhbGwnKTtcbiAgICB0aGlzLnJlY2FsbCh0YXJnZXQpO1xuICAgIHRhcmdldC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHRhcmdldC5zdHlsZS5vcGFjaXR5ID0gJyc7XG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gJyc7XG4gICAgdGFyZ2V0LnN0eWxlLmhlaWdodCA9ICcnO1xuICAgIHRoaXMuX3NpemUgPSBudWxsO1xuICAgIF9jbGVhbnVwU3R5bGVzLmNhbGwodGhpcywgdGFyZ2V0KTtcbiAgICB2YXIgY2xhc3NMaXN0ID0gdGhpcy5nZXRDbGFzc0xpc3QoKTtcbiAgICBfY2xlYW51cENsYXNzZXMuY2FsbCh0aGlzLCB0YXJnZXQpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspXG4gICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTGlzdFtpXSk7XG4gICAgaWYgKHRoaXMuZWxlbWVudENsYXNzKSB7XG4gICAgICAgIGlmICh0aGlzLmVsZW1lbnRDbGFzcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50Q2xhc3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmVsZW1lbnRDbGFzc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmVsZW1lbnRDbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kZXRhY2godGFyZ2V0KTtcbiAgICB0aGlzLl9jdXJyZW50VGFyZ2V0ID0gbnVsbDtcbiAgICBhbGxvY2F0b3IuZGVhbGxvY2F0ZSh0YXJnZXQpO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICB2YXIgY29udGVudCA9IHRoaXMuZ2V0Q29udGVudCgpO1xuICAgIGlmIChjb250ZW50IGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICB3aGlsZSAodGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSlcbiAgICAgICAgICAgIHRhcmdldC5yZW1vdmVDaGlsZCh0YXJnZXQuZmlyc3RDaGlsZCk7XG4gICAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB9IGVsc2VcbiAgICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IGNvbnRlbnQ7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUucmVjYWxsID0gZnVuY3Rpb24gcmVjYWxsKHRhcmdldCkge1xuICAgIHZhciBkZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAodGFyZ2V0Lmhhc0NoaWxkTm9kZXMoKSlcbiAgICAgICAgZGYuYXBwZW5kQ2hpbGQodGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICAgIHRoaXMuc2V0Q29udGVudChkZik7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NpemU7XG59O1xuU3VyZmFjZS5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSkge1xuICAgIHRoaXMuc2l6ZSA9IHNpemUgPyBbXG4gICAgICAgIHNpemVbMF0sXG4gICAgICAgIHNpemVbMV1cbiAgICBdIDogbnVsbDtcbiAgICB0aGlzLl9zaXplRGlydHkgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3VyZmFjZTsiLCJ2YXIgVHJhbnNmb3JtID0ge307XG5UcmFuc2Zvcm0ucHJlY2lzaW9uID0gMC4wMDAwMDE7XG5UcmFuc2Zvcm0uaWRlbnRpdHkgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMVxuXTtcblRyYW5zZm9ybS5tdWx0aXBseTR4NCA9IGZ1bmN0aW9uIG11bHRpcGx5NHg0KGEsIGIpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBhWzBdICogYlswXSArIGFbNF0gKiBiWzFdICsgYVs4XSAqIGJbMl0gKyBhWzEyXSAqIGJbM10sXG4gICAgICAgIGFbMV0gKiBiWzBdICsgYVs1XSAqIGJbMV0gKyBhWzldICogYlsyXSArIGFbMTNdICogYlszXSxcbiAgICAgICAgYVsyXSAqIGJbMF0gKyBhWzZdICogYlsxXSArIGFbMTBdICogYlsyXSArIGFbMTRdICogYlszXSxcbiAgICAgICAgYVszXSAqIGJbMF0gKyBhWzddICogYlsxXSArIGFbMTFdICogYlsyXSArIGFbMTVdICogYlszXSxcbiAgICAgICAgYVswXSAqIGJbNF0gKyBhWzRdICogYls1XSArIGFbOF0gKiBiWzZdICsgYVsxMl0gKiBiWzddLFxuICAgICAgICBhWzFdICogYls0XSArIGFbNV0gKiBiWzVdICsgYVs5XSAqIGJbNl0gKyBhWzEzXSAqIGJbN10sXG4gICAgICAgIGFbMl0gKiBiWzRdICsgYVs2XSAqIGJbNV0gKyBhWzEwXSAqIGJbNl0gKyBhWzE0XSAqIGJbN10sXG4gICAgICAgIGFbM10gKiBiWzRdICsgYVs3XSAqIGJbNV0gKyBhWzExXSAqIGJbNl0gKyBhWzE1XSAqIGJbN10sXG4gICAgICAgIGFbMF0gKiBiWzhdICsgYVs0XSAqIGJbOV0gKyBhWzhdICogYlsxMF0gKyBhWzEyXSAqIGJbMTFdLFxuICAgICAgICBhWzFdICogYls4XSArIGFbNV0gKiBiWzldICsgYVs5XSAqIGJbMTBdICsgYVsxM10gKiBiWzExXSxcbiAgICAgICAgYVsyXSAqIGJbOF0gKyBhWzZdICogYls5XSArIGFbMTBdICogYlsxMF0gKyBhWzE0XSAqIGJbMTFdLFxuICAgICAgICBhWzNdICogYls4XSArIGFbN10gKiBiWzldICsgYVsxMV0gKiBiWzEwXSArIGFbMTVdICogYlsxMV0sXG4gICAgICAgIGFbMF0gKiBiWzEyXSArIGFbNF0gKiBiWzEzXSArIGFbOF0gKiBiWzE0XSArIGFbMTJdICogYlsxNV0sXG4gICAgICAgIGFbMV0gKiBiWzEyXSArIGFbNV0gKiBiWzEzXSArIGFbOV0gKiBiWzE0XSArIGFbMTNdICogYlsxNV0sXG4gICAgICAgIGFbMl0gKiBiWzEyXSArIGFbNl0gKiBiWzEzXSArIGFbMTBdICogYlsxNF0gKyBhWzE0XSAqIGJbMTVdLFxuICAgICAgICBhWzNdICogYlsxMl0gKyBhWzddICogYlsxM10gKyBhWzExXSAqIGJbMTRdICsgYVsxNV0gKiBiWzE1XVxuICAgIF07XG59O1xuVHJhbnNmb3JtLm11bHRpcGx5ID0gZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGFbMF0gKiBiWzBdICsgYVs0XSAqIGJbMV0gKyBhWzhdICogYlsyXSxcbiAgICAgICAgYVsxXSAqIGJbMF0gKyBhWzVdICogYlsxXSArIGFbOV0gKiBiWzJdLFxuICAgICAgICBhWzJdICogYlswXSArIGFbNl0gKiBiWzFdICsgYVsxMF0gKiBiWzJdLFxuICAgICAgICAwLFxuICAgICAgICBhWzBdICogYls0XSArIGFbNF0gKiBiWzVdICsgYVs4XSAqIGJbNl0sXG4gICAgICAgIGFbMV0gKiBiWzRdICsgYVs1XSAqIGJbNV0gKyBhWzldICogYls2XSxcbiAgICAgICAgYVsyXSAqIGJbNF0gKyBhWzZdICogYls1XSArIGFbMTBdICogYls2XSxcbiAgICAgICAgMCxcbiAgICAgICAgYVswXSAqIGJbOF0gKyBhWzRdICogYls5XSArIGFbOF0gKiBiWzEwXSxcbiAgICAgICAgYVsxXSAqIGJbOF0gKyBhWzVdICogYls5XSArIGFbOV0gKiBiWzEwXSxcbiAgICAgICAgYVsyXSAqIGJbOF0gKyBhWzZdICogYls5XSArIGFbMTBdICogYlsxMF0sXG4gICAgICAgIDAsXG4gICAgICAgIGFbMF0gKiBiWzEyXSArIGFbNF0gKiBiWzEzXSArIGFbOF0gKiBiWzE0XSArIGFbMTJdLFxuICAgICAgICBhWzFdICogYlsxMl0gKyBhWzVdICogYlsxM10gKyBhWzldICogYlsxNF0gKyBhWzEzXSxcbiAgICAgICAgYVsyXSAqIGJbMTJdICsgYVs2XSAqIGJbMTNdICsgYVsxMF0gKiBiWzE0XSArIGFbMTRdLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0udGhlbk1vdmUgPSBmdW5jdGlvbiB0aGVuTW92ZShtLCB0KSB7XG4gICAgaWYgKCF0WzJdKVxuICAgICAgICB0WzJdID0gMDtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzBdLFxuICAgICAgICBtWzFdLFxuICAgICAgICBtWzJdLFxuICAgICAgICAwLFxuICAgICAgICBtWzRdLFxuICAgICAgICBtWzVdLFxuICAgICAgICBtWzZdLFxuICAgICAgICAwLFxuICAgICAgICBtWzhdLFxuICAgICAgICBtWzldLFxuICAgICAgICBtWzEwXSxcbiAgICAgICAgMCxcbiAgICAgICAgbVsxMl0gKyB0WzBdLFxuICAgICAgICBtWzEzXSArIHRbMV0sXG4gICAgICAgIG1bMTRdICsgdFsyXSxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLm1vdmVUaGVuID0gZnVuY3Rpb24gbW92ZVRoZW4odiwgbSkge1xuICAgIGlmICghdlsyXSlcbiAgICAgICAgdlsyXSA9IDA7XG4gICAgdmFyIHQwID0gdlswXSAqIG1bMF0gKyB2WzFdICogbVs0XSArIHZbMl0gKiBtWzhdO1xuICAgIHZhciB0MSA9IHZbMF0gKiBtWzFdICsgdlsxXSAqIG1bNV0gKyB2WzJdICogbVs5XTtcbiAgICB2YXIgdDIgPSB2WzBdICogbVsyXSArIHZbMV0gKiBtWzZdICsgdlsyXSAqIG1bMTBdO1xuICAgIHJldHVybiBUcmFuc2Zvcm0udGhlbk1vdmUobSwgW1xuICAgICAgICB0MCxcbiAgICAgICAgdDEsXG4gICAgICAgIHQyXG4gICAgXSk7XG59O1xuVHJhbnNmb3JtLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIHRyYW5zbGF0ZSh4LCB5LCB6KSB7XG4gICAgaWYgKHogPT09IHVuZGVmaW5lZClcbiAgICAgICAgeiA9IDA7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgeixcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnRoZW5TY2FsZSA9IGZ1bmN0aW9uIHRoZW5TY2FsZShtLCBzKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgc1swXSAqIG1bMF0sXG4gICAgICAgIHNbMV0gKiBtWzFdLFxuICAgICAgICBzWzJdICogbVsyXSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bNF0sXG4gICAgICAgIHNbMV0gKiBtWzVdLFxuICAgICAgICBzWzJdICogbVs2XSxcbiAgICAgICAgMCxcbiAgICAgICAgc1swXSAqIG1bOF0sXG4gICAgICAgIHNbMV0gKiBtWzldLFxuICAgICAgICBzWzJdICogbVsxMF0sXG4gICAgICAgIDAsXG4gICAgICAgIHNbMF0gKiBtWzEyXSxcbiAgICAgICAgc1sxXSAqIG1bMTNdLFxuICAgICAgICBzWzJdICogbVsxNF0sXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5zY2FsZSA9IGZ1bmN0aW9uIHNjYWxlKHgsIHksIHopIHtcbiAgICBpZiAoeiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB6ID0gMTtcbiAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB5ID0geDtcbiAgICByZXR1cm4gW1xuICAgICAgICB4LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICB5LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICB6LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlWCA9IGZ1bmN0aW9uIHJvdGF0ZVgodGhldGEpIHtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgLXNpblRoZXRhLFxuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnJvdGF0ZVkgPSBmdW5jdGlvbiByb3RhdGVZKHRoZXRhKSB7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBjb3NUaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgLXNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBzaW5UaGV0YSxcbiAgICAgICAgMCxcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5yb3RhdGVaID0gZnVuY3Rpb24gcm90YXRlWih0aGV0YSkge1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgY29zVGhldGEsXG4gICAgICAgIHNpblRoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAtc2luVGhldGEsXG4gICAgICAgIGNvc1RoZXRhLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0ucm90YXRlID0gZnVuY3Rpb24gcm90YXRlKHBoaSwgdGhldGEsIHBzaSkge1xuICAgIHZhciBjb3NQaGkgPSBNYXRoLmNvcyhwaGkpO1xuICAgIHZhciBzaW5QaGkgPSBNYXRoLnNpbihwaGkpO1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgdmFyIGNvc1BzaSA9IE1hdGguY29zKHBzaSk7XG4gICAgdmFyIHNpblBzaSA9IE1hdGguc2luKHBzaSk7XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIGNvc1RoZXRhICogY29zUHNpLFxuICAgICAgICAgICAgY29zUGhpICogc2luUHNpICsgc2luUGhpICogc2luVGhldGEgKiBjb3NQc2ksXG4gICAgICAgICAgICBzaW5QaGkgKiBzaW5Qc2kgLSBjb3NQaGkgKiBzaW5UaGV0YSAqIGNvc1BzaSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAtY29zVGhldGEgKiBzaW5Qc2ksXG4gICAgICAgICAgICBjb3NQaGkgKiBjb3NQc2kgLSBzaW5QaGkgKiBzaW5UaGV0YSAqIHNpblBzaSxcbiAgICAgICAgICAgIHNpblBoaSAqIGNvc1BzaSArIGNvc1BoaSAqIHNpblRoZXRhICogc2luUHNpLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHNpblRoZXRhLFxuICAgICAgICAgICAgLXNpblBoaSAqIGNvc1RoZXRhLFxuICAgICAgICAgICAgY29zUGhpICogY29zVGhldGEsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLnJvdGF0ZUF4aXMgPSBmdW5jdGlvbiByb3RhdGVBeGlzKHYsIHRoZXRhKSB7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgdmVyVGhldGEgPSAxIC0gY29zVGhldGE7XG4gICAgdmFyIHh4ViA9IHZbMF0gKiB2WzBdICogdmVyVGhldGE7XG4gICAgdmFyIHh5ViA9IHZbMF0gKiB2WzFdICogdmVyVGhldGE7XG4gICAgdmFyIHh6ViA9IHZbMF0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHl5ViA9IHZbMV0gKiB2WzFdICogdmVyVGhldGE7XG4gICAgdmFyIHl6ViA9IHZbMV0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHp6ViA9IHZbMl0gKiB2WzJdICogdmVyVGhldGE7XG4gICAgdmFyIHhzID0gdlswXSAqIHNpblRoZXRhO1xuICAgIHZhciB5cyA9IHZbMV0gKiBzaW5UaGV0YTtcbiAgICB2YXIgenMgPSB2WzJdICogc2luVGhldGE7XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIHh4ViArIGNvc1RoZXRhLFxuICAgICAgICAgICAgeHlWICsgenMsXG4gICAgICAgICAgICB4elYgLSB5cyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB4eVYgLSB6cyxcbiAgICAgICAgICAgIHl5ViArIGNvc1RoZXRhLFxuICAgICAgICAgICAgeXpWICsgeHMsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgeHpWICsgeXMsXG4gICAgICAgICAgICB5elYgLSB4cyxcbiAgICAgICAgICAgIHp6ViArIGNvc1RoZXRhLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblRyYW5zZm9ybS5hYm91dE9yaWdpbiA9IGZ1bmN0aW9uIGFib3V0T3JpZ2luKHYsIG0pIHtcbiAgICB2YXIgdDAgPSB2WzBdIC0gKHZbMF0gKiBtWzBdICsgdlsxXSAqIG1bNF0gKyB2WzJdICogbVs4XSk7XG4gICAgdmFyIHQxID0gdlsxXSAtICh2WzBdICogbVsxXSArIHZbMV0gKiBtWzVdICsgdlsyXSAqIG1bOV0pO1xuICAgIHZhciB0MiA9IHZbMl0gLSAodlswXSAqIG1bMl0gKyB2WzFdICogbVs2XSArIHZbMl0gKiBtWzEwXSk7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50aGVuTW92ZShtLCBbXG4gICAgICAgIHQwLFxuICAgICAgICB0MSxcbiAgICAgICAgdDJcbiAgICBdKTtcbn07XG5UcmFuc2Zvcm0uc2tldyA9IGZ1bmN0aW9uIHNrZXcocGhpLCB0aGV0YSwgcHNpKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC50YW4odGhldGEpLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihwc2kpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLnRhbihwaGkpLFxuICAgICAgICAxLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uc2tld1ggPSBmdW5jdGlvbiBza2V3WChhbmdsZSkge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIE1hdGgudGFuKGFuZ2xlKSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMVxuICAgIF07XG59O1xuVHJhbnNmb3JtLnNrZXdZID0gZnVuY3Rpb24gc2tld1koYW5nbGUpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAxLFxuICAgICAgICBNYXRoLnRhbihhbmdsZSksXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdO1xufTtcblRyYW5zZm9ybS5wZXJzcGVjdGl2ZSA9IGZ1bmN0aW9uIHBlcnNwZWN0aXZlKGZvY3VzWikge1xuICAgIHJldHVybiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDEsXG4gICAgICAgIC0xIC8gZm9jdXNaLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKG0pIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBtWzEyXSxcbiAgICAgICAgbVsxM10sXG4gICAgICAgIG1bMTRdXG4gICAgXTtcbn07XG5UcmFuc2Zvcm0uaW52ZXJzZSA9IGZ1bmN0aW9uIGludmVyc2UobSkge1xuICAgIHZhciBjMCA9IG1bNV0gKiBtWzEwXSAtIG1bNl0gKiBtWzldO1xuICAgIHZhciBjMSA9IG1bNF0gKiBtWzEwXSAtIG1bNl0gKiBtWzhdO1xuICAgIHZhciBjMiA9IG1bNF0gKiBtWzldIC0gbVs1XSAqIG1bOF07XG4gICAgdmFyIGM0ID0gbVsxXSAqIG1bMTBdIC0gbVsyXSAqIG1bOV07XG4gICAgdmFyIGM1ID0gbVswXSAqIG1bMTBdIC0gbVsyXSAqIG1bOF07XG4gICAgdmFyIGM2ID0gbVswXSAqIG1bOV0gLSBtWzFdICogbVs4XTtcbiAgICB2YXIgYzggPSBtWzFdICogbVs2XSAtIG1bMl0gKiBtWzVdO1xuICAgIHZhciBjOSA9IG1bMF0gKiBtWzZdIC0gbVsyXSAqIG1bNF07XG4gICAgdmFyIGMxMCA9IG1bMF0gKiBtWzVdIC0gbVsxXSAqIG1bNF07XG4gICAgdmFyIGRldE0gPSBtWzBdICogYzAgLSBtWzFdICogYzEgKyBtWzJdICogYzI7XG4gICAgdmFyIGludkQgPSAxIC8gZGV0TTtcbiAgICB2YXIgcmVzdWx0ID0gW1xuICAgICAgICAgICAgaW52RCAqIGMwLFxuICAgICAgICAgICAgLWludkQgKiBjNCxcbiAgICAgICAgICAgIGludkQgKiBjOCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAtaW52RCAqIGMxLFxuICAgICAgICAgICAgaW52RCAqIGM1LFxuICAgICAgICAgICAgLWludkQgKiBjOSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBpbnZEICogYzIsXG4gICAgICAgICAgICAtaW52RCAqIGM2LFxuICAgICAgICAgICAgaW52RCAqIGMxMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxXG4gICAgICAgIF07XG4gICAgcmVzdWx0WzEyXSA9IC1tWzEyXSAqIHJlc3VsdFswXSAtIG1bMTNdICogcmVzdWx0WzRdIC0gbVsxNF0gKiByZXN1bHRbOF07XG4gICAgcmVzdWx0WzEzXSA9IC1tWzEyXSAqIHJlc3VsdFsxXSAtIG1bMTNdICogcmVzdWx0WzVdIC0gbVsxNF0gKiByZXN1bHRbOV07XG4gICAgcmVzdWx0WzE0XSA9IC1tWzEyXSAqIHJlc3VsdFsyXSAtIG1bMTNdICogcmVzdWx0WzZdIC0gbVsxNF0gKiByZXN1bHRbMTBdO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLnRyYW5zcG9zZSA9IGZ1bmN0aW9uIHRyYW5zcG9zZShtKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgbVswXSxcbiAgICAgICAgbVs0XSxcbiAgICAgICAgbVs4XSxcbiAgICAgICAgbVsxMl0sXG4gICAgICAgIG1bMV0sXG4gICAgICAgIG1bNV0sXG4gICAgICAgIG1bOV0sXG4gICAgICAgIG1bMTNdLFxuICAgICAgICBtWzJdLFxuICAgICAgICBtWzZdLFxuICAgICAgICBtWzEwXSxcbiAgICAgICAgbVsxNF0sXG4gICAgICAgIG1bM10sXG4gICAgICAgIG1bN10sXG4gICAgICAgIG1bMTFdLFxuICAgICAgICBtWzE1XVxuICAgIF07XG59O1xuZnVuY3Rpb24gX25vcm1TcXVhcmVkKHYpIHtcbiAgICByZXR1cm4gdi5sZW5ndGggPT09IDIgPyB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdIDogdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdO1xufVxuZnVuY3Rpb24gX25vcm0odikge1xuICAgIHJldHVybiBNYXRoLnNxcnQoX25vcm1TcXVhcmVkKHYpKTtcbn1cbmZ1bmN0aW9uIF9zaWduKG4pIHtcbiAgICByZXR1cm4gbiA8IDAgPyAtMSA6IDE7XG59XG5UcmFuc2Zvcm0uaW50ZXJwcmV0ID0gZnVuY3Rpb24gaW50ZXJwcmV0KE0pIHtcbiAgICB2YXIgeCA9IFtcbiAgICAgICAgICAgIE1bMF0sXG4gICAgICAgICAgICBNWzFdLFxuICAgICAgICAgICAgTVsyXVxuICAgICAgICBdO1xuICAgIHZhciBzZ24gPSBfc2lnbih4WzBdKTtcbiAgICB2YXIgeE5vcm0gPSBfbm9ybSh4KTtcbiAgICB2YXIgdiA9IFtcbiAgICAgICAgICAgIHhbMF0gKyBzZ24gKiB4Tm9ybSxcbiAgICAgICAgICAgIHhbMV0sXG4gICAgICAgICAgICB4WzJdXG4gICAgICAgIF07XG4gICAgdmFyIG11bHQgPSAyIC8gX25vcm1TcXVhcmVkKHYpO1xuICAgIGlmIChtdWx0ID49IEluZmluaXR5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0cmFuc2xhdGU6IFRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoTSksXG4gICAgICAgICAgICByb3RhdGU6IFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNjYWxlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBza2V3OiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgdmFyIFExID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIFExWzBdID0gMSAtIG11bHQgKiB2WzBdICogdlswXTtcbiAgICBRMVs1XSA9IDEgLSBtdWx0ICogdlsxXSAqIHZbMV07XG4gICAgUTFbMTBdID0gMSAtIG11bHQgKiB2WzJdICogdlsyXTtcbiAgICBRMVsxXSA9IC1tdWx0ICogdlswXSAqIHZbMV07XG4gICAgUTFbMl0gPSAtbXVsdCAqIHZbMF0gKiB2WzJdO1xuICAgIFExWzZdID0gLW11bHQgKiB2WzFdICogdlsyXTtcbiAgICBRMVs0XSA9IFExWzFdO1xuICAgIFExWzhdID0gUTFbMl07XG4gICAgUTFbOV0gPSBRMVs2XTtcbiAgICB2YXIgTVExID0gVHJhbnNmb3JtLm11bHRpcGx5KFExLCBNKTtcbiAgICB2YXIgeDIgPSBbXG4gICAgICAgICAgICBNUTFbNV0sXG4gICAgICAgICAgICBNUTFbNl1cbiAgICAgICAgXTtcbiAgICB2YXIgc2duMiA9IF9zaWduKHgyWzBdKTtcbiAgICB2YXIgeDJOb3JtID0gX25vcm0oeDIpO1xuICAgIHZhciB2MiA9IFtcbiAgICAgICAgICAgIHgyWzBdICsgc2duMiAqIHgyTm9ybSxcbiAgICAgICAgICAgIHgyWzFdXG4gICAgICAgIF07XG4gICAgdmFyIG11bHQyID0gMiAvIF9ub3JtU3F1YXJlZCh2Mik7XG4gICAgdmFyIFEyID0gW1xuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdO1xuICAgIFEyWzVdID0gMSAtIG11bHQyICogdjJbMF0gKiB2MlswXTtcbiAgICBRMlsxMF0gPSAxIC0gbXVsdDIgKiB2MlsxXSAqIHYyWzFdO1xuICAgIFEyWzZdID0gLW11bHQyICogdjJbMF0gKiB2MlsxXTtcbiAgICBRMls5XSA9IFEyWzZdO1xuICAgIHZhciBRID0gVHJhbnNmb3JtLm11bHRpcGx5KFEyLCBRMSk7XG4gICAgdmFyIFIgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUSwgTSk7XG4gICAgdmFyIHJlbW92ZXIgPSBUcmFuc2Zvcm0uc2NhbGUoUlswXSA8IDAgPyAtMSA6IDEsIFJbNV0gPCAwID8gLTEgOiAxLCBSWzEwXSA8IDAgPyAtMSA6IDEpO1xuICAgIFIgPSBUcmFuc2Zvcm0ubXVsdGlwbHkoUiwgcmVtb3Zlcik7XG4gICAgUSA9IFRyYW5zZm9ybS5tdWx0aXBseShyZW1vdmVyLCBRKTtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgcmVzdWx0LnRyYW5zbGF0ZSA9IFRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoTSk7XG4gICAgcmVzdWx0LnJvdGF0ZSA9IFtcbiAgICAgICAgTWF0aC5hdGFuMigtUVs2XSwgUVsxMF0pLFxuICAgICAgICBNYXRoLmFzaW4oUVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoLVFbMV0sIFFbMF0pXG4gICAgXTtcbiAgICBpZiAoIXJlc3VsdC5yb3RhdGVbMF0pIHtcbiAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSA9IDA7XG4gICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gPSBNYXRoLmF0YW4yKFFbNF0sIFFbNV0pO1xuICAgIH1cbiAgICByZXN1bHQuc2NhbGUgPSBbXG4gICAgICAgIFJbMF0sXG4gICAgICAgIFJbNV0sXG4gICAgICAgIFJbMTBdXG4gICAgXTtcbiAgICByZXN1bHQuc2tldyA9IFtcbiAgICAgICAgTWF0aC5hdGFuMihSWzldLCByZXN1bHQuc2NhbGVbMl0pLFxuICAgICAgICBNYXRoLmF0YW4yKFJbOF0sIHJlc3VsdC5zY2FsZVsyXSksXG4gICAgICAgIE1hdGguYXRhbjIoUls0XSwgcmVzdWx0LnNjYWxlWzBdKVxuICAgIF07XG4gICAgaWYgKE1hdGguYWJzKHJlc3VsdC5yb3RhdGVbMF0pICsgTWF0aC5hYnMocmVzdWx0LnJvdGF0ZVsyXSkgPiAxLjUgKiBNYXRoLlBJKSB7XG4gICAgICAgIHJlc3VsdC5yb3RhdGVbMV0gPSBNYXRoLlBJIC0gcmVzdWx0LnJvdGF0ZVsxXTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMV0gPiBNYXRoLlBJKVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVsxXSAtPSAyICogTWF0aC5QSTtcbiAgICAgICAgaWYgKHJlc3VsdC5yb3RhdGVbMV0gPCAtTWF0aC5QSSlcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMV0gKz0gMiAqIE1hdGguUEk7XG4gICAgICAgIGlmIChyZXN1bHQucm90YXRlWzBdIDwgMClcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMF0gKz0gTWF0aC5QSTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmVzdWx0LnJvdGF0ZVswXSAtPSBNYXRoLlBJO1xuICAgICAgICBpZiAocmVzdWx0LnJvdGF0ZVsyXSA8IDApXG4gICAgICAgICAgICByZXN1bHQucm90YXRlWzJdICs9IE1hdGguUEk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJlc3VsdC5yb3RhdGVbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5UcmFuc2Zvcm0uYXZlcmFnZSA9IGZ1bmN0aW9uIGF2ZXJhZ2UoTTEsIE0yLCB0KSB7XG4gICAgdCA9IHQgPT09IHVuZGVmaW5lZCA/IDAuNSA6IHQ7XG4gICAgdmFyIHNwZWNNMSA9IFRyYW5zZm9ybS5pbnRlcnByZXQoTTEpO1xuICAgIHZhciBzcGVjTTIgPSBUcmFuc2Zvcm0uaW50ZXJwcmV0KE0yKTtcbiAgICB2YXIgc3BlY0F2ZyA9IHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcm90YXRlOiBbXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBzY2FsZTogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgc2tldzogW1xuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgc3BlY0F2Zy50cmFuc2xhdGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnRyYW5zbGF0ZVtpXSArIHQgKiBzcGVjTTIudHJhbnNsYXRlW2ldO1xuICAgICAgICBzcGVjQXZnLnJvdGF0ZVtpXSA9ICgxIC0gdCkgKiBzcGVjTTEucm90YXRlW2ldICsgdCAqIHNwZWNNMi5yb3RhdGVbaV07XG4gICAgICAgIHNwZWNBdmcuc2NhbGVbaV0gPSAoMSAtIHQpICogc3BlY00xLnNjYWxlW2ldICsgdCAqIHNwZWNNMi5zY2FsZVtpXTtcbiAgICAgICAgc3BlY0F2Zy5za2V3W2ldID0gKDEgLSB0KSAqIHNwZWNNMS5za2V3W2ldICsgdCAqIHNwZWNNMi5za2V3W2ldO1xuICAgIH1cbiAgICByZXR1cm4gVHJhbnNmb3JtLmJ1aWxkKHNwZWNBdmcpO1xufTtcblRyYW5zZm9ybS5idWlsZCA9IGZ1bmN0aW9uIGJ1aWxkKHNwZWMpIHtcbiAgICB2YXIgc2NhbGVNYXRyaXggPSBUcmFuc2Zvcm0uc2NhbGUoc3BlYy5zY2FsZVswXSwgc3BlYy5zY2FsZVsxXSwgc3BlYy5zY2FsZVsyXSk7XG4gICAgdmFyIHNrZXdNYXRyaXggPSBUcmFuc2Zvcm0uc2tldyhzcGVjLnNrZXdbMF0sIHNwZWMuc2tld1sxXSwgc3BlYy5za2V3WzJdKTtcbiAgICB2YXIgcm90YXRlTWF0cml4ID0gVHJhbnNmb3JtLnJvdGF0ZShzcGVjLnJvdGF0ZVswXSwgc3BlYy5yb3RhdGVbMV0sIHNwZWMucm90YXRlWzJdKTtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnRoZW5Nb3ZlKFRyYW5zZm9ybS5tdWx0aXBseShUcmFuc2Zvcm0ubXVsdGlwbHkocm90YXRlTWF0cml4LCBza2V3TWF0cml4KSwgc2NhbGVNYXRyaXgpLCBzcGVjLnRyYW5zbGF0ZSk7XG59O1xuVHJhbnNmb3JtLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuICFUcmFuc2Zvcm0ubm90RXF1YWxzKGEsIGIpO1xufTtcblRyYW5zZm9ybS5ub3RFcXVhbHMgPSBmdW5jdGlvbiBub3RFcXVhbHMoYSwgYikge1xuICAgIGlmIChhID09PSBiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuICEoYSAmJiBiKSB8fCBhWzEyXSAhPT0gYlsxMl0gfHwgYVsxM10gIT09IGJbMTNdIHx8IGFbMTRdICE9PSBiWzE0XSB8fCBhWzBdICE9PSBiWzBdIHx8IGFbMV0gIT09IGJbMV0gfHwgYVsyXSAhPT0gYlsyXSB8fCBhWzRdICE9PSBiWzRdIHx8IGFbNV0gIT09IGJbNV0gfHwgYVs2XSAhPT0gYls2XSB8fCBhWzhdICE9PSBiWzhdIHx8IGFbOV0gIT09IGJbOV0gfHwgYVsxMF0gIT09IGJbMTBdO1xufTtcblRyYW5zZm9ybS5ub3JtYWxpemVSb3RhdGlvbiA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVJvdGF0aW9uKHJvdGF0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHJvdGF0aW9uLnNsaWNlKDApO1xuICAgIGlmIChyZXN1bHRbMF0gPT09IE1hdGguUEkgKiAwLjUgfHwgcmVzdWx0WzBdID09PSAtTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSAtcmVzdWx0WzBdO1xuICAgICAgICByZXN1bHRbMV0gPSBNYXRoLlBJIC0gcmVzdWx0WzFdO1xuICAgICAgICByZXN1bHRbMl0gLT0gTWF0aC5QSTtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFswXSA+IE1hdGguUEkgKiAwLjUpIHtcbiAgICAgICAgcmVzdWx0WzBdID0gcmVzdWx0WzBdIC0gTWF0aC5QSTtcbiAgICAgICAgcmVzdWx0WzFdID0gTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIGlmIChyZXN1bHRbMF0gPCAtTWF0aC5QSSAqIDAuNSkge1xuICAgICAgICByZXN1bHRbMF0gPSByZXN1bHRbMF0gKyBNYXRoLlBJO1xuICAgICAgICByZXN1bHRbMV0gPSAtTWF0aC5QSSAtIHJlc3VsdFsxXTtcbiAgICAgICAgcmVzdWx0WzJdIC09IE1hdGguUEk7XG4gICAgfVxuICAgIHdoaWxlIChyZXN1bHRbMV0gPCAtTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzFdICs9IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMV0gPj0gTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzFdIC09IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMl0gPCAtTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzJdICs9IDIgKiBNYXRoLlBJO1xuICAgIHdoaWxlIChyZXN1bHRbMl0gPj0gTWF0aC5QSSlcbiAgICAgICAgcmVzdWx0WzJdIC09IDIgKiBNYXRoLlBJO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuVHJhbnNmb3JtLmluRnJvbnQgPSBbXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAuMDAxLFxuICAgIDFcbl07XG5UcmFuc2Zvcm0uYmVoaW5kID0gW1xuICAgIDEsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxLFxuICAgIDAsXG4gICAgMCxcbiAgICAwLFxuICAgIDAsXG4gICAgMSxcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAtMC4wMDEsXG4gICAgMVxuXTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNmb3JtOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi9PcHRpb25zTWFuYWdlcicpO1xudmFyIFJlbmRlck5vZGUgPSByZXF1aXJlKCcuL1JlbmRlck5vZGUnKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG5mdW5jdGlvbiBWaWV3KG9wdGlvbnMpIHtcbiAgICB0aGlzLl9ub2RlID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMub3B0aW9ucyA9IFV0aWxpdHkuY2xvbmUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMgfHwgVmlldy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn1cblZpZXcuREVGQVVMVF9PUFRJT05TID0ge307XG5WaWV3LnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIudmFsdWUoKTtcbn07XG5WaWV3LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIucGF0Y2gob3B0aW9ucyk7XG59O1xuVmlldy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gYWRkKCkge1xuICAgIHJldHVybiB0aGlzLl9ub2RlLmFkZC5hcHBseSh0aGlzLl9ub2RlLCBhcmd1bWVudHMpO1xufTtcblZpZXcucHJvdG90eXBlLl9hZGQgPSBWaWV3LnByb3RvdHlwZS5hZGQ7XG5WaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGUucmVuZGVyKCk7XG59O1xuVmlldy5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgaWYgKHRoaXMuX25vZGUgJiYgdGhpcy5fbm9kZS5nZXRTaXplKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlLmdldFNpemUuYXBwbHkodGhpcy5fbm9kZSwgYXJndW1lbnRzKSB8fCB0aGlzLm9wdGlvbnMuc2l6ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zaXplO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVmlldzsiLCJmdW5jdGlvbiBWaWV3U2VxdWVuY2Uob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgb3B0aW9ucyA9IFtdO1xuICAgIGlmIChvcHRpb25zIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIG9wdGlvbnMgPSB7IGFycmF5OiBvcHRpb25zIH07XG4gICAgdGhpcy5fID0gbnVsbDtcbiAgICB0aGlzLmluZGV4ID0gb3B0aW9ucy5pbmRleCB8fCAwO1xuICAgIGlmIChvcHRpb25zLmFycmF5KVxuICAgICAgICB0aGlzLl8gPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5CYWNraW5nKG9wdGlvbnMuYXJyYXkpO1xuICAgIGVsc2UgaWYgKG9wdGlvbnMuXylcbiAgICAgICAgdGhpcy5fID0gb3B0aW9ucy5fO1xuICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleClcbiAgICAgICAgdGhpcy5fLmZpcnN0Tm9kZSA9IHRoaXM7XG4gICAgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4ICsgdGhpcy5fLmFycmF5Lmxlbmd0aCAtIDEpXG4gICAgICAgIHRoaXMuXy5sYXN0Tm9kZSA9IHRoaXM7XG4gICAgaWYgKG9wdGlvbnMubG9vcCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLl8ubG9vcCA9IG9wdGlvbnMubG9vcDtcbiAgICB0aGlzLl9wcmV2aW91c05vZGUgPSBudWxsO1xuICAgIHRoaXMuX25leHROb2RlID0gbnVsbDtcbn1cblZpZXdTZXF1ZW5jZS5CYWNraW5nID0gZnVuY3Rpb24gQmFja2luZyhhcnJheSkge1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbiAgICB0aGlzLmZpcnN0SW5kZXggPSAwO1xuICAgIHRoaXMubG9vcCA9IGZhbHNlO1xuICAgIHRoaXMuZmlyc3ROb2RlID0gbnVsbDtcbiAgICB0aGlzLmxhc3ROb2RlID0gbnVsbDtcbn07XG5WaWV3U2VxdWVuY2UuQmFja2luZy5wcm90b3R5cGUuZ2V0VmFsdWUgPSBmdW5jdGlvbiBnZXRWYWx1ZShpKSB7XG4gICAgdmFyIF9pID0gaSAtIHRoaXMuZmlyc3RJbmRleDtcbiAgICBpZiAoX2kgPCAwIHx8IF9pID49IHRoaXMuYXJyYXkubGVuZ3RoKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gdGhpcy5hcnJheVtfaV07XG59O1xuVmlld1NlcXVlbmNlLkJhY2tpbmcucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gc2V0VmFsdWUoaSwgdmFsdWUpIHtcbiAgICB0aGlzLmFycmF5W2kgLSB0aGlzLmZpcnN0SW5kZXhdID0gdmFsdWU7XG59O1xuVmlld1NlcXVlbmNlLkJhY2tpbmcucHJvdG90eXBlLnJlaW5kZXggPSBmdW5jdGlvbiByZWluZGV4KHN0YXJ0LCByZW1vdmVDb3VudCwgaW5zZXJ0Q291bnQpIHtcbiAgICBpZiAoIXRoaXMuYXJyYXlbMF0pXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5maXJzdEluZGV4O1xuICAgIHZhciBpbmRleFNoaWZ0QW1vdW50ID0gaW5zZXJ0Q291bnQgLSByZW1vdmVDb3VudDtcbiAgICB2YXIgbm9kZSA9IHRoaXMuZmlyc3ROb2RlO1xuICAgIHdoaWxlIChpbmRleCA8IHN0YXJ0IC0gMSkge1xuICAgICAgICBub2RlID0gbm9kZS5nZXROZXh0KCk7XG4gICAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIHZhciBzcGxpY2VTdGFydE5vZGUgPSBub2RlO1xuICAgIGZvciAoaSA9IDA7IGkgPCByZW1vdmVDb3VudDsgaSsrKSB7XG4gICAgICAgIG5vZGUgPSBub2RlLmdldE5leHQoKTtcbiAgICAgICAgaWYgKG5vZGUpXG4gICAgICAgICAgICBub2RlLl9wcmV2aW91c05vZGUgPSBzcGxpY2VTdGFydE5vZGU7XG4gICAgfVxuICAgIHZhciBzcGxpY2VSZXN1bWVOb2RlID0gbm9kZSA/IG5vZGUuZ2V0TmV4dCgpIDogbnVsbDtcbiAgICBzcGxpY2VTdGFydE5vZGUuX25leHROb2RlID0gbnVsbDtcbiAgICBub2RlID0gc3BsaWNlU3RhcnROb2RlO1xuICAgIGZvciAoaSA9IDA7IGkgPCBpbnNlcnRDb3VudDsgaSsrKVxuICAgICAgICBub2RlID0gbm9kZS5nZXROZXh0KCk7XG4gICAgaW5kZXggKz0gaW5zZXJ0Q291bnQ7XG4gICAgaWYgKG5vZGUgIT09IHNwbGljZVJlc3VtZU5vZGUpIHtcbiAgICAgICAgbm9kZS5fbmV4dE5vZGUgPSBzcGxpY2VSZXN1bWVOb2RlO1xuICAgICAgICBpZiAoc3BsaWNlUmVzdW1lTm9kZSlcbiAgICAgICAgICAgIHNwbGljZVJlc3VtZU5vZGUuX3ByZXZpb3VzTm9kZSA9IG5vZGU7XG4gICAgfVxuICAgIGlmIChzcGxpY2VSZXN1bWVOb2RlKSB7XG4gICAgICAgIG5vZGUgPSBzcGxpY2VSZXN1bWVOb2RlO1xuICAgICAgICBpbmRleCsrO1xuICAgICAgICB3aGlsZSAobm9kZSAmJiBpbmRleCA8IHRoaXMuYXJyYXkubGVuZ3RoICsgdGhpcy5maXJzdEluZGV4KSB7XG4gICAgICAgICAgICBpZiAobm9kZS5fbmV4dE5vZGUpXG4gICAgICAgICAgICAgICAgbm9kZS5pbmRleCArPSBpbmRleFNoaWZ0QW1vdW50O1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIG5vZGUuaW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmdldE5leHQoKTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5nZXRQcmV2aW91cyA9IGZ1bmN0aW9uIGdldFByZXZpb3VzKCkge1xuICAgIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleCkge1xuICAgICAgICBpZiAodGhpcy5fLmxvb3ApIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZSA9IHRoaXMuXy5sYXN0Tm9kZSB8fCBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICAgICAgXzogdGhpcy5fLFxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLl8uZmlyc3RJbmRleCArIHRoaXMuXy5hcnJheS5sZW5ndGggLSAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZS5fbmV4dE5vZGUgPSB0aGlzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcHJldmlvdXNOb2RlID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX3ByZXZpb3VzTm9kZSkge1xuICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7XG4gICAgICAgICAgICBfOiB0aGlzLl8sXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleCAtIDFcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3ByZXZpb3VzTm9kZS5fbmV4dE5vZGUgPSB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcHJldmlvdXNOb2RlO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuZ2V0TmV4dCA9IGZ1bmN0aW9uIGdldE5leHQoKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4ICsgdGhpcy5fLmFycmF5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgaWYgKHRoaXMuXy5sb29wKSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0Tm9kZSA9IHRoaXMuXy5maXJzdE5vZGUgfHwgbmV3IHRoaXMuY29uc3RydWN0b3Ioe1xuICAgICAgICAgICAgICAgIF86IHRoaXMuXyxcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5fLmZpcnN0SW5kZXhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fbmV4dE5vZGUuX3ByZXZpb3VzTm9kZSA9IHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9uZXh0Tm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9uZXh0Tm9kZSkge1xuICAgICAgICB0aGlzLl9uZXh0Tm9kZSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHtcbiAgICAgICAgICAgIF86IHRoaXMuXyxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4ICsgMVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbmV4dE5vZGUuX3ByZXZpb3VzTm9kZSA9IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9uZXh0Tm9kZTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLmdldEluZGV4ID0gZnVuY3Rpb24gZ2V0SW5kZXgoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXg7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiAnJyArIHRoaXMuaW5kZXg7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS51bnNoaWZ0ID0gZnVuY3Rpb24gdW5zaGlmdCh2YWx1ZSkge1xuICAgIHRoaXMuXy5hcnJheS51bnNoaWZ0LmFwcGx5KHRoaXMuXy5hcnJheSwgYXJndW1lbnRzKTtcbiAgICB0aGlzLl8uZmlyc3RJbmRleCAtPSBhcmd1bWVudHMubGVuZ3RoO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2godmFsdWUpIHtcbiAgICB0aGlzLl8uYXJyYXkucHVzaC5hcHBseSh0aGlzLl8uYXJyYXksIGFyZ3VtZW50cyk7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5zcGxpY2UgPSBmdW5jdGlvbiBzcGxpY2UoaW5kZXgsIGhvd01hbnkpIHtcbiAgICB2YXIgdmFsdWVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgICB0aGlzLl8uYXJyYXkuc3BsaWNlLmFwcGx5KHRoaXMuXy5hcnJheSwgW1xuICAgICAgICBpbmRleCAtIHRoaXMuXy5maXJzdEluZGV4LFxuICAgICAgICBob3dNYW55XG4gICAgXS5jb25jYXQodmFsdWVzKSk7XG4gICAgdGhpcy5fLnJlaW5kZXgoaW5kZXgsIGhvd01hbnksIHZhbHVlcy5sZW5ndGgpO1xufTtcblZpZXdTZXF1ZW5jZS5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIHN3YXAob3RoZXIpIHtcbiAgICB2YXIgb3RoZXJWYWx1ZSA9IG90aGVyLmdldCgpO1xuICAgIHZhciBteVZhbHVlID0gdGhpcy5nZXQoKTtcbiAgICB0aGlzLl8uc2V0VmFsdWUodGhpcy5pbmRleCwgb3RoZXJWYWx1ZSk7XG4gICAgdGhpcy5fLnNldFZhbHVlKG90aGVyLmluZGV4LCBteVZhbHVlKTtcbiAgICB2YXIgbXlQcmV2aW91cyA9IHRoaXMuX3ByZXZpb3VzTm9kZTtcbiAgICB2YXIgbXlOZXh0ID0gdGhpcy5fbmV4dE5vZGU7XG4gICAgdmFyIG15SW5kZXggPSB0aGlzLmluZGV4O1xuICAgIHZhciBvdGhlclByZXZpb3VzID0gb3RoZXIuX3ByZXZpb3VzTm9kZTtcbiAgICB2YXIgb3RoZXJOZXh0ID0gb3RoZXIuX25leHROb2RlO1xuICAgIHZhciBvdGhlckluZGV4ID0gb3RoZXIuaW5kZXg7XG4gICAgdGhpcy5pbmRleCA9IG90aGVySW5kZXg7XG4gICAgdGhpcy5fcHJldmlvdXNOb2RlID0gb3RoZXJQcmV2aW91cyA9PT0gdGhpcyA/IG90aGVyIDogb3RoZXJQcmV2aW91cztcbiAgICBpZiAodGhpcy5fcHJldmlvdXNOb2RlKVxuICAgICAgICB0aGlzLl9wcmV2aW91c05vZGUuX25leHROb2RlID0gdGhpcztcbiAgICB0aGlzLl9uZXh0Tm9kZSA9IG90aGVyTmV4dCA9PT0gdGhpcyA/IG90aGVyIDogb3RoZXJOZXh0O1xuICAgIGlmICh0aGlzLl9uZXh0Tm9kZSlcbiAgICAgICAgdGhpcy5fbmV4dE5vZGUuX3ByZXZpb3VzTm9kZSA9IHRoaXM7XG4gICAgb3RoZXIuaW5kZXggPSBteUluZGV4O1xuICAgIG90aGVyLl9wcmV2aW91c05vZGUgPSBteVByZXZpb3VzID09PSBvdGhlciA/IHRoaXMgOiBteVByZXZpb3VzO1xuICAgIGlmIChvdGhlci5fcHJldmlvdXNOb2RlKVxuICAgICAgICBvdGhlci5fcHJldmlvdXNOb2RlLl9uZXh0Tm9kZSA9IG90aGVyO1xuICAgIG90aGVyLl9uZXh0Tm9kZSA9IG15TmV4dCA9PT0gb3RoZXIgPyB0aGlzIDogbXlOZXh0O1xuICAgIGlmIChvdGhlci5fbmV4dE5vZGUpXG4gICAgICAgIG90aGVyLl9uZXh0Tm9kZS5fcHJldmlvdXNOb2RlID0gb3RoZXI7XG4gICAgaWYgKHRoaXMuaW5kZXggPT09IHRoaXMuXy5maXJzdEluZGV4KVxuICAgICAgICB0aGlzLl8uZmlyc3ROb2RlID0gdGhpcztcbiAgICBlbHNlIGlmICh0aGlzLmluZGV4ID09PSB0aGlzLl8uZmlyc3RJbmRleCArIHRoaXMuXy5hcnJheS5sZW5ndGggLSAxKVxuICAgICAgICB0aGlzLl8ubGFzdE5vZGUgPSB0aGlzO1xuICAgIGlmIChvdGhlci5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXgpXG4gICAgICAgIHRoaXMuXy5maXJzdE5vZGUgPSBvdGhlcjtcbiAgICBlbHNlIGlmIChvdGhlci5pbmRleCA9PT0gdGhpcy5fLmZpcnN0SW5kZXggKyB0aGlzLl8uYXJyYXkubGVuZ3RoIC0gMSlcbiAgICAgICAgdGhpcy5fLmxhc3ROb2RlID0gb3RoZXI7XG59O1xuVmlld1NlcXVlbmNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuXy5nZXRWYWx1ZSh0aGlzLmluZGV4KTtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzLmdldCgpO1xuICAgIHJldHVybiB0YXJnZXQgPyB0YXJnZXQuZ2V0U2l6ZSgpIDogbnVsbDtcbn07XG5WaWV3U2VxdWVuY2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5nZXQoKTtcbiAgICByZXR1cm4gdGFyZ2V0ID8gdGFyZ2V0LnJlbmRlci5hcHBseSh0YXJnZXQsIGFyZ3VtZW50cykgOiBudWxsO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVmlld1NlcXVlbmNlOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIEV2ZW50QXJiaXRlcihzdGFydE1vZGUpIHtcbiAgICB0aGlzLmRpc3BhdGNoZXJzID0ge307XG4gICAgdGhpcy5jdXJyTW9kZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNldE1vZGUoc3RhcnRNb2RlKTtcbn1cbkV2ZW50QXJiaXRlci5wcm90b3R5cGUuc2V0TW9kZSA9IGZ1bmN0aW9uIHNldE1vZGUobW9kZSkge1xuICAgIGlmIChtb2RlICE9PSB0aGlzLmN1cnJNb2RlKSB7XG4gICAgICAgIHZhciBzdGFydE1vZGUgPSB0aGlzLmN1cnJNb2RlO1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVyc1t0aGlzLmN1cnJNb2RlXSlcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hlcnNbdGhpcy5jdXJyTW9kZV0udHJpZ2dlcigndW5waXBlJyk7XG4gICAgICAgIHRoaXMuY3Vyck1vZGUgPSBtb2RlO1xuICAgICAgICBpZiAodGhpcy5kaXNwYXRjaGVyc1ttb2RlXSlcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hlcnNbbW9kZV0uZW1pdCgncGlwZScpO1xuICAgICAgICB0aGlzLmVtaXQoJ2NoYW5nZScsIHtcbiAgICAgICAgICAgIGZyb206IHN0YXJ0TW9kZSxcbiAgICAgICAgICAgIHRvOiBtb2RlXG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5FdmVudEFyYml0ZXIucHJvdG90eXBlLmZvck1vZGUgPSBmdW5jdGlvbiBmb3JNb2RlKG1vZGUpIHtcbiAgICBpZiAoIXRoaXMuZGlzcGF0Y2hlcnNbbW9kZV0pXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlcnNbbW9kZV0gPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlcnNbbW9kZV07XG59O1xuRXZlbnRBcmJpdGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudFR5cGUsIGV2ZW50KSB7XG4gICAgaWYgKHRoaXMuY3Vyck1vZGUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghZXZlbnQpXG4gICAgICAgIGV2ZW50ID0ge307XG4gICAgdmFyIGRpc3BhdGNoZXIgPSB0aGlzLmRpc3BhdGNoZXJzW3RoaXMuY3Vyck1vZGVdO1xuICAgIGlmIChkaXNwYXRjaGVyKVxuICAgICAgICByZXR1cm4gZGlzcGF0Y2hlci50cmlnZ2VyKGV2ZW50VHlwZSwgZXZlbnQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRBcmJpdGVyOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIEV2ZW50RmlsdGVyKGNvbmRpdGlvbikge1xuICAgIEV2ZW50SGFuZGxlci5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX2NvbmRpdGlvbiA9IGNvbmRpdGlvbjtcbn1cbkV2ZW50RmlsdGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRIYW5kbGVyLnByb3RvdHlwZSk7XG5FdmVudEZpbHRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFdmVudEZpbHRlcjtcbkV2ZW50RmlsdGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgaWYgKHRoaXMuX2NvbmRpdGlvbih0eXBlLCBkYXRhKSlcbiAgICAgICAgcmV0dXJuIEV2ZW50SGFuZGxlci5wcm90b3R5cGUuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbkV2ZW50RmlsdGVyLnByb3RvdHlwZS50cmlnZ2VyID0gRXZlbnRGaWx0ZXIucHJvdG90eXBlLmVtaXQ7XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RmlsdGVyOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIEV2ZW50TWFwcGVyKG1hcHBpbmdGdW5jdGlvbikge1xuICAgIEV2ZW50SGFuZGxlci5jYWxsKHRoaXMpO1xuICAgIHRoaXMuX21hcHBpbmdGdW5jdGlvbiA9IG1hcHBpbmdGdW5jdGlvbjtcbn1cbkV2ZW50TWFwcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRXZlbnRIYW5kbGVyLnByb3RvdHlwZSk7XG5FdmVudE1hcHBlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBFdmVudE1hcHBlcjtcbkV2ZW50TWFwcGVyLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBudWxsO1xuRXZlbnRNYXBwZXIucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gbnVsbDtcbkV2ZW50TWFwcGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgdmFyIHRhcmdldCA9IHRoaXMuX21hcHBpbmdGdW5jdGlvbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmVtaXQgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGFyZ2V0LmVtaXQodHlwZSwgZGF0YSk7XG59O1xuRXZlbnRNYXBwZXIucHJvdG90eXBlLnRyaWdnZXIgPSBFdmVudE1hcHBlci5wcm90b3R5cGUuZW1pdDtcbm1vZHVsZS5leHBvcnRzID0gRXZlbnRNYXBwZXI7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG5mdW5jdGlvbiBBY2N1bXVsYXRvcih2YWx1ZSwgZXZlbnROYW1lKSB7XG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBldmVudE5hbWUgPSAndXBkYXRlJztcbiAgICB0aGlzLl9zdGF0ZSA9IHZhbHVlICYmIHZhbHVlLmdldCAmJiB2YWx1ZS5zZXQgPyB2YWx1ZSA6IG5ldyBUcmFuc2l0aW9uYWJsZSh2YWx1ZSB8fCAwKTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbihldmVudE5hbWUsIF9oYW5kbGVVcGRhdGUuYmluZCh0aGlzKSk7XG59XG5mdW5jdGlvbiBfaGFuZGxlVXBkYXRlKGRhdGEpIHtcbiAgICB2YXIgZGVsdGEgPSBkYXRhLmRlbHRhO1xuICAgIHZhciBzdGF0ZSA9IHRoaXMuZ2V0KCk7XG4gICAgaWYgKGRlbHRhLmNvbnN0cnVjdG9yID09PSBzdGF0ZS5jb25zdHJ1Y3Rvcikge1xuICAgICAgICB2YXIgbmV3U3RhdGUgPSBkZWx0YSBpbnN0YW5jZW9mIEFycmF5ID8gW1xuICAgICAgICAgICAgICAgIHN0YXRlWzBdICsgZGVsdGFbMF0sXG4gICAgICAgICAgICAgICAgc3RhdGVbMV0gKyBkZWx0YVsxXVxuICAgICAgICAgICAgXSA6IHN0YXRlICsgZGVsdGE7XG4gICAgICAgIHRoaXMuc2V0KG5ld1N0YXRlKTtcbiAgICB9XG59XG5BY2N1bXVsYXRvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5nZXQoKTtcbn07XG5BY2N1bXVsYXRvci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgdGhpcy5fc3RhdGUuc2V0KHZhbHVlKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEFjY3VtdWxhdG9yOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF3aW5kb3cuQ3VzdG9tRXZlbnQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgY2xpY2tUaHJlc2hvbGQgPSAzMDA7XG4gICAgdmFyIGNsaWNrV2luZG93ID0gNTAwO1xuICAgIHZhciBwb3RlbnRpYWxDbGlja3MgPSB7fTtcbiAgICB2YXIgcmVjZW50bHlEaXNwYXRjaGVkID0ge307XG4gICAgdmFyIF9ub3cgPSBEYXRlLm5vdztcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgdGltZXN0YW1wID0gX25vdygpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgICAgIHBvdGVudGlhbENsaWNrc1t0b3VjaC5pZGVudGlmaWVyXSA9IHRpbWVzdGFtcDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgICAgICBkZWxldGUgcG90ZW50aWFsQ2xpY2tzW3RvdWNoLmlkZW50aWZpZXJdO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBjdXJyVGltZSA9IF9ub3coKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgICAgICB2YXIgc3RhcnRUaW1lID0gcG90ZW50aWFsQ2xpY2tzW3RvdWNoLmlkZW50aWZpZXJdO1xuICAgICAgICAgICAgaWYgKHN0YXJ0VGltZSAmJiBjdXJyVGltZSAtIHN0YXJ0VGltZSA8IGNsaWNrVGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsaWNrRXZ0ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudCgnY2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnYnViYmxlcyc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGV0YWlsJzogdG91Y2hcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmVjZW50bHlEaXNwYXRjaGVkW2N1cnJUaW1lXSA9IGV2ZW50O1xuICAgICAgICAgICAgICAgIGV2ZW50LnRhcmdldC5kaXNwYXRjaEV2ZW50KGNsaWNrRXZ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBwb3RlbnRpYWxDbGlja3NbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gX25vdygpO1xuICAgICAgICBmb3IgKHZhciBpIGluIHJlY2VudGx5RGlzcGF0Y2hlZCkge1xuICAgICAgICAgICAgdmFyIHByZXZpb3VzRXZlbnQgPSByZWNlbnRseURpc3BhdGNoZWRbaV07XG4gICAgICAgICAgICBpZiAoY3VyclRpbWUgLSBpIDwgY2xpY2tXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuTW91c2VFdmVudCAmJiBldmVudC50YXJnZXQgPT09IHByZXZpb3VzRXZlbnQudGFyZ2V0KVxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgICAgIGRlbGV0ZSByZWNlbnRseURpc3BhdGNoZWRbaV07XG4gICAgICAgIH1cbiAgICB9LCB0cnVlKTtcbn0oKSk7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBHZW5lcmljU3luYyhzeW5jcywgb3B0aW9ucykge1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5fc3luY3MgPSB7fTtcbiAgICBpZiAoc3luY3MpXG4gICAgICAgIHRoaXMuYWRkU3luYyhzeW5jcyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn1cbkdlbmVyaWNTeW5jLkRJUkVDVElPTl9YID0gMDtcbkdlbmVyaWNTeW5jLkRJUkVDVElPTl9ZID0gMTtcbkdlbmVyaWNTeW5jLkRJUkVDVElPTl9aID0gMjtcbnZhciByZWdpc3RyeSA9IHt9O1xuR2VuZXJpY1N5bmMucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlcihzeW5jT2JqZWN0KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHN5bmNPYmplY3QpIHtcbiAgICAgICAgaWYgKHJlZ2lzdHJ5W2tleV0pIHtcbiAgICAgICAgICAgIGlmIChyZWdpc3RyeVtrZXldID09PSBzeW5jT2JqZWN0W2tleV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndGhpcyBrZXkgaXMgcmVnaXN0ZXJlZCB0byBhIGRpZmZlcmVudCBzeW5jIGNsYXNzJyk7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmVnaXN0cnlba2V5XSA9IHN5bmNPYmplY3Rba2V5XTtcbiAgICB9XG59O1xuR2VuZXJpY1N5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLl9zeW5jcykge1xuICAgICAgICB0aGlzLl9zeW5jc1trZXldLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxufTtcbkdlbmVyaWNTeW5jLnByb3RvdHlwZS5waXBlU3luYyA9IGZ1bmN0aW9uIHBpcGVUb1N5bmMoa2V5KSB7XG4gICAgdmFyIHN5bmMgPSB0aGlzLl9zeW5jc1trZXldO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQucGlwZShzeW5jKTtcbiAgICBzeW5jLnBpcGUodGhpcy5fZXZlbnRPdXRwdXQpO1xufTtcbkdlbmVyaWNTeW5jLnByb3RvdHlwZS51bnBpcGVTeW5jID0gZnVuY3Rpb24gdW5waXBlRnJvbVN5bmMoa2V5KSB7XG4gICAgdmFyIHN5bmMgPSB0aGlzLl9zeW5jc1trZXldO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQudW5waXBlKHN5bmMpO1xuICAgIHN5bmMudW5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbn07XG5mdW5jdGlvbiBfYWRkU2luZ2xlU3luYyhrZXksIG9wdGlvbnMpIHtcbiAgICBpZiAoIXJlZ2lzdHJ5W2tleV0pXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9zeW5jc1trZXldID0gbmV3IHJlZ2lzdHJ5W2tleV0ob3B0aW9ucyk7XG4gICAgdGhpcy5waXBlU3luYyhrZXkpO1xufVxuR2VuZXJpY1N5bmMucHJvdG90eXBlLmFkZFN5bmMgPSBmdW5jdGlvbiBhZGRTeW5jKHN5bmNzKSB7XG4gICAgaWYgKHN5bmNzIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3luY3MubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBfYWRkU2luZ2xlU3luYy5jYWxsKHRoaXMsIHN5bmNzW2ldKTtcbiAgICBlbHNlIGlmIChzeW5jcyBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHN5bmNzKVxuICAgICAgICAgICAgX2FkZFNpbmdsZVN5bmMuY2FsbCh0aGlzLCBrZXksIHN5bmNzW2tleV0pO1xufTtcbm1vZHVsZS5leHBvcnRzID0gR2VuZXJpY1N5bmM7IiwidmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJy4uL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBNb3VzZVN5bmMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoTW91c2VTeW5jLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2Vkb3duJywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNlbW92ZScsIF9oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ21vdXNldXAnLCBfaGFuZGxlRW5kLmJpbmQodGhpcykpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJvcG9nYXRlKVxuICAgICAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdtb3VzZWxlYXZlJywgX2hhbmRsZUxlYXZlLmJpbmQodGhpcykpO1xuICAgIGVsc2VcbiAgICAgICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2VsZWF2ZScsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fcGF5bG9hZCA9IHtcbiAgICAgICAgZGVsdGE6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICB2ZWxvY2l0eTogbnVsbCxcbiAgICAgICAgY2xpZW50WDogMCxcbiAgICAgICAgY2xpZW50WTogMCxcbiAgICAgICAgb2Zmc2V0WDogMCxcbiAgICAgICAgb2Zmc2V0WTogMFxuICAgIH07XG4gICAgdGhpcy5fcG9zaXRpb24gPSBudWxsO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmV2VGltZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9kb3duID0gZmFsc2U7XG4gICAgdGhpcy5fbW92ZWQgPSBmYWxzZTtcbn1cbk1vdXNlU3luYy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGlyZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgcmFpbHM6IGZhbHNlLFxuICAgIHNjYWxlOiAxLFxuICAgIHByb3BvZ2F0ZTogdHJ1ZSxcbiAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxufTtcbk1vdXNlU3luYy5ESVJFQ1RJT05fWCA9IDA7XG5Nb3VzZVN5bmMuRElSRUNUSU9OX1kgPSAxO1xudmFyIE1JTklNVU1fVElDS19USU1FID0gODtcbnZhciBfbm93ID0gRGF0ZS5ub3c7XG5mdW5jdGlvbiBfaGFuZGxlU3RhcnQoZXZlbnQpIHtcbiAgICB2YXIgZGVsdGE7XG4gICAgdmFyIHZlbG9jaXR5O1xuICAgIGlmICh0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHQpXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHggPSBldmVudC5jbGllbnRYO1xuICAgIHZhciB5ID0gZXZlbnQuY2xpZW50WTtcbiAgICB0aGlzLl9wcmV2Q29vcmQgPSBbXG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICBdO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gX25vdygpO1xuICAgIHRoaXMuX2Rvd24gPSB0cnVlO1xuICAgIHRoaXMuX21vdmUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgZGVsdGEgPSAwO1xuICAgICAgICB2ZWxvY2l0eSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICBkZWx0YSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgICAgIHZlbG9jaXR5ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICB9XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgIHBheWxvYWQuZGVsdGEgPSBkZWx0YTtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIHBheWxvYWQuY2xpZW50WCA9IHg7XG4gICAgcGF5bG9hZC5jbGllbnRZID0geTtcbiAgICBwYXlsb2FkLm9mZnNldFggPSBldmVudC5vZmZzZXRYO1xuICAgIHBheWxvYWQub2Zmc2V0WSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCBwYXlsb2FkKTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9wcmV2Q29vcmQpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgcHJldkNvb3JkID0gdGhpcy5fcHJldkNvb3JkO1xuICAgIHZhciBwcmV2VGltZSA9IHRoaXMuX3ByZXZUaW1lO1xuICAgIHZhciB4ID0gZXZlbnQuY2xpZW50WDtcbiAgICB2YXIgeSA9IGV2ZW50LmNsaWVudFk7XG4gICAgdmFyIGN1cnJUaW1lID0gX25vdygpO1xuICAgIHZhciBkaWZmWCA9IHggLSBwcmV2Q29vcmRbMF07XG4gICAgdmFyIGRpZmZZID0geSAtIHByZXZDb29yZFsxXTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJhaWxzKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpXG4gICAgICAgICAgICBkaWZmWSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpZmZYID0gMDtcbiAgICB9XG4gICAgdmFyIGRpZmZUaW1lID0gTWF0aC5tYXgoY3VyclRpbWUgLSBwcmV2VGltZSwgTUlOSU1VTV9USUNLX1RJTUUpO1xuICAgIHZhciB2ZWxYID0gZGlmZlggLyBkaWZmVGltZTtcbiAgICB2YXIgdmVsWSA9IGRpZmZZIC8gZGlmZlRpbWU7XG4gICAgdmFyIHNjYWxlID0gdGhpcy5vcHRpb25zLnNjYWxlO1xuICAgIHZhciBuZXh0VmVsO1xuICAgIHZhciBuZXh0RGVsdGE7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IE1vdXNlU3luYy5ESVJFQ1RJT05fWCkge1xuICAgICAgICBuZXh0RGVsdGEgPSBzY2FsZSAqIGRpZmZYO1xuICAgICAgICBuZXh0VmVsID0gc2NhbGUgKiB2ZWxYO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiArPSBuZXh0RGVsdGE7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBNb3VzZVN5bmMuRElSRUNUSU9OX1kpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWTtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogdmVsWTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHREZWx0YSA9IFtcbiAgICAgICAgICAgIHNjYWxlICogZGlmZlgsXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZZXG4gICAgICAgIF07XG4gICAgICAgIG5leHRWZWwgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFgsXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFlcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMF0gKz0gbmV4dERlbHRhWzBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblsxXSArPSBuZXh0RGVsdGFbMV07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gbmV4dERlbHRhO1xuICAgIHBheWxvYWQucG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICBwYXlsb2FkLnZlbG9jaXR5ID0gbmV4dFZlbDtcbiAgICBwYXlsb2FkLmNsaWVudFggPSB4O1xuICAgIHBheWxvYWQuY2xpZW50WSA9IHk7XG4gICAgcGF5bG9hZC5vZmZzZXRYID0gZXZlbnQub2Zmc2V0WDtcbiAgICBwYXlsb2FkLm9mZnNldFkgPSBldmVudC5vZmZzZXRZO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3VwZGF0ZScsIHBheWxvYWQpO1xuICAgIHRoaXMuX3ByZXZDb29yZCA9IFtcbiAgICAgICAgeCxcbiAgICAgICAgeVxuICAgIF07XG4gICAgdGhpcy5fcHJldlRpbWUgPSBjdXJyVGltZTtcbiAgICB0aGlzLl9tb3ZlID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVFbmQoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2Rvd24pXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdlbmQnLCB0aGlzLl9wYXlsb2FkKTtcbiAgICB0aGlzLl9wcmV2Q29vcmQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJldlRpbWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZG93biA9IGZhbHNlO1xuICAgIHRoaXMuX21vdmUgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVMZWF2ZShldmVudCkge1xuICAgIGlmICghdGhpcy5fZG93biB8fCAhdGhpcy5fbW92ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBib3VuZE1vdmUgPSBfaGFuZGxlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHZhciBib3VuZEVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgX2hhbmRsZUVuZC5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGJvdW5kTW92ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYm91bmRFbmQpO1xuICAgICAgICB9LmJpbmQodGhpcywgZXZlbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGJvdW5kTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGJvdW5kRW5kKTtcbn1cbk1vdXNlU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5Nb3VzZVN5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE1vdXNlU3luYzsiLCJ2YXIgVHdvRmluZ2VyU3luYyA9IHJlcXVpcmUoJy4vVHdvRmluZ2VyU3luYycpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gUGluY2hTeW5jKG9wdGlvbnMpIHtcbiAgICBUd29GaW5nZXJTeW5jLmNhbGwodGhpcyk7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShQaW5jaFN5bmMuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fZGlzcGxhY2VtZW50ID0gMDtcbiAgICB0aGlzLl9wcmV2aW91c0Rpc3RhbmNlID0gMDtcbn1cblBpbmNoU3luYy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFR3b0ZpbmdlclN5bmMucHJvdG90eXBlKTtcblBpbmNoU3luYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBQaW5jaFN5bmM7XG5QaW5jaFN5bmMuREVGQVVMVF9PUFRJT05TID0geyBzY2FsZTogMSB9O1xuUGluY2hTeW5jLnByb3RvdHlwZS5fc3RhcnRVcGRhdGUgPSBmdW5jdGlvbiBfc3RhcnRVcGRhdGUoZXZlbnQpIHtcbiAgICB0aGlzLl9wcmV2aW91c0Rpc3RhbmNlID0gVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVEaXN0YW5jZSh0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdGhpcy5fZGlzcGxhY2VtZW50ID0gMDtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzdGFydCcsIHtcbiAgICAgICAgY291bnQ6IGV2ZW50LnRvdWNoZXMubGVuZ3RoLFxuICAgICAgICB0b3VjaGVzOiBbXG4gICAgICAgICAgICB0aGlzLnRvdWNoQUlkLFxuICAgICAgICAgICAgdGhpcy50b3VjaEJJZFxuICAgICAgICBdLFxuICAgICAgICBkaXN0YW5jZTogdGhpcy5fZGlzdCxcbiAgICAgICAgY2VudGVyOiBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZUNlbnRlcih0aGlzLnBvc0EsIHRoaXMucG9zQilcbiAgICB9KTtcbn07XG5QaW5jaFN5bmMucHJvdG90eXBlLl9tb3ZlVXBkYXRlID0gZnVuY3Rpb24gX21vdmVVcGRhdGUoZGlmZlRpbWUpIHtcbiAgICB2YXIgY3VyckRpc3QgPSBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZURpc3RhbmNlKHRoaXMucG9zQSwgdGhpcy5wb3NCKTtcbiAgICB2YXIgY2VudGVyID0gVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVDZW50ZXIodGhpcy5wb3NBLCB0aGlzLnBvc0IpO1xuICAgIHZhciBzY2FsZSA9IHRoaXMub3B0aW9ucy5zY2FsZTtcbiAgICB2YXIgZGVsdGEgPSBzY2FsZSAqIChjdXJyRGlzdCAtIHRoaXMuX3ByZXZpb3VzRGlzdGFuY2UpO1xuICAgIHZhciB2ZWxvY2l0eSA9IGRlbHRhIC8gZGlmZlRpbWU7XG4gICAgdGhpcy5fcHJldmlvdXNEaXN0YW5jZSA9IGN1cnJEaXN0O1xuICAgIHRoaXMuX2Rpc3BsYWNlbWVudCArPSBkZWx0YTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCd1cGRhdGUnLCB7XG4gICAgICAgIGRlbHRhOiBkZWx0YSxcbiAgICAgICAgdmVsb2NpdHk6IHZlbG9jaXR5LFxuICAgICAgICBkaXN0YW5jZTogY3VyckRpc3QsXG4gICAgICAgIGRpc3BsYWNlbWVudDogdGhpcy5fZGlzcGxhY2VtZW50LFxuICAgICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXVxuICAgIH0pO1xufTtcblBpbmNoU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5QaW5jaFN5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFBpbmNoU3luYzsiLCJ2YXIgVHdvRmluZ2VyU3luYyA9IHJlcXVpcmUoJy4vVHdvRmluZ2VyU3luYycpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnLi4vY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gUm90YXRlU3luYyhvcHRpb25zKSB7XG4gICAgVHdvRmluZ2VyU3luYy5jYWxsKHRoaXMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoUm90YXRlU3luYy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9hbmdsZSA9IDA7XG4gICAgdGhpcy5fcHJldmlvdXNBbmdsZSA9IDA7XG59XG5Sb3RhdGVTeW5jLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVHdvRmluZ2VyU3luYy5wcm90b3R5cGUpO1xuUm90YXRlU3luYy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBSb3RhdGVTeW5jO1xuUm90YXRlU3luYy5ERUZBVUxUX09QVElPTlMgPSB7IHNjYWxlOiAxIH07XG5Sb3RhdGVTeW5jLnByb3RvdHlwZS5fc3RhcnRVcGRhdGUgPSBmdW5jdGlvbiBfc3RhcnRVcGRhdGUoZXZlbnQpIHtcbiAgICB0aGlzLl9hbmdsZSA9IDA7XG4gICAgdGhpcy5fcHJldmlvdXNBbmdsZSA9IFR3b0ZpbmdlclN5bmMuY2FsY3VsYXRlQW5nbGUodGhpcy5wb3NBLCB0aGlzLnBvc0IpO1xuICAgIHZhciBjZW50ZXIgPSBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZUNlbnRlcih0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCB7XG4gICAgICAgIGNvdW50OiBldmVudC50b3VjaGVzLmxlbmd0aCxcbiAgICAgICAgYW5nbGU6IHRoaXMuX2FuZ2xlLFxuICAgICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXVxuICAgIH0pO1xufTtcblJvdGF0ZVN5bmMucHJvdG90eXBlLl9tb3ZlVXBkYXRlID0gZnVuY3Rpb24gX21vdmVVcGRhdGUoZGlmZlRpbWUpIHtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLm9wdGlvbnMuc2NhbGU7XG4gICAgdmFyIGN1cnJBbmdsZSA9IFR3b0ZpbmdlclN5bmMuY2FsY3VsYXRlQW5nbGUodGhpcy5wb3NBLCB0aGlzLnBvc0IpO1xuICAgIHZhciBjZW50ZXIgPSBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZUNlbnRlcih0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdmFyIGRpZmZUaGV0YSA9IHNjYWxlICogKGN1cnJBbmdsZSAtIHRoaXMuX3ByZXZpb3VzQW5nbGUpO1xuICAgIHZhciB2ZWxUaGV0YSA9IGRpZmZUaGV0YSAvIGRpZmZUaW1lO1xuICAgIHRoaXMuX2FuZ2xlICs9IGRpZmZUaGV0YTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCd1cGRhdGUnLCB7XG4gICAgICAgIGRlbHRhOiBkaWZmVGhldGEsXG4gICAgICAgIHZlbG9jaXR5OiB2ZWxUaGV0YSxcbiAgICAgICAgYW5nbGU6IHRoaXMuX2FuZ2xlLFxuICAgICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXVxuICAgIH0pO1xuICAgIHRoaXMuX3ByZXZpb3VzQW5nbGUgPSBjdXJyQW5nbGU7XG59O1xuUm90YXRlU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5Sb3RhdGVTeW5jLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBSb3RhdGVTeW5jOyIsInZhciBUd29GaW5nZXJTeW5jID0gcmVxdWlyZSgnLi9Ud29GaW5nZXJTeW5jJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBTY2FsZVN5bmMob3B0aW9ucykge1xuICAgIFR3b0ZpbmdlclN5bmMuY2FsbCh0aGlzKTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFNjYWxlU3luYy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9zY2FsZUZhY3RvciA9IDE7XG4gICAgdGhpcy5fc3RhcnREaXN0ID0gMDtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCdwaXBlJywgX3Jlc2V0LmJpbmQodGhpcykpO1xufVxuU2NhbGVTeW5jLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVHdvRmluZ2VyU3luYy5wcm90b3R5cGUpO1xuU2NhbGVTeW5jLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFNjYWxlU3luYztcblNjYWxlU3luYy5ERUZBVUxUX09QVElPTlMgPSB7IHNjYWxlOiAxIH07XG5mdW5jdGlvbiBfcmVzZXQoKSB7XG4gICAgdGhpcy50b3VjaEFJZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRvdWNoQklkID0gdW5kZWZpbmVkO1xufVxuU2NhbGVTeW5jLnByb3RvdHlwZS5fc3RhcnRVcGRhdGUgPSBmdW5jdGlvbiBfc3RhcnRVcGRhdGUoZXZlbnQpIHtcbiAgICB0aGlzLl9zY2FsZUZhY3RvciA9IDE7XG4gICAgdGhpcy5fc3RhcnREaXN0ID0gVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVEaXN0YW5jZSh0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCB7XG4gICAgICAgIGNvdW50OiBldmVudC50b3VjaGVzLmxlbmd0aCxcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXSxcbiAgICAgICAgZGlzdGFuY2U6IHRoaXMuX3N0YXJ0RGlzdCxcbiAgICAgICAgY2VudGVyOiBUd29GaW5nZXJTeW5jLmNhbGN1bGF0ZUNlbnRlcih0aGlzLnBvc0EsIHRoaXMucG9zQilcbiAgICB9KTtcbn07XG5TY2FsZVN5bmMucHJvdG90eXBlLl9tb3ZlVXBkYXRlID0gZnVuY3Rpb24gX21vdmVVcGRhdGUoZGlmZlRpbWUpIHtcbiAgICB2YXIgc2NhbGUgPSB0aGlzLm9wdGlvbnMuc2NhbGU7XG4gICAgdmFyIGN1cnJEaXN0ID0gVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVEaXN0YW5jZSh0aGlzLnBvc0EsIHRoaXMucG9zQik7XG4gICAgdmFyIGNlbnRlciA9IFR3b0ZpbmdlclN5bmMuY2FsY3VsYXRlQ2VudGVyKHRoaXMucG9zQSwgdGhpcy5wb3NCKTtcbiAgICB2YXIgZGVsdGEgPSAoY3VyckRpc3QgLSB0aGlzLl9zdGFydERpc3QpIC8gdGhpcy5fc3RhcnREaXN0O1xuICAgIHZhciBuZXdTY2FsZUZhY3RvciA9IE1hdGgubWF4KDEgKyBzY2FsZSAqIGRlbHRhLCAwKTtcbiAgICB2YXIgdmVsb1NjYWxlID0gKG5ld1NjYWxlRmFjdG9yIC0gdGhpcy5fc2NhbGVGYWN0b3IpIC8gZGlmZlRpbWU7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgndXBkYXRlJywge1xuICAgICAgICBkZWx0YTogZGVsdGEsXG4gICAgICAgIHNjYWxlOiBuZXdTY2FsZUZhY3RvcixcbiAgICAgICAgdmVsb2NpdHk6IHZlbG9TY2FsZSxcbiAgICAgICAgZGlzdGFuY2U6IGN1cnJEaXN0LFxuICAgICAgICBjZW50ZXI6IGNlbnRlcixcbiAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgXVxuICAgIH0pO1xuICAgIHRoaXMuX3NjYWxlRmFjdG9yID0gbmV3U2NhbGVGYWN0b3I7XG59O1xuU2NhbGVTeW5jLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xufTtcblNjYWxlU3luYy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU2NhbGVTeW5jOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIEVuZ2luZSA9IHJlcXVpcmUoJy4uL2NvcmUvRW5naW5lJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCcuLi9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBTY3JvbGxTeW5jKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFNjcm9sbFN5bmMuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fcGF5bG9hZCA9IHtcbiAgICAgICAgZGVsdGE6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICB2ZWxvY2l0eTogbnVsbCxcbiAgICAgICAgc2xpcDogdHJ1ZVxuICAgIH07XG4gICAgdGhpcy5fZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50SW5wdXQpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IHVuZGVmaW5lZCA/IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0gOiAwO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZXZWZWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbignbW91c2V3aGVlbCcsIF9oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ3doZWVsJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5faW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgIHRoaXMuX2xvb3BCb3VuZCA9IGZhbHNlO1xufVxuU2Nyb2xsU3luYy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGlyZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgbWluaW11bUVuZFNwZWVkOiBJbmZpbml0eSxcbiAgICByYWlsczogZmFsc2UsXG4gICAgc2NhbGU6IDEsXG4gICAgc3RhbGxUaW1lOiA1MCxcbiAgICBsaW5lSGVpZ2h0OiA0MCxcbiAgICBwcmV2ZW50RGVmYXVsdDogdHJ1ZVxufTtcblNjcm9sbFN5bmMuRElSRUNUSU9OX1ggPSAwO1xuU2Nyb2xsU3luYy5ESVJFQ1RJT05fWSA9IDE7XG52YXIgTUlOSU1VTV9USUNLX1RJTUUgPSA4O1xudmFyIF9ub3cgPSBEYXRlLm5vdztcbmZ1bmN0aW9uIF9uZXdGcmFtZSgpIHtcbiAgICBpZiAodGhpcy5faW5Qcm9ncmVzcyAmJiBfbm93KCkgLSB0aGlzLl9wcmV2VGltZSA+IHRoaXMub3B0aW9ucy5zdGFsbFRpbWUpIHtcbiAgICAgICAgdGhpcy5faW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICB2YXIgZmluYWxWZWwgPSBNYXRoLmFicyh0aGlzLl9wcmV2VmVsKSA+PSB0aGlzLm9wdGlvbnMubWluaW11bUVuZFNwZWVkID8gdGhpcy5fcHJldlZlbCA6IDA7XG4gICAgICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICAgICAgcGF5bG9hZC5wb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgICAgICBwYXlsb2FkLnZlbG9jaXR5ID0gZmluYWxWZWw7XG4gICAgICAgIHBheWxvYWQuc2xpcCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHBheWxvYWQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9oYW5kbGVNb3ZlKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdClcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRoaXMuX2luUHJvZ3Jlc3MpIHtcbiAgICAgICAgdGhpcy5faW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkID8gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSA6IDA7XG4gICAgICAgIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgICAgICBwYXlsb2FkLnNsaXAgPSB0cnVlO1xuICAgICAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgICAgIHBheWxvYWQuY2xpZW50WCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIHBheWxvYWQuY2xpZW50WSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICAgIHBheWxvYWQub2Zmc2V0WCA9IGV2ZW50Lm9mZnNldFg7XG4gICAgICAgIHBheWxvYWQub2Zmc2V0WSA9IGV2ZW50Lm9mZnNldFk7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3N0YXJ0JywgcGF5bG9hZCk7XG4gICAgICAgIGlmICghdGhpcy5fbG9vcEJvdW5kKSB7XG4gICAgICAgICAgICBFbmdpbmUub24oJ3ByZXJlbmRlcicsIF9uZXdGcmFtZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuX2xvb3BCb3VuZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGN1cnJUaW1lID0gX25vdygpO1xuICAgIHZhciBwcmV2VGltZSA9IHRoaXMuX3ByZXZUaW1lIHx8IGN1cnJUaW1lO1xuICAgIHZhciBkaWZmWCA9IGV2ZW50LndoZWVsRGVsdGFYICE9PSB1bmRlZmluZWQgPyBldmVudC53aGVlbERlbHRhWCA6IC1ldmVudC5kZWx0YVg7XG4gICAgdmFyIGRpZmZZID0gZXZlbnQud2hlZWxEZWx0YVkgIT09IHVuZGVmaW5lZCA/IGV2ZW50LndoZWVsRGVsdGFZIDogLWV2ZW50LmRlbHRhWTtcbiAgICBpZiAoZXZlbnQuZGVsdGFNb2RlID09PSAxKSB7XG4gICAgICAgIGRpZmZYICo9IHRoaXMub3B0aW9ucy5saW5lSGVpZ2h0O1xuICAgICAgICBkaWZmWSAqPSB0aGlzLm9wdGlvbnMubGluZUhlaWdodDtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy5yYWlscykge1xuICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZlgpID4gTWF0aC5hYnMoZGlmZlkpKVxuICAgICAgICAgICAgZGlmZlkgPSAwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkaWZmWCA9IDA7XG4gICAgfVxuICAgIHZhciBkaWZmVGltZSA9IE1hdGgubWF4KGN1cnJUaW1lIC0gcHJldlRpbWUsIE1JTklNVU1fVElDS19USU1FKTtcbiAgICB2YXIgdmVsWCA9IGRpZmZYIC8gZGlmZlRpbWU7XG4gICAgdmFyIHZlbFkgPSBkaWZmWSAvIGRpZmZUaW1lO1xuICAgIHZhciBzY2FsZSA9IHRoaXMub3B0aW9ucy5zY2FsZTtcbiAgICB2YXIgbmV4dFZlbDtcbiAgICB2YXIgbmV4dERlbHRhO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBTY3JvbGxTeW5jLkRJUkVDVElPTl9YKSB7XG4gICAgICAgIG5leHREZWx0YSA9IHNjYWxlICogZGlmZlg7XG4gICAgICAgIG5leHRWZWwgPSBzY2FsZSAqIHZlbFg7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uICs9IG5leHREZWx0YTtcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFNjcm9sbFN5bmMuRElSRUNUSU9OX1kpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWTtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogdmVsWTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHREZWx0YSA9IFtcbiAgICAgICAgICAgIHNjYWxlICogZGlmZlgsXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZZXG4gICAgICAgIF07XG4gICAgICAgIG5leHRWZWwgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFgsXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFlcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMF0gKz0gbmV4dERlbHRhWzBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblsxXSArPSBuZXh0RGVsdGFbMV07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gbmV4dERlbHRhO1xuICAgIHBheWxvYWQudmVsb2NpdHkgPSBuZXh0VmVsO1xuICAgIHBheWxvYWQucG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICBwYXlsb2FkLnNsaXAgPSB0cnVlO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3VwZGF0ZScsIHBheWxvYWQpO1xuICAgIHRoaXMuX3ByZXZUaW1lID0gY3VyclRpbWU7XG4gICAgdGhpcy5fcHJldlZlbCA9IG5leHRWZWw7XG59XG5TY3JvbGxTeW5jLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zO1xufTtcblNjcm9sbFN5bmMucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbFN5bmM7IiwidmFyIFRvdWNoVHJhY2tlciA9IHJlcXVpcmUoJy4vVG91Y2hUcmFja2VyJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJy4uL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbmZ1bmN0aW9uIFRvdWNoU3luYyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShUb3VjaFN5bmMuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fdG91Y2hUcmFja2VyID0gbmV3IFRvdWNoVHJhY2tlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX3RvdWNoVHJhY2tlcik7XG4gICAgdGhpcy5fdG91Y2hUcmFja2VyLm9uKCd0cmFja3N0YXJ0JywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX3RvdWNoVHJhY2tlci5vbigndHJhY2ttb3ZlJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fdG91Y2hUcmFja2VyLm9uKCd0cmFja2VuZCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fcGF5bG9hZCA9IHtcbiAgICAgICAgZGVsdGE6IG51bGwsXG4gICAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgICB2ZWxvY2l0eTogbnVsbCxcbiAgICAgICAgY2xpZW50WDogdW5kZWZpbmVkLFxuICAgICAgICBjbGllbnRZOiB1bmRlZmluZWQsXG4gICAgICAgIGNvdW50OiAwLFxuICAgICAgICB0b3VjaDogdW5kZWZpbmVkXG4gICAgfTtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IG51bGw7XG59XG5Ub3VjaFN5bmMuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpcmVjdGlvbjogdW5kZWZpbmVkLFxuICAgIHJhaWxzOiBmYWxzZSxcbiAgICBzY2FsZTogMVxufTtcblRvdWNoU3luYy5ESVJFQ1RJT05fWCA9IDA7XG5Ub3VjaFN5bmMuRElSRUNUSU9OX1kgPSAxO1xudmFyIE1JTklNVU1fVElDS19USU1FID0gODtcbmZ1bmN0aW9uIF9oYW5kbGVTdGFydChkYXRhKSB7XG4gICAgdmFyIHZlbG9jaXR5O1xuICAgIHZhciBkZWx0YTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gMDtcbiAgICAgICAgdmVsb2NpdHkgPSAwO1xuICAgICAgICBkZWx0YSA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgICAgICB2ZWxvY2l0eSA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF07XG4gICAgICAgIGRlbHRhID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICB9XG4gICAgdmFyIHBheWxvYWQgPSB0aGlzLl9wYXlsb2FkO1xuICAgIHBheWxvYWQuZGVsdGEgPSBkZWx0YTtcbiAgICBwYXlsb2FkLnBvc2l0aW9uID0gdGhpcy5fcG9zaXRpb247XG4gICAgcGF5bG9hZC52ZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIHBheWxvYWQuY2xpZW50WCA9IGRhdGEueDtcbiAgICBwYXlsb2FkLmNsaWVudFkgPSBkYXRhLnk7XG4gICAgcGF5bG9hZC5jb3VudCA9IGRhdGEuY291bnQ7XG4gICAgcGF5bG9hZC50b3VjaCA9IGRhdGEuaWRlbnRpZmllcjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdzdGFydCcsIHBheWxvYWQpO1xufVxuZnVuY3Rpb24gX2hhbmRsZU1vdmUoZGF0YSkge1xuICAgIHZhciBoaXN0b3J5ID0gZGF0YS5oaXN0b3J5O1xuICAgIHZhciBjdXJySGlzdG9yeSA9IGhpc3RvcnlbaGlzdG9yeS5sZW5ndGggLSAxXTtcbiAgICB2YXIgcHJldkhpc3RvcnkgPSBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMl07XG4gICAgdmFyIHByZXZUaW1lID0gcHJldkhpc3RvcnkudGltZXN0YW1wO1xuICAgIHZhciBjdXJyVGltZSA9IGN1cnJIaXN0b3J5LnRpbWVzdGFtcDtcbiAgICB2YXIgZGlmZlggPSBjdXJySGlzdG9yeS54IC0gcHJldkhpc3RvcnkueDtcbiAgICB2YXIgZGlmZlkgPSBjdXJySGlzdG9yeS55IC0gcHJldkhpc3RvcnkueTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJhaWxzKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhkaWZmWCkgPiBNYXRoLmFicyhkaWZmWSkpXG4gICAgICAgICAgICBkaWZmWSA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRpZmZYID0gMDtcbiAgICB9XG4gICAgdmFyIGRpZmZUaW1lID0gTWF0aC5tYXgoY3VyclRpbWUgLSBwcmV2VGltZSwgTUlOSU1VTV9USUNLX1RJTUUpO1xuICAgIHZhciB2ZWxYID0gZGlmZlggLyBkaWZmVGltZTtcbiAgICB2YXIgdmVsWSA9IGRpZmZZIC8gZGlmZlRpbWU7XG4gICAgdmFyIHNjYWxlID0gdGhpcy5vcHRpb25zLnNjYWxlO1xuICAgIHZhciBuZXh0VmVsO1xuICAgIHZhciBuZXh0RGVsdGE7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFRvdWNoU3luYy5ESVJFQ1RJT05fWCkge1xuICAgICAgICBuZXh0RGVsdGEgPSBzY2FsZSAqIGRpZmZYO1xuICAgICAgICBuZXh0VmVsID0gc2NhbGUgKiB2ZWxYO1xuICAgICAgICB0aGlzLl9wb3NpdGlvbiArPSBuZXh0RGVsdGE7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBUb3VjaFN5bmMuRElSRUNUSU9OX1kpIHtcbiAgICAgICAgbmV4dERlbHRhID0gc2NhbGUgKiBkaWZmWTtcbiAgICAgICAgbmV4dFZlbCA9IHNjYWxlICogdmVsWTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gKz0gbmV4dERlbHRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHREZWx0YSA9IFtcbiAgICAgICAgICAgIHNjYWxlICogZGlmZlgsXG4gICAgICAgICAgICBzY2FsZSAqIGRpZmZZXG4gICAgICAgIF07XG4gICAgICAgIG5leHRWZWwgPSBbXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFgsXG4gICAgICAgICAgICBzY2FsZSAqIHZlbFlcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25bMF0gKz0gbmV4dERlbHRhWzBdO1xuICAgICAgICB0aGlzLl9wb3NpdGlvblsxXSArPSBuZXh0RGVsdGFbMV07XG4gICAgfVxuICAgIHZhciBwYXlsb2FkID0gdGhpcy5fcGF5bG9hZDtcbiAgICBwYXlsb2FkLmRlbHRhID0gbmV4dERlbHRhO1xuICAgIHBheWxvYWQudmVsb2NpdHkgPSBuZXh0VmVsO1xuICAgIHBheWxvYWQucG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbjtcbiAgICBwYXlsb2FkLmNsaWVudFggPSBkYXRhLng7XG4gICAgcGF5bG9hZC5jbGllbnRZID0gZGF0YS55O1xuICAgIHBheWxvYWQuY291bnQgPSBkYXRhLmNvdW50O1xuICAgIHBheWxvYWQudG91Y2ggPSBkYXRhLmlkZW50aWZpZXI7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgndXBkYXRlJywgcGF5bG9hZCk7XG59XG5mdW5jdGlvbiBfaGFuZGxlRW5kKGRhdGEpIHtcbiAgICB0aGlzLl9wYXlsb2FkLmNvdW50ID0gZGF0YS5jb3VudDtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdlbmQnLCB0aGlzLl9wYXlsb2FkKTtcbn1cblRvdWNoU3luYy5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcblRvdWNoU3luYy5wcm90b3R5cGUuZ2V0T3B0aW9ucyA9IGZ1bmN0aW9uIGdldE9wdGlvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRvdWNoU3luYzsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi4vY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBfbm93ID0gRGF0ZS5ub3c7XG5mdW5jdGlvbiBfdGltZXN0YW1wVG91Y2godG91Y2gsIGV2ZW50LCBoaXN0b3J5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogdG91Y2guY2xpZW50WCxcbiAgICAgICAgeTogdG91Y2guY2xpZW50WSxcbiAgICAgICAgaWRlbnRpZmllcjogdG91Y2guaWRlbnRpZmllcixcbiAgICAgICAgb3JpZ2luOiBldmVudC5vcmlnaW4sXG4gICAgICAgIHRpbWVzdGFtcDogX25vdygpLFxuICAgICAgICBjb3VudDogZXZlbnQudG91Y2hlcy5sZW5ndGgsXG4gICAgICAgIGhpc3Rvcnk6IGhpc3RvcnlcbiAgICB9O1xufVxuZnVuY3Rpb24gX2hhbmRsZVN0YXJ0KGV2ZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGRhdGEgPSBfdGltZXN0YW1wVG91Y2godG91Y2gsIGV2ZW50LCBudWxsKTtcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja3N0YXJ0JywgZGF0YSk7XG4gICAgICAgIGlmICghdGhpcy5zZWxlY3RpdmUgJiYgIXRoaXMudG91Y2hIaXN0b3J5W3RvdWNoLmlkZW50aWZpZXJdKVxuICAgICAgICAgICAgdGhpcy50cmFjayhkYXRhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlTW92ZShldmVudCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnQuY2hhbmdlZFRvdWNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgICAgIHZhciBoaXN0b3J5ID0gdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIGlmIChoaXN0b3J5KSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IF90aW1lc3RhbXBUb3VjaCh0b3VjaCwgZXZlbnQsIGhpc3RvcnkpO1xuICAgICAgICAgICAgdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl0ucHVzaChkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgndHJhY2ttb3ZlJywgZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlRW5kKGV2ZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudC5jaGFuZ2VkVG91Y2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1tpXTtcbiAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLnRvdWNoSGlzdG9yeVt0b3VjaC5pZGVudGlmaWVyXTtcbiAgICAgICAgaWYgKGhpc3RvcnkpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gX3RpbWVzdGFtcFRvdWNoKHRvdWNoLCBldmVudCwgaGlzdG9yeSk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ3RyYWNrZW5kJywgZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy50b3VjaEhpc3RvcnlbdG91Y2guaWRlbnRpZmllcl07XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfaGFuZGxlVW5waXBlKCkge1xuICAgIGZvciAodmFyIGkgaW4gdGhpcy50b3VjaEhpc3RvcnkpIHtcbiAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLnRvdWNoSGlzdG9yeVtpXTtcbiAgICAgICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCd0cmFja2VuZCcsIHtcbiAgICAgICAgICAgIHRvdWNoOiBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMV0udG91Y2gsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgICBjb3VudDogMCxcbiAgICAgICAgICAgIGhpc3Rvcnk6IGhpc3RvcnlcbiAgICAgICAgfSk7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnRvdWNoSGlzdG9yeVtpXTtcbiAgICB9XG59XG5mdW5jdGlvbiBUb3VjaFRyYWNrZXIoc2VsZWN0aXZlKSB7XG4gICAgdGhpcy5zZWxlY3RpdmUgPSBzZWxlY3RpdmU7XG4gICAgdGhpcy50b3VjaEhpc3RvcnkgPSB7fTtcbiAgICB0aGlzLmV2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaHN0YXJ0JywgX2hhbmRsZVN0YXJ0LmJpbmQodGhpcykpO1xuICAgIHRoaXMuZXZlbnRJbnB1dC5vbigndG91Y2htb3ZlJywgX2hhbmRsZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaGVuZCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd0b3VjaGNhbmNlbCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd1bnBpcGUnLCBfaGFuZGxlVW5waXBlLmJpbmQodGhpcykpO1xufVxuVG91Y2hUcmFja2VyLnByb3RvdHlwZS50cmFjayA9IGZ1bmN0aW9uIHRyYWNrKGRhdGEpIHtcbiAgICB0aGlzLnRvdWNoSGlzdG9yeVtkYXRhLmlkZW50aWZpZXJdID0gW2RhdGFdO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVG91Y2hUcmFja2VyOyIsInZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCcuLi9jb3JlL0V2ZW50SGFuZGxlcicpO1xuZnVuY3Rpb24gVHdvRmluZ2VyU3luYygpIHtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMudG91Y2hBRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMudG91Y2hBSWQgPSAwO1xuICAgIHRoaXMucG9zQSA9IG51bGw7XG4gICAgdGhpcy50aW1lc3RhbXBBID0gMDtcbiAgICB0aGlzLnRvdWNoQkVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRvdWNoQklkID0gMDtcbiAgICB0aGlzLnBvc0IgPSBudWxsO1xuICAgIHRoaXMudGltZXN0YW1wQiA9IDA7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbigndG91Y2hjYW5jZWwnLCB0aGlzLmhhbmRsZUVuZC5iaW5kKHRoaXMpKTtcbn1cblR3b0ZpbmdlclN5bmMuY2FsY3VsYXRlQW5nbGUgPSBmdW5jdGlvbiAocG9zQSwgcG9zQikge1xuICAgIHZhciBkaWZmWCA9IHBvc0JbMF0gLSBwb3NBWzBdO1xuICAgIHZhciBkaWZmWSA9IHBvc0JbMV0gLSBwb3NBWzFdO1xuICAgIHJldHVybiBNYXRoLmF0YW4yKGRpZmZZLCBkaWZmWCk7XG59O1xuVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uIChwb3NBLCBwb3NCKSB7XG4gICAgdmFyIGRpZmZYID0gcG9zQlswXSAtIHBvc0FbMF07XG4gICAgdmFyIGRpZmZZID0gcG9zQlsxXSAtIHBvc0FbMV07XG4gICAgcmV0dXJuIE1hdGguc3FydChkaWZmWCAqIGRpZmZYICsgZGlmZlkgKiBkaWZmWSk7XG59O1xuVHdvRmluZ2VyU3luYy5jYWxjdWxhdGVDZW50ZXIgPSBmdW5jdGlvbiAocG9zQSwgcG9zQikge1xuICAgIHJldHVybiBbXG4gICAgICAgIChwb3NBWzBdICsgcG9zQlswXSkgLyAyLFxuICAgICAgICAocG9zQVsxXSArIHBvc0JbMV0pIC8gMlxuICAgIF07XG59O1xudmFyIF9ub3cgPSBEYXRlLm5vdztcblR3b0ZpbmdlclN5bmMucHJvdG90eXBlLmhhbmRsZVN0YXJ0ID0gZnVuY3Rpb24gaGFuZGxlU3RhcnQoZXZlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICBpZiAoIXRoaXMudG91Y2hBRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy50b3VjaEFJZCA9IHRvdWNoLmlkZW50aWZpZXI7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQUVuYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wb3NBID0gW1xuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VZXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy50aW1lc3RhbXBBID0gX25vdygpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnRvdWNoQkVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudG91Y2hCSWQgPSB0b3VjaC5pZGVudGlmaWVyO1xuICAgICAgICAgICAgdGhpcy50b3VjaEJFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucG9zQiA9IFtcbiAgICAgICAgICAgICAgICB0b3VjaC5wYWdlWCxcbiAgICAgICAgICAgICAgICB0b3VjaC5wYWdlWVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIHRoaXMudGltZXN0YW1wQiA9IF9ub3coKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0VXBkYXRlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5Ud29GaW5nZXJTeW5jLnByb3RvdHlwZS5oYW5kbGVNb3ZlID0gZnVuY3Rpb24gaGFuZGxlTW92ZShldmVudCkge1xuICAgIGlmICghKHRoaXMudG91Y2hBRW5hYmxlZCAmJiB0aGlzLnRvdWNoQkVuYWJsZWQpKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIHByZXZUaW1lQSA9IHRoaXMudGltZXN0YW1wQTtcbiAgICB2YXIgcHJldlRpbWVCID0gdGhpcy50aW1lc3RhbXBCO1xuICAgIHZhciBkaWZmVGltZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy50b3VjaEFJZCkge1xuICAgICAgICAgICAgdGhpcy5wb3NBID0gW1xuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VZXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy50aW1lc3RhbXBBID0gX25vdygpO1xuICAgICAgICAgICAgZGlmZlRpbWUgPSB0aGlzLnRpbWVzdGFtcEEgLSBwcmV2VGltZUE7XG4gICAgICAgIH0gZWxzZSBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy50b3VjaEJJZCkge1xuICAgICAgICAgICAgdGhpcy5wb3NCID0gW1xuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHRvdWNoLnBhZ2VZXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdGhpcy50aW1lc3RhbXBCID0gX25vdygpO1xuICAgICAgICAgICAgZGlmZlRpbWUgPSB0aGlzLnRpbWVzdGFtcEIgLSBwcmV2VGltZUI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRpZmZUaW1lKVxuICAgICAgICB0aGlzLl9tb3ZlVXBkYXRlKGRpZmZUaW1lKTtcbn07XG5Ud29GaW5nZXJTeW5jLnByb3RvdHlwZS5oYW5kbGVFbmQgPSBmdW5jdGlvbiBoYW5kbGVFbmQoZXZlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzW2ldO1xuICAgICAgICBpZiAodG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy50b3VjaEFJZCB8fCB0b3VjaC5pZGVudGlmaWVyID09PSB0aGlzLnRvdWNoQklkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50b3VjaEFFbmFibGVkICYmIHRoaXMudG91Y2hCRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b3VjaEFJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG91Y2hCSWRcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgYW5nbGU6IHRoaXMuX2FuZ2xlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRvdWNoQUVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMudG91Y2hBSWQgPSAwO1xuICAgICAgICAgICAgdGhpcy50b3VjaEJFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRvdWNoQklkID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFR3b0ZpbmdlclN5bmM7IiwidmFyIFZlY3RvciA9IHJlcXVpcmUoJy4vVmVjdG9yJyk7XG5mdW5jdGlvbiBNYXRyaXgodmFsdWVzKSB7XG4gICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXMgfHwgW1xuICAgICAgICBbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMVxuICAgICAgICBdXG4gICAgXTtcbiAgICByZXR1cm4gdGhpcztcbn1cbnZhciBfcmVnaXN0ZXIgPSBuZXcgTWF0cml4KCk7XG52YXIgX3ZlY3RvclJlZ2lzdGVyID0gbmV3IFZlY3RvcigpO1xuTWF0cml4LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzO1xufTtcbk1hdHJpeC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHZhbHVlcykge1xuICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xufTtcbk1hdHJpeC5wcm90b3R5cGUudmVjdG9yTXVsdGlwbHkgPSBmdW5jdGlvbiB2ZWN0b3JNdWx0aXBseSh2KSB7XG4gICAgdmFyIE0gPSB0aGlzLmdldCgpO1xuICAgIHZhciB2MCA9IHYueDtcbiAgICB2YXIgdjEgPSB2Lnk7XG4gICAgdmFyIHYyID0gdi56O1xuICAgIHZhciBNMCA9IE1bMF07XG4gICAgdmFyIE0xID0gTVsxXTtcbiAgICB2YXIgTTIgPSBNWzJdO1xuICAgIHZhciBNMDAgPSBNMFswXTtcbiAgICB2YXIgTTAxID0gTTBbMV07XG4gICAgdmFyIE0wMiA9IE0wWzJdO1xuICAgIHZhciBNMTAgPSBNMVswXTtcbiAgICB2YXIgTTExID0gTTFbMV07XG4gICAgdmFyIE0xMiA9IE0xWzJdO1xuICAgIHZhciBNMjAgPSBNMlswXTtcbiAgICB2YXIgTTIxID0gTTJbMV07XG4gICAgdmFyIE0yMiA9IE0yWzJdO1xuICAgIHJldHVybiBfdmVjdG9yUmVnaXN0ZXIuc2V0WFlaKE0wMCAqIHYwICsgTTAxICogdjEgKyBNMDIgKiB2MiwgTTEwICogdjAgKyBNMTEgKiB2MSArIE0xMiAqIHYyLCBNMjAgKiB2MCArIE0yMSAqIHYxICsgTTIyICogdjIpO1xufTtcbk1hdHJpeC5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbiBtdWx0aXBseShNMikge1xuICAgIHZhciBNMSA9IHRoaXMuZ2V0KCk7XG4gICAgdmFyIHJlc3VsdCA9IFtbXV07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgcmVzdWx0W2ldID0gW107XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgMzsgaysrKSB7XG4gICAgICAgICAgICAgICAgc3VtICs9IE0xW2ldW2tdICogTTJba11bal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRbaV1bal0gPSBzdW07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5zZXQocmVzdWx0KTtcbn07XG5NYXRyaXgucHJvdG90eXBlLnRyYW5zcG9zZSA9IGZ1bmN0aW9uIHRyYW5zcG9zZSgpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIE0gPSB0aGlzLmdldCgpO1xuICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IDM7IHJvdysrKSB7XG4gICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IDM7IGNvbCsrKSB7XG4gICAgICAgICAgICByZXN1bHRbcm93XVtjb2xdID0gTVtjb2xdW3Jvd107XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5zZXQocmVzdWx0KTtcbn07XG5NYXRyaXgucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuZ2V0KCk7XG4gICAgdmFyIE0gPSBbXTtcbiAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCAzOyByb3crKylcbiAgICAgICAgTVtyb3ddID0gdmFsdWVzW3Jvd10uc2xpY2UoKTtcbiAgICByZXR1cm4gbmV3IE1hdHJpeChNKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IE1hdHJpeDsiLCJ2YXIgTWF0cml4ID0gcmVxdWlyZSgnLi9NYXRyaXgnKTtcbmZ1bmN0aW9uIFF1YXRlcm5pb24odywgeCwgeSwgeikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKVxuICAgICAgICB0aGlzLnNldCh3KTtcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy53ID0gdyAhPT0gdW5kZWZpbmVkID8gdyA6IDE7XG4gICAgICAgIHRoaXMueCA9IHggIT09IHVuZGVmaW5lZCA/IHggOiAwO1xuICAgICAgICB0aGlzLnkgPSB5ICE9PSB1bmRlZmluZWQgPyB5IDogMDtcbiAgICAgICAgdGhpcy56ID0geiAhPT0gdW5kZWZpbmVkID8geiA6IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxudmFyIHJlZ2lzdGVyID0gbmV3IFF1YXRlcm5pb24oMSwgMCwgMCwgMCk7XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQocSkge1xuICAgIHJldHVybiByZWdpc3Rlci5zZXRXWFlaKHRoaXMudyArIHEudywgdGhpcy54ICsgcS54LCB0aGlzLnkgKyBxLnksIHRoaXMueiArIHEueik7XG59O1xuUXVhdGVybmlvbi5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gc3ViKHEpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXIuc2V0V1hZWih0aGlzLncgLSBxLncsIHRoaXMueCAtIHEueCwgdGhpcy55IC0gcS55LCB0aGlzLnogLSBxLnopO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnNjYWxhckRpdmlkZSA9IGZ1bmN0aW9uIHNjYWxhckRpdmlkZShzKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NhbGFyTXVsdGlwbHkoMSAvIHMpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnNjYWxhck11bHRpcGx5ID0gZnVuY3Rpb24gc2NhbGFyTXVsdGlwbHkocykge1xuICAgIHJldHVybiByZWdpc3Rlci5zZXRXWFlaKHRoaXMudyAqIHMsIHRoaXMueCAqIHMsIHRoaXMueSAqIHMsIHRoaXMueiAqIHMpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gbXVsdGlwbHkocSkge1xuICAgIHZhciB4MSA9IHRoaXMueDtcbiAgICB2YXIgeTEgPSB0aGlzLnk7XG4gICAgdmFyIHoxID0gdGhpcy56O1xuICAgIHZhciB3MSA9IHRoaXMudztcbiAgICB2YXIgeDIgPSBxLng7XG4gICAgdmFyIHkyID0gcS55O1xuICAgIHZhciB6MiA9IHEuejtcbiAgICB2YXIgdzIgPSBxLncgfHwgMDtcbiAgICByZXR1cm4gcmVnaXN0ZXIuc2V0V1hZWih3MSAqIHcyIC0geDEgKiB4MiAtIHkxICogeTIgLSB6MSAqIHoyLCB4MSAqIHcyICsgeDIgKiB3MSArIHkyICogejEgLSB5MSAqIHoyLCB5MSAqIHcyICsgeTIgKiB3MSArIHgxICogejIgLSB4MiAqIHoxLCB6MSAqIHcyICsgejIgKiB3MSArIHgyICogeTEgLSB4MSAqIHkyKTtcbn07XG52YXIgY29uaiA9IG5ldyBRdWF0ZXJuaW9uKDEsIDAsIDAsIDApO1xuUXVhdGVybmlvbi5wcm90b3R5cGUucm90YXRlVmVjdG9yID0gZnVuY3Rpb24gcm90YXRlVmVjdG9yKHYpIHtcbiAgICBjb25qLnNldCh0aGlzLmNvbmooKSk7XG4gICAgcmV0dXJuIHJlZ2lzdGVyLnNldCh0aGlzLm11bHRpcGx5KHYpLm11bHRpcGx5KGNvbmopKTtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5pbnZlcnNlID0gZnVuY3Rpb24gaW52ZXJzZSgpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXIuc2V0KHRoaXMuY29uaigpLnNjYWxhckRpdmlkZSh0aGlzLm5vcm1TcXVhcmVkKCkpKTtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5uZWdhdGUgPSBmdW5jdGlvbiBuZWdhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NhbGFyTXVsdGlwbHkoLTEpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLmNvbmogPSBmdW5jdGlvbiBjb25qKCkge1xuICAgIHJldHVybiByZWdpc3Rlci5zZXRXWFlaKHRoaXMudywgLXRoaXMueCwgLXRoaXMueSwgLXRoaXMueik7XG59O1xuUXVhdGVybmlvbi5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gbm9ybWFsaXplKGxlbmd0aCkge1xuICAgIGxlbmd0aCA9IGxlbmd0aCA9PT0gdW5kZWZpbmVkID8gMSA6IGxlbmd0aDtcbiAgICByZXR1cm4gdGhpcy5zY2FsYXJEaXZpZGUobGVuZ3RoICogdGhpcy5ub3JtKCkpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLm1ha2VGcm9tQW5nbGVBbmRBeGlzID0gZnVuY3Rpb24gbWFrZUZyb21BbmdsZUFuZEF4aXMoYW5nbGUsIHYpIHtcbiAgICB2YXIgbiA9IHYubm9ybWFsaXplKCk7XG4gICAgdmFyIGhhID0gYW5nbGUgKiAwLjU7XG4gICAgdmFyIHMgPSAtTWF0aC5zaW4oaGEpO1xuICAgIHRoaXMueCA9IHMgKiBuLng7XG4gICAgdGhpcy55ID0gcyAqIG4ueTtcbiAgICB0aGlzLnogPSBzICogbi56O1xuICAgIHRoaXMudyA9IE1hdGguY29zKGhhKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5zZXRXWFlaID0gZnVuY3Rpb24gc2V0V1hZWih3LCB4LCB5LCB6KSB7XG4gICAgcmVnaXN0ZXIuY2xlYXIoKTtcbiAgICB0aGlzLncgPSB3O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnogPSB6O1xuICAgIHJldHVybiB0aGlzO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldCh2KSB7XG4gICAgaWYgKHYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB0aGlzLncgPSAwO1xuICAgICAgICB0aGlzLnggPSB2WzBdO1xuICAgICAgICB0aGlzLnkgPSB2WzFdO1xuICAgICAgICB0aGlzLnogPSB2WzJdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudyA9IHYudztcbiAgICAgICAgdGhpcy54ID0gdi54O1xuICAgICAgICB0aGlzLnkgPSB2Lnk7XG4gICAgICAgIHRoaXMueiA9IHYuejtcbiAgICB9XG4gICAgaWYgKHRoaXMgIT09IHJlZ2lzdGVyKVxuICAgICAgICByZWdpc3Rlci5jbGVhcigpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uIHB1dChxKSB7XG4gICAgcS5zZXQocmVnaXN0ZXIpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24gY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBRdWF0ZXJuaW9uKHRoaXMpO1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdGhpcy53ID0gMTtcbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gICAgdGhpcy56ID0gMDtcbiAgICByZXR1cm4gdGhpcztcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5pc0VxdWFsID0gZnVuY3Rpb24gaXNFcXVhbChxKSB7XG4gICAgcmV0dXJuIHEudyA9PT0gdGhpcy53ICYmIHEueCA9PT0gdGhpcy54ICYmIHEueSA9PT0gdGhpcy55ICYmIHEueiA9PT0gdGhpcy56O1xufTtcblF1YXRlcm5pb24ucHJvdG90eXBlLmRvdCA9IGZ1bmN0aW9uIGRvdChxKSB7XG4gICAgcmV0dXJuIHRoaXMudyAqIHEudyArIHRoaXMueCAqIHEueCArIHRoaXMueSAqIHEueSArIHRoaXMueiAqIHEuejtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5ub3JtU3F1YXJlZCA9IGZ1bmN0aW9uIG5vcm1TcXVhcmVkKCkge1xuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5ub3JtID0gZnVuY3Rpb24gbm9ybSgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubm9ybVNxdWFyZWQoKSk7XG59O1xuUXVhdGVybmlvbi5wcm90b3R5cGUuaXNaZXJvID0gZnVuY3Rpb24gaXNaZXJvKCkge1xuICAgIHJldHVybiAhKHRoaXMueCB8fCB0aGlzLnkgfHwgdGhpcy56KTtcbn07XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgdmFyIHRlbXAgPSB0aGlzLm5vcm1hbGl6ZSgxKTtcbiAgICB2YXIgeCA9IHRlbXAueDtcbiAgICB2YXIgeSA9IHRlbXAueTtcbiAgICB2YXIgeiA9IHRlbXAuejtcbiAgICB2YXIgdyA9IHRlbXAudztcbiAgICByZXR1cm4gW1xuICAgICAgICAxIC0gMiAqIHkgKiB5IC0gMiAqIHogKiB6LFxuICAgICAgICAyICogeCAqIHkgLSAyICogeiAqIHcsXG4gICAgICAgIDIgKiB4ICogeiArIDIgKiB5ICogdyxcbiAgICAgICAgMCxcbiAgICAgICAgMiAqIHggKiB5ICsgMiAqIHogKiB3LFxuICAgICAgICAxIC0gMiAqIHggKiB4IC0gMiAqIHogKiB6LFxuICAgICAgICAyICogeSAqIHogLSAyICogeCAqIHcsXG4gICAgICAgIDAsXG4gICAgICAgIDIgKiB4ICogeiAtIDIgKiB5ICogdyxcbiAgICAgICAgMiAqIHkgKiB6ICsgMiAqIHggKiB3LFxuICAgICAgICAxIC0gMiAqIHggKiB4IC0gMiAqIHkgKiB5LFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAxXG4gICAgXTtcbn07XG52YXIgbWF0cml4UmVnaXN0ZXIgPSBuZXcgTWF0cml4KCk7XG5RdWF0ZXJuaW9uLnByb3RvdHlwZS5nZXRNYXRyaXggPSBmdW5jdGlvbiBnZXRNYXRyaXgoKSB7XG4gICAgdmFyIHRlbXAgPSB0aGlzLm5vcm1hbGl6ZSgxKTtcbiAgICB2YXIgeCA9IHRlbXAueDtcbiAgICB2YXIgeSA9IHRlbXAueTtcbiAgICB2YXIgeiA9IHRlbXAuejtcbiAgICB2YXIgdyA9IHRlbXAudztcbiAgICByZXR1cm4gbWF0cml4UmVnaXN0ZXIuc2V0KFtcbiAgICAgICAgW1xuICAgICAgICAgICAgMSAtIDIgKiB5ICogeSAtIDIgKiB6ICogeixcbiAgICAgICAgICAgIDIgKiB4ICogeSArIDIgKiB6ICogdyxcbiAgICAgICAgICAgIDIgKiB4ICogeiAtIDIgKiB5ICogd1xuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICAyICogeCAqIHkgLSAyICogeiAqIHcsXG4gICAgICAgICAgICAxIC0gMiAqIHggKiB4IC0gMiAqIHogKiB6LFxuICAgICAgICAgICAgMiAqIHkgKiB6ICsgMiAqIHggKiB3XG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDIgKiB4ICogeiArIDIgKiB5ICogdyxcbiAgICAgICAgICAgIDIgKiB5ICogeiAtIDIgKiB4ICogdyxcbiAgICAgICAgICAgIDEgLSAyICogeCAqIHggLSAyICogeSAqIHlcbiAgICAgICAgXVxuICAgIF0pO1xufTtcbnZhciBlcHNpbG9uID0gMC4wMDAwMTtcblF1YXRlcm5pb24ucHJvdG90eXBlLnNsZXJwID0gZnVuY3Rpb24gc2xlcnAocSwgdCkge1xuICAgIHZhciBvbWVnYTtcbiAgICB2YXIgY29zb21lZ2E7XG4gICAgdmFyIHNpbm9tZWdhO1xuICAgIHZhciBzY2FsZUZyb207XG4gICAgdmFyIHNjYWxlVG87XG4gICAgY29zb21lZ2EgPSB0aGlzLmRvdChxKTtcbiAgICBpZiAoMSAtIGNvc29tZWdhID4gZXBzaWxvbikge1xuICAgICAgICBvbWVnYSA9IE1hdGguYWNvcyhjb3NvbWVnYSk7XG4gICAgICAgIHNpbm9tZWdhID0gTWF0aC5zaW4ob21lZ2EpO1xuICAgICAgICBzY2FsZUZyb20gPSBNYXRoLnNpbigoMSAtIHQpICogb21lZ2EpIC8gc2lub21lZ2E7XG4gICAgICAgIHNjYWxlVG8gPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2lub21lZ2E7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2NhbGVGcm9tID0gMSAtIHQ7XG4gICAgICAgIHNjYWxlVG8gPSB0O1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXIuc2V0KHRoaXMuc2NhbGFyTXVsdGlwbHkoc2NhbGVGcm9tIC8gc2NhbGVUbykuYWRkKHEpLm11bHRpcGx5KHNjYWxlVG8pKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFF1YXRlcm5pb247IiwidmFyIFJBTkQgPSBNYXRoLnJhbmRvbTtcbmZ1bmN0aW9uIF9yYW5kb21GbG9hdChtaW4sIG1heCkge1xuICAgIHJldHVybiBtaW4gKyBSQU5EKCkgKiAobWF4IC0gbWluKTtcbn1cbmZ1bmN0aW9uIF9yYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIG1pbiArIFJBTkQoKSAqIChtYXggLSBtaW4gKyAxKSA+PiAwO1xufVxudmFyIFJhbmRvbSA9IHt9O1xuUmFuZG9tLmludGVnZXIgPSBmdW5jdGlvbiBpbnRlZ2VyKG1pbiwgbWF4LCBkaW0pIHtcbiAgICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDA7XG4gICAgbWF4ID0gbWF4ICE9PSB1bmRlZmluZWQgPyBtYXggOiAxO1xuICAgIGlmIChkaW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChfcmFuZG9tSW50ZWdlcihtaW4sIG1heCkpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gX3JhbmRvbUludGVnZXIobWluLCBtYXgpO1xufTtcblJhbmRvbS5yYW5nZSA9IGZ1bmN0aW9uIHJhbmdlKG1pbiwgbWF4LCBkaW0pIHtcbiAgICBtaW4gPSBtaW4gIT09IHVuZGVmaW5lZCA/IG1pbiA6IDA7XG4gICAgbWF4ID0gbWF4ICE9PSB1bmRlZmluZWQgPyBtYXggOiAxO1xuICAgIGlmIChkaW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGltOyBpKyspXG4gICAgICAgICAgICByZXN1bHQucHVzaChfcmFuZG9tRmxvYXQobWluLCBtYXgpKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIF9yYW5kb21GbG9hdChtaW4sIG1heCk7XG59O1xuUmFuZG9tLnNpZ24gPSBmdW5jdGlvbiBzaWduKHByb2IpIHtcbiAgICBwcm9iID0gcHJvYiAhPT0gdW5kZWZpbmVkID8gcHJvYiA6IDAuNTtcbiAgICByZXR1cm4gUkFORCgpIDwgcHJvYiA/IDEgOiAtMTtcbn07XG5SYW5kb20uYm9vbCA9IGZ1bmN0aW9uIGJvb2wocHJvYikge1xuICAgIHByb2IgPSBwcm9iICE9PSB1bmRlZmluZWQgPyBwcm9iIDogMC41O1xuICAgIHJldHVybiBSQU5EKCkgPCBwcm9iO1xufTtcbm1vZHVsZS5leHBvcnRzID0gUmFuZG9tOyIsInZhciBVdGlsaXRpZXMgPSB7fTtcblV0aWxpdGllcy5jbGFtcCA9IGZ1bmN0aW9uIGNsYW1wKHZhbHVlLCByYW5nZSkge1xuICAgIHJldHVybiBNYXRoLm1heChNYXRoLm1pbih2YWx1ZSwgcmFuZ2VbMV0pLCByYW5nZVswXSk7XG59O1xuVXRpbGl0aWVzLmxlbmd0aCA9IGZ1bmN0aW9uIGxlbmd0aChhcnJheSkge1xuICAgIHZhciBkaXN0YW5jZVNxdWFyZWQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGlzdGFuY2VTcXVhcmVkICs9IGFycmF5W2ldICogYXJyYXlbaV07XG4gICAgfVxuICAgIHJldHVybiBNYXRoLnNxcnQoZGlzdGFuY2VTcXVhcmVkKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxpdGllczsiLCJmdW5jdGlvbiBWZWN0b3IoeCwgeSwgeikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5zZXQoeCk7XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgdGhpcy55ID0geSB8fCAwO1xuICAgICAgICB0aGlzLnogPSB6IHx8IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xufVxudmFyIF9yZWdpc3RlciA9IG5ldyBWZWN0b3IoMCwgMCwgMCk7XG5WZWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCh2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHRoaXMueCArIHYueCwgdGhpcy55ICsgdi55LCB0aGlzLnogKyB2LnopO1xufTtcblZlY3Rvci5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gc3ViKHYpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgdGhpcy54IC0gdi54LCB0aGlzLnkgLSB2LnksIHRoaXMueiAtIHYueik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5tdWx0ID0gZnVuY3Rpb24gbXVsdChyKSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHIgKiB0aGlzLngsIHIgKiB0aGlzLnksIHIgKiB0aGlzLnopO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZGl2ID0gZnVuY3Rpb24gZGl2KHIpIHtcbiAgICByZXR1cm4gdGhpcy5tdWx0KDEgLyByKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmNyb3NzID0gZnVuY3Rpb24gY3Jvc3Modikge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciB2eCA9IHYueDtcbiAgICB2YXIgdnkgPSB2Lnk7XG4gICAgdmFyIHZ6ID0gdi56O1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB6ICogdnkgLSB5ICogdnosIHggKiB2eiAtIHogKiB2eCwgeSAqIHZ4IC0geCAqIHZ5KTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyh2KSB7XG4gICAgcmV0dXJuIHYueCA9PT0gdGhpcy54ICYmIHYueSA9PT0gdGhpcy55ICYmIHYueiA9PT0gdGhpcy56O1xufTtcblZlY3Rvci5wcm90b3R5cGUucm90YXRlWCA9IGZ1bmN0aW9uIHJvdGF0ZVgodGhldGEpIHtcbiAgICB2YXIgeCA9IHRoaXMueDtcbiAgICB2YXIgeSA9IHRoaXMueTtcbiAgICB2YXIgeiA9IHRoaXMuejtcbiAgICB2YXIgY29zVGhldGEgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgdmFyIHNpblRoZXRhID0gTWF0aC5zaW4odGhldGEpO1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCB4LCB5ICogY29zVGhldGEgLSB6ICogc2luVGhldGEsIHkgKiBzaW5UaGV0YSArIHogKiBjb3NUaGV0YSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5yb3RhdGVZID0gZnVuY3Rpb24gcm90YXRlWSh0aGV0YSkge1xuICAgIHZhciB4ID0gdGhpcy54O1xuICAgIHZhciB5ID0gdGhpcy55O1xuICAgIHZhciB6ID0gdGhpcy56O1xuICAgIHZhciBjb3NUaGV0YSA9IE1hdGguY29zKHRoZXRhKTtcbiAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbChfcmVnaXN0ZXIsIHogKiBzaW5UaGV0YSArIHggKiBjb3NUaGV0YSwgeSwgeiAqIGNvc1RoZXRhIC0geCAqIHNpblRoZXRhKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJvdGF0ZVogPSBmdW5jdGlvbiByb3RhdGVaKHRoZXRhKSB7XG4gICAgdmFyIHggPSB0aGlzLng7XG4gICAgdmFyIHkgPSB0aGlzLnk7XG4gICAgdmFyIHogPSB0aGlzLno7XG4gICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuICAgIHZhciBzaW5UaGV0YSA9IE1hdGguc2luKHRoZXRhKTtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKF9yZWdpc3RlciwgeCAqIGNvc1RoZXRhIC0geSAqIHNpblRoZXRhLCB4ICogc2luVGhldGEgKyB5ICogY29zVGhldGEsIHopO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gZG90KHYpIHtcbiAgICByZXR1cm4gdGhpcy54ICogdi54ICsgdGhpcy55ICogdi55ICsgdGhpcy56ICogdi56O1xufTtcblZlY3Rvci5wcm90b3R5cGUubm9ybVNxdWFyZWQgPSBmdW5jdGlvbiBub3JtU3F1YXJlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5ub3JtID0gZnVuY3Rpb24gbm9ybSgpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubm9ybVNxdWFyZWQoKSk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiBub3JtYWxpemUobGVuZ3RoKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICAgIGxlbmd0aCA9IDE7XG4gICAgdmFyIG5vcm0gPSB0aGlzLm5vcm0oKTtcbiAgICBpZiAobm9ybSA+IDFlLTcpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcy5tdWx0KGxlbmd0aCAvIG5vcm0pKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBfc2V0WFlaLmNhbGwoX3JlZ2lzdGVyLCBsZW5ndGgsIDAsIDApO1xufTtcblZlY3Rvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLmlzWmVybyA9IGZ1bmN0aW9uIGlzWmVybygpIHtcbiAgICByZXR1cm4gISh0aGlzLnggfHwgdGhpcy55IHx8IHRoaXMueik7XG59O1xuZnVuY3Rpb24gX3NldFhZWih4LCB5LCB6KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMueiA9IHo7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBfc2V0RnJvbUFycmF5KHYpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIHZbMF0sIHZbMV0sIHZbMl0gfHwgMCk7XG59XG5mdW5jdGlvbiBfc2V0RnJvbVZlY3Rvcih2KSB7XG4gICAgcmV0dXJuIF9zZXRYWVouY2FsbCh0aGlzLCB2LngsIHYueSwgdi56KTtcbn1cbmZ1bmN0aW9uIF9zZXRGcm9tTnVtYmVyKHgpIHtcbiAgICByZXR1cm4gX3NldFhZWi5jYWxsKHRoaXMsIHgsIDAsIDApO1xufVxuVmVjdG9yLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQodikge1xuICAgIGlmICh2IGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbUFycmF5LmNhbGwodGhpcywgdik7XG4gICAgaWYgKHR5cGVvZiB2ID09PSAnbnVtYmVyJylcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tTnVtYmVyLmNhbGwodGhpcywgdik7XG4gICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwodGhpcywgdik7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5zZXRYWVogPSBmdW5jdGlvbiAoeCwgeSwgeikge1xuICAgIHJldHVybiBfc2V0WFlaLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5zZXQxRCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIF9zZXRGcm9tTnVtYmVyLmNhbGwodGhpcywgeCk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiBwdXQodikge1xuICAgIGlmICh0aGlzID09PSBfcmVnaXN0ZXIpXG4gICAgICAgIF9zZXRGcm9tVmVjdG9yLmNhbGwodiwgX3JlZ2lzdGVyKTtcbiAgICBlbHNlXG4gICAgICAgIF9zZXRGcm9tVmVjdG9yLmNhbGwodiwgdGhpcyk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHJldHVybiBfc2V0WFlaLmNhbGwodGhpcywgMCwgMCwgMCk7XG59O1xuVmVjdG9yLnByb3RvdHlwZS5jYXAgPSBmdW5jdGlvbiBjYXAoY2FwKSB7XG4gICAgaWYgKGNhcCA9PT0gSW5maW5pdHkpXG4gICAgICAgIHJldHVybiBfc2V0RnJvbVZlY3Rvci5jYWxsKF9yZWdpc3RlciwgdGhpcyk7XG4gICAgdmFyIG5vcm0gPSB0aGlzLm5vcm0oKTtcbiAgICBpZiAobm9ybSA+IGNhcClcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwoX3JlZ2lzdGVyLCB0aGlzLm11bHQoY2FwIC8gbm9ybSkpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIF9zZXRGcm9tVmVjdG9yLmNhbGwoX3JlZ2lzdGVyLCB0aGlzKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnByb2plY3QgPSBmdW5jdGlvbiBwcm9qZWN0KG4pIHtcbiAgICByZXR1cm4gbi5tdWx0KHRoaXMuZG90KG4pKTtcbn07XG5WZWN0b3IucHJvdG90eXBlLnJlZmxlY3RBY3Jvc3MgPSBmdW5jdGlvbiByZWZsZWN0QWNyb3NzKG4pIHtcbiAgICBuLm5vcm1hbGl6ZSgpLnB1dChuKTtcbiAgICByZXR1cm4gX3NldEZyb21WZWN0b3IoX3JlZ2lzdGVyLCB0aGlzLnN1Yih0aGlzLnByb2plY3QobikubXVsdCgyKSkpO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMueCxcbiAgICAgICAgdGhpcy55LFxuICAgICAgICB0aGlzLnpcbiAgICBdO1xufTtcblZlY3Rvci5wcm90b3R5cGUuZ2V0MUQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMueDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvcjsiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBVdGlsaXRpZXMgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9VdGlsaXRpZXMnKTtcbnZhciBHZW5lcmljU3luYyA9IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvR2VuZXJpY1N5bmMnKTtcbnZhciBNb3VzZVN5bmMgPSByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL01vdXNlU3luYycpO1xudmFyIFRvdWNoU3luYyA9IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvVG91Y2hTeW5jJyk7XG5HZW5lcmljU3luYy5yZWdpc3Rlcih7XG4gICAgJ21vdXNlJzogTW91c2VTeW5jLFxuICAgICd0b3VjaCc6IFRvdWNoU3luY1xufSk7XG5mdW5jdGlvbiBEcmFnZ2FibGUob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoRHJhZ2dhYmxlLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9wb3NpdGlvblN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX2RpZmZlcmVudGlhbCA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLnN5bmMgPSBuZXcgR2VuZXJpY1N5bmMoW1xuICAgICAgICAnbW91c2UnLFxuICAgICAgICAndG91Y2gnXG4gICAgXSwgeyBzY2FsZTogdGhpcy5vcHRpb25zLnNjYWxlIH0pO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLnN5bmMpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRPdXRwdXQpO1xuICAgIF9iaW5kRXZlbnRzLmNhbGwodGhpcyk7XG59XG52YXIgX2RpcmVjdGlvbiA9IHtcbiAgICAgICAgeDogMSxcbiAgICAgICAgeTogMlxuICAgIH07XG5EcmFnZ2FibGUuRElSRUNUSU9OX1ggPSBfZGlyZWN0aW9uLng7XG5EcmFnZ2FibGUuRElSRUNUSU9OX1kgPSBfZGlyZWN0aW9uLnk7XG52YXIgX2NsYW1wID0gVXRpbGl0aWVzLmNsYW1wO1xuRHJhZ2dhYmxlLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBwcm9qZWN0aW9uOiBfZGlyZWN0aW9uLnggfCBfZGlyZWN0aW9uLnksXG4gICAgc2NhbGU6IDEsXG4gICAgeFJhbmdlOiBudWxsLFxuICAgIHlSYW5nZTogbnVsbCxcbiAgICBzbmFwWDogMCxcbiAgICBzbmFwWTogMCxcbiAgICB0cmFuc2l0aW9uOiB7IGR1cmF0aW9uOiAwIH1cbn07XG5mdW5jdGlvbiBfbWFwRGlmZmVyZW50aWFsKGRpZmZlcmVudGlhbCkge1xuICAgIHZhciBvcHRzID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBwcm9qZWN0aW9uID0gb3B0cy5wcm9qZWN0aW9uO1xuICAgIHZhciBzbmFwWCA9IG9wdHMuc25hcFg7XG4gICAgdmFyIHNuYXBZID0gb3B0cy5zbmFwWTtcbiAgICB2YXIgdHggPSBwcm9qZWN0aW9uICYgX2RpcmVjdGlvbi54ID8gZGlmZmVyZW50aWFsWzBdIDogMDtcbiAgICB2YXIgdHkgPSBwcm9qZWN0aW9uICYgX2RpcmVjdGlvbi55ID8gZGlmZmVyZW50aWFsWzFdIDogMDtcbiAgICBpZiAoc25hcFggPiAwKVxuICAgICAgICB0eCAtPSB0eCAlIHNuYXBYO1xuICAgIGlmIChzbmFwWSA+IDApXG4gICAgICAgIHR5IC09IHR5ICUgc25hcFk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgdHgsXG4gICAgICAgIHR5XG4gICAgXTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVTdGFydCgpIHtcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICh0aGlzLl9wb3NpdGlvblN0YXRlLmlzQWN0aXZlKCkpXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uU3RhdGUuaGFsdCgpO1xuICAgIHRoaXMuZXZlbnRPdXRwdXQuZW1pdCgnc3RhcnQnLCB7IHBvc2l0aW9uOiB0aGlzLmdldFBvc2l0aW9uKCkgfSk7XG59XG5mdW5jdGlvbiBfaGFuZGxlTW92ZShldmVudCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdGhpcy5fZGlmZmVyZW50aWFsID0gZXZlbnQucG9zaXRpb247XG4gICAgdmFyIG5ld0RpZmZlcmVudGlhbCA9IF9tYXBEaWZmZXJlbnRpYWwuY2FsbCh0aGlzLCB0aGlzLl9kaWZmZXJlbnRpYWwpO1xuICAgIHRoaXMuX2RpZmZlcmVudGlhbFswXSAtPSBuZXdEaWZmZXJlbnRpYWxbMF07XG4gICAgdGhpcy5fZGlmZmVyZW50aWFsWzFdIC09IG5ld0RpZmZlcmVudGlhbFsxXTtcbiAgICB2YXIgcG9zID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgIHBvc1swXSArPSBuZXdEaWZmZXJlbnRpYWxbMF07XG4gICAgcG9zWzFdICs9IG5ld0RpZmZlcmVudGlhbFsxXTtcbiAgICBpZiAob3B0aW9ucy54UmFuZ2UpIHtcbiAgICAgICAgdmFyIHhSYW5nZSA9IFtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnhSYW5nZVswXSArIDAuNSAqIG9wdGlvbnMuc25hcFgsXG4gICAgICAgICAgICAgICAgb3B0aW9ucy54UmFuZ2VbMV0gLSAwLjUgKiBvcHRpb25zLnNuYXBYXG4gICAgICAgICAgICBdO1xuICAgICAgICBwb3NbMF0gPSBfY2xhbXAocG9zWzBdLCB4UmFuZ2UpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy55UmFuZ2UpIHtcbiAgICAgICAgdmFyIHlSYW5nZSA9IFtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnlSYW5nZVswXSArIDAuNSAqIG9wdGlvbnMuc25hcFksXG4gICAgICAgICAgICAgICAgb3B0aW9ucy55UmFuZ2VbMV0gLSAwLjUgKiBvcHRpb25zLnNuYXBZXG4gICAgICAgICAgICBdO1xuICAgICAgICBwb3NbMV0gPSBfY2xhbXAocG9zWzFdLCB5UmFuZ2UpO1xuICAgIH1cbiAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ3VwZGF0ZScsIHsgcG9zaXRpb246IHBvcyB9KTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVFbmQoKSB7XG4gICAgaWYgKCF0aGlzLl9hY3RpdmUpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLmV2ZW50T3V0cHV0LmVtaXQoJ2VuZCcsIHsgcG9zaXRpb246IHRoaXMuZ2V0UG9zaXRpb24oKSB9KTtcbn1cbmZ1bmN0aW9uIF9iaW5kRXZlbnRzKCkge1xuICAgIHRoaXMuc3luYy5vbignc3RhcnQnLCBfaGFuZGxlU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zeW5jLm9uKCd1cGRhdGUnLCBfaGFuZGxlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnN5bmMub24oJ2VuZCcsIF9oYW5kbGVFbmQuYmluZCh0aGlzKSk7XG59XG5EcmFnZ2FibGUucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB2YXIgY3VycmVudE9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMucHJvamVjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBwcm9qID0gb3B0aW9ucy5wcm9qZWN0aW9uO1xuICAgICAgICB0aGlzLm9wdGlvbnMucHJvamVjdGlvbiA9IDA7XG4gICAgICAgIFtcbiAgICAgICAgICAgICd4JyxcbiAgICAgICAgICAgICd5J1xuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgaWYgKHByb2ouaW5kZXhPZih2YWwpICE9PSAtMSlcbiAgICAgICAgICAgICAgICBjdXJyZW50T3B0aW9ucy5wcm9qZWN0aW9uIHw9IF9kaXJlY3Rpb25bdmFsXTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNjYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3VycmVudE9wdGlvbnMuc2NhbGUgPSBvcHRpb25zLnNjYWxlO1xuICAgICAgICB0aGlzLnN5bmMuc2V0T3B0aW9ucyh7IHNjYWxlOiBvcHRpb25zLnNjYWxlIH0pO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy54UmFuZ2UgIT09IHVuZGVmaW5lZClcbiAgICAgICAgY3VycmVudE9wdGlvbnMueFJhbmdlID0gb3B0aW9ucy54UmFuZ2U7XG4gICAgaWYgKG9wdGlvbnMueVJhbmdlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGN1cnJlbnRPcHRpb25zLnlSYW5nZSA9IG9wdGlvbnMueVJhbmdlO1xuICAgIGlmIChvcHRpb25zLnNuYXBYICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGN1cnJlbnRPcHRpb25zLnNuYXBYID0gb3B0aW9ucy5zbmFwWDtcbiAgICBpZiAob3B0aW9ucy5zbmFwWSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBjdXJyZW50T3B0aW9ucy5zbmFwWSA9IG9wdGlvbnMuc25hcFk7XG59O1xuRHJhZ2dhYmxlLnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wb3NpdGlvblN0YXRlLmdldCgpO1xufTtcbkRyYWdnYWJsZS5wcm90b3R5cGUuc2V0UmVsYXRpdmVQb3NpdGlvbiA9IGZ1bmN0aW9uIHNldFJlbGF0aXZlUG9zaXRpb24ocG9zaXRpb24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgdmFyIGN1cnJQb3MgPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIHJlbGF0aXZlUG9zaXRpb24gPSBbXG4gICAgICAgICAgICBjdXJyUG9zWzBdICsgcG9zaXRpb25bMF0sXG4gICAgICAgICAgICBjdXJyUG9zWzFdICsgcG9zaXRpb25bMV1cbiAgICAgICAgXTtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHJlbGF0aXZlUG9zaXRpb24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5EcmFnZ2FibGUucHJvdG90eXBlLnNldFBvc2l0aW9uID0gZnVuY3Rpb24gc2V0UG9zaXRpb24ocG9zaXRpb24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uU3RhdGUuaXNBY3RpdmUoKSlcbiAgICAgICAgdGhpcy5fcG9zaXRpb25TdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fcG9zaXRpb25TdGF0ZS5zZXQocG9zaXRpb24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5EcmFnZ2FibGUucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbn07XG5EcmFnZ2FibGUucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbiBkZWFjdGl2YXRlKCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xufTtcbkRyYWdnYWJsZS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgIHRoaXMuX2FjdGl2ZSA9ICF0aGlzLl9hY3RpdmU7XG59O1xuRHJhZ2dhYmxlLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS50cmFuc2xhdGUocG9zWzBdLCBwb3NbMV0pLFxuICAgICAgICB0YXJnZXQ6IHRhcmdldFxuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGU7IiwidmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gRmFkZXIob3B0aW9ucywgc3RhcnRTdGF0ZSkge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoRmFkZXIuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgaWYgKCFzdGFydFN0YXRlKVxuICAgICAgICBzdGFydFN0YXRlID0gMDtcbiAgICB0aGlzLnRyYW5zaXRpb25IZWxwZXIgPSBuZXcgVHJhbnNpdGlvbmFibGUoc3RhcnRTdGF0ZSk7XG59XG5GYWRlci5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgY3VsbDogZmFsc2UsXG4gICAgdHJhbnNpdGlvbjogdHJ1ZSxcbiAgICBwdWxzZUluVHJhbnNpdGlvbjogdHJ1ZSxcbiAgICBwdWxzZU91dFRyYW5zaXRpb246IHRydWVcbn07XG5GYWRlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbkZhZGVyLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gc2hvdyh0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uIHx8IHRoaXMub3B0aW9ucy50cmFuc2l0aW9uO1xuICAgIHRoaXMuc2V0KDEsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn07XG5GYWRlci5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uIGhpZGUodHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0cmFuc2l0aW9uID0gdHJhbnNpdGlvbiB8fCB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICB0aGlzLnNldCgwLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG59O1xuRmFkZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChzdGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmhhbHQoKTtcbiAgICB0aGlzLnRyYW5zaXRpb25IZWxwZXIuc2V0KHN0YXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG59O1xuRmFkZXIucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMudHJhbnNpdGlvbkhlbHBlci5oYWx0KCk7XG59O1xuRmFkZXIucHJvdG90eXBlLmlzVmlzaWJsZSA9IGZ1bmN0aW9uIGlzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2l0aW9uSGVscGVyLmdldCgpID4gMDtcbn07XG5GYWRlci5wcm90b3R5cGUubW9kaWZ5ID0gZnVuY3Rpb24gbW9kaWZ5KHRhcmdldCkge1xuICAgIHZhciBjdXJyT3BhY2l0eSA9IHRoaXMudHJhbnNpdGlvbkhlbHBlci5nZXQoKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLmN1bGwgJiYgIWN1cnJPcGFjaXR5KVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGN1cnJPcGFjaXR5LFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZhZGVyOyIsImZ1bmN0aW9uIE1vZGlmaWVyQ2hhaW4oKSB7XG4gICAgdGhpcy5fY2hhaW4gPSBbXTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgdGhpcy5hZGRNb2RpZmllci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuTW9kaWZpZXJDaGFpbi5wcm90b3R5cGUuYWRkTW9kaWZpZXIgPSBmdW5jdGlvbiBhZGRNb2RpZmllcih2YXJhcmdzKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5fY2hhaW4sIGFyZ3VtZW50cyk7XG59O1xuTW9kaWZpZXJDaGFpbi5wcm90b3R5cGUucmVtb3ZlTW9kaWZpZXIgPSBmdW5jdGlvbiByZW1vdmVNb2RpZmllcihtb2RpZmllcikge1xuICAgIHZhciBpbmRleCA9IHRoaXMuX2NoYWluLmluZGV4T2YobW9kaWZpZXIpO1xuICAgIGlmIChpbmRleCA8IDApXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9jaGFpbi5zcGxpY2UoaW5kZXgsIDEpO1xufTtcbk1vZGlmaWVyQ2hhaW4ucHJvdG90eXBlLm1vZGlmeSA9IGZ1bmN0aW9uIG1vZGlmeShpbnB1dCkge1xuICAgIHZhciBjaGFpbiA9IHRoaXMuX2NoYWluO1xuICAgIHZhciByZXN1bHQgPSBpbnB1dDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYWluLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCA9IGNoYWluW2ldLm1vZGlmeShyZXN1bHQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gTW9kaWZpZXJDaGFpbjsiLCJ2YXIgTW9kaWZpZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9Nb2RpZmllcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIFN0YXRlTW9kaWZpZXIob3B0aW9ucykge1xuICAgIHRoaXMuX3RyYW5zZm9ybVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlVHJhbnNmb3JtKFRyYW5zZm9ybS5pZGVudGl0eSk7XG4gICAgdGhpcy5fb3BhY2l0eVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDEpO1xuICAgIHRoaXMuX29yaWdpblN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX2FsaWduU3RhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5fc2l6ZVN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMuX21vZGlmaWVyID0gbmV3IE1vZGlmaWVyKHtcbiAgICAgICAgdHJhbnNmb3JtOiB0aGlzLl90cmFuc2Zvcm1TdGF0ZSxcbiAgICAgICAgb3BhY2l0eTogdGhpcy5fb3BhY2l0eVN0YXRlLFxuICAgICAgICBvcmlnaW46IG51bGwsXG4gICAgICAgIGFsaWduOiBudWxsLFxuICAgICAgICBzaXplOiBudWxsXG4gICAgfSk7XG4gICAgdGhpcy5faGFzT3JpZ2luID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQWxpZ24gPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNTaXplID0gZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMudHJhbnNmb3JtKVxuICAgICAgICAgICAgdGhpcy5zZXRUcmFuc2Zvcm0ob3B0aW9ucy50cmFuc2Zvcm0pO1xuICAgICAgICBpZiAob3B0aW9ucy5vcGFjaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0aGlzLnNldE9wYWNpdHkob3B0aW9ucy5vcGFjaXR5KTtcbiAgICAgICAgaWYgKG9wdGlvbnMub3JpZ2luKVxuICAgICAgICAgICAgdGhpcy5zZXRPcmlnaW4ob3B0aW9ucy5vcmlnaW4pO1xuICAgICAgICBpZiAob3B0aW9ucy5hbGlnbilcbiAgICAgICAgICAgIHRoaXMuc2V0QWxpZ24ob3B0aW9ucy5hbGlnbik7XG4gICAgICAgIGlmIChvcHRpb25zLnNpemUpXG4gICAgICAgICAgICB0aGlzLnNldFNpemUob3B0aW9ucy5zaXplKTtcbiAgICB9XG59XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBzZXRUcmFuc2Zvcm0odHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX3RyYW5zZm9ybVN0YXRlLnNldCh0cmFuc2Zvcm0sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRPcGFjaXR5ID0gZnVuY3Rpb24gc2V0T3BhY2l0eShvcGFjaXR5LCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX29wYWNpdHlTdGF0ZS5zZXQob3BhY2l0eSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLnNldE9yaWdpbiA9IGZ1bmN0aW9uIHNldE9yaWdpbihvcmlnaW4sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKG9yaWdpbiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzT3JpZ2luKSB7XG4gICAgICAgICAgICB0aGlzLl9tb2RpZmllci5vcmlnaW5Gcm9tKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faGFzT3JpZ2luID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSBlbHNlIGlmICghdGhpcy5faGFzT3JpZ2luKSB7XG4gICAgICAgIHRoaXMuX2hhc09yaWdpbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX21vZGlmaWVyLm9yaWdpbkZyb20odGhpcy5fb3JpZ2luU3RhdGUpO1xuICAgIH1cbiAgICB0aGlzLl9vcmlnaW5TdGF0ZS5zZXQob3JpZ2luLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuc2V0QWxpZ24gPSBmdW5jdGlvbiBzZXRPcmlnaW4oYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKGFsaWduID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNBbGlnbikge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXIuYWxpZ25Gcm9tKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5faGFzQWxpZ24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9oYXNBbGlnbikge1xuICAgICAgICB0aGlzLl9oYXNBbGlnbiA9IHRydWU7XG4gICAgICAgIHRoaXMuX21vZGlmaWVyLmFsaWduRnJvbSh0aGlzLl9hbGlnblN0YXRlKTtcbiAgICB9XG4gICAgdGhpcy5fYWxpZ25TdGF0ZS5zZXQoYWxpZ24sIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIGlmIChzaXplID09PSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNTaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9tb2RpZmllci5zaXplRnJvbShudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc1NpemUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9oYXNTaXplKSB7XG4gICAgICAgIHRoaXMuX2hhc1NpemUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9tb2RpZmllci5zaXplRnJvbSh0aGlzLl9zaXplU3RhdGUpO1xuICAgIH1cbiAgICB0aGlzLl9zaXplU3RhdGUuc2V0KHNpemUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1TdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fb3BhY2l0eVN0YXRlLmhhbHQoKTtcbiAgICB0aGlzLl9vcmlnaW5TdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fYWxpZ25TdGF0ZS5oYWx0KCk7XG4gICAgdGhpcy5fc2l6ZVN0YXRlLmhhbHQoKTtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybVN0YXRlLmdldCgpO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmdldEZpbmFsVHJhbnNmb3JtID0gZnVuY3Rpb24gZ2V0RmluYWxUcmFuc2Zvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybVN0YXRlLmdldEZpbmFsKCk7XG59O1xuU3RhdGVNb2RpZmllci5wcm90b3R5cGUuZ2V0T3BhY2l0eSA9IGZ1bmN0aW9uIGdldE9wYWNpdHkoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wYWNpdHlTdGF0ZS5nZXQoKTtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRPcmlnaW4gPSBmdW5jdGlvbiBnZXRPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc09yaWdpbiA/IHRoaXMuX29yaWdpblN0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5nZXRBbGlnbiA9IGZ1bmN0aW9uIGdldEFsaWduKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNBbGlnbiA/IHRoaXMuX2FsaWduU3RhdGUuZ2V0KCkgOiBudWxsO1xufTtcblN0YXRlTW9kaWZpZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9oYXNTaXplID8gdGhpcy5fc2l6ZVN0YXRlLmdldCgpIDogbnVsbDtcbn07XG5TdGF0ZU1vZGlmaWVyLnByb3RvdHlwZS5tb2RpZnkgPSBmdW5jdGlvbiBtb2RpZnkodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGlmaWVyLm1vZGlmeSh0YXJnZXQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3RhdGVNb2RpZmllcjsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBQaHlzaWNzRW5naW5lKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFBoeXNpY3NFbmdpbmUuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX3BhcnRpY2xlcyA9IFtdO1xuICAgIHRoaXMuX2JvZGllcyA9IFtdO1xuICAgIHRoaXMuX2FnZW50cyA9IHt9O1xuICAgIHRoaXMuX2ZvcmNlcyA9IFtdO1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzID0gW107XG4gICAgdGhpcy5fYnVmZmVyID0gMDtcbiAgICB0aGlzLl9wcmV2VGltZSA9IG5vdygpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9ldmVudEhhbmRsZXIgPSBudWxsO1xuICAgIHRoaXMuX2N1cnJBZ2VudElkID0gMDtcbiAgICB0aGlzLl9oYXNCb2RpZXMgPSBmYWxzZTtcbn1cbnZhciBUSU1FU1RFUCA9IDE3O1xudmFyIE1JTl9USU1FX1NURVAgPSAxMDAwIC8gMTIwO1xudmFyIE1BWF9USU1FX1NURVAgPSAxNztcblBoeXNpY3NFbmdpbmUuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGNvbnN0cmFpbnRTdGVwczogMSxcbiAgICBzbGVlcFRvbGVyYW5jZTogMWUtN1xufTtcbnZhciBub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBEYXRlLm5vdztcbiAgICB9KCk7XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdHMpXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnNba2V5XSlcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0c1trZXldO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmFkZEJvZHkgPSBmdW5jdGlvbiBhZGRCb2R5KGJvZHkpIHtcbiAgICBib2R5Ll9lbmdpbmUgPSB0aGlzO1xuICAgIGlmIChib2R5LmlzQm9keSkge1xuICAgICAgICB0aGlzLl9ib2RpZXMucHVzaChib2R5KTtcbiAgICAgICAgdGhpcy5faGFzQm9kaWVzID0gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgdGhpcy5fcGFydGljbGVzLnB1c2goYm9keSk7XG4gICAgcmV0dXJuIGJvZHk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUucmVtb3ZlQm9keSA9IGZ1bmN0aW9uIHJlbW92ZUJvZHkoYm9keSkge1xuICAgIHZhciBhcnJheSA9IGJvZHkuaXNCb2R5ID8gdGhpcy5fYm9kaWVzIDogdGhpcy5fcGFydGljbGVzO1xuICAgIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YoYm9keSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLl9hZ2VudHMpLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgdGhpcy5kZXRhY2hGcm9tKGksIGJvZHkpO1xuICAgICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nZXRCb2RpZXMoKS5sZW5ndGggPT09IDApXG4gICAgICAgIHRoaXMuX2hhc0JvZGllcyA9IGZhbHNlO1xufTtcbmZ1bmN0aW9uIF9tYXBBZ2VudEFycmF5KGFnZW50KSB7XG4gICAgaWYgKGFnZW50LmFwcGx5Rm9yY2UpXG4gICAgICAgIHJldHVybiB0aGlzLl9mb3JjZXM7XG4gICAgaWYgKGFnZW50LmFwcGx5Q29uc3RyYWludClcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnN0cmFpbnRzO1xufVxuZnVuY3Rpb24gX2F0dGFjaE9uZShhZ2VudCwgdGFyZ2V0cywgc291cmNlKSB7XG4gICAgaWYgKHRhcmdldHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgdGFyZ2V0cyA9IHRoaXMuZ2V0UGFydGljbGVzQW5kQm9kaWVzKCk7XG4gICAgaWYgKCEodGFyZ2V0cyBpbnN0YW5jZW9mIEFycmF5KSlcbiAgICAgICAgdGFyZ2V0cyA9IFt0YXJnZXRzXTtcbiAgICB0aGlzLl9hZ2VudHNbdGhpcy5fY3VyckFnZW50SWRdID0ge1xuICAgICAgICBhZ2VudDogYWdlbnQsXG4gICAgICAgIHRhcmdldHM6IHRhcmdldHMsXG4gICAgICAgIHNvdXJjZTogc291cmNlXG4gICAgfTtcbiAgICBfbWFwQWdlbnRBcnJheS5jYWxsKHRoaXMsIGFnZW50KS5wdXNoKHRoaXMuX2N1cnJBZ2VudElkKTtcbiAgICByZXR1cm4gdGhpcy5fY3VyckFnZW50SWQrKztcbn1cblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uIGF0dGFjaChhZ2VudHMsIHRhcmdldHMsIHNvdXJjZSkge1xuICAgIGlmIChhZ2VudHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICB2YXIgYWdlbnRJRHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZ2VudHMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICBhZ2VudElEc1tpXSA9IF9hdHRhY2hPbmUuY2FsbCh0aGlzLCBhZ2VudHNbaV0sIHRhcmdldHMsIHNvdXJjZSk7XG4gICAgICAgIHJldHVybiBhZ2VudElEcztcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIF9hdHRhY2hPbmUuY2FsbCh0aGlzLCBhZ2VudHMsIHRhcmdldHMsIHNvdXJjZSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuYXR0YWNoVG8gPSBmdW5jdGlvbiBhdHRhY2hUbyhhZ2VudElELCB0YXJnZXQpIHtcbiAgICBfZ2V0Qm91bmRBZ2VudC5jYWxsKHRoaXMsIGFnZW50SUQpLnRhcmdldHMucHVzaCh0YXJnZXQpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmRldGFjaCA9IGZ1bmN0aW9uIGRldGFjaChpZCkge1xuICAgIHZhciBhZ2VudCA9IHRoaXMuZ2V0QWdlbnQoaWQpO1xuICAgIHZhciBhZ2VudEFycmF5ID0gX21hcEFnZW50QXJyYXkuY2FsbCh0aGlzLCBhZ2VudCk7XG4gICAgdmFyIGluZGV4ID0gYWdlbnRBcnJheS5pbmRleE9mKGlkKTtcbiAgICBhZ2VudEFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgZGVsZXRlIHRoaXMuX2FnZW50c1tpZF07XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZGV0YWNoRnJvbSA9IGZ1bmN0aW9uIGRldGFjaEZyb20oaWQsIHRhcmdldCkge1xuICAgIHZhciBib3VuZEFnZW50ID0gX2dldEJvdW5kQWdlbnQuY2FsbCh0aGlzLCBpZCk7XG4gICAgaWYgKGJvdW5kQWdlbnQuc291cmNlID09PSB0YXJnZXQpXG4gICAgICAgIHRoaXMuZGV0YWNoKGlkKTtcbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHRhcmdldHMgPSBib3VuZEFnZW50LnRhcmdldHM7XG4gICAgICAgIHZhciBpbmRleCA9IHRhcmdldHMuaW5kZXhPZih0YXJnZXQpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSlcbiAgICAgICAgICAgIHRhcmdldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZGV0YWNoQWxsID0gZnVuY3Rpb24gZGV0YWNoQWxsKCkge1xuICAgIHRoaXMuX2FnZW50cyA9IHt9O1xuICAgIHRoaXMuX2ZvcmNlcyA9IFtdO1xuICAgIHRoaXMuX2NvbnN0cmFpbnRzID0gW107XG4gICAgdGhpcy5fY3VyckFnZW50SWQgPSAwO1xufTtcbmZ1bmN0aW9uIF9nZXRCb3VuZEFnZW50KGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FnZW50c1tpZF07XG59XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5nZXRBZ2VudCA9IGZ1bmN0aW9uIGdldEFnZW50KGlkKSB7XG4gICAgcmV0dXJuIF9nZXRCb3VuZEFnZW50LmNhbGwodGhpcywgaWQpLmFnZW50O1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldFBhcnRpY2xlcyA9IGZ1bmN0aW9uIGdldFBhcnRpY2xlcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcGFydGljbGVzO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldEJvZGllcyA9IGZ1bmN0aW9uIGdldEJvZGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5fYm9kaWVzO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmdldFBhcnRpY2xlc0FuZEJvZGllcyA9IGZ1bmN0aW9uIGdldFBhcnRpY2xlc0FuZEJvZGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQYXJ0aWNsZXMoKS5jb25jYXQodGhpcy5nZXRCb2RpZXMoKSk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZm9yRWFjaFBhcnRpY2xlID0gZnVuY3Rpb24gZm9yRWFjaFBhcnRpY2xlKGZuLCBkdCkge1xuICAgIHZhciBwYXJ0aWNsZXMgPSB0aGlzLmdldFBhcnRpY2xlcygpO1xuICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuID0gcGFydGljbGVzLmxlbmd0aDsgaW5kZXggPCBsZW47IGluZGV4KyspXG4gICAgICAgIGZuLmNhbGwodGhpcywgcGFydGljbGVzW2luZGV4XSwgZHQpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLmZvckVhY2hCb2R5ID0gZnVuY3Rpb24gZm9yRWFjaEJvZHkoZm4sIGR0KSB7XG4gICAgaWYgKCF0aGlzLl9oYXNCb2RpZXMpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgYm9kaWVzID0gdGhpcy5nZXRCb2RpZXMoKTtcbiAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbiA9IGJvZGllcy5sZW5ndGg7IGluZGV4IDwgbGVuOyBpbmRleCsrKVxuICAgICAgICBmbi5jYWxsKHRoaXMsIGJvZGllc1tpbmRleF0sIGR0KTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbiwgZHQpIHtcbiAgICB0aGlzLmZvckVhY2hQYXJ0aWNsZShmbiwgZHQpO1xuICAgIHRoaXMuZm9yRWFjaEJvZHkoZm4sIGR0KTtcbn07XG5mdW5jdGlvbiBfdXBkYXRlRm9yY2UoaW5kZXgpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IF9nZXRCb3VuZEFnZW50LmNhbGwodGhpcywgdGhpcy5fZm9yY2VzW2luZGV4XSk7XG4gICAgYm91bmRBZ2VudC5hZ2VudC5hcHBseUZvcmNlKGJvdW5kQWdlbnQudGFyZ2V0cywgYm91bmRBZ2VudC5zb3VyY2UpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZUZvcmNlcygpIHtcbiAgICBmb3IgKHZhciBpbmRleCA9IHRoaXMuX2ZvcmNlcy5sZW5ndGggLSAxOyBpbmRleCA+IC0xOyBpbmRleC0tKVxuICAgICAgICBfdXBkYXRlRm9yY2UuY2FsbCh0aGlzLCBpbmRleCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlQ29uc3RyYWludChpbmRleCwgZHQpIHtcbiAgICB2YXIgYm91bmRBZ2VudCA9IHRoaXMuX2FnZW50c1t0aGlzLl9jb25zdHJhaW50c1tpbmRleF1dO1xuICAgIHJldHVybiBib3VuZEFnZW50LmFnZW50LmFwcGx5Q29uc3RyYWludChib3VuZEFnZW50LnRhcmdldHMsIGJvdW5kQWdlbnQuc291cmNlLCBkdCk7XG59XG5mdW5jdGlvbiBfdXBkYXRlQ29uc3RyYWludHMoZHQpIHtcbiAgICB2YXIgaXRlcmF0aW9uID0gMDtcbiAgICB3aGlsZSAoaXRlcmF0aW9uIDwgdGhpcy5vcHRpb25zLmNvbnN0cmFpbnRTdGVwcykge1xuICAgICAgICBmb3IgKHZhciBpbmRleCA9IHRoaXMuX2NvbnN0cmFpbnRzLmxlbmd0aCAtIDE7IGluZGV4ID4gLTE7IGluZGV4LS0pXG4gICAgICAgICAgICBfdXBkYXRlQ29uc3RyYWludC5jYWxsKHRoaXMsIGluZGV4LCBkdCk7XG4gICAgICAgIGl0ZXJhdGlvbisrO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF91cGRhdGVWZWxvY2l0aWVzKHBhcnRpY2xlLCBkdCkge1xuICAgIHBhcnRpY2xlLmludGVncmF0ZVZlbG9jaXR5KGR0KTtcbn1cbmZ1bmN0aW9uIF91cGRhdGVBbmd1bGFyVmVsb2NpdGllcyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtKGR0KTtcbiAgICBib2R5LnVwZGF0ZUFuZ3VsYXJWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZU9yaWVudGF0aW9ucyhib2R5LCBkdCkge1xuICAgIGJvZHkuaW50ZWdyYXRlT3JpZW50YXRpb24oZHQpO1xufVxuZnVuY3Rpb24gX3VwZGF0ZVBvc2l0aW9ucyhwYXJ0aWNsZSwgZHQpIHtcbiAgICBwYXJ0aWNsZS5pbnRlZ3JhdGVQb3NpdGlvbihkdCk7XG4gICAgcGFydGljbGUuZW1pdCgndXBkYXRlJywgcGFydGljbGUpO1xufVxuZnVuY3Rpb24gX2ludGVncmF0ZShkdCkge1xuICAgIF91cGRhdGVGb3JjZXMuY2FsbCh0aGlzLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoKF91cGRhdGVWZWxvY2l0aWVzLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoQm9keShfdXBkYXRlQW5ndWxhclZlbG9jaXRpZXMsIGR0KTtcbiAgICBfdXBkYXRlQ29uc3RyYWludHMuY2FsbCh0aGlzLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoQm9keShfdXBkYXRlT3JpZW50YXRpb25zLCBkdCk7XG4gICAgdGhpcy5mb3JFYWNoKF91cGRhdGVQb3NpdGlvbnMsIGR0KTtcbn1cbmZ1bmN0aW9uIF9nZXRFbmVyZ3lQYXJ0aWNsZXMoKSB7XG4gICAgdmFyIGVuZXJneSA9IDA7XG4gICAgdmFyIHBhcnRpY2xlRW5lcmd5ID0gMDtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHBhcnRpY2xlKSB7XG4gICAgICAgIHBhcnRpY2xlRW5lcmd5ID0gcGFydGljbGUuZ2V0RW5lcmd5KCk7XG4gICAgICAgIGVuZXJneSArPSBwYXJ0aWNsZUVuZXJneTtcbiAgICAgICAgaWYgKHBhcnRpY2xlRW5lcmd5IDwgcGFydGljbGUuc2xlZXBUb2xlcmFuY2UpXG4gICAgICAgICAgICBwYXJ0aWNsZS5zbGVlcCgpO1xuICAgIH0pO1xuICAgIHJldHVybiBlbmVyZ3k7XG59XG5mdW5jdGlvbiBfZ2V0RW5lcmd5Rm9yY2VzKCkge1xuICAgIHZhciBlbmVyZ3kgPSAwO1xuICAgIGZvciAodmFyIGluZGV4ID0gdGhpcy5fZm9yY2VzLmxlbmd0aCAtIDE7IGluZGV4ID4gLTE7IGluZGV4LS0pXG4gICAgICAgIGVuZXJneSArPSB0aGlzLl9mb3JjZXNbaW5kZXhdLmdldEVuZXJneSgpIHx8IDA7XG4gICAgcmV0dXJuIGVuZXJneTtcbn1cbmZ1bmN0aW9uIF9nZXRFbmVyZ3lDb25zdHJhaW50cygpIHtcbiAgICB2YXIgZW5lcmd5ID0gMDtcbiAgICBmb3IgKHZhciBpbmRleCA9IHRoaXMuX2NvbnN0cmFpbnRzLmxlbmd0aCAtIDE7IGluZGV4ID4gLTE7IGluZGV4LS0pXG4gICAgICAgIGVuZXJneSArPSB0aGlzLl9jb25zdHJhaW50c1tpbmRleF0uZ2V0RW5lcmd5KCkgfHwgMDtcbiAgICByZXR1cm4gZW5lcmd5O1xufVxuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiBfZ2V0RW5lcmd5UGFydGljbGVzLmNhbGwodGhpcykgKyBfZ2V0RW5lcmd5Rm9yY2VzLmNhbGwodGhpcykgKyBfZ2V0RW5lcmd5Q29uc3RyYWludHMuY2FsbCh0aGlzKTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gc3RlcCgpIHtcbiAgICB2YXIgY3VyclRpbWUgPSBub3coKTtcbiAgICB2YXIgZHRGcmFtZSA9IGN1cnJUaW1lIC0gdGhpcy5fcHJldlRpbWU7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBjdXJyVGltZTtcbiAgICBpZiAoZHRGcmFtZSA8IE1JTl9USU1FX1NURVApXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoZHRGcmFtZSA+IE1BWF9USU1FX1NURVApXG4gICAgICAgIGR0RnJhbWUgPSBNQVhfVElNRV9TVEVQO1xuICAgIF9pbnRlZ3JhdGUuY2FsbCh0aGlzLCBUSU1FU1RFUCk7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuaXNTbGVlcGluZyA9IGZ1bmN0aW9uIGlzU2xlZXBpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2xlZXBpbmc7XG59O1xuUGh5c2ljc0VuZ2luZS5wcm90b3R5cGUuc2xlZXAgPSBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgICB0aGlzLmVtaXQoJ2VuZCcsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSB0cnVlO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLndha2UgPSBmdW5jdGlvbiB3YWtlKCkge1xuICAgIHRoaXMuX3ByZXZUaW1lID0gbm93KCk7XG4gICAgdGhpcy5lbWl0KCdzdGFydCcsIHRoaXMpO1xuICAgIHRoaXMuX2lzU2xlZXBpbmcgPSBmYWxzZTtcbn07XG5QaHlzaWNzRW5naW5lLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlLCBkYXRhKSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50SGFuZGxlciA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5lbWl0KHR5cGUsIGRhdGEpO1xufTtcblBoeXNpY3NFbmdpbmUucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuKSB7XG4gICAgaWYgKHRoaXMuX2V2ZW50SGFuZGxlciA9PT0gbnVsbClcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVyID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50SGFuZGxlci5vbihldmVudCwgZm4pO1xufTtcbm1vZHVsZS5leHBvcnRzID0gUGh5c2ljc0VuZ2luZTsiLCJ2YXIgUGFydGljbGUgPSByZXF1aXJlKCcuL1BhcnRpY2xlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG52YXIgUXVhdGVybmlvbiA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1F1YXRlcm5pb24nKTtcbnZhciBNYXRyaXggPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9NYXRyaXgnKTtcbmZ1bmN0aW9uIEJvZHkob3B0aW9ucykge1xuICAgIFBhcnRpY2xlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG5ldyBRdWF0ZXJuaW9uKCk7XG4gICAgdGhpcy5hbmd1bGFyVmVsb2NpdHkgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5hbmd1bGFyTW9tZW50dW0gPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy50b3JxdWUgPSBuZXcgVmVjdG9yKCk7XG4gICAgaWYgKG9wdGlvbnMub3JpZW50YXRpb24pXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24uc2V0KG9wdGlvbnMub3JpZW50YXRpb24pO1xuICAgIGlmIChvcHRpb25zLmFuZ3VsYXJWZWxvY2l0eSlcbiAgICAgICAgdGhpcy5hbmd1bGFyVmVsb2NpdHkuc2V0KG9wdGlvbnMuYW5ndWxhclZlbG9jaXR5KTtcbiAgICBpZiAob3B0aW9ucy5hbmd1bGFyTW9tZW50dW0pXG4gICAgICAgIHRoaXMuYW5ndWxhck1vbWVudHVtLnNldChvcHRpb25zLmFuZ3VsYXJNb21lbnR1bSk7XG4gICAgaWYgKG9wdGlvbnMudG9ycXVlKVxuICAgICAgICB0aGlzLnRvcnF1ZS5zZXQob3B0aW9ucy50b3JxdWUpO1xuICAgIHRoaXMuc2V0TW9tZW50c09mSW5lcnRpYSgpO1xuICAgIHRoaXMuYW5ndWxhclZlbG9jaXR5LncgPSAwO1xuICAgIHRoaXMucFdvcmxkID0gbmV3IFZlY3RvcigpO1xufVxuQm9keS5ERUZBVUxUX09QVElPTlMgPSBQYXJ0aWNsZS5ERUZBVUxUX09QVElPTlM7XG5Cb2R5LkRFRkFVTFRfT1BUSU9OUy5vcmllbnRhdGlvbiA9IFtcbiAgICAwLFxuICAgIDAsXG4gICAgMCxcbiAgICAxXG5dO1xuQm9keS5ERUZBVUxUX09QVElPTlMuYW5ndWxhclZlbG9jaXR5ID0gW1xuICAgIDAsXG4gICAgMCxcbiAgICAwXG5dO1xuQm9keS5BWEVTID0gUGFydGljbGUuQVhFUztcbkJvZHkuU0xFRVBfVE9MRVJBTkNFID0gUGFydGljbGUuU0xFRVBfVE9MRVJBTkNFO1xuQm9keS5JTlRFR1JBVE9SID0gUGFydGljbGUuSU5URUdSQVRPUjtcbkJvZHkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShQYXJ0aWNsZS5wcm90b3R5cGUpO1xuQm9keS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBCb2R5O1xuQm9keS5wcm90b3R5cGUuaXNCb2R5ID0gdHJ1ZTtcbkJvZHkucHJvdG90eXBlLnNldE1hc3MgPSBmdW5jdGlvbiBzZXRNYXNzKCkge1xuICAgIFBhcnRpY2xlLnByb3RvdHlwZS5zZXRNYXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5zZXRNb21lbnRzT2ZJbmVydGlhKCk7XG59O1xuQm9keS5wcm90b3R5cGUuc2V0TW9tZW50c09mSW5lcnRpYSA9IGZ1bmN0aW9uIHNldE1vbWVudHNPZkluZXJ0aWEoKSB7XG4gICAgdGhpcy5pbmVydGlhID0gbmV3IE1hdHJpeCgpO1xuICAgIHRoaXMuaW52ZXJzZUluZXJ0aWEgPSBuZXcgTWF0cml4KCk7XG59O1xuQm9keS5wcm90b3R5cGUudXBkYXRlQW5ndWxhclZlbG9jaXR5ID0gZnVuY3Rpb24gdXBkYXRlQW5ndWxhclZlbG9jaXR5KCkge1xuICAgIHRoaXMuYW5ndWxhclZlbG9jaXR5LnNldCh0aGlzLmludmVyc2VJbmVydGlhLnZlY3Rvck11bHRpcGx5KHRoaXMuYW5ndWxhck1vbWVudHVtKSk7XG59O1xuQm9keS5wcm90b3R5cGUudG9Xb3JsZENvb3JkaW5hdGVzID0gZnVuY3Rpb24gdG9Xb3JsZENvb3JkaW5hdGVzKGxvY2FsUG9zaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5wV29ybGQuc2V0KHRoaXMub3JpZW50YXRpb24ucm90YXRlVmVjdG9yKGxvY2FsUG9zaXRpb24pKTtcbn07XG5Cb2R5LnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIFBhcnRpY2xlLnByb3RvdHlwZS5nZXRFbmVyZ3kuY2FsbCh0aGlzKSArIDAuNSAqIHRoaXMuaW5lcnRpYS52ZWN0b3JNdWx0aXBseSh0aGlzLmFuZ3VsYXJWZWxvY2l0eSkuZG90KHRoaXMuYW5ndWxhclZlbG9jaXR5KTtcbn07XG5Cb2R5LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHAsIHYsIHEsIEwpIHtcbiAgICBQYXJ0aWNsZS5wcm90b3R5cGUucmVzZXQuY2FsbCh0aGlzLCBwLCB2KTtcbiAgICB0aGlzLmFuZ3VsYXJWZWxvY2l0eS5jbGVhcigpO1xuICAgIHRoaXMuc2V0T3JpZW50YXRpb24ocSB8fCBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdKTtcbiAgICB0aGlzLnNldEFuZ3VsYXJNb21lbnR1bShMIHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xufTtcbkJvZHkucHJvdG90eXBlLnNldE9yaWVudGF0aW9uID0gZnVuY3Rpb24gc2V0T3JpZW50YXRpb24ocSkge1xuICAgIHRoaXMub3JpZW50YXRpb24uc2V0KHEpO1xufTtcbkJvZHkucHJvdG90eXBlLnNldEFuZ3VsYXJWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldEFuZ3VsYXJWZWxvY2l0eSh3KSB7XG4gICAgdGhpcy53YWtlKCk7XG4gICAgdGhpcy5hbmd1bGFyVmVsb2NpdHkuc2V0KHcpO1xufTtcbkJvZHkucHJvdG90eXBlLnNldEFuZ3VsYXJNb21lbnR1bSA9IGZ1bmN0aW9uIHNldEFuZ3VsYXJNb21lbnR1bShMKSB7XG4gICAgdGhpcy53YWtlKCk7XG4gICAgdGhpcy5hbmd1bGFyTW9tZW50dW0uc2V0KEwpO1xufTtcbkJvZHkucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKGZvcmNlLCBsb2NhdGlvbikge1xuICAgIFBhcnRpY2xlLnByb3RvdHlwZS5hcHBseUZvcmNlLmNhbGwodGhpcywgZm9yY2UpO1xuICAgIGlmIChsb2NhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLmFwcGx5VG9ycXVlKGxvY2F0aW9uLmNyb3NzKGZvcmNlKSk7XG59O1xuQm9keS5wcm90b3R5cGUuYXBwbHlUb3JxdWUgPSBmdW5jdGlvbiBhcHBseVRvcnF1ZSh0b3JxdWUpIHtcbiAgICB0aGlzLndha2UoKTtcbiAgICB0aGlzLnRvcnF1ZS5zZXQodGhpcy50b3JxdWUuYWRkKHRvcnF1ZSkpO1xufTtcbkJvZHkucHJvdG90eXBlLmdldFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldFRyYW5zZm9ybSgpIHtcbiAgICByZXR1cm4gVHJhbnNmb3JtLnRoZW5Nb3ZlKHRoaXMub3JpZW50YXRpb24uZ2V0VHJhbnNmb3JtKCksIFRyYW5zZm9ybS5nZXRUcmFuc2xhdGUoUGFydGljbGUucHJvdG90eXBlLmdldFRyYW5zZm9ybS5jYWxsKHRoaXMpKSk7XG59O1xuQm9keS5wcm90b3R5cGUuX2ludGVncmF0ZSA9IGZ1bmN0aW9uIF9pbnRlZ3JhdGUoZHQpIHtcbiAgICBQYXJ0aWNsZS5wcm90b3R5cGUuX2ludGVncmF0ZS5jYWxsKHRoaXMsIGR0KTtcbiAgICB0aGlzLmludGVncmF0ZUFuZ3VsYXJNb21lbnR1bShkdCk7XG4gICAgdGhpcy51cGRhdGVBbmd1bGFyVmVsb2NpdHkoZHQpO1xuICAgIHRoaXMuaW50ZWdyYXRlT3JpZW50YXRpb24oZHQpO1xufTtcbkJvZHkucHJvdG90eXBlLmludGVncmF0ZUFuZ3VsYXJNb21lbnR1bSA9IGZ1bmN0aW9uIGludGVncmF0ZUFuZ3VsYXJNb21lbnR1bShkdCkge1xuICAgIEJvZHkuSU5URUdSQVRPUi5pbnRlZ3JhdGVBbmd1bGFyTW9tZW50dW0odGhpcywgZHQpO1xufTtcbkJvZHkucHJvdG90eXBlLmludGVncmF0ZU9yaWVudGF0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlT3JpZW50YXRpb24oZHQpIHtcbiAgICBCb2R5LklOVEVHUkFUT1IuaW50ZWdyYXRlT3JpZW50YXRpb24odGhpcywgZHQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gQm9keTsiLCJ2YXIgQm9keSA9IHJlcXVpcmUoJy4vQm9keScpO1xudmFyIE1hdHJpeCA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL01hdHJpeCcpO1xuZnVuY3Rpb24gQ2lyY2xlKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLnNldFJhZGl1cyhvcHRpb25zLnJhZGl1cyB8fCAwKTtcbiAgICBCb2R5LmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5DaXJjbGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCb2R5LnByb3RvdHlwZSk7XG5DaXJjbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ2lyY2xlO1xuQ2lyY2xlLnByb3RvdHlwZS5zZXRSYWRpdXMgPSBmdW5jdGlvbiBzZXRSYWRpdXMocikge1xuICAgIHRoaXMucmFkaXVzID0gcjtcbiAgICB0aGlzLnNpemUgPSBbXG4gICAgICAgIDIgKiB0aGlzLnJhZGl1cyxcbiAgICAgICAgMiAqIHRoaXMucmFkaXVzXG4gICAgXTtcbiAgICB0aGlzLnNldE1vbWVudHNPZkluZXJ0aWEoKTtcbn07XG5DaXJjbGUucHJvdG90eXBlLnNldE1vbWVudHNPZkluZXJ0aWEgPSBmdW5jdGlvbiBzZXRNb21lbnRzT2ZJbmVydGlhKCkge1xuICAgIHZhciBtID0gdGhpcy5tYXNzO1xuICAgIHZhciByID0gdGhpcy5yYWRpdXM7XG4gICAgdGhpcy5pbmVydGlhID0gbmV3IE1hdHJpeChbXG4gICAgICAgIFtcbiAgICAgICAgICAgIDAuMjUgKiBtICogciAqIHIsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMC4yNSAqIG0gKiByICogcixcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLjUgKiBtICogciAqIHJcbiAgICAgICAgXVxuICAgIF0pO1xuICAgIHRoaXMuaW52ZXJzZUluZXJ0aWEgPSBuZXcgTWF0cml4KFtcbiAgICAgICAgW1xuICAgICAgICAgICAgNCAvIChtICogciAqIHIpLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDQgLyAobSAqIHIgKiByKSxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAyIC8gKG0gKiByICogcilcbiAgICAgICAgXVxuICAgIF0pO1xufTtcbm1vZHVsZS5leHBvcnRzID0gQ2lyY2xlOyIsInZhciBWZWN0b3IgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9WZWN0b3InKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBJbnRlZ3JhdG9yID0gcmVxdWlyZSgnLi4vaW50ZWdyYXRvcnMvU3ltcGxlY3RpY0V1bGVyJyk7XG5mdW5jdGlvbiBQYXJ0aWNsZShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuZm9yY2UgPSBuZXcgVmVjdG9yKCk7XG4gICAgdmFyIGRlZmF1bHRzID0gUGFydGljbGUuREVGQVVMVF9PUFRJT05TO1xuICAgIHRoaXMuc2V0UG9zaXRpb24ob3B0aW9ucy5wb3NpdGlvbiB8fCBkZWZhdWx0cy5wb3NpdGlvbik7XG4gICAgdGhpcy5zZXRWZWxvY2l0eShvcHRpb25zLnZlbG9jaXR5IHx8IGRlZmF1bHRzLnZlbG9jaXR5KTtcbiAgICB0aGlzLmZvcmNlLnNldChvcHRpb25zLmZvcmNlIHx8IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0pO1xuICAgIHRoaXMubWFzcyA9IG9wdGlvbnMubWFzcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tYXNzIDogZGVmYXVsdHMubWFzcztcbiAgICB0aGlzLmF4aXMgPSBvcHRpb25zLmF4aXMgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuYXhpcyA6IGRlZmF1bHRzLmF4aXM7XG4gICAgdGhpcy5pbnZlcnNlTWFzcyA9IDEgLyB0aGlzLm1hc3M7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2VuZ2luZSA9IG51bGw7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBudWxsO1xuICAgIHRoaXMuX3Bvc2l0aW9uR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLnRyYW5zZm9ybSA9IFRyYW5zZm9ybS5pZGVudGl0eS5zbGljZSgpO1xuICAgIHRoaXMuX3NwZWMgPSB7XG4gICAgICAgIHRyYW5zZm9ybTogdGhpcy50cmFuc2Zvcm0sXG4gICAgICAgIHRhcmdldDogbnVsbFxuICAgIH07XG59XG5QYXJ0aWNsZS5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcG9zaXRpb246IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0sXG4gICAgdmVsb2NpdHk6IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF0sXG4gICAgbWFzczogMSxcbiAgICBheGlzOiB1bmRlZmluZWRcbn07XG5QYXJ0aWNsZS5TTEVFUF9UT0xFUkFOQ0UgPSAxZS03O1xuUGFydGljbGUuQVhFUyA9IHtcbiAgICBYOiAwLFxuICAgIFk6IDEsXG4gICAgWjogMlxufTtcblBhcnRpY2xlLklOVEVHUkFUT1IgPSBuZXcgSW50ZWdyYXRvcigpO1xudmFyIF9ldmVudHMgPSB7XG4gICAgICAgIHN0YXJ0OiAnc3RhcnQnLFxuICAgICAgICB1cGRhdGU6ICd1cGRhdGUnLFxuICAgICAgICBlbmQ6ICdlbmQnXG4gICAgfTtcbnZhciBub3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBEYXRlLm5vdztcbiAgICB9KCk7XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2xlZXAgPSBmdW5jdGlvbiBzbGVlcCgpIHtcbiAgICBpZiAodGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLmVuZCwgdGhpcyk7XG4gICAgdGhpcy5faXNTbGVlcGluZyA9IHRydWU7XG59O1xuUGFydGljbGUucHJvdG90eXBlLndha2UgPSBmdW5jdGlvbiB3YWtlKCkge1xuICAgIGlmICghdGhpcy5faXNTbGVlcGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIHRoaXMuZW1pdChfZXZlbnRzLnN0YXJ0LCB0aGlzKTtcbiAgICB0aGlzLl9pc1NsZWVwaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcHJldlRpbWUgPSBub3coKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuaXNCb2R5ID0gZmFsc2U7XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiBzZXRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgIHRoaXMucG9zaXRpb24uc2V0KHBvc2l0aW9uKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0UG9zaXRpb24xRCA9IGZ1bmN0aW9uIHNldFBvc2l0aW9uMUQoeCkge1xuICAgIHRoaXMucG9zaXRpb24ueCA9IHg7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gZ2V0UG9zaXRpb24oKSB7XG4gICAgaWYgKHRoaXMuX3Bvc2l0aW9uR2V0dGVyIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5fcG9zaXRpb25HZXR0ZXIoKSk7XG4gICAgdGhpcy5fZW5naW5lLnN0ZXAoKTtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5nZXQoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0UG9zaXRpb24xRCA9IGZ1bmN0aW9uIGdldFBvc2l0aW9uMUQoKSB7XG4gICAgdGhpcy5fZW5naW5lLnN0ZXAoKTtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi54O1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5wb3NpdGlvbkZyb20gPSBmdW5jdGlvbiBwb3NpdGlvbkZyb20ocG9zaXRpb25HZXR0ZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbkdldHRlciA9IHBvc2l0aW9uR2V0dGVyO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHZlbG9jaXR5KSB7XG4gICAgdGhpcy52ZWxvY2l0eS5zZXQodmVsb2NpdHkpO1xuICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5zZXRWZWxvY2l0eTFEID0gZnVuY3Rpb24gc2V0VmVsb2NpdHkxRCh4KSB7XG4gICAgdGhpcy52ZWxvY2l0eS54ID0geDtcbiAgICB0aGlzLndha2UoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy52ZWxvY2l0eS5nZXQoKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0VmVsb2NpdHkxRCA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5MUQoKSB7XG4gICAgcmV0dXJuIHRoaXMudmVsb2NpdHkueDtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0TWFzcyA9IGZ1bmN0aW9uIHNldE1hc3MobWFzcykge1xuICAgIHRoaXMubWFzcyA9IG1hc3M7XG4gICAgdGhpcy5pbnZlcnNlTWFzcyA9IDEgLyBtYXNzO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5nZXRNYXNzID0gZnVuY3Rpb24gZ2V0TWFzcygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXNzO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHBvc2l0aW9uLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMuc2V0UG9zaXRpb24ocG9zaXRpb24gfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXSk7XG4gICAgdGhpcy5zZXRWZWxvY2l0eSh2ZWxvY2l0eSB8fCBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuYXBwbHlGb3JjZSA9IGZ1bmN0aW9uIGFwcGx5Rm9yY2UoZm9yY2UpIHtcbiAgICBpZiAoZm9yY2UuaXNaZXJvKCkpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLmZvcmNlLmFkZChmb3JjZSkucHV0KHRoaXMuZm9yY2UpO1xuICAgIHRoaXMud2FrZSgpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5hcHBseUltcHVsc2UgPSBmdW5jdGlvbiBhcHBseUltcHVsc2UoaW1wdWxzZSkge1xuICAgIGlmIChpbXB1bHNlLmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIHZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB2ZWxvY2l0eS5hZGQoaW1wdWxzZS5tdWx0KHRoaXMuaW52ZXJzZU1hc3MpKS5wdXQodmVsb2NpdHkpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5pbnRlZ3JhdGVWZWxvY2l0eSA9IGZ1bmN0aW9uIGludGVncmF0ZVZlbG9jaXR5KGR0KSB7XG4gICAgUGFydGljbGUuSU5URUdSQVRPUi5pbnRlZ3JhdGVWZWxvY2l0eSh0aGlzLCBkdCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmludGVncmF0ZVBvc2l0aW9uID0gZnVuY3Rpb24gaW50ZWdyYXRlUG9zaXRpb24oZHQpIHtcbiAgICBQYXJ0aWNsZS5JTlRFR1JBVE9SLmludGVncmF0ZVBvc2l0aW9uKHRoaXMsIGR0KTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuX2ludGVncmF0ZSA9IGZ1bmN0aW9uIF9pbnRlZ3JhdGUoZHQpIHtcbiAgICB0aGlzLmludGVncmF0ZVZlbG9jaXR5KGR0KTtcbiAgICB0aGlzLmludGVncmF0ZVBvc2l0aW9uKGR0KTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiAwLjUgKiB0aGlzLm1hc3MgKiB0aGlzLnZlbG9jaXR5Lm5vcm1TcXVhcmVkKCk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLmdldFRyYW5zZm9ybSA9IGZ1bmN0aW9uIGdldFRyYW5zZm9ybSgpIHtcbiAgICB0aGlzLl9lbmdpbmUuc3RlcCgpO1xuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgdmFyIGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtO1xuICAgIGlmIChheGlzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGF4aXMgJiB+UGFydGljbGUuQVhFUy5YKSB7XG4gICAgICAgICAgICBwb3NpdGlvbi54ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXhpcyAmIH5QYXJ0aWNsZS5BWEVTLlkpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uLnkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChheGlzICYgflBhcnRpY2xlLkFYRVMuWikge1xuICAgICAgICAgICAgcG9zaXRpb24ueiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdHJhbnNmb3JtWzEyXSA9IHBvc2l0aW9uLng7XG4gICAgdHJhbnNmb3JtWzEzXSA9IHBvc2l0aW9uLnk7XG4gICAgdHJhbnNmb3JtWzE0XSA9IHBvc2l0aW9uLno7XG4gICAgcmV0dXJuIHRyYW5zZm9ybTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUubW9kaWZ5ID0gZnVuY3Rpb24gbW9kaWZ5KHRhcmdldCkge1xuICAgIHZhciBfc3BlYyA9IHRoaXMuX3NwZWM7XG4gICAgX3NwZWMudHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2Zvcm0oKTtcbiAgICBfc3BlYy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgcmV0dXJuIF9zcGVjO1xufTtcbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5iaW5kVGhpcyh0aGlzKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5QYXJ0aWNsZS5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSwgZGF0YSkge1xuICAgIGlmICghdGhpcy5fZXZlbnRPdXRwdXQpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KHR5cGUsIGRhdGEpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLm9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuUGFydGljbGUucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5QYXJ0aWNsZS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblBhcnRpY2xlLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMudW5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBQYXJ0aWNsZTsiLCJ2YXIgQm9keSA9IHJlcXVpcmUoJy4vQm9keScpO1xudmFyIE1hdHJpeCA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL01hdHJpeCcpO1xuZnVuY3Rpb24gUmVjdGFuZ2xlKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLnNpemUgPSBvcHRpb25zLnNpemUgfHwgW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICBCb2R5LmNhbGwodGhpcywgb3B0aW9ucyk7XG59XG5SZWN0YW5nbGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShCb2R5LnByb3RvdHlwZSk7XG5SZWN0YW5nbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVjdGFuZ2xlO1xuUmVjdGFuZ2xlLnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24gc2V0U2l6ZShzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB0aGlzLnNldE1vbWVudHNPZkluZXJ0aWEoKTtcbn07XG5SZWN0YW5nbGUucHJvdG90eXBlLnNldE1vbWVudHNPZkluZXJ0aWEgPSBmdW5jdGlvbiBzZXRNb21lbnRzT2ZJbmVydGlhKCkge1xuICAgIHZhciBtID0gdGhpcy5tYXNzO1xuICAgIHZhciB3ID0gdGhpcy5zaXplWzBdO1xuICAgIHZhciBoID0gdGhpcy5zaXplWzFdO1xuICAgIHRoaXMuaW5lcnRpYSA9IG5ldyBNYXRyaXgoW1xuICAgICAgICBbXG4gICAgICAgICAgICBtICogaCAqIGggLyAxMixcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBtICogdyAqIHcgLyAxMixcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBtICogKHcgKiB3ICsgaCAqIGgpIC8gMTJcbiAgICAgICAgXVxuICAgIF0pO1xuICAgIHRoaXMuaW52ZXJzZUluZXJ0aWEgPSBuZXcgTWF0cml4KFtcbiAgICAgICAgW1xuICAgICAgICAgICAgMTIgLyAobSAqIGggKiBoKSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAxMiAvIChtICogdyAqIHcpLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDEyIC8gKG0gKiAodyAqIHcgKyBoICogaCkpXG4gICAgICAgIF1cbiAgICBdKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFJlY3RhbmdsZTsiLCJ2YXIgQ29uc3RyYWludCA9IHJlcXVpcmUoJy4vQ29uc3RyYWludCcpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gQ29sbGlzaW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKENvbGxpc2lvbi5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5ub3JtYWwgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5wRGlmZiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnZEaWZmID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuaW1wdWxzZTEgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5pbXB1bHNlMiA9IG5ldyBWZWN0b3IoKTtcbiAgICBDb25zdHJhaW50LmNhbGwodGhpcyk7XG59XG5Db2xsaXNpb24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDb25zdHJhaW50LnByb3RvdHlwZSk7XG5Db2xsaXNpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gQ29sbGlzaW9uO1xuQ29sbGlzaW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICByZXN0aXR1dGlvbjogMC41LFxuICAgIGRyaWZ0OiAwLjUsXG4gICAgc2xvcDogMFxufTtcbmZ1bmN0aW9uIF9ub3JtYWxWZWxvY2l0eShwYXJ0aWNsZTEsIHBhcnRpY2xlMikge1xuICAgIHJldHVybiBwYXJ0aWNsZTEudmVsb2NpdHkuZG90KHBhcnRpY2xlMi52ZWxvY2l0eSk7XG59XG5Db2xsaXNpb24ucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucylcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG59O1xuQ29sbGlzaW9uLnByb3RvdHlwZS5hcHBseUNvbnN0cmFpbnQgPSBmdW5jdGlvbiBhcHBseUNvbnN0cmFpbnQodGFyZ2V0cywgc291cmNlLCBkdCkge1xuICAgIGlmIChzb3VyY2UgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciB2MSA9IHNvdXJjZS52ZWxvY2l0eTtcbiAgICB2YXIgcDEgPSBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIHcxID0gc291cmNlLmludmVyc2VNYXNzO1xuICAgIHZhciByMSA9IHNvdXJjZS5yYWRpdXM7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIGRyaWZ0ID0gb3B0aW9ucy5kcmlmdDtcbiAgICB2YXIgc2xvcCA9IC1vcHRpb25zLnNsb3A7XG4gICAgdmFyIHJlc3RpdHV0aW9uID0gb3B0aW9ucy5yZXN0aXR1dGlvbjtcbiAgICB2YXIgbiA9IHRoaXMubm9ybWFsO1xuICAgIHZhciBwRGlmZiA9IHRoaXMucERpZmY7XG4gICAgdmFyIHZEaWZmID0gdGhpcy52RGlmZjtcbiAgICB2YXIgaW1wdWxzZTEgPSB0aGlzLmltcHVsc2UxO1xuICAgIHZhciBpbXB1bHNlMiA9IHRoaXMuaW1wdWxzZTI7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICBpZiAodGFyZ2V0ID09PSBzb3VyY2UpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgdmFyIHYyID0gdGFyZ2V0LnZlbG9jaXR5O1xuICAgICAgICB2YXIgcDIgPSB0YXJnZXQucG9zaXRpb247XG4gICAgICAgIHZhciB3MiA9IHRhcmdldC5pbnZlcnNlTWFzcztcbiAgICAgICAgdmFyIHIyID0gdGFyZ2V0LnJhZGl1cztcbiAgICAgICAgcERpZmYuc2V0KHAyLnN1YihwMSkpO1xuICAgICAgICB2RGlmZi5zZXQodjIuc3ViKHYxKSk7XG4gICAgICAgIHZhciBkaXN0ID0gcERpZmYubm9ybSgpO1xuICAgICAgICB2YXIgb3ZlcmxhcCA9IGRpc3QgLSAocjEgKyByMik7XG4gICAgICAgIHZhciBlZmZNYXNzID0gMSAvICh3MSArIHcyKTtcbiAgICAgICAgdmFyIGdhbW1hID0gMDtcbiAgICAgICAgaWYgKG92ZXJsYXAgPCAwKSB7XG4gICAgICAgICAgICBuLnNldChwRGlmZi5ub3JtYWxpemUoKSk7XG4gICAgICAgICAgICBpZiAodGhpcy5fZXZlbnRPdXRwdXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29sbGlzaW9uRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBzb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBvdmVybGFwOiBvdmVybGFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9ybWFsOiBuXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncHJlQ29sbGlzaW9uJywgY29sbGlzaW9uRGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnY29sbGlzaW9uJywgY29sbGlzaW9uRGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbGFtYmRhID0gb3ZlcmxhcCA8PSBzbG9wID8gKCgxICsgcmVzdGl0dXRpb24pICogbi5kb3QodkRpZmYpICsgZHJpZnQgLyBkdCAqIChvdmVybGFwIC0gc2xvcCkpIC8gKGdhbW1hICsgZHQgLyBlZmZNYXNzKSA6ICgxICsgcmVzdGl0dXRpb24pICogbi5kb3QodkRpZmYpIC8gKGdhbW1hICsgZHQgLyBlZmZNYXNzKTtcbiAgICAgICAgICAgIG4ubXVsdChkdCAqIGxhbWJkYSkucHV0KGltcHVsc2UxKTtcbiAgICAgICAgICAgIGltcHVsc2UxLm11bHQoLTEpLnB1dChpbXB1bHNlMik7XG4gICAgICAgICAgICBzb3VyY2UuYXBwbHlJbXB1bHNlKGltcHVsc2UxKTtcbiAgICAgICAgICAgIHRhcmdldC5hcHBseUltcHVsc2UoaW1wdWxzZTIpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50T3V0cHV0KVxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3Bvc3RDb2xsaXNpb24nLCBjb2xsaXNpb25EYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IENvbGxpc2lvbjsiLCJ2YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBDb25zdHJhaW50KCkge1xuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl9lbmVyZ3kgPSAwO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbnVsbDtcbn1cbkNvbnN0cmFpbnQucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucylcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG59O1xuQ29uc3RyYWludC5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50ID0gZnVuY3Rpb24gYXBwbHlDb25zdHJhaW50KCkge1xufTtcbkNvbnN0cmFpbnQucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZW5lcmd5O1xufTtcbkNvbnN0cmFpbnQucHJvdG90eXBlLnNldEVuZXJneSA9IGZ1bmN0aW9uIHNldEVuZXJneShlbmVyZ3kpIHtcbiAgICB0aGlzLl9lbmVyZ3kgPSBlbmVyZ3k7XG59O1xuZnVuY3Rpb24gX2NyZWF0ZUV2ZW50T3V0cHV0KCkge1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRPdXRwdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50T3V0cHV0KTtcbn1cbkNvbnN0cmFpbnQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMub24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5Db25zdHJhaW50LnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuQ29uc3RyYWludC5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgX2NyZWF0ZUV2ZW50T3V0cHV0LmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbkNvbnN0cmFpbnQucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlTGlzdGVuZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5Db25zdHJhaW50LnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudW5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBDb25zdHJhaW50OyIsInZhciBDb25zdHJhaW50ID0gcmVxdWlyZSgnLi9Db25zdHJhaW50Jyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBDdXJ2ZShvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShDdXJ2ZS5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5KID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuaW1wdWxzZSA9IG5ldyBWZWN0b3IoKTtcbiAgICBDb25zdHJhaW50LmNhbGwodGhpcyk7XG59XG5DdXJ2ZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcbkN1cnZlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEN1cnZlO1xudmFyIGVwc2lsb24gPSAxZS03O1xudmFyIHBpID0gTWF0aC5QSTtcbkN1cnZlLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBlcXVhdGlvbjogZnVuY3Rpb24gKHgsIHksIHopIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSxcbiAgICBwbGFuZTogZnVuY3Rpb24gKHgsIHksIHopIHtcbiAgICAgICAgcmV0dXJuIHo7XG4gICAgfSxcbiAgICBwZXJpb2Q6IDAsXG4gICAgZGFtcGluZ1JhdGlvOiAwXG59O1xuQ3VydmUucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucylcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG59O1xuQ3VydmUucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludCA9IGZ1bmN0aW9uIGFwcGx5Q29uc3RyYWludCh0YXJnZXRzLCBzb3VyY2UsIGR0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIGltcHVsc2UgPSB0aGlzLmltcHVsc2U7XG4gICAgdmFyIEogPSB0aGlzLko7XG4gICAgdmFyIGYgPSBvcHRpb25zLmVxdWF0aW9uO1xuICAgIHZhciBnID0gb3B0aW9ucy5wbGFuZTtcbiAgICB2YXIgZGFtcGluZ1JhdGlvID0gb3B0aW9ucy5kYW1waW5nUmF0aW87XG4gICAgdmFyIHBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYm9keSA9IHRhcmdldHNbaV07XG4gICAgICAgIHZhciB2ID0gYm9keS52ZWxvY2l0eTtcbiAgICAgICAgdmFyIHAgPSBib2R5LnBvc2l0aW9uO1xuICAgICAgICB2YXIgbSA9IGJvZHkubWFzcztcbiAgICAgICAgdmFyIGdhbW1hO1xuICAgICAgICB2YXIgYmV0YTtcbiAgICAgICAgaWYgKHBlcmlvZCA9PT0gMCkge1xuICAgICAgICAgICAgZ2FtbWEgPSAwO1xuICAgICAgICAgICAgYmV0YSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYyA9IDQgKiBtICogcGkgKiBkYW1waW5nUmF0aW8gLyBwZXJpb2Q7XG4gICAgICAgICAgICB2YXIgayA9IDQgKiBtICogcGkgKiBwaSAvIChwZXJpb2QgKiBwZXJpb2QpO1xuICAgICAgICAgICAgZ2FtbWEgPSAxIC8gKGMgKyBkdCAqIGspO1xuICAgICAgICAgICAgYmV0YSA9IGR0ICogayAvIChjICsgZHQgKiBrKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IHAueDtcbiAgICAgICAgdmFyIHkgPSBwLnk7XG4gICAgICAgIHZhciB6ID0gcC56O1xuICAgICAgICB2YXIgZjAgPSBmKHgsIHksIHopO1xuICAgICAgICB2YXIgZGZ4ID0gKGYoeCArIGVwc2lsb24sIHAsIHApIC0gZjApIC8gZXBzaWxvbjtcbiAgICAgICAgdmFyIGRmeSA9IChmKHgsIHkgKyBlcHNpbG9uLCBwKSAtIGYwKSAvIGVwc2lsb247XG4gICAgICAgIHZhciBkZnogPSAoZih4LCB5LCBwICsgZXBzaWxvbikgLSBmMCkgLyBlcHNpbG9uO1xuICAgICAgICB2YXIgZzAgPSBnKHgsIHksIHopO1xuICAgICAgICB2YXIgZGd4ID0gKGcoeCArIGVwc2lsb24sIHksIHopIC0gZzApIC8gZXBzaWxvbjtcbiAgICAgICAgdmFyIGRneSA9IChnKHgsIHkgKyBlcHNpbG9uLCB6KSAtIGcwKSAvIGVwc2lsb247XG4gICAgICAgIHZhciBkZ3ogPSAoZyh4LCB5LCB6ICsgZXBzaWxvbikgLSBnMCkgLyBlcHNpbG9uO1xuICAgICAgICBKLnNldFhZWihkZnggKyBkZ3gsIGRmeSArIGRneSwgZGZ6ICsgZGd6KTtcbiAgICAgICAgdmFyIGFudGlEcmlmdCA9IGJldGEgLyBkdCAqIChmMCArIGcwKTtcbiAgICAgICAgdmFyIGxhbWJkYSA9IC0oSi5kb3QodikgKyBhbnRpRHJpZnQpIC8gKGdhbW1hICsgZHQgKiBKLm5vcm1TcXVhcmVkKCkgLyBtKTtcbiAgICAgICAgaW1wdWxzZS5zZXQoSi5tdWx0KGR0ICogbGFtYmRhKSk7XG4gICAgICAgIGJvZHkuYXBwbHlJbXB1bHNlKGltcHVsc2UpO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IEN1cnZlOyIsInZhciBDb25zdHJhaW50ID0gcmVxdWlyZSgnLi9Db25zdHJhaW50Jyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBEaXN0YW5jZShvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvbnN0cnVjdG9yLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmltcHVsc2UgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5ub3JtYWwgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5kaWZmUCA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmRpZmZWID0gbmV3IFZlY3RvcigpO1xuICAgIENvbnN0cmFpbnQuY2FsbCh0aGlzKTtcbn1cbkRpc3RhbmNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ29uc3RyYWludC5wcm90b3R5cGUpO1xuRGlzdGFuY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRGlzdGFuY2U7XG5EaXN0YW5jZS5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgYW5jaG9yOiBudWxsLFxuICAgIGxlbmd0aDogMCxcbiAgICBtaW5MZW5ndGg6IDAsXG4gICAgcGVyaW9kOiAwLFxuICAgIGRhbXBpbmdSYXRpbzogMFxufTtcbnZhciBwaSA9IE1hdGguUEk7XG5EaXN0YW5jZS5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmFuY2hvcikge1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IucG9zaXRpb24gaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3IucG9zaXRpb247XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvcjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gbmV3IFZlY3RvcihvcHRpb25zLmFuY2hvcik7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgaWYgKG9wdGlvbnMuZGFtcGluZ1JhdGlvICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5kYW1waW5nUmF0aW8gPSBvcHRpb25zLmRhbXBpbmdSYXRpbztcbiAgICBpZiAob3B0aW9ucy5wZXJpb2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIGlmIChvcHRpb25zLm1pbkxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubWluTGVuZ3RoID0gb3B0aW9ucy5taW5MZW5ndGg7XG59O1xuZnVuY3Rpb24gX2NhbGNFcnJvcihpbXB1bHNlLCBib2R5KSB7XG4gICAgcmV0dXJuIGJvZHkubWFzcyAqIGltcHVsc2Uubm9ybSgpO1xufVxuRGlzdGFuY2UucHJvdG90eXBlLnNldEFuY2hvciA9IGZ1bmN0aW9uIHNldEFuY2hvcihhbmNob3IpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5hbmNob3IpXG4gICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5vcHRpb25zLmFuY2hvci5zZXQoYW5jaG9yKTtcbn07XG5EaXN0YW5jZS5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50ID0gZnVuY3Rpb24gYXBwbHlDb25zdHJhaW50KHRhcmdldHMsIHNvdXJjZSwgZHQpIHtcbiAgICB2YXIgbiA9IHRoaXMubm9ybWFsO1xuICAgIHZhciBkaWZmUCA9IHRoaXMuZGlmZlA7XG4gICAgdmFyIGRpZmZWID0gdGhpcy5kaWZmVjtcbiAgICB2YXIgaW1wdWxzZSA9IHRoaXMuaW1wdWxzZTtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgZGFtcGluZ1JhdGlvID0gb3B0aW9ucy5kYW1waW5nUmF0aW87XG4gICAgdmFyIHBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xuICAgIHZhciBtaW5MZW5ndGggPSBvcHRpb25zLm1pbkxlbmd0aDtcbiAgICB2YXIgcDI7XG4gICAgdmFyIHcyO1xuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgdmFyIHYyID0gc291cmNlLnZlbG9jaXR5O1xuICAgICAgICBwMiA9IHNvdXJjZS5wb3NpdGlvbjtcbiAgICAgICAgdzIgPSBzb3VyY2UuaW52ZXJzZU1hc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcDIgPSB0aGlzLm9wdGlvbnMuYW5jaG9yO1xuICAgICAgICB3MiA9IDA7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSB0aGlzLm9wdGlvbnMubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYm9keSA9IHRhcmdldHNbaV07XG4gICAgICAgIHZhciB2MSA9IGJvZHkudmVsb2NpdHk7XG4gICAgICAgIHZhciBwMSA9IGJvZHkucG9zaXRpb247XG4gICAgICAgIHZhciB3MSA9IGJvZHkuaW52ZXJzZU1hc3M7XG4gICAgICAgIGRpZmZQLnNldChwMS5zdWIocDIpKTtcbiAgICAgICAgbi5zZXQoZGlmZlAubm9ybWFsaXplKCkpO1xuICAgICAgICB2YXIgZGlzdCA9IGRpZmZQLm5vcm0oKSAtIGxlbmd0aDtcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpc3QpIDwgbWluTGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoc291cmNlKVxuICAgICAgICAgICAgZGlmZlYuc2V0KHYxLnN1Yih2MikpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkaWZmVi5zZXQodjEpO1xuICAgICAgICB2YXIgZWZmTWFzcyA9IDEgLyAodzEgKyB3Mik7XG4gICAgICAgIHZhciBnYW1tYTtcbiAgICAgICAgdmFyIGJldGE7XG4gICAgICAgIGlmIChwZXJpb2QgPT09IDApIHtcbiAgICAgICAgICAgIGdhbW1hID0gMDtcbiAgICAgICAgICAgIGJldGEgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGMgPSA0ICogZWZmTWFzcyAqIHBpICogZGFtcGluZ1JhdGlvIC8gcGVyaW9kO1xuICAgICAgICAgICAgdmFyIGsgPSA0ICogZWZmTWFzcyAqIHBpICogcGkgLyAocGVyaW9kICogcGVyaW9kKTtcbiAgICAgICAgICAgIGdhbW1hID0gMSAvIChjICsgZHQgKiBrKTtcbiAgICAgICAgICAgIGJldGEgPSBkdCAqIGsgLyAoYyArIGR0ICogayk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFudGlEcmlmdCA9IGJldGEgLyBkdCAqIGRpc3Q7XG4gICAgICAgIHZhciBsYW1iZGEgPSAtKG4uZG90KGRpZmZWKSArIGFudGlEcmlmdCkgLyAoZ2FtbWEgKyBkdCAvIGVmZk1hc3MpO1xuICAgICAgICBpbXB1bHNlLnNldChuLm11bHQoZHQgKiBsYW1iZGEpKTtcbiAgICAgICAgYm9keS5hcHBseUltcHVsc2UoaW1wdWxzZSk7XG4gICAgICAgIGlmIChzb3VyY2UpXG4gICAgICAgICAgICBzb3VyY2UuYXBwbHlJbXB1bHNlKGltcHVsc2UubXVsdCgtMSkpO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IERpc3RhbmNlOyIsInZhciBDb25zdHJhaW50ID0gcmVxdWlyZSgnLi9Db25zdHJhaW50Jyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBTbmFwKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMucERpZmYgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy52RGlmZiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UxID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuaW1wdWxzZTIgPSBuZXcgVmVjdG9yKCk7XG4gICAgQ29uc3RyYWludC5jYWxsKHRoaXMpO1xufVxuU25hcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcblNuYXAucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU25hcDtcblNuYXAuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMzAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC4xLFxuICAgIGxlbmd0aDogMCxcbiAgICBhbmNob3I6IHVuZGVmaW5lZFxufTtcbnZhciBwaSA9IE1hdGguUEk7XG5mdW5jdGlvbiBfY2FsY0VuZXJneShpbXB1bHNlLCBkaXNwLCBkdCkge1xuICAgIHJldHVybiBNYXRoLmFicyhpbXB1bHNlLmRvdChkaXNwKSAvIGR0KTtcbn1cblNuYXAucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5hbmNob3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IgaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3I7XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvci5wb3NpdGlvbiBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvci5wb3NpdGlvbjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gbmV3IFZlY3RvcihvcHRpb25zLmFuY2hvcik7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmxlbmd0aCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMubGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgaWYgKG9wdGlvbnMuZGFtcGluZ1JhdGlvICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5kYW1waW5nUmF0aW8gPSBvcHRpb25zLmRhbXBpbmdSYXRpbztcbiAgICBpZiAob3B0aW9ucy5wZXJpb2QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnBlcmlvZCA9IG9wdGlvbnMucGVyaW9kO1xufTtcblNuYXAucHJvdG90eXBlLnNldEFuY2hvciA9IGZ1bmN0aW9uIHNldEFuY2hvcih2KSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmNob3IgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLm9wdGlvbnMuYW5jaG9yLnNldCh2KTtcbn07XG5TbmFwLnByb3RvdHlwZS5nZXRFbmVyZ3kgPSBmdW5jdGlvbiBnZXRFbmVyZ3kodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgcmVzdExlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgdmFyIHN0cmVuZ3RoID0gTWF0aC5wb3coMiAqIHBpIC8gb3B0aW9ucy5wZXJpb2QsIDIpO1xuICAgIHZhciBkaXN0ID0gYW5jaG9yLnN1Yih0YXJnZXQucG9zaXRpb24pLm5vcm0oKSAtIHJlc3RMZW5ndGg7XG4gICAgcmV0dXJuIDAuNSAqIHN0cmVuZ3RoICogZGlzdCAqIGRpc3Q7XG59O1xuU25hcC5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50ID0gZnVuY3Rpb24gYXBwbHlDb25zdHJhaW50KHRhcmdldHMsIHNvdXJjZSwgZHQpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgcERpZmYgPSB0aGlzLnBEaWZmO1xuICAgIHZhciB2RGlmZiA9IHRoaXMudkRpZmY7XG4gICAgdmFyIGltcHVsc2UxID0gdGhpcy5pbXB1bHNlMTtcbiAgICB2YXIgaW1wdWxzZTIgPSB0aGlzLmltcHVsc2UyO1xuICAgIHZhciBsZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gb3B0aW9ucy5hbmNob3IgfHwgc291cmNlLnBvc2l0aW9uO1xuICAgIHZhciBwZXJpb2QgPSBvcHRpb25zLnBlcmlvZDtcbiAgICB2YXIgZGFtcGluZ1JhdGlvID0gb3B0aW9ucy5kYW1waW5nUmF0aW87XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgcDEgPSB0YXJnZXQucG9zaXRpb247XG4gICAgICAgIHZhciB2MSA9IHRhcmdldC52ZWxvY2l0eTtcbiAgICAgICAgdmFyIG0xID0gdGFyZ2V0Lm1hc3M7XG4gICAgICAgIHZhciB3MSA9IHRhcmdldC5pbnZlcnNlTWFzcztcbiAgICAgICAgcERpZmYuc2V0KHAxLnN1YihhbmNob3IpKTtcbiAgICAgICAgdmFyIGRpc3QgPSBwRGlmZi5ub3JtKCkgLSBsZW5ndGg7XG4gICAgICAgIHZhciBlZmZNYXNzO1xuICAgICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICB2YXIgdzIgPSBzb3VyY2UuaW52ZXJzZU1hc3M7XG4gICAgICAgICAgICB2YXIgdjIgPSBzb3VyY2UudmVsb2NpdHk7XG4gICAgICAgICAgICB2RGlmZi5zZXQodjEuc3ViKHYyKSk7XG4gICAgICAgICAgICBlZmZNYXNzID0gMSAvICh3MSArIHcyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZEaWZmLnNldCh2MSk7XG4gICAgICAgICAgICBlZmZNYXNzID0gbTE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGdhbW1hO1xuICAgICAgICB2YXIgYmV0YTtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5wZXJpb2QgPT09IDApIHtcbiAgICAgICAgICAgIGdhbW1hID0gMDtcbiAgICAgICAgICAgIGJldGEgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGsgPSA0ICogZWZmTWFzcyAqIHBpICogcGkgLyAocGVyaW9kICogcGVyaW9kKTtcbiAgICAgICAgICAgIHZhciBjID0gNCAqIGVmZk1hc3MgKiBwaSAqIGRhbXBpbmdSYXRpbyAvIHBlcmlvZDtcbiAgICAgICAgICAgIGJldGEgPSBkdCAqIGsgLyAoYyArIGR0ICogayk7XG4gICAgICAgICAgICBnYW1tYSA9IDEgLyAoYyArIGR0ICogayk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFudGlEcmlmdCA9IGJldGEgLyBkdCAqIGRpc3Q7XG4gICAgICAgIHBEaWZmLm5vcm1hbGl6ZSgtYW50aURyaWZ0KS5zdWIodkRpZmYpLm11bHQoZHQgLyAoZ2FtbWEgKyBkdCAvIGVmZk1hc3MpKS5wdXQoaW1wdWxzZTEpO1xuICAgICAgICB0YXJnZXQuYXBwbHlJbXB1bHNlKGltcHVsc2UxKTtcbiAgICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgaW1wdWxzZTEubXVsdCgtMSkucHV0KGltcHVsc2UyKTtcbiAgICAgICAgICAgIHNvdXJjZS5hcHBseUltcHVsc2UoaW1wdWxzZTIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0RW5lcmd5KF9jYWxjRW5lcmd5KGltcHVsc2UxLCBwRGlmZiwgZHQpKTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTbmFwOyIsInZhciBDb25zdHJhaW50ID0gcmVxdWlyZSgnLi9Db25zdHJhaW50Jyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFN1cmZhY2UuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuSiA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLmltcHVsc2UgPSBuZXcgVmVjdG9yKCk7XG4gICAgQ29uc3RyYWludC5jYWxsKHRoaXMpO1xufVxuU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcblN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3VyZmFjZTtcblN1cmZhY2UuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGVxdWF0aW9uOiB1bmRlZmluZWQsXG4gICAgcGVyaW9kOiAwLFxuICAgIGRhbXBpbmdSYXRpbzogMFxufTtcbnZhciBlcHNpbG9uID0gMWUtNztcbnZhciBwaSA9IE1hdGguUEk7XG5TdXJmYWNlLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpXG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xufTtcblN1cmZhY2UucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludCA9IGZ1bmN0aW9uIGFwcGx5Q29uc3RyYWludCh0YXJnZXRzLCBzb3VyY2UsIGR0KSB7XG4gICAgdmFyIGltcHVsc2UgPSB0aGlzLmltcHVsc2U7XG4gICAgdmFyIEogPSB0aGlzLko7XG4gICAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG4gICAgdmFyIGYgPSBvcHRpb25zLmVxdWF0aW9uO1xuICAgIHZhciBkYW1waW5nUmF0aW8gPSBvcHRpb25zLmRhbXBpbmdSYXRpbztcbiAgICB2YXIgcGVyaW9kID0gb3B0aW9ucy5wZXJpb2Q7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJ0aWNsZSA9IHRhcmdldHNbaV07XG4gICAgICAgIHZhciB2ID0gcGFydGljbGUudmVsb2NpdHk7XG4gICAgICAgIHZhciBwID0gcGFydGljbGUucG9zaXRpb247XG4gICAgICAgIHZhciBtID0gcGFydGljbGUubWFzcztcbiAgICAgICAgdmFyIGdhbW1hO1xuICAgICAgICB2YXIgYmV0YTtcbiAgICAgICAgaWYgKHBlcmlvZCA9PT0gMCkge1xuICAgICAgICAgICAgZ2FtbWEgPSAwO1xuICAgICAgICAgICAgYmV0YSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgYyA9IDQgKiBtICogcGkgKiBkYW1waW5nUmF0aW8gLyBwZXJpb2Q7XG4gICAgICAgICAgICB2YXIgayA9IDQgKiBtICogcGkgKiBwaSAvIChwZXJpb2QgKiBwZXJpb2QpO1xuICAgICAgICAgICAgZ2FtbWEgPSAxIC8gKGMgKyBkdCAqIGspO1xuICAgICAgICAgICAgYmV0YSA9IGR0ICogayAvIChjICsgZHQgKiBrKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgeCA9IHAueDtcbiAgICAgICAgdmFyIHkgPSBwLnk7XG4gICAgICAgIHZhciB6ID0gcC56O1xuICAgICAgICB2YXIgZjAgPSBmKHgsIHksIHopO1xuICAgICAgICB2YXIgZGZ4ID0gKGYoeCArIGVwc2lsb24sIHAsIHApIC0gZjApIC8gZXBzaWxvbjtcbiAgICAgICAgdmFyIGRmeSA9IChmKHgsIHkgKyBlcHNpbG9uLCBwKSAtIGYwKSAvIGVwc2lsb247XG4gICAgICAgIHZhciBkZnogPSAoZih4LCB5LCBwICsgZXBzaWxvbikgLSBmMCkgLyBlcHNpbG9uO1xuICAgICAgICBKLnNldFhZWihkZngsIGRmeSwgZGZ6KTtcbiAgICAgICAgdmFyIGFudGlEcmlmdCA9IGJldGEgLyBkdCAqIGYwO1xuICAgICAgICB2YXIgbGFtYmRhID0gLShKLmRvdCh2KSArIGFudGlEcmlmdCkgLyAoZ2FtbWEgKyBkdCAqIEoubm9ybVNxdWFyZWQoKSAvIG0pO1xuICAgICAgICBpbXB1bHNlLnNldChKLm11bHQoZHQgKiBsYW1iZGEpKTtcbiAgICAgICAgcGFydGljbGUuYXBwbHlJbXB1bHNlKGltcHVsc2UpO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFN1cmZhY2U7IiwidmFyIENvbnN0cmFpbnQgPSByZXF1aXJlKCcuL0NvbnN0cmFpbnQnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFdhbGwob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoV2FsbC5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5kaWZmID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMuaW1wdWxzZSA9IG5ldyBWZWN0b3IoKTtcbiAgICBDb25zdHJhaW50LmNhbGwodGhpcyk7XG59XG5XYWxsLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ29uc3RyYWludC5wcm90b3R5cGUpO1xuV2FsbC5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBXYWxsO1xuV2FsbC5PTl9DT05UQUNUID0ge1xuICAgIFJFRkxFQ1Q6IDAsXG4gICAgU0lMRU5UOiAxXG59O1xuV2FsbC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcmVzdGl0dXRpb246IDAuNSxcbiAgICBkcmlmdDogMC41LFxuICAgIHNsb3A6IDAsXG4gICAgbm9ybWFsOiBbXG4gICAgICAgIDEsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdLFxuICAgIGRpc3RhbmNlOiAwLFxuICAgIG9uQ29udGFjdDogV2FsbC5PTl9DT05UQUNULlJFRkxFQ1Rcbn07XG5XYWxsLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMubm9ybWFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMubm9ybWFsIGluc3RhbmNlb2YgVmVjdG9yKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm5vcm1hbCA9IG9wdGlvbnMubm9ybWFsLmNsb25lKCk7XG4gICAgICAgIGlmIChvcHRpb25zLm5vcm1hbCBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLm5vcm1hbCA9IG5ldyBWZWN0b3Iob3B0aW9ucy5ub3JtYWwpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5yZXN0aXR1dGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMucmVzdGl0dXRpb24gPSBvcHRpb25zLnJlc3RpdHV0aW9uO1xuICAgIGlmIChvcHRpb25zLmRyaWZ0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5kcmlmdCA9IG9wdGlvbnMuZHJpZnQ7XG4gICAgaWYgKG9wdGlvbnMuc2xvcCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuc2xvcCA9IG9wdGlvbnMuc2xvcDtcbiAgICBpZiAob3B0aW9ucy5kaXN0YW5jZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZGlzdGFuY2UgPSBvcHRpb25zLmRpc3RhbmNlO1xuICAgIGlmIChvcHRpb25zLm9uQ29udGFjdCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMub25Db250YWN0ID0gb3B0aW9ucy5vbkNvbnRhY3Q7XG59O1xuZnVuY3Rpb24gX2dldE5vcm1hbFZlbG9jaXR5KG4sIHYpIHtcbiAgICByZXR1cm4gdi5kb3Qobik7XG59XG5mdW5jdGlvbiBfZ2V0RGlzdGFuY2VGcm9tT3JpZ2luKHApIHtcbiAgICB2YXIgbiA9IHRoaXMub3B0aW9ucy5ub3JtYWw7XG4gICAgdmFyIGQgPSB0aGlzLm9wdGlvbnMuZGlzdGFuY2U7XG4gICAgcmV0dXJuIHAuZG90KG4pICsgZDtcbn1cbmZ1bmN0aW9uIF9vbkVudGVyKHBhcnRpY2xlLCBvdmVybGFwLCBkdCkge1xuICAgIHZhciBwID0gcGFydGljbGUucG9zaXRpb247XG4gICAgdmFyIHYgPSBwYXJ0aWNsZS52ZWxvY2l0eTtcbiAgICB2YXIgbSA9IHBhcnRpY2xlLm1hc3M7XG4gICAgdmFyIG4gPSB0aGlzLm9wdGlvbnMubm9ybWFsO1xuICAgIHZhciBhY3Rpb24gPSB0aGlzLm9wdGlvbnMub25Db250YWN0O1xuICAgIHZhciByZXN0aXR1dGlvbiA9IHRoaXMub3B0aW9ucy5yZXN0aXR1dGlvbjtcbiAgICB2YXIgaW1wdWxzZSA9IHRoaXMuaW1wdWxzZTtcbiAgICB2YXIgZHJpZnQgPSB0aGlzLm9wdGlvbnMuZHJpZnQ7XG4gICAgdmFyIHNsb3AgPSAtdGhpcy5vcHRpb25zLnNsb3A7XG4gICAgdmFyIGdhbW1hID0gMDtcbiAgICBpZiAodGhpcy5fZXZlbnRPdXRwdXQpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgcGFydGljbGU6IHBhcnRpY2xlLFxuICAgICAgICAgICAgICAgIHdhbGw6IHRoaXMsXG4gICAgICAgICAgICAgICAgb3ZlcmxhcDogb3ZlcmxhcCxcbiAgICAgICAgICAgICAgICBub3JtYWw6IG5cbiAgICAgICAgICAgIH07XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3ByZUNvbGxpc2lvbicsIGRhdGEpO1xuICAgICAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdjb2xsaXNpb24nLCBkYXRhKTtcbiAgICB9XG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlIFdhbGwuT05fQ09OVEFDVC5SRUZMRUNUOlxuICAgICAgICB2YXIgbGFtYmRhID0gb3ZlcmxhcCA8IHNsb3AgPyAtKCgxICsgcmVzdGl0dXRpb24pICogbi5kb3QodikgKyBkcmlmdCAvIGR0ICogKG92ZXJsYXAgLSBzbG9wKSkgLyAobSAqIGR0ICsgZ2FtbWEpIDogLSgoMSArIHJlc3RpdHV0aW9uKSAqIG4uZG90KHYpKSAvIChtICogZHQgKyBnYW1tYSk7XG4gICAgICAgIGltcHVsc2Uuc2V0KG4ubXVsdChkdCAqIGxhbWJkYSkpO1xuICAgICAgICBwYXJ0aWNsZS5hcHBseUltcHVsc2UoaW1wdWxzZSk7XG4gICAgICAgIHBhcnRpY2xlLnNldFBvc2l0aW9uKHAuYWRkKG4ubXVsdCgtb3ZlcmxhcCkpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLl9ldmVudE91dHB1dClcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgncG9zdENvbGxpc2lvbicsIGRhdGEpO1xufVxuZnVuY3Rpb24gX29uRXhpdChwYXJ0aWNsZSwgb3ZlcmxhcCwgZHQpIHtcbiAgICB2YXIgYWN0aW9uID0gdGhpcy5vcHRpb25zLm9uQ29udGFjdDtcbiAgICB2YXIgcCA9IHBhcnRpY2xlLnBvc2l0aW9uO1xuICAgIHZhciBuID0gdGhpcy5vcHRpb25zLm5vcm1hbDtcbiAgICBpZiAoYWN0aW9uID09PSBXYWxsLk9OX0NPTlRBQ1QuUkVGTEVDVCkge1xuICAgICAgICBwYXJ0aWNsZS5zZXRQb3NpdGlvbihwLmFkZChuLm11bHQoLW92ZXJsYXApKSk7XG4gICAgfVxufVxuV2FsbC5wcm90b3R5cGUuYXBwbHlDb25zdHJhaW50ID0gZnVuY3Rpb24gYXBwbHlDb25zdHJhaW50KHRhcmdldHMsIHNvdXJjZSwgZHQpIHtcbiAgICB2YXIgbiA9IHRoaXMub3B0aW9ucy5ub3JtYWw7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJ0aWNsZSA9IHRhcmdldHNbaV07XG4gICAgICAgIHZhciBwID0gcGFydGljbGUucG9zaXRpb247XG4gICAgICAgIHZhciB2ID0gcGFydGljbGUudmVsb2NpdHk7XG4gICAgICAgIHZhciByID0gcGFydGljbGUucmFkaXVzIHx8IDA7XG4gICAgICAgIHZhciBvdmVybGFwID0gX2dldERpc3RhbmNlRnJvbU9yaWdpbi5jYWxsKHRoaXMsIHAuYWRkKG4ubXVsdCgtcikpKTtcbiAgICAgICAgdmFyIG52ID0gX2dldE5vcm1hbFZlbG9jaXR5LmNhbGwodGhpcywgbiwgdik7XG4gICAgICAgIGlmIChvdmVybGFwIDw9IDApIHtcbiAgICAgICAgICAgIGlmIChudiA8IDApXG4gICAgICAgICAgICAgICAgX29uRW50ZXIuY2FsbCh0aGlzLCBwYXJ0aWNsZSwgb3ZlcmxhcCwgZHQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIF9vbkV4aXQuY2FsbCh0aGlzLCBwYXJ0aWNsZSwgb3ZlcmxhcCwgZHQpO1xuICAgICAgICB9XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gV2FsbDsiLCJ2YXIgQ29uc3RyYWludCA9IHJlcXVpcmUoJy4vQ29uc3RyYWludCcpO1xudmFyIFdhbGwgPSByZXF1aXJlKCcuL1dhbGwnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFdhbGxzKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFdhbGxzLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICBfY3JlYXRlQ29tcG9uZW50cy5jYWxsKHRoaXMsIG9wdGlvbnMuc2lkZXMgfHwgdGhpcy5vcHRpb25zLnNpZGVzKTtcbiAgICBDb25zdHJhaW50LmNhbGwodGhpcyk7XG59XG5XYWxscy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnN0cmFpbnQucHJvdG90eXBlKTtcbldhbGxzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFdhbGxzO1xuV2FsbHMuT05fQ09OVEFDVCA9IFdhbGwuT05fQ09OVEFDVDtcbldhbGxzLlNJREVTID0ge1xuICAgIExFRlQ6IDAsXG4gICAgUklHSFQ6IDEsXG4gICAgVE9QOiAyLFxuICAgIEJPVFRPTTogMyxcbiAgICBGUk9OVDogNCxcbiAgICBCQUNLOiA1LFxuICAgIFRXT19ESU1FTlNJT05BTDogW1xuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAyLFxuICAgICAgICAzXG4gICAgXSxcbiAgICBUSFJFRV9ESU1FTlNJT05BTDogW1xuICAgICAgICAwLFxuICAgICAgICAxLFxuICAgICAgICAyLFxuICAgICAgICAzLFxuICAgICAgICA0LFxuICAgICAgICA1XG4gICAgXVxufTtcbldhbGxzLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBzaWRlczogV2FsbHMuU0lERVMuVFdPX0RJTUVOU0lPTkFMLFxuICAgIHNpemU6IFtcbiAgICAgICAgd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgICAgMFxuICAgIF0sXG4gICAgb3JpZ2luOiBbXG4gICAgICAgIDAuNSxcbiAgICAgICAgMC41LFxuICAgICAgICAwLjVcbiAgICBdLFxuICAgIGRyaWZ0OiAwLjUsXG4gICAgc2xvcDogMCxcbiAgICByZXN0aXR1dGlvbjogMC41LFxuICAgIG9uQ29udGFjdDogV2FsbHMuT05fQ09OVEFDVC5SRUZMRUNUXG59O1xudmFyIF9TSURFX05PUk1BTFMgPSB7XG4gICAgICAgIDA6IG5ldyBWZWN0b3IoMSwgMCwgMCksXG4gICAgICAgIDE6IG5ldyBWZWN0b3IoLTEsIDAsIDApLFxuICAgICAgICAyOiBuZXcgVmVjdG9yKDAsIDEsIDApLFxuICAgICAgICAzOiBuZXcgVmVjdG9yKDAsIC0xLCAwKSxcbiAgICAgICAgNDogbmV3IFZlY3RvcigwLCAwLCAxKSxcbiAgICAgICAgNTogbmV3IFZlY3RvcigwLCAwLCAtMSlcbiAgICB9O1xuZnVuY3Rpb24gX2dldERpc3RhbmNlKHNpZGUsIHNpemUsIG9yaWdpbikge1xuICAgIHZhciBkaXN0YW5jZTtcbiAgICB2YXIgU0lERVMgPSBXYWxscy5TSURFUztcbiAgICBzd2l0Y2ggKHBhcnNlSW50KHNpZGUpKSB7XG4gICAgY2FzZSBTSURFUy5MRUZUOlxuICAgICAgICBkaXN0YW5jZSA9IHNpemVbMF0gKiBvcmlnaW5bMF07XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgU0lERVMuVE9QOlxuICAgICAgICBkaXN0YW5jZSA9IHNpemVbMV0gKiBvcmlnaW5bMV07XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgU0lERVMuRlJPTlQ6XG4gICAgICAgIGRpc3RhbmNlID0gc2l6ZVsyXSAqIG9yaWdpblsyXTtcbiAgICAgICAgYnJlYWs7XG4gICAgY2FzZSBTSURFUy5SSUdIVDpcbiAgICAgICAgZGlzdGFuY2UgPSBzaXplWzBdICogKDEgLSBvcmlnaW5bMF0pO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFNJREVTLkJPVFRPTTpcbiAgICAgICAgZGlzdGFuY2UgPSBzaXplWzFdICogKDEgLSBvcmlnaW5bMV0pO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFNJREVTLkJBQ0s6XG4gICAgICAgIGRpc3RhbmNlID0gc2l6ZVsyXSAqICgxIC0gb3JpZ2luWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBkaXN0YW5jZTtcbn1cbldhbGxzLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdmFyIHJlc2l6ZUZsYWcgPSBmYWxzZTtcbiAgICBpZiAob3B0aW9ucy5yZXN0aXR1dGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBfc2V0T3B0aW9uc0ZvckVhY2guY2FsbCh0aGlzLCB7IHJlc3RpdHV0aW9uOiBvcHRpb25zLnJlc3RpdHV0aW9uIH0pO1xuICAgIGlmIChvcHRpb25zLmRyaWZ0ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIF9zZXRPcHRpb25zRm9yRWFjaC5jYWxsKHRoaXMsIHsgZHJpZnQ6IG9wdGlvbnMuZHJpZnQgfSk7XG4gICAgaWYgKG9wdGlvbnMuc2xvcCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICBfc2V0T3B0aW9uc0ZvckVhY2guY2FsbCh0aGlzLCB7IHNsb3A6IG9wdGlvbnMuc2xvcCB9KTtcbiAgICBpZiAob3B0aW9ucy5vbkNvbnRhY3QgIT09IHVuZGVmaW5lZClcbiAgICAgICAgX3NldE9wdGlvbnNGb3JFYWNoLmNhbGwodGhpcywgeyBvbkNvbnRhY3Q6IG9wdGlvbnMub25Db250YWN0IH0pO1xuICAgIGlmIChvcHRpb25zLnNpemUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzaXplRmxhZyA9IHRydWU7XG4gICAgaWYgKG9wdGlvbnMuc2lkZXMgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLnNpZGVzID0gb3B0aW9ucy5zaWRlcztcbiAgICBpZiAob3B0aW9ucy5vcmlnaW4gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmVzaXplRmxhZyA9IHRydWU7XG4gICAgaWYgKHJlc2l6ZUZsYWcpXG4gICAgICAgIHRoaXMuc2V0U2l6ZShvcHRpb25zLnNpemUsIG9wdGlvbnMub3JpZ2luKTtcbn07XG5mdW5jdGlvbiBfY3JlYXRlQ29tcG9uZW50cyhzaWRlcykge1xuICAgIHRoaXMuY29tcG9uZW50cyA9IHt9O1xuICAgIHZhciBjb21wb25lbnRzID0gdGhpcy5jb21wb25lbnRzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2lkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNpZGUgPSBzaWRlc1tpXTtcbiAgICAgICAgY29tcG9uZW50c1tpXSA9IG5ldyBXYWxsKHtcbiAgICAgICAgICAgIG5vcm1hbDogX1NJREVfTk9STUFMU1tzaWRlXS5jbG9uZSgpLFxuICAgICAgICAgICAgZGlzdGFuY2U6IF9nZXREaXN0YW5jZShzaWRlLCB0aGlzLm9wdGlvbnMuc2l6ZSwgdGhpcy5vcHRpb25zLm9yaWdpbilcbiAgICAgICAgfSk7XG4gICAgfVxufVxuV2FsbHMucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbiBzZXRTaXplKHNpemUsIG9yaWdpbikge1xuICAgIG9yaWdpbiA9IG9yaWdpbiB8fCB0aGlzLm9wdGlvbnMub3JpZ2luO1xuICAgIGlmIChvcmlnaW4ubGVuZ3RoIDwgMylcbiAgICAgICAgb3JpZ2luWzJdID0gMC41O1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAod2FsbCwgc2lkZSkge1xuICAgICAgICB2YXIgZCA9IF9nZXREaXN0YW5jZShzaWRlLCBzaXplLCBvcmlnaW4pO1xuICAgICAgICB3YWxsLnNldE9wdGlvbnMoeyBkaXN0YW5jZTogZCB9KTtcbiAgICB9KTtcbiAgICB0aGlzLm9wdGlvbnMuc2l6ZSA9IHNpemU7XG4gICAgdGhpcy5vcHRpb25zLm9yaWdpbiA9IG9yaWdpbjtcbn07XG5mdW5jdGlvbiBfc2V0T3B0aW9uc0ZvckVhY2gob3B0aW9ucykge1xuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAod2FsbCkge1xuICAgICAgICB3YWxsLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfSk7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpXG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xufVxuV2FsbHMucHJvdG90eXBlLmFwcGx5Q29uc3RyYWludCA9IGZ1bmN0aW9uIGFwcGx5Q29uc3RyYWludCh0YXJnZXRzLCBzb3VyY2UsIGR0KSB7XG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uICh3YWxsKSB7XG4gICAgICAgIHdhbGwuYXBwbHlDb25zdHJhaW50KHRhcmdldHMsIHNvdXJjZSwgZHQpO1xuICAgIH0pO1xufTtcbldhbGxzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICAgIHZhciBzaWRlcyA9IHRoaXMub3B0aW9ucy5zaWRlcztcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5zaWRlcylcbiAgICAgICAgZm4oc2lkZXNba2V5XSwga2V5KTtcbn07XG5XYWxscy5wcm90b3R5cGUucm90YXRlWiA9IGZ1bmN0aW9uIHJvdGF0ZVooYW5nbGUpIHtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHdhbGwpIHtcbiAgICAgICAgdmFyIG4gPSB3YWxsLm9wdGlvbnMubm9ybWFsO1xuICAgICAgICBuLnJvdGF0ZVooYW5nbGUpLnB1dChuKTtcbiAgICB9KTtcbn07XG5XYWxscy5wcm90b3R5cGUucm90YXRlWCA9IGZ1bmN0aW9uIHJvdGF0ZVgoYW5nbGUpIHtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHdhbGwpIHtcbiAgICAgICAgdmFyIG4gPSB3YWxsLm9wdGlvbnMubm9ybWFsO1xuICAgICAgICBuLnJvdGF0ZVgoYW5nbGUpLnB1dChuKTtcbiAgICB9KTtcbn07XG5XYWxscy5wcm90b3R5cGUucm90YXRlWSA9IGZ1bmN0aW9uIHJvdGF0ZVkoYW5nbGUpIHtcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHdhbGwpIHtcbiAgICAgICAgdmFyIG4gPSB3YWxsLm9wdGlvbnMubm9ybWFsO1xuICAgICAgICBuLnJvdGF0ZVkoYW5nbGUpLnB1dChuKTtcbiAgICB9KTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFdhbGxzOyIsInZhciBGb3JjZSA9IHJlcXVpcmUoJy4vRm9yY2UnKTtcbmZ1bmN0aW9uIERyYWcob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUodGhpcy5jb25zdHJ1Y3Rvci5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgRm9yY2UuY2FsbCh0aGlzKTtcbn1cbkRyYWcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShGb3JjZS5wcm90b3R5cGUpO1xuRHJhZy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBEcmFnO1xuRHJhZy5GT1JDRV9GVU5DVElPTlMgPSB7XG4gICAgTElORUFSOiBmdW5jdGlvbiAodmVsb2NpdHkpIHtcbiAgICAgICAgcmV0dXJuIHZlbG9jaXR5O1xuICAgIH0sXG4gICAgUVVBRFJBVElDOiBmdW5jdGlvbiAodmVsb2NpdHkpIHtcbiAgICAgICAgcmV0dXJuIHZlbG9jaXR5Lm11bHQodmVsb2NpdHkubm9ybSgpKTtcbiAgICB9XG59O1xuRHJhZy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgc3RyZW5ndGg6IDAuMDEsXG4gICAgZm9yY2VGdW5jdGlvbjogRHJhZy5GT1JDRV9GVU5DVElPTlMuTElORUFSXG59O1xuRHJhZy5wcm90b3R5cGUuYXBwbHlGb3JjZSA9IGZ1bmN0aW9uIGFwcGx5Rm9yY2UodGFyZ2V0cykge1xuICAgIHZhciBzdHJlbmd0aCA9IHRoaXMub3B0aW9ucy5zdHJlbmd0aDtcbiAgICB2YXIgZm9yY2VGdW5jdGlvbiA9IHRoaXMub3B0aW9ucy5mb3JjZUZ1bmN0aW9uO1xuICAgIHZhciBmb3JjZSA9IHRoaXMuZm9yY2U7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRhcmdldHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBwYXJ0aWNsZSA9IHRhcmdldHNbaW5kZXhdO1xuICAgICAgICBmb3JjZUZ1bmN0aW9uKHBhcnRpY2xlLnZlbG9jaXR5KS5tdWx0KC1zdHJlbmd0aCkucHV0KGZvcmNlKTtcbiAgICAgICAgcGFydGljbGUuYXBwbHlGb3JjZShmb3JjZSk7XG4gICAgfVxufTtcbkRyYWcucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucylcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBEcmFnOyIsInZhciBWZWN0b3IgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9WZWN0b3InKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbmZ1bmN0aW9uIEZvcmNlKGZvcmNlKSB7XG4gICAgdGhpcy5mb3JjZSA9IG5ldyBWZWN0b3IoZm9yY2UpO1xuICAgIHRoaXMuX2VuZXJneSA9IDA7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBudWxsO1xufVxuRm9yY2UucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucylcbiAgICAgICAgdGhpcy5vcHRpb25zW2tleV0gPSBvcHRpb25zW2tleV07XG59O1xuRm9yY2UucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKGJvZHkpIHtcbiAgICBib2R5LmFwcGx5Rm9yY2UodGhpcy5mb3JjZSk7XG59O1xuRm9yY2UucHJvdG90eXBlLmdldEVuZXJneSA9IGZ1bmN0aW9uIGdldEVuZXJneSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZW5lcmd5O1xufTtcbkZvcmNlLnByb3RvdHlwZS5zZXRFbmVyZ3kgPSBmdW5jdGlvbiBzZXRFbmVyZ3koZW5lcmd5KSB7XG4gICAgdGhpcy5fZW5lcmd5ID0gZW5lcmd5O1xufTtcbmZ1bmN0aW9uIF9jcmVhdGVFdmVudE91dHB1dCgpIHtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5iaW5kVGhpcyh0aGlzKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5Gb3JjZS5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbigpIHtcbiAgICBfY3JlYXRlRXZlbnRPdXRwdXQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5vbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbkZvcmNlLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuRm9yY2UucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbiBwaXBlKCkge1xuICAgIF9jcmVhdGVFdmVudE91dHB1dC5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzLnBpcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5Gb3JjZS5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcigpIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVMaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbkZvcmNlLnByb3RvdHlwZS51bnBpcGUgPSBmdW5jdGlvbiB1bnBpcGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudW5waXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBGb3JjZTsiLCJ2YXIgRm9yY2UgPSByZXF1aXJlKCcuL0ZvcmNlJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBSZXB1bHNpb24ob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoUmVwdWxzaW9uLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmRpc3AgPSBuZXcgVmVjdG9yKCk7XG4gICAgRm9yY2UuY2FsbCh0aGlzKTtcbn1cblJlcHVsc2lvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvcmNlLnByb3RvdHlwZSk7XG5SZXB1bHNpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVwdWxzaW9uO1xuUmVwdWxzaW9uLkRFQ0FZX0ZVTkNUSU9OUyA9IHtcbiAgICBMSU5FQVI6IGZ1bmN0aW9uIChyLCBjdXRvZmYpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KDEgLSAxIC8gY3V0b2ZmICogciwgMCk7XG4gICAgfSxcbiAgICBNT1JTRTogZnVuY3Rpb24gKHIsIGN1dG9mZikge1xuICAgICAgICB2YXIgcjAgPSBjdXRvZmYgPT09IDAgPyAxMDAgOiBjdXRvZmY7XG4gICAgICAgIHZhciByU2hpZnRlZCA9IHIgKyByMCAqICgxIC0gTWF0aC5sb2coMikpO1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMSAtIE1hdGgucG93KDEgLSBNYXRoLmV4cChyU2hpZnRlZCAvIHIwIC0gMSksIDIpLCAwKTtcbiAgICB9LFxuICAgIElOVkVSU0U6IGZ1bmN0aW9uIChyLCBjdXRvZmYpIHtcbiAgICAgICAgcmV0dXJuIDEgLyAoMSAtIGN1dG9mZiArIHIpO1xuICAgIH0sXG4gICAgR1JBVklUWTogZnVuY3Rpb24gKHIsIGN1dG9mZikge1xuICAgICAgICByZXR1cm4gMSAvICgxIC0gY3V0b2ZmICsgciAqIHIpO1xuICAgIH1cbn07XG5SZXB1bHNpb24uREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHN0cmVuZ3RoOiAxLFxuICAgIGFuY2hvcjogdW5kZWZpbmVkLFxuICAgIHJhbmdlOiBbXG4gICAgICAgIDAsXG4gICAgICAgIEluZmluaXR5XG4gICAgXSxcbiAgICBjdXRvZmY6IDAsXG4gICAgY2FwOiBJbmZpbml0eSxcbiAgICBkZWNheUZ1bmN0aW9uOiBSZXB1bHNpb24uREVDQVlfRlVOQ1RJT05TLkdSQVZJVFlcbn07XG5SZXB1bHNpb24ucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5hbmNob3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IucG9zaXRpb24gaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3IucG9zaXRpb247XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmFuY2hvciA9IG5ldyBWZWN0b3Iob3B0aW9ucy5hbmNob3IpO1xuICAgICAgICBkZWxldGUgb3B0aW9ucy5hbmNob3I7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBvcHRpb25zKVxuICAgICAgICB0aGlzLm9wdGlvbnNba2V5XSA9IG9wdGlvbnNba2V5XTtcbn07XG5SZXB1bHNpb24ucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMsIHNvdXJjZSkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBmb3JjZSA9IHRoaXMuZm9yY2U7XG4gICAgdmFyIGRpc3AgPSB0aGlzLmRpc3A7XG4gICAgdmFyIHN0cmVuZ3RoID0gb3B0aW9ucy5zdHJlbmd0aDtcbiAgICB2YXIgYW5jaG9yID0gb3B0aW9ucy5hbmNob3IgfHwgc291cmNlLnBvc2l0aW9uO1xuICAgIHZhciBjYXAgPSBvcHRpb25zLmNhcDtcbiAgICB2YXIgY3V0b2ZmID0gb3B0aW9ucy5jdXRvZmY7XG4gICAgdmFyIHJNaW4gPSBvcHRpb25zLnJhbmdlWzBdO1xuICAgIHZhciByTWF4ID0gb3B0aW9ucy5yYW5nZVsxXTtcbiAgICB2YXIgZGVjYXlGbiA9IG9wdGlvbnMuZGVjYXlGdW5jdGlvbjtcbiAgICBpZiAoc3RyZW5ndGggPT09IDApXG4gICAgICAgIHJldHVybjtcbiAgICBmb3IgKHZhciBpbmRleCBpbiB0YXJnZXRzKSB7XG4gICAgICAgIHZhciBwYXJ0aWNsZSA9IHRhcmdldHNbaW5kZXhdO1xuICAgICAgICBpZiAocGFydGljbGUgPT09IHNvdXJjZSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB2YXIgbTEgPSBwYXJ0aWNsZS5tYXNzO1xuICAgICAgICB2YXIgcDEgPSBwYXJ0aWNsZS5wb3NpdGlvbjtcbiAgICAgICAgZGlzcC5zZXQocDEuc3ViKGFuY2hvcikpO1xuICAgICAgICB2YXIgciA9IGRpc3Aubm9ybSgpO1xuICAgICAgICBpZiAociA8IHJNYXggJiYgciA+IHJNaW4pIHtcbiAgICAgICAgICAgIGZvcmNlLnNldChkaXNwLm5vcm1hbGl6ZShzdHJlbmd0aCAqIG0xICogZGVjYXlGbihyLCBjdXRvZmYpKS5jYXAoY2FwKSk7XG4gICAgICAgICAgICBwYXJ0aWNsZS5hcHBseUZvcmNlKGZvcmNlKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFJlcHVsc2lvbjsiLCJ2YXIgRHJhZyA9IHJlcXVpcmUoJy4vRHJhZycpO1xuZnVuY3Rpb24gUm90YXRpb25hbERyYWcob3B0aW9ucykge1xuICAgIERyYWcuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblJvdGF0aW9uYWxEcmFnLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRHJhZy5wcm90b3R5cGUpO1xuUm90YXRpb25hbERyYWcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUm90YXRpb25hbERyYWc7XG5Sb3RhdGlvbmFsRHJhZy5ERUZBVUxUX09QVElPTlMgPSBEcmFnLkRFRkFVTFRfT1BUSU9OUztcblJvdGF0aW9uYWxEcmFnLkZPUkNFX0ZVTkNUSU9OUyA9IERyYWcuRk9SQ0VfRlVOQ1RJT05TO1xuUm90YXRpb25hbERyYWcuRk9SQ0VfRlVOQ1RJT05TID0ge1xuICAgIExJTkVBUjogZnVuY3Rpb24gKGFuZ3VsYXJWZWxvY2l0eSkge1xuICAgICAgICByZXR1cm4gYW5ndWxhclZlbG9jaXR5O1xuICAgIH0sXG4gICAgUVVBRFJBVElDOiBmdW5jdGlvbiAoYW5ndWxhclZlbG9jaXR5KSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyVmVsb2NpdHkubXVsdChhbmd1bGFyVmVsb2NpdHkubm9ybSgpKTtcbiAgICB9XG59O1xuUm90YXRpb25hbERyYWcucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMpIHtcbiAgICB2YXIgc3RyZW5ndGggPSB0aGlzLm9wdGlvbnMuc3RyZW5ndGg7XG4gICAgdmFyIGZvcmNlRnVuY3Rpb24gPSB0aGlzLm9wdGlvbnMuZm9yY2VGdW5jdGlvbjtcbiAgICB2YXIgZm9yY2UgPSB0aGlzLmZvcmNlO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCB0YXJnZXRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgcGFydGljbGUgPSB0YXJnZXRzW2luZGV4XTtcbiAgICAgICAgZm9yY2VGdW5jdGlvbihwYXJ0aWNsZS5hbmd1bGFyVmVsb2NpdHkpLm11bHQoLTEwMCAqIHN0cmVuZ3RoKS5wdXQoZm9yY2UpO1xuICAgICAgICBwYXJ0aWNsZS5hcHBseVRvcnF1ZShmb3JjZSk7XG4gICAgfVxufTtcblJvdGF0aW9uYWxEcmFnLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpXG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xufTtcbm1vZHVsZS5leHBvcnRzID0gUm90YXRpb25hbERyYWc7IiwidmFyIFNwcmluZyA9IHJlcXVpcmUoJy4vU3ByaW5nJyk7XG5mdW5jdGlvbiBSb3RhdGlvbmFsU3ByaW5nKG9wdGlvbnMpIHtcbiAgICBTcHJpbmcuY2FsbCh0aGlzLCBvcHRpb25zKTtcbn1cblJvdGF0aW9uYWxTcHJpbmcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTcHJpbmcucHJvdG90eXBlKTtcblJvdGF0aW9uYWxTcHJpbmcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUm90YXRpb25hbFNwcmluZztcblJvdGF0aW9uYWxTcHJpbmcuREVGQVVMVF9PUFRJT05TID0gU3ByaW5nLkRFRkFVTFRfT1BUSU9OUztcblJvdGF0aW9uYWxTcHJpbmcuRk9SQ0VfRlVOQ1RJT05TID0gU3ByaW5nLkZPUkNFX0ZVTkNUSU9OUztcblJvdGF0aW9uYWxTcHJpbmcucHJvdG90eXBlLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiBhcHBseUZvcmNlKHRhcmdldHMpIHtcbiAgICB2YXIgZm9yY2UgPSB0aGlzLmZvcmNlO1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciBkaXNwID0gdGhpcy5kaXNwO1xuICAgIHZhciBzdGlmZm5lc3MgPSBvcHRpb25zLnN0aWZmbmVzcztcbiAgICB2YXIgZGFtcGluZyA9IG9wdGlvbnMuZGFtcGluZztcbiAgICB2YXIgcmVzdExlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvcjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhcmdldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IHRhcmdldHNbaV07XG4gICAgICAgIGRpc3Auc2V0KGFuY2hvci5zdWIodGFyZ2V0Lm9yaWVudGF0aW9uKSk7XG4gICAgICAgIHZhciBkaXN0ID0gZGlzcC5ub3JtKCkgLSByZXN0TGVuZ3RoO1xuICAgICAgICBpZiAoZGlzdCA9PT0gMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIG0gPSB0YXJnZXQubWFzcztcbiAgICAgICAgc3RpZmZuZXNzICo9IG07XG4gICAgICAgIGRhbXBpbmcgKj0gbTtcbiAgICAgICAgZm9yY2Uuc2V0KGRpc3Aubm9ybWFsaXplKHN0aWZmbmVzcyAqIHRoaXMuZm9yY2VGdW5jdGlvbihkaXN0LCB0aGlzLm9wdGlvbnMubE1heCkpKTtcbiAgICAgICAgaWYgKGRhbXBpbmcpXG4gICAgICAgICAgICBmb3JjZS5zZXQoZm9yY2UuYWRkKHRhcmdldC5hbmd1bGFyVmVsb2NpdHkubXVsdCgtZGFtcGluZykpKTtcbiAgICAgICAgdGFyZ2V0LmFwcGx5VG9ycXVlKGZvcmNlKTtcbiAgICB9XG59O1xuUm90YXRpb25hbFNwcmluZy5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KHRhcmdldCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIGFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xuICAgIHZhciBzdHJlbmd0aCA9IG9wdGlvbnMuc3RpZmZuZXNzO1xuICAgIHZhciBkaXN0ID0gYW5jaG9yLnN1Yih0YXJnZXQub3JpZW50YXRpb24pLm5vcm0oKSAtIHJlc3RMZW5ndGg7XG4gICAgcmV0dXJuIDAuNSAqIHN0cmVuZ3RoICogZGlzdCAqIGRpc3Q7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBSb3RhdGlvbmFsU3ByaW5nOyIsInZhciBGb3JjZSA9IHJlcXVpcmUoJy4vRm9yY2UnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFNwcmluZyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvbnN0cnVjdG9yLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmRpc3AgPSBuZXcgVmVjdG9yKDAsIDAsIDApO1xuICAgIF9pbml0LmNhbGwodGhpcyk7XG4gICAgRm9yY2UuY2FsbCh0aGlzKTtcbn1cblNwcmluZy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEZvcmNlLnByb3RvdHlwZSk7XG5TcHJpbmcucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ByaW5nO1xudmFyIHBpID0gTWF0aC5QSTtcblNwcmluZy5GT1JDRV9GVU5DVElPTlMgPSB7XG4gICAgRkVORTogZnVuY3Rpb24gKGRpc3QsIHJNYXgpIHtcbiAgICAgICAgdmFyIHJNYXhTbWFsbCA9IHJNYXggKiAwLjk5O1xuICAgICAgICB2YXIgciA9IE1hdGgubWF4KE1hdGgubWluKGRpc3QsIHJNYXhTbWFsbCksIC1yTWF4U21hbGwpO1xuICAgICAgICByZXR1cm4gciAvICgxIC0gciAqIHIgLyAock1heCAqIHJNYXgpKTtcbiAgICB9LFxuICAgIEhPT0s6IGZ1bmN0aW9uIChkaXN0KSB7XG4gICAgICAgIHJldHVybiBkaXN0O1xuICAgIH1cbn07XG5TcHJpbmcuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHBlcmlvZDogMzAwLFxuICAgIGRhbXBpbmdSYXRpbzogMC4xLFxuICAgIGxlbmd0aDogMCxcbiAgICBtYXhMZW5ndGg6IEluZmluaXR5LFxuICAgIGFuY2hvcjogdW5kZWZpbmVkLFxuICAgIGZvcmNlRnVuY3Rpb246IFNwcmluZy5GT1JDRV9GVU5DVElPTlMuSE9PS1xufTtcbmZ1bmN0aW9uIF9zZXRGb3JjZUZ1bmN0aW9uKGZuKSB7XG4gICAgdGhpcy5mb3JjZUZ1bmN0aW9uID0gZm47XG59XG5mdW5jdGlvbiBfY2FsY1N0aWZmbmVzcygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLnN0aWZmbmVzcyA9IE1hdGgucG93KDIgKiBwaSAvIG9wdGlvbnMucGVyaW9kLCAyKTtcbn1cbmZ1bmN0aW9uIF9jYWxjRGFtcGluZygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICBvcHRpb25zLmRhbXBpbmcgPSA0ICogcGkgKiBvcHRpb25zLmRhbXBpbmdSYXRpbyAvIG9wdGlvbnMucGVyaW9kO1xufVxuZnVuY3Rpb24gX2NhbGNFbmVyZ3koc3RyZW5ndGgsIGRpc3QpIHtcbiAgICByZXR1cm4gMC41ICogc3RyZW5ndGggKiBkaXN0ICogZGlzdDtcbn1cbmZ1bmN0aW9uIF9pbml0KCkge1xuICAgIF9zZXRGb3JjZUZ1bmN0aW9uLmNhbGwodGhpcywgdGhpcy5vcHRpb25zLmZvcmNlRnVuY3Rpb24pO1xuICAgIF9jYWxjU3RpZmZuZXNzLmNhbGwodGhpcyk7XG4gICAgX2NhbGNEYW1waW5nLmNhbGwodGhpcyk7XG59XG5TcHJpbmcucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5hbmNob3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAob3B0aW9ucy5hbmNob3IucG9zaXRpb24gaW5zdGFuY2VvZiBWZWN0b3IpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gb3B0aW9ucy5hbmNob3IucG9zaXRpb247XG4gICAgICAgIGlmIChvcHRpb25zLmFuY2hvciBpbnN0YW5jZW9mIFZlY3RvcilcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5hbmNob3IgPSBvcHRpb25zLmFuY2hvcjtcbiAgICAgICAgaWYgKG9wdGlvbnMuYW5jaG9yIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gbmV3IFZlY3RvcihvcHRpb25zLmFuY2hvcik7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnBlcmlvZCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMucGVyaW9kID0gb3B0aW9ucy5wZXJpb2Q7XG4gICAgaWYgKG9wdGlvbnMuZGFtcGluZ1JhdGlvICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5kYW1waW5nUmF0aW8gPSBvcHRpb25zLmRhbXBpbmdSYXRpbztcbiAgICBpZiAob3B0aW9ucy5sZW5ndGggIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmxlbmd0aCA9IG9wdGlvbnMubGVuZ3RoO1xuICAgIGlmIChvcHRpb25zLmZvcmNlRnVuY3Rpb24gIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmZvcmNlRnVuY3Rpb24gPSBvcHRpb25zLmZvcmNlRnVuY3Rpb247XG4gICAgaWYgKG9wdGlvbnMubWF4TGVuZ3RoICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXhMZW5ndGggPSBvcHRpb25zLm1heExlbmd0aDtcbiAgICBfaW5pdC5jYWxsKHRoaXMpO1xufTtcblNwcmluZy5wcm90b3R5cGUuYXBwbHlGb3JjZSA9IGZ1bmN0aW9uIGFwcGx5Rm9yY2UodGFyZ2V0cywgc291cmNlKSB7XG4gICAgdmFyIGZvcmNlID0gdGhpcy5mb3JjZTtcbiAgICB2YXIgZGlzcCA9IHRoaXMuZGlzcDtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICB2YXIgc3RpZmZuZXNzID0gb3B0aW9ucy5zdGlmZm5lc3M7XG4gICAgdmFyIGRhbXBpbmcgPSBvcHRpb25zLmRhbXBpbmc7XG4gICAgdmFyIHJlc3RMZW5ndGggPSBvcHRpb25zLmxlbmd0aDtcbiAgICB2YXIgbE1heCA9IG9wdGlvbnMubWF4TGVuZ3RoO1xuICAgIHZhciBhbmNob3IgPSBvcHRpb25zLmFuY2hvciB8fCBzb3VyY2UucG9zaXRpb247XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXRzW2ldO1xuICAgICAgICB2YXIgcDIgPSB0YXJnZXQucG9zaXRpb247XG4gICAgICAgIHZhciB2MiA9IHRhcmdldC52ZWxvY2l0eTtcbiAgICAgICAgYW5jaG9yLnN1YihwMikucHV0KGRpc3ApO1xuICAgICAgICB2YXIgZGlzdCA9IGRpc3Aubm9ybSgpIC0gcmVzdExlbmd0aDtcbiAgICAgICAgaWYgKGRpc3QgPT09IDApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBtID0gdGFyZ2V0Lm1hc3M7XG4gICAgICAgIHN0aWZmbmVzcyAqPSBtO1xuICAgICAgICBkYW1waW5nICo9IG07XG4gICAgICAgIGRpc3Aubm9ybWFsaXplKHN0aWZmbmVzcyAqIHRoaXMuZm9yY2VGdW5jdGlvbihkaXN0LCBsTWF4KSkucHV0KGZvcmNlKTtcbiAgICAgICAgaWYgKGRhbXBpbmcpXG4gICAgICAgICAgICBpZiAoc291cmNlKVxuICAgICAgICAgICAgICAgIGZvcmNlLmFkZCh2Mi5zdWIoc291cmNlLnZlbG9jaXR5KS5tdWx0KC1kYW1waW5nKSkucHV0KGZvcmNlKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBmb3JjZS5hZGQodjIubXVsdCgtZGFtcGluZykpLnB1dChmb3JjZSk7XG4gICAgICAgIHRhcmdldC5hcHBseUZvcmNlKGZvcmNlKTtcbiAgICAgICAgaWYgKHNvdXJjZSlcbiAgICAgICAgICAgIHNvdXJjZS5hcHBseUZvcmNlKGZvcmNlLm11bHQoLTEpKTtcbiAgICAgICAgdGhpcy5zZXRFbmVyZ3koX2NhbGNFbmVyZ3koc3RpZmZuZXNzLCBkaXN0KSk7XG4gICAgfVxufTtcblNwcmluZy5wcm90b3R5cGUuZ2V0RW5lcmd5ID0gZnVuY3Rpb24gZ2V0RW5lcmd5KHRhcmdldCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuICAgIHZhciByZXN0TGVuZ3RoID0gb3B0aW9ucy5sZW5ndGg7XG4gICAgdmFyIGFuY2hvciA9IG9wdGlvbnMuYW5jaG9yO1xuICAgIHZhciBzdHJlbmd0aCA9IG9wdGlvbnMuc3RpZmZuZXNzO1xuICAgIHZhciBkaXN0ID0gYW5jaG9yLnN1Yih0YXJnZXQucG9zaXRpb24pLm5vcm0oKSAtIHJlc3RMZW5ndGg7XG4gICAgcmV0dXJuIDAuNSAqIHN0cmVuZ3RoICogZGlzdCAqIGRpc3Q7XG59O1xuU3ByaW5nLnByb3RvdHlwZS5zZXRBbmNob3IgPSBmdW5jdGlvbiBzZXRBbmNob3IoYW5jaG9yKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYW5jaG9yKVxuICAgICAgICB0aGlzLm9wdGlvbnMuYW5jaG9yID0gbmV3IFZlY3RvcigpO1xuICAgIHRoaXMub3B0aW9ucy5hbmNob3Iuc2V0KGFuY2hvcik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTcHJpbmc7IiwidmFyIEZvcmNlID0gcmVxdWlyZSgnLi9Gb3JjZScpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gVmVjdG9yRmllbGQob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoVmVjdG9yRmllbGQuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIF9zZXRGaWVsZE9wdGlvbnMuY2FsbCh0aGlzLCB0aGlzLm9wdGlvbnMuZmllbGQpO1xuICAgIEZvcmNlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5ldmFsdWF0aW9uID0gbmV3IFZlY3RvcigwLCAwLCAwKTtcbn1cblZlY3RvckZpZWxkLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRm9yY2UucHJvdG90eXBlKTtcblZlY3RvckZpZWxkLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFZlY3RvckZpZWxkO1xuVmVjdG9yRmllbGQuRklFTERTID0ge1xuICAgIENPTlNUQU5UOiBmdW5jdGlvbiAodiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdi5zZXQob3B0aW9ucy5kaXJlY3Rpb24pO1xuICAgIH0sXG4gICAgTElORUFSOiBmdW5jdGlvbiAodikge1xuICAgICAgICByZXR1cm4gdjtcbiAgICB9LFxuICAgIFJBRElBTDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgcmV0dXJuIHYuc2V0KHYubXVsdCgtMSwgdikpO1xuICAgIH0sXG4gICAgU1BIRVJFX0FUVFJBQ1RPUjogZnVuY3Rpb24gKHYsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHYuc2V0KHYubXVsdCgob3B0aW9ucy5yYWRpdXMgLSB2Lm5vcm0oKSkgLyB2Lm5vcm0oKSkpO1xuICAgIH0sXG4gICAgUE9JTlRfQVRUUkFDVE9SOiBmdW5jdGlvbiAodiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdi5zZXQob3B0aW9ucy5wb3NpdGlvbi5zdWIodikpO1xuICAgIH1cbn07XG5WZWN0b3JGaWVsZC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgc3RyZW5ndGg6IDEsXG4gICAgZmllbGQ6IFZlY3RvckZpZWxkLkZJRUxEUy5DT05TVEFOVFxufTtcblZlY3RvckZpZWxkLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpXG4gICAgICAgIHRoaXMub3B0aW9uc1trZXldID0gb3B0aW9uc1trZXldO1xufTtcbmZ1bmN0aW9uIF9zZXRGaWVsZE9wdGlvbnMoZmllbGQpIHtcbiAgICB2YXIgRklFTERTID0gVmVjdG9yRmllbGQuRklFTERTO1xuICAgIHN3aXRjaCAoZmllbGQpIHtcbiAgICBjYXNlIEZJRUxEUy5DT05TVEFOVDpcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlyZWN0aW9uKVxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9IG5ldyBWZWN0b3IoMCwgMSwgMCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgRklFTERTLlBPSU5UX0FUVFJBQ1RPUjpcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMucG9zaXRpb24pXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucG9zaXRpb24gPSBuZXcgVmVjdG9yKDAsIDAsIDApO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIEZJRUxEUy5TUEhFUkVfQVRUUkFDVE9SOlxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy5yYWRpdXMpXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMucmFkaXVzID0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuZnVuY3Rpb24gX2V2YWx1YXRlKHYpIHtcbiAgICB2YXIgZXZhbHVhdGlvbiA9IHRoaXMuZXZhbHVhdGlvbjtcbiAgICB2YXIgZmllbGQgPSB0aGlzLm9wdGlvbnMuZmllbGQ7XG4gICAgZXZhbHVhdGlvbi5zZXQodik7XG4gICAgcmV0dXJuIGZpZWxkKGV2YWx1YXRpb24sIHRoaXMub3B0aW9ucyk7XG59XG5WZWN0b3JGaWVsZC5wcm90b3R5cGUuYXBwbHlGb3JjZSA9IGZ1bmN0aW9uIGFwcGx5Rm9yY2UodGFyZ2V0cykge1xuICAgIHZhciBmb3JjZSA9IHRoaXMuZm9yY2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXJnZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwYXJ0aWNsZSA9IHRhcmdldHNbaV07XG4gICAgICAgIGZvcmNlLnNldChfZXZhbHVhdGUuY2FsbCh0aGlzLCBwYXJ0aWNsZS5wb3NpdGlvbikubXVsdChwYXJ0aWNsZS5tYXNzICogdGhpcy5vcHRpb25zLnN0cmVuZ3RoKSk7XG4gICAgICAgIHBhcnRpY2xlLmFwcGx5Rm9yY2UoZm9yY2UpO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvckZpZWxkOyIsInZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG5mdW5jdGlvbiBTeW1wbGVjdGljRXVsZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoU3ltcGxlY3RpY0V1bGVyLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xufVxuU3ltcGxlY3RpY0V1bGVyLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICB2ZWxvY2l0eUNhcDogdW5kZWZpbmVkLFxuICAgIGFuZ3VsYXJWZWxvY2l0eUNhcDogdW5kZWZpbmVkXG59O1xuU3ltcGxlY3RpY0V1bGVyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIucGF0Y2gob3B0aW9ucyk7XG59O1xuU3ltcGxlY3RpY0V1bGVyLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5fb3B0aW9uc01hbmFnZXIudmFsdWUoKTtcbn07XG5TeW1wbGVjdGljRXVsZXIucHJvdG90eXBlLmludGVncmF0ZVZlbG9jaXR5ID0gZnVuY3Rpb24gaW50ZWdyYXRlVmVsb2NpdHkoYm9keSwgZHQpIHtcbiAgICB2YXIgdiA9IGJvZHkudmVsb2NpdHk7XG4gICAgdmFyIHcgPSBib2R5LmludmVyc2VNYXNzO1xuICAgIHZhciBmID0gYm9keS5mb3JjZTtcbiAgICBpZiAoZi5pc1plcm8oKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHYuYWRkKGYubXVsdChkdCAqIHcpKS5wdXQodik7XG4gICAgZi5jbGVhcigpO1xufTtcblN5bXBsZWN0aWNFdWxlci5wcm90b3R5cGUuaW50ZWdyYXRlUG9zaXRpb24gPSBmdW5jdGlvbiBpbnRlZ3JhdGVQb3NpdGlvbihib2R5LCBkdCkge1xuICAgIHZhciBwID0gYm9keS5wb3NpdGlvbjtcbiAgICB2YXIgdiA9IGJvZHkudmVsb2NpdHk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy52ZWxvY2l0eUNhcClcbiAgICAgICAgdi5jYXAodGhpcy5vcHRpb25zLnZlbG9jaXR5Q2FwKS5wdXQodik7XG4gICAgcC5hZGQodi5tdWx0KGR0KSkucHV0KHApO1xufTtcblN5bXBsZWN0aWNFdWxlci5wcm90b3R5cGUuaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtID0gZnVuY3Rpb24gaW50ZWdyYXRlQW5ndWxhck1vbWVudHVtKGJvZHksIGR0KSB7XG4gICAgdmFyIEwgPSBib2R5LmFuZ3VsYXJNb21lbnR1bTtcbiAgICB2YXIgdCA9IGJvZHkudG9ycXVlO1xuICAgIGlmICh0LmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKHRoaXMub3B0aW9ucy5hbmd1bGFyVmVsb2NpdHlDYXApXG4gICAgICAgIHQuY2FwKHRoaXMub3B0aW9ucy5hbmd1bGFyVmVsb2NpdHlDYXApLnB1dCh0KTtcbiAgICBMLmFkZCh0Lm11bHQoZHQpKS5wdXQoTCk7XG4gICAgdC5jbGVhcigpO1xufTtcblN5bXBsZWN0aWNFdWxlci5wcm90b3R5cGUuaW50ZWdyYXRlT3JpZW50YXRpb24gPSBmdW5jdGlvbiBpbnRlZ3JhdGVPcmllbnRhdGlvbihib2R5LCBkdCkge1xuICAgIHZhciBxID0gYm9keS5vcmllbnRhdGlvbjtcbiAgICB2YXIgdyA9IGJvZHkuYW5ndWxhclZlbG9jaXR5O1xuICAgIGlmICh3LmlzWmVybygpKVxuICAgICAgICByZXR1cm47XG4gICAgcS5hZGQocS5tdWx0aXBseSh3KS5zY2FsYXJNdWx0aXBseSgwLjUgKiBkdCkpLnB1dChxKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFN5bXBsZWN0aWNFdWxlcjsiLCJ2YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1N1cmZhY2UnKTtcbmZ1bmN0aW9uIENhbnZhc1N1cmZhY2Uob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuY2FudmFzU2l6ZSlcbiAgICAgICAgdGhpcy5fY2FudmFzU2l6ZSA9IG9wdGlvbnMuY2FudmFzU2l6ZTtcbiAgICBTdXJmYWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKCF0aGlzLl9jYW52YXNTaXplKVxuICAgICAgICB0aGlzLl9jYW52YXNTaXplID0gdGhpcy5nZXRTaXplKCk7XG4gICAgdGhpcy5fYmFja0J1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGlmICh0aGlzLl9jYW52YXNTaXplKSB7XG4gICAgICAgIHRoaXMuX2JhY2tCdWZmZXIud2lkdGggPSB0aGlzLl9jYW52YXNTaXplWzBdO1xuICAgICAgICB0aGlzLl9iYWNrQnVmZmVyLmhlaWdodCA9IHRoaXMuX2NhbnZhc1NpemVbMV07XG4gICAgfVxuICAgIHRoaXMuX2NvbnRleHRJZCA9IHVuZGVmaW5lZDtcbn1cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLnByb3RvdHlwZSk7XG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENhbnZhc1N1cmZhY2U7XG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdjYW52YXMnO1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudENsYXNzID0gJ2ZhbW91cy1zdXJmYWNlJztcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KCkge1xufTtcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5fY2FudmFzU2l6ZSkge1xuICAgICAgICB0YXJnZXQud2lkdGggPSB0aGlzLl9jYW52YXNTaXplWzBdO1xuICAgICAgICB0YXJnZXQuaGVpZ2h0ID0gdGhpcy5fY2FudmFzU2l6ZVsxXTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbnRleHRJZCA9PT0gJzJkJykge1xuICAgICAgICB0YXJnZXQuZ2V0Q29udGV4dCh0aGlzLl9jb250ZXh0SWQpLmRyYXdJbWFnZSh0aGlzLl9iYWNrQnVmZmVyLCAwLCAwKTtcbiAgICAgICAgdGhpcy5fYmFja0J1ZmZlci53aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuX2JhY2tCdWZmZXIuaGVpZ2h0ID0gMDtcbiAgICB9XG59O1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVjYWxsID0gZnVuY3Rpb24gcmVjYWxsKHRhcmdldCkge1xuICAgIHZhciBzaXplID0gdGhpcy5nZXRTaXplKCk7XG4gICAgdGhpcy5fYmFja0J1ZmZlci53aWR0aCA9IHRhcmdldC53aWR0aDtcbiAgICB0aGlzLl9iYWNrQnVmZmVyLmhlaWdodCA9IHRhcmdldC5oZWlnaHQ7XG4gICAgaWYgKHRoaXMuX2NvbnRleHRJZCA9PT0gJzJkJykge1xuICAgICAgICB0aGlzLl9iYWNrQnVmZmVyLmdldENvbnRleHQodGhpcy5fY29udGV4dElkKS5kcmF3SW1hZ2UodGFyZ2V0LCAwLCAwKTtcbiAgICAgICAgdGFyZ2V0LndpZHRoID0gMDtcbiAgICAgICAgdGFyZ2V0LmhlaWdodCA9IDA7XG4gICAgfVxufTtcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldENvbnRleHQgPSBmdW5jdGlvbiBnZXRDb250ZXh0KGNvbnRleHRJZCkge1xuICAgIHRoaXMuX2NvbnRleHRJZCA9IGNvbnRleHRJZDtcbiAgICByZXR1cm4gdGhpcy5fY3VyclRhcmdldCA/IHRoaXMuX2N1cnJUYXJnZXQuZ2V0Q29udGV4dChjb250ZXh0SWQpIDogdGhpcy5fYmFja0J1ZmZlci5nZXRDb250ZXh0KGNvbnRleHRJZCk7XG59O1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uIHNldFNpemUoc2l6ZSwgY2FudmFzU2l6ZSkge1xuICAgIFN1cmZhY2UucHJvdG90eXBlLnNldFNpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoY2FudmFzU2l6ZSlcbiAgICAgICAgdGhpcy5fY2FudmFzU2l6ZSA9IFtcbiAgICAgICAgICAgIGNhbnZhc1NpemVbMF0sXG4gICAgICAgICAgICBjYW52YXNTaXplWzFdXG4gICAgICAgIF07XG4gICAgaWYgKHRoaXMuX2N1cnJUYXJnZXQpIHtcbiAgICAgICAgdGhpcy5fY3VyclRhcmdldC53aWR0aCA9IHRoaXMuX2NhbnZhc1NpemVbMF07XG4gICAgICAgIHRoaXMuX2N1cnJUYXJnZXQuaGVpZ2h0ID0gdGhpcy5fY2FudmFzU2l6ZVsxXTtcbiAgICB9XG59O1xubW9kdWxlLmV4cG9ydHMgPSBDYW52YXNTdXJmYWNlOyIsInZhciBTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvU3VyZmFjZScpO1xudmFyIENvbnRleHQgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9Db250ZXh0Jyk7XG5mdW5jdGlvbiBDb250YWluZXJTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICBTdXJmYWNlLmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgdGhpcy5fY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2ZhbW91cy1ncm91cCcpO1xuICAgIHRoaXMuX2NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmYW1vdXMtY29udGFpbmVyLWdyb3VwJyk7XG4gICAgdGhpcy5fc2hvdWxkUmVjYWxjdWxhdGVTaXplID0gZmFsc2U7XG4gICAgdGhpcy5jb250ZXh0ID0gbmV3IENvbnRleHQodGhpcy5fY29udGFpbmVyKTtcbiAgICB0aGlzLnNldENvbnRlbnQodGhpcy5fY29udGFpbmVyKTtcbn1cbkNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLnByb3RvdHlwZSk7XG5Db250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbnRhaW5lclN1cmZhY2U7XG5Db250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdkaXYnO1xuQ29udGFpbmVyU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudENsYXNzID0gJ2ZhbW91cy1zdXJmYWNlJztcbkNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZXh0LmFkZC5hcHBseSh0aGlzLmNvbnRleHQsIGFyZ3VtZW50cyk7XG59O1xuQ29udGFpbmVyU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLl9zaXplRGlydHkpXG4gICAgICAgIHRoaXMuX3Nob3VsZFJlY2FsY3VsYXRlU2l6ZSA9IHRydWU7XG4gICAgcmV0dXJuIFN1cmZhY2UucHJvdG90eXBlLnJlbmRlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbkNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSgpIHtcbiAgICB0aGlzLl9zaG91bGRSZWNhbGN1bGF0ZVNpemUgPSB0cnVlO1xuICAgIHJldHVybiBTdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5Db250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCwgdHJhbnNmb3JtLCBvcGFjaXR5LCBvcmlnaW4sIHNpemUpIHtcbiAgICB2YXIgcHJldmlvdXNTaXplID0gdGhpcy5fc2l6ZSA/IFtcbiAgICAgICAgICAgIHRoaXMuX3NpemVbMF0sXG4gICAgICAgICAgICB0aGlzLl9zaXplWzFdXG4gICAgICAgIF0gOiBudWxsO1xuICAgIHZhciByZXN1bHQgPSBTdXJmYWNlLnByb3RvdHlwZS5jb21taXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodGhpcy5fc2hvdWxkUmVjYWxjdWxhdGVTaXplIHx8IHByZXZpb3VzU2l6ZSAmJiAodGhpcy5fc2l6ZVswXSAhPT0gcHJldmlvdXNTaXplWzBdIHx8IHRoaXMuX3NpemVbMV0gIT09IHByZXZpb3VzU2l6ZVsxXSkpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnNldFNpemUoKTtcbiAgICAgICAgdGhpcy5fc2hvdWxkUmVjYWxjdWxhdGVTaXplID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dC51cGRhdGUoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gQ29udGFpbmVyU3VyZmFjZTsiLCJ2YXIgQ29udGFpbmVyU3VyZmFjZSA9IHJlcXVpcmUoJy4vQ29udGFpbmVyU3VyZmFjZScpO1xuZnVuY3Rpb24gRm9ybUNvbnRhaW5lclN1cmZhY2Uob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLl9tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCAnJztcbiAgICBDb250YWluZXJTdXJmYWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5Gb3JtQ29udGFpbmVyU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlKTtcbkZvcm1Db250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEZvcm1Db250YWluZXJTdXJmYWNlO1xuRm9ybUNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRUeXBlID0gJ2Zvcm0nO1xuRm9ybUNvbnRhaW5lclN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5fbWV0aG9kKVxuICAgICAgICB0YXJnZXQubWV0aG9kID0gdGhpcy5fbWV0aG9kO1xuICAgIHJldHVybiBDb250YWluZXJTdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZvcm1Db250YWluZXJTdXJmYWNlOyIsInZhciBTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvU3VyZmFjZScpO1xuZnVuY3Rpb24gSW1hZ2VTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9pbWFnZVVybCA9IHVuZGVmaW5lZDtcbiAgICBTdXJmYWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG52YXIgdXJsQ2FjaGUgPSBbXTtcbnZhciBjb3VudENhY2hlID0gW107XG52YXIgbm9kZUNhY2hlID0gW107XG52YXIgY2FjaGVFbmFibGVkID0gdHJ1ZTtcbkltYWdlU3VyZmFjZS5lbmFibGVDYWNoZSA9IGZ1bmN0aW9uIGVuYWJsZUNhY2hlKCkge1xuICAgIGNhY2hlRW5hYmxlZCA9IHRydWU7XG59O1xuSW1hZ2VTdXJmYWNlLmRpc2FibGVDYWNoZSA9IGZ1bmN0aW9uIGRpc2FibGVDYWNoZSgpIHtcbiAgICBjYWNoZUVuYWJsZWQgPSBmYWxzZTtcbn07XG5JbWFnZVN1cmZhY2UuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gICAgdXJsQ2FjaGUgPSBbXTtcbiAgICBjb3VudENhY2hlID0gW107XG4gICAgbm9kZUNhY2hlID0gW107XG59O1xuSW1hZ2VTdXJmYWNlLmdldENhY2hlID0gZnVuY3Rpb24gZ2V0Q2FjaGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXJsQ2FjaGU6IHVybENhY2hlLFxuICAgICAgICBjb3VudENhY2hlOiBjb3VudENhY2hlLFxuICAgICAgICBub2RlQ2FjaGU6IGNvdW50Q2FjaGVcbiAgICB9O1xufTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cmZhY2UucHJvdG90eXBlKTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBJbWFnZVN1cmZhY2U7XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRUeXBlID0gJ2ltZyc7XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRDbGFzcyA9ICdmYW1vdXMtc3VyZmFjZSc7XG5JbWFnZVN1cmZhY2UucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KGltYWdlVXJsKSB7XG4gICAgdmFyIHVybEluZGV4ID0gdXJsQ2FjaGUuaW5kZXhPZih0aGlzLl9pbWFnZVVybCk7XG4gICAgaWYgKHVybEluZGV4ICE9PSAtMSkge1xuICAgICAgICBpZiAoY291bnRDYWNoZVt1cmxJbmRleF0gPT09IDEpIHtcbiAgICAgICAgICAgIHVybENhY2hlLnNwbGljZSh1cmxJbmRleCwgMSk7XG4gICAgICAgICAgICBjb3VudENhY2hlLnNwbGljZSh1cmxJbmRleCwgMSk7XG4gICAgICAgICAgICBub2RlQ2FjaGUuc3BsaWNlKHVybEluZGV4LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvdW50Q2FjaGVbdXJsSW5kZXhdLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXJsSW5kZXggPSB1cmxDYWNoZS5pbmRleE9mKGltYWdlVXJsKTtcbiAgICBpZiAodXJsSW5kZXggPT09IC0xKSB7XG4gICAgICAgIHVybENhY2hlLnB1c2goaW1hZ2VVcmwpO1xuICAgICAgICBjb3VudENhY2hlLnB1c2goMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY291bnRDYWNoZVt1cmxJbmRleF0rKztcbiAgICB9XG4gICAgdGhpcy5faW1hZ2VVcmwgPSBpbWFnZVVybDtcbiAgICB0aGlzLl9jb250ZW50RGlydHkgPSB0cnVlO1xufTtcbkltYWdlU3VyZmFjZS5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gZGVwbG95KHRhcmdldCkge1xuICAgIHZhciB1cmxJbmRleCA9IHVybENhY2hlLmluZGV4T2YodGhpcy5faW1hZ2VVcmwpO1xuICAgIGlmIChub2RlQ2FjaGVbdXJsSW5kZXhdID09PSB1bmRlZmluZWQgJiYgY2FjaGVFbmFibGVkKSB7XG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1nLnNyYyA9IHRoaXMuX2ltYWdlVXJsIHx8ICcnO1xuICAgICAgICBub2RlQ2FjaGVbdXJsSW5kZXhdID0gaW1nO1xuICAgIH1cbiAgICB0YXJnZXQuc3JjID0gdGhpcy5faW1hZ2VVcmwgfHwgJyc7XG59O1xuSW1hZ2VTdXJmYWNlLnByb3RvdHlwZS5yZWNhbGwgPSBmdW5jdGlvbiByZWNhbGwodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnNyYyA9ICcnO1xufTtcbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VTdXJmYWNlOyIsInZhciBTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvU3VyZmFjZScpO1xuZnVuY3Rpb24gSW5wdXRTdXJmYWNlKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXIgfHwgJyc7XG4gICAgdGhpcy5fdmFsdWUgPSBvcHRpb25zLnZhbHVlIHx8ICcnO1xuICAgIHRoaXMuX3R5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ3RleHQnO1xuICAgIHRoaXMuX25hbWUgPSBvcHRpb25zLm5hbWUgfHwgJyc7XG4gICAgU3VyZmFjZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMub24oJ2NsaWNrJywgdGhpcy5mb2N1cy5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAhPT0gdGhpcy5fY3VyclRhcmdldClcbiAgICAgICAgICAgIHRoaXMuYmx1cigpO1xuICAgIH0uYmluZCh0aGlzKSk7XG59XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdXJmYWNlLnByb3RvdHlwZSk7XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSW5wdXRTdXJmYWNlO1xuSW5wdXRTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50VHlwZSA9ICdpbnB1dCc7XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmVsZW1lbnRDbGFzcyA9ICdmYW1vdXMtc3VyZmFjZSc7XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLnNldFBsYWNlaG9sZGVyID0gZnVuY3Rpb24gc2V0UGxhY2Vob2xkZXIoc3RyKSB7XG4gICAgdGhpcy5fcGxhY2Vob2xkZXIgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmZvY3VzID0gZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJUYXJnZXQpXG4gICAgICAgIHRoaXMuX2N1cnJUYXJnZXQuZm9jdXMoKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmJsdXIgPSBmdW5jdGlvbiBibHVyKCkge1xuICAgIGlmICh0aGlzLl9jdXJyVGFyZ2V0KVxuICAgICAgICB0aGlzLl9jdXJyVGFyZ2V0LmJsdXIoKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24gc2V0VmFsdWUoc3RyKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLnNldFR5cGUgPSBmdW5jdGlvbiBzZXRUeXBlKHN0cikge1xuICAgIHRoaXMuX3R5cGUgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmdldFZhbHVlID0gZnVuY3Rpb24gZ2V0VmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuX2N1cnJUYXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJUYXJnZXQudmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLnNldE5hbWUgPSBmdW5jdGlvbiBzZXROYW1lKHN0cikge1xuICAgIHRoaXMuX25hbWUgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5JbnB1dFN1cmZhY2UucHJvdG90eXBlLmdldE5hbWUgPSBmdW5jdGlvbiBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lO1xufTtcbklucHV0U3VyZmFjZS5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gZGVwbG95KHRhcmdldCkge1xuICAgIGlmICh0aGlzLl9wbGFjZWhvbGRlciAhPT0gJycpXG4gICAgICAgIHRhcmdldC5wbGFjZWhvbGRlciA9IHRoaXMuX3BsYWNlaG9sZGVyO1xuICAgIHRhcmdldC52YWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgIHRhcmdldC50eXBlID0gdGhpcy5fdHlwZTtcbiAgICB0YXJnZXQubmFtZSA9IHRoaXMuX25hbWU7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBJbnB1dFN1cmZhY2U7IiwidmFyIElucHV0U3VyZmFjZSA9IHJlcXVpcmUoJy4vSW5wdXRTdXJmYWNlJyk7XG5mdW5jdGlvbiBTdWJtaXRJbnB1dFN1cmZhY2Uob3B0aW9ucykge1xuICAgIElucHV0U3VyZmFjZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuX3R5cGUgPSAnc3VibWl0JztcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9uQ2xpY2spXG4gICAgICAgIHRoaXMuc2V0T25DbGljayhvcHRpb25zLm9uQ2xpY2spO1xufVxuU3VibWl0SW5wdXRTdXJmYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSW5wdXRTdXJmYWNlLnByb3RvdHlwZSk7XG5TdWJtaXRJbnB1dFN1cmZhY2UucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3VibWl0SW5wdXRTdXJmYWNlO1xuU3VibWl0SW5wdXRTdXJmYWNlLnByb3RvdHlwZS5zZXRPbkNsaWNrID0gZnVuY3Rpb24gKG9uQ2xpY2spIHtcbiAgICB0aGlzLm9uQ2xpY2sgPSBvbkNsaWNrO1xufTtcblN1Ym1pdElucHV0U3VyZmFjZS5wcm90b3R5cGUuZGVwbG95ID0gZnVuY3Rpb24gZGVwbG95KHRhcmdldCkge1xuICAgIGlmICh0aGlzLm9uY2xpY2spXG4gICAgICAgIHRhcmdldC5vbkNsaWNrID0gdGhpcy5vbkNsaWNrO1xuICAgIElucHV0U3VyZmFjZS5wcm90b3R5cGUuZGVwbG95LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBTdWJtaXRJbnB1dFN1cmZhY2U7IiwidmFyIFN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9TdXJmYWNlJyk7XG5mdW5jdGlvbiBUZXh0YXJlYVN1cmZhY2Uob3B0aW9ucykge1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gb3B0aW9ucy5wbGFjZWhvbGRlciB8fCAnJztcbiAgICB0aGlzLl92YWx1ZSA9IG9wdGlvbnMudmFsdWUgfHwgJyc7XG4gICAgdGhpcy5fbmFtZSA9IG9wdGlvbnMubmFtZSB8fCAnJztcbiAgICB0aGlzLl93cmFwID0gb3B0aW9ucy53cmFwIHx8ICcnO1xuICAgIHRoaXMuX2NvbHMgPSBvcHRpb25zLmNvbHMgfHwgJyc7XG4gICAgdGhpcy5fcm93cyA9IG9wdGlvbnMucm93cyB8fCAnJztcbiAgICBTdXJmYWNlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5vbignY2xpY2snLCB0aGlzLmZvY3VzLmJpbmQodGhpcykpO1xufVxuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VyZmFjZS5wcm90b3R5cGUpO1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRleHRhcmVhU3VyZmFjZTtcblRleHRhcmVhU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAndGV4dGFyZWEnO1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5zZXRQbGFjZWhvbGRlciA9IGZ1bmN0aW9uIHNldFBsYWNlaG9sZGVyKHN0cikge1xuICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gc3RyO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5mb2N1cyA9IGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgIGlmICh0aGlzLl9jdXJyVGFyZ2V0KVxuICAgICAgICB0aGlzLl9jdXJyVGFyZ2V0LmZvY3VzKCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5ibHVyID0gZnVuY3Rpb24gYmx1cigpIHtcbiAgICBpZiAodGhpcy5fY3VyclRhcmdldClcbiAgICAgICAgdGhpcy5fY3VyclRhcmdldC5ibHVyKCk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5zZXRWYWx1ZSA9IGZ1bmN0aW9uIHNldFZhbHVlKHN0cikge1xuICAgIHRoaXMuX3ZhbHVlID0gc3RyO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5nZXRWYWx1ZSA9IGZ1bmN0aW9uIGdldFZhbHVlKCkge1xuICAgIGlmICh0aGlzLl9jdXJyVGFyZ2V0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyVGFyZ2V0LnZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5zZXROYW1lID0gZnVuY3Rpb24gc2V0TmFtZShzdHIpIHtcbiAgICB0aGlzLl9uYW1lID0gc3RyO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuVGV4dGFyZWFTdXJmYWNlLnByb3RvdHlwZS5nZXROYW1lID0gZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fbmFtZTtcbn07XG5UZXh0YXJlYVN1cmZhY2UucHJvdG90eXBlLnNldFdyYXAgPSBmdW5jdGlvbiBzZXRXcmFwKHN0cikge1xuICAgIHRoaXMuX3dyYXAgPSBzdHI7XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UZXh0YXJlYVN1cmZhY2UucHJvdG90eXBlLnNldENvbHVtbnMgPSBmdW5jdGlvbiBzZXRDb2x1bW5zKG51bSkge1xuICAgIHRoaXMuX2NvbHMgPSBudW07XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UZXh0YXJlYVN1cmZhY2UucHJvdG90eXBlLnNldFJvd3MgPSBmdW5jdGlvbiBzZXRSb3dzKG51bSkge1xuICAgIHRoaXMuX3Jvd3MgPSBudW07XG4gICAgdGhpcy5fY29udGVudERpcnR5ID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UZXh0YXJlYVN1cmZhY2UucHJvdG90eXBlLmRlcGxveSA9IGZ1bmN0aW9uIGRlcGxveSh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5fcGxhY2Vob2xkZXIgIT09ICcnKVxuICAgICAgICB0YXJnZXQucGxhY2Vob2xkZXIgPSB0aGlzLl9wbGFjZWhvbGRlcjtcbiAgICBpZiAodGhpcy5fdmFsdWUgIT09ICcnKVxuICAgICAgICB0YXJnZXQudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICBpZiAodGhpcy5fbmFtZSAhPT0gJycpXG4gICAgICAgIHRhcmdldC5uYW1lID0gdGhpcy5fbmFtZTtcbiAgICBpZiAodGhpcy5fd3JhcCAhPT0gJycpXG4gICAgICAgIHRhcmdldC53cmFwID0gdGhpcy5fd3JhcDtcbiAgICBpZiAodGhpcy5fY29scyAhPT0gJycpXG4gICAgICAgIHRhcmdldC5jb2xzID0gdGhpcy5fY29scztcbiAgICBpZiAodGhpcy5fcm93cyAhPT0gJycpXG4gICAgICAgIHRhcmdldC5yb3dzID0gdGhpcy5fcm93cztcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRleHRhcmVhU3VyZmFjZTsiLCJ2YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1N1cmZhY2UnKTtcbmZ1bmN0aW9uIFZpZGVvU3VyZmFjZShvcHRpb25zKSB7XG4gICAgdGhpcy5fdmlkZW9VcmwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShWaWRlb1N1cmZhY2UuREVGQVVMVF9PUFRJT05TKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIFN1cmZhY2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cblZpZGVvU3VyZmFjZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFN1cmZhY2UucHJvdG90eXBlKTtcblZpZGVvU3VyZmFjZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBWaWRlb1N1cmZhY2U7XG5WaWRlb1N1cmZhY2UuREVGQVVMVF9PUFRJT05TID0geyBhdXRvcGxheTogZmFsc2UgfTtcblZpZGVvU3VyZmFjZS5wcm90b3R5cGUuZWxlbWVudFR5cGUgPSAndmlkZW8nO1xuVmlkZW9TdXJmYWNlLnByb3RvdHlwZS5lbGVtZW50Q2xhc3MgPSAnZmFtb3VzLXN1cmZhY2UnO1xuVmlkZW9TdXJmYWNlLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuc2l6ZSlcbiAgICAgICAgdGhpcy5zZXRTaXplKG9wdGlvbnMuc2l6ZSk7XG4gICAgaWYgKG9wdGlvbnMuY2xhc3NlcylcbiAgICAgICAgdGhpcy5zZXRDbGFzc2VzKG9wdGlvbnMuY2xhc3Nlcyk7XG4gICAgaWYgKG9wdGlvbnMucHJvcGVydGllcylcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKG9wdGlvbnMucHJvcGVydGllcyk7XG4gICAgaWYgKG9wdGlvbnMuYXV0b3BsYXkpXG4gICAgICAgIHRoaXMub3B0aW9ucy5hdXRvcGxheSA9IG9wdGlvbnMuYXV0b3BsYXk7XG4gICAgaWYgKG9wdGlvbnMuc3JjKSB7XG4gICAgICAgIHRoaXMuX3ZpZGVvVXJsID0gb3B0aW9ucy5zcmM7XG4gICAgICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG4gICAgfVxufTtcblZpZGVvU3VyZmFjZS5wcm90b3R5cGUuc2V0Q29udGVudCA9IGZ1bmN0aW9uIHNldENvbnRlbnQodmlkZW9VcmwpIHtcbiAgICB0aGlzLl92aWRlb1VybCA9IHZpZGVvVXJsO1xuICAgIHRoaXMuX2NvbnRlbnREaXJ0eSA9IHRydWU7XG59O1xuVmlkZW9TdXJmYWNlLnByb3RvdHlwZS5kZXBsb3kgPSBmdW5jdGlvbiBkZXBsb3kodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnNyYyA9IHRoaXMuX3ZpZGVvVXJsO1xuICAgIHRhcmdldC5hdXRvcGxheSA9IHRoaXMub3B0aW9ucy5hdXRvcGxheTtcbn07XG5WaWRlb1N1cmZhY2UucHJvdG90eXBlLnJlY2FsbCA9IGZ1bmN0aW9uIHJlY2FsbCh0YXJnZXQpIHtcbiAgICB0YXJnZXQuc3JjID0gJyc7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBWaWRlb1N1cmZhY2U7IiwiZnVuY3Rpb24gQ2FjaGVkTWFwKG1hcHBpbmdGdW5jdGlvbikge1xuICAgIHRoaXMuX21hcCA9IG1hcHBpbmdGdW5jdGlvbiB8fCBudWxsO1xuICAgIHRoaXMuX2NhY2hlZE91dHB1dCA9IG51bGw7XG4gICAgdGhpcy5fY2FjaGVkSW5wdXQgPSBOdW1iZXIuTmFOO1xufVxuQ2FjaGVkTWFwLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShtYXBwaW5nRnVuY3Rpb24pIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBuZXcgQ2FjaGVkTWFwKG1hcHBpbmdGdW5jdGlvbik7XG4gICAgcmV0dXJuIGluc3RhbmNlLmdldC5iaW5kKGluc3RhbmNlKTtcbn07XG5DYWNoZWRNYXAucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldChpbnB1dCkge1xuICAgIGlmIChpbnB1dCAhPT0gdGhpcy5fY2FjaGVkSW5wdXQpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVkSW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdGhpcy5fY2FjaGVkT3V0cHV0ID0gdGhpcy5fbWFwKGlucHV0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlZE91dHB1dDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IENhY2hlZE1hcDsiLCJ2YXIgRWFzaW5nID0ge1xuICAgICAgICBpblF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIG91dFF1YWQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLSh0IC09IDEpICogdCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0UXVhZDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgtLXQgKiAodCAtIDIpIC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluQ3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRDdWJpYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXQgKiB0ICogdCArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Q3ViaWM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdDtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgIH0sXG4gICAgICAgIG91dFF1YXJ0OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0oLS10ICogdCAqIHQgKiB0IC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0UXVhcnQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA8IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblF1aW50OiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIHQgKiB0ICogdCAqIHQgKiB0O1xuICAgICAgICB9LFxuICAgICAgICBvdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiAtLXQgKiB0ICogdCAqIHQgKiB0ICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRRdWludDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogdCAqIHQgKiB0ICogdCAqIHQ7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpblNpbmU6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLTEgKiBNYXRoLmNvcyh0ICogKE1hdGguUEkgLyAyKSkgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBvdXRTaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc2luKHQgKiAoTWF0aC5QSSAvIDIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRTaW5lOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIC0wLjUgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQpIC0gMSk7XG4gICAgICAgIH0sXG4gICAgICAgIGluRXhwbzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0ID09PSAwID8gMCA6IE1hdGgucG93KDIsIDEwICogKHQgLSAxKSk7XG4gICAgICAgIH0sXG4gICAgICAgIG91dEV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gMSA/IDEgOiAtTWF0aC5wb3coMiwgLTEwICogdCkgKyAxO1xuICAgICAgICB9LFxuICAgICAgICBpbk91dEV4cG86IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh0ID09PSAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKVxuICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpO1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpO1xuICAgICAgICB9LFxuICAgICAgICBpbkNpcmM6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gLShNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRDaXJjOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgxIC0gLS10ICogdCk7XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Q2lyYzogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5FbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zO1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0IC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRFbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAodCA9PT0gMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zO1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRFbGFzdGljOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICBpZiAoKHQgLz0gMC41KSA9PT0gMilcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIGlmICghcClcbiAgICAgICAgICAgICAgICBwID0gMC4zICogMS41O1xuICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKDEgLyBhKTtcbiAgICAgICAgICAgIGlmICh0IDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqIChhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKTtcbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSAqIDAuNSArIDE7XG4gICAgICAgIH0sXG4gICAgICAgIGluQmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gdCAqIHQgKiAoKHMgKyAxKSAqIHQgLSBzKTtcbiAgICAgICAgfSxcbiAgICAgICAgb3V0QmFjazogZnVuY3Rpb24gKHQsIHMpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICByZXR1cm4gLS10ICogdCAqICgocyArIDEpICogdCArIHMpICsgMTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5PdXRCYWNrOiBmdW5jdGlvbiAodCwgcykge1xuICAgICAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIGlmICgodCAvPSAwLjUpIDwgMSlcbiAgICAgICAgICAgICAgICByZXR1cm4gMC41ICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSk7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKTtcbiAgICAgICAgfSxcbiAgICAgICAgaW5Cb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICByZXR1cm4gMSAtIEVhc2luZy5vdXRCb3VuY2UoMSAtIHQpO1xuICAgICAgICB9LFxuICAgICAgICBvdXRCb3VuY2U6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICBpZiAodCA8IDEgLyAyLjc1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIHQgKiB0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgMC43NTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKHQgLT0gMi4yNSAvIDIuNzUpICogdCArIDAuOTM3NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICh0IC09IDIuNjI1IC8gMi43NSkgKiB0ICsgMC45ODQzNzU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgaWYgKHQgPCAwLjUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVhc2luZy5pbkJvdW5jZSh0ICogMikgKiAwLjU7XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5nLm91dEJvdW5jZSh0ICogMiAtIDEpICogMC41ICsgMC41O1xuICAgICAgICB9XG4gICAgfTtcbm1vZHVsZS5leHBvcnRzID0gRWFzaW5nOyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG5mdW5jdGlvbiBNdWx0aXBsZVRyYW5zaXRpb24obWV0aG9kKSB7XG4gICAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gICAgdGhpcy5faW5zdGFuY2VzID0gW107XG4gICAgdGhpcy5zdGF0ZSA9IFtdO1xufVxuTXVsdGlwbGVUcmFuc2l0aW9uLlNVUFBPUlRTX01VTFRJUExFID0gdHJ1ZTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5faW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuc3RhdGVbaV0gPSB0aGlzLl9pbnN0YW5jZXNbaV0uZ2V0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXRlO1xufTtcbk11bHRpcGxlVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KGVuZFN0YXRlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBfYWxsQ2FsbGJhY2sgPSBVdGlsaXR5LmFmdGVyKGVuZFN0YXRlLmxlbmd0aCwgY2FsbGJhY2spO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5kU3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZXNbaV0pXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0gPSBuZXcgdGhpcy5tZXRob2QoKTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldLnNldChlbmRTdGF0ZVtpXSwgdHJhbnNpdGlvbiwgX2FsbENhbGxiYWNrKTtcbiAgICB9XG59O1xuTXVsdGlwbGVUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXJ0U3RhdGUpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0U3RhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZXNbaV0pXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZXNbaV0gPSBuZXcgdGhpcy5tZXRob2QoKTtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzW2ldLnJlc2V0KHN0YXJ0U3RhdGVbaV0pO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IE11bHRpcGxlVHJhbnNpdGlvbjsiLCJ2YXIgUEUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9QaHlzaWNzRW5naW5lJyk7XG52YXIgUGFydGljbGUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUnKTtcbnZhciBTcHJpbmcgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9TbmFwJyk7XG52YXIgVmVjdG9yID0gcmVxdWlyZSgnZmFtb3VzL21hdGgvVmVjdG9yJyk7XG5mdW5jdGlvbiBTbmFwVHJhbnNpdGlvbihzdGF0ZSkge1xuICAgIHN0YXRlID0gc3RhdGUgfHwgMDtcbiAgICB0aGlzLmVuZFN0YXRlID0gbmV3IFZlY3RvcihzdGF0ZSk7XG4gICAgdGhpcy5pbml0U3RhdGUgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IDE7XG4gICAgdGhpcy5fcmVzdFRvbGVyYW5jZSA9IDFlLTEwO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSB0aGlzLl9yZXN0VG9sZXJhbmNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuUEUgPSBuZXcgUEUoKTtcbiAgICB0aGlzLnBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKCk7XG4gICAgdGhpcy5zcHJpbmcgPSBuZXcgU3ByaW5nKHsgYW5jaG9yOiB0aGlzLmVuZFN0YXRlIH0pO1xuICAgIHRoaXMuUEUuYWRkQm9keSh0aGlzLnBhcnRpY2xlKTtcbiAgICB0aGlzLlBFLmF0dGFjaCh0aGlzLnNwcmluZywgdGhpcy5wYXJ0aWNsZSk7XG59XG5TbmFwVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IDM7XG5TbmFwVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcGVyaW9kOiAxMDAsXG4gICAgZGFtcGluZ1JhdGlvOiAwLjIsXG4gICAgdmVsb2NpdHk6IDBcbn07XG5mdW5jdGlvbiBfZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiB0aGlzLnBhcnRpY2xlLmdldEVuZXJneSgpICsgdGhpcy5zcHJpbmcuZ2V0RW5lcmd5KHRoaXMucGFydGljbGUpO1xufVxuZnVuY3Rpb24gX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZSgpIHtcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybVNxdWFyZWQoKTtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gZGlzdGFuY2UgPT09IDAgPyB0aGlzLl9yZXN0VG9sZXJhbmNlIDogdGhpcy5fcmVzdFRvbGVyYW5jZSAqIGRpc3RhbmNlO1xufVxuZnVuY3Rpb24gX3NldFRhcmdldCh0YXJnZXQpIHtcbiAgICB0aGlzLmVuZFN0YXRlLnNldCh0YXJnZXQpO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cbmZ1bmN0aW9uIF93YWtlKCkge1xuICAgIHRoaXMuUEUud2FrZSgpO1xufVxuZnVuY3Rpb24gX3NsZWVwKCkge1xuICAgIHRoaXMuUEUuc2xlZXAoKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnBvc2l0aW9uLnNldChwKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLnBhcnRpY2xlLnZlbG9jaXR5LnNldCh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF9zZXR1cERlZmluaXRpb24oZGVmaW5pdGlvbikge1xuICAgIHZhciBkZWZhdWx0cyA9IFNuYXBUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUztcbiAgICBpZiAoZGVmaW5pdGlvbi5wZXJpb2QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgZGVmaW5pdGlvbi5wZXJpb2QgPSBkZWZhdWx0cy5wZXJpb2Q7XG4gICAgaWYgKGRlZmluaXRpb24uZGFtcGluZ1JhdGlvID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24uZGFtcGluZ1JhdGlvID0gZGVmYXVsdHMuZGFtcGluZ1JhdGlvO1xuICAgIGlmIChkZWZpbml0aW9uLnZlbG9jaXR5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24udmVsb2NpdHkgPSBkZWZhdWx0cy52ZWxvY2l0eTtcbiAgICB0aGlzLnNwcmluZy5zZXRPcHRpb25zKHtcbiAgICAgICAgcGVyaW9kOiBkZWZpbml0aW9uLnBlcmlvZCxcbiAgICAgICAgZGFtcGluZ1JhdGlvOiBkZWZpbml0aW9uLmRhbXBpbmdSYXRpb1xuICAgIH0pO1xuICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgZGVmaW5pdGlvbi52ZWxvY2l0eSk7XG59XG5mdW5jdGlvbiBfdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLlBFLmlzU2xlZXBpbmcoKSkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjYiA9IHRoaXMuX2NhbGxiYWNrO1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKF9nZXRFbmVyZ3kuY2FsbCh0aGlzKSA8IHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UpIHtcbiAgICAgICAgX3NldFBhcnRpY2xlUG9zaXRpb24uY2FsbCh0aGlzLCB0aGlzLmVuZFN0YXRlKTtcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXSk7XG4gICAgICAgIF9zbGVlcC5jYWxsKHRoaXMpO1xuICAgIH1cbn1cblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0KHN0YXRlLCB2ZWxvY2l0eSkge1xuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBzdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gc3RhdGUubGVuZ3RoIDogMDtcbiAgICB0aGlzLmluaXRTdGF0ZS5zZXQoc3RhdGUpO1xuICAgIF9zZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcywgc3RhdGUpO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgaWYgKHZlbG9jaXR5KVxuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIHZlbG9jaXR5KTtcbiAgICBfc2V0Q2FsbGJhY2suY2FsbCh0aGlzLCB1bmRlZmluZWQpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMpO1xufTtcblNuYXBUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHZlbG9jaXR5KSB7XG4gICAgdGhpcy5jYWxsKHRoaXMsIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHZlbG9jaXR5KSk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLlBFLmlzU2xlZXBpbmcoKTtcbn07XG5TbmFwVHJhbnNpdGlvbi5wcm90b3R5cGUuaGFsdCA9IGZ1bmN0aW9uIGhhbHQoKSB7XG4gICAgdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBfdXBkYXRlLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIF9nZXRQYXJ0aWNsZVBvc2l0aW9uLmNhbGwodGhpcyk7XG59O1xuU25hcFRyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChzdGF0ZSwgZGVmaW5pdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChzdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBzdGF0ZS5sZW5ndGggOiAwO1xuICAgIF93YWtlLmNhbGwodGhpcyk7XG4gICAgX3NldHVwRGVmaW5pdGlvbi5jYWxsKHRoaXMsIGRlZmluaXRpb24pO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU25hcFRyYW5zaXRpb247IiwidmFyIFBFID0gcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvUGh5c2ljc0VuZ2luZScpO1xudmFyIFBhcnRpY2xlID0gcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlJyk7XG52YXIgU3ByaW5nID0gcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvZm9yY2VzL1NwcmluZycpO1xudmFyIFZlY3RvciA9IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1ZlY3RvcicpO1xuZnVuY3Rpb24gU3ByaW5nVHJhbnNpdGlvbihzdGF0ZSkge1xuICAgIHN0YXRlID0gc3RhdGUgfHwgMDtcbiAgICB0aGlzLmVuZFN0YXRlID0gbmV3IFZlY3RvcihzdGF0ZSk7XG4gICAgdGhpcy5pbml0U3RhdGUgPSBuZXcgVmVjdG9yKCk7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9yZXN0VG9sZXJhbmNlID0gMWUtMTA7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IHRoaXMuX3Jlc3RUb2xlcmFuY2U7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5QRSA9IG5ldyBQRSgpO1xuICAgIHRoaXMuc3ByaW5nID0gbmV3IFNwcmluZyh7IGFuY2hvcjogdGhpcy5lbmRTdGF0ZSB9KTtcbiAgICB0aGlzLnBhcnRpY2xlID0gbmV3IFBhcnRpY2xlKCk7XG4gICAgdGhpcy5QRS5hZGRCb2R5KHRoaXMucGFydGljbGUpO1xuICAgIHRoaXMuUEUuYXR0YWNoKHRoaXMuc3ByaW5nLCB0aGlzLnBhcnRpY2xlKTtcbn1cblNwcmluZ1RyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSAzO1xuU3ByaW5nVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcGVyaW9kOiAzMDAsXG4gICAgZGFtcGluZ1JhdGlvOiAwLjUsXG4gICAgdmVsb2NpdHk6IDBcbn07XG5mdW5jdGlvbiBfZ2V0RW5lcmd5KCkge1xuICAgIHJldHVybiB0aGlzLnBhcnRpY2xlLmdldEVuZXJneSgpICsgdGhpcy5zcHJpbmcuZ2V0RW5lcmd5KHRoaXMucGFydGljbGUpO1xufVxuZnVuY3Rpb24gX3NldFBhcnRpY2xlUG9zaXRpb24ocCkge1xuICAgIHRoaXMucGFydGljbGUuc2V0UG9zaXRpb24ocCk7XG59XG5mdW5jdGlvbiBfc2V0UGFydGljbGVWZWxvY2l0eSh2KSB7XG4gICAgdGhpcy5wYXJ0aWNsZS5zZXRWZWxvY2l0eSh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF93YWtlKCkge1xuICAgIHRoaXMuUEUud2FrZSgpO1xufVxuZnVuY3Rpb24gX3NsZWVwKCkge1xuICAgIHRoaXMuUEUuc2xlZXAoKTtcbn1cbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuUEUuaXNTbGVlcGluZygpKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNiID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoX2dldEVuZXJneS5jYWxsKHRoaXMpIDwgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSkge1xuICAgICAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHRoaXMuZW5kU3RhdGUpO1xuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdKTtcbiAgICAgICAgX3NsZWVwLmNhbGwodGhpcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gX3NldHVwRGVmaW5pdGlvbihkZWZpbml0aW9uKSB7XG4gICAgdmFyIGRlZmF1bHRzID0gU3ByaW5nVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlM7XG4gICAgaWYgKGRlZmluaXRpb24ucGVyaW9kID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZmluaXRpb24ucGVyaW9kID0gZGVmYXVsdHMucGVyaW9kO1xuICAgIGlmIChkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLmRhbXBpbmdSYXRpbyA9IGRlZmF1bHRzLmRhbXBpbmdSYXRpbztcbiAgICBpZiAoZGVmaW5pdGlvbi52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWZpbml0aW9uLnZlbG9jaXR5ID0gZGVmYXVsdHMudmVsb2NpdHk7XG4gICAgaWYgKGRlZmluaXRpb24ucGVyaW9kIDwgMTUwKSB7XG4gICAgICAgIGRlZmluaXRpb24ucGVyaW9kID0gMTUwO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBwZXJpb2Qgb2YgYSBTcHJpbmdUcmFuc2l0aW9uIGlzIGNhcHBlZCBhdCAxNTAgbXMuIFVzZSBhIFNuYXBUcmFuc2l0aW9uIGZvciBmYXN0ZXIgdHJhbnNpdGlvbnMnKTtcbiAgICB9XG4gICAgdGhpcy5zcHJpbmcuc2V0T3B0aW9ucyh7XG4gICAgICAgIHBlcmlvZDogZGVmaW5pdGlvbi5wZXJpb2QsXG4gICAgICAgIGRhbXBpbmdSYXRpbzogZGVmaW5pdGlvbi5kYW1waW5nUmF0aW9cbiAgICB9KTtcbiAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIGRlZmluaXRpb24udmVsb2NpdHkpO1xufVxuZnVuY3Rpb24gX3NldEFic29sdXRlUmVzdFRvbGVyYW5jZSgpIHtcbiAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybVNxdWFyZWQoKTtcbiAgICB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlID0gZGlzdGFuY2UgPT09IDAgPyB0aGlzLl9yZXN0VG9sZXJhbmNlIDogdGhpcy5fcmVzdFRvbGVyYW5jZSAqIGRpc3RhbmNlO1xufVxuZnVuY3Rpb24gX3NldFRhcmdldCh0YXJnZXQpIHtcbiAgICB0aGlzLmVuZFN0YXRlLnNldCh0YXJnZXQpO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQocG9zLCB2ZWwpIHtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gcG9zIGluc3RhbmNlb2YgQXJyYXkgPyBwb3MubGVuZ3RoIDogMDtcbiAgICB0aGlzLmluaXRTdGF0ZS5zZXQocG9zKTtcbiAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHBvcyk7XG4gICAgX3NldFRhcmdldC5jYWxsKHRoaXMsIHBvcyk7XG4gICAgaWYgKHZlbClcbiAgICAgICAgX3NldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzLCB2ZWwpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIHVuZGVmaW5lZCk7XG59O1xuU3ByaW5nVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLmNhbGwodGhpcywgX3NldFBhcnRpY2xlVmVsb2NpdHkodikpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICF0aGlzLlBFLmlzU2xlZXBpbmcoKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLnNldCh0aGlzLmdldCgpKTtcbn07XG5TcHJpbmdUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMpO1xufTtcblNwcmluZ1RyYW5zaXRpb24ucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgZGVmaW5pdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWRlZmluaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRTdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IGVuZFN0YXRlIGluc3RhbmNlb2YgQXJyYXkgPyBlbmRTdGF0ZS5sZW5ndGggOiAwO1xuICAgIF93YWtlLmNhbGwodGhpcyk7XG4gICAgX3NldHVwRGVmaW5pdGlvbi5jYWxsKHRoaXMsIGRlZmluaXRpb24pO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBlbmRTdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU3ByaW5nVHJhbnNpdGlvbjsiLCJ2YXIgTXVsdGlwbGVUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9NdWx0aXBsZVRyYW5zaXRpb24nKTtcbnZhciBUd2VlblRyYW5zaXRpb24gPSByZXF1aXJlKCcuL1R3ZWVuVHJhbnNpdGlvbicpO1xuZnVuY3Rpb24gVHJhbnNpdGlvbmFibGUoc3RhcnQpIHtcbiAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBudWxsO1xuICAgIHRoaXMuYWN0aW9uUXVldWUgPSBbXTtcbiAgICB0aGlzLmNhbGxiYWNrUXVldWUgPSBbXTtcbiAgICB0aGlzLnN0YXRlID0gMDtcbiAgICB0aGlzLnZlbG9jaXR5ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbnVsbDtcbiAgICB0aGlzLl9jdXJyZW50TWV0aG9kID0gbnVsbDtcbiAgICB0aGlzLnNldChzdGFydCk7XG59XG52YXIgdHJhbnNpdGlvbk1ldGhvZHMgPSB7fTtcblRyYW5zaXRpb25hYmxlLnJlZ2lzdGVyTWV0aG9kID0gZnVuY3Rpb24gcmVnaXN0ZXJNZXRob2QobmFtZSwgZW5naW5lQ2xhc3MpIHtcbiAgICBpZiAoIShuYW1lIGluIHRyYW5zaXRpb25NZXRob2RzKSkge1xuICAgICAgICB0cmFuc2l0aW9uTWV0aG9kc1tuYW1lXSA9IGVuZ2luZUNsYXNzO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2VcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xufTtcblRyYW5zaXRpb25hYmxlLnVucmVnaXN0ZXJNZXRob2QgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyTWV0aG9kKG5hbWUpIHtcbiAgICBpZiAobmFtZSBpbiB0cmFuc2l0aW9uTWV0aG9kcykge1xuICAgICAgICBkZWxldGUgdHJhbnNpdGlvbk1ldGhvZHNbbmFtZV07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG59O1xuZnVuY3Rpb24gX2xvYWROZXh0KCkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmFjdGlvblF1ZXVlLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IHRoaXMuYWN0aW9uUXVldWUuc2hpZnQoKTtcbiAgICB0aGlzLl9jYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tRdWV1ZS5zaGlmdCgpO1xuICAgIHZhciBtZXRob2QgPSBudWxsO1xuICAgIHZhciBlbmRWYWx1ZSA9IHRoaXMuY3VycmVudEFjdGlvblswXTtcbiAgICB2YXIgdHJhbnNpdGlvbiA9IHRoaXMuY3VycmVudEFjdGlvblsxXTtcbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIE9iamVjdCAmJiB0cmFuc2l0aW9uLm1ldGhvZCkge1xuICAgICAgICBtZXRob2QgPSB0cmFuc2l0aW9uLm1ldGhvZDtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgbWV0aG9kID0gdHJhbnNpdGlvbk1ldGhvZHNbbWV0aG9kXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtZXRob2QgPSBUd2VlblRyYW5zaXRpb247XG4gICAgfVxuICAgIGlmICh0aGlzLl9jdXJyZW50TWV0aG9kICE9PSBtZXRob2QpIHtcbiAgICAgICAgaWYgKCEoZW5kVmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHx8IG1ldGhvZC5TVVBQT1JUU19NVUxUSVBMRSA9PT0gdHJ1ZSB8fCBlbmRWYWx1ZS5sZW5ndGggPD0gbWV0aG9kLlNVUFBPUlRTX01VTFRJUExFKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmdpbmVJbnN0YW5jZSA9IG5ldyBtZXRob2QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlID0gbmV3IE11bHRpcGxlVHJhbnNpdGlvbihtZXRob2QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNZXRob2QgPSBtZXRob2Q7XG4gICAgfVxuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnJlc2V0KHRoaXMuc3RhdGUsIHRoaXMudmVsb2NpdHkpO1xuICAgIGlmICh0aGlzLnZlbG9jaXR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRyYW5zaXRpb24udmVsb2NpdHkgPSB0aGlzLnZlbG9jaXR5O1xuICAgIHRoaXMuX2VuZ2luZUluc3RhbmNlLnNldChlbmRWYWx1ZSwgdHJhbnNpdGlvbiwgX2xvYWROZXh0LmJpbmQodGhpcykpO1xufVxuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChlbmRTdGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICBpZiAoIXRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhpcy5yZXNldChlbmRTdGF0ZSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB2YXIgYWN0aW9uID0gW1xuICAgICAgICAgICAgZW5kU3RhdGUsXG4gICAgICAgICAgICB0cmFuc2l0aW9uXG4gICAgICAgIF07XG4gICAgdGhpcy5hY3Rpb25RdWV1ZS5wdXNoKGFjdGlvbik7XG4gICAgdGhpcy5jYWxsYmFja1F1ZXVlLnB1c2goY2FsbGJhY2spO1xuICAgIGlmICghdGhpcy5jdXJyZW50QWN0aW9uKVxuICAgICAgICBfbG9hZE5leHQuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGFydFN0YXRlLCBzdGFydFZlbG9jaXR5KSB7XG4gICAgdGhpcy5fY3VycmVudE1ldGhvZCA9IG51bGw7XG4gICAgdGhpcy5fZW5naW5lSW5zdGFuY2UgPSBudWxsO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSBzdGFydFN0YXRlO1xuICAgIHRoaXMudmVsb2NpdHkgPSBzdGFydFZlbG9jaXR5O1xuICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IG51bGw7XG4gICAgdGhpcy5hY3Rpb25RdWV1ZSA9IFtdO1xuICAgIHRoaXMuY2FsbGJhY2tRdWV1ZSA9IFtdO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5kZWxheSA9IGZ1bmN0aW9uIGRlbGF5KGR1cmF0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCksIHtcbiAgICAgICAgZHVyYXRpb246IGR1cmF0aW9uLFxuICAgICAgICBjdXJ2ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9LCBjYWxsYmFjayk7XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCh0aW1lc3RhbXApIHtcbiAgICBpZiAodGhpcy5fZW5naW5lSW5zdGFuY2UpIHtcbiAgICAgICAgaWYgKHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldFZlbG9jaXR5KVxuICAgICAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHRoaXMuX2VuZ2luZUluc3RhbmNlLmdldFZlbG9jaXR5KCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9lbmdpbmVJbnN0YW5jZS5nZXQodGltZXN0YW1wKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuVHJhbnNpdGlvbmFibGUucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5jdXJyZW50QWN0aW9uO1xufTtcblRyYW5zaXRpb25hYmxlLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zZXQodGhpcy5nZXQoKSk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUcmFuc2l0aW9uYWJsZTsiLCJ2YXIgVHJhbnNpdGlvbmFibGUgPSByZXF1aXJlKCcuL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eScpO1xuZnVuY3Rpb24gVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0odHJhbnNmb3JtKSB7XG4gICAgdGhpcy5fZmluYWwgPSBUcmFuc2Zvcm0uaWRlbnRpdHkuc2xpY2UoKTtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZmluYWxSb3RhdGUgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdO1xuICAgIHRoaXMuX2ZpbmFsU2tldyA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZmluYWxTY2FsZSA9IFtcbiAgICAgICAgMSxcbiAgICAgICAgMSxcbiAgICAgICAgMVxuICAgIF07XG4gICAgdGhpcy50cmFuc2xhdGUgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fZmluYWxUcmFuc2xhdGUpO1xuICAgIHRoaXMucm90YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsUm90YXRlKTtcbiAgICB0aGlzLnNrZXcgPSBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5fZmluYWxTa2V3KTtcbiAgICB0aGlzLnNjYWxlID0gbmV3IFRyYW5zaXRpb25hYmxlKHRoaXMuX2ZpbmFsU2NhbGUpO1xuICAgIGlmICh0cmFuc2Zvcm0pXG4gICAgICAgIHRoaXMuc2V0KHRyYW5zZm9ybSk7XG59XG5mdW5jdGlvbiBfYnVpbGQoKSB7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS5idWlsZCh7XG4gICAgICAgIHRyYW5zbGF0ZTogdGhpcy50cmFuc2xhdGUuZ2V0KCksXG4gICAgICAgIHJvdGF0ZTogdGhpcy5yb3RhdGUuZ2V0KCksXG4gICAgICAgIHNrZXc6IHRoaXMuc2tldy5nZXQoKSxcbiAgICAgICAgc2NhbGU6IHRoaXMuc2NhbGUuZ2V0KClcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIF9idWlsZEZpbmFsKCkge1xuICAgIHJldHVybiBUcmFuc2Zvcm0uYnVpbGQoe1xuICAgICAgICB0cmFuc2xhdGU6IHRoaXMuX2ZpbmFsVHJhbnNsYXRlLFxuICAgICAgICByb3RhdGU6IHRoaXMuX2ZpbmFsUm90YXRlLFxuICAgICAgICBza2V3OiB0aGlzLl9maW5hbFNrZXcsXG4gICAgICAgIHNjYWxlOiB0aGlzLl9maW5hbFNjYWxlXG4gICAgfSk7XG59XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLl9maW5hbFRyYW5zbGF0ZSA9IHRyYW5zbGF0ZTtcbiAgICB0aGlzLl9maW5hbCA9IF9idWlsZEZpbmFsLmNhbGwodGhpcyk7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0KHRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRTY2FsZSA9IGZ1bmN0aW9uIHNldFNjYWxlKHNjYWxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsU2NhbGUgPSBzY2FsZTtcbiAgICB0aGlzLl9maW5hbCA9IF9idWlsZEZpbmFsLmNhbGwodGhpcyk7XG4gICAgdGhpcy5zY2FsZS5zZXQoc2NhbGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0Um90YXRlID0gZnVuY3Rpb24gc2V0Um90YXRlKGV1bGVyQW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsUm90YXRlID0gZXVsZXJBbmdsZXM7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMucm90YXRlLnNldChldWxlckFuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXRTa2V3ID0gZnVuY3Rpb24gc2V0U2tldyhza2V3QW5nbGVzLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHRoaXMuX2ZpbmFsU2tldyA9IHNrZXdBbmdsZXM7XG4gICAgdGhpcy5fZmluYWwgPSBfYnVpbGRGaW5hbC5jYWxsKHRoaXMpO1xuICAgIHRoaXMuc2tldy5zZXQoc2tld0FuZ2xlcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQodHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBjb21wb25lbnRzID0gVHJhbnNmb3JtLmludGVycHJldCh0cmFuc2Zvcm0pO1xuICAgIHRoaXMuX2ZpbmFsVHJhbnNsYXRlID0gY29tcG9uZW50cy50cmFuc2xhdGU7XG4gICAgdGhpcy5fZmluYWxSb3RhdGUgPSBjb21wb25lbnRzLnJvdGF0ZTtcbiAgICB0aGlzLl9maW5hbFNrZXcgPSBjb21wb25lbnRzLnNrZXc7XG4gICAgdGhpcy5fZmluYWxTY2FsZSA9IGNvbXBvbmVudHMuc2NhbGU7XG4gICAgdGhpcy5fZmluYWwgPSB0cmFuc2Zvcm07XG4gICAgdmFyIF9jYWxsYmFjayA9IGNhbGxiYWNrID8gVXRpbGl0eS5hZnRlcig0LCBjYWxsYmFjaykgOiBudWxsO1xuICAgIHRoaXMudHJhbnNsYXRlLnNldChjb21wb25lbnRzLnRyYW5zbGF0ZSwgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXQoY29tcG9uZW50cy5yb3RhdGUsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5za2V3LnNldChjb21wb25lbnRzLnNrZXcsIHRyYW5zaXRpb24sIF9jYWxsYmFjayk7XG4gICAgdGhpcy5zY2FsZS5zZXQoY29tcG9uZW50cy5zY2FsZSwgdHJhbnNpdGlvbiwgX2NhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuc2V0RGVmYXVsdFRyYW5zaXRpb24gPSBmdW5jdGlvbiBzZXREZWZhdWx0VHJhbnNpdGlvbih0cmFuc2l0aW9uKSB7XG4gICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbiAgICB0aGlzLnJvdGF0ZS5zZXREZWZhdWx0KHRyYW5zaXRpb24pO1xuICAgIHRoaXMuc2tldy5zZXREZWZhdWx0KHRyYW5zaXRpb24pO1xuICAgIHRoaXMuc2NhbGUuc2V0RGVmYXVsdCh0cmFuc2l0aW9uKTtcbn07XG5UcmFuc2l0aW9uYWJsZVRyYW5zZm9ybS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgcmV0dXJuIF9idWlsZC5jYWxsKHRoaXMpO1xuICAgIH0gZWxzZVxuICAgICAgICByZXR1cm4gdGhpcy5fZmluYWw7XG59O1xuVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0ucHJvdG90eXBlLmdldEZpbmFsID0gZnVuY3Rpb24gZ2V0RmluYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbmFsO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5pc0FjdGl2ZSgpIHx8IHRoaXMucm90YXRlLmlzQWN0aXZlKCkgfHwgdGhpcy5zY2FsZS5pc0FjdGl2ZSgpIHx8IHRoaXMuc2tldy5pc0FjdGl2ZSgpO1xufTtcblRyYW5zaXRpb25hYmxlVHJhbnNmb3JtLnByb3RvdHlwZS5oYWx0ID0gZnVuY3Rpb24gaGFsdCgpIHtcbiAgICB0aGlzLl9maW5hbCA9IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy50cmFuc2xhdGUuaGFsdCgpO1xuICAgIHRoaXMucm90YXRlLmhhbHQoKTtcbiAgICB0aGlzLnNrZXcuaGFsdCgpO1xuICAgIHRoaXMuc2NhbGUuaGFsdCgpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm07IiwiZnVuY3Rpb24gVHdlZW5UcmFuc2l0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFR3ZWVuVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IDA7XG4gICAgdGhpcy5fY3VydmUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuX2NhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3RhdGUgPSAwO1xuICAgIHRoaXMudmVsb2NpdHkgPSB1bmRlZmluZWQ7XG59XG5Ud2VlblRyYW5zaXRpb24uQ3VydmVzID0ge1xuICAgIGxpbmVhcjogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgfSxcbiAgICBlYXNlSW46IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogdDtcbiAgICB9LFxuICAgIGVhc2VPdXQ6IGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICogKDIgLSB0KTtcbiAgICB9LFxuICAgIGVhc2VJbk91dDogZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgaWYgKHQgPD0gMC41KVxuICAgICAgICAgICAgcmV0dXJuIDIgKiB0ICogdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIC0yICogdCAqIHQgKyA0ICogdCAtIDE7XG4gICAgfSxcbiAgICBlYXNlT3V0Qm91bmNlOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gdCAqICgzIC0gMiAqIHQpO1xuICAgIH0sXG4gICAgc3ByaW5nOiBmdW5jdGlvbiAodCkge1xuICAgICAgICByZXR1cm4gKDEgLSB0KSAqIE1hdGguc2luKDYgKiBNYXRoLlBJICogdCkgKyB0O1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24uU1VQUE9SVFNfTVVMVElQTEUgPSB0cnVlO1xuVHdlZW5UcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBjdXJ2ZTogVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5saW5lYXIsXG4gICAgZHVyYXRpb246IDUwMCxcbiAgICBzcGVlZDogMFxufTtcbnZhciByZWdpc3RlcmVkQ3VydmVzID0ge307XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSA9IGZ1bmN0aW9uIHJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lLCBjdXJ2ZSkge1xuICAgIGlmICghcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSA9IGN1cnZlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi51bnJlZ2lzdGVyQ3VydmUgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyQ3VydmUoY3VydmVOYW1lKSB7XG4gICAgaWYgKHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXSkge1xuICAgICAgICBkZWxldGUgcmVnaXN0ZXJlZEN1cnZlc1tjdXJ2ZU5hbWVdO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZSA9IGZ1bmN0aW9uIGdldEN1cnZlKGN1cnZlTmFtZSkge1xuICAgIHZhciBjdXJ2ZSA9IHJlZ2lzdGVyZWRDdXJ2ZXNbY3VydmVOYW1lXTtcbiAgICBpZiAoY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGN1cnZlO1xuICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjdXJ2ZSBub3QgcmVnaXN0ZXJlZCcpO1xufTtcblR3ZWVuVHJhbnNpdGlvbi5nZXRDdXJ2ZXMgPSBmdW5jdGlvbiBnZXRDdXJ2ZXMoKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVyZWRDdXJ2ZXM7XG59O1xuZnVuY3Rpb24gX2ludGVycG9sYXRlKGEsIGIsIHQpIHtcbiAgICByZXR1cm4gKDEgLSB0KSAqIGEgKyB0ICogYjtcbn1cbmZ1bmN0aW9uIF9jbG9uZShvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHJldHVybiBvYmouc2xpY2UoMCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKG9iaik7XG4gICAgfSBlbHNlXG4gICAgICAgIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplKHRyYW5zaXRpb24sIGRlZmF1bHRUcmFuc2l0aW9uKSB7XG4gICAgdmFyIHJlc3VsdCA9IHsgY3VydmU6IGRlZmF1bHRUcmFuc2l0aW9uLmN1cnZlIH07XG4gICAgaWYgKGRlZmF1bHRUcmFuc2l0aW9uLmR1cmF0aW9uKVxuICAgICAgICByZXN1bHQuZHVyYXRpb24gPSBkZWZhdWx0VHJhbnNpdGlvbi5kdXJhdGlvbjtcbiAgICBpZiAoZGVmYXVsdFRyYW5zaXRpb24uc3BlZWQpXG4gICAgICAgIHJlc3VsdC5zcGVlZCA9IGRlZmF1bHRUcmFuc2l0aW9uLnNwZWVkO1xuICAgIGlmICh0cmFuc2l0aW9uIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLmR1cmF0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXN1bHQuZHVyYXRpb24gPSB0cmFuc2l0aW9uLmR1cmF0aW9uO1xuICAgICAgICBpZiAodHJhbnNpdGlvbi5jdXJ2ZSlcbiAgICAgICAgICAgIHJlc3VsdC5jdXJ2ZSA9IHRyYW5zaXRpb24uY3VydmU7XG4gICAgICAgIGlmICh0cmFuc2l0aW9uLnNwZWVkKVxuICAgICAgICAgICAgcmVzdWx0LnNwZWVkID0gdHJhbnNpdGlvbi5zcGVlZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiByZXN1bHQuY3VydmUgPT09ICdzdHJpbmcnKVxuICAgICAgICByZXN1bHQuY3VydmUgPSBUd2VlblRyYW5zaXRpb24uZ2V0Q3VydmUocmVzdWx0LmN1cnZlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuY3VydmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgdGhpcy5vcHRpb25zLmN1cnZlID0gb3B0aW9ucy5jdXJ2ZTtcbiAgICBpZiAob3B0aW9ucy5kdXJhdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgIGlmIChvcHRpb25zLnNwZWVkICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5zcGVlZCA9IG9wdGlvbnMuc3BlZWQ7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoZW5kVmFsdWUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoZW5kVmFsdWUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0VmFsdWUgPSBfY2xvbmUodGhpcy5nZXQoKSk7XG4gICAgdHJhbnNpdGlvbiA9IF9ub3JtYWxpemUodHJhbnNpdGlvbiwgdGhpcy5vcHRpb25zKTtcbiAgICBpZiAodHJhbnNpdGlvbi5zcGVlZCkge1xuICAgICAgICB2YXIgc3RhcnRWYWx1ZSA9IHRoaXMuX3N0YXJ0VmFsdWU7XG4gICAgICAgIGlmIChzdGFydFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICB2YXIgdmFyaWFuY2UgPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzdGFydFZhbHVlKVxuICAgICAgICAgICAgICAgIHZhcmlhbmNlICs9IChlbmRWYWx1ZVtpXSAtIHN0YXJ0VmFsdWVbaV0pICogKGVuZFZhbHVlW2ldIC0gc3RhcnRWYWx1ZVtpXSk7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5zcXJ0KHZhcmlhbmNlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uLmR1cmF0aW9uID0gTWF0aC5hYnMoZW5kVmFsdWUgLSBzdGFydFZhbHVlKSAvIHRyYW5zaXRpb24uc3BlZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IF9jbG9uZShlbmRWYWx1ZSk7XG4gICAgdGhpcy5fc3RhcnRWZWxvY2l0eSA9IF9jbG9uZSh0cmFuc2l0aW9uLnZlbG9jaXR5KTtcbiAgICB0aGlzLl9kdXJhdGlvbiA9IHRyYW5zaXRpb24uZHVyYXRpb247XG4gICAgdGhpcy5fY3VydmUgPSB0cmFuc2l0aW9uLmN1cnZlO1xuICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gcmVzZXQoc3RhcnRWYWx1ZSwgc3RhcnRWZWxvY2l0eSkge1xuICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9jYWxsYmFjaztcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSBfY2xvbmUoc3RhcnRWYWx1ZSk7XG4gICAgdGhpcy52ZWxvY2l0eSA9IF9jbG9uZShzdGFydFZlbG9jaXR5KTtcbiAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgIHRoaXMuX2R1cmF0aW9uID0gMDtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gMDtcbiAgICB0aGlzLl9zdGFydFZhbHVlID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLl9zdGFydFZlbG9jaXR5ID0gdGhpcy52ZWxvY2l0eTtcbiAgICB0aGlzLl9lbmRWYWx1ZSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLnZlbG9jaXR5O1xufTtcblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gZ2V0KHRpbWVzdGFtcCkge1xuICAgIHRoaXMudXBkYXRlKHRpbWVzdGFtcCk7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGU7XG59O1xuZnVuY3Rpb24gX2NhbGN1bGF0ZVZlbG9jaXR5KGN1cnJlbnQsIHN0YXJ0LCBjdXJ2ZSwgZHVyYXRpb24sIHQpIHtcbiAgICB2YXIgdmVsb2NpdHk7XG4gICAgdmFyIGVwcyA9IDFlLTc7XG4gICAgdmFyIHNwZWVkID0gKGN1cnZlKHQpIC0gY3VydmUodCAtIGVwcykpIC8gZXBzO1xuICAgIGlmIChjdXJyZW50IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgdmVsb2NpdHkgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gc3BlZWQgKiAoY3VycmVudFtpXSAtIHN0YXJ0W2ldKSAvIGR1cmF0aW9uO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHZlbG9jaXR5W2ldID0gMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZVxuICAgICAgICB2ZWxvY2l0eSA9IHNwZWVkICogKGN1cnJlbnQgLSBzdGFydCkgLyBkdXJhdGlvbjtcbiAgICByZXR1cm4gdmVsb2NpdHk7XG59XG5mdW5jdGlvbiBfY2FsY3VsYXRlU3RhdGUoc3RhcnQsIGVuZCwgdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoc3RhcnQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBzdGF0ZSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0W2ldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IF9pbnRlcnBvbGF0ZShzdGFydFtpXSwgZW5kW2ldLCB0KTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBzdGF0ZVtpXSA9IHN0YXJ0W2ldO1xuICAgICAgICB9XG4gICAgfSBlbHNlXG4gICAgICAgIHN0YXRlID0gX2ludGVycG9sYXRlKHN0YXJ0LCBlbmQsIHQpO1xuICAgIHJldHVybiBzdGF0ZTtcbn1cblR3ZWVuVHJhbnNpdGlvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKHRpbWVzdGFtcCkge1xuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRpbWVzdGFtcClcbiAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBpZiAodGhpcy5fdXBkYXRlVGltZSA+PSB0aW1lc3RhbXApXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLl91cGRhdGVUaW1lID0gdGltZXN0YW1wO1xuICAgIHZhciB0aW1lU2luY2VTdGFydCA9IHRpbWVzdGFtcCAtIHRoaXMuX3N0YXJ0VGltZTtcbiAgICBpZiAodGltZVNpbmNlU3RhcnQgPj0gdGhpcy5fZHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHRoaXMuX2VuZFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gX2NhbGN1bGF0ZVZlbG9jaXR5KHRoaXMuc3RhdGUsIHRoaXMuX3N0YXJ0VmFsdWUsIHRoaXMuX2N1cnZlLCB0aGlzLl9kdXJhdGlvbiwgMSk7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGltZVNpbmNlU3RhcnQgPCAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB0aGlzLl9zdGFydFZhbHVlO1xuICAgICAgICB0aGlzLnZlbG9jaXR5ID0gdGhpcy5fc3RhcnRWZWxvY2l0eTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgdCA9IHRpbWVTaW5jZVN0YXJ0IC8gdGhpcy5fZHVyYXRpb247XG4gICAgICAgIHRoaXMuc3RhdGUgPSBfY2FsY3VsYXRlU3RhdGUodGhpcy5fc3RhcnRWYWx1ZSwgdGhpcy5fZW5kVmFsdWUsIHRoaXMuX2N1cnZlKHQpKTtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IF9jYWxjdWxhdGVWZWxvY2l0eSh0aGlzLnN0YXRlLCB0aGlzLl9zdGFydFZhbHVlLCB0aGlzLl9jdXJ2ZSwgdGhpcy5fZHVyYXRpb24sIHQpO1xuICAgIH1cbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmlzQWN0aXZlID0gZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcbn07XG5Ud2VlblRyYW5zaXRpb24ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMucmVzZXQodGhpcy5nZXQoKSk7XG59O1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2xpbmVhcicsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMubGluZWFyKTtcblR3ZWVuVHJhbnNpdGlvbi5yZWdpc3RlckN1cnZlKCdlYXNlSW4nLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VJbik7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZU91dCcsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuZWFzZU91dCk7XG5Ud2VlblRyYW5zaXRpb24ucmVnaXN0ZXJDdXJ2ZSgnZWFzZUluT3V0JywgVHdlZW5UcmFuc2l0aW9uLkN1cnZlcy5lYXNlSW5PdXQpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ2Vhc2VPdXRCb3VuY2UnLCBUd2VlblRyYW5zaXRpb24uQ3VydmVzLmVhc2VPdXRCb3VuY2UpO1xuVHdlZW5UcmFuc2l0aW9uLnJlZ2lzdGVyQ3VydmUoJ3NwcmluZycsIFR3ZWVuVHJhbnNpdGlvbi5DdXJ2ZXMuc3ByaW5nKTtcblR3ZWVuVHJhbnNpdGlvbi5jdXN0b21DdXJ2ZSA9IGZ1bmN0aW9uIGN1c3RvbUN1cnZlKHYxLCB2Mikge1xuICAgIHYxID0gdjEgfHwgMDtcbiAgICB2MiA9IHYyIHx8IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB2MSAqIHQgKyAoLTIgKiB2MSAtIHYyICsgMykgKiB0ICogdCArICh2MSArIHYyIC0gMikgKiB0ICogdCAqIHQ7XG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFR3ZWVuVHJhbnNpdGlvbjsiLCJ2YXIgUEUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9QaHlzaWNzRW5naW5lJyk7XG52YXIgUGFydGljbGUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUnKTtcbnZhciBTcHJpbmcgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9mb3JjZXMvU3ByaW5nJyk7XG52YXIgV2FsbCA9IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1dhbGwnKTtcbnZhciBWZWN0b3IgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9WZWN0b3InKTtcbmZ1bmN0aW9uIFdhbGxUcmFuc2l0aW9uKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSB8fCAwO1xuICAgIHRoaXMuZW5kU3RhdGUgPSBuZXcgVmVjdG9yKHN0YXRlKTtcbiAgICB0aGlzLmluaXRTdGF0ZSA9IG5ldyBWZWN0b3IoKTtcbiAgICB0aGlzLnNwcmluZyA9IG5ldyBTcHJpbmcoeyBhbmNob3I6IHRoaXMuZW5kU3RhdGUgfSk7XG4gICAgdGhpcy53YWxsID0gbmV3IFdhbGwoKTtcbiAgICB0aGlzLl9yZXN0VG9sZXJhbmNlID0gMWUtMTA7XG4gICAgdGhpcy5fZGltZW5zaW9ucyA9IDE7XG4gICAgdGhpcy5fYWJzUmVzdFRvbGVyYW5jZSA9IHRoaXMuX3Jlc3RUb2xlcmFuY2U7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5QRSA9IG5ldyBQRSgpO1xuICAgIHRoaXMucGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcbiAgICB0aGlzLlBFLmFkZEJvZHkodGhpcy5wYXJ0aWNsZSk7XG4gICAgdGhpcy5QRS5hdHRhY2goW1xuICAgICAgICB0aGlzLndhbGwsXG4gICAgICAgIHRoaXMuc3ByaW5nXG4gICAgXSwgdGhpcy5wYXJ0aWNsZSk7XG59XG5XYWxsVHJhbnNpdGlvbi5TVVBQT1JUU19NVUxUSVBMRSA9IDM7XG5XYWxsVHJhbnNpdGlvbi5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgcGVyaW9kOiAzMDAsXG4gICAgZGFtcGluZ1JhdGlvOiAwLjUsXG4gICAgdmVsb2NpdHk6IDAsXG4gICAgcmVzdGl0dXRpb246IDAuNVxufTtcbmZ1bmN0aW9uIF9nZXRFbmVyZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljbGUuZ2V0RW5lcmd5KCkgKyB0aGlzLnNwcmluZy5nZXRFbmVyZ3kodGhpcy5wYXJ0aWNsZSk7XG59XG5mdW5jdGlvbiBfc2V0QWJzb2x1dGVSZXN0VG9sZXJhbmNlKCkge1xuICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuZW5kU3RhdGUuc3ViKHRoaXMuaW5pdFN0YXRlKS5ub3JtU3F1YXJlZCgpO1xuICAgIHRoaXMuX2Fic1Jlc3RUb2xlcmFuY2UgPSBkaXN0YW5jZSA9PT0gMCA/IHRoaXMuX3Jlc3RUb2xlcmFuY2UgOiB0aGlzLl9yZXN0VG9sZXJhbmNlICogZGlzdGFuY2U7XG59XG5mdW5jdGlvbiBfd2FrZSgpIHtcbiAgICB0aGlzLlBFLndha2UoKTtcbn1cbmZ1bmN0aW9uIF9zbGVlcCgpIHtcbiAgICB0aGlzLlBFLnNsZWVwKCk7XG59XG5mdW5jdGlvbiBfc2V0VGFyZ2V0KHRhcmdldCkge1xuICAgIHRoaXMuZW5kU3RhdGUuc2V0KHRhcmdldCk7XG4gICAgdmFyIGRpc3QgPSB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybSgpO1xuICAgIHRoaXMud2FsbC5zZXRPcHRpb25zKHtcbiAgICAgICAgZGlzdGFuY2U6IHRoaXMuZW5kU3RhdGUubm9ybSgpLFxuICAgICAgICBub3JtYWw6IGRpc3QgPT09IDAgPyB0aGlzLnBhcnRpY2xlLnZlbG9jaXR5Lm5vcm1hbGl6ZSgtMSkgOiB0aGlzLmVuZFN0YXRlLnN1Yih0aGlzLmluaXRTdGF0ZSkubm9ybWFsaXplKC0xKVxuICAgIH0pO1xuICAgIF9zZXRBYnNvbHV0ZVJlc3RUb2xlcmFuY2UuY2FsbCh0aGlzKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVBvc2l0aW9uKHApIHtcbiAgICB0aGlzLnBhcnRpY2xlLnBvc2l0aW9uLnNldChwKTtcbn1cbmZ1bmN0aW9uIF9zZXRQYXJ0aWNsZVZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLnBhcnRpY2xlLnZlbG9jaXR5LnNldCh2KTtcbn1cbmZ1bmN0aW9uIF9nZXRQYXJ0aWNsZVBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb25zID09PSAwID8gdGhpcy5wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCkgOiB0aGlzLnBhcnRpY2xlLmdldFBvc2l0aW9uKCk7XG59XG5mdW5jdGlvbiBfZ2V0UGFydGljbGVWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGltZW5zaW9ucyA9PT0gMCA/IHRoaXMucGFydGljbGUuZ2V0VmVsb2NpdHkxRCgpIDogdGhpcy5wYXJ0aWNsZS5nZXRWZWxvY2l0eSgpO1xufVxuZnVuY3Rpb24gX3NldENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIF91cGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuUEUuaXNTbGVlcGluZygpKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGNiID0gdGhpcy5fY2FsbGJhY2s7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNiKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZW5lcmd5ID0gX2dldEVuZXJneS5jYWxsKHRoaXMpO1xuICAgIGlmIChlbmVyZ3kgPCB0aGlzLl9hYnNSZXN0VG9sZXJhbmNlKSB7XG4gICAgICAgIF9zbGVlcC5jYWxsKHRoaXMpO1xuICAgICAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHRoaXMuZW5kU3RhdGUpO1xuICAgICAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBfc2V0dXBEZWZpbml0aW9uKGRlZikge1xuICAgIHZhciBkZWZhdWx0cyA9IFdhbGxUcmFuc2l0aW9uLkRFRkFVTFRfT1BUSU9OUztcbiAgICBpZiAoZGVmLnBlcmlvZCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWYucGVyaW9kID0gZGVmYXVsdHMucGVyaW9kO1xuICAgIGlmIChkZWYuZGFtcGluZ1JhdGlvID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5kYW1waW5nUmF0aW8gPSBkZWZhdWx0cy5kYW1waW5nUmF0aW87XG4gICAgaWYgKGRlZi52ZWxvY2l0eSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBkZWYudmVsb2NpdHkgPSBkZWZhdWx0cy52ZWxvY2l0eTtcbiAgICBpZiAoZGVmLnJlc3RpdHV0aW9uID09PSB1bmRlZmluZWQpXG4gICAgICAgIGRlZi5yZXN0aXR1dGlvbiA9IGRlZmF1bHRzLnJlc3RpdHV0aW9uO1xuICAgIHRoaXMuc3ByaW5nLnNldE9wdGlvbnMoe1xuICAgICAgICBwZXJpb2Q6IGRlZi5wZXJpb2QsXG4gICAgICAgIGRhbXBpbmdSYXRpbzogZGVmLmRhbXBpbmdSYXRpb1xuICAgIH0pO1xuICAgIHRoaXMud2FsbC5zZXRPcHRpb25zKHsgcmVzdGl0dXRpb246IGRlZi5yZXN0aXR1dGlvbiB9KTtcbiAgICBfc2V0UGFydGljbGVWZWxvY2l0eS5jYWxsKHRoaXMsIGRlZi52ZWxvY2l0eSk7XG59XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiByZXNldChzdGF0ZSwgdmVsb2NpdHkpIHtcbiAgICB0aGlzLl9kaW1lbnNpb25zID0gc3RhdGUgaW5zdGFuY2VvZiBBcnJheSA/IHN0YXRlLmxlbmd0aCA6IDA7XG4gICAgdGhpcy5pbml0U3RhdGUuc2V0KHN0YXRlKTtcbiAgICBfc2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMsIHN0YXRlKTtcbiAgICBpZiAodmVsb2NpdHkpXG4gICAgICAgIF9zZXRQYXJ0aWNsZVZlbG9jaXR5LmNhbGwodGhpcywgdmVsb2NpdHkpO1xuICAgIF9zZXRUYXJnZXQuY2FsbCh0aGlzLCBzdGF0ZSk7XG4gICAgX3NldENhbGxiYWNrLmNhbGwodGhpcywgdW5kZWZpbmVkKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuZ2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBnZXRWZWxvY2l0eSgpIHtcbiAgICByZXR1cm4gX2dldFBhcnRpY2xlVmVsb2NpdHkuY2FsbCh0aGlzKTtcbn07XG5XYWxsVHJhbnNpdGlvbi5wcm90b3R5cGUuc2V0VmVsb2NpdHkgPSBmdW5jdGlvbiBzZXRWZWxvY2l0eSh2ZWxvY2l0eSkge1xuICAgIHRoaXMuY2FsbCh0aGlzLCBfc2V0UGFydGljbGVWZWxvY2l0eSh2ZWxvY2l0eSkpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uIGlzQWN0aXZlKCkge1xuICAgIHJldHVybiAhdGhpcy5QRS5pc1NsZWVwaW5nKCk7XG59O1xuV2FsbFRyYW5zaXRpb24ucHJvdG90eXBlLmhhbHQgPSBmdW5jdGlvbiBoYWx0KCkge1xuICAgIHRoaXMuc2V0KHRoaXMuZ2V0KCkpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgX3VwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiBfZ2V0UGFydGljbGVQb3NpdGlvbi5jYWxsKHRoaXMpO1xufTtcbldhbGxUcmFuc2l0aW9uLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQoc3RhdGUsIGRlZmluaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICAgIHRoaXMucmVzZXQoc3RhdGUpO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RpbWVuc2lvbnMgPSBzdGF0ZSBpbnN0YW5jZW9mIEFycmF5ID8gc3RhdGUubGVuZ3RoIDogMDtcbiAgICBfd2FrZS5jYWxsKHRoaXMpO1xuICAgIF9zZXR1cERlZmluaXRpb24uY2FsbCh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICBfc2V0VGFyZ2V0LmNhbGwodGhpcywgc3RhdGUpO1xuICAgIF9zZXRDYWxsYmFjay5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFdhbGxUcmFuc2l0aW9uOyIsInZhciBLZXlDb2RlcyA9IHtcbiAgICAgICAgMDogNDgsXG4gICAgICAgIDE6IDQ5LFxuICAgICAgICAyOiA1MCxcbiAgICAgICAgMzogNTEsXG4gICAgICAgIDQ6IDUyLFxuICAgICAgICA1OiA1MyxcbiAgICAgICAgNjogNTQsXG4gICAgICAgIDc6IDU1LFxuICAgICAgICA4OiA1NixcbiAgICAgICAgOTogNTcsXG4gICAgICAgIGE6IDk3LFxuICAgICAgICBiOiA5OCxcbiAgICAgICAgYzogOTksXG4gICAgICAgIGQ6IDEwMCxcbiAgICAgICAgZTogMTAxLFxuICAgICAgICBmOiAxMDIsXG4gICAgICAgIGc6IDEwMyxcbiAgICAgICAgaDogMTA0LFxuICAgICAgICBpOiAxMDUsXG4gICAgICAgIGo6IDEwNixcbiAgICAgICAgazogMTA3LFxuICAgICAgICBsOiAxMDgsXG4gICAgICAgIG06IDEwOSxcbiAgICAgICAgbjogMTEwLFxuICAgICAgICBvOiAxMTEsXG4gICAgICAgIHA6IDExMixcbiAgICAgICAgcTogMTEzLFxuICAgICAgICByOiAxMTQsXG4gICAgICAgIHM6IDExNSxcbiAgICAgICAgdDogMTE2LFxuICAgICAgICB1OiAxMTcsXG4gICAgICAgIHY6IDExOCxcbiAgICAgICAgdzogMTE5LFxuICAgICAgICB4OiAxMjAsXG4gICAgICAgIHk6IDEyMSxcbiAgICAgICAgejogMTIyLFxuICAgICAgICBBOiA2NSxcbiAgICAgICAgQjogNjYsXG4gICAgICAgIEM6IDY3LFxuICAgICAgICBEOiA2OCxcbiAgICAgICAgRTogNjksXG4gICAgICAgIEY6IDcwLFxuICAgICAgICBHOiA3MSxcbiAgICAgICAgSDogNzIsXG4gICAgICAgIEk6IDczLFxuICAgICAgICBKOiA3NCxcbiAgICAgICAgSzogNzUsXG4gICAgICAgIEw6IDc2LFxuICAgICAgICBNOiA3NyxcbiAgICAgICAgTjogNzgsXG4gICAgICAgIE86IDc5LFxuICAgICAgICBQOiA4MCxcbiAgICAgICAgUTogODEsXG4gICAgICAgIFI6IDgyLFxuICAgICAgICBTOiA4MyxcbiAgICAgICAgVDogODQsXG4gICAgICAgIFU6IDg1LFxuICAgICAgICBWOiA4NixcbiAgICAgICAgVzogODcsXG4gICAgICAgIFg6IDg4LFxuICAgICAgICBZOiA4OSxcbiAgICAgICAgWjogOTAsXG4gICAgICAgIEVOVEVSOiAxMyxcbiAgICAgICAgTEVGVF9BUlJPVzogMzcsXG4gICAgICAgIFJJR0hUX0FSUk9XOiAzOSxcbiAgICAgICAgVVBfQVJST1c6IDM4LFxuICAgICAgICBET1dOX0FSUk9XOiA0MCxcbiAgICAgICAgU1BBQ0U6IDMyLFxuICAgICAgICBTSElGVDogMTYsXG4gICAgICAgIFRBQjogOVxuICAgIH07XG5tb2R1bGUuZXhwb3J0cyA9IEtleUNvZGVzOyIsInZhciBGYW1vdXNFbmdpbmUgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FbmdpbmUnKTtcbnZhciBfZXZlbnQgPSAncHJlcmVuZGVyJztcbnZhciBnZXRUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgfSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIERhdGUubm93KCk7XG4gICAgfTtcbmZ1bmN0aW9uIGFkZFRpbWVyRnVuY3Rpb24oZm4pIHtcbiAgICBGYW1vdXNFbmdpbmUub24oX2V2ZW50LCBmbik7XG4gICAgcmV0dXJuIGZuO1xufVxuZnVuY3Rpb24gc2V0VGltZW91dChmbiwgZHVyYXRpb24pIHtcbiAgICB2YXIgdCA9IGdldFRpbWUoKTtcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0MiA9IGdldFRpbWUoKTtcbiAgICAgICAgaWYgKHQyIC0gdCA+PSBkdXJhdGlvbikge1xuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIEZhbW91c0VuZ2luZS5yZW1vdmVMaXN0ZW5lcihfZXZlbnQsIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGFkZFRpbWVyRnVuY3Rpb24oY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gc2V0SW50ZXJ2YWwoZm4sIGR1cmF0aW9uKSB7XG4gICAgdmFyIHQgPSBnZXRUaW1lKCk7XG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdDIgPSBnZXRUaW1lKCk7XG4gICAgICAgIGlmICh0MiAtIHQgPj0gZHVyYXRpb24pIHtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB0ID0gZ2V0VGltZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gYWRkVGltZXJGdW5jdGlvbihjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBhZnRlcihmbiwgbnVtVGlja3MpIHtcbiAgICBpZiAobnVtVGlja3MgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG51bVRpY2tzLS07XG4gICAgICAgIGlmIChudW1UaWNrcyA8PSAwKSB7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgY2xlYXIoY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gYWRkVGltZXJGdW5jdGlvbihjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBldmVyeShmbiwgbnVtVGlja3MpIHtcbiAgICBudW1UaWNrcyA9IG51bVRpY2tzIHx8IDE7XG4gICAgdmFyIGluaXRpYWwgPSBudW1UaWNrcztcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG51bVRpY2tzLS07XG4gICAgICAgIGlmIChudW1UaWNrcyA8PSAwKSB7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgbnVtVGlja3MgPSBpbml0aWFsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gYWRkVGltZXJGdW5jdGlvbihjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBjbGVhcihmbikge1xuICAgIEZhbW91c0VuZ2luZS5yZW1vdmVMaXN0ZW5lcihfZXZlbnQsIGZuKTtcbn1cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgdGltZW91dDtcbiAgICB2YXIgY3R4O1xuICAgIHZhciB0aW1lc3RhbXA7XG4gICAgdmFyIHJlc3VsdDtcbiAgICB2YXIgYXJncztcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBjdHggPSB0aGlzO1xuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICB0aW1lc3RhbXAgPSBnZXRUaW1lKCk7XG4gICAgICAgIHZhciBmbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsYXN0ID0gZ2V0VGltZSAtIHRpbWVzdGFtcDtcbiAgICAgICAgICAgIGlmIChsYXN0IDwgd2FpdCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZuLCB3YWl0IC0gbGFzdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY3R4LCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2xlYXIodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZuLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2V0VGltZW91dDogc2V0VGltZW91dCxcbiAgICBzZXRJbnRlcnZhbDogc2V0SW50ZXJ2YWwsXG4gICAgZGVib3VuY2U6IGRlYm91bmNlLFxuICAgIGFmdGVyOiBhZnRlcixcbiAgICBldmVyeTogZXZlcnksXG4gICAgY2xlYXI6IGNsZWFyXG59OyIsInZhciBVdGlsaXR5ID0ge307XG5VdGlsaXR5LkRpcmVjdGlvbiA9IHtcbiAgICBYOiAwLFxuICAgIFk6IDEsXG4gICAgWjogMlxufTtcblV0aWxpdHkuYWZ0ZXIgPSBmdW5jdGlvbiBhZnRlcihjb3VudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY291bnRlciA9IGNvdW50O1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvdW50ZXItLTtcbiAgICAgICAgaWYgKGNvdW50ZXIgPT09IDApXG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuVXRpbGl0eS5sb2FkVVJMID0gZnVuY3Rpb24gbG9hZFVSTCh1cmwsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBvbnJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgIHhoci5zZW5kKCk7XG59O1xuVXRpbGl0eS5jcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwgPSBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudEZyYWdtZW50RnJvbUhUTUwoaHRtbCkge1xuICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sO1xuICAgIHZhciByZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKGVsZW1lbnQuaGFzQ2hpbGROb2RlcygpKVxuICAgICAgICByZXN1bHQuYXBwZW5kQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblV0aWxpdHkuY2xvbmUgPSBmdW5jdGlvbiBjbG9uZShiKSB7XG4gICAgdmFyIGE7XG4gICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0Jykge1xuICAgICAgICBhID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJba2V5XSA9PT0gJ29iamVjdCcgJiYgYltrZXldICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGJba2V5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGFba2V5XSA9IG5ldyBBcnJheShiW2tleV0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiW2tleV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFba2V5XVtpXSA9IFV0aWxpdHkuY2xvbmUoYltrZXldW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFba2V5XSA9IFV0aWxpdHkuY2xvbmUoYltrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGEgPSBiO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFV0aWxpdHk7IiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0VudGl0eScpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbmZ1bmN0aW9uIENvbnRleHR1YWxWaWV3KG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKHRoaXMuY29uc3RydWN0b3IuREVGQVVMVF9PUFRJT05TIHx8IENvbnRleHR1YWxWaWV3LkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5faWQgPSBFbnRpdHkucmVnaXN0ZXIodGhpcyk7XG59XG5Db250ZXh0dWFsVmlldy5ERUZBVUxUX09QVElPTlMgPSB7fTtcbkNvbnRleHR1YWxWaWV3LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuQ29udGV4dHVhbFZpZXcucHJvdG90eXBlLmdldE9wdGlvbnMgPSBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5nZXRPcHRpb25zKCk7XG59O1xuQ29udGV4dHVhbFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG59O1xuQ29udGV4dHVhbFZpZXcucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBDb250ZXh0dWFsVmlldzsiLCJ2YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eScpO1xudmFyIFNlcXVlbnRpYWxMYXlvdXQgPSByZXF1aXJlKCcuL1NlcXVlbnRpYWxMYXlvdXQnKTtcbmZ1bmN0aW9uIERlY2sob3B0aW9ucykge1xuICAgIFNlcXVlbnRpYWxMYXlvdXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDApO1xuICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuc2V0T3V0cHV0RnVuY3Rpb24oZnVuY3Rpb24gKGlucHV0LCBvZmZzZXQsIGluZGV4KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IF9nZXRTdGF0ZS5jYWxsKHRoaXMpO1xuICAgICAgICB2YXIgcG9zaXRpb25NYXRyaXggPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBVdGlsaXR5LkRpcmVjdGlvbi5YID8gVHJhbnNmb3JtLnRyYW5zbGF0ZShzdGF0ZSAqIG9mZnNldCwgMCwgMC4wMDEgKiAoc3RhdGUgLSAxKSAqIG9mZnNldCkgOiBUcmFuc2Zvcm0udHJhbnNsYXRlKDAsIHN0YXRlICogb2Zmc2V0LCAwLjAwMSAqIChzdGF0ZSAtIDEpICogb2Zmc2V0KTtcbiAgICAgICAgdmFyIG91dHB1dCA9IGlucHV0LnJlbmRlcigpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnN0YWNrUm90YXRpb24pIHtcbiAgICAgICAgICAgIHZhciBhbW91bnQgPSB0aGlzLm9wdGlvbnMuc3RhY2tSb3RhdGlvbiAqIGluZGV4ICogKDEgLSBzdGF0ZSk7XG4gICAgICAgICAgICBvdXRwdXQgPSB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0ucm90YXRlWihhbW91bnQpLFxuICAgICAgICAgICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgICAgICAgICAwLjUsXG4gICAgICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBvdXRwdXRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogcG9zaXRpb25NYXRyaXgsXG4gICAgICAgICAgICBzaXplOiBpbnB1dC5nZXRTaXplKCksXG4gICAgICAgICAgICB0YXJnZXQ6IG91dHB1dFxuICAgICAgICB9O1xuICAgIH0pO1xufVxuRGVjay5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFNlcXVlbnRpYWxMYXlvdXQucHJvdG90eXBlKTtcbkRlY2sucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gRGVjaztcbkRlY2suREVGQVVMVF9PUFRJT05TID0gT3B0aW9uc01hbmFnZXIucGF0Y2goU2VxdWVudGlhbExheW91dC5ERUZBVUxUX09QVElPTlMsIHtcbiAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgIGN1cnZlOiAnZWFzZU91dEJvdW5jZScsXG4gICAgICAgIGR1cmF0aW9uOiA1MDBcbiAgICB9LFxuICAgIHN0YWNrUm90YXRpb246IDBcbn0pO1xuRGVjay5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgdmFyIG9yaWdpbmFsU2l6ZSA9IFNlcXVlbnRpYWxMYXlvdXQucHJvdG90eXBlLmdldFNpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgZmlyc3RTaXplID0gdGhpcy5faXRlbXMgPyB0aGlzLl9pdGVtcy5nZXQoKS5nZXRTaXplKCkgOiBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgIGlmICghZmlyc3RTaXplKVxuICAgICAgICBmaXJzdFNpemUgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdO1xuICAgIHZhciBzdGF0ZSA9IF9nZXRTdGF0ZS5jYWxsKHRoaXMpO1xuICAgIHZhciBpbnZTdGF0ZSA9IDEgLSBzdGF0ZTtcbiAgICByZXR1cm4gW1xuICAgICAgICBmaXJzdFNpemVbMF0gKiBpbnZTdGF0ZSArIG9yaWdpbmFsU2l6ZVswXSAqIHN0YXRlLFxuICAgICAgICBmaXJzdFNpemVbMV0gKiBpbnZTdGF0ZSArIG9yaWdpbmFsU2l6ZVsxXSAqIHN0YXRlXG4gICAgXTtcbn07XG5mdW5jdGlvbiBfZ2V0U3RhdGUocmV0dXJuRmluYWwpIHtcbiAgICBpZiAocmV0dXJuRmluYWwpXG4gICAgICAgIHJldHVybiB0aGlzLl9pc09wZW4gPyAxIDogMDtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmdldCgpO1xufVxuZnVuY3Rpb24gX3NldFN0YXRlKHBvcywgdHJhbnNpdGlvbiwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnN0YXRlLmhhbHQoKTtcbiAgICB0aGlzLnN0YXRlLnNldChwb3MsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbn1cbkRlY2sucHJvdG90eXBlLmlzT3BlbiA9IGZ1bmN0aW9uIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5faXNPcGVuO1xufTtcbkRlY2sucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiBvcGVuKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5faXNPcGVuID0gdHJ1ZTtcbiAgICBfc2V0U3RhdGUuY2FsbCh0aGlzLCAxLCB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbiwgY2FsbGJhY2spO1xufTtcbkRlY2sucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gY2xvc2UoY2FsbGJhY2spIHtcbiAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICBfc2V0U3RhdGUuY2FsbCh0aGlzLCAwLCB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbiwgY2FsbGJhY2spO1xufTtcbkRlY2sucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIHRvZ2dsZShjYWxsYmFjaykge1xuICAgIGlmICh0aGlzLl9pc09wZW4pXG4gICAgICAgIHRoaXMuY2xvc2UoY2FsbGJhY2spO1xuICAgIGVsc2VcbiAgICAgICAgdGhpcy5vcGVuKGNhbGxiYWNrKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IERlY2s7IiwidmFyIENhY2hlZE1hcCA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9DYWNoZWRNYXAnKTtcbnZhciBFbnRpdHkgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FbnRpdHknKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBSZW5kZXJDb250cm9sbGVyID0gcmVxdWlyZSgnLi9SZW5kZXJDb250cm9sbGVyJyk7XG5mdW5jdGlvbiBFZGdlU3dhcHBlcihvcHRpb25zKSB7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IG51bGw7XG4gICAgdGhpcy5fc2l6ZSA9IFtcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICB1bmRlZmluZWRcbiAgICBdO1xuICAgIHRoaXMuX2NvbnRyb2xsZXIgPSBuZXcgUmVuZGVyQ29udHJvbGxlcihvcHRpb25zKTtcbiAgICB0aGlzLl9jb250cm9sbGVyLmluVHJhbnNmb3JtRnJvbShDYWNoZWRNYXAuY3JlYXRlKF90cmFuc2Zvcm1NYXAuYmluZCh0aGlzLCAwLjAwMDEpKSk7XG4gICAgdGhpcy5fY29udHJvbGxlci5vdXRUcmFuc2Zvcm1Gcm9tKENhY2hlZE1hcC5jcmVhdGUoX3RyYW5zZm9ybU1hcC5iaW5kKHRoaXMsIC0wLjAwMDEpKSk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuX2V2ZW50SW5wdXQpO1xuICAgIHRoaXMuX2VudGl0eUlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG59XG5mdW5jdGlvbiBfdHJhbnNmb3JtTWFwKHpNYXgsIHByb2dyZXNzKSB7XG4gICAgcmV0dXJuIFRyYW5zZm9ybS50cmFuc2xhdGUodGhpcy5fc2l6ZVswXSAqICgxIC0gcHJvZ3Jlc3MpLCAwLCB6TWF4ICogKDEgLSBwcm9ncmVzcykpO1xufVxuRWRnZVN3YXBwZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiBzaG93KGNvbnRlbnQpIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFRhcmdldClcbiAgICAgICAgdGhpcy5fZXZlbnRJbnB1dC51bnBpcGUodGhpcy5fY3VycmVudFRhcmdldCk7XG4gICAgdGhpcy5fY3VycmVudFRhcmdldCA9IGNvbnRlbnQ7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRUYXJnZXQgJiYgdGhpcy5fY3VycmVudFRhcmdldC50cmlnZ2VyKVxuICAgICAgICB0aGlzLl9ldmVudElucHV0LnBpcGUodGhpcy5fY3VycmVudFRhcmdldCk7XG4gICAgdGhpcy5fY29udHJvbGxlci5zaG93LmFwcGx5KHRoaXMuX2NvbnRyb2xsZXIsIGFyZ3VtZW50cyk7XG59O1xuRWRnZVN3YXBwZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9jb250cm9sbGVyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuRWRnZVN3YXBwZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZW50aXR5SWQ7XG59O1xuRWRnZVN3YXBwZXIucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdGhpcy5fc2l6ZVswXSA9IGNvbnRleHQuc2l6ZVswXTtcbiAgICB0aGlzLl9zaXplWzFdID0gY29udGV4dC5zaXplWzFdO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogY29udGV4dC50cmFuc2Zvcm0sXG4gICAgICAgIG9wYWNpdHk6IGNvbnRleHQub3BhY2l0eSxcbiAgICAgICAgb3JpZ2luOiBjb250ZXh0Lm9yaWdpbixcbiAgICAgICAgc2l6ZTogY29udGV4dC5zaXplLFxuICAgICAgICB0YXJnZXQ6IHRoaXMuX2NvbnRyb2xsZXIucmVuZGVyKClcbiAgICB9O1xufTtcbm1vZHVsZS5leHBvcnRzID0gRWRnZVN3YXBwZXI7IiwidmFyIEVudGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0VudGl0eScpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xuZnVuY3Rpb24gRmxleGlibGVMYXlvdXQob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoRmxleGlibGVMYXlvdXQuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLm9wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmlkID0gRW50aXR5LnJlZ2lzdGVyKHRoaXMpO1xuICAgIHRoaXMuX3JhdGlvcyA9IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLm9wdGlvbnMucmF0aW9zKTtcbiAgICB0aGlzLl9ub2RlcyA9IFtdO1xuICAgIHRoaXMuX2NhY2hlZERpcmVjdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fY2FjaGVkVG90YWxMZW5ndGggPSBmYWxzZTtcbiAgICB0aGlzLl9jYWNoZWRMZW5ndGhzID0gW107XG4gICAgdGhpcy5fY2FjaGVkVHJhbnNmb3JtcyA9IG51bGw7XG4gICAgdGhpcy5fcmF0aW9zRGlydHkgPSBmYWxzZTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG59XG5GbGV4aWJsZUxheW91dC5ESVJFQ1RJT05fWCA9IDA7XG5GbGV4aWJsZUxheW91dC5ESVJFQ1RJT05fWSA9IDE7XG5GbGV4aWJsZUxheW91dC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGlyZWN0aW9uOiBGbGV4aWJsZUxheW91dC5ESVJFQ1RJT05fWCxcbiAgICB0cmFuc2l0aW9uOiBmYWxzZSxcbiAgICByYXRpb3M6IFtdXG59O1xuZnVuY3Rpb24gX3JlZmxvdyhyYXRpb3MsIGxlbmd0aCwgZGlyZWN0aW9uKSB7XG4gICAgdmFyIGN1cnJUcmFuc2Zvcm07XG4gICAgdmFyIHRyYW5zbGF0aW9uID0gMDtcbiAgICB2YXIgZmxleExlbmd0aCA9IGxlbmd0aDtcbiAgICB2YXIgcmF0aW9TdW0gPSAwO1xuICAgIHZhciByYXRpbztcbiAgICB2YXIgbm9kZTtcbiAgICB2YXIgaTtcbiAgICB0aGlzLl9jYWNoZWRMZW5ndGhzID0gW107XG4gICAgdGhpcy5fY2FjaGVkVHJhbnNmb3JtcyA9IFtdO1xuICAgIGZvciAoaSA9IDA7IGkgPCByYXRpb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmF0aW8gPSByYXRpb3NbaV07XG4gICAgICAgIG5vZGUgPSB0aGlzLl9ub2Rlc1tpXTtcbiAgICAgICAgaWYgKHR5cGVvZiByYXRpbyAhPT0gJ251bWJlcicpXG4gICAgICAgICAgICBmbGV4TGVuZ3RoIC09IG5vZGUuZ2V0U2l6ZSgpW2RpcmVjdGlvbl0gfHwgMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmF0aW9TdW0gKz0gcmF0aW87XG4gICAgfVxuICAgIGZvciAoaSA9IDA7IGkgPCByYXRpb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbm9kZSA9IHRoaXMuX25vZGVzW2ldO1xuICAgICAgICByYXRpbyA9IHJhdGlvc1tpXTtcbiAgICAgICAgbGVuZ3RoID0gdHlwZW9mIHJhdGlvID09PSAnbnVtYmVyJyA/IGZsZXhMZW5ndGggKiByYXRpbyAvIHJhdGlvU3VtIDogbm9kZS5nZXRTaXplKClbZGlyZWN0aW9uXTtcbiAgICAgICAgY3VyclRyYW5zZm9ybSA9IGRpcmVjdGlvbiA9PT0gRmxleGlibGVMYXlvdXQuRElSRUNUSU9OX1ggPyBUcmFuc2Zvcm0udHJhbnNsYXRlKHRyYW5zbGF0aW9uLCAwLCAwKSA6IFRyYW5zZm9ybS50cmFuc2xhdGUoMCwgdHJhbnNsYXRpb24sIDApO1xuICAgICAgICB0aGlzLl9jYWNoZWRUcmFuc2Zvcm1zLnB1c2goY3VyclRyYW5zZm9ybSk7XG4gICAgICAgIHRoaXMuX2NhY2hlZExlbmd0aHMucHVzaChsZW5ndGgpO1xuICAgICAgICB0cmFuc2xhdGlvbiArPSBsZW5ndGg7XG4gICAgfVxufVxuRmxleGlibGVMYXlvdXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5pZDtcbn07XG5GbGV4aWJsZUxheW91dC5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5GbGV4aWJsZUxheW91dC5wcm90b3R5cGUuc2VxdWVuY2VGcm9tID0gZnVuY3Rpb24gc2VxdWVuY2VGcm9tKHNlcXVlbmNlKSB7XG4gICAgdGhpcy5fbm9kZXMgPSBzZXF1ZW5jZTtcbiAgICBpZiAodGhpcy5fcmF0aW9zLmdldCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIgcmF0aW9zID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbm9kZXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICByYXRpb3MucHVzaCgxKTtcbiAgICAgICAgdGhpcy5zZXRSYXRpb3MocmF0aW9zKTtcbiAgICB9XG59O1xuRmxleGlibGVMYXlvdXQucHJvdG90eXBlLnNldFJhdGlvcyA9IGZ1bmN0aW9uIHNldFJhdGlvcyhyYXRpb3MsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gPT09IHVuZGVmaW5lZClcbiAgICAgICAgdHJhbnNpdGlvbiA9IHRoaXMub3B0aW9ucy50cmFuc2l0aW9uO1xuICAgIHZhciBjdXJyUmF0aW9zID0gdGhpcy5fcmF0aW9zO1xuICAgIGlmIChjdXJyUmF0aW9zLmdldCgpLmxlbmd0aCA9PT0gMClcbiAgICAgICAgdHJhbnNpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICBpZiAoY3VyclJhdGlvcy5pc0FjdGl2ZSgpKVxuICAgICAgICBjdXJyUmF0aW9zLmhhbHQoKTtcbiAgICBjdXJyUmF0aW9zLnNldChyYXRpb3MsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICB0aGlzLl9yYXRpb3NEaXJ0eSA9IHRydWU7XG59O1xuRmxleGlibGVMYXlvdXQucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHBhcmVudFNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgdmFyIHBhcmVudFRyYW5zZm9ybSA9IGNvbnRleHQudHJhbnNmb3JtO1xuICAgIHZhciBwYXJlbnRPcmlnaW4gPSBjb250ZXh0Lm9yaWdpbjtcbiAgICB2YXIgcGFyZW50T3BhY2l0eSA9IGNvbnRleHQub3BhY2l0eTtcbiAgICB2YXIgcmF0aW9zID0gdGhpcy5fcmF0aW9zLmdldCgpO1xuICAgIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICAgIHZhciBsZW5ndGggPSBwYXJlbnRTaXplW2RpcmVjdGlvbl07XG4gICAgdmFyIHNpemU7XG4gICAgaWYgKGxlbmd0aCAhPT0gdGhpcy5fY2FjaGVkVG90YWxMZW5ndGggfHwgdGhpcy5fcmF0aW9zRGlydHkgfHwgdGhpcy5fcmF0aW9zLmlzQWN0aXZlKCkgfHwgZGlyZWN0aW9uICE9PSB0aGlzLl9jYWNoZWREaXJlY3Rpb24pIHtcbiAgICAgICAgX3JlZmxvdy5jYWxsKHRoaXMsIHJhdGlvcywgbGVuZ3RoLCBkaXJlY3Rpb24pO1xuICAgICAgICBpZiAobGVuZ3RoICE9PSB0aGlzLl9jYWNoZWRUb3RhbExlbmd0aClcbiAgICAgICAgICAgIHRoaXMuX2NhY2hlZFRvdGFsTGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBpZiAoZGlyZWN0aW9uICE9PSB0aGlzLl9jYWNoZWREaXJlY3Rpb24pXG4gICAgICAgICAgICB0aGlzLl9jYWNoZWREaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgICAgIGlmICh0aGlzLl9yYXRpb3NEaXJ0eSlcbiAgICAgICAgICAgIHRoaXMuX3JhdGlvc0RpcnR5ID0gZmFsc2U7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhdGlvcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzaXplID0gW1xuICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgIF07XG4gICAgICAgIGxlbmd0aCA9IHRoaXMuX2NhY2hlZExlbmd0aHNbaV07XG4gICAgICAgIHNpemVbZGlyZWN0aW9uXSA9IGxlbmd0aDtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0aGlzLl9jYWNoZWRUcmFuc2Zvcm1zW2ldLFxuICAgICAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5fbm9kZXNbaV0ucmVuZGVyKClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChwYXJlbnRTaXplICYmIChwYXJlbnRPcmlnaW5bMF0gIT09IDAgJiYgcGFyZW50T3JpZ2luWzFdICE9PSAwKSlcbiAgICAgICAgcGFyZW50VHJhbnNmb3JtID0gVHJhbnNmb3JtLm1vdmVUaGVuKFtcbiAgICAgICAgICAgIC1wYXJlbnRTaXplWzBdICogcGFyZW50T3JpZ2luWzBdLFxuICAgICAgICAgICAgLXBhcmVudFNpemVbMV0gKiBwYXJlbnRPcmlnaW5bMV0sXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sIHBhcmVudFRyYW5zZm9ybSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNmb3JtOiBwYXJlbnRUcmFuc2Zvcm0sXG4gICAgICAgIHNpemU6IHBhcmVudFNpemUsXG4gICAgICAgIG9wYWNpdHk6IHBhcmVudE9wYWNpdHksXG4gICAgICAgIHRhcmdldDogcmVzdWx0XG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEZsZXhpYmxlTGF5b3V0OyIsInZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBUcmFuc2l0aW9uYWJsZSA9IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9UcmFuc2l0aW9uYWJsZScpO1xudmFyIFJlbmRlck5vZGUgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9SZW5kZXJOb2RlJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gRmxpcHBlcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShGbGlwcGVyLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuYW5nbGUgPSBuZXcgVHJhbnNpdGlvbmFibGUoMCk7XG4gICAgdGhpcy5mcm9udE5vZGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5iYWNrTm9kZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZsaXBwZWQgPSBmYWxzZTtcbn1cbkZsaXBwZXIuRElSRUNUSU9OX1ggPSAwO1xuRmxpcHBlci5ESVJFQ1RJT05fWSA9IDE7XG52YXIgU0VQRVJBVElPTl9MRU5HVEggPSAxO1xuRmxpcHBlci5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgdHJhbnNpdGlvbjogdHJ1ZSxcbiAgICBkaXJlY3Rpb246IEZsaXBwZXIuRElSRUNUSU9OX1hcbn07XG5GbGlwcGVyLnByb3RvdHlwZS5mbGlwID0gZnVuY3Rpb24gZmxpcCh0cmFuc2l0aW9uLCBjYWxsYmFjaykge1xuICAgIHZhciBhbmdsZSA9IHRoaXMuZmxpcHBlZCA/IDAgOiBNYXRoLlBJO1xuICAgIHRoaXMuc2V0QW5nbGUoYW5nbGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKTtcbiAgICB0aGlzLmZsaXBwZWQgPSAhdGhpcy5mbGlwcGVkO1xufTtcbkZsaXBwZXIucHJvdG90eXBlLnNldEFuZ2xlID0gZnVuY3Rpb24gc2V0QW5nbGUoYW5nbGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRyYW5zaXRpb24gPT09IHVuZGVmaW5lZClcbiAgICAgICAgdHJhbnNpdGlvbiA9IHRoaXMub3B0aW9ucy50cmFuc2l0aW9uO1xuICAgIGlmICh0aGlzLmFuZ2xlLmlzQWN0aXZlKCkpXG4gICAgICAgIHRoaXMuYW5nbGUuaGFsdCgpO1xuICAgIHRoaXMuYW5nbGUuc2V0KGFuZ2xlLCB0cmFuc2l0aW9uLCBjYWxsYmFjayk7XG59O1xuRmxpcHBlci5wcm90b3R5cGUuc2V0T3B0aW9ucyA9IGZ1bmN0aW9uIHNldE9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbkZsaXBwZXIucHJvdG90eXBlLnNldEZyb250ID0gZnVuY3Rpb24gc2V0RnJvbnQobm9kZSkge1xuICAgIHRoaXMuZnJvbnROb2RlID0gbm9kZTtcbn07XG5GbGlwcGVyLnByb3RvdHlwZS5zZXRCYWNrID0gZnVuY3Rpb24gc2V0QmFjayhub2RlKSB7XG4gICAgdGhpcy5iYWNrTm9kZSA9IG5vZGU7XG59O1xuRmxpcHBlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHZhciBhbmdsZSA9IHRoaXMuYW5nbGUuZ2V0KCk7XG4gICAgdmFyIGZyb250VHJhbnNmb3JtO1xuICAgIHZhciBiYWNrVHJhbnNmb3JtO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBGbGlwcGVyLkRJUkVDVElPTl9YKSB7XG4gICAgICAgIGZyb250VHJhbnNmb3JtID0gVHJhbnNmb3JtLnJvdGF0ZVkoYW5nbGUpO1xuICAgICAgICBiYWNrVHJhbnNmb3JtID0gVHJhbnNmb3JtLnJvdGF0ZVkoYW5nbGUgKyBNYXRoLlBJKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmcm9udFRyYW5zZm9ybSA9IFRyYW5zZm9ybS5yb3RhdGVYKGFuZ2xlKTtcbiAgICAgICAgYmFja1RyYW5zZm9ybSA9IFRyYW5zZm9ybS5yb3RhdGVYKGFuZ2xlICsgTWF0aC5QSSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBpZiAodGhpcy5mcm9udE5vZGUpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBmcm9udFRyYW5zZm9ybSxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5mcm9udE5vZGUucmVuZGVyKClcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmJhY2tOb2RlKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLm1vdmVUaGVuKFtcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgU0VQRVJBVElPTl9MRU5HVEhcbiAgICAgICAgICAgIF0sIGJhY2tUcmFuc2Zvcm0pLFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmJhY2tOb2RlLnJlbmRlcigpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gRmxpcHBlcjsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRW50aXR5Jyk7XG52YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1JlbmRlck5vZGUnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBWaWV3U2VxdWVuY2UgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9WaWV3U2VxdWVuY2UnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBNb2RpZmllciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL01vZGlmaWVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIEdyaWRMYXlvdXQob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoR3JpZExheW91dC5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMub3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuaWQgPSBFbnRpdHkucmVnaXN0ZXIodGhpcyk7XG4gICAgdGhpcy5fbW9kaWZpZXJzID0gW107XG4gICAgdGhpcy5fc3RhdGVzID0gW107XG4gICAgdGhpcy5fY29udGV4dFNpemVDYWNoZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgMFxuICAgIF07XG4gICAgdGhpcy5fZGltZW5zaW9uc0NhY2hlID0gW1xuICAgICAgICAwLFxuICAgICAgICAwXG4gICAgXTtcbiAgICB0aGlzLl9hY3RpdmVDb3VudCA9IDA7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xufVxuZnVuY3Rpb24gX3JlZmxvdyhzaXplLCBjb2xzLCByb3dzKSB7XG4gICAgdmFyIHVzYWJsZVNpemUgPSBbXG4gICAgICAgICAgICBzaXplWzBdLFxuICAgICAgICAgICAgc2l6ZVsxXVxuICAgICAgICBdO1xuICAgIHVzYWJsZVNpemVbMF0gLT0gdGhpcy5vcHRpb25zLmd1dHRlclNpemVbMF0gKiAoY29scyAtIDEpO1xuICAgIHVzYWJsZVNpemVbMV0gLT0gdGhpcy5vcHRpb25zLmd1dHRlclNpemVbMV0gKiAocm93cyAtIDEpO1xuICAgIHZhciByb3dTaXplID0gTWF0aC5yb3VuZCh1c2FibGVTaXplWzFdIC8gcm93cyk7XG4gICAgdmFyIGNvbFNpemUgPSBNYXRoLnJvdW5kKHVzYWJsZVNpemVbMF0gLyBjb2xzKTtcbiAgICB2YXIgY3VyclkgPSAwO1xuICAgIHZhciBjdXJyWDtcbiAgICB2YXIgY3VyckluZGV4ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xuICAgICAgICBjdXJyWCA9IDA7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29sczsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW9kaWZpZXJzW2N1cnJJbmRleF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIF9jcmVhdGVNb2RpZmllci5jYWxsKHRoaXMsIGN1cnJJbmRleCwgW1xuICAgICAgICAgICAgICAgICAgICBjb2xTaXplLFxuICAgICAgICAgICAgICAgICAgICByb3dTaXplXG4gICAgICAgICAgICAgICAgXSwgW1xuICAgICAgICAgICAgICAgICAgICBjdXJyWCxcbiAgICAgICAgICAgICAgICAgICAgY3VyclksXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2FuaW1hdGVNb2RpZmllci5jYWxsKHRoaXMsIGN1cnJJbmRleCwgW1xuICAgICAgICAgICAgICAgICAgICBjb2xTaXplLFxuICAgICAgICAgICAgICAgICAgICByb3dTaXplXG4gICAgICAgICAgICAgICAgXSwgW1xuICAgICAgICAgICAgICAgICAgICBjdXJyWCxcbiAgICAgICAgICAgICAgICAgICAgY3VyclksXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJJbmRleCsrO1xuICAgICAgICAgICAgY3VyclggKz0gY29sU2l6ZSArIHRoaXMub3B0aW9ucy5ndXR0ZXJTaXplWzBdO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJZICs9IHJvd1NpemUgKyB0aGlzLm9wdGlvbnMuZ3V0dGVyU2l6ZVsxXTtcbiAgICB9XG4gICAgdGhpcy5fZGltZW5zaW9uc0NhY2hlID0gW1xuICAgICAgICB0aGlzLm9wdGlvbnMuZGltZW5zaW9uc1swXSxcbiAgICAgICAgdGhpcy5vcHRpb25zLmRpbWVuc2lvbnNbMV1cbiAgICBdO1xuICAgIHRoaXMuX2NvbnRleHRTaXplQ2FjaGUgPSBbXG4gICAgICAgIHNpemVbMF0sXG4gICAgICAgIHNpemVbMV1cbiAgICBdO1xuICAgIHRoaXMuX2FjdGl2ZUNvdW50ID0gcm93cyAqIGNvbHM7XG4gICAgZm9yIChpID0gdGhpcy5fYWN0aXZlQ291bnQ7IGkgPCB0aGlzLl9tb2RpZmllcnMubGVuZ3RoOyBpKyspXG4gICAgICAgIF9hbmltYXRlTW9kaWZpZXIuY2FsbCh0aGlzLCBpLCBbXG4gICAgICAgICAgICBNYXRoLnJvdW5kKGNvbFNpemUpLFxuICAgICAgICAgICAgTWF0aC5yb3VuZChyb3dTaXplKVxuICAgICAgICBdLCBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLCAwKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdyZWZsb3cnKTtcbn1cbmZ1bmN0aW9uIF9jcmVhdGVNb2RpZmllcihpbmRleCwgc2l6ZSwgcG9zaXRpb24sIG9wYWNpdHkpIHtcbiAgICB2YXIgdHJhbnNpdGlvbkl0ZW0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IG5ldyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybShUcmFuc2Zvcm0udHJhbnNsYXRlLmFwcGx5KG51bGwsIHBvc2l0aW9uKSksXG4gICAgICAgICAgICBvcGFjaXR5OiBuZXcgVHJhbnNpdGlvbmFibGUob3BhY2l0eSksXG4gICAgICAgICAgICBzaXplOiBuZXcgVHJhbnNpdGlvbmFibGUoc2l6ZSlcbiAgICAgICAgfTtcbiAgICB2YXIgbW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2l0aW9uSXRlbS50cmFuc2Zvcm0sXG4gICAgICAgICAgICBvcGFjaXR5OiB0cmFuc2l0aW9uSXRlbS5vcGFjaXR5LFxuICAgICAgICAgICAgc2l6ZTogdHJhbnNpdGlvbkl0ZW0uc2l6ZVxuICAgICAgICB9KTtcbiAgICB0aGlzLl9zdGF0ZXNbaW5kZXhdID0gdHJhbnNpdGlvbkl0ZW07XG4gICAgdGhpcy5fbW9kaWZpZXJzW2luZGV4XSA9IG1vZGlmaWVyO1xufVxuZnVuY3Rpb24gX2FuaW1hdGVNb2RpZmllcihpbmRleCwgc2l6ZSwgcG9zaXRpb24sIG9wYWNpdHkpIHtcbiAgICB2YXIgY3VyclN0YXRlID0gdGhpcy5fc3RhdGVzW2luZGV4XTtcbiAgICB2YXIgY3VyclNpemUgPSBjdXJyU3RhdGUuc2l6ZTtcbiAgICB2YXIgY3Vyck9wYWNpdHkgPSBjdXJyU3RhdGUub3BhY2l0eTtcbiAgICB2YXIgY3VyclRyYW5zZm9ybSA9IGN1cnJTdGF0ZS50cmFuc2Zvcm07XG4gICAgdmFyIHRyYW5zaXRpb24gPSB0aGlzLm9wdGlvbnMudHJhbnNpdGlvbjtcbiAgICBjdXJyVHJhbnNmb3JtLmhhbHQoKTtcbiAgICBjdXJyT3BhY2l0eS5oYWx0KCk7XG4gICAgY3VyclNpemUuaGFsdCgpO1xuICAgIGN1cnJUcmFuc2Zvcm0uc2V0VHJhbnNsYXRlKHBvc2l0aW9uLCB0cmFuc2l0aW9uKTtcbiAgICBjdXJyU2l6ZS5zZXQoc2l6ZSwgdHJhbnNpdGlvbik7XG4gICAgY3Vyck9wYWNpdHkuc2V0KG9wYWNpdHksIHRyYW5zaXRpb24pO1xufVxuR3JpZExheW91dC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGltZW5zaW9uczogW1xuICAgICAgICAxLFxuICAgICAgICAxXG4gICAgXSxcbiAgICB0cmFuc2l0aW9uOiBmYWxzZSxcbiAgICBndXR0ZXJTaXplOiBbXG4gICAgICAgIDAsXG4gICAgICAgIDBcbiAgICBdXG59O1xuR3JpZExheW91dC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlkO1xufTtcbkdyaWRMYXlvdXQucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xufTtcbkdyaWRMYXlvdXQucHJvdG90eXBlLnNlcXVlbmNlRnJvbSA9IGZ1bmN0aW9uIHNlcXVlbmNlRnJvbShzZXF1ZW5jZSkge1xuICAgIGlmIChzZXF1ZW5jZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICBzZXF1ZW5jZSA9IG5ldyBWaWV3U2VxdWVuY2Uoc2VxdWVuY2UpO1xuICAgIHRoaXMuc2VxdWVuY2UgPSBzZXF1ZW5jZTtcbn07XG5HcmlkTGF5b3V0LnByb3RvdHlwZS5jb21taXQgPSBmdW5jdGlvbiBjb21taXQoY29udGV4dCkge1xuICAgIHZhciB0cmFuc2Zvcm0gPSBjb250ZXh0LnRyYW5zZm9ybTtcbiAgICB2YXIgb3BhY2l0eSA9IGNvbnRleHQub3BhY2l0eTtcbiAgICB2YXIgb3JpZ2luID0gY29udGV4dC5vcmlnaW47XG4gICAgdmFyIHNpemUgPSBjb250ZXh0LnNpemU7XG4gICAgdmFyIGNvbHMgPSB0aGlzLm9wdGlvbnMuZGltZW5zaW9uc1swXTtcbiAgICB2YXIgcm93cyA9IHRoaXMub3B0aW9ucy5kaW1lbnNpb25zWzFdO1xuICAgIGlmIChzaXplWzBdICE9PSB0aGlzLl9jb250ZXh0U2l6ZUNhY2hlWzBdIHx8IHNpemVbMV0gIT09IHRoaXMuX2NvbnRleHRTaXplQ2FjaGVbMV0gfHwgY29scyAhPT0gdGhpcy5fZGltZW5zaW9uc0NhY2hlWzBdIHx8IHJvd3MgIT09IHRoaXMuX2RpbWVuc2lvbnNDYWNoZVsxXSkge1xuICAgICAgICBfcmVmbG93LmNhbGwodGhpcywgc2l6ZSwgY29scywgcm93cyk7XG4gICAgfVxuICAgIHZhciBzZXF1ZW5jZSA9IHRoaXMuc2VxdWVuY2U7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBjdXJySW5kZXggPSAwO1xuICAgIHdoaWxlIChzZXF1ZW5jZSAmJiBjdXJySW5kZXggPCB0aGlzLl9tb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBpdGVtID0gc2VxdWVuY2UuZ2V0KCk7XG4gICAgICAgIHZhciBtb2RpZmllciA9IHRoaXMuX21vZGlmaWVyc1tjdXJySW5kZXhdO1xuICAgICAgICBpZiAoY3VyckluZGV4ID49IHRoaXMuX2FjdGl2ZUNvdW50ICYmIHRoaXMuX3N0YXRlc1tjdXJySW5kZXhdLm9wYWNpdHkuaXNBY3RpdmUoKSkge1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXJzLnNwbGljZShjdXJySW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGVzLnNwbGljZShjdXJySW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChtb2RpZmllci5tb2RpZnkoe1xuICAgICAgICAgICAgICAgIG9yaWdpbjogb3JpZ2luLFxuICAgICAgICAgICAgICAgIHRhcmdldDogaXRlbS5yZW5kZXIoKVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHNlcXVlbmNlID0gc2VxdWVuY2UuZ2V0TmV4dCgpO1xuICAgICAgICBjdXJySW5kZXgrKztcbiAgICB9XG4gICAgaWYgKHNpemUpXG4gICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5tb3ZlVGhlbihbXG4gICAgICAgICAgICAtc2l6ZVswXSAqIG9yaWdpblswXSxcbiAgICAgICAgICAgIC1zaXplWzFdICogb3JpZ2luWzFdLFxuICAgICAgICAgICAgMFxuICAgICAgICBdLCB0cmFuc2Zvcm0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxuICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICB0YXJnZXQ6IHJlc3VsdFxuICAgIH07XG59O1xubW9kdWxlLmV4cG9ydHMgPSBHcmlkTGF5b3V0OyIsInZhciBFbnRpdHkgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FbnRpdHknKTtcbnZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvUmVuZGVyTm9kZScpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbmZ1bmN0aW9uIEhlYWRlckZvb3RlckxheW91dChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZShIZWFkZXJGb290ZXJMYXlvdXQuREVGQVVMVF9PUFRJT05TKTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5fZW50aXR5SWQgPSBFbnRpdHkucmVnaXN0ZXIodGhpcyk7XG4gICAgdGhpcy5oZWFkZXIgPSBuZXcgUmVuZGVyTm9kZSgpO1xuICAgIHRoaXMuZm9vdGVyID0gbmV3IFJlbmRlck5vZGUoKTtcbiAgICB0aGlzLmNvbnRlbnQgPSBuZXcgUmVuZGVyTm9kZSgpO1xufVxuSGVhZGVyRm9vdGVyTGF5b3V0LkRJUkVDVElPTl9YID0gMDtcbkhlYWRlckZvb3RlckxheW91dC5ESVJFQ1RJT05fWSA9IDE7XG5IZWFkZXJGb290ZXJMYXlvdXQuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpcmVjdGlvbjogSGVhZGVyRm9vdGVyTGF5b3V0LkRJUkVDVElPTl9ZLFxuICAgIGhlYWRlclNpemU6IHVuZGVmaW5lZCxcbiAgICBmb290ZXJTaXplOiB1bmRlZmluZWQsXG4gICAgZGVmYXVsdEhlYWRlclNpemU6IDAsXG4gICAgZGVmYXVsdEZvb3RlclNpemU6IDBcbn07XG5IZWFkZXJGb290ZXJMYXlvdXQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5fZW50aXR5SWQ7XG59O1xuSGVhZGVyRm9vdGVyTGF5b3V0LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuZnVuY3Rpb24gX3Jlc29sdmVOb2RlU2l6ZShub2RlLCBkZWZhdWx0U2l6ZSkge1xuICAgIHZhciBub2RlU2l6ZSA9IG5vZGUuZ2V0U2l6ZSgpO1xuICAgIHJldHVybiBub2RlU2l6ZSA/IG5vZGVTaXplW3RoaXMub3B0aW9ucy5kaXJlY3Rpb25dIDogZGVmYXVsdFNpemU7XG59XG5mdW5jdGlvbiBfb3V0cHV0VHJhbnNmb3JtKG9mZnNldCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBIZWFkZXJGb290ZXJMYXlvdXQuRElSRUNUSU9OX1gpXG4gICAgICAgIHJldHVybiBUcmFuc2Zvcm0udHJhbnNsYXRlKG9mZnNldCwgMCwgMCk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gVHJhbnNmb3JtLnRyYW5zbGF0ZSgwLCBvZmZzZXQsIDApO1xufVxuZnVuY3Rpb24gX2ZpbmFsU2l6ZShkaXJlY3Rpb25TaXplLCBzaXplKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IEhlYWRlckZvb3RlckxheW91dC5ESVJFQ1RJT05fWClcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGRpcmVjdGlvblNpemUsXG4gICAgICAgICAgICBzaXplWzFdXG4gICAgICAgIF07XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgc2l6ZVswXSxcbiAgICAgICAgICAgIGRpcmVjdGlvblNpemVcbiAgICAgICAgXTtcbn1cbkhlYWRlckZvb3RlckxheW91dC5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0KGNvbnRleHQpIHtcbiAgICB2YXIgdHJhbnNmb3JtID0gY29udGV4dC50cmFuc2Zvcm07XG4gICAgdmFyIG9yaWdpbiA9IGNvbnRleHQub3JpZ2luO1xuICAgIHZhciBzaXplID0gY29udGV4dC5zaXplO1xuICAgIHZhciBvcGFjaXR5ID0gY29udGV4dC5vcGFjaXR5O1xuICAgIHZhciBoZWFkZXJTaXplID0gdGhpcy5vcHRpb25zLmhlYWRlclNpemUgIT09IHVuZGVmaW5lZCA/IHRoaXMub3B0aW9ucy5oZWFkZXJTaXplIDogX3Jlc29sdmVOb2RlU2l6ZS5jYWxsKHRoaXMsIHRoaXMuaGVhZGVyLCB0aGlzLm9wdGlvbnMuZGVmYXVsdEhlYWRlclNpemUpO1xuICAgIHZhciBmb290ZXJTaXplID0gdGhpcy5vcHRpb25zLmZvb3RlclNpemUgIT09IHVuZGVmaW5lZCA/IHRoaXMub3B0aW9ucy5mb290ZXJTaXplIDogX3Jlc29sdmVOb2RlU2l6ZS5jYWxsKHRoaXMsIHRoaXMuZm9vdGVyLCB0aGlzLm9wdGlvbnMuZGVmYXVsdEZvb3RlclNpemUpO1xuICAgIHZhciBjb250ZW50U2l6ZSA9IHNpemVbdGhpcy5vcHRpb25zLmRpcmVjdGlvbl0gLSBoZWFkZXJTaXplIC0gZm9vdGVyU2l6ZTtcbiAgICBpZiAoc2l6ZSlcbiAgICAgICAgdHJhbnNmb3JtID0gVHJhbnNmb3JtLm1vdmVUaGVuKFtcbiAgICAgICAgICAgIC1zaXplWzBdICogb3JpZ2luWzBdLFxuICAgICAgICAgICAgLXNpemVbMV0gKiBvcmlnaW5bMV0sXG4gICAgICAgICAgICAwXG4gICAgICAgIF0sIHRyYW5zZm9ybSk7XG4gICAgdmFyIHJlc3VsdCA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzaXplOiBfZmluYWxTaXplLmNhbGwodGhpcywgaGVhZGVyU2l6ZSwgc2l6ZSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmhlYWRlci5yZW5kZXIoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IF9vdXRwdXRUcmFuc2Zvcm0uY2FsbCh0aGlzLCBoZWFkZXJTaXplKSxcbiAgICAgICAgICAgICAgICBzaXplOiBfZmluYWxTaXplLmNhbGwodGhpcywgY29udGVudFNpemUsIHNpemUpLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5jb250ZW50LnJlbmRlcigpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogX291dHB1dFRyYW5zZm9ybS5jYWxsKHRoaXMsIGhlYWRlclNpemUgKyBjb250ZW50U2l6ZSksXG4gICAgICAgICAgICAgICAgc2l6ZTogX2ZpbmFsU2l6ZS5jYWxsKHRoaXMsIGZvb3RlclNpemUsIHNpemUpLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5mb290ZXIucmVuZGVyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgdGFyZ2V0OiByZXN1bHRcbiAgICB9O1xufTtcbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyRm9vdGVyTGF5b3V0OyIsInZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBNb2RpZmllciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL01vZGlmaWVyJyk7XG52YXIgUmVuZGVyTm9kZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1JlbmRlck5vZGUnKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGVUcmFuc2Zvcm0nKTtcbmZ1bmN0aW9uIExpZ2h0Ym94KG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKExpZ2h0Ym94LkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuX3Nob3dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm5vZGVzID0gW107XG4gICAgdGhpcy50cmFuc2Zvcm1zID0gW107XG4gICAgdGhpcy5zdGF0ZXMgPSBbXTtcbn1cbkxpZ2h0Ym94LkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBpblRyYW5zZm9ybTogVHJhbnNmb3JtLnNjYWxlKDAuMDAxLCAwLjAwMSwgMC4wMDEpLFxuICAgIGluT3BhY2l0eTogMCxcbiAgICBpbk9yaWdpbjogW1xuICAgICAgICAwLjUsXG4gICAgICAgIDAuNVxuICAgIF0sXG4gICAgb3V0VHJhbnNmb3JtOiBUcmFuc2Zvcm0uc2NhbGUoMC4wMDEsIDAuMDAxLCAwLjAwMSksXG4gICAgb3V0T3BhY2l0eTogMCxcbiAgICBvdXRPcmlnaW46IFtcbiAgICAgICAgMC41LFxuICAgICAgICAwLjVcbiAgICBdLFxuICAgIHNob3dUcmFuc2Zvcm06IFRyYW5zZm9ybS5pZGVudGl0eSxcbiAgICBzaG93T3BhY2l0eTogMSxcbiAgICBzaG93T3JpZ2luOiBbXG4gICAgICAgIDAuNSxcbiAgICAgICAgMC41XG4gICAgXSxcbiAgICBpblRyYW5zaXRpb246IHRydWUsXG4gICAgb3V0VHJhbnNpdGlvbjogdHJ1ZSxcbiAgICBvdmVybGFwOiBmYWxzZVxufTtcbkxpZ2h0Ym94LnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuTGlnaHRib3gucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiBzaG93KHJlbmRlcmFibGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFyZW5kZXJhYmxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGUoY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGNhbGxiYWNrID0gdHJhbnNpdGlvbjtcbiAgICAgICAgdHJhbnNpdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3Nob3dpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGFwKVxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlkZSh0aGlzLnNob3cuYmluZCh0aGlzLCByZW5kZXJhYmxlLCB0cmFuc2l0aW9uLCBjYWxsYmFjaykpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3Nob3dpbmcgPSB0cnVlO1xuICAgIHZhciBzdGF0ZUl0ZW0gPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IG5ldyBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybSh0aGlzLm9wdGlvbnMuaW5UcmFuc2Zvcm0pLFxuICAgICAgICAgICAgb3JpZ2luOiBuZXcgVHJhbnNpdGlvbmFibGUodGhpcy5vcHRpb25zLmluT3JpZ2luKSxcbiAgICAgICAgICAgIG9wYWNpdHk6IG5ldyBUcmFuc2l0aW9uYWJsZSh0aGlzLm9wdGlvbnMuaW5PcGFjaXR5KVxuICAgICAgICB9O1xuICAgIHZhciB0cmFuc2Zvcm0gPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBzdGF0ZUl0ZW0udHJhbnNmb3JtLFxuICAgICAgICAgICAgb3BhY2l0eTogc3RhdGVJdGVtLm9wYWNpdHksXG4gICAgICAgICAgICBvcmlnaW46IHN0YXRlSXRlbS5vcmlnaW5cbiAgICAgICAgfSk7XG4gICAgdmFyIG5vZGUgPSBuZXcgUmVuZGVyTm9kZSgpO1xuICAgIG5vZGUuYWRkKHRyYW5zZm9ybSkuYWRkKHJlbmRlcmFibGUpO1xuICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcbiAgICB0aGlzLnN0YXRlcy5wdXNoKHN0YXRlSXRlbSk7XG4gICAgdGhpcy50cmFuc2Zvcm1zLnB1c2godHJhbnNmb3JtKTtcbiAgICB2YXIgX2NiID0gY2FsbGJhY2sgPyBVdGlsaXR5LmFmdGVyKDMsIGNhbGxiYWNrKSA6IHVuZGVmaW5lZDtcbiAgICBpZiAoIXRyYW5zaXRpb24pXG4gICAgICAgIHRyYW5zaXRpb24gPSB0aGlzLm9wdGlvbnMuaW5UcmFuc2l0aW9uO1xuICAgIHN0YXRlSXRlbS50cmFuc2Zvcm0uc2V0KHRoaXMub3B0aW9ucy5zaG93VHJhbnNmb3JtLCB0cmFuc2l0aW9uLCBfY2IpO1xuICAgIHN0YXRlSXRlbS5vcGFjaXR5LnNldCh0aGlzLm9wdGlvbnMuc2hvd09wYWNpdHksIHRyYW5zaXRpb24sIF9jYik7XG4gICAgc3RhdGVJdGVtLm9yaWdpbi5zZXQodGhpcy5vcHRpb25zLnNob3dPcmlnaW4sIHRyYW5zaXRpb24sIF9jYik7XG59O1xuTGlnaHRib3gucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiBoaWRlKHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCF0aGlzLl9zaG93aW5nKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fc2hvd2luZyA9IGZhbHNlO1xuICAgIGlmICh0cmFuc2l0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgY2FsbGJhY2sgPSB0cmFuc2l0aW9uO1xuICAgICAgICB0cmFuc2l0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB2YXIgbm9kZSA9IHRoaXMubm9kZXNbdGhpcy5ub2Rlcy5sZW5ndGggLSAxXTtcbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1zW3RoaXMudHJhbnNmb3Jtcy5sZW5ndGggLSAxXTtcbiAgICB2YXIgc3RhdGVJdGVtID0gdGhpcy5zdGF0ZXNbdGhpcy5zdGF0ZXMubGVuZ3RoIC0gMV07XG4gICAgdmFyIF9jYiA9IFV0aWxpdHkuYWZ0ZXIoMywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ub2Rlcy5zcGxpY2UodGhpcy5ub2Rlcy5pbmRleE9mKG5vZGUpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVzLnNwbGljZSh0aGlzLnN0YXRlcy5pbmRleE9mKHN0YXRlSXRlbSksIDEpO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1zLnNwbGljZSh0aGlzLnRyYW5zZm9ybXMuaW5kZXhPZih0cmFuc2Zvcm0pLCAxKTtcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIGlmICghdHJhbnNpdGlvbilcbiAgICAgICAgdHJhbnNpdGlvbiA9IHRoaXMub3B0aW9ucy5vdXRUcmFuc2l0aW9uO1xuICAgIHN0YXRlSXRlbS50cmFuc2Zvcm0uc2V0KHRoaXMub3B0aW9ucy5vdXRUcmFuc2Zvcm0sIHRyYW5zaXRpb24sIF9jYik7XG4gICAgc3RhdGVJdGVtLm9wYWNpdHkuc2V0KHRoaXMub3B0aW9ucy5vdXRPcGFjaXR5LCB0cmFuc2l0aW9uLCBfY2IpO1xuICAgIHN0YXRlSXRlbS5vcmlnaW4uc2V0KHRoaXMub3B0aW9ucy5vdXRPcmlnaW4sIHRyYW5zaXRpb24sIF9jYik7XG59O1xuTGlnaHRib3gucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHRoaXMubm9kZXNbaV0ucmVuZGVyKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gTGlnaHRib3g7IiwidmFyIE1vZGlmaWVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvTW9kaWZpZXInKTtcbnZhciBSZW5kZXJOb2RlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvUmVuZGVyTm9kZScpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFRyYW5zaXRpb25hYmxlID0gcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlJyk7XG52YXIgVmlldyA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1ZpZXcnKTtcbmZ1bmN0aW9uIFJlbmRlckNvbnRyb2xsZXIob3B0aW9ucykge1xuICAgIFZpZXcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLl9zaG93aW5nID0gLTE7XG4gICAgdGhpcy5fb3V0Z29pbmdSZW5kZXJhYmxlcyA9IFtdO1xuICAgIHRoaXMuX25leHRSZW5kZXJhYmxlID0gbnVsbDtcbiAgICB0aGlzLl9yZW5kZXJhYmxlcyA9IFtdO1xuICAgIHRoaXMuX25vZGVzID0gW107XG4gICAgdGhpcy5fbW9kaWZpZXJzID0gW107XG4gICAgdGhpcy5fc3RhdGVzID0gW107XG4gICAgdGhpcy5pblRyYW5zZm9ybU1hcCA9IFJlbmRlckNvbnRyb2xsZXIuRGVmYXVsdE1hcC50cmFuc2Zvcm07XG4gICAgdGhpcy5pbk9wYWNpdHlNYXAgPSBSZW5kZXJDb250cm9sbGVyLkRlZmF1bHRNYXAub3BhY2l0eTtcbiAgICB0aGlzLmluT3JpZ2luTWFwID0gUmVuZGVyQ29udHJvbGxlci5EZWZhdWx0TWFwLm9yaWdpbjtcbiAgICB0aGlzLm91dFRyYW5zZm9ybU1hcCA9IFJlbmRlckNvbnRyb2xsZXIuRGVmYXVsdE1hcC50cmFuc2Zvcm07XG4gICAgdGhpcy5vdXRPcGFjaXR5TWFwID0gUmVuZGVyQ29udHJvbGxlci5EZWZhdWx0TWFwLm9wYWNpdHk7XG4gICAgdGhpcy5vdXRPcmlnaW5NYXAgPSBSZW5kZXJDb250cm9sbGVyLkRlZmF1bHRNYXAub3JpZ2luO1xuICAgIHRoaXMuX291dHB1dCA9IFtdO1xufVxuUmVuZGVyQ29udHJvbGxlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFZpZXcucHJvdG90eXBlKTtcblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVuZGVyQ29udHJvbGxlcjtcblJlbmRlckNvbnRyb2xsZXIuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGluVHJhbnNpdGlvbjogdHJ1ZSxcbiAgICBvdXRUcmFuc2l0aW9uOiB0cnVlLFxuICAgIG92ZXJsYXA6IHRydWVcbn07XG5SZW5kZXJDb250cm9sbGVyLkRlZmF1bHRNYXAgPSB7XG4gICAgdHJhbnNmb3JtOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBUcmFuc2Zvcm0uaWRlbnRpdHk7XG4gICAgfSxcbiAgICBvcGFjaXR5OiBmdW5jdGlvbiAocHJvZ3Jlc3MpIHtcbiAgICAgICAgcmV0dXJuIHByb2dyZXNzO1xuICAgIH0sXG4gICAgb3JpZ2luOiBudWxsXG59O1xuZnVuY3Rpb24gX21hcHBlZFN0YXRlKG1hcCwgc3RhdGUpIHtcbiAgICByZXR1cm4gbWFwKHN0YXRlLmdldCgpKTtcbn1cblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlLmluVHJhbnNmb3JtRnJvbSA9IGZ1bmN0aW9uIGluVHJhbnNmb3JtRnJvbSh0cmFuc2Zvcm0pIHtcbiAgICBpZiAodHJhbnNmb3JtIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuaW5UcmFuc2Zvcm1NYXAgPSB0cmFuc2Zvcm07XG4gICAgZWxzZSBpZiAodHJhbnNmb3JtICYmIHRyYW5zZm9ybS5nZXQpXG4gICAgICAgIHRoaXMuaW5UcmFuc2Zvcm1NYXAgPSB0cmFuc2Zvcm0uZ2V0LmJpbmQodHJhbnNmb3JtKTtcbiAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW5UcmFuc2Zvcm1Gcm9tIHRha2VzIG9ubHkgZnVuY3Rpb24gb3IgZ2V0dGVyIG9iamVjdCcpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlLmluT3BhY2l0eUZyb20gPSBmdW5jdGlvbiBpbk9wYWNpdHlGcm9tKG9wYWNpdHkpIHtcbiAgICBpZiAob3BhY2l0eSBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICB0aGlzLmluT3BhY2l0eU1hcCA9IG9wYWNpdHk7XG4gICAgZWxzZSBpZiAob3BhY2l0eSAmJiBvcGFjaXR5LmdldClcbiAgICAgICAgdGhpcy5pbk9wYWNpdHlNYXAgPSBvcGFjaXR5LmdldC5iaW5kKG9wYWNpdHkpO1xuICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbk9wYWNpdHlGcm9tIHRha2VzIG9ubHkgZnVuY3Rpb24gb3IgZ2V0dGVyIG9iamVjdCcpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlLmluT3JpZ2luRnJvbSA9IGZ1bmN0aW9uIGluT3JpZ2luRnJvbShvcmlnaW4pIHtcbiAgICBpZiAob3JpZ2luIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMuaW5PcmlnaW5NYXAgPSBvcmlnaW47XG4gICAgZWxzZSBpZiAob3JpZ2luICYmIG9yaWdpbi5nZXQpXG4gICAgICAgIHRoaXMuaW5PcmlnaW5NYXAgPSBvcmlnaW4uZ2V0LmJpbmQob3JpZ2luKTtcbiAgICBlbHNlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW5PcmlnaW5Gcm9tIHRha2VzIG9ubHkgZnVuY3Rpb24gb3IgZ2V0dGVyIG9iamVjdCcpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlLm91dFRyYW5zZm9ybUZyb20gPSBmdW5jdGlvbiBvdXRUcmFuc2Zvcm1Gcm9tKHRyYW5zZm9ybSkge1xuICAgIGlmICh0cmFuc2Zvcm0gaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5vdXRUcmFuc2Zvcm1NYXAgPSB0cmFuc2Zvcm07XG4gICAgZWxzZSBpZiAodHJhbnNmb3JtICYmIHRyYW5zZm9ybS5nZXQpXG4gICAgICAgIHRoaXMub3V0VHJhbnNmb3JtTWFwID0gdHJhbnNmb3JtLmdldC5iaW5kKHRyYW5zZm9ybSk7XG4gICAgZWxzZVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ291dFRyYW5zZm9ybUZyb20gdGFrZXMgb25seSBmdW5jdGlvbiBvciBnZXR0ZXIgb2JqZWN0Jyk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuUmVuZGVyQ29udHJvbGxlci5wcm90b3R5cGUub3V0T3BhY2l0eUZyb20gPSBmdW5jdGlvbiBvdXRPcGFjaXR5RnJvbShvcGFjaXR5KSB7XG4gICAgaWYgKG9wYWNpdHkgaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5vdXRPcGFjaXR5TWFwID0gb3BhY2l0eTtcbiAgICBlbHNlIGlmIChvcGFjaXR5ICYmIG9wYWNpdHkuZ2V0KVxuICAgICAgICB0aGlzLm91dE9wYWNpdHlNYXAgPSBvcGFjaXR5LmdldC5iaW5kKG9wYWNpdHkpO1xuICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvdXRPcGFjaXR5RnJvbSB0YWtlcyBvbmx5IGZ1bmN0aW9uIG9yIGdldHRlciBvYmplY3QnKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5SZW5kZXJDb250cm9sbGVyLnByb3RvdHlwZS5vdXRPcmlnaW5Gcm9tID0gZnVuY3Rpb24gb3V0T3JpZ2luRnJvbShvcmlnaW4pIHtcbiAgICBpZiAob3JpZ2luIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgIHRoaXMub3V0T3JpZ2luTWFwID0gb3JpZ2luO1xuICAgIGVsc2UgaWYgKG9yaWdpbiAmJiBvcmlnaW4uZ2V0KVxuICAgICAgICB0aGlzLm91dE9yaWdpbk1hcCA9IG9yaWdpbi5nZXQuYmluZChvcmlnaW4pO1xuICAgIGVsc2VcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdvdXRPcmlnaW5Gcm9tIHRha2VzIG9ubHkgZnVuY3Rpb24gb3IgZ2V0dGVyIG9iamVjdCcpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbiBzaG93KHJlbmRlcmFibGUsIHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFyZW5kZXJhYmxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZGUoY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAodHJhbnNpdGlvbiBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGNhbGxiYWNrID0gdHJhbnNpdGlvbjtcbiAgICAgICAgdHJhbnNpdGlvbiA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zaG93aW5nID49IDApIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5vdmVybGFwKVxuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuX25leHRSZW5kZXJhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dFJlbmRlcmFibGUgPSByZW5kZXJhYmxlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0UmVuZGVyYWJsZSA9IHJlbmRlcmFibGU7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX25leHRSZW5kZXJhYmxlID09PSByZW5kZXJhYmxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93KHRoaXMuX25leHRSZW5kZXJhYmxlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25leHRSZW5kZXJhYmxlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHN0YXRlID0gbnVsbDtcbiAgICB2YXIgcmVuZGVyYWJsZUluZGV4ID0gdGhpcy5fcmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKTtcbiAgICBpZiAocmVuZGVyYWJsZUluZGV4ID49IDApIHtcbiAgICAgICAgdGhpcy5fc2hvd2luZyA9IHJlbmRlcmFibGVJbmRleDtcbiAgICAgICAgc3RhdGUgPSB0aGlzLl9zdGF0ZXNbcmVuZGVyYWJsZUluZGV4XTtcbiAgICAgICAgc3RhdGUuaGFsdCgpO1xuICAgICAgICB2YXIgb3V0Z29pbmdJbmRleCA9IHRoaXMuX291dGdvaW5nUmVuZGVyYWJsZXMuaW5kZXhPZihyZW5kZXJhYmxlKTtcbiAgICAgICAgaWYgKG91dGdvaW5nSW5kZXggPj0gMClcbiAgICAgICAgICAgIHRoaXMuX291dGdvaW5nUmVuZGVyYWJsZXMuc3BsaWNlKG91dGdvaW5nSW5kZXgsIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlID0gbmV3IFRyYW5zaXRpb25hYmxlKDApO1xuICAgICAgICB2YXIgbW9kaWZpZXIgPSBuZXcgTW9kaWZpZXIoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdGhpcy5pblRyYW5zZm9ybU1hcCA/IF9tYXBwZWRTdGF0ZS5iaW5kKHRoaXMsIHRoaXMuaW5UcmFuc2Zvcm1NYXAsIHN0YXRlKSA6IG51bGwsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogdGhpcy5pbk9wYWNpdHlNYXAgPyBfbWFwcGVkU3RhdGUuYmluZCh0aGlzLCB0aGlzLmluT3BhY2l0eU1hcCwgc3RhdGUpIDogbnVsbCxcbiAgICAgICAgICAgICAgICBvcmlnaW46IHRoaXMuaW5PcmlnaW5NYXAgPyBfbWFwcGVkU3RhdGUuYmluZCh0aGlzLCB0aGlzLmluT3JpZ2luTWFwLCBzdGF0ZSkgOiBudWxsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgUmVuZGVyTm9kZSgpO1xuICAgICAgICBub2RlLmFkZChtb2RpZmllcikuYWRkKHJlbmRlcmFibGUpO1xuICAgICAgICB0aGlzLl9zaG93aW5nID0gdGhpcy5fbm9kZXMubGVuZ3RoO1xuICAgICAgICB0aGlzLl9ub2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICB0aGlzLl9tb2RpZmllcnMucHVzaChtb2RpZmllcik7XG4gICAgICAgIHRoaXMuX3N0YXRlcy5wdXNoKHN0YXRlKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyYWJsZXMucHVzaChyZW5kZXJhYmxlKTtcbiAgICB9XG4gICAgaWYgKCF0cmFuc2l0aW9uKVxuICAgICAgICB0cmFuc2l0aW9uID0gdGhpcy5vcHRpb25zLmluVHJhbnNpdGlvbjtcbiAgICBzdGF0ZS5zZXQoMSwgdHJhbnNpdGlvbiwgY2FsbGJhY2spO1xufTtcblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiBoaWRlKHRyYW5zaXRpb24sIGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMuX3Nob3dpbmcgPCAwKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGluZGV4ID0gdGhpcy5fc2hvd2luZztcbiAgICB0aGlzLl9zaG93aW5nID0gLTE7XG4gICAgaWYgKHRyYW5zaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICBjYWxsYmFjayA9IHRyYW5zaXRpb247XG4gICAgICAgIHRyYW5zaXRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciBub2RlID0gdGhpcy5fbm9kZXNbaW5kZXhdO1xuICAgIHZhciBtb2RpZmllciA9IHRoaXMuX21vZGlmaWVyc1tpbmRleF07XG4gICAgdmFyIHN0YXRlID0gdGhpcy5fc3RhdGVzW2luZGV4XTtcbiAgICB2YXIgcmVuZGVyYWJsZSA9IHRoaXMuX3JlbmRlcmFibGVzW2luZGV4XTtcbiAgICBtb2RpZmllci50cmFuc2Zvcm1Gcm9tKHRoaXMub3V0VHJhbnNmb3JtTWFwID8gX21hcHBlZFN0YXRlLmJpbmQodGhpcywgdGhpcy5vdXRUcmFuc2Zvcm1NYXAsIHN0YXRlKSA6IG51bGwpO1xuICAgIG1vZGlmaWVyLm9wYWNpdHlGcm9tKHRoaXMub3V0T3BhY2l0eU1hcCA/IF9tYXBwZWRTdGF0ZS5iaW5kKHRoaXMsIHRoaXMub3V0T3BhY2l0eU1hcCwgc3RhdGUpIDogbnVsbCk7XG4gICAgbW9kaWZpZXIub3JpZ2luRnJvbSh0aGlzLm91dE9yaWdpbk1hcCA/IF9tYXBwZWRTdGF0ZS5iaW5kKHRoaXMsIHRoaXMub3V0T3JpZ2luTWFwLCBzdGF0ZSkgOiBudWxsKTtcbiAgICBpZiAodGhpcy5fb3V0Z29pbmdSZW5kZXJhYmxlcy5pbmRleE9mKHJlbmRlcmFibGUpIDwgMClcbiAgICAgICAgdGhpcy5fb3V0Z29pbmdSZW5kZXJhYmxlcy5wdXNoKHJlbmRlcmFibGUpO1xuICAgIGlmICghdHJhbnNpdGlvbilcbiAgICAgICAgdHJhbnNpdGlvbiA9IHRoaXMub3B0aW9ucy5vdXRUcmFuc2l0aW9uO1xuICAgIHN0YXRlLmhhbHQoKTtcbiAgICBzdGF0ZS5zZXQoMCwgdHJhbnNpdGlvbiwgZnVuY3Rpb24gKG5vZGUsIG1vZGlmaWVyLCBzdGF0ZSwgcmVuZGVyYWJsZSkge1xuICAgICAgICBpZiAodGhpcy5fb3V0Z29pbmdSZW5kZXJhYmxlcy5pbmRleE9mKHJlbmRlcmFibGUpID49IDApIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX25vZGVzLmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgICB0aGlzLl9ub2Rlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGhpcy5fbW9kaWZpZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmFibGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLl9vdXRnb2luZ1JlbmRlcmFibGVzLnNwbGljZSh0aGlzLl9vdXRnb2luZ1JlbmRlcmFibGVzLmluZGV4T2YocmVuZGVyYWJsZSksIDEpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3Nob3dpbmcgPj0gaW5kZXgpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd2luZy0tO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgfS5iaW5kKHRoaXMsIG5vZGUsIG1vZGlmaWVyLCBzdGF0ZSwgcmVuZGVyYWJsZSkpO1xufTtcblJlbmRlckNvbnRyb2xsZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5fb3V0cHV0O1xuICAgIGlmIChyZXN1bHQubGVuZ3RoID4gdGhpcy5fbm9kZXMubGVuZ3RoKVxuICAgICAgICByZXN1bHQuc3BsaWNlKHRoaXMuX25vZGVzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9ub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRbaV0gPSB0aGlzLl9ub2Rlc1tpXS5yZW5kZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFJlbmRlckNvbnRyb2xsZXI7IiwidmFyIENvbnRhaW5lclN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvc3VyZmFjZXMvQ29udGFpbmVyU3VyZmFjZScpO1xudmFyIEV2ZW50SGFuZGxlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0V2ZW50SGFuZGxlcicpO1xudmFyIFNjcm9sbHZpZXcgPSByZXF1aXJlKCcuL1Njcm9sbHZpZXcnKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xuZnVuY3Rpb24gU2Nyb2xsQ29udGFpbmVyKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKFNjcm9sbENvbnRhaW5lci5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgaWYgKG9wdGlvbnMpXG4gICAgICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG5ldyBDb250YWluZXJTdXJmYWNlKHRoaXMub3B0aW9ucy5jb250YWluZXIpO1xuICAgIHRoaXMuc2Nyb2xsdmlldyA9IG5ldyBTY3JvbGx2aWV3KHRoaXMub3B0aW9ucy5zY3JvbGx2aWV3KTtcbiAgICB0aGlzLmNvbnRhaW5lci5hZGQodGhpcy5zY3JvbGx2aWV3KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuc2Nyb2xsdmlldyk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5zY3JvbGx2aWV3KTtcbiAgICB0aGlzLnNjcm9sbHZpZXcuc3Vic2NyaWJlKHRoaXMuY29udGFpbmVyKTtcbn1cblNjcm9sbENvbnRhaW5lci5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgY29udGFpbmVyOiB7IHByb3BlcnRpZXM6IHsgb3ZlcmZsb3c6ICdoaWRkZW4nIH0gfSxcbiAgICBzY3JvbGx2aWV3OiB7IGRpcmVjdGlvbjogVXRpbGl0eS5EaXJlY3Rpb24uWSB9XG59O1xuU2Nyb2xsQ29udGFpbmVyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX29wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG59O1xuU2Nyb2xsQ29udGFpbmVyLnByb3RvdHlwZS5zZXF1ZW5jZUZyb20gPSBmdW5jdGlvbiBzZXF1ZW5jZUZyb20oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsdmlldy5zZXF1ZW5jZUZyb20uYXBwbHkodGhpcy5zY3JvbGx2aWV3LCBhcmd1bWVudHMpO1xufTtcblNjcm9sbENvbnRhaW5lci5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmdldFNpemUuYXBwbHkodGhpcy5jb250YWluZXIsIGFyZ3VtZW50cyk7XG59O1xuU2Nyb2xsQ29udGFpbmVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLnJlbmRlci5hcHBseSh0aGlzLmNvbnRhaW5lciwgYXJndW1lbnRzKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbENvbnRhaW5lcjsiLCJ2YXIgRW50aXR5ID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRW50aXR5Jyk7XG52YXIgR3JvdXAgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9Hcm91cCcpO1xudmFyIE9wdGlvbnNNYW5hZ2VyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnZmFtb3VzL3V0aWxpdGllcy9VdGlsaXR5Jyk7XG52YXIgVmlld1NlcXVlbmNlID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVmlld1NlcXVlbmNlJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG5mdW5jdGlvbiBTY3JvbGxlcihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvbnN0cnVjdG9yLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5fb3B0aW9uc01hbmFnZXIgPSBuZXcgT3B0aW9uc01hbmFnZXIodGhpcy5vcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLl9ub2RlID0gbnVsbDtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IDA7XG4gICAgdGhpcy5fcG9zaXRpb25PZmZzZXQgPSAwO1xuICAgIHRoaXMuX3Bvc2l0aW9uR2V0dGVyID0gbnVsbDtcbiAgICB0aGlzLl9vdXRwdXRGdW5jdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fbWFzdGVyT3V0cHV0RnVuY3Rpb24gPSBudWxsO1xuICAgIHRoaXMub3V0cHV0RnJvbSgpO1xuICAgIHRoaXMuX29uRWRnZSA9IDA7XG4gICAgdGhpcy5ncm91cCA9IG5ldyBHcm91cCgpO1xuICAgIHRoaXMuZ3JvdXAuYWRkKHsgcmVuZGVyOiBfaW5uZXJSZW5kZXIuYmluZCh0aGlzKSB9KTtcbiAgICB0aGlzLl9lbnRpdHlJZCA9IEVudGl0eS5yZWdpc3Rlcih0aGlzKTtcbiAgICB0aGlzLl9zaXplID0gW1xuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHVuZGVmaW5lZFxuICAgIF07XG4gICAgdGhpcy5fY29udGV4dFNpemUgPSBbXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgdW5kZWZpbmVkXG4gICAgXTtcbiAgICB0aGlzLl9ldmVudElucHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuX2V2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIEV2ZW50SGFuZGxlci5zZXRJbnB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5fZXZlbnRPdXRwdXQpO1xufVxuU2Nyb2xsZXIuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIGRpcmVjdGlvbjogVXRpbGl0eS5EaXJlY3Rpb24uWSxcbiAgICBtYXJnaW46IDAsXG4gICAgY2xpcFNpemU6IHVuZGVmaW5lZCxcbiAgICBncm91cFNjcm9sbDogZmFsc2Vcbn07XG5mdW5jdGlvbiBfc2l6ZUZvckRpcihzaXplKSB7XG4gICAgaWYgKCFzaXplKVxuICAgICAgICBzaXplID0gdGhpcy5fY29udGV4dFNpemU7XG4gICAgdmFyIGRpbWVuc2lvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFV0aWxpdHkuRGlyZWN0aW9uLlggPyAwIDogMTtcbiAgICByZXR1cm4gc2l6ZVtkaW1lbnNpb25dID09PSB1bmRlZmluZWQgPyB0aGlzLl9jb250ZXh0U2l6ZVtkaW1lbnNpb25dIDogc2l6ZVtkaW1lbnNpb25dO1xufVxuZnVuY3Rpb24gX291dHB1dChub2RlLCBvZmZzZXQsIHRhcmdldCkge1xuICAgIHZhciBzaXplID0gbm9kZS5nZXRTaXplID8gbm9kZS5nZXRTaXplKCkgOiB0aGlzLl9jb250ZXh0U2l6ZTtcbiAgICB2YXIgdHJhbnNmb3JtID0gdGhpcy5fb3V0cHV0RnVuY3Rpb24ob2Zmc2V0KTtcbiAgICB0YXJnZXQucHVzaCh7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgICB0YXJnZXQ6IG5vZGUucmVuZGVyKClcbiAgICB9KTtcbiAgICByZXR1cm4gX3NpemVGb3JEaXIuY2FsbCh0aGlzLCBzaXplKTtcbn1cbmZ1bmN0aW9uIF9nZXRDbGlwU2l6ZSgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmNsaXBTaXplKVxuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNsaXBTaXplO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIF9zaXplRm9yRGlyLmNhbGwodGhpcywgdGhpcy5fY29udGV4dFNpemUpO1xufVxuU2Nyb2xsZXIucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZ3JvdXBTY3JvbGwpIHtcbiAgICAgICAgdGhpcy5ncm91cC5waXBlKHRoaXMuX2V2ZW50T3V0cHV0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmdyb3VwLnVucGlwZSh0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgfVxufTtcblNjcm9sbGVyLnByb3RvdHlwZS5vbkVkZ2UgPSBmdW5jdGlvbiBvbkVkZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29uRWRnZTtcbn07XG5TY3JvbGxlci5wcm90b3R5cGUub3V0cHV0RnJvbSA9IGZ1bmN0aW9uIG91dHB1dEZyb20oZm4sIG1hc3RlckZuKSB7XG4gICAgaWYgKCFmbikge1xuICAgICAgICBmbiA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uID09PSBVdGlsaXR5LkRpcmVjdGlvbi5YID8gVHJhbnNmb3JtLnRyYW5zbGF0ZShvZmZzZXQsIDApIDogVHJhbnNmb3JtLnRyYW5zbGF0ZSgwLCBvZmZzZXQpO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG4gICAgICAgIGlmICghbWFzdGVyRm4pXG4gICAgICAgICAgICBtYXN0ZXJGbiA9IGZuO1xuICAgIH1cbiAgICB0aGlzLl9vdXRwdXRGdW5jdGlvbiA9IGZuO1xuICAgIHRoaXMuX21hc3Rlck91dHB1dEZ1bmN0aW9uID0gbWFzdGVyRm4gPyBtYXN0ZXJGbiA6IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIFRyYW5zZm9ybS5pbnZlcnNlKGZuKC1vZmZzZXQpKTtcbiAgICB9O1xufTtcblNjcm9sbGVyLnByb3RvdHlwZS5wb3NpdGlvbkZyb20gPSBmdW5jdGlvbiBwb3NpdGlvbkZyb20ocG9zaXRpb24pIHtcbiAgICBpZiAocG9zaXRpb24gaW5zdGFuY2VvZiBGdW5jdGlvbilcbiAgICAgICAgdGhpcy5fcG9zaXRpb25HZXR0ZXIgPSBwb3NpdGlvbjtcbiAgICBlbHNlIGlmIChwb3NpdGlvbiAmJiBwb3NpdGlvbi5nZXQpXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uR2V0dGVyID0gcG9zaXRpb24uZ2V0LmJpbmQocG9zaXRpb24pO1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9wb3NpdGlvbkdldHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgfVxuICAgIGlmICh0aGlzLl9wb3NpdGlvbkdldHRlcilcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB0aGlzLl9wb3NpdGlvbkdldHRlci5jYWxsKHRoaXMpO1xufTtcblNjcm9sbGVyLnByb3RvdHlwZS5zZXF1ZW5jZUZyb20gPSBmdW5jdGlvbiBzZXF1ZW5jZUZyb20obm9kZSkge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIG5vZGUgPSBuZXcgVmlld1NlcXVlbmNlKHsgYXJyYXk6IG5vZGUgfSk7XG4gICAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gICAgdGhpcy5fcG9zaXRpb25PZmZzZXQgPSAwO1xufTtcblNjcm9sbGVyLnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gZ2V0U2l6ZShhY3R1YWwpIHtcbiAgICByZXR1cm4gYWN0dWFsID8gdGhpcy5fY29udGV4dFNpemUgOiB0aGlzLl9zaXplO1xufTtcblNjcm9sbGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgaWYgKCF0aGlzLl9ub2RlKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBpZiAodGhpcy5fcG9zaXRpb25HZXR0ZXIpXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5fcG9zaXRpb25HZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5fZW50aXR5SWQ7XG59O1xuU2Nyb2xsZXIucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdChjb250ZXh0KSB7XG4gICAgdmFyIHRyYW5zZm9ybSA9IGNvbnRleHQudHJhbnNmb3JtO1xuICAgIHZhciBvcGFjaXR5ID0gY29udGV4dC5vcGFjaXR5O1xuICAgIHZhciBvcmlnaW4gPSBjb250ZXh0Lm9yaWdpbjtcbiAgICB2YXIgc2l6ZSA9IGNvbnRleHQuc2l6ZTtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5jbGlwU2l6ZSAmJiAoc2l6ZVswXSAhPT0gdGhpcy5fY29udGV4dFNpemVbMF0gfHwgc2l6ZVsxXSAhPT0gdGhpcy5fY29udGV4dFNpemVbMV0pKSB7XG4gICAgICAgIHRoaXMuX29uRWRnZSA9IDA7XG4gICAgICAgIHRoaXMuX2NvbnRleHRTaXplWzBdID0gc2l6ZVswXTtcbiAgICAgICAgdGhpcy5fY29udGV4dFNpemVbMV0gPSBzaXplWzFdO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVXRpbGl0eS5EaXJlY3Rpb24uWCkge1xuICAgICAgICAgICAgdGhpcy5fc2l6ZVswXSA9IF9nZXRDbGlwU2l6ZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fc2l6ZVsxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NpemVbMF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLl9zaXplWzFdID0gX2dldENsaXBTaXplLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHNjcm9sbFRyYW5zZm9ybSA9IHRoaXMuX21hc3Rlck91dHB1dEZ1bmN0aW9uKC10aGlzLl9wb3NpdGlvbik7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0ubXVsdGlwbHkodHJhbnNmb3JtLCBzY3JvbGxUcmFuc2Zvcm0pLFxuICAgICAgICBzaXplOiBzaXplLFxuICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxuICAgICAgICBvcmlnaW46IG9yaWdpbixcbiAgICAgICAgdGFyZ2V0OiB0aGlzLmdyb3VwLnJlbmRlcigpXG4gICAgfTtcbn07XG5mdW5jdGlvbiBfbm9ybWFsaXplU3RhdGUoKSB7XG4gICAgdmFyIG5vZGVTaXplID0gX3NpemVGb3JEaXIuY2FsbCh0aGlzLCB0aGlzLl9ub2RlLmdldFNpemUoKSk7XG4gICAgdmFyIG5leHROb2RlID0gdGhpcy5fbm9kZSAmJiB0aGlzLl9ub2RlLmdldE5leHQgPyB0aGlzLl9ub2RlLmdldE5leHQoKSA6IG51bGw7XG4gICAgd2hpbGUgKG5leHROb2RlICYmIHRoaXMuX3Bvc2l0aW9uICsgdGhpcy5fcG9zaXRpb25PZmZzZXQgPj0gbm9kZVNpemUpIHtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25PZmZzZXQgLT0gbm9kZVNpemU7XG4gICAgICAgIHRoaXMuX25vZGUgPSBuZXh0Tm9kZTtcbiAgICAgICAgbm9kZVNpemUgPSBfc2l6ZUZvckRpci5jYWxsKHRoaXMsIHRoaXMuX25vZGUuZ2V0U2l6ZSgpKTtcbiAgICAgICAgbmV4dE5vZGUgPSB0aGlzLl9ub2RlICYmIHRoaXMuX25vZGUuZ2V0TmV4dCA/IHRoaXMuX25vZGUuZ2V0TmV4dCgpIDogbnVsbDtcbiAgICB9XG4gICAgdmFyIHByZXZOb2RlID0gdGhpcy5fbm9kZSAmJiB0aGlzLl9ub2RlLmdldFByZXZpb3VzID8gdGhpcy5fbm9kZS5nZXRQcmV2aW91cygpIDogbnVsbDtcbiAgICB3aGlsZSAocHJldk5vZGUgJiYgdGhpcy5fcG9zaXRpb24gKyB0aGlzLl9wb3NpdGlvbk9mZnNldCA8IDApIHtcbiAgICAgICAgdmFyIHByZXZOb2RlU2l6ZSA9IF9zaXplRm9yRGlyLmNhbGwodGhpcywgcHJldk5vZGUuZ2V0U2l6ZSgpKTtcbiAgICAgICAgdGhpcy5fcG9zaXRpb25PZmZzZXQgKz0gcHJldk5vZGVTaXplO1xuICAgICAgICB0aGlzLl9ub2RlID0gcHJldk5vZGU7XG4gICAgICAgIHByZXZOb2RlID0gdGhpcy5fbm9kZSAmJiB0aGlzLl9ub2RlLmdldFByZXZpb3VzID8gdGhpcy5fbm9kZS5nZXRQcmV2aW91cygpIDogbnVsbDtcbiAgICB9XG59XG5mdW5jdGlvbiBfaW5uZXJSZW5kZXIoKSB7XG4gICAgdmFyIHNpemUgPSBudWxsO1xuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuX3Bvc2l0aW9uO1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICB0aGlzLl9vbkVkZ2UgPSAwO1xuICAgIHZhciBvZmZzZXQgPSAtdGhpcy5fcG9zaXRpb25PZmZzZXQ7XG4gICAgdmFyIGNsaXBTaXplID0gX2dldENsaXBTaXplLmNhbGwodGhpcyk7XG4gICAgdmFyIGN1cnJOb2RlID0gdGhpcy5fbm9kZTtcbiAgICB3aGlsZSAoY3Vyck5vZGUgJiYgb2Zmc2V0IC0gcG9zaXRpb24gPCBjbGlwU2l6ZSArIHRoaXMub3B0aW9ucy5tYXJnaW4pIHtcbiAgICAgICAgb2Zmc2V0ICs9IF9vdXRwdXQuY2FsbCh0aGlzLCBjdXJyTm9kZSwgb2Zmc2V0LCByZXN1bHQpO1xuICAgICAgICBjdXJyTm9kZSA9IGN1cnJOb2RlLmdldE5leHQgPyBjdXJyTm9kZS5nZXROZXh0KCkgOiBudWxsO1xuICAgIH1cbiAgICB2YXIgc2l6ZU5vZGUgPSB0aGlzLl9ub2RlO1xuICAgIHZhciBub2Rlc1NpemUgPSBfc2l6ZUZvckRpci5jYWxsKHRoaXMsIHNpemVOb2RlLmdldFNpemUoKSk7XG4gICAgaWYgKG9mZnNldCA8IGNsaXBTaXplKSB7XG4gICAgICAgIHdoaWxlIChzaXplTm9kZSAmJiBub2Rlc1NpemUgPCBjbGlwU2l6ZSkge1xuICAgICAgICAgICAgc2l6ZU5vZGUgPSBzaXplTm9kZS5nZXRQcmV2aW91cygpO1xuICAgICAgICAgICAgaWYgKHNpemVOb2RlKVxuICAgICAgICAgICAgICAgIG5vZGVzU2l6ZSArPSBfc2l6ZUZvckRpci5jYWxsKHRoaXMsIHNpemVOb2RlLmdldFNpemUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgc2l6ZU5vZGUgPSB0aGlzLl9ub2RlO1xuICAgICAgICB3aGlsZSAoc2l6ZU5vZGUgJiYgbm9kZXNTaXplIDwgY2xpcFNpemUpIHtcbiAgICAgICAgICAgIHNpemVOb2RlID0gc2l6ZU5vZGUuZ2V0TmV4dCgpO1xuICAgICAgICAgICAgaWYgKHNpemVOb2RlKVxuICAgICAgICAgICAgICAgIG5vZGVzU2l6ZSArPSBfc2l6ZUZvckRpci5jYWxsKHRoaXMsIHNpemVOb2RlLmdldFNpemUoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGVkZ2VTaXplID0gbm9kZXNTaXplICE9PSB1bmRlZmluZWQgJiYgbm9kZXNTaXplIDwgY2xpcFNpemUgPyBub2Rlc1NpemUgOiBjbGlwU2l6ZTtcbiAgICBpZiAoIWN1cnJOb2RlICYmIG9mZnNldCAtIHBvc2l0aW9uIDw9IGVkZ2VTaXplKSB7XG4gICAgICAgIHRoaXMuX29uRWRnZSA9IDE7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2VkZ2VIaXQnLCB7IHBvc2l0aW9uOiBvZmZzZXQgLSBlZGdlU2l6ZSB9KTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9ub2RlLmdldFByZXZpb3VzKCkgJiYgcG9zaXRpb24gPD0gMCkge1xuICAgICAgICB0aGlzLl9vbkVkZ2UgPSAtMTtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnZWRnZUhpdCcsIHsgcG9zaXRpb246IDAgfSk7XG4gICAgfVxuICAgIGN1cnJOb2RlID0gdGhpcy5fbm9kZSAmJiB0aGlzLl9ub2RlLmdldFByZXZpb3VzID8gdGhpcy5fbm9kZS5nZXRQcmV2aW91cygpIDogbnVsbDtcbiAgICBvZmZzZXQgPSAtdGhpcy5fcG9zaXRpb25PZmZzZXQ7XG4gICAgaWYgKGN1cnJOb2RlKSB7XG4gICAgICAgIHNpemUgPSBjdXJyTm9kZS5nZXRTaXplID8gY3Vyck5vZGUuZ2V0U2l6ZSgpIDogdGhpcy5fY29udGV4dFNpemU7XG4gICAgICAgIG9mZnNldCAtPSBfc2l6ZUZvckRpci5jYWxsKHRoaXMsIHNpemUpO1xuICAgIH1cbiAgICB3aGlsZSAoY3Vyck5vZGUgJiYgb2Zmc2V0IC0gcG9zaXRpb24gPiAtKF9nZXRDbGlwU2l6ZS5jYWxsKHRoaXMpICsgdGhpcy5vcHRpb25zLm1hcmdpbikpIHtcbiAgICAgICAgX291dHB1dC5jYWxsKHRoaXMsIGN1cnJOb2RlLCBvZmZzZXQsIHJlc3VsdCk7XG4gICAgICAgIGN1cnJOb2RlID0gY3Vyck5vZGUuZ2V0UHJldmlvdXMgPyBjdXJyTm9kZS5nZXRQcmV2aW91cygpIDogbnVsbDtcbiAgICAgICAgaWYgKGN1cnJOb2RlKSB7XG4gICAgICAgICAgICBzaXplID0gY3Vyck5vZGUuZ2V0U2l6ZSA/IGN1cnJOb2RlLmdldFNpemUoKSA6IHRoaXMuX2NvbnRleHRTaXplO1xuICAgICAgICAgICAgb2Zmc2V0IC09IF9zaXplRm9yRGlyLmNhbGwodGhpcywgc2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX25vcm1hbGl6ZVN0YXRlLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsZXI7IiwidmFyIFBoeXNpY3NFbmdpbmUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9QaHlzaWNzRW5naW5lJyk7XG52YXIgUGFydGljbGUgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9ib2RpZXMvUGFydGljbGUnKTtcbnZhciBEcmFnID0gcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvZm9yY2VzL0RyYWcnKTtcbnZhciBTcHJpbmcgPSByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9mb3JjZXMvU3ByaW5nJyk7XG52YXIgRXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRIYW5kbGVyJyk7XG52YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xudmFyIFZpZXdTZXF1ZW5jZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1ZpZXdTZXF1ZW5jZScpO1xudmFyIFNjcm9sbGVyID0gcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL1Njcm9sbGVyJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eScpO1xudmFyIEdlbmVyaWNTeW5jID0gcmVxdWlyZSgnZmFtb3VzL2lucHV0cy9HZW5lcmljU3luYycpO1xudmFyIFNjcm9sbFN5bmMgPSByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL1Njcm9sbFN5bmMnKTtcbnZhciBUb3VjaFN5bmMgPSByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL1RvdWNoU3luYycpO1xuR2VuZXJpY1N5bmMucmVnaXN0ZXIoe1xuICAgIHNjcm9sbDogU2Nyb2xsU3luYyxcbiAgICB0b3VjaDogVG91Y2hTeW5jXG59KTtcbnZhciBUT0xFUkFOQ0UgPSAwLjU7XG52YXIgU3ByaW5nU3RhdGVzID0ge1xuICAgICAgICBOT05FOiAwLFxuICAgICAgICBFREdFOiAxLFxuICAgICAgICBQQUdFOiAyXG4gICAgfTtcbmZ1bmN0aW9uIFNjcm9sbHZpZXcob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoU2Nyb2xsdmlldy5ERUZBVUxUX09QVElPTlMpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyID0gbmV3IE9wdGlvbnNNYW5hZ2VyKHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5fbm9kZSA9IG51bGw7XG4gICAgdGhpcy5fcGh5c2ljc0VuZ2luZSA9IG5ldyBQaHlzaWNzRW5naW5lKCk7XG4gICAgdGhpcy5fcGFydGljbGUgPSBuZXcgUGFydGljbGUoKTtcbiAgICB0aGlzLl9waHlzaWNzRW5naW5lLmFkZEJvZHkodGhpcy5fcGFydGljbGUpO1xuICAgIHRoaXMuc3ByaW5nID0gbmV3IFNwcmluZyh7XG4gICAgICAgIGFuY2hvcjogW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwXG4gICAgICAgIF1cbiAgICB9KTtcbiAgICB0aGlzLmRyYWcgPSBuZXcgRHJhZyh7IGZvcmNlRnVuY3Rpb246IERyYWcuRk9SQ0VfRlVOQ1RJT05TLlFVQURSQVRJQyB9KTtcbiAgICB0aGlzLmZyaWN0aW9uID0gbmV3IERyYWcoeyBmb3JjZUZ1bmN0aW9uOiBEcmFnLkZPUkNFX0ZVTkNUSU9OUy5MSU5FQVIgfSk7XG4gICAgdGhpcy5zeW5jID0gbmV3IEdlbmVyaWNTeW5jKFtcbiAgICAgICAgJ3Njcm9sbCcsXG4gICAgICAgICd0b3VjaCdcbiAgICBdLCB7XG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5vcHRpb25zLmRpcmVjdGlvbixcbiAgICAgICAgcHJldmVudERlZmF1bHQ6IHRoaXMub3B0aW9ucy5wcmV2ZW50RGVmYXVsdFxuICAgIH0pO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQgPSBuZXcgRXZlbnRIYW5kbGVyKCk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5waXBlKHRoaXMuc3luYyk7XG4gICAgdGhpcy5zeW5jLnBpcGUodGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldElucHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudElucHV0KTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5fdG91Y2hDb3VudCA9IDA7XG4gICAgdGhpcy5fc3ByaW5nU3RhdGUgPSBTcHJpbmdTdGF0ZXMuTk9ORTtcbiAgICB0aGlzLl9vbkVkZ2UgPSAwO1xuICAgIHRoaXMuX3BhZ2VTcHJpbmdQb3NpdGlvbiA9IDA7XG4gICAgdGhpcy5fZWRnZVNwcmluZ1Bvc2l0aW9uID0gMDtcbiAgICB0aGlzLl90b3VjaFZlbG9jaXR5ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2Vhcmx5RW5kID0gZmFsc2U7XG4gICAgdGhpcy5fbmVlZHNQYWdpbmF0aW9uQ2hlY2sgPSBmYWxzZTtcbiAgICB0aGlzLl9zY3JvbGxlciA9IG5ldyBTY3JvbGxlcigpO1xuICAgIHRoaXMuX3Njcm9sbGVyLnBvc2l0aW9uRnJvbSh0aGlzLmdldFBvc2l0aW9uLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICBfYmluZEV2ZW50cy5jYWxsKHRoaXMpO1xufVxuU2Nyb2xsdmlldy5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGlyZWN0aW9uOiBVdGlsaXR5LkRpcmVjdGlvbi5ZLFxuICAgIHJhaWxzOiB0cnVlLFxuICAgIGZyaWN0aW9uOiAwLjAwMSxcbiAgICBkcmFnOiAwLjAwMDEsXG4gICAgZWRnZUdyaXA6IDAuNSxcbiAgICBlZGdlUGVyaW9kOiAzMDAsXG4gICAgZWRnZURhbXA6IDEsXG4gICAgbWFyZ2luOiAxMDAwLFxuICAgIHBhZ2luYXRlZDogZmFsc2UsXG4gICAgcGFnZVBlcmlvZDogNTAwLFxuICAgIHBhZ2VEYW1wOiAwLjgsXG4gICAgcGFnZVN0b3BTcGVlZDogMTAsXG4gICAgcGFnZVN3aXRjaFNwZWVkOiAwLjUsXG4gICAgc3BlZWRMaW1pdDogMTAsXG4gICAgZ3JvdXBTY3JvbGw6IGZhbHNlXG59O1xuZnVuY3Rpb24gX2hhbmRsZVN0YXJ0KGV2ZW50KSB7XG4gICAgdGhpcy5fdG91Y2hDb3VudCA9IGV2ZW50LmNvdW50O1xuICAgIGlmIChldmVudC5jb3VudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLl90b3VjaENvdW50ID0gMTtcbiAgICBfZGV0YWNoQWdlbnRzLmNhbGwodGhpcyk7XG4gICAgdGhpcy5zZXRWZWxvY2l0eSgwKTtcbiAgICB0aGlzLl90b3VjaFZlbG9jaXR5ID0gMDtcbiAgICB0aGlzLl9lYXJseUVuZCA9IGZhbHNlO1xufVxuZnVuY3Rpb24gX2hhbmRsZU1vdmUoZXZlbnQpIHtcbiAgICB2YXIgdmVsb2NpdHkgPSAtZXZlbnQudmVsb2NpdHk7XG4gICAgdmFyIGRlbHRhID0gLWV2ZW50LmRlbHRhO1xuICAgIGlmICh0aGlzLl9vbkVkZ2UgJiYgZXZlbnQuc2xpcCkge1xuICAgICAgICBpZiAodmVsb2NpdHkgPCAwICYmIHRoaXMuX29uRWRnZSA8IDAgfHwgdmVsb2NpdHkgPiAwICYmIHRoaXMuX29uRWRnZSA+IDApIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWFybHlFbmQpIHtcbiAgICAgICAgICAgICAgICBfaGFuZGxlRW5kLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vhcmx5RW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9lYXJseUVuZCAmJiBNYXRoLmFicyh2ZWxvY2l0eSkgPiBNYXRoLmFicyh0aGlzLmdldFZlbG9jaXR5KCkpKSB7XG4gICAgICAgICAgICBfaGFuZGxlU3RhcnQuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX2Vhcmx5RW5kKVxuICAgICAgICByZXR1cm47XG4gICAgdGhpcy5fdG91Y2hWZWxvY2l0eSA9IHZlbG9jaXR5O1xuICAgIGlmIChldmVudC5zbGlwKVxuICAgICAgICB0aGlzLnNldFZlbG9jaXR5KHZlbG9jaXR5KTtcbiAgICBlbHNlXG4gICAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5nZXRQb3NpdGlvbigpICsgZGVsdGEpO1xufVxuZnVuY3Rpb24gX2hhbmRsZUVuZChldmVudCkge1xuICAgIHRoaXMuX3RvdWNoQ291bnQgPSBldmVudC5jb3VudCB8fCAwO1xuICAgIGlmICghdGhpcy5fdG91Y2hDb3VudCkge1xuICAgICAgICBfZGV0YWNoQWdlbnRzLmNhbGwodGhpcyk7XG4gICAgICAgIGlmICh0aGlzLl9vbkVkZ2UpXG4gICAgICAgICAgICBfc2V0U3ByaW5nLmNhbGwodGhpcywgdGhpcy5fZWRnZVNwcmluZ1Bvc2l0aW9uLCBTcHJpbmdTdGF0ZXMuRURHRSk7XG4gICAgICAgIF9hdHRhY2hBZ2VudHMuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIHZlbG9jaXR5ID0gLWV2ZW50LnZlbG9jaXR5O1xuICAgICAgICB2YXIgc3BlZWRMaW1pdCA9IHRoaXMub3B0aW9ucy5zcGVlZExpbWl0O1xuICAgICAgICBpZiAoZXZlbnQuc2xpcClcbiAgICAgICAgICAgIHNwZWVkTGltaXQgKj0gdGhpcy5vcHRpb25zLmVkZ2VHcmlwO1xuICAgICAgICBpZiAodmVsb2NpdHkgPCAtc3BlZWRMaW1pdClcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gLXNwZWVkTGltaXQ7XG4gICAgICAgIGVsc2UgaWYgKHZlbG9jaXR5ID4gc3BlZWRMaW1pdClcbiAgICAgICAgICAgIHZlbG9jaXR5ID0gc3BlZWRMaW1pdDtcbiAgICAgICAgdGhpcy5zZXRWZWxvY2l0eSh2ZWxvY2l0eSk7XG4gICAgICAgIHRoaXMuX3RvdWNoVmVsb2NpdHkgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX25lZWRzUGFnaW5hdGlvbkNoZWNrID0gdHJ1ZTtcbiAgICB9XG59XG5mdW5jdGlvbiBfYmluZEV2ZW50cygpIHtcbiAgICB0aGlzLl9ldmVudElucHV0LmJpbmRUaGlzKHRoaXMpO1xuICAgIHRoaXMuX2V2ZW50SW5wdXQub24oJ3N0YXJ0JywgX2hhbmRsZVN0YXJ0KTtcbiAgICB0aGlzLl9ldmVudElucHV0Lm9uKCd1cGRhdGUnLCBfaGFuZGxlTW92ZSk7XG4gICAgdGhpcy5fZXZlbnRJbnB1dC5vbignZW5kJywgX2hhbmRsZUVuZCk7XG4gICAgdGhpcy5fc2Nyb2xsZXIub24oJ2VkZ2VIaXQnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLl9lZGdlU3ByaW5nUG9zaXRpb24gPSBkYXRhLnBvc2l0aW9uO1xuICAgIH0uYmluZCh0aGlzKSk7XG59XG5mdW5jdGlvbiBfYXR0YWNoQWdlbnRzKCkge1xuICAgIGlmICh0aGlzLl9zcHJpbmdTdGF0ZSlcbiAgICAgICAgdGhpcy5fcGh5c2ljc0VuZ2luZS5hdHRhY2goW3RoaXMuc3ByaW5nXSwgdGhpcy5fcGFydGljbGUpO1xuICAgIGVsc2VcbiAgICAgICAgdGhpcy5fcGh5c2ljc0VuZ2luZS5hdHRhY2goW1xuICAgICAgICAgICAgdGhpcy5kcmFnLFxuICAgICAgICAgICAgdGhpcy5mcmljdGlvblxuICAgICAgICBdLCB0aGlzLl9wYXJ0aWNsZSk7XG59XG5mdW5jdGlvbiBfZGV0YWNoQWdlbnRzKCkge1xuICAgIHRoaXMuX3NwcmluZ1N0YXRlID0gU3ByaW5nU3RhdGVzLk5PTkU7XG4gICAgdGhpcy5fcGh5c2ljc0VuZ2luZS5kZXRhY2hBbGwoKTtcbn1cbmZ1bmN0aW9uIF9ub2RlU2l6ZUZvckRpcmVjdGlvbihub2RlKSB7XG4gICAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb247XG4gICAgdmFyIG5vZGVTaXplID0gKG5vZGUuZ2V0U2l6ZSgpIHx8IHRoaXMuX3Njcm9sbGVyLmdldFNpemUoKSlbZGlyZWN0aW9uXTtcbiAgICBpZiAoIW5vZGVTaXplKVxuICAgICAgICBub2RlU2l6ZSA9IHRoaXMuX3Njcm9sbGVyLmdldFNpemUoKVtkaXJlY3Rpb25dO1xuICAgIHJldHVybiBub2RlU2l6ZTtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVFZGdlKGVkZ2VEZXRlY3RlZCkge1xuICAgIGlmICghdGhpcy5fb25FZGdlICYmIGVkZ2VEZXRlY3RlZCkge1xuICAgICAgICB0aGlzLnN5bmMuc2V0T3B0aW9ucyh7IHNjYWxlOiB0aGlzLm9wdGlvbnMuZWRnZUdyaXAgfSk7XG4gICAgICAgIGlmICghdGhpcy5fdG91Y2hDb3VudCAmJiB0aGlzLl9zcHJpbmdTdGF0ZSAhPT0gU3ByaW5nU3RhdGVzLkVER0UpIHtcbiAgICAgICAgICAgIF9zZXRTcHJpbmcuY2FsbCh0aGlzLCB0aGlzLl9lZGdlU3ByaW5nUG9zaXRpb24sIFNwcmluZ1N0YXRlcy5FREdFKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fb25FZGdlICYmICFlZGdlRGV0ZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zeW5jLnNldE9wdGlvbnMoeyBzY2FsZTogMSB9KTtcbiAgICAgICAgaWYgKHRoaXMuX3NwcmluZ1N0YXRlICYmIE1hdGguYWJzKHRoaXMuZ2V0VmVsb2NpdHkoKSkgPCAwLjAwMSkge1xuICAgICAgICAgICAgX2RldGFjaEFnZW50cy5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgX2F0dGFjaEFnZW50cy5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX29uRWRnZSA9IGVkZ2VEZXRlY3RlZDtcbn1cbmZ1bmN0aW9uIF9oYW5kbGVQYWdpbmF0aW9uKCkge1xuICAgIGlmICghdGhpcy5fbmVlZHNQYWdpbmF0aW9uQ2hlY2spXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAodGhpcy5fdG91Y2hDb3VudClcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICh0aGlzLl9zcHJpbmdTdGF0ZSA9PT0gU3ByaW5nU3RhdGVzLkVER0UpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgdmVsb2NpdHkgPSB0aGlzLmdldFZlbG9jaXR5KCk7XG4gICAgaWYgKE1hdGguYWJzKHZlbG9jaXR5KSA+PSB0aGlzLm9wdGlvbnMucGFnZVN0b3BTcGVlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICB2YXIgdmVsb2NpdHlTd2l0Y2ggPSBNYXRoLmFicyh2ZWxvY2l0eSkgPiB0aGlzLm9wdGlvbnMucGFnZVN3aXRjaFNwZWVkO1xuICAgIHZhciBub2RlU2l6ZSA9IF9ub2RlU2l6ZUZvckRpcmVjdGlvbi5jYWxsKHRoaXMsIHRoaXMuX25vZGUpO1xuICAgIHZhciBwb3NpdGlvbk5leHQgPSBwb3NpdGlvbiA+IDAuNSAqIG5vZGVTaXplO1xuICAgIHZhciB2ZWxvY2l0eU5leHQgPSB2ZWxvY2l0eSA+IDA7XG4gICAgaWYgKHBvc2l0aW9uTmV4dCAmJiAhdmVsb2NpdHlTd2l0Y2ggfHwgdmVsb2NpdHlTd2l0Y2ggJiYgdmVsb2NpdHlOZXh0KVxuICAgICAgICB0aGlzLmdvVG9OZXh0UGFnZSgpO1xuICAgIGVsc2VcbiAgICAgICAgX3NldFNwcmluZy5jYWxsKHRoaXMsIDAsIFNwcmluZ1N0YXRlcy5QQUdFKTtcbiAgICB0aGlzLl9uZWVkc1BhZ2luYXRpb25DaGVjayA9IGZhbHNlO1xufVxuZnVuY3Rpb24gX3NldFNwcmluZyhwb3NpdGlvbiwgc3ByaW5nU3RhdGUpIHtcbiAgICB2YXIgc3ByaW5nT3B0aW9ucztcbiAgICBpZiAoc3ByaW5nU3RhdGUgPT09IFNwcmluZ1N0YXRlcy5FREdFKSB7XG4gICAgICAgIHRoaXMuX2VkZ2VTcHJpbmdQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICBzcHJpbmdPcHRpb25zID0ge1xuICAgICAgICAgICAgYW5jaG9yOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5fZWRnZVNwcmluZ1Bvc2l0aW9uLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHBlcmlvZDogdGhpcy5vcHRpb25zLmVkZ2VQZXJpb2QsXG4gICAgICAgICAgICBkYW1waW5nUmF0aW86IHRoaXMub3B0aW9ucy5lZGdlRGFtcFxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAoc3ByaW5nU3RhdGUgPT09IFNwcmluZ1N0YXRlcy5QQUdFKSB7XG4gICAgICAgIHRoaXMuX3BhZ2VTcHJpbmdQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICBzcHJpbmdPcHRpb25zID0ge1xuICAgICAgICAgICAgYW5jaG9yOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZVNwcmluZ1Bvc2l0aW9uLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHBlcmlvZDogdGhpcy5vcHRpb25zLnBhZ2VQZXJpb2QsXG4gICAgICAgICAgICBkYW1waW5nUmF0aW86IHRoaXMub3B0aW9ucy5wYWdlRGFtcFxuICAgICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnNwcmluZy5zZXRPcHRpb25zKHNwcmluZ09wdGlvbnMpO1xuICAgIGlmIChzcHJpbmdTdGF0ZSAmJiAhdGhpcy5fc3ByaW5nU3RhdGUpIHtcbiAgICAgICAgX2RldGFjaEFnZW50cy5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl9zcHJpbmdTdGF0ZSA9IHNwcmluZ1N0YXRlO1xuICAgICAgICBfYXR0YWNoQWdlbnRzLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX3NwcmluZ1N0YXRlID0gc3ByaW5nU3RhdGU7XG59XG5mdW5jdGlvbiBfbm9ybWFsaXplU3RhdGUoKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgIHZhciBub2RlU2l6ZSA9IF9ub2RlU2l6ZUZvckRpcmVjdGlvbi5jYWxsKHRoaXMsIHRoaXMuX25vZGUpO1xuICAgIHZhciBuZXh0Tm9kZSA9IHRoaXMuX25vZGUuZ2V0TmV4dCgpO1xuICAgIHdoaWxlIChwb3NpdGlvbiA+IG5vZGVTaXplICsgVE9MRVJBTkNFICYmIG5leHROb2RlKSB7XG4gICAgICAgIF9zaGlmdE9yaWdpbi5jYWxsKHRoaXMsIC1ub2RlU2l6ZSk7XG4gICAgICAgIHBvc2l0aW9uIC09IG5vZGVTaXplO1xuICAgICAgICB0aGlzLl9zY3JvbGxlci5zZXF1ZW5jZUZyb20obmV4dE5vZGUpO1xuICAgICAgICB0aGlzLl9ub2RlID0gbmV4dE5vZGU7XG4gICAgICAgIG5leHROb2RlID0gdGhpcy5fbm9kZS5nZXROZXh0KCk7XG4gICAgICAgIG5vZGVTaXplID0gX25vZGVTaXplRm9yRGlyZWN0aW9uLmNhbGwodGhpcywgdGhpcy5fbm9kZSk7XG4gICAgfVxuICAgIHZhciBwcmV2aW91c05vZGUgPSB0aGlzLl9ub2RlLmdldFByZXZpb3VzKCk7XG4gICAgdmFyIHByZXZpb3VzTm9kZVNpemU7XG4gICAgd2hpbGUgKHBvc2l0aW9uIDwgLVRPTEVSQU5DRSAmJiBwcmV2aW91c05vZGUpIHtcbiAgICAgICAgcHJldmlvdXNOb2RlU2l6ZSA9IF9ub2RlU2l6ZUZvckRpcmVjdGlvbi5jYWxsKHRoaXMsIHByZXZpb3VzTm9kZSk7XG4gICAgICAgIHRoaXMuX3Njcm9sbGVyLnNlcXVlbmNlRnJvbShwcmV2aW91c05vZGUpO1xuICAgICAgICB0aGlzLl9ub2RlID0gcHJldmlvdXNOb2RlO1xuICAgICAgICBfc2hpZnRPcmlnaW4uY2FsbCh0aGlzLCBwcmV2aW91c05vZGVTaXplKTtcbiAgICAgICAgcG9zaXRpb24gKz0gcHJldmlvdXNOb2RlU2l6ZTtcbiAgICAgICAgcHJldmlvdXNOb2RlID0gdGhpcy5fbm9kZS5nZXRQcmV2aW91cygpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIF9zaGlmdE9yaWdpbihhbW91bnQpIHtcbiAgICB0aGlzLl9lZGdlU3ByaW5nUG9zaXRpb24gKz0gYW1vdW50O1xuICAgIHRoaXMuX3BhZ2VTcHJpbmdQb3NpdGlvbiArPSBhbW91bnQ7XG4gICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLmdldFBvc2l0aW9uKCkgKyBhbW91bnQpO1xuICAgIGlmICh0aGlzLl9zcHJpbmdTdGF0ZSA9PT0gU3ByaW5nU3RhdGVzLkVER0UpIHtcbiAgICAgICAgdGhpcy5zcHJpbmcuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICBhbmNob3I6IFtcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGdlU3ByaW5nUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc3ByaW5nU3RhdGUgPT09IFNwcmluZ1N0YXRlcy5QQUdFKSB7XG4gICAgICAgIHRoaXMuc3ByaW5nLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgYW5jaG9yOiBbXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFnZVNwcmluZ1Bvc2l0aW9uLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcbiAgICB9XG59XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5vdXRwdXRGcm9tID0gZnVuY3Rpb24gb3V0cHV0RnJvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsZXIub3V0cHV0RnJvbS5hcHBseSh0aGlzLl9zY3JvbGxlciwgYXJndW1lbnRzKTtcbn07XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIGdldFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXJ0aWNsZS5nZXRQb3NpdGlvbjFEKCk7XG59O1xuU2Nyb2xsdmlldy5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiBzZXRQb3NpdGlvbih4KSB7XG4gICAgdGhpcy5fcGFydGljbGUuc2V0UG9zaXRpb24xRCh4KTtcbn07XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5nZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIGdldFZlbG9jaXR5KCkge1xuICAgIHJldHVybiB0aGlzLl90b3VjaENvdW50ID8gdGhpcy5fdG91Y2hWZWxvY2l0eSA6IHRoaXMuX3BhcnRpY2xlLmdldFZlbG9jaXR5MUQoKTtcbn07XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5zZXRWZWxvY2l0eSA9IGZ1bmN0aW9uIHNldFZlbG9jaXR5KHYpIHtcbiAgICB0aGlzLl9wYXJ0aWNsZS5zZXRWZWxvY2l0eTFEKHYpO1xufTtcblNjcm9sbHZpZXcucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgICBpZiAob3B0aW9ucy5kaXJlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuZGlyZWN0aW9uID09PSAneCcpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kaXJlY3Rpb24gPSBVdGlsaXR5LkRpcmVjdGlvbi5YO1xuICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy5kaXJlY3Rpb24gPT09ICd5JylcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRpcmVjdGlvbiA9IFV0aWxpdHkuRGlyZWN0aW9uLlk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2Nyb2xsZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fb3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgdGhpcy5fc2Nyb2xsZXIuc2V0T3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMuZ3JvdXBTY3JvbGwpXG4gICAgICAgIHRoaXMuX3Njcm9sbGVyLnBpcGUodGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgZWxzZVxuICAgICAgICB0aGlzLl9zY3JvbGxlci51bnBpcGUodGhpcy5fZXZlbnRJbnB1dCk7XG4gICAgdGhpcy5kcmFnLnNldE9wdGlvbnMoeyBzdHJlbmd0aDogdGhpcy5vcHRpb25zLmRyYWcgfSk7XG4gICAgdGhpcy5mcmljdGlvbi5zZXRPcHRpb25zKHsgc3RyZW5ndGg6IHRoaXMub3B0aW9ucy5mcmljdGlvbiB9KTtcbiAgICB0aGlzLnNwcmluZy5zZXRPcHRpb25zKHtcbiAgICAgICAgcGVyaW9kOiB0aGlzLm9wdGlvbnMuZWRnZVBlcmlvZCxcbiAgICAgICAgZGFtcGluZ1JhdGlvOiB0aGlzLm9wdGlvbnMuZWRnZURhbXBcbiAgICB9KTtcbiAgICB0aGlzLnN5bmMuc2V0T3B0aW9ucyh7XG4gICAgICAgIHJhaWxzOiB0aGlzLm9wdGlvbnMucmFpbHMsXG4gICAgICAgIGRpcmVjdGlvbjogdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVXRpbGl0eS5EaXJlY3Rpb24uWCA/IEdlbmVyaWNTeW5jLkRJUkVDVElPTl9YIDogR2VuZXJpY1N5bmMuRElSRUNUSU9OX1ksXG4gICAgICAgIHByZXZlbnREZWZhdWx0OiB0aGlzLm9wdGlvbnMucHJldmVudERlZmF1bHRcbiAgICB9KTtcbn07XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5nb1RvUHJldmlvdXNQYWdlID0gZnVuY3Rpb24gZ29Ub1ByZXZpb3VzUGFnZSgpIHtcbiAgICBpZiAoIXRoaXMuX25vZGUpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIHZhciBwcmV2aW91c05vZGUgPSB0aGlzLl9ub2RlLmdldFByZXZpb3VzKCk7XG4gICAgaWYgKHByZXZpb3VzTm9kZSkge1xuICAgICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgcHJldmlvdXNOb2RlU2l6ZSA9IF9ub2RlU2l6ZUZvckRpcmVjdGlvbi5jYWxsKHRoaXMsIHByZXZpb3VzTm9kZSk7XG4gICAgICAgIHRoaXMuX3Njcm9sbGVyLnNlcXVlbmNlRnJvbShwcmV2aW91c05vZGUpO1xuICAgICAgICB0aGlzLl9ub2RlID0gcHJldmlvdXNOb2RlO1xuICAgICAgICB2YXIgcHJldmlvdXNTcHJpbmdQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbiA8IFRPTEVSQU5DRSA/IC1wcmV2aW91c05vZGVTaXplIDogMDtcbiAgICAgICAgX3NldFNwcmluZy5jYWxsKHRoaXMsIHByZXZpb3VzU3ByaW5nUG9zaXRpb24sIFNwcmluZ1N0YXRlcy5QQUdFKTtcbiAgICAgICAgX3NoaWZ0T3JpZ2luLmNhbGwodGhpcywgcHJldmlvdXNOb2RlU2l6ZSk7XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3BhZ2VDaGFuZ2UnLCB7IGRpcmVjdGlvbjogLTEgfSk7XG4gICAgcmV0dXJuIHByZXZpb3VzTm9kZTtcbn07XG5TY3JvbGx2aWV3LnByb3RvdHlwZS5nb1RvTmV4dFBhZ2UgPSBmdW5jdGlvbiBnb1RvTmV4dFBhZ2UoKSB7XG4gICAgaWYgKCF0aGlzLl9ub2RlKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB2YXIgbmV4dE5vZGUgPSB0aGlzLl9ub2RlLmdldE5leHQoKTtcbiAgICBpZiAobmV4dE5vZGUpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlU2l6ZSA9IF9ub2RlU2l6ZUZvckRpcmVjdGlvbi5jYWxsKHRoaXMsIHRoaXMuX25vZGUpO1xuICAgICAgICB2YXIgbmV4dE5vZGVTaXplID0gX25vZGVTaXplRm9yRGlyZWN0aW9uLmNhbGwodGhpcywgbmV4dE5vZGUpO1xuICAgICAgICB0aGlzLl9zY3JvbGxlci5zZXF1ZW5jZUZyb20obmV4dE5vZGUpO1xuICAgICAgICB0aGlzLl9ub2RlID0gbmV4dE5vZGU7XG4gICAgICAgIHZhciBuZXh0U3ByaW5nUG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb24gPiBjdXJyZW50Tm9kZVNpemUgLSBUT0xFUkFOQ0UgPyBjdXJyZW50Tm9kZVNpemUgKyBuZXh0Tm9kZVNpemUgOiBjdXJyZW50Tm9kZVNpemU7XG4gICAgICAgIF9zZXRTcHJpbmcuY2FsbCh0aGlzLCBuZXh0U3ByaW5nUG9zaXRpb24sIFNwcmluZ1N0YXRlcy5QQUdFKTtcbiAgICAgICAgX3NoaWZ0T3JpZ2luLmNhbGwodGhpcywgLWN1cnJlbnROb2RlU2l6ZSk7XG4gICAgfVxuICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ3BhZ2VDaGFuZ2UnLCB7IGRpcmVjdGlvbjogMSB9KTtcbiAgICByZXR1cm4gbmV4dE5vZGU7XG59O1xuU2Nyb2xsdmlldy5wcm90b3R5cGUuc2VxdWVuY2VGcm9tID0gZnVuY3Rpb24gc2VxdWVuY2VGcm9tKG5vZGUpIHtcbiAgICBpZiAobm9kZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICBub2RlID0gbmV3IFZpZXdTZXF1ZW5jZSh7IGFycmF5OiBub2RlIH0pO1xuICAgIHRoaXMuX25vZGUgPSBub2RlO1xuICAgIHJldHVybiB0aGlzLl9zY3JvbGxlci5zZXF1ZW5jZUZyb20obm9kZSk7XG59O1xuU2Nyb2xsdmlldy5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGVyLmdldFNpemUuYXBwbHkodGhpcy5fc2Nyb2xsZXIsIGFyZ3VtZW50cyk7XG59O1xuU2Nyb2xsdmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIGlmICghdGhpcy5fbm9kZSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgX25vcm1hbGl6ZVN0YXRlLmNhbGwodGhpcyk7XG4gICAgX2hhbmRsZUVkZ2UuY2FsbCh0aGlzLCB0aGlzLl9zY3JvbGxlci5vbkVkZ2UoKSk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5wYWdpbmF0ZWQpXG4gICAgICAgIF9oYW5kbGVQYWdpbmF0aW9uLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGVyLnJlbmRlcigpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsdmlldzsiLCJ2YXIgT3B0aW9uc01hbmFnZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9PcHRpb25zTWFuYWdlcicpO1xudmFyIFRyYW5zZm9ybSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpO1xudmFyIFZpZXdTZXF1ZW5jZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1ZpZXdTZXF1ZW5jZScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCdmYW1vdXMvdXRpbGl0aWVzL1V0aWxpdHknKTtcbmZ1bmN0aW9uIFNlcXVlbnRpYWxMYXlvdXQob3B0aW9ucykge1xuICAgIHRoaXMuX2l0ZW1zID0gbnVsbDtcbiAgICB0aGlzLl9zaXplID0gbnVsbDtcbiAgICB0aGlzLl9vdXRwdXRGdW5jdGlvbiA9IFNlcXVlbnRpYWxMYXlvdXQuREVGQVVMVF9PVVRQVVRfRlVOQ1RJT047XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmNyZWF0ZSh0aGlzLmNvbnN0cnVjdG9yLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuX2l0ZW1zQ2FjaGUgPSBbXTtcbiAgICB0aGlzLl9vdXRwdXRDYWNoZSA9IHtcbiAgICAgICAgc2l6ZTogbnVsbCxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLl9pdGVtc0NhY2hlXG4gICAgfTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xufVxuU2VxdWVudGlhbExheW91dC5ERUZBVUxUX09QVElPTlMgPSB7XG4gICAgZGlyZWN0aW9uOiBVdGlsaXR5LkRpcmVjdGlvbi5ZLFxuICAgIGl0ZW1TcGFjaW5nOiAwLFxuICAgIGRlZmF1bHRJdGVtU2l6ZTogW1xuICAgICAgICA1MCxcbiAgICAgICAgNTBcbiAgICBdXG59O1xuU2VxdWVudGlhbExheW91dC5ERUZBVUxUX09VVFBVVF9GVU5DVElPTiA9IGZ1bmN0aW9uIERFRkFVTFRfT1VUUFVUX0ZVTkNUSU9OKGlucHV0LCBvZmZzZXQsIGluZGV4KSB7XG4gICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFV0aWxpdHkuRGlyZWN0aW9uLlggPyBUcmFuc2Zvcm0udHJhbnNsYXRlKG9mZnNldCwgMCkgOiBUcmFuc2Zvcm0udHJhbnNsYXRlKDAsIG9mZnNldCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICAgIHRhcmdldDogaW5wdXQucmVuZGVyKClcbiAgICB9O1xufTtcblNlcXVlbnRpYWxMYXlvdXQucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIGlmICghdGhpcy5fc2l6ZSlcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbn07XG5TZXF1ZW50aWFsTGF5b3V0LnByb3RvdHlwZS5zZXF1ZW5jZUZyb20gPSBmdW5jdGlvbiBzZXF1ZW5jZUZyb20oaXRlbXMpIHtcbiAgICBpZiAoaXRlbXMgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgaXRlbXMgPSBuZXcgVmlld1NlcXVlbmNlKGl0ZW1zKTtcbiAgICB0aGlzLl9pdGVtcyA9IGl0ZW1zO1xuICAgIHJldHVybiB0aGlzO1xufTtcblNlcXVlbnRpYWxMYXlvdXQucHJvdG90eXBlLnNldE9wdGlvbnMgPSBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnNNYW5hZ2VyLnNldE9wdGlvbnMuYXBwbHkodGhpcy5vcHRpb25zTWFuYWdlciwgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TZXF1ZW50aWFsTGF5b3V0LnByb3RvdHlwZS5zZXRPdXRwdXRGdW5jdGlvbiA9IGZ1bmN0aW9uIHNldE91dHB1dEZ1bmN0aW9uKG91dHB1dEZ1bmN0aW9uKSB7XG4gICAgdGhpcy5fb3V0cHV0RnVuY3Rpb24gPSBvdXRwdXRGdW5jdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5TZXF1ZW50aWFsTGF5b3V0LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgdmFyIGxlbmd0aCA9IDA7XG4gICAgdmFyIGdpcnRoID0gMDtcbiAgICB2YXIgbGVuZ3RoRGltID0gdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PT0gVXRpbGl0eS5EaXJlY3Rpb24uWCA/IDAgOiAxO1xuICAgIHZhciBnaXJ0aERpbSA9IHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFV0aWxpdHkuRGlyZWN0aW9uLlggPyAxIDogMDtcbiAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLl9pdGVtcztcbiAgICB2YXIgcmVzdWx0ID0gdGhpcy5faXRlbXNDYWNoZTtcbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKGN1cnJlbnROb2RlKSB7XG4gICAgICAgIHZhciBpdGVtID0gY3VycmVudE5vZGUuZ2V0KCk7XG4gICAgICAgIGlmICghaXRlbSlcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB2YXIgaXRlbVNpemU7XG4gICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZ2V0U2l6ZSlcbiAgICAgICAgICAgIGl0ZW1TaXplID0gaXRlbS5nZXRTaXplKCk7XG4gICAgICAgIGlmICghaXRlbVNpemUpXG4gICAgICAgICAgICBpdGVtU2l6ZSA9IHRoaXMub3B0aW9ucy5kZWZhdWx0SXRlbVNpemU7XG4gICAgICAgIGlmIChpdGVtU2l6ZVtnaXJ0aERpbV0gIT09IHRydWUpXG4gICAgICAgICAgICBnaXJ0aCA9IE1hdGgubWF4KGdpcnRoLCBpdGVtU2l6ZVtnaXJ0aERpbV0pO1xuICAgICAgICB2YXIgb3V0cHV0ID0gdGhpcy5fb3V0cHV0RnVuY3Rpb24uY2FsbCh0aGlzLCBpdGVtLCBsZW5ndGgsIGkpO1xuICAgICAgICByZXN1bHRbaV0gPSBvdXRwdXQ7XG4gICAgICAgIGlmIChpdGVtU2l6ZVtsZW5ndGhEaW1dICYmIGl0ZW1TaXplW2xlbmd0aERpbV0gIT09IHRydWUpXG4gICAgICAgICAgICBsZW5ndGggKz0gaXRlbVNpemVbbGVuZ3RoRGltXSArIHRoaXMub3B0aW9ucy5pdGVtU3BhY2luZztcbiAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5nZXROZXh0KCk7XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgdGhpcy5faXRlbXNDYWNoZS5zcGxpY2UoaSk7XG4gICAgaWYgKCFnaXJ0aClcbiAgICAgICAgZ2lydGggPSB1bmRlZmluZWQ7XG4gICAgaWYgKCF0aGlzLl9zaXplKVxuICAgICAgICB0aGlzLl9zaXplID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDBcbiAgICAgICAgXTtcbiAgICB0aGlzLl9zaXplW2xlbmd0aERpbV0gPSBsZW5ndGggLSB0aGlzLm9wdGlvbnMuaXRlbVNwYWNpbmc7XG4gICAgdGhpcy5fc2l6ZVtnaXJ0aERpbV0gPSBnaXJ0aDtcbiAgICB0aGlzLl9vdXRwdXRDYWNoZS5zaXplID0gdGhpcy5nZXRTaXplKCk7XG4gICAgcmV0dXJuIHRoaXMuX291dHB1dENhY2hlO1xufTtcbm1vZHVsZS5leHBvcnRzID0gU2VxdWVudGlhbExheW91dDsiLCJ2YXIgU2NlbmUgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9TY2VuZScpO1xudmFyIFN1cmZhY2UgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9TdXJmYWNlJyk7XG52YXIgVHJhbnNmb3JtID0gcmVxdWlyZSgnZmFtb3VzL2NvcmUvVHJhbnNmb3JtJyk7XG52YXIgVmlldyA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1ZpZXcnKTtcbmZ1bmN0aW9uIE5hdmlnYXRpb25CYXIob3B0aW9ucykge1xuICAgIFZpZXcuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnRpdGxlID0gbmV3IFN1cmZhY2Uoe1xuICAgICAgICBjbGFzc2VzOiB0aGlzLm9wdGlvbnMuY2xhc3NlcyxcbiAgICAgICAgY29udGVudDogdGhpcy5vcHRpb25zLmNvbnRlbnRcbiAgICB9KTtcbiAgICB0aGlzLmJhY2sgPSBuZXcgU3VyZmFjZSh7XG4gICAgICAgIHNpemU6IFtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zaXplWzFdLFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNpemVbMV1cbiAgICAgICAgXSxcbiAgICAgICAgY2xhc3NlczogdGhpcy5vcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMub3B0aW9ucy5iYWNrQ29udGVudFxuICAgIH0pO1xuICAgIHRoaXMuYmFjay5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ2JhY2snLCB7fSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLm1vcmUgPSBuZXcgU3VyZmFjZSh7XG4gICAgICAgIHNpemU6IFtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5zaXplWzFdLFxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNpemVbMV1cbiAgICAgICAgXSxcbiAgICAgICAgY2xhc3NlczogdGhpcy5vcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIGNvbnRlbnQ6IHRoaXMub3B0aW9ucy5tb3JlQ29udGVudFxuICAgIH0pO1xuICAgIHRoaXMubW9yZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2V2ZW50T3V0cHV0LmVtaXQoJ21vcmUnLCB7fSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLmxheW91dCA9IG5ldyBTY2VuZSh7XG4gICAgICAgIGlkOiAnbWFzdGVyJyxcbiAgICAgICAgc2l6ZTogdGhpcy5vcHRpb25zLnNpemUsXG4gICAgICAgIHRhcmdldDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtLmluRnJvbnQsXG4gICAgICAgICAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmJhY2tcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAgICAgICAgIDAuNSxcbiAgICAgICAgICAgICAgICAgICAgMC41XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMudGl0bGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0uaW5Gcm9udCxcbiAgICAgICAgICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgMC41XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRoaXMubW9yZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfSk7XG4gICAgdGhpcy5fYWRkKHRoaXMubGF5b3V0KTtcbiAgICB0aGlzLl9vcHRpb25zTWFuYWdlci5vbignY2hhbmdlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBrZXkgPSBldmVudC5pZDtcbiAgICAgICAgdmFyIGRhdGEgPSBldmVudC52YWx1ZTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3NpemUnKSB7XG4gICAgICAgICAgICB0aGlzLmxheW91dC5pZC5tYXN0ZXIuc2V0U2l6ZShkYXRhKTtcbiAgICAgICAgICAgIHRoaXMudGl0bGUuc2V0U2l6ZShkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuYmFjay5zZXRTaXplKFtcbiAgICAgICAgICAgICAgICBkYXRhWzFdLFxuICAgICAgICAgICAgICAgIGRhdGFbMV1cbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgdGhpcy5tb3JlLnNldFNpemUoW1xuICAgICAgICAgICAgICAgIGRhdGFbMV0sXG4gICAgICAgICAgICAgICAgZGF0YVsxXVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnYmFja0NsYXNzZXMnKSB7XG4gICAgICAgICAgICB0aGlzLmJhY2suc2V0T3B0aW9ucyh7IGNsYXNzZXM6IHRoaXMub3B0aW9ucy5jbGFzc2VzLmNvbmNhdCh0aGlzLm9wdGlvbnMuYmFja0NsYXNzZXMpIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2JhY2tDb250ZW50Jykge1xuICAgICAgICAgICAgdGhpcy5iYWNrLnNldENvbnRlbnQodGhpcy5vcHRpb25zLmJhY2tDb250ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdjbGFzc2VzJykge1xuICAgICAgICAgICAgdGhpcy50aXRsZS5zZXRPcHRpb25zKHsgY2xhc3NlczogdGhpcy5vcHRpb25zLmNsYXNzZXMgfSk7XG4gICAgICAgICAgICB0aGlzLmJhY2suc2V0T3B0aW9ucyh7IGNsYXNzZXM6IHRoaXMub3B0aW9ucy5jbGFzc2VzLmNvbmNhdCh0aGlzLm9wdGlvbnMuYmFja0NsYXNzZXMpIH0pO1xuICAgICAgICAgICAgdGhpcy5tb3JlLnNldE9wdGlvbnMoeyBjbGFzc2VzOiB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5jb25jYXQodGhpcy5vcHRpb25zLm1vcmVDbGFzc2VzKSB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdjb250ZW50Jykge1xuICAgICAgICAgICAgdGhpcy5zZXRDb250ZW50KHRoaXMub3B0aW9ucy5jb250ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdtb3JlQ2xhc3NlcycpIHtcbiAgICAgICAgICAgIHRoaXMubW9yZS5zZXRPcHRpb25zKHsgY2xhc3NlczogdGhpcy5vcHRpb25zLmNsYXNzZXMuY29uY2F0KHRoaXMub3B0aW9ucy5tb3JlQ2xhc3NlcykgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnbW9yZUNvbnRlbnQnKSB7XG4gICAgICAgICAgICB0aGlzLm1vcmUuc2V0Q29udGVudCh0aGlzLm9wdGlvbnMuY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9LmJpbmQodGhpcykpO1xufVxuTmF2aWdhdGlvbkJhci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFZpZXcucHJvdG90eXBlKTtcbk5hdmlnYXRpb25CYXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTmF2aWdhdGlvbkJhcjtcbk5hdmlnYXRpb25CYXIuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHNpemU6IFtcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICA1MFxuICAgIF0sXG4gICAgYmFja0NsYXNzZXM6IFsnYmFjayddLFxuICAgIGJhY2tDb250ZW50OiAnJiN4MjVjMDsnLFxuICAgIGNsYXNzZXM6IFsnbmF2aWdhdGlvbiddLFxuICAgIGNvbnRlbnQ6ICcnLFxuICAgIG1vcmVDbGFzc2VzOiBbJ21vcmUnXSxcbiAgICBtb3JlQ29udGVudDogJyYjeDI3MWE7J1xufTtcbk5hdmlnYXRpb25CYXIucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiBzZXRDb250ZW50KGNvbnRlbnQpIHtcbiAgICByZXR1cm4gdGhpcy50aXRsZS5zZXRDb250ZW50KGNvbnRlbnQpO1xufTtcbm1vZHVsZS5leHBvcnRzID0gTmF2aWdhdGlvbkJhcjsiLCJ2YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1N1cmZhY2UnKTtcbnZhciBDYW52YXNTdXJmYWNlID0gcmVxdWlyZSgnZmFtb3VzL3N1cmZhY2VzL0NhbnZhc1N1cmZhY2UnKTtcbnZhciBUcmFuc2Zvcm0gPSByZXF1aXJlKCdmYW1vdXMvY29yZS9UcmFuc2Zvcm0nKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBVdGlsaXRpZXMgPSByZXF1aXJlKCdmYW1vdXMvbWF0aC9VdGlsaXRpZXMnKTtcbnZhciBPcHRpb25zTWFuYWdlciA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL09wdGlvbnNNYW5hZ2VyJyk7XG52YXIgTW91c2VTeW5jID0gcmVxdWlyZSgnZmFtb3VzL2lucHV0cy9Nb3VzZVN5bmMnKTtcbnZhciBUb3VjaFN5bmMgPSByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL1RvdWNoU3luYycpO1xudmFyIEdlbmVyaWNTeW5jID0gcmVxdWlyZSgnZmFtb3VzL2lucHV0cy9HZW5lcmljU3luYycpO1xuR2VuZXJpY1N5bmMucmVnaXN0ZXIoe1xuICAgIG1vdXNlOiBNb3VzZVN5bmMsXG4gICAgdG91Y2g6IFRvdWNoU3luY1xufSk7XG5mdW5jdGlvbiBTbGlkZXIob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5jcmVhdGUoU2xpZGVyLkRFRkFVTFRfT1BUSU9OUyk7XG4gICAgdGhpcy5vcHRpb25zTWFuYWdlciA9IG5ldyBPcHRpb25zTWFuYWdlcih0aGlzLm9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zKVxuICAgICAgICB0aGlzLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgdGhpcy5pbmRpY2F0b3IgPSBuZXcgQ2FudmFzU3VyZmFjZSh7XG4gICAgICAgIHNpemU6IHRoaXMub3B0aW9ucy5pbmRpY2F0b3JTaXplLFxuICAgICAgICBjbGFzc2VzOiBbJ3NsaWRlci1iYWNrJ11cbiAgICB9KTtcbiAgICB0aGlzLmxhYmVsID0gbmV3IFN1cmZhY2Uoe1xuICAgICAgICBzaXplOiB0aGlzLm9wdGlvbnMubGFiZWxTaXplLFxuICAgICAgICBjb250ZW50OiB0aGlzLm9wdGlvbnMubGFiZWwsXG4gICAgICAgIHByb3BlcnRpZXM6IHsgcG9pbnRlckV2ZW50czogJ25vbmUnIH0sXG4gICAgICAgIGNsYXNzZXM6IFsnc2xpZGVyLWxhYmVsJ11cbiAgICB9KTtcbiAgICB0aGlzLmV2ZW50T3V0cHV0ID0gbmV3IEV2ZW50SGFuZGxlcigpO1xuICAgIHRoaXMuZXZlbnRJbnB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0SW5wdXRIYW5kbGVyKHRoaXMsIHRoaXMuZXZlbnRJbnB1dCk7XG4gICAgRXZlbnRIYW5kbGVyLnNldE91dHB1dEhhbmRsZXIodGhpcywgdGhpcy5ldmVudE91dHB1dCk7XG4gICAgdmFyIHNjYWxlID0gKHRoaXMub3B0aW9ucy5yYW5nZVsxXSAtIHRoaXMub3B0aW9ucy5yYW5nZVswXSkgLyB0aGlzLm9wdGlvbnMuaW5kaWNhdG9yU2l6ZVswXTtcbiAgICB0aGlzLnN5bmMgPSBuZXcgR2VuZXJpY1N5bmMoW1xuICAgICAgICAnbW91c2UnLFxuICAgICAgICAndG91Y2gnXG4gICAgXSwge1xuICAgICAgICBzY2FsZTogc2NhbGUsXG4gICAgICAgIGRpcmVjdGlvbjogR2VuZXJpY1N5bmMuRElSRUNUSU9OX1hcbiAgICB9KTtcbiAgICB0aGlzLmluZGljYXRvci5waXBlKHRoaXMuc3luYyk7XG4gICAgdGhpcy5zeW5jLnBpcGUodGhpcyk7XG4gICAgdGhpcy5ldmVudElucHV0Lm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB0aGlzLnNldChkYXRhLnBvc2l0aW9uKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHRoaXMuX2RyYXdQb3MgPSAwO1xuICAgIF91cGRhdGVMYWJlbC5jYWxsKHRoaXMpO1xufVxuU2xpZGVyLkRFRkFVTFRfT1BUSU9OUyA9IHtcbiAgICBzaXplOiBbXG4gICAgICAgIDIwMCxcbiAgICAgICAgNjBcbiAgICBdLFxuICAgIGluZGljYXRvclNpemU6IFtcbiAgICAgICAgMjAwLFxuICAgICAgICAzMFxuICAgIF0sXG4gICAgbGFiZWxTaXplOiBbXG4gICAgICAgIDIwMCxcbiAgICAgICAgMzBcbiAgICBdLFxuICAgIHJhbmdlOiBbXG4gICAgICAgIDAsXG4gICAgICAgIDFcbiAgICBdLFxuICAgIHByZWNpc2lvbjogMixcbiAgICB2YWx1ZTogMCxcbiAgICBsYWJlbDogJycsXG4gICAgZmlsbENvbG9yOiAncmdiYSgxNzAsIDE3MCwgMTcwLCAxKSdcbn07XG5mdW5jdGlvbiBfdXBkYXRlTGFiZWwoKSB7XG4gICAgdGhpcy5sYWJlbC5zZXRDb250ZW50KHRoaXMub3B0aW9ucy5sYWJlbCArICc8c3BhbiBzdHlsZT1cImZsb2F0OiByaWdodFwiPicgKyB0aGlzLmdldCgpLnRvRml4ZWQodGhpcy5vcHRpb25zLnByZWNpc2lvbikgKyAnPC9zcGFuPicpO1xufVxuU2xpZGVyLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9uc01hbmFnZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcbn07XG5TbGlkZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnZhbHVlO1xufTtcblNsaWRlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSB0aGlzLm9wdGlvbnMudmFsdWUpXG4gICAgICAgIHJldHVybjtcbiAgICB0aGlzLm9wdGlvbnMudmFsdWUgPSBVdGlsaXRpZXMuY2xhbXAodmFsdWUsIHRoaXMub3B0aW9ucy5yYW5nZSk7XG4gICAgX3VwZGF0ZUxhYmVsLmNhbGwodGhpcyk7XG4gICAgdGhpcy5ldmVudE91dHB1dC5lbWl0KCdjaGFuZ2UnLCB7IHZhbHVlOiB2YWx1ZSB9KTtcbn07XG5TbGlkZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2l6ZTtcbn07XG5TbGlkZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICB2YXIgcmFuZ2UgPSB0aGlzLm9wdGlvbnMucmFuZ2U7XG4gICAgdmFyIGZpbGxTaXplID0gTWF0aC5mbG9vcigodGhpcy5nZXQoKSAtIHJhbmdlWzBdKSAvIChyYW5nZVsxXSAtIHJhbmdlWzBdKSAqIHRoaXMub3B0aW9ucy5pbmRpY2F0b3JTaXplWzBdKTtcbiAgICBpZiAoZmlsbFNpemUgPCB0aGlzLl9kcmF3UG9zKSB7XG4gICAgICAgIHRoaXMuaW5kaWNhdG9yLmdldENvbnRleHQoJzJkJykuY2xlYXJSZWN0KGZpbGxTaXplLCAwLCB0aGlzLl9kcmF3UG9zIC0gZmlsbFNpemUgKyAxLCB0aGlzLm9wdGlvbnMuaW5kaWNhdG9yU2l6ZVsxXSk7XG4gICAgfSBlbHNlIGlmIChmaWxsU2l6ZSA+IHRoaXMuX2RyYXdQb3MpIHtcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuaW5kaWNhdG9yLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuZmlsbENvbG9yO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy5fZHJhd1BvcyAtIDEsIDAsIGZpbGxTaXplIC0gdGhpcy5fZHJhd1BvcyArIDEsIHRoaXMub3B0aW9ucy5pbmRpY2F0b3JTaXplWzFdKTtcbiAgICB9XG4gICAgdGhpcy5fZHJhd1BvcyA9IGZpbGxTaXplO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNpemU6IHRoaXMub3B0aW9ucy5zaXplLFxuICAgICAgICB0YXJnZXQ6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcmlnaW46IFtcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmluZGljYXRvci5yZW5kZXIoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybS50cmFuc2xhdGUoMCwgMCwgMSksXG4gICAgICAgICAgICAgICAgb3JpZ2luOiBbXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGhpcy5sYWJlbC5yZW5kZXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IFNsaWRlcjsiLCJ2YXIgVXRpbGl0eSA9IHJlcXVpcmUoJ2ZhbW91cy91dGlsaXRpZXMvVXRpbGl0eScpO1xudmFyIFZpZXcgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9WaWV3Jyk7XG52YXIgR3JpZExheW91dCA9IHJlcXVpcmUoJ2ZhbW91cy92aWV3cy9HcmlkTGF5b3V0Jyk7XG52YXIgVG9nZ2xlQnV0dG9uID0gcmVxdWlyZSgnLi9Ub2dnbGVCdXR0b24nKTtcbmZ1bmN0aW9uIFRhYkJhcihvcHRpb25zKSB7XG4gICAgVmlldy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMubGF5b3V0ID0gbmV3IEdyaWRMYXlvdXQoKTtcbiAgICB0aGlzLmJ1dHRvbnMgPSBbXTtcbiAgICB0aGlzLl9idXR0b25JZHMgPSB7fTtcbiAgICB0aGlzLl9idXR0b25DYWxsYmFja3MgPSB7fTtcbiAgICB0aGlzLmxheW91dC5zZXF1ZW5jZUZyb20odGhpcy5idXR0b25zKTtcbiAgICB0aGlzLl9hZGQodGhpcy5sYXlvdXQpO1xuICAgIHRoaXMuX29wdGlvbnNNYW5hZ2VyLm9uKCdjaGFuZ2UnLCBfdXBkYXRlT3B0aW9ucy5iaW5kKHRoaXMpKTtcbn1cblRhYkJhci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFZpZXcucHJvdG90eXBlKTtcblRhYkJhci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUYWJCYXI7XG5UYWJCYXIuREVGQVVMVF9PUFRJT05TID0ge1xuICAgIHNlY3Rpb25zOiBbXSxcbiAgICB3aWRnZXQ6IFRvZ2dsZUJ1dHRvbixcbiAgICBzaXplOiBbXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgNTBcbiAgICBdLFxuICAgIGRpcmVjdGlvbjogVXRpbGl0eS5EaXJlY3Rpb24uWCxcbiAgICBidXR0b25zOiB7IHRvZ2dsZU1vZGU6IFRvZ2dsZUJ1dHRvbi5PTiB9XG59O1xuZnVuY3Rpb24gX3VwZGF0ZU9wdGlvbnMoZGF0YSkge1xuICAgIHZhciBpZCA9IGRhdGEuaWQ7XG4gICAgdmFyIHZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICBpZiAoaWQgPT09ICdkaXJlY3Rpb24nKSB7XG4gICAgICAgIHRoaXMubGF5b3V0LnNldE9wdGlvbnMoeyBkaW1lbnNpb25zOiBfcmVzb2x2ZUdyaWREaW1lbnNpb25zLmNhbGwodGhpcy5idXR0b25zLmxlbmd0aCwgdGhpcy5vcHRpb25zLmRpcmVjdGlvbikgfSk7XG4gICAgfSBlbHNlIGlmIChpZCA9PT0gJ2J1dHRvbnMnKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5idXR0b25zKSB7XG4gICAgICAgICAgICB0aGlzLmJ1dHRvbnNbaV0uc2V0T3B0aW9ucyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlkID09PSAnc2VjdGlvbnMnKSB7XG4gICAgICAgIGZvciAodmFyIHNlY3Rpb25JZCBpbiB0aGlzLm9wdGlvbnMuc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lU2VjdGlvbihzZWN0aW9uSWQsIHRoaXMub3B0aW9ucy5zZWN0aW9uc1tzZWN0aW9uSWRdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIF9yZXNvbHZlR3JpZERpbWVuc2lvbnMoY291bnQsIGRpcmVjdGlvbikge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFV0aWxpdHkuRGlyZWN0aW9uLlgpXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBjb3VudCxcbiAgICAgICAgICAgIDFcbiAgICAgICAgXTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgY291bnRcbiAgICAgICAgXTtcbn1cblRhYkJhci5wcm90b3R5cGUuZGVmaW5lU2VjdGlvbiA9IGZ1bmN0aW9uIGRlZmluZVNlY3Rpb24oaWQsIGNvbnRlbnQpIHtcbiAgICB2YXIgYnV0dG9uO1xuICAgIHZhciBpID0gdGhpcy5fYnV0dG9uSWRzW2lkXTtcbiAgICBpZiAoaSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGkgPSB0aGlzLmJ1dHRvbnMubGVuZ3RoO1xuICAgICAgICB0aGlzLl9idXR0b25JZHNbaWRdID0gaTtcbiAgICAgICAgdmFyIHdpZGdldCA9IHRoaXMub3B0aW9ucy53aWRnZXQ7XG4gICAgICAgIGJ1dHRvbiA9IG5ldyB3aWRnZXQoKTtcbiAgICAgICAgdGhpcy5idXR0b25zW2ldID0gYnV0dG9uO1xuICAgICAgICB0aGlzLmxheW91dC5zZXRPcHRpb25zKHsgZGltZW5zaW9uczogX3Jlc29sdmVHcmlkRGltZW5zaW9ucyh0aGlzLmJ1dHRvbnMubGVuZ3RoLCB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uKSB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24gPSB0aGlzLmJ1dHRvbnNbaV07XG4gICAgICAgIGJ1dHRvbi51bmJpbmQoJ3NlbGVjdCcsIHRoaXMuX2J1dHRvbkNhbGxiYWNrc1tpZF0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLmJ1dHRvbnMpXG4gICAgICAgIGJ1dHRvbi5zZXRPcHRpb25zKHRoaXMub3B0aW9ucy5idXR0b25zKTtcbiAgICBidXR0b24uc2V0T3B0aW9ucyhjb250ZW50KTtcbiAgICB0aGlzLl9idXR0b25DYWxsYmFja3NbaWRdID0gdGhpcy5zZWxlY3QuYmluZCh0aGlzLCBpZCk7XG4gICAgYnV0dG9uLm9uKCdzZWxlY3QnLCB0aGlzLl9idXR0b25DYWxsYmFja3NbaWRdKTtcbn07XG5UYWJCYXIucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIHNlbGVjdChpZCkge1xuICAgIHZhciBidG4gPSB0aGlzLl9idXR0b25JZHNbaWRdO1xuICAgIGlmICh0aGlzLmJ1dHRvbnNbYnRuXSAmJiB0aGlzLmJ1dHRvbnNbYnRuXS5pc1NlbGVjdGVkKCkpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc2VsZWN0JywgeyBpZDogaWQgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmJ1dHRvbnNbYnRuXSkge1xuICAgICAgICB0aGlzLmJ1dHRvbnNbYnRuXS5zZWxlY3QoKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGkgIT09IGJ0bilcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uc1tpXS5kZXNlbGVjdCgpO1xuICAgIH1cbn07XG5tb2R1bGUuZXhwb3J0cyA9IFRhYkJhcjsiLCJ2YXIgU3VyZmFjZSA9IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1N1cmZhY2UnKTtcbnZhciBFdmVudEhhbmRsZXIgPSByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKTtcbnZhciBSZW5kZXJDb250cm9sbGVyID0gcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL1JlbmRlckNvbnRyb2xsZXInKTtcbmZ1bmN0aW9uIFRvZ2dsZUJ1dHRvbihvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICBjb250ZW50OiAnJyxcbiAgICAgICAgb2ZmQ2xhc3NlczogWydvZmYnXSxcbiAgICAgICAgb25DbGFzc2VzOiBbJ29uJ10sXG4gICAgICAgIHNpemU6IHVuZGVmaW5lZCxcbiAgICAgICAgb3V0VHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgY3VydmU6ICdlYXNlSW5PdXQnLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMFxuICAgICAgICB9LFxuICAgICAgICBpblRyYW5zaXRpb246IHtcbiAgICAgICAgICAgIGN1cnZlOiAnZWFzZUluT3V0JyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDBcbiAgICAgICAgfSxcbiAgICAgICAgdG9nZ2xlTW9kZTogVG9nZ2xlQnV0dG9uLlRPR0dMRSxcbiAgICAgICAgY3Jvc3NmYWRlOiB0cnVlXG4gICAgfTtcbiAgICB0aGlzLl9ldmVudE91dHB1dCA9IG5ldyBFdmVudEhhbmRsZXIoKTtcbiAgICBFdmVudEhhbmRsZXIuc2V0T3V0cHV0SGFuZGxlcih0aGlzLCB0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5vZmZTdXJmYWNlID0gbmV3IFN1cmZhY2UoKTtcbiAgICB0aGlzLm9mZlN1cmZhY2Uub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnRvZ2dsZU1vZGUgIT09IFRvZ2dsZUJ1dHRvbi5PRkYpXG4gICAgICAgICAgICB0aGlzLnNlbGVjdCgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5vZmZTdXJmYWNlLnBpcGUodGhpcy5fZXZlbnRPdXRwdXQpO1xuICAgIHRoaXMub25TdXJmYWNlID0gbmV3IFN1cmZhY2UoKTtcbiAgICB0aGlzLm9uU3VyZmFjZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMudG9nZ2xlTW9kZSAhPT0gVG9nZ2xlQnV0dG9uLk9OKVxuICAgICAgICAgICAgdGhpcy5kZXNlbGVjdCgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5vblN1cmZhY2UucGlwZSh0aGlzLl9ldmVudE91dHB1dCk7XG4gICAgdGhpcy5hcmJpdGVyID0gbmV3IFJlbmRlckNvbnRyb2xsZXIoeyBvdmVybGFwOiB0aGlzLm9wdGlvbnMuY3Jvc3NmYWRlIH0pO1xuICAgIHRoaXMuZGVzZWxlY3QoKTtcbiAgICBpZiAob3B0aW9ucylcbiAgICAgICAgdGhpcy5zZXRPcHRpb25zKG9wdGlvbnMpO1xufVxuVG9nZ2xlQnV0dG9uLk9GRiA9IDA7XG5Ub2dnbGVCdXR0b24uT04gPSAxO1xuVG9nZ2xlQnV0dG9uLlRPR0dMRSA9IDI7XG5Ub2dnbGVCdXR0b24ucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIHNlbGVjdCgpIHtcbiAgICB0aGlzLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmFyYml0ZXIuc2hvdyh0aGlzLm9uU3VyZmFjZSwgdGhpcy5vcHRpb25zLmluVHJhbnNpdGlvbik7XG4gICAgdGhpcy5fZXZlbnRPdXRwdXQuZW1pdCgnc2VsZWN0Jyk7XG59O1xuVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5kZXNlbGVjdCA9IGZ1bmN0aW9uIGRlc2VsZWN0KCkge1xuICAgIHRoaXMuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmFyYml0ZXIuc2hvdyh0aGlzLm9mZlN1cmZhY2UsIHRoaXMub3B0aW9ucy5vdXRUcmFuc2l0aW9uKTtcbiAgICB0aGlzLl9ldmVudE91dHB1dC5lbWl0KCdkZXNlbGVjdCcpO1xufTtcblRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuaXNTZWxlY3RlZCA9IGZ1bmN0aW9uIGlzU2VsZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG59O1xuVG9nZ2xlQnV0dG9uLnByb3RvdHlwZS5zZXRPcHRpb25zID0gZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuY29udGVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5jb250ZW50ID0gb3B0aW9ucy5jb250ZW50O1xuICAgICAgICB0aGlzLm9mZlN1cmZhY2Uuc2V0Q29udGVudCh0aGlzLm9wdGlvbnMuY29udGVudCk7XG4gICAgICAgIHRoaXMub25TdXJmYWNlLnNldENvbnRlbnQodGhpcy5vcHRpb25zLmNvbnRlbnQpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5vZmZDbGFzc2VzKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5vZmZDbGFzc2VzID0gb3B0aW9ucy5vZmZDbGFzc2VzO1xuICAgICAgICB0aGlzLm9mZlN1cmZhY2Uuc2V0Q2xhc3Nlcyh0aGlzLm9wdGlvbnMub2ZmQ2xhc3Nlcyk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLm9uQ2xhc3Nlcykge1xuICAgICAgICB0aGlzLm9wdGlvbnMub25DbGFzc2VzID0gb3B0aW9ucy5vbkNsYXNzZXM7XG4gICAgICAgIHRoaXMub25TdXJmYWNlLnNldENsYXNzZXModGhpcy5vcHRpb25zLm9uQ2xhc3Nlcyk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNpemUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuc2l6ZSA9IG9wdGlvbnMuc2l6ZTtcbiAgICAgICAgdGhpcy5vblN1cmZhY2Uuc2V0U2l6ZSh0aGlzLm9wdGlvbnMuc2l6ZSk7XG4gICAgICAgIHRoaXMub2ZmU3VyZmFjZS5zZXRTaXplKHRoaXMub3B0aW9ucy5zaXplKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudG9nZ2xlTW9kZSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMudG9nZ2xlTW9kZSA9IG9wdGlvbnMudG9nZ2xlTW9kZTtcbiAgICBpZiAob3B0aW9ucy5vdXRUcmFuc2l0aW9uICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHRoaXMub3B0aW9ucy5vdXRUcmFuc2l0aW9uID0gb3B0aW9ucy5vdXRUcmFuc2l0aW9uO1xuICAgIGlmIChvcHRpb25zLmluVHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB0aGlzLm9wdGlvbnMuaW5UcmFuc2l0aW9uID0gb3B0aW9ucy5pblRyYW5zaXRpb247XG4gICAgaWYgKG9wdGlvbnMuY3Jvc3NmYWRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNyb3NzZmFkZSA9IG9wdGlvbnMuY3Jvc3NmYWRlO1xuICAgICAgICB0aGlzLmFyYml0ZXIuc2V0T3B0aW9ucyh7IG92ZXJsYXA6IHRoaXMub3B0aW9ucy5jcm9zc2ZhZGUgfSk7XG4gICAgfVxufTtcblRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5zaXplO1xufTtcblRvZ2dsZUJ1dHRvbi5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmFyYml0ZXIucmVuZGVyKCk7XG59O1xubW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVCdXR0b247IiwiLy8gbG9hZCBjc3NcbnJlcXVpcmUoJy4vc3R5bGVzJyk7XG5cbi8vIExvYWQgcG9seWZpbGxzXG5yZXF1aXJlKCdmYW1vdXMtcG9seWZpbGxzJyk7XG5cbmZhbW91cyA9IHtcbiAgY29yZToge1xuICAgIENvbnRleHQ6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0NvbnRleHQnKSxcbiAgICBFbGVtZW50QWxsb2NhdG9yOiByZXF1aXJlKCdmYW1vdXMvY29yZS9FbGVtZW50QWxsb2NhdG9yJyksXG4gICAgRW5naW5lOiByZXF1aXJlKCdmYW1vdXMvY29yZS9FbmdpbmUnKSxcbiAgICBFbnRpdHk6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL0VudGl0eScpLFxuICAgIEV2ZW50RW1pdHRlcjogcmVxdWlyZSgnZmFtb3VzL2NvcmUvRXZlbnRFbWl0dGVyJyksXG4gICAgRXZlbnRIYW5kbGVyOiByZXF1aXJlKCdmYW1vdXMvY29yZS9FdmVudEhhbmRsZXInKSxcbiAgICBHcm91cDogcmVxdWlyZSgnZmFtb3VzL2NvcmUvR3JvdXAnKSxcbiAgICBNb2RpZmllcjogcmVxdWlyZSgnZmFtb3VzL2NvcmUvTW9kaWZpZXInKSxcbiAgICBPcHRpb25zTWFuYWdlcjogcmVxdWlyZSgnZmFtb3VzL2NvcmUvT3B0aW9uc01hbmFnZXInKSxcbiAgICBSZW5kZXJOb2RlOiByZXF1aXJlKCdmYW1vdXMvY29yZS9SZW5kZXJOb2RlJyksXG4gICAgU2NlbmU6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1NjZW5lJyksXG4gICAgU3BlY1BhcnNlcjogcmVxdWlyZSgnZmFtb3VzL2NvcmUvU3BlY1BhcnNlcicpLFxuICAgIFN1cmZhY2U6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1N1cmZhY2UnKSxcbiAgICBUcmFuc2Zvcm06IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1RyYW5zZm9ybScpLFxuICAgIFZpZXc6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1ZpZXcnKSxcbiAgICBWaWV3U2VxdWVuY2U6IHJlcXVpcmUoJ2ZhbW91cy9jb3JlL1ZpZXdTZXF1ZW5jZScpXG4gIH0sXG4gIGV2ZW50czoge1xuICAgIEV2ZW50QXJiaXRlcjogcmVxdWlyZSgnZmFtb3VzL2V2ZW50cy9FdmVudEFyYml0ZXInKSxcbiAgICBFdmVudEZpbHRlcjogcmVxdWlyZSgnZmFtb3VzL2V2ZW50cy9FdmVudEZpbHRlcicpLFxuICAgIEV2ZW50TWFwcGVyOiByZXF1aXJlKCdmYW1vdXMvZXZlbnRzL0V2ZW50TWFwcGVyJylcbiAgfSxcbiAgaW5wdXRzOiB7XG4gICAgQWNjdW11bGF0b3I6IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvQWNjdW11bGF0b3InKSxcbiAgICBGYXN0Q2xpY2s6IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvRmFzdENsaWNrJyksXG4gICAgR2VuZXJpY1N5bmM6IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvR2VuZXJpY1N5bmMnKSxcbiAgICBNb3VzZVN5bmM6IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvTW91c2VTeW5jJyksXG4gICAgUGluY2hTeW5jOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL1BpbmNoU3luYycpLFxuICAgIFJvdGF0ZVN5bmM6IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvUm90YXRlU3luYycpLFxuICAgIFNjYWxlU3luYzogcmVxdWlyZSgnZmFtb3VzL2lucHV0cy9TY2FsZVN5bmMnKSxcbiAgICBTY3JvbGxTeW5jOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL1Njcm9sbFN5bmMnKSxcbiAgICBUb3VjaFN5bmM6IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvVG91Y2hTeW5jJyksXG4gICAgVG91Y2hUcmFja2VyOiByZXF1aXJlKCdmYW1vdXMvaW5wdXRzL1RvdWNoVHJhY2tlcicpLFxuICAgIFR3b0ZpbmdlclN5bmM6IHJlcXVpcmUoJ2ZhbW91cy9pbnB1dHMvVHdvRmluZ2VyU3luYycpXG4gIH0sXG4gIG1hdGg6IHtcbiAgICBNYXRyaXg6IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL01hdHJpeCcpLFxuICAgIFF1YXRlcm5pb246IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1F1YXRlcm5pb24nKSxcbiAgICBSYW5kb206IHJlcXVpcmUoJ2ZhbW91cy9tYXRoL1JhbmRvbScpLFxuICAgIFV0aWxpdGllczogcmVxdWlyZSgnZmFtb3VzL21hdGgvVXRpbGl0aWVzJyksXG4gICAgVmVjdG9yOiByZXF1aXJlKCdmYW1vdXMvbWF0aC9WZWN0b3InKVxuICB9LFxuICBtb2RpZmllcnM6IHtcbiAgICBEcmFnZ2FibGU6IHJlcXVpcmUoJ2ZhbW91cy9tb2RpZmllcnMvRHJhZ2dhYmxlJyksXG4gICAgRmFkZXI6IHJlcXVpcmUoJ2ZhbW91cy9tb2RpZmllcnMvRmFkZXInKSxcbiAgICBNb2RpZmllckNoYWluOiByZXF1aXJlKCdmYW1vdXMvbW9kaWZpZXJzL01vZGlmaWVyQ2hhaW4nKSxcbiAgICBTdGF0ZU1vZGlmaWVyOiByZXF1aXJlKCdmYW1vdXMvbW9kaWZpZXJzL1N0YXRlTW9kaWZpZXInKVxuICB9LFxuICBwaHlzaWNzOiB7XG4gICAgYm9kaWVzOiB7XG4gICAgICBCb2R5OiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9ib2RpZXMvQm9keScpLFxuICAgICAgQ2lyY2xlOiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9ib2RpZXMvQ2lyY2xlJyksXG4gICAgICBQYXJ0aWNsZTogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvYm9kaWVzL1BhcnRpY2xlJyksXG4gICAgICBSZWN0YW5nbGU6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2JvZGllcy9SZWN0YW5nbGUnKVxuICAgIH0sXG4gICAgY29uc3RyYWludHM6IHtcbiAgICAgIENvbGxpc2lvbjogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvQ29sbGlzaW9uJyksXG4gICAgICBDb25zdHJhaW50OiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9Db25zdHJhaW50JyksXG4gICAgICBDdXJ2ZTogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvQ3VydmUnKSxcbiAgICAgIERpc3RhbmNlOiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9jb25zdHJhaW50cy9EaXN0YW5jZScpLFxuICAgICAgU25hcDogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvU25hcCcpLFxuICAgICAgU3VyZmFjZTogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvU3VyZmFjZScpLFxuICAgICAgV2FsbDogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvY29uc3RyYWludHMvV2FsbCcpLFxuICAgICAgV2FsbHM6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2NvbnN0cmFpbnRzL1dhbGxzJylcbiAgICB9LFxuICAgIGZvcmNlczoge1xuICAgICAgRHJhZzogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvZm9yY2VzL0RyYWcnKSxcbiAgICAgIEZvcmNlOiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9mb3JjZXMvRm9yY2UnKSxcbiAgICAgIFJlcHVsc2lvbjogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvZm9yY2VzL1JlcHVsc2lvbicpLFxuICAgICAgUm90YXRpb25hbERyYWc6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9Sb3RhdGlvbmFsRHJhZycpLFxuICAgICAgUm90YXRpb25hbFNwcmluZzogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvZm9yY2VzL1JvdGF0aW9uYWxTcHJpbmcnKSxcbiAgICAgIFNwcmluZzogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvZm9yY2VzL1NwcmluZycpLFxuICAgICAgVmVjdG9yRmllbGQ6IHJlcXVpcmUoJ2ZhbW91cy9waHlzaWNzL2ZvcmNlcy9WZWN0b3JGaWVsZCcpXG4gICAgfSxcbiAgICBpbnRlZ3JhdG9yczoge1xuICAgICAgU3ltcGxlY3RpY0V1bGVyOiByZXF1aXJlKCdmYW1vdXMvcGh5c2ljcy9pbnRlZ3JhdG9ycy9TeW1wbGVjdGljRXVsZXInKVxuICAgIH0sXG4gICAgUGh5c2ljc0VuZ2luZTogcmVxdWlyZSgnZmFtb3VzL3BoeXNpY3MvUGh5c2ljc0VuZ2luZScpXG4gIH0sXG4gIHN1cmZhY2VzOiB7XG4gICAgQ2FudmFzU3VyZmFjZTogcmVxdWlyZSgnZmFtb3VzL3N1cmZhY2VzL0NhbnZhc1N1cmZhY2UnKSxcbiAgICBDb250YWluZXJTdXJmYWNlOiByZXF1aXJlKCdmYW1vdXMvc3VyZmFjZXMvQ29udGFpbmVyU3VyZmFjZScpLFxuICAgIEZvcm1Db250YWluZXJTdXJmYWNlOiByZXF1aXJlKCdmYW1vdXMvc3VyZmFjZXMvRm9ybUNvbnRhaW5lclN1cmZhY2UnKSxcbiAgICBJbWFnZVN1cmZhY2U6IHJlcXVpcmUoJ2ZhbW91cy9zdXJmYWNlcy9JbWFnZVN1cmZhY2UnKSxcbiAgICBJbnB1dFN1cmZhY2U6IHJlcXVpcmUoJ2ZhbW91cy9zdXJmYWNlcy9JbnB1dFN1cmZhY2UnKSxcbiAgICBTdWJtaXRJbnB1dFN1cmZhY2U6IHJlcXVpcmUoJ2ZhbW91cy9zdXJmYWNlcy9TdWJtaXRJbnB1dFN1cmZhY2UnKSxcbiAgICBUZXh0YXJlYVN1cmZhY2U6IHJlcXVpcmUoJ2ZhbW91cy9zdXJmYWNlcy9UZXh0YXJlYVN1cmZhY2UnKSxcbiAgICBWaWRlb1N1cmZhY2U6IHJlcXVpcmUoJ2ZhbW91cy9zdXJmYWNlcy9WaWRlb1N1cmZhY2UnKVxuICB9LFxuICB0cmFuc2l0aW9uczoge1xuICAgIENhY2hlZE1hcDogcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL0NhY2hlZE1hcCcpLFxuICAgIEVhc2luZzogcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL0Vhc2luZycpLFxuICAgIE11bHRpcGxlVHJhbnNpdGlvbjogcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL011bHRpcGxlVHJhbnNpdGlvbicpLFxuICAgIFNuYXBUcmFuc2l0aW9uOiByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvU25hcFRyYW5zaXRpb24nKSxcbiAgICBTcHJpbmdUcmFuc2l0aW9uOiByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvU3ByaW5nVHJhbnNpdGlvbicpLFxuICAgIFRyYW5zaXRpb25hYmxlOiByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHJhbnNpdGlvbmFibGUnKSxcbiAgICBUcmFuc2l0aW9uYWJsZVRyYW5zZm9ybTogcmVxdWlyZSgnZmFtb3VzL3RyYW5zaXRpb25zL1RyYW5zaXRpb25hYmxlVHJhbnNmb3JtJyksXG4gICAgVHdlZW5UcmFuc2l0aW9uOiByZXF1aXJlKCdmYW1vdXMvdHJhbnNpdGlvbnMvVHdlZW5UcmFuc2l0aW9uJyksXG4gICAgV2FsbFRyYW5zaXRpb246IHJlcXVpcmUoJ2ZhbW91cy90cmFuc2l0aW9ucy9XYWxsVHJhbnNpdGlvbicpXG4gIH0sXG4gIHV0aWxpdGllczoge1xuICAgIEtleUNvZGVzOiByZXF1aXJlKCdmYW1vdXMvdXRpbGl0aWVzL0tleUNvZGVzJyksXG4gICAgVGltZXI6IHJlcXVpcmUoJ2ZhbW91cy91dGlsaXRpZXMvVGltZXInKSxcbiAgICBVdGlsaXR5OiByZXF1aXJlKCdmYW1vdXMvdXRpbGl0aWVzL1V0aWxpdHknKVxuICB9LFxuICB2aWV3czoge1xuICAgIENvbnRleHR1YWxWaWV3OiByZXF1aXJlKCdmYW1vdXMvdmlld3MvQ29udGV4dHVhbFZpZXcnKSxcbiAgICBEZWNrOiByZXF1aXJlKCdmYW1vdXMvdmlld3MvRGVjaycpLFxuICAgIEVkZ2VTd2FwcGVyOiByZXF1aXJlKCdmYW1vdXMvdmlld3MvRWRnZVN3YXBwZXInKSxcbiAgICBGbGV4aWJsZUxheW91dDogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL0ZsZXhpYmxlTGF5b3V0JyksXG4gICAgRmxpcHBlcjogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL0ZsaXBwZXInKSxcbiAgICBHcmlkTGF5b3V0OiByZXF1aXJlKCdmYW1vdXMvdmlld3MvR3JpZExheW91dCcpLFxuICAgIEhlYWRlckZvb3RlckxheW91dDogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL0hlYWRlckZvb3RlckxheW91dCcpLFxuICAgIExpZ2h0Ym94OiByZXF1aXJlKCdmYW1vdXMvdmlld3MvTGlnaHRib3gnKSxcbiAgICBSZW5kZXJDb250cm9sbGVyOiByZXF1aXJlKCdmYW1vdXMvdmlld3MvUmVuZGVyQ29udHJvbGxlcicpLFxuICAgIFNjcm9sbENvbnRhaW5lcjogcmVxdWlyZSgnZmFtb3VzL3ZpZXdzL1Njcm9sbENvbnRhaW5lcicpLFxuICAgIFNjcm9sbGVyOiByZXF1aXJlKCdmYW1vdXMvdmlld3MvU2Nyb2xsZXInKSxcbiAgICBTY3JvbGx2aWV3OiByZXF1aXJlKCdmYW1vdXMvdmlld3MvU2Nyb2xsdmlldycpLFxuICAgIFNlcXVlbnRpYWxMYXlvdXQ6IHJlcXVpcmUoJ2ZhbW91cy92aWV3cy9TZXF1ZW50aWFsTGF5b3V0JylcbiAgfSxcbiAgd2lkZ2V0czoge1xuICAgIE5hdmlnYXRpb25CYXI6IHJlcXVpcmUoJ2ZhbW91cy93aWRnZXRzL05hdmlnYXRpb25CYXInKSxcbiAgICBTbGlkZXI6IHJlcXVpcmUoJ2ZhbW91cy93aWRnZXRzL1NsaWRlcicpLFxuICAgIFRhYkJhcjogcmVxdWlyZSgnZmFtb3VzL3dpZGdldHMvVGFiQmFyJyksXG4gICAgVG9nZ2xlQnV0dG9uOiByZXF1aXJlKCdmYW1vdXMvd2lkZ2V0cy9Ub2dnbGVCdXR0b24nKVxuICB9XG59O1xuIiwidmFyIGNzcyA9IFwiaHRtbCB7XFxuICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4uYmFja2ZhY2VWaXNpYmlsaXR5IHtcXG4gIC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIGJhY2tmYWNlLXZpc2liaWxpdHk6IHZpc2libGU7XFxufVxcblwiOyAocmVxdWlyZShcIi9ob21lL2plbnMvZmFtb3VzL25vZGVfbW9kdWxlcy9jc3NpZnlcIikpKGNzcyk7IG1vZHVsZS5leHBvcnRzID0gY3NzOyIsInZhciBjc3MgPSBcIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXFxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cXG4gKlxcbiAqIE93bmVyOiBtYXJrQGZhbW8udXNcXG4gKiBAbGljZW5zZSBNUEwgMi4wXFxuICogQGNvcHlyaWdodCBGYW1vdXMgSW5kdXN0cmllcywgSW5jLiAyMDE0XFxuICovXFxuXFxuXFxuaHRtbCB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBwYWRkaW5nOiAwcHg7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG59XFxuXFxuYm9keSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIHBhZGRpbmc6IDBweDtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbiAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgLXdlYmtpdC1wZXJzcGVjdGl2ZTogMDtcXG4gICAgcGVyc3BlY3RpdmU6IG5vbmU7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi5mYW1vdXMtY29udGFpbmVyLCAuZmFtb3VzLWdyb3VwIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDBweDtcXG4gICAgbGVmdDogMHB4O1xcbiAgICBib3R0b206IDBweDtcXG4gICAgcmlnaHQ6IDBweDtcXG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG4gICAgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICBiYWNrZmFjZS12aXNpYmlsaXR5OiB2aXNpYmxlO1xcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuXFxuLmZhbW91cy1ncm91cCB7XFxuICAgIHdpZHRoOiAwcHg7XFxuICAgIGhlaWdodDogMHB4O1xcbiAgICBtYXJnaW46IDBweDtcXG4gICAgcGFkZGluZzogMHB4O1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxuICAgIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxufVxcblxcbi5mYW1vdXMtc3VyZmFjZSB7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXIgY2VudGVyO1xcbiAgICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6IGhpZGRlbjtcXG4gICAgYmFja2ZhY2UtdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTogZmxhdDtcXG4gICAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDsgLyogcGVyZm9ybWFuY2UgKi9cXG4gICAgLXdlYmtpdC1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAtbW96LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xcbn1cXG5cXG4uZmFtb3VzLWNvbnRhaW5lci1ncm91cCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXCI7IChyZXF1aXJlKFwiL2hvbWUvamVucy9mYW1vdXMvbm9kZV9tb2R1bGVzL2Nzc2lmeVwiKSkoY3NzKTsgbW9kdWxlLmV4cG9ydHMgPSBjc3M7IiwiLy8gbG9hZCBjc3NcbnJlcXVpcmUoJy4vZmFtb3VzLmNzcycpO1xucmVxdWlyZSgnLi9hcHAuY3NzJyk7XG4iXX0=
