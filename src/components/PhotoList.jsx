import NotFound from "./NotFound";
import Photo from "./Photo";

const PhotoList = ( { term, data } ) => {
    // format term if it ends with s
    term =  (term.endsWith('s')) ? term.slice(0, -1) : term;
    return (
        <div className="photo-container">
            { 
                // if data is empty display NotFound component
                (data.length === 0) ?
                    <ul>
                        <NotFound />
                    </ul>
                :
                // if data not empty map through results and display them in Photo component
                <>
                    <h2>{term} Gifs</h2>
                    <ul>
                    {data.map(photo => <Photo {...photo} key={photo.id} />)}
                    </ul>
                </>
            }
        </div>
    )
};

export default PhotoList;