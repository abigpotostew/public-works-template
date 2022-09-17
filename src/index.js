import {createPrng, isPWPreview, registerDevEvents, setPreviewReady, setProperties} from "./publicworks";

const prng = createPrng()

// optionally refresh hash on space bar
registerDevEvents()

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