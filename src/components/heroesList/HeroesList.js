import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fecthHeroes, filteredHeroesSelector } from './heroesSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {

    const filterHeroes = useSelector(filteredHeroesSelector)

    const { heroesLoadingStatus } = useSelector(state => state.heroes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fecthHeroes())
        // eslint-disable-next-line
    }, []);


    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({ id, ...props }) => {
            return <HeroesListItem id={id} key={id} {...props} />
        })
    }
    const elements = renderHeroesList(filterHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;