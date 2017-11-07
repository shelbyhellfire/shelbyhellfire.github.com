/*====================================
=            DOM IS READY            =
====================================*/
function goToNextSecFunc(pageId) {
    $('input' + '#' + pageId).click();
    window.location.hash = '';
}
'use strict';

var OnScreen = function (options) {
    this.settings = _.merge(OnScreen.defaults, options);
    this.settings.showThreshold && this.showThreshold();
    this.init();
}

// TODO:
// [ ]  loop through all elements and store their offset
//      this will prevent us from having to loop each element
//      on every scroll
// [ ]  individual stagger
// [ ]  individual duration - could be done in CSS
// [ ]  allow multiple instansiations, if one exists, simply add to it
// https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
// https://www.html5rocks.com/en/tutorials/speed/animations/

OnScreen.prototype = {
    init: function () {
        this.$els = [].slice.call(document.querySelectorAll(this.settings.element));
        this.animate();

        window.addEventListener('scroll', _.throttle(this.animate.bind(this), 50));
    },

    isInView: function (el) {
        var win = $(window),
            $el = $(el),
            viewport = {
                top: win.scrollTop(),
                left: win.scrollLeft()
            };

        viewport.right = (viewport.left + win.width()) - this.settings.threshold.right;
        viewport.bottom = (viewport.top + win.height()) - this.settings.threshold.bottom;
        viewport.top = viewport.top + this.settings.threshold.top;
        viewport.left = viewport.left + this.settings.threshold.left;

        var bounds = $el.offset();
        bounds.right = bounds.left + $el.width();
        bounds.bottom = bounds.top + $el.height();

        return !(
            viewport.right < bounds.left ||
            viewport.left > bounds.right ||
            viewport.bottom < bounds.top ||
            viewport.top > bounds.bottom
        );
    },

    animate: function () {
        var $this = this,
            timer = 0,
            // the following could be better
            visible = { 'visibility': 'visible' },
            hidden = { 'visibility': 'hidden' };

        $.each($this.$els, function () {
            var anim = $(this).data('animation') || $this.settings.animationClass;

            if ($this.isInView(this)) {
                setTimeout(function () {
                    $(this).css(visible).addClass('animated ' + anim);
                }.bind(this), timer)

                timer += $this.settings.stagger;
            } else {
                // prevent removing animation class if stayVisible is true
                !$this.settings.stayVisible && $(this).css(hidden).removeClass(anim).removeClass('animated');
            }

        });
    },

    // this can go away
    showThreshold: function () {
        var top = $('<span class="threshold top" />'),
            right = $('<span class="threshold right" />'),
            bottom = $('<span class="threshold bottom" />'),
            left = $('<span class="threshold left" />');

        top.height(this.settings.threshold.top);
        right.width(this.settings.threshold.right);
        bottom.height(this.settings.threshold.bottom);
        left.width(this.settings.threshold.left);

        $('body').append(top, right, bottom, left);
    }
}

OnScreen.defaults = {
    element: '[data-animation]',
    stagger: 50,
    animationClass: 'flipInX',
    stayVisible: false,
    showThreshold: false,
    // avoid threshold if stayVisible is false
    threshold: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
}

new OnScreen();



/*========================================
=            WINDOW IS LOADED            =
========================================*/
$(window).load(function() {


});


/*=========================================
=            WINDOW IS RESIZED            =
=========================================*/
$(window).resize(function() {

});


/*==========================================
=            WINDOW IS SCROLLED            =
==========================================*/
$(window).scroll(function() {

});


