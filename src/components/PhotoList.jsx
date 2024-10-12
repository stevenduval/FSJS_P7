import NotFound from "./NotFound";
import Photo from "./Photo";

const PhotoList = () => 

    <div class="photo-container">
        <h2>Results</h2>
        <ul>
            <Photo />
            <NotFound />
        </ul>
    </div>
;

export default PhotoList;