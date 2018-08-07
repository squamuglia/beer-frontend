const defaultState = {
  buildings: [],
  floors: [],
  kegs: [],
  beerLocations: [],
  url: 'http://localhost:3000'
  //'https://calm-depths-56846.herokuapp.com'
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'ADD_BUILDINGS':
      return {
        ...state,
        buildings: [...state.buildings, ...action.payload]
      };

    case 'ADD_FLOORS':
      return {
        ...state,
        floors: [...state.floors, ...action.payload]
      };

    case 'ADD_KEGS':
      return {
        ...state,
        kegs: [...state.kegs, ...action.payload]
      };

    case 'ADD_BEERLOCATIONS':
      //sorts by floor order
      const sortedLocations = action.payload.sort(function(a, b) {
        return a.floor.id - b.floor.id;
      });
      return {
        ...state,
        beerLocations: [...state.beerLocations, ...sortedLocations]
      };

    case 'CHANGE_BEERLOCATION':
      const removalIndex = state.beerLocations.findIndex(
        beerLocation => beerLocation.id === action.payload.id
      );
      return {
        ...state,
        beerLocations: [
          ...state.beerLocations.slice(0, removalIndex),
          action.payload,
          ...state.beerLocations.slice(removalIndex + 1)
        ]
      };

    default:
      return state;
  }
}
