import db from '.'

async function featureCollectionToTable(name, file) {
    let text = await file.text()
    try {
        let features = JSON.parse(text)
        // convert to array, func can handle FeatureCollection JSON or array of features
        if (!Array.isArray(features) && Array.isArray(features.features)) {
            features = features.features
        }
        await addLayer(name, features)
    }
    catch {
        try {
            let features = []
            for (let line of text.split('\n')) {
                let row = JSON.parse(line)
                features.push(row)
            }
            await addLayer(name, features)
        }
        catch (err) {
            throw new Error("File type must be geojson, geojson array, or newline geojson.")
        }
    }
}

function generateId() {
    let array = new Uint8Array(4)
    crypto.getRandomValues(array)
    return array.toHex()
}

async function addLayer(name, data) {
    await db.layers.add({ id: generateId(), name, display: 1 })
    for (let row of data) {
        row.id = generateId()
        row.layer = name
        await db.layerData.add(row)
    }
}

const utils = {
    featureCollectionToTable
}

export default utils