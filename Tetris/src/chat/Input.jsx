function Input(props) {
    let className = "input-container";
    if (props.isActive) className += " active";
    return (
        <div className={className}>
            <form className="input" onKeyDown={props.handleKeyDown}>
                <textarea
                    value={props.params.value.join("")}
                    ref={props.textarea}
                    rows={props.params.row}
                    wrap="hard"
                    onChange={props.handleChange}>
                </textarea>
                <input type="submit" value={props.buttonValue} title="ctrl+Enter" onClick={props.handleClick}></input>
            </form>
        </div>
    );
}
