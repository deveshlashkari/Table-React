import React, {useState, useEffect, useRef, useMemo} from 'react';
// import DataTable from './data-table/DataTable';
import MyTable from './data-table/MyTable';
// import styled from 'styled-components'
import CssBaseline from '@material-ui/core/CssBaseline';
import { useNavigate } from "react-router-dom";
import useInterval from './hooks/useInterval';

function App() {
  const [pageNo, setPageNo] = useState(0);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  let navigate = useNavigate();

  // const cols = [
  //   { header: 'Title', name: 'title' },
  //   { header: 'URL', name: 'url' },
  //   { header: 'Created at', name: 'created_at' },
  //   { header: 'Author', name: 'author' },
  // ];

  const getPosts = () => {
    console.log(pageNo);

    fetch('https://hn.algolia.com/api/v1/search_by_date?tags=story&page='+pageNo)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        // console.log('posts-', posts);
        // console.log('result?.hits-', result?.hits);
        setPosts(posts.concat(result?.hits));
      },
      (err) => {
        setIsLoaded(true);
        setError(err);
      }
    )
  }

  useInterval(() => {
    // Commenting temporarily
    // setPageNo(pageNo + 1);
  }, 10000);

  useEffect(() => {
    setIsLoaded(false);
    getPosts()
  }, [pageNo]);

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'URL',
        accessor: 'url',
      },
      {
        Header: 'Created at',
        accessor: 'created_at',
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
    ],
    []
  )

  const data = useMemo(() => posts, [posts]);

  const fetchMoreData = () => {
    // setTimeout(() => {
      setPageNo(pageNo + 1);
      // setItems(items.concat(makeData(2)));
    // }, 1500);
  };

const showJson = (json: any): void => {
//     history.push({
//         pathname: '/post/details',
//         state: { detail: json }
//     });
  
  navigate("/post/details",{state:{detail:json}});
   
}

  return (
    <div className="App" style={{margin: '20px'}}>
      {
        error ? <div>Error: {error.message}</div> : null
      }
      {
        posts.length ? 
          <>
          <CssBaseline />
          <MyTable columns={columns} data={data} update={fetchMoreData} showDetails={showJson} />
          </> 
        : null 
      }
    </div>
  );
}

export function divide(a: number, b:number): number {
  if(b === 0){
    throw new Error('Divide by zero not possible!');
  }

  return Math.round(a / b);
}

export default App;
