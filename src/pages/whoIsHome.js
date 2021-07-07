import React, {useState,useEffect} from 'react';
import { PageTitleText } from '../components/Layout'
import {REACT_APP_REST} from '../App';

export function Person() {  //this pulls the data from DB
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchPerson(); },[]);
    const fetchPerson = async () => {//this pulls from our express to our database
    const data = await fetch(REACT_APP_REST+`/homeReporting/`, {method: 'GET'});
    const person = await data.json();
    setPerson(person);
  }
  const [person,setPerson] = useState([]);
  return (
    <div>
        <div>
            <div>{person.map(person=>(//maps out our persons objects the key is set to _id because mongo uses that as a ID's so we are panning over all of the ID tags and pulling data from them.                  
                <h3 key={person._id}>
                    <PageTitleText>Is {person.name} Home : {person.isHome}</PageTitleText>
                </h3>))}
            </div>
        </div>
    </div>
  );
}
export default Person;