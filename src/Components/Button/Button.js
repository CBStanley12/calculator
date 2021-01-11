function Button({ id, value, cls, click }) {
    return (
        <button id={id} value={value} className={`btn btn--${cls}`} onClick={click} type="button">
            {value}
        </button>
    );
}

export default Button;