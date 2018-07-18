const KegsStore = []
class Keg {
    constructor(id, name, style, calories, abv) {
        this.id = id
        this.name = name
        this.style = style
        this.calories = calories
        this.abv = abv

        KegsStore.push(this)
    }
}