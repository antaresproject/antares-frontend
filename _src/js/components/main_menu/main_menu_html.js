/*
 * Part of the Antares Project package.
 *
 * NOTICE OF LICENSE
 *
 * Licensed under the 3-clause BSD License.
 *
 * This source file is subject to the 3-clause BSD License that is
 * bundled with this package in the LICENSE file.
 *
 * @package    Files
 * @version    0.9.0
 * @author     Antares Team
 * @license    BSD License (3-clause)
 * @copyright  (c) 2017, Antares Project
 * @link       http://antaresproject.io
 *

 */

// import area
// import { enquire } from 'enquire.js';
import { activeMenuElement } from './active_element';
import menuAim from './../../external/menu_aim';

activeMenuElement.init();

if (window.antaresCfgLocal.menuSimpleSubmenu === true) {
  // menuTopActive = window.antaresCfgLocal.mainMenuType;
  $(() => {
    $('.main-menu-html').addClass('simple-submenu');
  });
}
if (window.antaresCfgLocal.mainMenuType === 'wide') {
  $('#app-wrapper').addClass('main-sidebar--wide');
  $('#app-wrapper').addClass('main-sidebar--expanded');
}
const AntaresMainMenuHtml = {
  init() {
    var self = this;
    if (window.antaresCfgLocal.controlMenu === true) {
      this.controlMenu();
    }
    this.documentReady();
    this.mobileDisabledTopMenu();
    this.openSubmenu();
    this.openSecondMenu();
    this.mobileOpenMenu();
    this.mobileOpenBottomMenu();
    this.tooltips();
    this.moreTriggerTopHeight();
    this.footerWidthTopMode();
    this.menuAsideCategoryActiveScroll();
    this.openFirstLink();
    window.requestAnimationFrame(() => {
      self.resize();
    });
  },
  controlMenu() {
    function checkMenuType() {
      function getCookie(cookie_name) {
        var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');
        if (results) return unescape(results[2]);
        else return null;
      }

      if (getCookie('statusMenu') === 'standard') {
        window.antaresCfgLocal.statusMenuList.menuStandard = true;
        window.antaresCfgLocal.statusMenuList.menuTop = false;
        window.antaresCfgLocal.statusMenuList.menuWide = false;
        $('#standard-menu').attr('checked', 'checked');
      } else if (getCookie('statusMenu') === 'top') {
        window.antaresCfgLocal.statusMenuList.menuStandard = false;
        window.antaresCfgLocal.statusMenuList.menuTop = true;
        window.antaresCfgLocal.statusMenuList.menuWide = false;
        $('#top-menu').attr('checked', 'checked');
      } else if (getCookie('statusMenu') === 'wide') {
        window.antaresCfgLocal.statusMenuList.menuStandard = false;
        window.antaresCfgLocal.statusMenuList.menuTop = false;
        window.antaresCfgLocal.statusMenuList.menuWide = true;
        $('#wide-menu').attr('checked', 'checked');
        $('#app-wrapper').addClass('main-sidebar--wide');
        $('#app-wrapper').addClass('main-sidebar--expanded');
      }
    }

    checkMenuType();
    function changeViewMenu() {
      function createCookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
        var cookie_string = name + '=' + escape(value);

        if (exp_y) {
          var expires = new Date(exp_y, exp_m, exp_d);
          cookie_string += '; expires=' + expires.toGMTString();
        }

        if (path) cookie_string += '; path=' + escape(path);

        if (domain) cookie_string += '; domain=' + escape(domain);

        if (secure) cookie_string += '; secure';

        document.cookie = cookie_string;
      }

      function deleteCookie(cookie_name) {
        var cookie_date = new Date(); // Текущая дата и время
        cookie_date.setTime(cookie_date.getTime() - 1);
        document.cookie = cookie_name += '=; expires=' + cookie_date.toGMTString();
      }

      deleteCookie('statusMenu');
      if (
        $('#standard-menu')
          .closest('.iradio_billevo')
          .hasClass('checked')
      ) {
        console.log('must create standard');
        createCookie('statusMenu', 'standard');
      } else if (
        $('#top-menu')
          .closest('.iradio_billevo')
          .hasClass('checked')
      ) {
        console.log('must create top');
        createCookie('statusMenu', 'top');
      } else if (
        $('#wide-menu')
          .closest('.iradio_billevo')
          .hasClass('checked')
      ) {
        console.log('must create wide');
        createCookie('statusMenu', 'wide');
      }
      location.reload();
    }

    $('.control-menu-panel').css('display', 'flex');

    $('.control-menu-panel .btn').click(function() {
      changeViewMenu();
    });

    $('.control-menu-panel .zmdi-plus').click(function() {
      if ($('.control-menu-panel').hasClass('control-menu-panel--open')) {
        $('.control-menu-panel').removeClass('control-menu-panel--open');
      } else {
        $('.control-menu-panel').addClass('control-menu-panel--open');
      }
    });
  },
  resize() {
    var self = this;
    $(window).resize(
      _.debounce(function() {
        self.moreTriggerTopHeight();
      }, 300)
    );
  },
  moreTriggerTopHeight() {
    if ($('#app-wrapper').hasClass('main-sidebar--top')) {
      enquire.register('screen and (min-width: 1024px)', {
        //dla tableta
        match: function() {
          window.requestAnimationFrame(() => {
            var widthLi = 0;
            var menuLength;
            var widthOneLi;
            var i;
            if ($('.menu-scroll').hasClass('open-second-menu')) {
              menuLength = $('.menu-scroll> ul.main-menu--secondary > li').length;
              for (i = 0; i < menuLength; i++) {
                widthOneLi = $($('ul.main-menu--secondary > li')[i]).width() + 32; // 32===margins
                widthLi += widthOneLi;
              }
            } else {
              menuLength = $('.menu-scroll> ul.main-menu--primary > li').length;
              for (i = 0; i < menuLength; i++) {
                widthOneLi = $($('ul.main-menu--primary > li')[i]).width() + 32;
                widthLi += widthOneLi;
              }
            }
            var menuWidth = widthLi + $('.menu-scroll .main-menu--brand').width() + $('.menu-scroll .main-menu--brand').offset().left + 30;
            $('.more-trigger').css('left', menuWidth);
            $('.more-trigger').css('opacity', '1');
          });
        },
        unmatch: function() {
          $('.more-trigger').css('left', '50%');
        }
      });
    }
  },
  documentReady() {
    var self = this;
    if ($('#app-wrapper').hasClass('main-sidebar--top')) {
      enquire.register('screen and (min-width: 1024px)', {
        match: function() {
          $('.main-menu--secondary>li').css('opacity', '0'); //for animation
          $('.main-menu--primary>li').css('opacity', '1'); //for animation
        }
      });
    } else {
      $('.main-menu--secondary>li').css('opacity', '0'); //for animation
      $('.main-menu--primary>li').css('opacity', '1'); //for animation
    }
  },
  openSubmenu() {
    if ($('#app-wrapper').hasClass('main-sidebar--top')) {
      enquire.register('screen and (max-width: 1023px)', {
        match: function() {
          var parent = $('.main-menu-html');
          parent.find('.has-submenu').click(function() {
            if ($('#app-wrapper').hasClass('main-sidebar--top--mobile')) {
              if ($(this).hasClass('submenu-open')) {
                $(this).removeClass('submenu-open');
                $(this)
                  .parent()
                  .removeClass('li-submenu-open');
                parent.find('nav').removeClass('submenu-is-active');
              } else {
                $('.main-menu').removeClass('li-submenu-open');
                $('.main-menu .has-submenu').removeClass('submenu-open');
                $(this).addClass('submenu-open');
                $(this)
                  .parent()
                  .addClass('li-submenu-open');
                parent.find('nav').addClass('submenu-is-active');
              }
            }
          });
        }
      });
      enquire.register('screen and (min-width: 1024px)', {
        match: function() {
          var li = $('.main-menu').find('>li');

          $('.main-menu').each(function() {
            $(this).menuAim({
              activate: activateSubmenu,
              exitMenu: deactivateSubmenu,
              rowSelector: '> li',
              submenuSelector: '*',
              submenuDirection: 'below'
            });
          });

          function activateSubmenu(row) {
            var currentLi = $(row);
            li.removeClass('hovered');
            currentLi.addClass('hovered');
            //if has submenu
            if (currentLi.children('.submenu').length) {
              li.removeClass('submenu-open');
              currentLi.addClass('submenu-open');
            } else {
              li.removeClass('submenu-open');
            }
          }

          function deactivateSubmenu() {
            li.removeClass('submenu-open');
            li.removeClass('hovered');
            return true;
          }
        },
        unmatch: function() {
          $('.main-menu').menuAim('destroy');
          var parent = $('.main-menu-html');
          // parent.find('.has-submenu').click(function () {
          //     if ($(this).hasClass('submenu-open')) {
          //         $(this).removeClass('submenu-open');
          //         $(this).parent().removeClass('li-submenu-open');
          //         parent.find('nav').removeClass('submenu-is-active');
          //     } else {
          //         $('.main-menu').removeClass('li-submenu-open')
          //         $('.main-menu .has-submenu').removeClass('submenu-open')
          //         $(this).addClass('submenu-open');
          //         $(this).parent().addClass('li-submenu-open');
          //         parent.find('nav').addClass('submenu-is-active');
          //     }
          // });
        }
      });
    } else {
      enquire.register('screen and (max-width: 1023px)', {
        match: function() {
          var parent = $('.main-menu-html');
          parent.find('.has-submenu').on('click', function() {
            if ($(this).hasClass('submenu-open')) {
              $(this).removeClass('submenu-open');
              $(this)
                .parent()
                .removeClass('li-submenu-open');
              parent.find('nav').removeClass('submenu-is-active');
            } else {
              $('.main-menu').removeClass('li-submenu-open');
              $('.main-menu .has-submenu').removeClass('submenu-open');
              $(this).addClass('submenu-open');
              $(this)
                .parent()
                .addClass('li-submenu-open');
              parent.find('nav').addClass('submenu-is-active');
            }
          });
        },
        unmatch: function() {
          $('.has-submenu').off('click');
        }
      });
      enquire.register('screen and (min-width: 1024px)', {
        match: function() {
          var li = $('.main-menu').find('>li');

          $('.main-menu').each(function() {
            $(this).menuAim({
              activate: activateSubmenu,
              exitMenu: deactivateSubmenu,
              rowSelector: '> li',
              submenuSelector: '*',
              submenuDirection: 'right'
            });
          });

          function activateSubmenu(row) {
            var currentLi = $(row);
            li.removeClass('hovered');
            currentLi.addClass('hovered');
            //if has submenu
            if (currentLi.children('.submenu').length) {
              li.removeClass('submenu-open');
              currentLi.addClass('submenu-open');
            } else {
              li.removeClass('submenu-open');
            }
          }

          function deactivateSubmenu() {
            li.removeClass('submenu-open');
            li.removeClass('hovered');
            return true;
          }
        },
        unmatch: function() {
          $('.main-menu').menuAim('destroy');
        }
      });
    }
  },
  openSecondMenu() {
    var self = this;
    var parent = $('.main-menu-html'),
      openSecond = false,
      statusAnimation = false;
    let openMenu = $('aside.main-sidebar').attr('data-menu-on-load');
    parent.find('.more-trigger__inner').click(function() {
      if (statusAnimation === false) {
        if ($('.more-trigger').hasClass('is-expanded')) {
          $('.more-trigger').removeClass('is-expanded');
          openSecond = false;
          $('aside.main-sidebar').attr('data-menu-on-load', 'primary');
          //ANIMATION SECOND TO FIRST
          parent.css('overflow', 'hidden');
          statusAnimation = true;
          $('.nav-container').addClass('animation-active');
          if (statusAnimation === true) {
            $('.more-trigger').addClass('ripple-off-active');
            setTimeout(function() {
              $('.main-menu--secondary>li').css('opacity', '0');
              self.moreTriggerTopHeight();
              parent.css('background-color', '#30343d');
              $('.main-menu--primary>li').css('opacity', '1');
            }, 50);
            setTimeout(function() {
              statusAnimation = false;
              $('.nav-container').removeClass('animation-active');
              $('.more-trigger').removeClass('ripple-off-active');
            }, 500);
          }
          setTimeout(function() {
            parent.css('overflow', 'visible');
          }, 500);

          //ANIMATION SECOND TO FIRST     END
        } else {
          $('.more-trigger').addClass('is-expanded');
          openSecond = true;
          $('aside.main-sidebar').attr('data-menu-on-load', 'secondary');
          //ANIMATION FIRST TO SECOND
          parent.css('overflow', 'hidden');
          statusAnimation = true;
          $('.nav-container').addClass('animation-active');
          if (statusAnimation === true) {
            $('.more-trigger').addClass('ripple-on-active');
            $('.main-menu--primary>li').css('opacity', '0');
            window.requestAnimationFrame(() => {});
            setTimeout(function() {
              self.moreTriggerTopHeight();
              parent.css('background-color', 'rgb(62, 73, 84)');
            }, 50);
            setTimeout(function() {
              $('.main-menu--secondary>li').css('opacity', '1');
            }, 300);
            setTimeout(function() {
              statusAnimation = false;
              $('.nav-container').removeClass('animation-active');
              $('.more-trigger').removeClass('ripple-on-active');

              //   $('.main-menu--secondary>li').css('opacity', '1');
            }, 500);
          }
          setTimeout(function() {
            parent.css('overflow', 'visible');
          }, 500);
          //ANIMATION FIRST TO SECOND    END
        }
        if (openSecond === false) {
          parent.find('.menu-scroll').removeClass('open-second-menu');
          parent.find('.has-submenu').removeClass('submenu-open');
          parent.find('nav').removeClass('submenu-is-active');
        } else {
          parent.find('.menu-scroll').addClass('open-second-menu');
          parent.find('nav').removeClass('submenu-is-active');
        }
      }
    });
    function openSecondaryMenu() {
      if (openMenu === 'secondary') {
        if (statusAnimation === false) {
          if ($('.more-trigger').hasClass('is-expanded')) {
            $('.more-trigger').removeClass('is-expanded');
            openSecond = false;
            $('aside.main-sidebar').attr('data-menu-on-load', 'primary');
            //ANIMATION SECOND TO FIRST
            statusAnimation = true;
            if (statusAnimation === true) {
              $('.main-menu--secondary>li').css('opacity', '0');
              setTimeout(function() {
                self.moreTriggerTopHeight();
              }, 100);
              parent.css('background-color', '#30343d');
              $('.main-menu--primary>li').css('opacity', '1');
              statusAnimation = false;
            }
            //ANIMATION SECOND TO FIRST     END
          } else {
            $('.more-trigger').addClass('is-expanded');
            openSecond = true;
            $('aside.main-sidebar').attr('data-menu-on-load', 'secondary');
            //ANIMATION FIRST TO SECOND
            statusAnimation = true;
            if (statusAnimation === true) {
              $('.main-menu--secondary>li').css('opacity', '1');
              $('.main-menu--primary>li').css('opacity', '0');
              setTimeout(function() {
                self.moreTriggerTopHeight();
              }, 100);
              parent.css('background-color', 'rgb(62, 73, 84)');
              statusAnimation = false;
            }
            //ANIMATION FIRST TO SECOND    END
          }
          if (openSecond === false) {
            parent.find('.menu-scroll').removeClass('open-second-menu');
            parent.find('.has-submenu').removeClass('submenu-open');
            parent.find('nav').removeClass('submenu-is-active');
          } else {
            parent.find('.menu-scroll').addClass('open-second-menu');
            parent.find('nav').removeClass('submenu-is-active');
          }
        }
      }
    }
    openSecondaryMenu();
    $('.main-sidebar nav').css('opacity', 1);

    enquire.register(bpTabHMax1023, {
      unmatch: function() {
        $('.menu-scroll').removeClass('open-second-menu');
        $('.has-submenu').removeClass('submenu-open');
        $('nav').removeClass('submenu-is-active');
        $('.more-trigger').removeClass('is-expanded');
        $('aside.main-menu-html').css('background-color', 'rgb(48, 52, 61)');
        openSecondaryMenu();
      }
    });
    enquire.register(bpTabHMin1024, {
      unmatch: function() {
        $('.menu-scroll').removeClass('open-second-menu');
        $('.has-submenu').removeClass('submenu-open');
        $('nav').removeClass('submenu-is-active');
        $('.more-trigger').removeClass('is-expanded');
        $('aside.main-menu-html').css('background-color', 'rgb(48, 52, 61)');
        $('.main-menu--primary li').css('opacity', '1');
        $('.burgericon').removeClass('active');
      }
    });
  },

  mobileOpenMenu() {
    var parent = $('.main-menu-html');
    $('.burgericon').click(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('#app-wrapper').removeClass('mobile-menu-active');
        $('#app-wrapper').addClass('overflow-hidden');
        setTimeout(function() {
          $('#app-wrapper').removeClass('overflow-hidden');
        }, 400);
      } else {
        $(this).addClass('active');
        $('#app-wrapper').addClass('mobile-menu-active');
      }
    });
    $('.main-content, .main-head>*:not(.burgericon)').click(function() {
      if ($('#app-wrapper').hasClass('mobile-menu-active')) {
        $('.burgericon').removeClass('active');
        $('#app-wrapper').removeClass('mobile-menu-active');
        $('#app-wrapper').addClass('overflow-hidden');
        setTimeout(function() {
          $('#app-wrapper').removeClass('overflow-hidden');
        }, 400);
      }
    });
  },
  footerWidthTopMode() {
    if ($('#app-wrapper').hasClass('main-sidebar--top')) {
      function resizeFooterTop() {
        let width, widthSideMenu;
        width = $('.main-content').width();
        widthSideMenu = $('.grid-col--menu').width();
        if ($('.app-content').hasClass('page-single-form')) {
          enquire.register('screen and (min-width:768px)', {
            match: function() {
              $('.app-content__footer').css('width', width);
            }
          });
        } else {
          enquire.register('screen and (min-width: 1200px)', {
            match: function() {
              $('.app-content__footer').css('width', width - widthSideMenu);
              $('.notification-templates .app-content__footer').css('width', width);
            }
          });
          enquire.register('screen and (min-width:768px) and (max-width: 1199px)', {
            match: function() {
              $('.app-content__footer').css('width', width);
            }
          });
        }
      }

      setTimeout(function() {
        resizeFooterTop();
      }, 700);
      $(window).resize(
        _.debounce(function() {
          resizeFooterTop();
        }, 300)
      );
    }
  },

  menuAsideCategoryActiveScroll() {
    let coef = 0;
    var lastScrollTop = 0;
    var el = $('.menu-aside-container');

    function updateMenuAsideActive() {
      enquire.register('screen and (min-width: 1200px)', {
        //mobile readonly for multiple
        match: function() {
          let scrollOnPage = $('.app-content')[0].scrollTop;
          var toTop = $('.main-head').outerHeight(),
            isPositionFixed = el.css('position') === 'fixed';
          if (scrollOnPage > toTop && !isPositionFixed) {
            el.addClass('menu-aside-container--fixed');
          }
          if (scrollOnPage < toTop && isPositionFixed) {
            el.removeClass('menu-aside-container--fixed');
          }
          let allFormsA = $('section.generals-form a[name]');
          if (scrollOnPage > $('.app-content')[0].scrollHeight - $(document).height() - 400) {
            if (scrollOnPage > lastScrollTop) {
              coef += $(document).height() / 5;
              if (coef > $(document).height()) {
                coef = $(document).height();
              }
            } else {
              coef -= $(document).height() / 5;
              if (coef <= 0) {
                coef = 0;
              }
            }
            if (scrollOnPage !== $('.app-content')[0].scrollHeight - $(document).height()) {
              lastScrollTop = scrollOnPage;
            }
          } else if (scrollOnPage <= $('.app-content')[0].scrollHeight - $(document).height() - 400) {
            coef = 0;
          }
          for (let i = 0; i < allFormsA.length; i++) {
            let thisA = allFormsA[i];
            let menuAside = $('.menu-aside');

            if (scrollOnPage > $(thisA).position().top - coef) {
              for (let i = 0; i < menuAside.find('a[href]').length; i++) {
                if (
                  $(menuAside.find('a[href]')[i])
                    .attr('href')
                    .slice(1) === $(thisA).attr('name')
                ) {
                  menuAside.find('li').removeClass('is-active');
                  $(menuAside.find('li')[i]).addClass('is-active');
                  $(menuAside.find('li')[i])
                    .parent('.menu-aside__submenu')
                    .closest('li')
                    .addClass('is-active');
                }
              }
            }
          }
        },
        unmatch: function() {
          $('.menu-aside-container').removeClass('menu-aside-container--fixed');
        }
      });
    }

    $('.app-content').on('ps-scroll-y', () => {
      window.requestAnimationFrame(() => {
        updateMenuAsideActive();
      });
    });

    $('.grid-container.grid-container--2col .grid-col--menu .menu-aside:not(.menu-aside--links) li:not(.has-submenu) a').on('click touchstart', function(e) {
      window.requestAnimationFrame(() => {
        let scrollOnPage = $('.app-content')[0].scrollTop;
        el.find('li').removeClass('is-active');
        $(this)
          .closest('li')
          .addClass('is-active');
        if (scrollOnPage >= 100) {
          el.addClass('menu-aside-container--fixed');
          lastScrollTop = scrollOnPage;
        }
      });
    });
  },
  mobileOpenBottomMenu() {
    if ($('#app-wrapper').hasClass('main-sidebar--top')) {
      var parent = $('.main-menu-html');
      parent.find('.mobile-ddowns__sgl').click(function() {
        if ($(this).hasClass('mobile-ddowns__sgl--open')) {
          $(this).removeClass('mobile-ddowns__sgl--open');
          if ($(this).hasClass('ddown--logged')) {
            $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
          } else {
            $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
          }
        } else {
          $(this).addClass('mobile-ddowns__sgl--open');
          if ($(this).hasClass('ddown--logged')) {
            $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
          } else {
            $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
          }
        }
      });
      $(document).mouseup(function(e) {
        var container = $('.mobile-ddowns');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
          $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
        }
      });
    } else {
      enquire.register('screen and (max-width: 1023px)', {
        match: function() {
          var parent = $('.main-menu-html');
          parent.find('.mobile-ddowns__sgl').click(function() {
            if ($(this).hasClass('mobile-ddowns__sgl--open')) {
              $(this).removeClass('mobile-ddowns__sgl--open');
              if ($(this).hasClass('ddown--logged')) {
                $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
              } else {
                $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
              }
            } else {
              $(this).addClass('mobile-ddowns__sgl--open');
              if ($(this).hasClass('ddown--logged')) {
                $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
              } else {
                $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
              }
            }
          });
          $(document).mouseup(function(e) {
            var container = $('.mobile-ddowns');
            if (!container.is(e.target) && container.has(e.target).length === 0) {
              $('.ddown--brand').removeClass('mobile-ddowns__sgl--open');
              $('.ddown--logged').removeClass('mobile-ddowns__sgl--open');
            }
          });
        }
      });
    }
  },
  tooltips() {
    require('./../menu_tooltips/menu_tooltips.js');
  },
  mobileDisabledTopMenu() {
    if ($('#app-wrapper').hasClass('main-sidebar--top')) {
      enquire.register('screen and (max-width: 1023px)', {
        //dla tablet
        match: function() {
          $('#app-wrapper').removeClass('main-sidebar--top');
          $('#app-wrapper').addClass('main-sidebar--top--mobile');
          setTimeout(function() {
            $('aside.main-menu-html').addClass('transition-300');
          }, 500);
        },
        unmatch: function() {
          $('aside.main-menu-html').removeClass('transition-300');
          $('#app-wrapper').addClass('main-sidebar--top');
          $('#app-wrapper').removeClass('main-sidebar--top--mobile');
          $('#app-wrapper').removeClass('mobile-menu-active');
        }
      });
      enquire.register('screen and (min-width: 1024px)', {
        //dla tablet
        match: function() {
          $('#app-wrapper').addClass('main-sidebar--top');
        }
      });
    } else {
      enquire.register('screen and (max-width: 1023px)', {
        match: function() {
          setTimeout(function() {
            $('aside.main-menu-html').addClass('transition-300');
          }, 500);
        },
        unmatch: function() {
          $('aside.main-menu-html').removeClass('transition-300');
        }
      });
    }
  },
  openFirstLink() {
    function addLinkToMainLinkMenu(status) {
      $('aside.main-menu-html ul li.has-submenu').each(function() {
        let self = $(this);
        if (status === true) {
          let thisLink = self.find('.submenu div.submenu__content ul:first-of-type>li:first-of-type>a').attr('href');
          self.children('a').attr('href', thisLink);
        } else if (status === false) {
          self.children('a').removeAttr('href');
        }
      });
    }
    if ($('html').hasClass('is-mobile') || $('html').hasClass('is-tablet')) {
      addLinkToMainLinkMenu(false);
    } else {
      addLinkToMainLinkMenu(true);
    }
    enquire.register('screen and (min-width: 1024px)', {
      match: function() {
        addLinkToMainLinkMenu(true);
      },
      unmatch: function() {
        addLinkToMainLinkMenu(false);
      }
    });
  }
};

$(() => {
  window.AntaresMainMenuHtml = AntaresMainMenuHtml;
  AntaresMainMenuHtml.init();
});