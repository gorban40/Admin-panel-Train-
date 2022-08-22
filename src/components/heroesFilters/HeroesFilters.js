import { useDispatch, useSelector } from 'react-redux';
import { filterSet } from '../../actions';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, activeFilter} = useSelector(state => state.filters);

    const dispatch = useDispatch();


    const options = filters.map(({name, classNama, label}) => {

        const btnClass = classNames('btn', classNama, {
            'active': name === activeFilter
        }); 
        return (
            <button onClick={() => dispatch(filterSet(name))} className={btnClass} key={() => uuidv4()}>{label}</button>
        )
    }); 

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {options}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;