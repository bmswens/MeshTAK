import { afterEach } from 'vitest'
import db from '.'
import utils from './utils'

describe('utils', function () {
    afterEach(async () => {
        await db.delete()
        await db.open()
    })
    it("should convert geojson to dexie layer", async function () {
        let data = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [0, 0]
                    },
                    name: "Center Of World"
                }
            ]
        }
        let file = new File([JSON.stringify(data)], "mything.json")
        let id = await utils.featureCollectionToTable('mything', file)
        let results = await db.layerData.where({layer: id}).toArray()
        expect(results.length).toEqual(1)
        expect(results[0].name).toEqual("Center Of World")
    })
    it("should convert geojson array to dexie layer", async function () {
        let data = [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [0, 0]
                },
                name: "Center Of World"
            }
        ]
        let file = new File([JSON.stringify(data)], "mything.json")
        let id = await utils.featureCollectionToTable('mything', file)
        let results = await db.layerData.where({layer: id}).toArray()
        expect(results.length).toEqual(1)
        expect(results[0].name).toEqual("Center Of World")
    })
    it("should convert newline geojson", async function () {
        let data = `{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"name":"Center Of World"}
{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"name":"Center Of World 1"}`
        let expected = [
            { "type": "Feature", "geometry": { "type": "Point", "coordinates": [0, 0] }, "name": "Center Of World" },
            { "type": "Feature", "geometry": { "type": "Point", "coordinates": [0, 0] }, "name": "Center Of World 1" }
        ]
        let file = new File([data], "mything.json")
        let id = await utils.featureCollectionToTable('mything', file)
        let results = await db.layerData.where({layer: id}).toArray()
        expect(results.length).toEqual(2)
    })
    it("should throw on incorrect data", async function() {
        let data = "straight garbage"
        let file = new File([data], "mything.json")
        await expect(async () => await utils.featureCollectionToTable('mything', file)).rejects.toThrow()
    })
})