

function search(nodes, searchText) {
    let output = []
    let isValid = true
    let regex
    try {
        regex = new RegExp(searchText)
    }
    catch {
        isValid = false
    }
    // return all nodes until regex valid
    if (!isValid) {
        return nodes
    }
    let keys = [
        'shortName',
        'longName',
        'nickname'
    ]
    for (let node of nodes) {
        let shouldAdd = false
        for (let key of keys) {
            // add or to handle malformated nodes
            let value = node[key] || ""
            if (value.match(regex)) {
                shouldAdd = true
            }
        }
        let teams = node.teams || []
        for (let team of teams) {
            if (team.match(regex)) {
                shouldAdd = true
            }
        }
        if (shouldAdd) {
            output.push(node)
        }
    }
    return output
}

function sort(nodes, method) {
    console.log(nodes, method)
}

const utils = {
    search,
    sort
}

export default utils