const defaultState = {
  buildings: [],
  floors: [],
  kegs: [],
  beerLocations: []
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
      return {
        ...state,
        beerLocations: [...state.kegs, ...action.payload]
      };

    // case 'CHANGE_KEG':
    //   const removalIndex = state.kegs.findIndex(keg => keg.id === action.id);
    //   return {
    //     ...state,
    //     kegs: [
    //       ...state.beers.slice(0, removalIndex),
    //       ...state.beers.slice(removalIndex + 1)
    //     ]
    //   };

    default:
      return state;
  }
}
