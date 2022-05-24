export const selectTheme = (state) => state.theme
export const selectPokemons = (state) => state.pokemons
export const selectWishList = (state) => state.wishList
export const selectSearcher = (state) => state.searcher
export const selectTodos = (state) => state.todos
export const selectTodo = (todoID) => (state) => {
   return state.todo[todoID]}
export const selectPokemon = (pokemonID) => (state) => {
    return state.pokemon[pokemonID]
}
export const selectCurrentPage = (state) => state.currentPage