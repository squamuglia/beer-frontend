// import { connect, getState } from 'react-redux';

// const state = getState();
// export const logState = () => console.log(state);

// export const addBeer = props => {
//   if (this.props.beerId !== 'adding') {
//     fetch(this.props.url + '/api/v1/kegs/' + this.state.id, {
//       method: 'POST',
//       body: JSON.stringify({
//         name: this.state.name,
//         style: this.state.style,
//         calories: this.state.calories,
//         abv: this.state.abv
//       }),
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         // Authentication: 'Bearer ' + localStorage.getItem('token')
//         'X-User-Email': `${localStorage.getItem('email')}`,
//         'X-User-Token': localStorage.getItem('token')
//       }
//     })
//       .then(r => r.json())
//       .then(keg => this.props.updateKegs(keg))
//       .catch(e => console.log(e));
// }

// // export const updateBeer = props => {

// // }

//   addOrUpdateBeer = e => {
//   e.preventDefault();
//   if (this.props.beerId !== 'adding') {
//     fetch(this.props.url + '/api/v1/kegs/' + this.state.id, {
//       method: 'POST',
//       body: JSON.stringify({
//         name: this.state.name,
//         style: this.state.style,
//         calories: this.state.calories,
//         abv: this.state.abv
//       }),
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         // Authentication: 'Bearer ' + localStorage.getItem('token')
//         'X-User-Email': `${localStorage.getItem('email')}`,
//         'X-User-Token': localStorage.getItem('token')
//       }
//     })
//       .then(r => r.json())
//       .then(keg => this.props.updateKegs(keg))
//       .catch(e => console.log(e));
//   } else {
//     console.log('add keg');
//     fetch(this.props.url + '/api/v1/kegs', {
//       method: 'POST',
//       body: JSON.stringify({
//         name: this.state.name,
//         style: this.state.style,
//         calories: this.state.calories,
//         abv: this.state.abv
//       }),
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'X-User-Email': `${localStorage.getItem('email')}`,
//         'X-User-Token': `${localStorage.getItem('token')}`
//       }
//     })
//       .then(r => r.json())
//       .then(keg => this.props.addKeg(keg))
//       .catch(e => console.log(e));
//   }
//   this.props.toggle();
// };
