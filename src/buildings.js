const BuildingStore = []
class Building {
    constructor(id, street, city, state, zip) {
        this.id = id
        this.street = street
        this.city = city
        this.state = state
        this.zip = zip

        BuildingStore.push(this)
    }
}