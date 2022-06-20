import {PRNGRand} from "./random";

const isPreview = new URLSearchParams(window.location.search).get('preview') === 'true'
const prng = new PRNGRand()
