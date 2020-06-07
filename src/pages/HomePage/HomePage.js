import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../../Component/Search/Search';
import DisplayData from '../../Component/DisplayData/DisplayData';
import SortData from '../../Component/SortingData/SortingData';
import SortFilterButtons from './SortFilterButtons/SortFilterButtons';
import FilteredData from '../../Component/FilteredData/FilteredData';
import { API_KEY } from '../../API_KEY/API_KEY';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import useStyles from './HomePageStyle';

const Home = (props) => {

  const classes = useStyles();

  const [data, setData] = useState(null);
  const [want, setWant] = useState(null);
  const [location, setLocation] = useState(null);
  const [sort, setSort] = useState(false);    //for sort of data(boolean)
  const [filter, setFilter] = useState(null); //for value of select


  useEffect(() => {
    if(want || location){
      axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          },
          params: {
            categories: `${want}`,
          }
        })
          .then((res) => {
            setData(res.data.businesses);
            console.log(res.data.businesses);
          })
          .catch((err) => {
            console.log(err)
          })
    }
  }, [want, location]);

  const getData = (wan, loc) => {
    setWant(wan);
    setLocation(loc);
  }

  const SortHandler = () => {
    setSort(!sort);
  }

  const selectChangeHandler = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Search clicked={getData}/>
      <Grid item>
        {(data)?
          <React.Fragment>
            <Typography className={classes.heroText} variant="h3">
              Results
            </Typography>
            <SortFilterButtons 
              clicked={SortHandler} 
              sort={sort} 
              data={data}
              filter={filter}
              changed={selectChangeHandler}
            />
          </React.Fragment>
           : null
        }
        <Grid
          container
          spacing={4}
          justify="center"
          className={classes.list}
        >
          {
            (sort)?
            <SortData data={data}/> : (filter)? <FilteredData selectValue={filter} data={data}/> : <DisplayData data={data}/> 
          }
          
        </Grid>
      </Grid>

    </div>
  )
}

export default Home;