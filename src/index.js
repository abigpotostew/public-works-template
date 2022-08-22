import {generateTxHash, PRNGRand} from "./random";

// isPreview is true when rending in the public works preview pipeline.
const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true'
const prng = new PRNGRand()

// During development, refresh the hash on click.
const registerDevEvents = ()=>{
    const freshHash = ()=>{
        window.location = '?hash=' + generateTxHash()
    }
    document.addEventListener('mouseup', (e) => {
        freshHash()
    })
    window.addEventListener('touchend', function () {
        freshHash()
    });
    document.addEventListener('keyup', (e) => {
        if(e.key ===' '){
            freshHash()
        }
    })
}
registerDevEvents()

// Attributes are human-readable traits and will appear on marketplaces and rarity sites.
window.attributes = {
    "Color": prng.randomList(['Blue', 'Purple'])
};

// Traits are optional numeric attributes that represent the raw values that create traits.
window.traits = {
    "ColorR": prng.randomInt(0, 255),
    "ColorG": prng.randomInt(0, 255),
    "ColorB": prng.randomInt(0, 255)
};

// When the preview is rendered, set this field to true.
if(isPreview) {
    window.previewReady = true;
}