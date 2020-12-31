function Button({ id, value, cls }) {
    return (
        <button id={id} className={`btn btn--${cls}`} value={value} type="button">
            {value}
        </button>
    );
}

export default Button;