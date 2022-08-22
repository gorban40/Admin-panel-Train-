import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { filtersLoaded, addNewHero } from '../../actions';
import { v4 as uuidv4 } from 'uuid';


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться


const HeroesAddForm = () => {
    
    const [heroName, setHeroName] = useState('');
    const [heroText, setHeroText] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const {filters} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersLoaded(data)))
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
        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(addNewHero(newHero)))
            .catch(console.log('something was wrong'));
    }



    const options = filters.map(item => {
        return (
            <option key={() => uuidv4()}>{item.label}</option>
        )
    });
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
                    {options}
                </select>
            </div>

            <button onClick={onSubmitForm} type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;