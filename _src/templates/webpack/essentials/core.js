import { antaresCfg } from './../../../config/antares_cfg';

if (antaresCfg.performanceMode === true) {
  window.t0 = performance.now();
}

// WEBPACK CONFIG RELATED:
// import * as OfflinePluginRuntime from 'offline-plugin/runtime';
// OfflinePluginRuntime.install();

// EXTERNAL DEPS:
import './../../../js/components/preloader/preloader';
import './../../../js/external/material.min';
// APP COMPONENTS:
import './../../../js/components/mutation_observer/mutation_observer';
import './../../../js/antares_notifications';
import './../../../js/antares_mechanics';
import './../../../js/components/dropdowns/ddown_general';
import './../../../js/components/dropdowns/ddown_single';
import './../../../js/components/dropdowns/ddown_multi';
import './../../../js/components/menu_aside/menu_aside';
import '../../../js/components/main_menu/main_menu_html';
import './../../../js/components/auto_complete/auto_complete';
import './../../../js/components/browser_hooks/browser_hooks';
import './../../../js/components/truncator/truncator';
import './../../../js/components/debouncer/debouncer';
import './../../../js/components/dropdowns/dropjs';
import './../../../js/components/datatables/mobile_select_mode';
import './../../../js/components/mode_clientArea/mode_clientArea';
import './../../../js/components/notifications_preview/notifications_preview';

window.onload = function() {
  if (antaresCfg.performanceMode === true) {
    window.t1 = performance.now();
    console.log('System Load Time: ' + (window.t1 - window.t0) + ' milliseconds.');
  }
};

// import './../../../js/components/main_menu/main_menu_old';

//moved to forms_basic partial
// require('./../../../js/forms.js');
// OUTED BY SERVERSIDE VERSION:
// require('./../../../js/components/auto_complete.js');
