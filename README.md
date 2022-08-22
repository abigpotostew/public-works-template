# Public Works Generative Work Template

A base template for generative works for the public works platform.

## Usage
Clone or use this project as a template `https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template`

Add any third party dependencies with `npm i <dep>`

Run `npm build` to create a zipped archive of your project

Run `npm dev` during development.

Click, touch, or press spacebar to create a new hash.

## Work Requirements
* Your work must be self-contained-- any external calls will be blocked during the preview rendering pipeline.
* Your work must set `window.previewReady = true` when the preview is complete. Otherwise, a snapshot will be taken after 60 seconds.
* Attributes and traits must be a javascript object where keys are the attribute names and values one of `string`, `number` or `boolean`. Any other type will be serialized with `.toString()`.
* 
* 


