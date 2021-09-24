function Input(props) {
    let className = "input-container";
    if (props.isActive) className += " active";
    return (
        <div className={className}>
            <form className="input" onKeyDown={props.onKeyDown}>
                <textarea
                    value={props.params.value.join("")}
                    placeholder={props.placeholder}
                    ref={props.textarea}
                    rows={props.params.row}
                    wrap="hard"
                    onChange={props.onChange}>
                </textarea>
                <input type="submit" value={props.buttonValue} title="ctrl+Enter" onClick={props.onClick}></input>
            </form>
        </div>
    );
}
