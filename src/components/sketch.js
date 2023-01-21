import React, { useState, useRef, useEffect, useCallback } from "react";
import p5 from "p5";
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
let img;
let i


export const Sketch =  ({image, setImage, setIsMint}) => {
    const {address} = useTezosContext()
    const myRef = useRef()
    const myP5 = useRef()
    
    // const saveImage = () => {
 
    //          setImage(canvas.canvas.toDataURL())
    //          setIsMint(true)
    //     }

    useEffect(() => {
        myP5.current = new p5(sketch, myRef.current)

        //  setCanvas(myP5)
        return () => {
            myP5.current.remove()
            myP5.current = null

        }

    }, [])
    
    useEffect(() => { 
        console.log('what')
        // setImage(myP5.current.canvas?.toDataURL())
         myP5.current && myP5.current.updateSync(address)
        // myP5.current.setup() 
    }, [address])
    
    

const sketch = (p) => {
    p.a=address
    p.preload = () => {
        if (image) img = p.loadImage(image);
        brush1 = p.loadImage('/images/image1.png');
        brush2 = p.loadImage('/images/image2.png');
        brush3 = p.loadImage('/images/image3.png');
        brush4 = p.loadImage('/images/image4.png');
        brush5 = p.loadImage('/images/image5.png');
        brush6 = p.loadImage('/images/image6.png');
    }
	p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight)
        p.background (230,200,170)       
        image && p.image(img, 0, 0, p.windowWidth, p.windowHeight);
        tools = p.createDiv(); 
        tools.position(10, 10);
        tools.style("width", "370px");
        tools.style("height", "145px");
        tools.style("background-color", "white");
        tools.style("border", "1px solid black");
        currentBrush = brush1
        brushOpacity = p.createSlider(0, 255, 255);
        brushSize = p.createSlider(1, 100, 50);
        brushSize.position(20, 130);
        brushOpacity.position(20, 80);

        let button1 = p.createButton("");
        button1.mousePressed(() => currentBrush = brush1);
        button1.position(20, 20);
        button1.size(50, 50);
        button1.style("background-image", "url('images/image1.png')");
        button1.style("background-size", "cover");
        
        let button2 = p.createButton("");
        button2.mousePressed(() => currentBrush = brush2);
        button2.position(80, 20);
        button2.size(50, 50);
        button2.style("background-image", "url('images/image2.png')");
        button2.style("background-size", "cover");
        
        let button3 = p.createButton("");
        button3.mousePressed(() => currentBrush = brush3);
        button3.position(140, 20);
        button3.size(50, 50);
        button3.style("background-image", "url('images/image3.png')");
        button3.style("background-size", "cover");
        
        let button4 = p.createButton("");
        button4.mousePressed(() => currentBrush = brush4);
        button4.position(200, 20);
        button4.size(50, 50);
        button4.style("background-image", "url('images/image4.png')");
        button4.style("background-size", "cover");
        
        let button5 = p.createButton("");
        button5.mousePressed(() => currentBrush = brush5);
        button5.position(260, 20);
        button5.size(50, 50);
        button5.style("background-image", "url('images/image5.png')");
        button5.style("background-size", "cover");
        
        let button6 = p.createButton("");
        button6.mousePressed(() => currentBrush = brush6);
        button6.position(320, 20);
        button6.size(50, 50);
        button6.style("background-image", "url('images/image6.png')");
        button6.style("background-size", "cover");
        
        
        saveButton = p.createButton(p.a ? "Mint" : "Save");
        saveButton.position(200, 80);
        saveButton.mousePressed(() => {
            if (address) {    
                setImage(myP5.current.canvas.toDataURL())
                setIsMint(true)
            }
            else p.saveCanvas("wafflesdraw",'png')
        });
	};
    
	p.draw = () => {
        p.imageMode(p.CENTER)  
        if (p.mouseIsPressed) {
            brush = p.createGraphics(brushSize.value(), brushSize.value());
            brush.image(currentBrush, 0, 0, brush.width, brush.height);
            p.tint(255, brushOpacity.value());
            p.image(brush, p.mouseX, p.mouseY);
        } 
        }

    p.updateSync = (address) => {
     p.a = address
     p.setup()
    //  setImage(myP5.current.canvas?.toDataURL())
    //  p.setup()
    //  !address && myP5.current.canvas && setImage(myP5.current.canvas.toDataURL())
    // myP5.current.canvas && setImage(myP5.current.canvas.toDataURL())

    } 
    }
    
	return    (
        <>
            {/* <div style={{display: 'flex', flexDirection: 'row'}}>
            <button style={{alignItems: 'center', background: 'white'}}><img style={{ width: '50px'}} src='/images/image1.png'></img></button>
            <button style={{alignItems: 'center', background: 'white'}}><img style={{ width: '50px'}} src='/images/image1.png'></img></button>
            <button style={{alignItems: 'center', background: 'white'}}><img style={{ width: '50px'}} src='/images/image1.png'></img></button>
            <button style={{alignItems: 'center', background: 'white'}}><img style={{ width: '50px'}} src='/images/image1.png'></img></button>
            <button style={{alignItems: 'center', background: 'white'}}><img style={{ width: '50px'}} src='/images/image1.png'></img></button>
            <button style={{alignItems: 'center', background: 'white'}}><img style={{ width: '50px'}} src='/images/image1.png'></img></button>
            </div> */}
            {/* {address && <button style={{marginTop: '27px', position: 'absolute'}}onClick={()=> saveImage()}>Mint</button>} */}
            <div ref={myRef.current}/>
        </>
    )
}
export default Sketch