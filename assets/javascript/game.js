

var game = {
	//0 for char selet, 1 for defencer select, 2 for attack phase, 3 for game over
	currentState: 0,
	characterSelected: "",
	characterObj: "",
	defenderSelected: "",
	defenderObj:"",
	defendersLeft: 2
};

var char1 = {
	healthPoint: 100,
	attackPoints: 6,
	counterAttackPoints: 20,
	charHealthUpdate: function(AtkDmg)
	{
		this.healthPoint -= AtkDmg;
		$("#char1HP").text(this.healthPoint);
	},
	charAttackPointsUpdate: function()
	{
		this.attackPoints *= 2;
	}
};

var char2 = {
	healthPoint: 150 ,
	attackPoints: 10,
	counterAttackPoints:30,
	charHealthUpdate: function(AtkDmg)
	{
		this.healthPoint -= AtkDmg;
		$("#char2HP").text(this.healthPoint);
	},
	charAttackPointsUpdate: function()
	{
		this.attackPoints *= 2;
	}
};

var char3 = {
	healthPoint: 175,
	attackPoints: 5,
	counterAttackPoints: 45,
	charHealthUpdate: function(AtkDmg)
	{
		this.healthPoint -= AtkDmg;
		$("#char3HP").text(this.healthPoint);
	},
	charAttackPointsUpdate: function()
	{
		this.attackPoints *= 2;
	}
};

var char4 = {
	healthPoint: 125,
	attackPoints: 15,
	counterAttackPoints: 15,
	charHealthUpdate: function(AtkDmg)
	{
		this.healthPoint -= AtkDmg;
		$("#char4HP").text(this.healthPoint);
	},
	charAttackPointsUpdate: function()
	{
		this.attackPoints *= 2;
	}
};

		var char1Div = $("#char1");
		var char2Div = $("#char2");
		var char3Div = $("#char3");
		var char4Div = $("#char4");

//on click character select
$(".char").on("click", function(){
	if (game.currentState == 0)
	{

		game.characterSelected = $(this).attr("id");
		$("#" + game.characterSelected).remove();
		$("#instructions").text("Choose a defender");

		console.log(game.characterSelected);


		if (game.characterSelected == "char1")
		{
			game.characterObj = char1;
			$(".attacker").append(char1Div);
			$("#char1").css("position","relative");
			$("#char1").css("top","300px");
		}

		if (game.characterSelected == "char2")
		{
			game.characterObj = char2;
			$(".attacker").append(char2Div);
			$("#char2").css("position","relative");
			$("#char2").css("top","300px");
		}

		if (game.characterSelected == "char3")
		{
			game.characterObj = char3;
			$(".attacker").append(char3Div);
			$("#char3").css("position","relative");
			$("#char3").css("top","300px");
			$("#char3").html('<h2 id="char3HP">175</h2> <img src="assets/images/char3.gif">');
		}

		if (game.characterSelected == "char4")
		{
			game.characterObj = char4;
			$(".attacker").append(char4Div);
			$("#char4").css("position","relative");
			$("#char4").css("top","300px");
			$("#char4").html('<h2 id="char4HP">125</h2> <img src="assets/images/char4.gif">');
		}
		//progresses game to defender select state
		game.currentState++;
	}

	else if (game.currentState == 1)
	{
		game.defenderSelected = $(this).attr("id");
		$("#" + game.defenderSelected).remove();
		$("#instructions").text("Commence the attack!");
		console.log(game.defenderSelected);

		if (game.defenderSelected == "char1")
		{
			game.defenderObj = char1;
			$(".defender").append(char1Div);
			$("#char1").css("position","relative");
			$("#char1").css("top","300px");
			$("#char1").html('<h2 id="char1HP">100</h2> <img src="assets/images/char1Flip.gif">');
		}

		if (game.defenderSelected == "char2")
		{
			game.defenderObj = char2;
			$(".defender").append(char2Div);
			$("#char2").css("position","relative");
			$("#char2").css("top","300px");
			$("#char2").html('<h2 id="char2HP">150</h2> <img src="assets/images/char2Flip.gif">');

		}

		if (game.defenderSelected == "char3")
		{
			game.defenderObj = char3;
			$(".defender").append(char3Div);
			$("#char3").css("position","relative");
			$("#char3").css("top","300px");
		}

		if (game.defenderSelected == "char4")
		{
			game.defenderObj = char4;
			$(".defender").append(char4Div);
			$("#char4").css("position","relative");
			$("#char4").css("top","300px");
		}
		//progresses game to defender select state
		game.currentState++;

	}
	console.log(game.currentState);



});

$(".attkButton").on("click", function(){
	 if(game.currentState==2)
	 {
		game.defenderObj.charHealthUpdate(game.characterObj.attackPoints);
		game.characterObj.charAttackPointsUpdate();
		if ((game.defenderObj.healthPoint<=0) && (game.defendersLeft == 0))
		{
			$("#instructions").text("You Win!");
			$("#" + game.defenderSelected).remove();
			game.currentState++;
		}
		else if(game.defenderObj.healthPoint<=0)
		{
			$("#instructions").text("Choose a defender");
			$("#" + game.defenderSelected).remove();
			game.currentState--;
			game.defendersLeft--;
		}

		if(game.currentState==2)
		{
			game.characterObj.charHealthUpdate(game.defenderObj.counterAttackPoints);
		
			if(game.characterObj.healthPoint<=0)
			{
				$("#instructions").text("You Lose!");
				game.currentState++
			}
		}
	}

});
