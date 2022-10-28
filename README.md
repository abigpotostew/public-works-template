# Public Works Generative Work Template

A base template for generative works for the public works platform.

## Usage
Clone or use this project as a template `https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template`

Add any third party dependencies with `npm i <dep>`

Run `npm run dev` during development to create a dev server at `http://localhost:8080`. This server automatically refreshes whenever you make a code change.

Run `npm run build` to create a zipped archive of your project to submit to publicworks.art

Run `npm run start` to test the built version after running `npm run build`.

Press space bar or touch to create a new hash.

## Work Requirements
* A work must be reproducible. If a work is given the same hash, it must produce the exact same image.
* Save attributes with `setProperties(myAttributes, myOptionalTraits)` before your rendering is complete.
* Call `setPreviewReady()` when the preview is complete. Otherwise, a snapshot will be taken after 60 seconds.
* Attributes and traits must be a javascript object where keys are the attribute names and values one of `string`, `number` or `boolean`. Any other type will be serialized with `.toString()`.
* Your work must be self-contained-- any external calls will be blocked during the preview rendering pipeline.
