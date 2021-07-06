import React, {useState} from 'react'
import Sketch from "react-p5";
import './app.css'

function App() { 
    let length = 350; // длинна веревки
    let bobWeight = 1; // вес гири

    const addLength = () => {
        length += 10;
    }
    const removeLength = () => {
        if(length === 10) return;
        length -= 10;
    }

    const addWeight = () => {
        if(bobWeight === 1) return;
        bobWeight -= 1;
    }

    const removeWeight = () =>{
        bobWeight += 1;
    }
    let angle; // угол мятника
    let velocity = 0; // скорость
    let acceleration = 0; // ускорение
    // let bobWeight; //вес гири
    let bob; // гиря
    // let length; // длинна веревки на которой держится гиря
    let origin; // исходное положение
    let gravity = 1; // силя тяжести

    let setup = (p5, canvasParentRef) => {
        p5.createCanvas(700, 500).parent(canvasParentRef);
        p5.frameRate(React.Component.frameRate);
        // length = 300;  // зададим значения переменным
        angle = Math.PI / 2;
        bob = p5.createVector();
        origin = p5.createVector(300, 0);
    };

    let draw = (p5) => {
        p5.background(207, 255, 233);

        let force = gravity * Math.sin(angle) * bobWeight;
        acceleration = (-1 * force) / length;
        velocity += acceleration;
        angle += velocity;
        bob.x = length * Math.sin(angle) + origin.x;
        bob.y = length * Math.cos(angle) + origin.y;

        p5.stroke(207, 222, 255); // цвет веревки
        p5.strokeWeight(10); // толщина веревки

        p5.fill(255, 81, 142); // цвет гири

        p5.line(origin.x, origin.y, bob.x, bob.y);
        p5.circle(bob.x, bob.y, 65);
    };


    return (
        <div className="App">
            <Sketch setup={setup} draw={draw} className="App"/>
            <div className='buttons-wrapper'>
            <button onClick={() => addLength()}>Увеличить веревку</button>
            <button onClick={() => removeLength()}>Уменьшить веревку</button>
            <button onClick={() => addWeight()}>Увеличить груз</button>
            <button onClick={() => removeWeight()}>Уменьшить груз</button>
            </div>
        </div>
    );
}

export default App;
