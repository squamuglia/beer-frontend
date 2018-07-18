const BuildingStore = [];
class Building {
  constructor(id, street, city, state, zip, floors) {
    this.id = id;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.floors = floors;

    BuildingStore.push(this);
  }
}

const KegStore = [];
class Keg {
  constructor(location, floor, name, style, calories, abv, id) {
    this.id = id;
    this.name = name;
    this.style = style;
    this.abv = abv;
    this.calories = calories;
    this.location = location;
    this.floor = floor;

    KegStore.push(this);
  }
}

window.onload = function() {
  const buildingsURL = 'http://localhost:3000/api/v1/buildings';
  const buildingLists = document.getElementById('lists');
  const title = document.getElementById('title');
  const edit = document.getElementById('edit');

  fetch(buildingsURL)
    .then(res => res.json())
    .then(json => saveBuilding(json));

  function saveBuilding(json) {
    json.forEach(
      building =>
        new Building(
          building.id,
          building.street,
          building.city,
          building.state,
          building.zip,
          building.floors
        )
    );
    displayBuildings(BuildingStore);
  }

  function displayBuildings(BuildingStore) {
    BuildingStore.forEach(function(building) {
      buildingLists.innerHTML += `
            <div class="fa">
                <h3 class="white my05">${building.street}</h3>
                    <ul id="${building.id}">
                    <li class="white">
                    </ul>
            </div>
            `;
      listBeers(building);
    });
  }
  function listBeers(building) {
    let list = document.getElementById(`${building.id}`);
    building.floors.forEach(function(floor) {
      floor.kegs.forEach(
        keg =>
          (list.innerHTML += `
                    <li class="white">
                        <div class="circle border fll mr1 mt05 ac w30">${
                          floor.number
                        }</div>
                        <h4>${keg.name}</h4>
                        <p class="mt0">Style: ${keg.style} | Calories: ${
            keg.calories
          } | ABV: ${keg.abv}% </p>
                    </li>
                    `)
      );
    });
  }

  document.addEventListener('click', function() {
    if (
      event.target === edit ||
      event.target === document.getElementById('edit-txt')
    ) {
      beerForm();
    } else if (event.target.id === 'x') {
      edit.innerHTML = "<h3 id='edit-txt'>Add Beer</h3>";
    } else if (event.target.id === 'add-beer') {
      let newKeg = new Keg(
        document.getElementsByName('building_id')[0].value,
        document.getElementsByName('floor')[0].value,
        document.getElementsByName('name')[0].value,
        document.getElementsByName('style')[0].value,
        document.getElementsByName('calories')[0].value,
        document.getElementsByName('abv')[0].value
      );
      uploadBeer(newKeg);
    }
  });

  function beerForm() {
    edit.innerHTML = '<h3>Back</h3>';
    edit.innerHTML = `
        <div class="mw-1 ma p1 z100 bg b">
            <div class="x ar" id="x">X</div>
            <form>
                <label>Location</label>
                <select type="select" name="building_id">
                </select>

                <label>Floor</label>
                <select type="select" name="floor">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>

                <label>Name</label>
                <input type="text" name="name" placeholder="Name"></input>
                
                <label>Style</label>
                <input type="text" name="style" placeholder="Style"></input>
                
                <label>Calories</label>
                <input type="text" name="calories" placeholder="Calories"></input>
                
                <label>ABV</label>
                <input type="text" name="abv" placeholder="Decimals only"></input>
                
                <div class="px1 mt1 border ac" id="new-beer">
                    <h3 id="add-beer">Add Beer</h3>
                 </div>
                </form>
        </div>
        `;
    buildingSelector();
  }

  function buildingSelector() {
    BuildingStore.forEach(building => {
      document.getElementsByName('building_id')[0].innerHTML += `
            <option value="${building.id}">${building.street}</option>
                `;
    });
  }

  let floorList = [];
  function floorSelector() {
    BuildingStore.forEach(building => {
      building.floors.forEach(floor => {
        floorList.push(floor.number);
      });
    });
  }

  floorSelector();

  function uploadBeer(newKeg) {
    fetch(buildingsURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: newKeg.name,
        style: newKeg.style,
        abv: newKeg.abv,
        calories: newKeg.calories,
        floor: newKeg.floor,
        location: newKeg.location
      })
    })
      .then(r => r.json())
      .then(r => console.log(r));
  }
};
