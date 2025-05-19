import React, { useState, useEffect } from 'react'
import ItemsList from "@/components/product/ProductList"
import Input from '@/components/layout/Input'
import { Link } from 'react-router-dom';

function SearchApp() {
    const [apiUsers, setApiUsers] = useState([])
    const [searchItem, setSearchItem] = useState('')
    // set the initial state of filteredUsers to an empty array
    const [filteredUsers, setFilteredUsers] = useState([])

  // fetch the products once on mount
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      // save the complete list of users to the new state
      .then(data => setApiUsers(data.users))
      // if there's an error we log it to the console
      .catch(err => console.log(err))
    }, [])

    const handleInputChange = (e) => { 
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)

    // filter the items using the apiUsers state
    const filteredItems = apiUsers.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }

  return (
    <>
      <Input onChangeCallback={filterItems} />
      {loading && <p>Loading...</p>}
      {error && <p>There was an error loading the products</p>}
      {!loading && !error && filteredproducts.length > 0 && (
        <ItemsList items={filteredproducts} />
      )}
    </>
  );
}

export default SearchApp;
