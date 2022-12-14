import { useDispatch, useSelector } from 'react-redux'
import { filterSet } from './filterSlice';
import classNames from 'classnames';
import { selectAll } from './filterSlice';
import store from '../../store/index'


const HeroesFilters = () => {
    const {activeFilter, filterStatusLoading} = useSelector(state => state.filters);

    const filters = selectAll(store.getState())
    const dispatch = useDispatch();
    
    const renderFilters = (filters, statusFliter) => {
        if (statusFliter === 'loading') {
            return <option>Loading elements</option>
        } else if (statusFliter === 'error') {
            return <option>Error loading</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(item => {

                const btnClass = classNames('btn', item.classNama, {
                    'active': item.name === activeFilter
                }); 

                return (
                    <button onClick={() => dispatch(filterSet(item.name))} className={btnClass} key={item.label}>{item.label}</button>
                )
            });
        }
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderFilters(filters,filterStatusLoading)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;