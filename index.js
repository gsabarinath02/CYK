function parse_input() {
    let productions_input = document.getElementById('productions_input').value
    const word_input = document.getElementById('word_input').value.trim()

    // Convert newlines to comma and remove spaces and dots
    productions_input = productions_input.trim()
    productions_input = productions_input.replace(/ /g, '')
    productions_input = productions_input.replace(/\n/g, ',')
    productions_input = productions_input.replace(/,+/g, ',')
    productions_input = productions_input.replace(/\./g, '')

    // Replace html/latex arrows through simple - and >
    productions_input = productions_input.replace(/→/g, '->')

    const lines = productions_input.split(',')
    let productions = []
    for (let line of lines) {
        // Left of -> is the producer and right are the products
        let [producer, products] = line.split('->')
        products = new Set(products.split('|'))
        productions.push({producer, products})
    }
    const word = word_input
    return {productions, word}
}


function render_cyk() {
    const input = parse_input()
    const cyk = new CYK(input)
    const result = cyk.toString()
    document.getElementById("output").innerHTML = result

    document.getElementById('output-info').innerText = 
        cyk.table[0][cyk.table[0].length - 1].has('S') ? 'yes, it is Valid becase the first box contains S' : 'Not valid, becase the first box do not contains S'
}


