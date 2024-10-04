import PropTypes from 'prop-types';

export function Star({ number, setSelected, selected }) {

    if (selected >= number) {
        return <img src="/filled_star.png" alt="Filled Star" className="w-[30px] h-[30px] cursor-pointer" onClick={() => setSelected(number)} />
    } else return <img src="/unfilled_star.png" alt="Unfilled Star" className="w-[30px] h-[30px] cursor-pointer" onClick={() => setSelected(number)} />
}

Star.propTypes = {
    number: PropTypes.number,
    setSelected: PropTypes.func,
    selected: PropTypes.number
}