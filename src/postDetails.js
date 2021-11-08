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
        <div>
          {
            location ? <div>{location.state.detail.title}</div> : 'null'
          }
          
        </div>
      );

};

export default PostDetails;