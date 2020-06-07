function populatesUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        //Função anonima, que está retornando um valor 
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
    citySelect.setAttribute('disabled', 'disabled');

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

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

populatesUFs();

//Ítens de Coleta
//Pegar todos os Li´s

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []
function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id


    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados
    const alreadSelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção
    if (alreadSelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const ItemIsDiffetent = item != itemId
            return false
        })
        selectedItems = filteredItems
        //se não estiver selecionado, adicionar à seleção
    } else {

        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}