# Interactive Color Space Viewer: sRGB vs AdobeRGB

## Description

This interactive web application is designed for educational purposes, allowing users to visualize and understand the differences between **sRGB** and **AdobeRGB** color spaces through the CIE 1931 xy chromaticity diagram.

**Perfect for:** Students, educators, photographers, graphic designers, and anyone interested in color science.

## Key Features

✨ **Real-time Color Controls** - HSL sliders with visual gradients  
📊 **Spectral Distribution Graph** - Shows RGB wavelength composition with envelope curve  
🎨 **CIE 1931 Chromaticity Diagram** - Full-color visualization of visible spectrum  
🔵 **sRGB Gamut** - Blue triangle showing standard RGB color space  
🟢 **AdobeRGB Gamut** - Green triangle showing extended color space  
📍 **Live Coordinate Tracking** - Watch color points move in real-time  
🚀 **Zero Dependencies** - Pure HTML/CSS/JavaScript, runs instantly  
📐 **Accurate Transformations** - Uses official ICC color space specifications

## Features

### Left Panel - Color Controls

#### HSL Color Sliders
- **Hue (H)**: Control the color tone from 0° to 360°
- **Saturation (S)**: Adjust color purity from 0% to 100%
- **Lightness (L)**: Change brightness from 0% to 100%
- Each slider displays a **visual gradient** showing the effect of that parameter

#### Selected Color Display
- **Color preview box**: Real-time display of the selected color
- **RGB values**: Numeric display in format `RGB: (xxx, xxx, xxx)`
- **HSL values**: Display of current HSL coordinates

#### RGB Spectral Distribution Graph
- **Wavelength-based visualization**: Shows the spectral distribution from 780nm (red) to 380nm (blue)
- **Individual RGB components**: Gaussian curves representing Red, Green, and Blue contributions
- **Envelope curve**: Black outline showing the total spectral intensity (sum of all components)
- **Real-time RGB values**: Displayed on the graph for each component
- **Updates dynamically**: Changes instantly when adjusting any slider

### Right Panel - CIE Chromaticity Diagram

#### CIE 1931 Diagram
- **Full-color background**: Uses the standard CIE 1931 chromaticity diagram from Wikimedia Commons
- **Visible spectrum**: Shows the horseshoe-shaped locus of monochromatic colors
- **Proper scaling**: Diagram ranges from 0-0.8 on x-axis and 0-0.9 on y-axis

