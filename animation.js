/**
 * animation.js
 */

var counter = 0
var reset_semaphore = 0
var semaphore_control1 = false
var semaphore_control2 = false
var x_ini_car1 = 0
var y_ini_car1 = 280
var x_car1 = 0
var y_car1 = 0
var is_car1_runing = false
var random_number = 0
var rotate_angle = 30
var rotate_index = 0
var car1_mold = 0
var car1 = 0
var x, y, i;

var x_ini_car2 = 40
var y_ini_car2 = -220
var x_car2 = x_ini_car2
var y_car2 = y_ini_car2
var is_car2_runing = false
var car2_mold = 0
var car2 = 0

const svg_x = 500
const svg_y = 500

const size = 175;
const line = 1;

const color_car = '#ed0909'
const color_car2 = '#15c2ed'
const color_dark_black = '#000000'
const color_road = '#3d3d3d';
const color_road_divider = '#ffd900'
const color_grass = '#00708c';
const color_faixaPedestre = '#f2f2f2';
const color_sidewalk = '#c9c7c7';

const color_red_signal = '#ff0000';
const color_yellow_signal = '#f6ff00';
const color_green_signal = '#00ff00';

const color_red_signal_off = '#660000';
const color_yellow_signal_off = '#5d6600';
const color_green_signal_off = '#003d00';

// Semaphore 1
const semaphore1_background_position_x = (size - 80)
const semaphore1_background_position_y = 400 - (size - 90)

const semaphore1_position_x = (size - 50)
const semaphore1_position_y = 500 - (size - 20)

const semaphore1_position_red_y = semaphore1_position_y
const semaphore1_position_yellow_y = semaphore1_position_y
const semaphore1_position_green_y = semaphore1_position_y

const semaphore1_position_red_x = 500 - (size + 200)
const semaphore1_position_yellow_x = 500 - (size + 220)
const semaphore1_position_green_x = 500 - (size + 240)

// Semaphore 2
const semaphore2_background_position_x = (500 - size + 37)
const semaphore2_background_position_y = 515 - size

const semaphore2_position_x = 500 - size + 45
const semaphore2_position_y = 500 - size + 30

const semaphore2_position_red_x = semaphore2_position_x
const semaphore2_position_yellow_x = semaphore2_position_x
const semaphore2_position_green_x = semaphore2_position_x

const semaphore2_position_red_y = 500 - size + 25
const semaphore2_position_yellow_y = 500 - size + 45
const semaphore2_position_green_y = 500 - size + 65

// initialize SVG.js
var draw = SVG().addTo('.container').size(svg_x, svg_y);

/*
    Draw basic elements
*/

function _draw_top_left_grass() {
    draw.rect(500, 500).fill(color_road);
    draw.rect(size, 1).move(0, size + 10).fill(color_sidewalk).height(line);
    draw.rect(1, size).move(size + 10, 0).fill(color_sidewalk).width(line);
    draw.rect(size, size).move(0, 0).fill(color_grass);
}

function _draw_top_right_grass() {
    draw.rect(size, 1).move(500 - size, size + 10).fill(color_sidewalk).height(line);
    draw.rect(1, size).move(500 - size - 10, 0).fill(color_sidewalk).width(line);
    draw.rect(size, size).move(500 - size, 0).fill(color_grass);
}

function _draw_bottom_left_grass() {
    draw.rect(size, 1).move(0, 500 - size - 10).fill(color_sidewalk).height(line);
    draw.rect(1, size).move(size + 10, 500 - size).fill(color_sidewalk).width(line);
    draw.rect(size, size).move(0, 500 - size).fill(color_grass);
}

function _draw_bottom_right_grass() {
    draw.rect(size, 1).move(500 - size, 500 - size - 10).fill(color_sidewalk).height(line);
    draw.rect(1, size).move(500 - size - 10, 500 - size).fill(color_sidewalk).width(line);
    draw.rect(size, size).move(500 - size, 500 - size).fill(color_grass);
}

function draw_grasses() {
    _draw_top_left_grass()
    _draw_top_right_grass()
    _draw_bottom_left_grass()
    _draw_bottom_right_grass()
}

function _draw_top_pedestrian_crossing() {
    x = size + 18;
    y = size - 30
    for (i = 0; i < 11; i++) {
        draw.rect(5, 30).move(x, y).fill(color_faixaPedestre);
        x = x + 11;
    }
}

function _draw_bottom_pedestrian_crossing() {
    x = size + 18;
    y = 500 - size - 0
    for (i = 0; i < 11; i++) {
        draw.rect(5, 30).move(x, y).fill(color_faixaPedestre);
        x = x + 11;
    }
}

