// Author: Arah J. Leonard
// Copyright 01AUG09
// Distributed under the LGPL - http://www.gnu.org/copyleft/lesser.html
// ALSO distributed under the The MIT License from the Open Source Initiative (OSI) - http://www.opensource.org/licenses/mit-license.php
// You may use EITHER of these licenses to work with / distribute this source code.
// Enjoy!

// Convert a red-green-blue system to a red-yellow-blue system.
var rgb2ryb = function(r, g, b) {
    // Remove the whiteness from the color.
    w = Math.min(r, g, b);
    r -= w;
    g -= w;
    b -= w;
    
    mg = Math.max(r, g, b);
    
    // Get the yellow out of the red+green.
    y = Math.min(r, g);
    r -= y;
    g -= y;
    
    // If this unfortunate conversion combines blue and green, then cut each
    // in half to preserve the value's maximum range.
    if(b && g) {
        b /= 2;
        g /= 2;
    }
    
    // Redistribute the remaining green.
    y += g;
    b += g;
    
    // Normalize to values.
    my = Math.max(r, y, b);
    if(my) {
        n = mg / my;
        r *= n;
        y *= n;
        b *= n;
    }

    // Add the white back in.
    r += w;
    y += w;
    b += w;

    // And return back the ryb typed accordingly.
    return [r, y, b];
};

// Convert a red-yellow-blue system to a red-green-blue system.
var ryb2rgb = function(r, y, b) {
    // Remove the whiteness from the color.
    w = Math.min(r, y, b);
    r -= w;
    y -= w;
    b -= w;

    my = Math.max(r, y, b);

    // Get the green out of the yellow and blue
    g = Math.min(y, b);
    y -= g;
    b -= g;

    if(b && g) {
        b *= 2;
        g *= 2;
    }

    // Redistribute the remaining yellow.
    r += y;
    g += y;

    // Normalize to values.
    mg = Math.max(r, g, b);
    if(mg) {
        n = my / mg;
        r *= n;
        g *= n;
        b *= n;
    }

    // Add the white back in.
    r += w;
    g += w;
    b += w;

    // And return back the ryb typed accordingly.
    return [r, g, b];
};

// Return the complementary color values for a given color.
//You must also give it the upper limit of the color values,
//typically 255 for GUIs, 1.0 for OpenGL.
var complimentary = function(r, g, b) {
    return [255 - r, 255 - g, 255 - b];
};

