/**
 * http://webreflection.blogspot.nl/2009/03/ie8-global-constants-via-defineproperty.html
 * http://blogs.msdn.com/b/ie/archive/2010/09/07/transitioning-existing-code-to-the-es5-getter-setter-apis.aspx
 */
if(!Object.defineProperty && Object.prototype.__defineGetter__) {
    Object.defineProperty = function(obj, prop, config){
        if (config.get) {
            obj.__defineGetter__(prop, config.get);
        }
        if (config.set) {
            obj.__defineSetter__(prop, config.set);
        }
    };
}