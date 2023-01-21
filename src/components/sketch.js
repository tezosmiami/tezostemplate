import React, { useRef, useEffect } from "react";
import p5 from "p5";
import { useWindowWidth } from "../App";
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
let brush7;
let brush8;
let saveButton;
let currentBrush;
let img;
let select;
let version = 1;
let offset = 0

export const Sketch =  ({image, setImage, setIsMint, width}) => {
    const {address} = useTezosContext()
    const myRef = useRef()
    const myP5 = useRef()

    
    useEffect(() => {
        myP5.current = new p5(sketch, myRef.current)
        return () => {
            myP5.current.remove()
            myP5.current = null
        }

    }, [])

    useEffect(() => { 
        console.log('what')
         myP5.current && myP5.current.updateSync(address)
    }, [address])
    
    useEffect(() => {   
            myP5.current.removeElements()
            myP5.current.toolBox()
      }, [width])
      

const sketch = (p) => {
    p.a=address
    version = 1
    p.toolBox = () => {
        offset = p.windowWidth > 600 ? 0 : 40
        tools = p.createDiv(); 
        tools.position(10, 10+offset);
        tools.style("width", "370px");
        tools.style("height", "129px");
        tools.style("background-color", "white");
        tools.style("border", "1px solid black");
        
        currentBrush = brush1
        brushOpacity = p.createSlider(0, 255, 255);
        brushSize = p.createSlider(1, 100, 50);
        brushSize.position(20, 110+offset);
        brushOpacity.position(20, 80+offset);

        let button1 = p.createButton("");
        button1.mousePressed(() => currentBrush = brush1);
        button1.position(20, 20+offset);
        button1.size(50, 50);
        button1.style("background-image", `url(images/image${version === 1 ? '1' : '7'}.png)`);
        button1.style("background-size", "cover");
        
        let button2 = p.createButton("");
        button2.mousePressed(() => currentBrush = brush2);
        button2.position(80, 20+offset);
        button2.size(50, 50);
        button2.style("background-image", `url(images/image${version === 1 ? '2' : '8'}.png)`);
        button2.style("background-size", "cover");
        
        let button3 = p.createButton("");
        button3.mousePressed(() => currentBrush = brush3);
        button3.position(140, 20+offset);
        button3.size(50, 50);
        button3.style("background-image", `url(images/image${version === 1 ? '3' : '9'}.png)`);
        button3.style("background-size", "cover");
        
        let button4 = p.createButton("");
        button4.mousePressed(() => currentBrush = brush4);
        button4.position(200, 20+offset);
        button4.size(50, 50);
        button4.style("background-image", `url(images/image${version === 1 ? '4' : '10'}.png)`);
        button4.style("background-size", "cover");
        
        let button5 = p.createButton("");
        button5.mousePressed(() => currentBrush = brush5);
        button5.position(260, 20+offset);
        button5.size(50, 50);
        button5.style("background-image", `url(images/image${version === 1 ? '5' : '11'}.png)`);
        button5.style("background-size", "cover");
        
        let button6 = p.createButton("");
        button6.mousePressed(() => currentBrush = brush6);
        button6.position(320, 20+offset);
        button6.size(50, 50);
        button6.style("background-image", `url(images/image${version === 1 ? '6' : '12'}.png)`);
        button6.style("background-size", "cover");

        let button7 = p.createButton("");
        button7.mousePressed(() => currentBrush = brush7);
        button7.position(170, 80+offset);
        button7.size(50, 50);
        button7.style("background-image", `url(images/black.png)`);
        button7.style("background-size", "cover");
        
        let button8 = p.createButton("");
        button8.mousePressed(() => currentBrush = brush8);
        button8.position(230, 80+offset);
        button8.size(50, 50);
        button8.style("background-image", `url(images/tan.png`);
        button8.style("background-size", "cover");
        
        select = p.createSelect();
        select.position(310, 80+offset);
        select.option('v.1');
        select.option('v.2');
        select.value(version === 1 ? 'v.1' : 'v.2')
        select.changed(p.selectVersion);

        saveButton = p.createButton(p.a ? "Mint" : "Save");
        saveButton.position(305, 105+offset);
        saveButton.mousePressed(() => {
            if (p.a) {    
                setImage(myP5.current.canvas.toDataURL())
                setIsMint(true)
            }
            else p.saveCanvas("wafflesdraw",'png')
        });
    }
    p.preload = () => {
        if (image) img = p.loadImage(image);
        brush1 = p.loadImage(`/images/image${version === 1 ? '1' : '7'}.png`);
        brush2 = p.loadImage(`/images/image${version === 1 ? '2' : '8'}.png`);
        brush3 = p.loadImage(`/images/image${version === 1 ? '3' : '9'}.png`);
        brush4 = p.loadImage(`/images/image${version === 1 ? '4' : '10'}.png`);
        brush5 = p.loadImage(`/images/image${version === 1 ? '5' : '11'}.png`);
        brush6 = p.loadImage(`/images/image${version === 1 ? '6' : '12'}.png`);
        brush7 = p.loadImage(`/images/black.png`);
        brush8 = p.loadImage(`/images/tan.png`);
    }
	p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight-(144+offset))
        p.background (230,200,170)       
        image && p.image(img, 0, 0, p.windowWidth, p.windowHeight-(144+offset));
        p.toolBox()
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
        p.removeElements()
        p.toolBox()
        } 
    p.selectVersion = () => {
        select.value() === 'v.1' ? version = 1 : version = 2
        console.log(select.value())
        p.removeElements()
        p.preload()
        p.toolBox()
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