#### Color Space Gamuts
- **sRGB gamut**: Blue triangle (#0066FF) showing the sRGB color space coverage
- **AdobeRGB gamut**: Green triangle (#00AA00) showing the wider AdobeRGB color space
- Both gamuts are drawn as transparent overlays on the colored background

#### Current Color Points
- **sRGB point**: Blue dot (#0066FF) showing where the current color maps in sRGB space
- **AdobeRGB point**: Green dot (#00AA00) showing where the current color maps in AdobeRGB space
- **Coordinate labels**: Real-time (x, y) coordinates displayed next to each point
- **Color coherence**: Gamuts and their corresponding points use matching colors for easy identification

#### CIE xy Coordinates
- **sRGB coordinates**: Precise x and y values for the sRGB color space
- **AdobeRGB coordinates**: Precise x and y values for the AdobeRGB color space
- **4 decimal precision**: Accurate to 0.0001

#### Legend
- Visual guide showing what each color and symbol represents
- Distinguishes between gamut boundaries and current color points

## Technical Details

The application uses real color profiles with the following specifications:

### sRGB Color Space
- **Primary Colors (CIE xy coordinates)**:
  - Red: (0.6400, 0.3300)
  - Green: (0.3000, 0.6000)
  - Blue: (0.1500, 0.0600)
  - White Point: D65 (0.3127, 0.3290)
- **Gamma**: 2.4 with standard sRGB correction
- **Transformation Matrix**: Standard sRGB to XYZ conversion matrix

### AdobeRGB (1998) Color Space
- **Primary Colors (CIE xy coordinates)**:
  - Red: (0.6400, 0.3300)
  - Green: (0.2100, 0.7100)
  - Blue: (0.1500, 0.0600)
  - White Point: D65 (0.3127, 0.3290)
- **Gamma**: 2.2
- **Transformation Matrix**: Standard AdobeRGB to XYZ conversion matrix

### Color Conversions

The application performs the following color space conversions:

1. **HSL → RGB**: Standard HSL to RGB conversion (0-255 range)
2. **RGB → XYZ**: Using specific transformation matrices for each color space
   - Applies appropriate gamma correction (sRGB: 2.4, AdobeRGB: 2.2)
3. **XYZ → xy**: Calculation of chromaticity coordinates
   - `x = X / (X + Y + Z)`
   - `y = Y / (X + Y + Z)`

### Spectral Distribution Simulation
- **Gaussian approximation**: Each RGB component is modeled as a Gaussian curve
- **Wavelength positions**:
  - Red: ~650nm (position 0.15 in normalized scale)
  - Green: ~530nm (position 0.5 in normalized scale)
  - Blue: ~460nm (position 0.85 in normalized scale)
- **Total intensity**: Envelope curve shows the sum of all three components

## How to Use

### Getting Started
1. Open the `index.html` file in a modern web browser
2. Alternatively, serve it through a local HTTP server (e.g., `python3 -m http.server 8000`)
3. The application loads instantly - no installation or dependencies required

### Interacting with the Application
1. **Adjust the HSL sliders** on the left panel to select a color:
   - Move the **Hue** slider to change the color tone
   - Adjust **Saturation** to make colors more vivid or muted
   - Change **Lightness** to make colors brighter or darker

2. **Observe real-time updates**:
   - Color preview box shows the selected color
   - RGB values update numerically
   - Spectral distribution graph shows the color composition
   - Points move on the CIE diagram
   - Coordinates update for both color spaces

### Understanding the Visualizations

#### Spectral Distribution Graph
- Shows how the color is composed of red, green, and blue wavelengths
- The black envelope curve represents the total intensity
- Lower lightness = lower curves overall
- Higher saturation = more defined peaks
- Changing hue shifts the balance between RGB components

#### CIE Chromaticity Diagram
- Points show where the color maps in each color space
- When increasing lightness above 50%, points move toward the white point (center)
- When decreasing lightness below 50%, points stay fixed (same chromaticity, less luminance)
- The diagram shows **chromaticity only**, not brightness

## Educational Purpose

This tool is valuable for:

### Understanding Color Spaces
- **Visualize gamut differences**: See how AdobeRGB covers more colors than sRGB, especially in greens and cyans
- **Compare color space mappings**: Understand how the same RGB values map to different chromaticity coordinates depending on the color space
- **Learn about chromaticity**: Observe that chromaticity (xy) is independent of luminance

### Teaching Color Science Concepts
- **Gamut**: The range of colors a color space can represent
- **Chromaticity vs. Luminance**: The CIE xy diagram shows color quality, not brightness
- **Color space transformations**: RGB → XYZ → xy conversions
- **Spectral distribution**: How colors are composed of different wavelengths

### Practical Applications
- **Compare color spaces** for photography and graphic design workflows
- **Understand why some colors look different** across devices
- **Learn when to use sRGB vs AdobeRGB** in professional workflows

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern layout (Grid, Flexbox) and styling
- **JavaScript (ES6+)**: Canvas API for all visualizations
- **External resources**: CIE 1931 diagram image from Wikimedia Commons
- **No frameworks or libraries**: Pure vanilla JavaScript for maximum performance

## Browser Compatibility

The application works in all modern browsers that support:
- HTML5 Canvas (with 2D context)
- CSS Grid Layout
- ES6 JavaScript features (arrow functions, template literals, const/let)
- Tested on: Chrome, Firefox, Safari, Edge

## Performance

- **Instant loading**: No external dependencies to download
- **Real-time updates**: All calculations run at 60 FPS
- **Optimized rendering**: Uses efficient Canvas drawing techniques
- **Background image caching**: CIE diagram loads once and is reused

## License

[![CC BY-SA 4.0](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-sa/4.0/)

This work is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).

**Copyright © 2024 Valentín Barral**

### You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

### Under the following terms:
- **Attribution** — You must give appropriate credit to Valentín Barral, provide a link to the license, and indicate if changes were made
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original

## Development

This project was developed using **AI-assisted coding** (vibe coding), which enabled rapid prototyping and implementation of complex color science algorithms. However, all code has been thoroughly **tested and validated by humans** to ensure accuracy, correctness, and educational value.

## Credits

- **Author**: Valentín Barral
- **CIE 1931 chromaticity diagram**: [Sakurambo](https://commons.wikimedia.org/wiki/User:Sakurambo) via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:CIExy1931.svg) ([CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/))
- **Color space specifications**: International Color Consortium (ICC) standards

