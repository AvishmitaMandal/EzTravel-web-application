import renderer from 'react-test-renderer';
import TileComponent from '../TileComponent';
import EZTravelLogo from '../../images/EZTravelLogo.png'

it('renders page', () => {
    const location = {
        name: 'Sample Location 1', price: 150, rating: '★★★★☆', description: 'This is a sample description for Location 1.', pictureURL: EZTravelLogo, isFavorited: false
    }
    const component = renderer.create(
        <TileComponent location={location}></TileComponent>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})