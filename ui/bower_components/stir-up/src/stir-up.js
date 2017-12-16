var StirUp = function (namespace, exports) {

    // Determining whether to add the markup methods to an existing object (like window) and/or returned.
    exports = (typeof exports === 'undefined') ? {} : exports;

    // Helper method to iterate collections and generate markup for each item.
    exports.iterate = function (c, callback) {
        return {
            collection: c,
            _iterate: callback,
            make: function () {
                if (c != null) {
                    var markup = []
                    for (var z = 0; z < this.collection.length; z++) {
                        markup.push(
                            this._iterate(
                                this.collection[z]
                            )
                        );
                    }
                    return markup.join('');
                } else {
                    return '';
                }
            }
        }
    };

    exports.when = function (expr) {
        return {
            _show: expr,
            recipe: expr ? Array.prototype.slice.call(arguments, 1) : [],
            make: function () {
                if (this._show) {
                    var markup = []
                    build([], markup, this.recipe);
                    return markup.join('');
                } else {
                    return '';
                }
            }
        }
    };

    // Create an element attribute.
    exports.attr = function (name, value) {
        return {
            _make_attribute: function () {
                if (name && value) {
                    return name + '="' + value + '"';
                } else {
                    return name;
                }
            }
        };
    };

    function build(attributes, markup, recipe) {
        for (var n = 0; n < recipe.length; n++) {
            if (recipe[n].hasOwnProperty('_make_attribute')) {
                attributes.push(recipe[n]._make_attribute());
            } else if (recipe[n].hasOwnProperty('_show') && recipe[n]._show !== false) {
                build(attributes, markup, recipe[n].recipe);
            } else if (typeof recipe[n] === 'string') {
                markup.push(recipe[n]);
            } else if (recipe[n].hasOwnProperty('make')) {
                markup.push(recipe[n].make());
            }
        }
    };

    // Create an element with a particular name. Helper methods will then be created based on the namespace/attributes.
    exports.el = function (name) {
        // var self = this;
        var attributes = [];
        var markup = [];

        for (var i = 1; i < arguments.length; i++) {
            if (Object.prototype.toString.call(arguments[i]) === '[object Arguments]') {
                build(attributes, markup, arguments[i]);
            } else {
                // console.log(JSON.stringify(Array.prototype.slice.call(arguments, 1)))
                build(attributes, markup, Array.prototype.slice.call(arguments, 1));
                break;
            }
        }

        return {
            prepend: function (el) {
                markup.unshift(el.make());
            },
            append: function (el) {
                markup.push(el.make());
            },
            set: function (attr) {
                attributes.push(attr._make_attribute());
            },
            make: function () {
                return '<' + name + (attributes.length > 0 ? ' ' + attributes.join(' ') : '') + '>' + markup.join('') + '</' + name + '>';
            }
        };
    };

    // TODO Temporary solution to ensure we do not add reserved words
    var reserved = ['break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield'];
    var elements = (namespace.constructor === Array ? namespace : namespace.elements);
    var attrs = (namespace.constructor === Array ? [] : namespace.attributes);

    // Generating helper methods for all the tag/element names specified by the namespace object.
    var self = this;
    for (var e = 0; e < elements.length; e++) {
        register(elements[e], new Function('return self.el(\'' + elements[e] + '\', arguments);'));
    }

    // Generating helper methods for any attributes if specified.
    for (var a = 0; a < attrs.length; a++) {
        register(attrs[a], new Function('value', 'return self.attr(\'' + attrs[a] + '\', value);'));
    }

    function register(name, func) {
        name = safe_name(name);
        // Supporting namespace prefixes if appropriate
        name = name.split(':');
        exports[name[0]] = exports[name[0]] ? exports[name[0]] : {};
        name.length == 1 ? exports[name[0]] = func : exports[name[0]][name[1]] = func;
    }

    function safe_name(name) {
        // Try and replace non allowed characters
        // TODO This should probably throw some errors?
        name = name.replace(/-/, '_');
        return (((exports.hasOwnProperty(name) || reserved.indexOf(name) > -1) && !exports.hasOwnProperty('_' + name)) ? '_' + name : name);
    }

    return exports;

};
