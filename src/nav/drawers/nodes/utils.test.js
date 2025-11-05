import utils from './utils'

describe('search()', function() {
    it("should return all nodes on invalid regex", function() {
        let nodes = [
            {
                shortName: "target",
                longName: "The Real Target",
                nickname: "Target McTargetFace",
                teams: []
            },
            {
                shortName: "Nope",
                longName: "Nah",
                nickname: "Negative",
                teams: []
            },
        ]
        let text = '('
        let results = utils.search(nodes, text)
        expect(results).toHaveLength(2)
    })
    it("should match on shortName", function() {
        let nodes = [
            {
                shortName: "target",
                longName: "The Real Target",
                nickname: "Target McTargetFace",
                teams: []
            },
            {
                shortName: "Nope",
                longName: "Nah",
                nickname: "Negative",
                teams: []
            },
        ]
        let text = 'target'
        let results = utils.search(nodes, text)
        expect(results).toHaveLength(1)
        expect(results[0].shortName).toEqual("target")
    })
    it("should match on longName", function() {
        let nodes = [
            {
                shortName: "target",
                longName: "The Real Target",
                nickname: "Target McTargetFace",
                teams: []
            },
            {
                shortName: "Nope",
                longName: "Nah",
                nickname: "Negative",
                teams: []
            },
        ]
        let text = 'Target'
        let results = utils.search(nodes, text)
        expect(results).toHaveLength(1)
        expect(results[0].shortName).toEqual("target")
    })
    it("should match on nickname", function() {
        let nodes = [
            {
                shortName: "target",
                longName: "The Real Target",
                nickname: "Target McTargetFace",
                teams: []
            },
            {
                shortName: "Nope",
                longName: "Nah",
                nickname: "Negative",
                teams: []
            },
        ]
        let text = 'McTarget'
        let results = utils.search(nodes, text)
        expect(results).toHaveLength(1)
        expect(results[0].shortName).toEqual("target")
    })
    it("should match on any teams", function() {
        let nodes = [
            {
                shortName: "target",
                longName: "The Real Target",
                nickname: "Target McTargetFace",
                teams: ["A Team"]
            },
            {
                shortName: "Nope",
                longName: "Nah",
                nickname: "Negative",
                teams: ["B Team"]
            },
        ]
        let text = 'A Team'
        let results = utils.search(nodes, text)
        expect(results).toHaveLength(1)
        expect(results[0].shortName).toEqual("target")
    })
})