function _draw_left_pedestrian_crossing() {
    x = size - 30;
    y = size + 18;
    for (i = 0; i < 11; i++) {
        draw.rect(30, 5).move(x, y).fill(color_faixaPedestre);
        y = y + 11;
    }
}

function _draw_right_pedestrian_crossing() {
    x = 500 - size - 0;
    y = size + 18;
    for (i = 0; i < 11; i++) {
        draw.rect(30, 5).move(x, y).fill(color_faixaPedestre);
        y = y + 11;
    }
}

function draw_pedestrian_crossing() {
    _draw_top_pedestrian_crossing()
    _draw_bottom_pedestrian_crossing()
    _draw_left_pedestrian_crossing()
    _draw_right_pedestrian_crossing()
}

function _draw_horinzontal_road_diviser() {
    x = 0;
    y = 500 / 2;
    draw.rect(120, 3).move(x, y + 5).fill(color_road_divider);
    draw.rect(120, 3).move(x, y - 5).fill(color_road_divider);
    
    draw.rect(120, 3).move(530 - size + 30 + x, y + 5).fill(color_road_divider);
    draw.rect(120, 3).move(530 - size + 30 + x, y - 5).fill(color_road_divider);
}

function _draw_vertical_road_divider () {
    x = 500 / 2;
    y = 0;
    draw.rect(3, 120).move(x + 5, y).fill(color_road_divider);
    draw.rect(3, 120).move(x - 5, y).fill(color_road_divider);
    
    draw.rect(3, 120).move(x + 5, 500 - size + 40 + y).fill(color_road_divider);
    draw.rect(3, 120).move(x - 5, 500 - size + 40 + y).fill(color_road_divider);
}

function draw_road_divider() {
    _draw_horinzontal_road_diviser()
    _draw_vertical_road_divider ()
}

function draw_sidewalk() {
    // calcada
    draw.rect(10, size).move(size, 0).fill(color_sidewalk);
    draw.rect(10, size).move(500 - 10 - size, 0).fill(color_sidewalk);
    draw.rect(10, size).move(size, 500 - size).fill(color_sidewalk);
    draw.rect(10, size).move(500 - 10 - size, 500 - size).fill(color_sidewalk);
    draw.rect(size, 10).move(0, size).fill(color_sidewalk);
    draw.rect(size, 10).move(500 - size, size).fill(color_sidewalk);
    draw.rect(size, 10).move(0, 500 - 10 - size).fill(color_sidewalk);
    draw.rect(size, 10).move(500 - size, 500 - 10 - size).fill(color_sidewalk);

    draw.circle(21).move(size - 10, size - 10).fill(color_sidewalk);
    draw.circle(21).move(500 - size - 10, size - 10).fill(color_sidewalk);
    draw.circle(21).move(size - 10, 500 - size - 10).fill(color_sidewalk);
    draw.circle(21).move(500 - size - 10, 500 - size - 10).fill(color_sidewalk);
}

function _draw_semaphore1 () {
    draw.rect(30, 75).move(semaphore1_background_position_x, semaphore1_background_position_y).fill(color_dark_black).rotate(90);
    draw.circle(15).move(semaphore1_position_red_x, semaphore1_position_y).fill(color_red_signal);
    draw.circle(15).move(semaphore1_position_yellow_x, semaphore1_position_y).fill(color_yellow_signal);
    draw.circle(15).move(semaphore1_position_green_x, semaphore1_position_y).fill(color_green_signal);
}

function _draw_semaphore2 () {
    draw.rect(30, 75).move(semaphore2_background_position_x, semaphore2_background_position_y).fill(color_dark_black)
    draw.circle(15).move(semaphore2_position_red_x, semaphore2_position_red_y).fill(color_red_signal);
    draw.circle(15).move(semaphore2_position_yellow_x, semaphore2_position_yellow_y).fill(color_yellow_signal);
    draw.circle(15).move(semaphore2_position_green_x, semaphore2_position_green_y).fill(color_green_signal);
}

function draw_semaphore() {
    _draw_semaphore1 ()
    _draw_semaphore2 ()
}

/*
    Change semaphores
*/

function change_semaphore1_red(on) {
    if (on == 1) {
        draw.circle(15).move(semaphore1_position_red_x, semaphore1_position_red_y).fill(color_red_signal)
    } else {
        draw.circle(15).move(semaphore1_position_red_x, semaphore1_position_red_y).fill(color_red_signal_off)
    }
}

