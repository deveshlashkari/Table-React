import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PostDetails = props => {
    const location = useLocation();

    useEffect(() => {
       console.log(location.pathname); // result: '/secondpage'
       console.log(location.search); // result: '?query=abc'
       console.log(location.state.detail); // result: 'some_value'
    }, [location]);

    return (
        <div
          style={{margin: '20px'}}
        >
          <h3>{location?.state?.detail?.title ?? null}</h3>
          {
            location ? <div>{JSON.stringify(location.state.detail)}</div> : 'null'
          }
          
        </div>
      );

};

export default PostDetails;