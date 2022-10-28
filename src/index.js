
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
