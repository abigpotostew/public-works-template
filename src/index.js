let devMode = true;
if(devMode){
    /**
     * Enable new hashes on click during development.
     */
    const freshHash = () => {
        window.location = '?hash=' + generateTxHash()
    }
    window.addEventListener('touchend', function () {
        freshHash()
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
            freshHash()
        }
    })
}

const prng = createPrng()

setProperties({
    "Color": prng.randomList(['Blue', 'Purple'])
}, {
    "ColorR": prng.randomInt(0, 255),
    "ColorG": prng.randomInt(0, 255),
    "ColorB": prng.randomInt(0, 255)
})

// rendering logic...

// When the preview is rendered, notify PW the preview is ready
if (isPWPreview()) {
    setPreviewReady()
}
