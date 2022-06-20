import {generateTxHash, PRNGRand} from "./random";

const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true'
const prng = new PRNGRand()

// During development, refresh the hash on click.
document.addEventListener('mouseup', (e) => {
    window.location = '?hash=' + generateTxHash()
})