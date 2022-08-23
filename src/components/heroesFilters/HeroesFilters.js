import { useDispatch, useSelector } from 'react-redux'
import { filterSet } from '../../actions';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

const HeroesFilters = () => {
    const {filters, activeFilter, filterStatusLoading} = useSelector(state => state.filters);
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
                    <button onClick={() => dispatch(filterSet(item.name))} className={btnClass} key={() => uuidv4()}>{item.label}</button>
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