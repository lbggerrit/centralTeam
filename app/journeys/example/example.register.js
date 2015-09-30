// Register actions and stores on app load by requiring them

// Always require constants first
require('../../flux/constants/actionConstants.js');

require('../../flux/actions/tableActions.js');
require('../../flux/stores/tableStore.js');

module.exports = null;
