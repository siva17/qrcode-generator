var QRCodeClass = function(config){this._init(config);};
QRCodeClass.prototype = {
    /********************************************
     * PRIVATE Variables and functions - Begin
     *******************************************/
    // alignment pattern
    _adelta : [
    0, 11, 15, 19, 23, 27, 31, // force 1 pat
    16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24,
    26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28
    ],
    // version block
    _vpat : [
    0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d,
    0x928, 0xb78, 0x45d, 0xa17, 0x532, 0x9a6, 0x683, 0x8c9,
    0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75,
    0x250, 0x9d5, 0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64,
    0x541, 0xc69
    ],
    // final format bits with mask: level << 3 | mask
    _fmtword : [
    0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,    //L
    0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0,    //M
    0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed,    //Q
    0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b    //H
    ],
    // 4 per version: number of blocks 1,2; data width; ecc width
    _eccblocks : [
    1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17,
    1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28,
    1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22,
    1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16,
    1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22,
    2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28,
    2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26,
    2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26,
    2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24,
    2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28,
    4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24,
    2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28,
    4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22,
    3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24,
    5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24,
    5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30,
    1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28,
    5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28,
    3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26,
    3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28,
    4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30,
    2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24,
    4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30,
    6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30,
    8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30,
    10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30,
    8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30,
    3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30,
    7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30,
    5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30,
    13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30,
    17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30,
    17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30,
    13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30,
    12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30,
    6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30,
    17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30,
    4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30,
    20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30,
    19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30
    ],
    // Galois field log table
    _glog : [
    0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b,
    0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71,
    0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45,
    0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6,
    0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88,
    0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40,
    0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d,
    0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57,
    0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18,
    0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e,
    0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61,
    0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2,
    0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6,
    0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a,
    0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7,
    0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf
    ],
    // Galios field exponent table
    _gexp : [
    0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26,
    0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0,
    0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23,
    0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1,
    0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0,
    0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2,
    0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce,
    0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc,
    0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54,
    0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73,
    0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff,
    0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41,
    0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6,
    0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09,
    0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16,
    0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00
    ],
    // Badness coefficients.
    _N1 : 3,
    _N2 : 3,
    _N3 : 40,
    _N4 : 10,
    
    _qrImageID      : "qrImgID",
    _qrShowImage    : "yes",
    _qrCanvasID     : "qrCnvsID",
    _qrInputWidth   : 300,
    _qrFinalWidth   : 300,
    _qrWidth        : 0,
    _version        : 0,
    _neccblk1       : 0,
    _neccblk2       : 0,
    _datablkw       : 0,
    _eccblkwid      : 0,
    _ecclevel       : 1,    
    
    _strinbuf       : [],
    _eccbuf         : [],
    _qrframe        : [],
    _framask        : [],
    _rlens          : [],
    _genpoly        : [],
    
    _dotSize        : 20,
    _emptyBlockSize : 4, // 4 blocks of empty space
    
    _init : function(config) {
        
        var thisObject = this;
        
        var canvasElement = document.createElement("canvas");
        canvasElement.setAttribute("width",  thisObject._qrInputWidth);
        canvasElement.setAttribute("height", thisObject._qrInputWidth);
        canvasElement.setAttribute("id",     thisObject._qrCanvasID);
        document.body.appendChild(canvasElement);
    },
    
    _setmask : function(x, y) {
        // set bit to indicate cell in _qrframe is immutable.  symmetric around diagonal
        var bt;
        if (x > y) {
            bt = x;
            x = y;
            y = bt;
        }
        // y*y = 1+3+5...
        bt = y;
        bt *= y;
        bt += y;
        bt >>= 1;
        bt += x;
        this._framask[bt] = 1;
    },
    
    // check mask - since symmetrical use half.
    _ismasked : function(x, y) {
        var bt;
        if (x > y) {
            bt = x;
            x = y;
            y = bt;
        }
        bt = y;
        bt += y * y;
        bt >>= 1;
        bt += x;
        return this._framask[bt];
    },
    
    _putalign : function(x, y) {
        // enter alignment pattern - black to _qrframe, white to mask (later black frame merged to mask)
        var thisObject = this;
        
        var j;
        
        thisObject._qrframe[x + thisObject._qrWidth * y] = 1;
        for (j = -2; j < 2; j++) {
            thisObject._qrframe[(x + j) + thisObject._qrWidth * (y - 2)] = 1;
            thisObject._qrframe[(x - 2) + thisObject._qrWidth * (y + j + 1)] = 1;
            thisObject._qrframe[(x + 2) + thisObject._qrWidth * (y + j)] = 1;
            thisObject._qrframe[(x + j + 1) + thisObject._qrWidth * (y + 2)] = 1;
        }
        for (j = 0; j < 2; j++) {
            thisObject._setmask(x - 1, y + j);
            thisObject._setmask(x + 1, y - j);
            thisObject._setmask(x - j, y - 1);
            thisObject._setmask(x + j, y + 1);
        }
    },
    
    // Reed Solomon error correction. exponentiation mod N
    _modnn : function(x) {
        while (x >= 255) {
            x -= 255;
            x = (x >> 8) + (x & 255);
        }
        return x;
    },
    
    _appendrs : function(data, dlen, ecbuf, eclen) {
        
        var thisObject = this;
        
        // Calculate and append ECC data to data block.  Block is in _strinbuf, indexes to buffers given.
        var i, j, fb;
        var _glog = thisObject._glog;
        var _gexp = thisObject._gexp;
        
        for (i = 0; i < eclen; i++)
        thisObject._strinbuf[ecbuf + i] = 0;
        for (i = 0; i < dlen; i++) {
            fb = _glog[thisObject._strinbuf[data + i] ^ thisObject._strinbuf[ecbuf]];
            if (fb != 255)     /* fb term is non-zero */
            for (j = 1; j < eclen; j++)
            thisObject._strinbuf[ecbuf + j - 1] = thisObject._strinbuf[ecbuf + j] ^ _gexp[thisObject._modnn(fb + thisObject._genpoly[eclen - j])];
            else
            for( j = ecbuf ; j < ecbuf + eclen; j++ )
            thisObject._strinbuf[j] = thisObject._strinbuf[j + 1];
            thisObject._strinbuf[ ecbuf + eclen - 1] = fb == 255 ? 0 : _gexp[thisObject._modnn(fb + thisObject._genpoly[0])];
        }
    },
    
    //  Apply the selected mask out of the 8.
    _applymask : function(m) {
        
        var thisObject = this;
        
        var x, y, r3x, r3y;
        
        switch (m) {
            case 0:
            for (y = 0; y < thisObject._qrWidth; y++)
            for (x = 0; x < thisObject._qrWidth; x++)
            if (!((x + y) & 1) && !thisObject._ismasked(x, y))
            thisObject._qrframe[x + y * thisObject._qrWidth] ^= 1;
            break;
            case 1:
            for (y = 0; y < thisObject._qrWidth; y++)
            for (x = 0; x < thisObject._qrWidth; x++)
            if (!(y & 1) && !thisObject._ismasked(x, y))
            thisObject._qrframe[x + y * thisObject._qrWidth] ^= 1;
            break;
            case 2:
            for (y = 0; y < thisObject._qrWidth; y++)
            for (r3x = 0, x = 0; x < thisObject._qrWidth; x++, r3x++) {
                if (r3x == 3) r3x = 0;
                if (!r3x && !thisObject._ismasked(x, y))
                thisObject._qrframe[x + y * thisObject._qrWidth] ^= 1;
            }
            break;
            case 3:
            for (r3y = 0, y = 0; y < thisObject._qrWidth; y++, r3y++) {
                if (r3y == 3) r3y = 0;
                for (r3x = r3y, x = 0; x < thisObject._qrWidth; x++, r3x++) {
                    if (r3x == 3) r3x = 0;
                    if (!r3x && !thisObject._ismasked(x, y))
                    thisObject._qrframe[x + y * thisObject._qrWidth] ^= 1;
                }
            }
            break;
            case 4:
            for (y = 0; y < thisObject._qrWidth; y++)
            for (r3x = 0, r3y = ((y >> 1) & 1), x = 0; x < thisObject._qrWidth; x++, r3x++) {
                if (r3x == 3) {
                    r3x = 0;
                    r3y = !r3y;
                }
                if (!r3y && !thisObject._ismasked(x, y))
                thisObject._qrframe[x + y * thisObject._qrWidth] ^= 1;
            }
            break;
            case 5:
            for (r3y = 0, y = 0; y < thisObject._qrWidth; y++, r3y++) {
                if (r3y == 3) r3y = 0;
                for (r3x = 0, x = 0; x < thisObject._qrWidth; x++, r3x++) {
                    if (r3x == 3) r3x = 0;
                    if (!((x & y & 1) + !(!r3x | !r3y)) && !thisObject._ismasked(x, y))
                    thisObject._qrframe[x + y * thisObject._qrWidth] ^= 1;
                }
            }
            break;
            case 6:
            for (r3y = 0, y = 0; y < thisObject._qrWidth; y++, r3y++) {
                if (r3y == 3) r3y = 0;
                for (r3x = 0, x = 0; x < thisObject._qrWidth; x++, r3x++) {
                    if (r3x == 3) r3x = 0;
                    if (!(((x & y & 1) + (r3x && (r3x == r3y))) & 1) && !thisObject._ismasked(x, y))
                    thisObject._qrframe[x + y * thisObject._qrWidth] ^= 1;
                }
            }
            break;
            case 7:
            for (r3y = 0, y = 0; y < thisObject._qrWidth; y++, r3y++) {
                if (r3y == 3) r3y = 0;
                for (r3x = 0, x = 0; x < thisObject._qrWidth; x++, r3x++) {
                    if (r3x == 3) r3x = 0;
                    if (!(((r3x && (r3x == r3y)) + ((x + y) & 1)) & 1) && !thisObject._ismasked(x, y))
                    thisObject._qrframe[x + y * thisObject._qrWidth] ^= 1;
                }
            }
            break;
        }
        return;
    },
    
    _badruns : function(length) {
        
        var thisObject = this;
        
        /*
         * Using the table of the length of each run, calculate the amount of bad image 
         * long runs or those that look like finders; called twice, once each for X and Y
         */
        var i;
        var runsbad = 0;
        for (i = 0; i <= length; i++)
        if (thisObject._rlens[i] >= 5)
        runsbad += thisObject._N1 + thisObject._rlens[i] - 5;
        // BwBBBwB as in finder
        for (i = 3; i < length - 1; i += 2)
        if (thisObject._rlens[i - 2] == thisObject._rlens[i + 2]
        && thisObject._rlens[i + 2] == thisObject._rlens[i - 1]
        && thisObject._rlens[i - 1] == thisObject._rlens[i + 1]
        && thisObject._rlens[i - 1] * 3 == thisObject._rlens[i]
        // white around the black pattern? Not part of spec
        && (thisObject._rlens[i - 3] == 0 // beginning
        || i + 3 > length  // end
        || thisObject._rlens[i - 3] * 3 >= thisObject._rlens[i] * 4 || thisObject._rlens[i + 3] * 3 >= thisObject._rlens[i] * 4)
        )
        runsbad += thisObject._N3;
        return runsbad;
    },
    
    _badcheck : function() {
        
        var thisObject = this;
        
        // Calculate how bad the masked image is - blocks, imbalance, runs, or finders.
        var x, y, h, b, b1;
        var thisbad = 0;
        var bw = 0;
        
        // blocks of same color.
        for (y = 0; y < thisObject._qrWidth - 1; y++)
        for (x = 0; x < thisObject._qrWidth - 1; x++)
        if ((thisObject._qrframe[x + thisObject._qrWidth * y] && thisObject._qrframe[(x + 1) + thisObject._qrWidth * y]
        && thisObject._qrframe[x + thisObject._qrWidth * (y + 1)] && thisObject._qrframe[(x + 1) + thisObject._qrWidth * (y + 1)]) // all black
        || !(thisObject._qrframe[x + thisObject._qrWidth * y] || thisObject._qrframe[(x + 1) + thisObject._qrWidth * y]
        || thisObject._qrframe[x + thisObject._qrWidth * (y + 1)] || thisObject._qrframe[(x + 1) + thisObject._qrWidth * (y + 1)])) // all white
        thisbad += thisObject._N2;
        
        // X runs
        for (y = 0; y < thisObject._qrWidth; y++) {
            thisObject._rlens[0] = 0;
            for (h = b = x = 0; x < thisObject._qrWidth; x++) {
                if ((b1 = thisObject._qrframe[x + thisObject._qrWidth * y]) == b) thisObject._rlens[h]++;
                else thisObject._rlens[++h] = 1;
                b = b1;
                bw += b ? 1 : -1;
            }
            thisbad += thisObject._badruns(h);
        }
        
        // black/white imbalance
        if (bw < 0) bw = -bw;
        
        var big = bw;
        count = 0;
        big += big << 2;
        big <<= 1;
        while (big > thisObject._qrWidth * thisObject._qrWidth) {
            big -= thisObject._qrWidth * thisObject._qrWidth, count++;
        }
        thisbad += count * thisObject._N4;
        
        // Y runs
        for (x = 0; x < thisObject._qrWidth; x++) {
            thisObject._rlens[0] = 0;
            for (h = b = y = 0; y < thisObject._qrWidth; y++) {
                if ((b1 = thisObject._qrframe[x + thisObject._qrWidth * y]) == b) thisObject._rlens[h]++;
                else thisObject._rlens[++h] = 1;
                b = b1;
            }
            thisbad += thisObject._badruns(h);
        }
        return thisbad;
    },
    
    _generateQRCodeFrame : function(instring) {
        
        var thisObject = this;
        
        var x, y, k, t, v, i, j, m;
        
        // find the smallest version that fits the string
        t = instring.length;
        thisObject._version = 0;
        var _eccblocks = thisObject._eccblocks;
        do {
            thisObject._version++;
            k = (thisObject._ecclevel - 1) * 4 + (thisObject._version - 1) * 16;
            
            thisObject._neccblk1  = _eccblocks[k++];
            thisObject._neccblk2  = _eccblocks[k++];
            thisObject._datablkw  = _eccblocks[k++];
            thisObject._eccblkwid = _eccblocks[k];
            
            k = thisObject._datablkw * (thisObject._neccblk1 + thisObject._neccblk2) + thisObject._neccblk2 - 3 + (thisObject._version <= 9);
            if (t <= k) break;
        } while (thisObject._version < 40);
        
        // FIXME - insure that it fits insted of being truncated
        thisObject._qrWidth = 17 + 4 * thisObject._version;
        
        // allocate, clear and setup data structures
        v = thisObject._datablkw + (thisObject._datablkw + thisObject._eccblkwid) * (thisObject._neccblk1 + thisObject._neccblk2) + thisObject._neccblk2;
        for( t = 0; t < v; t++ ) thisObject._eccbuf[t] = 0;
        thisObject._strinbuf = instring.slice(0);
        
        for( t = 0; t < thisObject._qrWidth * thisObject._qrWidth; t++ ) thisObject._qrframe[t] = 0;
        
        for( t = 0 ; t < (thisObject._qrWidth * (thisObject._qrWidth + 1) + 1) / 2; t++) thisObject._framask[t] = 0;
        
        // insert finders - black to frame, white to mask
        for (t = 0; t < 3; t++) {
            k = 0;
            y = 0;
            if (t == 1) k = (thisObject._qrWidth - 7);
            if (t == 2) y = (thisObject._qrWidth - 7);
            thisObject._qrframe[(y + 3) + thisObject._qrWidth * (k + 3)] = 1;
            for (x = 0; x < 6; x++) {
                thisObject._qrframe[(y + x) + thisObject._qrWidth * k] = 1;
                thisObject._qrframe[y + thisObject._qrWidth * (k + x + 1)] = 1;
                thisObject._qrframe[(y + 6) + thisObject._qrWidth * (k + x)] = 1;
                thisObject._qrframe[(y + x + 1) + thisObject._qrWidth * (k + 6)] = 1;
            }
            for (x = 1; x < 5; x++) {
                thisObject._setmask(y + x, k + 1);
                thisObject._setmask(y + 1, k + x + 1);
                thisObject._setmask(y + 5, k + x);
                thisObject._setmask(y + x + 1, k + 5);
            }
            for (x = 2; x < 4; x++) {
                thisObject._qrframe[(y + x) + thisObject._qrWidth * (k + 2)] = 1;
                thisObject._qrframe[(y + 2) + thisObject._qrWidth * (k + x + 1)] = 1;
                thisObject._qrframe[(y + 4) + thisObject._qrWidth * (k + x)] = 1;
                thisObject._qrframe[(y + x + 1) + thisObject._qrWidth * (k + 4)] = 1;
            }
        }
        
        // alignment blocks
        if (thisObject._version > 1) {
            t = thisObject._adelta[thisObject._version];
            y = thisObject._qrWidth - 7;
            for (;;) {
                x = thisObject._qrWidth - 7;
                while (x > t - 3) {
                    thisObject._putalign(x, y);
                    if (x < t) break;
                    x -= t;
                }
                if (y <= t + 9) break;
                y -= t;
                thisObject._putalign(6, y);
                thisObject._putalign(y, 6);
            }
        }
        
        // single black
        thisObject._qrframe[8 + thisObject._qrWidth * (thisObject._qrWidth - 8)] = 1;
        
        // timing gap - mask only
        for (y = 0; y < 7; y++) {
            thisObject._setmask(7, y);
            thisObject._setmask(thisObject._qrWidth - 8, y);
            thisObject._setmask(7, y + thisObject._qrWidth - 7);
        }
        for (x = 0; x < 8; x++) {
            thisObject._setmask(x, 7);
            thisObject._setmask(x + thisObject._qrWidth - 8, 7);
            thisObject._setmask(x, thisObject._qrWidth - 8);
        }
        
        // reserve mask-format area
        for (x = 0; x < 9; x++) thisObject._setmask(x, 8);
        for (x = 0; x < 8; x++) {
            thisObject._setmask(x + thisObject._qrWidth - 8, 8);
            thisObject._setmask(8, x);
        }
        for (y = 0; y < 7; y++) thisObject._setmask(8, y + thisObject._qrWidth - 7);
        
        // timing row/col
        for (x = 0; x < thisObject._qrWidth - 14; x++)
        if (x & 1) {
            thisObject._setmask(8 + x, 6);
            thisObject._setmask(6, 8 + x);
        } else {
            thisObject._qrframe[(8 + x) + thisObject._qrWidth * 6] = 1;
            thisObject._qrframe[6 + thisObject._qrWidth * (8 + x)] = 1;
        }
        
        // version block
        if (thisObject._version > 6) {
            t = thisObject._vpat[thisObject._version - 7];
            k = 17;
            for (x = 0; x < 6; x++)
            for (y = 0; y < 3; y++, k--)
            if (1 & (k > 11 ? thisObject._version >> (k - 12) : t >> k)) {
                thisObject._qrframe[(5 - x) + thisObject._qrWidth * (2 - y + thisObject._qrWidth - 11)] = 1;
                thisObject._qrframe[(2 - y + thisObject._qrWidth - 11) + thisObject._qrWidth * (5 - x)] = 1;
            } else {
                thisObject._setmask(5 - x, 2 - y + thisObject._qrWidth - 11);
                thisObject._setmask(2 - y + thisObject._qrWidth - 11, 5 - x);
            }
        }
        
        // sync mask bits - only set above for white spaces, so add in black bits
        for (y = 0; y < thisObject._qrWidth; y++)
        for (x = 0; x <= y; x++)
        if (thisObject._qrframe[x + thisObject._qrWidth * y]) thisObject._setmask(x, y);
        
        // convert string to bitstream
        // 8 bit data to QR-coded 8 bit data (numeric or alphanum, or kanji not supported)
        v = thisObject._strinbuf.length;
        
        // string to array
        for( i = 0 ; i < v; i++ ) thisObject._eccbuf[i] = thisObject._strinbuf.charCodeAt(i);
        thisObject._strinbuf = thisObject._eccbuf.slice(0);
        
        // calculate max string length
        x = thisObject._datablkw * (thisObject._neccblk1 + thisObject._neccblk2) + thisObject._neccblk2;
        if (v >= x - 2) {
            v = x - 2;
            if (thisObject._version > 9) v--;
        }
        
        // shift and repack to insert length prefix
        i = v;
        if (thisObject._version > 9) {
            thisObject._strinbuf[i + 2] = 0;
            thisObject._strinbuf[i + 3] = 0;
            while (i--) {
                t = thisObject._strinbuf[i];
                thisObject._strinbuf[i + 3] |= 255 & (t << 4);
                thisObject._strinbuf[i + 2] = t >> 4;
            }
            thisObject._strinbuf[2] |= 255 & (v << 4);
            thisObject._strinbuf[1] = v >> 4;
            thisObject._strinbuf[0] = 0x40 | (v >> 12);
        }
        else {
            thisObject._strinbuf[i + 1] = 0;
            thisObject._strinbuf[i + 2] = 0;
            while (i--) {
                t = thisObject._strinbuf[i];
                thisObject._strinbuf[i + 2] |= 255 & (t << 4);
                thisObject._strinbuf[i + 1] = t >> 4;
            }
            thisObject._strinbuf[1] |= 255 & (v << 4);
            thisObject._strinbuf[0] = 0x40 | (v >> 4);
        }
        // fill to end with pad pattern
        i = v + 3 - (thisObject._version < 10);
        while (i < x) {
            thisObject._strinbuf[i++] = 0xec;
            // buffer has room    if (i == x)      break;
            thisObject._strinbuf[i++] = 0x11;
        }
        
        // calculate and append ECC
        
        // calculate generator polynomial
        var _glog = thisObject._glog;
        var _gexp = thisObject._gexp;
        thisObject._genpoly[0] = 1;
        for (i = 0; i < thisObject._eccblkwid; i++) {
            thisObject._genpoly[i + 1] = 1;
            for (j = i; j > 0; j--)
            thisObject._genpoly[j] = thisObject._genpoly[j]
            ? thisObject._genpoly[j - 1] ^ _gexp[thisObject._modnn(_glog[thisObject._genpoly[j]] + i)] : thisObject._genpoly[j - 1];
            thisObject._genpoly[0] = _gexp[thisObject._modnn(_glog[thisObject._genpoly[0]] + i)];
        }
        for (i = 0; i <= thisObject._eccblkwid; i++)
        thisObject._genpoly[i] = _glog[thisObject._genpoly[i]]; // use logs for _genpoly[] to save calc step
        
        // append ecc to data buffer
        k = x;
        y = 0;
        for (i = 0; i < thisObject._neccblk1; i++) {
            thisObject._appendrs(y, thisObject._datablkw, k, thisObject._eccblkwid);
            y += thisObject._datablkw;
            k += thisObject._eccblkwid;
        }
        for (i = 0; i < thisObject._neccblk2; i++) {
            thisObject._appendrs(y, thisObject._datablkw + 1, k, thisObject._eccblkwid);
            y += thisObject._datablkw + 1;
            k += thisObject._eccblkwid;
        }
        // interleave blocks
        y = 0;
        for (i = 0; i < thisObject._datablkw; i++) {
            for (j = 0; j < thisObject._neccblk1; j++)
            thisObject._eccbuf[y++] = thisObject._strinbuf[i + j * thisObject._datablkw];
            for (j = 0; j < thisObject._neccblk2; j++)
            thisObject._eccbuf[y++] = thisObject._strinbuf[(thisObject._neccblk1 * thisObject._datablkw) + i + (j * (thisObject._datablkw + 1))];
        }
        for (j = 0; j < thisObject._neccblk2; j++)
        thisObject._eccbuf[y++] = thisObject._strinbuf[(thisObject._neccblk1 * thisObject._datablkw) + i + (j * (thisObject._datablkw + 1))];
        for (i = 0; i < thisObject._eccblkwid; i++)
        for (j = 0; j < thisObject._neccblk1 + thisObject._neccblk2; j++)
        thisObject._eccbuf[y++] = thisObject._strinbuf[x + i + j * thisObject._eccblkwid];
        thisObject._strinbuf = thisObject._eccbuf;
        
        // pack bits into frame avoiding masked area.
        x = y = thisObject._qrWidth - 1;
        k = v = 1;         // up, minus
        /* inteleaved data and ecc codes */
        m = (thisObject._datablkw + thisObject._eccblkwid) * (thisObject._neccblk1 + thisObject._neccblk2) + thisObject._neccblk2;
        for (i = 0; i < m; i++) {
            t = thisObject._strinbuf[i];
            for (j = 0; j < 8; j++, t <<= 1) {
                if (0x80 & t) thisObject._qrframe[x + thisObject._qrWidth * y] = 1;
                do {        // find next fill position
                    if (v) x--;
                    else {
                        x++;
                        if (k) {
                            if (y != 0) y--;
                            else {
                                x -= 2;
                                k = !k;
                                if (x == 6) {
                                    x--;
                                    y = 9;
                                }
                            }
                        }
                        else {
                            if (y != thisObject._qrWidth - 1) y++;
                            else {
                                x -= 2;
                                k = !k;
                                if (x == 6) {
                                    x--;
                                    y -= 8;
                                }
                            }
                        }
                    }
                    v = !v;
                } while (thisObject._ismasked(x, y));
            }
        }
        
        // save pre-mask copy of frame
        thisObject._strinbuf = thisObject._qrframe.slice(0);
        t = 0;           // best
        y = 30000;         // demerit
        // for instead of while since in original arduino code
        // if an early mask was "good enough" it wouldn't try for a better one
        // since they get more complex and take longer.
        for (k = 0; k < 8; k++) {
            thisObject._applymask(k);      // returns black-white imbalance
            x = thisObject._badcheck();
            if (x < y) { // current mask better than previous best?
                y = x;
                t = k;
            }
            if (t == 7) break;  // don't increment i to a void redoing mask
            thisObject._qrframe = thisObject._strinbuf.slice(0); // reset for next pass
        }
        if (t != k) thisObject._applymask(t); // redo best mask - none good enough, last wasn't t
        
        // add in final mask/ecclevel bytes
        y = thisObject._fmtword[t + ((thisObject._ecclevel - 1) << 3)];
        // low byte
        for (k = 0; k < 8; k++, y >>= 1)
        if (y & 1) {
            thisObject._qrframe[(thisObject._qrWidth - 1 - k) + thisObject._qrWidth * 8] = 1;
            if (k < 6) thisObject._qrframe[8 + thisObject._qrWidth * k] = 1;
            else thisObject._qrframe[8 + thisObject._qrWidth * (k + 1)] = 1;
        }
        // high byte
        for (k = 0; k < 7; k++, y >>= 1)
        if (y & 1) {
            thisObject._qrframe[8 + thisObject._qrWidth * (thisObject._qrWidth - 7 + k)] = 1;
            if (k) thisObject._qrframe[(6 - k) + thisObject._qrWidth * 8] = 1;
            else thisObject._qrframe[7 + thisObject._qrWidth * 8] = 1;
        }
        
        // return image
        return thisObject._qrframe;
    },
    
    _getNewDimensions : function(dw,dh,sw,sh) {
        try {
            var nw = dw;
            var nh = dh;
            
            if((dw/dh) > 1) {
                // More or equal width
                nw = dw;
                nh = sh * (dw/sw);
                if(nh > dh) {
                    nw = nw *(dh/nh);
                    nh = dh;
                }
            } else {
                // More Height
                nh = dh;
                nw = sw * (dh/sh);
                if(nw > dw) {
                    nh = nh *(dw/nw);
                    nw = dw;
                }
            }
            
            return {
                "w":nw,
                "h":nh
            };
        } catch(e) {
            console.error("Exception: _getNewDimensions",e);
        }
        return null;
    },
    
    _fillRectR : function(canvas2D, x,y,w,h,r) {
        if (typeof r === "undefined") r = 5;

        canvas2D.beginPath();
        canvas2D.moveTo(x + r, y);
        canvas2D.lineTo(x + w - r, y);
        canvas2D.quadraticCurveTo(x + w, y, x + w, y + r);
        canvas2D.lineTo(x + w, y + h - r);
        canvas2D.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        canvas2D.lineTo(x + r, y + h);
        canvas2D.quadraticCurveTo(x, y + h, x, y + h - r);
        canvas2D.lineTo(x, y + r);
        canvas2D.quadraticCurveTo(x, y, x + r, y);
        canvas2D.closePath();
        canvas2D.fill();
    },
    
    _fillRectFill : function(canvas2D, x,y,w,h,r,qrCodeFrame,qrWidth,i,j) {
        if (typeof r === "undefined") r = 5;
        
        var leftDot   = ((i>0)?(qrCodeFrame[(j)*qrWidth+(i-1)]):(0));
        var rightDot  = ((i<(qrWidth-1))?(qrCodeFrame[(j)*qrWidth+(i+1)]):(0));
        var topDot    = ((j>0)?(qrCodeFrame[(j-1)*qrWidth+(i)]):(0));
        var bottomDot = ((j<(qrWidth-1))?(qrCodeFrame[(j+1)*qrWidth+(i)]):(0));
        
        var dLeftTopDot     = (((i>0)&&(j>0))?(qrCodeFrame[(j-1)*qrWidth+(i-1)]):(0));
        var dRightTopDot    = (((i<(qrWidth-1))&&(j>0))?(qrCodeFrame[(j-1)*qrWidth+(i+1)]):(0));
        var dRightbottomDot = (((i<(qrWidth-1))&&(j>0))?(qrCodeFrame[(j+1)*qrWidth+(i+1)]):(0));
        var dLeftBottomDot  = (((i>0)&&(j<(qrWidth-1)))?(qrCodeFrame[(j+1)*qrWidth+(i-1)]):(0));
        
        var tlr = ((leftDot || topDot || dLeftTopDot)?(0):(r));
        var trr = ((topDot || rightDot || dRightTopDot)?(0):(r));
        var brr = ((bottomDot || rightDot || dRightbottomDot)?(0):(r));
        var blr = ((leftDot || bottomDot || dLeftBottomDot)?(0):(r));
        
        canvas2D.beginPath();        
        canvas2D.moveTo(x + tlr, y);
        
        canvas2D.lineTo(x + w - trr, y);
        canvas2D.quadraticCurveTo(x + w, y, x + w, y + trr);
        
        canvas2D.lineTo(x + w, y + h - brr);
        canvas2D.quadraticCurveTo(x + w, y + h, x + w - brr, y + h);
        
        canvas2D.lineTo(x + blr, y + h);
        canvas2D.quadraticCurveTo(x, y + h, x, y + h - blr);
        
        canvas2D.lineTo(x, y + tlr);
        canvas2D.quadraticCurveTo(x, y, x + tlr, y);
        
        canvas2D.closePath();
        canvas2D.fill();
    },
    
    _fillRectDeFill : function(canvas2D, x,y,w,h,r,qrCodeFrame,qrWidth,i,j) {
        if (typeof r === "undefined") r = 5;
        
        var leftDot   = ((i>0)?(qrCodeFrame[(j)*qrWidth+(i-1)]):(0));
        var rightDot  = ((i<(qrWidth-1))?(qrCodeFrame[(j)*qrWidth+(i+1)]):(0));
        var topDot    = ((j>0)?(qrCodeFrame[(j-1)*qrWidth+(i)]):(0));
        var bottomDot = ((j<(qrWidth-1))?(qrCodeFrame[(j+1)*qrWidth+(i)]):(0));
        
        var tlr = (!(leftDot || topDot)?(0):(r));
        var trr = (!(topDot || rightDot)?(0):(r));
        var brr = (!(bottomDot || rightDot)?(0):(r));
        var blr = (!(leftDot || bottomDot)?(0):(r));
        
        canvas2D.beginPath();        
        canvas2D.moveTo(x + tlr, y);
        
        canvas2D.lineTo(x + w - trr, y);
        canvas2D.quadraticCurveTo(x + w, y, x + w, y + trr);
        
        canvas2D.lineTo(x + w, y + h - brr);
        canvas2D.quadraticCurveTo(x + w, y + h, x + w - brr, y + h);
        
        canvas2D.lineTo(x + blr, y + h);
        canvas2D.quadraticCurveTo(x, y + h, x, y + h - blr);
        
        canvas2D.lineTo(x, y + tlr);
        canvas2D.quadraticCurveTo(x, y, x + tlr, y);
        
        canvas2D.closePath();
        canvas2D.fill();
    },
    
    _fillCurve : function(canvas2D, x,y,w,h,r) {
        if (typeof r === "undefined") r = 5;
        
        canvas2D.beginPath();
        canvas2D.bezierCurveTo(x,   y,      x+(w/2),    y+r,        x+w, y);
        canvas2D.bezierCurveTo(x+w, y,      (x+w)-r,    y+(h/2),    x+w, y+h);
        canvas2D.bezierCurveTo(x+w, y+h,    x+(w/2),    ((y+h)-r),  x,   y+h);
        canvas2D.bezierCurveTo(x,   y+h,    x+r,        y+(h/2),    x,   y);
        canvas2D.fill();
    },
    
    _fillCurveFill : function(canvas2D, x,y,w,h,r,qrCodeFrame,qrWidth,i,j) {
        if (typeof r === "undefined") r = 5;
        
        var leftDot   = ((i>0)?(qrCodeFrame[(j)*qrWidth+(i-1)]):(0));
        var rightDot  = ((i<(qrWidth-1))?(qrCodeFrame[(j)*qrWidth+(i+1)]):(0));
        var topDot    = ((j>0)?(qrCodeFrame[(j-1)*qrWidth+(i)]):(0));
        var bottomDot = ((j<(qrWidth-1))?(qrCodeFrame[(j+1)*qrWidth+(i)]):(0));
                
        canvas2D.beginPath();
        if(topDot) canvas2D.bezierCurveTo(x,y,x+w,y,x+w,y);
        else canvas2D.bezierCurveTo(x,   y,      x+(w/2),    y+r,        x+w, y);
        
        if(rightDot) canvas2D.bezierCurveTo(x+w,y,x+w,y+h,x+w,y+h);
        else canvas2D.bezierCurveTo(x+w, y,      (x+w)-r,    y+(h/2),    x+w, y+h);
        
        if(bottomDot) canvas2D.bezierCurveTo(x+w,y+h,x,y+h,x,y+h);
        else canvas2D.bezierCurveTo(x+w, y+h,    x+(w/2),    ((y+h)-r),  x,   y+h);
        
        if(leftDot) canvas2D.bezierCurveTo(x,y+h,x,y,x,y);
        else canvas2D.bezierCurveTo(x,   y+h,    x+r,        y+(h/2),    x,   y);
        
        canvas2D.fill();
    },
    
    _fillCurveDeFill : function(canvas2D, x,y,w,h,r,qrCodeFrame,qrWidth,i,j) {
        if (typeof r === "undefined") r = 5;
        
        var leftDot   = ((i>0)?(qrCodeFrame[(j)*qrWidth+(i-1)]):(0));
        var rightDot  = ((i<(qrWidth-1))?(qrCodeFrame[(j)*qrWidth+(i+1)]):(0));
        var topDot    = ((j>0)?(qrCodeFrame[(j-1)*qrWidth+(i)]):(0));
        var bottomDot = ((j<(qrWidth-1))?(qrCodeFrame[(j+1)*qrWidth+(i)]):(0));
        
        canvas2D.beginPath();
        if(!topDot) canvas2D.bezierCurveTo(x,y,x+w,y,x+w,y);
        else canvas2D.bezierCurveTo(x,   y,      x+(w/2),    y+r,        x+w, y);
        
        if(!rightDot) canvas2D.bezierCurveTo(x+w,y,x+w,y+h,x+w,y+h);
        else canvas2D.bezierCurveTo(x+w, y,      (x+w)-r,    y+(h/2),    x+w, y+h);
        
        if(!bottomDot) canvas2D.bezierCurveTo(x+w,y+h,x,y+h,x,y+h);
        else canvas2D.bezierCurveTo(x+w, y+h,    x+(w/2),    ((y+h)-r),  x,   y+h);
        
        if(!leftDot) canvas2D.bezierCurveTo(x,y+h,x,y,x,y);
        else canvas2D.bezierCurveTo(x,   y+h,    x+r,        y+(h/2),    x,   y);
        
        canvas2D.fill();
    },
    
    _fillRectReverseFill : function(canvas2D, x,y,w,h,r,left,right,top,bottom) {
        if (typeof r === "undefined") r = 5;
        
        canvas2D.beginPath();
        
        var tlr = (!(left && top)?(0):(r));
        var trr = (!(top && right)?(0):(r));
        var brr = (!(bottom && right)?(0):(r));
        var blr = (!(left && bottom)?(0):(r));
        
        canvas2D.moveTo(x + tlr, y);
        
        canvas2D.lineTo(x + w - trr, y);
        canvas2D.quadraticCurveTo(x + w, y, x + w, y + trr);
        
        canvas2D.lineTo(x + w, y + h - brr);
        canvas2D.quadraticCurveTo(x + w, y + h, x + w - brr, y + h);
        
        canvas2D.lineTo(x + blr, y + h);
        canvas2D.quadraticCurveTo(x, y + h, x, y + h - blr);
        
        canvas2D.lineTo(x, y + tlr);
        canvas2D.quadraticCurveTo(x, y, x + tlr, y);
        
        canvas2D.closePath();
        canvas2D.fill();
    },
    
    _fillQRSquares : function(qrCanvas,boxType) {
        var thisObject  = this;
        var qrColors    = thisObject.colors;
        var px          = thisObject._dotSize;
        var radius      = ((thisObject.fillValue != thisObject.fillType.SQUARE)?(px):(0));
        var width       = thisObject._qrWidth;
        var emptySpace  = thisObject._emptyBlockSize;

        if(boxType == "f") {
            var canvasWidth = thisObject._qrFinalWidth;
            qrCanvas.clearRect(0,0,canvasWidth,canvasWidth);
            qrCanvas.fillStyle = '#'+thisObject.colors.bg;
            qrCanvas.fillRect(0,0,canvasWidth,canvasWidth);
            return;
        }
        
        if((boxType == "l") || (boxType == "r") || (boxType == "b")) {
            var borderColor = qrColors.lBorder;
            var fillColor   = qrColors.lFill;
            var xValue      = px*emptySpace;
            var yValue      = px*emptySpace;
            
            if(boxType == "l") {
                borderColor = qrColors.lBorder;
                fillColor   = qrColors.lFill;
                xValue      = emptySpace;
                yValue      = emptySpace;
            } else if(boxType == "r") {            
                borderColor = qrColors.rBorder;
                fillColor   = qrColors.rFill;
                xValue      = ((width - emptySpace)+1);
                yValue      = emptySpace;
            } else if(boxType == "b") {            
                borderColor = qrColors.bBorder;
                fillColor   = qrColors.bFill;
                xValue      = emptySpace;
                yValue      = ((width - emptySpace)+1);
            }
            
            if((thisObject.fillValue == thisObject.fillType.CURVE) ||
               (thisObject.fillValue == thisObject.fillType.CURVE_FILL) ||
               (thisObject.fillValue == thisObject.fillType.CURVE_DEFILL)) {
                // Filling outer border
                radius = 0;
                qrCanvas.fillStyle = '#'+borderColor;
                thisObject._fillCurve(qrCanvas,px*xValue,px*yValue,7*px,7*px,radius);
                // Filling with bg between outer and inner block
                qrCanvas.fillStyle = '#'+qrColors.bg;
                thisObject._fillCurve(qrCanvas,px*(xValue+1),px*(yValue+1),5*px,5*px,radius);
                // Filling inner block
                qrCanvas.fillStyle = '#'+fillColor;
                thisObject._fillCurve(qrCanvas,px*(xValue+2),px*(yValue+2),3*px,3*px,radius);                
            } else {
                // Filling outer border
                qrCanvas.fillStyle = '#'+borderColor;
                thisObject._fillRectR(qrCanvas,px*xValue,px*yValue,7*px,7*px,radius);
                // Filling with bg between outer and inner block
                qrCanvas.fillStyle = '#'+qrColors.bg;
                thisObject._fillRectR(qrCanvas,px*(xValue+1),px*(yValue+1),5*px,5*px,radius);
                // Filling inner block
                qrCanvas.fillStyle = '#'+fillColor;
                thisObject._fillRectR(qrCanvas,px*(xValue+2),px*(yValue+2),3*px,3*px,radius);
            }
        }
    },
    
    /********************************************
     * PRIVATE Variables and functions - End
     *******************************************/
    /********************************************
     * PUBLIC Variables and functions - Begin
     *******************************************/
    fillType : {
        SQUARE          : 1,
        ROUNDED         : 2,
        ROUND_FILL      : 3,
        ROUND_DEFILL    : 4,
        CIRCLE          : 5,
        CIRPAT          : 6,
        CURVE           : 7,
        CURVE_FILL      : 8,
        CURVE_DEFILL    : 9,
    },
    
    colors : {
        bg      : "#ffffff",
        dot     : "#000000",
        lBorder : "#000000",
        lFill   : "#000000",
        rBorder : "#000000",
        rFill   : "#000000",
        bBorder : "#000000",
        bFill   : "#000000",
    },
    
    fillValue : 1,
    
    generateQRCode : function(config) {
        
        if(config) {
            
            var thisObject = this;
            
            if(config.width) thisObject._qrInputWidth = config.width;
            if(config.ecclevel) thisObject._ecclevel = config.ecclevel;
            if(config.showimage) thisObject._qrShowImage = config.showimage;
            
            if((config) && (config.imageid)) {
                thisObject._qrImageID = config.imageid;
            }
            
            if(document.getElementById(thisObject._qrImageID) == null) {
                var imageElement = document.createElement("img");
                imageElement.setAttribute("id", thisObject._qrImageID);
                document.body.appendChild(imageElement);            
            }
            
            var canvasElement   = document.getElementById(thisObject._qrCanvasID);
            var qrCodeFrame     = thisObject._generateQRCodeFrame(config.value);
            var qrWidth         = thisObject._qrWidth;
            
            var px = thisObject._qrInputWidth;        
            px /= qrWidth+10;
            px = Math.round(px - 0.5);
            thisObject._dotSize = px;
            thisObject._qrFinalWidth = px*(qrWidth+(2*thisObject._emptyBlockSize));            
            
            qrCanvas = canvasElement.getContext("2d");
            qrCanvas.canvas.width   = thisObject._qrFinalWidth;
            qrCanvas.canvas.height  = thisObject._qrFinalWidth;
            qrCanvas.lineWidth      = 1;
                        
            thisObject._fillQRSquares(qrCanvas,"f");
            thisObject._fillQRSquares(qrCanvas,"l");
            thisObject._fillQRSquares(qrCanvas,"r");
            thisObject._fillQRSquares(qrCanvas,"b");            

            var i,j,bottomV,rightV;
            var fillType    = thisObject.fillValue;
            var emptySpace  = thisObject._emptyBlockSize;
            for( i = 0; i < qrWidth; i++ ) {
                for( j = 0; j < qrWidth; j++ ) {
                    rightV  = qrWidth - i;
                    bottomV = qrWidth - j;
                    if(((i<7) && (j<7))||((rightV<=7) && (j<7))||((i<7) && (bottomV<=7)) ) continue;
                    
                    if( qrCodeFrame[(j*qrWidth)+i] ) {
                        qrCanvas.fillStyle = '#'+thisObject.colors.dot;
                        var radius = 0;
                        if(fillType == thisObject.fillType.CIRPAT) {
                            radius = px;
                        } else if(fillType == thisObject.fillType.CIRCLE) {
                            radius = (px-(px*0.4));
                        } else if(fillType == thisObject.fillType.CURVE) {
                            radius = (px-(px*0.6));
                            thisObject._fillCurve(qrCanvas,px*(emptySpace+i),px*(emptySpace+j),px,px,radius);
                            continue;
                        } else if(fillType == thisObject.fillType.CURVE_FILL) {
                            radius = (px-(px*0.6));
                            thisObject._fillCurveFill(qrCanvas,px*(emptySpace+i),px*(emptySpace+j),px,px,radius,qrCodeFrame,qrWidth,i,j);
                            continue;
                        } else if(fillType == thisObject.fillType.ROUNDED) {
                            radius = (px-(px*0.6));
                        } else if(fillType == thisObject.fillType.ROUND_DEFILL) {
                            radius = (px-(px*0.6));
                            thisObject._fillRectDeFill(qrCanvas,px*(emptySpace+i),px*(emptySpace+j),px,px,qrCodeFrame,qrWidth,i,j);
                        } else if(fillType == thisObject.fillType.ROUND_FILL) {
                            radius = (px-(px*0.6));
                            thisObject._fillRectFill(qrCanvas,px*(emptySpace+i),px*(emptySpace+j),px,px,radius,qrCodeFrame,qrWidth,i,j);
                        }
                        thisObject._fillRectR(qrCanvas,px*(emptySpace+i),px*(emptySpace+j),px,px,radius);
                    } else {
                        if((fillType == thisObject.fillType.ROUND_DEFILL) ||
                           (fillType == thisObject.fillType.ROUND_FILL)) {
                            radius = (px-(px*0.6));
                            var leftDot   = ((i>0)?(qrCodeFrame[(j)*qrWidth+(i-1)]):(0));
                            var rightDot  = ((i<(qrWidth-1))?(qrCodeFrame[(j)*qrWidth+(i+1)]):(0));
                            var topDot    = ((j>0)?(qrCodeFrame[(j-1)*qrWidth+(i)]):(0));
                            var bottomDot = ((j<(qrWidth-1))?(qrCodeFrame[(j+1)*qrWidth+(i)]):(0));
                            
                            qrCanvas.fillStyle = '#'+thisObject.colors.dot;
                            thisObject._fillRectR(qrCanvas,px*(emptySpace+i),px*(emptySpace+j),px,px,0);
                            
                            qrCanvas.fillStyle = '#'+thisObject.colors.bg;
                            thisObject._fillRectReverseFill(qrCanvas,px*(emptySpace+i),px*(emptySpace+j),px,px,radius,leftDot,rightDot,topDot,bottomDot);
                        } else if(fillType == thisObject.fillType.CURVE_DEFILL) {
                            if(((i<(7+1)) && (j<(7+1)))||((rightV<=(7+1)) && (j<(7+1)))||((i<(7+1)) && (bottomV<=(7+1))) ) continue;

                            qrCanvas.fillStyle = '#'+thisObject.colors.dot;
                            thisObject._fillRectR(qrCanvas,px*(emptySpace+i),px*(emptySpace+j),px,px,0);
                            
                            radius = (px-(px*0.6));
                            qrCanvas.fillStyle = '#'+thisObject.colors.bg;
                            thisObject._fillCurveDeFill(qrCanvas,px*(emptySpace+i),px*(emptySpace+j),px,px,radius,qrCodeFrame,qrWidth,i,j);
                        }
                    }
                }
            }
            
            if((config.photoid) && (config.photoid != "")){
                try {
                    var photoToInsertElement = document.getElementById(config.photoid);
                    if((photoToInsertElement.src) && (photoToInsertElement.src != "")) {
                        var canvasWidth = thisObject._qrFinalWidth;
                        var photoDemension = canvasWidth*0.3; // 30%
                        var newDimensions =  thisObject._getNewDimensions(photoDemension,photoDemension,
                                                                          photoToInsertElement.width,photoToInsertElement.height);
                        var photoXPosition = (canvasWidth - newDimensions.w)/2;
                        var photoYPosition = (canvasWidth - newDimensions.h)/2;
                        qrCanvas.drawImage(photoToInsertElement,photoXPosition,photoYPosition,newDimensions.w,newDimensions.h);
                    }
                } catch(e) {
                    // Code will come here when invalid image src and so do nothing
                    console.error("Exception: generateQRCode",e);
                }
            }
            
            /*
             * If parameter to "toDataURL" is empty, then it will convert into base64 PNG image
             * If Parameter to "toDataURL" is "image/jpeg", then it will convert into base64 JPG image
             * based on our analysis, we found that PNG QR Codes files are less in file size than JPG QR Codes
             */
            var base64ImageData = canvasElement.toDataURL();
            
            var canvasImageID           = document.getElementById(thisObject._qrImageID);
            canvasImageID.src           = base64ImageData;
            canvasImageID.style.width   = thisObject._qrFinalWidth+"px";
            canvasImageID.style.height  = thisObject._qrFinalWidth+"px";
            
            if(thisObject._qrShowImage == "no") {
                canvasImageID.style.display = "none";
            }
            
            canvasElement.style.display = "none";
            
            return {image:base64ImageData,width:thisObject._qrFinalWidth};
        }
        return null;
    }
    /********************************************
     * PUBLIC Variables and functions - End
     *******************************************/
};
