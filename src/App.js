import "./App.css";
import enTranslations from "@shopify/polaris/locales/en.json";
import {
  AppProvider,
  Button,
  FormLayout,
  TextField,
  ColorPicker,
} from "@shopify/polaris";
import React, { useState, useEffect, useRef, useCallback } from "react";

function App() {
  const [color, setColor] = useState({
    hue: 300,
    brightness: 1,
    saturation: 0.7,
    alpha: 0.7,
  });

  const [textColor, setTextColor] = useState("rgba(255,77,255,0.7)");
  const { hue, saturation, brightness, alpha } = color;

  function rgbFromHueAndChroma(hue, chroma) {
    const huePrime = hue / 60;
    const hueDelta = 1 - Math.abs((huePrime % 2) - 1);
    const intermediateValue = chroma * hueDelta;

    let red = 0;
    let green = 0;
    let blue = 0;
    if (huePrime >= 0 && huePrime <= 1) {
      red = chroma;
      green = intermediateValue;
      blue = 0;
    }

    if (huePrime >= 1 && huePrime <= 2) {
      red = intermediateValue;
      green = chroma;
      blue = 0;
    }

    if (huePrime >= 2 && huePrime <= 3) {
      red = 0;
      green = chroma;
      blue = intermediateValue;
    }

    if (huePrime >= 3 && huePrime <= 4) {
      red = 0;
      green = intermediateValue;
      blue = chroma;
    }

    if (huePrime >= 4 && huePrime <= 5) {
      red = intermediateValue;
      green = 0;
      blue = chroma;
    }

    if (huePrime >= 5 && huePrime <= 6) {
      red = chroma;
      green = 0;
      blue = intermediateValue;
    }

    return { red, green, blue };
  }

  useEffect(() => {
    const chroma = brightness * saturation;

    let { red, green, blue } = rgbFromHueAndChroma(hue, chroma);

    const chromaBrightnessDelta = brightness - chroma;
    red += chromaBrightnessDelta;
    green += chromaBrightnessDelta;
    blue += chromaBrightnessDelta;
    console.log(
      Math.round(red * 255),
      Math.round(green * 255),
      Math.round(blue * 255)
    );
    setTextColor(
      `rgba(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(
        blue * 255
      )}, ${alpha})`
    );
    return {
      red: Math.round(red * 255),
      green: Math.round(green * 255),
      blue: Math.round(blue * 255),
      alpha,
    };
  }, [color]);

  const canvas = useRef(null);
  const [text, setText] = useState("your quote");

  useEffect(() => {
    if (canvas) {
      const ctx = canvas.current.getContext("2d");
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 1000, 500);
      // ctx.drawImage(image, (400 - 256) / 2, 40);

      ctx.font = "20px Lato";
      ctx.fillStyle = textColor;

      ctx.fillText(text, 1000 / 2, 500 / 2, 800);
      ctx.textAlign = "center";
      // ctx.backgroundColor = "black";
    }
  }, [canvas, text, hue, saturation, brightness, alpha]);

  // const handleEmailChange = useCallback((value) => setEmail(value), []);

  const handleChange = useCallback((value) => setText(value), []);

  return (
    <div className="App">
      <AppProvider i18n={enTranslations}>
        <FormLayout>
          <div style={{ margin: "15px 15px" }}>
            <TextField
              label="Your quote"
              name="text"
              value={text}
              onChange={handleChange}
              maxLength={100}
            />
          </div>
          <div style={{ margin: "15px 15px" }}>
            <ColorPicker onChange={setColor} color={color} allowAlpha />
          </div>
        </FormLayout>
        <div style={{ margin: "15px 15px" }}>
          <canvas
            ref={canvas}
            width={1000}
            height={500}
            // style={{ color: `${textColor}` }}
          />
        </div>
        <div style={{ margin: "15px 15px" }}>
          <a
            style={{ textDecoration: "none" }}
            target="_blank"
            href="https://github.com/Samyak2107/app-attic-task"
          >
            <Button primary>Github Source Code</Button>
          </a>
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
