const Photo = ({ farm, id, server, secret }) => {
    // switch farm to 1 if it is 0
    // https://stackoverflow.com/questions/64080851/invalid-farm-value-returned-by-flickr-api
    farm = (farm === 0) ? 1 : farm;
    return (
        <li>
            <img src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} alt="" />
        </li>
    )
};

export default Photo;