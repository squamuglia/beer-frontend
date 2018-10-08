const defaultState = {
  buildings: [],
  floors: [],
  kegs: [],
  beerLocations: [],
  loggedIn: false,
  url: 'http://localhost:3000'
  // url: 'https://calm-depths-56846.herokuapp.com'
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
      //sorts alphabetically
      const sortedKegs = action.payload.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      return {
        ...state,
        kegs: [...state.kegs, ...sortedKegs]
      };

    case 'ADD_KEG':
      //sorts alphabetically
      console.log('add');
      const allKegs = [...state.kegs, action.payload];
      const sortedAllKegs = allKegs.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
      return {
        ...state,
        kegs: sortedAllKegs
      };

    case 'UPDATE_KEG':
      const kegRemovalIndex = state.kegs.findIndex(
        keg => keg.id === action.payload.id
      );
      if (kegRemovalIndex >= 0) {
        console.log('updateKeg', action.payload);
        console.log('kegindex', kegRemovalIndex);
        return {
          ...state,
          kegs: [
            ...state.kegs.slice(0, kegRemovalIndex),
            action.payload,
            ...state.kegs.slice(kegRemovalIndex + 1)
          ]
        };
      } else return state;

    case 'REFRESH_LOCATIONS':
      const freshLocations = action.payload.sort(function(a, b) {
        return a.floor.id - b.floor.id;
      });
      return {
        ...state,
        beerLocations: [...freshLocations]
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

    case 'LOGIN':
      return {
        ...state,
        loggedIn: true
      };

    case 'LOGOUT':
      return {
        ...state,
        loggedIn: false,
        email: null
      };

    default:
      return state;
  }
}
