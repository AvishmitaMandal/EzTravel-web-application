import renderer from 'react-test-renderer';
import CurrencyConverter from '../CurrencyConverter';

it('renders page', () => {
    const component = renderer.create(
        <CurrencyConverter></CurrencyConverter>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})