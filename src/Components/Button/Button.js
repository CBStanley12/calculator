function Button({ id, value, cls, click }) {
    return (
        <button id={id} className={`btn btn--${cls}`} value={value} onClick={click} type="button">
            {value}
        </button>
    );
}

export default Button;