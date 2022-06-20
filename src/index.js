import {generateTxHash, PRNGRand} from "./random";

const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true'
const prng = new PRNGRand()

// During development, refresh the hash on click.
document.addEventListener('mouseup', (e) => {
    window.location = '?hash=' + generateTxHash()
})

// Attributes are human-readable traits.
window.attributes = {
    "Color": prng.randomList(['Blue', 'Purple'])
};

// Traits are optional numeric attributes that represent the traits.
window.traits = {
    "ColorR": prng.randomInt(0, 255),
    "ColorG": prng.randomInt(0, 255),
    "ColorB": prng.randomInt(0, 255)
};

// When the preview is rendered, set this field to true.
window.previewReady = true;