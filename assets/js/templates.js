angular.module("myApp").run(["$templateCache", function($templateCache) {$templateCache.put("delete.html","borrar?");
$templateCache.put("iva_rates.html","<select class=\"form-control\"><option value=\"{{ item }}\" ng-repeat=\"item in iva_rates\">{{ item }}</option></select>");
$templateCache.put("nothing.html","<br><div class=\"well\"><h3><i class=\"fa fa-cog fa-spin\"></i> Aun no hace nada :)</h3></div>");}]);