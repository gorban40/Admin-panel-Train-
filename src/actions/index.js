export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDelete = (id) => {
    return {
        type: 'HEROES_DELETE',
        payload: id
    }
}

export const filtersLoaded = (data) => {
    return {
        type: 'FILTER__LOADED',
        payload: data
    }
}   

export const addNewHero = (data) => {
    return {
        type: 'ADD_HERO',
        payload: data
    }
}

export const filterSet = (option) => {
    return {
        type: 'FILTER_SET',
        payload: option
    }
}

export const filterError = () => {
    return {
        type: 'FILTER_EROR',
    }
}