function change_semaphore1_yellow(on) {
    if (on == 1) {
        draw.circle(15).move(semaphore1_position_yellow_x, semaphore1_position_yellow_y).fill(color_yellow_signal)
    } else {
        draw.circle(15).move(semaphore1_position_yellow_x, semaphore1_position_yellow_y).fill(color_yellow_signal_off)
    }
}

function change_semaphore1_green(on) {
    if (on == 1) {
        draw.circle(15).move(semaphore1_position_green_x, semaphore1_position_green_y).fill(color_green_signal)
    } else {
        draw.circle(15).move(semaphore1_position_green_x, semaphore1_position_green_y).fill(color_green_signal_off)
    }
}

function change_semaphore2_red(on) {
    if (on == 1) {
        draw.circle(15).move(semaphore2_position_red_x, semaphore2_position_red_y).fill(color_red_signal)
    } else {
        draw.circle(15).move(semaphore2_position_red_x, semaphore2_position_red_y).fill(color_red_signal_off)
    }
}

function change_semaphore2_yellow(on) {
    if (on == 1) {
        draw.circle(15).move(semaphore2_position_yellow_x, semaphore2_position_yellow_y).fill(color_yellow_signal)
    } else {
        draw.circle(15).move(semaphore2_position_yellow_x, semaphore2_position_yellow_y).fill(color_yellow_signal_off)
    }
}

function change_semaphore2_green(on) {
    if (on == 1) {
        draw.circle(15).move(semaphore2_position_green_x, semaphore2_position_green_y).fill(color_green_signal)
    } else {
        draw.circle(15).move(semaphore2_position_green_x, semaphore2_position_green_y).fill(color_green_signal_off)
    }
}

function _attention_semaphore2 () {
    change_semaphore2_red(0)
    change_semaphore2_yellow(1)
    change_semaphore2_green(0)
    semaphore_control2 = false
}

function _wait_semaphore2 () {
    change_semaphore2_red(1)
    change_semaphore2_yellow(0)
    change_semaphore2_green(0)
}

function _pass_semaphore2 () {
    change_semaphore2_red(0)
    change_semaphore2_yellow(0)
    change_semaphore2_green(1)
    semaphore_control2 = true
}

function _attention_semaphore1 () {
    change_semaphore1_red(0)
    change_semaphore1_yellow(1)
    change_semaphore1_green(0)
    semaphore_control1 = false
}

function _wait_semaphore1 () {
    change_semaphore1_red(1)
    change_semaphore1_yellow(0)
    change_semaphore1_green(0)
    semaphore_control1 = false
}

function _pass_semaphore1 () {
    change_semaphore1_red(0)
    change_semaphore1_yellow(0)
    change_semaphore1_green(1)
    semaphore_control1 = true
}

function change_semaphore() {
    if (counter > 1 && counter <= 50) {
        _pass_semaphore2()
    } else if (counter > 50 && counter <= 53) {
        _attention_semaphore2()
    } else if (counter > 53 && counter <= 88) {
        _wait_semaphore2()
        semaphore_control2 = false
    } else if (counter > 88 && counter <= 138) {
        _pass_semaphore1()
    } else if (counter > 138 && counter <= 141) {
        _attention_semaphore1()
    } else if (counter > 141 && counter <= 176) {
        _wait_semaphore1()
        if (counter == 176) {
            reset_semaphore++;
        }
    }
}

/* 
    Movement functions
*/

