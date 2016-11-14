function Popup(html, options) {
  return new PopupClass(html, options)
}

Popup.defaultConfig = {width: 300}

function PopupClass(html, options) {
  contents = $(html)
  this.popupWindow = $('<div class="popup"></div>')

  options = $.extend({}, Popup.defaultConfig, options || {})
  if ((typeof options.width) === "number") {
    widthString = options.width.toString() + 'px'
  } else {
    widthString = options.width
  }
  this.popupWindow.css({
    'width': widthString,
    'margin-left': (options.width/2 * -1).toString() + 'px'
  })
  this.popupWindow.append(contents)
}

PopupClass.prototype.distanceFromTop = function () {
  return ($(window).height() - this.popupWindow.height())/2
}
PopupClass.prototype.move = function (from, to, callback) {
  this.popupWindow.css('top', from)
  this.popupWindow.animate({top: to}, callback)
}

PopupClass.prototype.show = function (direction, callback) {
  $('body').append(this.popupWindow)
  this.popupWindow.css({
    'margin-left': (this.popupWindow.width() / 2 * -1).toString() + 'px'
  })
  startFrom = (direction == 'up') ? '180%' : '-80%'
  this.move(startFrom, this.distanceFromTop(), callback)
  return this;
}
PopupClass.prototype.hide = function (direction) {
  moveTo = (direction == 'down') ? '180%' : '-80%'
  this.move(this.distanceFromTop(), moveTo, function () {
    this.remove() // this == $('.popup') here
  })
}
