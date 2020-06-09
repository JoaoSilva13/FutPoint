
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }

        })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {


            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`

            }

            citySelect.disabled = false
        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



// Itens De Coleta 
// Pegar todos os li 

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar o remover um class com js 
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //console.log("ITEM ID: ", itemId)

    // Verficar se existem itens selecionados, se sim
    // Pegar o itens selecionados

    const alreadySelected = selectItems.findIndex(item => {
        const itemFound = item == itemId  // Isso será verdadeiro ou falso
        return itemFound
    })

    // Se já tiver selecionado, 

    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectItems.filter(item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent

        })

        selectItems = filteredItems
    } else {
        // Se não estiver selecionado,
        // adicionar a seleção
        selectItems.push(itemId)

    }

    //console.log("selectItems: ", selectItems)
    // Atualizar os campos escondidos com os itens selecionados
    collectedItems.value = selectItems


}