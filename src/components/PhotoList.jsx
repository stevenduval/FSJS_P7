import { useParams } from "react-router-dom";

import NotFound from "./NotFound";
import Photo from "./Photo";

const PhotoList = ( { term, data } ) => {
    return (
        <div className="photo-container">
            <h2>{term} Gifs</h2>
            <ul>
                <Photo />
                <NotFound />
            </ul>
        </div>
    )
};

export default PhotoList;