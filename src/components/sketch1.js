import React, { useState } from "react";
import Sketch from "react-p5";
import { useTezosContext } from "../context/tezos-context";

let tools;
let brushOpacity;
let brushSize;
let brush;
let brush1;
let brush2;
let brush3;
let brush4;
let brush5;
let brush6;
let saveButton;
let currentBrush;
let img
let c;

export default ({image, setImage, setIsMint}) => {
    const [app, setApp] =useState(useTezosContext())
    console.log(app.address)
    const saveImage = (c, p5) => {
        if (app.address){   
            setImage(c.canvas.toDataURL())
            setIsMint(true)
          }
        else  p5.saveCanvas('myCanvas', 'png');
    }

    const preload = (p5) => {
        if (image) img = p5.loadImage(image);
        brush1 = p5.loadImage('/images/image1.png');
        brush2 = p5.loadImage('/images/image2.png');
        brush3 = p5.loadImage('/images/image3.png');
        brush4 = p5.loadImage('/images/image4.png');
        brush5 = p5.loadImage('/images/image5.png');
        brush6 = p5.loadImage('/images/image6.png');
    }
	const setup = (p5, canvasParentRef) => {
        c = p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);;
       
        p5.background (230,200,170)
        image && p5.image(img, 0, 0, p5.windowWidth, p5.windowHeight);
        tools = p5.createDiv(); 
        tools.position(10, 10);
        tools.style("width", "370px");
        tools.style("height", "145px");
        tools.style("background-color", "white");
        tools.style("border", "1px solid black");
        
        
        currentBrush = brush1;
        brushOpacity = p5.createSlider(0, 255, 255);
        brushSize = p5.createSlider(1, 100, 50);
        brushSize.position(20, 130);
        
        brushOpacity.position(20, 80);
        let button1 = p5.createButton("");
        button1.mousePressed(() => currentBrush = brush1);
        button1.position(20, 20);
        button1.size(50, 50);
        button1.style("background-image", "url('images/image1.png')");
        button1.style("background-size", "cover");
        
        let button2 = p5.createButton("");
        button2.mousePressed(() => currentBrush = brush2);
        button2.position(80, 20);
        button2.size(50, 50);
        button2.style("background-image", "url('images/image2.png')");
        button2.style("background-size", "cover");
        
        let button3 = p5.createButton("");
        button3.mousePressed(() => currentBrush = brush3);
        button3.position(140, 20);
        button3.size(50, 50);
        button3.style("background-image", "url('images/image3.png')");
        button3.style("background-size", "cover");
        
        let button4 = p5.createButton("");
        button4.mousePressed(() => currentBrush = brush4);
        button4.position(200, 20);
        button4.size(50, 50);
        button4.style("background-image", "url('images/image4.png')");
        button4.style("background-size", "cover");
        
        let button5 = p5.createButton("");
        button5.mousePressed(() => currentBrush = brush5);
        button5.position(260, 20);
        button5.size(50, 50);
        button5.style("background-image", "url('images/image5.png')");
        button5.style("background-size", "cover");
        
        let button6 = p5.createButton("");
        button6.mousePressed(() => currentBrush = brush6);
        button6.position(320, 20);
        button6.size(50, 50);
        button6.style("background-image", "url('images/image6.png')");
        button6.style("background-size", "cover");
        
        
        saveButton = p5.createButton(app.address ? "Mint" : "Save");
        saveButton.position(200, 80);
        saveButton.mousePressed(() => saveImage(c, p5));
        
	};
	const draw = (p5) => {
        if (p5.mouseIsPressed) {
            p5.tint(255, brushOpacity.value());
            p5.image(currentBrush, p.mouseX,p. mouseY);
          }
        
        if (p5.mouseIsPressed) {
            let brush = currentBrush;
            brush.resize(brushSize.value(), brushSize.value());
            p5.image(brush, p5.mouseX, p5.mouseY);
          }
        
        
        
          p5.imageMode (p.CENTER)
          if (p5.mouseIsPressed) {
            p5.image(currentBrush, p5.mouseX, p5.mouseY);
          }
    } 
	};
	return <Sketch setup={setup} draw={draw} preload={preload} />;
}