import { useState,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
//import { useHttp } from "../../hooks/http.hook";
import { useCreateHeroMutation } from '../../api/apiSlice'

//import {heroesAdd} from '../heroesList/heroesSlice';
import { selectAll } from '../heroesFilters/filterSlice';
import {fetchFilters} from '../heroesFilters/filterSlice';

import { v4 as uuidv4 } from 'uuid';

import store from '../../store/index';


const HeroesAddForm = () => {
    
    const [createHero, {isLoading}] = useCreateHeroMutation();

    const [heroName, setHeroName] = useState('');
    const [heroText, setHeroText] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filterStatusLoading} = useSelector(state => state.filters);
    const filters = selectAll(store.getState())
    const dispatch = useDispatch();
    //const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, [])

    const onSubmitForm = (event) => {
        event.preventDefault();
        const name = heroName;
        const description = heroText;
        const element = heroElement;
        setHeroName('');
        setHeroText('');
        setHeroElement('');
        const newHero = {
            id: uuidv4(),
            name: name,
            description: description,
            element: element
        }
        createHero(newHero).unwrap();
        // request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
        //     .then(res => console.log(res, 'Отправка успешна'))
        //     .then(dispatch(heroesAdd(newHero)))
        //     .catch(console.log('something was wrong'));
    }

    const renderFilters = (filters, statusFliter) => {
        if (statusFliter === 'loading') {
            return <option>Loading elements</option>
        } else if (statusFliter === 'error') {
            return <option>Error loading</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(item => {
                // eslint-disable-next-line
                if (item.name === 'all') return;

                return (
                    <option key={item.label}>{item.label}</option>
                )
            });
        }
    }
    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroText}
                    onChange={(e) => setHeroText(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {renderFilters(filters,filterStatusLoading)}
                </select>
            </div>

            <button onClick={onSubmitForm} type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;