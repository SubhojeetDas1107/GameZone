// the meat comes here
$(function () {
    // time counter
    var counting = 1

    // important values
    var go = $("#gameover")
    var show = $("#hah")
    var fscore = $("#fscore")
    var Sheight = $(document).height();
    var Swidth = $(document).width();
    var select = $("#difficulty")
    var gheight = Math.floor(Sheight / 20) * 20;
    var gwidth = Math.floor(Swidth / 20) * 20;
    var direct = "right";
    var scoreel = $("#score");
    var time = $("#time");
    var score = 1;
    var t = 150;
    counter = 1;
    catcherx = 0;
    catchery = 0;
    var list = ["right"]
    var container
    var corx = []
    var cory = []

    // setting up the score
    scoreel.text("Score: 0")

    // catching the elements
    var ground = $("#ground");
    var part = $("#first");
    var food = $(".food");

    // adjusting the ground
    ground.css({
        "height": `+=${gheight}`,
        "width": `+=${gwidth}`
    })

    // getting the initial random position of food
    var foodx = 20 * (Math.floor((gwidth / 20) * (Math.random())))
    var foody = 20 * (Math.floor((gheight / 20) * (Math.random())))

    // function makers
    function difficulty(e) {
        console.log(select.val())
        if (select.val() = "medium") {
            clearInterval(stopper)
            t = 10
            var stopper = setInterval(move, t)
        }
    }

    function timekeeper() {
        time.text(`TimeSpent: ${counting}secs`)
        counting = counting + 1
    }

    function food_position() {
        food.css({
            "top": `+=${foody}`,
            "left": `+=${foodx}`
        });
    }


    function increase() {
        color1 = Math.floor(255 * Math.random()) + 1
        color2 = Math.floor(255 * Math.random()) + 1
        color3 = Math.floor(255 * Math.random()) + 1
        var mparts = $('<div class="snake"></div>')
        mparts.css({
            "background-color": `rgb(${color1}, ${color2}, ${color3})`
        })
        ground.append(mparts)
    }

    function move() {
        if ((part.offset().top === food.offset().top) && (part.offset().left === food.offset().left)) {
            increase();
            food.css({
                "background-color": `rgb(${color1}, ${color2}, ${color3})`
            });
            if (counter === 1) {
                food.css({
                    "top": `-=${foody}`,
                    "left": `-=${foodx}`
                });
                var nfoodx = 20 * (Math.floor((gwidth / 20) * (Math.random())))
                var nfoody = 20 * (Math.floor((gheight / 20) * (Math.random())))
            } else {
                var nfoodx = 20 * (Math.floor((gwidth / 20) * (Math.random())))
                var nfoody = 20 * (Math.floor((gheight / 20) * (Math.random())))
            }
            food.css({
                "top": `-=${catchery}`,
                "left": `-=${catcherx}`
            });

            food.css({
                "top": `+=${nfoody}`,
                "left": `+=${nfoodx}`
            });
            scoreel.text(`Score: ${score}`)
            score = score + 1;
            counter = counter + 1;
            catcherx = nfoodx;
            catchery = nfoody;
        }
        var p = document.getElementsByClassName("snake")
        var len = p.length
        var imp = $(".snake")
        var last = $(".snake:last")

        if ((part.offset().top >= ground.offset().top) && (part.offset().top < (ground.offset().top + gheight)) && (part.offset().left >= ground.offset().left) && (part.offset().left < (ground.offset().left + gwidth)) && (part.offset().top >= ground.offset().top + 39)) {

            if (direct === "right") {
                part.css({
                    'top': "+=0",
                    "left": "+=0",
                    'left': '+=20'
                });
                list.push(direct)
            } else if (direct === "left") {
                part.css({
                    'left': '-=20'
                });
                list.push(direct)
            } else if (direct === "up") {
                part.css({
                    'top': '-=20'
                });
                list.push(direct)
            } else if (direct === "down") {
                part.css({
                    'top': '+=20'
                });
                list.push(direct)
            }
            for (var i = 1; i < len; i = i + 1) {
                var posx = imp.eq(i - 1).position().left
                var posy = imp.eq(i - 1).position().top
                if (list[list.length - i] === "right") {
                    posx = posx - 20
                } else if (list[list.length - i] === "left") {
                    posx = posx + 20
                } else if (list[list.length - i] === "up") {
                    posy = posy + 20
                } else if (list[list.length - i] === "down") {
                    posy = posy - 20
                }
                p[i].style.left = `${posx}px`
                p[i].style.top = `${posy}px`
            }
            if (counter >= 1) {
                for (var i = 1; i < len; i = i + 1) {
                    container = imp.eq(i).offset().left
                    corx.push(container)
                    container = imp.eq(i).offset().top
                    cory.push(container)
                }
            }

            for (var i = 0; i < corx.length; i = i + 1) {
                if ((part.offset().top === cory[i]) && (part.offset().left === corx[i])) {
                    clearInterval(stopper);
                    clearInterval(stop)
                    fscore.text(`Score: ${score - 1}`)
                    go.css({
                        "display": "block"
                    })
                }
            }

            corx = []
            cory = []
        } else {
            clearInterval(stopper);
            clearInterval(stop)
            fscore.text(`Score: ${score - 1}`)
            go.css({
                "display": "block"
            })

        }
    }

    function turning(e) {
        if (e.which === 37) {
            if (direct !== "right") {
                direct = "left";
            }
        } else if (e.which === 38) {
            if (direct !== "down") {
                direct = "up";
            }
        } else if (e.which === 39) {
            if (direct !== "left") {
                direct = "right";
            }
        } else if (e.which === 40) {
            if (direct !== "up") {
                direct = "down";
            }
        }
    }

    var stop = setInterval(timekeeper, 1000)
    var stopper = setInterval(move, t);

    food_position();
    // event listeners
    show.on("click", function () {
        go.css({
            "display": "none"
        })
        Sheight = $(document).height();
        Swidth = $(document).width();
        gheight = Math.floor(Sheight / 20) * 20;
        gwidth = Math.floor(Swidth / 20) * 20;
        direct = "right";
        time1 = document.getElementById("time")
        score = 1;
        scoreel.text(`Score: ${score - 1}`)
        t = 150;
        counter = 1;
        counting = 0;
        catcherx = 0;
        catchery = 0;
        timekeeper()
        list = ["right"]
        corx = []
        cory = []
        foodx = 20 * (Math.floor((gwidth / 20) * (Math.random())))
        foody = 20 * (Math.floor((gheight / 20) * (Math.random())))
        umm = $("#first").nextAll().remove()
        var foodder = document.getElementById("ah")
        umm2 = document.getElementById("first")
        foodder.style.top = "20px"
        foodder.style.left = "0px"
        food_position()
        umm2.style.top = "20px"
        umm2.style.left = "0px"
        stop = setInterval(timekeeper, 1000)
        stopper = setInterval(move, t);
    })

    select.on("change", function (e) {
        difficulty(e);
    })

    $(document).on("keydown", function (e) {
        turning(e);
    })

    if ('ontouchstart' in window) {
        $('.move_up').on('touchstart', function () {
            turning({ which: 38 });
        });
        $('.move_down').on('touchstart', function () {
            turning({ which: 40 });
        });
        $('.move_left').on('touchstart', function () {
            turning({ which: 37 });
        });
        $('.move_right').on('touchstart', function () {
            turning({ which: 39 });
        });
    } else {
        $('.touch_controls').hide();
    }
})
