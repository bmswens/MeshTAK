import db from '.'

async function featureCollectionToTable(name, file) {
    let text = await file.text()
    try {
        let features = JSON.parse(text)
        // convert to array, func can handle FeatureCollection JSON or array of features
        if (!Array.isArray(features) && Array.isArray(features.features)) {
            features = features.features
        }
        return await addLayer(name, features)
    }
    catch {
        try {
            let features = []
            for (let line of text.split('\n')) {
                let row = JSON.parse(line)
                features.push(row)
            }
            return await addLayer(name, features)
        }
        catch (err) {
            console.error(err)
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
    const id = generateId()
    await db.layers.add({
        name,
        id,
        display: 1,
        style: {
            color: "#2196f3",
            fillColor: "#2196f3",
            opacity: 0.2
        }
    })
    for (let row of data) {
        row.id = generateId()
        row.layer = id
        await db.layerData.add(row)
    }
    return id
}

const utils = {
    featureCollectionToTable
}

export default utils