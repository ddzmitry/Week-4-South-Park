$(document).ready(function() {
    //our game variables
    var yourPlayer = false;
    var yourEnemy = false;
    var yourDefender = false;
    var playersArray = [];
    var enemyKilled = 0;


    //Seting up our main characters in objects then push them to array
    var firstPlayer = {
        name: 'Eric',
        healthPoints: 140,
        attackPower: 12,
        counterAttackPower: 18,
        numberOfAttacks: 1

    }

    var secondPlayer = {
        name: 'Kenny',
        healthPoints: 120,
        attackPower: 10,
        counterAttackPower: 10,
        numberOfAttacks: 1

    }

    var thirdPlayer = {

        name: 'Ike',
        healthPoints: 160,
        attackPower: 15,
        counterAttackPower: 20,
        numberOfAttacks: 1
    }

    var fourthPlayer = {

        name: 'Kyle',
        healthPoints: 180,
        attackPower: 19,
        counterAttackPower: 20,
        numberOfAttacks: 1
    }

    playersArray.push(firstPlayer);
    playersArray.push(secondPlayer);
    playersArray.push(thirdPlayer);
    playersArray.push(fourthPlayer);
    console.log(playersArray);
    //seting up image before game starts to click on
    $('<img class = "startimg" src="assets/images/Logo.png">').appendTo("body"); // beginning game image! 

    $(".startimg").mouseover(function(event) {

        //changing mpuse pointer to specify clikability! 
        $(".startimg").css({
            cursor: 'pointer',
            opacity: '0.95'
        });

        //squicky door sound adding to the mousover! 
        $("<audio></audio>").attr({
            'src': 'assets/audio/' + 'doorfinish.mp3',
            'volume': 0.4,
            'autoplay': 'autoplay'
        }).appendTo("body");

    });
    //ading other sound when we take mouse coursor out! s
    $(".startimg").mouseout(function(event) {
        $("<audio></audio>").attr({
            'src': 'assets/audio/' + 'doorstart.mp3',
            'volume': 0.4,
            'autoplay': 'autoplay'
        }).appendTo("body");

        $(".startimg").css({

            opacity: '1'
        });

    });


    //obce you clicked on image invisible container with game appears! 
    $(".startimg").on('click', function(event) {

        $(this).fadeOut('slow/4000/fast', function() {


            $("#maincontainer").removeClass('hidden')
        });


    });
    //jumping effects on characters! 

    $(".jump ").mouseover(function(event) {
        $(this).addClass('bounce');

    });

    $(".jump").mouseout(function(event) {
        $(this).removeClass('bounce');

    });
    //random sounds once you clicked on them
    $(".thumbnail").on('click', function(event) {
        $("<audio></audio>").attr({
            'src': 'assets/audio/' + Math.round(Math.random() * 7) + '.mp3', // very usefull! 
            'volume': 0.4,
            'autoplay': 'autoplay'
        }).appendTo("body");

    });
    //changing text ATTACK btn in buttons on mouse over
    $(".attack").mouseover(function(event) {
        $(".attack").css({
            width: '125px',
        });
        $(".attack").empty();
        $(".attack").append(" Attack the baby");
    });
    //changing text in buttons on mouseout
    $(".attack").mouseout(function(event) {
        $(".attack").css({
            width: '65px',
            property2: 'value2'
        });
        $(".attack").empty();
        $(".attack").append(" Attack ");
    });
    //changing text  RESTART btn in buttons on mouse over
    $(".restart").mouseover(function(event) {
        $(".restart").css({
            width: '125px',
            height: '45px'
        });
        $(".restart").empty();
        $(".restart").append(" Do it!");
    });
    //changing text in buttons on mouseout
    $(".restart").mouseout(function(event) {
        $(".restart").css({
            width: '130px',
            height: '45px'
        });
        $(".restart").empty();
        $(".restart").append(" Restart me! ");
    });

    //hiding elements to be appeared in geme functionss
    $("#youplay").hide();
    $("#defender").hide();
    $(".enemies").hide();
    $(".attackRow").hide();
    $(".messenger").hide();



    $('.character').on('click', function(event) {
        event.preventDefault();

        if (yourPlayer === false) {


            //Data can't be 0, so we set data to a number to match it to the index in array we have to take out -1!
            console.log($(this).data('player')) // our player value " data-player="number"

            // console.log(playersArray[$(this).data('player') - 1]) // our player from array INDEX!



            yourPlayer = playersArray[$(this).data('player') - 1]
                //assigning to element helps to acces in another function 
            yourPlayer.element = $(this);
            //showing text and pushing main to its place
            $("#youplay").show();
            //take of the click event , so you cant click twicwe
            $(this).removeClass(".character");
            $(this).off('click');
            $("#youplay .player").after($(this));

            //if you picked a rest of the images moving to defenders raw! 
            if (yourPlayer) {

                $(".enemies").after($('.allchar .character'));
                $(".enemies").show();
            };
        } else if (yourDefender === false) {
            // picking your enemy  same concept as a main char! 
            yourDefender = playersArray[$(this).data('player') - 1]; // this is an INDEX to match to array! 
            yourDefender.element = $(this);
            //showing in defender row
            $(this).appendTo($('#defender'));
            $(this).removeClass(".character");
            $("#defender").show();
            $(".attackRow").show();

        }

    });

    function battle(a, b) {
            //battle default alert if there is no enemy! 
        if (yourDefender === false) {

            alert("pick yor enemy! ")
        }
        console.log(a.attackPower);
        console.log(b.attackPower);
        // here we use our element function because yourPlayer is a and yourDefender is b 
        var mainAtack = a.attackPower;
        var defAtack = b.counterAttackPower;
        //math using how to attack!
        var attackIncreasment = a.numberOfAttacks++
            console.log(attackIncreasment);
        mainAtack = a.attackPower * attackIncreasment;
        b.healthPoints -= mainAtack;
        a.healthPoints -= defAtack;
        b.element.find('.health').html(b.healthPoints)
        a.element.find('.health').html(a.healthPoints)
        //scroling event to messanger auto! 
        $(".messenger").show().animate({
            scrollTop: 156
        }, 800);
        //if attack pressed in messanger appears text of battle wit classes! 
        $(".atacker").append('<p class="typewriter attackText" >' + a.name + " attacks " + b.name + " for " + mainAtack + " hp" + '</p>');
        $(".defer").append('<p class="typewriter deffendText">' + b.name + " attacks " + a.name + " for " + defAtack + " hp" + '</p>')
        if (b.healthPoints <= 0) {
                        //if kenny dead special sound
            if (b.name === 'Kenny') {
                $("<audio></audio>").attr({
                    'src': 'assets/audio/' + 'kenny.mp3',
                    'volume': 0.4,
                    'autoplay': 'autoplay'
                }).appendTo("body");

            };

            if (b.name === 'Ike') {
                $("<audio></audio>").attr({
                    'src': 'assets/audio/' + 'ikedead.mp3',
                    'volume': 0.4,
                    'autoplay': 'autoplay'
                }).appendTo("body");

            };
                    //killed message 
            $(".atacker").append('<p class="typewriter attackText" >' + a.name + " killed  " + b.name + '</p>');
            b.element.hide();
                //once enemy killed clear message! 
            $(".atacker").empty();
            $(".defer").empty();
            yourDefender = false
            enemyKilled++
        } else if (a.healthPoints <= 0) {
            //looser special souns , off clicked bittons , only restart is avaliable! 
            yourDefender = true;
            $("<audio></audio>").attr({
                'src': 'assets/audio/' + 'loosesound.mp3',
                'volume': 0.4,
                'autoplay': 'autoplay'
            }).appendTo("body");

            $('.character').off('click');
            $('.attack').off('click');
            $(".atacker").empty();
            $(".defer").empty();
            alert("You Lose!")

        }

        if (enemyKilled === 3) {
                //winning message , song ! 
            $("<audio></audio>").attr({
                'src': 'assets/audio/' + 'pokerface.mp3',
                'volume': 0.4,
                'autoplay': 'autoplay'
            }).appendTo("body");
            $(".atacker").append('<p class="typewriter attackText" >' + a.name + " wins the game  " + '</p>');
            alert("You win the game! Cartman Cheering you!  ")
        }
    }


    $(".attack").on('click', function() {
        event.preventDefault();

        battle(yourPlayer, yourDefender);
            //typing sound when atacked! 
        $("<audio></audio>").attr({
            'src': 'assets/audio/' + 'writemessage.mp3',
            'volume': 0.4,
            'autoplay': 'autoplay'
        }).appendTo("body");


    });
});