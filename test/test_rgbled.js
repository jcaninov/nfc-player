// http://www.frontandback.org/laboratory/led-rgb-raspberry-pi-node-js

//Incluimos la librería

var SimpleRpiLed = require("SimpleRpiLed");



//Creamos un objeto con la configuración de los pines

var redPin = 23;

var greenPin = 21;

var bluePin = 19;

var led = new SimpleRpiLed(redPin, greenPin, bluePin);



//Encendemos el led con el color deseado

//led.black(); //Apagamos el led//

//led.blue(); //Para azul//

//led.green(); //Para verde//

//led.turquoise(); //Para turquesa …//

led.red();//

//led.purple();//

//led.greenYellow();//

//led.white();