const { format } = require('timeago.js');
const translate = require('translate');

const helpers = {};
helpers.timeago = (timestamp) => {
    
    return format(timestamp);
};


module.exports = helpers;
