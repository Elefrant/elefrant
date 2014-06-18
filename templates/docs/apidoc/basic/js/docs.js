/*global $:false */
/*global document:false */

'use strict';

$(document).ready(function () {
    /*** Affix menu ***/
    $('#sidenav').affix({
        offset: {
            top: function () {
                return $('header').outerHeight(true);
            },
            bottom: function () {
                return $('footer').outerHeight(true);
            }
        }
    });

    /*** Offcanvas menu ***/
    $('[data-toggle=offcanvas]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });
});
