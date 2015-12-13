"use strict";
exports = module.exports = function(app) {

  app.filter('parselog', function ($sce) {
     return function (item, filtre) {
       var str = item.replace(filtre, "<i class='text-primary'>"+filtre+"</i>");
       return $sce.trustAsHtml(str.replace(/(STEAM_1:[0-1]:[0-9]{1,14})/g, "<b class='text-primary'>$1</b>"));
     };
   });

   app.filter('fullDuration', function () {
     return function(seconds) {
       var days = Math.floor(seconds / 86400);
       var hours = Math.floor((seconds % 86400) / 3600);
       var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
       seconds = Math.floor(((seconds % 86400) % 3600) % 60);

       var str = '';
       if ((days > 0) && (hours === 0 && minutes === 0 && seconds === 0)) str += (days > 1) ? (days + ' jours ') : (days + ' jour ');
       if ((days > 0) && (hours > 0 || minutes > 0 || seconds > 0)) str += (days > 1) ? (days + ' jours, ') : (days + ' jour, ');
       if ((hours > 0) && (minutes > 0 || seconds > 0 )) str += (hours > 1) ? (hours + ' heures, ') : (hours + ' heure, ');
       if ((hours > 0) && (minutes === 0 && seconds === 0 )) str += (hours > 1) ? (hours + ' heures ') : (hours + ' heure ');
       if ((minutes > 0) && (seconds > 0)) str += (minutes > 1) ? (minutes + ' minutes, ') : (minutes + ' minute, ');
       if ((minutes > 0) && (seconds === 0)) str += (minutes > 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
       if (seconds > 0) str += (seconds > 1) ? (seconds + ' secondes ') : (seconds + ' seconde ');
       return str;
     };
   });
   app.filter('duration', function () {
     return function(seconds) {
       var days = Math.floor(seconds / 86400);
       var hours = Math.floor(seconds / 3600);
       var minutes = Math.floor((seconds % 3600) / 60);
       var str = '';
       if ((hours > 0) && (minutes > 0 || seconds > 0 )) str += (hours > 1) ? (hours + ' heures, ') : (hours + ' heure, ');
       if ((hours > 0) && (minutes === 0 && seconds === 0 )) str += (hours > 1) ? (hours + ' heures ') : (hours + ' heure ');
       if ((minutes > 0)) str += (minutes > 1) ? (minutes + ' minutes ') : (minutes + ' minute ');
       return str;
      };
    });

};
