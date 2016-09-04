	
	var app = angular.module('dotastats', []);
	app.config(function ($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
	
      app.controller('mainctrl', ['$scope', '$http', function ($scope,$http) {        
		console.log("main controller opened");
		$scope.firstname= "John";
		$scope.player = [];
		$scope.herolist = [];
		
		$scope.sortType     = ''; // set the default sort type
		$scope.sortReverse  = false;  // set the default sort order
		//steam api
		//174B919DF918BA5C16B20C8527F85B3B
		//localhost
		
		$scope.sort = function(sortType){
			if(sortType === $scope.sortType){
				$scope.sortReverse = !$scope.sortReverse;
			}else{
				if(sortType === 'name'){
					$scope.sortReverse = false;
				}else{
					$scope.sortReverse = true;
				}
			}
			$scope.sortType = sortType;
		}
		
		$scope.sort('name');
		
		//$http.get('http://api.steampowered.com/<interface name>/<method name>/v<version>/?key=174B919DF918BA5C16B20C8527F85B3B&format=JSON').success(function(data){
		$http.get('http://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V001/?key=174B919DF918BA5C16B20C8527F85B3B&format=JSON').success(function(data){
			console.log(data);
		});
		
		$http.get('crazipaco.json').success(function(data){
			$scope.player = data;
			getHerolist();
		});
		$http.get('heroes.json').success(function(data){
			$scope.herolist = data.heroes;
		});

			
		$scope.data = [];
		function getHerolist(){
			_.each($scope.player.heroes_list, function(hero){
				hero.name = getHero(hero.hero_id).localized_name;
				hero.with_total = hero.with_games + hero.games;
				hero.win_total = hero.with_win + hero.win;
				hero.winrate = getPercentage(hero.win_total, hero.with_total);
				hero.lossrate = getPercentage(hero.against_win, hero.against_games);
				hero.relativeSuccess = hero.winrate - (100 - hero.lossrate);
				hero.weightedSuccess = getPercentage(hero.win_total + hero.against_win, hero.with_total + hero.against_games);
				hero.withVsOut = hero.with_total - hero.against_games;				
			});
			$scope.data = _.pluck(_.dropRight($scope.player.heroes_list, 90), 'weightedSuccess');
			return $scope.player.heroes_list;
		};
		
		function getHero(id){			
			var hero = _.findWhere($scope.herolist, {id: parseInt(id)});
			return hero;
		}
		
		function getPercentage(var1, var2){
			if(var2 === 0){return 0;}
			return (Math.floor(var1/var2*100));
		}
		

  $scope.options = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 45
                },
                clipEdge: true,
                staggerLabels: true,
                transitionDuration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'Time (ms)',
                    showMaxMin: false,
                    tickFormat: function(d){
					console.log(d);
                        return d3.format(',f')(d);
                    }
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 40,
                    tickFormat: function(d){
					console.log(d);
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };

		
		
      }]);

  
