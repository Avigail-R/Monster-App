import CardList from './components/card-list/card-list.component';
import './App.css';
import SearchBox from './components/search-box/search-box.component';
import { useState, useEffect} from 'react'

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonster] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  console.log('rrrrr');
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => setMonster(users));
  }, [])
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters)
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className='app-title'>Monster Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder={'search monsters'}
        className='search-box' />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;
