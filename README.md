[繁體中文](README.zh-TW.md) | [English](README.md)

# MTG Counter Generator

This is a pure front-end, open-source static web application designed for *Magic: The Gathering*. It helps you quickly generate high-quality, perfectly square physical counters and custom Tokens, ready to be exported and printed as a PDF.

👉 **[Click here to view the final printed PDF example](MTG%20Counter%20Generator.pdf)**

## ✨ Features
- 🎯 **Custom Borderless Grid**: Freely define the number of rows and columns to print. All components use modern CSS Container Queries (cqw) for perfect responsive scaling. No layout breaks when scaling down!
- 🛡️ **+1/+1 3D Panels**: Hand-crafted 3D folding panel design with high-quality gradient green/black backgrounds and watermark effects, perfectly matching modern game art styles.
- 🎴 **Token Builder**: Built-in tool to mix and match different ability icons and Power/Toughness (P/T) stats. Generated Tokens will feature the classic miniature P/T box in the bottom right corner, resembing real cards.
- 🖨️ **Perfect Print Support**: Built for printing. After clicking the print button, all unnecessary buttons and sliders will automatically hide, leaving only clean tiles with dashed cutting lines for easy clipping.

---

## ⚖️ Legal & Copyright Notice

> **[Disclaimer]** To respect intellectual property and copyrights, **this open-source project does NOT contain any official MTG ability icons or art assets from Wizards of the Coast.**

The icon placeholders you see in this project are for demonstration purposes only. This means when you clone this project:
- The `icons/` directory is empty (or only contains irrelevant placeholder images).
- If you need to display icons such as `Flying`, `Trample`, etc., **you must provide your own images with transparent backgrounds**.

---

## 🚀 Quick Start

This project is a pure front-end static webpage, **requiring NO dependency installation (like `npm install`) or server setup**!

1. Download or clone this project to your computer.
2. Open the folder and double-click **`index.html`**.
3. Ready to print: The system is pre-configured to fetch beautiful, open-source vector icons from **FontAwesome Free**. As long as you have an internet connection, it will seamlessly render high-definition ability counters without you needing to provide any image files!

---

## ⚙️ Configuration & Custom Icons

This project includes an independent configuration file, `config.js`. You can edit it to switch icon sources at any time:

- **Use Remote Open Source Assets (Default)**
  Set `AppConfig.useOpenSourceIcons` to `true`. The project will directly fetch the corresponding FontAwesome SVG files via the jsDelivr CDN. No image preparation is required.
- **Use Local Custom Images**
  If you want to use your own art assets, set this to `false`. Place your `.png` files with transparent backgrounds (e.g., `flying.png`, `first-strike.png`) in the root `icons/` folder. The system will prioritize your local image library.

## 👨‍💻 Development & Expansion
This is a minimalist project without heavy frameworks, `npm install`, or local Node.js servers. 
Any changes made to the CSS styles or HTML logic will take effect immediately upon refreshing the page.
You can freely expand the `keywordData` object in `script.js` to add entirely new custom counters!

## 📄 License
This code is released under the MIT License. You are free to modify, distribute, and use it for commercial or non-commercial purposes. However, please ensure that any private art assets you incorporate comply with relative legal copyrights.
