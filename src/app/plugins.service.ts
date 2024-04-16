import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class PluginsService {
  public $: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.$ = $;
    }
  }

  public index(): void {
    if (this.$) {
      this.loaderInit();
    }
  }

  public dashboardIndex(): void {
    this.sideBarToggle(this.$);
    this.navBarAction(this.$);
    this.wrapperMenuToggle(this.$);
    //this.fullscreen(this.$);
    //this.accordionToggle(this.$);
  }

  // Function for toggle page Loader...
  public loaderInit(): void {
    this.$('#load').fadeOut();
    this.$('#loading').delay(1000).fadeOut('slow');
  }

  public checkElement(type: any, element: any): boolean | void {
    if (this.$) {
      let found = false;
      let elements;
      switch (type) {
        case 'class':
          elements = document.getElementsByClassName(element);

          if (
            elements !== undefined &&
            elements !== null &&
            elements.length > 0
          ) {
            found = true;
          }
          break;

        case 'id':
          elements = document.getElementById(element);

          if (elements !== undefined && elements !== null) {
            found = true;
          }
          break;
      }

      return found;
    }
  }

  public sideBarToggle($: any): void {
    const elementExist = this.checkElement('class', 'iq-sidebar-menu');

    //   if (elementExist) {
    // $(document).on('click', '.iq-sidebar-menu li', function() {
    //   if ($(this).hasClass('menu-open')) {
    //     $(this).find('.iq-submenu').slideUp('slow');
    //     $(this).removeClass('menu-open');
    //     if (!$(this).find('.iq-submenu.menu-open .menu-open').length) {
    //       $(this).find('.menu-open').removeClass('menu-open');
    //     } else {
    //       $(this).find('.iq-submenu').removeClass('menu-open');
    //     }
    //   } else if ($(this).find('.iq-submenu').length) {
    //     $(this).find('.iq-submenu').slideDown('slow');
    //     $(this).addClass('menu-open');
    //     $(this).find('.iq-submenu').addClass('menu-open');
    //   }
    // });
    //}
  }

  public navBarAction($: any) {
    //console.log('navBarAction', $);
    if (this.$) {
      $(document).on('click', function (e: any) {
        const myTargetElement = e.target;
        // tslint:disable-next-line:one-variable-per-declaration
        let selector, mainElement;
        if (
          $(myTargetElement).hasClass('search-toggle') ||
          $(myTargetElement).parent().hasClass('search-toggle') ||
          $(myTargetElement).parent().parent().hasClass('search-toggle')
        ) {
          if ($(myTargetElement).hasClass('search-toggle')) {
            selector = $(myTargetElement).parent();
            mainElement = $(myTargetElement);
          } else if ($(myTargetElement).parent().hasClass('search-toggle')) {
            selector = $(myTargetElement).parent().parent();
            mainElement = $(myTargetElement).parent();
          } else if (
            $(myTargetElement).parent().parent().hasClass('search-toggle')
          ) {
            selector = $(myTargetElement).parent().parent().parent();
            mainElement = $(myTargetElement).parent().parent();
          }
          if (
            !mainElement.hasClass('active') &&
            $('.navbar-list li').find('.active')
          ) {
            $('.navbar-list li').removeClass('iq-show');
            $('.navbar-list li .search-toggle').removeClass('active');
          }

          selector.toggleClass('iq-show');
          mainElement.toggleClass('active');

          e.preventDefault();
        } else if ($(myTargetElement).is('.search-input')) {
        } else {
          $('.navbar-list li').removeClass('iq-show');
          $('.navbar-list li .search-toggle').removeClass('active');
        }
      });
    }
  }

  public wrapperMenuToggle($: any) {
    const elementExist = this.checkElement('class', 'wrapper-menu');
    if (elementExist) {
      const wrapperMenu = document.querySelectorAll('.wrapper-menu');
      const body = document.querySelector('body');
      for (let i = 0; i < wrapperMenu.length; i++) {
        wrapperMenu[i].addEventListener('click', function () {
          wrapperMenu[i].classList.toggle('open');
          body?.classList.toggle('sidebar-main');
        });
      }
    }
  }

  // public fullscreen($) {
  //   const elementExist = this.checkElement('class', 'iq-full-screen');
  //   if (elementExist) {
  //     $(document).on('click', '.iq-full-screen', function() {
  /*const elem = $(this);
        if (!document.fullscreenElement &&
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
        elem.find('i').toggleClass('ri-fullscreen-line').toggleClass('ri-fullscreen-exit-line');*/
  //     });
  //   }
  // }

  // public apexChart(element, chartOption) {
  //   const selector = '#' + element;
  //   if (chartOption !== undefined) {
  //     const chart = new ApexCharts(document.querySelector(selector), chartOption);
  //     chart.render();
  //   }
  // }

  // public accordionToggle($) {
  //   $('.iq-accordion .iq-accordion-block .accordion-details').hide();
  //   $('.iq-accordion .iq-accordion-block:first').addClass('accordion-active').children().slideDown('slow');
  //   $(document).on('click', '.iq-accordion .iq-accordion-block', function() {
  //       if ($(this).children('div.accordion-details ').is(':hidden')) {
  //           $('.iq-accordion .iq-accordion-block').removeClass('accordion-active').children('div.accordion-details ').slideUp('slow');
  //           $(this).toggleClass('accordion-active').children('div.accordion-details ').slideDown('slow');
  //       }
  //   });
  // }

  // public getActiveLink(item, activeRoute) {
  //   let active = false;
  //   if (item.children !== undefined) {
  //     item.children.filter((child) => {
  //       if (child.link === activeRoute) {
  //         active = true;
  //       }
  //     });
  //   } else {
  //     if (item.link === activeRoute) {
  //       active = true;
  //     }
  //   }
  //   return active;
  // }
}
