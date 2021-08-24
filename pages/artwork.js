import ArtworkThumb from '../components/ArtworkThumb';
import { getPhotos } from '../services/fetchData';

const ArtworkPage = ({ artwork }) => {
  return (
    <div className="container media-set">{
      artwork.map((p, i) => <ArtworkThumb key={p._id} image={p} index={i} />)
    }</div>
  );
}

export const getStaticProps = async _ => {
  const artwork = await getPhotos({ photo_set: "Artwork", sort: '{ "index": 1 }' });
  return { props: { artwork } };
}

export default ArtworkPage;