function move_car1(random_value) {
    switch (random_value) {
        case 0:
            if (x_car1 < 140) {
                //se o car 1 estiver antes da faixa, pode continuar se aproximando dela.
                is_car1_runing = true
                x_car1 = x_car1 + 20
                car1.move(x_car1, y_ini_car1)
            } else if (x_car1 == 140 && semaphore_control1 == false) {
                //aguarda semaforo abrir

            } else if (x_car1 == 140 && semaphore_control1 == true) {
                //avança uma casa
                x_car1 = x_car1 + 20
                car1.move(x_car1, y_ini_car1)

            } else if ((x_car1 > 140 && x_car1 <= 560) || (semaphore_control1 == true && x_car1 <= 560)) {
                //se o car já tiver ultrapassado a faixa ou se o semáforo está aberto continue andando.
                x_car1 = x_car1 + 20
                car1.move(x_car1, y_ini_car1)
            } else if (x_car1 > 560) {
                //resetar o percurso
                is_car1_runing = false
                x_car1 = x_ini_car1
            }
            break;

        case 1:
            if (x_car1 < 140) {
                //se o car 1 estiver antes da faixa, pode continuar se aproximando dela.
                is_car1_runing = true
                x_car1 = x_car1 + 20
                car1.move(x_car1, y_ini_car1)
            } else if (x_car1 == 140 && semaphore_control1 == false) {
                //aguarda semaforo abrir

            } else if (x_car1 == 140 && semaphore_control1 == true) {
                //avança uma casa
                x_car1 = x_car1 + 20
                car1.move(x_car1, y_ini_car1)

            } else if ((x_car1 > 140 && x_car1 <= 560) || (semaphore_control1 == true && x_car1 <= 560)) {
                //se o car já tiver ultrapassado a faixa ou se o semáforo está aberto continue andando.
                x_car1 = x_car1 + 20
                y_car1 = y_ini_car1
                car1.move(x_car1, y_car1)
                if (rotate_index < 3) {
                    y_car1 = y_car1 + 15
                    rotate_index++
                    car1.rotate(rotate_angle).move(x_car1, y_car1)
                }
            } else if (x_car1 > 560) {
                //resetar o percurso
                is_car1_runing = false
                x_car1 = x_ini_car1
                y_car1 = 0
                rotate_index = 0
            }
            break;

        default:
            console.log("Por favor, informe um valor correto!")
    }
}

function move_car2() {

    if (x_car2 < 140) {
        //se o car 2 estiver antes da faixa, pode continuar se aproximando dela.
        is_car2_runing = true
        x_car2 = x_car2 + 20
        console.log(x_car2)
        car2.move(x_car2, y_ini_car2)
    } else if (x_car2 == 160 && semaphore_control2 == false) {
        //aguarda semaforo abrir
    } else if (x_car2 == 400 && semaphore_control2 == true) {
        //avança uma casa
        x_car2 = x_car2 + 20
        car2.move(x_car2, y_ini_car2)
    } else if ((x_car2 > 140 && x_car2 <= 560) || (semaphore_control2 == true && x_car2 <= 640)) {
        //se o car já tiver ultrapassado a faixa ou se o semáforo está aberto continue andando.
        x_car2 = x_car2 + 20
        car2.move(x_car2, y_ini_car2)
    } else if (x_car2 >= 640) {
        //resetar o percurso
        is_car2_runing = false
        x_car2 = x_ini_car1
        y_car2 = y_ini_car2
    }
}

/* 
    Timer functions
*/
function timer() {
    counter++;

    if (counter == 1) {
        init_semaphore()
    }

    change_semaphore()

    if (is_car1_runing == false) {
        random_number = Math.floor(Math.random() * 2)
        console.log(`car 1 - Caso ${random_number}`)
        car1 = draw.use(car1_mold)
    }

    move_car1(random_number)
    if (counter > 176) {
        counter = 0
    }
    move_car2()
}

/* 
    Init functions
*/

function init_semaphore() {
    change_semaphore1_red(1)
    change_semaphore1_yellow(0)
    change_semaphore1_green(0)
    change_semaphore2_red(0)
    change_semaphore2_yellow(0)
    change_semaphore2_green(1)
}

/* 
    External draw functions
*/

function draw_animation() {
    setInterval(timer, 300);

    car1_mold = draw.path()
    car1_mold.marker('end', 130, 80, function (add) {
        add.rect(50, 30).center(40, 40).fill(color_car)
        add.ellipse(15, 8).center(55, 27).fill(color_dark_black)
        add.ellipse(15, 8).center(55, 53).fill(color_dark_black)
        add.ellipse(15, 8).center(25, 27).fill(color_dark_black)
        add.ellipse(15, 8).center(25, 53).fill(color_dark_black)
    });

    car1 = draw.use(car1_mold)
    car1.move(0, 280)

    car2_mold = draw.path()
    car2_mold.marker('end', 130, 80, function (add) {
        add.rect(50, 30).center(40, 40).fill(color_car2)
        add.ellipse(15, 8).center(55, 27).fill(color_dark_black)
        add.ellipse(15, 8).center(55, 53).fill(color_dark_black)
        add.ellipse(15, 8).center(25, 27).fill(color_dark_black)
        add.ellipse(15, 8).center(25, 53).fill(color_dark_black)
    });

    car2 = draw.use(car2_mold)
    car2.rotate(90)
    car2.move(x_ini_car2, y_ini_car2)
}

function draw_scenario() {
    draw_grasses()
    draw_pedestrian_crossing()
    draw_road_divider()
    // draw_sidewalk()
    draw_semaphore()
}