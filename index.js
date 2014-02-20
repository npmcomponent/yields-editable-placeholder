/**
 * dependencies
 */

var classes = require('component-classes')
  , events = require('component-events')
  , raf = require('component-raf')

/**
 * Export `Placeholder`
 */

module.exports = Placeholder;

/**
 * Initialize a new `Placeholder`.
 *
 * @param {Element} el
 * @param {String} str
 */

function Placeholder(el, str){
  if (!(this instanceof Placeholder)) return new Placeholder(el, str);
  this.classes = classes(el);
  this.events = events(el, this);
  this.el = el;
  this.str = str;
  this.bind();
  this.place();
}

/**
 * Place the placeholder.
 *
 * @return {Placeholder}
 */

Placeholder.prototype.place = function(){
  if (this.contents()) return;
  this.classes.add('editable-placeholder');
  this.el.textContent = this.str;
  return this;
};

/**
 * Unplace placeholder.
 *
 * @return {Placeholder}
 */

Placeholder.prototype.unplace = function(){
  this.classes.remove('editable-placeholder');
  this.el.textContent = '';
  return this;
};

/**
 * Check if the placeholder is placed.
 *
 * @return {Placeholder}
 */

Placeholder.prototype.placed = function(){
  return this.classes.has('editable-placeholder')
    && this.str == this.contents();
};

/**
 * Bind internal events.
 *
 * @return {Placeholder}
 */

Placeholder.prototype.bind = function(){
  this.events.bind('keyup', 'onkeydown');
  this.events.bind('paste', 'onkeydown');
  this.events.bind('mousedown');
  this.events.bind('keydown');
  return this;
};

/**
 * Unbind internal events.
 *
 * @return {Placeholder}
 */

Placeholder.prototype.unbind = function(){
  this.events.unbind();
  return this;
};

/**
 * Get inner contents.
 *
 * @return {String}
 */

Placeholder.prototype.contents = function(){
  return this.el.textContent;
};

/**
 * on-mousedown
 */

Placeholder.prototype.onmousedown = function(e){
  if (!this.placed()) return;
  var sel = window.getSelection();
  var range = document.createRange();
  range.setStart(this.el, 0);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  e.preventDefault();
  this.el.focus();
};

/**
 * on-keyup
 */

Placeholder.prototype.onkeydown = function(e){
  var self = this;
  var id;

  // unplace
  if (this.placed()) this.unplace();

  // placeholder
  id = raf(function(){
    raf.cancel(id);
    if ('' != self.contents()) return;
    self.place();
  });
};
